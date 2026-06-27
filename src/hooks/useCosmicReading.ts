import { useState, useCallback } from 'react';
import type { BirthData, ChartData, CosmicReading } from '@/types/astrology';
import { chartToScore } from '@/utils/chartToScore';
import { supabase } from '@/integrations/supabase/client';

const AUDIO_RENDER_TIMEOUT_MS = 15000;


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
        new Promise<string>((_, reject) =>
          window.setTimeout(() => reject(new Error('Audio rendering timed out.')), AUDIO_RENDER_TIMEOUT_MS)
        ),
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
      const invokeChart = async () => {
        const { data, error: fnError } = await supabase.functions.invoke('calculate-chart', {
          body: {
            date: birthData.date,
            time: birthData.time,
            location: birthData.location,
          },
        });
        if (fnError) throw new Error(fnError.message || 'Chart service unavailable');
        if (!data || (data as { error?: string }).error) {
          throw new Error((data as { error?: string })?.error || 'Empty chart response');
        }
        return data as ChartData;
      };

      try {
        chart = await invokeChart();
      } catch (firstErr) {
        console.warn('Chart calc failed, retrying once:', firstErr);
        await new Promise((r) => setTimeout(r, 800));
        // Second attempt — let this throw so the error surfaces to the user
        // rather than silently returning an approximate chart.
        chart = await invokeChart();
      }

      // Validate chart payload integrity: require at least 10 planets, valid
      // degree values, and the three required placements (Sun, Moon, Ascendant).
      // A truncated or corrupt response must not be silently used.
      const MIN_PLANETS = 10;
      if (!chart.planets || chart.planets.length < MIN_PLANETS) {
        throw new Error(
          `Chart service returned incomplete data (${chart.planets?.length ?? 0} planets). Please try again.`
        );
      }
      const invalidPlanet = chart.planets.find(
        (p) => typeof p.degree !== 'number' || p.degree < 0 || p.degree >= 360 || !p.sign
      );
      if (invalidPlanet) {
        throw new Error(
          `Chart service returned an invalid placement for ${invalidPlanet.name}. Please try again.`
        );
      }
      const REQUIRED_BODIES = ['Sun', 'Moon', 'Ascendant'] as const;
      for (const name of REQUIRED_BODIES) {
        if (!chart.planets.find(p => p.name === name)) {
          throw new Error(`Chart service did not return a ${name} placement. Please try again.`);
        }
      }
      // These fields may be missing from older edge-function responses; derive them
      // from the planet list rather than defaulting to arbitrary signs.
      if (!chart.sunSign) chart.sunSign = chart.planets.find(p => p.name === 'Sun')!.sign;
      if (!chart.moonSign) chart.moonSign = chart.planets.find(p => p.name === 'Moon')!.sign;
      if (!chart.ascendant) chart.ascendant = chart.planets.find(p => p.name === 'Ascendant')!.sign;

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
