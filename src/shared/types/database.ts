export type UserRole = "admin" | "student";
export type CohortStatus = "upcoming" | "active" | "completed";
export type PaymentStatus = "pending" | "paid" | "refunded";

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
  phone: string | null;
  bio: string | null;
  timezone: string | null;
  trading_style: string | null;
  notification_preferences: NotificationPreferences | null;
  created_at: string;
  updated_at: string | null;
}

export interface NotificationPreferences {
  feedback_received: boolean;
  module_unlocked: boolean;
  announcements: boolean;
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
  user_id: string | null;
  email: string | null;
  cohort_id: string;
  enrolled_at: string;
  payment_status: PaymentStatus;
}

export interface WaitlistEntry {
  id: string;
  full_name: string;
  email: string;
  discord: string;
  programme_interest: string | null;
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

export interface MainWaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  social_handle: string | null;
  peak_performance: string | null;
  trading_approach: string | null;
  trading_duration: string | null;
  tracking_method: string | null;
  review_frequency: string | null;
  main_limit: string | null;
  improvement_area: string | null;
  decision_style: string | null;
  learning_style: string | null;
  tracking_value: string | null;
  upgrade_intent: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}
