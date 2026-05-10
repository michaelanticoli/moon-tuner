import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';

const HAS_VISITED_KEY = 'mt_has_visited';

/**
 * Tracks page views and dwell time automatically as the route changes.
 * Place this hook inside a component that is rendered inside both the
 * Router and the AnalyticsProvider.
 *
 * Each route change emits a `page_view` event that includes:
 * - `page`     — the pathname
 * - `dwell_ms` — milliseconds spent on the previous page
 * - `referrer` — the previous pathname (within the SPA)
 */
export function usePageTracking(): void {
  const location = useLocation();
  const { track, isOptedOut } = useAnalyticsContext();
  const enteredAtRef = useRef<number>(Date.now());
  const prevPathRef = useRef<string>('');

  useEffect(() => {
    if (isOptedOut) return;

    const now = Date.now();
    const dwell_ms = now - enteredAtRef.current;
    const prev = prevPathRef.current;
    const current = location.pathname;

    // Emit dwell for the page we are leaving (skip the very first render)
    if (prev && prev !== current) {
      track('page_view', {
        dwell_ms,
        referrer: prev,
        is_return: false,
      });
    }

    // Ecosystem entry — detect return visits via a persistent has-visited flag
    if (!prev) {
      let hasVisited = false;
      try {
        hasVisited = Boolean(localStorage.getItem(HAS_VISITED_KEY));
        localStorage.setItem(HAS_VISITED_KEY, '1');
      } catch {
        /* localStorage may be unavailable */
      }
      track(hasVisited ? 'return_visit' : 'ecosystem_entry', {
        entry_page: current,
      });
    }

    enteredAtRef.current = now;
    prevPathRef.current = current;
  }, [location.pathname, track, isOptedOut]);
}
