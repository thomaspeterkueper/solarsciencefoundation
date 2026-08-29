-- SSF participation application administration
-- Decisions are enforced in PostgreSQL and require ROLE:SSF:admin.

create or replace function public.ssf_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.member_roles mr
    where mr.user_id = auth.uid()
      and mr.role_id = 'ROLE:SSF:admin'
  );
$$;

revoke all on function public.ssf_is_admin() from public;
grant execute on function public.ssf_is_admin() to authenticated;

-- Prevent more than one unresolved application of the same type per user.
-- The original unique constraint includes status and therefore does not prevent
-- a second submission after an application moves from submitted to screening.
create unique index if not exists participation_applications_one_open_type
  on public.participation_applications (user_id, application_type)
  where status in ('submitted', 'screening', 'review', 'revision_requested');

create or replace function public.ssf_admin_list_participation_applications(
  p_status text default null
)
returns table (
  id uuid,
  user_id uuid,
  display_name text,
  email text,
  application_type text,
  motivation text,
  expertise text,
  contribution_interest text,
  status text,
  submitted_at timestamptz,
  updated_at timestamptz,
  decided_at timestamptz,
  decision_note text
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.ssf_is_admin() then
    raise exception 'SSF admin role required' using errcode = '42501';
  end if;

  return query
    select
      a.id,
      a.user_id,
      p.display_name,
      u.email::text,
      a.application_type,
      a.motivation,
      a.expertise,
      a.contribution_interest,
      a.status,
      a.submitted_at,
      a.updated_at,
      a.decided_at,
      a.decision_note
    from public.participation_applications a
    join public.profiles p on p.id = a.user_id
    left join auth.users u on u.id = a.user_id
    where p_status is null or a.status = p_status
    order by
      case a.status
        when 'submitted' then 0
        when 'screening' then 1
        when 'review' then 2
        when 'revision_requested' then 3
        else 4
      end,
      a.submitted_at asc;
end;
$$;

revoke all on function public.ssf_admin_list_participation_applications(text) from public;
grant execute on function public.ssf_admin_list_participation_applications(text) to authenticated;

create or replace function public.ssf_admin_review_participation_application(
  p_application_id uuid,
  p_status text,
  p_note text default null
)
returns public.participation_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  v_application public.participation_applications;
  v_role_id text;
begin
  if not public.ssf_is_admin() then
    raise exception 'SSF admin role required' using errcode = '42501';
  end if;

  if p_status not in ('screening', 'review', 'revision_requested', 'approved', 'rejected') then
    raise exception 'Unsupported application status' using errcode = '22023';
  end if;

  if p_status = 'revision_requested' and nullif(trim(coalesce(p_note, '')), '') is null then
    raise exception 'A revision request requires a note' using errcode = '22023';
  end if;

  select * into v_application
  from public.participation_applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Application not found' using errcode = 'P0002';
  end if;

  if v_application.status in ('approved', 'rejected', 'withdrawn') then
    raise exception 'Application is already closed' using errcode = '22023';
  end if;

  update public.participation_applications
  set
    status = p_status,
    decision_note = nullif(trim(coalesce(p_note, '')), ''),
    decided_at = case when p_status in ('approved', 'rejected') then now() else null end,
    updated_at = now()
  where id = p_application_id
  returning * into v_application;

  if p_status = 'approved' then
    v_role_id := case v_application.application_type
      when 'member' then 'ROLE:SSF:free-member'
      when 'supporting_member' then 'ROLE:SSF:supporting-member'
      when 'author' then 'ROLE:SSF:contributor'
      else null
    end;

    if v_role_id is null then
      raise exception 'No technical role mapping for application type' using errcode = '22023';
    end if;

    insert into public.member_roles (user_id, role_id)
    values (v_application.user_id, v_role_id)
    on conflict (user_id, role_id) do nothing;

    if v_application.application_type = 'supporting_member'
       and not exists (
         select 1 from public.supporter_records sr
         where sr.user_id = v_application.user_id
           and sr.supporter_type = 'supporting_member'
           and sr.ended_at is null
       ) then
      insert into public.supporter_records (user_id, supporter_type)
      values (v_application.user_id, 'supporting_member');
    end if;
  end if;

  return v_application;
end;
$$;

revoke all on function public.ssf_admin_review_participation_application(uuid, text, text) from public;
grant execute on function public.ssf_admin_review_participation_application(uuid, text, text) to authenticated;

comment on function public.ssf_admin_review_participation_application(uuid, text, text) is
  'Admin-only application workflow. Approval atomically grants the minimal technical SSF role: member -> free-member, supporting_member -> supporting-member, author -> contributor.';
