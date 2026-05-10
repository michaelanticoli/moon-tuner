import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useLunarCalculations } from "@/hooks/useLunarCalculations";
import { MoonPhaseGlyph } from "@/components/MoonPhaseGlyph";
import { LunarAudioPlayer } from "@/components/LunarAudioPlayer";
import { Timeline } from "@/components/Timeline";
import { ReflectiveSynthesisPanel } from "@/components/ai/ReflectiveSynthesisPanel";
import { RecommendationPanel } from "@/components/ai/RecommendationPanel";
import { Link, useNavigate } from "react-router-dom";
import {
  Moon,
  Plus,
  FileText,
  Settings,
  LogOut,
  Calendar,
  Loader2,
  Trash2,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface SavedChart {
  id: string;
  chart_name: string;
  chart_data: {
    birth_date?: string;
    natal_phase?: string;
    insight?: {
      title: string;
      theme: string;
    };
  };
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "archive">("overview");
  const { phase, phaseName, phaseKey, insight } = useLunarCalculations();

  useEffect(() => {
    fetchSavedCharts();
  }, [user]);

  const fetchSavedCharts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("saved_charts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedCharts(data || []);
    } catch (error) {
      console.error("Error fetching charts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChart = async (chartId: string) => {
    try {
      const { error } = await supabase
        .from("saved_charts")
        .delete()
        .eq("id", chartId);

      if (error) throw error;
      setSavedCharts(savedCharts.filter((c) => c.id !== chartId));
    } catch (error) {
      console.error("Error deleting chart:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "traveler";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">

            {/* Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
                <div>
                  <p className="text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-2 font-sans">
                    The Archive
                  </p>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                    Your Record
                  </h1>
                  <p className="text-muted-foreground/70 text-sm">
                    Welcome back, {displayName}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/studio">
                    <Button variant="gold" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Chart
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Current Moon */}
            <ScrollReveal delay={0.1}>
              <div className="node-card border-accent/20 mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <Moon className="w-4 h-4 text-accent" />
                  <span className="text-[10px] tracking-widest uppercase text-accent/70 font-sans">
                    Present Lunar Field
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-6">
                    <MoonPhaseGlyph phase={phaseKey} size="lg" />
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">
                        {phaseName}
                      </h3>
                      <p className="text-muted-foreground/60 text-sm">
                        {(phase * 100).toFixed(1)}% illuminated
                      </p>
                    </div>
                  </div>
                  <div className="md:border-l md:border-r border-border/20 md:px-8">
                    <h4 className="text-xs text-muted-foreground/50 mb-1 uppercase tracking-widest font-sans">
                      Today's Theme
                    </h4>
                    <p className="font-serif text-xl text-foreground">{insight.title}</p>
                    <p className="text-accent/80 text-sm mt-1">{insight.theme}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground/50 mb-1 uppercase tracking-widest font-sans">
                      Guidance
                    </h4>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {insight.instruction}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Audio */}
            <ScrollReveal delay={0.15}>
              <div className="mb-10">
                <LunarAudioPlayer />
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal delay={0.18}>
              <div className="flex gap-6 border-b border-border/25 mb-10">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-3 text-sm font-sans transition-colors ${
                    activeTab === "overview"
                      ? "text-foreground border-b border-accent -mb-px"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("archive")}
                  className={`pb-3 text-sm font-sans transition-colors flex items-center gap-2 ${
                    activeTab === "archive"
                      ? "text-foreground border-b border-accent -mb-px"
                      : "text-muted-foreground/50 hover:text-muted-foreground"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Timeline
                </button>
              </div>
            </ScrollReveal>

            {activeTab === "overview" && (
              <>
                {/* Gentle Recommendations */}
                <ScrollReveal delay={0.18}>
                  <RecommendationPanel lunarPhase={phaseName} />
                </ScrollReveal>

                {/* Quick Actions */}
                <ScrollReveal delay={0.2}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <Link to="/lunar-cipher" className="node-card hover:border-accent/40 transition-colors group">
                      <Moon className="w-7 h-7 text-accent/70 group-hover:text-accent mb-4 transition-colors" />
                      <h3 className="font-serif text-base text-foreground mb-1.5">Lunar Cipher</h3>
                      <p className="text-muted-foreground/60 text-sm">
                        Discover your natal lunar phase
                      </p>
                    </Link>
                    <Link to="/lunar-reports" className="node-card hover:border-accent/40 transition-colors group">
                      <FileText className="w-7 h-7 text-accent/70 group-hover:text-accent mb-4 transition-colors" />
                      <h3 className="font-serif text-base text-foreground mb-1.5">Reports</h3>
                      <p className="text-muted-foreground/60 text-sm">
                        Personalized lunar documents
                      </p>
                    </Link>
                    <Link to="/workbooks" className="node-card hover:border-accent/40 transition-colors group">
                      <Calendar className="w-7 h-7 text-accent/70 group-hover:text-accent mb-4 transition-colors" />
                      <h3 className="font-serif text-base text-foreground mb-1.5">Workbooks</h3>
                      <p className="text-muted-foreground/60 text-sm">
                        The 26-workbook series
                      </p>
                    </Link>
                    <Link to="/settings" className="node-card hover:border-accent/40 transition-colors group">
                      <Settings className="w-7 h-7 text-accent/70 group-hover:text-accent mb-4 transition-colors" />
                      <h3 className="font-serif text-base text-foreground mb-1.5">Preferences</h3>
                      <p className="text-muted-foreground/60 text-sm">
                        Privacy and profile
                      </p>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Saved Charts */}
                <ScrollReveal delay={0.3}>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl text-foreground">Saved Charts</h2>
                      <span className="text-xs text-muted-foreground/50 font-sans">
                        {savedCharts.length} saved
                      </span>
                    </div>

                    {loading ? (
                      <div className="node-card flex items-center justify-center py-12">
                        <Loader2 className="w-5 h-5 text-accent animate-spin" />
                      </div>
                    ) : savedCharts.length === 0 ? (
                      <div className="node-card text-center py-14 border-border/30">
                        <Moon className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
                        <h3 className="font-serif text-lg text-foreground/70 mb-2">
                          No charts yet
                        </h3>
                        <p className="text-muted-foreground/50 text-sm mb-6">
                          Cast your first chart to begin
                        </p>
                        <Link to="/studio">
                          <Button variant="gold" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Open the Studio
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedCharts.map((chart) => (
                          <div key={chart.id} className="node-card group border-border/40">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-serif text-base text-foreground">
                                  {chart.chart_name}
                                </h3>
                                <p className="text-muted-foreground/50 text-xs">
                                  {format(new Date(chart.created_at), "MMM d, yyyy")}
                                </p>
                              </div>
                              <button
                                onClick={() => deleteChart(chart.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground/40 hover:text-destructive transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {chart.chart_data?.natal_phase && (
                              <p className="text-accent/80 text-sm mb-1">
                                {chart.chart_data.natal_phase}
                              </p>
                            )}
                            {chart.chart_data?.insight && (
                              <p className="text-muted-foreground/60 text-sm">
                                {chart.chart_data.insight.title}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                {/* Reflective Synthesis */}
                <ScrollReveal delay={0.35}>
                  <ReflectiveSynthesisPanel lunarPhase={phaseName} />
                </ScrollReveal>
              </>
            )}

            {activeTab === "archive" && (
              <ScrollReveal delay={0.1}>
                <div className="max-w-2xl">
                  <p className="text-sm text-muted-foreground/60 leading-relaxed mb-10">
                    A longitudinal record of your movements through the lunar field —
                    directives, reflections, rituals, proposals, and the emotional
                    weather that held them.
                  </p>
                  <Timeline />
                </div>
              </ScrollReveal>
            )}

          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
