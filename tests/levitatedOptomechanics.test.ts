import test from 'node:test';
import assert from 'node:assert/strict';
import { getModuleById } from '../lib/modules';

test('levitated optomechanics lesson has valid exercises without unlocks', () => {
 const module = getModuleById('SSF-PHY-LEVITATION-2026');
 assert.ok(module);
 assert.equal(module.exercises.length, 4);
 assert.deepEqual(module.exercises.map(x => x.correctOption), [0, 1, 2, 1]);
 for (const e of module.exercises) { assert.equal(e.options.length, 4); assert.equal(e.type, 'single_choice'); }
 assert.deepEqual(module.unlocks, []);
 assert.equal(module.source.authority, 'DOC:KUE:KUE-SCI-0201-2026-DE');
});
