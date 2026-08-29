-- Curator/admin-only version history for comparing immutable publication snapshots.

create or replace function public.ssf_editorial_publication_history(p_contribution_id uuid)
returns table (
  id uuid,
  contribution_id uuid,
  version integer,
  module_id text,
  title text,
  summary text,
  body_markdown text,
  source_notes text,
  author_display_name text,
  reviewer_note_snapshot text,
  editor_note_snapshot text,
  published_by_display_name text,
  published_at timestamptz,
  superseded_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;

  return query
  select
    p.id, p.contribution_id, p.version, p.module_id, p.title, p.summary,
    p.body_markdown, p.source_notes, p.author_display_name,
    p.reviewer_note_snapshot, p.editor_note_snapshot,
    p.published_by_display_name, p.published_at, p.superseded_at
  from public.published_module_contributions p
  where p.contribution_id = p_contribution_id
  order by p.version desc;
end;
$$;

revoke all on function public.ssf_editorial_publication_history(uuid) from public;
grant execute on function public.ssf_editorial_publication_history(uuid) to authenticated;
