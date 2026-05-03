// Refined natal wheel + identity card. Renders as inline SVG so html2canvas
// can capture it cleanly. Aesthetic: cream paper (#F9F7F4), ink (#1A1918),
// gold accent (#B8924C) — matches the AstroHarmonicSample report style.
import { forwardRef, useMemo } from "react";
import type { ChartData } from "@/types/astrology";

const ZODIAC_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const PLANET_GLYPHS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂",
  Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇",
  Ascendant: "ASC",
};

interface Props {
  chart: ChartData;
  name: string;
  birthLine: string; // e.g. "March 15, 1990 · 4:30 AM · Brooklyn, NY"
}

export const NatalWheelCard = forwardRef<HTMLDivElement, Props>(
  ({ chart, name, birthLine }, ref) => {
    const wheel = useMemo(() => buildWheel(chart), [chart]);

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          padding: "60px 60px 50px",
          background: "#F9F7F4",
          color: "#1A1918",
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
              color: "#8C7A5C",
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
          {/* Outer circles */}
          <circle cx="300" cy="300" r="290" fill="none" stroke="#1A1918" strokeWidth="1" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="#1A1918" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="#B8924C" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="80" fill="none" stroke="#1A1918" strokeWidth="0.5" />

          {/* 12 sign sectors */}
          {wheel.signSectors.map((s) => (
            <g key={s.sign}>
              <line
                x1={s.line.x1}
                y1={s.line.y1}
                x2={s.line.x2}
                y2={s.line.y2}
                stroke="#1A1918"
                strokeWidth="0.4"
                opacity="0.4"
              />
              <text
                x={s.glyph.x}
                y={s.glyph.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fill="#1A1918"
                style={{ fontFamily: "serif" }}
              >
                {ZODIAC_GLYPHS[s.sign]}
              </text>
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
              stroke="#B8924C"
              strokeWidth="0.4"
              opacity="0.35"
            />
          ))}

          {/* Planets */}
          {wheel.planetMarks.map((p) => (
            <g key={p.name}>
              <line
                x1={p.tickIn.x}
                y1={p.tickIn.y}
                x2={p.tickOut.x}
                y2={p.tickOut.y}
                stroke="#1A1918"
                strokeWidth="1"
              />
              <circle cx={p.glyph.x} cy={p.glyph.y} r="14" fill="#F9F7F4" stroke="#1A1918" strokeWidth="0.5" />
              <text
                x={p.glyph.x}
                y={p.glyph.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={p.name === "Ascendant" ? 9 : 16}
                fill="#1A1918"
                style={{ fontFamily: "serif" }}
              >
                {PLANET_GLYPHS[p.name] ?? p.name.slice(0, 2)}
              </text>
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
            border: "1px solid #1A1918",
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
                borderRight: idx < 2 ? "1px solid #1A1918" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#8C7A5C",
                  marginBottom: 10,
                }}
              >
                {cell.label}
              </div>
              <div style={{ fontSize: 40, lineHeight: 1, marginBottom: 6 }}>
                {ZODIAC_GLYPHS[cell.value] ?? "·"}
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

        {/* Footer */}
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8C7A5C",
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

// ── geometry helpers ──────────────────────────────────────────────────────
function buildWheel(chart: ChartData) {
  const cx = 300, cy = 300;
  const ringInner = 240, ringOuter = 290;
  const planetRadius = 200;

  // Wheel rotation: place Ascendant at the 9 o'clock position (left)
  const ascDeg = chart.planets.find((p) => p.name === "Ascendant")?.degree ?? 0;
  const toScreen = (eclipticDeg: number) => {
    // ASC at left (9 o'clock); houses/signs progress counter-clockwise
    // (left → bottom → right → top), per astrological convention.
    const offset = ((eclipticDeg - ascDeg) + 360) % 360;
    const rad = ((180 + offset) * Math.PI) / 180;
    return rad;
  };

  // 12 sign sectors (every 30°)
  const signNames = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  const signSectors = signNames.map((sign, i) => {
    const startDeg = i * 30;
    const midDeg = startDeg + 15;
    const startRad = toScreen(startDeg);
    const midRad = toScreen(midDeg);
    const glyphR = (ringInner + ringOuter) / 2;
    return {
      sign,
      line: {
        x1: cx + ringInner * Math.cos(startRad),
        y1: cy - ringInner * Math.sin(startRad),
        x2: cx + ringOuter * Math.cos(startRad),
        y2: cy - ringOuter * Math.sin(startRad),
      },
      glyph: {
        x: cx + glyphR * Math.cos(midRad),
        y: cy - glyphR * Math.sin(midRad),
      },
    };
  });

  // Planet marks
  const planetMarks = chart.planets
    .filter((p) => p.name !== "Ascendant" || true)
    .map((p) => {
      const rad = toScreen(p.degree);
      return {
        name: p.name,
        tickIn: { x: cx + (ringInner - 5) * Math.cos(rad), y: cy - (ringInner - 5) * Math.sin(rad) },
        tickOut: { x: cx + ringInner * Math.cos(rad), y: cy - ringInner * Math.sin(rad) },
        glyph: { x: cx + planetRadius * Math.cos(rad), y: cy - planetRadius * Math.sin(rad) },
      };
    });

  // Aspect lines: connect planet pairs within 6° of major aspects
  const majors = [0, 60, 90, 120, 180];
  const orb = 6;
  const aspectLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const planetsForAspects = chart.planets.filter((p) => p.name !== "Ascendant");
  for (let i = 0; i < planetsForAspects.length; i++) {
    for (let j = i + 1; j < planetsForAspects.length; j++) {
      let angle = Math.abs(planetsForAspects[i].degree - planetsForAspects[j].degree);
      if (angle > 180) angle = 360 - angle;
      if (majors.some((m) => Math.abs(angle - m) <= orb)) {
        const rad1 = toScreen(planetsForAspects[i].degree);
        const rad2 = toScreen(planetsForAspects[j].degree);
        aspectLines.push({
          x1: cx + 155 * Math.cos(rad1),
          y1: cy - 155 * Math.sin(rad1),
          x2: cx + 155 * Math.cos(rad2),
          y2: cy - 155 * Math.sin(rad2),
        });
      }
    }
  }

  return { signSectors, planetMarks, aspectLines };
}
