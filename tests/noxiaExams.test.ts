import assert from 'node:assert/strict';
import test from 'node:test';
import { quizRepairs } from '../lib/learningPaths/quizRepairs';
import { pathAssessment } from '../lib/learningPathAssessment';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { getRegisteredLearningPathForModule, registeredLearningPaths } from '../lib/learningPathRegistry';

/** NOXIA besteht ein Modul ab 70 %. Mit mindestens 6 Fragen ist das mit einem Fehler erreichbar. */
const MIN_QUESTIONS = 6;
const PASS_RATIO = 0.7;

/** Module, die NOXIA verlangt und die seit EXT-NOXIA-SSF-20261029-exams-for-all-modules eine Prüfung haben müssen. */
const EXAM_MODULES: Array<{ ids: string[]; path: string }> = [
  { ids: ['LRN:SSF:ENG-POWER-GENERATION-0001', 'ENG-L1-000001'], path: 'PATH:SSF:NOX-POWER-GENERATION-0001' },
  { ids: ['LRN:SSF:NOX-PRESSURE-SYSTEMS', 'PHY-L1-000026'], path: 'PATH:SSF:NOX-PRESSURE-SYSTEMS-0001' },
  { ids: ['LRN:SSF:NOX-AIRLOCK', 'ENG-L1-000006'], path: 'PATH:SSF:NOX-AIRLOCK-0001' },
  { ids: ['LRN:SSF:NOX-LIFE-SUPPORT', 'BIO-L1-000002'], path: 'PATH:SSF:NOX-LIFE-SUPPORT-0001' },
  { ids: ['LRN:SSF:NOX-THERMAL-CONTROL', 'PHY-L1-000027'], path: 'PATH:SSF:NOX-THERMAL-CONTROL-0001' },
  { ids: ['LRN:SSF:NOX-RADIATION-PROTECTION', 'PHY-L1-000028'], path: 'PATH:SSF:NOX-RADIATION-PROTECTION-0001' },
  { ids: ['LRN:SSF:NOX-ENVIRONMENT-MONITORING', 'ENG-L1-000007'], path: 'PATH:SSF:NOX-ENVIRONMENT-MONITORING-0001' },
  { ids: ['LRN:SSF:NOX-HABITAT-REDUNDANCY', 'ENG-L1-000008'], path: 'PATH:SSF:NOX-HABITAT-REDUNDANCY-0001' },
  { ids: ['LRN:SSF:NOX-MARS-HABITAT', 'ENG-L1-000009'], path: 'PATH:SSF:NOX-MARS-HABITAT-0001' },
  // Pilotenausbildung
  { ids: ['LRN:SSF:PHY-ENERGIE-ARBEIT-0001', 'PHY-L2-000005'], path: 'PATH:SSF:PHY-ENERGIE-ARBEIT-0001' },
  { ids: ['LRN:SSF:AST-L1-000001', 'AST-L1-000001', 'AST-2101', 'LRN:SSF:AST-2101'], path: 'PATH:SSF:AST-SONNENSYSTEM-0001' },
];

test('Prüfungsmodule lösen auf das richtige Thema auf und haben eine bestehbare Prüfung', () => {
  for (const { ids, path } of EXAM_MODULES) {
    for (const id of ids) {
      assert.equal(getRegisteredLearningPathForModule(id)?.id, path, `${id} muss auf ${path} auflösen`);
    }
    const resolved = getRegisteredLearningPathForModule(ids[0])!;
    const items = pathAssessment(resolved);
    assert.ok(items.length >= MIN_QUESTIONS, `${path}: ${items.length} Fragen, erwartet mindestens ${MIN_QUESTIONS}`);
    assert.ok(
      (items.length - 1) / items.length >= PASS_RATIO,
      `${path}: mit einem Fehler muss die Bestehensgrenze von ${PASS_RATIO * 100} % erreichbar sein`,
    );
  }
});

test('Prüfungsfragen sind eindeutig und mit Erklärung versehen', () => {
  for (const { path } of EXAM_MODULES) {
    const resolved = registeredLearningPaths.find((candidate) => candidate.id === path)!;
    const items = pathAssessment(resolved);
    const seen = new Set<string>();
    for (const item of items) {
      assert.equal(item.options.length, 4, `${path}: vier Antwortoptionen je Frage`);
      assert.ok(item.correctOption >= 0 && item.correctOption < 4);
      assert.equal(new Set(item.options).size, 4, `${path}: doppelte Antwortoption in „${item.question.slice(0, 50)}…“`);
      assert.ok(item.explanation.length > 40, `${path}: Erklärung fehlt oder ist zu kurz`);
      assert.ok(!seen.has(item.question), `${path}: doppelte Frage`);
      seen.add(item.question);
      for (const option of item.options) {
        assert.ok(!/^(alle|keine) (oben|der)/i.test(option), `${path}: „Alle/Keine der …“ ist als Antwort nicht erlaubt`);
      }
    }
  }
});

/**
 * Regel: Jedes Modul mit einer NOXIA-Freischaltung (UNL:NOX:…) braucht eine Prüfung.
 * Bekannte Lücken stehen in der Liste und werden abgebaut; neue Module dürfen nicht hinzukommen.
 */
const KNOWN_EXAM_GAPS: string[] = [];

test('jedes Modul mit UNL:NOX-Freischaltung hat eine Prüfung (Ausnahmen sind benannt)', () => {
  const missing = registeredLearningPaths
    .filter((path) => (path.unlocks ?? []).some((unlock) => unlock.startsWith('UNL:NOX:')))
    .filter((path) => pathAssessment(path).length < MIN_QUESTIONS)
    .map((path) => path.id)
    .sort();
  const unexpected = missing.filter((id) => !KNOWN_EXAM_GAPS.includes(id));
  assert.deepEqual(unexpected, [], `Module mit UNL:NOX-Freischaltung ohne Prüfung: ${unexpected.join(', ')}`);
  const resolved = KNOWN_EXAM_GAPS.filter((id) => !missing.includes(id));
  assert.deepEqual(resolved, [], `Diese Ausnahmen sind erledigt und gehören aus KNOWN_EXAM_GAPS gestrichen: ${resolved.join(', ')}`);
});

test('keine Sackgasse: gesperrte Einheiten der Prüfungsmodule haben einen auswertbaren Kurztest', () => {
  for (const { path } of EXAM_MODULES) {
    const resolved = registeredLearningPaths.find((candidate) => candidate.id === path)!;
    for (const unit of resolved.units) {
      if (unit.gate?.type !== 'quiz_all_correct') continue;
      const playable = unit.sections.some((section) => section.kind === 'quiz' && parseLearningQuiz(section.summary));
      assert.ok(playable, `${path} / ${unit.id}: Gate ohne auswertbaren Kurztest sperrt die nächste Einheit dauerhaft`);
    }
  }
});

test('jeder Kurztest-Ersatz trifft eine vorhandene Einheit und ist auswertbar', () => {
  for (const key of Object.keys(quizRepairs)) {
    const [pathId, unitId] = key.split('|');
    const path = registeredLearningPaths.find((candidate) => candidate.id === pathId);
    assert.ok(path, `${key}: Pfad nicht registriert`);
    const unit = path.units.find((candidate) => candidate.id === unitId || candidate.id.endsWith(`:${unitId.replace(/^UNIT:/, '')}`));
    assert.ok(unit, `${key}: Einheit nicht gefunden`);
    assert.ok(unit.sections.some((section) => section.kind === 'quiz' && parseLearningQuiz(section.summary)), `${key}: Ersatz greift nicht`);
  }
});

test('keine Sackgasse in keinem Lernpfad: jedes Quiz-Gate hat einen auswertbaren Kurztest', () => {
  const dead: string[] = [];
  for (const path of registeredLearningPaths) {
    for (const unit of path.units) {
      if (unit.gate?.type !== 'quiz_all_correct') continue;
      if (!unit.sections.some((section) => section.kind === 'quiz' && parseLearningQuiz(section.summary))) dead.push(`${path.id} / ${unit.id}`);
    }
  }
  assert.deepEqual(dead, [], `Gates ohne auswertbaren Kurztest: ${dead.join(', ')}`);
});
