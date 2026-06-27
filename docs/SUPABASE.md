<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/SUPABASE.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/SUPABASE.md
Name: Supabase setup guide
Version: 0.1.0
Created: 2026-06-27
Modified: 2026-06-27 11:00 CEST
Depends: supabase/config.toml, supabase/migrations
-->

# Supabase setup for SSF

SSF uses its own Supabase project for members, progress, exercise attempts, unlocks and achievements.

## Project

```text
Project ref: eiwudquwkymshqdskjxm
Project URL: https://eiwudquwkymshqdskjxm.supabase.co
```

## Local setup

From the repository root:

```bash
supabase login
supabase init
supabase link --project-ref eiwudquwkymshqdskjxm
supabase db push
```

The working directory is the repository root because the `supabase/` folder is at root level.

## Vercel environment variables

Set these in Vercel for the SSF project:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Rules:

- `NEXT_PUBLIC_SUPABASE_URL` is public.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` / publishable key is public-client usable.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be committed.
- Database passwords and direct connection strings must never be committed.

## Initial tables

```text
profiles
membership_roles
member_roles
supporter_records
learning_progress
exercise_attempts
unlocks
achievements
user_achievements
project_access_audit
```

## Compatibility rule

NOXIA and later projects should consume SSF through APIs, not through direct database writes.

```text
SSF Supabase
    ↑
SSF API
    ↓
NOXIA / future projects
```
