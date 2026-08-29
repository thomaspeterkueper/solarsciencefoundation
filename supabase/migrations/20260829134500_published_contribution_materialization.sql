-- SSF published contribution materialization
-- Published author contributions become immutable module supplements instead of overwriting source modules.

create table if not exists public.published_module_contributions (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references public.author_contributions(id) on delete restrict,
  version integer not null,
  module_id text not null,
  title text not null,
  summary text not null,
  body_markdown text not null,
  source_notes text,
  author_id uuid not null references public.profiles(id) on delete restrict,
  canonical_change_required boolean not null default false,
  kg_request_ref text,
  published_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz not null default now(),
  superseded_at timestamptz,
  unique (contribution_id, version)
);

create unique index if not exists published_module_contributions_one_current
  on public.published_module_contributions (contribution_id)
  where superseded_at is null;

create index if not exists published_module_contributions_module_current
  on public.published_module_contributions (upper(module_id), published_at desc)
  where superseded_at is null;

alter table public.published_module_contributions enable row level security;

create policy "published_module_contributions_read_public"
  on public.published_module_contributions
  for select using (superseded_at is null);

create or replace function public.ssf_materialize_author_contribution(
  p_contribution_id uuid,
  p_note text default null
)
returns public.published_module_contributions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_contribution public.author_contributions;
  v_publication public.published_module_contributions;
  v_version integer;
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;

  select * into v_contribution
  from public.author_contributions
  where id = p_contribution_id
  for update;

  if not found then
    raise exception 'Contribution not found' using errcode = 'P0002';
  end if;
  if v_contribution.status <> 'approved' then
    raise exception 'Only approved contributions can be materialized' using errcode = '22023';
  end if;
  if nullif(trim(coalesce(v_contribution.target_module_id, '')), '') is null then
    raise exception 'A target module is required for materialization' using errcode = '22023';
  end if;
  if v_contribution.canonical_change_required and nullif(trim(coalesce(v_contribution.kg_request_ref, '')), '') is null then
    raise exception 'Canonical changes require a KG external-task reference' using errcode = '22023';
  end if;

  select coalesce(max(version), 0) + 1 into v_version
  from public.published_module_contributions
  where contribution_id = p_contribution_id;

  update public.published_module_contributions
  set superseded_at = now()
  where contribution_id = p_contribution_id and superseded_at is null;

  insert into public.published_module_contributions (
    contribution_id, version, module_id, title, summary, body_markdown,
    source_notes, author_id, canonical_change_required, kg_request_ref,
    published_by
  ) values (
    v_contribution.id, v_version, upper(trim(v_contribution.target_module_id)),
    v_contribution.title, v_contribution.summary, v_contribution.body_markdown,
    v_contribution.source_notes, v_contribution.author_id,
    v_contribution.canonical_change_required, v_contribution.kg_request_ref,
    auth.uid()
  ) returning * into v_publication;

  update public.author_contributions
  set status = 'published', published_at = now(), updated_at = now()
  where id = p_contribution_id;

  insert into public.author_contribution_events (
    contribution_id, actor_id, event_type, from_status, to_status, note
  ) values (
    p_contribution_id, auth.uid(), 'materialize', 'approved', 'published',
    nullif(trim(coalesce(p_note, '')), '')
  );

  return v_publication;
end;
$$;

revoke all on function public.ssf_materialize_author_contribution(uuid, text) from public;
grant execute on function public.ssf_materialize_author_contribution(uuid, text) to authenticated;

comment on table public.published_module_contributions is
  'Immutable, versioned SSF publication snapshots attached to an existing module. They supplement but never overwrite KG/KXF module identity or canonical facts.';
