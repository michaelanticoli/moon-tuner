import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * The reader's own record, kept on this device: favorite signatures and the
 * act / journal line written for each one. Keyed by the internal signature
 * index (1–96), which never changes.
 */
interface AppState {
  favorites: Record<number, boolean>;
  notes: Record<number, string>;
  toggleFavorite: (day: number) => void;
  setNote: (day: number, note: string) => void;
  importState: (data: { favorites?: Record<number, boolean>; notes?: Record<number, string> }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: {},
      notes: {},
      toggleFavorite: (day) =>
        set((s) => {
          const next = { ...s.favorites };
          if (next[day]) delete next[day];
          else next[day] = true;
          return { favorites: next };
        }),
      setNote: (day, note) =>
        set((s) => {
          const next = { ...s.notes };
          if (note.trim()) next[day] = note;
          else delete next[day];
          return { notes: next };
        }),
      importState: (data) =>
        set((s) => ({
          favorites: data.favorites && typeof data.favorites === 'object' ? data.favorites : s.favorites,
          notes: data.notes && typeof data.notes === 'object' ? data.notes : s.notes,
        })),
    }),
    {
      name: 'phasecraft:v1',
      version: 2,
      // v1 also stored a start date, a theme switch and an optional imported
      // dataset. None of those are used any more; keep only the reader's record.
      migrate: (persisted) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return { favorites: p.favorites ?? {}, notes: p.notes ?? {} } as AppState;
      },
      partialize: (s) => ({ favorites: s.favorites, notes: s.notes }) as AppState,
    }
  )
);
