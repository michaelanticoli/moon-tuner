import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Activity, FileText, Sparkles, Download, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateReport, type LunarReport } from "@/lib/lunarReportEngine";
import { generateLunarPDF } from "@/lib/generateLunarPDF";
import { openLunarHTMLReport } from "@/lib/generateLunarHTML";
import { NatalSignaturePanel } from "@/components/report/NatalSignaturePanel";
import { PowerDayGrid } from "@/components/report/PowerDayGrid";
import { PeakSummaryPanel } from "@/components/report/PeakSummaryPanel";
import { ArcPracticeSection } from "@/components/report/ArcPracticeSection";
import { ReportClosing } from "@/components/report/ReportClosing";

const LunarReports = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPaid = searchParams.get("paid") === "true";

  useEffect(() => {
    if (!isPaid) {
      navigate("/#report", { replace: true });
    }
  }, [isPaid, navigate]);

  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '12:00',
    location: '',
  });
  const [report, setReport] = useState<LunarReport | null>(null);

  const handleCalculate = () => {
    if (!formData.date) return;
    setStep('generating');
    setTimeout(() => {
      const r = generateReport(formData.date, formData.time, formData.location, formData.name);
      setReport(r);
      setStep('result');
    }, 2000);
  };

  const handleDownloadPDF = () => {
    if (!report) return;
    try {
      generateLunarPDF(report);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('PDF download failed. Please try the Interactive Report instead.');
    }
  };

  const handleOpenHTML = () => {
    if (!report) return;
    openLunarHTMLReport(report);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
        <Navigation />
        
        <main className="pt-32">
          <section className="min-h-[80vh] flex items-center py-20">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <AnimatePresence mode="wait">
                {step === 'input' && (
                  <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                      <div className="w-32 h-32 rounded-[2rem] shadow-2xl shadow-gold/20 border border-border bg-card flex items-center justify-center">
                        <MoonPhaseGlyph phase="waxing-gibbous" size={64} className="text-gold" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.8em] text-gold mb-6 block">
                          PERSONAL LUNAR ARC
                        </span>
                        <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-display font-extralight leading-[0.9] tracking-tight mb-6">
                          The Moon <br />
                          <span className="text-gradient-silver italic font-light">You Move With.</span>
                        </h1>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                      <div className="space-y-8">
                        <p className="max-w-md text-xl text-muted-foreground font-light leading-relaxed">
                          Your birth chart has a lunar signature. Enter your details once here after checkout and this report will calculate it, find your 12 monthly power days, and give you a year of precision timing.
                        </p>
                      </div>

                      <div className="p-12 bg-card border border-border rounded-[3rem] backdrop-blur-xl">
                        <h4 className="text-foreground font-serif text-2xl mb-8">Enter Birth Data</h4>
                        <div className="space-y-8">
                          <div>
                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Your Name</label>
                            <Input type="text" placeholder="First name or full name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-gold placeholder:text-muted-foreground/50" />
                          </div>
                          <div>
                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Birth Date</label>
                            <Input type="date" value={formData.date} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-gold" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Birth Time</label>
                              <Input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-gold" />
                            </div>
                            <div>
                              <label className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Location</label>
                              <Input type="text" placeholder="City, Country" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="bg-transparent border-0 border-b border-border rounded-none py-4 focus-visible:ring-0 focus-visible:border-gold placeholder:text-muted-foreground/50" />
                            </div>
                          </div>
                          <Button onClick={handleCalculate} className="w-full py-6 h-auto bg-foreground text-background font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-500">
                            Calculate Personal Arc
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'generating' && (
                  <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 min-h-[50vh] flex flex-col items-center justify-center">
                    <div className="w-32 h-32 border-2 border-gold/20 rounded-full mx-auto mb-12 flex items-center justify-center relative">
                      <div className="absolute inset-0 border-t-2 border-gold rounded-full animate-spin" />
                      <Activity className="text-gold w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-4">Calculating Birth Signature...</h3>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.5em] animate-pulse">Computing 12-Month Power Arc</p>
                  </motion.div>
                )}

                {step === 'result' && report && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-12">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold mb-4 block flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Analysis Complete
                        </span>
                        <h2 className="text-5xl font-serif text-foreground mb-2">
                          {report.meta.querentName ? `${report.meta.querentName}'s Lunar Arc.` : 'Your Lunar Arc.'}
                        </h2>
                        <p className="text-muted-foreground">
                          Born under a <span className="text-foreground font-bold">{report.natal.phase}</span> signature — <span className="text-gold">{report.natal.angle}°</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-8 md:mt-0">
                        <Button
                          onClick={handleDownloadPDF}
                          className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleOpenHTML}
                          className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Interactive Report
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => { setStep('input'); setReport(null); }}
                          className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold"
                        >
                          Recalculate
                        </Button>
                      </div>
                    </div>

                    <NatalSignaturePanel report={report} />
                    <PeakSummaryPanel report={report} />
                    <PowerDayGrid report={report} />
                    <ArcPracticeSection report={report} />
                    <ReportClosing report={report} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LunarReports;
