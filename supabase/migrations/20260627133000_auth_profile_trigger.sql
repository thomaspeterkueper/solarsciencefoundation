-- KUEPER - Solar Science Foundation (SSF)
-- Path: supabase/migrations/20260627133000_auth_profile_trigger.sql
-- Name: auth profile trigger and default role
-- Version: 0.1.0
-- Created: 2026-06-27
-- Modified: 2026-06-27 13:30 CEST

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.member_roles (user_id, role_id)
  values (new.id, 'ROLE:SSF:free-member')
  on conflict (user_id, role_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create policy if not exists "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
