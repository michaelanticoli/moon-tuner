CREATE TABLE public.report_narrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  report_type TEXT NOT NULL,
  report_label TEXT,
  audio_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  email TEXT,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_narrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read narrations by session id"
  ON public.report_narrations FOR SELECT
  USING (true);

CREATE TRIGGER update_report_narrations_updated_at
  BEFORE UPDATE ON public.report_narrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();