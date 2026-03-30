-- Add notification preferences to profiles
-- Run this in Supabase SQL Editor

alter table public.profiles add column if not exists notification_preferences jsonb default '{"feedback_received": true, "module_unlocked": true, "announcements": true}'::jsonb;
