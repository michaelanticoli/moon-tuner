// Prominent "what makes today personally significant" banner shown at the
// TOP of the Cipher day-detail modal — above the cosmic weather report.
//
// This is the integrative layer: it knows your natal chart (from shared
// birth data), today's transits (from the cipher engine), and the day's
// ICS events (eclipses, ingresses), and calls out landmark events the
// user would otherwise miss — birthdays, lunar returns, eclipse hits.
import { useEffect, useMemo, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSharedBirth } from "@/hooks/useSharedBirth";
import {
  computeNatalLuminaries,
  readCachedLuminaries,
  type NatalLuminaries,
} from "@/lib/natalOverlay";
import { detectLandmarks, type Landmark } from "@/lib/lifeLandmarks";
import type { DayEvents } from "@/data/parseICS";

interface Props {
  date: Date;
  dayEvents?: DayEvents | null;
}

export function LifeLandmarksBanner({ date, dayEvents }: Props) {
  const { birth } = useSharedBirth();
  const [natal, setNatal] = useState<NatalLuminaries | null>(() => readCachedLuminaries());
  const [loading, setLoading] = useState(false);
  const hasBirth = Boolean(birth.date && birth.time && birth.location);

  useEffect(() => {
    if (!hasBirth || natal) return;
    setLoading(true);
    computeNatalLuminaries(birth)
      .then(setNatal)
      .finally(() => setLoading(false));
  }, [hasBirth, birth, natal]);

  const landmarks = useMemo(() => {
    if (!natal) return [] as Landmark[];
    return detectLandmarks(date, natal, dayEvents);
  }, [date, natal, dayEvents]);

  if (!hasBirth) return null;
  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 text-[10px] text-muted-foreground">
        <Loader2 className="w-3 h-3 animate-spin" /> Scanning your natal landmarks…
      </div>
    );
  }
  if (!landmarks.length) return null;

  const major = landmarks.filter((l) => l.tier === "major");
  const rest = landmarks.filter((l) => l.tier !== "major");

  return (
    <div className="mb-8 space-y-3">
      {major.map((lm, i) => (
        <MajorLandmarkCard key={`m-${i}`} lm={lm} />
      ))}
      {rest.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {rest.map((lm, i) => (
            <MinorLandmarkChip key={`r-${i}`} lm={lm} />
          ))}
        </div>
      )}
    </div>
  );
}

function MajorLandmarkCard({ lm }: { lm: Landmark }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-5">
      <div className="absolute top-3 right-4 text-[8px] uppercase tracking-[0.4em] text-accent/60 font-bold">
        Personal Landmark
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
          <span className="text-xl text-accent">{lm.glyph}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-sm md:text-base font-bold text-foreground">{lm.title}</h3>
            {typeof lm.orb === "number" && (
              <span className="text-[9px] uppercase tracking-widest text-accent/70 font-bold">
                {lm.orb}° orb
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            {lm.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function MinorLandmarkChip({ lm }: { lm: Landmark }) {
  const tone =
    lm.tier === "notable"
      ? "border-accent/30 bg-accent/5 text-accent"
      : "border-border bg-muted/20 text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${tone}`}
      title={lm.subtitle}
    >
      <span className="text-sm normal-case">{lm.glyph}</span>
      {lm.title}
      {typeof lm.orb === "number" && (
        <span className="opacity-60 normal-case">{lm.orb}°</span>
      )}
    </span>
  );
}
