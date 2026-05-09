/**
 * HarmonicProgressBar
 *
 * Thin editorial progress indicator for the Harmonic Profile flow.
 * Uses restrained dusk tokens — no percentage labels, just spatial presence.
 */

interface HarmonicProgressBarProps {
  total: number;
  current: number;
}

export function HarmonicProgressBar({ total, current }: HarmonicProgressBarProps) {
  return (
    <div
      className="flex items-center gap-2"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-px transition-all duration-700"
          style={{
            background:
              i < current
                ? "hsl(var(--dusk-gold))"
                : i === current
                ? "hsl(var(--dusk-ivory) / 0.4)"
                : "hsl(var(--dusk-ivory) / 0.1)",
          }}
        />
      ))}
    </div>
  );
}
