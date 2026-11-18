import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule, learningPathRegistryIssues } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { CARD_PROBABILITY_EVIDENCE, PLAYING_CARDS_HISTORY_EVIDENCE, SKAT_ARITHMETIC_EVIDENCE } from '../lib/learningPaths/playingCards';

// Reihe „Am Kartentisch“ (18.11.2026): Lernpfade zu den Kartenspielen in noχ¹ᐃ.
const PATHS = [
  { id: 'PATH:SSF:HIS-SPIELKARTEN-0001', module: 'SSF-HIS-3101', evidence: PLAYING_CARDS_HISTORY_EVIDENCE, minKg: 8 },
  { id: 'PATH:SSF:MAT-KARTEN-WAHRSCHEINLICHKEIT-0001', module: 'SSF-MAT-2201', evidence: CARD_PROBABILITY_EVIDENCE, minKg: 5 },
  { id: 'PATH:SSF:MAT-SKAT-RECHNEN-0001', module: 'SSF-MAT-2202', evidence: SKAT_ARITHMETIC_EVIDENCE, minKg: 4 },
];

for (const spec of PATHS) {
  test(`${spec.id} is registered under its own module id`, () => {
    const path = getRegisteredLearningPathById(spec.id);
    assert.ok(path, 'path must be registered');
    assert.equal(path.sourceModuleId, spec.module);
    assert.equal(getRegisteredLearningPathForModule(spec.module)?.id, spec.id);
    assert.ok(path.domainsNeeded.every(domain => domain.startsWith('KD:')));
    assert.equal(learningPathRegistryIssues.filter(issue => issue.pathIds?.includes(spec.id)).length, 0, 'no registry issues');
  });

  test(`${spec.id} follows the author guide`, () => {
    const path = getRegisteredLearningPathById(spec.id);
    assert.ok(path);
    assert.ok(path.units.length >= 4 && path.units.length <= 8);
    const unitIds = new Set(path.units.map(unit => unit.id));
    path.units.forEach((unit, index) => {
      const quizzes = unit.sections.filter(section => section.kind === 'quiz');
      assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
      const parsed = parseLearningQuiz(quizzes[0].summary);
      assert.ok(parsed && parsed.length === 3, `${quizzes[0].id} must parse to three questions`);
      assert.ok(unit.sections.some(section => section.kind === 'observation'), `${unit.id} needs an observation`);
      assert.ok(unit.sections.some(section => section.kind === 'exercise' && section.solution), `${unit.id} needs an exercise with solution`);
      if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
      else assert.equal(unit.gate, undefined);
    });
    assert.ok(path.suppliedBy.knowledgeGraph.length >= spec.minKg, 'linked to knowledge graph ids');
    assert.ok(!JSON.stringify(path).includes('—'), 'house rule: en dash only');
  });

  test(`${spec.id} evidence levels: only existing sections, exercises are reconstructions`, () => {
    const path = getRegisteredLearningPathById(spec.id);
    assert.ok(path);
    const sections = new Map(path.units.flatMap(unit => unit.sections).map(section => [section.id, section]));
    for (const [id, level] of Object.entries(spec.evidence)) {
      const section = sections.get(id);
      assert.ok(section, `${id} must exist`);
      assert.equal(section.evidence, level);
      if (section.kind === 'exercise') assert.equal(level, 'rekonstruktion', `${id} is an exercise and must be rekonstruktion`);
    }
  });
}
