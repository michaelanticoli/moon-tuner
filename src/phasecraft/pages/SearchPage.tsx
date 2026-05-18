import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { ResultList } from '@/components/ResultList';
import { useAppStore } from '@/store/useAppStore';

export default function SearchPage() {
  const { favorites, getPhases } = useAppStore();
  const phases = getPhases();
  const [query, setQuery] = useState('');
  const [row, setRow] = useState('all');
  const [column, setColumn] = useState('all');
  const [favOnly, setFavOnly] = useState(false);

  const results = useMemo(() => {
    let filtered = phases;
    if (row !== 'all') filtered = filtered.filter((p) => p.row === parseInt(row));
    if (column !== 'all') filtered = filtered.filter((p) => p.column === parseInt(column));
    if (favOnly) filtered = filtered.filter((p) => favorites[p.day]);
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.theme.toLowerCase().includes(q) ||
          p.coreTheme.toLowerCase().includes(q) ||
          p.archetypalTag.toLowerCase().includes(q) ||
          p.dailyPrompt.toLowerCase().includes(q) ||
          p.practicalApplication.toLowerCase().includes(q) ||
          p.symbolicAnchor.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [phases, query, row, column, favOnly, favorites]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold tracking-tight">Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      <Filters
        row={row}
        column={column}
        favoritesOnly={favOnly}
        onRowChange={setRow}
        onColumnChange={setColumn}
        onFavoritesToggle={() => setFavOnly(!favOnly)}
      />
      <ResultList results={results} query={query} />
    </div>
  );
}
