-- Allow public read access to data-files bucket
CREATE POLICY "Public read access for data-files"
ON storage.objects FOR SELECT
USING (bucket_id = 'data-files');