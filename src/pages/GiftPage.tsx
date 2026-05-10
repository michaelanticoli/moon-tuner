import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Gift, Heart } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type GiftType =
  | 'membership_1month'
  | 'membership_3month'
  | 'membership_6month'
  | 'report';

interface GiftOption {
  id: GiftType;
  label: string;
  description: string;
  price: string;
}

const GIFT_OPTIONS: GiftOption[] = [
  {
    id: 'membership_1month',
    label: 'One Month of Reflection',
    description: 'A month of the Reflective membership — saved directives, journal continuity, emotional pattern tracking.',
    price: '$12',
  },
  {
    id: 'membership_3month',
    label: 'A Season of Reflection',
    description: 'Three months to establish a practice. Enough time for a full seasonal arc.',
    price: '$30',
  },
  {
    id: 'membership_6month',
    label: 'Half a Year of Reflection',
    description: 'Six months — a gift of real continuity. Long enough to see patterns emerge.',
    price: '$54',
  },
  {
    id: 'report',
    label: 'A Lunar Arc Report',
    description: 'A personalized report built from the recipient\'s natal chart and current lunar cycle.',
    price: '$17',
  },
];

export default function GiftPage() {
  const { user } = useAuth();
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!selectedGift || !recipientEmail.trim()) {
      setError('Please select a gift and enter the recipient\'s email.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        'create-gift-checkout',
        {
          body: {
            giftType: selectedGift,
            tier: selectedGift.startsWith('membership') ? 'reflective' : undefined,
            recipientEmail: recipientEmail.trim(),
            message: message.trim() || undefined,
            senderUserId: user?.id ?? undefined,
          },
        }
      );

      if (fnError) throw fnError;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error('Gift checkout error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-32">

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <section className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/50 font-bold block mb-8">
                  Gifting
                </span>
                <h1 className="text-[clamp(2.4rem,6vw,5.5rem)] font-serif font-extralight leading-[0.92] tracking-tight mb-8">
                  A thoughtful gift<br />
                  <span className="italic text-muted-foreground font-light">for someone who reflects.</span>
                </h1>
                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                  Gift a period of reflective practice — or a specific report — to someone who
                  values timing, introspection, and intentional living.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Gift selector ────────────────────────────────────────── */}
          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-10">
              <ScrollReveal>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold mb-6">
                  Choose a gift
                </p>
                <div className="space-y-3 mb-10">
                  {GIFT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedGift(opt.id)}
                      className={`w-full text-left rounded-2xl border p-6 transition-all duration-200 ${
                        selectedGift === opt.id
                          ? 'border-foreground/40 bg-accent/5'
                          : 'border-border/30 hover:border-border/50 bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-lg text-foreground font-light mb-1">
                            {opt.label}
                          </h3>
                          <p className="text-sm text-muted-foreground/60 font-light leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xl font-serif text-foreground">{opt.price}</span>
                          <div
                            className={`mt-2 w-4 h-4 rounded-full border-2 ml-auto transition-colors ${
                              selectedGift === opt.id
                                ? 'border-foreground bg-foreground'
                                : 'border-border/40'
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Recipient form */}
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-border/30 p-8 bg-card space-y-5 mb-8">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold">
                    Recipient details
                  </p>

                  <div className="space-y-1.5">
                    <Label htmlFor="recipientEmail" className="text-sm text-foreground/70">
                      Recipient's email
                    </Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="their@email.com"
                      className="bg-background border-border/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="giftMessage" className="text-sm text-foreground/70">
                      A note (optional)
                    </Label>
                    <textarea
                      id="giftMessage"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write something quiet and considered…"
                      rows={3}
                      className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent resize-none font-light"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Error */}
              {error && (
                <p className="text-sm text-destructive font-light mb-4">{error}</p>
              )}

              {/* Send button */}
              <ScrollReveal delay={0.15}>
                <button
                  onClick={handleSend}
                  disabled={loading || !selectedGift || !recipientEmail.trim()}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-40"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Gift className="w-4 h-4" />
                  )}
                  {loading ? 'Preparing your gift…' : 'Send This Gift'}
                </button>
              </ScrollReveal>
            </div>
          </section>

          {/* ── Philosophy note ──────────────────────────────────────── */}
          <section className="py-24 border-t border-border/30">
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <ScrollReveal>
                <Heart className="w-5 h-5 text-muted-foreground/30 mx-auto mb-6" />
                <p className="font-serif text-xl text-foreground font-light leading-relaxed">
                  Gifts arrive as a quiet invitation — not a notification or a promotion.
                  The recipient receives a claim link they can use when they're ready.
                </p>
              </ScrollReveal>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
