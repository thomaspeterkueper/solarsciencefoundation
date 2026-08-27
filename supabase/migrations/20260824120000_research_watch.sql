-- KUEPER - Solar Science Foundation (SSF)
-- Path: supabase/migrations/20260824120000_research_watch.sql
-- Name: SSF Research Watch v0.1 persistence
-- Version: 0.1.0
-- Created: 2026-08-24
-- Modified: 2026-08-24 12:00 CEST
--
-- Evidence/discovery records and bounded TaskCandidates for the watch-and-triage
-- pipeline (docs/RESEARCH-WATCH.md). Service-role only: RLS is enabled and no
-- policies are created, so anon/authenticated roles cannot read or write.

create table if not exists public.research_watch_evidences (
  evidence_id text primary key,
  identity_keys text[] not null default '{}',
  title text not null,
  published_at timestamptz,
  identifiers jsonb not null default '{}'::jsonb,
  source_refs jsonb not null default '[]'::jsonb,
  topics text[] not null default '{}',
  claims jsonb not null default '[]'::jsonb,
  evidence_type text not null,
  publication_status text not null default 'unknown',
  review_status text not null default 'unreviewed',
  relevance numeric not null default 0 check (relevance >= 0 and relevance <= 1),
  impact_class text not null check (impact_class in ('NEW','CONFIRMS','REVISES','CONTRADICTS','DEPRECATES','NO_IMPACT','UNCERTAIN')),
  affected_claims text[] not null default '{}',
  affected_topics text[] not null default '{}',
  classification text not null default 'deterministic' check (classification in ('deterministic','semantic_required')),
  confidence numeric not null default 0 check (confidence >= 0 and confidence <= 1),
  cost_policy text not null default 'prefer_off_peak' check (cost_policy in ('immediate','prefer_off_peak','off_peak_only')),
  triage_note text,
  discovered_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists research_watch_evidences_identity_keys_idx
  on public.research_watch_evidences using gin (identity_keys);
create index if not exists research_watch_evidences_impact_idx
  on public.research_watch_evidences (impact_class);

create table if not exists public.research_watch_candidates (
  candidate_id text primary key,
  task_type text not null check (task_type in ('RESEARCH_DISCOVERY','CANON_VALIDATION')),
  evidence_id text not null references public.research_watch_evidences(evidence_id) on delete cascade,
  fingerprint text not null,
  status text not null default 'pending' check (status in ('pending','dispatched','done','rejected')),
  cost_policy text not null default 'prefer_off_peak' check (cost_policy in ('immediate','prefer_off_peak','off_peak_only')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  dispatched_at timestamptz
);

create unique index if not exists research_watch_candidates_open_fingerprint_idx
  on public.research_watch_candidates (fingerprint)
  where status in ('pending','dispatched');

create table if not exists public.research_watch_run_state (
  source_id text primary key,
  last_run_at timestamptz not null,
  last_result jsonb not null default '{}'::jsonb
);

alter table public.research_watch_evidences enable row level security;
alter table public.research_watch_candidates enable row level security;
alter table public.research_watch_run_state enable row level security;
