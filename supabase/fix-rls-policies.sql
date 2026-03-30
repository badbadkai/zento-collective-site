-- ============================================
-- FIX: RLS Policy Recursion
-- ============================================
-- Run this in Supabase SQL Editor to fix the infinite loading issue.
-- The old policies checked "is this user admin?" by querying the
-- profiles table FROM WITHIN a profiles table policy, causing
-- infinite recursion. This fix uses a SECURITY DEFINER function
-- that bypasses RLS for the admin check.
-- ============================================

-- Step 1: Create the admin check function
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

-- Step 2: Drop ALL old broken policies
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can manage cohorts" on public.cohorts;
drop policy if exists "Admins can manage enrollments" on public.enrollments;
drop policy if exists "Admins can manage modules" on public.modules;
drop policy if exists "Admins can manage materials" on public.materials;
drop policy if exists "Admins can manage submissions" on public.submissions;
drop policy if exists "Admins can view waitlist" on public.bootcamp_waitlist;

-- Also drop any individual policies that might conflict
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can view all enrollments" on public.enrollments;
drop policy if exists "Admins can insert enrollments" on public.enrollments;
drop policy if exists "Admins can update enrollments" on public.enrollments;
drop policy if exists "Admins can delete enrollments" on public.enrollments;
drop policy if exists "Admins can view all modules" on public.modules;
drop policy if exists "Admins can insert modules" on public.modules;
drop policy if exists "Admins can update modules" on public.modules;
drop policy if exists "Admins can delete modules" on public.modules;
drop policy if exists "Admins can view all materials" on public.materials;
drop policy if exists "Admins can insert materials" on public.materials;
drop policy if exists "Admins can update materials" on public.materials;
drop policy if exists "Admins can delete materials" on public.materials;
drop policy if exists "Admins can view all submissions" on public.submissions;
drop policy if exists "Admins can update submissions" on public.submissions;
drop policy if exists "Admins can insert cohorts" on public.cohorts;
drop policy if exists "Admins can update cohorts" on public.cohorts;
drop policy if exists "Admins can delete cohorts" on public.cohorts;

-- Step 3: Recreate all admin policies using is_admin()

-- PROFILES
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- COHORTS
create policy "Admins can insert cohorts"
  on public.cohorts for insert
  with check (public.is_admin());

create policy "Admins can update cohorts"
  on public.cohorts for update
  using (public.is_admin());

create policy "Admins can delete cohorts"
  on public.cohorts for delete
  using (public.is_admin());

-- ENROLLMENTS
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

-- MODULES
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

-- MATERIALS
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

-- SUBMISSIONS
create policy "Admins can view all submissions"
  on public.submissions for select
  using (public.is_admin());

create policy "Admins can update submissions"
  on public.submissions for update
  using (public.is_admin());

-- WAITLIST
create policy "Admins can view waitlist"
  on public.bootcamp_waitlist for select
  using (public.is_admin());

-- ============================================
-- Done. The admin portal should now load.
-- ============================================
