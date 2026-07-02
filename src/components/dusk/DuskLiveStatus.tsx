import { motion } from "framer-motion";
import { Activity, MapPin, Zap, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMoonPhase } from "@/hooks/useMoonPhase";
import { ZodiacGlyph } from "@/components/ZodiacGlyph";
import type { ZodiacSign } from "@/data/lunar2026Data";

/**
 * DuskLiveStatus — Dusk-palette variant of LunarLiveStatus.
 *
 * Reads the same fields from useMoonPhase() but renders in the Dusk theme
 * (ivory/gold on near-black, dusk-serif headings, mono eyebrow labels,
 * hairline dividers) so it blends into the SpiralLanding surfaces.
 *
 * The shared LunarLiveStatus is intentionally not modified — it's used
 * elsewhere in Core-themed contexts.
 */

const ZODIAC_META: Record<
  ZodiacSign,
  { signKey: string; element: "Fire" | "Earth" | "Air" | "Water"; body: string; ruler: string; quality: string }
> = {
  Aries:       { signKey: "aries",       element: "Fire",  body: "Head & Brain",           ruler: "Mars",    quality: "Cardinal" },
  Taurus:      { signKey: "taurus",      element: "Earth", body: "Throat & Neck",          ruler: "Venus",   quality: "Fixed"    },
  Gemini:      { signKey: "gemini",      element: "Air",   body: "Arms & Lungs",           ruler: "Mercury", quality: "Mutable"  },
  Cancer:      { signKey: "cancer",      element: "Water", body: "Chest & Stomach",        ruler: "Moon",    quality: "Cardinal" },
  Leo:         { signKey: "leo",         element: "Fire",  body: "Heart & Spine",          ruler: "Sun",     quality: "Fixed"    },
  Virgo:       { signKey: "virgo",       element: "Earth", body: "Digestive System",       ruler: "Mercury", quality: "Mutable"  },
  Libra:       { signKey: "libra",       element: "Air",   body: "Kidneys & Lower Back",   ruler: "Venus",   quality: "Cardinal" },
  Scorpio:     { signKey: "scorpio",     element: "Water", body: "Reproductive Organs",    ruler: "Pluto",   quality: "Fixed"    },
  Sagittarius: { signKey: "sagittarius", element: "Fire",  body: "Hips & Thighs",          ruler: "Jupiter", quality: "Mutable"  },
  Capricorn:   { signKey: "capricorn",   element: "Earth", body: "Knees & Bones",          ruler: "Saturn",  quality: "Cardinal" },
  Aquarius:    { signKey: "aquarius",    element: "Air",   body: "Ankles & Circulation",   ruler: "Uranus",  quality: "Fixed"    },
  Pisces:      { signKey: "pisces",      element: "Water", body: "Feet & Lymphatic",       ruler: "Neptune", quality: "Mutable"  },
};

// Riso element tint — echoes the SpiralLanding palette, quiet enough to sit inside a dusk surface.
const ELEMENT_TINT: Record<"Fire" | "Earth" | "Air" | "Water", string> = {
  Fire:  "#e8792b",
  Earth: "#8a8a3a",
  Air:   "#1f9aa6",
  Water: "#2b4c8c",
};

export function DuskLiveStatus() {
  const moonPhase = useMoonPhase();
  const signName = moonPhase.astronomical.moonSign;
  const meta = ZODIAC_META[signName] ?? ZODIAC_META.Aries;
  const tint = ELEMENT_TINT[meta.element];
  const hoursRemaining = moonPhase.astronomical.hoursInSign;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div
        className="dusk-surface relative rounded-[1.25rem] p-7 lg:p-10 overflow-hidden"
        style={{ borderLeft: `2px solid ${tint}` }}
      >
        {/* Live indicator (gold pulse) */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "hsl(var(--dusk-gold))" }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: "hsl(var(--dusk-gold))" }}
            />
          </span>
          <span
            className="text-[0.68rem] tracking-[0.22em] uppercase"
            style={{ color: "hsl(var(--dusk-gold))", fontFamily: "var(--font-mono)" }}
          >
            Live
          </span>
        </div>

        {/* Header */}
        <div className="mb-8 max-w-[560px]">
          <p className="dusk-eyebrow mb-3">Current Lunar Configuration</p>
          <h3 className="dusk-serif text-[clamp(1.8rem,3.6vw,2.6rem)] dusk-ivory leading-[1.1] m-0">
            {moonPhase.astrological.phaseName}{" "}
            <em className="italic" style={{ color: tint }}>
              in {signName}
            </em>
          </h3>
        </div>

        {/* Primary stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { Icon: Activity, label: "Phase",          value: moonPhase.astrological.phaseName },
            { Icon: MapPin,   label: "Transit",        value: signName, showGlyph: true },
            { Icon: Zap,      label: "Energy",         value: moonPhase.astrological.energy },
            { Icon: Clock,    label: "Time Remaining", value: `~${hoursRemaining}h in ${signName}` },
          ].map(({ Icon, label, value, showGlyph }) => (
            <div key={label} className="space-y-1.5">
              <div
                className="flex items-center gap-2"
                style={{ color: "hsl(var(--dusk-silver))" }}
              >
                <Icon className="w-4 h-4" />
                <span className="dusk-eyebrow">{label}</span>
              </div>
              <p className="dusk-ivory text-[1rem] flex items-center gap-2 leading-snug">
                {showGlyph && (
                  <span style={{ color: tint, display: "inline-flex" }}>
                    <ZodiacGlyph sign={meta.signKey as any} size="md" />
                  </span>
                )}
                <span>{value}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="dusk-hairline mb-8" />

        {/* Three-panel detail row */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Phase theme */}
          <div className="space-y-3">
            <p className="dusk-eyebrow">Phase Theme</p>
            <p className="dusk-ivory text-[0.98rem] leading-[1.55]">
              {moonPhase.astrological.theme}
            </p>
            <p
              className="text-[0.85rem] leading-[1.55]"
              style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}
            >
              {moonPhase.astrological.quality}
            </p>
            <div className="flex items-center gap-2 text-[0.8rem]">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(var(--dusk-gold))" }} />
              <span style={{ color: "hsl(var(--dusk-ivory) / 0.7)" }}>
                {moonPhase.astrological.frequencyHz}Hz Resonance
              </span>
            </div>
          </div>

          {/* Zodiac influence */}
          <div className="space-y-3">
            <p className="dusk-eyebrow">Zodiac Influence</p>
            <div
              className="rounded-lg p-4"
              style={{
                background: `color-mix(in srgb, ${tint} 8%, transparent)`,
                border: `1px solid color-mix(in srgb, ${tint} 30%, transparent)`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span style={{ color: tint, display: "inline-flex" }}>
                  <ZodiacGlyph sign={meta.signKey as any} size="xl" />
                </span>
                <div>
                  <p className="dusk-ivory font-medium" style={{ color: tint }}>
                    {signName}
                  </p>
                  <p
                    className="text-[0.8rem]"
                    style={{ color: "hsl(var(--dusk-ivory) / 0.6)" }}
                  >
                    {meta.element} · {meta.quality}
                  </p>
                </div>
              </div>
              <p
                className="text-[0.82rem]"
                style={{ color: "hsl(var(--dusk-ivory) / 0.65)" }}
              >
                Ruled by {meta.ruler}
              </p>
            </div>
          </div>

          {/* Body activation */}
          <div className="space-y-3">
            <p className="dusk-eyebrow">Body Activation</p>
            <div
              className="rounded-lg p-4"
              style={{
                background: "hsl(var(--dusk-ivory) / 0.028)",
                border: "1px solid hsl(var(--dusk-ivory) / 0.08)",
              }}
            >
              <p className="dusk-ivory font-medium mb-2">{meta.body}</p>
              <p
                className="text-[0.82rem] leading-[1.55]"
                style={{ color: "hsl(var(--dusk-ivory) / 0.65)" }}
              >
                Moon in {signName} sensitizes this area. A gentle window for focused
                healing, awareness, or care.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div
          className="mt-8 pt-6 flex items-center justify-end"
          style={{ borderTop: "1px solid hsl(var(--dusk-ivory) / 0.08)" }}
        >
          <Link
            to="/lunar-system"
            className="flex items-center gap-2 text-[0.85rem] transition-colors"
            style={{ color: "hsl(var(--dusk-gold))" }}
          >
            <span>Explore the phase-sign matrix</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default DuskLiveStatus;
