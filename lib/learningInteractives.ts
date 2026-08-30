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

export type LearningInteractive = {
  interactiveId: string;
  title: string;
  instruction: string;
  params: LearningInteractiveParams;
  fallback: string;
};

const G = 6.67430e-11;

const learningInteractives: Record<string, LearningInteractive> = {
  gravitationsbrunnen: {
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
  }
};

export function getLearningInteractive(interactiveId: string): LearningInteractive | undefined {
  return learningInteractives[interactiveId];
}

export function listLearningInteractives(): LearningInteractive[] {
  return Object.values(learningInteractives);
}
