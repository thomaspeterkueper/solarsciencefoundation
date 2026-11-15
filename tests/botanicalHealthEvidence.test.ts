import assert from 'node:assert/strict';
import test from 'node:test';
import { botanicalHealthEvidence, botanicalHealthQuiz, assessBotanicalHealthQuiz } from '../lib/health/botanicalEvidence';

test('health packet never turns lab evidence or anecdotes into medical advice', () => {
  assert.equal(botanicalHealthEvidence.medicalAdvice, false);
  assert.equal(botanicalHealthEvidence.unlocks.length, 0);
  assert.ok(botanicalHealthEvidence.claims.every((claim) => !claim.clinicalBenefitEstablished && !claim.adviceAllowed));
  assert.ok(botanicalHealthEvidence.claims.some((claim) => claim.key.includes('four-months') && claim.kind === 'unsupported-safety-claim'));
});

test('player must distinguish evidence from clinical proof and storage claims', () => {
  assert.equal(botanicalHealthQuiz.length, 3);
  assert.deepEqual(assessBotanicalHealthQuiz([1, 2, 0]), { correct: 3, total: 3, passed: true, medicalUnlocks: [] });
  assert.equal(assessBotanicalHealthQuiz([0, 0, 0]).passed, false);
  assert.throws(() => assessBotanicalHealthQuiz([1, 2]));
  assert.throws(() => assessBotanicalHealthQuiz([1, 2, 9]));
});
