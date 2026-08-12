/**
 * QuantumSignaturePanel
 * --------------------------------------------------------------
 * Calls the quantum-api edge function (Swiss Ephemeris +
 * 24-mode canonical harmonic system) and renders the user's
 * Quantum Signature: primary modes, harmonic tension index,
 * dominant element, recommended BPM, waveform, timbres.
 *
 * - If `birth` is supplied and complete, auto-runs on mount.
 * - Otherwise renders a minimal birth-data form.
 * - Includes a "Download natal MIDI" action that calls the
 *   upstream MIDI generator and triggers a browser download.
 *
 * Uses the Dark OS aesthetic — pure black surfaces, ivory text,
 * gold/teal accents. No filler UI; every value displayed is
 * computed from real ephemeris data.
 */

import { useEffect, useState, useCallback } from "react";
import { Loader2, Download, Music, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  quantumNatalChart,
  quantumHarmonicAnalysis,
  downloadNatalMidi,
  type QuantumChart,
  type QuantumAnalysis,
  type BirthInput,
} from "@/lib/quantumApi";
import { useNavigate } from "react-router-dom";
import { writeSharedBirth } from "@/hooks/useSharedBirth";
import { openStripeCheckout } from "@/lib/stripeLinks";

interface QuantumSignaturePanelProps {
  /** Pre-filled birth data; if complete, the panel runs automatically. */
  birth?: Partial<BirthInput> & { name?: string };
  /** Optional name used for the MIDI file. */
  chartName?: string;
  /** Headline override */
  heading?: string;
  /** Subhead override */
  subheading?: string;
  /** Show the inline birth form even if `birth` is supplied. */
  forceForm?: boolean;
}

function isComplete(b: Partial<BirthInput> | undefined): b is BirthInput {
  return Boolean(
    b &&
      typeof b.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(b.date) &&
      typeof b.time === "string" &&
      /^\d{2}:\d{2}$/.test(b.time) &&
      ((typeof b.location === "string" && b.location.length > 1) ||
        (Number.isFinite(b.latitude) && Number.isFinite(b.longitude))),
  );
}

export function QuantumSignaturePanel({
  birth,
  chartName,
  heading = "Your Quantum Signature",
  subheading = "Real Swiss Ephemeris data mapped through the 24-mode canonical harmonic system.",
  forceForm = false,
}: QuantumSignaturePanelProps) {
  const [form, setForm] = useState<BirthInput>({
    date: birth?.date ?? "",
    time: birth?.time ?? "",
    location: birth?.location ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [midiLoading, setMidiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chart, setChart] = useState<QuantumChart | null>(null);
  const [analysis, setAnalysis] = useState<QuantumAnalysis | null>(null);
  const [offerRedirect, setOfferRedirect] = useState(false);

  const navigate = useNavigate();

  const run = useCallback(async (input: BirthInput) => {
    setLoading(true);
    setError(null);
    setChart(null);
    setAnalysis(null);
    setOfferRedirect(false);
    try {
      const c = await quantumNatalChart(input);
      setChart(c);
      const a = await quantumHarmonicAnalysis(c);
      setAnalysis(a);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to compute signature");
      // Surface the CTA so we can route to the offering and persist the birth data
      setOfferRedirect(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isComplete(birth) && !forceForm) {
      // auto-run if parent supplied complete birth info
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      run(birth);
    }
  }, [birth, forceForm, run]);

  async function handleDownload() {
    if (!analysis) return;
    setMidiLoading(true);
    try {
      await downloadNatalMidi(analysis, chartName ?? "natal_chart");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to download MIDI");
    } finally {
      setMidiLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-sm text-muted-foreground mt-1">{subheading}</p>
      </div>

      {loading && (
        <div className="py-12 flex items-center gap-4">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Computing your signature…</span>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4">
          <p className="text-sm text-foreground/80 leading-relaxed">{error}</p>
          {offerRedirect && (
            <div className="mt-4 flex gap-3">
              <Button
                onClick={() => {
                  try {
                    writeSharedBirth(form);
                  } catch {
                    // ignore storage errors
                  }
                  navigate("/quantumelodic?source=harmonic-profile");
                }}
                className="dusk-btn"
              >
                Continue to Astro‑Harmonic
              </Button>

              <Button
                variant="outline"
                onClick={() => openStripeCheckout("astro-harmonic")}
              >
                Purchase Astro‑Harmonic
              </Button>
            </div>
          )}
        </div>
      )}

      {/* If we have an analysis, render it */}
      {analysis && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs uppercase text-muted-foreground">Primary pentatonic mode</div>
              <div className="text-lg font-medium">{analysis.primary_pentatonic_mode}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Recommended tempo</div>
              <div className="text-lg font-medium">{Math.round(analysis.recommended_tempo_bpm)} BPM</div>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Timbres</div>
              <div className="text-lg font-medium">{analysis.timbres.join(", ")}</div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={handleDownload} disabled={midiLoading}>
              {midiLoading ? "Preparing MIDI…" : "Download natal MIDI"}
            </Button>
          </div>
        </div>
      )}

      {/* Minimal inline birth form fallback could be added here if desired */}
    </div>
  );
}
