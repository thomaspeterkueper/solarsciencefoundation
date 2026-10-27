import test from 'node:test';
import assert from 'node:assert/strict';
import { getModuleById, learningModules } from '../lib/modules';

const ID = 'SSF-PHY-GOLD-2026';

test('gold module provides four well-formed science questions', () => {
  const module = getModuleById(ID);
  assert.ok(module);
  assert.equal(learningModules.filter((m) => m.id === ID).length, 1);
  assert.equal(module.exercises.length, 4);
  for (const item of module.exercises) {
    assert.equal(item.type, 'single_choice');
    assert.equal(item.options.length, 4);
    assert.ok(Number.isInteger(item.correctOption));
    assert.ok(item.correctOption >= 0 && item.correctOption < item.options.length);
    assert.ok(item.options[item.correctOption].length > 0);
  }
  assert.deepEqual(module.exercises.map((x) => x.correctOption), [0, 0, 1, 2]);
});

test('gold module cites its KUE science document and KG concepts', () => {
  const module = getModuleById(ID);
  assert.ok(module);
  assert.equal(module.source.authority, 'DOC:KUE:KUE-SCI-0100-2026-DE');
  assert.deepEqual(module.source.kxfEntityIds, [
    'CON:NUC:mercury-198',
    'CON:NUC:mercury-197',
    'CON:NUC:gold-197',
    'CON:NUC:mercury-gold-transmutation'
  ]);
});

test('unregistered canonical ID cannot grant a game unlock', () => {
  const module = getModuleById(ID);
  assert.ok(module);
  assert.deepEqual(module.unlocks, []);
});
