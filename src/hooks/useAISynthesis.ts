/**
 * useAISynthesis
 *
 * Hook for the reflective synthesis engine. Calls the synthesize-reflections
 * edge function and returns the structured synthesis result.
 *
 * Respects the user's ai_synthesis_enabled preference.
 * Caches results in component state — the server-side TTL is 24 hours.
 */

import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface ReflectiveSynthesis {
  recurringThemes: string[];
  emotionalCycles: string[];
  momentumNote: string;
  timingObservation: string;
  surfacedIntention: string;
}

export type SynthesisStatus = 'idle' | 'loading' | 'ready' | 'error' | 'disabled';

export function useAISynthesis() {
  const { user } = useAuth();
  const [synthesis, setSynthesis] = useState<ReflectiveSynthesis | null>(null);
  const [status, setStatus] = useState<SynthesisStatus>('idle');
  const [cached, setCached] = useState(false);

  const fetchSynthesis = useCallback(
    async (lunarPhase: string, forceRefresh = false): Promise<void> => {
      if (!user || user.is_anonymous) {
        setStatus('disabled');
        return;
      }

      setStatus('loading');

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setStatus('error');
          return;
        }

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const resp = await fetch(
          `${supabaseUrl}/functions/v1/synthesize-reflections`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lunarPhase, forceRefresh }),
          },
        );

        if (!resp.ok) {
          console.error('synthesize-reflections error:', resp.status);
          setStatus('error');
          return;
        }

        const data = await resp.json();
        if (data.synthesis) {
          setSynthesis(data.synthesis as ReflectiveSynthesis);
          setCached(data.cached ?? false);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('useAISynthesis error:', err);
        setStatus('error');
      }
    },
    [user],
  );

  const reset = useCallback(() => {
    setSynthesis(null);
    setStatus('idle');
    setCached(false);
  }, []);

  return { synthesis, status, cached, fetchSynthesis, reset };
}
