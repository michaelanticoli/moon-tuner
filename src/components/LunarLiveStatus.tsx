import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMoonPhase } from "@/hooks/useMoonPhase";
import { Activity, MapPin, Zap, Clock, Sparkles, ArrowRight } from "lucide-react";

// Zodiac sign calculation based on current moon position
const ZODIAC_SIGNS = [
  { sign: "Aries", symbol: "♈", element: "Fire", body: "Head & Brain", ruler: "Mars", quality: "Cardinal" },
  { sign: "Taurus", symbol: "♉", element: "Earth", body: "Throat & Neck", ruler: "Venus", quality: "Fixed" },
  { sign: "Gemini", symbol: "♊", element: "Air", body: "Arms & Lungs", ruler: "Mercury", quality: "Mutable" },
  { sign: "Cancer", symbol: "♋", element: "Water", body: "Chest & Stomach", ruler: "Moon", quality: "Cardinal" },
  { sign: "Leo", symbol: "♌", element: "Fire", body: "Heart & Spine", ruler: "Sun", quality: "Fixed" },
  { sign: "Virgo", symbol: "♍", element: "Earth", body: "Digestive System", ruler: "Mercury", quality: "Mutable" },
  { sign: "Libra", symbol: "♎", element: "Air", body: "Kidneys & Lower Back", ruler: "Venus", quality: "Cardinal" },
  { sign: "Scorpio", symbol: "♏", element: "Water", body: "Reproductive Organs", ruler: "Pluto", quality: "Fixed" },
  { sign: "Sagittarius", symbol: "♐", element: "Fire", body: "Hips & Thighs", ruler: "Jupiter", quality: "Mutable" },
  { sign: "Capricorn", symbol: "♑", element: "Earth", body: "Knees & Bones", ruler: "Saturn", quality: "Cardinal" },
  { sign: "Aquarius", symbol: "♒", element: "Air", body: "Ankles & Circulation", ruler: "Uranus", quality: "Fixed" },
  { sign: "Pisces", symbol: "♓", element: "Water", body: "Feet & Lymphatic", ruler: "Neptune", quality: "Mutable" },
];

// Moon transits each sign for ~2.5 days, completing the zodiac in ~27.3 days
function getCurrentZodiacSign(date: Date = new Date()) {
  // Reference point: Moon was in Aries on Jan 1, 2024 00:00 UTC
  const referenceDate = new Date("2024-01-01T00:00:00Z");
  const siderealMonth = 27.321661; // days for moon to complete zodiac
  const daysSinceReference = (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysPerSign = siderealMonth / 12;
  const signIndex = Math.floor((daysSinceReference % siderealMonth) / daysPerSign);
  return ZODIAC_SIGNS[(signIndex + 12) % 12];
}

function getTimeInSign(date: Date = new Date()) {
  const siderealMonth = 27.321661;
  const daysPerSign = siderealMonth / 12;
  const referenceDate = new Date("2024-01-01T00:00:00Z");
  const daysSinceReference = (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);
  const positionInCycle = daysSinceReference % siderealMonth;
  const positionInSign = positionInCycle % daysPerSign;
  const hoursRemaining = (daysPerSign - positionInSign) * 24;
  return Math.floor(hoursRemaining);
}

const elementColors = {
  Fire: "text-orange-400",
  Earth: "text-emerald-400",
  Air: "text-sky-400",
  Water: "text-blue-400",
};

const elementBg = {
  Fire: "bg-orange-400/10 border-orange-400/30",
  Earth: "bg-emerald-400/10 border-emerald-400/30",
  Air: "bg-sky-400/10 border-sky-400/30",
  Water: "bg-blue-400/10 border-blue-400/30",
};

export function LunarLiveStatus() {
  const moonPhase = useMoonPhase();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [zodiacSign, setZodiacSign] = useState(getCurrentZodiacSign());
  const [hoursRemaining, setHoursRemaining] = useState(getTimeInSign());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setZodiacSign(getCurrentZodiacSign(now));
      setHoursRemaining(getTimeInSign(now));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const elementColor = elementColors[zodiacSign.element as keyof typeof elementColors];
  const elementBgClass = elementBg[zodiacSign.element as keyof typeof elementBg];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Main Status Card */}
      <div className="bg-card border border-border rounded-2xl p-8 relative">
        {/* Live Indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="system-label text-accent">LIVE</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="system-label block mb-2">Current Lunar Configuration</span>
          <h3 className="font-serif text-3xl lg:text-4xl text-foreground">
            {moonPhase.astrological.phaseName}
          </h3>
          <p className="text-muted-foreground mt-2">
            in <span className={`font-medium ${elementColor}`}>{zodiacSign.sign}</span>
          </p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span className="system-label">Phase</span>
            </div>
            <p className="font-sans text-lg text-foreground">{moonPhase.astrological.phaseName}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="system-label">Transit</span>
            </div>
            <p className="font-sans text-lg text-foreground">
              <span className={elementColor}>{zodiacSign.symbol}</span> {zodiacSign.sign}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span className="system-label">Energy</span>
            </div>
            <p className="font-sans text-lg text-foreground">{moonPhase.astrological.energy}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="system-label">Time Remaining</span>
            </div>
            <p className="font-sans text-lg text-foreground">~{hoursRemaining}h in {zodiacSign.sign}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line mb-8" />

        {/* Current Configuration Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Phase Info */}
          <div className="space-y-4">
            <span className="system-label block">Phase Theme</span>
            <div className="space-y-2">
              <p className="text-foreground font-medium">{moonPhase.astrological.theme}</p>
              <p className="text-muted-foreground text-sm">{moonPhase.astrological.quality}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">{moonPhase.astrological.frequencyHz}Hz Resonance</span>
            </div>
          </div>

          {/* Zodiac Layer */}
          <div className="space-y-4">
            <span className="system-label block">Zodiac Influence</span>
            <div className={`rounded-lg border p-4 ${elementBgClass}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{zodiacSign.symbol}</span>
                <div>
                  <p className={`font-medium ${elementColor}`}>{zodiacSign.sign}</p>
                  <p className="text-sm text-muted-foreground">{zodiacSign.element} · {zodiacSign.quality}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Ruled by {zodiacSign.ruler}</p>
            </div>
          </div>

          {/* Body Connection */}
          <div className="space-y-4">
            <span className="system-label block">Body Activation</span>
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <p className="text-foreground font-medium mb-2">{zodiacSign.body}</p>
              <p className="text-sm text-muted-foreground">
                Moon in {zodiacSign.sign} activates and sensitizes this area. 
                Ideal for focused healing, awareness, or gentle attention.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Illumination: <span className="text-foreground font-medium">{moonPhase.astronomical.illumination.toFixed(0)}%</span>
          </p>
          <button className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
            <span>Explore Phase-Sign Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}