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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string
          category: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          body: string
          category?: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          event_date: string
          id: string
          location: string | null
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          location?: string | null
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          sort_order: number
          storage_path: string
          taken_on: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          storage_path: string
          taken_on?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number
          storage_path?: string
          taken_on?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          content: string
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          alumni_id: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          father_name: string | null
          full_name: string
          graduation_year: number | null
          higher_education: string | null
          id: string
          linkedin_url: string | null
          marital_status: string | null
          matric_stream: string | null
          phone: string | null
          profession: string | null
          roll_number: string | null
          status: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          alumni_id?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          father_name?: string | null
          full_name: string
          graduation_year?: number | null
          higher_education?: string | null
          id?: string
          linkedin_url?: string | null
          marital_status?: string | null
          matric_stream?: string | null
          phone?: string | null
          profession?: string | null
          roll_number?: string | null
          status?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          alumni_id?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          father_name?: string | null
          full_name?: string
          graduation_year?: number | null
          higher_education?: string | null
          id?: string
          linkedin_url?: string | null
          marital_status?: string | null
          matric_stream?: string | null
          phone?: string | null
          profession?: string | null
          roll_number?: string | null
          status?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          alumni_name: string
          badge: string | null
          batch_year: number | null
          category: string
          congrats_notes: string[]
          created_at: string
          degree: string | null
          gallery_paths: string[]
          id: string
          institute: string | null
          poster_path: string | null
          poster_url: string | null
          published: boolean
          snippet: string | null
          sort_order: number
          story: string | null
          updated_at: string
        }
        Insert: {
          alumni_name: string
          badge?: string | null
          batch_year?: number | null
          category?: string
          congrats_notes?: string[]
          created_at?: string
          degree?: string | null
          gallery_paths?: string[]
          id?: string
          institute?: string | null
          poster_path?: string | null
          poster_url?: string | null
          published?: boolean
          snippet?: string | null
          sort_order?: number
          story?: string | null
          updated_at?: string
        }
        Update: {
          alumni_name?: string
          badge?: string | null
          batch_year?: number | null
          category?: string
          congrats_notes?: string[]
          created_at?: string
          degree?: string | null
          gallery_paths?: string[]
          id?: string
          institute?: string | null
          poster_path?: string | null
          poster_url?: string | null
          published?: boolean
          snippet?: string | null
          sort_order?: number
          story?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "alumni"
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
      app_role: ["admin", "alumni"],
    },
  },
} as const
