import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';

const PATH_ID = 'PATH:SSF:ENG-MASCHINENKUNDE-0001';

test('Maschinenkunde path is registered and resolvable via its SSF module id', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path, 'path must be registered');
  assert.equal(path.status, 'prototype', 'stays prototype until KG returns canonical ids');
  assert.equal(getRegisteredLearningPathForModule('SSF-ENG-MASCHINENKUNDE-0001')?.id, PATH_ID);
  assert.ok(path.domainsNeeded.every((domain) => domain.startsWith('KD:')));
  const issues = learningPathRegistryIssues.filter((issue) => issue.pathIds?.includes(PATH_ID));
  assert.deepEqual(issues, [], JSON.stringify(issues, null, 2));
});

test('Maschinenkunde path follows the engineering author pattern', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path);
  assert.ok(path.units.length >= 4 && path.units.length <= 8, 'author guide: 4–8 units');
  const unitIds = new Set(path.units.map((unit) => unit.id));
  path.units.forEach((unit, index) => {
    const quizzes = unit.sections.filter((section) => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
    const parsed = parseLearningQuiz(quizzes[0].summary);
    assert.ok(parsed, `${quizzes[0].id} must parse`);
    assert.ok(unit.sections.some((section) => section.kind === 'observation'), `${unit.id} needs an observation`);
    assert.ok(unit.sections.some((section) => section.kind === 'exercise' && section.solution), `${unit.id} needs a solved exercise`);
    assert.ok(unit.entryQuestion && unit.takeaway, `${unit.id} needs entry question and takeaway`);
    if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
    else assert.equal(unit.gate, undefined);
  });
});

test('Maschinenkunde candidates use the layer form required by KG-0027', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path);
  const conceptRefs = path.suppliedBy.knowledgeGraph
    .map((entry) => entry.replace(/^Kandidat /, ''))
    .filter((entry) => entry.startsWith('CON:'));
  assert.ok(conceptRefs.length > 0);
  for (const id of conceptRefs) assert.match(id, /^CON:L[0-9]:[a-z0-9-]+$/, `${id} must use CON:<LAYER>:<slug>`);
});
