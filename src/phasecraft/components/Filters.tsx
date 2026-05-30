import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FiltersProps {
  row: string;
  column: string;
  favoritesOnly: boolean;
  onRowChange: (v: string) => void;
  onColumnChange: (v: string) => void;
  onFavoritesToggle: () => void;
}

export function Filters({
  row,
  column,
  favoritesOnly,
  onRowChange,
  onColumnChange,
  onFavoritesToggle,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select value={row} onValueChange={onRowChange}>
        <SelectTrigger className="w-[100px] min-h-[44px]">
          <SelectValue placeholder="Row" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All rows</SelectItem>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={String(i + 1)}>
              Row {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={column} onValueChange={onColumnChange}>
        <SelectTrigger className="w-[110px] min-h-[44px]">
          <SelectValue placeholder="Column" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All columns</SelectItem>
          {Array.from({ length: 8 }, (_, i) => (
            <SelectItem key={i} value={String(i + 1)}>
              Col {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant={favoritesOnly ? 'default' : 'outline'}
        onClick={onFavoritesToggle}
        className="min-h-[44px]"
      >
        <Star className={cn('h-4 w-4 mr-1', favoritesOnly && 'fill-current')} />
        Favorites
      </Button>
    </div>
  );
}
