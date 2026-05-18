import { useParams, useNavigate } from 'react-router-dom';
import { DayCard } from '@/components/DayCard';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export default function DayDetailPage() {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const { favorites, notes, toggleFavorite, setNote, getPhases } = useAppStore();
  const dayNum = parseInt(day || '');
  const phases = getPhases();
  const entry = phases.find((p) => p.day === dayNum);

  if (!entry || isNaN(dayNum) || dayNum < 1 || dayNum > 96) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-muted-foreground">Effect not found</p>
        <Button variant="outline" onClick={() => navigate('/today')}>
          Go to Today
        </Button>
      </div>
    );
  }

  return (
    <DayCard
      entry={entry}
      isFavorite={!!favorites[entry.day]}
      note={notes[entry.day] || ''}
      onToggleFavorite={() => toggleFavorite(entry.day)}
      onNoteChange={(n) => setNote(entry.day, n)}
    />
  );
}
