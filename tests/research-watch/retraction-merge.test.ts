/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/retraction-merge.test.ts
 * Name:      research-watch - retraction/correction merge tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts
 *
 * A retraction/correction for a work already in the store (arXiv withdrawals/
 * replacements reuse the same id) must update the stored evidence status and
 * re-classify to the UNCERTAIN review path with immediate cost when a watched
 * topic is touched — while preserving all provenance and superseding any
 * candidate derived from the stale status.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

const STUDY = work({
  raw_id: 'idx-retract-study',
  title: 'Precision classroom measurement of local gravitational acceleration',
  identifiers: { doi: '10.2401/ssf.2026.retract-me' },
  relation_hints: [{ relation: 'confirms', target: 'CLM:SSF:PHY:GRAVITY:002' }],
});

// Terse notice carrying no topic keywords: only the stored record's topic
// linkage keeps the retraction on the immediate review path, and the newly
// discovered arXiv id must be unioned into the record.
const RETRACTION = work({
  raw_id: 'idx-retract-notice',
  title: 'Retraction notice',
  identifiers: { doi: '10.2401/ssf.2026.retract-me', arxiv: '2501.09999v1' },
  evidence_type: 'retraction',
  publication_status: 'retracted',
});

test('retraction of a known work updates status, re-classifies and supersedes the prior candidate', async () => {
  const store = new MemoryEvidenceStore();
  const source = makeSource('SSF-SRC-TEST-A', 'stubA', 24);

  const first = await runResearchWatch({
    store,
    sources: [source],
    adapters: { stubA: stubAdapter([STUDY]) },
    now: FIXED_NOW,
  });
  assert.equal(first.candidates_created.length, 1, 'the study promotes as CONFIRMS');

  // Past cadence the retraction arrives under the same DOI.
  const second = await runResearchWatch({
    store,
    sources: [source],
    adapters: { stubA: stubAdapter([RETRACTION]) },
    now: new Date(FIXED_NOW.getTime() + 25 * 60 * 60 * 1000),
  });
  assert.equal(second.new_evidence_ids.length, 0, 'the retraction merges, it is not a new work');
  assert.equal(second.merged_evidence_ids.length, 1);
  assert.equal(second.superseded_candidates.length, 1, 'the stale CONFIRMS candidate is invalidated');
  assert.equal(second.candidates_created.length, 1, 'the retraction review candidate is created');

  const evidence = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.retract-me']);
  assert.ok(evidence);
  assert.equal(evidence.publication_status, 'retracted', 'stored status is updated');
  assert.equal(evidence.evidence_type, 'retraction');
  assert.equal(evidence.impact_class, 'UNCERTAIN');
  assert.equal(evidence.triage_note, 'retraction_review');
  assert.equal(evidence.cost_policy, 'immediate', 'retraction of a watched-topic work is urgent');
  assert.equal(evidence.identifiers.doi, '10.2401/ssf.2026.retract-me');
  assert.equal(evidence.identifiers.arxiv, '2501.09999v1', 'identifiers are unioned on merge');
  assert.equal(evidence.source_refs.length, 2, 'provenance is preserved, never deleted');

  const pending = await store.listPendingCandidates();
  assert.equal(pending.length, 1);
  assert.equal(pending[0].evidence_id, evidence.evidence_id);
  assert.match(pending[0].payload.title, /UNCERTAIN/);
  assert.equal(pending[0].cost_policy, 'immediate');
  assert.notEqual(
    pending[0].candidate_id,
    first.candidates_created[0],
    'a fresh candidate replaces the superseded one'
  );
});

test('a re-discovery without a status change does not invalidate or re-classify', async () => {
  const store = new MemoryEvidenceStore();
  const source = makeSource('SSF-SRC-TEST-A', 'stubA', 24);

  const first = await runResearchWatch({
    store,
    sources: [source],
    adapters: { stubA: stubAdapter([STUDY]) },
    now: FIXED_NOW,
  });
  assert.equal(first.candidates_created.length, 1);

  const second = await runResearchWatch({
    store,
    sources: [source],
    adapters: {
      stubA: stubAdapter([
        work({
          ...STUDY,
          raw_id: 'idx-retract-other-source',
          identifiers: { doi: '10.2401/ssf.2026.retract-me' },
        }),
      ]),
    },
    now: new Date(FIXED_NOW.getTime() + 25 * 60 * 60 * 1000),
  });
  assert.equal(second.superseded_candidates.length, 0, 'no status change, nothing invalidated');
  assert.equal(second.candidates_created.length, 0, 'the existing candidate stays open');

  const evidence = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.retract-me']);
  assert.ok(evidence);
  assert.equal(evidence.impact_class, 'CONFIRMS', 'classification is untouched');
  assert.equal(evidence.source_refs.length, 2, 'the new source ref is still recorded');
});
