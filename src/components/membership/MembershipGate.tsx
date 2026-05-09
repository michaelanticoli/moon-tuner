/**
 * MembershipGate
 *
 * Wraps content that requires a minimum membership tier.
 *
 * mode="soft"  → renders a dimmed preview with an overlay invite (default)
 * mode="hard"  → renders nothing; shows only the invite panel
 * mode="silent" → renders nothing, no UI
 */
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMembership } from '@/contexts/MembershipContext';
import type { MembershipTier } from '@/lib/supabase';

interface MembershipGateProps {
  requiredTier: MembershipTier;
  mode?: 'soft' | 'hard' | 'silent';
  /** Custom label for the invite CTA */
  ctaLabel?: string;
  /** Short note shown in the invite overlay */
  note?: string;
  children: ReactNode;
}

const TIER_LABELS: Record<MembershipTier, string> = {
  free: 'Free',
  reflective: 'Reflective Membership',
  insight: 'Premium Insight Layer',
  practitioner: 'Practitioner Archive',
};

export function MembershipGate({
  requiredTier,
  mode = 'soft',
  ctaLabel,
  note,
  children,
}: MembershipGateProps) {
  const { can, loading } = useMembership();

  if (loading) return null;
  if (can(requiredTier)) return <>{children}</>;
  if (mode === 'silent') return null;

  const label = ctaLabel ?? 'Deepen Your Archive';
  const tierLabel = TIER_LABELS[requiredTier];
  const gateNote =
    note ?? `This area is part of the ${tierLabel}. Continue your practice to access it.`;

  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-inherit px-8 text-center"
    >
      <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50 font-bold mb-5">
        {tierLabel}
      </span>
      <p className="font-serif text-xl text-foreground font-light leading-relaxed mb-6 max-w-sm">
        {gateNote}
      </p>
      <Link
        to="/membership"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
      >
        {label}
      </Link>
    </motion.div>
  );

  if (mode === 'hard') {
    return (
      <div className="relative min-h-[200px] rounded-2xl border border-border/30">
        {overlay}
      </div>
    );
  }

  // mode === 'soft': dimmed preview + overlay
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="opacity-20 pointer-events-none select-none blur-[2px]">
        {children}
      </div>
      {overlay}
    </div>
  );
}
