// Client-side renderers for the chart PNG and the PDF report.
// Both return base64 strings (no data: prefix) ready for upload.
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { CosmicReading } from "@/types/astrology";
import type { QuantumMelodicReading } from "@/types/quantumMelodic";
import { buildSymphonyHTML } from "@/lib/generateSymphonyHTML";

interface HarmonicAnalysis {
  consonance: number;
  tension: number;
  complexity: number;
  elements: Record<string, number>;
}

// Capture the off-screen NatalWheelCard as a high-res PNG.
export async function renderChartImageBase64(node: HTMLElement): Promise<string> {
  const canvas = await html2canvas(node, {
    backgroundColor: "#F9F7F4",
    scale: 2,
    useCORS: true,
    logging: false,
  });
  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl.split(",")[1];
}

// Render the same HTML used for the "interactive report" into a PDF.
// Uses jsPDF's html() method to keep formatting close to the on-screen version.
export async function renderReportPdfBase64(
  name: string,
  reading: CosmicReading,
  qmReading: QuantumMelodicReading | null,
  harmonicAnalysis: HarmonicAnalysis | null,
  guidance: string[],
): Promise<string> {
  const html = buildSymphonyHTML(name, reading, qmReading, harmonicAnalysis, guidance);

  // Render HTML into an off-screen container so jsPDF.html() can convert it.
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-99999px";
  container.style.top = "0";
  container.style.width = "794px"; // A4 width in CSS px @96dpi
  container.innerHTML = html;
  document.body.appendChild(container);

  // Wait for fonts/styles
  await new Promise((r) => setTimeout(r, 250));

  const pdf = new jsPDF({ unit: "px", format: "a4", orientation: "portrait", hotfixes: ["px_scaling"] });

  await new Promise<void>((resolve, reject) => {
    pdf.html(container, {
      callback: () => resolve(),
      x: 0,
      y: 0,
      width: 794,
      windowWidth: 794,
      autoPaging: "text",
      margin: [20, 20, 20, 20],
      html2canvas: { scale: 0.75, useCORS: true, logging: false, backgroundColor: "#0a0a0a" },
    });
    setTimeout(() => reject(new Error("pdf timeout")), 30000);
  }).catch(() => {
    /* fall through */
  });

  document.body.removeChild(container);

  // jsPDF -> base64
  const blob = pdf.output("blob");
  const buf = await blob.arrayBuffer();
  return arrayBufferToBase64(buf);
}

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}
