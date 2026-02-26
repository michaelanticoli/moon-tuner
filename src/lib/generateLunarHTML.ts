import { 
  getPhaseKey,
  getDetailedInsight,
  type ArcMonth 
} from '@/hooks/useLunarCalculations';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface LunarReportData {
  birthDate: Date;
  birthLocation: string;
  natalPhase: number;
  natalPhaseName: string;
  arc: ArcMonth[];
}

const PHASE_ARCHETYPES: Record<string, { archetype: string; element: string; modality: string; bodyZone: string; keywords: string[] }> = {
  'new': { archetype: 'The Seed', element: 'Earth / Void', modality: 'Cardinal Initiation', bodyZone: 'Pineal Gland, Third Eye', keywords: ['Incubation', 'Intention', 'Darkness', 'Potential', 'Stillness'] },
  'waxing-crescent': { archetype: 'The Sprout', element: 'Earth Rising', modality: 'Fixed Emergence', bodyZone: 'Throat, Voice', keywords: ['Breakthrough', 'Courage', 'First Steps', 'Declaration', 'Momentum'] },
  'first-quarter': { archetype: 'The Builder', element: 'Fire', modality: 'Cardinal Crisis', bodyZone: 'Solar Plexus, Gut', keywords: ['Decision', 'Conflict', 'Action', 'Commitment', 'Risk'] },
  'waxing-gibbous': { archetype: 'The Refiner', element: 'Fire Rising', modality: 'Fixed Development', bodyZone: 'Heart, Chest', keywords: ['Adjustment', 'Patience', 'Analysis', 'Perfection', 'Devotion'] },
  'full': { archetype: 'The Illuminator', element: 'Air / Light', modality: 'Cardinal Culmination', bodyZone: 'Eyes, Face, Skin', keywords: ['Revelation', 'Objectivity', 'Relationships', 'Harvest', 'Peak'] },
  'waning-gibbous': { archetype: 'The Teacher', element: 'Air Descending', modality: 'Fixed Distribution', bodyZone: 'Hands, Arms', keywords: ['Sharing', 'Gratitude', 'Wisdom', 'Generosity', 'Communication'] },
  'last-quarter': { archetype: 'The Liberator', element: 'Water', modality: 'Cardinal Release', bodyZone: 'Hips, Thighs, Elimination', keywords: ['Letting Go', 'Forgiveness', 'Reorientation', 'Crisis', 'Shedding'] },
  'waning-crescent': { archetype: 'The Mystic', element: 'Water Deepening', modality: 'Fixed Surrender', bodyZone: 'Feet, Lymphatic System', keywords: ['Rest', 'Dreams', 'Dissolution', 'Prophecy', 'Transition'] },
};

const SOLFEGGIO: Record<string, { hz: number; meaning: string }> = {
  'new': { hz: 396, meaning: 'Liberation from fear and guilt' },
  'waxing-crescent': { hz: 417, meaning: 'Facilitating change and transformation' },
  'first-quarter': { hz: 528, meaning: 'Transformation, miracles, DNA repair' },
  'waxing-gibbous': { hz: 639, meaning: 'Harmonizing relationships' },
  'full': { hz: 741, meaning: 'Awakening intuition and expression' },
  'waning-gibbous': { hz: 852, meaning: 'Returning to spiritual order' },
  'last-quarter': { hz: 963, meaning: 'Awakening perfect state' },
  'waning-crescent': { hz: 174, meaning: 'Foundation of spiritual evolution' },
};

const NATAL_INTERPRETATIONS: Record<string, string> = {
  'new': `Being born under the New Moon marks you as a natural initiator. You carry the energy of beginnings—the seed that has not yet broken soil. Your gift is the ability to sense potential where others see only darkness. However, this also means you may often feel misunderstood, as your visions exist in forms not yet visible to others. Your life path involves learning to trust incubation periods and resist the pressure to show results before their time. Each monthly New Moon return amplifies your manifesting capacity—use these windows to plant your most important seeds.`,
  'waxing-crescent': `Born during the Waxing Crescent, you are a pioneer at heart. You carry the surge of first momentum—the sprout breaking through resistance. Your innate courage to take initial action, even without guarantees, sets you apart. The challenge for you is follow-through; you may be drawn to new beginnings before completing current projects. Your monthly returns are optimal for pushing through resistance and declaring intentions publicly.`,
  'first-quarter': `The First Quarter birth signature marks you as a decisive, action-oriented soul. You thrive in crisis and are often the person others turn to when hard choices must be made. However, you may create conflict unconsciously when life feels too stable. Your growth edge involves learning when to push forward and when to yield. Your monthly power days are ideal for making commitments you've been avoiding and taking calculated risks.`,
  'waxing-gibbous': `Born under the Waxing Gibbous, you are naturally analytical and devoted to refinement. You see what's almost right and feel compelled to perfect it. This makes you an excellent editor, analyst, or developer of others' ideas. Your shadow is a tendency toward perpetual adjustment—never quite feeling something is ready. Your monthly returns are powerful windows for reviewing projects and preparing for culmination. Trust that done is better than perfect.`,
  'full': `A Full Moon birth bestows high visibility and the capacity for objective awareness. You naturally see both sides of any situation and often serve as a bridge between opposing forces. Relationships are central to your life path—you understand yourself through others. The challenge is avoiding codependency or losing yourself in partnership dynamics. Your monthly Full Moon returns are emotionally potent; use them for celebration and honest relationship conversations.`,
  'waning-gibbous': `Born under the Disseminating Moon, you are a natural teacher and communicator. You've come to share wisdom and find meaning through contribution to the collective. Your gift is synthesizing experience into transferable knowledge. The shadow side involves over-giving or teaching before fully integrating lessons yourself. Your monthly returns are optimal for writing, speaking, mentoring, and any form of knowledge distribution.`,
  'last-quarter': `The Last Quarter birth signature marks you as someone who came to release outdated patterns—both personal and collective. You have an innate ability to see what needs to end and the courage to let it go. This can manifest as being seen as the "destroyer" in family or organizational systems, which is actually a sacred role. Monthly power days are potent for decluttering—physically, emotionally, relationally.`,
  'waning-crescent': `Born under the Balsamic Moon, you carry ancient wisdom and a connection to liminal spaces. You may have felt "old" even as a child, possessing insight beyond your years. Dreams and intuition are heightened for you. The challenge is engaging with the material world—you may resist full incarnation. Your monthly returns are deeply introspective periods; honor them with solitude, rest, and dreamwork.`,
};

function getMoonSVG(phaseKey: string): string {
  const svgs: Record<string, string> = {
    'new': `<circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`,
    'waxing-crescent': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><circle cx="62" cy="50" r="34" fill="#0a0a0a"/>`,
    'first-quarter': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><rect x="50" y="12" width="38" height="76" fill="#0a0a0a"/>`,
    'waxing-gibbous': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><ellipse cx="38" cy="50" rx="12" ry="38" fill="#0a0a0a"/>`,
    'full': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/>`,
    'waning-gibbous': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><ellipse cx="62" cy="50" rx="12" ry="38" fill="#0a0a0a"/>`,
    'last-quarter': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><rect x="12" y="12" width="38" height="76" fill="#0a0a0a"/>`,
    'waning-crescent': `<circle cx="50" cy="50" r="38" fill="rgba(255,255,255,0.85)"/><circle cx="38" cy="50" r="34" fill="#0a0a0a"/>`,
  };
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${svgs[phaseKey] || svgs['new']}</svg>`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function openLunarHTMLReport(data: LunarReportData): void {
  const phaseKey = getPhaseKey(data.natalPhase);
  const archetype = PHASE_ARCHETYPES[phaseKey];
  const insight = getDetailedInsight(data.natalPhase);
  const frequency = SOLFEGGIO[phaseKey];
  const interpretation = NATAL_INTERPRETATIONS[phaseKey] || NATAL_INTERPRETATIONS['new'];
  const degree = (data.natalPhase * 360).toFixed(2);

  const arcCardsHTML = data.arc.map((item, i) => `
    <div class="arc-card" style="animation-delay: ${i * 0.08}s">
      <div class="arc-card-header">
        <div>
          <span class="arc-month">${item.month}</span>
          <span class="arc-day">Day ${item.day}</span>
        </div>
        <span class="arc-intensity">${item.intensity}</span>
      </div>
      <div class="arc-focus">${item.focus}</div>
      <p class="arc-desc">Your <strong>${item.phase}</strong> return. Peak alignment window.</p>
      <div class="arc-bar"><div class="arc-bar-fill" style="width:${item.intensity}"></div></div>
    </div>
  `).join('');

  const keywordsHTML = archetype.keywords.map(k => `<span class="keyword">${k}</span>`).join('');

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
  body{
    background:#060608;
    color:#e8e4dc;
    font-family:'DM Sans',system-ui,sans-serif;
    font-weight:300;
    line-height:1.7;
    overflow-x:hidden;
  }

  /* ─── Utility ─── */
  .container{max-width:960px;margin:0 auto;padding:0 2rem}
  .label{font-size:0.6rem;letter-spacing:0.45em;text-transform:uppercase;color:#8a8070;font-weight:700}
  .serif{font-family:'Playfair Display',Georgia,serif}
  .gold{color:#c9a96e}
  .muted{color:#8a8070}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(201,169,110,0.25),transparent);margin:3rem 0}

  /* ─── Hero / Cover ─── */
  .cover{
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  .cover::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 60% 50% at 50% 40%,rgba(201,169,110,0.06),transparent 70%);
  }
  .cover-brand{font-size:0.7rem;letter-spacing:1em;text-transform:uppercase;color:#c9a96e;margin-bottom:3rem;position:relative}
  .cover-moon{width:160px;height:160px;margin:0 auto 3rem;position:relative;opacity:0;animation:fadeUp 1.2s 0.3s forwards}
  .cover h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:400;line-height:1.1;margin-bottom:1rem;opacity:0;animation:fadeUp 1s 0.5s forwards}
  .cover h1 em{font-style:italic;color:#c9a96e}
  .cover-meta{opacity:0;animation:fadeUp 1s 0.8s forwards}
  .cover-meta p{margin:0.3rem 0}
  .cover-scroll{
    position:absolute;bottom:2rem;
    font-size:0.6rem;letter-spacing:0.5em;text-transform:uppercase;color:#5a5548;
    opacity:0;animation:fadeUp 1s 1.2s forwards;
  }
  .cover-scroll::after{content:'';display:block;width:1px;height:40px;background:linear-gradient(#5a5548,transparent);margin:0.8rem auto 0}

  /* ─── Sections ─── */
  section{padding:6rem 0}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;margin-bottom:0.5rem}
  .section-subtitle{color:#8a8070;font-size:0.95rem;max-width:640px;margin-bottom:3rem}

  /* ─── Signature Grid ─── */
  .sig-grid{display:grid;grid-template-columns:1fr 2fr;gap:2rem;margin-bottom:3rem}
  @media(max-width:768px){.sig-grid{grid-template-columns:1fr}}
  .sig-moon-card{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(201,169,110,0.12);
    border-radius:1.5rem;
    padding:3rem 2rem;
    display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  }
  .sig-moon-icon{width:100px;height:100px;margin-bottom:1.5rem}
  .sig-archetype{font-family:'Playfair Display',serif;font-size:1.8rem;margin-top:0.5rem}
  .sig-degree{color:#c9a96e;font-size:0.85rem;margin-top:0.3rem}

  .sig-details{display:flex;flex-direction:column;gap:1.5rem}
  .sig-card{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:1.2rem;
    padding:1.8rem 2rem;
  }
  .sig-card h4{font-family:'Playfair Display',serif;font-size:1.4rem;margin-top:0.4rem}
  .sig-card p{color:#b0a898;margin-top:0.5rem;font-size:0.92rem}

  .stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
  .stat-card{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:1rem;
    padding:1.5rem;
  }
  .stat-card .value{font-family:'Playfair Display',serif;font-size:1.1rem;margin-top:0.3rem}

  /* ─── Keywords ─── */
  .keywords{display:flex;flex-wrap:wrap;gap:0.5rem;margin:2rem 0}
  .keyword{
    padding:0.4rem 1rem;
    font-size:0.65rem;
    letter-spacing:0.3em;
    text-transform:uppercase;
    color:#c9a96e;
    border:1px solid rgba(201,169,110,0.2);
    border-radius:100px;
    background:rgba(201,169,110,0.04);
  }

  /* ─── Interpretation ─── */
  .interpretation{
    background:rgba(201,169,110,0.04);
    border-left:2px solid rgba(201,169,110,0.3);
    border-radius:0 1rem 1rem 0;
    padding:2rem 2.5rem;
    font-size:0.95rem;
    line-height:1.9;
    color:#c8c0b4;
    margin:3rem 0;
  }

  /* ─── Arc Grid ─── */
  .arc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.2rem}
  .arc-card{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:1.2rem;
    padding:1.5rem;
    opacity:0;
    animation:fadeUp 0.6s forwards;
    transition:border-color 0.3s;
  }
  .arc-card:hover{border-color:rgba(201,169,110,0.3)}
  .arc-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem}
  .arc-month{font-family:'Playfair Display',serif;font-size:1.6rem;display:block}
  .arc-day{font-size:0.8rem;color:#8a8070}
  .arc-intensity{font-size:0.6rem;letter-spacing:0.2em;color:#c9a96e;border:1px solid rgba(201,169,110,0.2);padding:0.25rem 0.6rem;border-radius:4px;font-weight:700}
  .arc-focus{font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;margin-bottom:0.5rem}
  .arc-desc{font-size:0.8rem;color:#8a8070;margin-bottom:1rem}
  .arc-desc strong{color:#e8e4dc}
  .arc-bar{height:3px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden}
  .arc-bar-fill{height:100%;background:linear-gradient(90deg,#c9a96e,#e0c78a);border-radius:4px;transition:width 1s ease}

  /* ─── Practices ─── */
  .practices{display:grid;gap:2rem;margin-top:2rem}
  .practice{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:1.2rem;
    padding:2rem;
  }
  .practice h4{font-family:'Playfair Display',serif;font-size:1.15rem;margin-bottom:0.6rem}
  .practice p{color:#b0a898;font-size:0.9rem}

  /* ─── Closing ─── */
  .closing{
    min-height:60vh;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;
    position:relative;
  }
  .closing::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 50% 40% at 50% 60%,rgba(201,169,110,0.05),transparent 70%);
  }
  .closing h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3rem);font-weight:400;margin-bottom:1.5rem;position:relative}
  .closing h2 em{font-style:italic;color:#c9a96e}
  .closing p{max-width:560px;color:#8a8070;font-size:0.92rem;line-height:1.8;position:relative}
  .closing-footer{margin-top:4rem;font-size:0.65rem;letter-spacing:0.4em;text-transform:uppercase;color:#4a4540;position:relative}

  /* ─── Nav dots ─── */
  .nav-dots{
    position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);
    display:flex;flex-direction:column;gap:0.8rem;z-index:100;
  }
  .nav-dot{
    width:8px;height:8px;border-radius:50%;
    border:1px solid rgba(201,169,110,0.3);background:transparent;
    cursor:pointer;transition:all 0.3s;
  }
  .nav-dot:hover,.nav-dot.active{background:#c9a96e;border-color:#c9a96e}
  @media(max-width:768px){.nav-dots{display:none}}

  /* ─── Print ─── */
  .print-btn{
    position:fixed;bottom:2rem;right:2rem;z-index:100;
    background:rgba(201,169,110,0.15);border:1px solid rgba(201,169,110,0.3);
    color:#c9a96e;padding:0.6rem 1.5rem;border-radius:100px;
    font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;
    cursor:pointer;transition:all 0.3s;backdrop-filter:blur(10px);
    font-family:'DM Sans',sans-serif;
  }
  .print-btn:hover{background:rgba(201,169,110,0.25)}
  @media print{
    .print-btn,.nav-dots{display:none!important}
    body{background:#fff;color:#1a1a1a}
    .cover{min-height:auto;padding:4rem 0}
    section{padding:3rem 0}
    .sig-card,.stat-card,.arc-card,.practice,.interpretation{border-color:#ddd;background:#fafafa}
    .label,.muted,.arc-day,.arc-desc,.cover-scroll{color:#888}
    .gold,.arc-intensity,.keyword{color:#8b7340}
    .keyword{border-color:#ccc}
    .arc-bar{background:#eee}
    .arc-bar-fill{background:#8b7340}
    .interpretation{border-left-color:#8b7340;background:#f5f3ef}
  }

  /* ─── Animations ─── */
  @keyframes fadeUp{
    from{opacity:0;transform:translateY(20px)}
    to{opacity:1;transform:translateY(0)}
  }
  .reveal{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.16,1,0.3,1)}
  .reveal.visible{opacity:1;transform:none}
</style>
</head>
<body>

<!-- Navigation Dots -->
<nav class="nav-dots" id="navDots">
  <button class="nav-dot active" data-target="cover" title="Cover"></button>
  <button class="nav-dot" data-target="signature" title="Natal Signature"></button>
  <button class="nav-dot" data-target="arc" title="12-Month Arc"></button>
  <button class="nav-dot" data-target="practices" title="Working With Your Arc"></button>
  <button class="nav-dot" data-target="closing" title="Closing"></button>
</nav>

<!-- Print/Save Button -->
<button class="print-btn" onclick="window.print()">⎙ Print / Save PDF</button>

<!-- ═══════ COVER ═══════ -->
<section class="cover" id="cover">
  <span class="cover-brand">MOONtuner</span>
  <div class="cover-moon">${getMoonSVG(phaseKey)}</div>
  <h1>Personal Lunar<br><em>Arc Report</em></h1>
  <div class="cover-meta">
    <p class="label" style="margin-bottom:1rem">Generated For</p>
    <p style="font-size:1.1rem">${formatDate(data.birthDate)}</p>
    ${data.birthLocation ? `<p class="muted" style="font-size:0.9rem">${escapeHtml(data.birthLocation)}</p>` : ''}
    <div class="divider" style="width:60px;margin:1.5rem auto"></div>
    <p class="label">Natal Lunar Signature</p>
    <p class="serif" style="font-size:1.6rem;margin-top:0.3rem">${data.natalPhaseName}</p>
    <p class="gold" style="font-size:0.85rem">${degree}° Ecliptic Longitude</p>
  </div>
  <div class="cover-scroll">Scroll to Begin</div>
</section>

<!-- ═══════ NATAL SIGNATURE ═══════ -->
<section id="signature">
  <div class="container">
    <div class="reveal">
      <span class="label">Section One</span>
      <h2 class="section-title">Your Natal Lunar Signature</h2>
      <p class="section-subtitle">The phase of the Moon at the moment of your birth encodes a lifelong pattern—your energetic fingerprint within the lunar cycle.</p>
    </div>

    <div class="sig-grid reveal">
      <div class="sig-moon-card">
        <div class="sig-moon-icon">${getMoonSVG(phaseKey)}</div>
        <span class="label">Archetype</span>
        <div class="sig-archetype">${archetype.archetype}</div>
        <div class="sig-degree">${degree}°</div>
      </div>
      <div class="sig-details">
        <div class="sig-card">
          <span class="label">Thematic Title</span>
          <h4><em>"${insight.title}"</em></h4>
          <p>${insight.insight}</p>
        </div>
        <div class="stat-row">
          <div class="stat-card">
            <span class="label">Element</span>
            <div class="value">${archetype.element}</div>
          </div>
          <div class="stat-card">
            <span class="label">Modality</span>
            <div class="value">${archetype.modality}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="stat-row reveal">
      <div class="stat-card">
        <span class="label">Somatic Zone</span>
        <div class="value">${archetype.bodyZone}</div>
      </div>
      <div class="stat-card">
        <span class="label">Solfeggio Frequency</span>
        <div class="value">${frequency.hz}Hz — ${frequency.meaning}</div>
      </div>
      <div class="stat-card">
        <span class="label">Lifelong Instruction</span>
        <div class="value">${insight.instruction}</div>
      </div>
    </div>

    <div class="keywords reveal">${keywordsHTML}</div>

    <div class="divider"></div>

    <div class="reveal">
      <span class="label">What This Means For You</span>
      <div class="interpretation">${interpretation}</div>
    </div>
  </div>
</section>

<!-- ═══════ 12-MONTH ARC ═══════ -->
<section id="arc">
  <div class="container">
    <div class="reveal">
      <span class="label">Section Two</span>
      <h2 class="section-title">Your 12-Month Lunar Arc</h2>
      <p class="section-subtitle">Each month, the Moon returns to your natal phase position. These are your personal power days—moments when the cosmic rhythm aligns with your birth signature.</p>
    </div>
    <div class="arc-grid">${arcCardsHTML}</div>
  </div>
</section>

<!-- ═══════ PRACTICES ═══════ -->
<section id="practices">
  <div class="container">
    <div class="reveal">
      <span class="label">Section Three</span>
      <h2 class="section-title">Working With Your Arc</h2>
      <p class="section-subtitle">A rhythm for engaging with your monthly power days.</p>
    </div>
    <div class="practices reveal">
      <div class="practice">
        <h4>Before Your Power Day</h4>
        <p>Begin winding down external commitments 2–3 days prior. Clear your schedule. Review your intentions from the previous cycle. Prepare materials for any rituals or focused work sessions.</p>
      </div>
      <div class="practice">
        <h4>On Your Power Day</h4>
        <p>Wake early if possible. Journal your current state and aspirations. Conduct important meetings or make significant decisions. This is optimal for signing contracts, launching projects, or having crucial conversations.</p>
      </div>
      <div class="practice">
        <h4>After Your Power Day</h4>
        <p>Allow integration time. Avoid second-guessing decisions made during your power window. Document any insights or dreams. Begin implementing action steps from your power day intentions.</p>
      </div>
      <div class="practice">
        <h4>Mid-Cycle Check-In</h4>
        <p>Approximately 14 days after your power day, the Moon will be in the opposite phase. Use this time to assess progress, make adjustments, and prepare for the next return.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════ CLOSING ═══════ -->
<section class="closing" id="closing">
  <h2>The Moon Reflects.<br><em>You Transform.</em></h2>
  <p>This report is your compass for the coming year. Return to it monthly. Mark your calendar with your power days. Over time, you will develop an intuitive relationship with your natal lunar rhythm—one that informs not just your planning, but your entire way of being.</p>
  <div class="closing-footer">
    <p>moontuner.xyz</p>
    <p style="margin-top:0.5rem">© MOONtuner ${new Date().getFullYear()}</p>
    <p style="margin-top:0.3rem;color:#3a3530">Generated ${formatDate(new Date())}</p>
  </div>
</section>

<script>
// ─── Scroll Reveal ───
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// ─── Nav Dots ───
const sections = ['cover','signature','arc','practices','closing'];
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
