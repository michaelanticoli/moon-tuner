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

  const run = useCallback(async (input: BirthInput) => {
    setLoading(true);
    setError(null);
    setChart(null);
    setAnalysis(null);
    try {
      const c = await quantumNatalChart(input);
      setChart(c);
      const a = await quantumHarmonicAnalysis(c);
      setAnalysis(a);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to compute signature");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-run if birth is complete and we aren't forcing the form
  useEffect(() => {
    if (!forceForm && isComplete(birth)) {
      run(birth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth?.date, birth?.time, birth?.location, birth?.latitude, birth?.longitude]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete(form)) {
      setError("Date, time, and location are required.");
      return;
    }
    run(form);
  };

  const handleDownloadMidi = async () => {
    if (!analysis) return;
    setMidiLoading(true);
    setError(null);
    try {
      await downloadNatalMidi(analysis, chartName ?? birth?.name ?? "natal_chart");
    } catch (e) {
      setError(e instanceof Error ? e.message : "MIDI generation failed");
    } finally {
      setMidiLoading(false);
    }
  };

  const showForm = forceForm || !isComplete(birth);

  return (
    <section
      className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--background) / 0.4) 0%, hsl(var(--card) / 0.3) 100%)",
      }}
    >
      {/* Gold accent rail */}
      <div
        className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.6), transparent)",
        }}
      />

      <div className="pl-4">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="system-label text-accent">Quantum Signature · Live</span>
        </div>
        <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-3 leading-tight">
          {heading}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {subheading}
        </p>

        {/* ── Inline form (only when birth incomplete) ─────────────── */}
        {showForm && !analysis && (
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="system-label block mb-2">Birth Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="system-label block mb-2">Birth Time</label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="system-label block mb-2">Location</label>
              <Input
                type="text"
                placeholder="City, Country"
                value={form.location ?? ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div className="sm:col-span-3 flex justify-end pt-2">
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Computing…
                  </>
                ) : (
                  <>Compute Signature</>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* ── Loading (auto-run) ─────────────────────────────────── */}
        {loading && !showForm && (
          <div className="flex items-center gap-3 text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
            <span className="text-sm">Calculating ephemeris and running 24-mode analysis…</span>
          </div>
        )}

        {/* ── Error ──────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 mb-6">
            <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80">{error}</p>
          </div>
        )}

        {/* ── Result ────────────────────────────────────────────── */}
        {analysis && chart && (
          <div className="space-y-8">
            {/* Identity row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 pb-6 border-b border-border/40">
              {[
                { label: "Sun", value: chart.sun_sign },
                { label: "Moon", value: chart.moon_sign },
                { label: "Rising", value: chart.rising_sign },
              ].map((it) => (
                <div key={it.label} className="flex items-center gap-2">
                  <span className="system-label">{it.label}</span>
                  <span className="w-4 h-px bg-border" />
                  <span className="text-foreground font-sans text-sm tracking-wide">
                    {it.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary modes — featured */}
            <div className="grid md:grid-cols-2 gap-px bg-border/40 rounded-lg overflow-hidden">
              <div className="bg-card p-6">
                <span className="system-label block mb-3 text-accent">Pentatonic Mode</span>
                <span className="font-serif text-2xl text-foreground">
                  {analysis.primary_pentatonic_mode}
                </span>
              </div>
              <div className="bg-card p-6">
                <span className="system-label block mb-3 text-accent">Quadratonic Mode</span>
                <span className="font-serif text-2xl text-foreground">
                  {analysis.primary_quadratonic_mode}
                </span>
              </div>
            </div>

            {/* Tension index — bar + value */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="system-label">Harmonic Tension Index</span>
                <span className="font-serif text-xl text-foreground">
                  {analysis.harmonic_tension_index.toFixed(2)}
                </span>
              </div>
              <div className="h-[3px] w-full bg-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, Math.max(0, analysis.harmonic_tension_index * 10))}%`,
                    background:
                      "linear-gradient(90deg, hsl(var(--accent) / 0.8), hsl(45 70% 55% / 0.9))",
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Higher tension indicates a more dynamically charged chart — fuel for transformation,
                not a problem to solve.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-lg overflow-hidden">
              {[
                { label: "Element", value: analysis.dominant_element },
                { label: "Tempo", value: `${analysis.recommended_tempo_bpm}`, unit: "BPM" },
                { label: "Waveform", value: analysis.waveform },
                { label: "Voices", value: `${analysis.timbres.length}` },
              ].map((it) => (
                <div key={it.label} className="bg-card p-5 text-center">
                  <span className="system-label block mb-2">{it.label}</span>
                  <span className="font-serif text-lg text-foreground">{it.value}</span>
                  {it.unit && (
                    <span className="text-xs text-muted-foreground ml-1">{it.unit}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Timbres */}
            {analysis.timbres.length > 0 && (
              <div>
                <span className="system-label block mb-3">Recommended Timbres</span>
                <div className="flex flex-wrap gap-2">
                  {analysis.timbres.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full border border-accent/30 text-foreground/80 bg-accent/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-border/40">
              <Button
                onClick={handleDownloadMidi}
                disabled={midiLoading}
                variant="gold"
                size="sm"
              >
                {midiLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    Composing…
                  </>
                ) : (
                  <>
                    <Music className="w-3.5 h-3.5 mr-2" />
                    Download Natal MIDI
                  </>
                )}
              </Button>
              {showForm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnalysis(null);
                    setChart(null);
                  }}
                >
                  Re-enter Birth Data
                </Button>
              )}
              <a
                href="https://github.com/michaelanticoli/Quantumelodics"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors self-center"
              >
                <Download className="w-3 h-3 inline mr-1.5" />
                24-Mode Engine
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
