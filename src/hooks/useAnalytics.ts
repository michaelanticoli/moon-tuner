import { useAnalyticsContext } from '@/contexts/AnalyticsContext';
import { AnalyticsEventName, UserState } from '@/lib/analytics';

interface UseAnalyticsReturn {
  /** Fire a named analytics event with optional properties. */
  track: (
    event: AnalyticsEventName,
    properties?: Record<string, string | number | boolean | null>,
  ) => void;
  /** Current inferred behavioural state for this session. */
  userState: UserState;
  /** Whether the user has opted out of analytics. */
  isOptedOut: boolean;
  /** Opt the user out — clears the queue and stops future tracking. */
  optOut: () => void;
  /** Re-enable analytics after an opt-out. */
  optIn: () => void;
}

/**
 * Per-component analytics hook.
 *
 * Usage:
 *   const { track } = useAnalytics();
 *   track('directive_view', { directive_id: id, lunar_phase: phase });
 */
export function useAnalytics(): UseAnalyticsReturn {
  return useAnalyticsContext();
}
