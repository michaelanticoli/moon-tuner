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
import { ZODIAC_NAMES } from './icons/ZodiacIcon';
import { MOON_PHASE_NAMES } from './icons/MoonPhaseIcon';

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
        <SelectTrigger className="w-[150px] min-h-[44px]" aria-label="Filter by sign">
          <SelectValue placeholder="Sign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All signs</SelectItem>
          {ZODIAC_NAMES.map((name, i) => (
            <SelectItem key={name} value={String(i + 1)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={column} onValueChange={onColumnChange}>
        <SelectTrigger className="w-[170px] min-h-[44px]" aria-label="Filter by phase">
          <SelectValue placeholder="Phase" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All phases</SelectItem>
          {MOON_PHASE_NAMES.map((name, i) => (
            <SelectItem key={name} value={String(i + 1)}>
              {name}
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
