# Database Migration Instructions

The following migration files must be applied to the live Supabase project to make
the app fully functional. Apply them **in order** via the Supabase SQL Editor:

**URL:** https://supabase.com/dashboard/project/flrojnnbpankkrouthyz/sql

---

## Step 1 — Fix profiles table (REQUIRED for Settings to work)

Run: `supabase/migrations/20260510000000_fix_profiles_schema.sql`

**What it does:**
- Adds `display_name`, `birth_date`, `birth_time`, `birth_location`, `private_mode`,
  and `data_visibility` columns to the `profiles` table
- Backfills `display_name` from `full_name` for existing rows
- Fixes RLS policies to use `user_id` consistently

---

## Step 2 — Fix subscriptions tier column (REQUIRED for Membership to work)

Run: `supabase/migrations/20260510000001_fix_subscriptions_tier.sql`

**What it does:**
- Adds a `tier` column (`free|reflective|insight|practitioner`) to `subscriptions`
- Sets up the auto-create trigger so new signups get a free subscription row
- Extends the subscription_status enum with `paused` and `incomplete` values

---

## Step 3 — Ensure all app tables exist (REQUIRED for Dashboard/Archive to work)

Run: `supabase/migrations/20260510000002_ensure_app_tables.sql`

**What it does:**
- Adds `ai_synthesis_enabled` to `user_preferences` (if missing)
- Creates `saved_charts`, `user_memories`, `timeline_events`, and `ai_synthesis_cache`
  tables with proper RLS policies (all idempotent — safe to re-run)

---

## Step 4 — Earlier phase migrations (apply if not already done)

If you have not previously applied these migrations, run them in order too:

1. `supabase/migrations/20260509180847_memory_layer.sql`
2. `supabase/migrations/20260509195123_ai_layer.sql`
3. `supabase/migrations/20260509200000_membership_payments.sql`

**Note:** Migration 20260509200000 creates new `subscriptions`, `purchases`,
`digital_products`, and `gifts` tables. If the `subscriptions` table already exists
with the old schema, the `CREATE TABLE` will be skipped (it uses `IF NOT EXISTS`),
but you should verify the `tier` column was added by Step 2 above.

---

## Environment Variables Checklist

Ensure the following are set in your deployment environment (e.g. Vercel/Netlify):

| Variable | Required | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` | ✅ | Supabase anon key |
| `VITE_SITE_URL` | Recommended | e.g. `https://moontuner.xyz` — used for auth redirect URLs |
| `STRIPE_SECRET_KEY` | For payments | Supabase Edge Function secret |
| `STRIPE_WEBHOOK_SECRET` | For payments | Supabase Edge Function secret |

Set Supabase Edge Function secrets via:
```
supabase secrets set STRIPE_SECRET_KEY=sk_live_... STRIPE_WEBHOOK_SECRET=whsec_...
```
