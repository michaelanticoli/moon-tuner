/**
 * JournalAISynthesis
 *
 * Displays an AI-generated synthesis of the user's emotional season
 * based on their journal and timeline activity. Shown at the top of
 * the Journal page for authenticated users.
 *
 * Reads from the synthesis cache — refreshes at most every 24 hours.
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, RefreshCw } from 'lucide-react';
import { useAISynthesis } from '@/hooks/useAISynthesis';
import { useAuth } from '@/contexts/AuthContext';
import { AILabel } from './AILabel';

interface JournalAISynthesisProps {
  lunarPhase: string;
}

export function JournalAISynthesis({ lunarPhase }: JournalAISynthesisProps) {
  const { user } = useAuth();
  const { synthesis, status, cached, fetchSynthesis } = useAISynthesis();

  useEffect(() => {
    if (status === 'idle' && user && !user.is_anonymous) {
      fetchSynthesis(lunarPhase);
    }
  }, [status, user, lunarPhase, fetchSynthesis]);

  // Only show for authenticated users with data
  if (!user || user.is_anonymous) return null;
  if (status === 'loading' || status === 'idle') return null;
  if (status === 'error' || !synthesis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="mx-auto max-w-[1100px] px-6 lg:px-12 pb-10"
    >
      <div
        className="rounded-xl border p-6 lg:p-8"
        style={{
          background: 'hsl(22 12% 8%)',
          borderColor: 'hsl(22 12% 15%)',
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <Layers
              className="w-4 h-4 shrink-0"
              style={{ color: 'hsl(38 90% 58% / 0.5)' }}
            />
            <div>
              <p
                className="font-serif text-sm"
                style={{ color: 'hsl(40 18% 78%)' }}
              >
                Emotional Season
              </p>
              <AILabel cached={cached} className="mt-0.5" />
            </div>
          </div>
          <button
            onClick={() => fetchSynthesis(lunarPhase, true)}
            className="p-1.5 rounded-sm transition-colors shrink-0"
            style={{ color: 'hsl(40 12% 36%)' }}
            title="Refresh synthesis"
            aria-label="Refresh AI synthesis"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Recurring themes */}
          {synthesis.recurringThemes.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-1">
              <p
                className="text-[0.57rem] tracking-[0.22em] uppercase mb-2.5"
                style={{ color: 'hsl(40 12% 36%)' }}
              >
                Recurring Themes
              </p>
              <ul className="space-y-1.5">
                {synthesis.recurringThemes.slice(0, 3).map((theme, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.6]"
                    style={{ color: 'hsl(40 12% 55%)' }}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Surfaced intention */}
          {synthesis.surfacedIntention && (
            <div>
              <p
                className="text-[0.57rem] tracking-[0.22em] uppercase mb-2.5"
                style={{ color: 'hsl(40 12% 36%)' }}
              >
                Worth Revisiting
              </p>
              <p
                className="text-sm leading-[1.65] italic"
                style={{ color: 'hsl(40 18% 62%)' }}
              >
                {synthesis.surfacedIntention}
              </p>
            </div>
          )}

          {/* Momentum note */}
          {synthesis.momentumNote && (
            <div>
              <p
                className="text-[0.57rem] tracking-[0.22em] uppercase mb-2.5"
                style={{ color: 'hsl(40 12% 36%)' }}
              >
                Momentum
              </p>
              <p
                className="text-sm leading-[1.65]"
                style={{ color: 'hsl(40 12% 52%)' }}
              >
                {synthesis.momentumNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
