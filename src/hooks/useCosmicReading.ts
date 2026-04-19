import { useState, useCallback } from 'react';
import type { BirthData, ChartData, CosmicReading } from '@/types/astrology';
import { chartToScore } from '@/utils/chartToScore';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const signModes: Record<string, string> = {
  Aries: 'A Phrygian', Taurus: 'F Ionian', Gemini: 'G Mixolydian', Cancer: 'A Aeolian',
  Leo: 'D Lydian', Virgo: 'D Dorian', Libra: 'Bb Ionian', Scorpio: 'B Locrian',
  Sagittarius: 'E Mixolydian', Capricorn: 'C Dorian', Aquarius: 'F# Lydian', Pisces: 'E Phrygian',
};

// Fallback chart for when the edge function is unavailable
function buildFallbackChart(birthData: BirthData): ChartData {
  // Simple deterministic fallback based on birth date
  const [year, month, day] = birthData.date.split('-').map(Number);
  const [hour] = birthData.time.split(':').map(Number);

  const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const symbols: Record<string, string> = { Sun: '\u2609', Moon: '\u263D', Mercury: '\u263F', Venus: '\u2640', Mars: '\u2642', Jupiter: '\u2643', Saturn: '\u2644', Uranus: '\u2645', Neptune: '\u2646', Pluto: '\u2647', Ascendant: 'Asc' };

  // Rough sun sign from month/day
  const sunDegree = ((month - 1) * 30 + day) % 360;
  const moonOffset = ((day * 13 + hour * 0.5 + year % 100) * 12.2) % 360;

  const makePlanet = (name: string, degreeOffset: number) => {
    const degree = ((sunDegree + degreeOffset) % 360 + 360) % 360;
    const signNumber = Math.floor(degree / 30) + 1;
    return { name, symbol: symbols[name] || '?', degree, sign: signNames[signNumber - 1], signNumber, isRetrograde: false };
  };

  const planets = [
    makePlanet('Sun', 0),
    makePlanet('Moon', moonOffset),
    makePlanet('Mercury', (day * 3.7) % 60 - 30),
    makePlanet('Venus', (day * 5.1 + month * 12) % 90 - 45),
    makePlanet('Mars', (year % 100) * 3.6),
    makePlanet('Jupiter', (year % 12) * 30),
    makePlanet('Saturn', ((year - 1960) % 29) * 12.4),
    makePlanet('Uranus', ((year - 1940) % 84) * 4.3),
    makePlanet('Neptune', ((year - 1940) % 165) * 2.2),
    makePlanet('Pluto', ((year - 1940) % 248) * 1.45),
    makePlanet('Ascendant', (hour * 15 + (month * 30)) % 360),
  ];

  return {
    planets,
    sunSign: planets[0].sign,
    moonSign: planets[1].sign,
    ascendant: planets[10].sign,
    source: 'approximate-fallback',
  };
}

export function useCosmicReading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<CosmicReading | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'geocoding' | 'calculating' | 'generating' | 'complete'>('idle');

  const generateAudio = useCallback(async (chart: ChartData) => {
    if (audioLoading) return null;

    setAudioLoading(true);
    setAudioError(null);
    setStage('generating');
    setProgress(70);

    try {
      const score = chartToScore(chart);
      const { renderScoreToAudioUrl } = await import('@/utils/tonePlayer');
      const url = await Promise.race<string>([
        renderScoreToAudioUrl(score),
        new Promise<string>((_, reject) => window.setTimeout(() => reject(new Error('Audio rendering timed out.')), 15000)),
      ]);
      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setProgress(100);
      setStage('complete');
      return url;
    } catch (audioErr) {
      console.warn('Audio render failed, continuing without audio:', audioErr);
      setAudioError('Audio rendering is temporarily unavailable, but your full report is ready now.');
      setProgress(100);
      setStage('complete');
      return null;
    } finally {
      setAudioLoading(false);
    }
  }, [audioLoading]);

  const generateReading = useCallback(async (birthData: BirthData) => {
    setLoading(true);
    setError(null);
    setAudioError(null);
    setProgress(0);
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    try {
      setStage('geocoding');
      setProgress(10);

      setStage('calculating');
      setProgress(25);

      let chart: ChartData;
      try {
        const chartResponse = await fetch(`${SUPABASE_URL}/functions/v1/calculate-chart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: birthData.date,
            time: birthData.time,
            location: birthData.location,
          }),
        });

        if (!chartResponse.ok) {
          throw new Error('Chart service unavailable');
        }

        chart = await chartResponse.json();
      } catch (chartErr) {
        console.warn('Chart edge function failed, using fallback:', chartErr);
        chart = buildFallbackChart(birthData);
      }

      // Validate chart has required fields
      if (!chart.planets || chart.planets.length === 0) {
        chart = buildFallbackChart(birthData);
      }
      if (!chart.sunSign) chart.sunSign = chart.planets.find(p => p.name === 'Sun')?.sign || 'Leo';
      if (!chart.moonSign) chart.moonSign = chart.planets.find(p => p.name === 'Moon')?.sign || 'Cancer';
      if (!chart.ascendant) chart.ascendant = chart.planets.find(p => p.name === 'Ascendant')?.sign || 'Aries';

      setProgress(50);
      setStage('complete');
      setProgress(100);

      const musicalMode = signModes[chart.sunSign] || 'D Dorian';

      const cosmicReading: CosmicReading = {
        birthData,
        chartData: chart,
        musicalMode,
        audioSource: 'tone',
      };

      setReading(cosmicReading);
      setStage('complete');
      return cosmicReading;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setAudioLoading(false);
    setError(null);
    setAudioError(null);
    setReading(null);
    setProgress(0);
    setStage('idle');
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  }, [audioUrl]);

  return {
    loading,
    error,
    reading,
    audioUrl,
    audioSource: 'tone' as const,
    audioLoading,
    audioError,
    progress,
    stage,
    generateReading,
    generateAudio,
    reset,
  };
}
