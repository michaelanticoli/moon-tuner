/**
 * AIProposalAnalysis
 *
 * AI-enhanced proposal analysis displayed after a proposal is submitted
 * in the Spacetime Printer. Provides friction notes, reflective questions,
 * timing posture interpretation, and a suggested next step.
 *
 * Layered on top of the deterministic ProposalEngine — additive, not
 * replacing.
 */

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Loader2, RefreshCw } from 'lucide-react';
import { type ProposalInput } from '@/components/spacetime/ProposalEngine';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { AILabel } from './AILabel';

interface ProposalAnalysis {
  frictionNotes: string[];
  reflectiveQuestions: string[];
  timingPostureNote: string;
  suggestedNextStep: string;
}

type AnalysisStatus = 'idle' | 'loading' | 'ready' | 'error';

interface AIProposalAnalysisProps {
  proposal: ProposalInput;
}

export function AIProposalAnalysis({ proposal }: AIProposalAnalysisProps) {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<ProposalAnalysis | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');

  const runAnalysis = useCallback(async () => {
    if (!user || user.is_anonymous) return;

    setStatus('loading');
    setAnalysis(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setStatus('error');
        return;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const resp = await fetch(`${supabaseUrl}/functions/v1/analyze-proposal`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proposal }),
      });

      if (!resp.ok) {
        console.error('analyze-proposal error:', resp.status);
        setStatus('error');
        return;
      }

      const data = await resp.json();
      if (data.analysis) {
        setAnalysis(data.analysis as ProposalAnalysis);
        setStatus('ready');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('AIProposalAnalysis error:', err);
      setStatus('error');
    }
  }, [user, proposal]);

  useEffect(() => {
    if (status === 'idle') {
      runAnalysis();
    }
  }, [status, runAnalysis]);

  // Don't render if not authenticated
  if (!user || user.is_anonymous) return null;

  return (
    <div
      className="rounded-xl border mt-6"
      style={{
        background: 'hsl(22 12% 8%)',
        borderColor: 'hsl(22 12% 15%)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 px-6 py-4 border-b"
        style={{ borderColor: 'hsl(22 12% 14%)' }}
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: 'hsl(38 90% 58% / 0.5)' }}
          />
          <span
            className="font-serif text-sm"
            style={{ color: 'hsl(40 18% 75%)' }}
          >
            Reflective Analysis
          </span>
          <AILabel />
        </div>
        {status === 'ready' && (
          <button
            onClick={runAnalysis}
            className="p-1 transition-colors"
            style={{ color: 'hsl(40 12% 36%)' }}
            title="Re-run analysis"
            aria-label="Re-run AI analysis"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="p-6">
        {status === 'loading' && (
          <div className="flex items-center gap-3 py-4">
            <Loader2
              className="w-4 h-4 animate-spin shrink-0"
              style={{ color: 'hsl(38 90% 58% / 0.4)' }}
            />
            <p className="text-sm" style={{ color: 'hsl(40 12% 44%)' }}>
              Reading your proposal…
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-2">
            <p className="text-sm" style={{ color: 'hsl(40 12% 44%)' }}>
              Analysis unavailable.{' '}
              <button
                onClick={runAnalysis}
                className="underline underline-offset-2"
                style={{ color: 'hsl(38 90% 58% / 0.6)' }}
              >
                Try again
              </button>
            </p>
          </div>
        )}

        {status === 'ready' && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Friction notes */}
            {analysis.frictionNotes.length > 0 && (
              <div>
                <p
                  className="text-[0.57rem] tracking-[0.22em] uppercase mb-3"
                  style={{ color: 'hsl(40 12% 38%)' }}
                >
                  Friction Notes
                </p>
                <ul className="space-y-2.5">
                  {analysis.frictionNotes.map((note, i) => (
                    <li
                      key={i}
                      className="text-sm leading-[1.65] pl-3 border-l"
                      style={{
                        color: 'hsl(40 12% 55%)',
                        borderColor: 'hsl(22 12% 22%)',
                      }}
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timing posture note */}
            {analysis.timingPostureNote && (
              <div>
                <p
                  className="text-[0.57rem] tracking-[0.22em] uppercase mb-3"
                  style={{ color: 'hsl(40 12% 38%)' }}
                >
                  Timing Posture
                </p>
                <p
                  className="text-sm leading-[1.7]"
                  style={{ color: 'hsl(40 12% 55%)' }}
                >
                  {analysis.timingPostureNote}
                </p>
              </div>
            )}

            {/* Reflective questions */}
            {analysis.reflectiveQuestions.length > 0 && (
              <div>
                <p
                  className="text-[0.57rem] tracking-[0.22em] uppercase mb-3"
                  style={{ color: 'hsl(40 12% 38%)' }}
                >
                  Questions Worth Sitting With
                </p>
                <ul className="space-y-3">
                  {analysis.reflectiveQuestions.map((q, i) => (
                    <li
                      key={i}
                      className="text-sm leading-[1.65] italic"
                      style={{ color: 'hsl(40 18% 64%)' }}
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested next step */}
            {analysis.suggestedNextStep && (
              <div
                className="p-4 rounded-lg"
                style={{
                  background: 'hsl(38 90% 58% / 0.04)',
                  borderLeft: '2px solid hsl(38 90% 58% / 0.2)',
                }}
              >
                <p
                  className="text-[0.57rem] tracking-[0.22em] uppercase mb-2"
                  style={{ color: 'hsl(38 90% 58% / 0.5)' }}
                >
                  Suggested Next Step
                </p>
                <p
                  className="text-sm leading-[1.7]"
                  style={{ color: 'hsl(40 18% 70%)' }}
                >
                  {analysis.suggestedNextStep}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
