export type LearningPathSection = {
  id: string;
  kind: 'observation' | 'explanation' | 'example' | 'exercise' | 'quiz' | 'branch';
  title: string;
  summary: string;
  optional?: boolean;
  depthPoints?: number;
};

export type LearningPathUnit = {
  id: string;
  title: string;
  gate?: {
    type: 'quiz_all_correct';
    unlocksUnitId?: string;
  };
  sections: LearningPathSection[];
};

export type LearningPath = {
  id: string;
  title: string;
  subtitle: string;
  status: 'prototype' | 'active';
  sourceModuleId: string;
  kxfModuleId: string;
  domainsNeeded: string[];
  suppliedBy: {
    knowledgeGraph: string[];
    kueperCom: string[];
    overtimeArchive: string[];
    ssf: string[];
  };
  unlocks: string[];
  units: LearningPathUnit[];
};

export const learningPaths: LearningPath[] = [
  {
    id: 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
    title: 'Was die Welt aus sich macht',
    subtitle: 'Von Klangfarbe zu Lichtspektren: Schwingungsstruktur als Informationstraeger.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-1101',
    kxfModuleId: 'LRN:SSF:PHY-1101',
    domainsNeeded: ['KNOW:PHYS-WAVE', 'KNOW:ASTRO-SPEC', 'KNOW:LANG-SCI'],
    suppliedBy: {
      knowledgeGraph: [
        'Knowledge Domain IDs and level scale',
        'Prerequisite links',
        'Unlock mapping to NOXIA capabilities'
      ],
      kueperCom: [
        'Published foundation document about waves, spectra or scientific observation',
        'Stable source URL and public citation metadata'
      ],
      overtimeArchive: [
        'Optional archive reference or narrative research target for spectroscopy / observation',
        'Epistemic marker profile if the archive text is used'
      ],
      ssf: [
        'Didactic sequencing',
        'Short explanations',
        'Examples, exercises, quiz gates, optional branches and depth scoring'
      ]
    },
    unlocks: ['SENSOR:SPECTRAL', 'MISSION:OBSERVATION-DECK'],
    units: [
      {
        id: 'UNIT:KLANG',
        title: 'Warum klingt eine Geige anders als eine Floete?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LICHT' },
        sections: [
          {
            id: 'OBS:BACH-DAVIS',
            kind: 'observation',
            title: 'Eigene Beobachtung',
            summary: 'Bach und Miles Davis erzeugen verschiedene Zeitstrukturen im Klang.',
            depthPoints: 4
          },
          {
            id: 'EXP:OBERSCHWINGUNGEN',
            kind: 'explanation',
            title: 'Grundton und Oberschwingungen',
            summary: 'Gleiche Tonhoehe kann unterschiedliche Obertonstruktur haben.',
            depthPoints: 6
          },
          {
            id: 'BRANCH:FOURIER',
            kind: 'branch',
            title: 'Seitenast Fourier',
            summary: 'Fourier-Zerlegung als Bruecke von Klang zu Spektrum.',
            optional: true,
            depthPoints: 10
          },
          {
            id: 'QUIZ:KLANG',
            kind: 'quiz',
            title: 'Quiz Klangstruktur',
            summary: 'Drei Fragen pruefen Klangfarbe, Frequenz und Struktur.',
            depthPoints: 15
          }
        ]
      },
      {
        id: 'UNIT:LICHT',
        title: 'Was erzaehlt uns Licht ueber Sterne?',
        sections: [
          {
            id: 'OBS:SPEKTRUM',
            kind: 'observation',
            title: 'Sonnenlicht als Summe',
            summary: 'Weisses Licht enthaelt ein Spektrum aus Farben.',
            depthPoints: 4
          },
          {
            id: 'EXP:ABSORPTIONSLINIEN',
            kind: 'explanation',
            title: 'Absorptionslinien',
            summary: 'Elemente hinterlassen charakteristische Linien im Spektrum.',
            depthPoints: 8
          },
          {
            id: 'BRANCH:WELLENLAENGE',
            kind: 'branch',
            title: 'Seitenast Lichtphysik',
            summary: 'Wellenlaenge, Frequenz und c = lambda mal f.',
            optional: true,
            depthPoints: 14
          },
          {
            id: 'QUIZ:LICHT',
            kind: 'quiz',
            title: 'Quiz Spektren',
            summary: 'Drei Fragen pruefen Lichtlaufzeit, Spektrallinien und Rotverschiebung.',
            depthPoints: 18
          }
        ]
      }
    ]
  }
];

export function getLearningPathById(id: string) {
  return learningPaths.find((path) => path.id === id) ?? null;
}
