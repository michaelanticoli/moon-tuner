import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { Button } from "@/components/ui/button";
import { RefreshCw, X, ChevronLeft, Save, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { CipherCalendar } from "@/components/cipher/CipherCalendar";
import { CipherDayDetail } from "@/components/cipher/CipherDayDetail";
import { getDailyReadingsMap, getDailyReading, type DailyReading } from "@/data/parseDailyReadings";
import { getICSEventIndex, getEventsForDate, type DayEvents } from "@/data/parseICS";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const LunarCipher = () => {
  const [view, setView] = useState<'months' | 'calendar'>('months');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [syncing, setSyncing] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [readings, setReadings] = useState<Map<string, DailyReading>>(new Map());
  const [icsIndex, setIcsIndex] = useState<Map<string, DayEvents>>(new Map());

  const currentYear = 2026;

  useEffect(() => {
    getDailyReadingsMap().then(setReadings);
    getICSEventIndex().then(setIcsIndex);
  }, []);

  const handleMonthSelect = (idx: number) => {
    setSyncing(true);
    setSelectedMonth(idx);
    setTimeout(() => {
      setSyncing(false);
      setView('calendar');
    }, 1200);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const currentReading = selectedDay !== null && selectedMonth !== null
    ? getDailyReading(readings, new Date(currentYear, selectedMonth, selectedDay))
    : null;

  const currentDayEvents = selectedDay !== null && selectedMonth !== null
    ? getEventsForDate(icsIndex, new Date(currentYear, selectedMonth, selectedDay))
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <Navigation />

        <main className="pt-32 pb-40">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-16 md:mb-20"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl shadow-2xl shadow-accent/20 border border-border bg-card flex items-center justify-center">
                <MoonPhaseGlyph phase="full" size={48} className="text-accent md:hidden" />
                <MoonPhaseGlyph phase="full" size={64} className="text-accent hidden md:block" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.8em] text-accent">
                    PILLAR 04: THE INTERFACE
                  </span>
                  {view === 'calendar' && (
                    <button
                      onClick={() => { setView('months'); setSelectedDay(null); }}
                      className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center space-x-2 transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>Return</span>
                    </button>
                  )}
                </div>
                <h1 className="text-[clamp(2rem,5vw,5rem)] font-serif leading-[0.9] tracking-tight mb-4 md:mb-6">
                  {view === 'months' ? (
                    'Select Your Window.'
                  ) : (
                    <>{monthNames[selectedMonth!]} <span className="text-gradient-silver italic font-light">{currentYear}.</span></>
                  )}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
                  {view === 'months'
                    ? 'Each month holds a unique sequence of cosmic weather. Select a window to explore the daily transmutations, ingresses, and void periods within.'
                    : 'Tap any day to reveal its cosmic weather report — moon phase, sign, aspects, void periods, and direct guidance.'}
                </p>
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
                  <p className="text-sm text-muted-foreground">Loading astronomical data for {monthNames[selectedMonth!]}</p>
                </motion.div>
              ) : view === 'months' ? (
                <motion.div
                  key="months"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
                >
                  {monthNames.map((month, i) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(i)}
                      className="group aspect-square bg-card/50 border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between hover:bg-accent/5 hover:border-accent/30 transition-all text-left"
                    >
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                        {month.slice(0, 3)}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-foreground group-hover:text-accent transition-colors">
                        {month}
                      </h3>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <CipherCalendar
                  year={currentYear}
                  month={selectedMonth!}
                  onDaySelect={handleDaySelect}
                />
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Day Detail Panel */}
        {selectedDay !== null && selectedMonth !== null && (
          <CipherDayDetail
            year={currentYear}
            month={selectedMonth}
            day={selectedDay}
            reading={currentReading}
            dayEvents={currentDayEvents}
            onClose={() => setSelectedDay(null)}
          />
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LunarCipher;
