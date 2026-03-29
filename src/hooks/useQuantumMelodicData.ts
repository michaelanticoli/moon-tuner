import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QMPlanet, QMSign, QMAspect, QMHouse, ComputedAspect, QuantumMelodicReading } from '@/types/quantumMelodic';
import type { PlanetPosition } from '@/types/astrology';

export function useQuantumMelodicData() {
  const planetsRef = useRef<QMPlanet[]>([]);
  const signsRef   = useRef<QMSign[]>([]);
  const aspectsRef = useRef<QMAspect[]>([]);
  const housesRef  = useRef<QMHouse[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [dataReady, setDataReady] = useState(false);

  const fetchData = useCallback(async () => {
    if (dataReady) return; // already loaded
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-qm-data');
      if (fnError) throw fnError;

      planetsRef.current = data.planets as QMPlanet[];
      signsRef.current   = data.signs   as QMSign[];
      aspectsRef.current = data.aspects as QMAspect[];
      housesRef.current  = data.houses  as QMHouse[];

      setDataReady(true);
    } catch (err) {
      console.error('Error fetching QM data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load harmonic data');
    } finally {
      setLoading(false);
    }
  }, [dataReady]);

  const getHouseNumber = useCallback((degree: number, ascendantDegree: number): number => {
    const adjusted = ((ascendantDegree - degree) % 360 + 360) % 360;
    return Math.floor(adjusted / 30) + 1;
  }, []);

  const calculateAspects = useCallback((chartPlanets: PlanetPosition[]): ComputedAspect[] => {
    const aspects = aspectsRef.current;
    const computed: ComputedAspect[] = [];
    const relevant = chartPlanets.filter(p => p.name !== 'Ascendant');

    for (let i = 0; i < relevant.length; i++) {
      for (let j = i + 1; j < relevant.length; j++) {
        let angle = Math.abs(relevant[i].degree - relevant[j].degree);
        if (angle > 180) angle = 360 - angle;

        for (const aspect of aspects) {
          const orb = Math.abs(angle - aspect.angle);
          if (orb <= aspect.orb) {
            computed.push({ planet1: relevant[i].name, planet2: relevant[j].name, aspectType: aspect, exactAngle: angle, orb });
            break;
          }
        }
      }
    }
    return computed;
  }, []);

  const buildReading = useCallback((chartPlanets: PlanetPosition[]): QuantumMelodicReading | null => {
    const planets = planetsRef.current;
    const signs   = signsRef.current;
    const houses  = housesRef.current;

    if (!planets.length || !signs.length || !aspectsRef.current.length || !houses.length) return null;

    const ascendant = chartPlanets.find(p => p.name === 'Ascendant');
    const ascDegree = ascendant?.degree || 0;

    const enriched = chartPlanets.map(pos => ({
      position: pos,
      qmData: planets.find(p => p.name === pos.name) || null,
      signData: signs.find(s => s.name === pos.sign) || null,
      houseNumber: getHouseNumber(pos.degree, ascDegree),
      houseData: houses.find(h => h.number === getHouseNumber(pos.degree, ascDegree)) || null,
    }));

    const computedAspects = calculateAspects(chartPlanets);

    const elementCounts: Record<string, number> = {};
    enriched.forEach(p => {
      if (p.signData?.element) elementCounts[p.signData.element] = (elementCounts[p.signData.element] || 0) + 1;
    });
    const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Fire';

    const modalityCounts: Record<string, number> = {};
    enriched.forEach(p => {
      if (p.signData?.modality) modalityCounts[p.signData.modality] = (modalityCounts[p.signData.modality] || 0) + 1;
    });
    const dominantModality = Object.entries(modalityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Cardinal';

    const sunPlanet = enriched.find(p => p.position.name === 'Sun');
    const overallKey = sunPlanet?.signData?.key_signature || 'C major';
    const sig = enriched.filter(p => ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'].includes(p.position.name));
    const avgTempo = sig.reduce((sum, p) => sum + (p.signData?.tempo_bpm || 90), 0) / Math.max(sig.length, 1);

    return { planets: enriched, aspects: computedAspects, dominantElement, dominantModality, overallKey, overallTempo: Math.round(avgTempo) };
  }, [calculateAspects, getHouseNumber]);

  return { loading, error, dataReady, fetchData, calculateAspects, getHouseNumber, buildReading };
}
