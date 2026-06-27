-- KUEPER - Solar Science Foundation (SSF)
-- Path: supabase/migrations/20260627110000_initial_ssf_schema.sql
-- Name: initial SSF database schema
-- Version: 0.1.0
-- Created: 2026-06-27
-- Modified: 2026-06-27 11:00 CEST

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_roles (
  id text primary key,
  label text not null,
  public_label text not null,
  description text not null,
  scopes text[] not null default '{}',
  can_grant_game_power boolean not null default false
);

create table if not exists public.member_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id text not null references public.membership_roles(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table if not exists public.supporter_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  supporter_type text not null check (supporter_type in ('supporting_member', 'donor', 'patron')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  public_credit boolean not null default false
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id text not null,
  completed_at timestamptz not null default now(),
  score numeric not null check (score >= 0 and score <= 1),
  source text not null default 'ssf',
  unique (user_id, module_id)
);

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  module_id text not null,
  exercise_id text not null,
  selected_option integer not null,
  correct boolean not null,
  attempted_at timestamptz not null default now()
);

create table if not exists public.unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  unlock_id text not null,
  source_module text not null,
  target_system text not null,
  status text not null default 'granted' check (status in ('granted', 'revoked')),
  granted_at timestamptz not null default now(),
  unique (user_id, unlock_id)
);

create table if not exists public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  required_modules text[] not null default '{}',
  disclaimer text not null
);

create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create table if not exists public.project_access_audit (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  target_system text not null,
  access_payload jsonb not null,
  checked_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.member_roles enable row level security;
alter table public.supporter_records enable row level security;
alter table public.learning_progress enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.unlocks enable row level security;
alter table public.user_achievements enable row level security;
alter table public.project_access_audit enable row level security;

alter table public.membership_roles enable row level security;
alter table public.achievements enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "roles_read_public" on public.membership_roles
  for select using (true);

create policy "member_roles_select_own" on public.member_roles
  for select using (auth.uid() = user_id);

create policy "supporter_records_select_own" on public.supporter_records
  for select using (auth.uid() = user_id);

create policy "learning_progress_select_own" on public.learning_progress
  for select using (auth.uid() = user_id);
create policy "learning_progress_insert_own" on public.learning_progress
  for insert with check (auth.uid() = user_id);
create policy "learning_progress_update_own" on public.learning_progress
  for update using (auth.uid() = user_id);

create policy "exercise_attempts_select_own" on public.exercise_attempts
  for select using (auth.uid() = user_id);
create policy "exercise_attempts_insert_own" on public.exercise_attempts
  for insert with check (auth.uid() = user_id);

create policy "unlocks_select_own" on public.unlocks
  for select using (auth.uid() = user_id);
create policy "unlocks_insert_own" on public.unlocks
  for insert with check (auth.uid() = user_id);

create policy "achievements_read_public" on public.achievements
  for select using (true);

create policy "user_achievements_select_own" on public.user_achievements
  for select using (auth.uid() = user_id);
create policy "user_achievements_insert_own" on public.user_achievements
  for insert with check (auth.uid() = user_id);

insert into public.membership_roles (id, label, public_label, description, scopes, can_grant_game_power)
values
  ('ROLE:SSF:guest', 'Guest', 'Guest', 'Can read public learning content without an account.', array['read_public_content'], false),
  ('ROLE:SSF:free-member', 'Free Member', 'Free member', 'Can store progress and earn learning-based unlocks.', array['read_public_content','store_learning_progress','earn_learning_unlocks'], false),
  ('ROLE:SSF:supporting-member', 'Supporting Member', 'Supporting member', 'Supports SSF financially and may receive recognition or community access.', array['read_public_content','store_learning_progress','earn_learning_unlocks','support_project'], false),
  ('ROLE:SSF:donor', 'Donor', 'Donor', 'Supports the project through donations. Does not buy NOXIA power.', array['support_project'], false),
  ('ROLE:SSF:contributor', 'Contributor', 'Contributor', 'Can submit modules, exercises, corrections or translations for review.', array['read_public_content','store_learning_progress','earn_learning_unlocks','submit_content'], false),
  ('ROLE:SSF:co-author', 'Co-Author', 'Co-author', 'Creates and maintains curated learning material with attribution.', array['read_public_content','store_learning_progress','earn_learning_unlocks','submit_content','review_content'], false),
  ('ROLE:SSF:curator', 'Curator', 'Curator', 'Reviews, maps and prepares learning content for publication.', array['read_public_content','submit_content','review_content','publish_content'], false),
  ('ROLE:SSF:admin', 'Admin', 'Admin', 'Can manage memberships, publication state and system settings.', array['read_public_content','submit_content','review_content','publish_content','manage_membership'], false)
on conflict (id) do update set
  label = excluded.label,
  public_label = excluded.public_label,
  description = excluded.description,
  scopes = excluded.scopes,
  can_grant_game_power = excluded.can_grant_game_power;

insert into public.achievements (id, title, description, required_modules, disclaimer)
values
  ('ACH:SSF:mathematics-foundations-1', 'Mathematics Foundations I', 'Complete the first arithmetic path: numbers, addition, multiplication, fractions and percentages.', array['SSF-MAT-0001','SSF-MAT-0002','SSF-MAT-0003','SSF-MAT-0004','SSF-MAT-0005'], 'Learning achievement within the SSF project - not a formal or accredited qualification.'),
  ('ACH:SSF:orbital-entry-1', 'Orbital Entry I', 'Complete the first gravity module and unlock the initial orbital-navigation bridge for partner projects.', array['SSF-PHY-1101'], 'Learning achievement within the SSF project - not a formal or accredited qualification.')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  required_modules = excluded.required_modules,
  disclaimer = excluded.disclaimer;
