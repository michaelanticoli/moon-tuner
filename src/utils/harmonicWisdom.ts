export const elementInfo: Record<string, { symbol: string; note: string; sound: string; color: string }> = {
  Fire:  { symbol: '△', note: 'C',  sound: 'Fast vibrations, initiating energy', color: 'warm red-orange tones' },
  Earth: { symbol: '▽', note: 'F',  sound: 'Slow, steady vibrations, stabilizing', color: 'grounded green-brown tones' },
  Air:   { symbol: '◇', note: 'G',  sound: 'Light, rapid oscillations, connecting', color: 'bright yellow-blue tones' },
  Water: { symbol: '○', note: 'E♭', sound: 'Flowing, emotional vibrations, receptive', color: 'cool blue-violet tones' },
};

export const qualityInfo: Record<string, { action: string; rhythm: string }> = {
  Cardinal: { action: 'Initiating', rhythm: 'Strong downbeat, beginning of measure' },
  Fixed:    { action: 'Sustaining', rhythm: 'Long sustained note, holding the tone' },
  Mutable:  { action: 'Transitioning', rhythm: 'Syncopated, bridge between movements' },
};

export const aspectMusicalData: Record<string, {
  type: string; feel: string; music: string; energy: string; resolve: string;
  isConsonant: boolean; isDissonant: boolean;
}> = {
  Conjunction: { type: 'Unison', feel: 'Unity & Amplification', music: 'two voices singing the same note', energy: 'Pure consonance—energies merge and amplify each other.', resolve: 'Already in perfect harmony.', isConsonant: true, isDissonant: false },
  Sextile:     { type: 'Major Third', feel: 'Harmonious & Flowing', music: 'a pleasant major chord', energy: 'Consonant and supportive.', resolve: 'Natural harmony—allow them to flow together.', isConsonant: true, isDissonant: false },
  Square:      { type: "Tritone (Devil's Interval)", feel: 'Tension & Dynamic Friction', music: 'a dissonant clash demanding resolution', energy: "Maximum dissonance. Like the tritone—'diabolus in musica.' But dissonance drives evolution.", resolve: 'Find the middle path. Lean into the discomfort.', isConsonant: false, isDissonant: true },
  Trine:       { type: 'Perfect Fifth', feel: 'Effortless Flow & Grace', music: 'the most consonant interval after unison', energy: 'Divine consonance. Natural talent and ease.', resolve: 'Already beautifully resolved.', isConsonant: true, isDissonant: false },
  Opposition:  { type: 'Octave Polarity', feel: 'Mirror Tension', music: 'the same note in different registers', energy: 'Polarized consonance. Same note at opposite ends.', resolve: 'Integration through awareness.', isConsonant: false, isDissonant: true },
};

export const houseWisdom: Record<number, { area: string; octave: string; wisdom: string }> = {
  1:  { area: 'Self & Identity', octave: 'Root Note', wisdom: 'This is your fundamental frequency—the keynote of your entire symphony.' },
  2:  { area: 'Resources & Values', octave: 'Second', wisdom: 'The harmonic that grounds your material reality.' },
  3:  { area: 'Communication & Mind', octave: 'Third', wisdom: 'The melody of your thoughts and expression.' },
  4:  { area: 'Home & Roots', octave: 'Fourth', wisdom: 'Your bass line—the foundation supporting everything above.' },
  5:  { area: 'Creativity & Joy', octave: 'Fifth', wisdom: 'Pure creative expression and authentic playfulness.' },
  6:  { area: 'Service & Health', octave: 'Sixth', wisdom: 'Where you refine and harmonize daily rhythms.' },
  7:  { area: 'Relationships', octave: 'Seventh', wisdom: 'The leading tone—seeking resolution through partnership.' },
  8:  { area: 'Transformation', octave: 'Octave', wisdom: 'Death and rebirth—transformation into a higher frequency.' },
  9:  { area: 'Wisdom & Expansion', octave: 'Ninth', wisdom: 'Reaching beyond the octave into philosophical resonance.' },
  10: { area: 'Career & Legacy', octave: 'Tenth', wisdom: 'Your public performance—the song for the world.' },
  11: { area: 'Community & Vision', octave: 'Eleventh', wisdom: 'The orchestra of your tribe and future vision.' },
  12: { area: 'Spirituality & Unity', octave: 'Twelfth', wisdom: 'Where all notes dissolve back into infinite silence.' },
};

export const getFrequencyCategory = (frequency: number) => {
  if (frequency < 300) return { category: 'Low', resonance: 'grounding, foundational' };
  if (frequency < 500) return { category: 'Mid', resonance: 'balancing, bridging' };
  return { category: 'High', resonance: 'elevating, transcendent' };
};

export const getOrbPrecision = (orb: number) => {
  if (orb < 1) return { label: 'Exact', intensity: 'Maximum power—full volume!' };
  if (orb < 3) return { label: 'Tight', intensity: 'Strong resonance—clearly felt' };
  if (orb < 6) return { label: 'Moderate', intensity: 'Present but softer' };
  return { label: 'Wide', intensity: 'Subtle influence—barely audible overtone' };
};

export interface HarmonicAnalysis {
  consonance: number;
  tension: number;
  complexity: number;
  elements: Record<string, number>;
}

// Weighted aspect scoring. Conjunctions are context-dependent (treated as
// 60% consonant / 40% tense — they amplify whatever they touch). Trines/Sextiles
// are pure flow; Squares/Oppositions are pure friction; minor aspects (Quincunx,
// Semi-square, etc.) add complexity but contribute lightly to the two poles.
const ASPECT_WEIGHTS: Record<string, { cons: number; tens: number; weight: number }> = {
  Conjunction:  { cons: 0.6, tens: 0.4, weight: 1.0 },
  Trine:        { cons: 1.0, tens: 0.0, weight: 0.9 },
  Sextile:      { cons: 0.7, tens: 0.0, weight: 0.6 },
  Square:       { cons: 0.0, tens: 1.0, weight: 1.0 },
  Opposition:   { cons: 0.0, tens: 0.9, weight: 1.0 },
  Quincunx:     { cons: 0.0, tens: 0.5, weight: 0.4 },
  'Semi-square':{ cons: 0.0, tens: 0.4, weight: 0.3 },
  Sesquiquadrate:{ cons: 0.0, tens: 0.4, weight: 0.3 },
  'Semi-sextile':{ cons: 0.3, tens: 0.0, weight: 0.3 },
};

export const calculateHarmonicAnalysis = (
  aspects: Array<{ aspectType: { name: string }; orb: number }>,
  planets: Array<{ signData: { element?: string } | null }>
): HarmonicAnalysis => {
  // Each aspect contributes (1 - orb/maxOrb) * weight. We normalize against the
  // *maximum possible* score for the count of aspects in this chart so values
  // express the *quality* of the aspect mix rather than just its volume.
  let consonanceScore = 0, tensionScore = 0, totalWeight = 0;
  aspects.forEach(a => {
    const meta = ASPECT_WEIGHTS[a.aspectType.name] ?? { cons: 0.2, tens: 0.2, weight: 0.3 };
    const tightness = Math.max(0, 1 - a.orb / 8); // 8° = soft cutoff
    const contribution = tightness * meta.weight;
    consonanceScore += contribution * meta.cons;
    tensionScore    += contribution * meta.tens;
    totalWeight     += meta.weight;
  });

  // Normalize to 0–100 against the chart's own aspect mass (avoids the old
  // bug where every chart pegged at 100%). The 0.7 ceiling is intentional:
  // a chart at 70% consonance is exceptionally flowing; 85%+ is rare.
  const denom = Math.max(totalWeight, 1);
  const consonance = Math.min((consonanceScore / denom) * 140, 100);
  const tension    = Math.min((tensionScore    / denom) * 140, 100);

  // Complexity: aspect density per planet, log-shaped so it doesn't saturate.
  // A typical natal chart has 8–14 aspects across 10 planets (ratio ~1.0).
  // 2.0+ aspects/planet = densely woven; 0.5 = sparse, soloistic.
  const ratio = aspects.length / Math.max(planets.length, 1);
  const complexity = Math.min(Math.round((1 - Math.exp(-ratio * 0.9)) * 100), 100);

  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  planets.forEach(p => {
    const e = p.signData?.element;
    if (e && elementCounts[e] !== undefined) elementCounts[e]++;
  });

  return {
    consonance: Math.round(consonance),
    tension: Math.round(tension),
    complexity,
    elements: elementCounts,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Canonical chart signatures — derived from the data we already have. These
// are real astrological measures (not flavor text) that translate cleanly into
// musical metaphor for the report.
// ─────────────────────────────────────────────────────────────────────────────

export interface CanonicalSignals {
  elementBalance: { Fire: number; Earth: number; Air: number; Water: number };       // % of planets in each element
  modalityBalance: { Cardinal: number; Fixed: number; Mutable: number };             // %
  polarity: { Yang: number; Yin: number };                                            // Fire+Air vs Earth+Water
  hemispheres: { Eastern: number; Western: number; Northern: number; Southern: number }; // % by house
  quadrants: { Q1: number; Q2: number; Q3: number; Q4: number };                     // %
  lunarPhaseAtBirth: { name: string; angle: number; musical: string };                // Sun-Moon angular separation
  sect: 'Diurnal' | 'Nocturnal';                                                      // day vs night chart
  chartRuler: string | null;                                                          // ruler of the rising sign
  mostAspectedPlanet: { name: string; count: number } | null;                         // the chart's "lead voice"
  retrogradeCount: number;                                                            // inward-listening planets
  stellium: { sign: string; planets: string[] } | null;                               // 3+ planets in one sign
}

const SIGN_RULERS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Pluto',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Uranus', Pisces: 'Neptune',
};

const SIGN_MODALITY: Record<string, 'Cardinal' | 'Fixed' | 'Mutable'> = {
  Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
  Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
  Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable',
};

const SIGN_ELEMENT: Record<string, 'Fire' | 'Earth' | 'Air' | 'Water'> = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

function lunarPhaseFromAngle(angle: number): { name: string; musical: string } {
  // Sun-Moon angular separation, 0–360 (Moon ahead of Sun)
  const a = ((angle % 360) + 360) % 360;
  if (a < 45)   return { name: 'New Moon',       musical: 'a single sustained tone before the orchestra enters — pure intention, undivided' };
  if (a < 90)   return { name: 'Crescent',       musical: 'the first ascending phrase — a melody beginning to find its key' };
  if (a < 135)  return { name: 'First Quarter',  musical: 'the sforzando — a decisive accent that breaks the silence and demands a downbeat' };
  if (a < 180)  return { name: 'Gibbous',        musical: 'the development section — themes elaborated, refined, tested against counterpoint' };
  if (a < 225)  return { name: 'Full Moon',      musical: 'the tutti — every voice in the orchestra at full volume, the whole score audible at once' };
  if (a < 270)  return { name: 'Disseminating',  musical: 'the recapitulation — wisdom restated for the listeners, the theme handed outward' };
  if (a < 315)  return { name: 'Last Quarter',   musical: 'the modulation — a key change that releases what came before' };
  return            { name: 'Balsamic',       musical: 'the final diminuendo — instruments dropping out one by one into reverberant silence' };
}

export function deriveCanonicalSignals(reading: {
  planets: Array<{
    position: { name: string; sign: string; degree: number; isRetrograde?: boolean };
    houseNumber?: number;
    signData?: { element?: string; modality?: string } | null;
  }>;
  aspects: Array<{ planet1: string; planet2: string }>;
}, ascendantSign?: string | null): CanonicalSignals {
  const luminaries = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  const corePlanets = reading.planets.filter(p => luminaries.includes(p.position.name));
  const total = Math.max(corePlanets.length, 1);

  // Element & modality %
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const modalities = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  corePlanets.forEach(p => {
    const el = SIGN_ELEMENT[p.position.sign];
    const md = SIGN_MODALITY[p.position.sign];
    if (el) elements[el]++;
    if (md) modalities[md]++;
  });
  const pct = (n: number) => Math.round((n / total) * 100);
  const elementBalance = { Fire: pct(elements.Fire), Earth: pct(elements.Earth), Air: pct(elements.Air), Water: pct(elements.Water) };
  const modalityBalance = { Cardinal: pct(modalities.Cardinal), Fixed: pct(modalities.Fixed), Mutable: pct(modalities.Mutable) };
  const polarity = { Yang: elementBalance.Fire + elementBalance.Air, Yin: elementBalance.Earth + elementBalance.Water };

  // Hemispheres & quadrants by house
  const hemispheres = { Eastern: 0, Western: 0, Northern: 0, Southern: 0 };
  const quadrants = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
  let withHouse = 0;
  corePlanets.forEach(p => {
    const h = p.houseNumber;
    if (!h) return;
    withHouse++;
    // Eastern (self): houses 10,11,12,1,2,3 ; Western (others): 4–9
    if ([10,11,12,1,2,3].includes(h)) hemispheres.Eastern++;
    else hemispheres.Western++;
    // Northern (private/below horizon): 1–6 ; Southern (public/above): 7–12
    if (h <= 6) hemispheres.Northern++;
    else hemispheres.Southern++;
    if (h >= 1 && h <= 3) quadrants.Q1++;
    else if (h >= 4 && h <= 6) quadrants.Q2++;
    else if (h >= 7 && h <= 9) quadrants.Q3++;
    else quadrants.Q4++;
  });
  const hpct = (n: number) => withHouse ? Math.round((n / withHouse) * 100) : 0;
  const hemispheresPct = { Eastern: hpct(hemispheres.Eastern), Western: hpct(hemispheres.Western), Northern: hpct(hemispheres.Northern), Southern: hpct(hemispheres.Southern) };
  const quadrantsPct = { Q1: hpct(quadrants.Q1), Q2: hpct(quadrants.Q2), Q3: hpct(quadrants.Q3), Q4: hpct(quadrants.Q4) };

  // Lunar phase at birth: angular separation Moon - Sun
  const sun = reading.planets.find(p => p.position.name === 'Sun');
  const moon = reading.planets.find(p => p.position.name === 'Moon');
  const sepAngle = sun && moon ? (((moon.position.degree - sun.position.degree) % 360) + 360) % 360 : 0;
  const phase = lunarPhaseFromAngle(sepAngle);
  const lunarPhaseAtBirth = { name: phase.name, angle: Math.round(sepAngle), musical: phase.musical };

  // Sect: diurnal if Sun is in houses 7–12 (above horizon), nocturnal if 1–6
  const sectHouse = sun?.houseNumber;
  const sect: 'Diurnal' | 'Nocturnal' = sectHouse && sectHouse >= 7 ? 'Diurnal' : 'Nocturnal';

  // Chart ruler = ruler of the rising sign
  const chartRuler = ascendantSign ? (SIGN_RULERS[ascendantSign] ?? null) : null;

  // Most-aspected planet (lead voice)
  const aspectCounts: Record<string, number> = {};
  reading.aspects.forEach(a => {
    aspectCounts[a.planet1] = (aspectCounts[a.planet1] ?? 0) + 1;
    aspectCounts[a.planet2] = (aspectCounts[a.planet2] ?? 0) + 1;
  });
  const sorted = Object.entries(aspectCounts).sort((a, b) => b[1] - a[1]);
  const mostAspectedPlanet = sorted.length ? { name: sorted[0][0], count: sorted[0][1] } : null;

  // Retrograde count
  const retrogradeCount = corePlanets.filter(p => p.position.isRetrograde).length;

  // Stellium detection (3+ in one sign)
  const bySign: Record<string, string[]> = {};
  corePlanets.forEach(p => {
    bySign[p.position.sign] ??= [];
    bySign[p.position.sign].push(p.position.name);
  });
  const stelliumEntry = Object.entries(bySign).find(([, arr]) => arr.length >= 3);
  const stellium = stelliumEntry ? { sign: stelliumEntry[0], planets: stelliumEntry[1] } : null;

  return {
    elementBalance,
    modalityBalance,
    polarity,
    hemispheres: hemispheresPct,
    quadrants: quadrantsPct,
    lunarPhaseAtBirth,
    sect,
    chartRuler,
    mostAspectedPlanet,
    retrogradeCount,
    stellium,
  };
}

export const getResolutionGuidance = (analysis: HarmonicAnalysis): string[] => {
  const g: string[] = [];
  if (analysis.tension > 50) g.push("Tension is active here, but it is not a flaw. Use friction as a cue to make one brave adjustment instead of forcing the whole arrangement at once.");
  if (analysis.consonance > 60) g.push("There is real flow in this chart. Trust what is already working and build from that stable note before reaching for more complexity.");
  if (analysis.complexity > 70) g.push("This is a layered score. The strongest move is sequencing: choose one theme, one relationship, or one decision and let the rest breathe.");
  if (analysis.consonance < 35 && analysis.tension < 35) g.push("The chart reads quieter than dramatic. Subtle signatures still matter here—listen for consistency, not spectacle.");

  const rankedElements = Object.entries(analysis.elements).sort((a, b) => b[1] - a[1]);
  const dom = rankedElements[0];
  const least = rankedElements[rankedElements.length - 1];
  if (dom?.[1] > 0) {
    const m: Record<string, string> = {
      Fire: 'Fire leads the mix. Channel it into deliberate action and pair it with grounding structure so momentum becomes mastery.',
      Earth: 'Earth is anchoring the score. Let steadiness be your advantage, then invite a little experimentation so stability does not harden into stagnation.',
      Air: 'Air is carrying this chart. Name what you know, speak clearly, and balance thought with embodied follow-through.',
      Water: 'Water is guiding the emotional tone. Trust intuition, but give feeling a container so sensitivity becomes wisdom instead of overwhelm.',
    };
    g.push(m[dom[0]] || '');
  }
  if (least && least[1] === 0) {
    const missing: Record<string, string> = {
      Fire: 'Very little fire is present, so borrowed courage matters: use deadlines, movement, or a public commitment to create ignition.',
      Earth: 'Very little earth is present, so make the insight tangible: write the plan down, calendar it, or give it a body-level ritual.',
      Air: 'Very little air is present, so translation helps: talk it out, name the pattern, or ask a sharp question before acting.',
      Water: 'Very little water is present, so add softness and reflection: pause long enough to notice what the nervous system is saying.',
    };
    g.push(missing[least[0]] || '');
  }
  return g.filter(Boolean);
};
