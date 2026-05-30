// Custom esoteric sigils for the natal wheel.
// Each glyph is drawn in a 32×32 viewBox, centered around (16,16),
// stroke-based line drawings — refined, minimalist, infographic.
// No emoji, no system font fallback.

import type { CSSProperties } from "react";

export type SigilName =
  // Zodiac
  | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo"
  | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces"
  // Luminaries / Planets
  | "Sun" | "Moon" | "Mercury" | "Venus" | "Mars"
  | "Jupiter" | "Saturn" | "Uranus" | "Neptune" | "Pluto"
  | "NorthNode" | "Chiron" | "Ascendant";

interface SigilProps {
  name: SigilName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

// Path definitions in a 32x32 box (origin top-left, center 16,16).
// All shapes are stroke-rendered for a hand-drawn / engraved feel.
const PATHS: Record<SigilName, JSX.Element> = {
  // ── Zodiac ──────────────────────────────────────────────
  Aries: (
    <>
      <path d="M16 28 V14" />
      <path d="M16 14 C 12 10, 8 10, 7 14" />
      <path d="M16 14 C 20 10, 24 10, 25 14" />
    </>
  ),
  Taurus: (
    <>
      <circle cx="16" cy="22" r="5" />
      <path d="M11 17 C 9 11, 7 9, 5 9" />
      <path d="M21 17 C 23 11, 25 9, 27 9" />
    </>
  ),
  Gemini: (
    <>
      <path d="M10 6 V26" />
      <path d="M22 6 V26" />
      <path d="M8 6 H24" />
      <path d="M8 26 H24" />
    </>
  ),
  Cancer: (
    <>
      <path d="M6 13 C 6 9, 12 7, 14 11" />
      <circle cx="11" cy="13" r="2.5" />
      <path d="M26 19 C 26 23, 20 25, 18 21" />
      <circle cx="21" cy="19" r="2.5" />
    </>
  ),
  Leo: (
    <>
      <circle cx="11" cy="20" r="4" />
      <path d="M14.5 19 C 16 12, 22 8, 26 12 C 28 16, 24 20, 22 18" />
    </>
  ),
  Virgo: (
    <>
      <path d="M5 26 V12 C 5 9, 9 9, 9 12 V26" />
      <path d="M9 12 C 9 9, 13 9, 13 12 V26" />
      <path d="M13 12 C 13 9, 17 9, 17 12 V22 C 17 27, 22 28, 24 24 C 26 20, 22 17, 19 19" />
    </>
  ),
  Libra: (
    <>
      <path d="M5 24 H27" />
      <path d="M7 20 H25" />
      <path d="M10 20 C 10 14, 22 14, 22 20" />
      <path d="M16 14 V11" />
    </>
  ),
  Scorpio: (
    <>
      <path d="M5 26 V12 C 5 9, 9 9, 9 12 V26" />
      <path d="M9 12 C 9 9, 13 9, 13 12 V26" />
      <path d="M13 12 C 13 9, 17 9, 17 12 V26 L 24 22" />
      <path d="M22 19 L 27 22 L 24 26" />
    </>
  ),
  Sagittarius: (
    <>
      <path d="M6 26 L 26 6" />
      <path d="M26 6 L 18 8" />
      <path d="M26 6 L 24 14" />
      <path d="M12 14 L 18 20" />
    </>
  ),
  Capricorn: (
    <>
      <path d="M5 8 L 9 8 L 13 22 L 17 8" />
      <path d="M17 8 C 22 8, 26 12, 26 17 C 26 22, 22 25, 18 23 C 15 21, 16 17, 19 17 C 22 17, 22 21, 19 21" />
    </>
  ),
  Aquarius: (
    <>
      <path d="M4 12 L 9 9 L 14 12 L 19 9 L 24 12 L 28 9" />
      <path d="M4 19 L 9 16 L 14 19 L 19 16 L 24 19 L 28 16" />
    </>
  ),
  Pisces: (
    <>
      <path d="M6 6 C 10 12, 10 20, 6 26" />
      <path d="M26 6 C 22 12, 22 20, 26 26" />
      <path d="M8 16 H24" />
    </>
  ),

  // ── Luminaries / Planets ────────────────────────────────
  Sun: (
    <>
      <circle cx="16" cy="16" r="9" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </>
  ),
  Moon: (
    <>
      <path d="M22 6 C 14 8, 10 14, 10 18 C 10 24, 16 28, 22 26 C 16 24, 13 20, 13 16 C 13 12, 16 8, 22 6 Z" />
    </>
  ),
  Mercury: (
    <>
      <path d="M11 4 C 11 8, 21 8, 21 4" />
      <circle cx="16" cy="13" r="4.5" />
      <path d="M16 17.5 V25" />
      <path d="M12 22 H20" />
    </>
  ),
  Venus: (
    <>
      <circle cx="16" cy="12" r="5" />
      <path d="M16 17 V27" />
      <path d="M12 23 H20" />
    </>
  ),
  Mars: (
    <>
      <circle cx="14" cy="18" r="6" />
      <path d="M18 14 L 26 6" />
      <path d="M20 6 H26 V12" />
    </>
  ),
  Jupiter: (
    <>
      <path d="M8 8 V8 C 8 6, 12 6, 12 8 V20 C 12 24, 16 24, 18 22" />
      <path d="M6 14 H22" />
    </>
  ),
  Saturn: (
    <>
      <path d="M10 6 H18" />
      <path d="M14 6 V22 C 14 26, 18 26, 20 24 C 22 22, 22 18, 18 18" />
    </>
  ),
  Uranus: (
    <>
      <path d="M8 6 V14" />
      <path d="M24 6 V14" />
      <path d="M8 14 H24" />
      <path d="M16 14 V22" />
      <circle cx="16" cy="25" r="2.5" />
    </>
  ),
  Neptune: (
    <>
      <path d="M6 8 C 6 16, 10 22, 16 22 C 22 22, 26 16, 26 8" />
      <path d="M16 6 V26" />
      <path d="M10 24 H22" />
    </>
  ),
  Pluto: (
    <>
      <path d="M10 26 V8" />
      <path d="M10 8 C 16 8, 20 10, 20 14 C 20 18, 16 20, 10 20" />
      <circle cx="14" cy="14" r="2.5" />
    </>
  ),
  NorthNode: (
    // Caput Draconis — horseshoe with two terminal nodes
    <>
      <path d="M9 24 V16 C 9 10, 23 10, 23 16 V24" />
      <circle cx="9" cy="26" r="1.8" fill="currentColor" />
      <circle cx="23" cy="26" r="1.8" fill="currentColor" />
    </>
  ),
  Chiron: (
    // Stylized 'K' with circle — the wounded healer
    <>
      <path d="M10 6 V22" />
      <path d="M10 14 L 18 8" />
      <circle cx="20" cy="22" r="5" />
    </>
  ),
  Ascendant: (
    // Refined "AC" ligature — horizon rising marker
    <>
      <path d="M5 24 L 10 8 L 15 24" />
      <path d="M7 19 H13" />
      <path d="M27 11 C 24 9, 19 10, 19 16 C 19 22, 24 23, 27 21" />
    </>
  ),
};

export function Sigil({ name, size = 24, color = "currentColor", strokeWidth = 1.4, style }: SigilProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

// Inline-renderable group at given (x,y) — for use inside another <svg>.
// Translates the 32×32 sigil so its center sits at (cx, cy) with given size.
export function SigilGroup({
  name,
  cx,
  cy,
  size = 20,
  color = "#1A1918",
  strokeWidth = 1.2,
}: {
  name: SigilName;
  cx: number;
  cy: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const scale = size / 32;
  const tx = cx - size / 2;
  const ty = cy - size / 2;
  return (
    <g
      transform={`translate(${tx} ${ty}) scale(${scale})`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </g>
  );
}

export function isSigilName(value: string): value is SigilName {
  return value in PATHS;
}
