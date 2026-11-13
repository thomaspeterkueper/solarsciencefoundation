/**
 * Rechenmodelle für die Werkstatt-, Mess- und Wirtschaftsmodule (Schmelze, Phobos-Werkstatt,
 * Präzisionsmessung, Sicherheitenwert, Arbitrage, Bodenwert). Gleiche Struktur wie habitatModels.ts.
 * Die Wirtschaftszahlen sind Spielwerte aus den NOXIA-Modulen, keine Marktdaten.
 */
import { fmt, fmtDuration, gaussian, habitatModels, linspace, mulberry32, type Marker, type ModelDef, type Tone } from './habitatModels';

const cr = (n: number) => `${fmt(n, 0)} Cr`;

// ───────────────────────── Schmelze ─────────────────────────

export const smeltingModel: ModelDef = {
  id: 'EXP:NOX:SMELTING-FURNACE',
  title: 'Was schafft ein Schmelzofen?',
  intro: 'Aus der elektrischen Leistung wird nur der Teil Metall, der nicht als Wärme an die Umgebung verloren geht. Dazu kommt Eisen, das in der Schlacke bleibt. Verändere Ofen, Verluste und Erz und sieh, wie lange ein Auftrag dauert.',
  params: [
    { kind: 'range', key: 'power', label: 'Elektrische Ofenleistung', unit: 'kW', min: 1, max: 30, step: 0.5, def: 5 },
    { kind: 'range', key: 'loss', label: 'Wärmeverlust an die Umgebung', unit: '%', min: 10, max: 90, step: 5, def: 50 },
    { kind: 'range', key: 'energy', label: 'Energie zum Aufheizen und Schmelzen', unit: 'MJ/kg', min: 0.8, max: 2, step: 0.1, def: 1.2 },
    { kind: 'range', key: 'grade', label: 'Eisenoxid im Erz (Fe₂O₃)', unit: '%', min: 20, max: 90, step: 5, def: 40 },
    { kind: 'range', key: 'slag', label: 'Eisen, das in der Schlacke bleibt', unit: '%', min: 0, max: 40, step: 5, def: 10 },
    { kind: 'range', key: 'target', label: 'Auftrag', unit: 'kg Barren', min: 20, max: 500, step: 10, def: 100 },
  ],
  tryThis: [
    'Halbiere die Wärmeverluste von 50 auf 25 %: die Schmelzleistung steigt um die Hälfte – Dämmung ist wie ein größerer Ofen.',
    'Sinkt der Eisenoxidanteil des Erzes von 40 auf 20 %, verdoppelt sich die Erzmenge pro Barren, die Ofenzeit bleibt gleich.',
    'Erhöhe nur die Ofenleistung auf 10 kW: der Auftrag dauert halb so lang, der Erzbedarf je Barren ändert sich nicht.',
  ],
  assumptions: 'Nur Aufheizen und Schmelzen mit konstantem Energiebedarf je kg. Die Reduktionsenergie ist nicht eingerechnet. Eisenoxid Fe₂O₃ besteht zu 70 % aus Eisen.',
  simulate: (v) => {
    const rate = (v.power * 3.6 * (1 - v.loss / 100)) / v.energy; // kg Metall/h
    const rateHalf = (v.power * 3.6 * (1 - v.loss / 200)) / v.energy;
    const yieldFactor = 1 - v.slag / 100;
    const ingot = rate * yieldFactor, ingotHalf = rateHalf * yieldFactor;
    const orePerKg = 1 / ((v.grade / 100) * 0.7 * yieldFactor);
    const hours = linspace(0, 24, 49);
    const hTarget = ingot > 0 ? v.target / ingot : Infinity;
    const tone: Tone = hTarget > 24 ? 'bad' : hTarget > 12 ? 'warn' : 'ok';
    return {
      x: hours,
      xLabel: 'Betriebszeit (h)',
      yLabel: 'Barren (kg)',
      series: [
        { name: 'mit aktuellen Wärmeverlusten', color: '#c2402d', values: hours.map((h) => h * ingot) },
        { name: 'mit halbierten Wärmeverlusten', color: '#3d8b5f', values: hours.map((h) => h * ingotHalf), dashed: true },
      ],
      thresholds: [{ y: v.target, label: `Auftrag ${fmt(v.target, 0)} kg`, tone: 'warn' }],
      markers: [],
      yMin: 0,
      readouts: [
        { label: 'Schmelzleistung', value: `${fmt(rate, 2)} kg/h` },
        { label: 'Barren pro Stunde', value: `${fmt(ingot, 2)} kg/h` },
        { label: 'Erz je kg Barren', value: `${fmt(orePerKg, 1)} kg` },
        { label: 'Auftrag fertig nach', value: fmtDuration(hTarget), tone },
        { label: 'Zeitgewinn durch Dämmung', value: Number.isFinite(hTarget) && ingotHalf > 0 ? fmtDuration(hTarget - v.target / ingotHalf) : '–' },
      ],
      atCursor: (i) => [
        { label: `Nach ${fmt(hours[i], 1)} h`, value: `${fmt(hours[i] * ingot, 1)} kg Barren` },
        { label: 'Erzverbrauch bis dahin', value: `${fmt(hours[i] * ingot * orePerKg, 0)} kg` },
      ],
      verdict: { tone, text: `Der Ofen schafft ${fmt(ingot, 1)} kg Barren pro Stunde. Der Auftrag über ${fmt(v.target, 0)} kg dauert ${fmtDuration(hTarget)} und verbraucht ${fmt(v.target * orePerKg, 0)} kg Erz. Mit halbierten Wärmeverlusten wären es ${fmtDuration(v.target / ingotHalf)}.` },
    };
  },
};

// ───────────────────────── Phobos-Werkstatt ─────────────────────────

const BODIES = [
  { value: 0.0057, label: 'Phobos (0,006 m/s²)' },
  { value: 1.62, label: 'Mond (1,62 m/s²)' },
  { value: 3.71, label: 'Mars (3,71 m/s²)' },
  { value: 9.81, label: 'Erde (9,81 m/s²)' },
];

export const roboticDrillModel: ModelDef = {
  id: 'EXP:NOX:ROBOT-DRILL',
  title: 'Bohren, wo nichts andrückt',
  intro: 'Der Bohrer drückt mit einer Kraft ins Gestein, und genau diese Kraft drückt zurück auf den Roboter. Nur Gewicht und Verankerung halten ihn am Boden. Wähle den Himmelskörper und die Verankerung.',
  params: [
    { kind: 'select', key: 'g', label: 'Einsatzort', options: BODIES, def: 0.0057 },
    { kind: 'range', key: 'mass', label: 'Robotermasse', unit: 'kg', min: 10, max: 200, step: 5, def: 40 },
    { kind: 'range', key: 'force', label: 'Bohrkraft', unit: 'N', min: 50, max: 1000, step: 10, def: 300 },
    { kind: 'range', key: 'anchor', label: 'Verankerung (Haltekraft)', unit: 'N', min: 0, max: 1500, step: 10, def: 0 },
  ],
  tryThis: [
    'Wechsle von Phobos auf die Erde: das Gewicht von 392 N hält den Roboter bei 300 N Bohrkraft problemlos unten.',
    'Zurück auf Phobos: schon ein Anker von 300 N hält ihn fest – die nötige Haltekraft steht in den Kennzahlen.',
    'Verdopple die Masse auf Phobos: es ändert fast nichts, weil das Gewicht dort verschwindend klein bleibt. Mehr Masse ersetzt keine Verankerung.',
  ],
  assumptions: 'Starrer Roboter, konstante Bohrkraft senkrecht zum Boden, kein Haltemoment durch Reibung. Die Verschiebung ist auf 50 cm begrenzt dargestellt.',
  simulate: (v) => {
    const weight = v.mass * v.g;
    const net = v.force - v.anchor - weight;
    const a = Math.max(0, net / v.mass);
    const t = linspace(0, 5, 51);
    const disp = t.map((s) => Math.min(50, 100 * 0.5 * a * s * s));
    const t1 = a > 0 ? Math.sqrt((2 * 0.01) / a) : Infinity;
    const needed = Math.max(0, v.force - weight);
    const ok = net <= 0;
    return {
      x: t,
      xLabel: 'Zeit nach Bohrbeginn (s)',
      yLabel: 'Abstand vom Gestein (cm)',
      series: [{ name: 'Abstand des Roboters vom Gestein', color: '#2f6fb0', values: disp }],
      thresholds: [{ y: 1, label: '1 cm: Bohrer verliert Kontakt', tone: 'bad' }],
      markers: [],
      yMin: 0,
      yMax: 52,
      readouts: [
        { label: 'Gewichtskraft', value: `${fmt(weight, weight < 10 ? 2 : 0)} N` },
        { label: 'Bohrkraft gegen Gewicht', value: weight > 0 ? `${fmt(v.force / weight, 1)} : 1` : '–' },
        { label: 'Beschleunigung weg vom Gestein', value: `${fmt(a, 2)} m/s²`, tone: ok ? 'ok' : 'bad' },
        { label: 'Kontaktverlust nach', value: Number.isFinite(t1) ? `${fmt(t1 * 1000, 0)} ms` : 'nie', tone: ok ? 'ok' : 'bad' },
        { label: 'Nötige Haltekraft', value: `${fmt(needed, 0)} N` },
      ],
      atCursor: (i) => [{ label: `Nach ${fmt(t[i], 1)} s`, value: `${fmt(disp[i], 1)} cm Abstand` }],
      verdict: ok
        ? { tone: 'ok', text: `Gewicht und Verankerung (${fmt(weight + v.anchor, 0)} N) halten die Bohrkraft von ${fmt(v.force, 0)} N. Der Roboter bleibt am Boden.` }
        : { tone: 'bad', text: `Der Roboter wird mit ${fmt(a, 1)} m/s² abgedrückt und verliert nach ${fmt(t1 * 1000, 0)} ms den Kontakt. Es fehlen mindestens ${fmt(needed - v.anchor, 0)} N Haltekraft oder eine Gegenmasse.` },
    };
  },
};

// ───────────────────────── Präzisionsmessung ─────────────────────────

export const calibrationModel: ModelDef = {
  id: 'EXP:NOX:CALIBRATION-SERIES',
  title: 'Messreihe an einem Referenzgewicht',
  intro: 'Eine Waage wiegt ein Referenzgewicht von 100,0 g. Sie hat einen versteckten systematischen Fehler und ein zufälliges Rauschen. Wie viele Messungen braucht man, um den Fehler sicher zu erkennen?',
  params: [
    { kind: 'range', key: 'bias', label: 'Systematischer Fehler (Nullpunkt)', unit: 'g', min: -1, max: 1, step: 0.05, def: 0.3 },
    { kind: 'range', key: 'sigma', label: 'Zufällige Streuung (σ)', unit: 'g', min: 0.02, max: 1, step: 0.02, def: 0.1 },
    { kind: 'range', key: 'n', label: 'Anzahl Messungen', unit: '', min: 3, max: 50, step: 1, def: 5 },
  ],
  tryThis: [
    'Mehr Messungen verkleinern die Unsicherheit des Mittelwerts, aber nicht den systematischen Fehler selbst.',
    'Setze den systematischen Fehler auf 0 und die Streuung hoch: die Einzelwerte streuen weit, der Mittelwert bleibt trotzdem nahe 100 g.',
    'Setze den Fehler auf 0,1 g bei Streuung 0,5 g und 5 Messungen: der Fehler lässt sich nicht vom Zufall trennen. Mit 50 Messungen schon eher.',
  ],
  assumptions: 'Normalverteiltes Rauschen mit festem Startwert, Referenz 100,0 g genau bekannt. Unsicherheit des Mittelwerts u = s/√n. Ein Fehler gilt als erkannt, wenn er größer ist als 2u.',
  simulate: (v) => {
    const n = Math.round(v.n);
    const rand = mulberry32(7);
    const noise = Array.from({ length: n }, () => gaussian(rand));
    const vals = noise.map((z) => 100 + v.bias + v.sigma * z);
    const running = vals.map((_, i) => vals.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1));
    const mean = running[n - 1];
    const s = Math.sqrt(vals.reduce((a, x) => a + (x - mean) ** 2, 0) / Math.max(1, n - 1));
    const u = s / Math.sqrt(n);
    const dev = mean - 100;
    const detected = Math.abs(dev) > 2 * u;
    const x = vals.map((_, i) => i + 1);
    const lo = Math.min(...vals, 100), hi = Math.max(...vals, 100);
    const pad = Math.max(0.1, (hi - lo) * 0.1);
    const small = s < Math.max(0.15, Math.abs(dev));
    return {
      x,
      xLabel: 'Messung Nr.',
      yLabel: 'Angezeigte Masse (g)',
      series: [
        { name: 'Einzelwerte', color: '#8a8a8a', values: vals, thin: true },
        { name: 'laufender Mittelwert', color: '#2f6fb0', values: running },
        { name: 'wahrer Wert 100,0 g', color: '#3d8b5f', values: x.map(() => 100), dashed: true },
      ],
      thresholds: [],
      markers: [],
      yMin: Math.floor((lo - pad) * 10) / 10,
      yMax: Math.ceil((hi + pad) * 10) / 10,
      readouts: [
        { label: 'Mittelwert', value: `${fmt(mean, 2)} g` },
        { label: 'Abweichung vom wahren Wert', value: `${dev >= 0 ? '+' : ''}${fmt(dev, 2)} g` },
        { label: 'Streuung der Einzelwerte s', value: `${fmt(s, 2)} g` },
        { label: 'Unsicherheit des Mittelwerts u', value: `± ${fmt(u, 2)} g` },
        { label: 'Systematischer Fehler erkennbar?', value: detected ? 'ja' : 'nein', tone: detected ? 'ok' : 'warn' },
      ],
      atCursor: (i) => [{ label: `Messung ${i + 1}`, value: `${fmt(vals[i], 2)} g (Mittel bis hier ${fmt(running[i], 2)} g)` }],
      verdict: detected
        ? { tone: 'ok', text: `Der Mittelwert liegt ${fmt(Math.abs(dev), 2)} g neben dem wahren Wert und die Unsicherheit beträgt nur ± ${fmt(u, 2)} g. Das ist ein systematischer Fehler, den eine Kalibrierung korrigiert.${small ? ' Die Waage ist präzise, aber nicht richtig.' : ''}` }
        : { tone: 'warn', text: `Die Abweichung von ${fmt(dev, 2)} g ist kleiner als die doppelte Unsicherheit (± ${fmt(2 * u, 2)} g). Mit dieser Messreihe lässt sich ein Fehler nicht vom Zufall unterscheiden. Mehr Messungen oder ein ruhigeres Gerät helfen.` },
    };
  },
};

// ───────────────────────── Sicherheitenwert ─────────────────────────

export const collateralModel: ModelDef = {
  id: 'EXP:NOX:COLLATERAL-FRAME',
  title: 'Kreditrahmen aus Sicherheiten',
  intro: 'Gebäude zählen voll, Schiffe nur zu einem Teil ihres Neupreises. Darauf wendet die Bank die Beleihungsquote an, und am Ende bremst die Obergrenze. Verschiebe den Schiffswert und beobachte, wo die Obergrenze greift.',
  params: [
    { kind: 'range', key: 'building', label: 'Gebäudewert', unit: 'Cr', min: 0, max: 100000, step: 1000, def: 20000 },
    { kind: 'range', key: 'ship', label: 'Schiff (Neupreis)', unit: 'Cr', min: 0, max: 100000, step: 1000, def: 30000 },
    { kind: 'range', key: 'share', label: 'Anrechnung des Schiffs', unit: '%', min: 30, max: 100, step: 5, def: 60 },
    { kind: 'range', key: 'quote', label: 'Beleihungsquote', unit: '%', min: 30, max: 100, step: 5, def: 70 },
    { kind: 'range', key: 'drop', label: 'Wertverlust der Sicherheit bei Verwertung', unit: '%', min: 0, max: 60, step: 5, def: 0 },
  ],
  tryThis: [
    'Vergleiche die Linie mit und ohne Obergrenze: ab etwa 86.000 Cr Schiffswert hilft ein wertvolleres Schiff nicht mehr.',
    'Erhöhe den Wertverlust: ab einem Verlust von 30 % ist ein bei 70 % Quote voll ausgeschöpfter Kredit nicht mehr gedeckt. Daher liegt die Quote unter 100 %.',
    'Setze die Schiffsanrechnung auf 100 %: der Rahmen steigt, aber auch das Risiko der Bank, weil Schiffe schnell an Wert verlieren.',
  ],
  assumptions: 'Rahmen = Beleihungsquote · (Gebäudewert + Anrechnung · Schiffs-Neupreis), höchstens 50.000 Cr (Stand der NOXIA-Module). Die Deckung vergleicht den Sicherheitenwert nach Wertverlust mit dem voll ausgeschöpften Rahmen.',
  simulate: (v) => {
    const CAP = 50000;
    const frame = (ship: number, capped: boolean) => {
      const raw = (v.quote / 100) * (v.building + (v.share / 100) * ship);
      return capped ? Math.min(CAP, raw) : raw;
    };
    const ships = linspace(0, 100000, 51);
    const cur = frame(v.ship, true);
    const noShip = frame(0, true);
    const value = v.building + (v.share / 100) * v.ship;
    const coverage = cur > 0 ? (value * (1 - v.drop / 100)) / cur : Infinity;
    const capBites = (v.quote / 100) * value > CAP;
    const tone: Tone = coverage < 1 ? 'bad' : coverage < 1.2 ? 'warn' : 'ok';
    const markers: Marker[] = [{ x: v.ship, label: 'dein Schiff', color: '#8a8a8a' }];
    return {
      x: ships,
      xLabel: 'Neupreis des Schiffs (Cr)',
      yLabel: 'Kreditrahmen (Cr)',
      series: [
        { name: 'ohne Obergrenze', color: '#8a8a8a', values: ships.map((s) => frame(s, false)), dashed: true },
        { name: 'mit Obergrenze 50.000 Cr', color: '#2f6fb0', values: ships.map((s) => frame(s, true)) },
      ],
      thresholds: [{ y: CAP, label: 'Obergrenze 50.000 Cr', tone: 'warn' }],
      markers,
      yMin: 0,
      readouts: [
        { label: 'Anrechenbarer Sicherheitenwert', value: cr(value) },
        { label: 'Kreditrahmen', value: cr(cur), tone: capBites ? 'warn' : 'ok' },
        { label: 'Rahmen ohne Schiff', value: cr(noShip) },
        { label: 'Verlust bei Schiffsverkauf', value: cr(cur - noShip) },
        { label: 'Deckung nach Wertverlust', value: Number.isFinite(coverage) ? `${fmt(coverage * 100, 0)} %` : '–', tone },
      ],
      atCursor: (i) => [{ label: `Schiff ${cr(ships[i])}`, value: `Rahmen ${cr(frame(ships[i], true))}` }],
      verdict: capBites
        ? { tone: 'warn', text: `Die Obergrenze von 50.000 Cr bremst: Die Sicherheiten würden ${cr(frame(v.ship, false))} tragen, ausgezahlt werden ${cr(cur)}. Ein noch wertvolleres Schiff ändert daran nichts.` }
        : { tone, text: `Der Rahmen beträgt ${cr(cur)}. Verliert die Sicherheit bei der Verwertung ${fmt(v.drop, 0)} %, deckt sie den voll ausgeschöpften Kredit zu ${fmt(coverage * 100, 0)} %.${coverage < 1 ? ' Die Quote ist dann zu hoch angesetzt.' : ''}` },
    };
  },
};

// ───────────────────────── Arbitrage ─────────────────────────

export const arbitrageModel: ModelDef = {
  id: 'EXP:NOX:ARBITRAGE-ROUTE',
  title: 'Lohnt sich die Handelsroute?',
  intro: 'Der Preisunterschied ist nur der Anfang. Vom Erlös gehen Spediteur und Wettbewerb ab, und die Zeit zählt: Eine kürzere Route mit kleinerem Gewinn kann pro Tag mehr bringen.',
  params: [
    { kind: 'range', key: 'buy', label: 'Einkaufspreis', unit: 'Cr/t', min: 50, max: 200, step: 5, def: 100 },
    { kind: 'range', key: 'sell', label: 'Verkaufspreis am Zielort', unit: 'Cr/t', min: 50, max: 250, step: 5, def: 140 },
    { kind: 'range', key: 'tons', label: 'Menge', unit: 't', min: 5, max: 40, step: 5, def: 40 },
    { kind: 'range', key: 'fee', label: 'Spediteur vom Erlös', unit: '%', min: 0, max: 30, step: 1, def: 12 },
    { kind: 'range', key: 'days', label: 'Dauer einer Fahrt', unit: 'Tage', min: 1, max: 20, step: 1, def: 10 },
    { kind: 'range', key: 'rivals', label: 'Wettbewerber auf der Route', unit: '', min: 0, max: 8, step: 1, def: 0 },
    { kind: 'range', key: 'altProfit', label: 'Alternativroute: Gewinn je Fahrt', unit: 'Cr', min: 100, max: 2000, step: 50, def: 600 },
    { kind: 'range', key: 'altDays', label: 'Alternativroute: Dauer', unit: 'Tage', min: 1, max: 20, step: 1, def: 5 },
  ],
  tryThis: [
    'Erhöhe die Wettbewerber auf 4: der Preisunterschied schrumpft um jeweils 15 %, und die Route verliert deutlich an Gewinn.',
    'Senke den Verkaufspreis auf etwa 114 Cr/t: dann liegt der Gewinn bei null, das ist der Break-even-Preis.',
    'Vergleiche die beiden Linien über 60 Tage: die kleinere, aber schnellere Alternativroute überholt die Hauptroute.',
  ],
  assumptions: 'Der Spediteur nimmt seinen Anteil vom Erlös. Jeder Wettbewerber verringert den Preisunterschied um 15 % (multiplikativ). Das Kapital wird nach jeder Fahrt sofort wieder eingesetzt, Rückfahrt ohne Ladung ist nicht modelliert.',
  simulate: (v) => {
    const spread = (v.sell - v.buy) * Math.pow(0.85, v.rivals);
    const sell = v.buy + spread;
    const revenue = v.tons * sell;
    const cost = v.tons * v.buy;
    const fee = revenue * (v.fee / 100);
    const profit = revenue - cost - fee;
    const perDay = profit / v.days;
    const altPerDay = v.altProfit / v.altDays;
    const breakEven = v.buy + (v.buy / (1 - v.fee / 100) - v.buy) / Math.pow(0.85, v.rivals);
    const days = linspace(0, 60, 61);
    const cum = (p: number, d: number) => days.map((x) => Math.floor(x / d + 1e-9) * p);
    const better = perDay >= altPerDay;
    const tone: Tone = profit <= 0 ? 'bad' : better ? 'ok' : 'warn';
    return {
      x: days,
      xLabel: 'Tage',
      yLabel: 'Kumulierter Gewinn (Cr)',
      series: [
        { name: 'Hauptroute', color: '#2f6fb0', values: cum(profit, v.days) },
        { name: 'Alternativroute', color: '#c2622d', values: cum(v.altProfit, v.altDays), dashed: true },
      ],
      thresholds: [],
      markers: [],
      readouts: [
        { label: 'Roher Preisunterschied', value: cr(v.tons * (v.sell - v.buy)) },
        { label: 'Nach Wettbewerb', value: cr(v.tons * spread) },
        { label: 'Spediteur', value: cr(fee) },
        { label: 'Gewinn je Fahrt', value: cr(profit), tone: profit > 0 ? 'ok' : 'bad' },
        { label: 'Gewinn pro Tag', value: `${fmt(perDay, 0)} Cr (Alternative ${fmt(altPerDay, 0)} Cr)`, tone: better ? 'ok' : 'warn' },
        { label: 'Break-even-Verkaufspreis', value: `${fmt(breakEven, 1)} Cr/t` },
      ],
      atCursor: (i) => [
        { label: `Nach ${fmt(days[i], 0)} Tagen`, value: `${cr(cum(profit, v.days)[i])} (Alternative ${cr(cum(v.altProfit, v.altDays)[i])})` },
      ],
      verdict: profit <= 0
        ? { tone, text: 'Die Route macht Verlust: Spediteur und Wettbewerb fressen den Preisunterschied auf. Erst ein höherer Zielpreis oder weniger Konkurrenz machen sie lohnend.' }
        : { tone, text: `Die Hauptroute bringt ${cr(profit)} je Fahrt, das sind ${fmt(perDay, 0)} Cr pro Tag. Die Alternative schafft ${fmt(altPerDay, 0)} Cr pro Tag. ${better ? 'Die Hauptroute liegt vorn.' : 'Die schnellere Alternative liegt vorn, obwohl ihre einzelne Fahrt weniger bringt.'}` },
    };
  },
};

// ───────────────────────── Bodenwert ─────────────────────────

export const landValueModel: ModelDef = {
  id: 'EXP:NOX:LAND-VALUE-PAYBACK',
  title: 'Lage, Steuern und Amortisation eines Grundstücks',
  intro: 'Gleiche Fläche, gleiches Gebäude, andere Lage. Der Boden kostet mehr, bringt aber mehr Ertrag. Dazu kommen Konsumsteuer auf den Bau und laufende Grundsteuer. Wann ist der Einsatz wieder drin?',
  params: [
    { kind: 'range', key: 'area', label: 'Grundstücksfläche', unit: 'm²', min: 50, max: 500, step: 10, def: 200 },
    { kind: 'range', key: 'build', label: 'Baukosten netto', unit: 'Cr/m²', min: 0, max: 300, step: 10, def: 100 },
    { kind: 'range', key: 'tax', label: 'Grundsteuer auf den Bodenwert', unit: '% pro Jahr', min: 0, max: 5, step: 0.1, def: 1.5 },
  ],
  tryThis: [
    'Erhöhe die Grundsteuer auf 5 %: die Amortisation am Rand verlängert sich auf über 40 Jahre, in der Mitte auf gut 25. Die Steuer trifft den teuren Boden absolut stärker, der höhere Ertrag fängt sie aber ab.',
    'Setze die Baukosten auf 0: ohne Gebäude gibt es keinen Ertrag, aber weiter Grundsteuer. Die Amortisation entfällt, beide Linien fallen.',
    'Beachte die Steuer im Baupreis: bei 100 Cr/m² netto zahlst du 119 Cr/m². Die 19 Cr/m² sind keine Baukosten, sondern Steuer.',
  ],
  assumptions: 'Spielwerte: Mitte 400 Cr/m² Boden und 40 Cr/m² Ertrag pro Jahr, Rand 150 Cr/m² und 14 Cr/m². Konsumsteuer 19 % auf die Baukosten. Keine Wertsteigerung, keine Zinsen.',
  simulate: (v) => {
    const sites = [
      { name: 'Ortsmitte', price: 400, income: 40, color: '#2f6fb0' },
      { name: 'Ortsrand', price: 150, income: 14, color: '#c2622d' },
    ];
    const years = linspace(0, 30, 31);
    const buildGross = v.build * 1.19 * v.area;
    const calc = sites.map((s) => {
      const land = s.price * v.area;
      const cost = land + buildGross;
      const annual = (v.build > 0 ? s.income * v.area : 0) - (v.tax / 100) * land;
      return { ...s, land, cost, annual, payback: annual > 0 ? cost / annual : Infinity, values: years.map((y) => -cost + annual * y) };
    });
    const bare = years.map((y) => -(calc[0].land) - (v.tax / 100) * calc[0].land * y);
    const pb = (p: number): Tone => (p > 30 ? 'bad' : p > 15 ? 'warn' : 'ok');
    return {
      x: years,
      xLabel: 'Jahre',
      yLabel: 'Kumulierte Bilanz (Cr)',
      series: [
        ...calc.map((c) => ({ name: `${c.name} bebaut`, color: c.color, values: c.values })),
        { name: 'Ortsmitte unbebaut', color: '#8a8a8a', values: bare, dashed: true },
      ],
      thresholds: [{ y: 0, label: 'Einsatz wieder drin', tone: 'warn' }],
      markers: [],
      readouts: [
        { label: 'Grundstück Mitte / Rand', value: `${cr(calc[0].land)} / ${cr(calc[1].land)}` },
        { label: 'Bau brutto (Steuer enthalten)', value: `${cr(buildGross)} (${cr(buildGross - v.build * v.area)})` },
        { label: 'Überschuss pro Jahr Mitte', value: cr(calc[0].annual), tone: calc[0].annual > 0 ? 'ok' : 'bad' },
        { label: 'Überschuss pro Jahr Rand', value: cr(calc[1].annual), tone: calc[1].annual > 0 ? 'ok' : 'bad' },
        { label: 'Amortisation Mitte', value: Number.isFinite(calc[0].payback) ? `${fmt(calc[0].payback, 1)} Jahre` : 'nie', tone: pb(calc[0].payback) },
        { label: 'Amortisation Rand', value: Number.isFinite(calc[1].payback) ? `${fmt(calc[1].payback, 1)} Jahre` : 'nie', tone: pb(calc[1].payback) },
      ],
      atCursor: (i) => [
        { label: `Nach ${fmt(years[i], 0)} Jahren Mitte`, value: cr(calc[0].values[i]) },
        { label: 'Rand', value: cr(calc[1].values[i]) },
      ],
      verdict: Number.isFinite(calc[0].payback)
        ? { tone: pb(calc[0].payback), text: `In der Ortsmitte ist der Einsatz nach ${fmt(calc[0].payback, 1)} Jahren zurück${Number.isFinite(calc[1].payback) ? `, am Rand nach ${fmt(calc[1].payback, 1)} Jahren` : ', am Rand nie'}. Der Boden kostet in der Mitte mehr, trägt aber auch mehr. Unbebaut zahlst du nur Steuer.` }
        : { tone: 'bad', text: 'Mit diesen Annahmen amortisiert sich das Grundstück auch in der Mitte nicht: Die Grundsteuer frisst den Ertrag.' },
    };
  },
};

export const workshopModels: ModelDef[] = [smeltingModel, roboticDrillModel, calibrationModel, collateralModel, arbitrageModel, landValueModel];
export const allModels: ModelDef[] = [...habitatModels, ...workshopModels];
export function getModel(id: string): ModelDef | undefined {
  return allModels.find((m) => m.id === id);
}
