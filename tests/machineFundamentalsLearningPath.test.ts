import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';

const SERIES = [
  { pathId: 'PATH:SSF:ENG-KOLBENMASCHINEN-PROZESS-0001', moduleId: 'SSF-ENG-KOLBENMASCHINEN-PROZESS-0001' },
  { pathId: 'PATH:SSF:ENG-KURBELTRIEB-0001', moduleId: 'SSF-ENG-KURBELTRIEB-0001' },
];

for (const entry of SERIES) {
  test(`${entry.pathId} is registered and resolvable via its SSF module id`, () => {
    const path = getRegisteredLearningPathById(entry.pathId);
    assert.ok(path, 'path must be registered');
    assert.equal(path.status, 'prototype', 'stays prototype until KG returns canonical ids');
    assert.equal(getRegisteredLearningPathForModule(entry.moduleId)?.id, entry.pathId);
    assert.ok(path.domainsNeeded.every((domain) => domain.startsWith('KD:')));
    const issues = learningPathRegistryIssues.filter((issue) => issue.pathIds?.includes(entry.pathId));
    assert.deepEqual(issues, [], JSON.stringify(issues, null, 2));
  });

  test(`${entry.pathId} follows the engineering author pattern`, () => {
    const path = getRegisteredLearningPathById(entry.pathId);
    assert.ok(path);
    assert.ok(path.units.length >= 4 && path.units.length <= 8, 'author guide: 4–8 units');
    const unitIds = new Set(path.units.map((unit) => unit.id));
    path.units.forEach((unit, index) => {
      const quizzes = unit.sections.filter((section) => section.kind === 'quiz');
      assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
      assert.ok(parseLearningQuiz(quizzes[0].summary), `${quizzes[0].id} must parse`);
      assert.ok(unit.sections.some((section) => section.kind === 'observation'), `${unit.id} needs an observation`);
      assert.ok(unit.sections.some((section) => section.kind === 'exercise' && section.solution), `${unit.id} needs a solved exercise`);
      assert.ok(unit.entryQuestion && unit.takeaway, `${unit.id} needs entry question and takeaway`);
      if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
      else assert.equal(unit.gate, undefined);
    });
  });

  test(`${entry.pathId} uses layer-form concept candidates (KG-0027)`, () => {
    const path = getRegisteredLearningPathById(entry.pathId);
    assert.ok(path);
    const conceptRefs = path.suppliedBy.knowledgeGraph
      .map((ref) => ref.replace(/^Kandidat /, ''))
      .filter((ref) => ref.startsWith('CON:'));
    assert.ok(conceptRefs.length > 0);
    for (const id of conceptRefs) assert.match(id, /^CON:L[0-9]:[a-z0-9-]+$/, `${id} must use CON:<LAYER>:<slug>`);
  });
}

test('the two Maschinenkunde modules do not share units or concept candidates', () => {
  const [first, second] = SERIES.map((entry) => getRegisteredLearningPathById(entry.pathId));
  assert.ok(first && second);
  const firstUnits = new Set(first.units.map((unit) => unit.id));
  assert.ok(second.units.every((unit) => !firstUnits.has(unit.id)));
  const candidates = (path: typeof first) => path.suppliedBy.knowledgeGraph.filter((ref) => ref.startsWith('Kandidat '));
  const firstCandidates = new Set(candidates(first));
  assert.ok(candidates(second).every((ref) => !firstCandidates.has(ref)));
});

test('the merged v0.1.0 prototype path is gone', () => {
  assert.equal(getRegisteredLearningPathById('PATH:SSF:ENG-MASCHINENKUNDE-0001'), null);
});
