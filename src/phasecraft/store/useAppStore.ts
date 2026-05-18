import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhaseEntry, defaultPhases } from '@/data/phases';

interface AppState {
  startDate: string;
  favorites: Record<number, boolean>;
  notes: Record<number, string>;
  themeMode: 'light' | 'dark' | 'system';
  customPhases: PhaseEntry[] | null;
  setStartDate: (date: string) => void;
  toggleFavorite: (day: number) => void;
  setNote: (day: number, note: string) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setCustomPhases: (phases: PhaseEntry[] | null) => void;
  getPhases: () => PhaseEntry[];
  importState: (data: {
    startDate?: string;
    favorites?: Record<number, boolean>;
    notes?: Record<number, string>;
    themeMode?: 'light' | 'dark' | 'system';
  }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      startDate: new Date().toISOString().split('T')[0],
      favorites: {},
      notes: {},
      themeMode: 'system' as const,
      customPhases: null,
      setStartDate: (date) => set({ startDate: date }),
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
      setThemeMode: (mode) => set({ themeMode: mode }),
      setCustomPhases: (phases) => set({ customPhases: phases }),
      getPhases: () => get().customPhases || defaultPhases,
      importState: (data) =>
        set((s) => ({
          ...s,
          ...(data.startDate && { startDate: data.startDate }),
          ...(data.favorites && { favorites: data.favorites }),
          ...(data.notes && { notes: data.notes }),
          ...(data.themeMode && { themeMode: data.themeMode }),
        })),
    }),
    { name: 'phasecraft:v1' }
  )
);
