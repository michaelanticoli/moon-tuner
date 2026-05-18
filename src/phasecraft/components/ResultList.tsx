import { PhaseEntry } from '@/data/phases';
import { useNavigate } from 'react-router-dom';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';
import { ZodiacIcon } from './icons/ZodiacIcon';
import { getPhaseData, getSignData } from '@/data/moontuner';

interface ResultListProps {
  results: PhaseEntry[];
  query: string;
}

export function ResultList({ results, query }: ResultListProps) {
  const navigate = useNavigate();

  if (query && results.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">No results found</p>
    );
  }

  return (
    <div className="space-y-1">
      {results.map((entry) => {
        const phase = getPhaseData(entry.column);
        const sign = getSignData(entry.row);
        return (
          <button
            key={entry.day}
            onClick={() => navigate(`/day/${entry.day}`)}
            className="w-full flex items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors hover:bg-secondary min-h-[44px]"
          >
            <ZodiacIcon sign={entry.row} size={16} className="text-muted-foreground shrink-0" />
            <MoonPhaseIcon phase={entry.column} size={16} className="text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{phase.name} in {sign.name}</p>
              <p className="text-xs text-muted-foreground truncate">{entry.theme}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
