import { Link } from "react-router-dom";

/**
 * Cinematic Dusk Hero
 * - Slow ambient atmospheric gradient
 * - Subtle lunar geometry (concentric rings + offset disc)
 * - High-contrast editorial serif headline + ultra-clean subhead
 */
export function DuskHero() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden dusk-atmosphere"
      aria-label="Hero"
    >
      {/* Lunar geometry — restrained, off-axis */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end">
        <div className="relative w-[120vmin] h-[120vmin] -mr-[35vmin] dusk-drift">
          {/* Concentric hairlines */}
          {[0.34, 0.5, 0.68, 0.86, 1].map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 m-auto rounded-full border"
              style={{
                width: `${s * 100}%`,
                height: `${s * 100}%`,
                borderColor: `hsl(var(--dusk-ivory) / ${0.04 + i * 0.012})`,
              }}
            />
          ))}
          {/* Soft disc */}
          <div
            className="absolute inset-0 m-auto rounded-full dusk-breath"
            style={{
              width: "34%",
              height: "34%",
              background:
                "radial-gradient(circle at 35% 30%, hsl(var(--dusk-ivory) / 0.18) 0%, hsl(var(--dusk-ivory) / 0.04) 40%, transparent 70%)",
              filter: "blur(0.4px)",
            }}
          />
          {/* Gold crescent edge */}
          <div
            className="absolute inset-0 m-auto rounded-full"
            style={{
              width: "34%",
              height: "34%",
              boxShadow:
                "inset 6px 6px 24px hsl(var(--dusk-gold) / 0.10), inset -2px -2px 18px hsl(var(--dusk-black) / 0.6)",
            }}
          />
        </div>
      </div>

      {/* Vignette to anchor copy */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--dusk-black)) 0%, hsl(var(--dusk-black) / 0.6) 38%, transparent 65%)",
        }}
      />

      <div className="relative w-full mx-auto max-w-[1400px] px-6 lg:px-12 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-[760px]">
          <p className="dusk-eyebrow mb-8 dusk-rise">
            <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
            Moontuner — A Timing System
          </p>

          <h1
            className="dusk-serif text-[clamp(2.6rem,6.5vw,5.6rem)] dusk-ivory mb-8 dusk-rise"
            style={{ animationDelay: "0.12s" }}
          >
            A timing system for people <em className="italic dusk-gold">tired of forcing life</em> out of rhythm.
          </h1>

          <p
            className="text-[1.0625rem] lg:text-[1.125rem] leading-[1.7] max-w-[560px] dusk-mute mb-12 dusk-rise"
            style={{ animationDelay: "0.24s", color: "hsl(var(--dusk-ivory) / 0.7)" }}
          >
            Personalized lunar guidance, identity mapping, and reflective tools
            designed to help you move with better timing instead of harder force.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 dusk-rise"
            style={{ animationDelay: "0.36s" }}
          >
            <Link to="/harmonic-profile" className="dusk-btn dusk-btn-primary">
              Generate Your Harmonic Profile
            </Link>
            <a href="#todays-directive" className="dusk-btn dusk-btn-ghost">
              View Today's Directive
            </a>
          </div>

          {/* Quiet meta line */}
          <div
            className="mt-20 flex items-center gap-4 dusk-rise"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="dusk-hairline max-w-[80px]" />
            <span className="text-[0.7rem] tracking-[0.28em] uppercase dusk-silver">
              Behavioral guidance through timing & self-awareness
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
