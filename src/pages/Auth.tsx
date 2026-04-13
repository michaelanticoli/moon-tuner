import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

type AuthMode = "signin" | "signup" | "reset";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setMessage("Check your email for a confirmation link");
        }
      } else if (mode === "signin") {
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
          setMessage("Check your email for a password reset link");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="max-w-md mx-auto">
                <div className="text-center mb-12">
                  <Moon className="w-12 h-12 text-accent mx-auto mb-6" />
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                    {mode === "signin" && "Welcome Back"}
                    {mode === "signup" && "Begin Your Journey"}
                    {mode === "reset" && "Reset Password"}
                  </h1>
                  <p className="text-muted-foreground">
                    {mode === "signin" && "Continue your lunar journey"}
                    {mode === "signup" && "Create your account to save your charts"}
                    {mode === "reset" && "We'll send you a reset link"}
                  </p>
                </div>

                <div className="node-card">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-background border-border"
                          required
                        />
                      </div>
                    </div>

                    {mode !== "reset" && (
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 bg-background border-border"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {mode === "signup" && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 bg-background border-border"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="p-3 bg-accent/10 border border-accent/30 rounded-md text-sm text-accent">
                        {message}
                      </div>
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
                          {mode === "signin" && "Sign In"}
                          {mode === "signup" && "Create Account"}
                          {mode === "reset" && "Send Reset Link"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    {mode === "signin" && (
                      <>
                        <button
                          onClick={() => setMode("reset")}
                          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Forgot your password?
                        </button>
                        <p className="text-center text-sm text-muted-foreground">
                          Don't have an account?{" "}
                          <button
                            onClick={() => setMode("signup")}
                            className="text-accent hover:underline"
                          >
                            Sign up
                          </button>
                        </p>
                      </>
                    )}

                    {mode === "signup" && (
                      <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <button
                          onClick={() => setMode("signin")}
                          className="text-accent hover:underline"
                        >
                          Sign in
                        </button>
                      </p>
                    )}

                    {mode === "reset" && (
                      <button
                        onClick={() => setMode("signin")}
                        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Back to sign in
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8">
                  By continuing, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
                </p>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Auth;
