/**
 * MembershipBadge
 * Small inline indicator of the current membership tier.
 */
import { useMembership } from '@/contexts/MembershipContext';
import type { MembershipTier } from '@/lib/supabase';

const TIER_DISPLAY: Record<MembershipTier, { label: string; color: string }> = {
  free: { label: 'Free', color: 'text-muted-foreground/50 border-border/30' },
  reflective: { label: 'Reflective', color: 'text-gold border-gold/40' },
  insight: { label: 'Insight', color: 'text-accent border-accent/40' },
  practitioner: { label: 'Practitioner', color: 'text-foreground border-foreground/40' },
};

export function MembershipBadge({ className = '' }: { className?: string }) {
  const { tier, loading } = useMembership();
  if (loading) return null;

  const { label, color } = TIER_DISPLAY[tier];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold border ${color} ${className}`}
    >
      {label}
    </span>
  );
}
