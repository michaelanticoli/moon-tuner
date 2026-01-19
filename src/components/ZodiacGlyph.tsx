import { cn } from "@/lib/utils";

interface ZodiacGlyphProps {
  sign: 
    | "aries" | "taurus" | "gemini" | "cancer" 
    | "leo" | "virgo" | "libra" | "scorpio" 
    | "sagittarius" | "capricorn" | "aquarius" | "pisces";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
  "2xl": "w-12 h-12"
};

// Custom SVG paths for elegant zodiac glyphs
const zodiacPaths: Record<string, JSX.Element> = {
  // Aries: Ram horns
  aries: (
    <path d="M6 18c0-6 3-10 6-10s6 4 6 10M12 8V4" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  ),
  
  // Taurus: Bull with circle
  taurus: (
    <>
      <circle cx="12" cy="14" r="6" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <path d="M6 8c0-2 1.5-4 3-4M18 8c0-2-1.5-4-3-4" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Gemini: Pillars of twins
  gemini: (
    <>
      <path d="M7 4h10M7 20h10" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M9 4v16M15 4v16" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Cancer: Crab claws (69 rotated)
  cancer: (
    <>
      <circle cx="8" cy="10" r="3" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <circle cx="16" cy="14" r="3" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <path d="M11 10c3 0 5 2 5 4M13 14c-3 0-5-2-5-4" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Leo: Lion's mane and tail
  leo: (
    <>
      <circle cx="10" cy="10" r="4" strokeWidth="1.5" fill="none" stroke="currentColor" />
      <path d="M14 10c2 0 4 2 4 4s-2 4-4 4c-1 0-2-.5-2.5-1" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Virgo: Maiden with wheat
  virgo: (
    <>
      <path d="M6 6c2 4 2 8 2 12M10 6c2 4 2 8 2 12M14 6c0 4-2 8-2 12" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M16 12c2 2 2 6 2 6" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Libra: Scales
  libra: (
    <>
      <path d="M4 16h16" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M12 16V8" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 8c0-2 2.5-4 6-4s6 2 6 4" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Scorpio: Scorpion tail with arrow
  scorpio: (
    <>
      <path d="M6 6c2 4 2 8 2 12M10 6c2 4 2 8 2 12M14 6c0 4 1 8 4 10" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M18 16l2-2-2-2" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  
  // Sagittarius: Archer's arrow
  sagittarius: (
    <>
      <path d="M5 19L19 5" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M13 5h6v6" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12l4 4" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Capricorn: Sea-goat
  capricorn: (
    <>
      <path d="M6 10c0-4 3-6 6-6s4 2 4 5c0 2-1 3-2 4l-2 5" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" strokeWidth="1.5" fill="none" stroke="currentColor" />
    </>
  ),
  
  // Aquarius: Water waves
  aquarius: (
    <>
      <path d="M4 10c2-2 4-2 6 0s4 2 6 0s4-2 6 0" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M4 16c2-2 4-2 6 0s4 2 6 0s4-2 6 0" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  
  // Pisces: Two fish
  pisces: (
    <>
      <path d="M4 12h16" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M8 6c-3 2-3 4 0 6c-3 2-3 4 0 6" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
      <path d="M16 6c3 2 3 4 0 6c3 2 3 4 0 6" strokeWidth="1.5" fill="none" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
};

export function ZodiacGlyph({ sign, size = "md", className }: ZodiacGlyphProps) {
  const sizeClass = sizeMap[size];
  
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(sizeClass, className)}
    >
      {zodiacPaths[sign]}
    </svg>
  );
}

// Map sign names to keys
export const signNameToKey: Record<string, ZodiacGlyphProps["sign"]> = {
  "Aries": "aries",
  "Taurus": "taurus", 
  "Gemini": "gemini",
  "Cancer": "cancer",
  "Leo": "leo",
  "Virgo": "virgo",
  "Libra": "libra",
  "Scorpio": "scorpio",
  "Sagittarius": "sagittarius",
  "Capricorn": "capricorn",
  "Aquarius": "aquarius",
  "Pisces": "pisces",
};

// Unicode text glyphs for inline use (keeping as backup)
export const zodiacTextGlyphs: Record<string, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};
