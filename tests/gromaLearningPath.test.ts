import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';

test('Groma path is registered under its canonical KG module', () => {
  const path = getRegisteredLearningPathById('PATH:SSF:TEC-GROMA-0001');
  assert.ok(path, 'groma path must be registered');
  assert.equal(path.sourceModuleId, 'TEC-L1-000001');
  assert.equal(getRegisteredLearningPathForModule('TEC-L1-000001')?.id, path.id);
  assert.ok(path.suppliedBy.knowledgeGraph.includes('CON:L1:groma'));
  assert.ok(path.domainsNeeded.every(domain => domain.startsWith('KD:')));
});

test('Groma path quizzes parse and gates chain through all units', () => {
  const path = getRegisteredLearningPathById('PATH:SSF:TEC-GROMA-0001');
  assert.ok(path);
  const unitIds = new Set(path.units.map(unit => unit.id));
  path.units.forEach((unit, index) => {
    const quizzes = unit.sections.filter(section => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
    assert.ok(parseLearningQuiz(quizzes[0].summary), `${quizzes[0].id} must parse`);
    assert.ok(unit.sections.some(section => section.kind === 'observation'), `${unit.id} needs an observation`);
    if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
    else assert.equal(unit.gate, undefined);
  });
  assert.ok(path.units.some(unit => unit.sections.some(section => section.image?.src === '/images/diagrams/groma-aufbau.svg')));
});
