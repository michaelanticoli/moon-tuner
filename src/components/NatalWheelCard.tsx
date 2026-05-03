// Refined natal wheel + identity card. Uses custom SVG sigils (no emoji,
// no system-font fallback), zodiac-anchored sign ring, collision-aware
// planet placement so clustered bodies fan out instead of stacking.
import { forwardRef, useMemo } from "react";
import type { ChartData } from "@/types/astrology";
import { Sigil, SigilGroup, isSigilName, type SigilName } from "@/components/astro/AstroSigils";

interface Props {
  chart: ChartData;
  name: string;
  birthLine: string;
}

const SIGN_NAMES: SigilName[] = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const PLANET_ORDER = [
  "Sun", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
  "NorthNode", "Chiron", "Ascendant",
];

// Aesthetic
const INK = "#1A1918";
const GOLD = "#B8924C";
const PAPER = "#F9F7F4";
const MUTED = "#8C7A5C";

export const NatalWheelCard = forwardRef<HTMLDivElement, Props>(
  ({ chart, name, birthLine }, ref) => {
    const wheel = useMemo(() => buildWheel(chart), [chart]);

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          padding: "60px 60px 50px",
          background: PAPER,
          color: INK,
          fontFamily: "'Cormorant', 'Times New Roman', serif",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 14,
            }}
          >
            Astro · Harmonic Natal Signature
          </div>
          <div style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.1 }}>{name}</div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 13,
              letterSpacing: 2,
              color: "#5C5247",
              marginTop: 10,
            }}
          >
            {birthLine}
          </div>
        </div>

        {/* Wheel */}
        <svg
          viewBox="0 0 600 600"
          width="100%"
          height={700}
          style={{ display: "block", margin: "0 auto" }}
        >
          {/* Concentric rings */}
          <circle cx="300" cy="300" r="290" fill="none" stroke={INK} strokeWidth="1" />
          <circle cx="300" cy="300" r="255" fill="none" stroke={INK} strokeWidth="0.4" opacity="0.55" />
          <circle cx="300" cy="300" r="218" fill="none" stroke={INK} strokeWidth="0.6" />
          <circle cx="300" cy="300" r="160" fill="none" stroke={GOLD} strokeWidth="0.5" />
          <circle cx="300" cy="300" r="80" fill="none" stroke={INK} strokeWidth="0.4" opacity="0.5" />

          {/* Degree ticks (every 5°, longer every 30°) */}
          {Array.from({ length: 72 }).map((_, i) => {
            const deg = i * 5;
            const rad = wheel.toScreen(deg);
            const isMajor = deg % 30 === 0;
            const r1 = 255;
            const r2 = isMajor ? 240 : 250;
            return (
              <line
                key={`tick-${i}`}
                x1={300 + r1 * Math.cos(rad)}
                y1={300 - r1 * Math.sin(rad)}
                x2={300 + r2 * Math.cos(rad)}
                y2={300 - r2 * Math.sin(rad)}
                stroke={INK}
                strokeWidth={isMajor ? 0.8 : 0.3}
                opacity={isMajor ? 0.7 : 0.4}
              />
            );
          })}

          {/* Sign sectors with custom sigils */}
          {wheel.signSectors.map((s) => (
            <g key={s.sign}>
              <SigilGroup
                name={s.sign as SigilName}
                cx={s.glyph.x}
                cy={s.glyph.y}
                size={26}
                color={INK}
                strokeWidth={1.3}
              />
            </g>
          ))}

          {/* Aspect lines (faint, in center) */}
          {wheel.aspectLines.map((a, i) => (
            <line
              key={i}
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              stroke={a.kind === "harmonious" ? GOLD : INK}
              strokeWidth="0.5"
              opacity={a.kind === "harmonious" ? 0.45 : 0.3}
              strokeDasharray={a.kind === "tense" ? "3 3" : undefined}
            />
          ))}

          {/* Planets */}
          {wheel.planetMarks.map((p) => (
            <g key={p.name}>
              {/* leader line from planet ring tick to glyph */}
              <line
                x1={p.tickIn.x}
                y1={p.tickIn.y}
                x2={p.tickOut.x}
                y2={p.tickOut.y}
                stroke={INK}
                strokeWidth="0.8"
              />
              <line
                x1={p.tickOut.x}
                y1={p.tickOut.y}
                x2={p.glyph.x}
                y2={p.glyph.y}
                stroke={INK}
                strokeWidth="0.5"
                opacity="0.5"
              />
              <circle
                cx={p.glyph.x}
                cy={p.glyph.y}
                r="14"
                fill={PAPER}
                stroke={INK}
                strokeWidth="0.6"
              />
              {isSigilName(p.name) ? (
                <SigilGroup
                  name={p.name as SigilName}
                  cx={p.glyph.x}
                  cy={p.glyph.y}
                  size={18}
                  color={INK}
                  strokeWidth={1.2}
                />
              ) : (
                <text
                  x={p.glyph.x}
                  y={p.glyph.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={9}
                  fill={INK}
                  style={{ fontFamily: "'Jost', sans-serif", letterSpacing: 1 }}
                >
                  {p.name.slice(0, 3).toUpperCase()}
                </text>
              )}
              {p.retrograde && (
                <text
                  x={p.glyph.x + 14}
                  y={p.glyph.y + 14}
                  fontSize={8}
                  fill={GOLD}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  ℞
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Identity strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            marginTop: 30,
            border: `1px solid ${INK}`,
          }}
        >
          {[
            { label: "Sun", value: chart.sunSign, role: "Essence" },
            { label: "Moon", value: chart.moonSign, role: "Inner Tide" },
            { label: "Rising", value: chart.ascendant, role: "Threshold" },
          ].map((cell, idx) => (
            <div
              key={cell.label}
              style={{
                padding: "28px 20px",
                textAlign: "center",
                borderRight: idx < 2 ? `1px solid ${INK}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: MUTED,
                  marginBottom: 10,
                }}
              >
                {cell.label}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                {isSigilName(cell.value) ? (
                  <Sigil name={cell.value as SigilName} size={42} color={INK} strokeWidth={1.4} />
                ) : (
                  <span style={{ fontSize: 32 }}>·</span>
                )}
              </div>
              <div style={{ fontSize: 22, fontWeight: 300 }}>{cell.value}</div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#5C5247",
                  marginTop: 8,
                }}
              >
                {cell.role}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: MUTED,
            textAlign: "center",
            marginTop: 26,
          }}
        >
          MOONtuner · Astro-Harmonic Analysis
        </div>
      </div>
    );
  },
);
NatalWheelCard.displayName = "NatalWheelCard";

// ── geometry ─────────────────────────────────────────────────────────────
function buildWheel(chart: ChartData) {
  const cx = 300, cy = 300;
  const ringInner = 218;       // inner edge of zodiac band
  const ringOuter = 255;       // outer edge of zodiac band
  const baseGlyphR = 200;      // default planet glyph radius (inside zodiac band)
  const ringMid = (ringInner + ringOuter) / 2;

  const ascDeg = chart.planets.find((p) => p.name === "Ascendant")?.degree ?? 0;
  // ASC at 9 o'clock; signs/houses progress counter-clockwise.
  const toScreen = (eclipticDeg: number) => {
    const offset = ((eclipticDeg - ascDeg) + 360) % 360;
    return ((180 + offset) * Math.PI) / 180;
  };

  // Sign sectors (every 30°): glyph at sector midpoint on the band centerline.
  const signSectors = SIGN_NAMES.map((sign, i) => {
    const startDeg = i * 30;
    const midDeg = startDeg + 15;
    const startRad = toScreen(startDeg);
    const midRad = toScreen(midDeg);
    return {
      sign,
      line: {
        x1: cx + ringInner * Math.cos(startRad),
        y1: cy - ringInner * Math.sin(startRad),
        x2: cx + ringOuter * Math.cos(startRad),
        y2: cy - ringOuter * Math.sin(startRad),
      },
      glyph: {
        x: cx + ringMid * Math.cos(midRad),
        y: cy - ringMid * Math.sin(midRad),
      },
    };
  });

  // ── Collision-aware planet placement ────────────────────────────────
  // Sort planets by ecliptic degree, then walk through and bump any glyph
  // that would overlap its predecessor by stepping the radius inward.
  const ordered = [...chart.planets]
    .filter((p) => PLANET_ORDER.includes(p.name))
    .sort((a, b) => a.degree - b.degree);

  const minAngularGap = 7; // degrees of arc between glyphs at base radius
  const radiusStep = 22;
  const placements: Array<{
    name: string;
    degree: number;
    glyphR: number;
    retrograde: boolean;
  }> = [];

  ordered.forEach((p) => {
    let glyphR = baseGlyphR;
    // Find any neighbor (regardless of order) within minAngularGap and
    // already at this radius — push inward until clear.
    let safe = false;
    let guard = 0;
    while (!safe && guard < 6) {
      safe = true;
      for (const placed of placements) {
        let diff = Math.abs(placed.degree - p.degree);
        if (diff > 180) diff = 360 - diff;
        if (diff < minAngularGap && Math.abs(placed.glyphR - glyphR) < 18) {
          glyphR -= radiusStep;
          safe = false;
          break;
        }
      }
      guard++;
    }
    placements.push({ name: p.name, degree: p.degree, glyphR, retrograde: p.isRetrograde });
  });

  const planetMarks = placements.map((p) => {
    const rad = toScreen(p.degree);
    return {
      name: p.name,
      retrograde: p.retrograde,
      tickIn: { x: cx + (ringInner - 8) * Math.cos(rad), y: cy - (ringInner - 8) * Math.sin(rad) },
      tickOut: { x: cx + ringInner * Math.cos(rad), y: cy - ringInner * Math.sin(rad) },
      glyph: { x: cx + p.glyphR * Math.cos(rad), y: cy - p.glyphR * Math.sin(rad) },
    };
  });

  // Aspect lines (within tight orbs), classified for color/style.
  const aspectDefs: Array<{ angle: number; kind: "harmonious" | "tense" | "neutral"; orb: number }> = [
    { angle: 0,   kind: "neutral",     orb: 6 },
    { angle: 60,  kind: "harmonious",  orb: 4 },
    { angle: 90,  kind: "tense",       orb: 5 },
    { angle: 120, kind: "harmonious",  orb: 5 },
    { angle: 180, kind: "tense",       orb: 6 },
  ];
  const aspectLines: Array<{ x1: number; y1: number; x2: number; y2: number; kind: "harmonious" | "tense" | "neutral" }> = [];
  const planetsForAspects = chart.planets.filter((p) => p.name !== "Ascendant");
  for (let i = 0; i < planetsForAspects.length; i++) {
    for (let j = i + 1; j < planetsForAspects.length; j++) {
      let angle = Math.abs(planetsForAspects[i].degree - planetsForAspects[j].degree);
      if (angle > 180) angle = 360 - angle;
      const match = aspectDefs.find((a) => Math.abs(angle - a.angle) <= a.orb);
      if (match) {
        const r1 = toScreen(planetsForAspects[i].degree);
        const r2 = toScreen(planetsForAspects[j].degree);
        aspectLines.push({
          x1: cx + 155 * Math.cos(r1),
          y1: cy - 155 * Math.sin(r1),
          x2: cx + 155 * Math.cos(r2),
          y2: cy - 155 * Math.sin(r2),
          kind: match.kind,
        });
      }
    }
  }

  return { signSectors, planetMarks, aspectLines, toScreen };
}
