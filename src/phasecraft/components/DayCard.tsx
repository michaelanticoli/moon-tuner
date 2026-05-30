import { PhaseEntry } from '@/phasecraft/data/phases';
import { FavoriteButton } from './FavoriteButton';
import { NotesEditor } from './NotesEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, CalendarDays, Grid3X3, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MoonPhaseIcon } from './icons/MoonPhaseIcon';
import { ZodiacIcon } from './icons/ZodiacIcon';
import { getPhaseData, getSignData, getCombinationInsight, getFlavorTagline } from '@/phasecraft/data/moontuner';
import { getFactsForPhase } from '@/phasecraft/data/lunarScience';

interface DayCardProps {
  entry: PhaseEntry;
  isFavorite: boolean;
  note: string;
  onToggleFavorite: () => void;
  onNoteChange: (note: string) => void;
  isCurrentDay?: boolean;
  showNav?: boolean;
}

export function DayCard({
  entry,
  isFavorite,
  note,
  onToggleFavorite,
  onNoteChange,
  showNav = true,
}: DayCardProps) {
  const navigate = useNavigate();
  const phase = getPhaseData(entry.column);
  const sign = getSignData(entry.row);
  const flavorProfile = getCombinationInsight(entry.row, entry.column);
  const flavorTagline = getFlavorTagline(entry.row, entry.column);
  const phaseFacts = getFactsForPhase(entry.column);

  const handleShare = () => {
    const url = `${window.location.origin}/day/${entry.day}`;
    navigator.clipboard.writeText(url);
    toast('Link copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {showNav && (
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/day/${entry.day - 1}`)}
            disabled={entry.day <= 1}
            className="min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/calendar')} className="min-h-[44px] min-w-[44px]">
              <CalendarDays className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/matrix')} className="min-h-[44px] min-w-[44px]">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="min-h-[44px] min-w-[44px]">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/day/${entry.day + 1}`)}
            disabled={entry.day >= 96}
            className="min-h-[44px] min-w-[44px]"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="space-y-5 p-6">
          {/* Header with icons */}
          <div className="flex items-center gap-3">
            <ZodiacIcon sign={entry.row} size={28} className="text-foreground shrink-0" />
            <MoonPhaseIcon phase={entry.column} size={28} className="text-foreground shrink-0" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{phase.name} in {sign.name}</h1>
              <p className="text-xs text-muted-foreground">
                {entry.row}·{entry.column} — Effect {entry.day} of 96
              </p>
            </div>
          </div>

          {/* Flavor tagline */}
          <p className="text-xs italic tracking-wide text-muted-foreground">{flavorTagline}</p>

          {/* THE FLAVOR — the character sketch, the whole point */}
          {flavorProfile && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm leading-relaxed">{flavorProfile}</p>
            </div>
          )}

          {/* Contextual details — tucked below, not the lead */}
          <details className="group">
            <summary className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer select-none">
              Cosmological Context
            </summary>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {sign.element}
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {sign.modality}
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Ruled by {sign.ruler}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Lunar Energy</p>
                <p>{phase.energy}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Optimal Applications</p>
                <p>{phase.bestFor}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Phase Keywords</p>
                <p>{phase.keywords.join(' · ')}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Sign Keywords</p>
                <p>{sign.keywords.join(' · ')}</p>
              </div>
              {phaseFacts.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Astronomical Context</p>
                  <ul className="space-y-1.5">
                    {phaseFacts.map((fact) => (
                      <li key={fact.id} className="text-xs leading-relaxed text-muted-foreground border-l-2 border-muted pl-2">
                        {fact.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>

          {/* CSV Data Fields */}
          <div className="border-t pt-4 space-y-4">
            <Field label="Theme" value={entry.theme} />
            <Field label="Core Theme" value={entry.coreTheme} />
            <Field label="Archetypal Tag" value={entry.archetypalTag} />
            <Field label="Daily Prompt" value={entry.dailyPrompt} />
            <Field label="Practical Application" value={entry.practicalApplication} />
            <Field label="Symbolic Anchor" value={entry.symbolicAnchor} />
          </div>

          <div className="border-t pt-5 space-y-4">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            <NotesEditor value={note} onChange={onNoteChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}
