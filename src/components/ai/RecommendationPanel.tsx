/**
 * RecommendationPanel
 *
 * Displays gentle, contextually aware recommendations from the
 * recommend-next engine. Each recommendation can be dismissed.
 * Shown on the Dashboard for authenticated users.
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { AILabel } from './AILabel';

interface RecommendationPanelProps {
  lunarPhase: string;
}

const TYPE_LABELS: Record<string, string> = {
  revisit_proposal: 'Proposal',
  reread_reflection: 'Reflection',
  perform_ritual: 'Ritual',
  shift_directive: 'Directive',
  revisit_workbook: 'Workbook',
  hold_space: 'Pause',
  begin_reflection: 'Write',
};

export function RecommendationPanel({ lunarPhase }: RecommendationPanelProps) {
  const { recommendations, status, cached, fetchRecommendations, dismiss } =
    useRecommendations();

  useEffect(() => {
    if (status === 'idle') {
      fetchRecommendations(lunarPhase);
    }
  }, [status, lunarPhase, fetchRecommendations]);

  if (status === 'disabled' || status === 'error') return null;
  if (status === 'idle') return null;
  if (status === 'ready' && recommendations.length === 0) return null;

  return (
    <div className="mb-10">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-4">
        <p
          className="text-[0.6rem] tracking-[0.24em] uppercase font-sans"
          style={{ color: 'hsl(40 12% 36%)' }}
        >
          Gentle Nudges
        </p>
        <AILabel cached={cached} />
      </div>

      {status === 'loading' && (
        <div className="grid sm:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-lg animate-pulse"
              style={{ background: 'hsl(22 12% 9%)' }}
            />
          ))}
        </div>
      )}

      {status === 'ready' && (
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={`${rec.type}-${i}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="relative group rounded-lg border p-4"
                style={{
                  background: 'hsl(22 12% 8.5%)',
                  borderColor: 'hsl(22 12% 15%)',
                }}
              >
                {/* Dismiss */}
                <button
                  onClick={() => dismiss(i)}
                  className="absolute top-3 right-3 p-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'hsl(40 12% 36%)' }}
                  aria-label="Dismiss recommendation"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Type tag */}
                <p
                  className="text-[0.54rem] tracking-[0.2em] uppercase mb-2 font-sans"
                  style={{ color: 'hsl(38 90% 58% / 0.45)' }}
                >
                  {TYPE_LABELS[rec.type] ?? rec.type}
                </p>

                {/* Title */}
                <p
                  className="font-serif text-sm leading-snug mb-2"
                  style={{ color: 'hsl(40 18% 78%)' }}
                >
                  {rec.title}
                </p>

                {/* Rationale */}
                <p
                  className="text-[0.68rem] leading-[1.55] mb-3"
                  style={{ color: 'hsl(40 12% 44%)' }}
                >
                  {rec.rationale}
                </p>

                {/* Action */}
                <p
                  className="text-[0.65rem] leading-[1.5] flex items-start gap-1.5"
                  style={{ color: 'hsl(40 12% 52%)' }}
                >
                  <ArrowRight
                    className="w-3 h-3 mt-0.5 shrink-0"
                    style={{ color: 'hsl(38 90% 58% / 0.4)' }}
                  />
                  {rec.action}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
