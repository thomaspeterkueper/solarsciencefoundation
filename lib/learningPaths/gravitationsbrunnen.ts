import type { LearningPath } from '../learningPaths';

/**
 * SSF canonical learning path for the "Energie & Arbeit" gravity-well unit.
 * SSF owns content, didactics and the structured interactive
 * (`interactiveId: gravitationsbrunnen`); NOXIA renders it in-game via the
 * module contract (docs/noxia-module-api.md).
 */
export const gravitationsbrunnenLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-GRAVITATIONSBRUNNEN-0001',
  title: 'Warum kostet es Energie, einen Himmelskörper zu verlassen?',
  subtitle: 'Energie & Arbeit im Gravitationsfeld: Gravitationspotential, Potentialdifferenz und die Arbeit, die nötig ist, um aus dem Brunnen zu klettern.',
  status: 'active',
  sourceModuleId: 'SSF-PHY-GRAVITATIONSBRUNNEN-0001',
  kxfModuleId: 'LRN:SSF:PHY-GRAVITATIONSBRUNNEN-0001',
  domainsNeeded: ['KD:PHYSICS'],
  suppliedBy: {
    knowledgeGraph: [
      'Begriffe Gravitation, Masse, Energie und Arbeit',
      'Konzeptrelationen zwischen Himmelskörpern und Gravitationsfeldern',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Interaktive Lernanimation „Gravitationsbrunnen“ (interactiveId: gravitationsbrunnen)',
      'Didaktische Erklärung von Gravitationspotential und Hubarbeit',
      'Verständnisprüfung nach Beobachtung, Interaktion und Anwendung',
    ],
  },
  unlocks: ['UNL:NOX:gravitationsbrunnen'],
  units: [
    {
      id: 'UNIT:GRAVITATIONSBRUNNEN-POTENTIAL',
      title: 'Der Gravitationsbrunnen',
      entryQuestion: 'Warum braucht eine Rakete Energie, um die Erde zu verlassen — obwohl sie im All scheinbar nichts wiegt?',
      takeaway: 'Gravitation ist ein Brunnen: Je massereicher der Körper, desto tiefer das Loch. Herausklettern kostet immer Arbeit — egal ob man dabei „Gewicht“ spürt oder nicht.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GRAVITATIONSBRUNNEN-ARBEIT' },
      sections: [
        {
          id: 'OBS:GRAVITATIONSBRUNNEN-ALLTAG',
          kind: 'observation',
          title: 'Beobachtung: Ein Loch, aus dem man herausklettern muss',
          summary: 'Stell dir einen Brunnen vor: Wer am Boden steht, muss klettern, um herauszukommen — und je tiefer der Brunnen, desto mehr Arbeit. Genau so wirkt die Schwerkraft eines Himmelskörpers auf alles in seiner Nähe. An der Oberfläche sitzt man im Brunnen; weit draußen im All ist der Rand erreicht.',
          depthPoints: 5,
        },
        {
          id: 'EXP:GRAVITATIONSBRUNNEN',
          kind: 'experiment',
          title: 'Gravitationsbrunnen visualisiert',
          summary: 'Wähle einen Himmelskörper (Mond, Mars, Erde, Jupiter) und verschiebe den Abstand r vom Zentrum. Die Animation zeigt den Potentialbrunnen Φ = −G·M/r, die Potentialdifferenz zur Oberfläche, die nötige Hubarbeit für 1 Tonne und die Fluchtgeschwindigkeit — live.',
          interactive: true,
          interactiveId: 'gravitationsbrunnen',
          depthPoints: 12,
        },
        {
          id: 'EXPL:GRAVITATIONSBRUNNEN-POTENTIAL',
          kind: 'explanation',
          title: 'Das Gravitationspotential: Der Brunnen in Zahlen',
          summary: 'Das Gravitationspotential Φ = −G·M/r beschreibt die potentielle Energie pro Kilogramm an einem Ort. Es ist überall negativ und wird mit wachsendem Abstand r weniger negativ — der Brunnen wird flacher. An der Erdoberfläche beträgt Φ ≈ −62,5 MJ/kg. Die Potentialdifferenz zwischen zwei Orten ist genau die Arbeit pro Kilogramm, die man aufwenden muss, um von einem Ort zum anderen zu kommen.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:GRAVITATIONSBRUNNEN-1',
          kind: 'quiz',
          title: 'Quiz: Potential und Brunnentiefe',
          summary: 'Warum ist das Gravitationspotential negativ, welcher Körper hat den tiefsten Brunnen, was bedeutet eine größere Potentialdifferenz?',
          depthPoints: 10,
        },
      ],
    },
    {
      id: 'UNIT:GRAVITATIONSBRUNNEN-ARBEIT',
      title: 'Arbeit, Abstand und Flucht',
      entryQuestion: 'Warum wird das Klettern aus dem Brunnen mit jedem Meter ein bisschen leichter?',
      takeaway: 'Die nötige Arbeit steckt in der Potentialdifferenz W = m·ΔΦ. Weil der Brunnen nach außen flacher wird, steckt der größte Teil der Arbeit in den ersten Kilometern über der Oberfläche.',
      sections: [
        {
          id: 'EXPL:GRAVITATIONSBRUNNEN-ARBEIT',
          kind: 'explanation',
          title: 'Hubarbeit ist Potentialdifferenz',
          summary: 'Um eine Masse m von r₁ nach r₂ hinauszuheben, muss man die Potentialdifferenz bezahlen: W = m·(Φ(r₂) − Φ(r₁)). Für 1 Tonne von der Erdoberfläche ins Unendliche sind das etwa 62,5 GJ. Das ist die Arbeit, die Raketen beim Start erbringen — deshalb brauchen sie so viel Treibstoff.',
          depthPoints: 8,
        },
        {
          id: 'EXAMPLE:GRAVITATIONSBRUNNEN-VERGLEICH',
          kind: 'example',
          title: 'Vergleich: Vier Himmelskörper, vier Brunnen',
          summary: 'Mond: Φ₀ ≈ −2,8 MJ/kg, Fluchtgeschwindigkeit 2,4 km/s. Mars: ≈ −12,6 MJ/kg und 5,0 km/s. Erde: ≈ −62,5 MJ/kg und 11,2 km/s. Jupiter: ≈ −1812 MJ/kg und 60,2 km/s. Gleiche 1 Tonne Nutzlast — aber auf Jupiter wäre die Fluchtarbeit etwa 29-mal so groß wie auf der Erde. Deshalb ist die Wahl des Landeplatzes in NOXIA eine Energiefrage.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:GRAVITATIONSBRUNNEN-FLUCHT',
          kind: 'explanation',
          title: 'Fluchtgeschwindigkeit: derselbe Brunnen, andere Sicht',
          summary: 'Die Fluchtgeschwindigkeit v = √(2·G·M/r) ist äquivalent zur Potentialdifferenz: Genau die kinetische Energie ½·m·v² reicht aus, um den Brunnen ohne weitere Antriebsarbeit zu verlassen. Wer weniger Energie hat, fällt zurück — wie ein Ball, der nicht bis zum Rand geworfen wurde.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:GRAVITATIONSBRUNNEN-2',
          kind: 'quiz',
          title: 'Quiz: Arbeit und Flucht',
          summary: 'Wo steckt die meiste Hubarbeit, was folgt aus einer größeren Fluchtgeschwindigkeit, warum reicht Antriebsenergie allein nicht?',
          depthPoints: 12,
        },
      ],
    },
  ],
};
