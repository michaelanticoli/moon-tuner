import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MatrixGrid } from '@/phasecraft/components/MatrixGrid';
import { getMoonState, effectFromMoonState } from '@/phasecraft/lib/moon';
import { signaturePath, type Signature } from '@/phasecraft/data/signatures';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { MoonPhaseIcon } from '@/phasecraft/components/icons/MoonPhaseIcon';
import { ZodiacIcon } from '@/phasecraft/components/icons/ZodiacIcon';

export default function MatrixPage() {
  const currentDay = effectFromMoonState(getMoonState());
  const [selected, setSelected] = useState<Signature | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl text-foreground">The Matrix</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Signs run down the rows and phases across the columns. Each number is written sign first, phase second: 10-2
          is the Waxing Crescent in Capricorn. The highlighted cell is where the Moon is now.
        </p>
      </div>
      <MatrixGrid currentDay={currentDay} onCellClick={setSelected} />

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="bottom" className="max-h-[75vh] overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <ZodiacIcon sign={selected.row} size={22} />
                  <MoonPhaseIcon phase={selected.column} size={22} />
                  <span>{selected.name}</span>
                </SheetTitle>
                <SheetDescription className="text-left">Signature {selected.code}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <p className="font-serif text-base italic leading-relaxed">
                  <span className="text-accent">{selected.palette}</span> — {selected.tone} — {selected.anchor}
                </p>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-sm leading-relaxed">{selected.figure}</p>
                </div>
              </div>
              <Link
                to={signaturePath(selected)}
                onClick={() => setSelected(null)}
                className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Read the full signature
              </Link>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
