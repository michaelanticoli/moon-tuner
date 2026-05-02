// Orchestrates the three deliverables: ElevenLabs MP3, chart PNG, PDF.
// All three run in parallel after a natal_reports row is created.
import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ChartData, BirthData } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";
import { buildElevenLabsPrompt } from "@/utils/buildElevenLabsPrompt";

export interface DeliverableUrls {
  audio?: string;
  pdf?: string;
  chartImage?: string;
}

export interface DeliverableState {
  reportId?: string;
  audioStatus: "idle" | "generating" | "ready" | "failed";
  pdfStatus: "idle" | "generating" | "ready" | "failed";
  chartStatus: "idle" | "generating" | "ready" | "failed";
  audioUrl?: string;
  pdfUrl?: string;
  chartImageUrl?: string;
  error?: string;
}

const initial: DeliverableState = {
  audioStatus: "idle",
  pdfStatus: "idle",
  chartStatus: "idle",
};

export function useCosmicDeliverables() {
  const [state, setState] = useState<DeliverableState>(initial);

  const reset = useCallback(() => setState(initial), []);

  const start = useCallback(
    async (params: {
      email: string;
      birthData: BirthData;
      chart: ChartData;
      qmReading: QuantumMelodicReading | null;
      renderPdfBase64: () => Promise<string>;
      renderChartImageBase64: () => Promise<string>;
    }) => {
      setState({
        audioStatus: "generating",
        pdfStatus: "generating",
        chartStatus: "generating",
      });

      // Step 1: create the report row
      const { data: createData, error: createErr } = await supabase.functions.invoke(
        "create-natal-report",
        {
          body: {
            email: params.email,
            name: params.birthData.name,
            birthDate: params.birthData.date,
            birthTime: params.birthData.time,
            birthLocation: params.birthData.location,
            sunSign: params.chart.sunSign,
            moonSign: params.chart.moonSign,
            ascendant: params.chart.ascendant,
            chartData: params.chart,
          },
        },
      );
      if (createErr || !createData?.reportId) {
        setState((s) => ({ ...s, error: "Could not create report record", audioStatus: "failed", pdfStatus: "failed", chartStatus: "failed" }));
        return;
      }
      const reportId: string = createData.reportId;
      setState((s) => ({ ...s, reportId }));

      // Step 2: in parallel — ElevenLabs music, chart PNG, PDF
      const prompt = buildElevenLabsPrompt(params.chart, params.qmReading);

      // 2a: ElevenLabs music (long-running, ~30-90s)
      const audioJob = supabase.functions
        .invoke("generate-cosmic-symphony", {
          body: { reportId, prompt, durationMs: 120000 },
        })
        .then(({ data, error }) => {
          if (error || !data?.audioUrl) {
            setState((s) => ({ ...s, audioStatus: "failed" }));
            return;
          }
          setState((s) => ({ ...s, audioUrl: data.audioUrl, audioStatus: "ready" }));
        })
        .catch(() => setState((s) => ({ ...s, audioStatus: "failed" })));

      // 2b: chart PNG (rendered client-side, uploaded)
      const chartJob = (async () => {
        try {
          const base64 = await params.renderChartImageBase64();
          const { data, error } = await supabase.functions.invoke("upload-cosmic-asset", {
            body: {
              reportId,
              kind: "chart-image",
              base64,
              contentType: "image/png",
              filename: "natal-chart.png",
            },
          });
          if (error || !data?.url) throw error || new Error("upload failed");
          setState((s) => ({ ...s, chartImageUrl: data.url, chartStatus: "ready" }));
        } catch {
          setState((s) => ({ ...s, chartStatus: "failed" }));
        }
      })();

      // 2c: PDF (rendered client-side, uploaded)
      const pdfJob = (async () => {
        try {
          const base64 = await params.renderPdfBase64();
          const { data, error } = await supabase.functions.invoke("upload-cosmic-asset", {
            body: {
              reportId,
              kind: "pdf",
              base64,
              contentType: "application/pdf",
              filename: "astro-harmonic-report.pdf",
            },
          });
          if (error || !data?.url) throw error || new Error("upload failed");
          setState((s) => ({ ...s, pdfUrl: data.url, pdfStatus: "ready" }));
        } catch {
          setState((s) => ({ ...s, pdfStatus: "failed" }));
        }
      })();

      // Don't block — let UI subscribe to state
      Promise.all([audioJob, chartJob, pdfJob]);
    },
    [],
  );

  return { state, start, reset };
}
