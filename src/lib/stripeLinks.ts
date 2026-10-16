/**
 * Direct Stripe Payment Links — bulletproof, no edge function involved.
 * If a product is null/undefined it is not yet available for sale.
 *
 * Accounts
 *  - MOONTUNER INC. (links ending in `e7m0x`): the verified, monitored account.
 *    Every one-time product below lives here, and each link carries
 *    `metadata.product` (copied onto the Checkout Session) so purchases can be
 *    reconciled to the `purchases` table.
 *  - Legacy account (links ending in `2Ji0x`): memberships + narration add-on.
 *    Left as-is because tier/narration fulfilment is verified server-side with
 *    that account's keys. Move them once the webhook + secrets are migrated.
 *
 * Updated 2026-10-12 (operator): moontuner.xyz is live on Netlify; one-time
 * products repointed to MOONTUNER INC. with redirects back to moontuner.xyz.
 */
export const STRIPE_LINKS = {
  // ── One-time digital products · MOONTUNER INC. ────────────────────────────
  // Lunar Arc Report $25 → moontuner.xyz/lunar-reports?paid=true
  "lunar-arc":         "https://buy.stripe.com/6oU3cubaW8n2cGD32pe7m0j",
  // Astro-Harmonic Natal Analysis $19 → moontuner.xyz/quantumelodic?paid=true
  "astro-harmonic":    "https://buy.stripe.com/3cI5kC5QCdHmgWT32pe7m0l",
  // Lunar Cipher Calendar, pay what you can ($20 suggested) → moontuner.xyz/lunar-cipher
  "cipher-calendar":   "https://buy.stripe.com/6oU3cugvg9r6bCzauRe7m06",
  // Academy of Phasecraft $17/mo → moontuner.xyz/school/portal
  "phasecraft":        "https://buy.stripe.com/eVqbJ03Iu46M6if1Yle7m07",
  // Lunar Chaperone lifetime $97 → hosted confirmation; access granted to the
  // buyer's account (matched by client_reference_id, then email) within 24h.
  "lunar-chaperone":   "https://buy.stripe.com/7sY6oG2Eq6eU363eL7e7m08",

  // ── Recurring memberships · legacy account ────────────────────────────────
  "membership-reflective":   "https://buy.stripe.com/14A9AS9oOaEWgPd3o52Ji05",
  "membership-insight":      "https://buy.stripe.com/4gM14m8kKfZg1Uj9Mt2Ji06",
  "membership-practitioner": "https://buy.stripe.com/3cIdR8fNcfZgcyXf6N2Ji07",

  // ── Add-on · legacy account ───────────────────────────────────────────────
  "narration-addon":   "https://buy.stripe.com/4gMbJ0dF47sKbuTgaR2Ji08",
} as const;

export type StripeProductKey = keyof typeof STRIPE_LINKS;

/** Stripe accepts alphanumerics, dashes and underscores, up to 200 chars. */
const CLIENT_REFERENCE_ID = /^[A-Za-z0-9_-]{1,200}$/;

/**
 * Best-effort read of the signed-in buyer from the persisted Supabase session
 * (default storage key `sb-<project-ref>-auth-token`). Synchronous on purpose so
 * checkout stays a same-tick redirect. Any failure simply means no prefill.
 */
function currentBuyer(): { email?: string; id?: string } {
  try {
    if (typeof window === "undefined") return {};
    const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    if (!base) return {};
    const ref = new URL(base).hostname.split(".")[0];
    const raw = window.localStorage.getItem(`sb-${ref}-auth-token`);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const user = parsed?.user ?? parsed?.currentSession?.user;
    return {
      email: typeof user?.email === "string" ? user.email : undefined,
      id: typeof user?.id === "string" ? user.id : undefined,
    };
  } catch {
    return {};
  }
}

/**
 * Build the checkout URL for a product. When a buyer is signed in, the email is
 * prefilled and their user id is attached as `client_reference_id`, so the
 * purchase can be matched to their account even if they pay with another email.
 */
export function buildCheckoutUrl(product: StripeProductKey): string | null {
  const base = STRIPE_LINKS[product];
  if (!base) return null;
  try {
    const url = new URL(base);
    const { email, id } = currentBuyer();
    if (email) url.searchParams.set("prefilled_email", email);
    if (id && CLIENT_REFERENCE_ID.test(id)) url.searchParams.set("client_reference_id", id);
    return url.toString();
  } catch {
    return base;
  }
}

/**
 * Open a Stripe Payment Link directly. Same-tab redirect (most reliable
 * across mobile Safari + popup blockers). Returns false if not available.
 */
export function openStripeCheckout(product: StripeProductKey): boolean {
  const url = buildCheckoutUrl(product);
  if (!url) return false;
  window.location.href = url;
  return true;
}
