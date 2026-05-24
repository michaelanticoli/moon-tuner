import { supabase } from "@/integrations/supabase/client";

/**
 * Client helpers for the quantum-api edge function, which proxies the
 * Quantumelodics unified API (Swiss Ephemeris + 24-mode harmonic system).
 *
 * Flow:
 *   1. quantumNatalChart(birth)       -> chart
 *   2. quantumHarmonicAnalysis(chart) -> analysis (modes, tension, BPM, timbres)
 *   3. quantumGenerateMidi(analysis)  -> { midi_base64 } (also: downloadMidi helper)
 */

const FN = "quantum-api";

export interface BirthInput {
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM 24h */
  time: string;
  /** Either supply lat/lon directly, or a location string to geocode server-side */
  location?: string;
  latitude?: number;
  longitude?: number;
  /** IANA tz string or numeric UTC offset; falls back to longitude-derived */
  timezone?: string | number;
}

export interface QuantumChart {
  sun_sign: string;
  moon_sign: string;
  rising_sign: string;
  positions: Record<string, { name: string; lon: number; lat: number; distance: number }>;
  aspects: Array<{
    planet_a: string;
    planet_b: string;
    aspect: string;
    angle: number;
    orb: number;
  }>;
}

export interface QuantumAnalysis {
  primary_pentatonic_mode: string;
  primary_quadratonic_mode: string;
  harmonic_tension_index: number;
  dominant_element: string;
  recommended_tempo_bpm: number;
  waveform: string;
  timbres: string[];
  mode_details: {
    pentatonic: Record<string, unknown>;
    quadratonic: Record<string, unknown>;
  };
}

async function call<T>(action: string, body?: unknown): Promise<T> {
  const { data, error } = await supabase.functions.invoke(`${FN}/${action}`, {
    body,
  });
  if (error) throw new Error(error.message);
  if (data && typeof data === "object" && "success" in data && data.success === false) {
    throw new Error((data as { error?: string }).error ?? "Quantum API error");
  }
  return data as T;
}

export async function quantumNatalChart(birth: BirthInput) {
  const r = await call<{ success: true; chart: QuantumChart }>("natal-chart", birth);
  return r.chart;
}

export async function quantumHarmonicAnalysis(chart: QuantumChart) {
  const r = await call<{ success: true; analysis: QuantumAnalysis }>("harmonic-analysis", { chart });
  return r.analysis;
}

export async function quantumGenerateMidi(analysis: QuantumAnalysis, chartName = "natal_chart") {
  return call<{ success: true; midi_base64: string; filename?: string }>("generate-midi", {
    analysis,
    chart_name: chartName,
  });
}

export async function quantumHealth() {
  return call<{ status: string; version?: string; service?: string }>("health");
}

/** Convenience: generate MIDI and trigger a browser download. */
export async function downloadNatalMidi(analysis: QuantumAnalysis, name = "natal_chart") {
  const r = await quantumGenerateMidi(analysis, name);
  const bin = atob(r.midi_base64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  const blob = new Blob([buf], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (r.filename ?? `${name.replace(/\s+/g, "_")}_natal.mid`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
