

# Plan: Integrate Lunar Datapoints Knowledge Base

## What This Data Contains

The uploaded CSV has ~1,128 rows of curated astronomical research datapoints covering:
- **Saros eclipse cycles** (18.03 years, 223 synodic months)
- **Metonic cycles** (19 years, 235 lunations)
- **Synodic month mechanics** (29.53 days)
- **Planetary synodic cycles** (Venus, Mars, Mercury, Jupiter returns)
- **Nodal & apsidal cycles** (draconic months, eclipse years)
- **Eclipse periodicity & Inex cycles** (358 synodic months, ~29 years)
- **Historical astronomy** (Babylonian, Greek, Mayan references)

Each row includes: datapoint text, cardinal numbers, dates, entity tags, relevance score (0-1), source URL. Many rows are duplicated (same fact appears 2-4 times). After deduplication, roughly ~400-500 unique datapoints remain.

---

## Architecture

### 1. Database Table: `lunar_datapoints`

Store the deduplicated dataset in a backend table for querying:

```text
lunar_datapoints
├── id (uuid, PK)
├── datapoint (text) — the fact/insight
├── category (text) — saros | metonic | synodic | planetary | nodal | eclipse | historical
├── cardinal_values (text) — extracted numbers
├── relevance (float) — 0-1 score
├── source_url (text) — attribution
├── tags (text[]) — searchable tags like 'moon', 'venus', 'eclipse'
├── created_at (timestamptz)
```

RLS: public SELECT (read-only reference data), no INSERT/UPDATE/DELETE for anon users.

### 2. Data Ingestion Edge Function

A one-time `ingest-lunar-datapoints` edge function that:
- Reads the CSV from `public/data/`
- Deduplicates by exact datapoint text match
- Auto-categorizes by keyword detection (Saros → saros, Metonic → metonic, Venus/Mars/Mercury → planetary, etc.)
- Inserts into `lunar_datapoints` table

### 3. Integration Points

#### A. School Curriculum Enrichment — "Cosmic Cycles" Module
Add a new tab/section in the School's curriculum called **"Cosmic Cycles"** (or "Advanced Theory"):
- Browsable cards organized by category (Saros, Metonic, Synodic, Planetary Returns)
- Each card shows the datapoint text, key numbers, and source attribution
- Filter/search by category
- Ties into the existing School navigation structure on `MoontunerSchool.tsx`

#### B. Lunar System Deep Dives
Add expandable "Deep Dive" accordion sections on the `LunarSystem.tsx` page:
- Below the Live Status card: a "The Science Behind the Synodic Month" section pulling relevant datapoints
- Below the Phase-Sign Matrix: "Eclipse Cycles & the Saros" section
- Each section shows 3-5 curated facts with source links
- Uses existing `ScrollReveal` pattern

#### C. Cycle Insights Knowledge Base (Cipher Integration)
Enhance `CipherDayDetail.tsx` to show contextual cycle facts:
- When an eclipse event appears in the ICS data, pull related Saros/eclipse datapoints
- Add a "Cycle Context" expandable section at the bottom of the day detail
- Shows 2-3 relevant facts based on the day's astronomical events

#### D. AI-Powered Insights
Create/update an edge function `generate-cycle-insight` that:
- Queries `lunar_datapoints` for facts relevant to the current lunar configuration
- Feeds selected datapoints as context to the Lovable AI gateway (gemini-3-flash-preview)
- Generates a synthesized "Cycle Intelligence" paragraph
- Can be called from the Cipher day detail or Lunar System page
- Uses the existing `LOVABLE_API_KEY` secret

### 4. File Changes Summary

```text
New files:
├── src/data/lunarDatapoints.ts          — typed category constants, query helpers
├── src/components/school/SchoolCycles.tsx — "Cosmic Cycles" curriculum module
├── src/components/CycleInsightCard.tsx    — reusable fact card component
├── src/components/DeepDiveSection.tsx     — expandable deep dive accordion
├── supabase/functions/ingest-lunar-datapoints/index.ts
├── supabase/functions/generate-cycle-insight/index.ts

Modified files:
├── src/pages/MoontunerSchool.tsx         — add Cosmic Cycles section
├── src/pages/LunarSystem.tsx             — add Deep Dive sections
├── src/components/cipher/CipherDayDetail.tsx — add Cycle Context section
```

### 5. Implementation Order
1. Create `lunar_datapoints` table with migration + RLS
2. Copy CSV to project, build ingestion edge function, run it
3. Build `CycleInsightCard` reusable component
4. Add School "Cosmic Cycles" module
5. Add Lunar System deep dive sections
6. Add Cipher contextual facts
7. Wire AI-powered synthesis edge function

