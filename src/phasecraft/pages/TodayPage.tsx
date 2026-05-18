import { DayCard } from '@/phasecraft/components/DayCard';
import { MoonPositionBadge } from '@/phasecraft/components/MoonPositionBadge';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { getMoonState, effectFromMoonState } from '@/phasecraft/lib/moon';
import { useEffect, useState } from 'react';

export default function TodayPage() {
  const { favorites, notes, toggleFavorite, setNote, getPhases } = useAppStore();
  const [moon, setMoon] = useState(() => getMoonState());

  // Recompute every 5 minutes so the badge stays live
  useEffect(() => {
    const id = setInterval(() => setMoon(getMoonState()), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const currentDay = effectFromMoonState(moon);
  const phases = getPhases();
  const entry = phases.find((p) => p.day === currentDay);

  if (!entry) return <p className="text-muted-foreground">No entry for today.</p>;

  return (
    <div className="space-y-4">
      <MoonPositionBadge state={moon} />
      <DayCard
        entry={entry}
        isFavorite={!!favorites[entry.day]}
        note={notes[entry.day] || ''}
        onToggleFavorite={() => toggleFavorite(entry.day)}
        onNoteChange={(n) => setNote(entry.day, n)}
        isCurrentDay
      />
    </div>
  );
}
