import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { readSharedBirth, writeSharedBirth } from "@/hooks/useSharedBirth";
import {
  WORKBOOKS,
  SIGNS,
  OPPOSITE,
  resolveWorkbook,
  type SignCode,
} from "@/data/chaperoneCanon";

interface BirthData {
  birth_date: string | null;
  birth_time: string | null;
  birth_location: string | null;
}

const relation = (natal: SignCode, step: SignCode): string => {
  if (natal === step) return "Your own ground";
  if (OPPOSITE[natal] === step) return "Direct opposition";
  if (SIGNS[natal].element === SIGNS[step].element) return "Same element — easy air";
  if (SIGNS[natal].modality === SIGNS[step].modality) return "Same modality — friction";
  return "Neutral passage";
};

export default function ProgramPersona() {
  const { user } = useAuth();
  const [birth, setBirth] = useState<BirthData>({
    birth_date: null,
    birth_time: null,
    birth_location: null,
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      const shared = readSharedBirth();
      setBirth({ birth_date: shared.date || null, birth_time: shared.time || null, birth_location: shared.location || null });
      setLoaded(true);
      return;
    }
    void (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("birth_date, birth_time, birth_location")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setBirth(data as BirthData);
        writeSharedBirth({
          date: data.birth_date ?? "",
          time: data.birth_time?.slice(0, 5) ?? "",
          location: data.birth_location ?? "",
        });
      }
      setLoaded(true);
    })();
  }, [user]);

  const natal = useMemo(() => {
    if (!birth.birth_date) return null;
    const iso = `${birth.birth_date}T${birth.birth_time || "12:00"}:00`;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return resolveWorkbook(d);
  }, [birth.birth_date, birth.birth_time]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        birth_date: birth.birth_date,
        birth_time: birth.birth_time,
        birth_location: birth.birth_location,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (!error) writeSharedBirth({
      date: birth.birth_date ?? "",
      time: birth.birth_time?.slice(0, 5) ?? "",
      location: birth.birth_location ?? "",
    });
    toast(
      error
        ? { title: "Could not save", description: error.message }
        : { title: "Saved", description: "Your edition has been recalculated." },
    );
  };

  return (
    <PageTransition>
      <SEOHead
        title="Persona Edition — Your Own Lunar Arc | Moontuner"
        description="The Persona Edition lays your birth moment over the twenty-four half-cycle canon, so every step of the year is read against your own signature."
        canonical="/program/persona"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <header className="pt-28 lg:pt-40 pb-12">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                Persona Edition
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-6 mb-5 leading-[1.1]">
                The same year, read in your own signature.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                The canon is archetypal. This edition anchors it to the moment you
                arrived — which half-cycle you were born inside, and how each of the
                twenty-four steps sits against it.
              </p>
            </div>
          </header>

          {/* Birth data */}
          <section className="border-t border-border py-12">
            <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-6">
                Your birth moment
              </h2>

              {!user ? (
                <div className="border border-border bg-muted/10 p-8">
                  <p className="text-muted-foreground mb-6">
                    Sign in to save your birth details and keep your edition
                    between visits.
                  </p>
                  <Link to="/auth">
                    <Button variant="gold">Sign in</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="bd">Date</Label>
                    <Input
                      id="bd"
                      type="date"
                      value={birth.birth_date ?? ""}
                      onChange={(e) => setBirth((b) => ({ ...b, birth_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bt">Time</Label>
                    <Input
                      id="bt"
                      type="time"
                      value={birth.birth_time?.slice(0, 5) ?? ""}
                      onChange={(e) => setBirth((b) => ({ ...b, birth_time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bl">Place</Label>
                    <Input
                      id="bl"
                      value={birth.birth_location ?? ""}
                      placeholder="City, country"
                      onChange={(e) =>
                        setBirth((b) => ({ ...b, birth_location: e.target.value }))
                      }
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <Button onClick={save} disabled={saving} variant="gold">
                      {saving ? "Saving…" : "Save and recalculate"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Reading */}
          {loaded && natal && (
            <>
              <section className="border-t border-border py-12">
                <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
                  <div className="border border-accent/30 bg-accent/[0.04] p-8">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-accent mb-3">
                      Your natal half-cycle
                    </div>
                    <p className="font-serif text-3xl text-foreground">
                      Step {natal.workbook.sequence} — {natal.workbook.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {natal.workbook.journey} · Moon in {SIGNS[natal.moonSign].name} ·{" "}
                      {Math.round(natal.illumination * 100)}% lit at birth ·{" "}
                      {natal.waxing ? "waxing" : "waning"}
                    </p>
                    <p className="text-foreground/85 leading-relaxed mt-6">
                      {natal.workbook.blurb}
                    </p>
                    <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
                      You arrived inside a {natal.waxing ? "building" : "releasing"} half.
                      That is your home tempo: the part of the cycle where effort costs
                      you least, and the part you will keep returning to whether or not
                      you plan it.
                    </p>
                    <Link
                      to={`/program/workbook/${natal.workbook.n}`}
                      className="mt-6 inline-block"
                    >
                      <Button variant="gold" size="sm">
                        Read your home workbook
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="border-t border-border py-12 lg:py-16">
                <div className="container mx-auto px-6 lg:px-12">
                  <h2 className="font-serif text-3xl text-foreground mb-3">
                    The year against your signature
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mb-10">
                    Every step in the canon, read against the sign your Moon occupied
                    at birth.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {WORKBOOKS.map((w) => (
                      <Link
                        key={w.n}
                        to={`/program/workbook/${w.n}`}
                        className={`block border p-5 bg-muted/10 transition-colors ${
                          w.n === natal.workbook.n
                            ? "border-accent/50"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                          {w.n} of 24
                        </span>
                        <h3 className="font-serif text-lg text-foreground mt-2">{w.title}</h3>
                        <p className="text-xs text-muted-foreground/70 mt-1">{w.journey}</p>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-accent mt-4">
                          {relation(natal.moonSign, w.start)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {loaded && user && !natal && (
            <section className="border-t border-border py-12">
              <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
                <p className="text-muted-foreground">
                  Add your birth date above and the whole year will be rewritten
                  against it.
                </p>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
