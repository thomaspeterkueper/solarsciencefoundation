-- SSF author contribution workflow
-- Didactic contributions live in SSF. Canonical scientific changes must be requested in KG.

create table if not exists public.author_contributions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 3 and 180),
  summary text not null check (char_length(trim(summary)) between 20 and 1200),
  body_markdown text not null default '',
  subject_code text,
  target_module_id text,
  source_notes text,
  canonical_change_required boolean not null default false,
  kg_request_ref text,
  status text not null default 'draft' check (status in ('draft','submitted','scientific_review','revision_requested','editorial_review','approved','published','archived','rejected')),
  reviewer_note text,
  editor_note text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  approved_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.author_contribution_events (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references public.author_contributions(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  from_status text,
  to_status text,
  note text,
  created_at timestamptz not null default now()
);

alter table public.author_contributions enable row level security;
alter table public.author_contribution_events enable row level security;

create or replace function public.ssf_has_role(p_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.member_roles mr
    where mr.user_id = auth.uid() and mr.role_id = p_role
  );
$$;

revoke all on function public.ssf_has_role(text) from public;
grant execute on function public.ssf_has_role(text) to authenticated;

create policy "author_contributions_select_own" on public.author_contributions
  for select using (
    author_id = auth.uid()
    or public.ssf_has_role('ROLE:SSF:curator')
    or public.ssf_has_role('ROLE:SSF:admin')
  );

create policy "author_contributions_insert_author" on public.author_contributions
  for insert with check (
    author_id = auth.uid()
    and (
      public.ssf_has_role('ROLE:SSF:contributor')
      or public.ssf_has_role('ROLE:SSF:co-author')
      or public.ssf_has_role('ROLE:SSF:curator')
      or public.ssf_has_role('ROLE:SSF:admin')
    )
    and status = 'draft'
  );

-- Direct table updates are intentionally narrow. Workflow transitions use RPC functions below.
create policy "author_contributions_update_editable_own" on public.author_contributions
  for update using (
    author_id = auth.uid() and status in ('draft','revision_requested')
  )
  with check (
    author_id = auth.uid() and status in ('draft','revision_requested')
  );

create policy "author_contribution_events_select_related" on public.author_contribution_events
  for select using (
    exists (
      select 1 from public.author_contributions c
      where c.id = contribution_id
        and (
          c.author_id = auth.uid()
          or public.ssf_has_role('ROLE:SSF:curator')
          or public.ssf_has_role('ROLE:SSF:admin')
        )
    )
  );

create or replace function public.ssf_submit_author_contribution(p_contribution_id uuid)
returns public.author_contributions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.author_contributions;
begin
  select * into v_row from public.author_contributions
  where id = p_contribution_id and author_id = auth.uid()
  for update;

  if not found then raise exception 'Contribution not found' using errcode = 'P0002'; end if;
  if v_row.status not in ('draft','revision_requested') then
    raise exception 'Contribution cannot be submitted from current status' using errcode = '22023';
  end if;
  if char_length(trim(v_row.body_markdown)) < 80 then
    raise exception 'Contribution body is too short for review' using errcode = '22023';
  end if;
  if v_row.canonical_change_required and nullif(trim(coalesce(v_row.kg_request_ref,'')), '') is null then
    raise exception 'Canonical changes require a KG external-task reference before submission' using errcode = '22023';
  end if;

  update public.author_contributions
  set status = 'submitted', submitted_at = now(), updated_at = now()
  where id = p_contribution_id
  returning * into v_row;

  insert into public.author_contribution_events(contribution_id, actor_id, event_type, from_status, to_status)
  values (v_row.id, auth.uid(), 'submit', null, 'submitted');
  return v_row;
end;
$$;

revoke all on function public.ssf_submit_author_contribution(uuid) from public;
grant execute on function public.ssf_submit_author_contribution(uuid) to authenticated;

create or replace function public.ssf_editorial_transition_author_contribution(
  p_contribution_id uuid,
  p_status text,
  p_note text default null
)
returns public.author_contributions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.author_contributions;
  v_from text;
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;

  if p_status not in ('scientific_review','revision_requested','editorial_review','approved','published','rejected','archived') then
    raise exception 'Unsupported editorial status' using errcode = '22023';
  end if;
  if p_status = 'revision_requested' and nullif(trim(coalesce(p_note,'')), '') is null then
    raise exception 'Revision requests require a note' using errcode = '22023';
  end if;

  select * into v_row from public.author_contributions where id = p_contribution_id for update;
  if not found then raise exception 'Contribution not found' using errcode = 'P0002'; end if;
  v_from := v_row.status;

  if v_from in ('archived','rejected') then
    raise exception 'Contribution is closed' using errcode = '22023';
  end if;
  if p_status = 'published' and v_from <> 'approved' then
    raise exception 'Only approved contributions can be published' using errcode = '22023';
  end if;

  update public.author_contributions
  set
    status = p_status,
    reviewer_note = case when p_status in ('scientific_review','revision_requested') then nullif(trim(coalesce(p_note,'')), '') else reviewer_note end,
    editor_note = case when p_status in ('editorial_review','approved','published','rejected','archived') then nullif(trim(coalesce(p_note,'')), '') else editor_note end,
    reviewed_at = case when p_status in ('scientific_review','revision_requested','editorial_review') then now() else reviewed_at end,
    approved_at = case when p_status = 'approved' then now() else approved_at end,
    published_at = case when p_status = 'published' then now() else published_at end,
    updated_at = now()
  where id = p_contribution_id
  returning * into v_row;

  insert into public.author_contribution_events(contribution_id, actor_id, event_type, from_status, to_status, note)
  values (v_row.id, auth.uid(), 'editorial_transition', v_from, p_status, nullif(trim(coalesce(p_note,'')), ''));
  return v_row;
end;
$$;

revoke all on function public.ssf_editorial_transition_author_contribution(uuid, text, text) from public;
grant execute on function public.ssf_editorial_transition_author_contribution(uuid, text, text) to authenticated;

comment on table public.author_contributions is
  'SSF-owned didactic author contributions. Canonical scientific changes remain KG-owned and require a KG external-task reference.';
