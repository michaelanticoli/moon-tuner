/**
 * AstroHarmonicSample
 * --------------------------------------------------------------
 * Visual preview of the Astro-Harmonic Natal Analysis report.
 * Faithfully renders selected sections of the deliverable in
 * its native paper-and-gold palette so site visitors can see
 * EXACTLY what they receive — without us generating a partial
 * personalized report.
 *
 * Sections included:
 *   1. Cover excerpt (Sun · Moon · Ascendant identity grid)
 *   2. Harmonic Signature (Key + voices snippet)
 *   3. Aspects as Musical Intervals (full table)
 *   4. Elements as Frequency
 *   5. Resolution Guidance excerpt
 *   6. The Whole Composition closing
 */

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export const AstroHarmonicSample = () => {
  return (
    <section className="relative py-24 bg-background">
      {/* Section intro — speaks in the dark site voice */}
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl mb-16 text-center">
        <span className="system-label mb-4 block text-accent">Sample Report Preview</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extralight leading-[1.1] mb-6">
          See exactly what
          <br />
          <span className="font-serif italic">your report becomes.</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Below is a real excerpt from the Astro-Harmonic Natal Analysis — same paper,
          same typography, same sections you receive after checkout. The values shown
          are sample data; yours are calculated from your exact birth chart.
        </p>
      </div>

      {/* The "paper" — replicates the deliverable's palette exactly */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <motion.div
          {...fadeUp}
          className="relative shadow-2xl shadow-black/60 ring-1 ring-[#D9D3C9]/30"
          style={{
            background: "#F9F7F4",
            color: "#1A1918",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {/* ── COVER EXCERPT ──────────────────────────────────────── */}
          <div className="px-8 sm:px-14 pt-12 pb-10 border-b" style={{ borderColor: "#D9D3C9" }}>
            <div className="flex justify-between items-start mb-10">
              <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#B89D6A", fontWeight: 200 }}>
                MOONtuner
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-right leading-tight" style={{ color: "#A09890", fontWeight: 200 }}>
                Astro-Harmonic
                <br />
                Natal Analysis
              </div>
            </div>

            <div className="mb-10">
              <div className="text-[9px] tracking-[0.45em] uppercase mb-2" style={{ color: "#B89D6A", fontWeight: 200 }}>
                Cosmic Chart — Sample
              </div>
              <h3 style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: "44px", lineHeight: 1, color: "#1A1918" }}>
                Michael's
                <br />
                <em style={{ color: "#B89D6A", fontStyle: "italic" }}>Cosmic Chart</em>
              </h3>
            </div>

            {/* Mini natal wheel */}
            <div className="flex justify-center mb-10">
              <svg width="180" height="180" viewBox="0 0 220 220" fill="none">
                <circle cx="110" cy="110" r="100" stroke="#D9D3C9" strokeWidth="0.75" />
                <circle cx="110" cy="110" r="78" stroke="#D9D3C9" strokeWidth="0.5" />
                <circle cx="110" cy="110" r="56" stroke="#D9D3C9" strokeWidth="0.5" />
                <circle cx="110" cy="110" r="30" stroke="#D9D3C9" strokeWidth="0.5" />
                <line x1="110" y1="10" x2="110" y2="210" stroke="#D9D3C9" strokeWidth="0.4" />
                <line x1="10" y1="110" x2="210" y2="110" stroke="#B89D6A" strokeWidth="0.75" />
                <circle cx="152" cy="65" r="4" fill="#B89D6A" />
                <text x="158" y="64" fontFamily="Jost" fontSize="8" fill="#B89D6A">☉</text>
                <circle cx="168" cy="95" r="3.5" fill="#1A1918" stroke="#D9D3C9" strokeWidth="0.75" />
                <text x="173" y="94" fontFamily="Jost" fontSize="8" fill="#A09890">☽</text>
                <circle cx="38" cy="115" r="3.5" fill="none" stroke="#A09890" strokeWidth="0.75" />
                <text x="24" y="114" fontFamily="Jost" fontSize="7" fill="#A09890">♄</text>
                <line x1="152" y1="65" x2="168" y2="95" stroke="#B89D6A" strokeWidth="0.5" opacity="0.6" />
                <line x1="152" y1="65" x2="38" y2="115" stroke="#D9D3C9" strokeWidth="0.4" opacity="0.5" />
                <text x="110" y="114" textAnchor="middle" fontFamily="Cormorant" fontStyle="italic" fontSize="13" fill="#B89D6A">F</text>
                <text x="110" y="128" textAnchor="middle" fontFamily="Jost" fontSize="7" letterSpacing="1" fill="#A09890">IONIAN</text>
              </svg>
            </div>

            {/* Identity grid */}
            <div className="grid grid-cols-3 border-t border-b" style={{ borderColor: "#D9D3C9" }}>
              {[
                { label: "Sun", value: "Taurus", mode: "34° · Earth" },
                { label: "Moon", value: "Gemini", mode: "87° · Air" },
                { label: "Ascendant", value: "Scorpio", mode: "229° · Water" },
              ].map((cell, i) => (
                <div
                  key={cell.label}
                  className="py-4 text-center"
                  style={i > 0 ? { borderLeft: "1px solid #D9D3C9" } : undefined}
                >
                  <div className="text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: "#A09890", fontWeight: 200 }}>
                    {cell.label}
                  </div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontSize: "20px", color: "#1A1918" }}>{cell.value}</div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "12px", color: "#B89D6A" }}>
                    {cell.mode}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION: MUSICAL TRANSLATION (excerpt) ─────────────── */}
          <SamplePage eyebrow="Section 02 — Sample" title="Musical" titleEm="Translation">
            <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "17px", lineHeight: 1.65, color: "#6A6560", marginBottom: 24 }}>
              Your chart resonates in F Ionian. Each planetary placement contributes a unique voice
              to your cosmic symphony — an instrument, a role, a tonal character.
            </p>

            <div className="flex items-center gap-5 p-5 mb-6" style={{ border: "1px solid #D4BF96" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "0.75px solid #D4BF96" }}>
                <span style={{ fontFamily: "'Cormorant', serif", fontSize: 20, color: "#B89D6A" }}>F</span>
              </div>
              <div className="flex-1">
                <div className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "#A09890", fontWeight: 200 }}>
                  Musical Mode
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontSize: 26, color: "#1A1918" }}>F Ionian</div>
              </div>
              <div className="hidden sm:block pl-5" style={{ borderLeft: "1px solid #D9D3C9", maxWidth: 200 }}>
                <div style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 14, color: "#6A6560", lineHeight: 1.5 }}>
                  The major scale — warm, grounded, resolved.
                </div>
              </div>
            </div>

            {[
              { glyph: "☉", name: "Sun", sign: "Taurus", voice: "Radiant brass and strings — the central melody", desc: "Sustained legato warmth and rich lower harmonics. The keynote of the entire composition." },
              { glyph: "☽", name: "Moon", sign: "Gemini", voice: "Silver flute and harp — the emotional undertow", desc: "Playful call-and-response dialogue and rapid ornamentation. Curiosity and motion threaded through every phrase." },
              { glyph: "♂", name: "Mars", sign: "Taurus", voice: "Driving percussion and distorted brass — the pulse", desc: "Sustained legato warmth beneath relentless rhythm. The unstoppable bass ostinato — the engine of the piece." },
            ].map((row) => (
              <div
                key={row.name}
                className="grid gap-4 py-3.5"
                style={{ gridTemplateColumns: "28px 90px 1fr", borderBottom: "1px solid #D9D3C9" }}
              >
                <div style={{ fontSize: 16, paddingTop: 2 }}>{row.glyph}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 11, letterSpacing: "0.15em", color: "#1A1918" }}>{row.name}</div>
                  <div className="mt-0.5 text-[9px] tracking-[0.2em] uppercase" style={{ color: "#A09890", fontWeight: 200 }}>{row.sign}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 14, color: "#B89D6A", marginBottom: 4 }}>{row.voice}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, color: "#6A6560", fontWeight: 300 }}>{row.desc}</div>
                </div>
              </div>
            ))}
            <FadeMore label="+ 7 more planetary voices in the full report" />
          </SamplePage>

          {/* ── SECTION: ASPECTS AS INTERVALS ──────────────────────── */}
          <SamplePage eyebrow="Reference 01" title="Aspects as" titleEm="Musical Intervals">
            <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.65, color: "#6A6560", marginBottom: 24 }}>
              Each angular relationship between two planets corresponds directly to a musical
              interval — from perfect consonance to maximum tension.
            </p>

            {[
              { name: "Conjunction", angle: "0°", interval: "Unison", quality: "Consonant", qColor: "#7A9E7A", desc: "Two voices singing the same note. Energies merge and amplify — pure unity." },
              { name: "Sextile", angle: "60°", interval: "Major Third", quality: "Consonant", qColor: "#7A9E7A", desc: "A pleasant major chord. Natural opportunity and supportive flow." },
              { name: "Square", angle: "90°", interval: "Tritone", quality: "Dissonant", qColor: "#B07070", desc: "The devil's interval — maximum tension demanding resolution. Dissonance drives evolution." },
              { name: "Trine", angle: "120°", interval: "Perfect Fifth", quality: "Consonant", qColor: "#7A9E7A", desc: "The most consonant interval after unison. Natural talent and effortless flow." },
              { name: "Opposition", angle: "180°", interval: "Octave", quality: "Tension", qColor: "#B07070", desc: "The same note at opposite ends. Integration through awareness transforms polarity into partnership." },
            ].map((row) => (
              <div
                key={row.name}
                className="grid gap-3 py-3.5 items-start sm:items-center"
                style={{ gridTemplateColumns: "minmax(110px,130px) 1fr", borderBottom: "1px solid #D9D3C9" }}
              >
                <div className="flex sm:flex-col gap-2 sm:gap-1">
                  <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 12, letterSpacing: "0.15em", color: "#1A1918" }}>{row.name}</div>
                  <div className="text-[9px] tracking-[0.2em]" style={{ color: "#A09890", fontWeight: 200 }}>{row.angle}</div>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1.5">
                    <span style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 15, color: "#B89D6A" }}>{row.interval}</span>
                    <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: row.qColor, fontWeight: 200 }}>{row.quality}</span>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.65, color: "#6A6560", fontWeight: 300 }}>{row.desc}</div>
                </div>
              </div>
            ))}
          </SamplePage>

          {/* ── SECTION: ELEMENTS ──────────────────────────────────── */}
          <SamplePage eyebrow="Reference 02" title="Elements" titleEm="as Frequency">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#D9D3C9" }}>
              {[
                { el: "Fire △", note: "C", desc: "Fast vibrations, initiating energy. Bold, warm, cardinal in nature.", signs: "Aries · Leo · Sagittarius" },
                { el: "Earth ▽", note: "F", desc: "Slow, steady vibrations, stabilizing. Patient, sensual, grounding.", signs: "Taurus · Virgo · Capricorn" },
                { el: "Air ◇", note: "G", desc: "Light, rapid oscillations, connecting. Curious, communicative.", signs: "Gemini · Libra · Aquarius" },
                { el: "Water ○", note: "E♭", desc: "Flowing, emotional vibrations, receptive. Intuitive, deep.", signs: "Cancer · Scorpio · Pisces" },
              ].map((c) => (
                <div key={c.el} className="p-5" style={{ background: "#F9F7F4" }}>
                  <div className="flex justify-between items-center mb-3">
                    <div style={{ fontFamily: "'Cormorant SC', serif", fontSize: 13, letterSpacing: "0.2em", color: "#1A1918" }}>{c.el}</div>
                    <div style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 16, color: "#B89D6A" }}>{c.note}</div>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, color: "#6A6560", fontWeight: 300 }}>{c.desc}</div>
                  <div className="mt-2 text-[9px] tracking-[0.25em] uppercase" style={{ color: "#A09890", fontWeight: 200 }}>{c.signs}</div>
                </div>
              ))}
            </div>
          </SamplePage>

          {/* ── SECTION: RESOLUTION GUIDANCE ───────────────────────── */}
          <SamplePage eyebrow="Section 04" title="Resolution" titleEm="Guidance">
            <div className="p-6" style={{ borderLeft: "2px solid #B89D6A" }}>
              <div className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: "#B89D6A", fontWeight: 200 }}>
                Sample Insight
              </div>
              <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: "#1A1918", marginBottom: 18 }}>
                The dominant Earth element grounds this composition in rich, sustained harmonies and
                deliberate pacing — the bass note beneath everything. Sun and Mars in Taurus establish
                Fixed endurance as the primary rhythmic signature.
              </p>
              <p style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: "#1A1918" }}>
                The Gemini Moon introduces Air's rapid oscillation into this Earth foundation —
                curiosity and motion threaded through patient depth.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Trust what is already working — there is real flow in this chart. Build from the stable note before reaching for more complexity.",
                "Earth is anchoring the score. Let steadiness be your advantage, then invite a little experimentation so stability does not harden into stagnation.",
                "Very little fire is present, so borrowed courage matters: use deadlines, movement, or a public commitment to create ignition.",
              ].map((g, i) => (
                <div key={i} className="flex gap-4">
                  <div style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 18, color: "#B89D6A", lineHeight: 1 }}>·</div>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#6A6560", fontWeight: 300 }}>{g}</p>
                </div>
              ))}
            </div>
          </SamplePage>

          {/* ── CLOSING ────────────────────────────────────────────── */}
          <div className="px-8 sm:px-14 py-12 text-center">
            <div className="flex justify-center mb-6">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="54" stroke="#D9D3C9" strokeWidth="0.75" />
                <circle cx="60" cy="60" r="36" stroke="#D9D3C9" strokeWidth="0.5" />
                <polygon points="60,18 96,76 24,76" fill="none" stroke="#B89D6A" strokeWidth="0.75" />
                <polygon points="60,102 24,44 96,44" fill="none" stroke="#D4BF96" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="4" fill="#B89D6A" />
                <text x="60" y="63" textAnchor="middle" fontFamily="Cormorant" fontStyle="italic" fontSize="10" fill="#F9F7F4">F</text>
              </svg>
            </div>
            <p style={{ fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.7, color: "#6A6560", maxWidth: 380, margin: "0 auto" }}>
              Together, they create a composition that is entirely yours: unrepeatable,
              constantly evolving, and profoundly beautiful. This is the music of your cosmos.
            </p>
            <div className="mt-8 text-[9px] tracking-[0.4em] uppercase" style={{ color: "#B89D6A", fontWeight: 200 }}>
              moontuner.xyz
            </div>
          </div>
        </motion.div>

        {/* What's actually in the full report */}
        <motion.div {...fadeUp} className="mt-16">
          <div className="text-center mb-10">
            <span className="system-label mb-3 block text-accent">What You Receive</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extralight">
              The complete, <span className="font-serif italic">personalized deliverable.</span>
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { t: "Full Natal Wheel", d: "Hand-rendered chart with all 10 planetary glyphs, ASC/MC axes, and major aspect lines drawn in gold." },
              { t: "10 Planetary Voices", d: "Sun through Pluto — each translated into a unique sonic role, instrument, and tonal character." },
              { t: "Musical Mode & Key", d: "Your Sun-Moon signature derived as an exact key signature with tempo, scale, and harmonic mode." },
              { t: "Aspect Interval Map", d: "Every major aspect in your chart converted to its musical interval with consonance/tension reading." },
              { t: "Elemental Balance", d: "The four elements analyzed as frequency dominance — what's loud, what's quiet, what's missing." },
              { t: "Resolution Guidance", d: "Personalized practices for working with your chart's specific tension, flow, and elemental imbalances." },
              { t: "House System Reference", d: "All 12 houses mapped as octaves of lived experience with the harmonic each governs." },
              { t: "Sonic Composition Statement", d: "A written portrait of how your inner and outer planets layer into one living composition." },
              { t: "Print-Ready Format", d: "Designed for screen and paper. Save as PDF, print as a keepsake, return to it for years." },
            ].map((item) => (
              <div key={item.t} className="node-card">
                <div className="font-serif italic text-lg text-foreground mb-2">{item.t}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.d}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── helpers ────────────────────────────────────────────────── */

const SamplePage = ({
  eyebrow,
  title,
  titleEm,
  children,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  children: React.ReactNode;
}) => (
  <div className="px-8 sm:px-14 py-12 border-b" style={{ borderColor: "#D9D3C9" }}>
    <div className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: "#B89D6A", fontWeight: 200 }}>
      {eyebrow}
    </div>
    <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 300, fontSize: 34, lineHeight: 1.05, color: "#1A1918", marginBottom: 24 }}>
      {title}
      <br />
      <em style={{ fontStyle: "italic", color: "#B89D6A" }}>{titleEm}</em>
    </div>
    <div className="relative mb-6 h-px" style={{ background: "#D9D3C9" }}>
      <span className="absolute left-0 -top-px w-14 h-[3px]" style={{ background: "#B89D6A" }} />
    </div>
    {children}
  </div>
);

const FadeMore = ({ label }: { label: string }) => (
  <div className="mt-3 pt-3 text-center text-[10px] tracking-[0.3em] uppercase" style={{ color: "#B89D6A", fontWeight: 200 }}>
    {label}
  </div>
);

export default AstroHarmonicSample;
