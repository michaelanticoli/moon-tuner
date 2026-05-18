import { PhaseEntry } from '@/phasecraft/data/phases';
import { cn } from '@/lib/utils';
import { MoonPhaseIcon, MOON_PHASE_NAMES } from './icons/MoonPhaseIcon';
import { ZodiacIcon, ZODIAC_NAMES } from './icons/ZodiacIcon';

interface MatrixGridProps {
  phases: PhaseEntry[];
  currentDay: number;
  onCellClick: (entry: PhaseEntry) => void;
}

export function MatrixGrid({ phases, currentDay, onCellClick }: MatrixGridProps) {
  const grid: (PhaseEntry | undefined)[][] = Array.from({ length: 12 }, () =>
    Array(8).fill(undefined)
  );
  phases.forEach((e) => {
    grid[e.row - 1][e.column - 1] = e;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="p-1 w-16 md:w-24" />
            {MOON_PHASE_NAMES.map((name, i) => (
              <th key={i} className="p-1">
                <div className="flex flex-col items-center gap-0.5">
                  <MoonPhaseIcon phase={i + 1} size={20} className="text-foreground" />
                  <span className="text-[7px] md:text-[9px] font-medium text-muted-foreground leading-tight">
                    {name}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, ri) => (
            <tr key={ri}>
              <td className="p-1 text-right pr-2">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-[8px] md:text-[10px] font-medium text-muted-foreground hidden md:inline">
                    {ZODIAC_NAMES[ri]}
                  </span>
                  <ZodiacIcon sign={ri + 1} size={18} className="text-foreground" />
                </div>
              </td>
              {row.map((entry, ci) => (
                <td key={ci} className="p-0.5">
                  {entry ? (
                    <button
                      onClick={() => onCellClick(entry)}
                      className={cn(
                        'w-full aspect-square rounded-md border text-xs font-medium transition-colors min-h-[36px] md:min-h-[44px] hover:bg-secondary',
                        entry.day === currentDay &&
                          'ring-2 ring-highlight bg-highlight/10 border-highlight/30 font-bold'
                      )}
                    >
                      {entry.day}
                    </button>
                  ) : (
                    <div className="w-full aspect-square rounded-md bg-muted/30" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
