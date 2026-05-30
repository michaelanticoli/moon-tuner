
-- Extend subscription_status enum
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'paused';
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'incomplete';

-- Extend subscriptions
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'free'
    CHECK (tier IN ('free', 'reflective', 'insight', 'practitioner')),
  ADD COLUMN IF NOT EXISTS stripe_price_id TEXT,
  ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS paused_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMPTZ;

-- Service role manage policy
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscriptions;
CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Purchases
CREATE TABLE IF NOT EXISTS public.purchases (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_type             TEXT NOT NULL CHECK (product_type IN ('report','digital_good','workbook','ambient_pack','bundle')),
  product_id               TEXT NOT NULL,
  product_label            TEXT,
  amount_cents             INTEGER NOT NULL,
  currency                 TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id        TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status                   TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','refunded','failed')),
  metadata                 JSONB NOT NULL DEFAULT '{}',
  fulfilled_at             TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(user_id, created_at DESC);
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;
CREATE POLICY "Users can view own purchases" ON public.purchases FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Service role can manage purchases" ON public.purchases;
CREATE POLICY "Service role can manage purchases" ON public.purchases FOR ALL
  USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Digital products catalog
CREATE TABLE IF NOT EXISTS public.digital_products (
  id              TEXT PRIMARY KEY,
  label           TEXT NOT NULL,
  description     TEXT,
  product_type    TEXT NOT NULL CHECK (product_type IN ('workbook','ambient_pack','report_bundle','seasonal','reflection_collection')),
  amount_cents    INTEGER NOT NULL,
  stripe_product_id TEXT,
  download_url    TEXT,
  preview_url     TEXT,
  cover_image_url TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  is_limited      BOOLEAN NOT NULL DEFAULT false,
  available_until TIMESTAMPTZ,
  min_tier        TEXT NOT NULL DEFAULT 'free' CHECK (min_tier IN ('free','reflective','insight','practitioner')),
  metadata        JSONB NOT NULL DEFAULT '{}',
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can browse active digital products" ON public.digital_products;
CREATE POLICY "Anyone can browse active digital products"
  ON public.digital_products FOR SELECT USING (is_active = true);

INSERT INTO public.digital_products (id, label, description, product_type, amount_cents, min_tier, sort_order) VALUES
  ('lunar-workbook-vol-1', 'Lunar Workbook Vol. 1', 'A structured 30-day reflective workbook built around the lunar cycle.', 'workbook', 1500, 'free', 10),
  ('lunar-workbook-vol-2', 'Lunar Workbook Vol. 2', 'Deepening the practice. Emotional pattern mapping across four cycles.', 'workbook', 1500, 'free', 20),
  ('ambient-pack-waning', 'Waning Moon Ambient Pack', 'Four soundscapes for the waning and release phases.', 'ambient_pack', 900, 'free', 30),
  ('ambient-pack-new', 'New Moon Ambient Pack', 'Four soundscapes for intention and beginnings.', 'ambient_pack', 900, 'free', 40),
  ('seasonal-winter-2026', 'Winter Solstice Reflection 2026', 'A ceremonial collection for the 2026 winter turning.', 'seasonal', 2400, 'free', 50),
  ('reflection-bundle-year1', 'Year One Reflection Collection', 'Your first year of reflections, archived and formatted.', 'reflection_collection', 3500, 'reflective', 60)
ON CONFLICT (id) DO NOTHING;

-- Gifts
CREATE TABLE IF NOT EXISTS public.gifts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_email   TEXT NOT NULL,
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  gift_type         TEXT NOT NULL CHECK (gift_type IN ('membership_1month','membership_3month','membership_6month','report','digital_good')),
  product_id        TEXT,
  tier              TEXT CHECK (tier IN ('reflective','insight','practitioner')),
  message           TEXT,
  stripe_session_id TEXT UNIQUE,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','claimed','expired')),
  claim_code        TEXT UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 16),
  claimed_at        TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_gifts_recipient_email ON public.gifts(recipient_email);
CREATE INDEX IF NOT EXISTS idx_gifts_claim_code ON public.gifts(claim_code);
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Senders can view gifts they sent" ON public.gifts;
CREATE POLICY "Senders can view gifts they sent" ON public.gifts FOR SELECT USING (auth.uid() = sender_user_id);
DROP POLICY IF EXISTS "Recipients can view gifts sent to them" ON public.gifts;
CREATE POLICY "Recipients can view gifts sent to them" ON public.gifts FOR SELECT USING (auth.uid() = recipient_user_id);
DROP POLICY IF EXISTS "Service role can manage gifts" ON public.gifts;
CREATE POLICY "Service role can manage gifts" ON public.gifts FOR ALL
  USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Helper
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(email_input TEXT)
RETURNS TABLE(id UUID)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth AS $$
BEGIN
  RETURN QUERY SELECT u.id FROM auth.users u WHERE u.email = email_input LIMIT 1;
END;
$$;
REVOKE ALL ON FUNCTION public.get_user_id_by_email(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_id_by_email(TEXT) TO service_role;
