import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MoonPhase {
  name: string;
  angle: number;
  illumination: number;
  isWaxing: boolean;
  keywords: string[];
  supports: string[];
  resists: string[];
  description: string;
}

const moonPhases: MoonPhase[] = [
  {
    name: "New Moon",
    angle: 0,
    illumination: 0,
    isWaxing: true,
    keywords: ["Beginning", "Intention", "Planting"],
    supports: ["Setting intentions", "Starting fresh", "Inner reflection", "Dreaming"],
    resists: ["Launching publicly", "Major decisions", "Overexertion"],
    description: "A time of stillness and potential. The seed is planted in darkness."
  },
  {
    name: "Waxing Crescent",
    angle: 45,
    illumination: 0.25,
    isWaxing: true,
    keywords: ["Emergence", "Faith", "Commitment"],
    supports: ["Building momentum", "Taking first steps", "Gathering resources", "Learning"],
    resists: ["Rushing outcomes", "Doubt", "Overplanning"],
    description: "The first light emerges. Commit to your intention and begin the work."
  },
  {
    name: "First Quarter",
    angle: 90,
    illumination: 0.5,
    isWaxing: true,
    keywords: ["Action", "Challenge", "Decision"],
    supports: ["Taking decisive action", "Overcoming obstacles", "Making adjustments"],
    resists: ["Hesitation", "Abandoning course", "Perfectionism"],
    description: "Half-lit and half-shadowed. Face the friction and push through."
  },
  {
    name: "Waxing Gibbous",
    angle: 135,
    illumination: 0.75,
    isWaxing: true,
    keywords: ["Refinement", "Patience", "Trust"],
    supports: ["Refining work", "Building patience", "Trusting the process", "Editing"],
    resists: ["Forcing results", "Impatience", "Shortcuts"],
    description: "Almost full. Trust the process and refine your creation."
  },
  {
    name: "Full Moon",
    angle: 180,
    illumination: 1,
    isWaxing: false,
    keywords: ["Illumination", "Culmination", "Release"],
    supports: ["Celebration", "Clarity", "Emotional release", "Sharing work"],
    resists: ["Starting new projects", "Suppressing emotions", "Hiding"],
    description: "Maximum light and visibility. See clearly what has grown."
  },
  {
    name: "Waning Gibbous",
    angle: 225,
    illumination: 0.75,
    isWaxing: false,
    keywords: ["Gratitude", "Sharing", "Teaching"],
    supports: ["Sharing wisdom", "Expressing gratitude", "Mentoring", "Giving back"],
    resists: ["Hoarding", "Taking on new burdens", "Overextending"],
    description: "The light begins to recede. Share what you've learned."
  },
  {
    name: "Last Quarter",
    angle: 270,
    illumination: 0.5,
    isWaxing: false,
    keywords: ["Release", "Forgiveness", "Clearing"],
    supports: ["Letting go", "Breaking habits", "Forgiveness", "Decluttering"],
    resists: ["Clinging", "Accumulating", "Resentment"],
    description: "Half-lit once more. Release what no longer serves."
  },
  {
    name: "Waning Crescent",
    angle: 315,
    illumination: 0.25,
    isWaxing: false,
    keywords: ["Rest", "Surrender", "Preparation"],
    supports: ["Deep rest", "Dreaming", "Surrendering control", "Preparing for renewal"],
    resists: ["Forcing action", "Anxiety about the future", "Overworking"],
    description: "The final sliver. Rest deeply before the next cycle begins."
  }
];

function MoonPhaseSVG({ illumination, isWaxing, size = 120 }: { illumination: number; isWaxing: boolean; size?: number }) {
  const shadowOffset = isWaxing 
    ? (1 - illumination) * size 
    : -(1 - illumination) * size;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="moonGradientDial" cx="30%" cy="30%">
          <stop offset="0%" stopColor="hsl(var(--ivory))" />
          <stop offset="100%" stopColor="hsl(var(--ivory) / 0.8)" />
        </radialGradient>
        <clipPath id="moonClipDial">
          <circle cx={size/2} cy={size/2} r={size/2 - 2} />
        </clipPath>
        <filter id="moonGlowDial" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <circle 
        cx={size/2} 
        cy={size/2} 
        r={size/2 - 2} 
        fill="url(#moonGradientDial)" 
        filter="url(#moonGlowDial)"
      />
      
      <g clipPath="url(#moonClipDial)">
        <ellipse
          cx={size/2 + shadowOffset}
          cy={size/2}
          rx={size/2}
          ry={size/2}
          fill="hsl(var(--night-slate))"
          opacity="0.95"
        />
      </g>
    </svg>
  );
}

export function InteractivePhaseDial() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const selectedPhase = moonPhases[selectedIndex];

  const handleDialInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dialRef.current) return;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    let angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    
    const phaseIndex = Math.round(angle / 45) % 8;
    setSelectedIndex(phaseIndex);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Phase Dial */}
      <div className="relative flex items-center justify-center">
        <div 
          ref={dialRef}
          className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] cursor-pointer"
          onClick={handleDialInteraction}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => isDragging && handleDialInteraction(e)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={(e) => isDragging && handleDialInteraction(e)}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-border/30" />
          <div className="absolute inset-4 rounded-full border border-border/20" />
          
          {/* Phase Markers */}
          {moonPhases.map((phase, i) => {
            const angle = (phase.angle - 90) * (Math.PI / 180);
            const radius = 160;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 200;
            const isSelected = i === selectedIndex;
            
            return (
              <motion.button
                key={phase.name}
                className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                  isSelected 
                    ? "bg-accent scale-150 shadow-lg shadow-accent/30" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                style={{ 
                  left: `${(x / 400) * 100}%`, 
                  top: `${(y / 400) * 100}%` 
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(i);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            );
          })}
          
          {/* Center Moon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MoonPhaseSVG 
                illumination={selectedPhase.illumination}
                isWaxing={selectedPhase.isWaxing}
                size={140}
              />
            </motion.div>
          </div>
          
          {/* Phase Name Ring */}
          <div className="absolute inset-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedPhase.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-serif text-lg text-center text-foreground absolute -bottom-2"
              >
                {selectedPhase.name}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Instructions */}
        <p className="absolute -bottom-8 text-xs text-muted-foreground text-center">
          Click or drag around the dial to explore phases
        </p>
      </div>
      
      {/* Phase Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Keywords */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPhase.keywords.map((keyword) => (
                <span 
                  key={keyword}
                  className="px-3 py-1 text-xs uppercase tracking-widest bg-accent/10 text-accent border border-accent/20 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedPhase.description}
            </p>
          </div>
          
          {/* Supports */}
          <div>
            <h3 className="text-xs uppercase tracking-ultra text-accent font-medium mb-3">
              What This Phase Supports
            </h3>
            <ul className="space-y-2">
              {selectedPhase.supports.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resists */}
          <div>
            <h3 className="text-xs uppercase tracking-ultra text-muted-foreground font-medium mb-3">
              What This Phase Resists
            </h3>
            <ul className="space-y-2">
              {selectedPhase.resists.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
