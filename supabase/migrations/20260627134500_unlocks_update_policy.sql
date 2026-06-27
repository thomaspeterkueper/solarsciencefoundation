-- KUEPER - Solar Science Foundation (SSF)
-- Path: supabase/migrations/20260627134500_unlocks_update_policy.sql
-- Name: unlock update RLS policy for upserts
-- Version: 0.1.0
-- Created: 2026-06-27
-- Modified: 2026-06-27 13:45 CEST

drop policy if exists "unlocks_update_own" on public.unlocks;

create policy "unlocks_update_own" on public.unlocks
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
