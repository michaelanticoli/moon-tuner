import { cn } from '@/lib/utils';

interface MoonPhaseIconProps {
  phase: number; // 1–8
  className?: string;
  size?: number;
}

/**
 * Custom SVG moon phase icons. Phase 1–8:
 * 1: New Moon, 2: Waxing Crescent, 3: First Quarter,
 * 4: Waxing Gibbous, 5: Full Moon, 6: Waning Gibbous,
 * 7: Third Quarter, 8: Waning Crescent
 */
export function MoonPhaseIcon({ phase, className, size = 24 }: MoonPhaseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn('inline-block', className)}
      aria-label={MOON_PHASE_NAMES[phase - 1]}
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {getMoonPath(phase)}
    </svg>
  );
}

function getMoonPath(phase: number) {
  switch (phase) {
    case 1: // New Moon — fully dark
      return <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.85" />;
    case 2: // Waxing Crescent — small right lit
      return (
        <path
          d="M16 2 A14 14 0 0 1 16 30 A6 14 0 0 0 16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    case 3: // First Quarter — right half lit
      return (
        <path
          d="M16 2 A14 14 0 0 1 16 30 L16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    case 4: // Waxing Gibbous — mostly lit, left shadow crescent
      return (
        <path
          d="M16 2 A14 14 0 0 1 16 30 A6 14 0 0 1 16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    case 5: // Full Moon — empty circle (outline only, no fill)
      return null;
    case 6: // Waning Gibbous — mostly lit, right shadow crescent
      return (
        <path
          d="M16 2 A14 14 0 0 0 16 30 A6 14 0 0 0 16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    case 7: // Third Quarter — left half lit
      return (
        <path
          d="M16 2 A14 14 0 0 0 16 30 L16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    case 8: // Waning Crescent — small left lit
      return (
        <path
          d="M16 2 A14 14 0 0 0 16 30 A6 14 0 0 1 16 2Z"
          fill="currentColor"
          opacity="0.85"
        />
      );
    default:
      return null;
  }
}

export const MOON_PHASE_NAMES = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Third Quarter',
  'Waning Crescent',
];
