
-- Add explicit deny-all policy to satisfy linter (all access via service role in edge function)
CREATE POLICY "No direct client access to telegram_users"
  ON public.telegram_users
  FOR ALL
  USING (false)
  WITH CHECK (false);
