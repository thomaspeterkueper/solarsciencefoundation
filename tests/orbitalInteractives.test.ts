import assert from 'node:assert/strict';
import test from 'node:test';
import { getLearningInteractive } from '../lib/learningInteractives';
import { getRegisteredLearningPathForModule } from '../lib/learningPathRegistry';

test('Hohmann-Rechner liefert die Referenzwerte Erde → Mars und Erde → Jupiter', () => {
  const h = getLearningInteractive('hohmann-rechner');
  assert.ok(h && h.kind === 'hohmann-calculator');
  const mars = h.params.pairs.find((p) => p.fromId === 'erde' && p.toId === 'mars')!;
  assert.ok(Math.abs(mars.dv1KmS - 2.95) < 0.02);
  assert.ok(Math.abs(mars.dv2KmS - 2.65) < 0.02);
  assert.ok(Math.abs(mars.transferDays - 259) < 1.5);
  assert.ok(Math.abs(mars.transferSemiMajorAu - 1.262) < 0.002);
  assert.ok(Math.abs(mars.windowEveryDays - 780) < 3, 'Startfenster etwa alle 26 Monate');
  const jupiter = h.params.pairs.find((p) => p.fromId === 'erde' && p.toId === 'jupiter')!;
  assert.ok(Math.abs(jupiter.dvTotalKmS - 14.4) < 0.1);
  assert.ok(Math.abs(jupiter.transferDays - 997) < 2);
});

test('Transferbahn-Vergleich: schneller heißt teurer, Hohmann ist das Minimum', () => {
  const t = getLearningInteractive('transferbahn-vergleich');
  assert.ok(t && t.kind === 'transfer-comparison');
  const s = t.params.samples;
  const hohmann = s[t.params.hohmannIndex];
  assert.equal(hohmann.sweepDeg, 180);
  for (let i = 1; i < s.length; i++) {
    assert.ok(s[i].days < s[i - 1].days, 'mehr Startschub → kürzere Reise');
    assert.ok(s[i].dvTotalKmS > s[i - 1].dvTotalKmS, 'mehr Startschub → mehr Gesamt-Δv');
    assert.ok(s[i].sweepDeg < s[i - 1].sweepDeg, 'mehr Startschub → gestrecktere Bahn');
  }
  const end = hohmann.path[hohmann.path.length - 1];
  assert.ok(Math.abs(Math.hypot(end[0], end[1]) - 1.524) < 0.01, 'Bahn endet auf der Marsbahn');
});

test('Sonnensystem-Pfad verweist auf beide Interactives, ohne Doppelung', () => {
  const path = getRegisteredLearningPathForModule('LRN:SSF:AST-L1-000001')!;
  const ids = path.units.flatMap((u) => u.sections).map((s) => s.interactiveId).filter(Boolean);
  assert.deepEqual(ids, ['transferbahn-vergleich', 'hohmann-rechner']);
  for (const id of ids) assert.ok(getLearningInteractive(id!), `${id} muss registriert sein`);
});
