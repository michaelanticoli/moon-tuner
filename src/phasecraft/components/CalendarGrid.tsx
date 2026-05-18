import { PhaseEntry } from '@/data/phases';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';
import { ZodiacIcon } from './icons/ZodiacIcon';

interface CalendarGridProps {
  phases: PhaseEntry[];
  currentDay: number;
}

export function CalendarGrid({ phases, currentDay }: CalendarGridProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {phases.map((entry) => (
        <button
          key={entry.day}
          onClick={() => navigate(`/day/${entry.day}`)}
          className={cn(
            'flex flex-col items-center justify-center rounded-md border p-1.5 transition-colors min-h-[44px] hover:bg-secondary gap-0.5',
            entry.day === currentDay &&
              'ring-2 ring-highlight bg-highlight/10 border-highlight/30'
          )}
        >
          <div className="flex items-center gap-0.5">
            <ZodiacIcon sign={entry.row} size={12} className="text-muted-foreground" />
            <MoonPhaseIcon phase={entry.column} size={12} className="text-muted-foreground" />
          </div>
          <span className="text-[9px] text-muted-foreground">{entry.day}</span>
        </button>
      ))}
    </div>
  );
}
