import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Button } from "@/components/ui/button";
import { RefreshCw, X, ChevronLeft, Save, Check, Loader2 } from "lucide-react";
import { getPhase, getDetailedInsight } from "@/hooks/useLunarCalculations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface SelectedDay {
  day: number;
  title: string;
  phaseName: string;
  phaseKey: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  theme: string;
  insight: string;
  instruction: string;
  phase: number;
}

const LunarCipher = () => {
  const [view, setView] = useState<'months' | 'calendar'>('months');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMonthSelect = (idx: number) => {
    setSyncing(true);
    setSelectedMonth(idx);
    setTimeout(() => {
      setSyncing(false);
      setView('calendar');
    }, 1200);
  };

  const handleSaveChart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!selectedDay || selectedMonth === null) return;

    setSaving(true);
    try {
      const chartName = `${monthNames[selectedMonth]} ${selectedDay.day}, ${currentYear} - ${selectedDay.phaseName}`;

      const { error } = await supabase.from('saved_charts').insert({
        user_id: user.id,
        chart_name: chartName,
        chart_data: {
          date: `${currentYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay.day).padStart(2, '0')}`,
          natal_phase: selectedDay.phaseName,
          phase_value: selectedDay.phase,
          insight: {
            title: selectedDay.title,
            theme: selectedDay.theme,
            insight: selectedDay.insight,
            instruction: selectedDay.instruction,
          },
        },
      });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving chart:', error);
    } finally {
      setSaving(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <Navigation />
        
        <main className="pt-32 pb-40">
          <div className="max-w-7xl mx-auto px-8">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex flex-col md:flex-row gap-12 items-start mb-20"
            >
              <div className="w-32 h-32 rounded-xl shadow-2xl shadow-accent/20 border border-border bg-card flex items-center justify-center">
                <MoonPhaseGlyph phase="full" size={64} className="text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.8em] text-accent">
                    PILLAR 04: THE INTERFACE
                  </span>
                  {view === 'calendar' && (
                    <button 
                      onClick={() => setView('months')} 
                      className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center space-x-2 transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>Return</span>
                    </button>
                  )}
                </div>
                <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-serif leading-[0.9] tracking-tight mb-6">
                  {view === 'months' ? (
                    'Select Your Window.'
                  ) : (
                    <>{monthNames[selectedMonth!]} <span className="text-gradient-silver italic font-light">{currentYear}.</span></>
                  )}
                </h1>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {syncing ? (
                <motion.div 
                  key="sync" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="h-[50vh] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 border border-accent/20 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
                    <RefreshCw className="text-accent w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-serif text-foreground mb-2">Syncing Ephemeris...</h3>
                </motion.div>
              ) : view === 'months' ? (
                <motion.div 
                  key="months" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                >
                  {monthNames.map((month, i) => (
                    <button 
                      key={month} 
                      onClick={() => handleMonthSelect(i)} 
                      className="group aspect-square bg-card/50 border border-border rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-accent/5 hover:border-accent/30 transition-all text-left"
                    >
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                        {month.slice(0,3)}
                      </span>
                      <h3 className="text-2xl font-serif text-foreground group-hover:text-accent transition-colors">
                        {month}
                      </h3>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="calendar" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-12"
                >
                  <div className="bg-card border border-border rounded-[3rem] p-10 overflow-hidden relative">
                    <div className="grid grid-cols-7 gap-4">
                      {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                        <div key={d} className="text-center text-[9px] text-muted-foreground font-bold mb-6 tracking-widest">
                          {d}
                        </div>
                      ))}
                      
                      {/* Empty cells for first day offset */}
                      {Array.from({ length: new Date(currentYear, selectedMonth!, 1).getDay() }, (_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}
                      
                      {Array.from({ length: new Date(currentYear, selectedMonth! + 1, 0).getDate() }, (_, i) => {
                        const d = new Date(currentYear, selectedMonth!, i + 1);
                        const p = getPhase(d);
                        const insight = getDetailedInsight(p);
                        const isKey = p < 0.05 || (p > 0.48 && p < 0.52);
                        
                        return (
                          <button 
                            key={i} 
                            onClick={() => setSelectedDay({ 
                              day: i + 1, 
                              title: insight.title,
                              phaseName: insight.phase,
                              phaseKey: insight.phaseKey,
                              theme: insight.theme,
                              insight: insight.insight,
                              instruction: insight.instruction,
                              phase: p 
                            })} 
                            className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all group ${
                              isKey 
                                ? 'border-accent/30 bg-accent/5' 
                                : 'border-border bg-card/50'
                            } hover:border-accent/50`}
                          >
                            <span className="text-[10px] mb-1 text-muted-foreground">{i + 1}</span>
                            <MoonPhaseGlyph 
                              phase={insight.phaseKey} 
                              size={24} 
                              className="text-foreground group-hover:scale-125 transition-transform" 
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Day Detail Modal */}
        <AnimatePresence>
          {selectedDay && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedDay(null)} 
                className="absolute inset-0 bg-background/90 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                className="relative w-full max-w-2xl bg-card border border-border rounded-[3.5rem] p-16 overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedDay(null)} 
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-24 h-24 bg-card border border-border rounded-3xl flex items-center justify-center">
                    <MoonPhaseGlyph phase={selectedDay.phaseKey} size={48} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent mb-2 block">
                      {selectedDay.phaseName} · Day {selectedDay.day}
                    </span>
                    <h2 className="text-4xl font-serif text-foreground">{selectedDay.title}</h2>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mb-4">
                      The Transmutation
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light italic">
                      "{selectedDay.insight}"
                    </p>
                  </div>
                  <div className="p-8 bg-accent/5 border border-accent/20 rounded-3xl">
                    <h4 className="text-[9px] uppercase tracking-widest text-accent font-bold mb-4">
                      Direct Instruction
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed font-bold">
                      {selectedDay.instruction}
                    </p>
                  </div>
                </div>

                <Button
                  variant="gold"
                  className="w-full"
                  onClick={handleSaveChart}
                  disabled={saving || saved}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved to Dashboard
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {user ? 'Save This Day' : 'Sign In to Save'}
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LunarCipher;
