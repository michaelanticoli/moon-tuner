import type { CosmicReading } from '@/types/astrology';
import type { QuantumMelodicReading } from '@/types/quantumMelodic';
import { elementInfo, aspectMusicalData, houseWisdom } from '@/utils/harmonicWisdom';

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

  ${harmonicAnalysis ? `
  <div class="section">
    <h2>Harmonic Analysis</h2>
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
    ${guidanceHTML}
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

  <div class="closing">
    Every chart is a score waiting to be heard.<br>Yours has been playing since the moment you arrived.
  </div>
  <div class="brand">MOONtuner × QuantumMelodic</div>

</div>
</body>
</html>`;
}
