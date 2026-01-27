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

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">
            {/* Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                    Your Lunar Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back, {user?.email}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/lunar-cipher">
                    <Button variant="gold">
                      <Plus className="w-4 h-4 mr-2" />
                      New Chart
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Current Moon Status */}
            <ScrollReveal delay={0.1}>
              <div className="node-card border-accent/30 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Moon className="w-6 h-6 text-accent" />
                  <span className="system-label text-accent">Current Lunar Phase</span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-6">
                    <MoonPhaseGlyph phase={phaseKey} size="lg" />
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">
                        {phaseName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {(phase * 100).toFixed(1)}% illuminated
                      </p>
                    </div>
                  </div>
                  <div className="md:border-l md:border-r border-border/30 md:px-8">
                    <h4 className="text-sm text-muted-foreground mb-1">Today's Theme</h4>
                    <p className="font-serif text-xl text-foreground">{insight.title}</p>
                    <p className="text-accent text-sm mt-1">{insight.theme}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground mb-1">Guidance</h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {insight.instruction}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Lunar Audio Player */}
            <ScrollReveal delay={0.15}>
              <div className="mb-12">
                <LunarAudioPlayer />
              </div>
            </ScrollReveal>

            {/* Quick Actions */}
            <ScrollReveal delay={0.2}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <Link to="/lunar-cipher" className="node-card hover:border-accent/50 transition-colors">
                  <Moon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif text-lg text-foreground mb-2">Lunar Cipher</h3>
                  <p className="text-muted-foreground text-sm">
                    Discover your natal lunar phase
                  </p>
                </Link>
                <Link to="/lunar-reports" className="node-card hover:border-accent/50 transition-colors">
                  <FileText className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif text-lg text-foreground mb-2">Reports</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate personalized PDF reports
                  </p>
                </Link>
                <Link to="/workbooks" className="node-card hover:border-accent/50 transition-colors">
                  <Calendar className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif text-lg text-foreground mb-2">Workbooks</h3>
                  <p className="text-muted-foreground text-sm">
                    Browse the 26-workbook series
                  </p>
                </Link>
                <Link to="/settings" className="node-card hover:border-accent/50 transition-colors">
                  <Settings className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif text-lg text-foreground mb-2">Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage your preferences
                  </p>
                </Link>
              </div>
            </ScrollReveal>

            {/* Saved Charts */}
            <ScrollReveal delay={0.3}>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-foreground">Saved Charts</h2>
                  <span className="text-sm text-muted-foreground">
                    {savedCharts.length} chart{savedCharts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {loading ? (
                  <div className="node-card flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-accent animate-spin" />
                  </div>
                ) : savedCharts.length === 0 ? (
                  <div className="node-card text-center py-12">
                    <Moon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      No saved charts yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first lunar chart to begin your journey
                    </p>
                    <Link to="/lunar-cipher">
                      <Button variant="gold">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Chart
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedCharts.map((chart) => (
                      <div key={chart.id} className="node-card group">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-serif text-lg text-foreground">
                              {chart.chart_name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {format(new Date(chart.created_at), "MMM d, yyyy")}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteChart(chart.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {chart.chart_data?.natal_phase && (
                          <p className="text-accent text-sm mb-2">
                            {chart.chart_data.natal_phase}
                          </p>
                        )}
                        {chart.chart_data?.insight && (
                          <p className="text-muted-foreground text-sm">
                            {chart.chart_data.insight.title}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
