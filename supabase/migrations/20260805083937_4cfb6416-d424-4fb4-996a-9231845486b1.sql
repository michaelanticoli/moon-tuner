CREATE TABLE public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

GRANT INSERT ON public.subscribers TO anon, authenticated;
GRANT ALL ON public.subscribers TO service_role;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe with a valid email"
ON public.subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 254
  AND email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
);

CREATE POLICY "No direct read access to subscribers"
ON public.subscribers
FOR SELECT
USING (false);
