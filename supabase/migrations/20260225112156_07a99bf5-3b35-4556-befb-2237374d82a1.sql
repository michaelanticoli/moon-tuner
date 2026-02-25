
-- Create lunar_datapoints table for astronomical research facts
CREATE TABLE public.lunar_datapoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  datapoint text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  cardinal_values text,
  relevance real DEFAULT 0.5,
  source_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lunar_datapoints ENABLE ROW LEVEL SECURITY;

-- Public read-only access (reference data)
CREATE POLICY "Anyone can read lunar datapoints"
  ON public.lunar_datapoints
  FOR SELECT
  USING (true);

-- Create index on category for filtered queries
CREATE INDEX idx_lunar_datapoints_category ON public.lunar_datapoints(category);
CREATE INDEX idx_lunar_datapoints_relevance ON public.lunar_datapoints(relevance DESC);
