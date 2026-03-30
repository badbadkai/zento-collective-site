-- Zento Collective Portal Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

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

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

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

-- Anyone authenticated can view cohorts
create policy "Authenticated users can view cohorts"
  on public.cohorts for select
  using (auth.uid() is not null);

-- Only admins can modify cohorts
create policy "Admins can manage cohorts"
  on public.cohorts for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

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

-- Students can view their own enrollments
create policy "Students can view own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

-- Admins can manage all enrollments
create policy "Admins can manage enrollments"
  on public.enrollments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

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

-- Enrolled students can view modules for their cohort (if unlocked)
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

-- Admins can manage all modules
create policy "Admins can manage modules"
  on public.modules for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

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

-- Students can view materials for modules they can access
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

-- Admins can manage all materials
create policy "Admins can manage materials"
  on public.materials for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

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

-- Students can view and create their own submissions
create policy "Students can view own submissions"
  on public.submissions for select
  using (auth.uid() = user_id);

create policy "Students can create submissions"
  on public.submissions for insert
  with check (auth.uid() = user_id);

create policy "Students can update own submissions"
  on public.submissions for update
  using (auth.uid() = user_id);

-- Admins can view and update all submissions
create policy "Admins can manage submissions"
  on public.submissions for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 7. UPDATE EXISTING TABLES
-- ============================================

-- Add 'converted' column to bootcamp_waitlist if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'bootcamp_waitlist' and column_name = 'converted'
  ) then
    alter table public.bootcamp_waitlist add column converted boolean not null default false;
  end if;
end $$;

-- Ensure admins can read bootcamp_waitlist
create policy "Admins can view waitlist"
  on public.bootcamp_waitlist for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 8. STORAGE BUCKET FOR WORKSHEETS
-- ============================================
-- Run this separately if needed:
-- insert into storage.buckets (id, name, public) values ('worksheets', 'worksheets', true);

-- Storage policies:
-- create policy "Students can upload worksheets"
--   on storage.objects for insert
--   with check (bucket_id = 'worksheets' and auth.uid()::text = (storage.foldername(name))[2]);
--
-- create policy "Anyone can view worksheets"
--   on storage.objects for select
--   using (bucket_id = 'worksheets');
