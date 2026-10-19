import assert from 'node:assert/strict';
import test from 'node:test';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule } from '../lib/learningPathRegistry';
import { parseLearningQuiz } from '../lib/learningQuiz';

const SERIES = [
  { pathId: 'PATH:SSF:TEC-GROMA-0001', moduleId: 'TEC-L1-000001', concept: 'CON:L1:groma', images: ['/images/diagrams/groma-aufbau.svg'] },
  { pathId: 'PATH:SSF:TEC-HOEHEN-0001', moduleId: 'TEC-L1-000002', concept: 'CON:L1:nivellement', images: ['/images/diagrams/nivellement.svg'] },
  { pathId: 'PATH:SSF:TEC-TRIANGULATION-0001', moduleId: 'TEC-L2-000001', concept: 'CON:L1:triangulation', images: ['/images/diagrams/schattenmessung.svg', '/images/diagrams/triangulation.svg'] },
  { pathId: 'PATH:SSF:AST-SONNENUHR-0001', moduleId: 'AST-L1-000002', concept: 'CON:L1:sonnenuhr', images: ['/images/diagrams/indischer-kreis.svg', '/images/diagrams/eratosthenes.svg'] },
  { pathId: 'PATH:SSF:TEC-ASIEN-ORIENT-0001', moduleId: 'TEC-L2-000002', concept: 'CON:L1:doppelte-differenz', images: ['/images/diagrams/liu-hui-insel.svg', '/images/diagrams/biruni-erdradius.svg'] },
];

for (const entry of SERIES) {
  test(`${entry.pathId} is registered under its canonical KG module`, () => {
    const path = getRegisteredLearningPathById(entry.pathId);
    assert.ok(path, 'path must be registered');
    assert.equal(path.sourceModuleId, entry.moduleId);
    assert.equal(getRegisteredLearningPathForModule(entry.moduleId)?.id, path.id);
    assert.ok(path.suppliedBy.knowledgeGraph.includes(entry.concept));
    assert.ok(path.domainsNeeded.every(domain => domain.startsWith('KD:')));
    assert.ok(path.suppliedBy.kueperCom.includes('DOC:KUE:KUE-HIS-0001-2026-DE'), 'links the historical foundation');
  });

  test(`${entry.pathId} has parsable quizzes, solved exercises, practice and chained gates`, () => {
    const path = getRegisteredLearningPathById(entry.pathId);
    assert.ok(path);
    assert.ok(path.units.length >= 4 && path.units.length <= 8, 'author guide: 4–8 units');
    const unitIds = new Set(path.units.map(unit => unit.id));
    path.units.forEach((unit, index) => {
      const quizzes = unit.sections.filter(section => section.kind === 'quiz');
      assert.equal(quizzes.length, 1, `${unit.id} needs exactly one quiz`);
      assert.ok(parseLearningQuiz(quizzes[0].summary), `${quizzes[0].id} must parse`);
      assert.ok(unit.sections.some(section => section.kind === 'observation'), `${unit.id} needs an observation`);
      if (index < path.units.length - 1) assert.ok(unit.gate?.unlocksUnitId && unitIds.has(unit.gate.unlocksUnitId));
      else assert.equal(unit.gate, undefined);
    });
    const sections = path.units.flatMap(unit => unit.sections);
    assert.ok(sections.some(section => section.kind === 'exercise' && section.solution), 'needs an exercise with solution');
    assert.ok(sections.some(section => section.kind === 'exercise' && section.title.startsWith('Praxis:')), 'needs a practical task');
    const images = sections.map(section => section.image?.src).filter(Boolean);
    for (const src of entry.images) assert.ok(images.includes(src), `${src} must be shown`);
  });
}
