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
  // Override dark surfaces for print rasterization. We want HIGH contrast —
  // the user reported silver-on-white illegibility, so push every text
  // class to near-black and keep accents to a saturated teal that survives
  // JPEG compression.
  const styleOverride = document.createElement("style");
  styleOverride.textContent = `
    body, .container { background:#ffffff !important; color:#111 !important; }
    .container { padding: 36px 36px 48px !important; }
    h1, h2, h3 { color:#0a0a0a !important; }
    h2 { color:#0d6b63 !important; }
    p, td, th, li, span, div { color:#111 !important; }
    .sig-cell { background:#f3f3f3 !important; }
    .sig-cell .val { color:#0a0a0a !important; }
    .sig-cell .lbl { color:#0d6b63 !important; }
    .section { border-color:#cfcfcf !important; padding: 28px 0 !important; }
    .section { page-break-inside: avoid; break-inside: avoid; }
    table { page-break-inside: auto; }
    tr { page-break-inside: avoid; break-inside: avoid; }
    td, th { border-color:#dcdcdc !important; color:#111 !important; }
    th { color:#0d6b63 !important; }
    .dim { color:#444 !important; }
    .italic { color:#333 !important; }
    .meter-track, .bar-track { background:#e3e3e3 !important; }
    .meter-fill, .bar-fill { background:#0d6b63 !important; }
    .meter-head .v, .el-pct { color:#0d6b63 !important; }
    .meter-desc { color:#444 !important; }
    .guidance { background:#f6f6f6 !important; border:1px solid #d8d8d8 !important; padding: 22px !important; }
    .guidance p, .prose p { color:#0f0f0f !important; }
    .closing { color:#222 !important; padding: 36px 24px !important; }
    .brand { color:#555 !important; padding-bottom: 16px !important; }
    .meta span, .meta div { color:#111 !important; }
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

    // Slice the source canvas into page-sized strips so text never gets
    // sliced through the middle of a glyph at the page seam. We also
    // overlap each page by ~24pt-equivalent of source pixels, which safely
    // re-prints any partially-clipped line on the next page.
    const pxPerPt = canvas.width / pageWidth;
    const pageHeightPx = Math.floor(pageHeight * pxPerPt);
    const overlapPx = Math.floor(24 * pxPerPt);

    let renderedPx = 0;
    let firstPage = true;
    while (renderedPx < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedPx);
      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = sliceHeight;
      const ctx = slice.getContext("2d");
      if (!ctx) break;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

      const sliceImgData = slice.toDataURL("image/jpeg", 0.92);
      const renderedHeightPt = (sliceHeight / canvas.width) * pageWidth;
      if (!firstPage) pdf.addPage();
      pdf.addImage(sliceImgData, "JPEG", 0, 0, pageWidth, renderedHeightPt);
      firstPage = false;

      // Advance, but step back by the overlap so a clipped line repeats
      renderedPx += sliceHeight;
      if (renderedPx < canvas.height) renderedPx -= overlapPx;
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
