import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Harmonic Profile teaser section.
 * Introduces identity mapping and the natal + lunar profile system.
 * Cinematic Dusk palette. Scroll-reveal entrance.
 */

const PROFILE_PILLARS = [
  {
    label: "Natal Blueprint",
    description:
      "Your sun, moon, rising, and north node mapped against the moment you arrived. This is your fixed architecture.",
  },
  {
    label: "Lunar Cycle Overlay",
    description:
      "Where the current moon lands in your personal chart — surfacing which areas of life are active right now.",
  },
  {
    label: "Energetic Timing",
    description:
      "Windows of natural momentum, friction, and clarity mapped across your next 30 days.",
  },
];

export function HarmonicProfileTeaser() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      aria-label="Harmonic Profile"
    >
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 85% 55%, hsl(var(--dusk-gold) / 0.07) 0%, transparent 65%), " +
            "radial-gradient(50% 40% at 12% 30%, hsl(168 65% 52% / 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Hairline separator at top */}
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="dusk-hairline mb-20" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — copy block */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.1s cubic-bezier(0.2,0.8,0.2,1), transform 1.1s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            <p className="dusk-eyebrow mb-6">
              <span className="inline-block w-6 h-px align-middle mr-3 bg-[hsl(var(--dusk-gold))]" />
              Harmonic Profile
            </p>

            <h2 className="dusk-serif text-[clamp(2.2rem,4.5vw,3.8rem)] dusk-ivory mb-6">
              A map of who you are, and <em className="italic dusk-gold">when you move best.</em>
            </h2>

            <p
              className="text-[1.0625rem] leading-[1.7] mb-10 max-w-[480px]"
              style={{ color: "hsl(var(--dusk-ivory) / 0.65)" }}
            >
              Your Harmonic Profile combines your natal chart with the live lunar
              cycle to reveal your natural timing windows — when to build, when to
              pause, and when to let things complete themselves.
            </p>

            <Link to="/harmonic-profile" className="dusk-btn dusk-btn-primary">
              Generate Your Harmonic Profile
            </Link>
          </div>

          {/* Right — pillar cards */}
          <div className="flex flex-col gap-5">
            {PROFILE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.label}
                className="dusk-surface p-7 relative overflow-hidden"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.9s cubic-bezier(0.2,0.8,0.2,1) ${0.18 + i * 0.14}s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) ${0.18 + i * 0.14}s`,
                }}
              >
                {/* Index number */}
                <span
                  className="absolute top-5 right-6 font-mono text-[0.65rem] tracking-[0.22em]"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.15)" }}
                >
                  0{i + 1}
                </span>

                <p className="dusk-eyebrow mb-3">{pillar.label}</p>
                <p
                  className="text-[0.9375rem] leading-[1.65]"
                  style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom meta line */}
        <div
          className="mt-20 flex items-center gap-5"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.1s cubic-bezier(0.2,0.8,0.2,1) 0.65s",
          }}
        >
          <div className="dusk-hairline max-w-[60px]" />
          <span className="text-[0.7rem] tracking-[0.28em] uppercase dusk-silver">
            Personal · Natal-calibrated · Refreshed with every lunar cycle
          </span>
        </div>
      </div>
    </section>
  );
}
