import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import {
  generateProposal,
  saveProposal,
  loadProposals,
  clearProposals,
  type ProposalInput,
  type ProposalOutput,
  type TimingPosture,
} from "@/components/spacetime/ProposalEngine";
import { AIProposalAnalysis } from "@/components/ai/AIProposalAnalysis";

// ─── Constants ──────────────────────────────────────────────────────────────

const POSTURE_LABELS: Record<TimingPosture, string> = {
  advance: "Advance",
  hold: "Hold",
  observe: "Observe",
  clarify: "Clarify",
};

const POSTURE_DESC: Record<TimingPosture, string> = {
  advance: "Conditions favor movement.",
  hold: "Conditions favor restraint.",
  observe: "Conditions are ambiguous — stay present.",
  clarify: "Clarification precedes movement.",
};

type Stage = "compose" | "processing" | "proposal";

const EMPTY_INPUT: ProposalInput = {
  intention: "",
  uncertainty: "",
  resistance: "",
  direction: "",
  emotionalState: "",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SpacetimePrinter() {
  const [stage, setStage] = useState<Stage>("compose");
  const [input, setInput] = useState<ProposalInput>(EMPTY_INPUT);
  const [proposal, setProposal] = useState<ProposalOutput | null>(null);
  const [archive, setArchive] = useState<ProposalOutput[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const proposalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setArchive(loadProposals());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("processing");

    setTimeout(() => {
      const output = generateProposal(input);
      saveProposal(output);
      setProposal(output);
      setArchive(loadProposals());
      setStage("proposal");

      setTimeout(() => {
        proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }, 2400);
  };

  const handleReset = () => {
    setStage("compose");
    setInput(EMPTY_INPUT);
    setProposal(null);
  };

  const handleClearArchive = () => {
    clearProposals();
    setArchive([]);
    setShowClearConfirm(false);
  };

  const setField = (field: keyof ProposalInput) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setInput((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <PageTransition>
      <Navigation />

      <main className="min-h-screen bg-background text-foreground pt-28 pb-32">
        {/* ── Page header ── */}
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground mb-4 font-mono">
            Spacetime Printer · Proposal System
          </p>
          <h1
            className="text-4xl md:text-5xl font-extralight tracking-tight mb-5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Submit a Proposal.
          </h1>
          <p
            className="text-muted-foreground leading-relaxed max-w-xl font-sans font-medium text-base"
          >
            We do not make a plan. We submit a proposal. Intention-setting as
            collaborative participation with uncertainty — not command, not
            manifestation. A formal submission into conditions you do not fully
            control.
          </p>
        </div>

        {/* ── Main content area ── */}
        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* ── COMPOSE STAGE ── */}
            {stage === "compose" && (
              <motion.form
                key="compose"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <FieldBlock
                  index="01"
                  label="Intention"
                  hint="State what you are proposing to do, change, or move toward."
                  element="textarea"
                  rows={3}
                  required
                  value={input.intention}
                  onChange={setField("intention")}
                  placeholder="I intend to…"
                />

                <FieldBlock
                  index="02"
                  label="Uncertainty"
                  hint="What is genuinely unknown or unresolved? Name it directly."
                  element="textarea"
                  rows={2}
                  required
                  value={input.uncertainty}
                  onChange={setField("uncertainty")}
                  placeholder="I am uncertain about…"
                />

                <FieldBlock
                  index="03"
                  label="Resistance"
                  hint="What is working against this intention — internally or externally?"
                  element="textarea"
                  rows={2}
                  required
                  value={input.resistance}
                  onChange={setField("resistance")}
                  placeholder="What pushes back…"
                />

                <FieldBlock
                  index="04"
                  label="Desired Direction"
                  hint="Not a destination. A vector. Which way are you trying to move?"
                  element="input"
                  required
                  value={input.direction}
                  onChange={setField("direction")}
                  placeholder="Toward…"
                />

                <FieldBlock
                  index="05"
                  label="Emotional State"
                  hint="How are you arriving at this proposal? One phrase is enough."
                  element="input"
                  required
                  value={input.emotionalState}
                  onChange={setField("emotionalState")}
                  placeholder="Arriving as…"
                />

                {/* Divider */}
                <div className="border-t border-border/40 pt-10">
                  <button
                    type="submit"
                    className="w-full bg-foreground text-background py-4 text-xs tracking-[0.3em] uppercase font-mono hover:bg-accent transition-colors duration-300 rounded-sm"
                  >
                    Submit Proposal ↵
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-4 tracking-wide font-mono">
                    This proposal will be entered into your local archive.
                  </p>
                </div>
              </motion.form>
            )}

            {/* ── PROCESSING STAGE ── */}
            {stage === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-32 text-center"
              >
                <PrintingAnimation />
              </motion.div>
            )}

            {/* ── PROPOSAL STAGE ── */}
            {stage === "proposal" && proposal && (
              <motion.div
                key="proposal"
                ref={proposalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                {/* Controls */}
                <div className="flex items-center justify-between mb-10">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wide"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    New Proposal
                  </button>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-mono">
                    Proposal Submitted
                  </span>
                </div>

                {/* Document */}
                <ProposalDocument proposal={proposal} />

                {/* AI analysis — layered on top of deterministic output */}
                <AIProposalAnalysis proposal={proposal.input} />

                {/* Archive nudge */}
                <div className="mt-16 text-center">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-mono">
                    Proposal archived ↓
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── ARCHIVE ── */}
        {archive.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 mt-24">
            <div className="border-t border-border/40 pt-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-mono mb-1">
                    Proposal Archive
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {archive.length} {archive.length === 1 ? "entry" : "entries"} on record
                  </p>
                </div>
                {showClearConfirm ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Clear all records?</span>
                    <button
                      onClick={handleClearArchive}
                      className="text-xs text-destructive hover:text-destructive/80 transition-colors font-mono"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-0">
                {archive.map((p) => (
                  <ArchiveRow
                    key={p.id}
                    proposal={p}
                    isExpanded={expandedId === p.id}
                    onToggle={() =>
                      setExpandedId((prev) => (prev === p.id ? null : p.id))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </PageTransition>
  );
}

// ─── FieldBlock ───────────────────────────────────────────────────────────────

interface FieldBlockProps {
  index: string;
  label: string;
  hint: string;
  element: "input" | "textarea";
  rows?: number;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function FieldBlock({
  index,
  label,
  hint,
  element,
  rows = 2,
  required,
  value,
  onChange,
  placeholder,
}: FieldBlockProps) {
  const inputClass =
    "w-full bg-transparent border-b border-border text-foreground py-3 text-base focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40 resize-none";

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground/60 shrink-0">
          {index}
        </span>
        <label className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-mono">
          {label}
        </label>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{hint}</p>
      {element === "textarea" ? (
        <textarea
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  );
}

// ─── PrintingAnimation ────────────────────────────────────────────────────────

function PrintingAnimation() {
  const lines = [
    "RECEIVING INPUT",
    "ANALYZING CONTRADICTIONS",
    "DERIVING TIMING POSTURE",
    "GENERATING PROPOSAL",
    "PRINTING",
  ];
  const [visible, setVisible] = useState(0);
  const lineCount = lines.length;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= lineCount) clearInterval(interval);
    }, 420);
    return () => clearInterval(interval);
  }, [lineCount]);

  return (
    <div className="inline-block text-left">
      {lines.map((line, idx) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: idx < visible ? 1 : 0, x: idx < visible ? 0 : -8 }}
          transition={{ duration: 0.3 }}
          className="text-[11px] tracking-[0.3em] uppercase font-mono text-muted-foreground mb-2"
        >
          <span className="text-accent mr-3">›</span>
          {line}
        </motion.p>
      ))}
    </div>
  );
}

// ─── ProposalDocument ─────────────────────────────────────────────────────────

function ProposalDocument({ proposal }: { proposal: ProposalOutput }) {
  return (
    <div className="border border-border/60 rounded-sm">
      {/* Document header */}
      <div className="border-b border-border/40 px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-mono mb-1">
              Proposal Record
            </p>
            <p className="text-xs font-mono text-muted-foreground">{proposal.id}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-mono mb-1">
              Submitted
            </p>
            <p className="text-xs text-muted-foreground">{proposal.timestamp}</p>
          </div>
        </div>

        {/* Input echo */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          <InputEcho label="Intention" value={proposal.input.intention} />
          <InputEcho label="Direction" value={proposal.input.direction} />
          <InputEcho label="Uncertainty" value={proposal.input.uncertainty} />
          <InputEcho label="Resistance" value={proposal.input.resistance} />
          <InputEcho label="Emotional State" value={proposal.input.emotionalState} />
        </div>
      </div>

      {/* Analysis sections */}
      <div className="divide-y divide-border/40">
        <AnalysisSection
          index="I"
          label="Proposal Summary"
          body={proposal.summary}
        />

        <AnalysisSection
          index="II"
          label="Contradiction Analysis"
          body={proposal.contradiction}
        />

        <div className="px-8 py-7">
          <div className="flex items-start justify-between gap-8 mb-4">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-mono mb-1">
                <span className="mr-2 text-border">III</span>
                Timing Posture
              </p>
            </div>
            <PostureBadge posture={proposal.timingPosture} />
          </div>
          <p
            className="text-sm text-muted-foreground mb-3 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {POSTURE_DESC[proposal.timingPosture]}
          </p>
          <p
            className="text-base leading-relaxed font-sans"
          >
            {proposal.timingRationale}
          </p>
        </div>

        <AnalysisSection
          index="IV"
          label="Energetic Recommendation"
          body={proposal.recommendation}
        />

        {/* Next action — highlighted */}
        <div className="px-8 py-7 bg-muted/20">
          <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-mono mb-4">
            <span className="mr-2 text-border">V</span>
            Suggested Next Action
          </p>
          <p
            className="text-base leading-relaxed text-foreground font-sans"
          >
            {proposal.nextAction}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputEcho({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-mono mb-0.5">
        {label}
      </p>
      <p className="text-sm text-foreground/80 leading-snug">{value}</p>
    </div>
  );
}

function AnalysisSection({
  index,
  label,
  body,
}: {
  index: string;
  label: string;
  body: string;
}) {
  return (
    <div className="px-8 py-7">
      <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-mono mb-4">
        <span className="mr-2 text-border">{index}</span>
        {label}
      </p>
      <p
        className="text-base leading-relaxed"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {body}
      </p>
    </div>
  );
}

function PostureBadge({ posture }: { posture: TimingPosture }) {
  const colorMap: Record<TimingPosture, string> = {
    advance: "text-accent border-accent/40",
    hold: "text-muted-foreground border-border",
    observe: "text-foreground/70 border-border/60",
    clarify: "text-[hsl(42_50%_58%)] border-[hsl(42_50%_58%)]/40",
  };

  return (
    <span
      className={`inline-flex items-center border px-3 py-1 text-[10px] tracking-[0.3em] uppercase font-mono rounded-sm shrink-0 ${colorMap[posture]}`}
    >
      {POSTURE_LABELS[posture]}
    </span>
  );
}

// ─── ArchiveRow ───────────────────────────────────────────────────────────────

function ArchiveRow({
  proposal,
  isExpanded,
  onToggle,
}: {
  proposal: ProposalOutput;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const intentionTruncated =
    proposal.input.intention.length > 72
      ? proposal.input.intention.slice(0, 72) + "…"
      : proposal.input.intention;

  return (
    <div className="border-b border-border/30 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-5 text-left hover:bg-muted/10 transition-colors group px-1"
      >
        <div className="shrink-0 pt-0.5">
          <PostureBadge posture={proposal.timingPosture} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm text-foreground/80 leading-snug mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {intentionTruncated}
          </p>
          <p className="text-[10px] font-mono tracking-wide text-muted-foreground">
            {proposal.id} · {proposal.timestamp}
          </p>
        </div>
        <div className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors mt-1">
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-1">
              <ProposalDocument proposal={proposal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
