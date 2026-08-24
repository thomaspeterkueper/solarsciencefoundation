/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/classification.test.ts
 * Name:      research-watch - relevance and impact classification tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/impact.ts, lib/research-watch/relevance.ts
 *
 * Includes the required deterministic no-impact classification fixture:
 * a relevant publication that justifies no SSF/KG learning change.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { getActiveWatchTopics } from '../../lib/research-watch/topics';
import { classifyImpact } from '../../lib/research-watch/impact';
import { scoreRelevance } from '../../lib/research-watch/relevance';
import { FIXED_NOW, makeSource, stubAdapter, work } from './helpers';

const topics = getActiveWatchTopics();

function classify(workInput: Parameters<typeof classifyImpact>[0]) {
  const relevance = scoreRelevance(workInput, topics);
  return { relevance, impact: classifyImpact(workInput, topics, relevance) };
}

test('no-impact classification: relevant work with explicit no_relation hint', () => {
  const result = classify(
    work({
      raw_id: 'fx-grav-classroom',
      title: 'A lecture-hall demonstration of free fall reproduces textbook fall behaviour',
      identifiers: { doi: '10.2401/ssf.2026.grav-classroom' },
      relation_hints: [{ relation: 'no_relation', target: 'CLM:SSF:PHY:GRAVITY:002' }],
    })
  );
  assert.ok(result.relevance.score >= 0.5, 'work is relevant to the gravity topic');
  assert.deepEqual(result.relevance.matched_topics, ['TOP:SSF:PHY:GRAVITY']);
  assert.equal(result.impact.impact_class, 'NO_IMPACT');
  assert.equal(result.impact.triage_note, 'relevant_no_change');
  assert.equal(result.impact.classification, 'deterministic');
});

test('no-impact classification: out-of-scope work is retained as evidence, not promoted', async () => {
  const store = new MemoryEvidenceStore();
  const summary = await runResearchWatch({
    store,
    sources: [makeSource('SSF-SRC-TEST-A', 'stubA')],
    adapters: {
      stubA: stubAdapter([
        work({
          raw_id: 'fx-alpine',
          title: 'Chlorophyll fluorescence in alpine meadows',
          identifiers: { doi: '10.2401/ssf.2026.alpine-chlorophyll' },
        }),
      ]),
    },
    now: FIXED_NOW,
  });

  assert.equal(summary.candidates_created.length, 0);
  assert.equal(summary.new_evidence_ids.length, 1, 'negative classification is retained');

  const evidence = await store.findByIdentityKeys(['doi:10.2401/ssf.2026.alpine-chlorophyll']);
  assert.ok(evidence);
  assert.equal(evidence.impact_class, 'NO_IMPACT');
  assert.equal(evidence.relevance, 0);
  assert.equal(evidence.triage_note, 'out_of_scope');
});

test('contradicting preprint classifies CONTRADICTS with deterministic confidence', () => {
  const result = classify(
    work({
      raw_id: 'fx-grav-balloon',
      title: 'High-altitude balloon measurements suggest altitude-dependent deviation from universal mass attraction',
      identifiers: { arxiv: '2501.09876v2' },
      publication_status: 'preprint',
      relation_hints: [{ relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:001' }],
    })
  );
  assert.equal(result.impact.impact_class, 'CONTRADICTS');
  assert.deepEqual(result.impact.affected_claims, ['CLM:SSF:PHY:GRAVITY:001']);
  assert.equal(result.impact.classification, 'deterministic');
});

test('retraction is never auto-accepted: parks for review with immediate cost', () => {
  const result = classify(
    work({
      raw_id: 'fx-insight-retraction',
      title: 'Retraction: InSight-based claim of missing marsquake seasonality',
      identifiers: { doi: '10.2401/ssf.2026.insight-seas' },
      evidence_type: 'retraction',
      publication_status: 'retracted',
    })
  );
  assert.equal(result.impact.impact_class, 'UNCERTAIN');
  assert.equal(result.impact.triage_note, 'retraction_review');
  assert.equal(result.impact.cost_policy, 'immediate', 'retraction touching a watched topic is urgent');
  assert.deepEqual(result.impact.affected_topics, ['TOP:SSF:EAR:SEISMOLOGY']);
});

test('conflicting relation hints park as UNCERTAIN, never reconciled by prose', () => {
  const result = classify(
    work({
      raw_id: 'fx-g-tension',
      title: 'Tension between local and cosmological measurements of the gravitational constant',
      identifiers: { doi: '10.2401/ssf.2026.g-tension' },
      relation_hints: [
        { relation: 'confirms', target: 'CLM:SSF:PHY:GRAVITY:001' },
        { relation: 'contradicts', target: 'CLM:SSF:PHY:GRAVITY:002' },
      ],
    })
  );
  assert.equal(result.impact.impact_class, 'UNCERTAIN');
  assert.equal(result.impact.triage_note, 'conflicting_hints');
});

test('works without structured hints require deferred semantic review', () => {
  const result = classify(
    work({
      raw_id: 'fx-no-hints',
      title: 'A new observational study of gravitational lensing around galaxy clusters',
      identifiers: { doi: '10.2401/ssf.2026.lensing' },
      publication_status: 'preprint',
    })
  );
  assert.equal(result.impact.impact_class, 'UNCERTAIN');
  assert.equal(result.impact.triage_note, 'semantic_review_required');
  assert.equal(result.impact.classification, 'semantic_required');
  assert.equal(result.impact.cost_policy, 'prefer_off_peak', 'semantic review is deferred off-peak');
});

test('introduces hint classifies NEW with the affected topic', () => {
  const result = classify(
    work({
      raw_id: 'fx-exo-resonance',
      title: 'First orbital resonance census of compact multiplanet systems',
      identifiers: { doi: '10.2401/ssf.2026.exo-resonance' },
      relation_hints: [{ relation: 'introduces', target: 'TOP:SSF:AST:PLANETOLOGY' }],
    })
  );
  assert.equal(result.impact.impact_class, 'NEW');
  assert.deepEqual(result.impact.affected_topics, ['TOP:SSF:AST:PLANETOLOGY']);
  assert.ok(result.impact.affected_claims.includes('CLM:SSF:AST:PLANET:001'));
});
