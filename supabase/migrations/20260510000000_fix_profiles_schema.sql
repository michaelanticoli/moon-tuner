-- Migration: Fix profiles table schema
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/<your-project-id>/sql
--
-- Context: The earliest migration created profiles with user_id + full_name.
-- The app code expects id = auth.users.id, display_name, birth_date, birth_time,
-- birth_location, and private_mode columns. This migration reconciles the two.

-- 1. Add display_name as an alias for full_name (keep full_name for backwards compat)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Backfill display_name from full_name where it exists
UPDATE public.profiles SET display_name = full_name WHERE display_name IS NULL AND full_name IS NOT NULL;

-- 2. Add birth data columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birth_date    DATE,
  ADD COLUMN IF NOT EXISTS birth_time    TIME,
  ADD COLUMN IF NOT EXISTS birth_location TEXT;

-- 3. Add privacy columns (also added by memory_layer migration — safe to re-run)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS private_mode      BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS data_visibility   JSONB   NOT NULL DEFAULT '{"timeline":"private","reflections":"private","rituals":"private"}';

-- 4. Update the handle_new_user trigger to populate user_id correctly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Add RLS policies for update on the correct column
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);
