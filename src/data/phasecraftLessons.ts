// Lunar Phasecraft Mastery — the teaching layer.
// One lesson per curriculum topic: a written transmission, a practice to
// perform, and reflection prompts. Slugs are stable identifiers; school
// progress rows key off them, so never rename a slug once it has shipped.

export interface Lesson {
  slug: string;
  module: number;
  title: string;
  minutes: number;
  body: string[];
  practice: string;
  prompts: string[];
}

const L = (
  module: number,
  slug: string,
  title: string,
  minutes: number,
  body: string[],
  practice: string,
  prompts: string[],
): Lesson => ({ module, slug: `m${module}-${slug}`, title, minutes, body, practice, prompts });

export const LESSONS: Lesson[] = [
  // ── Module 1 — Foundations of Lunar Living ────────────────────────────────
  L(1, "symphony", "The Symphony of Existence: Living as a Cosmic Instrument", 12, [
    "Before this is astrology, it is acoustics. You are a body with a resonant frequency, moving through a field of other resonant bodies. Nothing here requires belief in influence at a distance — only the plain observation that rhythms entrain to other rhythms when they share a medium.",
    "The Moontuner position is simple: the Moon is not an authority issuing instructions. It is a metronome you can choose to play against or with. Playing with it costs less. That is the whole argument, and everything else in this course is craft built on top of it.",
  ], "Sit for five minutes with no input and locate three rhythms already running in you: breath, pulse, and the slower one — hunger, attention, or mood. Write down the period of each in your own words.", [
    "Which of your rhythms do you routinely override, and what does the override cost?",
    "Where in your week do you already work with a cycle rather than against it?",
  ]),
  L(1, "frequency-language", "Frequency as the Language of Creation", 10, [
    "Every state you have ever been in had a texture — fast and bright, slow and dense, scattered, held. Frequency is just a precise word for texture. When you learn to name the texture you are in, you stop mistaking a low state for a personal failure.",
    "The practical value is diagnostic. A frequency reading takes ten seconds and tells you which kind of work is available right now. Most wasted effort comes from attempting high-output work in a low-output texture and calling the mismatch laziness.",
  ], "Three times today, stop and name your current texture in two words. No judgement, no fixing. Just the label and the time.", [
    "What is your default texture on an ordinary Tuesday?",
    "Which task in your life has been failing because you keep attempting it in the wrong texture?",
  ]),
  L(1, "physics-of-resonance", "The Physics of Resonance and Lunar Influence", 14, [
    "Two pendulums on a shared beam will synchronize. This is entrainment, and it needs no mysticism — only coupling. The Moon's coupling to a human body is weak, indirect, and mostly mediated through light, tide, sleep, and culture. That weakness is the point: it means the pull is a suggestion, not a command.",
    "Read the honest version and the practice gets stronger, not weaker. You are not being moved. You are being offered a tempo, and you retain full authority over whether to take it.",
  ], "Track your sleep onset time for the next seven nights alongside the Moon's illumination percentage. Do not change anything — just observe whether the two drift together.", [
    "Where have you previously blamed the Moon for something that was yours?",
    "What would change if the Moon were a tempo rather than a cause?",
  ]),
  L(1, "vibrational-signature", "Measuring the Moon's Vibrational Signature", 11, [
    "The synodic month has a period, and a period can be expressed as a pitch. Scaled up through octaves, the lunar cycle lands near 210.42 Hz — the figure used across the Moontuner tools. It is a translation, not a measurement of a sound the Moon is making.",
    "Treat it as a tuning reference the way a piano tuner treats A440: arbitrary in origin, useful because everyone agrees on it. The value is that it gives your body one fixed thing to orient against across a whole cycle.",
  ], "Play a 210.42 Hz tone for three minutes with your eyes closed. Note where in your body it lands first — chest, jaw, sternum, hands.", [
    "Where does that tone sit in your body, and does it move over three minutes?",
    "What changes when you hold a fixed reference tone rather than free-floating attention?",
  ]),
  L(1, "brainwave-entrainment", "Brainwaves and Lunar Entrainment", 12, [
    "Attention has gears: fast and analytical, slower and associative, slower still and near-dreaming. Each phase of the cycle favours a different gear. The waxing half rewards the fast gears; the waning half rewards the slow ones.",
    "This is the mechanism behind almost every scheduling recommendation in this course. You are not choosing tasks by superstition — you are choosing them by which gear is cheap to hold today.",
  ], "Pick one hard task and one soft task. Attempt the hard one first thing tomorrow, and the soft one in the last hour of the day. Note which felt cheaper than expected.", [
    "Which gear is easiest for you to reach unaided?",
    "What is the cost when you force the analytical gear at the wrong hour?",
  ]),
  L(1, "sacred-space", "Designing Your Sacred Space", 10, [
    "A practice space is a physical trigger. Its whole job is to shorten the distance between deciding to practise and actually practising. It needs to be small, consistent, and slightly inconvenient to use for anything else.",
    "Resist decoration for its own sake. Every object in the space should have a function: something to sit on, something to write in, something that makes sound, something that marks time.",
  ], "Build the space today. One surface, four objects, one square metre. Photograph it so you can rebuild it exactly after it gets disturbed.", [
    "What in your current environment makes practice harder to start?",
    "Which of your four objects is decoration pretending to be function?",
  ]),
  L(1, "essential-tools", "Essential Tools for Frequency Work", 9, [
    "The minimum kit: a way to make a sustained tone, a notebook you will actually reopen, a light you can dim, and a reliable read on the current phase. Everything else is optional for years.",
    "Tools fail when they become the practice. A shelf of bowls is not craft. One tone, used consistently across a full cycle, teaches more than a full collection used once.",
  ], "Assemble the minimum kit and remove anything you have not used in the last month. Keep the removal list — you will consult it in Module 5.", [
    "Which tool do you own because it looked like the practice?",
    "What is the single tool you would keep if you could keep only one?",
  ]),

  // ── Module 2 — The Waxing Journey ─────────────────────────────────────────
  L(2, "new-moon", "New Moon: The Quantum Zero-Point of Potential", 13, [
    "The New Moon is the only point in the cycle with no visible evidence. Nothing is illuminated, nothing is proven, and that is exactly the condition under which honest beginnings are possible — there is no audience yet, so there is nothing to perform for.",
    "Most people waste this window by trying to launch. The New Moon is for naming, not launching. A named intention with a specific verb outperforms a beautiful intention with none.",
  ], "At the next New Moon, write one sentence with a concrete verb and a deadline. One. Seal it and do not show anyone until First Quarter.", [
    "What have you been circling without naming?",
    "What is the verb — not the vision, the verb?",
  ]),
  L(2, "waxing-crescent", "Waxing Crescent: Gathering Information and Building Momentum", 11, [
    "The first sliver is a research window. You have a name and no traction, which is the right time to find out what the thing actually requires. Curiosity is cheap here and expensive later.",
    "The failure mode is research as avoidance. Set a hard end to the gathering — the First Quarter is that end, and it arrives whether or not you feel ready.",
  ], "List every unknown standing between you and your named intention. Resolve the three cheapest before First Quarter.", [
    "Which unknown are you avoiding because the answer might be inconvenient?",
    "What information would actually change your next move?",
  ]),
  L(2, "first-quarter", "First Quarter: Taking Decisive Action", 12, [
    "Half lit, half dark, and exactly square to the Sun. This is the friction point of the cycle, and it is supposed to feel like resistance. The square is not an obstacle to the work; it is the work.",
    "The move here is a decision that costs something — a message sent, a payment made, a commitment that is awkward to reverse. Reversibility is comfortable and it is why so many intentions never mature.",
  ], "Make one irreversible move on your intention at the next First Quarter. Small is fine. Reversible is not.", [
    "What decision have you been keeping reversible on purpose?",
    "What would the costly version of this week's move look like?",
  ]),
  L(2, "waxing-gibbous", "Waxing Gibbous: Refining and Perfecting", 11, [
    "Almost full, and the temptation is to keep adding. Gibbous energy is editorial: subtract, tighten, correct. Anything added now arrives untested at the Full Moon.",
    "Treat this as a rehearsal window. Run the thing privately, find where it breaks, fix the break. Perfection is not the goal — survivability under attention is.",
  ], "Run a private rehearsal of whatever culminates at the Full Moon. Log every break. Fix only the breaks that would be visible to someone else.", [
    "What are you adding to avoid finishing?",
    "Where does the work break when someone else touches it?",
  ]),
  L(2, "waxing-frequencies", "Sound Frequencies for Waxing Phases", 10, [
    "Building phases respond to rising intervals and brighter timbres. A tone that ascends gives the nervous system a direction to follow; a tone that sits still asks it to settle, which is the wrong instruction while you are climbing.",
    "Keep the palette small. Two intervals used across a whole waxing half will teach you more about your own response than twelve used once each.",
  ], "Choose one rising interval and use it at the start of every work session this waxing half. Note session-start latency each time.", [
    "Does the tone shorten the gap between sitting down and starting?",
    "Which timbre makes you brace rather than lift?",
  ]),
  L(2, "waxing-breathwork", "Breathwork Patterns for Building Energy", 9, [
    "Building breath is short-in, long-hold, controlled-out. It raises available charge without tipping into agitation. The hold is the active ingredient; most people skip it.",
    "Use it before decisive work, never before sleep. Charge you cannot spend becomes anxiety by evening.",
  ], "Four rounds of 4-in, 7-hold, 4-out before your hardest task, three days running. Record the effect on the first ten minutes of work.", [
    "What happens to your first ten minutes when you charge first?",
    "Where does the charge go if you do not spend it?",
  ]),
  L(2, "waxing-shadow", "Shadow Work During the Waxing Journey", 13, [
    "The waxing shadow is not laziness — it is grandiosity. Building energy inflates the plan faster than it builds the capacity, and the gap between the two is where self-contempt breeds.",
    "The correction is scale discipline. Halve the plan and keep the deadline. What survives that cut is the real project.",
  ], "Take your current intention and halve it without moving the date. Write down what you cut and why it felt unbearable.", [
    "Where does your plan outrun your capacity?",
    "What did halving reveal about what you actually wanted?",
  ]),

  // ── Module 3 — Moon Signs and Daily Alignment ─────────────────────────────
  L(3, "fire-signs", "Fire Signs: Action and Boldness", 11, [
    "Aries, Leo, Sagittarius. The Moon in fire raises initiative and shortens patience. Decisions get made quickly and reversed quickly, which makes these excellent days to start and poor days to negotiate.",
    "Use fire days for anything that has been stalled by hesitation. Do not use them for anything requiring diplomacy or fine detail.",
  ], "Reserve your next fire-sign Moon day for one stalled task. Start it in the first hour of the day.", [
    "What is currently stalled purely by hesitation?",
    "How do you usually spend fire days, and is that a waste?",
  ]),
  L(3, "earth-signs", "Earth Signs: Stability and Building", 11, [
    "Taurus, Virgo, Capricorn. The Moon in earth favours what is tangible, repeatable, and slow. Admin, maintenance, money, and bodywork all become unusually tolerable.",
    "These are the days to build infrastructure that removes future friction. Nothing feels visionary on an earth day, which is precisely why the work survives.",
  ], "Batch every piece of unglamorous maintenance onto your next earth-sign Moon day. Measure how much you clear.", [
    "What friction in your week could be permanently removed by one earth day?",
    "Where do you mistake slowness for failure?",
  ]),
  L(3, "air-signs", "Air Signs: Communication and Ideas", 11, [
    "Gemini, Libra, Aquarius. The Moon in air raises verbal fluency and lowers emotional weight. Conversations that felt heavy last week land more lightly, and that lightness can be used honestly or evasively.",
    "Schedule the difficult conversation, the writing, and the negotiation here. Do not schedule commitments that require you to feel the stakes.",
  ], "Move one postponed conversation onto your next air-sign Moon day. Write the opening sentence in advance.", [
    "Which conversation keeps getting postponed?",
    "Where do you use lightness to avoid a stake?",
  ]),
  L(3, "water-signs", "Water Signs: Emotion and Intuition", 11, [
    "Cancer, Scorpio, Pisces. The Moon in water raises permeability. You will feel more, absorb more, and read the room more accurately — and you will also mistake other people's states for your own.",
    "These are the strongest days for reflective work and the weakest for negotiation. Protect them, and do not sign anything.",
  ], "On your next water-sign Moon day, keep a two-line log every three hours: what you feel, and whose it might be.", [
    "How much of what you carried this week was actually yours?",
    "What does your intuition tell you when you stop arguing with it?",
  ]),
  L(3, "void-of-course", "Void of Course Moons: The Neutral Zones", 12, [
    "Between the Moon's last major aspect and its entry into the next sign, nothing is being made. This is the void — not a bad omen, just an unfurnished room. Beginnings started here tend to lose their thread.",
    "The void is the single most useful timing tool in daily practice because it is short, frequent, and objectively defined. Use it for rest, review, and anything you do not need to persist.",
  ], "Look up this week's void periods and place one rest block or review block inside each of them.", [
    "What did you begin in a void period that never went anywhere?",
    "What kind of work genuinely suits an unfurnished hour?",
  ]),
  L(3, "electional", "Electional Astrology: Choosing the Best Day", 13, [
    "Election is the practice of choosing a moment rather than accepting one. It requires only three inputs: the phase, the sign, and whether the Moon is void. That is enough to beat a random date most of the time.",
    "Do not over-elect. A perfect chart you never act on loses to a good-enough chart you use. Choose within the next ten days, always.",
  ], "Elect a date for one real upcoming decision using phase, sign, and void status only. Write the reasoning in three lines.", [
    "What decision is currently sitting on a random date?",
    "Where does the search for the perfect moment become avoidance?",
  ]),
  L(3, "moon-sign-calendar", "Creating Your Moon Sign Calendar", 10, [
    "A working calendar marks four things per day: phase, Moon sign, void windows, and your own energy score from the night before. Four columns, nothing more.",
    "After one full cycle you will have a personal dataset that outranks any general guidance, including this course.",
  ], "Set up the four-column calendar today and fill it every evening for a full cycle.", [
    "Which column will you be tempted to skip?",
    "What would you want your own data to answer by next New Moon?",
  ]),

  // ── Module 4 — The Waning Wisdom ──────────────────────────────────────────
  L(4, "full-moon", "Full Moon: Culmination, Revelation, and Expression", 13, [
    "Everything is lit, including what you would rather not see. The Full Moon is a visibility event, not a reward ceremony, and its real gift is accurate information about where the work actually stands.",
    "Show the thing. Say the thing. Then stop — the temptation to keep pushing past culmination is how people spend the entire waning half exhausted.",
  ], "At the next Full Moon, publish, show, or say one thing you have been holding. Then close the laptop for the night.", [
    "What became visible that you had been managing not to see?",
    "What did showing it cost, and was the cost what you expected?",
  ]),
  L(4, "waning-gibbous", "Waning Gibbous: Sharing and Gratitude", 10, [
    "The light is going out slowly and the pressure is off. This is the teaching window — what you learned in the last two weeks is fresh enough to transmit and settled enough to be true.",
    "Gratitude here is not decorative. Naming what worked is how you keep it in the repertoire rather than rediscovering it next cycle.",
  ], "Teach one thing from this cycle to one person, in under five minutes, out loud.", [
    "What worked this cycle that you would otherwise forget?",
    "Who benefits from what you just learned?",
  ]),
  L(4, "last-quarter", "Last Quarter: Release and Recalibration", 12, [
    "The second square of the cycle, and the friction returns — this time pointed at what you are still carrying. The question is no longer what to build but what to stop maintaining.",
    "Release is a maintenance decision, not an emotional event. Look for the commitment, subscription, project, or story you are still paying for out of habit.",
  ], "Cancel one thing at the next Last Quarter. An actual cancellation, with a confirmation email.", [
    "What are you still maintaining out of habit?",
    "What would free up if it stopped this week?",
  ]),
  L(4, "waning-crescent", "Waning Crescent: Rest and Deep Integration", 11, [
    "The balsamic window is the closest the cycle comes to sleep. Almost nothing should be initiated here, and the body knows it before the calendar does.",
    "Integration is not passive. Reviewing, dreaming, and doing nothing on purpose are all forms of consolidation, and skipping them is why cycle after cycle feels identical.",
  ], "Clear the two days before the next New Moon of anything new. Review the cycle instead, on paper.", [
    "What does your body do in the last two days of a cycle when you let it?",
    "What repeats every cycle because you never reviewed it?",
  ]),
  L(4, "waning-frequencies", "Sound Frequencies for Waning Phases", 10, [
    "Descending intervals and darker timbres suit release. A falling tone gives the nervous system permission to unclench; the body follows pitch downward more readily than it follows instruction.",
    "Lower the volume as well as the pitch. Waning work is done quietly or it is not done at all.",
  ], "Use one descending interval at the end of each day this waning half. Note the effect on sleep onset.", [
    "Does the falling tone change how quickly you let go of the day?",
    "Where do you resist quiet?",
  ]),
  L(4, "waning-breathwork", "Breathwork Patterns for Letting Go", 9, [
    "Releasing breath is short-in, long-out, no hold. The extended exhale is the mechanism — it is the most direct voluntary access you have to the parasympathetic system.",
    "Use it after conflict, after visibility, and before sleep. It is the counterweight to everything in Module 2.",
  ], "Ten rounds of 4-in, 8-out at the end of the day, for one week. Log how the day closes.", [
    "What does your body do when the exhale gets longer than the inhale?",
    "Which part of your day most needs a counterweight?",
  ]),
  L(4, "waning-shadow", "Shadow Work During the Waning Journey", 13, [
    "The waning shadow is not grief — it is martyrdom. Releasing can quietly become a performance of loss, and the performance keeps the thing alive longer than holding it would have.",
    "Test every release: if it needs an audience, it is not finished. Release cleanly, tell no one for a full cycle, and see whether it holds.",
  ], "Release one thing without announcing it. Wait a full cycle before mentioning it to anyone.", [
    "Which of your losses have you been performing?",
    "What would this release look like if nobody ever knew?",
  ]),

  // ── Module 5 — Advanced Frequency Practices ───────────────────────────────
  L(5, "tuning-forks-bowls", "Advanced Sound Healing with Tuning Forks and Bowls", 14, [
    "A fork gives you a clean, decaying reference; a bowl gives you a sustained, complex field. They do different jobs. The fork tests, the bowl holds.",
    "Advanced work here means precision, not accumulation: one fork placed accurately for thirty seconds outperforms a full set swept vaguely for ten minutes.",
  ], "Run a paired session: fork first to test where the body is closed, bowl second to hold that area. Record what shifted.", [
    "Where does your body reliably close under a clean tone?",
    "What changes between testing and holding?",
  ]),
  L(5, "planetary-frequencies", "Planetary Frequency Work", 13, [
    "Venus, Mars, Jupiter, Saturn — four textures beyond the lunar tempo: attraction, drive, expansion, structure. Each has a scaled pitch, and each pairs naturally with a kind of task.",
    "Add one at a time. Layering four planetary tones before you know your response to each produces noise you cannot interpret.",
  ], "Choose the one planet whose quality your current project most lacks. Work with its tone only, for one full week.", [
    "Which of the four is missing from your work right now?",
    "What does adding it change in your output, not your mood?",
  ]),
  L(5, "ceremony-design", "Creating Lunar Ceremonies and Rituals", 15, [
    "A ceremony is a container with four parts: an opening that marks the boundary, a working that does one thing, a witness that registers it, and a closing that returns you. Missing any part and it becomes an event you drift out of.",
    "Design for repetition. The ceremony you can run alone in twenty minutes on a Tuesday is worth more than the one that needs six people and a solstice.",
  ], "Write your own twenty-minute ceremony with all four parts named. Run it at the next phase change.", [
    "Which of the four parts do you habitually skip?",
    "What is the one thing your working actually does?",
  ]),
  L(5, "movement", "Movement and Dance with Lunar Energy", 11, [
    "The body resolves what analysis cannot. Waxing movement is directional and rising; waning movement is falling, spiralling, and floor-bound. Match the movement to the half and the release completes itself.",
    "No choreography. Ten minutes, no mirror, one instruction: let the phase decide the direction.",
  ], "Ten minutes of unchoreographed movement per half-cycle, once waxing and once waning. Note the difference in your body afterwards.", [
    "What does your body do differently in each half?",
    "What did movement resolve that thinking did not?",
  ]),
  L(5, "frequency-map", "Personal Frequency Map Development", 14, [
    "Your map is the accumulated record of which tone, phase, sign, and practice produced which state — in you, not in general. It is built from the four-column calendar plus your session notes.",
    "By the end of a year the map replaces guidance entirely. That is the intended outcome of this course: you become the reference.",
  ], "Draft version one of your map: eight rows, one per phase, each with your best-performing tone, task type, and practice.", [
    "Which phase do you have the least data on?",
    "Where does your map already contradict standard advice?",
  ]),
  L(5, "teaching-others-intro", "Teaching Lunar Practices to Others", 12, [
    "Teaching exposes every place your understanding is decorative. If you cannot state the mechanism in one sentence without metaphor, you have not got it yet.",
    "Teach the diagnostic first, never the cosmology. People stay for what works on Tuesday.",
  ], "Explain the phase-to-task mapping to someone with no interest in astrology. Use no metaphors. Note where you stumbled.", [
    "Which part could you not explain plainly?",
    "What did the beginner's question reveal?",
  ]),

  // ── Module 6 — Integration and Mastery ────────────────────────────────────
  L(6, "personal-map-final", "Creating Your Personal Frequency Map", 13, [
    "Version two of the map, now built from a full cycle of real data rather than expectation. Expect at least two surprises — a phase you assumed was strong that is not, and a practice you dismissed that works.",
    "Write it as a single page. If it needs more than a page, it is notes, not a map.",
  ], "Rebuild the map on one page from your calendar data. Mark the two entries that contradict what you believed in Module 1.", [
    "What did the data overturn?",
    "Which entry do you least want to be true?",
  ]),
  L(6, "unique-practice", "Developing Your Unique Lunar Practice", 12, [
    "A practice you keep is one shaped to your actual life, not to an idealised one. Take the minimum viable version — one daily read, one weekly review, one per-phase working — and let everything else be optional.",
    "The measure of mastery is not intensity. It is whether the practice survives a bad month.",
  ], "Write your minimum viable practice in three lines and commit to it for one full cycle with no additions.", [
    "What would survive a bad month?",
    "What are you keeping out of guilt?",
  ]),
  L(6, "teaching-materials", "Teaching Lunar Practices to Others", 12, [
    "Teaching materials are a compression test. One page, one diagram, one exercise — if the idea does not survive that compression, it was not solid.",
    "Build for the person you were in week one, not for a peer. The beginner's confusion is the only reliable editor.",
  ], "Produce a one-page teaching sheet for a single concept from this course, and give it to one real beginner.", [
    "What did the beginner misunderstand first?",
    "What did compression force you to cut?",
  ]),
  L(6, "accountability", "Accountability and Community Structures", 10, [
    "Solo practice decays quietly. One other person who expects a message at the New Moon fixes most of it — not for motivation, but for the record it creates.",
    "Keep the structure minimal and time-bound: two people, one message per phase change, reviewed at the year's end.",
  ], "Ask one person to be your phase-change contact. Send the first message at the next phase change.", [
    "Who would notice if your practice stopped?",
    "What are you willing to be held to?",
  ]),
  L(6, "long-term-planning", "Long-Term Lunar Development Planning", 12, [
    "A lunar year is thirteen cycles, and thirteen is enough to see structure that a single month hides. Plan at that scale: one arc per year, reviewed at each Full Moon.",
    "Long-term does not mean vague. Name the arc in one sentence and a date, exactly as you named an intention in Module 2.",
  ], "Write your one-sentence lunar-year arc with a date. Put the thirteen Full Moon review dates in your calendar today.", [
    "What is the one arc worth a whole year?",
    "What will you stop doing to make room for it?",
  ]),
  L(6, "path-to-mastery", "The Path to Lunar Mastery", 11, [
    "Mastery here is unglamorous: you read the sky in seconds, you choose accordingly, and you stop narrating it. The practice becomes invisible because it has become ordinary.",
    "Nothing is fated. The cycle offers a tempo; the choice of what to play remains entirely yours. That is where this course ends and your own record begins.",
  ], "Close the course by writing a single paragraph to yourself, dated one lunar year from today, describing the practice you intend to still be running.", [
    "What would still be running in a year?",
    "What did this course change that you did not expect?",
  ]),
];

export const lessonsForModule = (n: number): Lesson[] =>
  LESSONS.filter((l) => l.module === n);

export const TOTAL_LESSONS = LESSONS.length;
