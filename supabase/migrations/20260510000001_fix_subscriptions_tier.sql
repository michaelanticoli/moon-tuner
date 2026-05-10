-- Migration: Add tier column to subscriptions table
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/<your-project-id>/sql
--
-- Context: The app's useSubscription hook reads a .tier field on subscription rows
-- to determine membership level. The earliest migration created subscriptions with
-- subscription_type + status enums but no tier column. This adds it.

-- 1. Add tier column to the existing subscriptions table
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'free'
    CHECK (tier IN ('free', 'reflective', 'insight', 'practitioner'));

-- 2. Backfill: mark existing active one_time subscribers as 'reflective'
UPDATE public.subscriptions
  SET tier = 'reflective'
  WHERE status = 'active'
    AND tier = 'free';

-- 3. Ensure the auto-create function sets tier = 'free' for new signups
CREATE OR REPLACE FUNCTION public.handle_new_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_subscription ON auth.users;
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_subscription();

-- 4. Add paused/incomplete/canceled status values if not already present
-- (The app code expects 'paused' and 'incomplete' but the original enum only had
--  active|canceled|past_due|trialing|inactive. Extend it.)
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'paused';
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'incomplete';
