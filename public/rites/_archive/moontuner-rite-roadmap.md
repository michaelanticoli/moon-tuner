# The Rite/Workbook Series — Volume Planning
**MOONtuner · Quantumelodics · Moontuner Press**

*The Lens Rite is Volume I. This maps what comes next, using the same chassis.*

---

## The shared chassis (build once, reskin per volume) — and what has to change every time

Not everything about *The Lens Rite* should carry over unchanged. Confirmed with the Arrival Rite build: same brand DNA, genuinely different visual system — not a reskin with new copy pasted in.

**Actually shared (the invisible plumbing):**

| Component | What it does |
|---|---|
| Dark editorial shell | `#080808` base, gold/bronze/ink palette, Cormorant Garamond / Barlow Condensed / Karla, embedded — no internet dependency at render time |
| Station-cycle engine | JS-driven array of stations → rendered cards, with a live "where do I start" calculation |
| Autosave worksheet fields | `window.storage`-backed, so entries persist without Michael having to remember to save anything |
| Dark-PDF export pipeline | Playwright → Chromium → `print_background`, zero-margin `@page`, edge-to-edge dark, lined print-worksheet fallback |
| One restrained "wound" accent (the plum/bruise) | Structural convention across the series — the station doing the real work gets the one color break, every volume, but the *rest* of that volume's system stays distinct |

**Deliberately NOT shared — has to be reinvented per volume:**

| Component | Lens Rite | Arrival Rite | Governing idea |
|---|---|---|---|
| Station glyph | Lunar crescent phases | 8-position clock dial with hour ticks | The icon language should come from the volume's own subject, not the timing mechanic underneath it |
| Connecting spine | Smooth gradient line (lunar light) | Ticked/ruled stopwatch line | Texture signals what kind of thing is being tracked |
| Station numbering | Arabic, "Station 01" | Roman numerals, "Position I" | Small but real — prevents every volume reading as the same template |
| Card texture | Plain dark card | Faint ledger-rule background | Ties to this volume's "bring real numbers" content, not a default |
| Entry-point framing | Bordered card, "Entry Point" | Double-rule header, "Position" | Language + container both shift with the subject |

The lunar-cycle *timing* (which real-world moon phase maps to which station) stays the shared substrate across the whole series — that's the actual MOONtuner Method mechanic. What has to be reinvented every time is how that timing gets *represented*, station numbering conventions, spine treatment, and card texture. Same family, not the same outfit.

---

## Candidate volumes

Six are built on things already established in your work. Three are named in your message but not yet defined anywhere I have on file — flagged clearly below rather than guessed into false confidence.

### Grounded in existing material

| # | Title (working) | Brand | Cycle model | Core content source |
|---|---|---|---|---|
| 1 | **The Lens Rite** | MOONtuner Method | 8-station lunar phase | *Built.* Constriction, trauma inventory, outside view. |
| 2 | **The Culture Session** | Quantumelodic | 12-station, one per placement (planet-in-sign) | The Quantumelodic instrument's own mapping logic — turns "what does my chart sound like" into a worked ritual instead of a lookup tool |
| 3 | **The Deal** | Cultivárot | Card-pull structure (major/minor arcana × harmonic frequency), not lunar | Your tarot-frequency system — first volume that isn't phase-based, good test of whether the chassis flexes |
| 4 | **The 30-Day Reset, Reforged** | Moontuner Press — *Energetic Hygiene for the Modern Human* | 30-day arc instead of 8-station | Already written, in the book. This is a re-platforming job, not a content job — probably the fastest volume to ship |
| 5 | **Onboarding Rite** | Lunar Chaperone (moontuner-chaperone) | Single-session, not cyclical | Functions as the "how to use everything else in this series" piece — sits in front of the others, not alongside them |
| 6 | **The Twelve** | Zodiac series | 12 sun-sign editions of one shared template, not 12 separate builds | One chassis, one template, twelve content swaps — matches your planned 12-book series structure directly |

### Named, not yet defined — need one line from you before I build the wrong thing

| # | Title (working) | Your term | My working guess | Confidence |
|---|---|---|---|---|
| 7 | — | **PHASECRAFT** | A meta-tool: lets someone *build their own* rite using the same station logic — you'd be productizing the chassis itself, not just using it | Low — could just as easily be a specific existing framework I don't have on file |
| 8 | — | **Digital Smudging** | A device/attention-hygiene ritual — clearing feeds, notifications, screen residue as its own category of "psychic attack," distinct from the interpersonal maloik work in the Lens Rite | Medium — fits *Energetic Hygiene*'s territory but I'm inferring the digital-specific angle |
| 9 | — | **Space-Time Printing** | Either (a) a natal-moment print product — turning a precise birth timestamp into a physical printed artifact, or (b) the printing/production framework itself for turning MOONtuner's digital output into physical goods | Low — genuinely a coin flip between a product and infrastructure |

I'd rather get one sentence on each of these three than build a polished wrong answer three times.

---

## Suggested build order

Not the numbering above — an actual sequence, weighted toward fastest-to-ship and highest-leverage first:

1. **The 30-Day Reset, Reforged** — content already exists, purely a re-platform. Proves the chassis works on non-lunar-phase content fast.
2. **Onboarding Rite** — short, single-session, and every other volume benefits from having a front door.
3. **The Twelve** — highest total output (12 editions) for the lowest marginal cost once the template's set, and it's already a committed part of your catalog.
4. **The Culture Session** — ties directly to the instrument you already built; closes the gap you flagged between the interactive tool and the canonical Notion dataset.
5. **The Deal** (Cultivárot) — the one real structural stretch (non-lunar cycle), worth doing once the pattern's proven elsewhere.
6–8/9. **PHASECRAFT, Digital Smudging, Space-Time Printing** — sequenced once defined; PHASECRAFT likely goes last regardless, since a "build your own rite" tool should probably ship *after* there are several real rites for it to generalize from, not before.

---

## Open questions

- One line each on **PHASECRAFT**, **digital smudging**, and **space-time printing** — what they are, and which brand/product they belong to.
- Is *The Lens Rite* meant to stay a standalone piece, or does it formally become "Volume I" with matching numbering/series branding added retroactively?
- Landing on 6 vs. 8 vs. 9 volumes — does anything above feel like it doesn't belong, or is there a gap I haven't covered?
