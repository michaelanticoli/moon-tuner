import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Wind, BookOpen, Zap, Moon, Globe, Star, ChevronDown, Loader2 } from "lucide-react";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { getMoonPhase2026, getMoonSign2026, getHoursInSign } from "@/data/lunar2026Data";
import { DailyReading } from "@/data/parseDailyReadings";
import { DayEvents } from "@/data/parseICS";
import { fetchDatapoints, generateCycleInsight, type LunarDatapoint } from "@/data/lunarDatapoints";
import { CycleInsightCard } from "@/components/CycleInsightCard";

interface CipherDayDetailProps {
  year: number;
  month: number;
  day: number;
  reading: DailyReading | null;
  dayEvents?: DayEvents | null;
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

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
}

function CycleContextSection({ phaseData, dayEvents }: { phaseData: any; dayEvents?: DayEvents | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [datapoints, setDatapoints] = useState<LunarDatapoint[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Determine relevant category from events
  const hasEclipse = dayEvents?.events.some(e => 
    e.summary.toLowerCase().includes("eclipse")
  );
  const category = hasEclipse ? "eclipse" : "synodic";

  useEffect(() => {
    if (isOpen && !loaded) {
      fetchDatapoints({ category, limit: 3, minRelevance: 0.7 }).then((data) => {
        setDatapoints(data);
        setLoaded(true);
      });
    }
  }, [isOpen, loaded, category]);

  const handleGenerateInsight = async () => {
    setLoadingAi(true);
    const hint = `Current phase: ${phaseData.phaseName}, illumination: ${Math.round(phaseData.illumination * 100)}%`;
    const { insight } = await generateCycleInsight(category, hint);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        Cycle Context
      </button>
      {isOpen && (
        <div className="mt-3 space-y-2">
          {datapoints.map((dp) => (
            <CycleInsightCard key={dp.id} datapoint={dp} compact />
          ))}
          {datapoints.length > 0 && !aiInsight && (
            <button
              onClick={handleGenerateInsight}
              disabled={loadingAi}
              className="inline-flex items-center gap-1.5 text-[10px] text-accent hover:text-accent/80 mt-2 disabled:opacity-50"
            >
              {loadingAi ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {loadingAi ? "Synthesizing..." : "Generate Cycle Intelligence"}
            </button>
          )}
          {aiInsight && (
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mt-2">
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{aiInsight}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CipherDayDetail({ year, month, day, reading, dayEvents, onClose }: CipherDayDetailProps) {
  const date = new Date(year, month, day);
  const phaseData = getMoonPhase2026(date);
  const signData = getMoonSign2026(date);
  const hoursRemaining = getHoursInSign(date);
  const phaseKey = PHASE_TO_KEY[phaseData.phaseName] || "new";
  const illuminationPct = Math.round(phaseData.illumination * 100);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Build title from ICS atmosphere or reading
  const atmosphereTitle = dayEvents?.dailyAtmosphere?.title || "";
  const displayTitle = reading?.title || atmosphereTitle || `${phaseData.phaseName} in ${signData.sign}`;

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
              {displayTitle}
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

            {/* Cycle Context */}
            <CycleContextSection phaseData={phaseData} dayEvents={dayEvents} />
          </>
        ) : dayEvents && dayEvents.events.length > 0 ? (
          /* ICS-based content when no CSV reading exists */
          <div className="space-y-6">
            {/* Daily Atmosphere */}
            {dayEvents.dailyAtmosphere && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="w-4 h-4 text-accent" />
                  <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                    Daily Atmosphere
                  </h4>
                </div>
                <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
                  {dayEvents.dailyAtmosphere.description.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Lunar Phase Event */}
            {dayEvents.lunarPhase && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-accent" />
                  <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                    {dayEvents.lunarPhase.summary.replace(/[\p{Emoji}\p{Emoji_Component}♈♉♊♋♌♍♎♏♐♑♒♓]/gu, "").trim()}
                  </h4>
                </div>
                <div className="text-foreground leading-relaxed text-sm md:text-base space-y-3">
                  {dayEvents.lunarPhase.description.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Void of Course */}
            {dayEvents.voidMoon && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                    Void of Course
                  </h4>
                  <span className="text-[9px] text-muted-foreground/60">
                    {formatTime(dayEvents.voidMoon.dtstart)}
                  </span>
                </div>
                <div className="text-muted-foreground leading-relaxed text-sm space-y-3">
                  {dayEvents.voidMoon.description.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Planetary Ingresses */}
            {dayEvents.ingresses.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-accent" />
                  <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                    Ingresses
                  </h4>
                </div>
                <div className="space-y-4">
                  {dayEvents.ingresses.map((evt, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-foreground mb-1">{evt.title}</p>
                      <div className="text-muted-foreground leading-relaxed text-sm space-y-2">
                        {evt.description.split("\n").filter(Boolean).slice(0, 3).map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stations */}
            {dayEvents.stations.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold">
                    Planetary Stations
                  </h4>
                </div>
                <div className="space-y-4">
                  {dayEvents.stations.map((evt, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-foreground mb-1">{evt.title}</p>
                      <div className="text-muted-foreground leading-relaxed text-sm space-y-2">
                        {evt.description.split("\n").filter(Boolean).slice(0, 3).map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Fallback when no data exists at all */
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm italic">
              Detailed reading data not available for this date.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              The Moon is in {signData.sign} during the {phaseData.phaseName} phase at {illuminationPct}% illumination.
            </p>
            <CycleContextSection phaseData={phaseData} dayEvents={dayEvents} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
