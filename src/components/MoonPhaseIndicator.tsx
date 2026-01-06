import { useEffect, useState } from "react";
import { useMoonPhase } from "@/hooks/useMoonPhase";

interface MoonSVGProps {
  illumination: number;
  isWaxing: boolean;
  size?: number;
}

function MoonSVG({ illumination, isWaxing, size = 120 }: MoonSVGProps) {
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
      
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        fill="url(#moonGradient)"
        filter="url(#moonGlow)"
      />
      
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
      
      <circle cx={size * 0.35} cy={size * 0.4} r={size * 0.06} fill="hsl(40, 15%, 80%)" opacity="0.5" />
      <circle cx={size * 0.6} cy={size * 0.55} r={size * 0.04} fill="hsl(40, 15%, 80%)" opacity="0.4" />
      <circle cx={size * 0.45} cy={size * 0.7} r={size * 0.05} fill="hsl(40, 15%, 80%)" opacity="0.3" />
    </svg>
  );
}

export function MoonPhaseIndicator() {
  const moonData = useMoonPhase();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`flex flex-col items-center gap-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 -m-4 rounded-full bg-accent/5 blur-xl animate-pulse-soft" />
        
        <div className="relative animate-float">
          <MoonSVG 
            illumination={moonData.astronomical.illumination} 
            isWaxing={moonData.astronomical.isWaxing}
            size={140}
          />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-ultra text-muted-foreground font-medium">
          Current Phase
        </p>
        <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground">
          {moonData.astronomical.phaseName}
        </h3>
        <p className="text-sm text-muted-foreground">
          {moonData.astrological.energy} · {moonData.astrological.theme}
        </p>
        <p className="text-xs text-muted-foreground/70">
          {Math.round(moonData.astronomical.illumination * 100)}% illuminated
        </p>
      </div>
    </div>
  );
}
