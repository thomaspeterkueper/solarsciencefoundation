-- SSF participation applications
-- Membership/support/authorship applications are requests, not role grants.

create table if not exists public.participation_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  application_type text not null check (application_type in ('member', 'supporting_member', 'author')),
  motivation text not null check (char_length(trim(motivation)) between 20 and 4000),
  expertise text,
  contribution_interest text,
  status text not null default 'submitted' check (status in ('submitted', 'screening', 'review', 'revision_requested', 'approved', 'rejected', 'withdrawn')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  decided_at timestamptz,
  decision_note text,
  constraint one_active_participation_application unique (user_id, application_type, status)
);

alter table public.participation_applications enable row level security;

create policy "participation_applications_select_own" on public.participation_applications
  for select using (auth.uid() = user_id);

create policy "participation_applications_insert_own" on public.participation_applications
  for insert with check (auth.uid() = user_id and status = 'submitted');

create policy "participation_applications_withdraw_own" on public.participation_applications
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id and status = 'withdrawn');

comment on table public.participation_applications is
  'Applications for SSF participation roles. Approval does not itself grant a role; role assignment remains a separate controlled action.';

comment on column public.participation_applications.application_type is
  'member maps to community membership, supporting_member to financial/organizational support, author to reviewed didactic authorship.';
