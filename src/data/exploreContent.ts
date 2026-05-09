// ─── Explore / SEO Landing Page Content ───────────────────────────────────────
//
// Each concept targets real human search queries around emotional regulation,
// intentional living, creative rhythm, and digital mindfulness.
// Editorial voice: calm, intelligent, grounded — not clickbait or pseudo-science.

export interface ExploreConcept {
  slug: string;
  /** Page <title> and main H1 */
  title: string;
  /** Short label for navigation/cards */
  label: string;
  /** SEO meta description — answers the query directly */
  seoDescription: string;
  /** Primary emotional category for filtering */
  emotionalCategory:
    | "creative-rhythm"
    | "emotional-regulation"
    | "intentional-living"
    | "digital-wellness"
    | "timing-awareness"
    | "identity"
    | "reflective-practice";
  /** Optional associated moon phase */
  lunarPhase?: string;
  /** SEO keyword targets */
  keywords: string[];
  /** Introductory standfirst (2–3 sentences) */
  standfirst: string;
  /** Body sections — each with a subheading and paragraphs */
  sections: Array<{
    heading: string;
    body: string; // multi-paragraph, separated by \n\n
  }>;
  /** Closing reflection/call to sit */
  closing: string;
  /** Where to send the reader next */
  relatedConcepts: string[];
  /** Journal entry slugs to feature on this page */
  relatedJournalSlugs: string[];
  /** Primary CTA */
  callToAction: {
    label: string;
    href: string;
    description: string;
  };
  /** Secondary CTA */
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export const EXPLORE_CONCEPTS: ExploreConcept[] = [
  // ─── 1. Push vs Hold ──────────────────────────────────────────────────────────
  {
    slug: "push-vs-hold",
    title: "Push vs Hold: Understanding Your Creative Energy State",
    label: "Push vs Hold",
    seoDescription:
      "Why do you lose momentum — and is it a failure, or a signal? Push and Hold are two distinct creative energy states. Recognizing which one you're in changes everything.",
    emotionalCategory: "creative-rhythm",
    lunarPhase: "First Quarter",
    keywords: [
      "why do I lose momentum",
      "push vs hold creative energy",
      "when to push and when to rest",
      "cyclical creative momentum",
      "forcing things vs trusting timing",
      "creative burnout vs rest",
      "how to stop forcing things",
    ],
    standfirst:
      "There are moments when effort compounds beautifully — when every action accelerates the next. And there are moments when effort produces friction, resistance, diminishing returns. Most of us treat these two states the same way: push harder. Moontuner names the distinction.",
    sections: [
      {
        heading: "The false story of constant momentum",
        body: `Modern productivity culture is built on a single premise: that forward motion is always available, and that its absence indicates a personal failure. We are told to build systems, maintain streaks, optimize routines. We are not told that some periods of life are structurally incompatible with acceleration — and that trying to accelerate through them creates a particular kind of exhaustion that takes months to recover from.

Push and Hold are not metaphors. They are recognizable energetic states, each with distinct qualities, each productive in specific ways, each harmful when misapplied.

A Push state is characterized by clarity, forward orientation, high tolerance for friction, available willpower, and genuine momentum. Ideas move through you quickly. Decisions feel obvious. Starting and sustaining feel natural. This is the time to act with full weight behind you.

A Hold state is characterized by something that looks like resistance but is actually a different kind of productivity: integration, discernment, refinement, rest, consolidation. This is not the absence of momentum. It is momentum of a slower, more internal kind.`,
      },
      {
        heading: "What forcing a Push state costs you",
        body: `When you try to force a Push state on a Hold phase, the work produced often lacks the depth it would have had if you had waited. You can usually feel this afterward — the thing that exists doesn't quite carry the weight it should. Something was produced before it was ready.

More costly than the output quality is what forcing costs your nervous system. The experience of pushing against genuine Hold energy creates a specific kind of depletion — not tiredness, exactly, but a kind of erosion. The motivation to do the very thing you were pushing toward quietly disappears. Creative people know this feeling well: you worked hard, you produced something, and now you feel less interested in the work than before you started.

This is why creative burnout so often follows periods of intense productivity. It isn't that you worked too hard. It's that you worked at the wrong time, in the wrong direction, against the grain of your own timing.`,
      },
      {
        heading: "How to recognize which state you're in",
        body: `Push states have a particular quality: when you sit down to work, something moves. There is a current. It may not be effortless — Push often involves friction, resistance, difficulty — but the movement is real. The friction is productive. You finish the session having made progress you can feel.

Hold states feel different. When you sit down to work in a Hold phase, you often feel like you're pushing on a locked door. The ideas aren't moving. Or they move, but feel hollow, premature, not-yet-true. You may produce output, but you won't trust it. There is a quality of forcing.

Some questions to locate yourself: Are you drawn toward beginning or completing? Is your inner monologue oriented toward what's possible or what's unresolved? Do new ideas feel exciting or overwhelming? Are you drawing energy from external activity or requiring withdrawal to recharge?

There are no universally correct answers. But your honest responses reveal something about the phase you're in.`,
      },
      {
        heading: "The lunar dimension",
        body: `Moon phases offer one reliable timing map for these shifts. The waxing half of the lunar cycle — New Moon through Full Moon — carries a structural bias toward outward movement, initiation, and accumulation. The waning half — Full Moon through New Moon — carries a structural bias toward reflection, integration, reduction, and rest.

This doesn't mean you can never produce during a waning phase. It means the quality of production during a waning phase tends to be different: more editorial than generative, more comparative than creative, more refinement than invention.

Many people find that their Push states naturally concentrate in the first half of the lunar cycle, and their Hold states naturally arise in the second half — without any intention or planning. They're already reading this map in their body. Moontuner simply makes it legible.`,
      },
    ],
    closing:
      "The next time you feel what you might call resistance, pause before you push harder. Ask: is this resistance asking me to push through — or is it asking me to hold? The two experiences feel similar in the moment. But they call for opposite responses.",
    relatedConcepts: [
      "cyclical-productivity",
      "creative-exhaustion",
      "when-to-rest",
    ],
    relatedJournalSlugs: [
      "spacetime-proposal-creative-project",
      "full-moon-release-practice",
    ],
    callToAction: {
      label: "See Today's Directive",
      href: "/",
      description:
        "Today's Directive tells you whether the current lunar energy is a Push, Hold, Release, or Recover phase — calibrated to live lunar data.",
    },
    secondaryCTA: {
      label: "Read the Journal",
      href: "/journal",
    },
  },

  // ─── 2. Emotional Weather ─────────────────────────────────────────────────────
  {
    slug: "emotional-weather",
    title: "What Is Emotional Weather? A Map for Your Internal Forecast",
    label: "Emotional Weather",
    seoDescription:
      "Emotional weather is the shifting internal climate that shapes how you perceive and respond to each day. Understanding it helps you navigate overwhelm, anxiety, and emotional cycles more skillfully.",
    emotionalCategory: "emotional-regulation",
    keywords: [
      "feeling emotionally overwhelmed",
      "emotional weather explained",
      "how to understand your emotions",
      "emotional cycles and patterns",
      "emotional regulation tools",
      "internal emotional climate",
      "why do I feel off today",
    ],
    standfirst:
      "Before you can regulate an emotion, you need to name it accurately. 'Emotional Weather' is the term Moontuner uses for the shifting internal climate that conditions your day — not your character, not your diagnosis, but your present atmospheric state.",
    sections: [
      {
        heading: "The problem with \"how are you\" culture",
        body: `Most of us have about five words for our emotional state: fine, good, tired, stressed, anxious. This vocabulary is nowhere near sufficient for navigating the actual complexity of human emotional experience.

What passes for emotional awareness in most productivity and self-help discourse is actually emotional labeling — the rough assignment of a few broad categories to an enormously textured inner landscape. It's like describing weather as "good" or "bad." Technically functional. Almost useless for planning.

Emotional Weather is a more precise map. It asks: what is the quality of your current internal atmosphere? Not just the valence (positive or negative) but the texture, temperature, and movement of what you're experiencing.`,
      },
      {
        heading: "What makes weather distinct from mood",
        body: `Mood is relatively stable — it persists across hours or days. Weather is more dynamic — it can shift across a single afternoon. Mood is influenced by temperament, sleep, nutrition, relational patterns. Weather is influenced by all of those, plus the accumulated micro-experiences of any given day: the tone of a message, the quality of morning light, whether you ate lunch.

Identifying something as weather rather than mood shifts your relationship to it. Weather is not who you are. It's what's happening in your atmosphere right now. Weather passes. Weather can be responded to skillfully or unskillfully. Weather gives you information without demanding a verdict about your character.

This distinction is not merely semantic. It is a structural change in how you relate to your own emotional experience. People who treat transient weather as permanent mood spend significant energy trying to "fix" emotional states that would have passed on their own.`,
      },
      {
        heading: "The language of emotional weather in practice",
        body: `Moontuner's emotional weather descriptions use qualitative language rather than diagnostic categories: Quiet · Inward · Slow. Bright · Exposed · Whole. Tender momentum. Tension into traction. Almost · Refining · Patient.

This vocabulary is deliberately poetic, not clinical. It doesn't pathologize. It doesn't optimize. It observes and names with precision and warmth.

When you can say "I'm in a low, dreaming, restorative weather pattern" rather than "I'm depressed" or "I'm tired," you've changed the frame dramatically. The first is a description of an atmospheric state that has particular qualities and calls for particular responses. The second tends to summon judgment, urgency, or resistance.

The quality of your self-observation changes what you do next. More precise observation produces more useful responses.`,
      },
      {
        heading: "Emotional weather and the lunar cycle",
        body: `Research on lunar-correlated emotional patterns is preliminary but growing. More practically useful is observational practice: many people notice consistent emotional weather patterns that recur in predictable positions within the lunar cycle — inward and quiet around New Moons, exposed and emotionally heightened around Full Moons, generative and tender in the Waxing Crescent, integrative and editorial in the Waning Gibbous.

Tracking your own emotional weather across multiple lunar cycles reveals your personal pattern. Not a universal law — your individual temperament, life circumstances, and nervous system all shape your specific experience. But patterns exist. Noticing them gives you anticipatory capacity: the ability to recognize a weather system before it fully arrives and to prepare accordingly.`,
      },
    ],
    closing:
      "Today's emotional weather is simply data. It is the atmospheric report that helps you respond to yourself with appropriate skill. You don't argue with rain. You observe it, dress accordingly, and make choices that fit the actual conditions.",
    relatedConcepts: [
      "push-vs-hold",
      "reflective-recovery",
      "how-to-regain-clarity",
    ],
    relatedJournalSlugs: [
      "full-moon-release-practice",
      "waning-crescent-quiet-before",
    ],
    callToAction: {
      label: "Check Today's Emotional Weather",
      href: "/",
      description:
        "Today's Directive includes the current emotional weather forecast, calibrated to live lunar data and updated daily.",
    },
    secondaryCTA: {
      label: "Explore the Journal",
      href: "/journal",
    },
  },

  // ─── 3. Digital Smudging ─────────────────────────────────────────────────────
  {
    slug: "digital-smudging",
    title: "What Is Digital Smudging? A Practice for Digital Overwhelm",
    label: "Digital Smudging",
    seoDescription:
      "Digital Smudging is a structured ritual for clearing digital overwhelm, reclaiming attention, and resetting your relationship with technology. Not a detox — a deliberate clearing.",
    emotionalCategory: "digital-wellness",
    keywords: [
      "digital overwhelm and anxiety",
      "digital detox alternative",
      "how to reset your relationship with technology",
      "screen time anxiety",
      "digital wellness practice",
      "what is digital smudging",
      "clearing digital clutter",
      "information overwhelm",
    ],
    standfirst:
      "Digital Smudging is not a detox. Detoxes imply that technology is a toxin to be purged. Smudging is a clearing ritual — a deliberate, intentional pass through your digital environment to remove what has accumulated without consent, restore what actually matters, and set protective boundaries for what follows.",
    sections: [
      {
        heading: "The problem that digital smudging addresses",
        body: `Most people's digital environments have grown without design. They contain the residue of every anxious midnight scroll, every notification consent granted without thought, every subscription accepted in exchange for something immediately forgotten. The average smartphone user has 80 apps, opens their phone 96 times a day, and carries a perpetual, low-grade sense of being behind.

This accumulation is not neutral. It exerts real cognitive load. Every open tab is a small piece of working memory. Every unread notification is a small piece of attention. Every app that hasn't been intentionally chosen is a claim on your time that you didn't explicitly agree to.

Digital Smudging treats your digital environment as a space that can be cluttered or clear, heavy or light, chaotic or intentional — and that this quality has real effects on your cognitive and emotional experience.`,
      },
      {
        heading: "The five chambers of a smudging session",
        body: `A Digital Smudging session moves through five distinct phases, each with a specific function.

The Sage Scan is an inventory: what is in your digital environment that shouldn't be? Not a judgment, but an honest observation. Apps opened from anxiety rather than intention. Tabs representing a version of yourself with more time. Group chats you inhabit as a ghost. Email subscriptions that make you feel behind before you've had coffee.

Cord Cutting is the release: deliberately closing, muting, unsubscribing, deleting. Each one acknowledged rather than mindlessly swept away. The acknowledgment matters — it completes the relationship rather than abandoning it.

The Void is the pause between clearing and rebuilding. Most clearing practices skip this. But sitting with the emptiness — the lighter screen, the fewer obligations — is how you assess what was actually yours and what was just noise.

Wards are the new boundaries you set: notifications off until a chosen hour, social media deferred until a task is done, the inbox checked on a schedule rather than continuously monitored. Wards are not rules. They are intentional choices.

Lunar Sync aligns the practice with the lunar cycle. New Moon is the optimal clearing window — a structural alignment between external practice and natural rhythm.`,
      },
      {
        heading: "What makes smudging different from a digital detox",
        body: `Digital detoxes operate on a binary: off or on, clean or dirty. They require a vacation from technology — a break that is often followed by an immediate return to old patterns, because nothing structural has changed.

Smudging works differently. It doesn't require total abstinence. It requires deliberate reduction and conscious re-curation. It's less about removing technology from your life and more about reclaiming authorship of your digital environment.

After a smudging session, the goal isn't a phone-free life. The goal is a digital environment that reflects actual choices rather than accumulated defaults — where what's there was chosen, where the boundaries were set, where the morning feels available rather than pre-occupied.`,
      },
      {
        heading: "The emotional effects of a cleared digital space",
        body: `The most commonly reported experience after a smudging session is a sense of spaciousness — a feeling that the screen is lighter, that the morning has more room in it, that attention is available for things that actually matter.

This isn't mystical. It's attentional. When your digital environment makes fewer demands, more attentional resources are available for deliberate use. The cognitive load reduction is real and measurable in its effects, even if the practice that produces it has a poetic name.

Many people also report that the practice of acknowledging each thing they release — rather than bulk-deleting or mindlessly scrolling away — produces a different quality of resolution. There is something that functions like completion in the deliberate act of naming what you're releasing and then releasing it.`,
      },
    ],
    closing:
      "Your digital environment is a space you inhabit. Like any space, it can be maintained or allowed to accumulate. Digital Smudging is the maintenance practice — the seasonal clearing that keeps the space yours.",
    relatedConcepts: [
      "emotional-weather",
      "reflective-recovery",
      "intention-vs-control",
    ],
    relatedJournalSlugs: ["digital-smudging-spring-clearing"],
    callToAction: {
      label: "Begin a Smudging Session",
      href: "/digital-smudging",
      description:
        "The full Digital Smudging experience — five chambers, guided clearing, intentional wards — is available as an interactive ritual.",
    },
    secondaryCTA: {
      label: "Read Smudging Logs",
      href: "/journal",
    },
  },

  // ─── 4. Cyclical Productivity ─────────────────────────────────────────────────
  {
    slug: "cyclical-productivity",
    title: "Cyclical Productivity: Why Linear Output Models Fail Creative People",
    label: "Cyclical Productivity",
    seoDescription:
      "Linear productivity systems assume constant capacity. Cyclical productivity works with natural rhythms of energy, creativity, and rest — producing better output with less depletion.",
    emotionalCategory: "creative-rhythm",
    keywords: [
      "cyclical productivity",
      "emotional burnout cycles",
      "why productivity systems fail creative people",
      "natural productivity rhythms",
      "creative cycles and rest",
      "why I can't sustain productivity",
      "cyclical work patterns",
      "how to work with your natural energy",
    ],
    standfirst:
      "Linear productivity assumes that capacity is constant and that inconsistency indicates a problem with systems, discipline, or character. Cyclical productivity recognizes that capacity is inherently variable — and that the variability is not the problem. The problem is treating it as one.",
    sections: [
      {
        heading: "The linear model and why it fails",
        body: `The dominant productivity philosophy of the last 50 years is essentially industrial: define inputs, optimize processes, measure outputs, identify and eliminate inefficiencies. Apply consistently. Sustain indefinitely.

This model works well for manufacturing. It works poorly for knowledge work, creative work, emotional work, relational work — the majority of what humans actually do.

The failure mode is consistent: people attempt to sustain linear output. They achieve it, with some effort, for weeks or months. Then capacity collapses — through burnout, illness, disengagement, or creative drought. They attribute this to personal failing. They attempt to rebuild the same linear system. The cycle repeats.

The system isn't breaking down because of insufficient willpower. The system is breaking down because it's based on a false model of human capacity.`,
      },
      {
        heading: "What cyclical capacity actually looks like",
        body: `Human capacity — cognitive, creative, emotional, physical — moves in cycles. These cycles operate at multiple timescales simultaneously: circadian rhythms within a day, ultradian rhythms within hours, weekly rhythms, seasonal rhythms, lunar rhythms, and longer life-phase rhythms.

In each cycle, there is a period of accumulation (capacity increasing, energy available for outward expression), a peak (maximum capacity, highest output quality), and a period of integration (energy turning inward, processing what was accumulated, preparing for the next accumulation).

These are not personal weaknesses. They are structural features of biological systems. Every living system that sustains itself over time does so through cycles — alternating between expansion and contraction, output and restoration, activity and rest.

The creative and professional people who sustain long careers tend to be, in retrospect, people who worked cyclically — who recognized their high-capacity periods and concentrated their most demanding work there, and who protected their restoration periods even when it felt counterproductive.`,
      },
      {
        heading: "Lunar cycles as a productivity map",
        body: `The lunar cycle offers a 29.5-day rhythm that many people find calibrates naturally with their own capacity patterns. This is not because the Moon exercises mystical control over human behavior. It's because having a consistent external rhythm to observe against your own internal patterns is useful for self-knowledge.

The New Moon phase tends to correspond with lowest external output but highest internal clarity — an ideal time for intention-setting, planning, and discernment. The Waxing phases correspond with increasing capacity for outward expression and accumulation. The Full Moon corresponds with maximum visibility — both of work and of internal states. The Waning phases correspond with integration, reflection, editing, and deliberate completion.

Using the lunar cycle as a loose productivity map doesn't require believing anything supernatural about the Moon. It requires only that you have a consistent rhythm to calibrate against — and that you observe your own patterns honestly over time.`,
      },
      {
        heading: "Practical cyclical work patterns",
        body: `Cyclical productivity in practice means planning for variation rather than against it. Instead of asking "how do I sustain the same output indefinitely," it asks "how do I distribute my work across cycles in a way that honors both my high-capacity and my restoration periods?"

In practice, this might mean: concentrating your highest-stakes creative work in the first half of your lunar cycle. Reserving editorial, administrative, and integrative tasks for the second half. Scheduling genuine rest during Waning Crescent periods rather than treating them as time to catch up. Planning for the natural productivity dip around New Moon rather than being surprised by it.

It also means tracking: noting, over several cycles, when your energy is consistently highest, when your ideas are clearest, when your motivation is most available. This observational practice produces a personal map of your own cyclical patterns — which will differ from anyone else's pattern, because individual variation is real.`,
      },
    ],
    closing:
      "The question isn't how to maintain constant output. The question is how to produce your best work across cycles, protecting both your peak capacity and your restoration capacity — so that both remain available, indefinitely.",
    relatedConcepts: [
      "push-vs-hold",
      "when-to-rest",
      "creative-exhaustion",
    ],
    relatedJournalSlugs: [
      "spacetime-proposal-creative-project",
      "workbook-entry-phase-2-arrival",
    ],
    callToAction: {
      label: "Track Your Cycle",
      href: "/lunar-cipher",
      description:
        "The Lunar Cipher helps you observe your emotional and creative patterns across lunar cycles — building a personal map of your own rhythms.",
    },
    secondaryCTA: {
      label: "View Lunar Reports",
      href: "/lunar-reports",
    },
  },

  // ─── 5. Creative Exhaustion ───────────────────────────────────────────────────
  {
    slug: "creative-exhaustion",
    title: "Creative Exhaustion: What It Is, Why It Happens, and How to Recover",
    label: "Creative Exhaustion Recovery",
    seoDescription:
      "Creative exhaustion is not laziness or block — it's a specific depletion pattern that requires specific recovery. Here's what it is and how to genuinely restore creative capacity.",
    emotionalCategory: "creative-rhythm",
    keywords: [
      "creative exhaustion recovery",
      "creative burnout",
      "how to recover creative energy",
      "creative block vs creative exhaustion",
      "when creativity stops",
      "why I can't create anymore",
      "restoring creative motivation",
      "creative depletion",
    ],
    standfirst:
      "Creative exhaustion is often misidentified as laziness, block, or depression. It has qualities that overlap with all three — but it's a distinct experience with a distinct cause and a distinct recovery path. Misidentifying it leads to recovery strategies that make it worse.",
    sections: [
      {
        heading: "What creative exhaustion actually is",
        body: `Creative exhaustion is not the absence of ideas. It's the absence of the energy that ideas require to become things. The ideas may still arrive — but they land without traction, without the inner aliveness that normally propels them into existence.

People experiencing creative exhaustion often describe it as a kind of flatness. Where there was once curiosity, there is mild interest at best. Where there was once momentum, there is a sense of effort without return. The enjoyment that used to make creative work sustaining has gone quiet.

This is distinct from creative block, which is typically characterized by anxiety, paralysis, and a desperate desire to create that is somehow inhibited. Creative exhaustion is lower-energy than that. It's less "I want to create and can't" and more "I'm not sure I have the fuel for it right now, and I'm not sure that matters the way it used to."`,
      },
      {
        heading: "Why creative exhaustion happens",
        body: `Creative work draws on a specific kind of attention — focused, generative, associative, emotionally available. This attention is renewable, but only with genuine restoration: not scrolling, not watching, not passive consumption, but actual rest and unstructured time.

Most creative exhaustion happens when this restoration is systematically bypassed. Output is prioritized. Deadlines produce another cycle of push. The natural restoration period is shortened or skipped. The next cycle begins before the last one has properly ended.

Over several of these abbreviated cycles, the deficit accumulates. The restorative capacity is reduced. The output quality declines. Motivation that used to be intrinsic begins to feel external and effortful. Eventually the creative engine simply can't sustain the pace it has been asked to maintain.

A secondary cause is the consumption-creation imbalance: consuming far more than you create, over an extended period, can produce a particular quality of creative poverty — a surfeit of others' ideas and a starvation of your own.`,
      },
      {
        heading: "What doesn't help (and tends to worsen it)",
        body: `The instinct when creative exhaustion arrives is often to push through — to force output, to set higher stakes, to shame yourself into production. This reliably worsens the condition. The creative system is already depleted. Forcing output from a depleted system depletes it further.

Consuming more content also doesn't help. The idea that you can input your way back to creative output — more inspiration, more references, more other people's work — tends to make creative exhaustion worse, not better. Consumption is not restoration.

Positive pressure (deadlines, accountability, announcement) can be useful in some creative blocks, but it is counterproductive in genuine exhaustion. Pressure that would motivate an energized creative system collapses an already depleted one.`,
      },
      {
        heading: "The genuine recovery path",
        body: `Creative exhaustion recovers through genuine rest — specifically, unstructured, output-free time. Not vacation that becomes a series of experiences to share online. Not rest that is immediately followed by planning how to apply what you've recovered. Actual emptiness, with no agenda.

For many creative people, this is the hardest thing to permit. The discomfort of not producing is real and often accompanied by a background hum of guilt. The recovery requires sitting with that discomfort rather than filling it.

Physical restoration matters: sleep, movement, time without screens, time in environments that don't demand anything of you.

Gentle creative play — making things with no stakes, no audience, no product — can also facilitate recovery. The key is genuine absence of pressure.

Moontuner's Waning Crescent phase is structurally optimized for this kind of recovery: low output expectations, high restorative permission, an explicit framework that treats rest as preparation rather than procrastination.`,
      },
    ],
    closing:
      "Creative exhaustion is the cost of sustained output without adequate restoration. It is not a character flaw. It is a depletion that responds to replenishment — given enough time, and enough genuine permission to rest.",
    relatedConcepts: [
      "when-to-rest",
      "push-vs-hold",
      "cyclical-productivity",
    ],
    relatedJournalSlugs: [
      "waning-crescent-quiet-before",
      "workbook-entry-phase-2-arrival",
    ],
    callToAction: {
      label: "Read: The Quiet Before the New",
      href: "/journal/waning-crescent-quiet-before",
      description:
        "A lunar essay on the restorative intelligence of the Waning Crescent phase — and what it means to rest without apology.",
    },
    secondaryCTA: {
      label: "Explore Waning Phases",
      href: "/moon-phase-today",
    },
  },

  // ─── 6. When to Rest ─────────────────────────────────────────────────────────
  {
    slug: "when-to-rest",
    title: "When to Rest Creatively: Reading the Signals Your Work Is Giving You",
    label: "When to Rest Creatively",
    seoDescription:
      "How do you know when to rest versus when to push through creative resistance? The signals are different, and they call for opposite responses.",
    emotionalCategory: "creative-rhythm",
    lunarPhase: "Waning Crescent",
    keywords: [
      "when to rest creatively",
      "how to know when to stop working",
      "creative rest signals",
      "pushing through vs resting",
      "productive rest for creatives",
      "creative recovery timing",
      "how to rest without guilt",
      "when to take a break from creative work",
    ],
    standfirst:
      "The hardest creative decision isn't whether to start — it's whether to stop. Rest is not the absence of productivity; it's a specific kind of productive state that requires as much intention as any creative session. The question is how to read the signals that tell you when rest is what's actually needed.",
    sections: [
      {
        heading: "Why creatives struggle to rest",
        body: `Creative identity is often built on the premise of output. The maker is someone who makes. Rest, in this framework, threatens not just productivity but identity — the sense of who you are.

This identity-threat makes rest feel dangerous in a way it doesn't for people whose sense of self is less invested in their creative output. It produces the characteristic creative person's guilty rest: technically taking time off but spending it mentally rehearsing what they should be doing, scrolling for inspiration, taking notes on ideas that need to be written down "just in case."

This kind of rest restores nothing. It maintains the nervous system in a low-level activation state, denying it the genuine downtime it requires for creative renewal.

Learning to rest well is, for many creative people, a more important skill than learning to produce well — because production without genuine restoration leads inevitably to exhaustion.`,
      },
      {
        heading: "Rest signals vs resistance signals",
        body: `The most important distinction in creative timing is between resistance that's asking you to push through and exhaustion that's asking you to stop. These two experiences can feel similar — both involve not wanting to work — but they have different qualities.

Resistance tends to feel anxious, slightly electric, accompanied by thoughts about what's possible and what might happen if you commit. There is often a quality of avoidance — procrastinating on a specific thing that matters to you. This kind of resistance often dissolves once you begin; within fifteen minutes of starting, you're in it.

Exhaustion tends to feel flat, without anxiety, often accompanied by an absence of curiosity about the work. Starting doesn't help — you may be physically working but the inner aliveness that makes the work generative isn't there. What you produce during exhaustion often lacks the quality of what you produce when your capacity is full.

The practice is learning to distinguish these two experiences in yourself — which requires honest self-observation over time.`,
      },
      {
        heading: "What genuine rest looks like",
        body: `Genuine creative rest has a specific quality: it's boring, at first. The absence of stimulation, obligation, and creative pressure creates a kind of discomfort that most creative people immediately rush to fill.

Sitting with that boredom — rather than filling it — is the actual rest. This is where the unstructured, unprompted processing happens that allows creative renewal. The mind, freed from directed attention, makes connections, resolves accumulated tensions, allows things that need to surface to surface.

Practically: unstructured time without a device. Movement in natural environments. Sleep. Conversation without agenda. Reading for pleasure rather than research. Making things with no stakes — drawing, cooking, gardening — that engage the hands without demanding the kind of creative attention that depletes creative work.

What doesn't count as creative rest: consuming content related to your work, taking notes about ideas, planning future projects, scrolling social media, or any activity that maintains your attention in an outward-facing, reactive mode.`,
      },
      {
        heading: "Rest as timing intelligence",
        body: `In Moontuner's framework, rest is not a break from productivity — it is a phase of productivity, operating at a different tempo and in a different direction.

The Waning Crescent phase is structurally designated as a rest phase. The directive for this phase is Recover: "Do less than you think you should. Protect sleep. Let the body lead." This isn't permission to be lazy. It's a timing intelligence — the recognition that restoration prepares the next cycle's vitality.

Creatives who rest well produce better work across their careers than those who don't. Not because rest is intrinsically productive, but because creative capacity requires maintenance — and the maintenance is rest.`,
      },
    ],
    closing:
      "Rest is not a reward you earn after sufficient productivity. It is a condition you maintain so that productivity remains available. The creative system that knows how to rest knows how to sustain itself.",
    relatedConcepts: [
      "creative-exhaustion",
      "push-vs-hold",
      "cyclical-productivity",
    ],
    relatedJournalSlugs: ["waning-crescent-quiet-before"],
    callToAction: {
      label: "Read Today's Directive",
      href: "/",
      description:
        "Today's Directive tells you whether this is a Push, Hold, Release, or Recover phase — with specific guidance for each.",
    },
    secondaryCTA: {
      label: "Open the Journal",
      href: "/journal",
    },
  },

  // ─── 7. Intention vs Control ─────────────────────────────────────────────────
  {
    slug: "intention-vs-control",
    title: "The Difference Between Intention and Control",
    label: "Intention vs Control",
    seoDescription:
      "Intention and control are often confused — but they produce radically different results. One orients; the other grasps. Understanding the difference transforms how you approach goals, creative work, and life.",
    emotionalCategory: "intentional-living",
    keywords: [
      "how to stop forcing things",
      "difference between intention and control",
      "letting go while still trying",
      "how to set intentions that work",
      "control vs acceptance",
      "intentional living",
      "non-attachment in practice",
      "how to stop micromanaging outcomes",
    ],
    standfirst:
      "Intention is a direction. Control is a grip. They can look identical from the outside — both involve wanting something and moving toward it — but they feel completely different from the inside, and they produce different results.",
    sections: [
      {
        heading: "What intention actually is",
        body: `An intention is an honest statement of direction: what you want to move toward, who you want to become, what quality of experience you want to cultivate. It is forward-facing without being outcome-dependent.

The word comes from the Latin intentio — a stretching toward. Not an arrival. Not a guarantee. A direction in which you extend your attention and energy.

A well-formed intention creates orientation without rigidity. It tells you which way you're pointed without prescribing every step of the path. It remains workable when conditions change, because it was never attached to a specific outcome — only to a direction.

Intentions are often confused with goals, but they are structurally different. A goal is an outcome to be achieved. An intention is a quality to be cultivated. Goals can fail. Intentions can only be more or less fully embodied in your choices.`,
      },
      {
        heading: "What control actually is",
        body: `Control is the attempt to guarantee a specific outcome despite the inherent uncertainty of the future. It is, structurally, a response to anxiety — the attempt to eliminate the discomfort of not knowing by eliminating the possibility of anything other than the desired result.

Control expresses itself in familiar patterns: over-planning, micromanaging, needing certainty before acting, inability to delegate, obsessive review of work before sharing it, difficulty resting because rest feels like losing control of outcomes.

The irony of control is that it tends to produce exactly the outcomes it's trying to prevent. Micromanagement produces worse outcomes than delegation. Over-planning produces rigidity that fails when conditions change. The grip on the outcome frequently distorts the path toward it.`,
      },
      {
        heading: "Why we confuse them",
        body: `Intention and control feel similar when the thing we want matters deeply to us. The more we care about an outcome, the more easily caring slides into grasping — into a kind of vigilance that monitors everything between us and the thing we want.

This vigilance is understandable. It's protective. It's the nervous system trying to keep safe something that matters. But it is expensive in exactly the ways that matter most: creative spontaneity, trust, the capacity to receive what arrives rather than only what was planned for.

The New Moon phase in Moontuner's system is specifically designed to surface this distinction. At New Moon — the beginning of the cycle — you set intentions. But the practice explicitly warns against forcing: the intention is stated and released, not gripped. "Begin nothing visible. The seed is being chosen in darkness; let the choice be honest."`,
      },
      {
        heading: "Practicing intention without control",
        body: `The practical difference shows up in how you hold a goal after you've set it. With intention, you commit to a direction, take the next available action, and then release your grip on how the path unfolds. With control, you commit to a specific path and defend it against anything that would change it.

Practicing intention without control means staying in motion without rigidity. Taking the next right step without knowing all the subsequent steps. Holding your direction lightly enough that when better information arrives — when circumstances change, when something unexpected opens — you can receive it rather than defend against it.

This is not passivity. Intention without control still requires full engagement, full commitment, and willingness to do the hard work. It simply doesn't require that you know exactly how everything will unfold — a requirement that was always impossible to satisfy anyway.`,
      },
    ],
    closing:
      "Intention points. Control grips. One creates direction and allows the path to inform itself. The other tries to secure an outcome in advance — and often loses it in the process. The practice is setting the intention clearly and then releasing your hands from the outcome.",
    relatedConcepts: [
      "push-vs-hold",
      "emotional-weather",
      "reflective-recovery",
    ],
    relatedJournalSlugs: [
      "new-moon-intention-setting",
      "spacetime-proposal-creative-project",
    ],
    callToAction: {
      label: "Set an Intention",
      href: "/journal",
      description:
        "The Journal is a space for naming your intentions — and for observing, across cycles, how they unfold when you stop gripping them.",
    },
    secondaryCTA: {
      label: "Read: Setting Intentions Without Forcing",
      href: "/journal/new-moon-intention-setting",
    },
  },

  // ─── 8. Reflective Recovery ───────────────────────────────────────────────────
  {
    slug: "reflective-recovery",
    title: "Reflective Recovery: Using Self-Observation to Restore Clarity",
    label: "Reflective Recovery",
    seoDescription:
      "Reflective recovery is the practice of using honest self-observation to process emotional residue, restore clarity, and re-orient after periods of depletion or overwhelm.",
    emotionalCategory: "reflective-practice",
    keywords: [
      "how to regain clarity",
      "how to reconnect with yourself",
      "reflective journaling practice",
      "recovery from emotional overwhelm",
      "clarity after burnout",
      "how to process emotions",
      "self-reflection for recovery",
      "emotional recovery practice",
    ],
    standfirst:
      "After periods of high output, emotional intensity, or sustained depletion, most people experience a fog — a difficulty re-orienting to what actually matters, reconnecting with their own preferences, and locating the clarity they remember having. Reflective recovery is the practice of moving through this fog with intention.",
    sections: [
      {
        heading: "What clarity actually means",
        body: `Clarity is not certainty. Clarity is accurate self-knowledge in the present moment: knowing what you want, what you value, what you need, what is and isn't working. It's the state in which you can observe your own experience accurately without distortion — without the overlay of anxiety, exhaustion, or other people's expectations.

Clarity comes and goes. It is not a stable achievement but an ongoing practice. The periods of its absence are normal — they are part of the cycle, the necessary fog that precedes a more honest seeing.

The problem is not that clarity disappears. The problem is not knowing how to find it again. Most people's recovery strategy is either waiting for it to return on its own (which sometimes works but is entirely passive) or pushing through the fog with increased effort (which usually lengthens the recovery period).`,
      },
      {
        heading: "How reflection restores clarity",
        body: `Reflection works by creating a witness relationship with your own experience. When you can observe what you're thinking and feeling with some accuracy and some distance — when you can name the experience rather than only be inside it — the experience shifts.

This is not magical. It's attentional. The simple act of naming something accurately — "I am exhausted, not lazy" or "I am afraid, not incapable" — alters its quality. What was overwhelming becomes manageable. What was chaotic gains some structure.

Journaling is the most common reflective practice, and the most studied. The evidence for expressive writing as a recovery and clarity tool is robust and spans decades. Even without a formal practice, regular written self-observation — noting what is present, what has passed, what is emerging — produces measurable effects on emotional clarity and cognitive function.`,
      },
      {
        heading: "Reflective recovery vs. analysis paralysis",
        body: `Reflective recovery is not rumination. This distinction is critical, because they feel similar and produce opposite results.

Rumination is thought that circles without resolution — replaying the same events, rehearsing the same concerns, looking for certainty in the past about the future. It is exhausting and tends to increase distress rather than resolving it.

Reflective recovery is different in its orientation: it looks at what is present with the intention of understanding and releasing rather than resolving. It doesn't try to fix the past or secure the future. It simply witnesses what is currently true, names it accurately, and allows it to exist without requiring it to be different.

The practice question is: after a session of reflection, do you feel lighter or heavier? Rumination characteristically leaves you feeling worse. Genuine reflection tends to produce a quality of settling — a sense that something has been metabolized.`,
      },
      {
        heading: "Reflective recovery practices within Moontuner",
        body: `Moontuner's Journal is designed specifically for reflective recovery. Each entry is timestamped against the lunar cycle, tagged with emotional weather, and connected through a network of related content — so that you can see your experience in context, across cycles, rather than in isolation.

The journal categories include daily directives, reflections, lunar essays, and workbook entries — each offering a different quality of reflective engagement, from brief daily observation to long-form processing to guided prompt exploration.

The Waning Gibbous and Waning Crescent phases are specifically associated with this kind of reflective processing in Moontuner's system. The Waning Gibbous directive is Reconnect: share, reach toward, distribute wisdom. The Waning Crescent directive is Recover: protect space, let the body lead, allow the slow.

Together, these phases form a natural reflective recovery arc — first integrating and sharing, then resting and preparing for the next beginning.`,
      },
    ],
    closing:
      "Clarity is not found by pushing toward it. It surfaces when you stop pushing — when you make enough space, with enough honesty, for what is actually true to become visible. Reflective recovery is the art of making that space.",
    relatedConcepts: [
      "emotional-weather",
      "push-vs-hold",
      "intention-vs-control",
    ],
    relatedJournalSlugs: [
      "full-moon-release-practice",
      "waning-crescent-quiet-before",
      "workbook-entry-phase-2-arrival",
    ],
    callToAction: {
      label: "Open the Journal",
      href: "/journal",
      description:
        "The Moontuner Journal is a reflective space for honest self-observation — timestamped against the lunar cycle, emotionally categorized, and designed for long-term pattern recognition.",
    },
    secondaryCTA: {
      label: "Try the Lunar Cipher",
      href: "/lunar-cipher",
    },
  },

  // ─── 9. How to Regain Clarity ─────────────────────────────────────────────────
  {
    slug: "how-to-regain-clarity",
    title: "How to Regain Clarity When Everything Feels Foggy",
    label: "Regaining Clarity",
    seoDescription:
      "Losing clarity is a recognizable experience — the fog after intensity, the drift after depletion. Here are the honest conditions under which clarity returns.",
    emotionalCategory: "emotional-regulation",
    keywords: [
      "how to regain clarity",
      "feeling stuck and confused",
      "mental fog and overwhelm",
      "how to clear your head",
      "emotional clarity practices",
      "how to feel like yourself again",
      "clarity after emotional overwhelm",
      "mental clarity techniques",
    ],
    standfirst:
      "There is a specific kind of mental fog that arrives after extended periods of intensity — emotional, creative, or logistical. It's not depression. It's not confusion exactly. It's a quality of being slightly out of phase with yourself, where your own preferences and priorities feel distant or inaccessible.",
    sections: [
      {
        heading: "Recognizing the fog",
        body: `The fog of lost clarity has particular qualities. Decision-making feels harder than it should — not because the decisions are complex but because your preferences feel murky. Things that normally energize you feel flat or mildly obligatory. You can't easily identify what you want, only what you feel you should want.

This experience is extremely common after periods of sustained intensity: intense work periods, caregiving, major life transitions, grief, or creative seasons where you gave a great deal of yourself. The fog is a kind of aftermath — the system signaling that it has been running at a level that requires some recalibration.

The mistake is treating the fog as a permanent condition to be fixed, rather than a temporary one to be moved through. Urgency around the fog tends to deepen it. The more you scramble to escape it, the denser it becomes.`,
      },
      {
        heading: "What doesn't work",
        body: `Decision-making your way out of the fog doesn't work. When clarity is absent, decisions tend to be made from the most proximate source of pressure — which is rarely the most authentic signal. The result is a series of choices that feel vaguely wrong afterward.

Consuming your way out of the fog doesn't work. More inspiration, more content, more input — these tend to increase the noise-to-signal ratio and deepen the sense of overwhelm.

Productivity your way out of the fog doesn't work. Moving faster through a foggy landscape doesn't improve visibility. It increases the likelihood of moving in the wrong direction with conviction.`,
      },
      {
        heading: "What actually helps",
        body: `Clarity returns through a combination of genuine rest, honest observation, and reduced stimulation. These are the conditions under which the signal re-emerges from the noise.

Genuine rest: time without obligations, screens, or performance. Not vacation-as-content. Not rest as recovery from one kind of effort in preparation for another. Actual emptiness, where the system can slow down and find its own rhythm again.

Honest observation: journaling or reflection that doesn't try to fix or resolve — that simply notes what is present. What are you feeling? What do you actually want, if you had permission to want it? What would you do with tomorrow if no one was watching?

Reduced stimulation: fewer inputs, quieter environments, more time in natural settings. The sensory environment affects cognitive clarity substantially. A quieter environment consistently produces clearer thinking.

Contact with the body: physical movement, especially in nature. The body often recovers its own clarity faster than the mind — and the mind tends to follow.`,
      },
      {
        heading: "Timing and the lunar cycle",
        body: `Many people notice that their moments of greatest clarity cluster around specific lunar phases — most commonly the Waxing Gibbous (just before Full Moon, when the system is at near-maximum capacity) and the New Moon (when the internal signal is often clearest, with minimum external noise).

Conversely, moments of maximum fog often cluster around the transition between Full Moon and Waning Gibbous — the period immediately after peak illumination, when the system is beginning its integration process.

If you're in a fog and approaching a New Moon, waiting for the lunar transition can be productive. The New Moon phase tends to offer a natural clarity window — a quiet moment where the next direction surfaces more easily than during the busy, stimulated period of the waxing phases.`,
      },
    ],
    closing:
      "Clarity is not a destination you reach by effort. It's a state that emerges when the conditions are right: enough rest, enough honesty, enough stillness for the signal to become audible again. The practice is creating those conditions, then trusting what surfaces.",
    relatedConcepts: [
      "reflective-recovery",
      "emotional-weather",
      "when-to-rest",
    ],
    relatedJournalSlugs: [
      "new-moon-intention-setting",
      "full-moon-release-practice",
    ],
    callToAction: {
      label: "Read Today's Directive",
      href: "/",
      description:
        "Today's Directive is calibrated to the current lunar phase and offers specific guidance for clarity, rest, creation, or release — depending on where you are in the cycle.",
    },
    secondaryCTA: {
      label: "Try Reflective Journaling",
      href: "/journal",
    },
  },

  // ─── 10. Harmonic Profile ─────────────────────────────────────────────────────
  {
    slug: "what-is-a-harmonic-profile",
    title: "What Is a Harmonic Profile? Your Natal Moon Phase as a Personal Map",
    label: "Harmonic Profile",
    seoDescription:
      "A Harmonic Profile maps your natal moon phase to reveal your natural orientation toward timing, creativity, relationship, and self-expression — not a prediction, but a pattern.",
    emotionalCategory: "identity",
    keywords: [
      "what is a harmonic profile",
      "natal moon phase meaning",
      "moon phase born under",
      "identity and lunar cycles",
      "personal moon phase",
      "harmonic archetype",
      "self-knowledge through moon phases",
      "lunar birth phase",
    ],
    standfirst:
      "Your Harmonic Profile is a map of your natural orientation — not a prediction of what will happen, but a description of how you tend to approach things: timing, initiation, completion, relationship, and creative rhythm. It is derived from the lunar phase you were born under.",
    sections: [
      {
        heading: "What a natal moon phase actually indicates",
        body: `The Moon's phase at the moment of your birth represents your relationship to cycles — to beginning, building, completing, releasing, and renewing. This is not magical. It's observational: the phase you enter under tends to shape your instinctive orientations.

Someone born at New Moon tends to be deeply inward, highly intuitive, and naturally oriented toward initiation. They begin easily but may find completion less natural. Their timing instinct is strongest at the edge of a new cycle.

Someone born at Full Moon tends to be highly relational, emotionally expressive, and oriented toward visibility. They are often natural collaborators and communicators. Their timing instinct is strongest during peak moments.

Someone born at First Quarter tends to be decisive, sometimes restless, and oriented toward action through friction. They are comfortable with challenge and tend to move when others hesitate.

These are tendencies, not destinies. They describe a natural orientation that exists in tension with other factors — personality, life experience, specific circumstances.`,
      },
      {
        heading: "What a Harmonic Profile is not",
        body: `A Harmonic Profile is not a forecast. It does not tell you what will happen. It does not promise outcomes or warn of dangers.

It is not a zodiac reading. It does not involve the interpretive system of signs, houses, or planetary aspects — only the Moon's phase at birth.

It is not deterministic. Your natal phase is one layer of a complex, multi-dimensional person. It describes a tendency, not a constraint. The most practically useful relationship to your Harmonic Profile is curiosity, not conviction.

The value is self-recognition — the specific quality of clarity that comes from seeing a pattern you already live, named accurately for the first time.`,
      },
      {
        heading: "The eight harmonic archetypes",
        body: `Moontuner maps eight lunar phases to eight orientational archetypes:

New Moon (Visionary): deeply inward, highly intuitive, oriented toward initiation and pure potential. Strongest during the beginning of cycles.

Waxing Crescent (Initiator): naturally inclined toward beginning, learning, and early momentum. Comfortable in the tender, early stages of creation.

First Quarter (Architect): decisive, action-oriented, comfortable with friction. Natural movers who transform tension into traction.

Waxing Gibbous (Refiner): detail-oriented, patient, skilled at perfectionism in service of quality. The necessary presense before publication.

Full Moon (Illuminator): highly relational, emotionally visible, natural collaborators. Most powerful when visible and sharing.

Waning Gibbous (Distributor): oriented toward sharing wisdom, teaching, and generous communication. Natural stewards of what they've learned.

Last Quarter (Editor): skilled at discernment, release, and completion. Natural finishers who know what to keep and what to cut.

Waning Crescent (Dreamer): deeply intuitive, contemplative, skilled at surrendering. The quiet before the next beginning.`,
      },
      {
        heading: "Using your Harmonic Profile practically",
        body: `The practical application of your Harmonic Profile is calibration — aligning your highest-stakes actions with the lunar phases that naturally support your natal orientation.

A First Quarter person is often most powerful during First Quarter phases: decisive, clear, energized by friction. Timing a major commitment or launch for First Quarter may align their natural orientation with a supporting external cycle.

A Waning Crescent person often functions best when they allow the periods others find low-energy to be genuinely generative for them — trusting the slow, dreaming, intuitive work of the dark phase as valid creative work.

The Harmonic Profile also illuminates shadow tendencies: the Full Moon person's need for visibility can become over-sharing when depleted. The First Quarter person's bias toward action can become rushing when anxious. Recognizing the tendency makes the shadow easier to navigate.`,
      },
    ],
    closing:
      "Your Harmonic Profile is not who you are. It is one accurate map of how you tend to move through time — and maps are most useful when you remember they are maps, not the territory.",
    relatedConcepts: [
      "cyclical-productivity",
      "emotional-weather",
      "intention-vs-control",
    ],
    relatedJournalSlugs: [
      "harmonic-profile-waxing-crescent-natal",
      "new-moon-intention-setting",
    ],
    callToAction: {
      label: "Generate Your Harmonic Profile",
      href: "/harmonic-profile",
      description:
        "The Harmonic Profile tool calculates your natal moon phase and maps it to your personal archetype — with contextual guidance for timing, creativity, and self-expression.",
    },
    secondaryCTA: {
      label: "View the Lunar System",
      href: "/lunar-system",
    },
  },
];

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getConceptBySlug(slug: string): ExploreConcept | undefined {
  return EXPLORE_CONCEPTS.find((c) => c.slug === slug);
}

export function getRelatedConcepts(concept: ExploreConcept): ExploreConcept[] {
  return concept.relatedConcepts
    .map((slug) => getConceptBySlug(slug))
    .filter((c): c is ExploreConcept => Boolean(c));
}

export const EMOTIONAL_CATEGORY_LABELS: Record<
  ExploreConcept["emotionalCategory"],
  string
> = {
  "creative-rhythm": "Creative Rhythm",
  "emotional-regulation": "Emotional Regulation",
  "intentional-living": "Intentional Living",
  "digital-wellness": "Digital Wellness",
  "timing-awareness": "Timing Awareness",
  identity: "Identity",
  "reflective-practice": "Reflective Practice",
};
