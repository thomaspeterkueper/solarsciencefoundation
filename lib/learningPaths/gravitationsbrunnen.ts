import type { LearningPath } from '../learningPaths';

/**
 * SSF didactic path for the KG-owned Energie & Arbeit module.
 * Canonical identities returned by KG on 2026-08-30:
 * PHY-L2-000005 / LRN:SSF:PHY-ENERGIE-ARBEIT-0001 / PATH:SSF:PHY-ENERGIE-ARBEIT-0001.
 */
export const gravitationsbrunnenLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-ENERGIE-ARBEIT-0001',
  title: 'Warum kostet es Energie, einen Himmelskörper zu verlassen?',
  subtitle: 'Energie und Arbeit im Gravitationsfeld: Potential, Potentialdifferenz und Fluchtenergie.',
  status: 'active',
  sourceModuleId: 'PHY-L2-000005',
  kxfModuleId: 'LRN:SSF:PHY-ENERGIE-ARBEIT-0001',
  domainsNeeded: ['KD:PHYSICS'],
  suppliedBy: {
    knowledgeGraph: ['Kanonische Modulidentität und fachliche Begriffe zu Arbeit, Energie und Gravitationspotential'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Didaktische Lernreise und interaktive Visualisierung gravitationsbrunnen'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:ENERGIE-ARBEIT-GRAVITATIONSPOTENTIAL',
      title: 'Der Gravitationsbrunnen',
      entryQuestion: 'Warum benötigt man Energie, um sich dauerhaft von einem Himmelskörper zu entfernen?',
      takeaway: 'Entscheidend ist die Potentialdifferenz: Wer sich nach außen bewegt, erhöht seine potentielle Energie und muss dafür Arbeit aufbringen.',
      sections: [
        {
          id: 'OBS:GRAVITATIONSBRUNNEN',
          kind: 'observation',
          title: 'Potential statt bloßer Kraft',
          summary: 'Die Gravitationskraft wird mit dem Abstand schwächer. Für die Energiebilanz ist das Potential Φ = −GM/r entscheidend: Es nähert sich nach außen dem Wert null.',
          depthPoints: 6,
        },
        {
          id: 'EXP:GRAVITATIONSBRUNNEN',
          kind: 'experiment',
          title: 'Gravitationsbrunnen visualisiert',
          summary: 'Vergleiche Mond, Mars, Erde und Jupiter. Verändere r/R und beobachte Potential, Potentialdifferenz, ideale Hubarbeit für 1 Tonne und Fluchtgeschwindigkeit.',
          interactive: true,
          interactiveId: 'gravitationsbrunnen',
          depthPoints: 12,
        },
        {
          id: 'EXPL:GRAVITATIONSBRUNNEN-ARBEIT',
          kind: 'explanation',
          title: 'Arbeit ist die Änderung der potentiellen Energie',
          summary: 'Für eine Masse m gilt W = m·[Φ(r₂) − Φ(r₁)]. Von der Oberfläche R bis unendlich ist die ideale Mindestarbeit GMm/R. Bis r = 2R, also eine Höhe von einem Körperradius, ist davon genau die Hälfte aufgebracht. Die Arbeit pro zusätzlichem Kilometer nimmt mit wachsendem Abstand ab, aber die ersten wenigen Kilometer enthalten nicht den größten Teil der gesamten Fluchtarbeit.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:GRAVITATIONSBRUNNEN-FLUCHT',
          kind: 'explanation',
          title: 'Fluchtgeschwindigkeit: dieselbe Energiebilanz',
          summary: 'Setzt man die kinetische Energie ½mv² gleich der ideal benötigten Energie GMm/r, erhält man vₑ = √(2GM/r). Das ist ein Idealmodell; reale Starts haben zusätzliche Verluste.',
          depthPoints: 10,
        },
      ],
    },
  ],
};
