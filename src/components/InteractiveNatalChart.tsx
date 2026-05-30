/**
 * Interactive natal chart wheel for the on-screen report.
 *
 * - Renders the user's planets, signs, houses and aspect lines.
 * - Aspect lines color-coded by aspect family + glow on hover.
 * - Click any planet glyph or aspect line to open an insight card with
 *   the QuantumMelodic translation (instrument, timbre, frequency,
 *   archetypal meaning, sign + house overlay) and a "hear it" button
 *   that plays a 2–3 s preview through Tone.js.
 *
 * No emoji; uses the project AstroSigils for all symbology.
 */
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import { Play, Loader2 } from "lucide-react";
import type { ChartData } from "@/types/astrology";
import type { QuantumMelodicReading, ComputedAspect } from "@/types/quantumMelodic";
import { SigilGroup, isSigilName, type SigilName } from "@/components/astro/AstroSigils";

interface Props {
  chart: ChartData;
  qmReading: QuantumMelodicReading;
}

const SIGN_NAMES: SigilName[] = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

// ── aspect color families (semantic, dark-theme) ────────────────────────
const ASPECT_COLORS: Record<string, string> = {
  Conjunction: "#E5C07B",   // gold — fusion
  Sextile:     "#7FD1C7",   // teal — flowing collaboration
  Trine:       "#6FB6FF",   // blue — harmonious cool
  Square:      "#FF6B6B",   // red — friction
  Opposition:  "#D86BFF",   // magenta — polarity
  Quincunx:    "#FFD166",   // amber — adjustment
};

const aspectColor = (name: string) => ASPECT_COLORS[name] ?? "#9AA0A6";

// ── instrument → Tone.js oscillator mapping ────────────────────────────
function oscFromInstrument(instr?: string): OscillatorType {
  const i = (instr || "").toLowerCase();
  if (/cello|bass|bassoon|contra/.test(i)) return "sawtooth";
  if (/violin|viola|string|harp|kalimba|lute/.test(i)) return "triangle";
  if (/flute|whistle|sine|chime/.test(i)) return "sine";
  if (/horn|brass|trumpet|trombone/.test(i)) return "square";
  if (/piano|bell|marimba|crystal/.test(i)) return "triangle";
  return "triangle";
}

type Selection =
  | { kind: "planet"; planetName: string }
  | { kind: "aspect"; aspect: ComputedAspect }
  | null;

export function InteractiveNatalChart({ chart, qmReading }: Props) {
  const wheel = useMemo(() => buildWheel(chart, qmReading), [chart, qmReading]);
  const [hover, setHover] = useState<Selection>(null);
  const [selected, setSelected] = useState<Selection>(null);
  const [playing, setPlaying] = useState(false);
  const playRef = useRef<{ stop: () => void } | null>(null);

  const playPlanet = async (planetName: string) => {
    const p = qmReading.planets.find((x) => x.position.name === planetName);
    if (!p?.qmData) return;
    setPlaying(true);
    try {
      await Tone.start();
      const osc = oscFromInstrument(p.qmData.instrument);
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: osc },
        envelope: { attack: 0.05, decay: 0.4, sustain: 0.5, release: 1.2 },
      });
      const reverb = new Tone.Reverb({ decay: 2.4, wet: 0.35 }).toDestination();
      synth.connect(reverb);
      const freq = p.qmData.frequency_hz;
      const now = Tone.now();
      synth.triggerAttackRelease(freq, 1.4, now, 0.7);
      synth.triggerAttackRelease(freq * 1.5, 1.0, now + 0.6, 0.5); // perfect fifth shimmer
      playRef.current = {
        stop: () => {
          synth.releaseAll();
          setTimeout(() => { synth.dispose(); reverb.dispose(); }, 1500);
        },
      };
      setTimeout(() => { playRef.current?.stop(); playRef.current = null; setPlaying(false); }, 2400);
    } catch {
      setPlaying(false);
    }
  };

  const playAspect = async (aspect: ComputedAspect) => {
    const p1 = qmReading.planets.find((x) => x.position.name === aspect.planet1)?.qmData;
    const p2 = qmReading.planets.find((x) => x.position.name === aspect.planet2)?.qmData;
    if (!p1 || !p2) return;
    setPlaying(true);
    try {
      await Tone.start();
      const reverb = new Tone.Reverb({ decay: 3.2, wet: 0.45 }).toDestination();
      const s1 = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: oscFromInstrument(p1.instrument) },
        envelope: { attack: 0.08, decay: 0.5, sustain: 0.6, release: 1.6 },
      }).connect(reverb);
      const s2 = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: oscFromInstrument(p2.instrument) },
        envelope: { attack: 0.08, decay: 0.5, sustain: 0.6, release: 1.6 },
      }).connect(reverb);
      const now = Tone.now();
      const tense = ["Square", "Opposition"].includes(aspect.aspectType.name);
      s1.triggerAttackRelease(p1.frequency_hz, 2.2, now, 0.6);
      // For tense aspects, play together (interval clash). For harmonious, slight stagger.
      s2.triggerAttackRelease(p2.frequency_hz, 2.2, now + (tense ? 0 : 0.25), 0.6);
      playRef.current = {
        stop: () => {
          s1.releaseAll(); s2.releaseAll();
          setTimeout(() => { s1.dispose(); s2.dispose(); reverb.dispose(); }, 1800);
        },
      };
      setTimeout(() => { playRef.current?.stop(); playRef.current = null; setPlaying(false); }, 2800);
    } catch {
      setPlaying(false);
    }
  };

  const close = () => setSelected(null);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 600 600"
        className="w-full max-w-2xl mx-auto block"
        style={{ aspectRatio: "1 / 1" }}
      >
        <defs>
          {Object.entries(ASPECT_COLORS).map(([k, c]) => (
            <filter key={k} id={`glow-${k}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feFlood floodColor={c} floodOpacity="0.9" result="col" />
              <feComposite in="col" in2="b" operator="in" result="g" />
              <feMerge>
                <feMergeNode in="g" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          <radialGradient id="wheel-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent) / 0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="planet-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feFlood floodColor="hsl(var(--accent))" floodOpacity="0.85" result="c" />
            <feComposite in="c" in2="b" operator="in" result="g" />
            <feMerge>
              <feMergeNode in="g" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric rings */}
        <circle cx="300" cy="300" r="290" fill="url(#wheel-bg)" stroke="hsl(var(--border))" strokeWidth="1" />
        <circle cx="300" cy="300" r="255" fill="none" stroke="hsl(var(--border))" strokeWidth="0.6" opacity="0.6" />
        <circle cx="300" cy="300" r="218" fill="none" stroke="hsl(var(--border))" strokeWidth="0.8" />
        <circle cx="300" cy="300" r="160" fill="none" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />

        {/* Sign sector dividers + glyphs */}
        {wheel.signs.map((s) => (
          <g key={s.sign}>
            <line
              x1={s.divider.x1} y1={s.divider.y1}
              x2={s.divider.x2} y2={s.divider.y2}
              stroke="hsl(var(--border))" strokeWidth="0.4" opacity="0.5"
            />
            <SigilGroup
              name={s.sign as SigilName}
              cx={s.glyph.x} cy={s.glyph.y}
              size={24}
              color="hsl(var(--muted-foreground))"
              strokeWidth={1.2}
            />
          </g>
        ))}

        {/* House cusps (faint radial dashes) */}
        {wheel.houseCusps.map((c, i) => (
          <line
            key={`hc-${i}`}
            x1={300 + 80 * Math.cos(c.rad)} y1={300 - 80 * Math.sin(c.rad)}
            x2={300 + 218 * Math.cos(c.rad)} y2={300 - 218 * Math.sin(c.rad)}
            stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.35"
            strokeDasharray="2 4"
          />
        ))}

        {/* House numbers (center band) */}
        {wheel.houseLabels.map((h) => (
          <text
            key={`hn-${h.number}`}
            x={h.x} y={h.y}
            textAnchor="middle" dominantBaseline="central"
            fontSize="10" fill="hsl(var(--muted-foreground))"
            opacity="0.6"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: 1 }}
          >
            {h.number}
          </text>
        ))}

        {/* Aspect lines */}
        {wheel.aspects.map((a, i) => {
          const isHovered = hover?.kind === "aspect" && hover.aspect === a.aspect;
          const isSelected = selected?.kind === "aspect" && selected.aspect === a.aspect;
          return (
            <line
              key={`asp-${i}`}
              x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke={a.color}
              strokeWidth={isHovered || isSelected ? 2.2 : 1}
              opacity={hover && !isHovered && !isSelected ? 0.25 : 0.75}
              filter={isHovered || isSelected ? `url(#glow-${a.aspect.aspectType.name})` : undefined}
              style={{ cursor: "pointer", transition: "all 200ms ease" }}
              onMouseEnter={() => setHover({ kind: "aspect", aspect: a.aspect })}
              onMouseLeave={() => setHover(null)}
              onClick={() => setSelected({ kind: "aspect", aspect: a.aspect })}
            />
          );
        })}

        {/* Planets */}
        {wheel.planets.map((p) => {
          const isHovered = hover?.kind === "planet" && hover.planetName === p.name;
          const isSelected = selected?.kind === "planet" && selected.planetName === p.name;
          return (
            <g
              key={p.name}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover({ kind: "planet", planetName: p.name })}
              onMouseLeave={() => setHover(null)}
              onClick={() => setSelected({ kind: "planet", planetName: p.name })}
            >
              {/* radial leader from zodiac ring inward to glyph */}
              <line
                x1={p.tickIn.x} y1={p.tickIn.y}
                x2={p.tickOut.x} y2={p.tickOut.y}
                stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.7"
              />
              <line
                x1={p.tickOut.x} y1={p.tickOut.y}
                x2={p.glyph.x} y2={p.glyph.y}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" opacity="0.5"
              />
              <circle
                cx={p.glyph.x} cy={p.glyph.y}
                r={isHovered || isSelected ? 16 : 14}
                fill="hsl(var(--background))"
                stroke="hsl(var(--foreground))"
                strokeWidth={isHovered || isSelected ? 1.2 : 0.6}
                filter={isHovered || isSelected ? "url(#planet-glow)" : undefined}
                style={{ transition: "all 200ms ease" }}
              />
              {isSigilName(p.name) ? (
                <SigilGroup
                  name={p.name as SigilName}
                  cx={p.glyph.x} cy={p.glyph.y}
                  size={18}
                  color="hsl(var(--foreground))"
                  strokeWidth={1.2}
                />
              ) : (
                <text
                  x={p.glyph.x} y={p.glyph.y}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="9" fill="hsl(var(--foreground))"
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: 1 }}
                >
                  {p.name.slice(0, 3).toUpperCase()}
                </text>
              )}
              {p.retrograde && (
                <text
                  x={p.glyph.x + 14} y={p.glyph.y + 14}
                  fontSize="9" fill="hsl(var(--accent))"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >℞</text>
              )}
            </g>
          );
        })}

        {/* Hover tooltip (compact) */}
        {hover && !selected && (
          <HoverTooltip hover={hover} qm={qmReading} wheel={wheel} />
        )}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
        {Object.entries(ASPECT_COLORS).map(([name, color]) => (
          <div key={name} className="flex items-center gap-2">
            <span className="inline-block w-6 h-px" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            <span style={{ letterSpacing: 1 }} className="uppercase">{name}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground/70 mt-2 italic">
        Click any planet or aspect line to reveal its QuantumMelodic signature.
      </p>

      {/* Insight panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-lg p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl leading-none"
                aria-label="Close"
              >×</button>

              {selected.kind === "planet"
                ? <PlanetInsight
                    planetName={selected.planetName}
                    qm={qmReading}
                    chart={chart}
                    onPlay={() => playPlanet(selected.planetName)}
                    playing={playing}
                  />
                : <AspectInsight
                    aspect={selected.aspect}
                    qm={qmReading}
                    onPlay={() => playAspect(selected.aspect)}
                    playing={playing}
                  />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── hover tooltip ─────────────────────────────────────────────────────
function HoverTooltip({
  hover, qm, wheel,
}: { hover: Selection; qm: QuantumMelodicReading; wheel: ReturnType<typeof buildWheel> }) {
  if (!hover) return null;
  if (hover.kind === "planet") {
    const p = wheel.planets.find((x) => x.name === hover.planetName);
    const qp = qm.planets.find((x) => x.position.name === hover.planetName);
    if (!p) return null;
    const label = qp
      ? `${hover.planetName} · ${qp.position.sign}${qp.houseNumber ? ` · House ${qp.houseNumber}` : ""}`
      : hover.planetName;
    return (
      <g pointerEvents="none">
        <rect
          x={p.glyph.x + 22} y={p.glyph.y - 14}
          rx="4" ry="4"
          width={Math.max(140, label.length * 5.4)} height="22"
          fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.6" opacity="0.95"
        />
        <text
          x={p.glyph.x + 30} y={p.glyph.y + 1}
          fontSize="10" fill="hsl(var(--foreground))"
          style={{ fontFamily: "'Jost', sans-serif", letterSpacing: 1 }}
        >{label}</text>
      </g>
    );
  }
  // aspect
  const asp = wheel.aspects.find((a) => a.aspect === hover.aspect);
  if (!asp) return null;
  const midX = (asp.x1 + asp.x2) / 2;
  const midY = (asp.y1 + asp.y2) / 2;
  const text = `${asp.aspect.planet1} ${asp.aspect.aspectType.name} ${asp.aspect.planet2}`;
  return (
    <g pointerEvents="none">
      <rect
        x={midX - text.length * 2.6} y={midY - 11}
        rx="4" ry="4"
        width={text.length * 5.2} height="22"
        fill="hsl(var(--background))" stroke={asp.color} strokeWidth="0.6" opacity="0.95"
      />
      <text
        x={midX} y={midY + 4}
        textAnchor="middle"
        fontSize="10" fill="hsl(var(--foreground))"
        style={{ fontFamily: "'Jost', sans-serif", letterSpacing: 1 }}
      >{text}</text>
    </g>
  );
}

// ── insight cards ─────────────────────────────────────────────────────
function PlanetInsight({
  planetName, qm, chart, onPlay, playing,
}: {
  planetName: string;
  qm: QuantumMelodicReading;
  chart: ChartData;
  onPlay: () => void;
  playing: boolean;
}) {
  const enriched = qm.planets.find((p) => p.position.name === planetName);
  if (!enriched) return <p className="text-muted-foreground">No data for {planetName}.</p>;
  const { position, qmData, signData, houseData, houseNumber } = enriched;
  const degInSign = position.degree % 30;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center bg-background">
          {isSigilName(planetName) && (
            <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <SigilGroup name={planetName as SigilName} cx={16} cy={16} size={28} color="hsl(var(--foreground))" strokeWidth={1.4} />
            </svg>
          )}
        </div>
        <div>
          <div className="system-label">Planet</div>
          <h3 className="font-serif text-2xl text-foreground">{planetName}</h3>
          <div className="text-sm text-muted-foreground">
            {position.sign} · {Math.floor(degInSign)}°{Math.round((degInSign % 1) * 60).toString().padStart(2, "0")}′
            {houseNumber ? ` · House ${houseNumber}` : ""}
            {position.isRetrograde ? " · Retrograde" : ""}
          </div>
        </div>
      </div>

      {qmData && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <Field label="Instrument" value={qmData.instrument} />
          <Field label="Frequency" value={`${qmData.frequency_hz.toFixed(2)} Hz`} />
          <Field label="Note" value={qmData.note} />
          <Field label="Timbre" value={qmData.timbre} />
        </div>
      )}

      {qmData?.archetypal_energy && (
        <Block label="Archetypal Energy" body={qmData.archetypal_energy} />
      )}
      {qmData?.sonic_character && (
        <Block label="Sonic Character" body={qmData.sonic_character} italic />
      )}
      {signData?.emotional_quality && (
        <Block
          label={`In ${position.sign}`}
          body={`${signData.emotional_quality} ${signData.sonic_palette ? `— ${signData.sonic_palette}` : ""}`}
        />
      )}
      {houseData?.expression && (
        <Block
          label={`In House ${houseNumber} · ${houseData.name}`}
          body={`${houseData.expression}${houseData.tonal_area ? ` Tonal area: ${houseData.tonal_area}.` : ""}`}
        />
      )}

      <button
        onClick={onPlay}
        disabled={playing || !qmData}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition text-sm uppercase tracking-widest"
      >
        {playing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        Hear {planetName} in {position.sign}{houseNumber ? ` · House ${houseNumber}` : ""}
      </button>
    </div>
  );
}

function AspectInsight({
  aspect, qm, onPlay, playing,
}: {
  aspect: ComputedAspect;
  qm: QuantumMelodicReading;
  onPlay: () => void;
  playing: boolean;
}) {
  const a = aspect.aspectType;
  const p1 = qm.planets.find((x) => x.position.name === aspect.planet1)?.qmData;
  const p2 = qm.planets.find((x) => x.position.name === aspect.planet2)?.qmData;
  const color = aspectColor(a.name);
  return (
    <div className="space-y-5">
      <div>
        <div className="system-label" style={{ color }}>{a.name}</div>
        <h3 className="font-serif text-2xl text-foreground">
          {aspect.planet1} <span style={{ color }}>—</span> {aspect.planet2}
        </h3>
        <div className="text-sm text-muted-foreground">
          {a.angle}° · orb {aspect.orb.toFixed(2)}° · {a.harmonic_interval} · {a.consonance}
        </div>
      </div>

      {a.musical_effect && <Block label="Musical Effect" body={a.musical_effect} />}
      {a.sonic_expression && <Block label="Sonic Expression" body={a.sonic_expression} italic />}

      {p1 && p2 && (
        <div className="rounded-md border border-border/60 p-4 bg-background/40 text-sm leading-relaxed">
          <span className="text-muted-foreground">
            <strong className="text-foreground">{aspect.planet1}</strong> ({p1.instrument}, {p1.frequency_hz.toFixed(1)} Hz)
            meets <strong className="text-foreground">{aspect.planet2}</strong> ({p2.instrument}, {p2.frequency_hz.toFixed(1)} Hz)
            at {a.harmonic_interval}.
          </span>
        </div>
      )}

      <button
        onClick={onPlay}
        disabled={playing || !p1 || !p2}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-background hover:opacity-90 disabled:opacity-50 transition text-sm uppercase tracking-widest"
        style={{ background: color }}
      >
        {playing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        Hear this {a.name} at work
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="system-label mb-1">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function Block({ label, body, italic }: { label: string; body: string; italic?: boolean }) {
  return (
    <div>
      <div className="system-label mb-2">{label}</div>
      <p className={`text-sm leading-relaxed text-muted-foreground ${italic ? "italic" : ""}`}>{body}</p>
    </div>
  );
}

// ── geometry ──────────────────────────────────────────────────────────
function buildWheel(chart: ChartData, qm: QuantumMelodicReading) {
  const cx = 300, cy = 300;
  const ringInner = 218, ringOuter = 255;
  const baseGlyphR = 195;
  const ringMid = (ringInner + ringOuter) / 2;

  const ascDeg = chart.planets.find((p) => p.name === "Ascendant")?.degree ?? 0;
  const toScreen = (eclipticDeg: number) => {
    const offset = ((eclipticDeg - ascDeg) + 360) % 360;
    return ((180 + offset) * Math.PI) / 180;
  };

  const signs = SIGN_NAMES.map((sign, i) => {
    const startDeg = i * 30;
    const midDeg = startDeg + 15;
    const startRad = toScreen(startDeg);
    const midRad = toScreen(midDeg);
    return {
      sign,
      divider: {
        x1: cx + ringInner * Math.cos(startRad), y1: cy - ringInner * Math.sin(startRad),
        x2: cx + ringOuter * Math.cos(startRad), y2: cy - ringOuter * Math.sin(startRad),
      },
      glyph: { x: cx + ringMid * Math.cos(midRad), y: cy - ringMid * Math.sin(midRad) },
    };
  });

  // Equal-house cusps from ASC for visual reference
  const houseCusps = Array.from({ length: 12 }).map((_, i) => {
    const rad = toScreen(i * 30 + (ascDeg % 30 === 0 ? 0 : ascDeg - Math.floor(ascDeg / 30) * 30));
    return { rad };
  });
  const houseLabels = Array.from({ length: 12 }).map((_, i) => {
    const midDeg = i * 30 + 15 + (ascDeg - Math.floor(ascDeg / 30) * 30);
    const rad = toScreen(midDeg);
    const r = 100;
    return { number: i + 1, x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
  });

  // Collision-aware planet placement
  const ordered = [...chart.planets].sort((a, b) => a.degree - b.degree);
  const minGap = 7;
  const radiusStep = 22;
  const placements: Array<{ name: string; degree: number; glyphR: number; retrograde: boolean }> = [];
  ordered.forEach((p) => {
    let glyphR = baseGlyphR;
    let safe = false; let guard = 0;
    while (!safe && guard < 6) {
      safe = true;
      for (const placed of placements) {
        let diff = Math.abs(placed.degree - p.degree);
        if (diff > 180) diff = 360 - diff;
        if (diff < minGap && Math.abs(placed.glyphR - glyphR) < 18) {
          glyphR -= radiusStep; safe = false; break;
        }
      }
      guard++;
    }
    placements.push({ name: p.name, degree: p.degree, glyphR, retrograde: p.isRetrograde });
  });

  const planets = placements.map((p) => {
    const rad = toScreen(p.degree);
    return {
      name: p.name, retrograde: p.retrograde, degree: p.degree,
      tickIn: { x: cx + (ringInner - 10) * Math.cos(rad), y: cy - (ringInner - 10) * Math.sin(rad) },
      tickOut: { x: cx + ringInner * Math.cos(rad), y: cy - ringInner * Math.sin(rad) },
      glyph: { x: cx + p.glyphR * Math.cos(rad), y: cy - p.glyphR * Math.sin(rad) },
    };
  });

  // Aspect lines from QM aspects (already computed with proper orbs)
  const aspects = qm.aspects.map((a) => {
    const p1 = chart.planets.find((p) => p.name === a.planet1);
    const p2 = chart.planets.find((p) => p.name === a.planet2);
    if (!p1 || !p2) return null;
    const r1 = toScreen(p1.degree);
    const r2 = toScreen(p2.degree);
    return {
      aspect: a,
      color: aspectColor(a.aspectType.name),
      x1: cx + 155 * Math.cos(r1), y1: cy - 155 * Math.sin(r1),
      x2: cx + 155 * Math.cos(r2), y2: cy - 155 * Math.sin(r2),
    };
  }).filter(Boolean) as Array<{ aspect: ComputedAspect; color: string; x1: number; y1: number; x2: number; y2: number }>;

  return { signs, houseCusps, houseLabels, planets, aspects };
}
