ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS birth_date DATE,
  ADD COLUMN IF NOT EXISTS birth_time TIME,
  ADD COLUMN IF NOT EXISTS birth_location TEXT,
  ADD COLUMN IF NOT EXISTS private_mode BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS data_visibility JSONB NOT NULL DEFAULT '{"timeline":"private","reflections":"private","rituals":"private"}'::jsonb;

UPDATE public.profiles
SET display_name = full_name
WHERE display_name IS NULL AND full_name IS NOT NULL;

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
GRANT SELECT, INSERT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

CREATE OR REPLACE FUNCTION public.ensure_user_profile()
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _profile public.profiles;
  _user_id uuid := auth.uid();
  _email text := auth.email();
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication is required';
  END IF;

  INSERT INTO public.profiles (user_id, email)
  VALUES (_user_id, COALESCE(_email, 'unknown@example.invalid'))
  ON CONFLICT (user_id) DO UPDATE
    SET email = COALESCE(EXCLUDED.email, public.profiles.email),
        updated_at = now()
  RETURNING * INTO _profile;

  RETURN _profile;
END;
$$;

GRANT EXECUTE ON FUNCTION public.ensure_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_user_profile() TO service_role;