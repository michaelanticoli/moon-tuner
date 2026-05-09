-- Memory Layer Migration
-- Adds ecosystem memory tables and privacy controls to support
-- longitudinal continuity across directives, reflections, reports,
-- rituals, harmonic profiles, spacetime proposals, and workbook progress.

-- ─── user_memories ────────────────────────────────────────────────────────────
-- Lightweight event log connecting every user action to its lunar context.
CREATE TABLE IF NOT EXISTS public.user_memories (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type     TEXT        NOT NULL,   -- 'directive' | 'reflection' | 'proposal' | 'report' | 'ritual' | 'workbook' | 'chart' | 'harmonic_profile' | 'spacetime'
  entity_id       TEXT,                   -- external reference (slug, id, etc.)
  title           TEXT,
  emotional_theme TEXT,
  lunar_phase     TEXT,
  lunar_phase_pct DECIMAL(5,2),
  metadata        JSONB       NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_memories_user_id
  ON public.user_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memories_entity_type
  ON public.user_memories(user_id, entity_type);
CREATE INDEX IF NOT EXISTS idx_user_memories_created_at
  ON public.user_memories(user_id, created_at DESC);

ALTER TABLE public.user_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memories"
  ON public.user_memories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memories"
  ON public.user_memories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own memories"
  ON public.user_memories FOR DELETE
  USING (auth.uid() = user_id);

-- ─── timeline_events ─────────────────────────────────────────────────────────
-- Curated longitudinal record surfaced in the Archive / Timeline view.
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type      TEXT        NOT NULL,   -- 'directive_view' | 'reflection_write' | 'proposal_submit' | 'report_purchase' | 'ritual' | 'workbook_progress' | 'chart_saved'
  title           TEXT        NOT NULL,
  description     TEXT,
  emotional_theme TEXT,
  lunar_phase     TEXT,
  lunar_phase_pct DECIMAL(5,2),
  metadata        JSONB       NOT NULL DEFAULT '{}',
  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timeline_events_user_id
  ON public.timeline_events(user_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_occurred_at
  ON public.timeline_events(user_id, occurred_at DESC);

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own timeline"
  ON public.timeline_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own timeline events"
  ON public.timeline_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own timeline events"
  ON public.timeline_events FOR DELETE
  USING (auth.uid() = user_id);

-- ─── profiles: privacy columns ───────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS private_mode      BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS data_visibility   JSONB   NOT NULL DEFAULT '{"timeline":"private","reflections":"private","rituals":"private"}';
