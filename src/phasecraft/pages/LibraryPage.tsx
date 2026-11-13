import { Link } from 'react-router-dom';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { ExportImportPanel } from '@/phasecraft/components/ExportImportPanel';
import { MoonPhaseIcon } from '@/phasecraft/components/icons/MoonPhaseIcon';
import { ZodiacIcon } from '@/phasecraft/components/icons/ZodiacIcon';
import { SIGNATURES, signaturePath, type Signature } from '@/phasecraft/data/signatures';

/**
 * Your record — "Keep the record. Write it down. The record is your most
 * accurate teacher." (PHASECRAFT, the fifth directive)
 */

function Row({ sig, detail }: { sig: Signature; detail?: string }) {
  return (
    <li>
      <Link
        to={signaturePath(sig)}
        className="flex min-h-[44px] w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left hover:border-accent/40 hover:bg-secondary"
      >
        <span className="w-10 shrink-0 text-xs font-medium tabular-nums text-accent">{sig.code}</span>
        <ZodiacIcon sign={sig.row} size={16} className="shrink-0 text-muted-foreground" />
        <MoonPhaseIcon phase={sig.column} size={16} className="shrink-0 text-muted-foreground" />
        <span className="min-w-0">
          <span className="block truncate text-sm">{sig.name}</span>
          {detail && <span className="block truncate text-xs text-muted-foreground">{detail}</span>}
        </span>
      </Link>
    </li>
  );
}

export default function LibraryPage() {
  const { favorites, notes } = useAppStore();
  const favs = SIGNATURES.filter((s) => favorites[s.day]);
  const acts = SIGNATURES.filter((s) => notes[s.day]);
  const met = new Set([...favs, ...acts].map((s) => s.day)).size;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-foreground">Your Record</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The fifth directive: keep the record. After a year of the signature practice, your notes will tell you which
          of the ninety-six you know well and which remain strangers.
        </p>
        <p className="mt-3 text-xs uppercase tracking-wider text-accent">
          {met} of 96 signatures met so far
        </p>
      </div>

      <section className="space-y-3" aria-labelledby="acts-heading">
        <h3 id="acts-heading" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your acts ({acts.length})
        </h3>
        {acts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing written yet. Open{' '}
            <Link to="/phasecraft" className="text-accent underline underline-offset-4">
              tonight&rsquo;s signature
            </Link>{' '}
            and write one act that answers it.
          </p>
        ) : (
          <ul className="space-y-1">
            {acts.map((s) => (
              <Row key={s.code} sig={s} detail={notes[s.day]} />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3" aria-labelledby="favs-heading">
        <h3 id="favs-heading" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Favorites ({favs.length})
        </h3>
        {favs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Star a signature to keep it here.</p>
        ) : (
          <ul className="space-y-1">
            {favs.map((s) => (
              <Row key={s.code} sig={s} detail={s.anchor} />
            ))}
          </ul>
        )}
      </section>

      <ExportImportPanel />
    </div>
  );
}
