-- Ensure no client-side write privileges on gifts / user_roles
REVOKE INSERT, UPDATE, DELETE ON public.gifts FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
GRANT ALL ON public.gifts TO service_role;
GRANT ALL ON public.user_roles TO service_role;

-- Explicit deny policies (defense in depth) so no future permissive default applies
DROP POLICY IF EXISTS "No client writes to gifts" ON public.gifts;
CREATE POLICY "No client writes to gifts"
  ON public.gifts FOR INSERT TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client updates to gifts" ON public.gifts;
CREATE POLICY "No client updates to gifts"
  ON public.gifts FOR UPDATE TO anon, authenticated
  USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No client deletes on gifts" ON public.gifts;
CREATE POLICY "No client deletes on gifts"
  ON public.gifts FOR DELETE TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "No client writes to user_roles" ON public.user_roles;
CREATE POLICY "No client writes to user_roles"
  ON public.user_roles FOR INSERT TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client updates to user_roles" ON public.user_roles;
CREATE POLICY "No client updates to user_roles"
  ON public.user_roles FOR UPDATE TO anon, authenticated
  USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "No client deletes on user_roles" ON public.user_roles;
CREATE POLICY "No client deletes on user_roles"
  ON public.user_roles FOR DELETE TO anon, authenticated
  USING (false);

-- Server-validated gift claiming
CREATE OR REPLACE FUNCTION public.claim_gift(_claim_code text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  _gift public.gifts%ROWTYPE;
BEGIN
  IF _uid IS NULL THEN
    RETURN 'needs_auth';
  END IF;

  IF _claim_code IS NULL OR length(btrim(_claim_code)) < 8 OR length(btrim(_claim_code)) > 64 THEN
    RETURN 'error';
  END IF;

  SELECT * INTO _gift FROM public.gifts WHERE claim_code = btrim(_claim_code) LIMIT 1;

  IF NOT FOUND THEN
    RETURN 'error';
  END IF;

  -- Only the intended recipient may claim
  IF _email = '' OR lower(_gift.recipient_email) <> _email THEN
    RETURN 'error';
  END IF;

  IF _gift.status = 'claimed' THEN
    RETURN 'already_claimed';
  END IF;

  IF _gift.status = 'expired' OR (_gift.expires_at IS NOT NULL AND _gift.expires_at < now()) THEN
    UPDATE public.gifts SET status = 'expired' WHERE id = _gift.id AND status <> 'claimed';
    RETURN 'expired';
  END IF;

  IF _gift.status <> 'paid' THEN
    RETURN 'not_paid';
  END IF;

  UPDATE public.gifts
     SET status = 'claimed',
         recipient_user_id = _uid,
         claimed_at = now()
   WHERE id = _gift.id AND status = 'paid';

  IF NOT FOUND THEN
    RETURN 'already_claimed';
  END IF;

  RETURN 'success';
END;
$$;

REVOKE ALL ON FUNCTION public.claim_gift(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_gift(text) TO authenticated;