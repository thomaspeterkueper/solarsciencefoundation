import assert from 'node:assert/strict';
import test from 'node:test';
import { everydayHealthTopics, getEverydayHealthTopic } from '../lib/health/everydayHealth';
test('six everyday health areas include provenance without clinical game bonuses', () => {
  assert.equal(new Set(everydayHealthTopics.map(t => t.area)).size,6);
  assert.equal(new Set(everydayHealthTopics.map(t => t.key)).size,everydayHealthTopics.length);
  for(const topic of everydayHealthTopics) {
    assert.equal(topic.gameEffect,'dialogue-and-learning-only');
    assert.ok(topic.sourceUrls.every(s=>s.startsWith('https://')));
    assert.equal(getEverydayHealthTopic(topic.key),topic);
  }
  assert.equal(getEverydayHealthTopic('not-found'),undefined);
});
