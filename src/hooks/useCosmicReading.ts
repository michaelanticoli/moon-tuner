import { useState, useCallback } from 'react';
import type { BirthData, ChartData, CosmicReading } from '@/types/astrology';
import { chartToScore } from '@/utils/chartToScore';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const signModes: Record<string, string> = {
  Aries: 'A Phrygian', Taurus: 'F Ionian', Gemini: 'G Mixolydian', Cancer: 'A Aeolian',
  Leo: 'D Lydian', Virgo: 'D Dorian', Libra: 'Bb Ionian', Scorpio: 'B Locrian',
  Sagittarius: 'E Mixolydian', Capricorn: 'C Dorian', Aquarius: 'F# Lydian', Pisces: 'E Phrygian',
};

export function useCosmicReading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<CosmicReading | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'geocoding' | 'calculating' | 'generating' | 'complete'>('idle');

  const generateReading = useCallback(async (birthData: BirthData) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      setStage('geocoding');
      setProgress(5);
      await new Promise(r => setTimeout(r, 300));
      setProgress(15);

      setStage('calculating');
      setProgress(25);

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
        const errorData = await chartResponse.json();
        throw new Error(errorData.error || 'Failed to calculate birth chart');
      }

      const chart: ChartData = await chartResponse.json();
      setProgress(50);

      setStage('generating');
      setProgress(60);

      let url: string | null = null;
      try {
        const score = chartToScore(chart);
        setProgress(70);

        // Lazy-load Tone.js for audio rendering
        const { renderScoreToAudioUrl } = await import('@/utils/tonePlayer');
        url = await renderScoreToAudioUrl(score);
        setProgress(90);
      } catch (audioErr) {
        console.warn('Audio render failed:', audioErr);
        setProgress(90);
      }

      setAudioUrl(url);
      setProgress(100);

      const musicalMode = signModes[chart.sunSign] || 'D Dorian';

      const cosmicReading: CosmicReading = {
        birthData,
        chartData: chart,
        audioUrl: url ?? undefined,
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
    setError(null);
    setReading(null);
    setProgress(0);
    setStage('idle');
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  }, [audioUrl]);

  return { loading, error, reading, audioUrl, audioSource: 'tone' as const, progress, stage, generateReading, reset };
}
