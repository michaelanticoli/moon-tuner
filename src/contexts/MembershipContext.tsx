/**
 * MembershipContext
 *
 * Provides the current user's subscription / entitlement state to the entire
 * app via React context. Wraps the `useSubscription` hook so components don't
 * each need to independently fetch from Supabase.
 */
import { createContext, useContext, ReactNode } from 'react';
import { useSubscription, type UseSubscriptionReturn } from '@/hooks/useSubscription';

const MembershipContext = createContext<UseSubscriptionReturn | undefined>(undefined);

export function MembershipProvider({ children }: { children: ReactNode }) {
  const subscription = useSubscription();
  return (
    <MembershipContext.Provider value={subscription}>
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership(): UseSubscriptionReturn {
  const ctx = useContext(MembershipContext);
  if (!ctx) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return ctx;
}
