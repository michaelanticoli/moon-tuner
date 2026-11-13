import { MoonState, formatDegree, phaseName } from '@/phasecraft/lib/moon';
import { ZodiacIcon, ZODIAC_NAMES } from './icons/ZodiacIcon';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';

interface Props {
  state: MoonState;
  /** Matrix number of the live signature, e.g. "10-2". */
  code: string;
}

const DECAN_WORDS = ['first', 'second', 'third'];
const NUMERALS = ['i', 'ii', 'iii'];

function inTime(days: number): string {
  if (days <= 0) return '';
  if (days < 1) {
    const h = Math.max(1, Math.round(days * 24));
    return `${h} hour${h === 1 ? '' : 's'}`;
  }
  return `${days.toFixed(1)} days`;
}

export function MoonPositionBadge({ state, code }: Props) {
  const signName = ZODIAC_NAMES[state.sign - 1];
  const until = inTime(state.nextPhaseInDays);

  return (
    <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-2" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MoonPhaseIcon phase={state.phase} size={18} className="text-foreground" />
          <ZodiacIcon sign={state.sign} size={18} className="text-foreground" />
          <span className="font-medium">
            Right now: {phaseName(state.phase)} · Moon at {formatDegree(state.degreeInSign)} {signName}
          </span>
        </div>
        <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[11px] font-medium text-accent">
          {code}·{NUMERALS[state.decan - 1]}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{DECAN_WORDS[state.decan - 1]} decan</span>
        <span>{Math.round(state.illumination * 100)}% lit</span>
        <span>{state.waxing ? 'Waxing' : 'Waning'}</span>
        {until && (
          <span>
            {state.nextPhaseName} in {until}
          </span>
        )}
      </div>
    </div>
  );
}
