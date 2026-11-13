import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MoonPhaseIcon } from '@/phasecraft/components/icons/MoonPhaseIcon';
import { ZodiacIcon, ZODIAC_NAMES } from '@/phasecraft/components/icons/ZodiacIcon';
import { phaseStartsBetween, signatureAt, phaseName } from '@/phasecraft/lib/moon';
import { getSignature, signaturePath } from '@/phasecraft/data/signatures';

/**
 * Lunar calendar: the signature for each day of a month (read at local noon),
 * plus the moment each phase begins. "Find the phase on your calendar. Note
 * the sign. Read the signature." (PHASECRAFT, Chapter 19)
 */

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CalendarPage() {
  const today = new Date();
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const { cells, starts } = useMemo(() => {
    const y = month.getFullYear();
    const m = month.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const lead = new Date(y, m, 1).getDay();
    const cells: ({ date: Date; day: number; phase: number; sign: number } | null)[] = Array(lead).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const noon = new Date(y, m, d, 12, 0, 0);
      const s = signatureAt(noon);
      cells.push({ date: noon, ...s });
    }
    while (cells.length % 7) cells.push(null);
    const starts = phaseStartsBetween(new Date(y, m, 1), new Date(y, m + 1, 1));
    return { cells, starts };
  }, [month]);

  const monthLabel = month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const isThisMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
  const shift = (n: number) => setMonth((d) => new Date(d.getFullYear(), d.getMonth() + n, 1));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">{monthLabel}</h2>
          <p className="text-xs text-muted-foreground">Each day shows the signature at noon, your local time.</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border hover:bg-secondary"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {!isThisMonth && (
            <button
              type="button"
              onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="h-11 rounded-md border px-3 text-xs uppercase tracking-wider hover:bg-secondary"
            >
              This month
            </button>
          )}
          <button
            type="button"
            onClick={() => shift(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border hover:bg-secondary"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5" role="grid" aria-label={`Lunar calendar, ${monthLabel}`}>
        {WEEKDAYS.map((w) => (
          <div key={w} className="pb-1 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {w}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div key={`e${i}`} aria-hidden="true" />;
          const sig = getSignature(c.day)!;
          const isToday = sameDay(c.date, today);
          return (
            <Link
              key={c.date.toISOString()}
              to={signaturePath(sig)}
              aria-label={`${c.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}: ${sig.code}, ${sig.name}`}
              className={cn(
                'flex min-h-[64px] flex-col items-center justify-between rounded-md border p-1 text-center transition-colors hover:border-accent/50 hover:bg-secondary sm:min-h-[84px] sm:p-2',
                isToday && 'border-accent/60 bg-accent/10 ring-1 ring-accent/50'
              )}
            >
              <span className={cn('self-start text-[11px] tabular-nums', isToday ? 'font-semibold text-accent' : 'text-muted-foreground')}>
                {c.date.getDate()}
              </span>
              <span className="flex items-center gap-0.5">
                <MoonPhaseIcon phase={c.phase} size={14} className="text-foreground" />
                <ZodiacIcon sign={c.sign} size={14} className="text-foreground" />
              </span>
              <span className="text-[10px] font-medium tabular-nums text-foreground sm:text-xs">{sig.code}</span>
            </Link>
          );
        })}
      </div>

      <section className="space-y-2" aria-labelledby="phase-starts">
        <h3 id="phase-starts" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          When each phase begins
        </h3>
        <ul className="divide-y divide-border/50 rounded-lg border">
          {starts.map((s) => {
            const at = signatureAt(new Date(s.date.getTime() + 60_000));
            return (
              <li key={s.date.toISOString()} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <MoonPhaseIcon phase={s.phase} size={16} className="text-foreground" />
                  <span>
                    {phaseName(s.phase)} <span className="text-muted-foreground">in {ZODIAC_NAMES[at.sign - 1]}</span>
                  </span>
                </span>
                <span className="text-right text-xs tabular-nums text-muted-foreground">
                  {s.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} ·{' '}
                  {s.date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-muted-foreground">
          Each phase begins at its exact angle from the Sun and lasts until the next 45° mark, as in Chapter 1 of the book.
        </p>
      </section>
    </div>
  );
}
