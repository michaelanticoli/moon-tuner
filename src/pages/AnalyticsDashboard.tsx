/**
 * Analytics Observability Dashboard
 *
 * A quiet, operational view of Moontuner ecosystem health.
 * Reads from the local analytics queue — no external requests.
 *
 * Accessible at /analytics (internal use only).
 *
 * Aesthetic: clean, minimal, calm. No marketing noise.
 */
import { useMemo, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getAnalytics, AnalyticsEvent, UserState } from '@/lib/analytics';
import { Activity, Moon, BookOpen, RefreshCcw, Eye, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PAGE_LABELS: Record<string, string> = {
  '/': 'Homepage',
  '/method': 'Method',
  '/manifesto': 'Manifesto',
  '/philosophy': 'Philosophy',
  '/workbooks': 'Workbooks',
  '/lunar-cipher': 'Lunar Cipher',
  '/lunar-reports': 'Reports',
  '/lunar-chaperone': 'Chaperone',
  '/digital-smudging': 'Smudging',
  '/journal': 'Journal',
  '/dashboard': 'Dashboard',
  '/studio': 'Studio',
  '/harmonic-profile': 'Harmonic Profile',
  '/offerings': 'Offerings',
  '/sessions': 'Sessions',
  '/school': 'School',
  '/cazimi': 'Cazimi',
  '/moon-phase-today': 'Moon Today',
};

const EVENT_LABELS: Record<string, string> = {
  page_view: 'Page View',
  ecosystem_entry: 'Ecosystem Entry',
  return_visit: 'Return Visit',
  directive_view: 'Directive View',
  directive_complete: 'Directive Complete',
  report_preview: 'Report Preview',
  report_generate: 'Report Generate',
  proposal_view: 'Proposal View',
  proposal_submit: 'Proposal Submit',
  smudging_start: 'Smudging Start',
  smudging_complete: 'Smudging Complete',
  cazimi_view: 'Cazimi View',
  journal_open: 'Journal Open',
  journal_write_start: 'Journal Write',
  journal_entry_complete: 'Journal Complete',
  reflection_start: 'Reflection Start',
  reflection_complete: 'Reflection Complete',
  workbook_open: 'Workbook Open',
  workbook_progress: 'Workbook Progress',
  workbook_complete: 'Workbook Complete',
  onboarding_start: 'Onboarding Start',
  auth_view: 'Auth View',
  auth_complete: 'Auth Complete',
  profile_setup_start: 'Profile Setup',
  profile_setup_complete: 'Profile Complete',
  onboarding_dropoff: 'Onboarding Dropoff',
  emotional_theme_engage: 'Emotional Theme',
  content_depth_engage: 'Deep Content',
};

const STATE_COLORS: Record<UserState, string> = {
  exploring: '#8b9dc3',
  reflecting: '#c3a8c8',
  deep_reading: '#a8c3b8',
  ritual_tending: '#c3b8a8',
  high_energy: '#c3c8a8',
  low_energy: '#a8b3c3',
  overwhelmed: '#c3a8a8',
  unknown: '#6b7280',
};

const CHART_NEUTRAL = '#6b7280';
const CHART_ACCENT = '#a8956b';

function formatDwell(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(0)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

function labelPage(path: string): string {
  return PAGE_LABELS[path] ?? path;
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="node-card border-border/30 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground/50">
        {icon}
        <span className="text-[10px] tracking-widest uppercase font-sans">{label}</span>
      </div>
      <span className="font-serif text-2xl text-foreground">{value}</span>
      {sub && <span className="text-xs text-muted-foreground/50 font-sans">{sub}</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main dashboard
// ---------------------------------------------------------------------------

const AnalyticsDashboard = () => {
  const analytics = getAnalytics();
  const [, setRefresh] = useState(0);

  const queue = analytics.getQueue() as AnalyticsEvent[];
  const userState = analytics.getUserState();
  const behavior = analytics.getBehavior();

  // --- Aggregations ---

  const pageViewEvents = useMemo(
    () => queue.filter((e) => e.event_name === 'page_view'),
    [queue],
  );

  const completionEvents = useMemo(
    () =>
      queue.filter((e) =>
        [
          'directive_complete',
          'journal_entry_complete',
          'workbook_complete',
          'reflection_complete',
          'smudging_complete',
        ].includes(e.event_name),
      ),
    [queue],
  );

  const avgDwell = useMemo(() => {
    const dwells = pageViewEvents
      .map((e) => e.properties.dwell_ms)
      .filter((d): d is number => typeof d === 'number' && d > 0);
    return dwells.length > 0
      ? dwells.reduce((a, b) => a + b, 0) / dwells.length
      : 0;
  }, [pageViewEvents]);

  // Page distribution
  const pageDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    queue.forEach((e) => {
      const p = labelPage(e.page);
      counts[p] = (counts[p] ?? 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));
  }, [queue]);

  // Event type distribution
  const eventDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    queue.forEach((e) => {
      const label = EVENT_LABELS[e.event_name] ?? e.event_name;
      counts[label] = (counts[label] ?? 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [queue]);

  // Funnel: onboarding health
  const onboardingFunnel = useMemo(() => {
    const steps = [
      { label: 'Entry', events: ['ecosystem_entry', 'return_visit'] },
      { label: 'Auth View', events: ['auth_view'] },
      { label: 'Auth Complete', events: ['auth_complete'] },
      { label: 'Profile Setup', events: ['profile_setup_start'] },
      { label: 'Profile Done', events: ['profile_setup_complete'] },
    ];
    return steps.map(({ label, events }) => ({
      label,
      count: queue.filter((e) => events.includes(e.event_name)).length,
    }));
  }, [queue]);

  // Reflective completions over time (simple hourly buckets)
  const completionTimeline = useMemo(() => {
    const buckets: Record<string, number> = {};
    completionEvents.forEach((e) => {
      const hour = new Date(e.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      buckets[hour] = (buckets[hour] ?? 0) + 1;
    });
    return Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([hour, count]) => ({ hour, count }));
  }, [completionEvents]);

  // State pie data
  const statePieData = [
    { name: userState, value: 1 },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative grain-overlay">
        <Navigation />

        <main className="pt-24 lg:pt-32 pb-16">
          <section className="container mx-auto px-6 lg:px-12">

            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div>
                <p className="text-[11px] tracking-widest uppercase text-muted-foreground/40 mb-1 font-sans">
                  Internal Observatory
                </p>
                <h1 className="font-serif text-3xl text-foreground mb-2">
                  Ecosystem Health
                </h1>
                <p className="text-muted-foreground/50 text-sm max-w-md">
                  A quiet view of whether Moontuner is genuinely helping —
                  not how much attention it extracts. Local session data only.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border/40"
                onClick={() => setRefresh((n) => n + 1)}
              >
                <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Opt-out notice */}
            {analytics.isOptedOut() && (
              <div className="node-card border-border/30 mb-8 text-sm text-muted-foreground/60">
                Analytics are currently opted out. No events are being collected.
              </div>
            )}

            {/* Top stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <StatCard
                icon={<Activity className="w-3.5 h-3.5" />}
                label="Events (session)"
                value={queue.length}
                sub="Local queue"
              />
              <StatCard
                icon={<Eye className="w-3.5 h-3.5" />}
                label="Pages visited"
                value={behavior.uniquePageCount}
                sub="Unique routes"
              />
              <StatCard
                icon={<BookOpen className="w-3.5 h-3.5" />}
                label="Completions"
                value={behavior.completions}
                sub="Reflective, ritual, directive"
              />
              <StatCard
                icon={<Moon className="w-3.5 h-3.5" />}
                label="Avg dwell"
                value={formatDwell(avgDwell)}
                sub="Per page view"
              />
            </div>

            {/* User state */}
            <div className="node-card border-border/30 mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-accent/70" />
                <h2 className="font-serif text-lg text-foreground">Session State</h2>
              </div>
              <div className="flex items-center gap-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: STATE_COLORS[userState] }}
                />
                <div>
                  <p className="font-serif text-xl text-foreground capitalize">
                    {userState.replace('_', ' ')}
                  </p>
                  <p className="text-muted-foreground/50 text-sm">
                    {userState === 'reflecting' && 'Dwelling in reflection — pacing feels healthy.'}
                    {userState === 'deep_reading' && 'Engaging deeply with content — good sign.'}
                    {userState === 'ritual_tending' && 'Returning to ritual space — intentional use.'}
                    {userState === 'exploring' && 'Moving through sections — good ecosystem curiosity.'}
                    {userState === 'high_energy' && 'High completion rate — active session.'}
                    {userState === 'low_energy' && 'Brief visit — low-effort check-in.'}
                    {userState === 'overwhelmed' && 'Rapid navigation — consider reducing complexity.'}
                    {userState === 'unknown' && 'Not enough data to model state yet.'}
                  </p>
                </div>
                <div className="ml-auto hidden md:block">
                  <PieChart width={60} height={60}>
                    <Pie
                      data={statePieData}
                      cx={25}
                      cy={25}
                      innerRadius={18}
                      outerRadius={28}
                      dataKey="value"
                    >
                      <Cell fill={STATE_COLORS[userState]} />
                    </Pie>
                  </PieChart>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-3 gap-4 text-xs text-muted-foreground/50 font-sans">
                <div>
                  <span className="block text-foreground/60">{behavior.ritualInteractions}</span>
                  Ritual interactions
                </div>
                <div>
                  <span className="block text-foreground/60">{behavior.reflectionInteractions}</span>
                  Reflection interactions
                </div>
                <div>
                  <span className="block text-foreground/60">
                    {Math.round((Date.now() - behavior.sessionStart) / 60_000)}m
                  </span>
                  Session duration
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              {/* Page distribution */}
              <div className="node-card border-border/30">
                <h2 className="font-serif text-base text-foreground mb-1">
                  Page Distribution
                </h2>
                <p className="text-xs text-muted-foreground/40 mb-5 font-sans">
                  All events by page — shows ecosystem navigation patterns
                </p>
                {pageDistribution.length === 0 ? (
                  <p className="text-muted-foreground/40 text-sm">No data yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={pageDistribution}
                      layout="vertical"
                      margin={{ left: 8, right: 8 }}
                    >
                      <XAxis type="number" tick={{ fontSize: 10, fill: CHART_NEUTRAL }} />
                      <YAxis
                        type="category"
                        dataKey="page"
                        width={90}
                        tick={{ fontSize: 10, fill: CHART_NEUTRAL }}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{
                          background: 'var(--background)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="count" fill={CHART_ACCENT} radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Event distribution */}
              <div className="node-card border-border/30">
                <h2 className="font-serif text-base text-foreground mb-1">
                  Event Distribution
                </h2>
                <p className="text-xs text-muted-foreground/40 mb-5 font-sans">
                  Interaction types — shows where users engage intentionally
                </p>
                {eventDistribution.length === 0 ? (
                  <p className="text-muted-foreground/40 text-sm">No data yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={eventDistribution.slice(0, 8)}
                      layout="vertical"
                      margin={{ left: 8, right: 8 }}
                    >
                      <XAxis type="number" tick={{ fontSize: 10, fill: CHART_NEUTRAL }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        tick={{ fontSize: 10, fill: CHART_NEUTRAL }}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{
                          background: 'var(--background)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="value" fill={CHART_NEUTRAL} radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              {/* Onboarding funnel */}
              <div className="node-card border-border/30">
                <h2 className="font-serif text-base text-foreground mb-1">
                  Onboarding Flow
                </h2>
                <p className="text-xs text-muted-foreground/40 mb-5 font-sans">
                  Step completion — identify dropoff points
                </p>
                {onboardingFunnel.every((s) => s.count === 0) ? (
                  <p className="text-muted-foreground/40 text-sm">No onboarding events yet.</p>
                ) : (
                  <div className="space-y-3">
                    {onboardingFunnel.map((step, i) => {
                      const max = Math.max(...onboardingFunnel.map((s) => s.count), 1);
                      const pct = Math.round((step.count / max) * 100);
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs font-sans text-muted-foreground/50 w-24 shrink-0">
                            {step.label}
                          </span>
                          <div className="flex-1 h-1.5 bg-border/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent/60 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-sans text-muted-foreground/50 w-6 text-right">
                            {step.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Completion timeline */}
              <div className="node-card border-border/30">
                <h2 className="font-serif text-base text-foreground mb-1">
                  Reflective Completions
                </h2>
                <p className="text-xs text-muted-foreground/40 mb-5 font-sans">
                  When completions happen — pacing quality indicator
                </p>
                {completionTimeline.length === 0 ? (
                  <p className="text-muted-foreground/40 text-sm">No completions recorded yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={completionTimeline} margin={{ left: 0, right: 8 }}>
                      <XAxis
                        dataKey="hour"
                        tick={{ fontSize: 9, fill: CHART_NEUTRAL }}
                        interval="preserveStartEnd"
                      />
                      <YAxis tick={{ fontSize: 9, fill: CHART_NEUTRAL }} />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{
                          background: 'var(--background)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="count" fill={CHART_ACCENT} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

            </div>

            {/* Raw event log */}
            <div className="node-card border-border/30">
              <h2 className="font-serif text-base text-foreground mb-1">Event Log</h2>
              <p className="text-xs text-muted-foreground/40 mb-5 font-sans">
                Recent session events — local only, never transmitted without consent
              </p>
              {queue.length === 0 ? (
                <p className="text-muted-foreground/40 text-sm">No events recorded yet.</p>
              ) : (
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {[...queue].reverse().slice(0, 50).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 text-xs font-sans py-1.5 border-b border-border/10 last:border-0"
                    >
                      <span className="text-muted-foreground/30 shrink-0 w-20">
                        {new Date(event.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                      <span className="text-accent/80 shrink-0 w-40">
                        {EVENT_LABELS[event.event_name] ?? event.event_name}
                      </span>
                      <span className="text-muted-foreground/50 truncate">
                        {labelPage(event.page)}
                        {event.properties.dwell_ms
                          ? ` · ${formatDwell(event.properties.dwell_ms as number)}`
                          : ''}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AnalyticsDashboard;
