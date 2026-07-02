
-- Owner-scoped SELECT for natal_reports (match by email in profiles)
CREATE POLICY "Users can view their own natal reports"
ON public.natal_reports
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM public.profiles WHERE user_id = auth.uid()));

-- Owner-scoped SELECT for report_narrations
CREATE POLICY "Users can view their own report narrations"
ON public.report_narrations
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM public.profiles WHERE user_id = auth.uid()));

-- Storage: restrict writes on cosmic-reports and data-files to service_role only
CREATE POLICY "Service role can insert cosmic-reports"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'cosmic-reports');

CREATE POLICY "Service role can update cosmic-reports"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'cosmic-reports')
WITH CHECK (bucket_id = 'cosmic-reports');

CREATE POLICY "Service role can delete cosmic-reports"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'cosmic-reports');

CREATE POLICY "Service role can insert data-files"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'data-files');

CREATE POLICY "Service role can update data-files"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'data-files')
WITH CHECK (bucket_id = 'data-files');

CREATE POLICY "Service role can delete data-files"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'data-files');
