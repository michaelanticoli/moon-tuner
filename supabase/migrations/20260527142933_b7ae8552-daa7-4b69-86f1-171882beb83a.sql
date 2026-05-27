DROP POLICY IF EXISTS "Anyone can read natal reports" ON public.natal_reports;
DROP POLICY IF EXISTS "Anyone can read narrations by session id" ON public.report_narrations;

REVOKE SELECT ON public.natal_reports FROM anon, authenticated;
REVOKE SELECT ON public.report_narrations FROM anon, authenticated;

GRANT ALL ON public.natal_reports TO service_role;
GRANT ALL ON public.report_narrations TO service_role;

CREATE POLICY "Service role manages natal_reports"
  ON public.natal_reports FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role manages report_narrations"
  ON public.report_narrations FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');