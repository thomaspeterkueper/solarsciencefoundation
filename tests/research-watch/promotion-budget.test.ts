/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/promotion-budget.test.ts
 * Name:      research-watch - bounded promotion tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts
 *
 * Promotion is bounded: at most max_candidates_per_run candidates per run,
 * in discovery order; the rest are retained as evidence with an explicit
 * skip reason. Candidate ids are deterministic for identical inputs.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

function contradictingWork(i: number) {
  return work({
    raw_id: `fx-budget-${i}`,
    title: `Contradicting measurement of gravitational attraction, study ${i}`,
    identifiers: { doi: `10.2401/ssf.2026.budget-${i}` },
    relation_hints: [{ relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:001' }],
  });
}

test('promotion respects max_candidates_per_run and records deferred evidence', async () => {
  const store = new MemoryEvidenceStore();
  const works = Array.from({ length: 7 }, (_, i) => contradictingWork(i + 1));
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: { stubA: stubAdapter(works) },
    config: { promotion: { max_candidates_per_run: 3 } },
    now: FIXED_NOW,
  });

  assert.equal(summary.new_evidence_ids.length, 7, 'all evidence is retained');
  assert.equal(summary.candidates_created.length, 3, 'candidates are bounded');
  assert.equal(
    summary.candidate_skips.filter((skip) => skip.reason === 'candidate_budget_reached').length,
    4,
    'deferred evidence is reported explicitly'
  );

  const pending = await store.listPendingCandidates();
  assert.equal(pending.length, 3);
  for (const candidate of pending) {
    assert.equal(candidate.task_type, 'CANON_VALIDATION');
  }
});

test('promotion is deterministic: identical inputs produce identical candidate ids', async () => {
  const works = [contradictingWork(1), contradictingWork(2)];

  async function run() {
    const store = new MemoryEvidenceStore();
    const summary = await runResearchWatch({
      store,
      sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
      adapters: { stubA: stubAdapter(works) },
      now: FIXED_NOW,
    });
    return summary.candidates_created;
  }

  assert.deepEqual(await run(), await run());
});

test('fingerprint-only works are not promoted without stable identity', async () => {
  const store = new MemoryEvidenceStore();
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: {
      stubA: stubAdapter([
        work({
          raw_id: 'fx-no-id',
          title: 'Contradicting measurement of gravitational attraction without identifiers',
          relation_hints: [{ relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:001' }],
        }),
      ]),
    },
    now: FIXED_NOW,
  });

  assert.equal(summary.new_evidence_ids.length, 1, 'evidence retained for dedup');
  assert.equal(summary.candidates_created.length, 0);
  assert.deepEqual(
    summary.candidate_skips.map((skip) => skip.reason),
    ['unstable_identity']
  );
});
