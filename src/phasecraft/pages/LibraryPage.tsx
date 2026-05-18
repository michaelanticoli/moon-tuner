import { useAppStore } from '@/store/useAppStore';
import { ExportImportPanel } from '@/components/ExportImportPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MoonPhaseIcon } from '@/components/icons/MoonPhaseIcon';
import { ZodiacIcon } from '@/components/icons/ZodiacIcon';
import { getPhaseData, getSignData } from '@/data/moontuner';

export default function LibraryPage() {
  const { startDate, setStartDate, favorites, notes, themeMode, setThemeMode, getPhases } =
    useAppStore();
  const phases = getPhases();
  const navigate = useNavigate();

  const favDays = phases.filter((p) => favorites[p.day]);
  const noteDays = phases.filter((p) => notes[p.day]);

  const themeModes: {
    value: 'light' | 'dark' | 'system';
    icon: typeof Sun;
    label: string;
  }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold tracking-tight">Library</h1>

      <div className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Start Date
        </h3>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="min-h-[44px] w-auto"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Appearance
        </h3>
        <div className="flex gap-2">
          {themeModes.map((m) => (
            <Button
              key={m.value}
              variant={themeMode === m.value ? 'default' : 'outline'}
              onClick={() => setThemeMode(m.value)}
              className={cn('min-h-[44px] flex-1')}
            >
              <m.icon className="h-4 w-4 mr-2" />
              {m.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Favorites ({favDays.length})
        </h3>
        {favDays.length === 0 ? (
          <p className="text-sm text-muted-foreground">No favorites yet</p>
        ) : (
          <div className="space-y-1">
            {favDays.map((p) => {
              const phase = getPhaseData(p.column);
              const sign = getSignData(p.row);
              return (
                <button
                  key={p.day}
                  onClick={() => navigate(`/day/${p.day}`)}
                  className="w-full flex items-center gap-3 rounded-md border px-3 py-2.5 text-left hover:bg-secondary min-h-[44px]"
                >
                  <ZodiacIcon sign={p.row} size={16} className="text-muted-foreground shrink-0" />
                  <MoonPhaseIcon phase={p.column} size={16} className="text-muted-foreground shrink-0" />
                  <span className="text-sm truncate">{phase.name} in {sign.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Notes ({noteDays.length})
        </h3>
        {noteDays.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes yet</p>
        ) : (
          <div className="space-y-1">
            {noteDays.map((p) => {
              const phase = getPhaseData(p.column);
              const sign = getSignData(p.row);
              return (
                <button
                  key={p.day}
                  onClick={() => navigate(`/day/${p.day}`)}
                  className="w-full flex items-center gap-3 rounded-md border px-3 py-2.5 text-left hover:bg-secondary min-h-[44px]"
                >
                  <ZodiacIcon sign={p.row} size={16} className="text-muted-foreground shrink-0" />
                  <MoonPhaseIcon phase={p.column} size={16} className="text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm truncate">{phase.name} in {sign.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{notes[p.day]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ExportImportPanel />
    </div>
  );
}
