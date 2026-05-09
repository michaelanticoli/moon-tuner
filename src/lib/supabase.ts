import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackAnonKey = 'placeholder-anon-key';

if (!hasSupabaseConfig) {
  console.warn(
    'Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY).'
  );
}

export const supabase = createClient(
  hasSupabaseConfig ? supabaseUrl! : fallbackUrl,
  hasSupabaseConfig ? supabaseAnonKey! : fallbackAnonKey
);

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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          audio_enabled?: boolean;
          volume?: number;
          theme?: string;
          notifications_enabled?: boolean;
        };
        Update: {
          audio_enabled?: boolean;
          volume?: number;
          theme?: string;
          notifications_enabled?: boolean;
          updated_at?: string;
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
    };
  };
};
