/**
 * Direct Stripe Payment Links — bulletproof, no edge function involved.
 * If a product is null/undefined it is not yet available for sale.
 *
 * Source: Stripe Dashboard → Payment Links (CSV export 2026-04-18) +
 * 2026-05-30 additions for memberships + narration add-on.
 */
export const STRIPE_LINKS = {
  // One-time digital products
  "lunar-arc":         "https://buy.stripe.com/5kQbJ0en87iYfSPfPbe7m03",
  "astro-harmonic":    "https://buy.stripe.com/5kQ00i5QCdHm8qngTfe7m04",
  "cipher-calendar":   "https://buy.stripe.com/6oU3cugvg9r6bCzauRe7m06",
  "phasecraft":        "https://buy.stripe.com/eVqbJ03Iu46M6if1Yle7m07",
  "harmonic-arcana":   "https://buy.stripe.com/3cI5kC3Iu7iY0XVfPbe7m0a",
  "song-doesnt-end":   "https://buy.stripe.com/28E6oG5QC5aQ9ur6eBe7m09",
  "quantumelodic-pro": "https://buy.stripe.com/14A28qgvggTybCz9qNe7m02",
  "lunar-chaperone":   "https://buy.stripe.com/7sY6oG2Eq6eU363eL7e7m08",

  // Recurring memberships
  "membership-reflective":   "https://buy.stripe.com/14A9AS9oOaEWgPd3o52Ji05",
  "membership-insight":      "https://buy.stripe.com/4gM14m8kKfZg1Uj9Mt2Ji06",
  "membership-practitioner": "https://buy.stripe.com/3cIdR8fNcfZgcyXf6N2Ji07",

  // Add-on
  "narration-addon":   "https://buy.stripe.com/4gMbJ0dF47sKbuTgaR2Ji08",
} as const;

export type StripeProductKey = keyof typeof STRIPE_LINKS;

/**
 * Open a Stripe Payment Link directly. Same-tab redirect (most reliable
 * across mobile Safari + popup blockers). Returns false if not available.
 */
export function openStripeCheckout(product: StripeProductKey): boolean {
  const url = STRIPE_LINKS[product];
  if (!url) return false;
  window.location.href = url;
  return true;
}
