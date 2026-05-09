import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useMembership } from '@/contexts/MembershipContext';
import { supabase } from '@/lib/supabase';
import type { DigitalProductRow, MembershipTier } from '@/lib/supabase';
import { hasAccess } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const TYPE_LABELS: Record<DigitalProductRow['product_type'], string> = {
  workbook: 'Workbook',
  ambient_pack: 'Ambient Audio',
  report_bundle: 'Report Bundle',
  seasonal: 'Seasonal Release',
  reflection_collection: 'Reflection Collection',
};

const TIER_LABELS: Record<MembershipTier, string> = {
  free: 'Available to all',
  reflective: 'Reflective+',
  insight: 'Insight+',
  practitioner: 'Practitioner',
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2).replace('.00', '')}`;
}

export default function DigitalStore() {
  const { tier, can } = useMembership();
  const { user } = useAuth();
  const [products, setProducts] = useState<DigitalProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('digital_products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) setProducts(data as DigitalProductRow[]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handlePurchase = async (product: DigitalProductRow) => {
    if (!user) {
      window.location.href = '/auth?redirect=/store';
      return;
    }

    setCheckingOut(product.id);
    try {
      const { data, error } = await supabase.functions.invoke('create-report-payment', {
        body: {
          product: 'digital-good',
          productId: product.id,
          productLabel: product.label,
          amountCents: product.amount_cents,
          successPath: `/store?purchased=${product.id}`,
          cancelPath: '/store',
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error('Store checkout error:', err);
    } finally {
      setCheckingOut(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-32">

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <section className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 font-bold block mb-8">
                  Digital Goods
                </span>
                <h1 className="text-[clamp(2.4rem,6vw,5.5rem)] font-serif font-extralight leading-[0.92] tracking-tight mb-8">
                  Workbooks. Audio.<br />
                  <span className="italic text-muted-foreground font-light">Seasonal archives.</span>
                </h1>
                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                  Downloadable goods for extending the practice — workbooks built for the lunar cycle,
                  ambient soundscapes for reflection, and ceremonial seasonal collections.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Product grid ─────────────────────────────────────────── */}
          <section className="pb-32">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="w-6 h-6 text-muted-foreground/40 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product, i) => {
                    const accessible = hasAccess(tier, product.min_tier);
                    const isCheckingOut = checkingOut === product.id;

                    return (
                      <ScrollReveal key={product.id} delay={i * 0.06}>
                        <div className="rounded-3xl border border-border/30 p-8 md:p-10 bg-card hover:border-border/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/40 font-bold">
                                  {TYPE_LABELS[product.product_type]}
                                </span>
                                {product.is_limited && (
                                  <span className="text-[8px] uppercase tracking-[0.3em] text-foreground/40 border border-border/30 px-2 py-0.5 rounded-full">
                                    Limited
                                  </span>
                                )}
                                {product.min_tier !== 'free' && (
                                  <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground/30 border border-border/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Lock className="w-2.5 h-2.5" />
                                    {TIER_LABELS[product.min_tier]}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-serif text-xl text-foreground font-light mb-2">
                                {product.label}
                              </h3>
                              {product.description && (
                                <p className="text-sm text-muted-foreground/60 font-light leading-relaxed">
                                  {product.description}
                                </p>
                              )}
                            </div>

                            <div className="shrink-0 flex flex-col items-start md:items-end gap-4">
                              <div className="text-right">
                                <span className="text-2xl font-serif text-foreground">
                                  {formatPrice(product.amount_cents)}
                                </span>
                                <p className="text-muted-foreground/40 text-xs">one-time</p>
                              </div>

                              {accessible ? (
                                <button
                                  onClick={() => handlePurchase(product)}
                                  disabled={isCheckingOut}
                                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50"
                                >
                                  {isCheckingOut ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Download className="w-3.5 h-3.5" />
                                  )}
                                  {isCheckingOut ? 'Preparing…' : 'Purchase'}
                                </button>
                              ) : (
                                <Link
                                  to="/membership"
                                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold border border-border/40 text-muted-foreground/60 hover:text-foreground hover:border-border transition-colors"
                                >
                                  <ArrowRight className="w-3.5 h-3.5" />
                                  Access Requires {TIER_LABELS[product.min_tier]}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}

                  {products.length === 0 && (
                    <div className="text-center py-24">
                      <p className="text-muted-foreground/40 font-light text-sm">
                        New goods arriving with the next lunar cycle.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ── Gifting nudge ────────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
              <ScrollReveal>
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold block mb-6">
                  Share the practice
                </span>
                <p className="font-serif text-2xl text-foreground font-light mb-6">
                  Any item in the store can be gifted.
                </p>
                <Link
                  to="/gift"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 hover:text-foreground transition-colors underline underline-offset-4"
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
