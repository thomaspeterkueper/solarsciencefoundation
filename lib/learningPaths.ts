/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths.ts
 * Name:      Learning Paths registry
 * Version:   0.5.0
 * Created:   2026-07-03
 * Modified:  2026-07-04 21:00 CEST
 * Depends:   —
 */

export type LearningPathSection = {
  id: string;
  kind: 'observation' | 'explanation' | 'example' | 'exercise' | 'experiment' | 'quiz' | 'branch';
  title: string;
  summary: string;
  optional?: boolean;
  depthPoints?: number;
  /** True if this section contains interactive/audio elements (Web Audio API, Canvas) */
  interactive?: boolean;
  /**
   * Optional image for observation cards.
   * Path relative to /public — e.g. "/images/observations/kaffeetasse-tku.jpg"
   * Convention: suffix -tku = photo by Thomas Küper
   */
  image?: {
    src: string;
    alt: string;
    credit?: string;
  };
};

export type LearningPathUnit = {
  id: string;
  title: string;
  /** The question displayed to the learner — no discipline label */
  entryQuestion?: string;
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
    title: 'Was Schwingungen erzaehlen',
    subtitle: 'Von der klingenden Kaffeetasse zu Sternspektren: Schwingungsstruktur als Informationstraeger.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-1101',
    kxfModuleId: 'LRN:SSF:PHY-1101',
    domainsNeeded: ['KNOW:PHYS-WAVE', 'KNOW:PHYS-ACOUSTICS', 'KNOW:ASTRO-SPEC', 'KNOW:LANG-SCI'],
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
        'Optional archive reference for spectroscopy / acoustic observation',
        'Epistemic marker profile if archive text is used'
      ],
      ssf: [
        'Didactic sequencing and entry questions (no discipline labels)',
        'Personal observations and photos by Thomas Kueper (Kontrakomologie, Kaffeetasse, Jalousie)',
        'Interactive experiments: Web Audio (cup resonance, wave mixer), Canvas wave viz, light spectrum slider',
        'Mini-experiment instructions for physical props (cup + spoon, marble, prism/CD)',
        'Quiz gates, optional branches, depth scoring'
      ]
    },
    unlocks: ['SENSOR:SPECTRAL', 'MISSION:OBSERVATION-DECK'],
    units: [
      {
        id: 'UNIT:KLANG',
        title: 'Klang & Resonanz',
        entryQuestion: 'Warum klingt eine Kaffeetasse anders, je nachdem wie voll sie ist?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LICHT' },
        sections: [
          {
            id: 'OBS:KAFFEETASSE',
            kind: 'observation',
            title: 'Die klingende Tasse',
            summary: 'Klopf an eine halb gefuellte Tasse — dann trink die Haelfte. Der Ton aendert sich. Warum?',
            image: {
              src: '/images/observations/kaffeetasse-tku.jpg',
              alt: 'Weisse Porzellanasse mit Goldverzierung, Untertasse und Loeffel auf Holztisch',
              credit: 'Thomas Kueper'
            },
            depthPoints: 4
          },
          {
            id: 'OBS:BACH-DAVIS',
            kind: 'observation',
            title: 'Eigene Beobachtung: Kontrakomologie',
            summary: 'Bach und Miles Davis erzeugen verschiedene Zeitstrukturen im Klang. Ausgangspunkt fuer die Frage: Was ist Klang physikalisch?',
            depthPoints: 4
          },
          {
            id: 'OBS:WASSERGLAS',
            kind: 'observation',
            title: 'Beobachtung: Das kalte Wasserglas',
            summary: 'Ein kaltes Glas an einem warmen Tag: aussen Kondensation, innen Brechung des Hintergrunds, Fuelstand als Resonanzlinie — drei Phaenomene auf einmal sichtbar.',
            image: {
              src: '/images/observations/wasserglas-tku.jpg',
              alt: 'Kaltes Wasserglas auf Holztisch, Kondensation aussen, Gelaender und Himmel dahinter durch das Glas gebrochen',
              credit: 'Thomas Kueper'
            },
            optional: true,
            depthPoints: 3
          },
          {
            id: 'EXP:KAFFEETASSE',
            kind: 'experiment',
            title: 'Experiment 1: Die klingende Tasse',
            summary: 'Fuelstand-Slider, Web Audio erzeugt echten Ton (280–800 Hz), stehende Welle animiert. Mini-Experiment: Keramiktasse + Loeffel.',
            interactive: true,
            depthPoints: 6
          },
          {
            id: 'EXP:WELLENMISCHER',
            kind: 'experiment',
            title: 'Experiment 2: Wellen ueberlagern',
            summary: 'Zwei Oszillatoren mischbar (Frequenz + Amplitude). Summe hoerbar und sichtbar. Zeigt konstruktive/destruktive Interferenz.',
            interactive: true,
            depthPoints: 6
          },
          {
            id: 'OBS:MURMEL',
            kind: 'observation',
            title: 'Beobachtung: Murmel auf verschiedenen Untergruenden',
            summary: 'Holz vs. Teppich vs. Fliesen: Energie-Absorption und Reflexion im Alltag.',
            optional: true,
            depthPoints: 3
          },
          {
            id: 'BRANCH:FOURIER',
            kind: 'branch',
            title: 'Seitenast: Fourier & Klangfarbe',
            summary: 'Fourier-Zerlegung als Bruecke von Klang zu Spektrum.',
            optional: true,
            depthPoints: 8
          },
          {
            id: 'QUIZ:KLANG',
            kind: 'quiz',
            title: 'Quiz Klangstruktur',
            summary: 'Drei Fragen: Resonanzlaenge (Tasse), Klangfarbe (Obertoene), Interferenz (destruktiv).',
            depthPoints: 15
          }
        ]
      },
      {
        id: 'UNIT:LICHT',
        title: 'Licht als Informationstraeger',
        entryQuestion: 'Was erzaehlt uns Licht — ueber Dinge, die wir nie beruehren werden?',
        sections: [
          {
            id: 'OBS:JALOUSIE',
            kind: 'observation',
            title: 'Beobachtung: Licht durch Jalousienritze',
            summary: 'Beugung und Farbsaeume an Lichtstreifen — Licht verhaelt sich wie eine Welle.',
            image: {
              src: '/images/observations/rolladen-tku.jpg',
              alt: 'Rolladen-Lamellen mit Lichtstreifen — sichtbare Spektren durch Beugung und Dispersion',
              credit: 'Thomas Kueper'
            },
            depthPoints: 4
          },
          {
            id: 'EXP:LICHTSPEKTRUM',
            kind: 'experiment',
            title: 'Experiment 3: Licht als Frequenz',
            summary: 'Wellenlaengen-Slider 380–700 nm mit Farbe, Frequenz (THz) und Energie (eV) live. Fraunhofer-Linien annotiert.',
            interactive: true,
            depthPoints: 4
          },
          {
            id: 'EXP:ABSORPTIONSLINIEN',
            kind: 'explanation',
            title: 'Absorptionslinien: Fingerabdruck der Elemente',
            summary: 'Fraunhofer-Linien im Sonnenspektrum. Jedes Element absorbiert charakteristische Frequenzen.',
            depthPoints: 8
          },
          {
            id: 'OBS:DOPPLER-AUTO',
            kind: 'observation',
            title: 'Beobachtung: Doppler-Effekt im Strassenverkehr',
            summary: 'Ton eines Autos: hoeher beim Naeherkommen, tiefer beim Entfernen. Bei Licht: blau/rot statt hoeher/tiefer.',
            depthPoints: 3
          },
          {
            id: 'BRANCH:LICHTPHYSIK',
            kind: 'branch',
            title: 'Seitenast: Licht physikalisch',
            summary: 'c = lambda mal f, E = h mal f, Wien-Gesetz: Farbe als Thermometer fuer Sterntemperatur.',
            optional: true,
            depthPoints: 10
          },
          {
            id: 'QUIZ:LICHT',
            kind: 'quiz',
            title: 'Quiz Spektren',
            summary: 'Drei Fragen: Vakuum-Ausbreitung, Lichtlaufzeit (Zeitmaschine), Fraunhofer-Linien (Fingerabdruck).',
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
