
-- Replace email-match policies with auth.jwt() email (authoritative from token)

-- natal_reports
DROP POLICY IF EXISTS "Users can view their own natal reports" ON public.natal_reports;
CREATE POLICY "Users can view their own natal reports"
ON public.natal_reports
FOR SELECT
TO authenticated
USING (lower(email) = lower((auth.jwt() ->> 'email')));

-- report_narrations
DROP POLICY IF EXISTS "Users can view their own report narrations" ON public.report_narrations;
CREATE POLICY "Users can view their own report narrations"
ON public.report_narrations
FOR SELECT
TO authenticated
USING (email IS NOT NULL AND lower(email) = lower((auth.jwt() ->> 'email')));

-- gifts: tighten recipient visibility to verified token email OR linked user id
DROP POLICY IF EXISTS "Recipients can view gifts sent to them" ON public.gifts;
CREATE POLICY "Recipients can view gifts sent to them"
ON public.gifts
FOR SELECT
TO authenticated
USING (
  auth.uid() = recipient_user_id
  OR lower(recipient_email) = lower((auth.jwt() ->> 'email'))
);

-- Ensure anon has no access to these tables (revoke defensively)
REVOKE ALL ON public.natal_reports FROM anon;
REVOKE ALL ON public.report_narrations FROM anon;
REVOKE ALL ON public.gifts FROM anon;
