/**
 * Direct Stripe Payment Links — bulletproof, no edge function involved.
 * If a product is null/undefined it is not yet available for sale.
 *
 * Source: Stripe Dashboard → Payment Links (CSV export 2026-04-18) +
 * 2026-05-30 additions for memberships + narration add-on.
 */
export const STRIPE_LINKS = {
  // One-time digital products — moontuner Stripe account, each redirects to /<product>?paid=true
  "lunar-arc":         "https://buy.stripe.com/00w8wO44u4gy9mL4s92Ji0a",
  // Astro-Harmonic — moontuner Stripe account, redirects to /quantumelodic?paid=true
  "astro-harmonic":    "https://buy.stripe.com/aFa3cucB09AS7eD6Ah2Ji09",
  "cipher-calendar":   "https://buy.stripe.com/4gM7sKfNc00i0Qf9Mt2Ji0b",
  "phasecraft":        "https://buy.stripe.com/00waEW44ufZg8iH8Ip2Ji0c",
  // Not yet recreated in moontuner account — still on legacy Quantumelodies account
  "harmonic-arcana":   "https://buy.stripe.com/3cI5kC3Iu7iY0XVfPbe7m0a",
  "song-doesnt-end":   "https://buy.stripe.com/28E6oG5QC5aQ9ur6eBe7m09",
  "quantumelodic-pro": "https://buy.stripe.com/14A28qgvggTybCz9qNe7m02",
  "lunar-chaperone":   "https://buy.stripe.com/eVq4gy8kKaEWfL9e2J2Ji0d",


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
