import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WORKBOOKS, SIGNS, getWorkbook, resolveWorkbook } from "@/data/chaperoneCanon";
import { Check, Gift, Loader2, Moon } from "lucide-react";

interface Entitlement {
  workbook_n: string;
  source: string;
}

const CLAIM_MESSAGES: Record<string, string> = {
  success: "Gift claimed. It has been added to your library.",
  already_claimed: "That gift has already been claimed.",
  expired: "That gift has expired.",
  not_paid: "That gift has not been paid for yet.",
  needs_auth: "Please sign in again and retry.",
  error: "That claim code was not recognised for this account.",
};

export default function ProgramPortal() {
  const { user } = useAuth();
  const sky = useMemo(() => resolveWorkbook(new Date()), []);

  const [currentStep, setCurrentStep] = useState<number>(sky.workbook.sequence);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [claiming, setClaiming] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data: member } = await supabase
      .from("program_members")
      .select("current_step")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!member) {
      await supabase.from("program_members").insert({
        user_id: user.id,
        start_step: sky.workbook.sequence,
        current_step: sky.workbook.sequence,
      });
      setCurrentStep(sky.workbook.sequence);
    } else {
      setCurrentStep(member.current_step);
    }

    const { data: ents } = await supabase
      .from("program_entitlements")
      .select("workbook_n, source")
      .eq("user_id", user.id);
    setEntitlements((ents as Entitlement[] | null) ?? []);
    setLoading(false);
  }, [user, sky.workbook.sequence]);

  useEffect(() => {
    void load();
  }, [load]);

  const advance = async () => {
    if (!user) return;
    const next = (currentStep % 24) + 1;
    setCurrentStep(next);
    await supabase
      .from("program_members")
      .update({ current_step: next })
      .eq("user_id", user.id);
    toast({ title: "Step marked complete", description: `Moved on to step ${next}.` });
  };

  const syncToSky = async () => {
    if (!user) return;
    setCurrentStep(sky.workbook.sequence);
    await supabase
      .from("program_members")
      .update({ current_step: sky.workbook.sequence })
      .eq("user_id", user.id);
    toast({ title: "Synced", description: "Your position now matches tonight's sky." });
  };

  const claim = async () => {
    const trimmed = code.trim();
    if (trimmed.length < 8) {
      toast({ title: "Enter a full claim code" });
      return;
    }
    setClaiming(true);
    const { data, error } = await supabase.rpc("claim_gift", { _claim_code: trimmed });
    const result = (data as string | null) ?? "error";

    if (error) {
      toast({ title: "Could not claim", description: error.message });
    } else {
      toast({ title: CLAIM_MESSAGES[result] ?? CLAIM_MESSAGES.error });

      if (result === "success" && user) {
        const { data: gifts } = await supabase
          .from("gifts")
          .select("product_id, gift_type")
          .eq("claim_code", trimmed)
          .limit(1);
        const gift = gifts?.[0];
        const rows =
          gift?.product_id && /^wb\d{2}$/.test(gift.product_id)
            ? [{ user_id: user.id, workbook_n: gift.product_id.slice(2), source: "gift" }]
            : WORKBOOKS.map((w) => ({
                user_id: user.id,
                workbook_n: w.n,
                source: "gift",
              }));
        await supabase.from("program_entitlements").upsert(rows, {
          onConflict: "user_id,workbook_n",
        });
        setCode("");
        await load();
      }
    }
    setClaiming(false);
  };

  const owned = new Set(entitlements.map((e) => e.workbook_n));
  const current = getWorkbook(String(currentStep).padStart(2, "0"))!;
  const next = WORKBOOKS[currentStep % 24];
  const completed = ((currentStep - 1) % 24) + 0;

  return (
    <PageTransition>
      <SEOHead
        title="Your Program Portal | Moontuner"
        description="Your place in the twenty-four half-cycle Lunar Workbook Program."
        canonical="/program/portal"
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <header className="pt-28 lg:pt-40 pb-10">
            <div className="container mx-auto px-6 lg:px-12">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                Program portal
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-light text-foreground mt-6">
                Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}.
              </h1>
            </div>
          </header>

          {loading ? (
            <div className="container mx-auto px-6 lg:px-12 py-16 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading your position…
            </div>
          ) : (
            <>
              <section className="border-t border-border py-12">
                <div className="container mx-auto px-6 lg:px-12 grid gap-6 lg:grid-cols-2 max-w-5xl">
                  <div className="border border-accent/30 bg-accent/[0.04] p-8">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent mb-3">
                      <Moon className="w-3.5 h-3.5" /> Where you are
                    </div>
                    <p className="font-serif text-2xl text-foreground">
                      Step {current.sequence} — {current.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{current.journey}</p>
                    <p className="text-sm text-muted-foreground/80 mt-5 leading-relaxed">
                      {current.prompt}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link to={`/program/workbook/${current.n}`}>
                        <Button variant="gold" size="sm">Open this workbook</Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={advance}>
                        <Check className="w-3.5 h-3.5 mr-2" /> Mark complete
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-5">
                      {completed} of 24 steps behind you · next up: {next.title}
                    </p>
                  </div>

                  <div className="border border-border bg-muted/10 p-8">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">
                      Tonight's sky
                    </div>
                    <p className="font-serif text-2xl text-foreground">
                      Step {sky.workbook.sequence} — {sky.workbook.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Moon in {SIGNS[sky.moonSign].name} ·{" "}
                      {Math.round(sky.illumination * 100)}% lit ·{" "}
                      {sky.waxing ? "waxing" : "waning"}
                    </p>
                    {sky.workbook.sequence !== current.sequence && (
                      <>
                        <p className="text-sm text-muted-foreground/70 mt-5 leading-relaxed">
                          You are working a different step than the live sky. That is
                          allowed — the arc is yours. Sync if you would rather run with
                          the phase.
                        </p>
                        <Button variant="ghost" size="sm" className="mt-4" onClick={syncToSky}>
                          Sync to tonight
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {/* Claim a gift */}
              <section className="border-t border-border py-12">
                <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-4">
                    <Gift className="w-3.5 h-3.5" /> Claim a gift
                  </div>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Given a workbook by someone else? Enter the claim code from the
                    email that was sent to this address.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Claim code"
                      className="max-w-xs"
                    />
                    <Button onClick={claim} disabled={claiming} variant="gold">
                      {claiming ? "Claiming…" : "Claim"}
                    </Button>
                  </div>
                </div>
              </section>

              {/* Library */}
              <section className="border-t border-border py-12 lg:py-16">
                <div className="container mx-auto px-6 lg:px-12">
                  <h2 className="font-serif text-3xl text-foreground mb-3">Your library</h2>
                  <p className="text-muted-foreground mb-10">
                    {owned.size === 0
                      ? "Nothing claimed yet — every workbook is still readable, and claimed ones are marked as yours."
                      : `${owned.size} of 24 workbooks are yours.`}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {WORKBOOKS.map((w) => (
                      <Link
                        key={w.n}
                        to={`/program/workbook/${w.n}`}
                        className={`block border p-5 bg-muted/10 transition-colors ${
                          owned.has(w.n)
                            ? "border-accent/40"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                            {w.n} of 24
                          </span>
                          {owned.has(w.n) && (
                            <span className="text-[10px] uppercase tracking-[0.18em] text-accent">
                              Yours
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg text-foreground mt-2">{w.title}</h3>
                        <p className="text-xs text-muted-foreground/70 mt-1">{w.journey}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
