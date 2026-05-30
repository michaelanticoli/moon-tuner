import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
        isFavorite && 'border-highlight/30 bg-highlight/10'
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star className={cn('h-4 w-4', isFavorite && 'fill-highlight text-highlight')} />
      {isFavorite ? 'Favorited' : 'Favorite'}
    </button>
  );
}
