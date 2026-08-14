import { createClient } from "@supabase/supabase-js";
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
 */
export const secondarySupabase = createClient<Database>(
  secondaryUrl,
  secondaryKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

/**
 * Backward-compatibility alias.
 *
 * Existing imports of `supabase` continue using the old secondary
 * project without requiring a site-wide rewrite.
 */
export const supabase = secondarySupabase;