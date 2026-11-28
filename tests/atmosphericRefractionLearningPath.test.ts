import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { ATMOSPHERIC_REFRACTION_PATH_ID } from '../lib/learningPaths/atmosphericRefraction';

test('refraction path uses the canonical KG identities (EXT-KG-SSF-20261023-REFRACTION)', () => {
  const path = getRegisteredLearningPathById(ATMOSPHERIC_REFRACTION_PATH_ID);
  assert.ok(path, 'path must be registered');
  assert.equal(path.kxfModuleId, 'PHY-L1-000030');
  assert.equal(path.sourceModuleId, 'PHY-L1-000030');
  assert.equal(getRegisteredLearningPathForModule('PHY-L1-000030')?.id, ATMOSPHERIC_REFRACTION_PATH_ID);
  assert.deepEqual(path.domainsNeeded, ['KD:PHYS:N1']);
  for (const id of ['PHY-L1-000003', 'CON:L1:atmosphaerische-refraktion', 'MOD:L2:bennett-atmosphaerische-refraktion']) {
    assert.ok(path.suppliedBy.knowledgeGraph.includes(id), `${id} must be consumed from KG`);
  }
  const issues = learningPathRegistryIssues.filter((issue) => issue.pathIds?.includes(ATMOSPHERIC_REFRACTION_PATH_ID));
  assert.deepEqual(issues, [], JSON.stringify(issues, null, 2));
});

test('refraction path does not introduce parallel identities', () => {
  // PHY-L1-000004 is the KG water-phase module; the draft IDs from PR #60 must not resolve to refraction.
  assert.notEqual(getRegisteredLearningPathForModule('PHY-L1-000004')?.id, ATMOSPHERIC_REFRACTION_PATH_ID);
  assert.equal(getRegisteredLearningPathForModule('SSF-PHY-HORIZON-REFRACTION-0001'), null);
  assert.equal(getRegisteredLearningPathForModule('LRN:SSF:PHY-HORIZON-REFRACTION-0001'), null);
});

test('refraction path follows the author pattern and marks model limits', () => {
  const path = getRegisteredLearningPathById(ATMOSPHERIC_REFRACTION_PATH_ID);
  assert.ok(path);
  assert.ok(path.units.length >= 4 && path.units.length <= 8, 'author guide: 4–8 units');
  const unitIds = new Set(path.units.map((unit) => unit.id));
  path.units.forEach((unit, index) => {
    const quizzes = unit.sections.filter((section) => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
    assert.equal(parseLearningQuiz(quizzes[0].summary)?.length, 3, `${quizzes[0].id} must parse with 3 questions`);
    assert.ok(unit.sections.some((section) => section.kind === 'observation'), `${unit.id} needs an observation`);
    assert.ok(unit.sections.some((section) => section.kind === 'exercise' && section.solution), `${unit.id} needs a solved exercise`);
    if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
    else assert.equal(unit.gate, undefined);
  });
  const text = path.units.flatMap((unit) => unit.sections.map((section) => section.summary)).join('\n');
  assert.match(text, /Modellwert|Modellergebnis/, 'model output must not be presented as measurement');
  assert.match(text, /Inversion/);
  assert.match(text, /Luftspiegelung/);
  const sim = path.units.flatMap((unit) => unit.sections).find((section) => section.id === 'SIM:REFRAKTION:NOXIA-DEMONSTRATOR');
  assert.ok(sim && /Ohne Simulator/.test(sim.summary), 'SSF keeps a fallback without the NOXIA simulator');
});
