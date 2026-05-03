import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Download, ArrowLeft } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { CrossGeneratorLinks } from "@/components/CrossGeneratorLinks";
import { useSharedBirth } from "@/hooks/useSharedBirth";
import {
  generateCazimiProfile,
  getCoordinates,
  getTimezoneOffset,
  type CazimiEntry,
} from "@/lib/cazimiEngine";

type Stage = "input" | "loading" | "report";

export default function CazimiPunchcard() {
  const { birth, update } = useSharedBirth();
  const [stage, setStage] = useState<Stage>("input");
  const form = {
    name: birth.name,
    birthDate: birth.date,
    birthTime: birth.time,
    location: birth.location,
  };
  const setForm = (partial: Partial<typeof form>) => {
    update({
      name: partial.name ?? form.name,
      date: partial.birthDate ?? form.birthDate,
      time: partial.birthTime ?? form.birthTime,
      location: partial.location ?? form.location,
    });
  };
  const [resolvedLocation, setResolvedLocation] = useState("");
  const [profile, setProfile] = useState<CazimiEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStage("loading");
    setError(null);
    try {
      const geo = await getCoordinates(form.location);
      const offset = await getTimezoneOffset(geo.lat, geo.lon);
      const data = await generateCazimiProfile(
        form.birthDate,
        form.birthTime,
        offset,
        geo.lat,
        geo.lon,
      );
      setResolvedLocation(geo.displayName);
      setProfile(data);
      setStage("report");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "We had trouble resolving that location. Try a broader city or region.",
      );
      setStage("input");
    }
  };

  const reset = () => {
    setStage("input");
    setProfile(null);
    setResolvedLocation("");
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    const el = reportRef.current;
    document.body.classList.add("cazimi-print");
    const prevW = el.style.width;
    el.style.width = "1024px";
    await new Promise((r) => setTimeout(r, 250));
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      document.body.classList.remove("cazimi-print");
      el.style.width = prevW;

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const pxPerMm = canvas.width / pageW;
      const pageHpx = Math.floor(pageH * pxPerMm);
      const overlapPx = Math.floor(8 * pxPerMm);

      let rendered = 0;
      let first = true;
      while (rendered < canvas.height) {
        const sliceH = Math.min(pageHpx, canvas.height - rendered);
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = sliceH;
        const ctx = slice.getContext("2d");
        if (!ctx) break;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, slice.width, sliceH);
        ctx.drawImage(canvas, 0, rendered, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const data = slice.toDataURL("image/jpeg", 0.9);
        const heightMm = (sliceH / canvas.width) * pageW;
        if (!first) pdf.addPage();
        pdf.addImage(data, "JPEG", 0, 0, pageW, heightMm);
        first = false;
        rendered += sliceH;
        if (rendered < canvas.height) rendered -= overlapPx;
      }
      pdf.save(`${form.name.replace(/\s+/g, "_")}_Cazimi_Punchcard.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      document.body.classList.remove("cazimi-print");
    }
    setIsExporting(false);
  };

  return (
    <PageTransition>
      <Navigation />

      {/* Print overrides — light mode for the captured report only */}
      <style>{`
        body.cazimi-print [data-cazimi-report] { background:#ffffff !important; color:#111 !important; }
        body.cazimi-print [data-cazimi-report] * { color:#111 !important; border-color:#dcdcdc !important; }
        body.cazimi-print [data-cazimi-report] .cz-accent { color:#0d6b63 !important; }
        body.cazimi-print [data-cazimi-report] .cz-muted { color:#555 !important; }
        body.cazimi-print [data-cazimi-report] .cz-cell { background:#f5f5f5 !important; }
      `}</style>

      <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <header className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Cazimi · Personal Power Punchcard
            </p>
            <h1
              className="text-4xl md:text-6xl font-thin tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              In the heart{" "}
              <span className="italic text-accent">of the Sun.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-sm leading-relaxed">
              The exact moments when the transiting Sun returns to illuminate
              each placement of your natal chart — brief windows of
              purification, clarity, and renewal.
            </p>
          </header>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto mb-8 p-4 border border-destructive/40 text-sm text-center rounded"
              >
                {error}
              </motion.div>
            )}

            {stage === "input" && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-md mx-auto space-y-8"
              >
                <Field
                  label="Name"
                  type="text"
                  required
                  placeholder="How shall we address you?"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <div className="grid grid-cols-2 gap-6">
                  <Field
                    label="Birth Date"
                    type="date"
                    required
                    value={form.birthDate}
                    onChange={(v) => setForm({ ...form, birthDate: v })}
                  />
                  <Field
                    label="Birth Time"
                    type="time"
                    required
                    value={form.birthTime}
                    onChange={(v) => setForm({ ...form, birthTime: v })}
                  />
                </div>
                <Field
                  label="Birth Location"
                  type="text"
                  required
                  placeholder="City, Country"
                  value={form.location}
                  onChange={(v) => setForm({ ...form, location: v })}
                />
                <button
                  type="submit"
                  className="w-full bg-foreground text-background tracking-[0.25em] uppercase text-xs py-4 hover:bg-accent transition-colors rounded-sm"
                >
                  Reveal Alignments ✧
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Coordinates and timezone are resolved automatically.
                </p>
              </motion.form>
            )}

            {stage === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <Loader2 className="w-6 h-6 animate-spin text-accent mx-auto mb-4" />
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Calculating Solar Returns
                </p>
              </motion.div>
            )}

            {stage === "report" && profile && (
              <motion.div
                key="report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex justify-between items-center mb-10">
                  <button
                    onClick={reset}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3 h-3" /> Start Over
                  </button>
                  <button
                    onClick={exportPDF}
                    disabled={isExporting}
                    className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Download className="w-3 h-3" />
                    {isExporting ? "Generating…" : "Save PDF"}
                  </button>
                </div>

                <div ref={reportRef} data-cazimi-report className="bg-background">
                  <div className="text-center pb-12 border-b border-border/40 mb-12">
                    <p
                      className="text-2xl italic cz-muted text-muted-foreground mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      The Solar Alignments of
                    </p>
                    <h2
                      className="text-5xl md:text-6xl font-thin capitalize"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {form.name}
                    </h2>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-6 cz-muted">
                      Calculated for {resolvedLocation}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    {profile.map((p, i) => (
                      <PunchcardRow key={p.id} planet={p} index={i} />
                    ))}
                  </div>

                  <div className="mt-24 text-center">
                    <div
                      className="text-3xl text-muted-foreground mb-6 cz-muted"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ✧
                    </div>
                    <p
                      className="italic text-lg max-w-xl mx-auto leading-relaxed text-muted-foreground cz-muted"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      "A Cazimi is a cosmic clean slate — a zenith surge of
                      pure, unfiltered renewal. Use these brief windows to
                      close old cycles, refuel your spirit, and vote boldly for
                      magic."
                    </p>
                  </div>
                </div>

                <CrossGeneratorLinks exclude="/cazimi" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border text-foreground py-3 text-base focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50 [color-scheme:dark]"
      />
    </div>
  );
}

function PunchcardRow({
  planet,
  index,
}: {
  planet: CazimiEntry;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.04 }}
      className="border-b border-border/40 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 items-start">
        <div className="md:col-span-3">
          <div
            className="text-5xl text-foreground/80 mb-3 group-hover:text-accent transition-colors cz-accent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {planet.symbol}
          </div>
          <h3
            className="text-2xl font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {planet.name}
          </h3>
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1 cz-muted">
            {planet.theme}
          </p>
        </div>

        <div className="md:col-span-6 space-y-4">
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {planet.blurb}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed cz-muted">
            {planet.cazimiImpact}
          </p>
        </div>

        <div className="md:col-span-3 space-y-5 text-sm">
          <div className="bg-muted/30 cz-cell p-4 rounded-sm">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1 cz-muted">
              Next Alignment
            </div>
            <div className="text-foreground text-base font-medium">
              {planet.cazimiDate}
            </div>
            <div className="text-muted-foreground text-xs mt-1 cz-muted">
              {planet.cazimiTime}
            </div>
          </div>
          <div className="px-1">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1 cz-muted">
              Natal Placement
            </div>
            <div className="text-muted-foreground cz-muted">
              {planet.placement}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
