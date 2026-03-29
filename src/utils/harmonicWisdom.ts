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

export const calculateHarmonicAnalysis = (
  aspects: Array<{ aspectType: { name: string }; orb: number }>,
  planets: Array<{ signData: { element?: string } | null }>
): HarmonicAnalysis => {
  let consonanceScore = 0, tensionScore = 0;
  aspects.forEach(a => {
    const f = 1 - (a.orb / 10);
    if (['Conjunction', 'Sextile', 'Trine'].includes(a.aspectType.name)) consonanceScore += f;
    if (['Square', 'Opposition'].includes(a.aspectType.name)) tensionScore += f;
  });

  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  planets.forEach(p => {
    const e = p.signData?.element;
    if (e && elementCounts[e] !== undefined) elementCounts[e]++;
  });

  return {
    consonance: Math.min(consonanceScore * 20, 100),
    tension: Math.min(tensionScore * 25, 100),
    complexity: Math.min((aspects.length + planets.length / 2) * 8, 100),
    elements: elementCounts,
  };
};

export const getResolutionGuidance = (analysis: HarmonicAnalysis): string[] => {
  const g: string[] = [];
  if (analysis.tension > 50) g.push("High tension detected. Embrace this friction—it's evolutionary pressure.");
  if (analysis.consonance > 60) g.push("Harmonious flow dominates. Don't become complacent—sometimes we need dissonance.");
  if (analysis.complexity > 70) g.push("Complex symphony. Focus on one chord at a time.");
  const dom = Object.entries(analysis.elements).sort((a, b) => b[1] - a[1])[0];
  if (dom?.[1] > 0) {
    const m: Record<string, string> = {
      Fire: 'Fire frequencies sing loudly. Ground with earth practices.',
      Earth: 'Earth tones resonate. Introduce air and fire to prevent stagnation.',
      Air: 'Air frequencies vibrate. Balance with water.',
      Water: 'Water frequencies flow. Ground with earth.',
    };
    g.push(m[dom[0]] || '');
  }
  return g.filter(Boolean);
};
