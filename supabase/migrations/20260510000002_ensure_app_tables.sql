-- Migration: Add user_preferences column ai_synthesis_enabled
-- Run this in the Supabase SQL Editor ONLY if you have not already run
-- supabase/migrations/20260509195123_ai_layer.sql
-- This is idempotent — safe to run even if the column already exists.

ALTER TABLE public.user_preferences
  ADD COLUMN IF NOT EXISTS ai_synthesis_enabled BOOLEAN NOT NULL DEFAULT false;

-- Also ensure the saved_charts table exists (referenced by Dashboard and exportArchive)
CREATE TABLE IF NOT EXISTS public.saved_charts (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chart_name  TEXT        NOT NULL,
  chart_data  JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_charts_user_id   ON public.saved_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_charts_created_at ON public.saved_charts(created_at DESC);

ALTER TABLE public.saved_charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view own charts"
  ON public.saved_charts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert own charts"
  ON public.saved_charts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can delete own charts"
  ON public.saved_charts FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can update own charts"
  ON public.saved_charts FOR UPDATE USING (auth.uid() = user_id);

-- Also ensure user_memories and timeline_events exist
CREATE TABLE IF NOT EXISTS public.user_memories (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type     TEXT        NOT NULL,
  entity_id       TEXT,
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

ALTER TABLE public.user_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view own memories"
  ON public.user_memories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert own memories"
  ON public.user_memories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can delete own memories"
  ON public.user_memories FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.timeline_events (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type      TEXT        NOT NULL,
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

CREATE POLICY IF NOT EXISTS "Users can view own timeline"
  ON public.timeline_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert own timeline events"
  ON public.timeline_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can delete own timeline events"
  ON public.timeline_events FOR DELETE USING (auth.uid() = user_id);

-- ai_synthesis_cache table
CREATE TABLE IF NOT EXISTS public.ai_synthesis_cache (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  synthesis_type  TEXT        NOT NULL,
  result          JSONB       NOT NULL DEFAULT '{}',
  generated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, synthesis_type)
);

CREATE INDEX IF NOT EXISTS idx_ai_synthesis_cache_user_id
  ON public.ai_synthesis_cache(user_id);

ALTER TABLE public.ai_synthesis_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view own synthesis cache"
  ON public.ai_synthesis_cache FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert own synthesis cache"
  ON public.ai_synthesis_cache FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can update own synthesis cache"
  ON public.ai_synthesis_cache FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can delete own synthesis cache"
  ON public.ai_synthesis_cache FOR DELETE USING (auth.uid() = user_id);
