-- AI Layer Migration
-- Adds AI synthesis preference to user_preferences and a lightweight
-- synthesis cache table for storing generated insights.

-- ─── user_preferences: AI synthesis opt-in ───────────────────────────────────
ALTER TABLE public.user_preferences
  ADD COLUMN IF NOT EXISTS ai_synthesis_enabled BOOLEAN NOT NULL DEFAULT false;

-- ─── ai_synthesis_cache ───────────────────────────────────────────────────────
-- Stores the most recent synthesis result per user per synthesis type.
-- TTL is managed at the application layer (stale after 24 hours).
CREATE TABLE IF NOT EXISTS public.ai_synthesis_cache (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  synthesis_type  TEXT        NOT NULL,   -- 'reflective' | 'journal' | 'recommendations'
  result          JSONB       NOT NULL DEFAULT '{}',
  generated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, synthesis_type)
);

CREATE INDEX IF NOT EXISTS idx_ai_synthesis_cache_user_id
  ON public.ai_synthesis_cache(user_id);

ALTER TABLE public.ai_synthesis_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own synthesis cache"
  ON public.ai_synthesis_cache FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own synthesis cache"
  ON public.ai_synthesis_cache FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own synthesis cache"
  ON public.ai_synthesis_cache FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own synthesis cache"
  ON public.ai_synthesis_cache FOR DELETE
  USING (auth.uid() = user_id);
