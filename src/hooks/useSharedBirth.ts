// Shared birth data across all generators (Cazimi, Astro-Harmonic, Lunar
// Reports, Lunar Cipher overlay). Lightweight sessionStorage layer — no
// provider, no context. Each generator hydrates its own form on mount and
// persists back on submit.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SharedBirth {
  name: string;
  date: string;     // YYYY-MM-DD
  time: string;     // HH:MM
  location: string;
  email: string;    // optional but captured everywhere we ask for birth data
}

const KEY = "mt_shared_birth";
// Backfill from legacy QuantumMelodic key so users don't re-enter.
const LEGACY_KEYS = ["qm_birth_data"];

const empty: SharedBirth = { name: "", date: "", time: "", location: "", email: "" };

export function readSharedBirth(): SharedBirth {
  if (typeof window === "undefined") return empty;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...empty, ...parsed };
    }
    for (const k of LEGACY_KEYS) {
      const legacy = sessionStorage.getItem(k);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const merged: SharedBirth = { ...empty, ...parsed };
        sessionStorage.setItem(KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch {
    /* noop */
  }
  return empty;
}

export function writeSharedBirth(birth: Partial<SharedBirth>) {
  if (typeof window === "undefined") return;
  const current = readSharedBirth();
  const next = { ...current, ...birth };
  sessionStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("mt-birth-updated", { detail: next }));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Persist the email (and birth metadata as source) to newsletter_subscribers
 * via the existing edge function. Idempotent — duplicate emails are fine.
 */
export async function captureBirthEmail(birth: SharedBirth, source = "birth-intake") {
  const email = (birth.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { ok: false as const, reason: "invalid-email" };
  try {
    const { data, error } = await supabase.functions.invoke("subscribe-email", {
      body: { email, source },
    });
    if (error) return { ok: false as const, reason: error.message };
    return { ok: true as const, data };
  } catch (e) {
    return { ok: false as const, reason: e instanceof Error ? e.message : String(e) };
  }
}

export function useSharedBirth() {
  const [birth, setBirth] = useState<SharedBirth>(readSharedBirth);

  useEffect(() => {
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<SharedBirth>).detail;
      if (detail) setBirth(detail);
    };
    window.addEventListener("mt-birth-updated", onUpdate);
    return () => window.removeEventListener("mt-birth-updated", onUpdate);
  }, []);

  const update = useCallback((partial: Partial<SharedBirth>) => {
    writeSharedBirth(partial);
  }, []);

  return { birth, update };
}

export function isCompleteBirth(b: SharedBirth) {
  // Email is optional for generation but captured when present.
  return Boolean(b.name && b.date && b.time && b.location);
}

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}
