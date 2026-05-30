import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Download, Receipt, ShoppingBag } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { PurchaseRow } from '@/lib/supabase';
import { format } from 'date-fns';

function formatPrice(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100);
}

const STATUS_LABEL: Record<PurchaseRow['status'], { label: string; color: string }> = {
  completed: { label: 'Complete', color: 'text-foreground/60' },
  pending: { label: 'Processing', color: 'text-muted-foreground/50' },
  refunded: { label: 'Refunded', color: 'text-muted-foreground/40' },
  failed: { label: 'Failed', color: 'text-destructive/60' },
};

const TYPE_ICON: Record<PurchaseRow['product_type'], typeof ShoppingBag> = {
  report: Receipt,
  digital_good: Download,
  workbook: Download,
  ambient_pack: Download,
  bundle: ShoppingBag,
};

export default function PurchaseHistory() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchases() {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPurchases(data as PurchaseRow[]);
      }
      setLoading(false);
    }
    fetchPurchases();
  }, [user]);

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
                      Your Archive
                    </p>
                    <h1 className="font-serif text-3xl text-foreground">Purchase History</h1>
                  </div>
                </div>
              </ScrollReveal>

              {loading ? (
                <div className="node-card flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 text-accent animate-spin" />
                </div>
              ) : purchases.length === 0 ? (
                <ScrollReveal>
                  <div className="node-card text-center py-16 border-border/30">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
                    <h3 className="font-serif text-lg text-foreground/70 mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground/50 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                      When you purchase a report, workbook, or digital good, it will appear here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        to="/lunar-reports"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
                      >
                        Browse Reports
                      </Link>
                      <Link
                        to="/store"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold border border-border/40 text-muted-foreground/60 hover:text-foreground hover:border-border transition-colors"
                      >
                        Digital Store
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ) : (
                <div className="space-y-3">
                  {purchases.map((purchase, i) => {
                    const Icon = TYPE_ICON[purchase.product_type] ?? ShoppingBag;
                    const { label: statusLabel, color: statusColor } = STATUS_LABEL[purchase.status] ?? STATUS_LABEL.pending;
                    const hasDownload = purchase.status === 'completed' && purchase.metadata?.download_url;

                    return (
                      <ScrollReveal key={purchase.id} delay={i * 0.04}>
                        <motion.div
                          className="node-card border-border/40 flex items-start gap-5"
                        >
                          <div className="mt-0.5 shrink-0">
                            <Icon className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <h3 className="font-serif text-base text-foreground leading-tight">
                                {purchase.product_label ?? purchase.product_id}
                              </h3>
                              <span className="shrink-0 font-mono text-sm text-foreground/70">
                                {formatPrice(purchase.amount_cents, purchase.currency)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
                              <span className="capitalize text-[10px] uppercase tracking-widest font-bold">
                                {purchase.product_type.replace('_', ' ')}
                              </span>
                              <span>·</span>
                              <span>{format(new Date(purchase.created_at), 'MMM d, yyyy')}</span>
                              <span>·</span>
                              <span className={`font-bold ${statusColor}`}>{statusLabel}</span>
                            </div>
                          </div>
                          {hasDownload && (
                            <a
                              href={purchase.metadata.download_url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 p-2 text-muted-foreground/40 hover:text-foreground transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </motion.div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}

              {/* Transparency note */}
              {purchases.length > 0 && (
                <ScrollReveal delay={0.15}>
                  <div className="mt-10 text-center">
                    <p className="text-xs text-muted-foreground/40 font-light leading-relaxed max-w-md mx-auto">
                      All purchases are retained in your archive. If you ever need a receipt or have a
                      question about a purchase, contact us at{' '}
                      <a href="mailto:support@moontuner.xyz" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
                        support@moontuner.xyz
                      </a>
                    </p>
                  </div>
                </ScrollReveal>
              )}

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
