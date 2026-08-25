/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/registries.test.ts
 * Name:      research-watch - registry governance tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/topics.ts, lib/research-watch/sources.ts
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getWatchTopics, getActiveWatchTopics, watchScopeGap } from '../../lib/research-watch/topics';
import { getWatchSources, getEnabledWatchSources } from '../../lib/research-watch/sources';
import { getDefaultAdapters } from '../../lib/research-watch/adapters';

test('topic registry is valid and covers the current module scope', () => {
  const topics = getWatchTopics();
  assert.ok(topics.length >= 5, 'expected a registry with several topics');

  const ids = topics.map((topic) => topic.id);
  assert.equal(new Set(ids).size, ids.length, 'topic ids must be unique');

  for (const topic of topics) {
    assert.ok(topic.keywords.length > 0, `topic ${topic.id} has keywords`);
    assert.ok(topic.modules.length > 0, `topic ${topic.id} is derived from modules`);
    for (const claim of topic.canon_claims) {
      assert.ok(claim.text.length > 0, `claim ${claim.id} has text`);
      assert.ok(claim.sources.length > 0, `claim ${claim.id} has sources`);
    }
  }

  assert.deepEqual(watchScopeGap(topics), [], 'every current SSF module must be covered by a topic');
  assert.equal(getActiveWatchTopics().length, topics.length);
});

test('source registry is valid, explicit and adapter-resolvable', () => {
  const sources = getWatchSources();
  assert.ok(sources.length >= 3);

  const adapters = getDefaultAdapters();
  for (const source of sources) {
    assert.ok(source.coverage_note.length > 0, `source ${source.id} has an explicit coverage note`);
    assert.ok(adapters[source.adapter], `source ${source.id} adapter "${source.adapter}" is resolvable`);
    assert.ok(source.cadence_hours > 0, `source ${source.id} has a cadence`);
  }

  const classes = new Set(sources.map((source) => source.source_class));
  assert.ok(classes.has('primary-literature'), 'registry must include a primary-literature source');
  assert.ok(classes.has('authoritative-agency'), 'registry must include an authoritative-agency source');

  const enabled = getEnabledWatchSources();
  assert.ok(enabled.length >= 1, 'at least the deterministic fixture source is enabled');
  for (const source of enabled) {
    assert.equal(source.enabled, true);
  }
});

test('no provider or model identity is hard-coded in adapter resolution', () => {
  // Adapters are resolved purely by config key; the registry must not carry
  // model/provider-specific configuration inside the engine defaults.
  const sources = getWatchSources();
  for (const source of sources) {
    for (const key of Object.keys(source.config ?? {})) {
      assert.ok(['feed_url', 'env_feed_url'].includes(key), `source ${source.id} has unexpected config key ${key}`);
    }
  }
});
