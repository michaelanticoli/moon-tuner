import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  getAnalytics,
  track as engineTrack,
  AnalyticsEventName,
  UserState,
} from '@/lib/analytics';

interface AnalyticsContextType {
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

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const analytics = getAnalytics();
  const [isOptedOut, setIsOptedOut] = useState(() => analytics.isOptedOut());
  const [userState, setUserState] = useState<UserState>(() => analytics.getUserState());

  // Flush on unmount
  useEffect(() => {
    return () => analytics.flush();
  }, [analytics]);

  const track = useCallback(
    (
      event: AnalyticsEventName,
      properties: Record<string, string | number | boolean | null> = {},
    ) => {
      engineTrack(event, properties);
      setUserState(analytics.getUserState());
    },
    [analytics],
  );

  const optOut = useCallback(() => {
    analytics.optOut();
    setIsOptedOut(true);
  }, [analytics]);

  const optIn = useCallback(() => {
    analytics.optIn();
    setIsOptedOut(false);
  }, [analytics]);

  return (
    <AnalyticsContext.Provider value={{ track, userState, isOptedOut, optOut, optIn }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext(): AnalyticsContextType {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return ctx;
}
