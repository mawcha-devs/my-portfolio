export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: 'admin' | 'editor';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: 'admin' | 'editor';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: 'admin' | 'editor';
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          sort_order: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description?: string | null;
          sort_order?: number;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          sort_order?: number;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          description: string;
          status:
            | 'draft'
            | 'in_progress'
            | 'completed'
            | 'planned';
          published: boolean;
          featured: boolean;
          repository_url: string | null;
          live_url: string | null;
          contribution_type:
            | 'individual'
            | 'team'
            | 'mixed'
            | 'group';
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          description: string;
          status?:
            | 'draft'
            | 'in_progress'
            | 'completed'
            | 'planned';
          published?: boolean;
          featured?: boolean;
          repository_url?: string | null;
          live_url?: string | null;
          contribution_type?:
            | 'individual'
            | 'team'
            | 'mixed'
            | 'group';
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string | null;
          description?: string;
          status?:
            | 'draft'
            | 'in_progress'
            | 'completed'
            | 'planned';
          published?: boolean;
          featured?: boolean;
          repository_url?: string | null;
          live_url?: string | null;
          contribution_type?:
            | 'individual'
            | 'team'
            | 'mixed'
            | 'group';
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_technologies: {
        Row: {
          id: string;
          project_id: string;
          skill_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          skill_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          skill_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_features: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_screenshots: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          alt_text: string | null;
          caption: string | null;
          is_cover: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          alt_text?: string | null;
          caption?: string | null;
          is_cover?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          alt_text?: string | null;
          caption?: string | null;
          is_cover?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          company_name: string;
          role: string;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          description: string;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          role: string;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          description: string;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          role?: string;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          description?: string;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      education: {
        Row: {
          id: string;
          institution_name: string;
          program_name: string;
          degree: string | null;
          location: string | null;
          graduation_date: string | null;
          cgpa: string | null;
          description: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution_name: string;
          program_name: string;
          degree?: string | null;
          location?: string | null;
          graduation_date?: string | null;
          cgpa?: string | null;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institution_name?: string;
          program_name?: string;
          degree?: string | null;
          location?: string | null;
          graduation_date?: string | null;
          cgpa?: string | null;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          credential_type: string;
          description: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          credential_type?: string;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string;
          credential_type?: string;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          organization: string;
          category: string;
          period: string | null;
          description: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          organization: string;
          category: string;
          period?: string | null;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          organization?: string;
          category?: string;
          period?: string | null;
          description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author_name: string;
          author_role: string | null;
          organization: string | null;
          avatar_url: string | null;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author_name: string;
          author_role?: string | null;
          organization?: string | null;
          avatar_url?: string | null;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author_name?: string;
          author_role?: string | null;
          organization?: string | null;
          avatar_url?: string | null;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          tags: string[];
          published: boolean;
          published_at: string | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          tags?: string[];
          published?: boolean;
          published_at?: string | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          tags?: string[];
          published?: boolean;
          published_at?: string | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      [_ in string]: never;
    };
    Enums: {
      [_ in string]: never;
    };
  };
};

export type ProjectStatus =
  Database['public']['Tables']['projects']['Row']['status'];
export type ProjectContributionType =
  Database['public']['Tables']['projects']['Row']['contribution_type'];
export type ContactMessageRow =
  Database['public']['Tables']['contact_messages']['Row'];
