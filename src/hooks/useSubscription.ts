/**
 * useSubscription
 *
 * Fetches and exposes the current user's subscription state.
 * Provides helpers for initiating checkout, managing billing, and checking
 * entitlements without re-fetching the server on every call.
 */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { MembershipTier, SubscriptionRow } from '@/lib/supabase';
import { hasAccess } from '@/lib/supabase';
import { openStripeCheckout, type StripeProductKey } from '@/lib/stripeLinks';
import { toast } from 'sonner';

const MEMBERSHIP_LINK_KEY: Record<Exclude<MembershipTier, 'free'>, StripeProductKey> = {
  reflective: 'membership-reflective',
  insight: 'membership-insight',
  practitioner: 'membership-practitioner',
};

export interface UseSubscriptionReturn {
  subscription: SubscriptionRow | null;
  tier: MembershipTier;
  isActive: boolean;
  loading: boolean;
  /** True while a checkout or portal redirect is in flight */
  redirecting: boolean;
  /** Check if the user can access a given tier's features */
  can: (requiredTier: MembershipTier) => boolean;
  /** Start the subscription checkout flow for a tier upgrade */
  startCheckout: (tier: Exclude<MembershipTier, 'free'>) => Promise<void>;
  /** Open the Stripe Customer Portal for billing management */
  openBillingPortal: (returnPath?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const fetchSubscription = useCallback(async () => {
    if (!user || user.is_anonymous) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows (free user who hasn't been seeded yet)
      console.error('Error fetching subscription:', error);
    }

    setSubscription((data as SubscriptionRow) ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchSubscription();
  }, [fetchSubscription]);

  const tier: MembershipTier = (() => {
    if (!subscription) return 'free';
    const isActive =
      subscription.status === 'active' || subscription.status === 'trialing';
    if (!isActive) return 'free';
    // Prefer the explicit tier field (available after the membership migration).
    // Fall back gracefully for the legacy schema that only has subscription_type.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawTier = (subscription as any).tier as MembershipTier | undefined;
    const validTiers: MembershipTier[] = ['free', 'reflective', 'insight', 'practitioner'];
    if (rawTier && validTiers.includes(rawTier)) return rawTier;
    return 'reflective'; // legacy active subscriptions get minimum paid tier
  })();

  const isActive =
    subscription?.status === 'active' || subscription?.status === 'trialing';

  const can = useCallback(
    (requiredTier: MembershipTier) => hasAccess(tier, requiredTier),
    [tier]
  );

  const startCheckout = useCallback(
    async (checkoutTier: Exclude<MembershipTier, 'free'>) => {
      if (!user) return;
      setRedirecting(true);
      try {
        const { data, error } = await supabase.functions.invoke(
          'create-subscription-checkout',
          { body: { tier: checkoutTier, userId: user.id } }
        );
        if (error) throw error;
        if (data?.url) window.location.href = data.url;
      } catch (err) {
        console.error('Checkout error:', err);
        toast.error('Membership checkout is temporarily unavailable. Please email hello@moontuner.xyz.');
        setRedirecting(false);
      }
    },
    [user]
  );

  const openBillingPortal = useCallback(
    async (returnPath?: string) => {
      if (!user) return;
      setRedirecting(true);
      try {
        const { data, error } = await supabase.functions.invoke('customer-portal', {
          body: { userId: user.id, returnPath },
        });
        if (error) throw error;
        if (data?.url) window.location.href = data.url;
      } catch (err) {
        console.error('Portal error:', err);
        toast.error('Billing portal is temporarily unavailable. Please email hello@moontuner.xyz.');
        setRedirecting(false);
      }
    },
    [user]
  );

  return {
    subscription,
    tier,
    isActive,
    loading,
    redirecting,
    can,
    startCheckout,
    openBillingPortal,
    refetch: fetchSubscription,
  };
}
