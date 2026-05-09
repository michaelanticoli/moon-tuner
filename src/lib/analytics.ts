/**
 * Moontuner Analytics Engine
 *
 * A quiet observatory for understanding whether Moontuner is genuinely
 * helping people — not extracting attention from them.
 *
 * Design principles:
 * - Privacy-conscious: no PII, no user IDs in events
 * - Local-first: events stored in localStorage, never force-sent
 * - Opt-out: fully respected, clears queue immediately
 * - Transparent: users can inspect what is collected
 * - Minimal: only what improves emotional usability
 *
 * What this measures:
 * - Clarity, emotional pacing, interaction friction
 * - Navigation confusion, reflective completion rates
 * - Calm revisitation behavior, content depth engagement
 *
 * What this does NOT measure:
 * - Rage clicks, infinite scroll depth, notification responses
 * - Anything that optimises for compulsive engagement
 */

const QUEUE_KEY = 'mt_analytics_queue';
const SESSION_TOKEN_KEY = 'mt_session_token';
const SESSION_EXPIRY_KEY = 'mt_session_expiry';
const OPT_OUT_KEY = 'mt_analytics_opt_out';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 h — privacy-safe rotation
const FLUSH_INTERVAL_MS = 30 * 1000;
const MAX_QUEUE = 200;

// ---------------------------------------------------------------------------
// Event taxonomy
// ---------------------------------------------------------------------------

export type AnalyticsEventName =
  // Ecosystem navigation
  | 'page_view'
  | 'ecosystem_entry'
  | 'return_visit'
  // Directive interactions
  | 'directive_view'
  | 'directive_complete'
  // Report flows
  | 'report_preview'
  | 'report_generate'
  // Proposal flows
  | 'proposal_view'
  | 'proposal_submit'
  // Ritual interactions
  | 'smudging_start'
  | 'smudging_complete'
  | 'cazimi_view'
  // Reflection & journaling
  | 'journal_open'
  | 'journal_write_start'
  | 'journal_entry_complete'
  | 'reflection_start'
  | 'reflection_complete'
  // Workbook interactions
  | 'workbook_open'
  | 'workbook_progress'
  | 'workbook_complete'
  // Onboarding flow health
  | 'onboarding_start'
  | 'auth_view'
  | 'auth_complete'
  | 'profile_setup_start'
  | 'profile_setup_complete'
  | 'onboarding_dropoff'
  // Content & emotional engagement
  | 'emotional_theme_engage'
  | 'content_depth_engage';

// ---------------------------------------------------------------------------
// User state modeling
// Lightweight behavioural models derived solely from local session behaviour.
// Used ONLY to: simplify interfaces, reduce cognitive load, improve pacing.
// NOT used to: manipulate behaviour, maximise time-on-site, exploit users.
// ---------------------------------------------------------------------------

export type UserState =
  | 'exploring'      // browsing varied sections, moderate pace
  | 'reflecting'     // dwelling in journal / ritual / philosophy
  | 'deep_reading'   // long dwell on content pages
  | 'ritual_tending' // repeated ritual interactions
  | 'high_energy'    // many completions in a short session
  | 'low_energy'     // brief, infrequent visit
  | 'overwhelmed'    // rapid navigation, very short dwell times
  | 'unknown';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AnalyticsEvent {
  id: string;
  session_token: string;
  event_name: AnalyticsEventName;
  page: string;
  properties: Record<string, string | number | boolean | null>;
  timestamp: number;
}

interface SessionBehavior {
  pageViews: Array<{ page: string; dwell_ms: number; timestamp: number }>;
  completions: number;
  ritualInteractions: number;
  reflectionInteractions: number;
  sessionStart: number;
  uniquePages: Set<string>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateSessionToken(): string {
  try {
    const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    const now = Date.now();
    if (expiry && parseInt(expiry, 10) > now) {
      const token = localStorage.getItem(SESSION_TOKEN_KEY);
      if (token) return token;
    }
    const token = generateId();
    localStorage.setItem(SESSION_TOKEN_KEY, token);
    localStorage.setItem(SESSION_EXPIRY_KEY, String(now + SESSION_TTL_MS));
    return token;
  } catch {
    return generateId();
  }
}

function readQueue(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: AnalyticsEvent[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE)));
  } catch {
    // localStorage may be unavailable (private browsing, storage full)
  }
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

class AnalyticsEngine {
  private queue: AnalyticsEvent[];
  private sessionToken: string;
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private behavior: SessionBehavior = {
    pageViews: [],
    completions: 0,
    ritualInteractions: 0,
    reflectionInteractions: 0,
    sessionStart: Date.now(),
    uniquePages: new Set(),
  };

  constructor() {
    this.sessionToken = getOrCreateSessionToken();
    this.queue = readQueue();
    this.startFlushTimer();
  }

  // ---- Opt-out ----

  isOptedOut(): boolean {
    try {
      return localStorage.getItem(OPT_OUT_KEY) === 'true';
    } catch {
      return false;
    }
  }

  optOut(): void {
    try {
      localStorage.setItem(OPT_OUT_KEY, 'true');
      this.queue = [];
      writeQueue([]);
    } catch {
      /* ignore */
    }
  }

  optIn(): void {
    try {
      localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      /* ignore */
    }
  }

  // ---- Tracking ----

  track(
    eventName: AnalyticsEventName,
    properties: Record<string, string | number | boolean | null> = {},
    page?: string,
  ): void {
    if (this.isOptedOut()) return;

    const currentPage =
      page ?? (typeof window !== 'undefined' ? window.location.pathname : '');

    const event: AnalyticsEvent = {
      id: generateId(),
      session_token: this.sessionToken,
      event_name: eventName,
      page: currentPage,
      properties,
      timestamp: Date.now(),
    };

    this.queue.push(event);
    writeQueue(this.queue);
    this.updateBehavior(event);
  }

  // ---- Behavioural state ----

  private updateBehavior(event: AnalyticsEvent): void {
    if (event.event_name === 'page_view') {
      const dwell =
        typeof event.properties.dwell_ms === 'number'
          ? event.properties.dwell_ms
          : 0;
      this.behavior.pageViews.push({
        page: event.page,
        dwell_ms: dwell,
        timestamp: event.timestamp,
      });
      this.behavior.uniquePages.add(event.page);
    }

    if (
      (
        [
          'directive_complete',
          'journal_entry_complete',
          'workbook_complete',
          'reflection_complete',
          'smudging_complete',
        ] as AnalyticsEventName[]
      ).includes(event.event_name)
    ) {
      this.behavior.completions++;
    }

    if (
      (
        ['smudging_start', 'smudging_complete', 'cazimi_view'] as AnalyticsEventName[]
      ).includes(event.event_name)
    ) {
      this.behavior.ritualInteractions++;
    }

    if (
      (
        [
          'journal_open',
          'journal_write_start',
          'reflection_start',
        ] as AnalyticsEventName[]
      ).includes(event.event_name)
    ) {
      this.behavior.reflectionInteractions++;
    }
  }

  getUserState(): UserState {
    const views = this.behavior.pageViews;
    if (views.length === 0) return 'unknown';

    const sessionMs = Date.now() - this.behavior.sessionStart;
    const avgDwell =
      views.length > 0
        ? views.reduce((sum, v) => sum + v.dwell_ms, 0) / views.length
        : 0;

    // Overwhelm: many pages visited rapidly with very short dwell
    if (views.length > 8 && avgDwell < 30_000) return 'overwhelmed';

    // Ritual tending: significant ritual interactions
    if (this.behavior.ritualInteractions >= 2) return 'ritual_tending';

    // Reflecting: journal / reflection heavy
    if (this.behavior.reflectionInteractions >= 2) return 'reflecting';

    // Deep reading: long dwell with few page jumps
    if (avgDwell > 120_000 && views.length <= 4) return 'deep_reading';

    // High energy: many completions in a short session
    if (this.behavior.completions >= 3 && sessionMs < 600_000) return 'high_energy';

    // Low energy: very brief session, few pages
    if (views.length <= 2 && sessionMs < 60_000) return 'low_energy';

    // Default: general exploration
    if (this.behavior.uniquePages.size > 2) return 'exploring';

    return 'unknown';
  }

  getBehavior(): Omit<SessionBehavior, 'uniquePages'> & { uniquePageCount: number } {
    const { uniquePages, ...rest } = this.behavior;
    return { ...rest, uniquePageCount: uniquePages.size };
  }

  getQueue(): ReadonlyArray<AnalyticsEvent> {
    return this.queue;
  }

  clearQueue(): void {
    this.queue = [];
    writeQueue([]);
  }

  // ---- Flush ----

  flush(): void {
    if (this.queue.length === 0 || this.isOptedOut()) return;
    // Events are stored locally.
    // In production, this can be extended to flush to a privacy-safe backend
    // (PostHog self-hosted, Plausible, Umami) via VITE_ANALYTICS_ENDPOINT.
    writeQueue(this.queue);
  }

  destroy(): void {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flush();
  }

  private startFlushTimer(): void {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flushTimer = setInterval(() => this.flush(), FLUSH_INTERVAL_MS);
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let _engine: AnalyticsEngine | null = null;

export function getAnalytics(): AnalyticsEngine {
  if (!_engine) {
    _engine = new AnalyticsEngine();
  }
  return _engine;
}

/** Convenience wrapper — fire-and-forget event tracking. */
export function track(
  eventName: AnalyticsEventName,
  properties: Record<string, string | number | boolean | null> = {},
  page?: string,
): void {
  getAnalytics().track(eventName, properties, page);
}
