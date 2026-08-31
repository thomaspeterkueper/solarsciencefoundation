import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLearningQuiz, scoreLearningQuiz } from '../lib/learningQuiz';

const valid = [
  'Welche Prozesskette behandelt salzhaltiges Rohwasser sinnvoll?||Nur Sedimentation||Filtration und Desinfektion||Filtration und Umkehrosmose*||Nur Aktivkohle',
  'Warum entfernt ein mechanischer Filter gelöste Salze nicht zuverlässig?||Weil gelöste Ionen den Filter mit dem Wasser passieren*||Weil Salz immer verdampft||Weil Filter nur Mikroorganismen entfernen||Weil Salz unpolar ist',
  'Ein Recyclingstrom enthält organische Spuren, Mikroorganismen und Salze. Was folgt daraus?||Ein einzelner Behandlungsschritt genügt immer||Die Prozesskette muss mehrere passende Barrieren kombinieren*||Nur die sichtbare Trübung ist relevant||Desinfektion entfernt automatisch alle Salze',
].join('---');

test('parses exactly three governed quiz questions', () => {
  const quiz = parseLearningQuiz(valid);
  assert.ok(quiz);
  assert.equal(quiz.length, 3);
  assert.equal(quiz[0].options.length, 4);
  assert.equal(quiz[0].correctIndex, 2);
});

test('rejects self-check or incomplete quiz structures', () => {
  assert.equal(parseLearningQuiz('Kannst du es erklären?'), null);
  assert.equal(parseLearningQuiz('Frage||A*||B||C||D'), null);
  assert.equal(parseLearningQuiz('Q||A*||B*||C||D---Q||A*||B||C||D---Q||A*||B||C||D'), null);
});

test('scores only explicit answers against the governed key', () => {
  const quiz = parseLearningQuiz(valid)!;
  assert.equal(scoreLearningQuiz(quiz, [2, 0, 1]), 3);
  assert.equal(scoreLearningQuiz(quiz, [0, 0, 1]), 2);
});
