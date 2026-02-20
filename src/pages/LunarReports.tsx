import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Download, Activity, Cpu, FileText, Sparkles, Zap, Heart, Eye } from "lucide-react";
import { getPhase, getPhaseName, getPhaseKey, getDetailedInsight, generateLunarArc, type ArcMonth } from "@/hooks/useLunarCalculations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateLunarPDF } from "@/lib/generateLunarPDF";

// Archetype data matching the PDF generator
const PHASE_ARCHETYPES: Record<string, { archetype: string; element: string; modality: string; bodyZone: string; keywords: string[]; frequency: { hz: number; meaning: string } }> = {
  'new': { archetype: 'The Seed', element: 'Earth / Void', modality: 'Cardinal Initiation', bodyZone: 'Pineal Gland, Third Eye', keywords: ['Incubation', 'Intention', 'Darkness', 'Potential', 'Stillness'], frequency: { hz: 396, meaning: 'Liberation from fear and guilt' } },
  'waxing-crescent': { archetype: 'The Sprout', element: 'Earth Rising', modality: 'Fixed Emergence', bodyZone: 'Throat, Voice', keywords: ['Breakthrough', 'Courage', 'First Steps', 'Declaration', 'Momentum'], frequency: { hz: 417, meaning: 'Facilitating change and transformation' } },
  'first-quarter': { archetype: 'The Builder', element: 'Fire', modality: 'Cardinal Crisis', bodyZone: 'Solar Plexus, Gut', keywords: ['Decision', 'Conflict', 'Action', 'Commitment', 'Risk'], frequency: { hz: 528, meaning: 'Transformation, miracles, DNA repair' } },
  'waxing-gibbous': { archetype: 'The Refiner', element: 'Fire Rising', modality: 'Fixed Development', bodyZone: 'Heart, Chest', keywords: ['Adjustment', 'Patience', 'Analysis', 'Perfection', 'Devotion'], frequency: { hz: 639, meaning: 'Harmonizing relationships' } },
  'full': { archetype: 'The Illuminator', element: 'Air / Light', modality: 'Cardinal Culmination', bodyZone: 'Eyes, Face, Skin', keywords: ['Revelation', 'Objectivity', 'Relationships', 'Harvest', 'Peak'], frequency: { hz: 741, meaning: 'Awakening intuition and expression' } },
  'waning-gibbous': { archetype: 'The Teacher', element: 'Air Descending', modality: 'Fixed Distribution', bodyZone: 'Hands, Arms', keywords: ['Sharing', 'Gratitude', 'Wisdom', 'Generosity', 'Communication'], frequency: { hz: 852, meaning: 'Returning to spiritual order' } },
  'last-quarter': { archetype: 'The Liberator', element: 'Water', modality: 'Cardinal Release', bodyZone: 'Hips, Thighs, Elimination', keywords: ['Letting Go', 'Forgiveness', 'Reorientation', 'Crisis', 'Shedding'], frequency: { hz: 963, meaning: 'Awakening perfect state' } },
  'waning-crescent': { archetype: 'The Mystic', element: 'Water Deepening', modality: 'Fixed Surrender', bodyZone: 'Feet, Lymphatic System', keywords: ['Rest', 'Dreams', 'Dissolution', 'Prophecy', 'Transition'], frequency: { hz: 174, meaning: 'Foundation of spiritual evolution' } },
};

// Natal Signature Detail Panel
function NatalSignaturePanel({ phaseValue, phaseName }: { phaseValue: number; phaseName: string }) {
  const phaseKey = getPhaseKey(phaseValue);
  const archetype = PHASE_ARCHETYPES[phaseKey];
  const insight = getDetailedInsight(phaseValue);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.2 }}
      className="mb-16"
    >
      {/* Archetype Header */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1 flex flex-col items-center justify-center p-10 bg-card border border-border rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <MoonPhaseGlyph phase={phaseKey} size={80} className="text-gold mb-6 relative z-10" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold relative z-10">Archetype</span>
          <h3 className="font-serif text-3xl text-foreground mt-2 relative z-10">{archetype.archetype}</h3>
          <span className="text-gold text-sm mt-1 relative z-10">{(phaseValue * 360).toFixed(2)}°</span>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Thematic Title */}
          <div className="p-8 bg-card border border-border rounded-3xl">
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-2">Thematic Title</span>
            <h4 className="font-serif text-2xl text-foreground italic">"{insight.title}"</h4>
            <p className="text-muted-foreground mt-3 leading-relaxed">{insight.insight}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-1">Element</span>
              <p className="text-foreground font-serif text-lg">{archetype.element}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-2xl">
              <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold block mb-1">Modality</span>
              <p className="text-foreground font-serif text-lg">{archetype.modality}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Details Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Somatic Zone</span>
          </div>
          <p className="text-foreground text-sm">{archetype.bodyZone}</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Solfeggio Frequency</span>
          </div>
          <p className="text-foreground text-sm">{archetype.frequency.hz}Hz — {archetype.frequency.meaning}</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-4 h-4 text-gold" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold">Lifelong Instruction</span>
          </div>
          <p className="text-foreground text-sm">{insight.instruction}</p>
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-6 flex flex-wrap gap-2">
        {archetype.keywords.map((kw) => (
          <span key={kw} className="px-3 py-1.5 text-xs tracking-widest uppercase text-gold border border-gold/20 rounded-full bg-gold/5">
            {kw}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const LunarReports = () => {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [formData, setFormData] = useState({ date: '1990-01-01', time: '12:00', location: '' });
  const [livePhase, setLivePhase] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [report, setReport] = useState<{ natalPhase: string; natalPhaseValue: number; arc: ArcMonth[]; birthDate: Date; location: string } | null>(null);

  useEffect(() => {
    if (formData.date) {
      const d = new Date(`${formData.date}T${formData.time}`);
      if (!isNaN(d.getTime())) {
        setLivePhase(getPhase(d));
      }
    }
  }, [formData.date, formData.time]);

  const handleCalculate = () => {
    if (!formData.date) return;
    setStep('generating');
    const birthDate = new Date(`${formData.date}T${formData.time}`);
    const generatedReport = generateLunarArc(birthDate);
    setTimeout(() => {
      setReport({ ...generatedReport, natalPhaseValue: getPhase(birthDate), birthDate, location: formData.location });
      setStep('result');
    }, 2000);
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
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                      <div className="w-32 h-32 rounded-[2rem] shadow-2xl shadow-gold/20 border border-border bg-card flex items-center justify-center">
                        <MoonPhaseGlyph phase="waxing-gibbous" size={64} className="text-gold" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.8em] text-gold mb-6 block">
                          LAST QUARTER — "WHAT DO I RELEASE?"
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
                          Initialize your bespoke 12-month arc. We calculate your <strong className="text-foreground">Natal Lunar Phase</strong> and map its recurrence to identify your personal monthly power days.
                        </p>
                        
                        {livePhase !== null && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-card border border-border rounded-2xl inline-block">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <Cpu className="text-gold w-5 h-5 animate-pulse" />
                              </div>
                              <div>
                                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Detected Natal Signature</p>
                                <p className="text-foreground font-serif text-lg">
                                  {getPhaseName(livePhase)} 
                                  <span className="text-gold text-xs ml-2">{(livePhase * 360).toFixed(2)}°</span>
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Form */}
                      <div className="p-12 bg-card border border-border rounded-[3rem] backdrop-blur-xl">
                        <h4 className="text-foreground font-serif text-2xl mb-8">Initialize Engine</h4>
                        <div className="space-y-8">
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
                    <h3 className="text-2xl font-serif text-foreground mb-4">Synthesizing Birth Data...</h3>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.5em] animate-pulse">Engaging Ephemeris Matrix</p>
                  </motion.div>
                )}

                {step === 'result' && report && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    {/* Result Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-12">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold mb-4 block flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Analysis Complete
                        </span>
                        <h2 className="text-5xl font-serif text-foreground mb-2">Your Lunar Arc.</h2>
                        <p className="text-muted-foreground">
                          Born under a <span className="text-foreground font-bold">{report.natalPhase}</span> signature.
                        </p>
                      </div>
                      <div className="flex gap-4 mt-8 md:mt-0">
                        <Button
                          variant="outline"
                          onClick={() => { setStep('input'); setReport(null); }}
                          className="px-6 py-6 h-auto rounded-full text-[9px] uppercase tracking-widest font-bold"
                        >
                          Recalculate
                        </Button>
                        <Button
                          onClick={() => {
                            setIsDownloading(true);
                            setTimeout(() => {
                              generateLunarPDF({ birthDate: report.birthDate, birthLocation: report.location, natalPhase: report.natalPhaseValue, natalPhaseName: report.natalPhase, arc: report.arc });
                              setIsDownloading(false);
                            }, 100);
                          }}
                          disabled={isDownloading}
                          className="flex items-center space-x-3 px-8 py-6 h-auto bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                        >
                          {isDownloading ? (
                            <><Activity className="w-4 h-4 animate-spin" /><span className="text-[9px] uppercase tracking-widest font-bold">Generating...</span></>
                          ) : (
                            <><FileText className="w-4 h-4" /><span className="text-[9px] uppercase tracking-widest font-bold">Download Full Report (PDF)</span></>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Natal Signature Deep Dive */}
                    <NatalSignaturePanel phaseValue={report.natalPhaseValue} phaseName={report.natalPhase} />

                    {/* 12-Month Arc */}
                    <div className="mb-8">
                      <h3 className="font-serif text-3xl text-foreground mb-2">12-Month Power Arc</h3>
                      <p className="text-muted-foreground text-sm max-w-2xl">Each month, the Moon returns to your natal phase position. These are your personal power days—optimal for important decisions, launches, and deep work.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                      {report.arc.map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="p-8 bg-card border border-border rounded-3xl hover:border-gold/30 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-10 font-serif text-6xl text-foreground pointer-events-none group-hover:opacity-20 transition-opacity">
                            {i + 1}
                          </div>
                          <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                              <span className="text-3xl font-serif text-foreground group-hover:text-gold transition-colors block">{item.month}</span>
                              <span className="text-sm text-muted-foreground">Day {item.day}</span>
                            </div>
                            <span className="text-[9px] text-accent font-bold tracking-widest border border-accent/20 px-2 py-1 rounded">{item.intensity} Power</span>
                          </div>
                          <h4 className="text-foreground font-bold tracking-widest uppercase text-xs mb-2">{item.focus}</h4>
                          <p className="text-muted-foreground text-xs mb-6 leading-relaxed">
                            Your <span className="text-foreground">{item.phase}</span> return. Peak alignment for manifestation.
                          </p>
                          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gold" style={{ width: item.intensity }} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
