-- Membership, Payments & Value Exchange Architecture
-- Supports: subscription tiers, one-off purchases, digital products, gifting

-- ─── subscriptions ────────────────────────────────────────────────────────────
-- One row per user; tier/status updated via Stripe webhooks.
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier                   TEXT        NOT NULL DEFAULT 'free'
                           CHECK (tier IN ('free', 'reflective', 'insight', 'practitioner')),
  status                 TEXT        NOT NULL DEFAULT 'active'
                           CHECK (status IN ('active', 'trialing', 'paused', 'past_due', 'canceled', 'incomplete')),
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT        UNIQUE,
  stripe_price_id        TEXT,
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN     NOT NULL DEFAULT false,
  paused_at              TIMESTAMPTZ,
  canceled_at            TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON public.subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer
  ON public.subscriptions(stripe_customer_id);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only service-role / webhooks may write subscription rows
CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create a free subscription row when a new user signs up
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

-- ─── purchases ────────────────────────────────────────────────────────────────
-- One-off report purchases, digital goods, workbook buys.
CREATE TABLE IF NOT EXISTS public.purchases (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  product_type             TEXT        NOT NULL
                             CHECK (product_type IN ('report', 'digital_good', 'workbook', 'ambient_pack', 'bundle')),
  product_id               TEXT        NOT NULL,
  product_label            TEXT,
  amount_cents             INTEGER     NOT NULL,
  currency                 TEXT        NOT NULL DEFAULT 'usd',
  stripe_session_id        TEXT        UNIQUE,
  stripe_payment_intent_id TEXT,
  status                   TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'completed', 'refunded', 'failed')),
  metadata                 JSONB       NOT NULL DEFAULT '{}',
  fulfilled_at             TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id
  ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at
  ON public.purchases(user_id, created_at DESC);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage purchases"
  ON public.purchases FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ─── digital_products ─────────────────────────────────────────────────────────
-- Catalog of downloadable / purchasable goods.
CREATE TABLE IF NOT EXISTS public.digital_products (
  id              TEXT        PRIMARY KEY,   -- e.g. 'workbook-vol-1', 'ambient-pack-autumn'
  label           TEXT        NOT NULL,
  description     TEXT,
  product_type    TEXT        NOT NULL
                    CHECK (product_type IN ('workbook', 'ambient_pack', 'report_bundle', 'seasonal', 'reflection_collection')),
  amount_cents    INTEGER     NOT NULL,
  stripe_product_id TEXT,
  download_url    TEXT,
  preview_url     TEXT,
  cover_image_url TEXT,
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  is_limited      BOOLEAN     NOT NULL DEFAULT false,
  available_until TIMESTAMPTZ,
  min_tier        TEXT        NOT NULL DEFAULT 'free'
                    CHECK (min_tier IN ('free', 'reflective', 'insight', 'practitioner')),
  metadata        JSONB       NOT NULL DEFAULT '{}',
  sort_order      INTEGER     NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can browse active digital products"
  ON public.digital_products FOR SELECT
  USING (is_active = true);

-- ─── gifts ────────────────────────────────────────────────────────────────────
-- Gifting memberships and reports to others.
CREATE TABLE IF NOT EXISTS public.gifts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_email   TEXT        NOT NULL,
  recipient_user_id UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  gift_type         TEXT        NOT NULL
                      CHECK (gift_type IN ('membership_1month', 'membership_3month', 'membership_6month', 'report', 'digital_good')),
  product_id        TEXT,       -- for report / digital_good gifts
  tier              TEXT        CHECK (tier IN ('reflective', 'insight', 'practitioner')),
  message           TEXT,
  stripe_session_id TEXT        UNIQUE,
  status            TEXT        NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'paid', 'claimed', 'expired')),
  claim_code        TEXT        UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 16),
  claimed_at        TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gifts_recipient_email
  ON public.gifts(recipient_email);
CREATE INDEX IF NOT EXISTS idx_gifts_claim_code
  ON public.gifts(claim_code);

ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Senders can view gifts they sent"
  ON public.gifts FOR SELECT
  USING (auth.uid() = sender_user_id);

CREATE POLICY "Recipients can view gifts sent to them"
  ON public.gifts FOR SELECT
  USING (auth.uid() = recipient_user_id);

CREATE POLICY "Service role can manage gifts"
  ON public.gifts FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ─── seed digital products catalog ───────────────────────────────────────────
INSERT INTO public.digital_products (id, label, description, product_type, amount_cents, min_tier, sort_order)
VALUES
  ('lunar-workbook-vol-1', 'Lunar Workbook Vol. 1', 'A structured 30-day reflective workbook built around the lunar cycle. Printable PDF.', 'workbook', 1500, 'free', 10),
  ('lunar-workbook-vol-2', 'Lunar Workbook Vol. 2', 'Deepening the practice. Emotional pattern mapping across four cycles.', 'workbook', 1500, 'free', 20),
  ('ambient-pack-waning', 'Waning Moon Ambient Pack', 'Four soundscapes for the waning and release phases of the lunar cycle.', 'ambient_pack', 900, 'free', 30),
  ('ambient-pack-new', 'New Moon Ambient Pack', 'Four soundscapes for intention and beginnings. Silence-forward compositions.', 'ambient_pack', 900, 'free', 40),
  ('seasonal-winter-2026', 'Winter Solstice Reflection 2026', 'A ceremonial collection of lunar reflections, directives, and a guided workbook for the 2026 winter turning.', 'seasonal', 2400, 'free', 50),
  ('reflection-bundle-year1', 'Year One Reflection Collection', 'Your first year of reflections, archived and formatted as a printable personal document. Requires 12+ months of journal entries.', 'reflection_collection', 3500, 'reflective', 60)
ON CONFLICT (id) DO NOTHING;
