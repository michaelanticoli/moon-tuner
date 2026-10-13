import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * On-demand access to the Supabase clients.
 *
 * Code that runs on every page at startup (AuthProvider, membership,
 * shared-birth hooks) imports the clients through this loader so that
 * supabase-js (~210 KB) is fetched as its own chunk instead of being parsed
 * before the first render. Page-level code can keep importing
 * "@/integrations/supabase/client" directly; both paths resolve to the same
 * module, so there is still exactly one client instance per project.
 */
type ClientModule = typeof import("./client");

let modulePromise: Promise<ClientModule> | null = null;

export function loadSupabase(): Promise<ClientModule> {
  if (!modulePromise) {
    modulePromise = import("./client").catch((err) => {
      // Let a later call retry (e.g. after a flaky network) instead of
      // caching the failure forever.
      modulePromise = null;
      throw err;
    });
  }
  return modulePromise;
}

/**
 * True when this browser already holds a Supabase session (supabase-js's
 * default storage key `sb-<project-ref>-auth-token`). Signed-out visitors
 * have nothing to restore, so their auth bootstrap can wait until idle.
 */
export function hasStoredSession(): boolean {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    if (!url || typeof window === "undefined") return false;
    const ref = new URL(url).hostname.split(".")[0];
    return Boolean(window.localStorage.getItem(`sb-${ref}-auth-token`));
  } catch {
    return false;
  }
}

/**
 * Run `fn` after the page has finished loading and the main thread is idle.
 * requestIdleCallback on its own fires while route chunks are still
 * downloading (the thread is idle then), so wait for `load` plus a short
 * delay first. Returns a cancel function.
 */
export function afterPageSettles(fn: () => void, delay = 1500): () => void {
  if (typeof window === "undefined") return () => {};
  let cancelled = false;
  let cancelInner: () => void = () => {};
  const run = () => {
    if (cancelled) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => !cancelled && fn(), { timeout: 2000 });
      cancelInner = () => window.cancelIdleCallback(id);
    } else {
      fn();
    }
  };
  const schedule = () => {
    const t = globalThis.setTimeout(run, delay);
    cancelInner = () => globalThis.clearTimeout(t);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    cancelInner();
  };
}

/** The legacy `supabase` export from "@/lib/supabase", loaded on demand. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadLegacySupabase(): Promise<SupabaseClient<any>> {
  const { supabase } = await loadSupabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return supabase as unknown as SupabaseClient<any>;
}
