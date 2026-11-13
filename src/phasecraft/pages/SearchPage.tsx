import { useMemo, useState } from 'react';
import { SearchBar } from '@/phasecraft/components/SearchBar';
import { Filters } from '@/phasecraft/components/Filters';
import { ResultList } from '@/phasecraft/components/ResultList';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { SIGNATURES } from '@/phasecraft/data/signatures';

/** Search all ninety-six by any word in the signature, the figure, or the phase and sign. */
export default function SearchPage() {
  const { favorites } = useAppStore();
  const [query, setQuery] = useState('');
  const [row, setRow] = useState('all');
  const [column, setColumn] = useState('all');
  const [favOnly, setFavOnly] = useState(false);

  const results = useMemo(() => {
    let list = SIGNATURES;
    if (row !== 'all') list = list.filter((s) => s.row === Number(row));
    if (column !== 'all') list = list.filter((s) => s.column === Number(column));
    if (favOnly) list = list.filter((s) => favorites[s.day]);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((s) =>
        [
          s.code,
          s.name,
          s.sensory,
          s.figure,
          s.sign.element,
          s.sign.modality,
          s.sign.ruler,
          ...s.sign.keywords,
          ...s.phase.keywords,
        ]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [query, row, column, favOnly, favorites]);

  const filtered = query.trim() !== '' || row !== 'all' || column !== 'all' || favOnly;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl text-foreground">Search</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Try a word from a signature (“harbor”, “velvet”), a figure (“warrior”), or a number like 8-5.
        </p>
      </div>
      <SearchBar value={query} onChange={setQuery} />
      <Filters
        row={row}
        column={column}
        favoritesOnly={favOnly}
        onRowChange={setRow}
        onColumnChange={setColumn}
        onFavoritesToggle={() => setFavOnly(!favOnly)}
      />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {filtered ? `${results.length} of 96 signatures` : 'All 96 signatures'}
      </p>
      <ResultList results={results} filtered={filtered} />
    </div>
  );
}
