-- Enrich immutable publication snapshots with human-readable authorship and editorial provenance.

alter table public.published_module_contributions
  add column if not exists author_display_name text,
  add column if not exists published_by_display_name text,
  add column if not exists reviewed_by uuid references public.profiles(id) on delete set null,
  add column if not exists reviewed_by_display_name text,
  add column if not exists approved_by uuid references public.profiles(id) on delete set null,
  add column if not exists approved_by_display_name text,
  add column if not exists reviewer_note_snapshot text,
  add column if not exists editor_note_snapshot text;

-- Backfill names where historical profile records are still available.
update public.published_module_contributions p
set author_display_name = coalesce(p.author_display_name, profile.display_name)
from public.profiles profile
where profile.id = p.author_id and p.author_display_name is null;

update public.published_module_contributions p
set published_by_display_name = coalesce(p.published_by_display_name, profile.display_name)
from public.profiles profile
where profile.id = p.published_by and p.published_by_display_name is null;

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
  v_author_name text;
  v_publisher_name text;
  v_reviewer_id uuid;
  v_reviewer_name text;
  v_approver_id uuid;
  v_approver_name text;
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;

  select * into v_contribution
  from public.author_contributions
  where id = p_contribution_id
  for update;

  if not found then raise exception 'Contribution not found' using errcode = 'P0002'; end if;
  if v_contribution.status <> 'approved' then raise exception 'Only approved contributions can be materialized' using errcode = '22023'; end if;
  if nullif(trim(coalesce(v_contribution.target_module_id, '')), '') is null then raise exception 'A target module is required for materialization' using errcode = '22023'; end if;
  if v_contribution.canonical_change_required and nullif(trim(coalesce(v_contribution.kg_request_ref, '')), '') is null then
    raise exception 'Canonical changes require a KG external-task reference' using errcode = '22023';
  end if;

  select display_name into v_author_name from public.profiles where id = v_contribution.author_id;
  select display_name into v_publisher_name from public.profiles where id = auth.uid();

  select e.actor_id into v_reviewer_id
  from public.author_contribution_events e
  where e.contribution_id = p_contribution_id
    and e.to_status in ('scientific_review', 'revision_requested')
    and e.actor_id is not null
  order by e.created_at desc limit 1;
  if v_reviewer_id is not null then select display_name into v_reviewer_name from public.profiles where id = v_reviewer_id; end if;

  select e.actor_id into v_approver_id
  from public.author_contribution_events e
  where e.contribution_id = p_contribution_id
    and e.to_status = 'approved'
    and e.actor_id is not null
  order by e.created_at desc limit 1;
  if v_approver_id is not null then select display_name into v_approver_name from public.profiles where id = v_approver_id; end if;

  select coalesce(max(version), 0) + 1 into v_version
  from public.published_module_contributions
  where contribution_id = p_contribution_id;

  update public.published_module_contributions
  set superseded_at = now()
  where contribution_id = p_contribution_id and superseded_at is null;

  insert into public.published_module_contributions (
    contribution_id, version, module_id, title, summary, body_markdown,
    source_notes, author_id, author_display_name, canonical_change_required, kg_request_ref,
    published_by, published_by_display_name, reviewed_by, reviewed_by_display_name,
    approved_by, approved_by_display_name, reviewer_note_snapshot, editor_note_snapshot
  ) values (
    v_contribution.id, v_version, upper(trim(v_contribution.target_module_id)),
    v_contribution.title, v_contribution.summary, v_contribution.body_markdown,
    v_contribution.source_notes, v_contribution.author_id, v_author_name,
    v_contribution.canonical_change_required, v_contribution.kg_request_ref,
    auth.uid(), v_publisher_name, v_reviewer_id, v_reviewer_name,
    v_approver_id, v_approver_name, v_contribution.reviewer_note, v_contribution.editor_note
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

comment on column public.published_module_contributions.author_display_name is
  'Display-name snapshot retained with the immutable publication for stable authorship attribution.';
comment on column public.published_module_contributions.reviewer_note_snapshot is
  'Review-note snapshot at publication time; later edits to the working contribution do not rewrite publication history.';
