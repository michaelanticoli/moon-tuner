// Total Tuner — single hub that assembles all four MOONtuner generators
// (Astro-Harmonic Symphony, 12-Month Lunar Arc, Cazimi Punchcard, and the
// personalized Cipher overlay) into one document. Users can browse each
// section in-page or click "Open in dedicated generator" for the full
// experience. The "Export Total Tuner PDF" button bundles the on-page
// summary into a single multi-page PDF using html2canvas + jsPDF.
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { useSharedBirth, isCompleteBirth } from "@/hooks/useSharedBirth";
import {
  Music2, Moon, Sun, Calendar, Download, Loader2, ArrowUpRight, Sparkles,
} from "lucide-react";
import { generateReport, type LunarReport } from "@/lib/lunarReportEngine";
import {
  generateCazimiProfile, getCoordinates, getTimezoneOffset, type CazimiEntry,
} from "@/lib/cazimiEngine";
import { toast } from "sonner";

interface SectionState<T> { status: "idle" | "loading" | "ready" | "error"; data?: T; error?: string }

export default function TotalTuner() {
  const { birth } = useSharedBirth();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);

  const [arc, setArc] = useState<SectionState<LunarReport>>({ status: "idle" });
  const [cazimi, setCazimi] = useState<SectionState<CazimiEntry[]>>({ status: "idle" });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!isCompleteBirth(birth)) return;
    // Lunar Arc — synchronous engine
    setArc({ status: "loading" });
    try {
      const report = generateReport(birth.date, birth.time, birth.location, birth.name);
      setArc({ status: "ready", data: report });
    } catch (e) {
      setArc({ status: "error", error: e instanceof Error ? e.message : String(e) });
    }
    // Cazimi — async (geocoding + ephemeris)
    setCazimi({ status: "loading" });
    (async () => {
      try {
        const geo = await getCoordinates(birth.location);
        const offset = await getTimezoneOffset(geo.lat, geo.lon);
        const data = await generateCazimiProfile(birth.date, birth.time, offset, geo.lat, geo.lon);
        setCazimi({ status: "ready", data });
      } catch (e) {
        setCazimi({ status: "error", error: e instanceof Error ? e.message : String(e) });
      }
    })();
  }, [birth.date, birth.time, birth.location, birth.name]);

  const exportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const el = reportRef.current;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#0a0a0a", useCORS: true });
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let y = 0;
      let remaining = imgH;
      // Slice the canvas vertically into page-sized chunks for true multi-page output
      const sliceHeightPx = Math.floor((canvas.width * pageH) / pageW);
      let sourceY = 0;
      let pageNum = 0;
      while (remaining > 0) {
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = Math.min(sliceHeightPx, canvas.height - sourceY);
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(
          canvas,
          0, sourceY, canvas.width, sliceCanvas.height,
          0, 0, canvas.width, sliceCanvas.height,
        );
        const imgData = sliceCanvas.toDataURL("image/jpeg", 0.92);
        if (pageNum > 0) pdf.addPage();
        const sliceImgH = (sliceCanvas.height * imgW) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgW, sliceImgH);
        sourceY += sliceCanvas.height;
        remaining = canvas.height - sourceY > 0 ? canvas.height - sourceY : 0;
        pageNum++;
        y += sliceImgH;
      }
      pdf.save(`TotalTuner_${(birth.name || "chart").replace(/\s+/g, "_")}.pdf`);
      toast.success("Total Tuner PDF exported.");
    } catch (e) {
      console.error(e);
      toast.error("PDF export failed. Try a smaller browser window.");
    } finally {
      setExporting(false);
    }
  };

  if (!isCompleteBirth(birth)) {
    return (
      <PageTransition>
        <Navigation />
        <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Total Tuner Report
            </p>
            <h1 className="text-3xl md:text-4xl font-thin mb-4">Birth data required</h1>
            <p className="text-muted-foreground mb-8">
              The Total Tuner assembles all four engines around your natal chart.
              Enter your birth details once in the Studio and they'll persist
              everywhere.
            </p>
            <Button onClick={() => navigate("/studio")} variant="gold">
              Go to Studio →
            </Button>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header / export bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Total Tuner Report
              </p>
              <h1 className="text-4xl md:text-5xl font-thin mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {birth.name || "Your"} <span className="italic text-accent">— assembled</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                {birth.date} · {birth.time} · {birth.location}
              </p>
            </div>
            <Button onClick={exportPDF} variant="gold" disabled={exporting}>
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Export Total Tuner PDF
            </Button>
          </div>

          {/* PDF surface */}
          <div ref={reportRef} className="space-y-10 bg-background p-2">
            <Section
              title="Astro-Harmonic Symphony"
              tag="Symphony"
              icon={<Music2 className="w-5 h-5" />}
              to="/quantumelodic"
              navigate={navigate}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your natal chart translated into a generative musical score with
                ElevenLabs voiceover. The Symphony page renders the full audio,
                interactive natal wheel, and downloadable PDF.
              </p>
            </Section>

            <Section
              title="12-Month Lunar Arc"
              tag="Lunar Arc"
              icon={<Moon className="w-5 h-5" />}
              to="/lunar-reports?paid=true"
              navigate={navigate}
            >
              {arc.status === "loading" && <SectionLoader label="Computing your year of Power Days…" />}
              {arc.status === "error" && <SectionError msg={arc.error!} />}
              {arc.status === "ready" && arc.data && (
                <div className="space-y-3 text-sm">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Stat label="Natal Phase" value={arc.data.natalSignature?.natalPhase || "—"} />
                    <Stat label="Power Days" value={String(arc.data.powerDays?.length ?? 0)} />
                    <Stat label="Months mapped" value={String(arc.data.monthlyArc?.length ?? 0)} />
                  </div>
                  {arc.data.natalSignature?.summary && (
                    <p className="text-muted-foreground leading-relaxed pt-2">
                      {arc.data.natalSignature.summary}
                    </p>
                  )}
                </div>
              )}
            </Section>

            <Section
              title="Cazimi Punchcard"
              tag="Cazimi"
              icon={<Sun className="w-5 h-5" />}
              to="/cazimi"
              navigate={navigate}
            >
              {cazimi.status === "loading" && <SectionLoader label="Calculating Solar Returns to your placements…" />}
              {cazimi.status === "error" && <SectionError msg={cazimi.error!} />}
              {cazimi.status === "ready" && cazimi.data && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {cazimi.data.slice(0, 6).map((c) => (
                    <div key={c.body} className="border border-border/40 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-accent text-lg">{c.archetype.symbol}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {c.archetype.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.archetype.theme}</p>
                      {c.nextCazimiDate && (
                        <p className="text-[10px] mt-1 text-accent/80">
                          Next: {new Date(c.nextCazimiDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section
              title="Lunar Cipher — personalized overlay"
              tag="Cipher"
              icon={<Calendar className="w-5 h-5" />}
              to="/lunar-cipher"
              navigate={navigate}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                The 2026 calendar now badges each day with the transit Moon's
                aspects to your natal Sun and Moon. Open the Cipher to walk the
                year through your own chart's lens.
              </p>
            </Section>

            <div className="border-t border-border/40 pt-6 text-center">
              <Sparkles className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                Total Tuner — assembled from your single chart, synchronized across the metasystem.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}

function Section({
  title, tag, icon, to, navigate, children,
}: {
  title: string; tag: string; icon: React.ReactNode; to: string;
  navigate: (p: string) => void; children: React.ReactNode;
}) {
  return (
    <section className="border border-border/40 rounded-xl p-6 bg-card/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md border border-border/40 flex items-center justify-center text-accent">
            {icon}
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{tag}</p>
            <h2 className="text-lg font-light">{title}</h2>
          </div>
        </div>
        <button
          onClick={() => navigate(to)}
          className="text-xs flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
        >
          Open <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
      {children}
    </section>
  );
}

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Loader2 className="w-3 h-3 animate-spin" /> {label}
    </div>
  );
}
function SectionError({ msg }: { msg: string }) {
  return <p className="text-xs text-destructive">Couldn't compute: {msg}</p>;
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/40 rounded-md p-3">
      <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
