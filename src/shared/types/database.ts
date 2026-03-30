export type UserRole = "admin" | "student";
export type CohortStatus = "upcoming" | "active" | "completed";
export type PaymentStatus = "pending" | "paid" | "refunded";
export type SubmissionStatus = "pending" | "reviewed";
export type MaterialType = "video" | "slides" | "handout" | "worksheet_template";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
      cohorts: {
        Row: Cohort;
        Insert: Omit<Cohort, "id" | "created_at">;
        Update: Partial<Omit<Cohort, "id">>;
      };
      enrollments: {
        Row: Enrollment;
        Insert: Omit<Enrollment, "id" | "enrolled_at">;
        Update: Partial<Omit<Enrollment, "id">>;
      };
      modules: {
        Row: Module;
        Insert: Omit<Module, "id" | "created_at">;
        Update: Partial<Omit<Module, "id">>;
      };
      materials: {
        Row: Material;
        Insert: Omit<Material, "id" | "created_at">;
        Update: Partial<Omit<Material, "id">>;
      };
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, "id" | "submitted_at">;
        Update: Partial<Omit<Submission, "id">>;
      };
      bootcamp_waitlist: {
        Row: WaitlistEntry;
        Insert: Omit<WaitlistEntry, "id" | "created_at">;
        Update: Partial<Omit<WaitlistEntry, "id">>;
      };
      newsletter_signups: {
        Row: NewsletterSignup;
        Insert: Omit<NewsletterSignup, "id" | "created_at">;
        Update: Partial<Omit<NewsletterSignup, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  discord: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Cohort {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  max_seats: number;
  status: CohortStatus;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  cohort_id: string;
  enrolled_at: string;
  payment_status: PaymentStatus;
}

export interface Module {
  id: string;
  cohort_id: string;
  day_number: number;
  title: string;
  description: string | null;
  unlock_date: string;
  is_rest_day: boolean;
  created_at: string;
}

export interface Material {
  id: string;
  module_id: string;
  type: MaterialType;
  title: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  module_id: string;
  file_url: string;
  submitted_at: string;
  status: SubmissionStatus;
  feedback: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

export interface WaitlistEntry {
  id: string;
  full_name: string;
  email: string;
  discord: string;
  trading_experience: string | null;
  prop_firm_history: string | null;
  biggest_challenge: string;
  created_at: string;
  converted: boolean;
}

export interface NewsletterSignup {
  id: string;
  email: string;
  created_at: string;
}
