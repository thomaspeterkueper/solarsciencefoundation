import assert from 'node:assert/strict';
import test from 'node:test';
import { pathAssessment } from '../lib/learningPathAssessment';
import { parseLearningQuiz } from '../lib/learningQuiz';
import { getRegisteredLearningPathById } from '../lib/learningPathRegistry';

/** Issue #92: KD:PHYS:N1 – „Wie wird aus einem Signal belastbares Wissen?“ */
const PATH_ID = 'PATH:SSF:NOX-SCIENTIFIC-OBSERVATION-0001';
const PASS_RATIO = 0.7;

const path = () => {
  const resolved = getRegisteredLearningPathById(PATH_ID);
  assert.ok(resolved, `${PATH_ID} muss registriert sein`);
  return resolved;
};

test('#92: jede Einheit hat einen eigenen auswertbaren Kurztest mit Erklärungen', () => {
  for (const unit of path().units) {
    const quizzes = unit.sections.filter((section) => section.kind === 'quiz');
    assert.equal(quizzes.length, 1, `${unit.id}: genau ein Kurztest`);
    const quiz = parseLearningQuiz(quizzes[0].summary);
    assert.ok(quiz, `${unit.id}: Kurztest muss auswertbar sein`);
    for (const question of quiz) assert.ok(question.explanation && question.explanation.length > 40, `${unit.id}: Erklärung je Frage`);
  }
});

test('#92: Antwortpositionen sind gemischt, keine triviale Antwortstrategie', () => {
  const items = pathAssessment(path());
  assert.equal(items.length, 12);
  const counts = [0, 0, 0, 0];
  for (const item of items) counts[item.correctOption] += 1;
  for (const [position, count] of counts.entries()) {
    assert.ok(count >= 1, `Position ${position} ist nie richtig`);
    assert.ok(count <= items.length / 3, `Position ${position} ist ${count}-mal richtig – zu vorhersagbar`);
  }
});

test('#92: Distraktoren sind sachlich, Nichtnachweis ist kein Ausschluss', () => {
  const items = pathAssessment(path());
  for (const item of items) {
    for (const option of item.options) assert.ok(!/\b(Farbe|Kaufdatum)\b/.test(option), `unplausibler Distraktor: ${option}`);
  }
  const detection = items.find((item) => /Nachweisgrenze|weist .* erst ab/.test(item.question));
  assert.ok(detection, 'eine Frage zur Nachweisgrenze');
  assert.match(detection.options[detection.correctOption], /nicht ausgeschlossen/);
  const gravimeter = items.find((item) => /Gravimeter/.test(item.question));
  assert.ok(gravimeter, 'eine Frage zur Gravimetrie');
  assert.match(gravimeter.options[gravimeter.correctOption], /Schwerebeschleunigung/);
});

test('#92: Bestehensgrenze, Gates und NOXIA-Freischaltungen bleiben stabil', () => {
  const resolved = path();
  const items = pathAssessment(resolved);
  assert.ok((items.length - 1) / items.length >= PASS_RATIO, 'mit einem Fehler bestehbar');
  assert.ok((items.length - 4) / items.length < PASS_RATIO, 'mit vier Fehlern nicht bestehbar');
  assert.deepEqual(resolved.unlocks, ['UNL:NOX:scientific-observation', 'UNL:NOX:prospecting-evidence']);
  assert.equal(resolved.kxfModuleId, 'LRN:SSF:NOX-SCIENTIFIC-OBSERVATION');
  assert.deepEqual(resolved.units.map((unit) => unit.gate?.type ?? null), ['quiz_all_correct', 'quiz_all_correct', 'quiz_all_correct', null]);
});
