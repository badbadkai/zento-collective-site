-- Zento Collective Portal Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
--
-- IMPORTANT: If you already ran the previous schema, run the migration
-- at the bottom of this file (Section 9) to fix existing policies.

-- ============================================
-- 0. ADMIN CHECK FUNCTION (breaks RLS recursion)
-- ============================================
-- This function uses SECURITY DEFINER to bypass RLS when checking
-- if a user is an admin. Without this, any RLS policy that checks
-- "is this user an admin?" on the profiles table would recurse infinitely.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text not null default 'student' check (role in ('admin', 'student')),
  discord text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (but not their role)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup
create policy "Allow insert for own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Admins can view all profiles (uses function to avoid recursion)
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- ============================================
-- 2. COHORTS
-- ============================================
create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  max_seats int not null default 15,
  status text not null default 'upcoming' check (status in ('upcoming', 'active', 'completed')),
  created_at timestamptz not null default now()
);

alter table public.cohorts enable row level security;

create policy "Authenticated users can view cohorts"
  on public.cohorts for select
  using (auth.uid() is not null);

create policy "Admins can insert cohorts"
  on public.cohorts for insert
  with check (public.is_admin());

create policy "Admins can update cohorts"
  on public.cohorts for update
  using (public.is_admin());

create policy "Admins can delete cohorts"
  on public.cohorts for delete
  using (public.is_admin());

-- ============================================
-- 3. ENROLLMENTS
-- ============================================
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  unique (user_id, cohort_id)
);

alter table public.enrollments enable row level security;

create policy "Students can view own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Admins can view all enrollments"
  on public.enrollments for select
  using (public.is_admin());

create policy "Admins can insert enrollments"
  on public.enrollments for insert
  with check (public.is_admin());

create policy "Admins can update enrollments"
  on public.enrollments for update
  using (public.is_admin());

create policy "Admins can delete enrollments"
  on public.enrollments for delete
  using (public.is_admin());

-- ============================================
-- 4. MODULES
-- ============================================
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  day_number int not null,
  title text not null,
  description text,
  unlock_date date not null,
  is_rest_day boolean not null default false,
  created_at timestamptz not null default now(),
  unique (cohort_id, day_number)
);

alter table public.modules enable row level security;

-- Students see unlocked modules for their cohort
create policy "Students can view unlocked modules"
  on public.modules for select
  using (
    exists (
      select 1 from public.enrollments
      where enrollments.user_id = auth.uid()
        and enrollments.cohort_id = modules.cohort_id
        and enrollments.payment_status = 'paid'
    )
    and unlock_date <= current_date
  );

-- Admins see all modules
create policy "Admins can view all modules"
  on public.modules for select
  using (public.is_admin());

create policy "Admins can insert modules"
  on public.modules for insert
  with check (public.is_admin());

create policy "Admins can update modules"
  on public.modules for update
  using (public.is_admin());

create policy "Admins can delete modules"
  on public.modules for delete
  using (public.is_admin());

-- ============================================
-- 5. MATERIALS
-- ============================================
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  type text not null check (type in ('video', 'slides', 'handout', 'worksheet_template')),
  title text not null,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.materials enable row level security;

create policy "Students can view materials"
  on public.materials for select
  using (
    exists (
      select 1 from public.modules m
      join public.enrollments e on e.cohort_id = m.cohort_id
      where m.id = materials.module_id
        and e.user_id = auth.uid()
        and e.payment_status = 'paid'
        and m.unlock_date <= current_date
    )
  );

create policy "Admins can view all materials"
  on public.materials for select
  using (public.is_admin());

create policy "Admins can insert materials"
  on public.materials for insert
  with check (public.is_admin());

create policy "Admins can update materials"
  on public.materials for update
  using (public.is_admin());

create policy "Admins can delete materials"
  on public.materials for delete
  using (public.is_admin());

-- ============================================
-- 6. SUBMISSIONS
-- ============================================
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  file_url text not null,
  submitted_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  feedback text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz
);

alter table public.submissions enable row level security;

create policy "Students can view own submissions"
  on public.submissions for select
  using (auth.uid() = user_id);

create policy "Students can create submissions"
  on public.submissions for insert
  with check (auth.uid() = user_id);

create policy "Students can update own submissions"
  on public.submissions for update
  using (auth.uid() = user_id);

create policy "Admins can view all submissions"
  on public.submissions for select
  using (public.is_admin());

create policy "Admins can update submissions"
  on public.submissions for update
  using (public.is_admin());

-- ============================================
-- 7. UPDATE EXISTING TABLES
-- ============================================
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'bootcamp_waitlist' and column_name = 'converted'
  ) then
    alter table public.bootcamp_waitlist add column converted boolean not null default false;
  end if;
end $$;

-- Drop old policy if exists, then create with is_admin()
drop policy if exists "Admins can view waitlist" on public.bootcamp_waitlist;
create policy "Admins can view waitlist"
  on public.bootcamp_waitlist for select
  using (public.is_admin());

-- ============================================
-- 8. STORAGE BUCKET FOR WORKSHEETS
-- ============================================
-- Create bucket manually in Supabase Dashboard → Storage → New Bucket
-- Name: worksheets, Public: Yes
-- Then run these storage policies:
--
-- create policy "Students can upload worksheets"
--   on storage.objects for insert
--   with check (bucket_id = 'worksheets' and auth.uid() is not null);
--
-- create policy "Anyone authenticated can view worksheets"
--   on storage.objects for select
--   using (bucket_id = 'worksheets' and auth.uid() is not null);

-- ============================================
-- 9. MIGRATION: Fix existing policies
-- ============================================
-- If you already ran the old schema, run this section to replace
-- the broken self-referencing policies with is_admin() versions.

-- Drop old broken policies (ignore errors if they don't exist)
drop policy if exists "Admins can manage cohorts" on public.cohorts;
drop policy if exists "Admins can manage enrollments" on public.enrollments;
drop policy if exists "Admins can manage modules" on public.modules;
drop policy if exists "Admins can manage materials" on public.materials;
drop policy if exists "Admins can manage submissions" on public.submissions;

-- The new individual policies (insert/update/delete) are created above.
-- If tables already exist, the CREATE TABLE IF NOT EXISTS will skip,
-- but the policies will be created fresh.
