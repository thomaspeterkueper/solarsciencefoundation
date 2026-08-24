/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/fixtures-run.test.ts
 * Name:      research-watch - deterministic fixture pipeline run
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts, config/research-watch/fixtures/works.json
 *
 * Runs the complete watch-and-triage pipeline over the committed fixture set
 * (source SSF-SRC-FIXTURE-001) and asserts the full expected outcome:
 * dedup merges, no-impact retention, bounded candidates, outbox emission.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { getWatchSources } from '../../lib/research-watch/sources';
import { FIXED_NOW } from './helpers';

const fixtureSource = () => getWatchSources().find((source) => source.id === 'SSF-SRC-FIXTURE-001')!;

test('full fixture run: 11 works → 9 evidence, 2 merges, 5 bounded candidates, 1 envelope', async () => {
  const outboxDir = await mkdtemp(join(tmpdir(), 'ssf-rw-fixture-'));
  try {
    const store = new MemoryEvidenceStore();
    const summary = await runResearchWatch({
      store,
      sources: [fixtureSource()],
      now: FIXED_NOW,
      outboxDir,
      parentTask: 'EXT-ECO-SSF-20260821-001',
    });

    // Discovery + dedup: dup-a/b/c merge into one, dup v2 stays separate.
    assert.equal(summary.outcomes.length, 1);
    assert.equal(summary.outcomes[0].status, 'ok');
    assert.equal(summary.outcomes[0].works_found, 11);
    assert.equal(summary.outcomes[0].new_evidence, 9);
    assert.equal(summary.outcomes[0].merged, 2);

    assert.equal(summary.new_evidence_ids.length, 9);
    assert.equal(summary.merged_evidence_ids.length, 2);

    // The duplicate DOI collapsed into ONE evidence object with three source refs.
    const dup = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.grav-dup']);
    assert.ok(dup);
    assert.equal(dup.source_refs.length, 3);
    assert.deepEqual(
      dup.source_refs.map((ref) => ref.raw_id).sort(),
      ['fx-grav-dup-a', 'fx-grav-dup-b', 'fx-grav-dup-c']
    );

    // No-impact + out-of-scope works are retained, never promoted.
    const classroom = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.grav-classroom']);
    assert.equal(classroom?.impact_class, 'NO_IMPACT');
    const alpine = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.alpine-chlorophyll']);
    assert.equal(alpine?.impact_class, 'NO_IMPACT');
    assert.equal(alpine?.triage_note, 'out_of_scope');

    // Bounded promotion: 7 promotable works, budget 5 → 5 candidates, 2 deferred.
    assert.equal(summary.candidates_created.length, 5);
    assert.equal(
      summary.candidate_skips.filter((skip) => skip.reason === 'candidate_budget_reached').length,
      2
    );
    assert.equal(
      summary.candidate_skips.filter((skip) => skip.reason === 'impact_not_promotable').length,
      2
    );

    const pending = await store.listPendingCandidates();
    assert.equal(pending.length, 5);

    // The contradicting preprint is a CANON_VALIDATION candidate routed to KG.
    const cv = pending.find((candidate) => candidate.task_type === 'CANON_VALIDATION');
    assert.ok(cv, 'expected exactly one CANON_VALIDATION candidate');
    assert.equal(cv.evidence_id, 'arxiv:2501.09876v2');
    assert.equal(cv.payload.routing_target, 'KG');
    assert.equal(cv.cost_policy, 'prefer_off_peak');

    // The retraction is urgent (immediate) and preserved as a review task.
    const retraction = pending.find((candidate) => candidate.evidence_id === 'doi:10.2401/ssf.2026.insight-seas');
    assert.ok(retraction);
    assert.equal(retraction.cost_policy, 'immediate');

    // Cross-project emission: exactly one valid KG envelope.
    assert.equal(summary.envelopes.length, 1);
    assert.deepEqual(summary.envelopes[0].errors, []);
    assert.equal(summary.envelopes[0].envelope.target, 'KG');
    assert.ok(summary.envelopes[0].file);
  } finally {
    await rm(outboxDir, { recursive: true, force: true });
  }
});

test('second fixture run within cadence is a no-op: nothing reprocessed', async () => {
  const store = new MemoryEvidenceStore();
  const source = fixtureSource();

  const first = await runResearchWatch({ store, sources: [source], now: FIXED_NOW });
  assert.equal(first.new_evidence_ids.length, 9);

  const second = await runResearchWatch({
    store,
    sources: [source],
    now: new Date(FIXED_NOW.getTime() + 60 * 60 * 1000),
  });
  assert.equal(second.outcomes[0].status, 'skipped_cadence');
  assert.equal(second.new_evidence_ids.length, 0);
  assert.equal(second.candidates_created.length, 0);
});
