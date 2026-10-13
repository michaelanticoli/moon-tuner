/**
 * Membership tier helpers with no Supabase dependency, so startup code can
 * use them without pulling the Supabase client into the first bundle.
 * Re-exported from "@/lib/supabase" for existing callers.
 */
export type MembershipTier = "free" | "reflective" | "insight" | "practitioner";

// Tier hierarchy — higher index = more access
export const TIER_RANK: Record<MembershipTier, number> = {
  free: 0,
  reflective: 1,
  insight: 2,
  practitioner: 3,
};

/** Returns true if the user's tier meets or exceeds the required tier */
export function hasAccess(userTier: MembershipTier, requiredTier: MembershipTier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier];
}
