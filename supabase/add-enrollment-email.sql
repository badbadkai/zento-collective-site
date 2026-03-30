-- Add email-based enrollment for whitelist registration
-- Run this in Supabase SQL Editor

-- 1. Add email column to enrollments
alter table public.enrollments add column if not exists email text;

-- 2. Make user_id nullable (student may not have an account yet)
alter table public.enrollments alter column user_id drop not null;

-- 3. Drop the old unique constraint and add a new one that includes email
alter table public.enrollments drop constraint if exists enrollments_user_id_cohort_id_key;

-- 4. Add unique constraint on email + cohort (prevents duplicate enrollment by email)
-- Using a partial index since email could be null for legacy rows
create unique index if not exists enrollments_email_cohort_unique
  on public.enrollments (email, cohort_id)
  where email is not null;

-- 5. Allow the check-whitelist API to read enrollments by email
-- This policy allows unauthenticated reads but ONLY the email column
-- Actually, the API uses service_role key which bypasses RLS, so no policy needed.
