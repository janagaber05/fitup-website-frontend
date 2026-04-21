-- FITUP manual upload script for Supabase SQL Editor
-- Paste the full file into SQL Editor and click Run.
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT where possible).

create extension if not exists pgcrypto;

-- =============================================================================
-- 1) Shared trigger function
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- =============================================================================
-- 2) public.profiles (1 row per auth user)
-- =============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone text,
  locale text default 'en',
  app_role text not null default 'member'
    check (app_role in ('member', 'staff', 'coach', 'owner', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, locale)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'locale', 'en')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- =============================================================================
-- 3) public.form_submissions (contact/partner/join-us/home)
-- =============================================================================
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null
    check (page_slug in ('contact', 'partner', 'join-us', 'home')),
  name text not null,
  email text not null,
  message text,
  gym_name text,
  company_name text,
  phone text,
  meta jsonb not null default '{}'::jsonb,
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists idx_form_submissions_page_slug
  on public.form_submissions (page_slug);
create index if not exists idx_form_submissions_created_at_desc
  on public.form_submissions (created_at desc);
create index if not exists idx_form_submissions_email
  on public.form_submissions (email);

alter table public.form_submissions enable row level security;

drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
on public.form_submissions for insert
to anon, authenticated
with check (true);

drop policy if exists "form_submissions_select_none_anon" on public.form_submissions;
create policy "form_submissions_select_none_anon"
on public.form_submissions for select
to anon
using (false);

drop policy if exists "form_submissions_select_authenticated" on public.form_submissions;
create policy "form_submissions_select_authenticated"
on public.form_submissions for select
to authenticated
using (true);

grant insert on public.form_submissions to anon, authenticated;
grant select on public.form_submissions to authenticated;

insert into public.form_submissions
  (page_slug, name, email, message, company_name, gym_name, phone, meta, status)
values
  ('contact', 'Sara Ali', 'sara@example.com', 'I want to know your gym pricing.', null, null, null, '{}'::jsonb, 'new'),
  ('partner', 'Omar Khaled', 'omar@fitco.com', 'Interested in partnership details.', 'FitCo', null, '+966500000111', '{"city":"Riyadh"}'::jsonb, 'new'),
  ('join-us', 'Lina Noor', 'lina@gmail.com', 'I want to join as a coach.', null, 'Power Gym', '+966500000222', '{"experience_years":3}'::jsonb, 'new')
on conflict do nothing;

-- =============================================================================
-- 4) public.gyms (directory listings)
-- =============================================================================
create table if not exists public.gyms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text,
  country text,
  timezone text default 'Asia/Riyadh',
  description text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_gyms_updated_at on public.gyms;
create trigger set_gyms_updated_at
before update on public.gyms
for each row
execute function public.set_updated_at();

alter table public.gyms enable row level security;

drop policy if exists "gyms_select_active_public" on public.gyms;
create policy "gyms_select_active_public"
on public.gyms for select
to anon, authenticated
using (status = 'active');

drop policy if exists "gyms_mutation_authenticated" on public.gyms;
create policy "gyms_mutation_authenticated"
on public.gyms for all
to authenticated
using (true)
with check (true);

grant select on public.gyms to anon, authenticated;
grant insert, update, delete on public.gyms to authenticated;

insert into public.gyms
  (name, slug, city, country, timezone, description, status)
values
  ('Iron House Gym', 'iron-house-gym', 'Riyadh', 'Saudi Arabia', 'Asia/Riyadh', 'Strength and conditioning gym.', 'active'),
  ('Pulse Fitness', 'pulse-fitness', 'Jeddah', 'Saudi Arabia', 'Asia/Riyadh', 'General fitness and classes.', 'active'),
  ('Elite Barbell Club', 'elite-barbell-club', 'Dammam', 'Saudi Arabia', 'Asia/Riyadh', 'Powerlifting focused facility.', 'pending'),
  ('Her Move Studio', 'her-move-studio', 'Khobar', 'Saudi Arabia', 'Asia/Riyadh', 'Women-focused fitness studio.', 'active')
on conflict (slug) do nothing;

-- =============================================================================
-- 5) Quick verification
-- =============================================================================
-- select table_name from information_schema.tables where table_schema = 'public';
-- select page_slug, count(*) from public.form_submissions group by page_slug order by page_slug;
-- select name, city, status from public.gyms order by name;
