import type { CosmicReading, ChartData } from '@/types/astrology';
import type { QuantumMelodicReading } from '@/types/quantumMelodic';
import { elementInfo, aspectMusicalData, houseWisdom } from '@/utils/harmonicWisdom';

// Inline raw SVG path strings for sigils (mirrors AstroSigils, but as strings
// so we can embed in a generated HTML document for the popup + PDF).
const SIGIL_PATHS: Record<string, string> = {
  Aries: '<path d="M16 28 V14"/><path d="M16 14 C 12 10, 8 10, 7 14"/><path d="M16 14 C 20 10, 24 10, 25 14"/>',
  Taurus: '<circle cx="16" cy="22" r="5"/><path d="M11 17 C 9 11, 7 9, 5 9"/><path d="M21 17 C 23 11, 25 9, 27 9"/>',
  Gemini: '<path d="M10 6 V26"/><path d="M22 6 V26"/><path d="M8 6 H24"/><path d="M8 26 H24"/>',
  Cancer: '<path d="M6 13 C 6 9, 12 7, 14 11"/><circle cx="11" cy="13" r="2.5"/><path d="M26 19 C 26 23, 20 25, 18 21"/><circle cx="21" cy="19" r="2.5"/>',
  Leo: '<circle cx="11" cy="20" r="4"/><path d="M14.5 19 C 16 12, 22 8, 26 12 C 28 16, 24 20, 22 18"/>',
  Virgo: '<path d="M5 26 V12 C 5 9, 9 9, 9 12 V26"/><path d="M9 12 C 9 9, 13 9, 13 12 V26"/><path d="M13 12 C 13 9, 17 9, 17 12 V22 C 17 27, 22 28, 24 24 C 26 20, 22 17, 19 19"/>',
  Libra: '<path d="M5 24 H27"/><path d="M7 20 H25"/><path d="M10 20 C 10 14, 22 14, 22 20"/><path d="M16 14 V11"/>',
  Scorpio: '<path d="M5 26 V12 C 5 9, 9 9, 9 12 V26"/><path d="M9 12 C 9 9, 13 9, 13 12 V26"/><path d="M13 12 C 13 9, 17 9, 17 12 V26 L 24 22"/><path d="M22 19 L 27 22 L 24 26"/>',
  Sagittarius: '<path d="M6 26 L 26 6"/><path d="M26 6 L 18 8"/><path d="M26 6 L 24 14"/><path d="M12 14 L 18 20"/>',
  Capricorn: '<path d="M5 8 L 9 8 L 13 22 L 17 8"/><path d="M17 8 C 22 8, 26 12, 26 17 C 26 22, 22 25, 18 23 C 15 21, 16 17, 19 17 C 22 17, 22 21, 19 21"/>',
  Aquarius: '<path d="M4 12 L 9 9 L 14 12 L 19 9 L 24 12 L 28 9"/><path d="M4 19 L 9 16 L 14 19 L 19 16 L 24 19 L 28 16"/>',
  Pisces: '<path d="M6 6 C 10 12, 10 20, 6 26"/><path d="M26 6 C 22 12, 22 20, 26 26"/><path d="M8 16 H24"/>',
  Sun: '<circle cx="16" cy="16" r="9"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/>',
  Moon: '<path d="M22 6 C 14 8, 10 14, 10 18 C 10 24, 16 28, 22 26 C 16 24, 13 20, 13 16 C 13 12, 16 8, 22 6 Z"/>',
  Mercury: '<path d="M11 4 C 11 8, 21 8, 21 4"/><circle cx="16" cy="13" r="4.5"/><path d="M16 17.5 V25"/><path d="M12 22 H20"/>',
  Venus: '<circle cx="16" cy="12" r="5"/><path d="M16 17 V27"/><path d="M12 23 H20"/>',
  Mars: '<circle cx="14" cy="18" r="6"/><path d="M18 14 L 26 6"/><path d="M20 6 H26 V12"/>',
  Jupiter: '<path d="M8 8 V8 C 8 6, 12 6, 12 8 V20 C 12 24, 16 24, 18 22"/><path d="M6 14 H22"/>',
  Saturn: '<path d="M10 6 H18"/><path d="M14 6 V22 C 14 26, 18 26, 20 24 C 22 22, 22 18, 18 18"/>',
  Uranus: '<path d="M8 6 V14"/><path d="M24 6 V14"/><path d="M8 14 H24"/><path d="M16 14 V22"/><circle cx="16" cy="25" r="2.5"/>',
  Neptune: '<path d="M6 8 C 6 16, 10 22, 16 22 C 22 22, 26 16, 26 8"/><path d="M16 6 V26"/><path d="M10 24 H22"/>',
  Pluto: '<path d="M10 26 V8"/><path d="M10 8 C 16 8, 20 10, 20 14 C 20 18, 16 20, 10 20"/><circle cx="14" cy="14" r="2.5"/>',
  NorthNode: '<path d="M9 24 V16 C 9 10, 23 10, 23 16 V24"/><circle cx="9" cy="26" r="1.8" fill="currentColor"/><circle cx="23" cy="26" r="1.8" fill="currentColor"/>',
  Chiron: '<path d="M10 6 V22"/><path d="M10 14 L 18 8"/><circle cx="20" cy="22" r="5"/>',
  Ascendant: '<path d="M5 24 L 10 8 L 15 24"/><path d="M7 19 H13"/><path d="M27 11 C 24 9, 19 10, 19 16 C 19 22, 24 23, 27 21"/>',
};

const SIGN_NAMES_W = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ASPECT_COLORS_W: Record<string, string> = {
  Conjunction: '#B8924C', Sextile: '#7FD1C7', Trine: '#6FB6FF',
  Square: '#FF6B6B', Opposition: '#D86BFF', Quincunx: '#FFD166',
};

function sigil(name: string, cx: number, cy: number, size: number, color: string, sw = 1.2): string {
  const paths = SIGIL_PATHS[name];
  if (!paths) return '';
  const scale = size / 32;
  const tx = cx - size / 2;
  const ty = cy - size / 2;
  return `<g transform="translate(${tx} ${ty}) scale(${scale})" fill="none" stroke="${color}" stroke-width="${sw / scale}" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`;
}

function buildWheelSVG(chart: ChartData, qm: QuantumMelodicReading | null): string {
  const cx = 300, cy = 300;
  const ringInner = 218, ringOuter = 255, ringMid = (ringInner + ringOuter) / 2;
  const baseGlyphR = 195;
  const ascDeg = chart.planets.find(p => p.name === 'Ascendant')?.degree ?? 0;
  const toRad = (eDeg: number) => ((180 + ((eDeg - ascDeg) + 360) % 360) * Math.PI) / 180;

  let svg = '';
  // Concentric rings
  svg += `<circle cx="${cx}" cy="${cy}" r="290" fill="none" stroke="#1A1918" stroke-width="1"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="255" fill="none" stroke="#1A1918" stroke-width="0.5" opacity="0.55"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="218" fill="none" stroke="#1A1918" stroke-width="0.7"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="160" fill="none" stroke="#B8924C" stroke-width="0.5"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="#1A1918" stroke-width="0.4" opacity="0.5"/>`;

  // Sign sectors
  for (let i = 0; i < 12; i++) {
    const sn = SIGN_NAMES_W[i];
    const startRad = toRad(i * 30);
    const midRad = toRad(i * 30 + 15);
    svg += `<line x1="${cx + ringInner * Math.cos(startRad)}" y1="${cy - ringInner * Math.sin(startRad)}" x2="${cx + ringOuter * Math.cos(startRad)}" y2="${cy - ringOuter * Math.sin(startRad)}" stroke="#1A1918" stroke-width="0.4" opacity="0.5"/>`;
    svg += sigil(sn, cx + ringMid * Math.cos(midRad), cy - ringMid * Math.sin(midRad), 24, '#1A1918', 1.2);
  }

  // Aspect lines
  if (qm) {
    qm.aspects.forEach(a => {
      const p1 = chart.planets.find(p => p.name === a.planet1);
      const p2 = chart.planets.find(p => p.name === a.planet2);
      if (!p1 || !p2) return;
      const r1 = toRad(p1.degree), r2 = toRad(p2.degree);
      const color = ASPECT_COLORS_W[a.aspectType.name] || '#9AA0A6';
      svg += `<line x1="${cx + 155 * Math.cos(r1)}" y1="${cy - 155 * Math.sin(r1)}" x2="${cx + 155 * Math.cos(r2)}" y2="${cy - 155 * Math.sin(r2)}" stroke="${color}" stroke-width="1" opacity="0.6"><title>${a.planet1} ${a.aspectType.name} ${a.planet2} (${a.aspectType.harmonic_interval})</title></line>`;
    });
  }

  // Collision-aware planet placement
  const ordered = [...chart.planets].sort((a, b) => a.degree - b.degree);
  const placements: Array<{ name: string; degree: number; glyphR: number; rx: boolean }> = [];
  ordered.forEach(p => {
    let glyphR = baseGlyphR; let safe = false; let guard = 0;
    while (!safe && guard < 6) {
      safe = true;
      for (const pl of placements) {
        let diff = Math.abs(pl.degree - p.degree);
        if (diff > 180) diff = 360 - diff;
        if (diff < 7 && Math.abs(pl.glyphR - glyphR) < 18) { glyphR -= 22; safe = false; break; }
      }
      guard++;
    }
    placements.push({ name: p.name, degree: p.degree, glyphR, rx: p.isRetrograde });
  });

  placements.forEach(p => {
    const rad = toRad(p.degree);
    const tickIn = { x: cx + (ringInner - 10) * Math.cos(rad), y: cy - (ringInner - 10) * Math.sin(rad) };
    const tickOut = { x: cx + ringInner * Math.cos(rad), y: cy - ringInner * Math.sin(rad) };
    const gx = cx + p.glyphR * Math.cos(rad), gy = cy - p.glyphR * Math.sin(rad);
    svg += `<line x1="${tickIn.x}" y1="${tickIn.y}" x2="${tickOut.x}" y2="${tickOut.y}" stroke="#1A1918" stroke-width="0.8"/>`;
    svg += `<line x1="${tickOut.x}" y1="${tickOut.y}" x2="${gx}" y2="${gy}" stroke="#1A1918" stroke-width="0.4" opacity="0.5"/>`;
    svg += `<circle cx="${gx}" cy="${gy}" r="14" fill="#F9F7F4" stroke="#1A1918" stroke-width="0.6"/>`;
    if (SIGIL_PATHS[p.name]) {
      svg += sigil(p.name, gx, gy, 18, '#1A1918', 1.2);
    } else {
      svg += `<text x="${gx}" y="${gy}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#1A1918" font-family="Jost,sans-serif">${p.name.slice(0,3).toUpperCase()}</text>`;
    }
    if (p.rx) svg += `<text x="${gx + 14}" y="${gy + 14}" font-size="9" fill="#B8924C">℞</text>`;
  });

  return `<svg viewBox="0 0 600 600" width="100%" style="max-width:560px;display:block;margin:0 auto;background:#F9F7F4;border-radius:8px;padding:12px;box-sizing:border-box">${svg}</svg>`;
}


interface HarmonicAnalysis {
  consonance: number;
  tension: number;
  complexity: number;
  elements: Record<string, number>;
}

interface ChartInterpretation {
  opening: string;
  coreSignature: string;
  harmonicAlignment: string;
  resolutionGuidance: string;
  closing: string;
}

export function buildSymphonyHTML(
  name: string,
  reading: CosmicReading,
  qmReading: QuantumMelodicReading | null,
  harmonicAnalysis: HarmonicAnalysis | null,
  guidance: string[],
  interpretation?: ChartInterpretation | null,
): string {
  const planets = reading.chartData.planets;
  const sunSign = reading.chartData.sunSign;
  const moonSign = reading.chartData.moonSign;
  const ascendant = reading.chartData.ascendant;
  const mode = reading.musicalMode;

  const wheelSVG = buildWheelSVG(reading.chartData, qmReading);

  const degreeFmt = (deg: number) => {
    const d = Math.floor(deg % 30);
    const m = Math.round((deg % 1) * 60);
    return `${d}°${m.toString().padStart(2, '0')}′`;
  };

  const planetRows = planets.map(p => {
    const qp = qmReading?.planets.find(pp => pp.position.name === p.name);
    const house = qp?.houseNumber;
    const hw = house ? houseWisdom[house] : null;
    return `
      <tr>
        <td class="planet-symbol">${p.symbol}</td>
        <td><strong>${p.name}</strong>${p.isRetrograde ? ' <span class="rx">Rx</span>' : ''}
          ${qp?.qmData?.instrument ? `<br><span class="dim">${qp.qmData.instrument}</span>` : ''}
        </td>
        <td>${p.sign} ${degreeFmt(p.degree)}</td>
        <td>${house ? `House ${house}${hw ? ` · ${hw.area}` : ''}` : '—'}</td>
        <td class="dim italic">${qp?.qmData?.sonic_character || ''}</td>
      </tr>`;
  }).join('');

  const aspectRows = (qmReading?.aspects || []).map(a => {
    const md = aspectMusicalData[a.aspectType.name];
    return `
      <tr>
        <td style="color:${a.aspectType.color}">${a.aspectType.symbol}</td>
        <td>${a.planet1} ${a.aspectType.name} ${a.planet2}</td>
        <td>${a.aspectType.harmonic_interval}</td>
        <td>${a.aspectType.consonance}</td>
        <td>${a.orb.toFixed(1)}°</td>
      </tr>`;
  }).join('');

  const elementBars = harmonicAnalysis ? Object.entries(harmonicAnalysis.elements).map(([el, count]) => {
    const total = Object.values(harmonicAnalysis.elements).reduce((a, b) => a + b, 0);
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    const info = elementInfo[el];
    return `<div class="el-bar"><span class="el-label">${info?.symbol || ''} ${el}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><span class="el-pct">${pct}%</span></div>`;
  }).join('') : '';

  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const proseHTML = (text: string) =>
    text.split(/\n{2,}|(?<=\.)\s+(?=[A-Z])/).slice(0, 6)
      .map(p => `<p>${escape(p.trim())}</p>`).join('');

  const interpOpening = interpretation
    ? `<div class="section"><h2>Overture</h2><div class="prose">${proseHTML(interpretation.opening)}</div></div>` : '';
  const interpCore = interpretation
    ? `<div class="section"><h2>Core Signature — Sun · Moon · Rising</h2><div class="prose">${proseHTML(interpretation.coreSignature)}</div></div>` : '';
  const interpAlignment = interpretation
    ? `<div class="prose">${proseHTML(interpretation.harmonicAlignment)}</div>` : '';
  const interpResolution = interpretation
    ? `<div class="guidance"><h3>Resolution Guidance</h3><div class="prose">${proseHTML(interpretation.resolutionGuidance)}</div></div>`
    : (guidance.length > 0
      ? `<div class="guidance"><h3>Resolution Guidance</h3>${guidance.map(g => `<p>• ${escape(g)}</p>`).join('')}</div>`
      : '');
  const interpClosing = interpretation
    ? `<div class="closing">${escape(interpretation.closing)}</div>`
    : `<div class="closing">Every chart is a score waiting to be heard.<br>Yours has been playing since the moment you arrived.</div>`;


  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${name}'s Symphony Report — MOONtuner × QuantumMelodic</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a0a0a;color:#e0e0e0;font-family:'DM Sans',sans-serif;font-size:15px;line-height:1.7;padding:0}
  .container{max-width:820px;margin:0 auto;padding:48px 24px}
  h1{font-family:'Playfair Display',serif;font-weight:400;font-size:2.8rem;line-height:1.1;color:#fff;margin-bottom:8px}
  h1 em{font-style:italic;font-weight:400}
  h2{font-family:'DM Sans',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#4ECDC4;margin-bottom:24px;font-weight:500}
  h3{font-family:'Playfair Display',serif;font-size:1.3rem;font-style:italic;color:#fff;margin-bottom:16px}
  .meta{display:flex;flex-wrap:wrap;gap:24px;margin:24px 0 48px;font-size:13px;color:#888}
  .meta span{color:#fff;margin-left:6px}
  .section{border-top:1px solid #1a1a1a;padding:40px 0}
  .sig-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#1a1a1a;border-radius:8px;overflow:hidden}
  .sig-cell{background:#111;padding:24px;text-align:center}
  .sig-cell .val{font-family:'Playfair Display',serif;font-size:1.6rem;color:#fff}
  .sig-cell .lbl{font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#4ECDC4;margin-bottom:8px}
  table{width:100%;border-collapse:collapse}
  th{font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#4ECDC4;text-align:left;padding:8px 12px;border-bottom:1px solid #1a1a1a}
  td{padding:10px 12px;border-bottom:1px solid #111;font-size:14px;vertical-align:top}
  .planet-symbol{font-size:18px;width:32px;color:#888}
  .rx{color:#4ECDC4;font-size:10px;font-weight:700;letter-spacing:0.1em}
  .dim{color:#666;font-size:12px}
  .italic{font-style:italic}
  .meter{margin-bottom:20px}
  .meter-head{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}
  .meter-head .v{color:#4ECDC4;font-family:monospace}
  .meter-track{width:100%;height:2px;background:#1a1a1a;border-radius:1px;overflow:hidden}
  .meter-fill{height:100%;background:#4ECDC4;transition:width 1s}
  .meter-desc{font-size:12px;color:#666;margin-top:4px}
  .el-bar{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .el-label{width:80px;font-size:13px;color:#888}
  .bar-track{flex:1;height:2px;background:#1a1a1a;border-radius:1px;overflow:hidden}
  .bar-fill{height:100%;background:#4ECDC4}
  .el-pct{font-size:12px;color:#4ECDC4;font-family:monospace;width:36px;text-align:right}
  .guidance{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:24px;margin-top:32px}
  .prose p{font-size:14px;color:#d0d0d0;margin-bottom:14px;line-height:1.75}
  .prose p:last-child{margin-bottom:0}
  .guidance p{font-size:13px;color:#ccc;margin-bottom:8px;padding-left:12px}
  .closing{text-align:center;padding:64px 24px;font-family:'Playfair Display',serif;font-style:italic;color:#888;font-size:1.1rem;line-height:1.8}
  .brand{text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#333;padding-bottom:48px}
  @media print{
    body{background:#fff !important;color:#111 !important}
    .container{padding:24px}
    h1{color:#111 !important}
    h3{color:#111 !important}
    .sig-cell{background:#f5f5f5 !important}
    .sig-cell .val{color:#111 !important}
    .section{border-color:#ddd !important}
    td,th{border-color:#ddd !important}
    .dim{color:#888 !important}
    .meter-track,.bar-track{background:#ddd !important}
    .guidance{background:#f8f8f8 !important;border-color:#ddd !important}
    .guidance p{color:#333 !important}
    .prose p{color:#222 !important}
    .closing{color:#666 !important}
  }
</style>
</head>
<body>
<div class="container">

  <h2>Symphony Report</h2>
  <h1>${name}'s<br><em>Sonic Natal Architecture</em></h1>
  <div class="meta">
    <div>Sun<span>${sunSign}</span></div>
    <div>Moon<span>${moonSign}</span></div>
    <div>Rising<span>${ascendant}</span></div>
    <div>Mode<span>${mode}</span></div>
  </div>

  ${interpOpening}

  ${qmReading ? `
  <div class="section">
    <h2>Harmonic Signature</h2>
    <div class="sig-grid">
      <div class="sig-cell"><div class="lbl">Key</div><div class="val">${qmReading.overallKey}</div></div>
      <div class="sig-cell"><div class="lbl">Tempo</div><div class="val">${qmReading.overallTempo} <small style="font-size:12px;color:#888">BPM</small></div></div>
      <div class="sig-cell"><div class="lbl">Element</div><div class="val">${qmReading.dominantElement}</div></div>
      <div class="sig-cell"><div class="lbl">Modality</div><div class="val">${qmReading.dominantModality}</div></div>
    </div>
  </div>` : ''}

  ${interpCore}

  ${harmonicAnalysis ? `
  <div class="section">
    <h2>Harmonic Alignment</h2>
    ${interpAlignment}
    <div style="margin-top:24px">
    ${['Consonance', 'Tension', 'Complexity'].map(label => {
      const key = label.toLowerCase() as keyof HarmonicAnalysis;
      const val = harmonicAnalysis[key] as number;
      const descs: Record<string, string> = {
        Consonance: 'Harmonic flow and natural ease',
        Tension: 'Creative friction and evolutionary pressure',
        Complexity: 'Richness and orchestral density',
      };
      return `<div class="meter"><div class="meter-head"><span>${label}</span><span class="v">${Math.round(val)}%</span></div><div class="meter-track"><div class="meter-fill" style="width:${val}%"></div></div><div class="meter-desc">${descs[label]}</div></div>`;
    }).join('')}
    </div>
    ${interpResolution}
  </div>` : ''}

  <div class="section">
    <h2>Planetary Positions</h2>
    <table>
      <thead><tr><th></th><th>Planet</th><th>Position</th><th>House</th><th>Sonic Character</th></tr></thead>
      <tbody>${planetRows}</tbody>
    </table>
  </div>

  ${(qmReading?.aspects?.length ?? 0) > 0 ? `
  <div class="section">
    <h2>Aspects — Harmonic Intervals</h2>
    <table>
      <thead><tr><th></th><th>Aspect</th><th>Interval</th><th>Quality</th><th>Orb</th></tr></thead>
      <tbody>${aspectRows}</tbody>
    </table>
  </div>` : ''}

  ${harmonicAnalysis ? `
  <div class="section">
    <h2>Elemental Balance</h2>
    ${elementBars}
  </div>` : ''}

  ${interpClosing}
  <div class="brand">MOONtuner × QuantumMelodic</div>

</div>
</body>
</html>`;
}
