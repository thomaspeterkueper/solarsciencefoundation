/**
 * Reine Rechenmodelle für die Habitat-Lernmodule (keine React-Abhängigkeit, daher testbar).
 * Jedes Modell liefert Kurven, Schwellen, Markierungen und Kennzahlen; die Darstellung übernimmt
 * components/learning/habitat/ModelLab.tsx.
 *
 * Alle Modelle sind bewusst vereinfachte Lehrmodelle. Annahmen stehen in `assumptions`.
 */

export type ParamDef =
  | { kind: 'range'; key: string; label: string; unit: string; min: number; max: number; step: number; def: number }
  | { kind: 'select'; key: string; label: string; options: { value: number; label: string }[]; def: number }
  | { kind: 'toggle'; key: string; label: string; def: number };

export type Tone = 'ok' | 'warn' | 'bad';
export type Series = { name: string; color: string; values: number[]; dashed?: boolean; thin?: boolean };
export type Threshold = { y: number; label: string; tone: 'warn' | 'bad' };
export type Marker = { x: number; label: string; color: string };
export type Readout = { label: string; value: string; tone?: Tone };

export type SimResult = {
  x: number[];
  xLabel: string;
  yLabel: string;
  series: Series[];
  thresholds: Threshold[];
  markers: Marker[];
  logY?: boolean;
  yMin?: number;
  yMax?: number;
  /** Kennzahlen, die unabhängig vom Cursor gelten. */
  readouts: Readout[];
  /** Kennzahlen am Cursor (Index in x). */
  atCursor: (i: number) => Readout[];
  verdict: { tone: Tone; text: string };
};

export type ModelDef = {
  id: string;
  title: string;
  intro: string;
  params: ParamDef[];
  tryThis: string[];
  assumptions: string;
  simulate: (v: Record<string, number>) => SimResult;
};

const AIR_DENSITY = 1.204; // kg/m³ bei 20 °C, 1 atm
const P_ATM = 101.325; // kPa

export function defaults(model: ModelDef): Record<string, number> {
  return Object.fromEntries(model.params.map((p) => [p.key, p.def]));
}

export function fmt(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return '–';
  return n.toLocaleString('de-DE', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}


const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
/** Wissenschaftliche Schreibweise mit deutschem Komma und hochgestelltem Exponenten, z. B. 4,8 · 10⁻³. */
export function sci(v: number): string {
  if (!Number.isFinite(v) || v === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / Math.pow(10, e);
  return `${fmt(m, 1)} · 10${String(e).split('').map((c) => SUP[c] ?? c).join('')}`;
}

export function fmtDuration(hours: number): string {
  if (!Number.isFinite(hours)) return 'nie';
  if (hours < 1 / 60) return `${fmt(hours * 3600, 0)} s`;
  if (hours < 1) return `${fmt(hours * 60, 0)} min`;
  if (hours < 48) return `${fmt(hours, 1)} h`;
  return `${fmt(hours / 24, 1)} Tage`;
}

function linspace(a: number, b: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

/** Deterministischer Zufall, damit Rauschen bei gleichen Reglern reproduzierbar bleibt. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gaussian(rand: () => number): number {
  const u = Math.max(rand(), 1e-12);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ───────────────────────── Druck / Leck ─────────────────────────

/**
 * Leck in Vakuum/dünne Atmosphäre (Mars ≈ 0,6 kPa): abgeschnürte Düsenströmung, ṁ = c·A·p mit
 * c = Cd·√(γ/(R·T))·(2/(γ+1))^((γ+1)/(2(γ−1))). Isothermes Volumen ⇒ p(t) = p∞ + (p0 − p∞)·e^(−t/τ).
 */
export const pressureLeakModel: ModelDef = {
  id: 'EXP:HABITAT:PRESSURE-LEAK',
  title: 'Druckverlust durch ein kleines Leck',
  intro: 'Ein Loch in der Hülle lässt Luft ins Vakuum strömen. Die Nachspeisung versucht, den Druck zu halten. Beobachte, wie lange die Warnschwelle auf sich warten lässt – und welche Kraft auf der Luke liegt.',
  params: [
    { kind: 'range', key: 'volume', label: 'Habitatvolumen', unit: 'm³', min: 30, max: 500, step: 10, def: 150 },
    { kind: 'range', key: 'hole', label: 'Lochdurchmesser', unit: 'mm', min: 1, max: 60, step: 1, def: 12 },
    { kind: 'range', key: 'makeup', label: 'Nachspeisung (Luft)', unit: 'l/min', min: 0, max: 3000, step: 50, def: 0 },
  ],
  tryThis: [
    'Verdopple den Lochdurchmesser: die Zeitkonstante sinkt auf ein Viertel, weil die Fläche mit d² wächst.',
    'Schalte die Nachspeisung hoch: der Druck sinkt langsamer, stellt sich aber auf einen niedrigeren Gleichgewichtswert ein – die Nachspeisung verdeckt das Leck.',
    'Lies die Kraft auf der Luke ab: ein Quadratmeter bei 100 kPa Differenz trägt rund 10 Tonnen.',
  ],
  assumptions: 'Abgeschnürte Strömung (Durchflussbeiwert 0,6), Temperatur 20 °C konstant, Umgebung ≈ Vakuum. Gilt, solange der Innendruck mehr als etwa das Doppelte des Außendrucks beträgt.',
  simulate: (v) => {
    const Cd = 0.6, gamma = 1.4, R = 287, T = 293.15;
    const c = Cd * Math.sqrt(gamma / (R * T)) * Math.pow(2 / (gamma + 1), (gamma + 1) / (2 * (gamma - 1)));
    const A = Math.PI * Math.pow(v.hole / 1000 / 2, 2);
    const tau = v.volume / (c * R * T * A); // s
    const mIn = (v.makeup * (AIR_DENSITY / 1000)) / 60; // kg/s
    const pInf = Math.max(0, Math.min(P_ATM, (mIn / (c * A)) / 1000)); // kPa
    const pAt = (tS: number) => (pInf >= P_ATM ? P_ATM : pInf + (P_ATM - pInf) * Math.exp(-tS / tau));
    const horizonS = Math.min(24 * 3600, Math.max(900, 4 * tau));
    const useHours = horizonS >= 2 * 3600;
    const unit = useHours ? 3600 : 60;
    const t = linspace(0, horizonS, 121);
    const p = t.map(pAt);
    const warn = 90, crit = 60;
    const crossing = (th: number) => (pInf >= th ? Infinity : -tau * Math.log((th - pInf) / (P_ATM - pInf)));
    const tWarn = crossing(warn), tCrit = crossing(crit);
    const forceKN = (pk: number) => Math.max(0, pk - 0.6) * 1; // kPa · 1 m² = kN
    const tone = (s: number): Tone => (s < 600 ? 'bad' : s < 3600 ? 'warn' : 'ok');
    const verdict: SimResult['verdict'] = !Number.isFinite(tCrit)
      ? { tone: 'warn', text: `Die Nachspeisung hält den Druck bei ${fmt(pInf, 0)} kPa. Das Leck ist damit nicht behoben, sondern nur verdeckt. Wer nur den Druck beobachtet, sieht nichts, wer die Nachspeiserate beobachtet, sieht es sofort.` }
      : { tone: tone(tCrit), text: `Vom Leck bis zur kritischen Grenze (${crit} kPa) vergehen ${fmtDuration(tCrit / 3600)}. Die Warnschwelle (${warn} kPa) kommt nach ${fmtDuration(tWarn / 3600)}.` };
    return {
      x: t.map((s) => s / unit),
      xLabel: useHours ? 'Zeit seit Leckbeginn (h)' : 'Zeit seit Leckbeginn (min)',
      yLabel: 'Innendruck (kPa)',
      series: [{ name: 'Innendruck', color: '#2f6fb0', values: p }],
      thresholds: [{ y: warn, label: 'Warnschwelle 90 kPa', tone: 'warn' }, { y: crit, label: 'kritisch 60 kPa', tone: 'bad' }],
      markers: [],
      yMin: 0,
      yMax: 105,
      readouts: [
        { label: 'Zeitkonstante τ', value: fmtDuration(tau / 3600) },
        { label: 'Bis Warnschwelle', value: fmtDuration(tWarn / 3600), tone: Number.isFinite(tWarn) ? tone(tWarn) : 'warn' },
        { label: 'Bis kritisch', value: fmtDuration(tCrit / 3600), tone: Number.isFinite(tCrit) ? tone(tCrit) : 'warn' },
        { label: 'Luftverlust anfangs', value: `${fmt((c * A * P_ATM * 1000 * 60 / AIR_DENSITY) * 1000, 0)} l/min` },
      ],
      atCursor: (i) => [
        { label: 'Druck jetzt', value: `${fmt(p[i], 1)} kPa` },
        { label: 'Kraft auf 1 m² Luke', value: `${fmt(forceKN(p[i]), 0)} kN (≈ ${fmt(forceKN(p[i]) / 9.81, 1)} t)` },
      ],
      verdict,
    };
  },
};

// ───────────────────────── Schleuse ─────────────────────────

export const airlockModel: ModelDef = {
  id: 'EXP:HABITAT:AIRLOCK-CYCLE',
  title: 'Luftverlust einer Schleuse über viele Zyklen',
  intro: 'Bei jedem Zyklus bleibt die Luft zurück, die nicht zurückgepumpt wurde. Kleine Verluste pro Zyklus werden über Tage zu einem echten Versorgungsproblem.',
  params: [
    { kind: 'range', key: 'volume', label: 'Schleusenvolumen', unit: 'm³', min: 1, max: 12, step: 0.5, def: 4 },
    { kind: 'range', key: 'recovery', label: 'Rückgewinnung durch Pumpe', unit: '%', min: 0, max: 99, step: 1, def: 90 },
    { kind: 'range', key: 'pump', label: 'Pumpleistung', unit: 'm³/min', min: 0.5, max: 10, step: 0.5, def: 2 },
    { kind: 'range', key: 'cycles', label: 'Zyklen pro Tag', unit: '', min: 2, max: 40, step: 1, def: 12 },
    { kind: 'range', key: 'reserve', label: 'Luftreserve für Verluste', unit: 'kg', min: 5, max: 150, step: 5, def: 40 },
  ],
  tryThis: [
    'Erhöhe die Rückgewinnung von 90 auf 99 %: der Verlust pro Zyklus fällt um den Faktor zehn, die Zyklusdauer steigt aber.',
    'Halbiere das Schleusenvolumen: der Verlust halbiert sich, ohne Zeit zu kosten.',
    'Setze die Pumpleistung klein: die Schleuse wird zum Engpass für alle Außenarbeiten.',
  ],
  assumptions: 'Luft bei 1 atm und 20 °C (1,2 kg/m³). Die Restluft entspricht (1 − Rückgewinnung) des Schleusenvolumens bei Normaldruck. Pumpzeit: V/S · ln(1/(1 − Rückgewinnung)) plus 3 min für Türen und Prüfungen.',
  simulate: (v) => {
    const r = v.recovery / 100;
    const lossPerCycle = v.volume * AIR_DENSITY * (1 - r);
    const pumpMin = (v.volume / v.pump) * Math.log(1 / Math.max(1 - r, 0.01));
    const cycleMin = pumpMin + 3;
    const days = linspace(0, 30, 31);
    const cumulative = days.map((d) => d * v.cycles * lossPerCycle);
    const perDay = v.cycles * lossPerCycle;
    const daysToReserve = perDay > 0 ? v.reserve / perDay : Infinity;
    const maxPerDay = (24 * 60) / cycleMin;
    const tone: Tone = daysToReserve < 10 ? 'bad' : daysToReserve < 30 ? 'warn' : 'ok';
    return {
      x: days,
      xLabel: 'Tage',
      yLabel: 'Kumulierter Luftverlust (kg)',
      series: [{ name: 'Luftverlust', color: '#c2622d', values: cumulative }],
      thresholds: [{ y: v.reserve, label: `Reserve ${fmt(v.reserve, 0)} kg`, tone: 'bad' }],
      markers: [],
      yMin: 0,
      readouts: [
        { label: 'Verlust pro Zyklus', value: `${fmt(lossPerCycle, 2)} kg` },
        { label: 'Dauer pro Zyklus', value: `${fmt(cycleMin, 1)} min` },
        { label: 'Verlust pro Tag', value: `${fmt(perDay, 1)} kg` },
        { label: 'Reserve reicht', value: fmtDuration(daysToReserve * 24), tone },
        { label: 'Max. Zyklen pro Tag', value: fmt(maxPerDay, 0), tone: v.cycles > maxPerDay ? 'bad' : 'ok' },
      ],
      atCursor: (i) => [{ label: `Nach ${fmt(days[i], 0)} Tagen`, value: `${fmt(cumulative[i], 1)} kg verloren` }],
      verdict: v.cycles > maxPerDay
        ? { tone: 'bad', text: `Mit dieser Pumpe sind höchstens ${fmt(maxPerDay, 0)} Zyklen am Tag möglich. Der Plan mit ${v.cycles} Zyklen ist nicht durchführbar.` }
        : { tone: tone, text: `Pro Tag gehen ${fmt(perDay, 1)} kg Luft verloren. Die Reserve von ${fmt(v.reserve, 0)} kg ist nach ${fmtDuration(daysToReserve * 24)} aufgebraucht, wenn keine Luft produziert wird.` },
    };
  },
};

// ───────────────────────── Lebenserhaltung / CO2 ─────────────────────────

export const co2Model: ModelDef = {
  id: 'EXP:HABITAT:CO2-BUILDUP',
  title: 'CO₂ steigt, wenn der Wäscher ausfällt',
  intro: 'Der Mensch erzeugt CO₂ ohne Pause. Fällt die Aufbereitung aus, entscheidet das Verhältnis von Mannschaft zu Luftvolumen, wie viel Zeit bleibt.',
  params: [
    { kind: 'range', key: 'crew', label: 'Besatzung', unit: 'Personen', min: 1, max: 12, step: 1, def: 4 },
    { kind: 'range', key: 'volume', label: 'Luftvolumen', unit: 'm³', min: 40, max: 500, step: 10, def: 150 },
    { kind: 'range', key: 'failAt', label: 'Wäscher fällt aus bei', unit: 'h', min: 1, max: 12, step: 1, def: 2 },
    { kind: 'range', key: 'residual', label: 'Restleistung des Wäschers', unit: '%', min: 0, max: 100, step: 5, def: 0 },
  ],
  tryThis: [
    'Setze die Besatzung auf 8 bei gleichem Volumen: die Reaktionszeit halbiert sich.',
    'Erhöhe die Restleistung auf 50 %: der Anstieg halbiert sich – ein teilweise laufender Reserveweg kauft viel Zeit.',
    'Vergleiche die Zeit bis 5.000 ppm mit der bis 30.000 ppm: die erste Grenze ist die entscheidende Vorwarnung.',
  ],
  assumptions: 'Etwa 20 l CO₂ pro Person und Stunde bei leichter Arbeit, gut durchmischte Luft, Ausgangswert 600 ppm. Die Grenzwerte sind Richtgrößen (5.000 ppm Dauergrenze, 30.000 ppm akut gefährlich).',
  simulate: (v) => {
    const risePerHour = (v.crew * 20) / (v.volume * 1000) * 1e6 * (1 - v.residual / 100); // ppm/h nach Ausfall
    const base = 600;
    const t = linspace(0, 24, 97);
    const ppm = t.map((h) => base + Math.max(0, h - v.failAt) * risePerHour);
    const toLimit = (limit: number) => (risePerHour > 0 ? (limit - base) / risePerHour : Infinity);
    const t5 = toLimit(5000), t30 = toLimit(30000);
    const tone = (h: number): Tone => (h < 3 ? 'bad' : h < 12 ? 'warn' : 'ok');
    return {
      x: t,
      xLabel: 'Zeit (h)',
      yLabel: 'CO₂ (ppm)',
      series: [{ name: 'CO₂-Konzentration', color: '#6a5acd', values: ppm }],
      thresholds: [{ y: 5000, label: '5.000 ppm Dauergrenze', tone: 'warn' }, { y: 30000, label: '30.000 ppm akut', tone: 'bad' }],
      markers: [{ x: v.failAt, label: 'Ausfall', color: '#b3261e' }],
      yMin: 0,
      readouts: [
        { label: 'Anstieg nach Ausfall', value: `${fmt(risePerHour, 0)} ppm/h` },
        { label: 'Bis 5.000 ppm', value: fmtDuration(t5), tone: tone(t5) },
        { label: 'Bis 30.000 ppm', value: fmtDuration(t30), tone: tone(t30) },
      ],
      atCursor: (i) => [{ label: 'CO₂ jetzt', value: `${fmt(ppm[i], 0)} ppm` }],
      verdict: Number.isFinite(t5)
        ? { tone: tone(t5), text: `Nach dem Ausfall erreicht die Luft die Dauergrenze in ${fmtDuration(t5)}. Das ist die Zeit, die für Diagnose, Umschalten auf den Reserveweg oder Ausweichen bleibt.` }
        : { tone: 'ok', text: 'Der Reserveweg gleicht die Produktion vollständig aus. Der Pegel bleibt auf dem Ausgangswert.' },
    };
  },
};

// ───────────────────────── Thermik ─────────────────────────

export const thermalModel: ModelDef = {
  id: 'EXP:HABITAT:THERMAL-DRIFT',
  title: 'Temperaturverlauf nach Ausfall der Kühlung',
  intro: 'Das Habitat erzeugt Wärme und verliert sie durch die Hülle. Solange der Kühlkreis läuft, bleibt die Temperatur konstant. Fällt er aus, zeigt sich, wie viel Zeit die thermische Trägheit kauft.',
  params: [
    { kind: 'range', key: 'power', label: 'Interne Wärmeleistung', unit: 'kW', min: 1, max: 30, step: 0.5, def: 8 },
    { kind: 'range', key: 'ua', label: 'Wärmeverlust der Hülle (UA)', unit: 'W/K', min: 10, max: 400, step: 5, def: 60 },
    { kind: 'range', key: 'mass', label: 'Wärmekapazität des Habitats', unit: 'MJ/K', min: 1, max: 50, step: 1, def: 12 },
    { kind: 'range', key: 'cooling', label: 'Leistung des Kühlkreises', unit: 'kW', min: 0, max: 30, step: 0.5, def: 5 },
    { kind: 'range', key: 'failAt', label: 'Kühlkreis fällt aus bei', unit: 'h', min: 1, max: 12, step: 1, def: 4 },
    { kind: 'range', key: 'outside', label: 'Außentemperatur', unit: '°C', min: -100, max: 20, step: 5, def: -60 },
  ],
  tryThis: [
    'Verdopple die Wärmekapazität: der Anstieg wird halb so schnell – die Gleichgewichtstemperatur bleibt aber gleich.',
    'Erhöhe UA (schlechtere Dämmung): die Gleichgewichtstemperatur sinkt stark. Gute Dämmung ist nur mit funktionierender Wärmeabfuhr sinnvoll.',
    'Setze den Kühlkreis auf 0 kW und die Außentemperatur auf 20 °C: ohne Senke gibt es keinen stabilen Zustand im Wohnbereich.',
  ],
  assumptions: 'Einzelner Wärmespeicher mit gleichmäßiger Temperatur, Start bei 22 °C, Regelung hält 22 °C, solange der Kühlkreis seine Leistung bringt. Strahlungs- und Strömungseffekte sind im Wärmeverlust UA zusammengefasst.',
  simulate: (v) => {
    const Tset = 22;
    const C = v.mass * 1e6;
    const dt = 60;
    const steps = 24 * 60;
    let T = Tset;
    const temps: number[] = [];
    for (let k = 0; k <= steps; k++) {
      if (k % 15 === 0) temps.push(T);
      const hours = (k * dt) / 3600;
      const loss = v.ua * (T - v.outside);
      let cool = 0;
      if (hours < v.failAt) {
        const needed = Math.max(0, v.power * 1000 - loss);
        cool = Math.min(v.cooling * 1000, T >= Tset ? needed : 0);
      }
      T += ((v.power * 1000 - loss - cool) / C) * dt;
    }
    const t = temps.map((_, i) => i * 0.25);
    const Teq = v.outside + (v.power * 1000) / v.ua;
    const tauH = C / v.ua / 3600;
    let tHot = Infinity;
    for (let i = 0; i < temps.length; i++) if (t[i] >= v.failAt && temps[i] >= 30) { tHot = t[i] - v.failAt; break; }
    const needsCooling = v.power * 1000 > v.ua * (Tset - v.outside);
    const holds = !needsCooling || v.cooling * 1000 >= v.power * 1000 - v.ua * (Tset - v.outside);
    const tone: Tone = !holds ? 'bad' : Number.isFinite(tHot) ? (tHot < 3 ? 'bad' : 'warn') : 'ok';
    return {
      x: t,
      xLabel: 'Zeit (h)',
      yLabel: 'Innentemperatur (°C)',
      series: [{ name: 'Innentemperatur', color: '#c2402d', values: temps }],
      thresholds: [{ y: 30, label: '30 °C zu warm', tone: 'warn' }, { y: 10, label: '10 °C zu kalt', tone: 'warn' }],
      markers: [{ x: v.failAt, label: 'Kühlausfall', color: '#b3261e' }],
      readouts: [
        { label: 'Gleichgewicht ohne Kühlung', value: `${fmt(Teq, 0)} °C`, tone: Teq > 30 || Teq < 10 ? 'bad' : 'ok' },
        { label: 'Zeitkonstante τ = C/UA', value: fmtDuration(tauH) },
        { label: 'Bis 30 °C nach Ausfall', value: fmtDuration(tHot), tone: Number.isFinite(tHot) ? (tHot < 3 ? 'bad' : 'warn') : 'ok' },
      ],
      atCursor: (i) => [{ label: 'Temperatur jetzt', value: `${fmt(temps[i], 1)} °C` }],
      verdict: !holds
        ? { tone: 'bad', text: 'Die Kühlleistung reicht schon im Normalbetrieb nicht aus. Die Temperatur driftet vom Sollwert weg, bevor überhaupt etwas ausfällt.' }
        : Number.isFinite(tHot)
          ? { tone, text: `Nach dem Ausfall erreicht das Habitat 30 °C in ${fmtDuration(tHot)}. Die Trägheit kauft Zeit, ersetzt aber keine Wärmesenke: Das Gleichgewicht liegt bei ${fmt(Teq, 0)} °C.` }
          : { tone: 'ok', text: `Auch ohne Kühlung bleibt die Temperatur unter 30 °C (Gleichgewicht ${fmt(Teq, 0)} °C). Prüfe die Untergrenze: Zu starke Wärmeverluste können das Gegenteil bewirken.` },
    };
  },
};

// ───────────────────────── Strahlung ─────────────────────────

const SHIELD_MATERIALS = [
  { value: 6, label: 'Wasser (Halbwertsdicke ≈ 6 cm)' },
  { value: 5, label: 'Polyethylen (≈ 5 cm)' },
  { value: 5.5, label: 'Marsregolith (≈ 5,5 cm)' },
  { value: 3.5, label: 'Aluminium (≈ 3,5 cm)' },
];

export const radiationModel: ModelDef = {
  id: 'EXP:HABITAT:RADIATION-SHELTER',
  title: 'Dosis in einem Sonnenpartikelsturm',
  intro: 'Während eines Sturms wird jede Stunde im Freien teuer. Vergleiche Wohnbereich und Rückzugsraum und finde die Dicke, mit der die Dosis unter dem Richtwert bleibt.',
  params: [
    { kind: 'select', key: 'hvl', label: 'Abschirmmaterial', options: SHIELD_MATERIALS, def: 6 },
    { kind: 'range', key: 'thickness', label: 'Dicke des Rückzugsraums', unit: 'cm', min: 0, max: 100, step: 5, def: 20 },
    { kind: 'range', key: 'share', label: 'Zeit im Rückzugsraum', unit: '%', min: 0, max: 100, step: 5, def: 100 },
    { kind: 'range', key: 'rate', label: 'Dosisleistung ungeschützt', unit: 'mSv/h', min: 5, max: 100, step: 5, def: 30 },
  ],
  tryThis: [
    'Stelle die Dicke auf 0 cm: ohne Schutz summiert sich in zwei Tagen ein Mehrfaches des Richtwerts.',
    'Wechsle das Material bei gleicher Dicke: leichte, wasserstoffreiche Stoffe schneiden besser ab als schwere – pro Masse.',
    'Senke die Zeit im Rückzugsraum auf 50 %: der Wohnbereich bestimmt dann fast die gesamte Dosis. Ein Rückzugsraum nützt nur, wenn man ihn nutzt.',
  ],
  assumptions: 'Vereinfachte exponentielle Abschwächung (Halbwertsdicke) für Protonen eines Sonnenpartikelsturms. Wohnbereich mit 5 cm gleichem Material. Für galaktische kosmische Strahlung wirkt Abschirmung deutlich schwächer; Sekundärstrahlung ist nicht modelliert. Richtwert 250 mSv (30 Tage, grob).',
  simulate: (v) => {
    const hours = linspace(0, 48, 49);
    const living = Math.pow(0.5, 5 / v.hvl);
    const shelter = Math.pow(0.5, v.thickness / v.hvl);
    const eff = (v.share / 100) * shelter + (1 - v.share / 100) * living;
    const bare = hours.map((h) => h * v.rate);
    const plan = hours.map((h) => h * v.rate * eff);
    const allShelter = hours.map((h) => h * v.rate * shelter);
    const total = plan[plan.length - 1];
    const limit = 250;
    const tone: Tone = total > limit ? 'bad' : total > limit * 0.5 ? 'warn' : 'ok';
    // nötige Dicke, damit reiner Rückzug unter dem Richtwert bleibt
    const needed = v.rate * 48 > limit ? v.hvl * Math.log2((v.rate * 48) / limit) : 0;
    return {
      x: hours,
      xLabel: 'Sturmdauer (h)',
      yLabel: 'Aufgenommene Dosis (mSv)',
      series: [
        { name: 'ohne Schutz', color: '#8a8a8a', values: bare, dashed: true },
        { name: 'mit gewählter Strategie', color: '#c2402d', values: plan },
        { name: 'dauerhaft im Rückzugsraum', color: '#3d8b5f', values: allShelter, thin: true },
      ],
      thresholds: [{ y: limit, label: 'Richtwert 250 mSv', tone: 'bad' }],
      markers: [],
      yMin: 0,
      readouts: [
        { label: 'Dosis nach 48 h', value: `${fmt(total, 0)} mSv`, tone },
        { label: 'Wirksame Abschwächung', value: `${fmt(eff * 100, 1)} % der ungeschützten Dosis` },
        { label: 'Nötige Dicke für Richtwert', value: needed > 0 ? `≥ ${fmt(needed, 0)} cm` : 'keine' },
      ],
      atCursor: (i) => [{ label: `Nach ${fmt(hours[i], 0)} h`, value: `${fmt(plan[i], 0)} mSv (ungeschützt ${fmt(bare[i], 0)} mSv)` }],
      verdict: total > limit
        ? { tone, text: `Die Dosis von ${fmt(total, 0)} mSv liegt über dem Richtwert. Mit dauerhaftem Aufenthalt im Rückzugsraum wären es ${fmt(allShelter[48], 0)} mSv.` }
        : { tone, text: `Die Dosis bleibt mit ${fmt(total, 0)} mSv unter dem Richtwert. Der Rückzugsraum dämpft die Strahlung auf ${fmt(shelter * 100, 1)} % und der Wohnbereich nur auf ${fmt(living * 100, 0)} %.` },
    };
  },
};

// ───────────────────────── Monitoring ─────────────────────────

export const monitoringModel: ModelDef = {
  id: 'EXP:HABITAT:MONITORING-TREND',
  title: 'Schwellenalarm gegen Trendalarm',
  intro: 'Ein schleichendes Leck beginnt bei 2 h. Ein Schwellenalarm wartet, bis 90 kPa unterschritten sind. Ein Trendalarm rechnet den Verlauf hoch und warnt früher. Rauschen und ein defekter Sensor testen beide.',
  params: [
    { kind: 'range', key: 'leak', label: 'Leckrate', unit: 'kPa/h', min: 0.5, max: 6, step: 0.5, def: 2 },
    { kind: 'range', key: 'noise', label: 'Sensorrauschen (σ)', unit: 'kPa', min: 0.1, max: 2, step: 0.1, def: 0.5 },
    { kind: 'range', key: 'window', label: 'Trendfenster', unit: 'min', min: 15, max: 120, step: 5, def: 45 },
    { kind: 'range', key: 'horizon', label: 'Vorwarnhorizont', unit: 'h', min: 1, max: 6, step: 0.5, def: 3 },
    { kind: 'toggle', key: 'defect', label: 'Sensor 2 fällt bei 6 h aus (zeigt 70 kPa)', def: 0 },
    { kind: 'toggle', key: 'confirm', label: 'Alarm nur bei Bestätigung durch beide Sensoren', def: 0 },
  ],
  tryThis: [
    'Setze das Fenster klein und das Rauschen hoch: der Trendalarm löst falsch aus, bevor das Leck beginnt.',
    'Schalte den Sensorausfall ein, ohne Bestätigung: der Schwellenalarm löst aus, obwohl der Druck gesund ist.',
    'Schalte zusätzlich die Bestätigung ein: der Sensorfehler wird erkannt, die echte Leckwarnung bleibt – und das ist der Zweck der Redundanz.',
  ],
  assumptions: 'Nenndruck 101,3 kPa, Messung alle 5 min, lineare Ausgleichsgerade über das Fenster. Schwellenwert 90 kPa. Das Rauschen ist mit festem Startwert erzeugt und bei gleichen Reglern reproduzierbar.',
  simulate: (v) => {
    const stepH = 5 / 60;
    const n = 145;
    const t = Array.from({ length: n }, (_, i) => i * stepH);
    const r1 = mulberry32(11), r2 = mulberry32(29);
    const truth = t.map((h) => 101.3 - v.leak * Math.max(0, h - 2));
    const s1 = truth.map((p) => p + v.noise * gaussian(r1));
    const s2 = truth.map((p, i) => (v.defect && t[i] >= 6 ? 70 + v.noise * gaussian(r2) : p + v.noise * gaussian(r2)));
    const threshold = 90;
    const w = Math.max(3, Math.round(v.window / 5));
    const trendAlarm = (s: number[], i: number): boolean => {
      if (i < w) return false;
      const xs = Array.from({ length: w }, (_, k) => t[i - w + 1 + k]);
      const ys = s.slice(i - w + 1, i + 1);
      const mx = xs.reduce((a, b) => a + b, 0) / w, my = ys.reduce((a, b) => a + b, 0) / w;
      const sxx = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
      const sxy = xs.reduce((a, x, k) => a + (x - mx) * (ys[k] - my), 0);
      const slope = sxy / sxx;
      if (slope >= 0) return false;
      const current = my + slope * (t[i] - mx);
      return current <= threshold || (current - threshold) / -slope <= v.horizon;
    };
    const both = Boolean(v.confirm);
    const firstThr = () => t.findIndex((_, i) => (both ? s1[i] < threshold && s2[i] < threshold : s1[i] < threshold || s2[i] < threshold));
    const firstTrend = () => t.findIndex((_, i) => (both ? trendAlarm(s1, i) && trendAlarm(s2, i) : trendAlarm(s1, i) || trendAlarm(s2, i)));
    const iThr = firstThr(), iTrend = firstTrend();
    const tCross = 2 + (101.3 - threshold) / v.leak;
    const tThr = iThr >= 0 ? t[iThr] : Infinity;
    const tTrend = iTrend >= 0 ? t[iTrend] : Infinity;
    const falseThr = Number.isFinite(tThr) && tThr < tCross - 0.25;
    const falseTrend = Number.isFinite(tTrend) && tTrend < 2;
    const lead = Number.isFinite(tTrend) && !falseTrend ? tThr - tTrend : NaN;
    const markers: Marker[] = [{ x: 2, label: 'Leckbeginn', color: '#8a8a8a' }];
    if (Number.isFinite(tThr)) markers.push({ x: tThr, label: 'Schwellenalarm', color: falseThr ? '#b3261e' : '#c2622d' });
    if (Number.isFinite(tTrend)) markers.push({ x: tTrend, label: 'Trendalarm', color: falseTrend ? '#b3261e' : '#2f6fb0' });
    const verdictTone: Tone = falseThr || falseTrend ? 'bad' : Number.isFinite(lead) && lead > 0.5 ? 'ok' : 'warn';
    return {
      x: t,
      xLabel: 'Zeit (h)',
      yLabel: 'Druck (kPa)',
      series: [
        { name: 'wahrer Druck', color: '#8a8a8a', values: truth, dashed: true },
        { name: 'Sensor 1', color: '#2f6fb0', values: s1, thin: true },
        { name: 'Sensor 2', color: '#c2622d', values: s2, thin: true },
      ],
      thresholds: [{ y: threshold, label: 'Schwelle 90 kPa', tone: 'warn' }],
      markers,
      yMin: 60,
      yMax: 106,
      readouts: [
        { label: 'Echte Unterschreitung bei', value: fmtDuration(tCross) },
        { label: 'Schwellenalarm', value: Number.isFinite(tThr) ? `${fmtDuration(tThr)}${falseThr ? ' – Fehlalarm' : ''}` : 'kein Alarm', tone: falseThr ? 'bad' : 'warn' },
        { label: 'Trendalarm', value: Number.isFinite(tTrend) ? `${fmtDuration(tTrend)}${falseTrend ? ' – Fehlalarm' : ''}` : 'kein Alarm', tone: falseTrend ? 'bad' : 'ok' },
        { label: 'Vorwarnzeit durch Trend', value: Number.isFinite(lead) ? fmtDuration(lead) : '–', tone: Number.isFinite(lead) && lead > 0.5 ? 'ok' : 'warn' },
      ],
      atCursor: (i) => [
        { label: 'Sensor 1', value: `${fmt(s1[i], 1)} kPa` },
        { label: 'Sensor 2', value: `${fmt(s2[i], 1)} kPa` },
      ],
      verdict: falseThr
        ? { tone: 'bad', text: 'Der defekte Sensor löst den Schwellenalarm aus, obwohl der echte Druck noch gesund ist. Ohne unabhängige Gegenprüfung wäre das ein Fehlalarm mit Folgemaßnahmen.' }
        : falseTrend
          ? { tone: 'bad', text: 'Das Rauschen lässt den Trendalarm schon vor dem Leck auslösen. Das Fenster ist zu kurz oder das Rauschen zu hoch für diese Empfindlichkeit.' }
          : Number.isFinite(lead)
            ? { tone: verdictTone, text: `Der Trendalarm kommt ${fmtDuration(lead)} vor dem Schwellenalarm. Diese Zeit entscheidet, ob man das Leck sucht oder nur noch Folgen begrenzt.` }
            : { tone: 'warn', text: 'Mit den gewählten Einstellungen löst in 12 Stunden kein Alarm aus. Erhöhe die Leckrate oder prüfe, ob die Bestätigung beide Sensoren verlangt, obwohl einer ausgefallen ist.' },
    };
  },
};

// ───────────────────────── Redundanz ─────────────────────────

export const redundancyModel: ModelDef = {
  id: 'EXP:HABITAT:REDUNDANCY-COMMON-CAUSE',
  title: 'Warum mehr Einheiten nicht endlos helfen',
  intro: 'Mehrere gleiche Einheiten senken die Ausfallwahrscheinlichkeit nur, wenn sie unabhängig sind. Eine gemeinsame Ursache setzt eine Untergrenze, die kein zusätzliches Gerät unterschreitet.',
  params: [
    { kind: 'range', key: 'p', label: 'Ausfallwahrscheinlichkeit je Einheit pro Jahr', unit: '%', min: 0.5, max: 30, step: 0.5, def: 5 },
    { kind: 'range', key: 'beta', label: 'Anteil gemeinsamer Ursachen (β)', unit: '%', min: 0, max: 30, step: 1, def: 5 },
    { kind: 'range', key: 'goal', label: 'Zielwert pro Jahr (Exponent x in 10⁻ˣ)', unit: '', min: 2, max: 8, step: 1, def: 5 },
  ],
  tryThis: [
    'Setze β auf 0: jede zusätzliche Einheit verbessert die Lage um denselben Faktor.',
    'Setze β auf 10 %: schon die dritte Einheit bringt fast nichts mehr, weil die gemeinsame Ursache dominiert.',
    'Senke β statt eine vierte Einheit zu kaufen: unabhängige Energie, getrennte Leitungswege, unterschiedliche Software.',
  ],
  assumptions: 'β-Faktor-Modell: Ausfall durch gemeinsame Ursache = β·p; unabhängiger Anteil = ((1 − β)·p)ⁿ. Die Einheiten sind identisch, der Ausfall betrifft das ganze Teilsystem nur, wenn alle ausgefallen sind.',
  simulate: (v) => {
    const p = v.p / 100, beta = v.beta / 100;
    const ns = [1, 2, 3, 4, 5];
    const ideal = ns.map((n) => Math.pow(p, n));
    const real = ns.map((n) => (n === 1 ? p : beta * p + Math.pow((1 - beta) * p, n)));
    const goal = Math.pow(10, -v.goal);
    const need = ns.find((n, i) => real[i] <= goal);
    const floor = beta * p;
    return {
      x: ns,
      xLabel: 'Anzahl redundanter Einheiten',
      yLabel: 'Ausfallwahrscheinlichkeit pro Jahr',
      series: [
        { name: 'Idealfall: unabhängig', color: '#8a8a8a', values: ideal, dashed: true },
        { name: 'mit gemeinsamer Ursache', color: '#c2402d', values: real },
      ],
      thresholds: [{ y: goal, label: `Ziel 10⁻${v.goal}`, tone: 'warn' }],
      markers: [],
      logY: true,
      yMin: 1e-9,
      yMax: 1,
      readouts: [
        { label: 'Untergrenze durch β', value: floor > 0 ? sci(floor) : 'keine' },
        { label: 'Mit 2 Einheiten', value: sci(real[1]) },
        { label: 'Mit 3 Einheiten', value: sci(real[2]) },
        { label: 'Ziel erreicht ab', value: need ? `${need} Einheiten` : 'nie', tone: need ? 'ok' : 'bad' },
      ],
      atCursor: (i) => [
        { label: `${ns[i]} Einheit${ns[i] > 1 ? 'en' : ''}, ideal`, value: sci(ideal[i]) },
        { label: 'Mit gemeinsamer Ursache', value: sci(real[i]) },
      ],
      verdict: need
        ? { tone: need <= 3 ? 'ok' : 'warn', text: `Das Ziel 10⁻${v.goal} wird mit ${need} Einheiten erreicht. Die gemeinsame Ursache hält die Kurve über dem Idealfall, ab ${need} Einheiten reicht es aber.` }
        : { tone: 'bad', text: `Das Ziel 10⁻${v.goal} ist mit dieser Bauweise unerreichbar: Die gemeinsame Ursache allein liegt bei ${sci(floor)}. Mehr identische Einheiten helfen nicht, nur weniger gemeinsame Abhängigkeit.` },
    };
  },
};

// ───────────────────────── Mars-Habitat gesamt ─────────────────────────

export const marsHabitatModel: ModelDef = {
  id: 'EXP:HABITAT:MARS-STORM',
  title: 'Staubsturm und Energiehaushalt über zwölf Tage',
  intro: 'Ein globaler Staubsturm nimmt dem Solarfeld den größten Teil der Leistung. Der Batteriestand entscheidet, ob das Habitat durchhält – und wie viel der Degradationsmodus bringt.',
  params: [
    { kind: 'range', key: 'array', label: 'Solarfeld (Spitze)', unit: 'kW', min: 5, max: 60, step: 1, def: 20 },
    { kind: 'range', key: 'battery', label: 'Batteriekapazität', unit: 'kWh', min: 20, max: 400, step: 10, def: 120 },
    { kind: 'range', key: 'load', label: 'Grundlast', unit: 'kW', min: 1, max: 10, step: 0.5, def: 4 },
    { kind: 'range', key: 'storm', label: 'Leistungsverlust im Sturm', unit: '%', min: 0, max: 95, step: 5, def: 80 },
    { kind: 'range', key: 'days', label: 'Sturmdauer', unit: 'Tage', min: 0, max: 9, step: 1, def: 5 },
    { kind: 'range', key: 'degrade', label: 'Last im Sturm (Degradationsmodus)', unit: '%', min: 30, max: 100, step: 5, def: 100 },
  ],
  tryThis: [
    'Starte mit den Standardwerten und finde den Blackout (nach gut vier Tagen). Vergrößere nur die Batterie: auch 400 kWh kaufen nur wenige Tage.',
    'Senke nur die Last im Sturm auf 50 %: auch das reicht allein nicht. Kombiniere beides (50 % Last, 200 kWh): erst dann übersteht das Habitat den Sturm.',
    'Setze die Last im Sturm auf 40 %: Abschalten unwichtiger Verbraucher wirkt stärker als jede Batterieerweiterung – und ist vorher planbar.',
  ],
  assumptions: 'Stundenmodell über zwölf Tage, Tagesbogen der Solarleistung von 6 bis 18 Uhr, Sturm ab Tag 3, Lade-/Entladewirkungsgrad zusammen 90 %. Wärme, Heizung und Staub auf Modulen sind nicht gesondert modelliert.',
  simulate: (v) => {
    const hours = 12 * 24;
    const t: number[] = [];
    const soc: number[] = [];
    let s = v.battery * 0.8;
    let blackoutH = Infinity;
    let minSoc = s;
    const stormStart = 3 * 24, stormEnd = stormStart + v.days * 24;
    for (let h = 0; h <= hours; h++) {
      t.push(h / 24);
      soc.push(s);
      const hod = h % 24;
      let solar = hod >= 6 && hod <= 18 ? v.array * Math.max(0, Math.sin((Math.PI * (hod - 6)) / 12)) : 0;
      const inStorm = h >= stormStart && h < stormEnd;
      if (inStorm) solar *= 1 - v.storm / 100;
      const load = v.load * (inStorm ? v.degrade / 100 : 1);
      const balance = solar - load;
      if (balance >= 0) s = Math.min(v.battery, s + balance * 0.9);
      else s = Math.max(0, s + balance / 0.9);
      if (s <= 0 && !Number.isFinite(blackoutH)) blackoutH = h;
      minSoc = Math.min(minSoc, s);
    }
    const reserve = v.battery * 0.2;
    const tone: Tone = Number.isFinite(blackoutH) ? 'bad' : minSoc < reserve ? 'warn' : 'ok';
    const markers: Marker[] = v.days > 0 ? [{ x: stormStart / 24, label: 'Sturmbeginn', color: '#8a8a8a' }, { x: Math.min(12, stormEnd / 24), label: 'Sturmende', color: '#8a8a8a' }] : [];
    return {
      x: t,
      xLabel: 'Zeit (Tage)',
      yLabel: 'Batteriestand (kWh)',
      series: [{ name: 'Batteriestand', color: '#3d8b5f', values: soc }],
      thresholds: [{ y: reserve, label: 'Mindestreserve 20 %', tone: 'warn' }],
      markers,
      yMin: 0,
      yMax: v.battery * 1.05,
      readouts: [
        { label: 'Tiefster Stand', value: `${fmt(minSoc, 0)} kWh (${fmt((minSoc / v.battery) * 100, 0)} %)`, tone },
        { label: 'Blackout', value: Number.isFinite(blackoutH) ? `nach ${fmt(blackoutH / 24, 1)} Tagen` : 'keiner', tone: Number.isFinite(blackoutH) ? 'bad' : 'ok' },
        { label: 'Tagesverbrauch Grundlast', value: `${fmt(v.load * 24, 0)} kWh` },
        { label: 'Tagesertrag ohne Sturm', value: `${fmt(v.array * (24 / Math.PI), 0)} kWh` },
      ],
      atCursor: (i) => [{ label: 'Batterie jetzt', value: `${fmt(soc[i], 0)} kWh` }],
      verdict: Number.isFinite(blackoutH)
        ? { tone: 'bad', text: `Nach ${fmt(blackoutH / 24, 1)} Tagen ist die Batterie leer. Mehr Speicher, weniger Last im Sturm oder ein Reservegenerator schließen die Lücke.` }
        : minSoc < reserve
          ? { tone: 'warn', text: `Das Habitat übersteht den Sturm, fällt aber auf ${fmt((minSoc / v.battery) * 100, 0)} % und damit unter die Mindestreserve. Ein zweiter Sturm direkt danach wäre nicht mehr abgedeckt.` }
          : { tone: 'ok', text: `Das Habitat übersteht den Sturm mit mindestens ${fmt((minSoc / v.battery) * 100, 0)} % Restladung.` },
    };
  },
};

export const habitatModels: ModelDef[] = [
  pressureLeakModel, airlockModel, co2Model, thermalModel, radiationModel, monitoringModel, redundancyModel, marsHabitatModel,
];

export function getHabitatModel(id: string): ModelDef | undefined {
  return habitatModels.find((m) => m.id === id);
}
