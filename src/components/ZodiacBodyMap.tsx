import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Sparkles, Heart, ArrowRight } from "lucide-react";

const BODY_ZONES = [
  {
    id: "head",
    sign: "Aries",
    symbol: "♈",
    element: "Fire",
    area: "Head & Face",
    parts: ["Brain", "Eyes", "Sinuses", "Facial muscles"],
    practices: ["Head massage", "Eye exercises", "Sinus clearing breathwork", "Scalp stimulation"],
    moonGuidance: "When Moon transits Aries, head-related sensitivities increase. Avoid overheating the head. Practice cooling breath.",
    yPosition: 5,
    xPosition: 50,
  },
  {
    id: "throat",
    sign: "Taurus",
    symbol: "♉",
    element: "Earth",
    area: "Throat & Neck",
    parts: ["Thyroid", "Vocal cords", "Neck vertebrae", "Tonsils"],
    practices: ["Neck stretches", "Singing/humming", "Thyroid massage", "Throat chakra toning"],
    moonGuidance: "Taurus Moon heightens throat sensitivity. Protect voice, hydrate well, practice slow eating.",
    yPosition: 15,
    xPosition: 50,
  },
  {
    id: "arms",
    sign: "Gemini",
    symbol: "♊",
    element: "Air",
    area: "Arms, Hands & Lungs",
    parts: ["Shoulders", "Arms", "Wrists", "Fingers", "Respiratory system"],
    practices: ["Arm circles", "Hand mudras", "Pranayama", "Finger exercises"],
    moonGuidance: "Gemini Moon activates hands and breath. Excellent for writing, gesturing, breathwork.",
    yPosition: 25,
    xPosition: 25,
  },
  {
    id: "chest",
    sign: "Cancer",
    symbol: "♋",
    element: "Water",
    area: "Chest & Stomach",
    parts: ["Breasts", "Stomach", "Womb", "Emotional body"],
    practices: ["Chest opening", "Abdominal massage", "Emotional release", "Nurturing rituals"],
    moonGuidance: "Cancer Moon (the Moon's home) deepens emotional sensitivity. Honor gut feelings, nurture yourself.",
    yPosition: 35,
    xPosition: 50,
  },
  {
    id: "heart",
    sign: "Leo",
    symbol: "♌",
    element: "Fire",
    area: "Heart & Upper Back",
    parts: ["Heart", "Spine", "Upper back", "Circulation"],
    practices: ["Heart-opening yoga", "Back strengthening", "Cardiovascular exercise", "Joy practices"],
    moonGuidance: "Leo Moon fires up the heart center. Express love boldly, move the spine, radiate.",
    yPosition: 32,
    xPosition: 50,
  },
  {
    id: "digestive",
    sign: "Virgo",
    symbol: "♍",
    element: "Earth",
    area: "Digestive System",
    parts: ["Intestines", "Pancreas", "Spleen", "Nervous stomach"],
    practices: ["Abdominal massage", "Mindful eating", "Digestive herbs", "Nervous system regulation"],
    moonGuidance: "Virgo Moon sensitizes digestion. Eat simply, avoid processed foods, practice discernment.",
    yPosition: 45,
    xPosition: 50,
  },
  {
    id: "kidneys",
    sign: "Libra",
    symbol: "♎",
    element: "Air",
    area: "Kidneys & Lower Back",
    parts: ["Kidneys", "Adrenals", "Lower back", "Skin"],
    practices: ["Kidney warming", "Lower back care", "Hydration rituals", "Balance exercises"],
    moonGuidance: "Libra Moon calls for balance in all things. Support kidneys with hydration, rest lower back.",
    yPosition: 50,
    xPosition: 50,
  },
  {
    id: "reproductive",
    sign: "Scorpio",
    symbol: "♏",
    element: "Water",
    area: "Reproductive & Elimination",
    parts: ["Reproductive organs", "Bladder", "Colon", "Regenerative systems"],
    practices: ["Pelvic floor work", "Sexual healing", "Detox rituals", "Shadow work"],
    moonGuidance: "Scorpio Moon intensifies transformative processes. Honor sexuality, support elimination, go deep.",
    yPosition: 58,
    xPosition: 50,
  },
  {
    id: "hips",
    sign: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    area: "Hips & Thighs",
    parts: ["Hip joints", "Thigh muscles", "Sciatic nerve", "Liver"],
    practices: ["Hip openers", "Thigh stretches", "Liver support", "Walking meditation"],
    moonGuidance: "Sagittarius Moon expands mobility. Move freely, stretch hips, support liver function.",
    yPosition: 65,
    xPosition: 40,
  },
  {
    id: "knees",
    sign: "Capricorn",
    symbol: "♑",
    element: "Earth",
    area: "Knees & Skeletal System",
    parts: ["Knees", "Bones", "Joints", "Teeth"],
    practices: ["Knee-friendly exercise", "Bone-building nutrients", "Joint care", "Posture work"],
    moonGuidance: "Capricorn Moon highlights structure. Protect knees, nourish bones, honor your foundation.",
    yPosition: 75,
    xPosition: 50,
  },
  {
    id: "ankles",
    sign: "Aquarius",
    symbol: "♒",
    element: "Air",
    area: "Ankles & Circulation",
    parts: ["Ankles", "Calves", "Circulatory system", "Nervous system"],
    practices: ["Ankle rotations", "Calf stretches", "Circulation boosting", "Grounding through feet"],
    moonGuidance: "Aquarius Moon electrifies the nervous system. Move ankles, boost circulation, stay grounded.",
    yPosition: 85,
    xPosition: 50,
  },
  {
    id: "feet",
    sign: "Pisces",
    symbol: "♓",
    element: "Water",
    area: "Feet & Lymphatic System",
    parts: ["Feet", "Lymph nodes", "Pineal gland", "Immune system"],
    practices: ["Foot massage", "Reflexology", "Lymphatic drainage", "Dream work"],
    moonGuidance: "Pisces Moon sensitizes intuition through the feet. Practice grounding, honor dreams, support lymph.",
    yPosition: 95,
    xPosition: 50,
  },
];

const elementStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Fire: { 
    bg: "bg-orange-500/20", 
    border: "border-orange-500/50", 
    text: "text-orange-400",
    glow: "shadow-orange-500/30"
  },
  Earth: { 
    bg: "bg-emerald-500/20", 
    border: "border-emerald-500/50", 
    text: "text-emerald-400",
    glow: "shadow-emerald-500/30"
  },
  Air: { 
    bg: "bg-sky-500/20", 
    border: "border-sky-500/50", 
    text: "text-sky-400",
    glow: "shadow-sky-500/30"
  },
  Water: { 
    bg: "bg-blue-500/20", 
    border: "border-blue-500/50", 
    text: "text-blue-400",
    glow: "shadow-blue-500/30"
  },
};

export function ZodiacBodyMap() {
  const [selectedZone, setSelectedZone] = useState<typeof BODY_ZONES[0] | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-8 lg:mb-12 text-center">
        <span className="system-label block mb-4">Zodiac-Body Integration Map</span>
        <h3 className="font-serif text-2xl lg:text-4xl text-foreground mb-4">
          The Moon's Path Through Your Body
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Each zodiac sign governs specific body regions. As the Moon transits each sign (~2.5 days), 
          these areas become sensitized—ideal for focused healing, awareness, and somatic practice.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Body Visualization */}
        <div className="relative bg-card border border-border rounded-2xl p-8 min-h-[600px]">
          {/* Body Silhouette */}
          <div className="relative w-full h-full flex justify-center">
            <svg 
              viewBox="0 0 200 400" 
              className="w-full max-w-[240px] h-auto"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.05))" }}
            >
              {/* Simplified body outline */}
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Head */}
              <ellipse cx="100" cy="35" rx="25" ry="30" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Neck */}
              <rect x="90" y="60" width="20" height="15" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Torso */}
              <path d="M60 75 L140 75 L150 200 L50 200 Z" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Arms */}
              <path d="M60 80 L30 140 L25 160 L35 165 L50 130 L60 100" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              <path d="M140 80 L170 140 L175 160 L165 165 L150 130 L140 100" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Legs */}
              <path d="M60 200 L55 320 L45 380 L70 385 L80 325 L90 250" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
              <path d="M140 200 L145 320 L155 380 L130 385 L120 325 L110 250" fill="url(#bodyGradient)" stroke="hsl(var(--border))" strokeWidth="1" />
            </svg>

            {/* Interactive Zone Markers */}
            {BODY_ZONES.map((zone) => {
              const style = elementStyles[zone.element];
              const isHovered = hoveredZone === zone.id;
              const isSelected = selectedZone?.id === zone.id;
              
              return (
                <motion.button
                  key={zone.id}
                  className={`
                    absolute w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300 cursor-pointer z-10
                    ${isSelected ? `${style.bg} ${style.border} ${style.text} shadow-lg ${style.glow}` : 
                      isHovered ? `${style.bg} ${style.border} ${style.text}` : 
                      'bg-secondary/50 border-border/50 text-muted-foreground hover:border-border'}
                  `}
                  style={{
                    top: `${zone.yPosition}%`,
                    left: `${zone.xPosition}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedZone(zone)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isSelected ? { scale: 1.1 } : {}}
                >
                  <span className="text-lg">{zone.symbol}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Zone List (Mobile Fallback) */}
          <div className="mt-8 lg:hidden">
            <div className="grid grid-cols-4 gap-2">
              {BODY_ZONES.map((zone) => {
                const style = elementStyles[zone.element];
                const isSelected = selectedZone?.id === zone.id;
                
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`
                      p-2 rounded-lg border text-center transition-all
                      ${isSelected ? `${style.bg} ${style.border}` : 'bg-secondary/30 border-border/50'}
                    `}
                  >
                    <span className={`text-lg ${style.text}`}>{zone.symbol}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{zone.sign}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedZone ? (
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Zone Header */}
                <div className={`rounded-2xl border p-6 ${elementStyles[selectedZone.element].bg} ${elementStyles[selectedZone.element].border}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-5xl ${elementStyles[selectedZone.element].text}`}>
                      {selectedZone.symbol}
                    </span>
                    <div>
                      <h4 className="font-serif text-2xl text-foreground">{selectedZone.sign}</h4>
                      <p className={`text-sm ${elementStyles[selectedZone.element].text}`}>
                        {selectedZone.element} Sign · {selectedZone.area}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body Parts */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <span className="system-label block mb-4">Governed Body Parts</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedZone.parts.map((part) => (
                      <span 
                        key={part}
                        className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Moon Guidance */}
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="system-label text-accent">Moon Transit Guidance</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {selectedZone.moonGuidance}
                  </p>
                </div>

                {/* Practices */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <span className="system-label block mb-4">Somatic Practices</span>
                  <ul className="space-y-3">
                    {selectedZone.practices.map((practice, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-foreground">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="font-serif text-xl text-foreground mb-2">
                  Select a Body Zone
                </h4>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Click any zodiac marker on the body map to explore its governance, 
                  lunar sensitivity, and recommended practices.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Element Legend */}
          <div className="bg-secondary/30 rounded-xl p-4">
            <span className="system-label block mb-3 text-center">Elemental Governance</span>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(elementStyles).map(([element, style]) => (
                <div key={element} className={`p-2 rounded-lg border text-center ${style.bg} ${style.border}`}>
                  <span className={`text-sm font-medium ${style.text}`}>{element}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}