/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/validation-candidate.test.ts
 * Name:      research-watch - CANON_VALIDATION candidate and outbox tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/engine.ts, lib/research-watch/envelope.ts
 *
 * A contradicting preprint must produce a CANON_VALIDATION candidate routed
 * to the KG — never a curriculum mutation — and a valid KUEPER outbox
 * envelope. SSF-internal candidates emit no envelope.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { validateEnvelope } from '../../lib/research-watch/envelope';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

const CONTRADICTING_PREPRINT = work({
  raw_id: 'fx-grav-balloon',
  title: 'High-altitude balloon measurements suggest altitude-dependent deviation from universal mass attraction',
  identifiers: { arxiv: '2501.09876v2' },
  publication_status: 'preprint',
  relation_hints: [{ relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:001' }],
});

const CONFIRMING_STUDY = work({
  raw_id: 'fx-grav-confirms',
  title: 'Precision classroom measurement of local gravitational acceleration',
  identifiers: { doi: '10.2401/ssf.2026.grav-dup' },
  relation_hints: [{ relation: 'confirms', target: 'CLM:SSF:PHY:GRAVITY:002' }],
});

test('contradicting preprint promotes to CANON_VALIDATION, preprint status preserved', async () => {
  const store = new MemoryEvidenceStore();
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: { stubA: stubAdapter([CONTRADICTING_PREPRINT]) },
    now: FIXED_NOW,
    parentTask: 'test-parent-task',
  });

  assert.equal(summary.candidates_created.length, 1);
  const pending = await store.listPendingCandidates();
  assert.equal(pending.length, 1);

  const candidate = pending[0];
  assert.equal(candidate.task_type, 'CANON_VALIDATION');
  assert.equal(candidate.payload.routing_target, 'KG');
  assert.deepEqual(candidate.payload.affected_claims, ['CLM:SSF:PHY:GRAVITY:001']);
  assert.equal(candidate.cost_policy, 'prefer_off_peak', 'preprint review is deferred, not urgent');

  const evidence = await store.findByIdentityKeys(['arxiv:2501.09876v2']);
  assert.ok(evidence);
  assert.equal(evidence.publication_status, 'preprint', 'preprint status is preserved and visible');
  assert.equal(evidence.impact_class, 'CONTRADICTS');
});

test('CANON_VALIDATION candidate emits a valid KG outbox envelope', async () => {
  const outboxDir = await mkdtemp(join(tmpdir(), 'ssf-rw-outbox-'));
  try {
    const store = new MemoryEvidenceStore();
    const summary = await runResearchWatch({
      store,
      sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
      adapters: { stubA: stubAdapter([CONTRADICTING_PREPRINT]) },
      now: FIXED_NOW,
      outboxDir,
      parentTask: 'test-parent-task',
    });

    assert.equal(summary.envelopes.length, 1);
    const emission = summary.envelopes[0];
    assert.deepEqual(emission.errors, []);
    assert.ok(emission.file);

    const raw = await readFile(join(outboxDir, emission.file!), 'utf8');
    const envelope = JSON.parse(raw);
    assert.deepEqual(validateEnvelope(envelope), []);
    assert.equal(envelope.target, 'KG');
    assert.equal(envelope.parent_task, 'test-parent-task');
    assert.equal(envelope.depth, 1);
    assert.deepEqual(envelope.affects, ['KG', 'SSF']);
    assert.ok(envelope.title.includes('CANON') === false && envelope.title.length > 0);
    assert.match(envelope.requested_change, /source-of-truth/);
    assert.match(envelope.expected_result, /candidate/);
  } finally {
    await rm(outboxDir, { recursive: true, force: true });
  }
});

test('SSF-internal RESEARCH_DISCOVERY candidates emit no envelope', async () => {
  const store = new MemoryEvidenceStore();
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: { stubA: stubAdapter([CONFIRMING_STUDY]) },
    now: FIXED_NOW,
    outboxDir: '/nonexistent-should-not-be-touched',
    parentTask: 'test-parent-task',
  });

  assert.equal(summary.candidates_created.length, 1);
  assert.equal(summary.envelopes.length, 0, 'SSF-internal candidates stay in the SSF store');
});

test('cross-project emission without outbox dir is reported, never dropped silently', async () => {
  const store = new MemoryEvidenceStore();
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: { stubA: stubAdapter([CONTRADICTING_PREPRINT]) },
    now: FIXED_NOW,
    parentTask: 'test-parent-task',
  });

  assert.equal(summary.envelopes.length, 1);
  assert.equal(summary.envelopes[0].file, null);
  assert.deepEqual(summary.envelopes[0].errors, ['no outbox directory configured']);
});

test('envelope validation rejects bad targets, priorities and depths', () => {
  const valid = {
    target: 'KG',
    title: 't',
    reason: 'r',
    requested_change: 'c',
    expected_result: 'e',
    priority: 'medium',
    parent_task: 'p',
    depth: 1,
    affects: ['KG'],
  };
  assert.deepEqual(validateEnvelope(valid), []);
  assert.notDeepEqual(validateEnvelope({ ...valid, target: 'NOT-A-TARGET' }), []);
  assert.notDeepEqual(validateEnvelope({ ...valid, priority: 'urgentish' }), []);
  assert.notDeepEqual(validateEnvelope({ ...valid, depth: 4 }), []);
  assert.deepEqual(validateEnvelope({ ...valid, depth: 3 }), [], 'depth 3 is the maximum, still valid');
  assert.notDeepEqual(validateEnvelope({ ...valid, affects: [] }), []);
});
