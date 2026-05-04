import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { getMoonPhase2026, getMoonSign2026 } from "@/data/lunar2026Data";
import { useSharedBirth } from "@/hooks/useSharedBirth";
import {
  computeNatalLuminaries,
  readCachedLuminaries,
  type NatalLuminaries,
} from "@/lib/natalOverlay";
import { hasLandmarkForDate } from "@/lib/lifeLandmarks";

interface CipherCalendarProps {
  year: number;
  month: number;
  onDaySelect: (day: number) => void;
}

const PHASE_TO_KEY: Record<string, 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent'> = {
  "New Moon": "new",
  "Waxing Crescent": "waxing-crescent",
  "First Quarter": "first-quarter",
  "Waxing Gibbous": "waxing-gibbous",
  "Full Moon": "full",
  "Waning Gibbous": "waning-gibbous",
  "Last Quarter": "last-quarter",
  "Waning Crescent": "waning-crescent",
};

const SIGN_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export function CipherCalendar({ year, month, onDaySelect }: CipherCalendarProps) {
  const firstDayOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Lazy-hydrate natal luminaries so we can pulse landmark days on the grid.
  const { birth } = useSharedBirth();
  const [natal, setNatal] = useState<NatalLuminaries | null>(() => readCachedLuminaries());
  useEffect(() => {
    if (natal) return;
    if (!birth.date || !birth.time || !birth.location) return;
    computeNatalLuminaries(birth).then((d) => d && setNatal(d));
  }, [birth, natal]);

  // Precompute landmark hits for the visible month (~30 lookups, cheap).
  const landmarkMap = useMemo(() => {
    const m = new Map<number, "major" | "notable" | "subtle">();
    if (!natal) return m;
    for (let d = 1; d <= daysInMonth; d++) {
      const r = hasLandmarkForDate(new Date(year, month, d), natal);
      if (r.hit && r.tier) m.set(d, r.tier);
    }
    return m;
  }, [natal, year, month, daysInMonth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-[3rem] p-6 md:p-10 overflow-hidden relative"
    >
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <div key={d} className="text-center text-[8px] md:text-[9px] text-muted-foreground font-bold tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {/* Empty offset cells */}
        {Array.from({ length: firstDayOffset }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const date = new Date(year, month, dayNum);
          const phaseData = getMoonPhase2026(date);
          const signData = getMoonSign2026(date);
          const phaseKey = PHASE_TO_KEY[phaseData.phaseName] || "new";
          const isToday = isCurrentMonth && today.getDate() === dayNum;
          const isKeyPhase = phaseData.phaseName === "New Moon" || phaseData.phaseName === "Full Moon";
          const landmarkTier = landmarkMap.get(dayNum);

          return (
            <button
              key={dayNum}
              onClick={() => onDaySelect(dayNum)}
              className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all group relative ${
                isToday
                  ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                  : landmarkTier === 'major'
                    ? 'border-accent/60 bg-accent/10 ring-1 ring-accent/40'
                    : isKeyPhase
                      ? 'border-accent/30 bg-accent/5'
                      : 'border-border bg-card/50'
              } hover:border-accent/50 hover:bg-accent/5`}
              title={landmarkTier ? `Personal landmark (${landmarkTier})` : undefined}
            >
              {landmarkTier && (
                <span
                  aria-hidden
                  className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                    landmarkTier === 'major'
                      ? 'bg-accent animate-pulse'
                      : landmarkTier === 'notable'
                        ? 'bg-accent/70'
                        : 'bg-accent/40'
                  }`}
                />
              )}
              <span className={`text-[9px] md:text-[10px] mb-0.5 ${isToday ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                {dayNum}
              </span>
              <MoonPhaseGlyph
                phase={phaseKey}
                size={20}
                className="text-foreground group-hover:scale-125 transition-transform"
              />
              <span className="text-[7px] md:text-[8px] text-muted-foreground mt-0.5 opacity-70">
                {SIGN_GLYPHS[signData.sign]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
