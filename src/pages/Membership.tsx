import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useMembership } from '@/contexts/MembershipContext';
import { useAuth } from '@/contexts/AuthContext';
import type { MembershipTier } from '@/lib/supabase';

// ─── Tier definitions ─────────────────────────────────────────────────────────

interface TierDef {
  id: Exclude<MembershipTier, 'free'>;
  label: string;
  tagline: string;
  price: string;
  period: string;
  cta: string;
  features: string[];
  accent: string;
}

const TIERS: TierDef[] = [
  {
    id: 'reflective',
    label: 'Reflective',
    tagline: 'A continuous practice, preserved.',
    price: '$12',
    period: 'per month',
    cta: 'Continue Your Archive',
    features: [
      'Saved directives & proposal archive',
      'Journal continuity across sessions',
      'Advanced reflections',
      'Emotional pattern tracking',
      'Monthly reflective reports',
      'Enhanced Digital Smudging rituals',
    ],
    accent: 'border-gold/30 hover:border-gold/60',
  },
  {
    id: 'insight',
    label: 'Insight',
    tagline: 'Deeper synthesis. Longer memory.',
    price: '$24',
    period: 'per month',
    cta: 'Expand Your Record',
    features: [
      'Everything in Reflective',
      'AI-assisted synthesis & analysis',
      'Advanced longitudinal insight reports',
      'Recurring timing reports',
      'Deep archive access',
      'Creative rhythm mapping',
      'Expanded workbook ecosystem',
    ],
    accent: 'border-accent/30 hover:border-accent/60',
  },
  {
    id: 'practitioner',
    label: 'Practitioner',
    tagline: 'Your full archive. Your ongoing record.',
    price: '$48',
    period: 'per month',
    cta: 'Deepen Reflection',
    features: [
      'Everything in Insight',
      'Advanced reflection & research tools',
      'Exportable personal datasets',
      'Advanced AI synthesis',
      'Extended timeline memory',
      'Private ambient spaces',
      'Future collaborative features',
    ],
    accent: 'border-foreground/20 hover:border-foreground/50',
  },
];

// ─── Free tier features ───────────────────────────────────────────────────────

const FREE_FEATURES = [
  "Today's Directive",
  'Limited journal access',
  'Basic emotional weather',
  'Occasional reflections',
  'Lightweight proposal storage',
  'Limited Digital Smudging access',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Membership() {
  const [searchParams] = useSearchParams();
  const welcomeTier = searchParams.get('welcome') as MembershipTier | null;
  const { tier: currentTier, can, startCheckout, redirecting, loading } = useMembership();
  const { user } = useAuth();
  const [checkoutTier, setCheckoutTier] = useState<string | null>(null);

  const handleCheckout = async (tierId: Exclude<MembershipTier, 'free'>) => {
    if (!user) {
      window.location.href = '/auth?redirect=/membership';
      return;
    }
    setCheckoutTier(tierId);
    await startCheckout(tierId);
    setCheckoutTier(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-32">

          {/* ── Welcome back banner ─────────────────────────────────── */}
          {welcomeTier && welcomeTier !== 'free' && (
            <div className="border-b border-border/30 bg-accent/5">
              <div className="max-w-4xl mx-auto px-6 md:px-10 py-5 text-center">
                <p className="text-sm text-foreground/80 font-light">
                  Welcome to the{' '}
                  <span className="font-semibold capitalize">{welcomeTier}</span> layer.
                  Your archive is now active.
                </p>
              </div>
            </div>
          )}

          {/* ── Hero ───────────────────────────────────────────────── */}
          <section className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 font-bold block mb-8">
                  Membership
                </span>
                <h1 className="text-[clamp(2.4rem,6vw,5.5rem)] font-serif font-extralight leading-[0.92] tracking-tight mb-8">
                  Supporting a practice,
                  <br />
                  <span className="italic text-muted-foreground font-light">not purchasing certainty.</span>
                </h1>
                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                  Moontuner membership is an investment in reflective clarity, emotional pacing, and
                  longitudinal self-observation — not predictions, not destiny, not cosmic guarantees.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Free tier ──────────────────────────────────────────── */}
          <section className="pb-6">
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <ScrollReveal>
                <div className="rounded-3xl border border-border/30 p-8 md:p-10 mb-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold block mb-3">
                        Always available
                      </span>
                      <h2 className="font-serif text-3xl text-foreground font-light mb-2">Free</h2>
                      <p className="text-muted-foreground text-sm">Begin here. Stay as long as you like.</p>
                    </div>
                    <div className="md:text-right">
                      <span className="text-3xl font-serif text-foreground">$0</span>
                      <p className="text-muted-foreground/50 text-sm">no card required</p>
                    </div>
                  </div>
                  <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    {FREE_FEATURES.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/70 font-light">{f}</span>
                      </div>
                    ))}
                  </div>
                  {currentTier === 'free' && !loading && (
                    <div className="mt-8 pt-6 border-t border-border/20">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">
                        Your current layer
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── Paid tiers ─────────────────────────────────────────── */}
          <section className="pb-24 md:pb-32">
            <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-4">
              {TIERS.map((tier, i) => {
                const isCurrentTier = currentTier === tier.id;
                const alreadyHasAccess = can(tier.id);
                const isLoading = checkoutTier === tier.id && redirecting;

                return (
                  <ScrollReveal key={tier.id} delay={i * 0.08}>
                    <div
                      className={`rounded-3xl border p-8 md:p-10 transition-colors duration-300 ${tier.accent} ${
                        isCurrentTier ? 'bg-accent/5' : 'bg-card'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold block mb-3">
                            {tier.id === 'practitioner' ? 'Deep Archive' : 'Membership Layer'}
                          </span>
                          <h2 className="font-serif text-3xl text-foreground font-light mb-2">
                            {tier.label}
                          </h2>
                          <p className="text-muted-foreground text-sm font-light italic">
                            {tier.tagline}
                          </p>
                        </div>
                        <div className="md:text-right shrink-0">
                          <div className="flex items-baseline gap-1 md:justify-end">
                            <span className="text-3xl font-serif text-foreground">{tier.price}</span>
                            <span className="text-muted-foreground/50 text-sm">{tier.period}</span>
                          </div>
                          <p className="text-muted-foreground/40 text-xs mt-1">cancel anytime</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {tier.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <Check className="w-3.5 h-3.5 text-foreground/30 mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground/70 font-light">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border/20 flex items-center justify-between gap-4">
                        {isCurrentTier ? (
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 font-bold">
                              Your current layer
                            </span>
                            <Link
                              to="/membership/manage"
                              className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40 hover:text-foreground transition-colors underline underline-offset-4"
                            >
                              Manage
                            </Link>
                          </div>
                        ) : alreadyHasAccess ? (
                          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">
                            Included in your membership
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCheckout(tier.id)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50"
                          >
                            {isLoading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5" />
                            )}
                            {tier.cta}
                          </button>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

          {/* ── Philosophy note ────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <ScrollReveal>
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold block mb-8">
                  How it works
                </span>
                <p className="text-2xl md:text-3xl font-serif font-light text-foreground leading-relaxed mb-8">
                  "Membership is not a lock. It's a container —<br />
                  <span className="italic text-muted-foreground">
                    one that holds your practice across time.
                  </span>"
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
                  {[
                    {
                      title: 'Pause anytime',
                      body: 'Life moves in cycles. Your membership can pause and resume without losing your archive.',
                    },
                    {
                      title: 'Graceful cancellation',
                      body: 'Cancel when you need to. Your data stays preserved and accessible at the free layer.',
                    },
                    {
                      title: 'Transparent billing',
                      body: 'No hidden fees, no manufactured urgency. Clear invoices and honest pricing.',
                    },
                  ].map((item) => (
                    <div key={item.title}>
                      <h3 className="font-serif text-base text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground/60 font-light leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── Gifting nudge ───────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start gap-12">
              <ScrollReveal className="flex-1">
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold block mb-6">
                  Gifting
                </span>
                <h2 className="font-serif text-3xl text-foreground font-light leading-tight mb-4">
                  Share a practice<br />
                  <span className="italic text-muted-foreground">with someone you know.</span>
                </h2>
                <p className="text-sm text-muted-foreground/60 font-light leading-relaxed mb-6">
                  Gift a month of Reflective membership, or a specific report — a thoughtful gesture
                  for someone who values introspection, timing, and self-awareness.
                </p>
                <Link
                  to="/gift"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/60 hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Explore Gifting
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </ScrollReveal>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
