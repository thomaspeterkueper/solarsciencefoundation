-- Public SSF authorship and curated Foundation feed.
-- Public profiles are opt-in. Editorial feature selection is separate from publication.

create table if not exists public.public_author_profiles (
  author_id uuid primary key references public.profiles(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' and char_length(slug) between 3 and 80),
  public_name text not null check (char_length(trim(public_name)) between 2 and 120),
  short_bio text check (short_bio is null or char_length(trim(short_bio)) <= 1200),
  expertise text check (expertise is null or char_length(trim(expertise)) <= 800),
  website_url text check (website_url is null or char_length(trim(website_url)) <= 500),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.public_author_profiles enable row level security;

create policy "public_author_profiles_read_visible_or_own"
  on public.public_author_profiles
  for select using (is_public or auth.uid() = author_id);

create policy "public_author_profiles_insert_own_author"
  on public.public_author_profiles
  for insert with check (
    auth.uid() = author_id
    and (
      public.ssf_has_role('ROLE:SSF:contributor')
      or public.ssf_has_role('ROLE:SSF:co-author')
      or public.ssf_has_role('ROLE:SSF:curator')
      or public.ssf_has_role('ROLE:SSF:admin')
    )
  );

create policy "public_author_profiles_update_own"
  on public.public_author_profiles
  for update using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create table if not exists public.foundation_featured_contributions (
  publication_id uuid primary key references public.published_module_contributions(id) on delete cascade,
  placement text not null default 'foundation' check (placement in ('foundation','home')),
  sort_order integer not null default 100,
  editorial_note text check (editorial_note is null or char_length(trim(editorial_note)) <= 800),
  is_active boolean not null default true,
  featured_by uuid references public.profiles(id) on delete set null,
  featured_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.foundation_featured_contributions enable row level security;

create policy "foundation_featured_contributions_read_active"
  on public.foundation_featured_contributions
  for select using (is_active);

create or replace function public.ssf_set_featured_contribution(
  p_publication_id uuid,
  p_placement text default 'foundation',
  p_sort_order integer default 100,
  p_editorial_note text default null,
  p_active boolean default true
)
returns public.foundation_featured_contributions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.foundation_featured_contributions;
  v_publication public.published_module_contributions;
begin
  if not (public.ssf_has_role('ROLE:SSF:curator') or public.ssf_has_role('ROLE:SSF:admin')) then
    raise exception 'SSF curator or admin role required' using errcode = '42501';
  end if;
  if p_placement not in ('foundation','home') then
    raise exception 'Unsupported placement' using errcode = '22023';
  end if;

  select * into v_publication
  from public.published_module_contributions
  where id = p_publication_id and superseded_at is null;
  if not found then
    raise exception 'Only current publications can be featured' using errcode = '22023';
  end if;

  insert into public.foundation_featured_contributions (
    publication_id, placement, sort_order, editorial_note, is_active, featured_by, featured_at, updated_at
  ) values (
    p_publication_id, p_placement, p_sort_order,
    nullif(trim(coalesce(p_editorial_note,'')), ''), p_active, auth.uid(), now(), now()
  )
  on conflict (publication_id) do update set
    placement = excluded.placement,
    sort_order = excluded.sort_order,
    editorial_note = excluded.editorial_note,
    is_active = excluded.is_active,
    featured_by = auth.uid(),
    updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

revoke all on function public.ssf_set_featured_contribution(uuid, text, integer, text, boolean) from public;
grant execute on function public.ssf_set_featured_contribution(uuid, text, integer, text, boolean) to authenticated;

comment on table public.public_author_profiles is
  'Opt-in public SSF author profiles. Private account profile data is never exposed through this table unless the author publishes it.';
comment on table public.foundation_featured_contributions is
  'Editorially selected current SSF publication snapshots for Foundation/Home presentation. Selection never changes publication or KG canon.';
