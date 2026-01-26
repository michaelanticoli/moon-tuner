import { cn } from "@/lib/utils";

interface MoonPhaseGlyphProps {
  phase: "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "full" | "waning-gibbous" | "last-quarter" | "waning-crescent";
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
};

export function MoonPhaseGlyph({ phase, size = "md", className }: MoonPhaseGlyphProps) {
  const isNumeric = typeof size === "number";
  const sizeClass = isNumeric ? "" : sizeMap[size];
  const sizeStyle = isNumeric ? { width: size, height: size } : undefined;
  
  // SVG paths for each moon phase - elegant geometric representations
  const renderPhase = () => {
    switch (phase) {
      case "new":
        // New Moon: Empty circle with subtle ring
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="7" strokeOpacity="0.3" />
          </svg>
        );
      
      case "waxing-crescent":
        // Waxing Crescent: Right-side crescent
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <path d="M12 3a9 9 0 1 0 0 18c-4.97 0-6-4.03-6-9s1.03-9 6-9z" />
          </svg>
        );
      
      case "first-quarter":
        // First Quarter: Right half filled
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <path d="M12 3a9 9 0 0 1 0 18V3z" />
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        );
      
      case "waxing-gibbous":
        // Waxing Gibbous: Mostly filled, left shadow
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c-2 0-3 4.03-3 9s1 9 3 9" fill="hsl(var(--background))" />
          </svg>
        );
      
      case "full":
        // Full Moon: Complete filled circle with subtle inner glow
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="6" fillOpacity="0.1" fill="hsl(var(--background))" />
          </svg>
        );
      
      case "waning-gibbous":
        // Waning Gibbous: Mostly filled, right shadow
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c2 0 3 4.03 3 9s-1 9-3 9" fill="hsl(var(--background))" />
          </svg>
        );
      
      case "last-quarter":
        // Last Quarter: Left half filled
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <path d="M12 3a9 9 0 0 0 0 18V3z" />
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        );
      
      case "waning-crescent":
        // Waning Crescent: Left-side crescent
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClass, className)} style={sizeStyle} fill="currentColor">
            <path d="M12 3a9 9 0 1 1 0 18c4.97 0 6-4.03 6-9s-1.03-9-6-9z" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return renderPhase();
}

// Map phase names to glyph keys
export const phaseNameToKey: Record<string, MoonPhaseGlyphProps["phase"]> = {
  "New Moon": "new",
  "New": "new",
  "Crescent": "waxing-crescent",
  "Waxing Crescent": "waxing-crescent",
  "First Quarter": "first-quarter",
  "Gibbous": "waxing-gibbous",
  "Waxing Gibbous": "waxing-gibbous",
  "Full Moon": "full",
  "Full": "full",
  "Disseminating": "waning-gibbous",
  "Waning Gibbous": "waning-gibbous",
  "Last Quarter": "last-quarter",
  "Balsamic": "waning-crescent",
  "Waning Crescent": "waning-crescent",
};

// Unicode-style text glyphs for inline use (astronomical symbols)
export const moonPhaseTextGlyphs: Record<string, string> = {
  "new": "●",           // Filled circle (dark)
  "waxing-crescent": "☽", // Crescent moon
  "first-quarter": "◐",   // First quarter
  "waxing-gibbous": "◕",  // Mostly filled
  "full": "○",            // Full moon (open circle)
  "waning-gibbous": "◔",  // Waning gibbous
  "last-quarter": "◑",    // Last quarter
  "waning-crescent": "☾", // Waning crescent
};
