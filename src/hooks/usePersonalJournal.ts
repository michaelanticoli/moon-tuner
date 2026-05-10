/**
 * usePersonalJournal — localStorage autosave hook for anonymous journaling.
 *
 * All keys use the `mt_` namespace to avoid collisions.
 *
 * Stores:
 *   mt_journal_draft    — current unsaved draft (string)
 *   mt_journal_entries  — array of saved personal entries (JSON)
 *
 * Design decisions:
 * - No "save" button required — autosave fires 1 s after the user stops typing
 * - In Phase 2 this hook should be extended to flush to Supabase on auth
 * - Entries are stored newest-first
 */

import { useState, useEffect, useRef, useCallback } from "react";

const DRAFT_KEY = "mt_journal_draft";
const ENTRIES_KEY = "mt_journal_entries";
const AUTOSAVE_DELAY_MS = 1000;

export interface PersonalEntry {
  id: string;
  content: string;
  moonPhase: string;
  date: string; // ISO 8601
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private-browsing quota, etc.)
  }
}

export function usePersonalJournal(moonPhase: string) {
  const [draft, setDraft] = useState<string>(() => {
    try {
      return localStorage.getItem(DRAFT_KEY) ?? "";
    } catch {
      return "";
    }
  });

  const [entries, setEntries] = useState<PersonalEntry[]>(() =>
    readStorage<PersonalEntry[]>(ENTRIES_KEY, [])
  );

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autosave draft after user stops typing
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!draft.trim()) {
      setSaveStatus("idle");
      return;
    }

    setSaveStatus("saving");
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, draft);
      } catch {
        // ignore storage errors
      }
      setSaveStatus("saved");
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draft]);

  // Save draft as a permanent entry and clear the draft
  const saveEntry = useCallback(() => {
    const content = draft.trim();
    if (!content) return;

    const entry: PersonalEntry = {
      id: `mt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      content,
      moonPhase,
      date: new Date().toISOString(),
    };

    setEntries((prev) => {
      const updated = [entry, ...prev];
      writeStorage(ENTRIES_KEY, updated);
      return updated;
    });

    setDraft("");
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    setSaveStatus("idle");
  }, [draft, moonPhase]);

  // Delete a saved entry by id
  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      writeStorage(ENTRIES_KEY, updated);
      return updated;
    });
  }, []);

  return {
    draft,
    setDraft,
    saveStatus,
    entries,
    saveEntry,
    deleteEntry,
  };
}
