-- Public profile links are rendered as anchors. Restrict them to HTTP(S) URLs.
alter table public.public_author_profiles
  add constraint public_author_profiles_website_http
  check (website_url is null or website_url ~* '^https?://');
