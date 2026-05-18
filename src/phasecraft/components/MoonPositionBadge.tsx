import { MoonState, formatDegree, phaseName } from '@/lib/moon';
import { ZodiacIcon, ZODIAC_NAMES } from './icons/ZodiacIcon';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';

interface Props {
  state: MoonState;
}

export function MoonPositionBadge({ state }: Props) {
  const signName = ZODIAC_NAMES[state.sign - 1];
  const days = state.nextPhaseInDays;
  const daysLabel =
    days <= 0
      ? ''
      : days < 1
        ? `${Math.round(days * 24)}h to ${state.nextPhaseName}`
        : `${days.toFixed(1)}d to ${state.nextPhaseName}`;

  return (
    <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MoonPhaseIcon phase={state.phase} size={18} className="text-foreground" />
          <ZodiacIcon sign={state.sign} size={18} className="text-foreground" />
          <span className="font-medium">
            {phaseName(state.phase)} · Moon at {formatDegree(state.degreeInSign)} {signName}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Decan {state.decan} of 3</span>
        <span>{Math.round(state.illumination * 100)}% illuminated</span>
        <span>{state.waxing ? 'Waxing' : 'Waning'}</span>
        {daysLabel && <span>{daysLabel}</span>}
      </div>
    </div>
  );
}
