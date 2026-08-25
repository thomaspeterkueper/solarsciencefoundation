/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/dedup.test.ts
 * Name:      research-watch - duplicate discovery tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts
 *
 * The same work discovered through multiple sources or multiple runs becomes
 * ONE evidence object with multiple source_refs and no duplicate candidates.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

const DUP_WORK = {
  raw_id: 'idx-a-0001',
  title: 'Precision classroom measurement of local gravitational acceleration',
  published_at: '2026-07-02',
  identifiers: { doi: '10.2401/ssf.2026.grav-dup' },
  evidence_type: 'primary-study' as const,
  publication_status: 'published' as const,
  relation_hints: [{ relation: 'confirms' as const, target: 'CLM:SSF:PHY:GRAVITY:002' }],
};

test('same DOI from two sources becomes one evidence with two source_refs', async () => {
  const store = new MemoryEvidenceStore();
  const sources = [
    makeSource('SSF-SRC-TEST-A', 'stubA'),
    makeSource('SSF-SRC-TEST-B', 'stubB'),
  ];
  const summary = await runResearchWatch({
    store,
    sources,
    adapters: {
      stubA: stubAdapter([DUP_WORK]),
      stubB: stubAdapter([DUP_WORK]),
    },
    now: FIXED_NOW,
  });

  assert.equal(summary.new_evidence_ids.length, 1);
  assert.equal(summary.merged_evidence_ids.length, 1);
  assert.equal(summary.candidates_created.length, 1);

  const evidence = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.grav-dup']);
  assert.ok(evidence);
  assert.equal(evidence.evidence_id, 'doi:10.2401/ssf.2026.grav-dup');
  assert.equal(evidence.source_refs.length, 2);
  assert.deepEqual(
    evidence.source_refs.map((ref) => ref.source_id).sort(),
    ['SSF-SRC-TEST-A', 'SSF-SRC-TEST-B']
  );
});

test('a later discovery carrying only the arXiv id merges via shared identity key', async () => {
  const store = new MemoryEvidenceStore();
  const withDoiAndArxiv = {
    ...DUP_WORK,
    raw_id: 'idx-a-0001',
    identifiers: { doi: '10.2401/ssf.2026.grav-dup', arxiv: 'arXiv:2501.04567v1' },
  };
  const arxivOnly = {
    ...DUP_WORK,
    raw_id: 'idx-b-0002',
    identifiers: { arxiv: '2501.04567v1' },
  };
  const sources = [makeSource('SSF-SRC-TEST-A', 'stubA')];

  const first = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([withDoiAndArxiv]) },
    now: FIXED_NOW,
  });
  assert.equal(first.new_evidence_ids.length, 1);

  const second = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([arxivOnly]) },
    now: new Date(FIXED_NOW.getTime() + 60_000),
  });
  assert.equal(second.new_evidence_ids.length, 0);
  assert.equal(second.merged_evidence_ids.length, 1);
  assert.equal(second.candidates_created.length, 0, 'no duplicate candidate for a merged work');

  const evidence = await store.findByIdentityKeys(['arxiv:2501.04567v1']);
  assert.ok(evidence);
  assert.equal(evidence.evidence_id, 'doi:10.2401/ssf.2026.grav-dup');
  assert.equal(evidence.source_refs.length, 2);
});

test('re-running the same feed does not reprocess and respects cadence', async () => {
  const store = new MemoryEvidenceStore();
  const sources = [makeSource('SSF-SRC-TEST-A', 'stubA', 24)];

  const first = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([DUP_WORK]) },
    now: FIXED_NOW,
  });
  assert.equal(first.new_evidence_ids.length, 1);

  // Within cadence: source is skipped entirely.
  const withinCadence = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([DUP_WORK]) },
    now: new Date(FIXED_NOW.getTime() + 60 * 60 * 1000),
  });
  assert.equal(withinCadence.outcomes[0].status, 'skipped_cadence');
  assert.equal(withinCadence.new_evidence_ids.length, 0);

  // Past cadence: feed re-fetched, work recognized as duplicate, no new candidate.
  const pastCadence = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([DUP_WORK]) },
    now: new Date(FIXED_NOW.getTime() + 25 * 60 * 60 * 1000),
  });
  assert.equal(pastCadence.outcomes[0].status, 'ok');
  assert.equal(pastCadence.new_evidence_ids.length, 0);
  assert.equal(pastCadence.merged_evidence_ids.length, 1);
  assert.equal(pastCadence.candidates_created.length, 0);

  const evidence = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.grav-dup']);
  assert.ok(evidence);
  assert.equal(evidence.source_refs.length, 1, 'same source+raw_id is not added twice');
  const pending = await store.listPendingCandidates();
  assert.equal(pending.length, 1, 'exactly one candidate across all runs');
});

test('arXiv identity is version-sensitive: v1 and v2 stay separate evidence', async () => {
  const store = new MemoryEvidenceStore();
  const v1 = {
    raw_id: 'v1',
    title: 'Version-sensitive work',
    identifiers: { arxiv: '2501.04567v1' },
    evidence_type: 'primary-study' as const,
    publication_status: 'preprint' as const,
  };
  const v2 = {
    raw_id: 'v2',
    title: 'Version-sensitive work',
    identifiers: { arxiv: '2501.04567v2' },
    evidence_type: 'primary-study' as const,
    publication_status: 'preprint' as const,
  };
  const sources = [makeSource('SSF-SRC-TEST-A', 'stubA')];

  const summary = await runResearchWatch({
    store,
    sources,
    adapters: { stubA: stubAdapter([v1, v2]) },
    now: FIXED_NOW,
  });
  assert.equal(summary.new_evidence_ids.length, 2);

  const first = await store.findByIdentityKeys(['arxiv:2501.04567v1']);
  const second = await store.findByIdentityKeys(['arxiv:2501.04567v2']);
  assert.ok(first);
  assert.ok(second);
  assert.notEqual(first.evidence_id, second.evidence_id);
});
