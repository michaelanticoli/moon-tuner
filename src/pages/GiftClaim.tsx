import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type ClaimStatus = 'idle' | 'loading' | 'success' | 'error' | 'already_claimed' | 'expired' | 'needs_auth';

const STATUS_COPY: Record<string, { heading: string; body: string }> = {
  success: {
    heading: 'Your gift is activated.',
    body: 'Welcome to Moontuner. Your archive is ready whenever you are.',
  },
  already_claimed: {
    heading: 'This gift has already been claimed.',
    body: 'If you believe this is an error, the sender can reach out to us.',
  },
  expired: {
    heading: 'This gift has expired.',
    body: 'Gift links are valid for one year. If you received this recently, please contact us.',
  },
  error: {
    heading: 'Something went wrong.',
    body: 'We couldn\'t verify this claim code. Please check the link or try again.',
  },
};

export default function GiftClaim() {
  const [searchParams] = useSearchParams();
  const urlCode = searchParams.get('code') ?? '';
  const { user, loading: authLoading } = useAuth();

  const [code, setCode] = useState(urlCode);
  const [status, setStatus] = useState<ClaimStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-claim if code comes from URL and user is already logged in
  useEffect(() => {
    if (urlCode && !authLoading && user) {
      handleClaim(urlCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCode, authLoading, user]);

  const handleClaim = async (claimCode: string) => {
    const trimmed = claimCode.trim();
    if (!trimmed) return;

    if (!user) {
      setStatus('needs_auth');
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    try {
      // Claim is validated entirely server-side (recipient identity, paid status,
      // expiry and single-use are enforced inside the database function).
      const { data, error } = await supabase.rpc('claim_gift', { _claim_code: trimmed });

      if (error) {
        setStatus('error');
        return;
      }

      switch (data) {
        case 'success':
          setStatus('success');
          break;
        case 'already_claimed':
          setStatus('already_claimed');
          break;
        case 'expired':
          setStatus('expired');
          break;
        case 'needs_auth':
          setStatus('needs_auth');
          break;
        case 'not_paid':
          setStatus('error');
          setErrorMsg('This gift hasn\'t been completed yet. Ask the sender to check their payment.');
          break;
        default:
          setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };


  const isResolved = ['success', 'already_claimed', 'expired', 'error'].includes(status);
  const copy = STATUS_COPY[status];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-32 pb-24 flex items-center">
          <div className="max-w-lg mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              {/* Icon */}
              <div className="text-center">
                {status === 'success' ? (
                  <CheckCircle className="w-10 h-10 text-foreground/30 mx-auto mb-6" />
                ) : status === 'error' || status === 'already_claimed' || status === 'expired' ? (
                  <AlertCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-6" />
                ) : (
                  <Gift className="w-10 h-10 text-muted-foreground/30 mx-auto mb-6" />
                )}

                <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold block mb-6">
                  Gift Activation
                </span>

                {isResolved ? (
                  <>
                    <h1 className="font-serif text-3xl text-foreground font-light mb-4">
                      {copy.heading}
                    </h1>
                    <p className="text-base text-muted-foreground/60 font-light leading-relaxed">
                      {errorMsg ?? copy.body}
                    </p>
                    {status === 'success' && (
                      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          to="/dashboard"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
                        >
                          Open Your Archive
                        </Link>
                        <Link
                          to="/membership"
                          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 hover:text-foreground transition-colors"
                        >
                          View Your Layer
                        </Link>
                      </div>
                    )}
                  </>
                ) : status === 'needs_auth' ? (
                  <>
                    <h1 className="font-serif text-3xl text-foreground font-light mb-4">
                      Sign in to claim your gift.
                    </h1>
                    <p className="text-base text-muted-foreground/60 font-light leading-relaxed mb-8">
                      Create a free account or sign in — then return to this link to activate your gift.
                    </p>
                    <Link
                      to={`/auth?redirect=/gift/claim?code=${encodeURIComponent(code)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity"
                    >
                      Sign In / Create Account
                    </Link>
                  </>
                ) : (
                  <>
                    <h1 className="font-serif text-3xl text-foreground font-light mb-4">
                      You've received a gift.
                    </h1>
                    <p className="text-base text-muted-foreground/60 font-light leading-relaxed">
                      Enter your claim code below to activate it — no urgency, no pressure.
                    </p>
                  </>
                )}
              </div>

              {/* Code entry form (only show when idle or loading) */}
              {!isResolved && status !== 'needs_auth' && (
                <div className="rounded-2xl border border-border/30 p-8 bg-card space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="claimCode" className="text-sm text-foreground/70">
                      Claim code
                    </Label>
                    <Input
                      id="claimCode"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter claim code"
                      className="bg-background border-border/50 font-mono tracking-wider text-center"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button
                    onClick={() => handleClaim(code)}
                    disabled={status === 'loading' || !code.trim()}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-40"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Gift className="w-4 h-4" />
                    )}
                    {status === 'loading' ? 'Activating…' : 'Activate Gift'}
                  </button>
                </div>
              )}

              {/* Already have an account note */}
              {status === 'idle' && !user && !authLoading && (
                <p className="text-center text-xs text-muted-foreground/40 font-light">
                  You'll need to be signed in to claim.{' '}
                  <Link to="/auth" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
                    Sign in or create a free account.
                  </Link>
                </p>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
