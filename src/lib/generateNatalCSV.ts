/**
 * Natal Chart CSV Export — Moontuner
 * Generates a comprehensive CSV row with planetary positions and interpretive fields.
 */

import type { ChartData, PlanetPosition } from '@/types/astrology';
import type { LunarReport } from '@/lib/lunarReportEngine';

// ─── Interpretive derivations ───

const ELEMENT_MAP: Record<string, string> = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

const MODALITY_MAP: Record<string, string> = {
  Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
  Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
  Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable',
};

const RULER_MAP: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Pluto',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Uranus', Pisces: 'Neptune',
};

const SOUL_PURPOSE: Record<string, string> = {
  Aries: 'Courageous leadership and pioneering new paths',
  Taurus: 'Building lasting value and embodied presence',
  Gemini: 'Connecting ideas and bridging divided worlds',
  Cancer: 'Nurturing emotional intelligence and creating sanctuary',
  Leo: 'Radiating authentic creative expression',
  Virgo: 'Serving through precision and devoted craftsmanship',
  Libra: 'Harmonising relationships and cultivating justice',
  Scorpio: 'Transforming through depth and radical truth',
  Sagittarius: 'Expanding consciousness through wisdom and exploration',
  Capricorn: 'Mastering systems and building enduring legacy',
  Aquarius: 'Innovating for collective evolution',
  Pisces: 'Dissolving boundaries to channel universal compassion',
};

const SHADOW_WORK: Record<string, string> = {
  Aries: 'Impulsivity, aggression, fear of vulnerability',
  Taurus: 'Rigidity, possessiveness, resistance to change',
  Gemini: 'Superficiality, scattered focus, avoidance through intellectualisation',
  Cancer: 'Codependency, emotional manipulation, fear of abandonment',
  Leo: 'Ego inflation, need for external validation, domination',
  Virgo: 'Perfectionism, self-criticism, paralysis through analysis',
  Libra: 'People-pleasing, indecision, conflict avoidance',
  Scorpio: 'Control, jealousy, destructive intensity',
  Sagittarius: 'Over-promising, escapism, dogmatic righteousness',
  Capricorn: 'Workaholism, emotional suppression, status obsession',
  Aquarius: 'Emotional detachment, contrarianism, alienation',
  Pisces: 'Martyrdom, escapism, boundary dissolution',
};

const LIFE_LESSON: Record<string, string> = {
  Aries: 'Learning patience without losing fire',
  Taurus: 'Learning to release without losing security',
  Gemini: 'Learning depth without losing breadth',
  Cancer: 'Learning independence without losing tenderness',
  Leo: 'Learning humility without losing radiance',
  Virgo: 'Learning self-compassion without losing standards',
  Libra: 'Learning to stand alone without losing grace',
  Scorpio: 'Learning to trust without losing power',
  Sagittarius: 'Learning commitment without losing freedom',
  Capricorn: 'Learning to rest without losing ambition',
  Aquarius: 'Learning intimacy without losing individuality',
  Pisces: 'Learning boundaries without losing compassion',
};

const CORE_WOUND: Record<string, string> = {
  Aries: 'The wound of identity — "Am I enough without proving it?"',
  Taurus: 'The wound of worth — "Am I valuable without possessing?"',
  Gemini: 'The wound of voice — "Will I be heard if I go deeper?"',
  Cancer: 'The wound of belonging — "Am I safe without controlling the nest?"',
  Leo: 'The wound of recognition — "Am I loved without performing?"',
  Virgo: 'The wound of perfection — "Am I acceptable as I am?"',
  Libra: 'The wound of peace — "Am I whole without another?"',
  Scorpio: 'The wound of betrayal — "Can I surrender without being destroyed?"',
  Sagittarius: 'The wound of meaning — "Is there truth worth staying for?"',
  Capricorn: 'The wound of failure — "Am I worthy without achievement?"',
  Aquarius: 'The wound of belonging — "Can I be part without losing myself?"',
  Pisces: 'The wound of separation — "Am I real without dissolving?"',
};

const GIFT_TO_WORLD: Record<string, string> = {
  Aries: 'The courage to begin what no one else will',
  Taurus: 'The patience to build what truly lasts',
  Gemini: 'The intelligence to translate between worlds',
  Cancer: 'The capacity to create emotional safety for others',
  Leo: 'The warmth that gives others permission to shine',
  Virgo: 'The devotion that elevates everything it touches',
  Libra: 'The grace that makes beauty from discord',
  Scorpio: 'The depth that refuses comfortable lies',
  Sagittarius: 'The vision that expands what feels possible',
  Capricorn: 'The discipline that turns dreams into structures',
  Aquarius: 'The originality that frees the collective from convention',
  Pisces: 'The compassion that reminds us we are one',
};

function findPlanet(chart: ChartData, name: string): PlanetPosition | undefined {
  return chart.planets.find(p => p.name === name);
}

function getDominantElement(chart: ChartData): string {
  const counts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const personal = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  for (const p of chart.planets) {
    if (personal.includes(p.name)) {
      const el = ELEMENT_MAP[p.sign];
      if (el) counts[el]++;
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function getDominantModality(chart: ChartData): string {
  const counts: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  const personal = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  for (const p of chart.planets) {
    if (personal.includes(p.name)) {
      const mod = MODALITY_MAP[p.sign];
      if (mod) counts[mod]++;
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function getDominantPlanet(chart: ChartData): string {
  // Simplified: the ruler of the sun sign is the "dominant" planet
  const sunSign = chart.sunSign || 'Leo';
  return RULER_MAP[sunSign] || 'Sun';
}

function getChartRuler(chart: ChartData): string {
  const asc = chart.ascendant || 'Aries';
  const ruler = RULER_MAP[asc] || 'Mars';
  const rulerPlanet = findPlanet(chart, ruler);
  return rulerPlanet ? `${ruler} in ${rulerPlanet.sign}` : ruler;
}

function escapeCSV(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export interface NatalCSVData {
  name: string;
  chart: ChartData;
  report: LunarReport;
}

const CSV_HEADERS = [
  'Name', 'SunSign', 'MoonSign', 'Rising', 'DateRange',
  'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn',
  'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'Chiron',
  'Element', 'Modality', 'DominantPlanet', 'ChartRuler',
  'SoulPurpose', 'ShadowWork', 'LifeLesson', 'CoreWound', 'GiftToWorld',
];

export function generateNatalCSV(data: NatalCSVData): string {
  const { chart, report } = data;
  const name = report.meta.querentName || 'Unknown';
  const sunSign = chart.sunSign || 'Unknown';
  const moonSign = chart.moonSign || 'Unknown';
  const rising = chart.ascendant || 'Unknown';

  // Date range from power days
  const first = report.powerDays[0];
  const last = report.powerDays[report.powerDays.length - 1];
  const dateRange = `${first.monthFull} ${first.day} ${first.year} – ${last.monthFull} ${last.day} ${last.year}`;

  const getPlanetSign = (n: string) => {
    const p = findPlanet(chart, n);
    return p ? `${p.sign} ${p.degree.toFixed(1)}°${p.isRetrograde ? ' ℞' : ''}` : 'N/A';
  };

  // Interpretive fields keyed on Sun sign
  const element = getDominantElement(chart);
  const modality = getDominantModality(chart);
  const dominantPlanet = getDominantPlanet(chart);
  const chartRuler = getChartRuler(chart);
  const soulPurpose = SOUL_PURPOSE[sunSign] || '';
  const shadowWork = SHADOW_WORK[sunSign] || '';
  const lifeLesson = LIFE_LESSON[sunSign] || '';
  const coreWound = CORE_WOUND[sunSign] || '';
  const giftToWorld = GIFT_TO_WORLD[sunSign] || '';

  const values = [
    name, sunSign, moonSign, rising, dateRange,
    getPlanetSign('Mercury'), getPlanetSign('Venus'), getPlanetSign('Mars'),
    getPlanetSign('Jupiter'), getPlanetSign('Saturn'),
    getPlanetSign('Uranus'), getPlanetSign('Neptune'), getPlanetSign('Pluto'),
    getPlanetSign('NorthNode'), getPlanetSign('Chiron'),
    element, modality, dominantPlanet, chartRuler,
    soulPurpose, shadowWork, lifeLesson, coreWound, giftToWorld,
  ];

  const headerRow = CSV_HEADERS.join(',');
  const dataRow = values.map(escapeCSV).join(',');
  return `${headerRow}\n${dataRow}\n`;
}

export function downloadNatalCSV(data: NatalCSVData): void {
  const csv = generateNatalCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Moontuner_Natal_Chart_${data.report.meta.birthDate}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
