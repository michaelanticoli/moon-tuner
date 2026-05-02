-- Storage bucket for symphony deliverables (MP3, PDF, chart PNG)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cosmic-reports', 'cosmic-reports', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read so streaming/download works without signed URLs
CREATE POLICY "Cosmic reports are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'cosmic-reports');

-- Reports lookup table
CREATE TABLE public.natal_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  birth_date DATE NOT NULL,
  birth_time TEXT,
  birth_location TEXT,
  sun_sign TEXT,
  moon_sign TEXT,
  ascendant TEXT,
  audio_url TEXT,
  pdf_url TEXT,
  chart_image_url TEXT,
  audio_status TEXT NOT NULL DEFAULT 'pending',
  pdf_status TEXT NOT NULL DEFAULT 'pending',
  chart_status TEXT NOT NULL DEFAULT 'pending',
  eleven_labs_prompt TEXT,
  chart_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_natal_reports_email ON public.natal_reports (lower(email));
CREATE INDEX idx_natal_reports_created_at ON public.natal_reports (created_at DESC);

ALTER TABLE public.natal_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read reports (lookup is by email which they must already know)
CREATE POLICY "Anyone can read natal reports"
ON public.natal_reports FOR SELECT
USING (true);

CREATE TRIGGER update_natal_reports_updated_at
BEFORE UPDATE ON public.natal_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();