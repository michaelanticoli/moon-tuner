export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      digital_products: {
        Row: {
          amount_cents: number
          available_until: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          download_url: string | null
          id: string
          is_active: boolean
          is_limited: boolean
          label: string
          metadata: Json
          min_tier: string
          preview_url: string | null
          product_type: string
          sort_order: number
          stripe_product_id: string | null
        }
        Insert: {
          amount_cents: number
          available_until?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          id: string
          is_active?: boolean
          is_limited?: boolean
          label: string
          metadata?: Json
          min_tier?: string
          preview_url?: string | null
          product_type: string
          sort_order?: number
          stripe_product_id?: string | null
        }
        Update: {
          amount_cents?: number
          available_until?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          download_url?: string | null
          id?: string
          is_active?: boolean
          is_limited?: boolean
          label?: string
          metadata?: Json
          min_tier?: string
          preview_url?: string | null
          product_type?: string
          sort_order?: number
          stripe_product_id?: string | null
        }
        Relationships: []
      }
      gifts: {
        Row: {
          claim_code: string | null
          claimed_at: string | null
          created_at: string
          expires_at: string | null
          gift_type: string
          id: string
          message: string | null
          product_id: string | null
          recipient_email: string
          recipient_user_id: string | null
          sender_user_id: string | null
          status: string
          stripe_session_id: string | null
          tier: string | null
        }
        Insert: {
          claim_code?: string | null
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          gift_type: string
          id?: string
          message?: string | null
          product_id?: string | null
          recipient_email: string
          recipient_user_id?: string | null
          sender_user_id?: string | null
          status?: string
          stripe_session_id?: string | null
          tier?: string | null
        }
        Update: {
          claim_code?: string | null
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          gift_type?: string
          id?: string
          message?: string | null
          product_id?: string | null
          recipient_email?: string
          recipient_user_id?: string | null
          sender_user_id?: string | null
          status?: string
          stripe_session_id?: string | null
          tier?: string | null
        }
        Relationships: []
      }
      lunar_datapoints: {
        Row: {
          cardinal_values: string | null
          category: string
          created_at: string
          datapoint: string
          id: string
          relevance: number | null
          source_url: string | null
          tags: string[] | null
        }
        Insert: {
          cardinal_values?: string | null
          category?: string
          created_at?: string
          datapoint: string
          id?: string
          relevance?: number | null
          source_url?: string | null
          tags?: string[] | null
        }
        Update: {
          cardinal_values?: string | null
          category?: string
          created_at?: string
          datapoint?: string
          id?: string
          relevance?: number | null
          source_url?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
      natal_reports: {
        Row: {
          ascendant: string | null
          audio_status: string
          audio_url: string | null
          birth_date: string
          birth_location: string | null
          birth_time: string | null
          chart_data: Json | null
          chart_image_url: string | null
          chart_status: string
          created_at: string
          eleven_labs_prompt: string | null
          email: string
          id: string
          moon_sign: string | null
          name: string | null
          pdf_status: string
          pdf_url: string | null
          sun_sign: string | null
          updated_at: string
        }
        Insert: {
          ascendant?: string | null
          audio_status?: string
          audio_url?: string | null
          birth_date: string
          birth_location?: string | null
          birth_time?: string | null
          chart_data?: Json | null
          chart_image_url?: string | null
          chart_status?: string
          created_at?: string
          eleven_labs_prompt?: string | null
          email: string
          id?: string
          moon_sign?: string | null
          name?: string | null
          pdf_status?: string
          pdf_url?: string | null
          sun_sign?: string | null
          updated_at?: string
        }
        Update: {
          ascendant?: string | null
          audio_status?: string
          audio_url?: string | null
          birth_date?: string
          birth_location?: string | null
          birth_time?: string | null
          chart_data?: Json | null
          chart_image_url?: string | null
          chart_status?: string
          created_at?: string
          eleven_labs_prompt?: string | null
          email?: string
          id?: string
          moon_sign?: string | null
          name?: string | null
          pdf_status?: string
          pdf_url?: string | null
          sun_sign?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          convertkit_subscriber_id: string | null
          email: string
          id: string
          source: string | null
          subscribed_at: string
        }
        Insert: {
          convertkit_subscriber_id?: string | null
          email: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          convertkit_subscriber_id?: string | null
          email?: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          convertkit_subscriber_id: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          convertkit_subscriber_id?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          convertkit_subscriber_id?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          fulfilled_at: string | null
          id: string
          metadata: Json
          product_id: string
          product_label: string | null
          product_type: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          fulfilled_at?: string | null
          id?: string
          metadata?: Json
          product_id: string
          product_label?: string | null
          product_type: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          fulfilled_at?: string | null
          id?: string
          metadata?: Json
          product_id?: string
          product_label?: string | null
          product_type?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      report_narrations: {
        Row: {
          audio_url: string | null
          created_at: string
          email: string | null
          error: string | null
          id: string
          report_label: string | null
          report_type: string
          source_text: string | null
          status: string
          stripe_session_id: string | null
          updated_at: string
          voice_id: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          email?: string | null
          error?: string | null
          id?: string
          report_label?: string | null
          report_type: string
          source_text?: string | null
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          voice_id?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          email?: string | null
          error?: string | null
          id?: string
          report_label?: string | null
          report_type?: string
          source_text?: string | null
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          voice_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          paused_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_type: Database["public"]["Enums"]["subscription_type"]
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          paused_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type: Database["public"]["Enums"]["subscription_type"]
          tier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          paused_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_type?: Database["public"]["Enums"]["subscription_type"]
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      telegram_users: {
        Row: {
          auth_date: number
          created_at: string
          first_name: string
          id: string
          last_name: string | null
          photo_url: string | null
          telegram_id: number
          updated_at: string
          username: string | null
        }
        Insert: {
          auth_date: number
          created_at?: string
          first_name: string
          id?: string
          last_name?: string | null
          photo_url?: string | null
          telegram_id: number
          updated_at?: string
          username?: string | null
        }
        Update: {
          auth_date?: number
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string | null
          photo_url?: string | null
          telegram_id?: number
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_id_by_email: {
        Args: { email_input: string }
        Returns: {
          id: string
        }[]
      }
    }
    Enums: {
      subscription_status:
        | "active"
        | "canceled"
        | "past_due"
        | "trialing"
        | "inactive"
        | "paused"
        | "incomplete"
      subscription_type: "one_time" | "monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_status: [
        "active",
        "canceled",
        "past_due",
        "trialing",
        "inactive",
        "paused",
        "incomplete",
      ],
      subscription_type: ["one_time", "monthly"],
    },
  },
} as const
