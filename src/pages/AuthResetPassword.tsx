import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { AlertCircle, ArrowRight, Loader2, Lock, Moon } from "lucide-react";

export default function AuthResetPassword() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("The signals don't match — please re-enter your key.");
      return;
    }

    if (password.length < 6) {
      setError("Your key must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Your key has been updated. Continue to your archive.");
      window.setTimeout(() => navigate("/dashboard", { replace: true }), 1200);
    } catch {
      setError("Something shifted unexpectedly. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-20">
          <section className="container mx-auto px-6 lg:px-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-12">
                <div className="relative inline-flex items-center justify-center mb-7">
                  <div className="absolute w-20 h-20 rounded-full bg-accent/5 blur-xl" />
                  <Moon className="w-10 h-10 text-accent relative z-10" />
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3 leading-tight">
                  Reset Your Key
                </h1>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  Choose a new password to restore access to your archive.
                </p>
              </div>

              <div className="node-card border-border/50">
                {authLoading ? (
                  <div className="py-10 text-center space-y-4">
                    <Loader2 className="w-7 h-7 animate-spin text-accent mx-auto" />
                    <p className="text-sm text-muted-foreground tracking-wide">
                      Validating your recovery link…
                    </p>
                  </div>
                ) : !session ? (
                  <div className="space-y-5 text-center">
                    <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      This recovery link is no longer active. Request a new reset email to continue.
                    </p>
                    <Button variant="gold" onClick={() => navigate("/auth", { replace: true })}>
                      Back to sign in
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-foreground/80 text-sm">
                        New Key
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Your new private key"
                          className="pl-10 bg-background border-border/60 focus:border-accent/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword" className="text-foreground/80 text-sm">
                        Confirm New Key
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          placeholder="Repeat your new key"
                          className="pl-10 bg-background border-border/60 focus:border-accent/50"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive/90">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="p-3 bg-accent/10 border border-accent/25 rounded-md text-sm text-accent/90">
                        {message}
                      </div>
                    )}

                    <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Update Your Key
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

                <p className="text-center text-xs text-muted-foreground/40 mt-6">
                  Need a fresh link?{" "}
                  <Link to="/auth" className="text-accent hover:text-accent/80 transition-colors">
                    Return to sign in
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
