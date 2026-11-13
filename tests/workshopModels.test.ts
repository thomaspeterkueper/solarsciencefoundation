import assert from 'node:assert/strict';
import test from 'node:test';
import { defaults } from '../lib/habitatModels';
import { allModels, arbitrageModel, calibrationModel, collateralModel, landValueModel, roboticDrillModel, smeltingModel, workshopModels } from '../lib/workshopModels';
import { noxiaPrerequisiteLearningPaths } from '../lib/learningPaths/noxiaPrerequisiteModules';

const run = (m: (typeof workshopModels)[number], over: Record<string, number> = {}) => m.simulate({ ...defaults(m), ...over });
const readout = (r: ReturnType<typeof run>, label: string) => r.readouts.find((x) => x.label === label)?.value ?? '';

test('alle Werkstatt- und Wirtschaftsmodelle liefern endliche Kurven, auch an den Reglergrenzen', () => {
  for (const m of workshopModels) {
    for (const edge of ['def', 'min', 'max'] as const) {
      const over: Record<string, number> = {};
      if (edge !== 'def') for (const p of m.params) if (p.kind === 'range') over[p.key] = edge === 'min' ? p.min : p.max;
      const r = run(m, over);
      assert.ok(r.x.length >= 3, m.id);
      for (const s of r.series) {
        assert.equal(s.values.length, r.x.length, `${m.id} ${s.name}`);
        assert.ok(s.values.every((v) => Number.isFinite(v)), `${m.id} ${edge} ${s.name}`);
      }
      assert.ok(r.readouts.length >= 4 && r.verdict.text.length > 20, m.id);
      assert.ok(r.atCursor(0).length >= 1 && r.atCursor(r.x.length - 1).length >= 1, m.id);
    }
  }
});

test('Modell-IDs sind eindeutig', () => {
  const ids = allModels.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('Schmelze: 5 kW mit 50 % Verlust und 1,2 MJ/kg ergeben 7,5 kg/h, halbe Verluste 11,25 kg/h', () => {
  const r = run(smeltingModel);
  assert.equal(readout(r, 'Schmelzleistung'), '7,5 kg/h');
  const half = run(smeltingModel, { loss: 25 });
  assert.equal(readout(half, 'Schmelzleistung'), '11,25 kg/h');
});

test('Phobos-Roboter: 300 N auf 40 kg ergibt 7,5 m/s², 300 N Anker halten ihn, Erde hält ihn ohne Anker', () => {
  const r = run(roboticDrillModel);
  assert.match(readout(r, 'Beschleunigung weg vom Gestein'), /^7,[45]/);
  assert.equal(r.verdict.tone, 'bad');
  assert.equal(run(roboticDrillModel, { anchor: 300 }).verdict.tone, 'ok');
  assert.equal(run(roboticDrillModel, { g: 9.81 }).verdict.tone, 'ok');
});

test('Messreihe: Fehler 0,3 g bei Streuung 0,1 g wird erkannt, Fehler 0,1 g bei Streuung 0,5 g mit 5 Messungen nicht', () => {
  assert.equal(readout(run(calibrationModel), 'Systematischer Fehler erkennbar?'), 'ja');
  assert.equal(readout(run(calibrationModel, { bias: 0.1, sigma: 0.5, n: 5 }), 'Systematischer Fehler erkennbar?'), 'nein');
  assert.equal(readout(run(calibrationModel, { bias: 0.5, sigma: 0.2, n: 50 }), 'Systematischer Fehler erkennbar?'), 'ja');
});

test('Kreditrahmen: Beispiel der Module (26.600 Cr, ohne Schiff 14.000 Cr), Obergrenze greift', () => {
  const r = run(collateralModel);
  assert.equal(readout(r, 'Kreditrahmen'), '26.600 Cr');
  assert.equal(readout(r, 'Rahmen ohne Schiff'), '14.000 Cr');
  const big = run(collateralModel, { building: 80000, ship: 100000 });
  assert.equal(readout(big, 'Kreditrahmen'), '50.000 Cr');
  assert.equal(readout(run(collateralModel, { drop: 40 }), 'Deckung nach Wertverlust').replace(' %', ''), '86');
});

test('Arbitrage: Beispiel der Module (928 Cr je Fahrt), Wettbewerb schrumpft den Gewinn, kürzere Route kann gewinnen', () => {
  const r = run(arbitrageModel);
  assert.equal(readout(r, 'Gewinn je Fahrt'), '928 Cr');
  assert.ok(run(arbitrageModel, { rivals: 4 }).series[0].values[60] < r.series[0].values[60]);
  assert.equal(r.verdict.tone, 'warn'); // Alternative 120 Cr/Tag gegen 93 Cr/Tag
  assert.equal(run(arbitrageModel, { sell: 100 }).verdict.tone, 'bad');
});

test('Bodenwert: Mitte amortisiert sich früher als Rand, hohe Steuer verlängert es', () => {
  const r = run(landValueModel);
  assert.equal(readout(r, 'Amortisation Mitte'), '15,3 Jahre');
  assert.equal(readout(r, 'Amortisation Rand'), '22,9 Jahre');
  const hot = run(landValueModel, { tax: 5 });
  assert.ok(parseFloat(readout(hot, 'Amortisation Rand')) > 40);
});

test('NOXIA-Module nennen nur vorhandene Modelle', () => {
  const known = new Set(allModels.map((m) => m.id));
  const used = new Set<string>();
  for (const path of noxiaPrerequisiteLearningPaths) {
    for (const unit of path.units) for (const s of unit.sections) if (s.kind === 'experiment') {
      assert.ok(s.interactiveId && known.has(s.interactiveId), `${path.id}: ${s.interactiveId}`);
      used.add(s.interactiveId);
    }
  }
  for (const m of workshopModels) assert.ok(used.has(m.id), `${m.id} ist keinem Modul zugeordnet`);
});
