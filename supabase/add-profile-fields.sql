-- Add new profile fields for account settings
-- Run this in Supabase SQL Editor

alter table public.profiles add column if not exists timezone text default 'Europe/London';
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists trading_style text;
alter table public.profiles add column if not exists updated_at timestamptz default now();
