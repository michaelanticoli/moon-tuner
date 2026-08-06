import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Moon, Sun, Wind, Droplets, Flame, Mountain } from "lucide-react";
import { MoonPhaseGlyph } from "./MoonPhaseGlyph";
import { ZodiacGlyph } from "./ZodiacGlyph";

// Complete 8 phases with rich data
const PHASES = [
  { 
    name: "New Moon", 
    phaseKey: "new" as const,
    element: "Void",
    energy: "Stillness",
    action: "Plant seeds, set intentions, begin",
    quality: "Introspective",
    archetype: "The Seed"
  },
  { 
    name: "Crescent", 
    phaseKey: "waxing-crescent" as const,
    element: "Spark",
    energy: "Emergence",
    action: "Build momentum, overcome doubt",
    quality: "Striving",
    archetype: "The Sprout"
  },
  { 
    name: "First Quarter", 
    phaseKey: "first-quarter" as const,
    element: "Fire",
    energy: "Action",
    action: "Take decisive action, meet challenges",
    quality: "Dynamic",
    archetype: "The Warrior"
  },
  { 
    name: "Gibbous", 
    phaseKey: "waxing-gibbous" as const,
    element: "Air",
    energy: "Refinement",
    action: "Analyze, adjust, perfect",
    quality: "Analytical",
    archetype: "The Editor"
  },
  { 
    name: "Full Moon", 
    phaseKey: "full" as const,
    element: "Light",
    energy: "Illumination",
    action: "Celebrate, release, express fully",
    quality: "Expressive",
    archetype: "The Bloom"
  },
  { 
    name: "Disseminating", 
    phaseKey: "waning-gibbous" as const,
    element: "Water",
    energy: "Gratitude",
    action: "Share wisdom, teach, give back",
    quality: "Generous",
    archetype: "The Teacher"
  },
  { 
    name: "Last Quarter", 
    phaseKey: "last-quarter" as const,
    element: "Earth",
    energy: "Release",
    action: "Let go, reassess, clear",
    quality: "Transformative",
    archetype: "The Reaper"
  },
  { 
    name: "Balsamic", 
    phaseKey: "waning-crescent" as const,
    element: "Ether",
    energy: "Surrender",
    action: "Rest, dream, prepare for renewal",
    quality: "Mystical",
    archetype: "The Oracle"
  },
];

// Complete 12 zodiac signs with rich body mappings
const ZODIAC = [
  { sign: "Aries", signKey: "aries" as const, element: "Fire", body: "Head, Brain, Face", bodyDetail: "Migraines, sinuses, facial skin, mental clarity", flavor: "Initiate bold action, start new projects, assert yourself", ruled: "Mars", season: "Spring Equinox" },
  { sign: "Taurus", signKey: "taurus" as const, element: "Earth", body: "Throat, Neck, Thyroid", bodyDetail: "Voice, swallowing, neck tension, thyroid function", flavor: "Ground in sensory pleasure, handle finances, slow rituals", ruled: "Venus", season: "Mid-Spring" },
  { sign: "Gemini", signKey: "gemini" as const, element: "Air", body: "Arms, Hands, Lungs", bodyDetail: "Breathing, dexterity, shoulder mobility, communication", flavor: "Write, network, learn, take short journeys, gather information", ruled: "Mercury", season: "Late Spring" },
  { sign: "Cancer", signKey: "cancer" as const, element: "Water", body: "Chest, Stomach, Breasts", bodyDetail: "Digestion, emotional eating, nurturing capacity, gut feelings", flavor: "Nest, nurture, cook, honor ancestors, protect what matters", ruled: "Moon", season: "Summer Solstice" },
  { sign: "Leo", signKey: "leo" as const, element: "Fire", body: "Heart, Spine, Upper Back", bodyDetail: "Cardiovascular health, posture, courage, vitality", flavor: "Showcase talents, play freely, celebrate, lead with heart", ruled: "Sun", season: "Mid-Summer" },
  { sign: "Virgo", signKey: "virgo" as const, element: "Earth", body: "Digestive System, Intestines", bodyDetail: "Gut health, nervous digestion, food sensitivities, routine", flavor: "Organize systems, refine health practices, serve with skill", ruled: "Mercury", season: "Late Summer" },
  { sign: "Libra", signKey: "libra" as const, element: "Air", body: "Kidneys, Lower Back, Adrenals", bodyDetail: "Balance, toxin filtration, partnership energy, equilibrium", flavor: "Collaborate, beautify spaces, seek harmony, negotiate fairly", ruled: "Venus", season: "Autumn Equinox" },
  { sign: "Scorpio", signKey: "scorpio" as const, element: "Water", body: "Reproductive Organs, Elimination", bodyDetail: "Sexual health, detoxification, regeneration, hidden depths", flavor: "Research truth, purge what's dead, transform from within", ruled: "Pluto/Mars", season: "Mid-Autumn" },
  { sign: "Sagittarius", signKey: "sagittarius" as const, element: "Fire", body: "Hips, Thighs, Liver", bodyDetail: "Mobility, expansion, optimism, liver detox, adventure capacity", flavor: "Explore far territories, philosophize, aim for meaning", ruled: "Jupiter", season: "Late Autumn" },
  { sign: "Capricorn", signKey: "capricorn" as const, element: "Earth", body: "Knees, Bones, Skeletal System", bodyDetail: "Joint health, structure, boundaries, long-term stamina", flavor: "Strategize long-term, build foundations, climb steadily", ruled: "Saturn", season: "Winter Solstice" },
  { sign: "Aquarius", signKey: "aquarius" as const, element: "Air", body: "Ankles, Circulation, Nervous System", bodyDetail: "Blood flow, electrical impulses, innovation capacity, community", flavor: "Innovate systems, connect groups, embrace the unconventional", ruled: "Uranus/Saturn", season: "Mid-Winter" },
  { sign: "Pisces", signKey: "pisces" as const, element: "Water", body: "Feet, Lymphatic System, Pineal Gland", bodyDetail: "Intuition, dreams, immune flow, spiritual sensitivity", flavor: "Create art, meditate deeply, dissolve ego boundaries", ruled: "Neptune/Jupiter", season: "Late Winter" },
];

const elementColors: Record<string, string> = {
  Fire: "bg-orange-500/20 border-orange-500/40 text-orange-400",
  Earth: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
  Air: "bg-sky-500/20 border-sky-500/40 text-sky-400",
  Water: "bg-blue-500/20 border-blue-500/40 text-blue-400",
};

const elementTextColors: Record<string, string> = {
  Fire: "text-orange-400",
  Earth: "text-emerald-400",
  Air: "text-sky-400",
  Water: "text-blue-400",
};

interface SelectedCell {
  phase: typeof PHASES[0];
  zodiac: typeof ZODIAC[0];
}

function generateInsight(phase: typeof PHASES[0], zodiac: typeof ZODIAC[0]): string {
  const insights: Record<string, Record<string, string>> = {
    "New Moon": {
      "Aries": "Initiate bold new beginnings. Plant seeds of leadership and self-assertion.",
      "Taurus": "Ground your intentions in sensory reality. Begin slow, sustainable practices.",
      "Gemini": "Start new communication projects. Plant seeds of learning and connection.",
      "Cancer": "Begin nurturing rituals. Set intentions around home and emotional security.",
      "Leo": "Initiate creative projects. Plant seeds of self-expression and joy.",
      "Virgo": "Start new health routines. Set intentions around service and refinement.",
      "Libra": "Begin partnership work. Plant seeds of harmony and collaboration.",
      "Scorpio": "Initiate deep transformation. Set powerful intentions for rebirth.",
      "Sagittarius": "Start adventurous pursuits. Plant seeds of wisdom and expansion.",
      "Capricorn": "Begin building foundations. Set long-term, ambitious intentions.",
      "Aquarius": "Initiate innovative projects. Plant seeds of community and change.",
      "Pisces": "Start spiritual practices. Set intentions for creativity and surrender.",
    },
    "Full Moon": {
      "Aries": "Release anger and impatience. Celebrate victories of courage.",
      "Taurus": "Release material attachment. Celebrate abundance and pleasure.",
      "Gemini": "Release scattered energy. Celebrate connections and ideas.",
      "Cancer": "Release emotional baggage. Celebrate family and nurturing.",
      "Leo": "Release ego attachment. Celebrate authentic self-expression.",
      "Virgo": "Release perfectionism. Celebrate health and service.",
      "Libra": "Release codependency. Celebrate partnership harmony.",
      "Scorpio": "Release control. Celebrate transformation and power.",
      "Sagittarius": "Release limiting beliefs. Celebrate freedom and truth.",
      "Capricorn": "Release excessive control. Celebrate achievements.",
      "Aquarius": "Release detachment. Celebrate community and innovation.",
      "Pisces": "Release escapism. Celebrate spiritual connection and art.",
    },
  };

  // Return specific insight if available, otherwise generate a generic one
  if (insights[phase.name] && insights[phase.name][zodiac.sign]) {
    return insights[phase.name][zodiac.sign];
  }

  // Generate insight based on phase energy and zodiac flavor
  return `${phase.archetype} energy meets ${zodiac.sign}'s ${zodiac.element} nature. ${phase.action} while channeling ${zodiac.flavor.toLowerCase()}.`;
}

export function PhaseSignMatrix() {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [hoveredSign, setHoveredSign] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <span className="system-label block mb-4">Interactive Phase-Sign Matrix</span>
        <h3 className="font-serif text-2xl lg:text-4xl text-foreground mb-4">
          96 Unique Lunar Configurations
        </h3>
        <p className="text-muted-foreground max-w-2xl">
          Click any cell to explore how each phase expresses differently through each zodiac sign. 
          The Moon visits every combination each lunar month.
        </p>
      </div>

      {/* Matrix Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[900px]">
          {/* Header Row - Phases */}
          <div className="grid grid-cols-[120px_repeat(8,1fr)] gap-1 mb-1">
            <div className="p-2" /> {/* Empty corner cell */}
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.name}
                className={`p-3 text-center rounded-t-lg transition-colors cursor-pointer ${
                  hoveredPhase === i ? 'bg-card border border-border' : 'bg-secondary/30'
                }`}
                onMouseEnter={() => setHoveredPhase(i)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <div className="flex justify-center mb-1">
                  <MoonPhaseGlyph phase={phase.phaseKey} size="lg" className="text-foreground" />
                </div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  {phase.name.split(' ')[0]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Body Rows - Zodiac Signs */}
          {ZODIAC.map((zodiac, zIndex) => (
            <div key={zodiac.sign} className="grid grid-cols-[120px_repeat(8,1fr)] gap-1 mb-1">
              {/* Sign Label */}
              <motion.div
                className={`p-3 flex items-center gap-2 rounded-l-lg transition-colors cursor-pointer ${
                  hoveredSign === zIndex ? 'bg-card border border-border' : 'bg-secondary/30'
                }`}
                onMouseEnter={() => setHoveredSign(zIndex)}
                onMouseLeave={() => setHoveredSign(null)}
              >
                <ZodiacGlyph sign={zodiac.signKey} size="lg" className={elementTextColors[zodiac.element]} />
                <span className="text-sm text-foreground">{zodiac.sign}</span>
              </motion.div>

              {/* Matrix Cells */}
              {PHASES.map((phase, pIndex) => {
                const isHighlighted = hoveredPhase === pIndex || hoveredSign === zIndex;
                const isSelected = selectedCell?.phase.name === phase.name && 
                                  selectedCell?.zodiac.sign === zodiac.sign;

                return (
                  <motion.button
                    key={`${phase.name}-${zodiac.sign}`}
                    className={`
                      p-3 rounded-md border transition-all duration-200 cursor-pointer
                      ${isSelected 
                        ? 'bg-accent/20 border-accent ring-2 ring-accent/50' 
                        : isHighlighted 
                          ? 'bg-card border-border/60' 
                          : 'bg-secondary/20 border-transparent hover:bg-card hover:border-border/40'
                      }
                    `}
                    onClick={() => setSelectedCell({ phase, zodiac })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <ZodiacGlyph sign={zodiac.signKey} size="sm" className={elementTextColors[zodiac.element]} />
                      <MoonPhaseGlyph phase={phase.phaseKey} size="md" className="text-foreground" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Cell Detail Panel */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 bg-card border border-border rounded-2xl p-8 relative"
          >
            <button
              onClick={() => setSelectedCell(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Phase Info */}
              <div className="space-y-4">
                <span className="system-label block">Phase</span>
                <div className="flex items-center gap-3">
                  <MoonPhaseGlyph phase={selectedCell.phase.phaseKey} size="xl" className="text-foreground" />
                  <div>
                    <h4 className="font-serif text-xl text-foreground">{selectedCell.phase.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedCell.phase.archetype}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Energy:</span> <span className="text-foreground">{selectedCell.phase.energy}</span></p>
                  <p><span className="text-muted-foreground">Element:</span> <span className="text-foreground">{selectedCell.phase.element}</span></p>
                  <p><span className="text-muted-foreground">Quality:</span> <span className="text-foreground">{selectedCell.phase.quality}</span></p>
                </div>
              </div>

              {/* Zodiac Info */}
              <div className="space-y-4">
                <span className="system-label block">Zodiac Sign</span>
                <div className={`rounded-lg border p-4 ${elementColors[selectedCell.zodiac.element]}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <ZodiacGlyph sign={selectedCell.zodiac.signKey} size="xl" className="text-current" />
                    <div>
                      <h4 className="font-serif text-xl">{selectedCell.zodiac.sign}</h4>
                      <p className="text-sm opacity-80">{selectedCell.zodiac.element} · {selectedCell.zodiac.ruled}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">{selectedCell.zodiac.flavor}</p>
                </div>
              </div>

              {/* Combined Insight */}
              <div className="space-y-4">
                <span className="system-label block">Configuration Insight</span>
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <p className="text-foreground leading-relaxed">
                    {generateInsight(selectedCell.phase, selectedCell.zodiac)}
                  </p>
                </div>
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Body Focus</span>
                  </div>
                  <p className="text-sm text-foreground">{selectedCell.zodiac.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedCell.zodiac.bodyDetail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {Object.entries(elementColors).map(([element, classes]) => (
          <div key={element} className={`px-3 py-1 rounded-full border text-xs ${classes}`}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}