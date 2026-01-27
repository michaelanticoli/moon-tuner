import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        };
        Update: {
          display_name?: string | null;
          birth_date?: string | null;
          birth_time?: string | null;
          birth_location?: string | null;
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
    };
  };
};
