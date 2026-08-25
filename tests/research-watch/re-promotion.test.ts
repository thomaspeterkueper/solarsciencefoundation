/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/re-promotion.test.ts
 * Name:      research-watch - deferred evidence re-promotion tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts
 *
 * Evidence skipped by the per-run candidate budget is never dropped: it stays
 * in the store and a later run re-scans stored unpromoted evidence and drains
 * the backlog — discovery cadence and synthesis cadence are independent
 * (architecture SSF_RESEARCH_WATCH).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

function contradictingWork(i: number) {
  return work({
    raw_id: `fx-repro-${i}`,
    title: `Contradicting measurement of gravitational attraction, study ${i}`,
    identifiers: { doi: `10.2401/ssf.2026.repro-${i}` },
    relation_hints: [{ relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:001' }],
  });
}

test('budget-deferred evidence is re-promoted by later runs (backlog drain)', async () => {
  const store = new MemoryEvidenceStore();
  const source = makeSource('SSF-SRC-TEST-A', 'stubA', 24);
  const works = Array.from({ length: 7 }, (_, i) => contradictingWork(i + 1));
  const run = (now: Date) =>
    runResearchWatch({
      store,
      sources: [source],
      adapters: { stubA: stubAdapter(works) },
      config: { promotion: { max_candidates_per_run: 3 } },
      now,
    });

  const first = await run(FIXED_NOW);
  assert.equal(first.new_evidence_ids.length, 7);
  assert.equal(first.candidates_created.length, 3, 'candidates are bounded per run');
  assert.equal(
    first.candidate_skips.filter((skip) => skip.reason === 'candidate_budget_reached').length,
    4
  );

  // Past cadence the feed re-fetches: everything merges (no new evidence),
  // but the deferred evidence finally reaches the review pipeline.
  const second = await run(new Date(FIXED_NOW.getTime() + 25 * 60 * 60 * 1000));
  assert.equal(second.outcomes[0].status, 'ok');
  assert.equal(second.new_evidence_ids.length, 0, 'all works are already known');
  assert.equal(second.merged_evidence_ids.length, 7);
  assert.equal(second.candidates_created.length, 3, 'backlog is drained up to the budget');

  const third = await run(new Date(FIXED_NOW.getTime() + 50 * 60 * 60 * 1000));
  assert.equal(third.candidates_created.length, 1, 'the last deferred evidence is promoted');

  const pending = await store.listPendingCandidates();
  assert.equal(pending.length, 7, 'every promotable work eventually gets a candidate');
});

test('a run where every source is cadence-skipped stays a no-op for the backlog', async () => {
  const store = new MemoryEvidenceStore();
  const source = makeSource('SSF-SRC-TEST-A', 'stubA', 24);
  const works = Array.from({ length: 7 }, (_, i) => contradictingWork(i + 1));

  const first = await runResearchWatch({
    store,
    sources: [source],
    adapters: { stubA: stubAdapter(works) },
    config: { promotion: { max_candidates_per_run: 3 } },
    now: FIXED_NOW,
  });
  assert.equal(first.candidates_created.length, 3);

  const withinCadence = await runResearchWatch({
    store,
    sources: [source],
    adapters: { stubA: stubAdapter(works) },
    config: { promotion: { max_candidates_per_run: 3 } },
    now: new Date(FIXED_NOW.getTime() + 60 * 60 * 1000),
  });
  assert.equal(withinCadence.outcomes[0].status, 'skipped_cadence');
  assert.equal(withinCadence.candidates_created.length, 0, 'no discovery, no synthesis');
  assert.equal(withinCadence.candidate_skips.length, 0);
});
