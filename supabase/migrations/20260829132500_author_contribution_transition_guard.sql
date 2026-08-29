-- Tighten the contribution workflow to the documented editorial state machine.
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
  v_allowed boolean := false;
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;

  select * into v_row from public.author_contributions where id = p_contribution_id for update;
  if not found then raise exception 'Contribution not found' using errcode = 'P0002'; end if;
  v_from := v_row.status;

  v_allowed := case v_from
    when 'submitted' then p_status in ('scientific_review','revision_requested','rejected')
    when 'scientific_review' then p_status in ('revision_requested','editorial_review','rejected')
    when 'revision_requested' then false
    when 'editorial_review' then p_status in ('revision_requested','approved','rejected')
    when 'approved' then p_status in ('published','archived')
    when 'published' then p_status = 'archived'
    else false
  end;

  if not v_allowed then
    raise exception 'Invalid transition from % to %', v_from, p_status using errcode = '22023';
  end if;
  if p_status = 'revision_requested' and nullif(trim(coalesce(p_note,'')), '') is null then
    raise exception 'Revision requests require a note' using errcode = '22023';
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
