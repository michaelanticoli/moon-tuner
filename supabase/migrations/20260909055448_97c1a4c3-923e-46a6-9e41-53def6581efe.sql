CREATE TABLE public.program_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  start_step integer NOT NULL DEFAULT 1,
  current_step integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.program_members TO authenticated;
GRANT ALL ON public.program_members TO service_role;
ALTER TABLE public.program_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members manage their own program row" ON public.program_members
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_program_members_updated_at BEFORE UPDATE ON public.program_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.program_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workbook_n text NOT NULL,
  source text NOT NULL DEFAULT 'purchase',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, workbook_n)
);
GRANT SELECT, INSERT ON public.program_entitlements TO authenticated;
GRANT ALL ON public.program_entitlements TO service_role;
ALTER TABLE public.program_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view their own entitlements" ON public.program_entitlements
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users add their own entitlements" ON public.program_entitlements
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.school_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number integer NOT NULL,
  lesson_slug text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_slug)
);
GRANT SELECT, INSERT, DELETE ON public.school_progress TO authenticated;
GRANT ALL ON public.school_progress TO service_role;
ALTER TABLE public.school_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage their own progress" ON public.school_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.rite_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  asset text NOT NULL,
  action text NOT NULL DEFAULT 'download',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rite_downloads TO anon, authenticated;
GRANT SELECT ON public.rite_downloads TO authenticated;
GRANT ALL ON public.rite_downloads TO service_role;
ALTER TABLE public.rite_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a rite download" ON public.rite_downloads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
    AND length(slug) BETWEEN 1 AND 120
    AND length(asset) BETWEEN 1 AND 300
    AND action IN ('download','view')
  );
CREATE POLICY "Admins read rite downloads" ON public.rite_downloads
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_rite_downloads_slug_created ON public.rite_downloads (slug, created_at DESC);