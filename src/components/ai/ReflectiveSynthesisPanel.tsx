/**
 * ReflectiveSynthesisPanel
 *
 * Displays the AI reflective synthesis on the Dashboard.
 * Shows recurring themes, emotional cycles, momentum note,
 * timing observation, and a surfaced intention.
 *
 * Gated behind ai_synthesis_enabled preference.
 * Clearly labeled as AI synthesis output.
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useAISynthesis } from '@/hooks/useAISynthesis';
import { AILabel } from './AILabel';

interface ReflectiveSynthesisPanelProps {
  lunarPhase: string;
}

function SynthesisSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-3 w-48 rounded" style={{ background: 'hsl(22 12% 14%)' }} />
      <div className="h-3 w-full rounded" style={{ background: 'hsl(22 12% 12%)' }} />
      <div className="h-3 w-3/4 rounded" style={{ background: 'hsl(22 12% 12%)' }} />
      <div className="h-3 w-5/6 rounded" style={{ background: 'hsl(22 12% 12%)' }} />
    </div>
  );
}

export function ReflectiveSynthesisPanel({
  lunarPhase,
}: ReflectiveSynthesisPanelProps) {
  const { synthesis, status, cached, fetchSynthesis } = useAISynthesis();

  useEffect(() => {
    if (status === 'idle') {
      fetchSynthesis(lunarPhase);
    }
  }, [status, lunarPhase, fetchSynthesis]);

  if (status === 'disabled') return null;

  return (
    <div
      className="rounded-xl border p-6 lg:p-8"
      style={{
        background: 'hsl(22 12% 8%)',
        borderColor: 'hsl(22 12% 15%)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Sparkles
            className="w-4 h-4 shrink-0"
            style={{ color: 'hsl(38 90% 58% / 0.6)' }}
          />
          <div>
            <p
              className="font-serif text-base"
              style={{ color: 'hsl(40 18% 82%)' }}
            >
              Pattern Synthesis
            </p>
            <AILabel cached={cached} className="mt-0.5" />
          </div>
        </div>

        {status === 'ready' && (
          <button
            onClick={() => fetchSynthesis(lunarPhase, true)}
            className="p-1.5 rounded-sm transition-colors"
            style={{ color: 'hsl(40 12% 36%)' }}
            title="Refresh synthesis"
            aria-label="Refresh AI synthesis"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      {status === 'loading' && <SynthesisSkeleton />}

      {status === 'error' && (
        <p
          className="text-sm"
          style={{ color: 'hsl(40 12% 42%)' }}
        >
          Synthesis unavailable right now.{' '}
          <button
            onClick={() => fetchSynthesis(lunarPhase)}
            className="underline underline-offset-2 transition-colors hover:text-amber-200/70"
          >
            Try again
          </button>
        </p>
      )}

      {status === 'ready' && synthesis && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-6"
        >
          {/* Recurring themes */}
          {synthesis.recurringThemes.length > 0 && (
            <div>
              <p
                className="text-[0.58rem] tracking-[0.24em] uppercase mb-3"
                style={{ color: 'hsl(40 12% 38%)' }}
              >
                Recurring Themes
              </p>
              <ul className="space-y-2">
                {synthesis.recurringThemes.map((theme, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.65] pl-3 border-l"
                    style={{
                      color: 'hsl(40 12% 58%)',
                      borderColor: 'hsl(38 90% 58% / 0.2)',
                    }}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Momentum note */}
          {synthesis.momentumNote && (
            <div>
              <p
                className="text-[0.58rem] tracking-[0.24em] uppercase mb-3"
                style={{ color: 'hsl(40 12% 38%)' }}
              >
                Momentum
              </p>
              <p
                className="text-sm leading-[1.7]"
                style={{ color: 'hsl(40 12% 58%)' }}
              >
                {synthesis.momentumNote}
              </p>
            </div>
          )}

          {/* Timing observation */}
          {synthesis.timingObservation && (
            <div>
              <p
                className="text-[0.58rem] tracking-[0.24em] uppercase mb-3"
                style={{ color: 'hsl(40 12% 38%)' }}
              >
                Timing
              </p>
              <p
                className="text-sm leading-[1.7] italic"
                style={{ color: 'hsl(40 12% 52%)' }}
              >
                {synthesis.timingObservation}
              </p>
            </div>
          )}

          {/* Emotional cycles */}
          {synthesis.emotionalCycles.length > 0 && (
            <div>
              <p
                className="text-[0.58rem] tracking-[0.24em] uppercase mb-3"
                style={{ color: 'hsl(40 12% 38%)' }}
              >
                Emotional Patterns
              </p>
              <ul className="space-y-2">
                {synthesis.emotionalCycles.map((cycle, i) => (
                  <li
                    key={i}
                    className="text-sm leading-[1.65]"
                    style={{ color: 'hsl(40 12% 52%)' }}
                  >
                    {cycle}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Surfaced intention */}
          {synthesis.surfacedIntention && (
            <div
              className="p-4 rounded-lg"
              style={{
                background: 'hsl(38 90% 58% / 0.05)',
                borderLeft: '2px solid hsl(38 90% 58% / 0.25)',
              }}
            >
              <p
                className="text-[0.58rem] tracking-[0.22em] uppercase mb-2"
                style={{ color: 'hsl(38 90% 58% / 0.55)' }}
              >
                Worth Revisiting
              </p>
              <p
                className="text-sm leading-[1.7]"
                style={{ color: 'hsl(40 18% 72%)' }}
              >
                {synthesis.surfacedIntention}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
