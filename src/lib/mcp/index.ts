import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getCurrentMoonPhase from "./tools/get-current-moon-phase";
import getMyProfile from "./tools/get-my-profile";
import listMyNatalReports from "./tools/list-my-natal-reports";
import listMyPurchases from "./tools/list-my-purchases";

// Build the OAuth issuer from the project ref (never from SUPABASE_URL — that
// may be a .lovable.cloud proxy which mcp-js rejects at issuer verification).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "moontuner-mcp",
  title: "Moontuner",
  version: "0.1.0",
  instructions:
    "Moontuner tools. Read the current moon phase and, for the signed-in Moontuner user, their profile, natal harmonic reports, and purchase history.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getCurrentMoonPhase,
    getMyProfile,
    listMyNatalReports,
    listMyPurchases,
  ],
});
