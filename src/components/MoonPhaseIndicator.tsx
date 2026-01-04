import { useEffect, useState } from "react";

interface MoonPhase {
  name: string;
  description: string;
  illumination: number;
  phaseAngle: number;
}

const moonPhases: MoonPhase[] = [
  { name: "New Moon", description: "Stillness · Beginnings", illumination: 0, phaseAngle: 0 },
  { name: "Waxing Crescent", description: "Intention · Emergence", illumination: 0.15, phaseAngle: 45 },
  { name: "First Quarter", description: "Action · Decisions", illumination: 0.5, phaseAngle: 90 },
  { name: "Waxing Gibbous", description: "Refinement · Patience", illumination: 0.85, phaseAngle: 135 },
  { name: "Full Moon", description: "Illumination · Release", illumination: 1, phaseAngle: 180 },
  { name: "Waning Gibbous", description: "Gratitude · Integration", illumination: 0.85, phaseAngle: 225 },
  { name: "Last Quarter", description: "Letting Go · Reflection", illumination: 0.5, phaseAngle: 270 },
  { name: "Waning Crescent", description: "Rest · Surrender", illumination: 0.15, phaseAngle: 315 },
];

function calculateMoonPhase(): MoonPhase {
  const now = new Date();
  const synodicMonth = 29.53059;
  const knownNewMoon = new Date("2024-01-11T11:57:00Z");
  
  const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const lunarAge = daysSinceNewMoon % synodicMonth;
  const phaseIndex = Math.floor((lunarAge / synodicMonth) * 8) % 8;
  
  return moonPhases[phaseIndex];
}

interface MoonSVGProps {
  illumination: number;
  isWaxing: boolean;
  size?: number;
}

function MoonSVG({ illumination, isWaxing, size = 120 }: MoonSVGProps) {
  // Calculate the curve of the terminator line
  const curveOffset = (1 - illumination * 2) * (size / 2);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg"
    >
      <defs>
        <radialGradient id="moonGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="hsl(40, 20%, 95%)" />
          <stop offset="100%" stopColor="hsl(40, 15%, 85%)" />
        </radialGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Moon base - illuminated part */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        fill="url(#moonGradient)"
        filter="url(#moonGlow)"
      />
      
      {/* Shadow overlay for phase */}
      {illumination < 1 && (
        <path
          d={`
            M ${size / 2} 4
            A ${size / 2 - 4} ${size / 2 - 4} 0 1 ${isWaxing ? 1 : 0} ${size / 2} ${size - 4}
            A ${Math.abs(curveOffset)} ${size / 2 - 4} 0 0 ${curveOffset > 0 ? (isWaxing ? 0 : 1) : (isWaxing ? 1 : 0)} ${size / 2} 4
            Z
          `}
          fill="hsl(220, 30%, 15%)"
          opacity="0.9"
        />
      )}
      
      {/* Subtle crater details */}
      <circle cx={size * 0.35} cy={size * 0.4} r={size * 0.06} fill="hsl(40, 15%, 80%)" opacity="0.5" />
      <circle cx={size * 0.6} cy={size * 0.55} r={size * 0.04} fill="hsl(40, 15%, 80%)" opacity="0.4" />
      <circle cx={size * 0.45} cy={size * 0.7} r={size * 0.05} fill="hsl(40, 15%, 80%)" opacity="0.3" />
    </svg>
  );
}

export function MoonPhaseIndicator() {
  const [phase, setPhase] = useState<MoonPhase>(moonPhases[4]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setPhase(calculateMoonPhase());
    setIsVisible(true);
  }, []);

  const isWaxing = phase.phaseAngle < 180;

  return (
    <div 
      className={`flex flex-col items-center gap-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Moon Visual */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 -m-4 rounded-full bg-accent/5 blur-xl animate-pulse-soft" />
        
        {/* Moon SVG */}
        <div className="relative animate-float">
          <MoonSVG 
            illumination={phase.illumination} 
            isWaxing={isWaxing}
            size={140}
          />
        </div>
      </div>

      {/* Phase Info */}
      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-ultra text-muted-foreground font-medium">
          Current Phase
        </p>
        <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground">
          {phase.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {phase.description}
        </p>
      </div>
    </div>
  );
}
