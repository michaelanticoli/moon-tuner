import { supabase } from "@/integrations/supabase/client";

/**
 * Client helpers for the quantum-api edge function, which proxies the
 * Quantumelodics unified API (Swiss Ephemeris + 24-mode harmonic system).
 *
 * Three-step flow:
 *   1. natalChart(birth)        -> chart
 *   2. harmonicAnalysis(chart)  -> analysis (modes, tension, BPM, timbres)
 *   3. generateMidi(analysis)   -> { midi_base64 }
 */

const FN = "quantum-api";

export interface BirthData {
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM in 24h */
  time: string;
  latitude: number;
  longitude: number;
  /** IANA timezone, e.g. "America/New_York" */
  timezone: string;
}

export interface QuantumChart {
  sun_sign: string;
  moon_sign: string;
  rising_sign: string;
  positions: Record<string, unknown>;
  aspects: unknown[];
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

export async function quantumNatalChart(birth: BirthData) {
  const r = await call<{ success: true; chart: QuantumChart }>(
    "natal-chart",
    birth,
  );
  return r.chart;
}

export async function quantumHarmonicAnalysis(chart: QuantumChart) {
  const r = await call<{ success: true; analysis: QuantumAnalysis }>(
    "harmonic-analysis",
    { chart },
  );
  return r.analysis;
}

export async function quantumGenerateMidi(
  analysis: QuantumAnalysis,
  chartName = "natal_chart",
) {
  return call<{ success: true; midi_base64: string }>("generate-midi", {
    analysis,
    chart_name: chartName,
  });
}

export async function quantumHealth() {
  return call<{ status: string; version?: string; service?: string }>("health");
}
