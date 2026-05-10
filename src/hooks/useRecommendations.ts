/**
 * useRecommendations
 *
 * Hook for the gentle recommendation engine. Calls recommend-next
 * and returns contextually appropriate suggestions for the user's
 * current state and history.
 *
 * Respects ai_synthesis_enabled preference.
 */

import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface Recommendation {
  type: string;
  title: string;
  rationale: string;
  action: string;
}

export type RecommendationsStatus = 'idle' | 'loading' | 'ready' | 'error' | 'disabled';

export function useRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [status, setStatus] = useState<RecommendationsStatus>('idle');
  const [cached, setCached] = useState(false);

  const fetchRecommendations = useCallback(
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
        const resp = await fetch(`${supabaseUrl}/functions/v1/recommend-next`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lunarPhase, forceRefresh }),
        });

        if (!resp.ok) {
          console.error('recommend-next error:', resp.status);
          setStatus('error');
          return;
        }

        const data = await resp.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations as Recommendation[]);
          setCached(data.cached ?? false);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('useRecommendations error:', err);
        setStatus('error');
      }
    },
    [user],
  );

  const dismiss = useCallback((index: number) => {
    setRecommendations((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reset = useCallback(() => {
    setRecommendations([]);
    setStatus('idle');
    setCached(false);
  }, []);

  return { recommendations, status, cached, fetchRecommendations, dismiss, reset };
}
