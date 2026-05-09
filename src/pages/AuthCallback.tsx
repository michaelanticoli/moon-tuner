import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

/**
 * AuthCallback
 *
 * Handles the redirect that Supabase sends after a user clicks the
 * "Verify email" link. Two flows are possible depending on Supabase
 * project settings:
 *
 *  1. PKCE flow  – URL contains ?code=CODE (current default for new projects).
 *     We call exchangeCodeForSession() to exchange it for a real session.
 *
 *  2. Implicit flow – URL fragment contains #access_token=TOKEN.
 *     The Supabase client detects this automatically on init and fires
 *     onAuthStateChange with SIGNED_IN.
 *
 * Either way this page waits for a SIGNED_IN event and then navigates
 * to /dashboard. If something goes wrong it shows a clear error with a
 * link back to the sign-in page.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;

    // Listen for the auth state change that Supabase fires once the
    // session is established (works for both flows).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (settled) return;
        if (event === "SIGNED_IN" && session) {
          settled = true;
          navigate("/dashboard", { replace: true });
        }
        if (event === "PASSWORD_RECOVERY") {
          settled = true;
          navigate("/auth/reset-password", { replace: true });
        }
      }
    );

    // Handle PKCE code-exchange explicitly for the ?code= query param flow.
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error: exchErr }) => {
          if (exchErr && !settled) {
            settled = true;
            setError(exchErr.message);
          }
          // On success, onAuthStateChange fires SIGNED_IN → navigate above.
        });
    }

    // Safety timeout: if nothing happens in 12 s, show a helpful error.
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        setError(
          "Verification timed out. The link may have expired — please request a new one."
        );
      }
    }, 12_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 px-6">
      <Moon className="w-12 h-12 text-accent opacity-70" />

      {error ? (
        <div className="max-w-md text-center space-y-5">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
          <h1 className="text-xl font-light text-foreground">
            Verification failed
          </h1>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button
            variant="gold"
            onClick={() => navigate("/auth", { replace: true })}
          >
            Back to sign in
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <Loader2 className="w-7 h-7 animate-spin text-accent mx-auto" />
          <p className="text-sm text-muted-foreground tracking-wide">
            Verifying your email…
          </p>
        </div>
      )}
    </div>
  );
}
