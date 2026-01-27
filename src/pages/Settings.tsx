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
} from "lucide-react";

interface UserPreferences {
  audio_enabled: boolean;
  volume: number;
  notifications_enabled: boolean;
}

interface UserProfile {
  display_name: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
}

const Settings = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<UserProfile>({
    display_name: "",
    birth_date: "",
    birth_time: "",
    birth_location: "",
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    audio_enabled: true,
    volume: 0.5,
    notifications_enabled: true,
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
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
        });
      }

      // Fetch preferences
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
      // Upsert profile
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email || "",
        display_name: profile.display_name || null,
        birth_date: profile.birth_date || null,
        birth_time: profile.birth_time || null,
        birth_location: profile.birth_location || null,
        updated_at: new Date().toISOString(),
      });

      // Upsert preferences
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        audio_enabled: preferences.audio_enabled,
        volume: preferences.volume,
        notifications_enabled: preferences.notifications_enabled,
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
                <div className="flex items-center gap-4 mb-8">
                  <Link
                    to="/dashboard"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <h1 className="font-serif text-3xl text-foreground">Settings</h1>
                    <p className="text-muted-foreground text-sm">
                      Manage your account and preferences
                    </p>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="node-card mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-accent" />
                    <h2 className="font-serif text-xl text-foreground">Profile</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profile.display_name}
                        onChange={(e) =>
                          setProfile({ ...profile, display_name: e.target.value })
                        }
                        placeholder="Your name"
                        className="bg-background"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Birth Date</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profile.birth_date}
                          onChange={(e) =>
                            setProfile({ ...profile, birth_date: e.target.value })
                          }
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthTime">Birth Time</Label>
                        <Input
                          id="birthTime"
                          type="time"
                          value={profile.birth_time}
                          onChange={(e) =>
                            setProfile({ ...profile, birth_time: e.target.value })
                          }
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthLocation">Birth Location</Label>
                      <Input
                        id="birthLocation"
                        value={profile.birth_location}
                        onChange={(e) =>
                          setProfile({ ...profile, birth_location: e.target.value })
                        }
                        placeholder="City, Country"
                        className="bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Audio Preferences */}
                <div className="node-card mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Volume2 className="w-5 h-5 text-accent" />
                    <h2 className="font-serif text-xl text-foreground">Audio</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="audioEnabled" className="text-foreground">
                          Enable Audio
                        </Label>
                        <p className="text-muted-foreground text-sm">
                          Play ambient lunar tones
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
                        <Label htmlFor="volume">Volume</Label>
                        <span className="text-muted-foreground text-sm">
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
                <div className="node-card mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-5 h-5 text-accent" />
                    <h2 className="font-serif text-xl text-foreground">Notifications</h2>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="text-foreground">
                        Lunar Phase Reminders
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Get notified at key moon phases
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
