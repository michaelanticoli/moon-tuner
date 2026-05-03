// Shared birth data across all generators (Cazimi, Astro-Harmonic, Lunar Reports).
// Lightweight sessionStorage layer — no provider, no context. Each generator
// can hydrate its own form from this on mount, and persist back on submit.
import { useCallback, useEffect, useState } from "react";

export interface SharedBirth {
  name: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  location: string;
}

const KEY = "mt_shared_birth";
// Backfill from legacy QuantumMelodic key so users don't re-enter.
const LEGACY_KEYS = ["qm_birth_data"];

const empty: SharedBirth = { name: "", date: "", time: "", location: "" };

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
        // Legacy key may use "date"/"time" already.
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
  // Notify same-tab listeners.
  window.dispatchEvent(new CustomEvent("mt-birth-updated", { detail: next }));
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
  return Boolean(b.name && b.date && b.time && b.location);
}
