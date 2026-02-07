import { motion } from "framer-motion";
import { X, Sparkles, Wind, BookOpen, Zap } from "lucide-react";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { getMoonPhase2026, getMoonSign2026, getHoursInSign } from "@/data/lunar2026Data";
import { DailyReading } from "@/data/parseDailyReadings";

interface CipherDayDetailProps {
  year: number;
  month: number;
  day: number;
  reading: DailyReading | null;
  onClose: () => void;
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

const ENERGY_COLORS: Record<string, string> = {
  Activation: "text-red-400",
  Integration: "text-blue-400",
  Void: "text-muted-foreground",
  Exploration: "text-amber-400",
  Release: "text-purple-400",
  Balance: "text-emerald-400",
  Transformation: "text-orange-400",
};

const SIGN_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

export function CipherDayDetail({ year, month, day, reading, onClose }: CipherDayDetailProps) {
  const date = new Date(year, month, day);
  const phaseData = getMoonPhase2026(date);
  const signData = getMoonSign2026(date);
  const hoursRemaining = getHoursInSign(date);
  const phaseKey = PHASE_TO_KEY[phaseData.phaseName] || "new";
  const illuminationPct = Math.round(phaseData.illumination * 100);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-[2rem] md:rounded-[3rem] p-8 md:p-12"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Phase + Sign */}
        <div className="flex items-start gap-5 mb-8">
          <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center shrink-0">
            <MoonPhaseGlyph phase={phaseKey} size={40} className="text-accent" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold tracking-[0.5em] text-accent block mb-1">
              {monthNames[month]} {day}, {year}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
              {reading?.title || `${phaseData.phaseName} in ${signData.sign}`}
            </h2>
          </div>
        </div>

        {/* Astronomical Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-muted/30 border border-border rounded-xl p-3">
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Phase</span>
            <span className="text-sm font-bold text-foreground">{phaseData.phaseName}</span>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-3">
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Moon Sign</span>
            <span className="text-sm font-bold text-foreground">
              {SIGN_GLYPHS[signData.sign]} {signData.sign}
            </span>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-3">
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Illumination</span>
            <span className="text-sm font-bold text-foreground">{illuminationPct}%</span>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-3">
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground block mb-1">Hours in Sign</span>
            <span className="text-sm font-bold text-foreground">{hoursRemaining}h remaining</span>
          </div>
        </div>

        {reading ? (
          <>
            {/* Energy Type + Featured Events */}
            <div className="flex flex-wrap gap-2 mb-8">
              {reading.energyType && (
                <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-border bg-muted/20 ${ENERGY_COLORS[reading.energyType] || 'text-accent'}`}>
                  {reading.energyType}
                </span>
              )}
              {reading.featuredEvents && (
                <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent">
                  {reading.featuredEvents}
                </span>
              )}
            </div>

            {/* Cosmic Weather Report */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Wind className="w-4 h-4 text-accent" />
                <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                  Cosmic Weather Report
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {reading.cosmicWeatherReport}
              </p>
            </div>

            {/* What This Means For You */}
            <div className="mb-8 p-6 bg-accent/5 border border-accent/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                  What This Means For You
                </h4>
              </div>
              <p className="text-foreground leading-relaxed text-sm md:text-base">
                {reading.whatThisMeansForYou}
              </p>
            </div>

            {/* Real World Translation */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <h4 className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                  Real World Translation
                </h4>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base italic">
                "{reading.realWorldTranslation}"
              </p>
            </div>

            {/* Practical Suggestions */}
            {reading.practicalSuggestions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <h4 className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                    Practical Suggestions
                  </h4>
                </div>
                <ul className="space-y-2">
                  {reading.practicalSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Closing Wisdom */}
            <div className="border-t border-border pt-6">
              <p className="text-center text-sm md:text-base font-serif italic text-muted-foreground">
                "{reading.closingWisdom}"
              </p>
            </div>
          </>
        ) : (
          /* Fallback when no reading data exists */
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm italic">
              Detailed reading data not available for this date.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              The Moon is in {signData.sign} during the {phaseData.phaseName} phase at {illuminationPct}% illumination.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
