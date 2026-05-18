import { useState } from 'react';
import { MatrixGrid } from '@/components/MatrixGrid';
import { useAppStore } from '@/store/useAppStore';
import { getCurrentDay } from '@/lib/date';
import { PhaseEntry } from '@/data/phases';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MoonPhaseIcon } from '@/components/icons/MoonPhaseIcon';
import { ZodiacIcon } from '@/components/icons/ZodiacIcon';
import { getPhaseData, getSignData, getCombinationInsight, getFlavorTagline } from '@/data/moontuner';

export default function MatrixPage() {
  const { startDate, getPhases } = useAppStore();
  const currentDay = getCurrentDay(startDate);
  const phases = getPhases();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PhaseEntry | null>(null);

  const selPhase = selected ? getPhaseData(selected.column) : null;
  const selSign = selected ? getSignData(selected.row) : null;
  const selFlavor = selected ? getCombinationInsight(selected.row, selected.column) : '';
  const selTagline = selected ? getFlavorTagline(selected.row, selected.column) : '';

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Lunar Phase Matrix</h1>
        <p className="text-xs text-muted-foreground mt-1">Moon phases across the zodiac wheel</p>
      </div>
      <MatrixGrid phases={phases} currentDay={currentDay} onCellClick={setSelected} />

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
          {selected && selPhase && selSign && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ZodiacIcon sign={selected.row} size={22} />
                  <MoonPhaseIcon phase={selected.column} size={22} />
                  <span>{selPhase.name} in {selSign.name}</span>
                </SheetTitle>
                <SheetDescription className="text-left">
                  {selected.row}·{selected.column} — Effect {selected.day} of 96
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                {/* Flavor tagline */}
                <p className="text-xs italic tracking-wide text-muted-foreground">{selTagline}</p>

                {/* THE FLAVOR — character sketch */}
                {selFlavor && (
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-sm leading-relaxed">{selFlavor}</p>
                  </div>
                )}


                {/* Contextual details tucked in collapsible */}
                <details className="group">
                  <summary className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer select-none">
                    Cosmological Context
                  </summary>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {selSign.element}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {selSign.modality}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {selSign.ruler}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Lunar Energy</p>
                      <p>{selPhase.energy}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Optimal Applications</p>
                      <p>{selPhase.bestFor}</p>
                    </div>
                  </div>
                </details>

                {/* Theme from CSV */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Theme</p>
                  <p className="text-sm">{selected.theme}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Core Theme</p>
                  <p className="text-sm">{selected.coreTheme}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelected(null);
                  navigate(`/day/${selected.day}`);
                }}
                className="w-full min-h-[44px]"
              >
                View Full Effect
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
