import { Link } from 'react-router-dom';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';
import { ZodiacIcon } from './icons/ZodiacIcon';
import { signaturePath, type Signature } from '@/phasecraft/data/signatures';

interface ResultListProps {
  results: Signature[];
  filtered: boolean;
}

export function ResultList({ results, filtered }: ResultListProps) {
  if (filtered && results.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No signatures match. Try another word.</p>;
  }

  return (
    <ul className="space-y-1">
      {results.map((sig) => (
        <li key={sig.code}>
          <Link
            to={signaturePath(sig)}
            className="flex min-h-[44px] w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors hover:border-accent/40 hover:bg-secondary"
          >
            <span className="w-10 shrink-0 text-xs font-medium tabular-nums text-accent">{sig.code}</span>
            <ZodiacIcon sign={sig.row} size={16} className="shrink-0 text-muted-foreground" />
            <MoonPhaseIcon phase={sig.column} size={16} className="shrink-0 text-muted-foreground" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{sig.name}</span>
              <span className="block truncate text-xs italic text-muted-foreground">{sig.anchor}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
