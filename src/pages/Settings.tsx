import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { useUserMemory } from "@/hooks/useUserMemory";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Volume2,
  Bell,
  Save,
  Loader2,
  Check,
  Shield,
  Download,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

interface UserPreferences {
  audio_enabled: boolean;
  volume: number;
  notifications_enabled: boolean;
  ai_synthesis_enabled: boolean;
}

interface UserProfile {
  display_name: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  private_mode: boolean;
}

const Settings = () => {
  const { user } = useAuth();
  const { exportArchive } = useUserMemory();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    display_name: "",
    birth_date: "",
    birth_time: "",
    birth_location: "",
    private_mode: false,
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    audio_enabled: true,
    volume: 0.5,
    notifications_enabled: true,
    ai_synthesis_enabled: false,
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile({
          display_name: profileData.display_name || "",
          birth_date: profileData.birth_date || "",
          birth_time: profileData.birth_time || "",
          birth_location: profileData.birth_location || "",
          private_mode: profileData.private_mode ?? false,
        });
      }

      const { data: prefsData } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (prefsData) {
        setPreferences({
          audio_enabled: prefsData.audio_enabled ?? true,
          volume: prefsData.volume ?? 0.5,
          notifications_enabled: prefsData.notifications_enabled ?? true,
          ai_synthesis_enabled: prefsData.ai_synthesis_enabled ?? true,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setSaved(false);

    try {
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email || "",
        display_name: profile.display_name || null,
        birth_date: profile.birth_date || null,
        birth_time: profile.birth_time || null,
        birth_location: profile.birth_location || null,
        private_mode: profile.private_mode,
        updated_at: new Date().toISOString(),
      });

      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        audio_enabled: preferences.audio_enabled,
        volume: preferences.volume,
        notifications_enabled: preferences.notifications_enabled,
        ai_synthesis_enabled: preferences.ai_synthesis_enabled,
        updated_at: new Date().toISOString(),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportArchive();
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                  <Link
                    to="/dashboard"
                    className="p-2 text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-0.5 font-sans">
                      Preferences
                    </p>
                    <h1 className="font-serif text-3xl text-foreground">Your Profile</h1>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="node-card mb-6 border-border/40">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-4 h-4 text-accent/70" />
                    <h2 className="font-serif text-lg text-foreground">Signal</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="displayName" className="text-foreground/70 text-sm">
                        Name
                      </Label>
                      <Input
                        id="displayName"
                        value={profile.display_name}
                        onChange={(e) =>
                          setProfile({ ...profile, display_name: e.target.value })
                        }
                        placeholder="How you'd like to be known"
                        className="bg-background border-border/50"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="birthDate" className="text-foreground/70 text-sm">
                          Birth Date
                        </Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profile.birth_date}
                          onChange={(e) =>
                            setProfile({ ...profile, birth_date: e.target.value })
                          }
                          className="bg-background border-border/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="birthTime" className="text-foreground/70 text-sm">
                          Birth Time
                        </Label>
                        <Input
                          id="birthTime"
                          type="time"
                          value={profile.birth_time}
                          onChange={(e) =>
                            setProfile({ ...profile, birth_time: e.target.value })
                          }
                          className="bg-background border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="birthLocation" className="text-foreground/70 text-sm">
                        Birth Location
                      </Label>
                      <Input
                        id="birthLocation"
                        value={profile.birth_location}
                        onChange={(e) =>
                          setProfile({ ...profile, birth_location: e.target.value })
                        }
                        placeholder="City, Country"
                        className="bg-background border-border/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Audio Preferences */}
                <div className="node-card mb-6 border-border/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Volume2 className="w-4 h-4 text-accent/70" />
                    <h2 className="font-serif text-lg text-foreground">Ambient Audio</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="audioEnabled" className="text-foreground/80">
                          Lunar Tones
                        </Label>
                        <p className="text-muted-foreground/50 text-sm">
                          Play ambient sound during sessions
                        </p>
                      </div>
                      <Switch
                        id="audioEnabled"
                        checked={preferences.audio_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, audio_enabled: checked })
                        }
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="volume" className="text-foreground/70 text-sm">Volume</Label>
                        <span className="text-muted-foreground/50 text-sm">
                          {Math.round(preferences.volume * 100)}%
                        </span>
                      </div>
                      <Slider
                        id="volume"
                        min={0}
                        max={1}
                        step={0.01}
                        value={[preferences.volume]}
                        onValueChange={([value]) =>
                          setPreferences({ ...preferences, volume: value })
                        }
                        disabled={!preferences.audio_enabled}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="node-card mb-6 border-border/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-4 h-4 text-accent/70" />
                    <h2 className="font-serif text-lg text-foreground">Reminders</h2>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="text-foreground/80">
                        Lunar Phase Reminders
                      </Label>
                      <p className="text-muted-foreground/50 text-sm">
                        A quiet signal at key moon phases
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={preferences.notifications_enabled}
                      onCheckedChange={(checked) =>
                        setPreferences({
                          ...preferences,
                          notifications_enabled: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Privacy */}
                <div className="node-card mb-6 border-border/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-4 h-4 text-accent/70" />
                    <h2 className="font-serif text-lg text-foreground">Privacy</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="privateMode" className="text-foreground/80 flex items-center gap-2">
                          {profile.private_mode ? (
                            <EyeOff className="w-3.5 h-3.5 text-muted-foreground/60" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-muted-foreground/60" />
                          )}
                          Private Mode
                        </Label>
                        <p className="text-muted-foreground/50 text-sm mt-0.5">
                          Keeps your record entirely to yourself
                        </p>
                      </div>
                      <Switch
                        id="privateMode"
                        checked={profile.private_mode}
                        onCheckedChange={(checked) =>
                          setProfile({ ...profile, private_mode: checked })
                        }
                      />
                    </div>

                    <div className="pt-4 border-t border-border/20">
                      <p className="text-foreground/70 text-sm mb-1">Export Archive</p>
                      <p className="text-muted-foreground/50 text-sm mb-4 leading-relaxed">
                        Download a complete copy of your memories, timeline, and charts
                        as a JSON file. Your data belongs to you.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExport}
                        disabled={exporting}
                        className="border-border/40"
                      >
                        {exporting ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Download className="w-4 h-4 mr-2" />
                        )}
                        {exporting ? "Preparing archive…" : "Download Archive"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* AI Synthesis */}
                <div className="node-card mb-8 border-border/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-4 h-4 text-accent/70" />
                    <h2 className="font-serif text-lg text-foreground">Reflective AI</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="aiSynthesis" className="text-foreground/80">
                          Pattern Synthesis
                        </Label>
                        <p className="text-muted-foreground/50 text-sm mt-0.5 leading-relaxed">
                          Allow the AI to observe patterns in your record and surface
                          recurring themes, timing observations, and gentle suggestions.
                        </p>
                      </div>
                      <Switch
                        id="aiSynthesis"
                        checked={preferences.ai_synthesis_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            ai_synthesis_enabled: checked,
                          })
                        }
                      />
                    </div>

                    <p
                      className="text-[0.68rem] leading-[1.6]"
                      style={{ color: "hsl(40 12% 36%)" }}
                    >
                      When enabled, your timeline and memory data is processed by the
                      synthesis engine to generate observations. No data is shared with
                      third parties. Synthesis results are cached on the server for 24 hours
                      to reduce processing. You can disable this at any time.
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Settings;

