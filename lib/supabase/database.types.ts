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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_events: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          new_state_summary: Json | null
          previous_state_summary: Json | null
          reason: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          new_state_summary?: Json | null
          previous_state_summary?: Json | null
          reason?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          new_state_summary?: Json | null
          previous_state_summary?: Json | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_categories: {
        Row: {
          active: boolean
          classification_code: string
          created_at: string
          display_order: number
          id: string
          parent_id: string | null
          title: Json
          updated_at: string
        }
        Insert: {
          active?: boolean
          classification_code: string
          created_at?: string
          display_order?: number
          id?: string
          parent_id?: string | null
          title?: Json
          updated_at?: string
        }
        Update: {
          active?: boolean
          classification_code?: string
          created_at?: string
          display_order?: number
          id?: string
          parent_id?: string | null
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "book_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      book_requests: {
        Row: {
          aggregate_request_count: number
          alternative_acceptable: boolean
          author: string | null
          category_id: string | null
          created_at: string
          created_by: string | null
          education_level: string | null
          exact_title_required: boolean
          id: string
          isbn: string | null
          language: string
          priority: string
          reason: string | null
          requested_copies: number
          requested_topic: string | null
          status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          aggregate_request_count?: number
          alternative_acceptable?: boolean
          author?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          education_level?: string | null
          exact_title_required?: boolean
          id?: string
          isbn?: string | null
          language: string
          priority?: string
          reason?: string | null
          requested_copies?: number
          requested_topic?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          aggregate_request_count?: number
          alternative_acceptable?: boolean
          author?: string | null
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          education_level?: string | null
          exact_title_required?: boolean
          id?: string
          isbn?: string | null
          language?: string
          priority?: string
          reason?: string | null
          requested_copies?: number
          requested_topic?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_requests_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "book_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_requests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string | null
          category_id: string | null
          circulation_type: string
          classification_code: string | null
          condition: string
          copy_count: number
          created_at: string
          created_by: string | null
          edition: string | null
          id: string
          isbn: string | null
          language: string
          location: string | null
          public_visible: boolean
          publication_year: number | null
          publisher: string | null
          review_status: string
          subtitle: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author?: string | null
          category_id?: string | null
          circulation_type?: string
          classification_code?: string | null
          condition?: string
          copy_count?: number
          created_at?: string
          created_by?: string | null
          edition?: string | null
          id?: string
          isbn?: string | null
          language: string
          location?: string | null
          public_visible?: boolean
          publication_year?: number | null
          publisher?: string | null
          review_status?: string
          subtitle?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author?: string | null
          category_id?: string | null
          circulation_type?: string
          classification_code?: string | null
          condition?: string
          copy_count?: number
          created_at?: string
          created_by?: string | null
          edition?: string | null
          id?: string
          isbn?: string | null
          language?: string
          location?: string | null
          public_visible?: boolean
          publication_year?: number | null
          publisher?: string | null
          review_status?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "books_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "book_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          assigned_to: string | null
          country: string | null
          deleted_at: string | null
          email: string
          id: string
          message: string
          name: string
          organisation: string | null
          received_at: string
          related_need_id: string | null
          related_project_id: string | null
          retention_until: string
          status: string
          subject: string
        }
        Insert: {
          assigned_to?: string | null
          country?: string | null
          deleted_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          organisation?: string | null
          received_at?: string
          related_need_id?: string | null
          related_project_id?: string | null
          retention_until?: string
          status?: string
          subject: string
        }
        Update: {
          assigned_to?: string | null
          country?: string | null
          deleted_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          organisation?: string | null
          received_at?: string
          related_need_id?: string | null
          related_project_id?: string | null
          retention_until?: string
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_related_need_id_fkey"
            columns: ["related_need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_messages_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_evidence: {
        Row: {
          created_at: string
          donation_id: string
          evidence_type: string
          id: string
          media_id: string
          note: string | null
          public_visible: boolean
        }
        Insert: {
          created_at?: string
          donation_id: string
          evidence_type: string
          id?: string
          media_id: string
          note?: string | null
          public_visible?: boolean
        }
        Update: {
          created_at?: string
          donation_id?: string
          evidence_type?: string
          id?: string
          media_id?: string
          note?: string | null
          public_visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "donation_evidence_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_evidence_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          need_id: string | null
          pledge_id: string | null
          project_id: string | null
          public_summary: Json
          received_at: string
          received_quantity: number
          status: string
          supporter_id: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
          verified_quantity: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          need_id?: string | null
          pledge_id?: string | null
          project_id?: string | null
          public_summary?: Json
          received_at?: string
          received_quantity: number
          status?: string
          supporter_id: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          verified_quantity?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          need_id?: string | null
          pledge_id?: string | null
          project_id?: string | null
          public_summary?: Json
          received_at?: string
          received_quantity?: number
          status?: string
          supporter_id?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          verified_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "donations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_pledge_id_fkey"
            columns: ["pledge_id"]
            isOneToOne: false
            referencedRelation: "pledges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_supporter_id_fkey"
            columns: ["supporter_id"]
            isOneToOne: false
            referencedRelation: "supporters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      library_profile: {
        Row: {
          address: Json
          created_at: string
          description: Json
          id: string
          last_verified_at: string | null
          official_name_en: string | null
          official_name_si: string | null
          official_name_ta: string | null
          opening_hours: Json
          postal_code: string | null
          public_email: string | null
          public_phone: string | null
          public_visible: boolean
          updated_at: string
          website_status: string
        }
        Insert: {
          address?: Json
          created_at?: string
          description?: Json
          id?: string
          last_verified_at?: string | null
          official_name_en?: string | null
          official_name_si?: string | null
          official_name_ta?: string | null
          opening_hours?: Json
          postal_code?: string | null
          public_email?: string | null
          public_phone?: string | null
          public_visible?: boolean
          updated_at?: string
          website_status?: string
        }
        Update: {
          address?: Json
          created_at?: string
          description?: Json
          id?: string
          last_verified_at?: string | null
          official_name_en?: string | null
          official_name_si?: string | null
          official_name_ta?: string | null
          opening_hours?: Json
          postal_code?: string | null
          public_email?: string | null
          public_phone?: string | null
          public_visible?: boolean
          updated_at?: string
          website_status?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: Json
          caption: Json
          copyright_owner: string | null
          created_at: string
          file_type: string
          id: string
          permission_status: string
          public_visible: boolean
          storage_path: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: Json
          caption?: Json
          copyright_owner?: string | null
          created_at?: string
          file_type: string
          id?: string
          permission_status?: string
          public_visible?: boolean
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: Json
          caption?: Json
          copyright_owner?: string | null
          created_at?: string
          file_type?: string
          id?: string
          permission_status?: string
          public_visible?: boolean
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      need_categories: {
        Row: {
          active: boolean
          created_at: string
          description: Json
          display_order: number
          id: string
          key: string
          title: Json
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: Json
          display_order?: number
          id?: string
          key: string
          title?: Json
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: Json
          display_order?: number
          id?: string
          key?: string
          title?: Json
          updated_at?: string
        }
        Relationships: []
      }
      need_specifications: {
        Row: {
          created_at: string
          id: string
          key: string
          need_id: string
          public_visible: boolean
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          need_id: string
          public_visible?: boolean
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          need_id?: string
          public_visible?: boolean
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "need_specifications_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      needs: {
        Row: {
          category_id: string
          created_at: string
          created_by: string | null
          description: Json
          estimated_currency: string | null
          estimated_unit_cost: number | null
          id: string
          last_verified_at: string | null
          priority: string
          project_id: string | null
          public_notes: Json
          published_at: string | null
          purpose: Json
          slug: string
          status: string
          target_quantity: number
          title: Json
          unit: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category_id: string
          created_at?: string
          created_by?: string | null
          description?: Json
          estimated_currency?: string | null
          estimated_unit_cost?: number | null
          id?: string
          last_verified_at?: string | null
          priority?: string
          project_id?: string | null
          public_notes?: Json
          published_at?: string | null
          purpose?: Json
          slug: string
          status?: string
          target_quantity: number
          title?: Json
          unit: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string
          created_by?: string | null
          description?: Json
          estimated_currency?: string | null
          estimated_unit_cost?: number | null
          id?: string
          last_verified_at?: string | null
          priority?: string
          project_id?: string | null
          public_notes?: Json
          published_at?: string | null
          purpose?: Json
          slug?: string
          status?: string
          target_quantity?: number
          title?: Json
          unit?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "needs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "need_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "needs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "needs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "needs_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          author_id: string | null
          body: Json
          created_at: string
          excerpt: Json
          id: string
          published_at: string | null
          slug: string
          status: string
          title: Json
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json
          created_at?: string
          excerpt?: Json
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title?: Json
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          created_at?: string
          excerpt?: Json
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          author_id: string | null
          body: Json
          created_at: string
          id: string
          published_at: string | null
          slug: string
          status: string
          title: Json
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title?: Json
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string
          description: string
          id: string
          key: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          key: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          key?: string
        }
        Relationships: []
      }
      pledges: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string | null
          description: string
          expected_date: string | null
          expires_at: string | null
          id: string
          internal_notes: string | null
          need_id: string | null
          project_id: string | null
          quantity: number
          status: string
          supporter_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          expected_date?: string | null
          expires_at?: string | null
          id?: string
          internal_notes?: string | null
          need_id?: string | null
          project_id?: string | null
          quantity: number
          status?: string
          supporter_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          expected_date?: string | null
          expires_at?: string | null
          id?: string
          internal_notes?: string | null
          need_id?: string | null
          project_id?: string | null
          quantity?: number
          status?: string
          supporter_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pledges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pledges_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pledges_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pledges_supporter_id_fkey"
            columns: ["supporter_id"]
            isOneToOne: false
            referencedRelation: "supporters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pledges_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string
          created_at: string
          display_name: string
          id: string
          locale: string
          role_id: string | null
          updated_at: string
        }
        Insert: {
          account_status?: string
          created_at?: string
          display_name: string
          id: string
          locale?: string
          role_id?: string | null
          updated_at?: string
        }
        Update: {
          account_status?: string
          created_at?: string
          display_name?: string
          id?: string
          locale?: string
          role_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          completed_at: string | null
          created_at: string
          display_order: number
          id: string
          project_id: string
          status: string
          target_date: string | null
          title: Json
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          display_order?: number
          id?: string
          project_id: string
          status?: string
          target_date?: string | null
          title?: Json
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          display_order?: number
          id?: string
          project_id?: string
          status?: string
          target_date?: string | null
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          author_id: string | null
          body: Json
          created_at: string
          id: string
          project_id: string
          published_at: string | null
          status: string
          title: Json
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json
          created_at?: string
          id?: string
          project_id: string
          published_at?: string | null
          status?: string
          title?: Json
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          created_at?: string
          id?: string
          project_id?: string
          published_at?: string | null
          status?: string
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          beneficiary_summary: Json
          completed_at: string | null
          created_at: string
          created_by: string | null
          id: string
          last_verified_at: string | null
          objective: Json
          problem: Json
          published_at: string | null
          slug: string
          start_date: string | null
          status: string
          summary: Json
          target_end_date: string | null
          title: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          beneficiary_summary?: Json
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          last_verified_at?: string | null
          objective?: Json
          problem?: Json
          published_at?: string | null
          slug: string
          start_date?: string | null
          status?: string
          summary?: Json
          target_end_date?: string | null
          title?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          beneficiary_summary?: Json
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          last_verified_at?: string | null
          objective?: Json
          problem?: Json
          published_at?: string | null
          slug?: string
          start_date?: string | null
          status?: string
          summary?: Json
          target_end_date?: string | null
          title?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          name?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          created_by: string | null
          description: Json
          display_order: number
          id: string
          published_at: string | null
          slug: string
          status: string
          title: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: Json
          display_order?: number
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: Json
          display_order?: number
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      supporters: {
        Row: {
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          created_by: string | null
          id: string
          internal_name: string
          internal_notes: string | null
          public_logo_media_id: string | null
          public_name: string | null
          public_visibility: boolean
          public_website: string | null
          recognition_consent: boolean
          supporter_type: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          internal_name: string
          internal_notes?: string | null
          public_logo_media_id?: string | null
          public_name?: string | null
          public_visibility?: boolean
          public_website?: string | null
          recognition_consent?: boolean
          supporter_type: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          internal_name?: string
          internal_notes?: string | null
          public_logo_media_id?: string | null
          public_name?: string | null
          public_visibility?: boolean
          public_website?: string | null
          recognition_consent?: boolean
          supporter_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supporters_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supporters_public_logo_media_id_fkey"
            columns: ["public_logo_media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_needs: {
        Args: never
        Returns: {
          category_title: Json
          id: string
          last_verified_at: string
          pledged_quantity: number
          priority: string
          purpose: Json
          remaining_quantity: number
          slug: string
          status: string
          target_quantity: number
          title: Json
          unit: string
          verified_received_quantity: number
        }[]
      }
      has_permission: {
        Args: { requested_permission: string }
        Returns: boolean
      }
      is_active_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
