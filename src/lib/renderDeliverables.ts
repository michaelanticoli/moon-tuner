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

// Render the symphony HTML into a PDF by rasterizing with html2canvas
// (jsPDF.html() proved unreliable — fonts via @import + dark theme caused
// blank black PDFs). We force a light "print" theme and slice the canvas
// across A4 pages.
export interface ChartInterpretation {
  opening: string;
  coreSignature: string;
  harmonicAlignment: string;
  resolutionGuidance: string;
  closing: string;
}

export async function renderReportPdfBase64(
  name: string,
  reading: CosmicReading,
  qmReading: QuantumMelodicReading | null,
  harmonicAnalysis: HarmonicAnalysis | null,
  guidance: string[],
  interpretation?: ChartInterpretation | null,
): Promise<string> {
  const html = buildSymphonyHTML(name, reading, qmReading, harmonicAnalysis, guidance, interpretation);

  // Off-screen container — print-mode forces light theme via @media print
  // override CSS already in the template, but html2canvas doesn't honor
  // @media print, so we inject a wrapper that forces light colors.
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-99999px";
  container.style.top = "0";
  container.style.width = "794px"; // A4 width @ 96dpi
  container.style.background = "#ffffff";
  container.innerHTML = html;
  // Force light theme on the inner body element so capture is readable.
  const innerBody = container.querySelector("body");
  if (innerBody) {
    (innerBody as HTMLElement).style.background = "#ffffff";
    (innerBody as HTMLElement).style.color = "#111111";
  }
  // Override dark surfaces for print rasterization
  const styleOverride = document.createElement("style");
  styleOverride.textContent = `
    body, .container { background:#ffffff !important; color:#111 !important; }
    h1, h3 { color:#111 !important; }
    .sig-cell { background:#f5f5f5 !important; }
    .sig-cell .val { color:#111 !important; }
    .section { border-color:#ddd !important; }
    td, th { border-color:#ddd !important; color:#222 !important; }
    .dim { color:#666 !important; }
    .meter-track, .bar-track { background:#ddd !important; }
    .meter-fill, .bar-fill { background:#1a1a1a !important; }
    .guidance { background:#f8f8f8 !important; border-color:#ddd !important; }
    .guidance p { color:#333 !important; }
    .closing, .brand { color:#666 !important; }
    h2 { color:#666 !important; }
  `;
  container.prepend(styleOverride);
  document.body.appendChild(container);

  // Wait for fonts/styles to settle
  await new Promise((r) => setTimeout(r, 400));

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 794,
    });

    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const blob = pdf.output("blob");
    const buf = await blob.arrayBuffer();
    return arrayBufferToBase64(buf);
  } finally {
    document.body.removeChild(container);
  }
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
