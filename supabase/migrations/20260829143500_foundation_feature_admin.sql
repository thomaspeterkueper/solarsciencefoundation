-- Curator/admin management for the public Foundation feature selection.

create or replace function public.ssf_admin_list_feature_candidates()
returns table (
  publication_id uuid,
  contribution_id uuid,
  module_id text,
  title text,
  version integer,
  author_display_name text,
  published_at timestamptz,
  placement text,
  sort_order integer,
  editorial_note text,
  is_active boolean
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
      p.id,
      p.contribution_id,
      p.module_id,
      p.title,
      p.version,
      p.author_display_name,
      p.published_at,
      f.placement,
      f.sort_order,
      f.editorial_note,
      coalesce(f.is_active, false)
    from public.published_module_contributions p
    left join public.foundation_featured_contributions f on f.publication_id = p.id
    where p.superseded_at is null
    order by coalesce(f.is_active, false) desc, coalesce(f.sort_order, 100), p.published_at desc;
end;
$$;

revoke all on function public.ssf_admin_list_feature_candidates() from public;
grant execute on function public.ssf_admin_list_feature_candidates() to authenticated;
