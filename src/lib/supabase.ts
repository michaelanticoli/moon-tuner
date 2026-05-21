// Single source of truth for the Supabase client.
// Re-exports the canonical client from src/integrations/supabase/client.ts
// to prevent multiple GoTrueClient instances racing on the same auth-token
// storage key (which silently drops sessions and forces users to re-sign-in).
//
// We cast to the local `Database` type below to preserve typings for legacy
// callers that reference tables not in the auto-generated schema (those calls
// already failed at runtime; the cast just keeps the build green).
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as canonicalClient } from '@/integrations/supabase/client';

// Local Database type is declared further down in this file.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = canonicalClient as unknown as SupabaseClient<any>;



export type MemoryEntityType =
  | 'directive'
  | 'reflection'
  | 'proposal'
  | 'report'
  | 'ritual'
  | 'workbook'
  | 'chart'
  | 'harmonic_profile'
  | 'spacetime';

export type TimelineEventType =
  | 'directive_view'
  | 'reflection_write'
  | 'proposal_submit'
  | 'report_purchase'
  | 'ritual'
  | 'workbook_progress'
  | 'chart_saved';

export type DataVisibility = {
  timeline: 'private' | 'public';
  reflections: 'private' | 'public';
  rituals: 'private' | 'public';
};

// ─── Membership / Payments ────────────────────────────────────────────────────

export type MembershipTier = 'free' | 'reflective' | 'insight' | 'practitioner';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'paused'
  | 'past_due'
  | 'canceled'
  | 'incomplete';

export type SubscriptionRow = {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  paused_at: string | null;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PurchaseRow = {
  id: string;
  user_id: string | null;
  product_type: 'report' | 'digital_good' | 'workbook' | 'ambient_pack' | 'bundle';
  product_id: string;
  product_label: string | null;
  amount_cents: number;
  currency: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  metadata: Record<string, unknown>;
  fulfilled_at: string | null;
  created_at: string;
};

export type DigitalProductRow = {
  id: string;
  label: string;
  description: string | null;
  product_type: 'workbook' | 'ambient_pack' | 'report_bundle' | 'seasonal' | 'reflection_collection';
  amount_cents: number;
  stripe_product_id: string | null;
  download_url: string | null;
  preview_url: string | null;
  cover_image_url: string | null;
  is_active: boolean;
  is_limited: boolean;
  available_until: string | null;
  min_tier: MembershipTier;
  metadata: Record<string, unknown>;
  sort_order: number;
  created_at: string;
};

export type GiftRow = {
  id: string;
  sender_user_id: string | null;
  recipient_email: string;
  recipient_user_id: string | null;
  gift_type: 'membership_1month' | 'membership_3month' | 'membership_6month' | 'report' | 'digital_good';
  product_id: string | null;
  tier: MembershipTier | null;
  message: string | null;
  stripe_session_id: string | null;
  status: 'pending' | 'paid' | 'claimed' | 'expired';
  claim_code: string | null;
  claimed_at: string | null;
  expires_at: string | null;
  created_at: string;
};

// Tier hierarchy — higher index = more access
export const TIER_RANK: Record<MembershipTier, number> = {
  free: 0,
  reflective: 1,
  insight: 2,
  practitioner: 3,
};

/** Returns true if the user's tier meets or exceeds the required tier */
export function hasAccess(userTier: MembershipTier, requiredTier: MembershipTier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier];
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          birth_date: string | null;
          birth_time: string | null;
          birth_location: string | null;
          private_mode: boolean;
          data_visibility: DataVisibility;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          birth_date?: string | null;
          birth_time?: string | null;
          birth_location?: string | null;
          private_mode?: boolean;
          data_visibility?: DataVisibility;
        };
        Update: {
          display_name?: string | null;
          birth_date?: string | null;
          birth_time?: string | null;
          birth_location?: string | null;
          private_mode?: boolean;
          data_visibility?: DataVisibility;
          updated_at?: string;
        };
      };
      saved_charts: {
        Row: {
          id: string;
          user_id: string;
          chart_name: string;
          chart_data: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          user_id: string;
          chart_name: string;
          chart_data: Record<string, unknown>;
        };
        Update: {
          chart_name?: string;
          chart_data?: Record<string, unknown>;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          audio_enabled: boolean;
          volume: number;
          theme: string;
          notifications_enabled: boolean;
          ai_synthesis_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          audio_enabled?: boolean;
          volume?: number;
          theme?: string;
          notifications_enabled?: boolean;
          ai_synthesis_enabled?: boolean;
        };
        Update: {
          audio_enabled?: boolean;
          volume?: number;
          theme?: string;
          notifications_enabled?: boolean;
          ai_synthesis_enabled?: boolean;
          updated_at?: string;
        };
      };
      ai_synthesis_cache: {
        Row: {
          id: string;
          user_id: string;
          synthesis_type: string;
          result: Record<string, unknown>;
          generated_at: string;
        };
        Insert: {
          user_id: string;
          synthesis_type: string;
          result: Record<string, unknown>;
          generated_at?: string;
        };
        Update: {
          result?: Record<string, unknown>;
          generated_at?: string;
        };
      };
      user_memories: {
        Row: {
          id: string;
          user_id: string;
          entity_type: MemoryEntityType;
          entity_id: string | null;
          title: string | null;
          emotional_theme: string | null;
          lunar_phase: string | null;
          lunar_phase_pct: number | null;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          user_id: string;
          entity_type: MemoryEntityType;
          entity_id?: string | null;
          title?: string | null;
          emotional_theme?: string | null;
          lunar_phase?: string | null;
          lunar_phase_pct?: number | null;
          metadata?: Record<string, unknown>;
        };
        Update: {
          emotional_theme?: string | null;
          metadata?: Record<string, unknown>;
        };
      };
      timeline_events: {
        Row: {
          id: string;
          user_id: string;
          event_type: TimelineEventType;
          title: string;
          description: string | null;
          emotional_theme: string | null;
          lunar_phase: string | null;
          lunar_phase_pct: number | null;
          metadata: Record<string, unknown>;
          occurred_at: string;
        };
        Insert: {
          user_id: string;
          event_type: TimelineEventType;
          title: string;
          description?: string | null;
          emotional_theme?: string | null;
          lunar_phase?: string | null;
          lunar_phase_pct?: number | null;
          metadata?: Record<string, unknown>;
          occurred_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          metadata?: Record<string, unknown>;
        };
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: {
          user_id: string;
          tier?: MembershipTier;
          status?: SubscriptionStatus;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
        };
        Update: Partial<Omit<SubscriptionRow, 'id' | 'user_id' | 'created_at'>>;
      };
      purchases: {
        Row: PurchaseRow;
        Insert: {
          user_id?: string | null;
          product_type: PurchaseRow['product_type'];
          product_id: string;
          product_label?: string | null;
          amount_cents: number;
          currency?: string;
          stripe_session_id?: string | null;
          status?: PurchaseRow['status'];
          metadata?: Record<string, unknown>;
        };
        Update: Partial<Omit<PurchaseRow, 'id' | 'created_at'>>;
      };
      digital_products: {
        Row: DigitalProductRow;
        Insert: Omit<DigitalProductRow, 'created_at'>;
        Update: Partial<Omit<DigitalProductRow, 'id' | 'created_at'>>;
      };
      gifts: {
        Row: GiftRow;
        Insert: {
          sender_user_id?: string | null;
          recipient_email: string;
          gift_type: GiftRow['gift_type'];
          tier?: MembershipTier | null;
          product_id?: string | null;
          message?: string | null;
          status?: GiftRow['status'];
          expires_at?: string | null;
        };
        Update: Partial<Omit<GiftRow, 'id' | 'created_at'>>;
      };
    };
  };
};
