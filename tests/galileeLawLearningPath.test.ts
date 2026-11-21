import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { GALILEE_LAW_SECTION_EVIDENCE } from '../lib/learningPaths/galileeLawPower';

const PATH_ID = 'PATH:SSF:HIS-RECHT-MACHT-GALILAEA-30-0001';

test('galilee law path is registered under its own module id', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path, 'path must be registered');
  assert.equal(path.sourceModuleId, 'SSF-HIS-3003');
  assert.equal(getRegisteredLearningPathForModule('SSF-HIS-3003')?.id, PATH_ID);
  assert.ok(path.domainsNeeded.every(domain => domain.startsWith('KD:')));
  assert.equal(learningPathRegistryIssues.filter(issue => issue.pathIds?.includes(PATH_ID)).length, 0, 'no registry issues');
});

test('galilee law path follows the author guide: observations, parsable quizzes, chained gates, exercises, KG links', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path);
  assert.ok(path.units.length >= 4 && path.units.length <= 8);
  const unitIds = new Set(path.units.map(unit => unit.id));
  path.units.forEach((unit, index) => {
    const quizzes = unit.sections.filter(section => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
    const parsed = parseLearningQuiz(quizzes[0].summary);
    assert.ok(parsed && parsed.length === 3, `${quizzes[0].id} must parse to three questions`);
    assert.ok(unit.sections.some(section => section.kind === 'observation'), `${unit.id} needs an observation`);
    if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
    else assert.equal(unit.gate, undefined);
  });
  const sections = path.units.flatMap(unit => unit.sections);
  assert.ok(path.suppliedBy.knowledgeGraph.length >= 5, 'linked to knowledge graph ids');
  assert.ok(sections.some(section => section.kind === 'exercise' && section.solution), 'needs an exercise with solution');
  assert.ok(path.units.every(unit => unit.sections.some(section => section.kind === 'exercise' && section.solution)), 'every unit has an exercise with solution');
  assert.ok(path.suppliedBy.knowledgeGraph.some(id => id.startsWith('DOC:L1:zolltarif')) && path.suppliedBy.knowledgeGraph.some(id => id.startsWith('OBJ:L1:ostrakon')), 'neighbour evidence from the roemischer-osten shard');
});

test('evidence levels: only existing sections, practice never as source finding', () => {
  const path = getRegisteredLearningPathById(PATH_ID);
  assert.ok(path);
  const sections = new Map(path.units.flatMap(unit => unit.sections).map(section => [section.id, section]));
  for (const [id, level] of Object.entries(GALILEE_LAW_SECTION_EVIDENCE)) {
    const section = sections.get(id);
    assert.ok(section, `${id} must exist`);
    assert.equal(section.evidence, level);
    if (section.kind === 'exercise') assert.equal(level, 'rekonstruktion', `${id} is an exercise and must be rekonstruktion`);
  }
});
