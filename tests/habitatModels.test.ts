import assert from 'node:assert/strict';
import test from 'node:test';
import { airlockModel, co2Model, defaults, habitatModels, marsHabitatModel, monitoringModel, pressureLeakModel, radiationModel, redundancyModel, thermalModel } from '../lib/habitatModels';

const run = (m: (typeof habitatModels)[number], over: Record<string, number> = {}) => m.simulate({ ...defaults(m), ...over });

test('alle Habitat-Modelle liefern endliche Kurven und Kennzahlen mit Standardwerten', () => {
  for (const m of habitatModels) {
    const r = run(m);
    assert.ok(r.x.length >= 5, m.id);
    for (const s of r.series) {
      assert.equal(s.values.length, r.x.length, `${m.id} ${s.name}`);
      assert.ok(s.values.every((v) => Number.isFinite(v)), `${m.id} ${s.name}`);
    }
    assert.ok(r.readouts.length >= 3, m.id);
    assert.ok(r.atCursor(0).length >= 1 && r.atCursor(r.x.length - 1).length >= 1, m.id);
    assert.ok(r.verdict.text.length > 20, m.id);
  }
});

test('alle Modelle bleiben über den gesamten Reglerbereich stabil', () => {
  for (const m of habitatModels) {
    for (const edge of ['min', 'max'] as const) {
      const over: Record<string, number> = {};
      for (const p of m.params) if (p.kind === 'range') over[p.key] = edge === 'min' ? p.min : p.max;
      const r = run(m, over);
      for (const s of r.series) assert.ok(s.values.every((v) => Number.isFinite(v)), `${m.id} ${edge} ${s.name}`);
    }
  }
});

test('Druckleck: größeres Loch ist schneller, größeres Volumen langsamer, Nachspeisung verdeckt das Leck', () => {
  const tau = (over: Record<string, number>) => run(pressureLeakModel, over).readouts[0].value;
  const base = run(pressureLeakModel);
  const big = run(pressureLeakModel, { hole: 24 });
  assert.ok(big.x[big.x.length - 1] < base.x[base.x.length - 1] || big.series[0].values[10] < base.series[0].values[10] + 1e-9);
  assert.notEqual(tau({ hole: 24 }), tau({ hole: 12 }));
  const masked = run(pressureLeakModel, { makeup: 3000, hole: 6 });
  assert.match(masked.verdict.text, /verdeckt/);
  assert.ok(base.series[0].values[0] > 101 && base.series[0].values[base.x.length - 1] < base.series[0].values[0]);
});

test('Druckleck: 12 mm Loch in 150 m³ hat eine Zeitkonstante von etwa 2 bis 3 Stunden', () => {
  const r = run(pressureLeakModel);
  const x = r.x, p = r.series[0].values;
  // nach ca. einer Zeitkonstante liegt der Druck bei 1/e
  const target = 101.325 / Math.E;
  const i = p.findIndex((v) => v <= target);
  assert.ok(i > 0);
  const hours = x[i]; // x in Stunden, weil Horizont ≥ 2 h
  assert.ok(hours > 1.5 && hours < 4, `τ ≈ ${hours} h`);
});

test('Schleuse: höhere Rückgewinnung reduziert den Verlust, Pumpe begrenzt Zyklen pro Tag', () => {
  const a = run(airlockModel, { recovery: 90 }).series[0].values[30];
  const b = run(airlockModel, { recovery: 99 }).series[0].values[30];
  assert.ok(b < a / 5);
  const slow = run(airlockModel, { pump: 0.5, cycles: 40, volume: 12 });
  assert.equal(slow.verdict.tone, 'bad');
});

test('CO2: halbe Restleistung halbiert den Anstieg, mehr Personen verkürzen die Reaktionszeit', () => {
  const base = run(co2Model);
  const half = run(co2Model, { residual: 50 });
  const rise = (r: ReturnType<typeof run>) => r.series[0].values[r.x.length - 1] - 600;
  assert.ok(Math.abs(rise(half) / rise(base) - 0.5) < 0.05);
  assert.equal(run(co2Model, { residual: 100 }).verdict.tone, 'ok');
  const full = run(co2Model, { crew: 12, volume: 50 });
  assert.equal(full.verdict.tone, 'bad');
});

test('Thermik: Gleichgewicht folgt Pin/UA, Kühlausfall führt über 30 °C, mehr Wärmekapazität verlangsamt', () => {
  const r = run(thermalModel);
  assert.equal(r.readouts[0].value, '73 °C');
  const T = r.series[0].values;
  assert.ok(Math.abs(T[0] - 22) < 1e-9 && Math.abs(T[8] - 22) < 0.3, 'vor dem Ausfall konstant');
  assert.ok(T[T.length - 1] > 30);
  const heavy = run(thermalModel, { mass: 40 });
  assert.ok(heavy.series[0].values[heavy.x.length - 1] < T[T.length - 1]);
});

test('Strahlung: Dosis fällt mit Dicke, ohne Schutz ist sie der Rohwert, Rückzugsraum zählt nur bei Nutzung', () => {
  const bare = run(radiationModel, { thickness: 0, share: 100 });
  assert.ok(Math.abs(bare.series[1].values[48] - 30 * 48 * Math.pow(0.5, 0)) < 1e-6);
  const thick = run(radiationModel, { thickness: 40, share: 100 });
  assert.ok(thick.series[1].values[48] < bare.series[1].values[48] / 50);
  const rarely = run(radiationModel, { thickness: 40, share: 10 });
  assert.ok(rarely.series[1].values[48] > thick.series[1].values[48] * 5);
});

test('Monitoring: Trendalarm kommt vor dem Schwellenalarm, defekter Sensor erzeugt ohne Bestätigung Fehlalarm', () => {
  const ok = run(monitoringModel);
  const marks = Object.fromEntries(ok.markers.map((m) => [m.label, m.x]));
  assert.ok(marks['Trendalarm'] < marks['Schwellenalarm']);
  const defect = run(monitoringModel, { defect: 1, confirm: 0 });
  assert.match(defect.verdict.text, /defekte Sensor/);
  const confirmed = run(monitoringModel, { defect: 1, confirm: 1 });
  assert.doesNotMatch(confirmed.verdict.text, /defekte Sensor/);
});

test('Redundanz: ohne gemeinsame Ursache p^n, mit β gibt es eine Untergrenze', () => {
  const r0 = run(redundancyModel, { beta: 0, p: 5 });
  assert.ok(Math.abs(r0.series[1].values[2] - Math.pow(0.05, 3)) < 1e-12);
  const r = run(redundancyModel, { beta: 10, p: 5, goal: 5 });
  assert.ok(r.series[1].values[4] > 0.1 * 0.05 * 0.99);
  assert.equal(r.readouts[3].value, 'nie');
});

test('Mars-Habitat: Standardsturm führt zum Blackout, erst Kombination aus Degradation und Batterie hilft', () => {
  const base = run(marsHabitatModel);
  assert.equal(base.verdict.tone, 'bad');
  assert.equal(run(marsHabitatModel, { battery: 400 }).verdict.tone, 'bad');
  assert.equal(run(marsHabitatModel, { degrade: 50 }).verdict.tone, 'bad');
  assert.notEqual(run(marsHabitatModel, { degrade: 50, battery: 200 }).verdict.tone, 'bad');
  assert.notEqual(run(marsHabitatModel, { degrade: 40 }).verdict.tone, 'bad');
  assert.equal(run(marsHabitatModel, { days: 0 }).verdict.tone, 'ok');
});

test('Habitat-Lernpfade verweisen auf vorhandene Modelle und tragen Rechenaufgaben mit Lösung', async () => {
  const { noxiaUnlockFoundationLearningPaths } = await import('../lib/learningPaths/noxiaUnlockFoundations');
  const known = new Set<string>([...habitatModels.map((m) => m.id), 'EXP:NOX-RESOURCE-CHAIN']);
  const modelIdsUsed = new Set<string>();
  for (const path of noxiaUnlockFoundationLearningPaths) {
    for (const unit of path.units) {
      const exercise = unit.sections.find((s) => s.kind === 'exercise');
      assert.ok(exercise?.solution && exercise.solution.length > 40, `${path.id} ${unit.id}: Lösung fehlt`);
      assert.doesNotMatch(exercise.summary, /Ordne die entscheidenden Größen/, `${path.id} ${unit.id}: generische Aufgabe`);
      for (const s of unit.sections.filter((x) => x.kind === 'experiment')) {
        assert.ok(s.interactiveId && known.has(s.interactiveId), `${path.id}: unbekanntes Modell ${s.interactiveId}`);
        modelIdsUsed.add(s.interactiveId);
      }
    }
  }
  for (const m of habitatModels) assert.ok(modelIdsUsed.has(m.id), `${m.id} wird in keinem Lernpfad verwendet`);
});
