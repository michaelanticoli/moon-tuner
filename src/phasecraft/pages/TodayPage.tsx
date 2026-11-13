import { useEffect, useState } from 'react';
import { DayCard } from '@/phasecraft/components/DayCard';
import { MoonPositionBadge } from '@/phasecraft/components/MoonPositionBadge';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { getMoonState, effectFromMoonState } from '@/phasecraft/lib/moon';
import { getSignature } from '@/phasecraft/data/signatures';

export default function TodayPage() {
  const { favorites, notes, toggleFavorite, setNote } = useAppStore();
  const [moon, setMoon] = useState(() => getMoonState());

  // Recompute every 5 minutes so the badge and signature stay live.
  useEffect(() => {
    const id = setInterval(() => setMoon(getMoonState()), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const sig = getSignature(effectFromMoonState(moon));
  if (!sig) return null;

  return (
    <div className="space-y-4">
      <MoonPositionBadge state={moon} code={sig.code} />
      <DayCard
        sig={sig}
        decan={moon.decan}
        isFavorite={!!favorites[sig.day]}
        act={notes[sig.day] || ''}
        onToggleFavorite={() => toggleFavorite(sig.day)}
        onActChange={(n) => setNote(sig.day, n)}
      />
    </div>
  );
}
