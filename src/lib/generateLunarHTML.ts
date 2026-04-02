import type { LunarReport } from '@/lib/lunarReportEngine';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function getMoonSVG(phase: string): string {
  const key = phase.toLowerCase().replace(/\s+/g, '-');
  const svgs: Record<string, string> = {
    'new-moon': `<circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`,
    'waxing-crescent': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><circle cx="62" cy="50" r="34" fill="#0a0a0a"/>`,
    'first-quarter': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><rect x="50" y="12" width="38" height="76" fill="#0a0a0a"/>`,
    'waxing-gibbous': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><ellipse cx="38" cy="50" rx="12" ry="38" fill="#0a0a0a"/>`,
    'full-moon': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/>`,
    'waning-gibbous': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><ellipse cx="62" cy="50" rx="12" ry="38" fill="#0a0a0a"/>`,
    'last-quarter': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><rect x="12" y="12" width="38" height="76" fill="#0a0a0a"/>`,
    'waning-crescent': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><circle cx="38" cy="50" r="34" fill="#0a0a0a"/>`,
  };
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${svgs[key] || svgs['new-moon']}</svg>`;
}

export function openLunarHTMLReport(report: LunarReport): void {
  const { natal, powerDays, arcPractice, peakSummary, closing, meta } = report;

  const arcCardsHTML = powerDays.map((day, i) => `
    <div class="arc-card${day.isPeak ? ' peak' : ''}" style="animation-delay: ${i * 0.08}s">
      <div class="arc-card-header">
        <div>
          <span class="arc-month">${day.monthFull}</span>
          <span class="arc-day">Day ${day.day}, ${day.year}</span>
        </div>
        <span class="arc-intensity">${day.power}%</span>
      </div>
      ${day.eclipse ? '<div class="eclipse-badge">ECLIPSE WINDOW</div>' : ''}
      <div class="arc-focus">${day.keyword}</div>
      <p class="arc-desc">${escapeHtml(day.description)}</p>
      <div class="arc-bar"><div class="arc-bar-fill" style="width:${day.power}%"></div></div>
    </div>
  `).join('');

  const keywordsHTML = natal.navTabs.map(k => `<span class="keyword">${k}</span>`).join('');

  const peakHTML = peakSummary.peakLines.map((line, i) => `
    <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem">
      <span style="width:24px;height:24px;border-radius:50%;background:rgba(201,169,110,0.15);color:#c9a96e;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700">${i + 1}</span>
      <span style="font-size:0.9rem">${escapeHtml(line)}</span>
    </div>
  `).join('');

  const practiceHTML = arcPractice ? `
    <div class="practices reveal">
      <div class="practice">
        <h4>${arcPractice.panelA.title}</h4>
        ${arcPractice.panelA.before ? `<p><strong style="color:#c9a96e;font-size:0.7rem;letter-spacing:0.3em">BEFORE</strong><br>${escapeHtml(arcPractice.panelA.before)}</p>` : ''}
        ${arcPractice.panelA.during ? `<p style="margin-top:1rem"><strong style="color:#c9a96e;font-size:0.7rem;letter-spacing:0.3em">DURING</strong><br>${escapeHtml(arcPractice.panelA.during)}</p>` : ''}
        ${arcPractice.panelA.after ? `<p style="margin-top:1rem"><strong style="color:#c9a96e;font-size:0.7rem;letter-spacing:0.3em">AFTER</strong><br>${escapeHtml(arcPractice.panelA.after)}</p>` : ''}
      </div>
      <div class="practice">
        <h4>${arcPractice.panelB.title}</h4>
        <p>${escapeHtml(arcPractice.panelB.body || '')}</p>
      </div>
      <div class="practice">
        <h4>${arcPractice.panelC.title}</h4>
        <p>${escapeHtml(arcPractice.panelC.body || '')}</p>
      </div>
      <div class="practice" style="border-color:rgba(201,169,110,0.2)">
        <h4>${arcPractice.panelD.title}</h4>
        ${arcPractice.panelD.subtitle ? `<p style="color:#c9a96e;font-style:italic;margin-bottom:0.8rem">${escapeHtml(arcPractice.panelD.subtitle)}</p>` : ''}
        <p>${escapeHtml(arcPractice.panelD.body || '')}</p>
      </div>
    </div>
  ` : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MOONtuner — Lunar Arc Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;font-size:16px}
  body{background:#060608;color:#e8e4dc;font-family:'DM Sans',system-ui,sans-serif;font-weight:300;line-height:1.7;overflow-x:hidden}
  .container{max-width:960px;margin:0 auto;padding:0 2rem}
  .label{font-size:0.6rem;letter-spacing:0.45em;text-transform:uppercase;color:#8a8070;font-weight:700}
  .serif{font-family:'Playfair Display',Georgia,serif}
  .gold{color:#c9a96e}
  .muted{color:#8a8070}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(201,169,110,0.25),transparent);margin:3rem 0}
  .cover{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
  .cover::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 40%,rgba(201,169,110,0.06),transparent 70%)}
  .cover-brand{font-size:0.7rem;letter-spacing:1em;text-transform:uppercase;color:#c9a96e;margin-bottom:3rem;position:relative}
  .cover-moon{width:160px;height:160px;margin:0 auto 3rem;position:relative;opacity:0;animation:fadeUp 1.2s 0.3s forwards}
  .cover h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:400;line-height:1.1;margin-bottom:1rem;opacity:0;animation:fadeUp 1s 0.5s forwards}
  .cover h1 em{font-style:italic;color:#c9a96e}
  .cover-meta{opacity:0;animation:fadeUp 1s 0.8s forwards}
  .cover-meta p{margin:0.3rem 0}
  .cover-scroll{position:absolute;bottom:2rem;font-size:0.6rem;letter-spacing:0.5em;text-transform:uppercase;color:#5a5548;opacity:0;animation:fadeUp 1s 1.2s forwards}
  .cover-scroll::after{content:'';display:block;width:1px;height:40px;background:linear-gradient(#5a5548,transparent);margin:0.8rem auto 0}
  section{padding:6rem 0}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;margin-bottom:0.5rem}
  .section-subtitle{color:#8a8070;font-size:0.95rem;max-width:640px;margin-bottom:3rem}
  .sig-grid{display:grid;grid-template-columns:1fr 2fr;gap:2rem;margin-bottom:3rem}
  @media(max-width:768px){.sig-grid{grid-template-columns:1fr}}
  .sig-moon-card{background:rgba(255,255,255,0.02);border:1px solid rgba(201,169,110,0.12);border-radius:1.5rem;padding:3rem 2rem;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .sig-moon-icon{width:100px;height:100px;margin-bottom:1.5rem}
  .sig-archetype{font-family:'Playfair Display',serif;font-size:1.8rem;margin-top:0.5rem}
  .sig-degree{color:#c9a96e;font-size:0.85rem;margin-top:0.3rem}
  .sig-subtitle{color:#8a8070;font-style:italic;font-size:0.85rem;margin-top:0.5rem}
  .sig-details{display:flex;flex-direction:column;gap:1.5rem}
  .sig-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.2rem;padding:1.8rem 2rem}
  .sig-card h4{font-family:'Playfair Display',serif;font-size:1.4rem;margin-top:0.4rem}
  .sig-card p{color:#b0a898;margin-top:0.5rem;font-size:0.92rem}
  .stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
  .stat-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1rem;padding:1.5rem}
  .stat-card .value{font-family:'Playfair Display',serif;font-size:1.1rem;margin-top:0.3rem}
  .keywords{display:flex;flex-wrap:wrap;gap:0.5rem;margin:2rem 0}
  .keyword{padding:0.4rem 1rem;font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;color:#c9a96e;border:1px solid rgba(201,169,110,0.2);border-radius:100px;background:rgba(201,169,110,0.04)}
  .interpretation{background:rgba(201,169,110,0.04);border-left:2px solid rgba(201,169,110,0.3);border-radius:0 1rem 1rem 0;padding:2rem 2.5rem;font-size:0.95rem;line-height:1.9;color:#c8c0b4;margin:1.5rem 0}
  .arc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.2rem}
  .arc-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.2rem;padding:1.5rem;opacity:0;animation:fadeUp 0.6s forwards;transition:border-color 0.3s}
  .arc-card:hover{border-color:rgba(201,169,110,0.3)}
  .arc-card.peak{border-color:rgba(201,169,110,0.4);box-shadow:0 0 20px rgba(201,169,110,0.08)}
  .arc-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem}
  .arc-month{font-family:'Playfair Display',serif;font-size:1.4rem;display:block}
  .arc-day{font-size:0.8rem;color:#8a8070}
  .arc-intensity{font-size:0.85rem;color:#c9a96e;font-weight:700;font-family:'Playfair Display',serif}
  .arc-focus{font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;margin-bottom:0.5rem;color:#c9a96e}
  .arc-desc{font-size:0.8rem;color:#8a8070;margin-bottom:1rem;line-height:1.7}
  .arc-desc strong{color:#e8e4dc}
  .arc-bar{height:3px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden}
  .arc-bar-fill{height:100%;background:linear-gradient(90deg,#c9a96e,#e0c78a);border-radius:4px;transition:width 1s ease}
  .eclipse-badge{font-size:0.55rem;letter-spacing:0.25em;color:#e8a87c;background:rgba(232,168,124,0.1);padding:0.2rem 0.6rem;border-radius:4px;display:inline-block;margin-bottom:0.5rem;font-weight:700}
  .peak-summary{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:2rem 0 3rem}
  @media(max-width:768px){.peak-summary{grid-template-columns:1fr}}
  .peak-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.2rem;padding:2rem}
  .practices{display:grid;gap:2rem;margin-top:2rem}
  .practice{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.2rem;padding:2rem}
  .practice h4{font-family:'Playfair Display',serif;font-size:1.15rem;margin-bottom:0.6rem}
  .practice p{color:#b0a898;font-size:0.9rem;line-height:1.8}
  .closing{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}
  .closing::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 60%,rgba(201,169,110,0.05),transparent 70%)}
  .closing h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3rem);font-weight:400;margin-bottom:1.5rem;position:relative}
  .closing h2 em{font-style:italic;color:#c9a96e}
  .closing p{max-width:560px;color:#8a8070;font-size:0.92rem;line-height:1.8;position:relative}
  .closing-footer{margin-top:4rem;font-size:0.65rem;letter-spacing:0.4em;text-transform:uppercase;color:#4a4540;position:relative}
  .nav-dots{position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:0.8rem;z-index:100}
  .nav-dot{width:8px;height:8px;border-radius:50%;border:1px solid rgba(201,169,110,0.3);background:transparent;cursor:pointer;transition:all 0.3s}
  .nav-dot:hover,.nav-dot.active{background:#c9a96e;border-color:#c9a96e}
  @media(max-width:768px){.nav-dots{display:none}}
  .print-btn{position:fixed;bottom:2rem;right:2rem;z-index:100;background:rgba(201,169,110,0.15);border:1px solid rgba(201,169,110,0.3);color:#c9a96e;padding:0.6rem 1.5rem;border-radius:100px;font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;cursor:pointer;transition:all 0.3s;backdrop-filter:blur(10px);font-family:'DM Sans',sans-serif}
  .print-btn:hover{background:rgba(201,169,110,0.25)}
  @media print{
    .print-btn,.nav-dots{display:none!important}
    body{background:#fff!important;color:#1a1a1a!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .cover{min-height:auto;padding:4rem 0;background:#f5f3ef!important}
    .cover::before{display:none}
    section{padding:3rem 0}
    .cover-brand{color:#8b7340!important}
    .cover h1{color:#1a1a1a!important}
    .cover h1 em{color:#8b7340!important}
    .cover-meta p{color:#1a1a1a!important}
    .section-title{color:#1a1a1a!important}
    .section-subtitle{color:#555!important}
    .sig-card,.stat-card,.arc-card,.practice,.interpretation,.peak-card,.sig-moon-card{border-color:#ddd!important;background:#fafafa!important}
    .sig-card h4,.sig-archetype,.stat-card .value{color:#1a1a1a!important}
    .label,.muted,.arc-day,.arc-desc,.cover-scroll,.sig-subtitle,.sig-degree,.closing p,.closing-footer,.closing-footer p{color:#555!important}
    .gold,.arc-intensity,.keyword,.arc-focus,.eclipse-badge{color:#8b7340!important}
    .keyword{border-color:#ccc!important;background:#f0ede6!important}
    .arc-bar{background:#eee!important}
    .arc-bar-fill{background:#8b7340!important}
    .interpretation{border-left-color:#8b7340!important;background:#f5f3ef!important;color:#333!important}
    .arc-card{opacity:1!important;transform:none!important}
    .arc-month{color:#1a1a1a!important}
    .practice h4{color:#1a1a1a!important}
    .practice p{color:#444!important}
    .peak-card{color:#1a1a1a!important}
    .peak-card span{color:#1a1a1a!important}
    .closing{background:#f5f3ef!important}
    .closing::before{display:none}
    .closing h2{color:#1a1a1a!important}
    .closing h2 em{color:#8b7340!important}
    .reveal{opacity:1!important;transform:none!important}
    .sig-moon-icon svg circle[fill="rgba(255,255,255,0.85)"]{fill:#1a1a1a!important}
    .cover-moon svg circle[fill="rgba(255,255,255,0.85)"]{fill:#1a1a1a!important}
  }
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .reveal{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)}
  .reveal.visible{opacity:1;transform:none}
</style>
</head>
<body>

<nav class="nav-dots" id="navDots">
  <button class="nav-dot active" data-target="cover" title="Cover"></button>
  <button class="nav-dot" data-target="signature" title="Natal Signature"></button>
  <button class="nav-dot" data-target="peaks" title="Peak Windows"></button>
  <button class="nav-dot" data-target="arc" title="12-Month Arc"></button>
  <button class="nav-dot" data-target="practices" title="Arc Practice"></button>
  <button class="nav-dot" data-target="closing" title="Closing"></button>
</nav>

<button class="print-btn" onclick="window.print()">⎙ Print / Save PDF</button>

<section class="cover" id="cover">
  <span class="cover-brand">MOONtuner</span>
  <div class="cover-moon">${getMoonSVG(natal.phase)}</div>
  <h1>Personal Lunar<br><em>Arc Report</em></h1>
  <div class="cover-meta">
    <p class="label" style="margin-bottom:1rem">Generated For</p>
    <p style="font-size:1.1rem">${meta.birthDate} at ${meta.birthTime}</p>
    ${meta.location ? `<p class="muted" style="font-size:0.9rem">${escapeHtml(meta.location)}</p>` : ''}
    <div class="divider" style="width:60px;margin:1.5rem auto"></div>
    <p class="label">Natal Lunar Signature</p>
    <p class="serif" style="font-size:1.6rem;margin-top:0.3rem">${natal.phase}</p>
    <p class="gold" style="font-size:0.85rem">${natal.angle}°</p>
  </div>
  <div class="cover-scroll">Scroll to Begin</div>
</section>

<section id="signature">
  <div class="container">
    <div class="reveal">
      <span class="label">Section One</span>
      <h2 class="section-title">Your Natal Lunar Signature</h2>
      <p class="section-subtitle">${escapeHtml(natal.subtitle)}</p>
    </div>
    <div class="sig-grid reveal">
      <div class="sig-moon-card">
        <div class="sig-moon-icon">${getMoonSVG(natal.phase)}</div>
        <span class="label">Archetype</span>
        <div class="sig-archetype">${natal.archetype}</div>
        <div class="sig-degree">${natal.angle}°</div>
      </div>
      <div class="sig-details">
        <div class="sig-card">
          <span class="label">Thematic Title</span>
          <h4><em>"${escapeHtml(natal.title)}"</em></h4>
        </div>
        <div class="stat-row">
          <div class="stat-card"><span class="label">Element</span><div class="value">${natal.element}</div></div>
          <div class="stat-card"><span class="label">Modality</span><div class="value">${natal.modality}</div></div>
        </div>
      </div>
    </div>
    <div class="stat-row reveal">
      <div class="stat-card"><span class="label">Somatic Zone</span><div class="value">${natal.somaticZone}</div></div>
      <div class="stat-card"><span class="label">Solfeggio Frequency</span><div class="value">${natal.solfeggio} — ${natal.solfeggioMeaning}</div></div>
      <div class="stat-card"><span class="label">Lifelong Instruction</span><div class="value">${natal.instruction}</div></div>
    </div>
    <div class="keywords reveal">${keywordsHTML}</div>
    <div class="divider"></div>
    <div class="reveal">
      <span class="label">What This Means For You</span>
      <div class="interpretation">${natal.whatThisMeans.split('\n\n').map(p => `<p style="margin-bottom:1rem">${escapeHtml(p)}</p>`).join('')}</div>
    </div>
  </div>
</section>

<section id="peaks">
  <div class="container">
    <div class="reveal">
      <span class="label">Peak Windows</span>
      <h2 class="section-title">Your Three Strongest Months</h2>
    </div>
    <div class="peak-summary reveal">
      <div class="peak-card">
        <span class="label gold">Peak Power Days</span>
        <div style="margin-top:1.2rem">${peakHTML}</div>
      </div>
      <div class="peak-card">
        <span class="label">Softest Window</span>
        <p style="margin-top:1.2rem;font-size:0.9rem">${escapeHtml(peakSummary.softestLine)}</p>
        <p style="margin-top:1rem;font-size:0.8rem;color:#8a8070">Not every return is for maximum output. The softest month is an invitation to pull back and let the cycle do its work.</p>
      </div>
    </div>
  </div>
</section>

<section id="arc">
  <div class="container">
    <div class="reveal">
      <span class="label">Section Two</span>
      <h2 class="section-title">Your 12-Month Lunar Arc</h2>
      <p class="section-subtitle">Each month, the Moon returns to your natal phase position. Power scores account for eclipse proximity, lunar velocity, and lunation alignment.</p>
    </div>
    <div class="arc-grid">${arcCardsHTML}</div>
  </div>
</section>

<section id="practices">
  <div class="container">
    <div class="reveal">
      <span class="label">Section Three</span>
      <h2 class="section-title">Arc Practice</h2>
      <p class="section-subtitle">How to work with your power days — before, during, and after each return.</p>
    </div>
    ${practiceHTML}
  </div>
</section>

<section class="closing" id="closing">
  <h2>${closing.headline1}<br><em>${closing.headline2}</em></h2>
  <p>${escapeHtml(closing.body)}</p>
  <div class="closing-footer">
    <p>moontuner.xyz</p>
    <p style="margin-top:0.5rem">© MOONtuner ${new Date().getFullYear()}</p>
    <p style="margin-top:0.3rem;color:#3a3530">Generated ${meta.generatedDate}</p>
  </div>
</section>

<script>
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

const sections = ['cover','signature','peaks','arc','practices','closing'];
const dots = document.querySelectorAll('.nav-dot');
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.getElementById(dot.dataset.target).scrollIntoView({ behavior:'smooth' });
  });
});
const sio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const idx = sections.indexOf(e.target.id);
      dots.forEach((d,i) => d.classList.toggle('active', i === idx));
    }
  });
}, { threshold: 0.3 });
sections.forEach(id => { const el = document.getElementById(id); if(el) sio.observe(el); });
</script>

</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
