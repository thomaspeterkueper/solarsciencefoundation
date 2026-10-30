/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/supabaseStore.test.ts
 * Name:      research-watch - Supabase store error propagation
 * Version:   0.1.0
 * Created:   2026-10-30
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { SupabaseClient } from '@supabase/supabase-js';
import { StoreError, SupabaseEvidenceStore } from '../../lib/research-watch/supabaseStore';
import type { EvidenceRecord, TaskCandidate } from '../../lib/research-watch/types';

/** Chainable query stub: every builder method returns itself, awaiting resolves to `result`. */
function stubClient(result: { data: unknown; error: { message: string } | null }): SupabaseClient {
  const builder: Record<string, unknown> = {};
  for (const method of ['select', 'overlaps', 'limit', 'in', 'order', 'eq', 'update', 'upsert']) {
    builder[method] = () => builder;
  }
  builder.maybeSingle = async () => result;
  builder.then = (resolve: (value: unknown) => unknown) => resolve(result);
  return { from: () => builder } as unknown as SupabaseClient;
}

const failure = { data: null, error: { message: 'connection reset' } };

test('findByIdentityKeys: not found returns null, query error throws', async () => {
  const notFound = new SupabaseEvidenceStore(stubClient({ data: null, error: null }));
  assert.equal(await notFound.findByIdentityKeys(['doi:x']), null);

  const broken = new SupabaseEvidenceStore(stubClient(failure));
  await assert.rejects(() => broken.findByIdentityKeys(['doi:x']), StoreError);
});

test('write failures are propagated, not swallowed', async () => {
  const store = new SupabaseEvidenceStore(stubClient(failure));
  await assert.rejects(() => store.saveEvidence({ identity_keys: [] } as unknown as EvidenceRecord), /saveEvidence failed/);
  await assert.rejects(() => store.saveCandidate({} as unknown as TaskCandidate), /saveCandidate failed/);
  await assert.rejects(() => store.setSourceLastRun('s', '2026-10-30T00:00:00.000Z'), /setSourceLastRun failed/);
});

test('list reads propagate errors instead of returning empty results', async () => {
  const store = new SupabaseEvidenceStore(stubClient(failure));
  await assert.rejects(() => store.listOpenCandidateFingerprints(), StoreError);
  await assert.rejects(() => store.listPendingCandidates(), StoreError);
  await assert.rejects(() => store.getSourceLastRun('s'), StoreError);
});
