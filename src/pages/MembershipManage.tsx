import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useMembership } from '@/contexts/MembershipContext';
import { MembershipBadge } from '@/components/membership/MembershipBadge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useState } from 'react';

const TIER_DESCRIPTION: Record<string, string> = {
  free: 'Access to the core reflective tools with limited continuity.',
  reflective: 'Saved directives, journal continuity, and emotional pattern tracking.',
  insight:
    'AI-assisted synthesis, longitudinal analysis, and advanced timing reports.',
  practitioner:
    'Full archive access, exportable datasets, extended memory, and private ambient spaces.',
};

export default function MembershipManage() {
  const {
    subscription,
    tier,
    isActive,
    loading,
    redirecting,
    openBillingPortal,
    refetch,
  } = useMembership();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const periodEnd = subscription?.current_period_end
    ? format(new Date(subscription.current_period_end), 'MMMM d, yyyy')
    : null;

  const cancelAtEnd = subscription?.cancel_at_period_end;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-10">
                  <Link
                    to="/dashboard"
                    className="p-2 text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-0.5 font-sans">
                      Membership
                    </p>
                    <h1 className="font-serif text-3xl text-foreground">Your Layer</h1>
                  </div>
                </div>
              </ScrollReveal>

              {loading ? (
                <div className="node-card flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 text-accent animate-spin" />
                </div>
              ) : (
                <>
                  {/* Current tier card */}
                  <ScrollReveal>
                    <div className="node-card border-border/40 mb-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-2 font-sans">
                            Current Layer
                          </p>
                          <h2 className="font-serif text-2xl text-foreground capitalize mb-2">
                            {tier}
                          </h2>
                          <MembershipBadge />
                        </div>
                        <button
                          onClick={handleRefresh}
                          disabled={refreshing}
                          className="p-2 text-muted-foreground/30 hover:text-muted-foreground transition-colors"
                          title="Refresh status"
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                          />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground/60 font-light leading-relaxed mb-6">
                        {TIER_DESCRIPTION[tier] ?? ''}
                      </p>

                      {isActive && subscription?.stripe_subscription_id && (
                        <div className="space-y-3 pt-4 border-t border-border/20">
                          {periodEnd && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground/50">
                                {cancelAtEnd ? 'Access ends' : 'Next renewal'}
                              </span>
                              <span className="text-foreground/70">{periodEnd}</span>
                            </div>
                          )}
                          {cancelAtEnd && (
                            <p className="text-sm text-muted-foreground/50 italic font-light">
                              Your membership will end on this date. Your archive will be preserved
                              at the Free layer.
                            </p>
                          )}
                        </div>
                      )}

                      {tier === 'free' && (
                        <div className="pt-4 border-t border-border/20">
                          <Link
                            to="/membership"
                            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                          >
                            Explore membership layers
                            <span aria-hidden>→</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>

                  {/* Billing management */}
                  {isActive && subscription?.stripe_subscription_id && (
                    <ScrollReveal delay={0.08}>
                      <div className="node-card border-border/40 mb-6">
                        <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-5 font-sans">
                          Billing
                        </p>
                        <p className="text-sm text-muted-foreground/60 font-light leading-relaxed mb-6">
                          Update your payment method, download invoices, pause your membership,
                          or cancel — all from the secure billing portal.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => openBillingPortal('/membership/manage')}
                          disabled={redirecting}
                          className="border-border/40"
                        >
                          {redirecting ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <ExternalLink className="w-4 h-4 mr-2" />
                          )}
                          {redirecting ? 'Opening portal…' : 'Manage Billing'}
                        </Button>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* Upgrade prompt for lower tiers */}
                  {(tier === 'free' || tier === 'reflective') && (
                    <ScrollReveal delay={0.12}>
                      <div className="node-card border-border/30 bg-accent/5">
                        <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-4 font-sans">
                          Expand
                        </p>
                        <p className="text-sm text-foreground/70 font-light leading-relaxed mb-5">
                          Ready to deepen your practice? The next layer adds longitudinal synthesis,
                          advanced timing reports, and extended archive memory.
                        </p>
                        <Link
                          to="/membership"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
                        >
                          View All Layers
                        </Link>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* Calm note on cancellation */}
                  <ScrollReveal delay={0.16}>
                    <div className="mt-10 text-center">
                      <p className="text-xs text-muted-foreground/40 font-light leading-relaxed max-w-md mx-auto">
                        If you cancel, your archive remains intact at the Free layer. Nothing is
                        deleted. You can return at any time and pick up where you left.
                      </p>
                    </div>
                  </ScrollReveal>
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
