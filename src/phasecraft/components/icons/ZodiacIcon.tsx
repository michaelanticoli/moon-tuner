import { cn } from '@/lib/utils';

interface ZodiacIconProps {
  sign: number; // 1–12
  className?: string;
  size?: number;
}

/**
 * Custom SVG zodiac glyphs.
 * 1: Aries, 2: Taurus, 3: Gemini, 4: Cancer, 5: Leo, 6: Virgo,
 * 7: Libra, 8: Scorpio, 9: Sagittarius, 10: Capricorn, 11: Aquarius, 12: Pisces
 */
export function ZodiacIcon({ sign, className, size = 24 }: ZodiacIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('inline-block', className)}
      aria-label={ZODIAC_NAMES[sign - 1]}
    >
      {getZodiacPath(sign)}
    </svg>
  );
}

function getZodiacPath(sign: number) {
  switch (sign) {
    case 1: // Aries — V with horns curling outward like cresting waves
      return (
        <>
          {/* left horn: starts curled outward at top, sweeps down to point */}
          <path d="M5 7 Q4 4 7 4 Q9 5 9 8 L16 22" />
          {/* right horn: mirrors */}
          <path d="M27 7 Q28 4 25 4 Q23 5 23 8 L16 22" />
        </>
      );
    case 2: // Taurus — circle with two curling horns
      return (
        <>
          <circle cx="16" cy="22" r="6" />
          <path d="M10 16 Q10 8 6 6 Q4 5 5 4" />
          <path d="M22 16 Q22 8 26 6 Q28 5 27 4" />
        </>
      );
    case 3: // Gemini — twin pillars with caps
      return (
        <>
          <line x1="11" y1="9" x2="11" y2="23" />
          <line x1="21" y1="9" x2="21" y2="23" />
          <path d="M8 9 Q16 5 24 9" />
          <path d="M8 23 Q16 27 24 23" />
        </>
      );
    case 4: // Cancer — two small filled circles with curling tails (sideways 69)
      return (
        <>
          <circle cx="10" cy="13" r="2.2" fill="currentColor" />
          <path d="M10 11 Q18 8 22 14" />
          <circle cx="22" cy="19" r="2.2" fill="currentColor" />
          <path d="M22 21 Q14 24 10 18" />
        </>
      );
    case 5: // Leo — small mane-circle with a sweeping loop arcing over to a curling tail
      return (
        <>
          {/* mane head — small open circle, lower left */}
          <circle cx="9" cy="22" r="4" />
          {/* sweeping loop: rises from circle's top, arcs over the top, descends right, ends in an outward tail flick */}
          <path d="M12 20 Q11 7 19 6 Q27 7 25 18 Q23 27 28 25" />
        </>
      );
    case 6: // Virgo — three legs with a tightly closed inward-crossed loop (the maiden)
      return (
        <>
          <path d="M5 23 L5 11 Q9 9 9 14 L9 23" />
          <path d="M9 14 Q13 12 13 17 L13 23" />
          <path d="M13 17 Q17 15 17 20 L17 23" />
          {/* inward-curling closed loop — knot-like */}
          <path d="M17 20 Q22 19 22 15 Q22 11 18 13 Q15 15 19 18" />
        </>
      );
    case 7: // Libra — scales: arch with small rise, sitting on a base line
      return (
        <>
          <line x1="5" y1="24" x2="27" y2="24" />
          <path d="M7 19 Q9 13 14 13 L14 11 L18 11 L18 13 Q23 13 25 19" />
          <line x1="7" y1="19" x2="25" y2="19" />
        </>
      );
    case 8: // Scorpio — compact M with an outward-driving stinger arrow
      return (
        <>
          <path d="M5 23 L5 14 Q9 12 9 17 L9 23" />
          <path d="M9 17 Q13 15 13 20 L13 23" />
          {/* third leg extends out and up into the stinger */}
          <path d="M13 20 Q17 18 17 22 L17 26 L26 17" />
          {/* sharp splayed arrowhead */}
          <path d="M22 14 L26 17 L23 21" />
        </>
      );
    case 9: // Sagittarius — arrow with crossbar on shaft
      return (
        <>
          <line x1="6" y1="26" x2="25" y2="7" />
          <path d="M17 7 L25 7 L25 15" />
          <line x1="11" y1="17" x2="17" y2="23" />
          <line x1="11" y1="23" x2="17" y2="17" />
        </>
      );
    case 10: // Capricorn — sea-goat: horned 'n' fused with a coiled fish-tail loop
      return (
        <>
          {/* left horn tick rising up, then descending leg */}
          <path d="M5 8 Q6 6 7 8 L7 24" />
          {/* arched 'n' — peak between the two stems */}
          <path d="M7 12 Q9 7 13 7 Q17 7 17 12 L17 22" />
          {/* descending sweep from second stem into the coiled tail */}
          <path d="M17 22 Q17 26 13 26" />
          {/* tail loop — circle tucked to the lower right */}
          <circle cx="22" cy="22" r="4" />
          {/* fuse the loop to the n's second leg */}
          <path d="M18 22 Q17 19 17 18" />
        </>
      );
    case 11: // Aquarius — twin water waves, tighter peaks
      return (
        <>
          <path d="M5 13 L9 10 L13 13 L17 10 L21 13 L25 10 L27 11" />
          <path d="M5 21 L9 18 L13 21 L17 18 L21 21 L25 18 L27 19" />
        </>
      );
    case 12: // Pisces — two facing crescents joined by a bar
      return (
        <>
          <path d="M9 5 Q3 16 9 27" />
          <path d="M23 5 Q29 16 23 27" />
          <line x1="6" y1="16" x2="26" y2="16" />
        </>
      );
    default:
      return null;
  }
}


export const ZODIAC_NAMES = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const ZODIAC_ELEMENTS: Record<number, string> = {
  1: 'Fire', 2: 'Earth', 3: 'Air', 4: 'Water',
  5: 'Fire', 6: 'Earth', 7: 'Air', 8: 'Water',
  9: 'Fire', 10: 'Earth', 11: 'Air', 12: 'Water',
};

export const ZODIAC_MODALITIES: Record<number, string> = {
  1: 'Cardinal', 2: 'Fixed', 3: 'Mutable', 4: 'Cardinal',
  5: 'Fixed', 6: 'Mutable', 7: 'Cardinal', 8: 'Fixed',
  9: 'Mutable', 10: 'Cardinal', 11: 'Fixed', 12: 'Mutable',
};

export const ZODIAC_RULERS: Record<number, string> = {
  1: 'Mars', 2: 'Venus', 3: 'Mercury', 4: 'Moon',
  5: 'Sun', 6: 'Mercury', 7: 'Venus', 8: 'Pluto',
  9: 'Jupiter', 10: 'Saturn', 11: 'Uranus', 12: 'Neptune',
};

export const MOON_PHASE_QUALITIES: Record<number, string> = {
  1: 'Intention Setting',
  2: 'Emerging Action',
  3: 'Decision Point',
  4: 'Refinement',
  5: 'Illumination',
  6: 'Gratitude & Sharing',
  7: 'Release & Forgive',
  8: 'Surrender & Rest',
};
