-- Newsletter lifecycle fields used by the MOONtuner Operator (welcome sweep,
-- email-provider sync, unsubscribes). Idempotent.
alter table public.newsletter_subscribers add column if not exists welcomed_at timestamptz;
alter table public.newsletter_subscribers add column if not exists unsubscribed_at timestamptz;
alter table public.newsletter_subscribers add column if not exists esp_synced_at timestamptz;
