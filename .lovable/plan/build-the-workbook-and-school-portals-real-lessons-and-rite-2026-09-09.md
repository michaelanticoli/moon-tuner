# Build the workbook and school portals, real lessons, and rite download tracking

Five pieces, all built inside this project so nothing depends on the two external apps.

## 1. Lunar Workbook Program + Persona Edition, built here

Two new in-project sections replacing the outbound links on `/lunar-chaperone` and `/workbooks`:

- `/program` — the Lunar Workbook Program: the 24-step canon from `chaperoneCanon.ts`, the live half-cycle indicator, per-workbook reading + practice pages.
- `/program/persona` — the Persona Edition: the same arc personalized against the reader's birth data (already collected on the profile), overlaying their natal signature onto each half-cycle step.

The existing CTAs keep their wording and styling; they point at the new internal routes. The external apps stay reachable from a single "Also available as a standalone app" line so nothing that already works breaks.

## 2. Real lessons and exercises in the curriculum

`src/data/phasecraftCurriculum.ts` grows a `lessons` array per module. Each lesson carries a title, an estimated time, a written teaching body (several paragraphs in the Moontuner voice), a practice to perform, and two or three reflection prompts. Lessons are authored from each module's existing topic list, so the six modules cover roughly 40 lessons in total.

`/school/curriculum` gains an expandable lesson list under each module: outcomes and topics stay, with the lesson bodies and exercises opening in place.

## 3. Program portal (login required)

Route `/program/portal`, behind the existing auth gate.

Shows:
- Where the reader sits in the 24-step canon right now, computed from the live sky by `resolveWorkbook`.
- Their half-cycle history: steps completed, the current step's practice, the next step and its date.
- A "Claim a gift" panel: enter a claim code, redeemed through the existing `claim_gift` function; claimed canon workbooks then appear as unlocked in their library.
- Their unlocked workbook library, with a link straight into each workbook's reading page.

New tables: `program_members` (one row per buyer, start step, current step, timestamps) and `program_entitlements` (which canon steps a person owns, and how they got them — purchase, gift, or membership tier). Both owner-scoped with row-level security and the required grants.

## 4. School portal (login required)

Route `/school/portal`.

Shows the six modules as a vertical path. Module 1 is open to any signed-in student; each later module unlocks when the previous one is marked complete. Inside a module, lessons are checked off one at a time and the module completes when every lesson is checked. A progress ring shows overall course completion and the next action.

New table: `school_progress` (user, module number, lesson slug, completed_at), owner-scoped with RLS and grants. Unlock logic is derived from the rows rather than stored, so nothing can drift.

## 5. Rite download tracking

Every "Download PDF" and "View PDF" action on `/rites` — including the Arrival Rite — records the rite slug, the asset, and the action. Anonymous downloads are recorded without a user id; signed-in ones carry it.

New table: `rite_downloads` (slug, asset, action, user id nullable, created_at). Inserts allowed for everyone; reads restricted to admins only via the existing `has_role` check.

An admin-only panel on `/rites` (visible through `useAdminAccess`) lists each rite by download count, most-used first, with a 30-day and all-time count.

## Navigation and wiring

- `Program` and `School Portal` appear in the main menu under the existing Tools and Learn groups; the portals also surface in the signed-in account menu.
- Curriculum modules link to their school-portal counterpart, and the practice layer keeps cross-linking to the Rites.
- Routes registered in `src/App.tsx`, plus `public/sitemap.xml` and `public/llms.txt` entries for the public pages (portals excluded from the sitemap).

## Technical notes

- Four migrations, each with `CREATE TABLE` → `GRANT` → `ENABLE ROW LEVEL SECURITY` → policies, following the project's standard owner-scoped pattern (`auth.uid() = user_id`), plus `service_role` grants for edge access.
- No new edge functions are needed: gift claiming reuses `public.claim_gift`, and all portal reads and writes are owner-scoped table access from the client.
- Download tracking is a fire-and-forget insert so a logging failure never blocks a download.
- Content lives in `src/data/`, so lessons and canon stay editable without touching page code.
