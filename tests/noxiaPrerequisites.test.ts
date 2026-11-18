import assert from 'node:assert/strict';
import test from 'node:test';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { pathAssessment } from '../lib/learningPathAssessment';
import {
  getRegisteredLearningPathForModule,
  learningPathRegistryIssues,
  registeredLearningPaths,
} from '../lib/learningPathRegistry';

/** Freischaltungen, die NOXIA verlangt (EXT-NOXIA-SSF-20261029-learning-prerequisites), je Modulkennung. */
const REQUIRED_UNLOCKS: Array<{ ids: string[]; unlock: string }> = [
  { ids: ['LRN:SSF:ECO-L0-000001', 'ECO-L0-000001'], unlock: 'UNL:NOX:bank-credit' },
  { ids: ['LRN:SSF:ECO-L0-000002', 'ECO-L0-000002'], unlock: 'UNL:NOX:bank-compound' },
  { ids: ['LRN:SSF:ECO-L0-000003', 'ECO-L0-000003'], unlock: 'UNL:NOX:bank-collateral' },
  { ids: ['LRN:SSF:ECO-L1-000001', 'ECO-L1-000001'], unlock: 'UNL:NOX:advanced-trading' },
  { ids: ['LRN:SSF:ECO-L1-000002', 'ECO-L1-000002'], unlock: 'UNL:NOX:land-value' },
  { ids: ['LRN:SSF:NOX-SMELTING', 'SSF-NOX-SMELTING-0001'], unlock: 'UNL:NOX:smelting' },
  { ids: ['LRN:SSF:NOX-ROBOT-FABRICATION', 'SSF-NOX-ROBOT-FABRICATION-0001'], unlock: 'UNL:NOX:ENG:ROBOT-FABRICATION' },
  { ids: ['LRN:SSF:NOX-PRECISION-INSTRUMENTATION', 'SSF-NOX-PRECISION-INSTRUMENTATION-0001'], unlock: 'UNL:NOX:ENG:PRECISION-INSTRUMENTATION' },
  { ids: ['LRN:SSF:MAT-L0-000003', 'MAT-L0-000003'], unlock: 'UNL:NOX:NAV:CURVATURE' },
  { ids: ['LRN:SSF:BIO-L2-000003', 'BIO-L2-000003'], unlock: 'UNL:NOX:research:magnetobiology-experiment-design' },
];

test('NOXIA-Freischaltungen sind über KXF- und Legacy-Kennung auflösbar', () => {
  for (const { ids, unlock } of REQUIRED_UNLOCKS) {
    for (const id of ids) {
      const path = getRegisteredLearningPathForModule(id);
      assert.ok(path, `${id} muss auf genau einen Lernpfad auflösen`);
      assert.ok(path.unlocks.includes(unlock), `${id} muss ${unlock} liefern, liefert ${JSON.stringify(path.unlocks)}`);
    }
  }
});

test('neue NOXIA-Voraussetzungsmodule haben Kurztests mit Erklärung je Frage', () => {
  for (const { ids } of REQUIRED_UNLOCKS) {
    const path = getRegisteredLearningPathForModule(ids[0])!;
    const quizzes = path.units.flatMap((unit) => unit.sections.filter((section) => section.kind === 'quiz'));
    assert.ok(quizzes.length > 0, `${path.id} braucht mindestens einen Kurztest`);
    for (const section of quizzes) {
      const quiz = parseLearningQuiz(section.summary);
      assert.ok(quiz, `${section.id} muss ein gültiges Kurztest-Format haben`);
      // Kredit/Zinseszins tragen noch Alt-Kurztests ohne Erklärung; alle neuen Module nicht.
      if (!/^PATH:SSF:ECO-(KREDIT|ZINSESZINS)-NOXIA-0001$/.test(path.id)) {
        for (const question of quiz) assert.ok(question.explanation, `${section.id}: Frage ohne Erklärung`);
      }
    }
  }
});

test('Registry bleibt ohne Identitätskonflikte', () => {
  const blockers = learningPathRegistryIssues.filter((issue) =>
    ['duplicate_path_id', 'duplicate_source_module_id', 'duplicate_kxf_module_id', 'duplicate_learning_object_id', 'broken_unit_gate', 'broken_alias_target', 'ambiguous_module_mapping', 'legacy_domain_reference'].includes(issue.type),
  );
  assert.deepEqual(blockers, [], JSON.stringify(blockers, null, 2));
  assert.ok(registeredLearningPaths.length > 0);
});

test('Abschnitt G: Bahnkrümmung und Magnetobiologie liefern exakt die NOXIA-Kennungen mit Prüfung', () => {
  const cases: Array<{ id: string; unlock: string }> = [
    { id: 'MAT-L0-000003', unlock: 'UNL:NOX:NAV:CURVATURE' },
    { id: 'BIO-L2-000003', unlock: 'UNL:NOX:research:magnetobiology-experiment-design' },
  ];
  for (const { id, unlock } of cases) {
    const path = getRegisteredLearningPathForModule(id)!;
    // exakte Schreibweise, nicht normalisiert (KG-20261102-magnetobiology-learning-evidence-gate)
    assert.ok(path.unlocks.includes(unlock), `${id}: ${unlock} fehlt`);
    assert.ok(path.units.flatMap((unit) => unit.sections).filter((section) => section.kind !== 'quiz').length > 0, `${id}: Inhalt fehlt`);
    assert.ok(pathAssessment(path).length >= 6, `${id}: assessment[] braucht mindestens sechs Fragen`);
  }
});

test('Magnetobiologie-Modul nennt die Evidenzgrenze ausdrücklich', () => {
  const path = getRegisteredLearningPathForModule('BIO-L2-000003')!;
  const text = path.units.flatMap((unit) => unit.sections.map((section) => section.summary)).join(' ');
  for (const phrase of ['10.18632/aging.206424', '10.1093/pnasnexus/pgag152', 'Nicht gedeckt']) {
    assert.ok(text.includes(phrase), `Evidenzgrenze: ${phrase} fehlt`);
  }
});
