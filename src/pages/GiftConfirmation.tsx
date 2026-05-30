import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

export default function GiftConfirmation() {
  const [searchParams] = useSearchParams();
  const giftId = searchParams.get('gift_id');

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-32 pb-24 flex items-center">
          <div className="max-w-2xl mx-auto px-6 md:px-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <CheckCircle className="w-10 h-10 text-foreground/30 mx-auto" />

              <div>
                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold block mb-6">
                  Gift Sent
                </span>
                <h1 className="text-[clamp(2rem,5vw,4rem)] font-serif font-extralight leading-[1.1] tracking-tight mb-6">
                  Your gift is on its way.
                </h1>
                <p className="text-base text-muted-foreground/60 font-light leading-relaxed max-w-md mx-auto">
                  The recipient will receive a quiet email with their claim link — no pressure,
                  no expiration urgency. They can activate it whenever the moment feels right.
                </p>
              </div>

              {giftId && (
                <p className="text-xs text-muted-foreground/30 font-mono">
                  Gift reference: {giftId}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
                >
                  Return Home
                </Link>
                <Link
                  to="/gift"
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  Send Another
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
