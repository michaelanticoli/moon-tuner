import type { QMAspect, QMHouse, QMPlanet, QMSign } from '@/types/quantumMelodic';

export const FALLBACK_QM_PLANETS: QMPlanet[] = [
  { id: 'sun', name: 'Sun', symbol: '☉', frequency_hz: 528, octave: 4, note: 'C', instrument: 'Solar Lead', timbre: 'bright', harmonic_quality: 'radiant', archetypal_energy: 'identity', sonic_character: 'A clear guiding tone that centers the composition.' },
  { id: 'moon', name: 'Moon', symbol: '☽', frequency_hz: 417, octave: 4, note: 'A', instrument: 'Lunar Pad', timbre: 'soft', harmonic_quality: 'reflective', archetypal_energy: 'emotion', sonic_character: 'A flowing undertow that carries mood, memory, and instinct.' },
  { id: 'mercury', name: 'Mercury', symbol: '☿', frequency_hz: 741, octave: 5, note: 'G', instrument: 'Messenger Arp', timbre: 'nimble', harmonic_quality: 'articulate', archetypal_energy: 'thought', sonic_character: 'Quick, articulate phrases that connect ideas into pattern.' },
  { id: 'venus', name: 'Venus', symbol: '♀', frequency_hz: 639, octave: 4, note: 'E', instrument: 'Velvet Harmony', timbre: 'warm', harmonic_quality: 'harmonizing', archetypal_energy: 'attraction', sonic_character: 'A sweetening layer that turns contact into cohesion.' },
  { id: 'mars', name: 'Mars', symbol: '♂', frequency_hz: 396, octave: 3, note: 'D', instrument: 'Drive Pulse', timbre: 'edged', harmonic_quality: 'percussive', archetypal_energy: 'will', sonic_character: 'A decisive rhythmic attack that pushes the phrase forward.' },
  { id: 'jupiter', name: 'Jupiter', symbol: '♃', frequency_hz: 285, octave: 3, note: 'F', instrument: 'Cathedral Drone', timbre: 'expansive', harmonic_quality: 'buoyant', archetypal_energy: 'growth', sonic_character: 'A generous bass resonance that widens the field of possibility.' },
  { id: 'saturn', name: 'Saturn', symbol: '♄', frequency_hz: 174, octave: 2, note: 'C', instrument: 'Boundary Bass', timbre: 'grainy', harmonic_quality: 'structural', archetypal_energy: 'discipline', sonic_character: 'A stabilizing low register that creates form, timing, and consequence.' },
  { id: 'uranus', name: 'Uranus', symbol: '♅', frequency_hz: 852, octave: 5, note: 'A', instrument: 'Voltage Arp', timbre: 'electric', harmonic_quality: 'liberating', archetypal_energy: 'innovation', sonic_character: 'Unexpected spikes and jumps that crack open stale arrangements.' },
  { id: 'neptune', name: 'Neptune', symbol: '♆', frequency_hz: 963, octave: 3, note: 'B', instrument: 'Ocean Wash', timbre: 'diffuse', harmonic_quality: 'mystical', archetypal_energy: 'imagination', sonic_character: 'A blurred halo that dissolves hard edges into dream logic.' },
  { id: 'pluto', name: 'Pluto', symbol: '♇', frequency_hz: 256, octave: 2, note: 'C', instrument: 'Underworld Sub', timbre: 'deep', harmonic_quality: 'transformative', archetypal_energy: 'rebirth', sonic_character: 'A hidden sub-layer that changes the entire feeling from underneath.' },
  { id: 'ascendant', name: 'Ascendant', symbol: 'Asc', frequency_hz: 432, octave: 4, note: 'A', instrument: 'Threshold Bell', timbre: 'clean', harmonic_quality: 'framing', archetypal_energy: 'presentation', sonic_character: 'A framing signal that introduces the chart to the outer world.' },
];

export const FALLBACK_QM_SIGNS: QMSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', musical_mode: 'Phrygian', key_signature: 'A minor', tempo_bpm: 132, texture: 'driving', emotional_quality: 'brave', sonic_palette: 'sparks and ignition' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', musical_mode: 'Ionian', key_signature: 'F major', tempo_bpm: 72, texture: 'grounded', emotional_quality: 'steady', sonic_palette: 'wood, velvet, resonance' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', musical_mode: 'Mixolydian', key_signature: 'G major', tempo_bpm: 120, texture: 'nimble', emotional_quality: 'curious', sonic_palette: 'glints, chatter, motion' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', musical_mode: 'Aeolian', key_signature: 'A minor', tempo_bpm: 76, texture: 'tidal', emotional_quality: 'protective', sonic_palette: 'moonlight, tides, memory' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', musical_mode: 'Lydian', key_signature: 'D major', tempo_bpm: 104, texture: 'theatrical', emotional_quality: 'radiant', sonic_palette: 'gold, brass, warmth' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', musical_mode: 'Dorian', key_signature: 'D minor', tempo_bpm: 92, texture: 'precise', emotional_quality: 'refining', sonic_palette: 'linen, grain, detail' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', musical_mode: 'Ionian', key_signature: 'B♭ major', tempo_bpm: 96, texture: 'balanced', emotional_quality: 'harmonizing', sonic_palette: 'silk, symmetry, poise' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', musical_mode: 'Locrian', key_signature: 'B diminished', tempo_bpm: 80, texture: 'immersive', emotional_quality: 'intense', sonic_palette: 'ink, pressure, magnetism' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', musical_mode: 'Mixolydian', key_signature: 'E major', tempo_bpm: 126, texture: 'expansive', emotional_quality: 'visionary', sonic_palette: 'open sky, travel, uplift' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', musical_mode: 'Dorian', key_signature: 'C minor', tempo_bpm: 84, texture: 'architectural', emotional_quality: 'disciplined', sonic_palette: 'stone, iron, ascent' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', musical_mode: 'Lydian', key_signature: 'F♯ major', tempo_bpm: 110, texture: 'futurist', emotional_quality: 'detached', sonic_palette: 'static, stars, invention' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', musical_mode: 'Phrygian', key_signature: 'E minor', tempo_bpm: 78, texture: 'floating', emotional_quality: 'mystic', sonic_palette: 'mist, ocean, surrender' },
];

export const FALLBACK_QM_ASPECTS: QMAspect[] = [
  { id: 'conjunction', name: 'Conjunction', symbol: '☌', angle: 0, orb: 8, harmonic_interval: 'Unison', consonance: 'Merged force', tension_level: 2, sonic_expression: 'two voices reinforce each other', musical_effect: 'amplification', color: '#f4d58d' },
  { id: 'sextile', name: 'Sextile', symbol: '⚹', angle: 60, orb: 5, harmonic_interval: 'Major third', consonance: 'Cooperative flow', tension_level: 3, sonic_expression: 'supportive dialogue', musical_effect: 'easy articulation', color: '#7dd3fc' },
  { id: 'square', name: 'Square', symbol: '□', angle: 90, orb: 6, harmonic_interval: 'Tritone', consonance: 'Productive friction', tension_level: 8, sonic_expression: 'sharp dynamic stress', musical_effect: 'pressure toward change', color: '#f87171' },
  { id: 'trine', name: 'Trine', symbol: '△', angle: 120, orb: 6, harmonic_interval: 'Perfect fifth', consonance: 'Natural ease', tension_level: 2, sonic_expression: 'effortless resonance', musical_effect: 'stability and grace', color: '#86efac' },
  { id: 'opposition', name: 'Opposition', symbol: '☍', angle: 180, orb: 8, harmonic_interval: 'Octave polarity', consonance: 'Reflective tension', tension_level: 7, sonic_expression: 'mirrored extremes', musical_effect: 'integration through contrast', color: '#c4b5fd' },
];

export const FALLBACK_QM_HOUSES: QMHouse[] = Array.from({ length: 12 }, (_, index) => {
  const number = index + 1;
  const names = ['Identity', 'Resources', 'Communication', 'Roots', 'Creativity', 'Service', 'Relationship', 'Transformation', 'Meaning', 'Legacy', 'Community', 'Mystery'];
  const dynamics = ['initiating', 'stabilizing', 'expressing', 'feeling', 'creating', 'refining', 'mirroring', 'shedding', 'seeking', 'building', 'connecting', 'surrendering'];

  return {
    id: `house-${number}`,
    number,
    name: `${number}${number === 1 ? 'st' : number === 2 ? 'nd' : number === 3 ? 'rd' : 'th'} House`,
    domain: names[index],
    tonal_area: `Register ${number}`,
    dynamic: dynamics[index],
    frequency_range: number <= 4 ? 'lower register' : number <= 8 ? 'middle register' : 'upper register',
    expression: `This house colors how ${names[index].toLowerCase()} becomes audible in lived experience.`,
  };
});
