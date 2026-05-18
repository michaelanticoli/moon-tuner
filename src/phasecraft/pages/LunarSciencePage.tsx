import { LUNAR_FACTS, CATEGORY_LABELS, type LunarFact } from '@/phasecraft/data/lunarScience';
import { Card, CardContent } from '@/components/ui/card';
import { MoonPhaseIcon, MOON_PHASE_NAMES } from '@/phasecraft/components/icons/MoonPhaseIcon';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as LunarFact['category'][];

export default function LunarSciencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Lunar Science</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Astronomical datapoints grounding the Phasecraft methodology
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const facts = LUNAR_FACTS.filter((f) => f.category === cat);
        if (!facts.length) return null;
        return (
          <section key={cat} className="space-y-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {CATEGORY_LABELS[cat]}
            </h2>
            <div className="space-y-2">
              {facts.map((fact) => (
                <Card key={fact.id}>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-sm leading-relaxed">{fact.text}</p>
                    {fact.relevantPhases && fact.relevantPhases.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
                          Relevant:
                        </span>
                        {fact.relevantPhases.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium text-muted-foreground"
                          >
                            <MoonPhaseIcon phase={p} size={10} />
                            {MOON_PHASE_NAMES[p - 1]}
                          </span>
                        ))}
                      </div>
                    )}
                    {fact.source && (
                      <p className="text-[9px] text-muted-foreground/60 italic">{fact.source}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
