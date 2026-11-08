import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';

const PATH_ID = 'PATH:SSF:PHY-DYNAMIK-0001';

test('dynamics foundations path is registered under its canonical KG module', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path, 'path must be registered');
  assert.equal(path.kxfModuleId, 'PHY-L1-000034');
  assert.equal(getRegisteredLearningPathForModule('PHY-L1-000034')?.id, PATH_ID);
  assert.deepEqual(path.domainsNeeded, ['KD:PHYS-MECH:N1']);
  const issues = learningPathRegistryIssues.filter((issue) => issue.pathIds?.includes(PATH_ID));
  assert.deepEqual(issues, [], JSON.stringify(issues, null, 2));
});

test('dynamics foundations path follows the author pattern', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path);
  assert.ok(path.units.length >= 4 && path.units.length <= 8, 'author guide: 4–8 units');
  const unitIds = new Set(path.units.map((unit) => unit.id));
  path.units.forEach((unit, index) => {
    const quizzes = unit.sections.filter((section) => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
    assert.ok(parseLearningQuiz(quizzes[0].summary), `${quizzes[0].id} must parse`);
    assert.ok(unit.sections.some((section) => section.kind === 'observation'), `${unit.id} needs an observation`);
    assert.ok(unit.sections.some((section) => section.kind === 'exercise' && section.solution), `${unit.id} needs a solved exercise`);
    if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
    else assert.equal(unit.gate, undefined);
  });
  for (const id of path.suppliedBy.knowledgeGraph.filter((ref) => ref.startsWith('CON:'))) {
    assert.match(id, /^CON:L1:[a-z0-9-]+$/);
  }
});

test('crank train path names the dynamics module as KG prerequisite', () => {
  const crank = getRegisteredLearningPathById('PATH:SSF:ENG-KURBELTRIEB-0001');
  assert.ok(crank);
  assert.ok(crank.suppliedBy.knowledgeGraph.includes('PHY-L1-000034'));
});
