// ─── Journal Content Types ────────────────────────────────────────────────────

export type ContentType =
  | "daily-directive"
  | "reflection"
  | "lunar-essay"
  | "spacetime-proposal"
  | "harmonic-profile-note"
  | "digital-smudging-log"
  | "workbook-entry"
  | "personal-evolution-timeline";

export interface JournalEntry {
  slug: string;
  title: string;
  type: ContentType;
  date: string;
  moonPhase: string;
  illumination: number; // 0–100
  emotionalWeather: string;
  timingTheme?: string;
  tags: string[];
  excerpt: string;
  body: string; // paragraph blocks separated by \n\n
  isPublic: boolean;
  relatedSlugs: string[];
  annotation?: string; // personal private note
}

// ─── Content-type meta ────────────────────────────────────────────────────────

export const CONTENT_TYPE_META: Record<
  ContentType,
  { label: string; color: string; description: string }
> = {
  "daily-directive": {
    label: "Daily Directive",
    color: "hsl(38 90% 58%)",
    description: "The single instruction the day is offering.",
  },
  "reflection": {
    label: "Reflection",
    color: "hsl(210 60% 65%)",
    description: "Honest observation of what unfolded.",
  },
  "lunar-essay": {
    label: "Lunar Essay",
    color: "hsl(260 55% 68%)",
    description: "Long-form inquiry into cyclical themes.",
  },
  "spacetime-proposal": {
    label: "Spacetime Proposal",
    color: "hsl(168 55% 50%)",
    description: "An intention submitted against the timing grid.",
  },
  "harmonic-profile-note": {
    label: "Harmonic Profile Note",
    color: "hsl(320 55% 65%)",
    description: "Observations about your natal harmonic signature.",
  },
  "digital-smudging-log": {
    label: "Smudging Log",
    color: "hsl(25 70% 52%)",
    description: "Record of a digital clearing ritual.",
  },
  "workbook-entry": {
    label: "Workbook Entry",
    color: "hsl(90 45% 55%)",
    description: "Guided prompts completed from the workbook series.",
  },
  "personal-evolution-timeline": {
    label: "Evolution Note",
    color: "hsl(50 80% 60%)",
    description: "Longitudinal marker in your self-observation arc.",
  },
};

// ─── Sample Entries ────────────────────────────────────────────────────────────

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    slug: "waning-crescent-quiet-before",
    title: "The Quiet Before the New",
    type: "lunar-essay",
    date: "2025-05-06",
    moonPhase: "Waning Crescent",
    illumination: 7,
    emotionalWeather: "Low · Dreaming · Restorative",
    timingTheme: "Surrender",
    tags: ["rest", "waning-crescent", "endings", "compost"],
    excerpt:
      "There is a moment in every lunar cycle when even the most ambitious energy simply stops. Not from failure — from completion. The Waning Crescent is not a phase of defeat. It is a phase of relinquishment.",
    body: `There is a moment in every lunar cycle when even the most ambitious energy simply stops. Not from failure — from completion. The Waning Crescent is not a phase of defeat. It is a phase of relinquishment.

Most of us have been trained to treat low-energy states as problems to solve. We reach for caffeine, for to-do lists, for optimism. We push. We override. We apologize for being slow.

The Waning Crescent asks something different. It asks you to become a good composter — to sit with what is dying and not prematurely bury it or prematurely revive it. To witness the natural end of a thing.

I have been watching my own impulses this phase. The way I want to begin something new even now, when the light is nearly gone. The way my hands keep reaching for plans. I am practicing setting the plans down.

What wants to decompose in you this week? Not what you want to eliminate by force — but what is already leaving, if you would only stop clutching it?

This phase is not nothing. It is the soil the next New Moon grows from. Every quiet, dark, dream-rich stretch of the Waning Crescent is an investment in the next cycle's vitality.

Rest is not a reward you earn after productivity. Rest is the practice that makes the next movement possible. The Moon teaches this in its body every 29.5 days, without apology.`,
    isPublic: true,
    relatedSlugs: [
      "new-moon-intention-setting",
      "first-quarter-push-through",
    ],
  },
  {
    slug: "new-moon-intention-setting",
    title: "Setting Intentions Without Forcing Them",
    type: "daily-directive",
    date: "2025-05-08",
    moonPhase: "New Moon",
    illumination: 2,
    emotionalWeather: "Quiet · Inward · Slow",
    timingTheme: "Initiation",
    tags: ["new-moon", "intention", "darkness", "beginning"],
    excerpt:
      "The New Moon is not a to-do list. It is a listening threshold. You don't arrive here to perform your goals — you arrive to let the truest ones surface.",
    body: `The New Moon is not a to-do list. It is a listening threshold. You don't arrive here to perform your goals — you arrive to let the truest ones surface.

Today's directive: Before you write anything, sit for five minutes without agenda. No journaling, no affirmations. Just presence with the dark.

Then ask: what wants to begin — not what you think should begin?

There is a crucial difference. The first question surfaces genuine impulse. The second surfaces the internalized expectations of everyone you've ever tried to please.

The intentions that survive a New Moon are the ones that were already forming in the dark. They don't need your performance. They need your recognition.

Notice today what you feel quietly drawn toward. Notice what asks nothing of you and yet calls anyway. That is your New Moon signal.

Lunar note: With 2% illumination, this is the most inward moment of the cycle. The visibility is lowest. The inner signal is loudest.`,
    isPublic: true,
    relatedSlugs: [
      "waning-crescent-quiet-before",
      "full-moon-release-practice",
    ],
  },
  {
    slug: "full-moon-release-practice",
    title: "What Releasing Actually Looks Like",
    type: "reflection",
    date: "2025-04-23",
    moonPhase: "Full Moon",
    illumination: 99,
    emotionalWeather: "Bright · Exposed · Whole",
    timingTheme: "Completion",
    tags: ["full-moon", "release", "emotional-processing", "completion"],
    excerpt:
      "I sat with a list of things I said I was releasing. Then I sat with the honest version of that list. They were different lists.",
    body: `I sat with a list of things I said I was releasing. Then I sat with the honest version of that list. They were different lists.

The first list was the version of myself that sounds evolved: old resentments, perfectionism, fear of visibility. Clean. Aspirational. Performance-ready.

The second list was messier: the specific conversation I replayed eight times last Tuesday. The email I haven't sent. The version of a relationship I am still grieving even though I said I wasn't.

Full Moon practice is not about releasing abstract concepts. It is about releasing specific residue.

So I wrote the second list. I read it aloud to the bright sky at 11pm, feeling mildly ridiculous and deeply honest. Then I burned the paper in the sink.

Did it work? I don't know what "work" means in this context. But I felt lighter the next morning. Not because magic intervened — because I had acknowledged, with precision, what I was carrying.

That acknowledgment is the release. The ritual is just a frame for the honesty.

This is what Full Moon practice looks like when you strip it of performance: one specific truth, named aloud, in the presence of a lot of light.`,
    isPublic: true,
    relatedSlugs: [
      "new-moon-intention-setting",
      "waning-crescent-quiet-before",
    ],
  },
  {
    slug: "spacetime-proposal-creative-project",
    title: "Proposal: The Book Project — Submitted at First Quarter",
    type: "spacetime-proposal",
    date: "2025-04-14",
    moonPhase: "First Quarter",
    illumination: 51,
    emotionalWeather: "Tension into traction",
    timingTheme: "Decision",
    tags: ["first-quarter", "creative-project", "commitment", "book"],
    excerpt:
      "Intention: to begin the manuscript that has lived in my notes for three years. Submitted at First Quarter — the phase of initiating through friction.",
    body: `Intention: to begin the manuscript that has lived in my notes for three years.

Submitted at First Quarter — the phase of initiating through friction.

Uncertainty: whether it is the right time, whether I have enough to say, whether it will find its audience.

Resistance: the comfort of research over the discomfort of drafting. The ease of planning over the exposure of beginning.

Direction: write the first paragraph. Not the first chapter — the first paragraph. Then see what the paragraph says.

Emotional state at submission: nervous, resolved, oddly calm underneath the nervousness.

Timing posture assigned: Advance.

Conditions for movement: friction present, resistance noted, energy available, New Moon intention still active.

Post-submission note (added at Waxing Gibbous): The paragraph became a page. The page became three pages. The friction was the function, just as the Spacetime Printer said.`,
    isPublic: false,
    relatedSlugs: [
      "new-moon-intention-setting",
      "waxing-gibbous-patience-practice",
    ],
    annotation: "This was the one that broke the log-jam.",
  },
  {
    slug: "harmonic-profile-waxing-crescent-natal",
    title: "Born in the Waxing Crescent: What That Actually Means for Me",
    type: "harmonic-profile-note",
    date: "2025-04-09",
    moonPhase: "Waxing Crescent",
    illumination: 34,
    emotionalWeather: "Tender momentum",
    timingTheme: "Emergence",
    tags: ["natal-phase", "waxing-crescent", "self-understanding", "harmonic"],
    excerpt:
      "Born at 34% illumination. Waxing Crescent. Which means: I am a person of beginnings. Of early motion. Of tender, scrappy first drafts.",
    body: `Born at 34% illumination. Waxing Crescent. Which means: I am a person of beginnings. Of early motion. Of tender, scrappy first drafts.

I have always started things more easily than I finish them. I used to frame that as a weakness. The harmonic profile reframes it as an orientation.

Waxing Crescent people tend to initiate. To be the ones who say, let's try this. To see possibility in the early, unformed stages. To move before proof of success arrives.

The shadow: sometimes beginning becomes a way of avoiding the discomfort of completing. The perpetual early-stage excitement can be a refuge from the messier middle.

My practice this month: deliberately staying in one thing past the point where it feels good and scrappy and new. Into the awkward, dense middle. Seeing what's there.

Observation at Waxing Gibbous: The middle is harder. I want to start the next thing. But staying has produced work I would not have found in another beginning.

This is the harmonic profile working in real time: first the pattern recognition, then the conscious cultivation of what was missing.`,
    isPublic: true,
    relatedSlugs: [
      "new-moon-intention-setting",
      "spacetime-proposal-creative-project",
    ],
  },
  {
    slug: "digital-smudging-spring-clearing",
    title: "Spring Clearing: What I Released from My Digital Space",
    type: "digital-smudging-log",
    date: "2025-04-01",
    moonPhase: "New Moon",
    illumination: 1,
    emotionalWeather: "Quiet · Inward · Slow",
    timingTheme: "Clearing",
    tags: ["digital-smudging", "clearing", "new-moon", "boundaries"],
    excerpt:
      "What I scanned: 14 open browser tabs I hadn't looked at in six weeks. Three group chats I read but never participated in. An app I opened every morning out of anxiety, not interest.",
    body: `What I scanned during the Sage Scan:

14 open browser tabs I hadn't looked at in six weeks — articles I was saving for a version of myself with more time.

Three group chats I read but never participated in. I was a ghost in spaces I had technically joined.

An app I opened every morning out of anxiety, not interest. Not because I wanted to, but because the absence of opening it felt wrong.

A list of email subscriptions that arrived daily and made me feel behind before I'd made coffee.

Cord Cutting: the tabs closed. The group chats muted. The anxiety-app deleted. The subscriptions unsubscribed. Not all at once — one at a time, with a moment of acknowledgment for each one.

The Void: I sat with the emptiness. The screen looked different. Less like a thing pulling at me.

Wards set: notifications off until 9am. No social media until I've written something. The inbox checked twice, not continuously.

Lunar Sync: submitted at New Moon, the optimal clearing window. The intention: to make my digital environment feel like mine again, not like a series of obligations I had forgotten agreeing to.

Post-session note: Two weeks later, the morning feels longer. Not because I have more time — because I am less pre-occupied before the day begins.`,
    isPublic: false,
    relatedSlugs: [
      "new-moon-intention-setting",
      "waning-crescent-quiet-before",
    ],
  },
  {
    slug: "workbook-entry-phase-2-arrival",
    title: "Workbook 2, Prompt 7: What Does Arrival Feel Like?",
    type: "workbook-entry",
    date: "2025-03-28",
    moonPhase: "Waxing Gibbous",
    illumination: 79,
    emotionalWeather: "Almost · Refining · Patient",
    timingTheme: "Refinement",
    tags: ["workbook", "waxing-gibbous", "arrival", "patience"],
    excerpt:
      "Prompt: Describe a moment when you felt fully arrived — not at a destination, but into the present moment. What did it cost you? What did it require of you?",
    body: `Prompt: Describe a moment when you felt fully arrived — not at a destination, but into the present moment. What did it cost you? What did it require of you?

---

Response:

It was an ordinary Tuesday in late autumn. No ceremony. I was washing dishes and the light through the window was doing something specific with the steam rising from the sink.

I was fully arrived.

It cost me nothing in that moment — which is the paradox. Arrival requires giving up the project of arriving. As long as I am headed somewhere, I am not here.

What it required: I had been practicing for months. Not meditating in any formal sense, but returning — repeatedly returning — to the physical sensation of the moment I was in. The feel of my feet on the floor. The weight of whatever I was holding.

The Waxing Gibbous is the practice phase of this. Almost there. Refining. Patient. The arrival is very close but not yet.

I have noticed that I experience something close to "arrival" more easily in Waxing Gibbous than at any other phase. Something about almost being there teaches you how to be here.

Facilitator note from the workbook: The Gibbous phase is where the preparation meets the pre-threshold. You are not rushing; you are ready.

I am ready.`,
    isPublic: true,
    relatedSlugs: [
      "harmonic-profile-waxing-crescent-natal",
      "full-moon-release-practice",
    ],
  },
  {
    slug: "evolution-timeline-first-year",
    title: "One Year of Lunar Practice: What Has Actually Changed",
    type: "personal-evolution-timeline",
    date: "2025-05-01",
    moonPhase: "Waxing Crescent",
    illumination: 22,
    emotionalWeather: "Tender momentum",
    timingTheme: "Integration",
    tags: [
      "evolution",
      "one-year",
      "integration",
      "longitudinal",
      "pattern-recognition",
    ],
    excerpt:
      "A year ago today I opened the Lunar Cipher for the first time. I want to mark what has changed — not what I hoped would change, but what actually, verifiably has.",
    body: `A year ago today I opened the Lunar Cipher for the first time. I was skeptical. I am still somewhat skeptical, which I think is the right posture. But I want to mark what has actually changed — not what I hoped would change.

What has changed:

My relationship with low-energy states. I no longer pathologize them. When I feel slow or inward, I check the phase. Often I am in the last quarter or waning crescent. I stop fighting and rest instead. This alone has reduced my baseline stress.

My decision-making timing. I now defer major decisions away from the final days of the cycle. I have made better decisions. I cannot prove causality. I can observe the pattern.

My sense of continuity with the past. Because I record things, I can look back. I can see that the anxiety I felt in October was present during the same lunar phase three cycles earlier. That recognition — that I am in a pattern, not a crisis — is enormously stabilizing.

My tolerance for incompletion. I used to hate the feeling of things unfinished. The cyclical framework has taught me that nothing is really unfinished — it is in a phase. This is mostly true. It is a useful lens.

What has not changed: I still resist the quiet. I still prefer to begin things to completing them. I still check my phone too much in the mornings.

The practice is not a cure. It is a relationship. I am still learning how to be in it.`,
    isPublic: true,
    relatedSlugs: [
      "harmonic-profile-waxing-crescent-natal",
      "new-moon-intention-setting",
      "full-moon-release-practice",
    ],
  },
  {
    slug: "waxing-gibbous-patience-practice",
    title: "Waxing Gibbous: The Art of Not Launching Yet",
    type: "lunar-essay",
    date: "2025-04-18",
    moonPhase: "Waxing Gibbous",
    illumination: 84,
    emotionalWeather: "Almost · Refining · Patient",
    timingTheme: "Refinement",
    tags: ["waxing-gibbous", "patience", "refinement", "timing"],
    excerpt:
      "The Waxing Gibbous is the most underestimated phase in the cycle. It is the phase of not yet — which, in a culture that rewards first and fast, is almost unbearable.",
    body: `The Waxing Gibbous is the most underestimated phase in the cycle. It is the phase of not yet — which, in a culture that rewards first and fast, is almost unbearable.

Everything is almost ready. 84% illuminated. The work is done or very nearly done. The instinct to release it — to send it, post it, say it, submit it — is overwhelming.

The Waxing Gibbous says: read it once more.

Not because something is wrong. Because something might be more right than it currently is, and you have not given yourself the time to see it.

I have released things too early in Waxing Gibbous and regretted it. Not because the work was bad — because it was almost good, and I couldn't wait another three days to find out what almost-good becomes with more honest attention.

The Waxing Gibbous is where craft lives. The New Moon is inspiration. The First Quarter is initiation. The Waxing Gibbous is where you do the quiet, unglamorous work of asking: is this the best version I can offer?

That question is not perfectionism. It is respect — for the work, for the audience, and for the Full Moon that is about to illuminate everything.`,
    isPublic: true,
    relatedSlugs: [
      "spacetime-proposal-creative-project",
      "full-moon-release-practice",
    ],
  },
  {
    slug: "first-quarter-push-through",
    title: "First Quarter: The Wall Is an Instruction",
    type: "daily-directive",
    date: "2025-04-10",
    moonPhase: "First Quarter",
    illumination: 50,
    emotionalWeather: "Tension into traction",
    timingTheme: "Decision",
    tags: ["first-quarter", "friction", "decision", "momentum"],
    excerpt:
      "Today's directive is one word: Move. The friction you are feeling is not a signal to stop. It is the First Quarter's specific teaching.",
    body: `Today's directive is one word: Move.

The friction you are feeling is not a signal to stop. It is the First Quarter's specific teaching.

At 50% illumination, the Moon is at exactly the halfway point of its waxing phase. The light is growing but the tension is at its peak. This is the energetic equivalent of the moment before you commit to a decision — when all the options are still technically open.

The First Quarter asks you to close them.

Not to have perfect information. Not to feel ready. To choose and move.

The wall is not an obstacle. It is the function. The friction is what separates the intention from the outcome. You cannot get to the Full Moon without passing through it.

What have you been deferring? The email. The conversation. The commitment. The first line of the thing.

Today: write the first line. Send the email. Have the conversation. Do the one small physical act that makes the thing real instead of theoretical.

The Wall is not asking you to stop. It is asking you to prove you want to continue.`,
    isPublic: true,
    relatedSlugs: [
      "new-moon-intention-setting",
      "waxing-gibbous-patience-practice",
    ],
  },
];

// ─── Helper utilities ─────────────────────────────────────────────────────────

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return JOURNAL_ENTRIES.find((e) => e.slug === slug);
}

export function getRelatedEntries(entry: JournalEntry): JournalEntry[] {
  return entry.relatedSlugs
    .map((slug) => getEntryBySlug(slug))
    .filter((e): e is JournalEntry => e !== undefined);
}

export function getEntriesByType(type: ContentType): JournalEntry[] {
  return JOURNAL_ENTRIES.filter((e) => e.type === type);
}

export function getEntriesByMoonPhase(phase: string): JournalEntry[] {
  return JOURNAL_ENTRIES.filter((e) => e.moonPhase === phase);
}

export function getEntriesByTag(tag: string): JournalEntry[] {
  return JOURNAL_ENTRIES.filter((e) => e.tags.includes(tag));
}

export function searchEntries(query: string): JournalEntry[] {
  const q = query.toLowerCase();
  return JOURNAL_ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.excerpt.toLowerCase().includes(q) ||
      e.body.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q)) ||
      e.emotionalWeather.toLowerCase().includes(q) ||
      (e.timingTheme?.toLowerCase().includes(q) ?? false)
  );
}

export function getRecentEntries(count = 5): JournalEntry[] {
  return [...JOURNAL_ENTRIES]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
