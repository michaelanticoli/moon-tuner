import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  primarySupabase as supabase,
} from "@/integrations/supabase/client";

// Minimal typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthDetails = {
  client?: { name?: string; redirect_uri?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
};
type OAuthResult = { data: OAuthDetails | null; error: { message: string } | null };
const authOAuth = (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
    approveAuthorization: (id: string) => Promise<OAuthResult>;
    denyAuthorization: (id: string) => Promise<OAuthResult>;
  };
}).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?redirect=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await authOAuth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await authOAuth.approveAuthorization(authorizationId)
      : await authOAuth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07080c",
        color: "#f4efe6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          border: "1px solid #1e1f26",
          borderRadius: 12,
          padding: "2rem",
          background: "#0b0c11",
        }}
      >
        {error && (
          <>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", margin: "0 0 0.75rem" }}>
              Could not load this authorization request
            </h1>
            <p style={{ color: "#a09a8f", fontSize: "0.9rem", lineHeight: 1.6 }}>{error}</p>
          </>
        )}

        {!error && !details && (
          <p style={{ color: "#a09a8f", fontSize: "0.9rem" }}>Loading authorization request…</p>
        )}

        {!error && details && (
          <>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7a7568",
                margin: "0 0 0.75rem",
              }}
            >
              Connect an app
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", margin: "0 0 1rem", fontWeight: 400 }}>
              Connect {details.client?.name ?? "this app"} to your Moontuner account
            </h1>
            <p style={{ color: "#b9b1a3", fontSize: "0.95rem", lineHeight: 1.65, margin: "0 0 1.25rem" }}>
              {details.client?.name ?? "This app"} will be able to call Moontuner's enabled tools while
              you are signed in. It reads only what your account permissions already allow.
            </p>
            {details.client?.redirect_uri && (
              <p style={{ color: "#7a7568", fontSize: "0.8rem", margin: "0 0 1.5rem", wordBreak: "break-all" }}>
                Redirects to: <span style={{ color: "#b9b1a3" }}>{details.client.redirect_uri}</span>
              </p>
            )}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button
                disabled={busy}
                onClick={() => decide(true)}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  background: "#B8924A",
                  color: "#07080c",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy ? "Working…" : "Approve"}
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  background: "transparent",
                  color: "#b9b1a3",
                  border: "1px solid #2a2b33",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                Deny
              </button>
            </div>
            <p style={{ color: "#5a5548", fontSize: "0.75rem", marginTop: "1.5rem", lineHeight: 1.5 }}>
              This does not bypass Moontuner's permissions or backend policies. You can revoke access anytime
              from your account settings.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
