import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";

type AuthMode = "enter" | "begin" | "reset" | "magic";

const FADE = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
};

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("enter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { signIn, signUp, resendSignupVerification, resetPassword, signInWithMagicLink, signInAnonymously } = useAuth();
  const navigate = useNavigate();

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "begin") {
        if (password !== confirmPassword) {
          setError("The signals don't match — please re-enter your key.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Your key must be at least 6 characters.");
          setLoading(false);
          return;
        }
        const { error, signedIn, requiresEmailVerification } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else if (signedIn) {
          navigate("/dashboard");
        } else if (requiresEmailVerification) {
          setMessage(
            "Your account was created and requires email verification. We requested the verification email, but delivery can fail if Supabase Auth email provider settings are incomplete. Check inbox/spam, then use 'Resend verification email' below if needed."
          );
        } else {
          console.warn("Signup completed without session and without explicit verification requirement.");
          setMessage(
            "Signup was accepted, but verification status could not be confirmed. We requested a verification email; if nothing arrives, Supabase Auth email provider settings may be misconfigured. Check inbox/spam, then use 'Resend verification email' below."
          );
        }
      } else if (mode === "enter") {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate("/dashboard");
        }
      } else if (mode === "reset") {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setMessage("A reset thread has been sent to your email.");
        }
      } else if (mode === "magic") {
        const { error } = await signInWithMagicLink(email);
        if (error) {
          setError(error.message);
        } else {
          setMessage("A signal has been sent to your email. Open it to enter.");
        }
      }
    } catch {
      setError("Something shifted unexpectedly. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const { error } = await resendSignupVerification(email);
      if (error) {
        setError(error.message);
      } else {
        setMessage(
          "Verification email resend requested. If Supabase Auth email settings are configured correctly, it should arrive shortly."
        );
      }
    } catch {
      setError("Something shifted unexpectedly. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInAnonymously();
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
  };

  const headings: Record<AuthMode, string> = {
    enter:  "Continue Your Record",
    begin:  "Begin Reflection",
    reset:  "Recover Your Signal",
    magic:  "Enter the Archive",
  };

  const subheadings: Record<AuthMode, string> = {
    enter:  "Return to where you left off.",
    begin:  "Initialize your profile. Save your signal.",
    reset:  "We'll send a thread to guide you back.",
    magic:  "Receive a link — no password required.",
  };

  const ctaLabels: Record<AuthMode, string> = {
    enter:  "Continue Your Record",
    begin:  "Save Your Signal",
    reset:  "Send Recovery Thread",
    magic:  "Send Magic Link",
  };

  const showPassword = mode === "enter" || mode === "begin";
  const showConfirm  = mode === "begin";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-20">
          <section className="container mx-auto px-6 lg:px-12">
            <div className="max-w-md mx-auto">

              {/* Moon glyph */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="text-center mb-12"
              >
                <div className="relative inline-flex items-center justify-center mb-7">
                  <div className="absolute w-20 h-20 rounded-full bg-accent/5 blur-xl" />
                  <Moon className="w-10 h-10 text-accent relative z-10" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={mode} {...FADE}>
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3 leading-tight">
                      {headings[mode]}
                    </h1>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {subheadings[mode]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="node-card border-border/50"
              >
                <AnimatePresence mode="wait">
                  <motion.form
                    key={mode}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    {...FADE}
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-foreground/80 text-sm">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-background border-border/60 focus:border-accent/50"
                          required
                        />
                      </div>
                    </div>

                    {showPassword && (
                      <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-foreground/80 text-sm">
                          Key
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Your private key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 bg-background border-border/60 focus:border-accent/50"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {showConfirm && (
                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-foreground/80 text-sm">
                          Confirm Key
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repeat your key"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 bg-background border-border/60 focus:border-accent/50"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive/90"
                      >
                        {error}
                      </motion.div>
                    )}

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-accent/10 border border-accent/25 rounded-md text-sm text-accent/90"
                      >
                        {message}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {ctaLabels[mode]}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                </AnimatePresence>

                {/* Secondary actions */}
                <div className="mt-7 pt-6 border-t border-border/30 space-y-3">
                  {mode === "enter" && (
                    <>
                      <button
                        type="button"
                        onClick={() => switchMode("magic")}
                        className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors py-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Send a magic link instead
                      </button>
                      <button
                        type="button"
                        onClick={() => switchMode("reset")}
                        className="w-full text-center text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        Recover your access
                      </button>
                      <p className="text-center text-sm text-muted-foreground/50">
                        New here?{" "}
                        <button
                          type="button"
                          onClick={() => switchMode("begin")}
                          className="text-accent hover:text-accent/80 transition-colors"
                        >
                          Begin Reflection
                        </button>
                      </p>
                    </>
                  )}

                  {mode === "begin" && (
                    <>
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={loading || !email}
                        className="w-full text-center text-sm text-muted-foreground/70 hover:text-foreground transition-colors py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Resend verification email
                      </button>
                      <button
                        type="button"
                        onClick={() => switchMode("magic")}
                        className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors py-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Use a magic link instead
                      </button>
                      <p className="text-center text-sm text-muted-foreground/50">
                        Already have a record?{" "}
                        <button
                          type="button"
                          onClick={() => switchMode("enter")}
                          className="text-accent hover:text-accent/80 transition-colors"
                        >
                          Continue Your Record
                        </button>
                      </p>
                    </>
                  )}

                  {(mode === "reset" || mode === "magic") && (
                    <button
                      type="button"
                      onClick={() => switchMode("enter")}
                      className="w-full text-center text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Anonymous entry */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 text-center"
              >
                <button
                  type="button"
                  onClick={handleAnonymous}
                  disabled={loading}
                  className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors leading-relaxed"
                >
                  Enter quietly, without a name
                </button>
                <p className="text-xs text-muted-foreground/30 mt-1">
                  Temporary session — nothing is saved
                </p>
              </motion.div>

              {/* Legal */}
              <p className="text-center text-xs text-muted-foreground/30 mt-10 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-muted-foreground/60">
                  Terms
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="underline hover:text-muted-foreground/60">
                  Privacy Policy
                </Link>
                . Your data is your own.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Auth;
