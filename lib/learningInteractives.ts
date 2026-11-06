/** Structured interactive learning units delivered by SSF to consumers such as NOXIA. */
export type LearningInteractiveBody = {
  id: string;
  label: string;
  massKg: number;
  radiusM: number;
};

export type LearningInteractiveParams = {
  bodies: LearningInteractiveBody[];
  distance: {
    unit: 'body_radii';
    min: number;
    max: number;
    step: number;
    default: number;
  };
  testMassKg: number;
  constants: { G: number };
};

/** Himmelskörper auf (näherungsweise) kreisförmiger Sonnenumlaufbahn. */
export type OrbitBody = {
  id: string;
  label: string;
  orbitAu: number;
  periodDays: number;
  color: string;
};

/**
 * Hohmann-Rechner: SSF liefert die fertig gerechneten Werte je Planetenpaar,
 * damit Konsumenten (NOXIA) keine eigene Physik nachbauen müssen.
 */
export type HohmannPair = {
  fromId: string;
  toId: string;
  /** Große Halbachse der Transferellipse */
  transferSemiMajorAu: number;
  dv1KmS: number;
  dv2KmS: number;
  dvTotalKmS: number;
  transferDays: number;
  /** Abstand zwischen zwei Startfenstern (synodische Periode) */
  windowEveryDays: number;
  /** Winkel, um den das Ziel beim Start vorauseilen muss (negativ = hinterher) */
  phaseAngleDeg: number;
};

export type HohmannInteractiveParams = {
  bodies: OrbitBody[];
  pairs: HohmannPair[];
  defaultFromId: string;
  defaultToId: string;
  constants: { GM_SUN: number; AU_M: number };
};

/**
 * Transferbahn-Vergleich: Startschub (Δv₁) von Hohmann-Minimum bis „fast gerade“.
 * Je Stützstelle: Reisezeit, überstrichener Bahnwinkel (180° = Hohmann-Bogen,
 * kleiner = gestreckter, gerader Weg), Bremsbedarf am Ziel und Gesamt-Δv.
 */
export type TransferSample = {
  dv1KmS: number;
  days: number;
  sweepDeg: number;
  /** Bahnform: e < 1 Ellipse, e ≥ 1 Hyperbel */
  eccentricity: number;
  dvArrivalKmS: number;
  dvTotalKmS: number;
  /** Bahnpunkte von Start bis Zielbahn in AE, Sonne im Ursprung, Start bei (r₁, 0) */
  path: Array<[number, number]>;
};

export type TransferComparisonParams = {
  from: { id: string; label: string; orbitAu: number };
  to: { id: string; label: string; orbitAu: number };
  /** Gerade Strecke bei günstigster Stellung, nur zur Einordnung */
  straightLineKm: number;
  samples: TransferSample[];
  /** Index der Hohmann-Stützstelle in samples */
  hohmannIndex: number;
  constants: { GM_SUN: number; AU_M: number };
};

type InteractiveBase = {
  interactiveId: string;
  title: string;
  instruction: string;
  /** Lesetext für Konsumenten, die das Interactive (noch) nicht darstellen */
  fallback: string;
};

export type LearningInteractive =
  | (InteractiveBase & { kind: 'gravity-well'; params: LearningInteractiveParams })
  | (InteractiveBase & { kind: 'hohmann-calculator'; params: HohmannInteractiveParams })
  | (InteractiveBase & { kind: 'transfer-comparison'; params: TransferComparisonParams });

export type AnyLearningInteractiveParams = LearningInteractive['params'];

const G = 6.67430e-11;
const GM_SUN = 1.32712440018e20; // m³/s²
const AU_M = 1.495978707e11; // m
const DAY_S = 86400;

const r3 = (x: number) => Math.round(x * 1000) / 1000;
const r1 = (x: number) => Math.round(x * 10) / 10;

export const ORBIT_BODIES: OrbitBody[] = [
  { id: 'merkur', label: 'Merkur', orbitAu: 0.387, periodDays: 87.97, color: '#9a9a9a' },
  { id: 'venus', label: 'Venus', orbitAu: 0.723, periodDays: 224.7, color: '#d9b26a' },
  { id: 'erde', label: 'Erde', orbitAu: 1.0, periodDays: 365.256, color: '#3f7fc8' },
  { id: 'mars', label: 'Mars', orbitAu: 1.524, periodDays: 686.98, color: '#c1440e' },
  { id: 'jupiter', label: 'Jupiter', orbitAu: 5.203, periodDays: 4332.59, color: '#c88b3a' }
];

/** Hohmann-Transfer zwischen zwei Kreisbahnen um die Sonne. */
export function hohmannTransfer(from: OrbitBody, to: OrbitBody): HohmannPair {
  const ra = from.orbitAu * AU_M;
  const rb = to.orbitAu * AU_M;
  const a = (ra + rb) / 2;
  const dv1 = Math.sqrt(GM_SUN / ra) * (Math.sqrt((2 * rb) / (ra + rb)) - 1);
  const dv2 = Math.sqrt(GM_SUN / rb) * (1 - Math.sqrt((2 * ra) / (ra + rb)));
  const tDays = (Math.PI * Math.sqrt(a ** 3 / GM_SUN)) / DAY_S;
  const synodic = 1 / Math.abs(1 / from.periodDays - 1 / to.periodDays);
  const phase = 180 - (360 * tDays) / to.periodDays;
  return {
    fromId: from.id,
    toId: to.id,
    transferSemiMajorAu: r3(a / AU_M),
    dv1KmS: r3(Math.abs(dv1) / 1000),
    dv2KmS: r3(Math.abs(dv2) / 1000),
    dvTotalKmS: r3((Math.abs(dv1) + Math.abs(dv2)) / 1000),
    transferDays: r1(tDays),
    windowEveryDays: Math.round(synodic),
    phaseAngleDeg: r1(((phase + 540) % 360) - 180)
  };
}

/**
 * Tangentialer Startschub bei r₁ (Perihel), Flug bis zur äußeren Kreisbahn r₂.
 * Liefert null, wenn die Bahn r₂ nicht erreicht.
 */
export function tangentialTransfer(r1Au: number, r2Au: number, dv1KmS: number): TransferSample | null {
  const mu = GM_SUN;
  const ra = r1Au * AU_M;
  const rb = r2Au * AU_M;
  const vc1 = Math.sqrt(mu / ra);
  const vc2 = Math.sqrt(mu / rb);
  const v = vc1 + dv1KmS * 1000;
  const h = ra * v;
  const p = (h * h) / mu;
  const e = p / ra - 1;
  const energy = (v * v) / 2 - mu / ra;
  if (e <= 0) return null;
  const cosNu = (p / rb - 1) / e;
  if (cosNu < -1 - 1e-9 || cosNu > 1) return null;
  const nu = Math.acos(Math.max(-1, Math.min(1, cosNu)));

  const timeTo = (anomaly: number) => {
    if (e < 1) {
      const a = -mu / (2 * energy);
      const E = 2 * Math.atan(Math.sqrt((1 - e) / (1 + e)) * Math.tan(anomaly / 2));
      const M = E - e * Math.sin(E);
      return M * Math.sqrt(a ** 3 / mu);
    }
    const a = mu / (2 * energy);
    const F = 2 * Math.atanh(Math.sqrt((e - 1) / (e + 1)) * Math.tan(anomaly / 2));
    const M = e * Math.sinh(F) - F;
    return M * Math.sqrt(a ** 3 / mu);
  };
  // tan(π/2) ist für den Hohmann-Fall (ν = π) unendlich → halbe Umlaufzeit direkt
  const tS = e < 1 && Math.abs(nu - Math.PI) < 1e-6
    ? Math.PI * Math.sqrt((-mu / (2 * energy)) ** 3 / mu)
    : timeTo(nu);

  const vr = (mu / h) * e * Math.sin(nu);
  const vt = h / rb;
  const dvArr = Math.sqrt(vr * vr + (vt - vc2) ** 2);

  const path: Array<[number, number]> = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const f = (nu * i) / steps;
    const r = p / (1 + e * Math.cos(f)) / AU_M;
    path.push([r3(r * Math.cos(f)), r3(r * Math.sin(f))]);
  }

  return {
    dv1KmS: r3(dv1KmS),
    days: r1(tS / DAY_S),
    sweepDeg: r1((nu * 180) / Math.PI),
    eccentricity: r3(e),
    dvArrivalKmS: r3(dvArr / 1000),
    dvTotalKmS: r3(dv1KmS + dvArr / 1000),
    path
  };
}

function buildTransferComparison(fromId: string, toId: string): TransferComparisonParams {
  const from = ORBIT_BODIES.find((b) => b.id === fromId)!;
  const to = ORBIT_BODIES.find((b) => b.id === toId)!;
  const hohmann = hohmannTransfer(from, to);
  // Minimal über dem Hohmann-Wert starten, damit die Ellipse die Zielbahn sicher berührt
  const dvValues = [hohmann.dv1KmS + 0.0005];
  for (let dv = 3.5; dv <= 30.001; dv += 0.5) dvValues.push(dv);
  const samples = dvValues
    .map((dv) => tangentialTransfer(from.orbitAu, to.orbitAu, dv))
    .filter((s): s is TransferSample => s !== null);
  // Hohmann-Stützstelle mit den exakten Hohmann-Werten beschriften
  samples[0] = { ...samples[0], dv1KmS: hohmann.dv1KmS, days: hohmann.transferDays, sweepDeg: 180, dvArrivalKmS: hohmann.dv2KmS, dvTotalKmS: hohmann.dvTotalKmS };
  return {
    from: { id: from.id, label: from.label, orbitAu: from.orbitAu },
    to: { id: to.id, label: to.label, orbitAu: to.orbitAu },
    straightLineKm: Math.round(((to.orbitAu - from.orbitAu) * AU_M) / 1e3 / 1e6) * 1e6,
    samples,
    hohmannIndex: 0,
    constants: { GM_SUN, AU_M }
  };
}

function buildHohmannPairs(): HohmannPair[] {
  const pairs: HohmannPair[] = [];
  for (const from of ORBIT_BODIES) {
    for (const to of ORBIT_BODIES) {
      if (from.id !== to.id) pairs.push(hohmannTransfer(from, to));
    }
  }
  return pairs;
}

const learningInteractives: Record<string, LearningInteractive> = {
  gravitationsbrunnen: {
    kind: 'gravity-well',
    interactiveId: 'gravitationsbrunnen',
    title: 'Gravitationsbrunnen visualisiert',
    instruction:
      'Wähle einen Himmelskörper und verändere den Abstand r vom Zentrum. Vergleiche Gravitationspotential, Potentialdifferenz, notwendige Hubarbeit und Fluchtgeschwindigkeit.',
    params: {
      bodies: [
        { id: 'mond', label: 'Mond', massKg: 7.342e22, radiusM: 1.7374e6 },
        { id: 'mars', label: 'Mars', massKg: 6.4171e23, radiusM: 3.3895e6 },
        { id: 'erde', label: 'Erde', massKg: 5.9722e24, radiusM: 6.371e6 },
        { id: 'jupiter', label: 'Jupiter', massKg: 1.89813e27, radiusM: 6.9911e7 }
      ],
      distance: { unit: 'body_radii', min: 1, max: 10, step: 0.1, default: 1 },
      testMassKg: 1000,
      constants: { G }
    },
    fallback:
      'Das Gravitationspotential Φ = −GM/r ist die potentielle Energie pro Kilogramm relativ zu unendlicher Entfernung. Beim Bewegen einer Masse m von r₁ nach r₂ muss die Arbeit W = m·[Φ(r₂) − Φ(r₁)] aufgebracht werden. Mit wachsendem Abstand wird das Potential weniger negativ. Für den vollständigen Weg von der Oberfläche bis unendlich beträgt die ideale Mindestarbeit pro Kilogramm GM/R. Bei einer Höhe von einem Körperradius über der Oberfläche, also r = 2R, ist genau die Hälfte dieser gesamten Potentialdifferenz überwunden. Die Fluchtgeschwindigkeit vₑ = √(2GM/r) beschreibt dieselbe Energiebilanz als notwendige Anfangsgeschwindigkeit ohne weiteren Antrieb. Reale Raketen benötigen wegen Schwerkraftverlusten, Luftwiderstand und begrenztem Wirkungsgrad mehr Energie als dieses Idealmodell.'
  },
  'transferbahn-vergleich': {
    kind: 'transfer-comparison',
    interactiveId: 'transferbahn-vergleich',
    title: 'Experiment: Bogen oder fast gerade? Erde → Mars',
    instruction:
      'Verändere den Startschub Δv₁. Ganz links fliegt das Schiff den Hohmann-Bogen (180° um die Sonne), weiter rechts wird die Bahn gestreckter und nähert sich dem geraden Weg. Beobachte Reisezeit, Bremsbedarf am Mars und Gesamt-Δv.',
    params: buildTransferComparison('erde', 'mars'),
    fallback:
      'Mit dem kleinstmöglichen Startschub von etwa 2,9 km/s fliegt ein Schiff auf dem Hohmann-Bogen in rund 259 Tagen zum Mars und braucht dort etwa 2,6 km/s zum Einschwenken – zusammen rund 5,6 km/s. Mit 5 km/s Startschub dauert die Reise nur noch knapp 130 Tage, das Gesamt-Δv steigt aber auf rund 14 km/s, weil das Schiff am Mars viel zu schnell ankommt. Mit 30 km/s Startschub ist der Weg schon recht gestreckt und dauert etwa 39 Tage – insgesamt sind dann aber rund 70 km/s nötig, mehr als das Zwölffache des Hohmann-Bogens. Kürzere Reisezeit kostet also überproportional viel Energie; deshalb fliegen Raumschiffe den Bogen.'
  },
  'hohmann-rechner': {
    kind: 'hohmann-calculator',
    interactiveId: 'hohmann-rechner',
    title: 'Experiment: Hohmann-Rechner',
    instruction:
      'Wähle Start- und Zielplanet. Die Grafik zeigt die halbe Transferellipse; daneben stehen beide Triebwerksmanöver Δv₁ und Δv₂, die Reisezeit, der Abstand der Startfenster und wie weit das Ziel beim Start vorauseilen muss.',
    params: {
      bodies: ORBIT_BODIES,
      pairs: buildHohmannPairs(),
      defaultFromId: 'erde',
      defaultToId: 'mars',
      constants: { GM_SUN, AU_M }
    },
    fallback:
      'Erde → Mars: große Halbachse 1,262 AE, Δv₁ ≈ 2,95 km/s, Δv₂ ≈ 2,65 km/s, zusammen ≈ 5,6 km/s, Reisezeit ≈ 259 Tage; ein Startfenster öffnet sich etwa alle 780 Tage (26 Monate), der Mars muss beim Start rund 44° vorauseilen. Erde → Jupiter: Δv gesamt ≈ 14,4 km/s, Reisezeit ≈ 997 Tage, Fenster etwa alle 13 Monate. Erde → Venus: Δv gesamt ≈ 5,2 km/s, Reisezeit ≈ 146 Tage.'
  }
};

export function getLearningInteractive(interactiveId: string): LearningInteractive | undefined {
  return learningInteractives[interactiveId];
}

export function listLearningInteractives(): LearningInteractive[] {
  return Object.values(learningInteractives);
}
