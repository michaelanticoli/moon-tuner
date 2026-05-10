/**
 * Feature flags — Phase-gated rollout control.
 *
 * PHASE 1: Homepage · Today's Directive · Harmonic Profile · Journal · Email capture
 * PHASE 2: Reports · Proposal Engine · Auth · Longitudinal memory
 * PHASE 3: Digital Smudging · AI synthesis · Mobile optimization · Recommendations
 * PHASE 4: Native apps · Widgets · Archive systems · Expanded AI
 *
 * To advance a gate, flip the corresponding flag to `true` and remove the
 * ComingSoon route guard in App.tsx. Never remove flags — document the transition.
 */

/** Phase 2 features: Reports, Proposal Engine, Auth/Accounts, Membership */
export const PHASE_2_ENABLED = true;

/** Phase 3 features: Digital Smudging, AI synthesis, PWA, Recommendations */
export const PHASE_3_ENABLED = true;

/** Phase 4 features: Native apps, Widgets, Advanced archive, Expanded AI */
export const PHASE_4_ENABLED = false;
