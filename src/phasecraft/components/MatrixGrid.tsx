import { cn } from '@/lib/utils';
import { MoonPhaseIcon, MOON_PHASE_NAMES } from './icons/MoonPhaseIcon';
import { ZodiacIcon, ZODIAC_NAMES } from './icons/ZodiacIcon';
import { SIGNATURES, type Signature } from '@/phasecraft/data/signatures';

interface MatrixGridProps {
  /** Internal index of the live signature, highlighted in the grid. */
  currentDay: number;
  onCellClick: (sig: Signature) => void;
}

/** The 12 × 8 matrix: signs down the rows, phases across the columns (Chapter 19). */
export function MatrixGrid({ currentDay, onCellClick }: MatrixGridProps) {
  return (
    <div className="mx-auto max-w-2xl overflow-x-auto">
      <table className="w-full min-w-[340px] table-fixed border-collapse text-center">
        <caption className="sr-only">The ninety-six signatures: signs by row, phases by column</caption>
        <thead>
          <tr>
            <th className="w-9 p-1 md:w-24" scope="col">
              <span className="sr-only">Sign</span>
            </th>
            {MOON_PHASE_NAMES.map((name, i) => (
              <th key={name} className="p-1" scope="col">
                <div className="flex flex-col items-center gap-0.5">
                  <MoonPhaseIcon phase={i + 1} size={20} className="text-foreground" />
                  <span className="hidden min-h-[2.2em] text-[9px] font-medium leading-tight text-muted-foreground md:block">{name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ZODIAC_NAMES.map((signName, ri) => (
            <tr key={signName}>
              <th scope="row" className="p-1 pr-2 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="hidden text-[10px] font-medium text-muted-foreground md:inline">{signName}</span>
                  <ZodiacIcon sign={ri + 1} size={18} className="text-foreground" />
                </div>
              </th>
              {SIGNATURES.slice(ri * 8, ri * 8 + 8).map((sig) => {
                const live = sig.day === currentDay;
                return (
                  <td key={sig.code} className="p-0.5">
                    <button
                      type="button"
                      onClick={() => onCellClick(sig)}
                      aria-label={`${sig.code}, ${sig.name}${live ? ' — the Moon is here now' : ''}`}
                      className={cn(
                        'aspect-square w-full min-h-[36px] rounded-md border text-[10px] font-medium tabular-nums transition-colors hover:border-accent/50 hover:bg-secondary md:min-h-[44px] md:text-xs',
                        live && 'border-accent/60 bg-accent/15 font-bold text-accent ring-2 ring-accent/60'
                      )}
                    >
                      {sig.code}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
