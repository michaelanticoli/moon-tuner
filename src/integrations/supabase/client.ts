import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const primaryUrl = import.meta.env.VITE_SUPABASE_URL;
const primaryKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Optional second project. When it isn't configured we fall back to the
// primary project rather than throwing (a throw here blanks the whole app).
const secondaryUrl = import.meta.env.VITE_SECONDARY_SUPABASE_URL || primaryUrl;
const secondaryKey =
  import.meta.env.VITE_SECONDARY_SUPABASE_PUBLISHABLE_KEY || primaryKey;

if (!primaryUrl || !primaryKey) {
  throw new Error("Primary Supabase environment variables are missing.");
}


/**
 * Primary project:
 * Authentication, verification emails, password resets,
 * magic links and other identity-dependent services.
 */
export const primarySupabase = createClient(
  primaryUrl,
  primaryKey,
  {
    auth: {
      storage:
        typeof window !== "undefined"
          ? window.localStorage
          : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Secondary project:
 * Existing MoonTuner and Quantumelodic database/function services.
 *
 * Only a genuinely separate project gets its own (session-less) client.
 * When no second project is configured — the normal case — this reuses the
 * signed-in primary client. A second session-less client pointed at the same
 * project would query as an anonymous visitor, so row-level-security tables
 * (school_progress, program_entitlements, program_members, profiles,
 * subscriptions) would read back empty and silently refuse writes.
 */
const hasSeparateSecondaryProject = secondaryUrl !== primaryUrl;

export const secondarySupabase: SupabaseClient<Database> = hasSeparateSecondaryProject
  ? createClient<Database>(secondaryUrl, secondaryKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : (primarySupabase as unknown as SupabaseClient<Database>);

/**
 * Backward-compatibility alias.
 *
 * Existing imports of `supabase` keep working without a site-wide rewrite;
 * they carry the visitor's session unless a separate project is configured.
 */
export const supabase = secondarySupabase;