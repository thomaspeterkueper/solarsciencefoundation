/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths.ts
 * Name:      Learning Paths registry
 * Version:   1.1.2
 * Created:   2026-07-03
 * Modified:  2026-07-15 21:00 CEST
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
  /**
   * Short insight shown after the quiz is completed.
   * One sentence, written as a realisation — not a summary.
   * Example: "Dehnung ist keine Zahl — sie ist ein Verhältnis."
   */
  takeaway?: string;
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
    domainsNeeded: ['KD:PHYS-WAVE', 'KD:PHYS-ACOUSTICS', 'KD:ASTRO-SPEC', 'KD:LANG-SCI'],
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
            id: 'OBS:CD-SPEKTRUM',
            kind: 'observation',
            title: 'Beobachtung: CD im Sonnenlicht',
            summary: 'Eine CD zerlegt weisses Sonnenlicht in alle Farben des Spektrums — nicht durch Brechung wie ein Prisma, sondern durch Interferenz an den winzigen Rillen des Beugungsgitters.',
            image: {
              src: '/images/observations/cd-spektrum-tku.jpg',
              alt: 'CD an einer Hauswand im Sonnenlicht — das gesamte sichtbare Spektrum als Interferenzmuster sichtbar',
              credit: 'Thomas Kueper'
            },
            optional: true,
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
  },
  {
    id: 'PATH:SSF:PHY-SKY-0001',
    title: 'Warum ist der Himmel blau',
    subtitle: 'Von Rayleigh-Streuung zu Sonnenuntergaengen und Mondfinsternissen — dasselbe Prinzip, zwei Perspektiven.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-1103',
    kxfModuleId: 'LRN:SSF:PHY-1103',
    domainsNeeded: ['KD:PHYS-WAVE', 'KD:PHYS-OPTICS', 'KD:ASTRO-ATMO'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite link to PATH:SSF:PHY-WAVE-SPECTRUM-0001', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Rayleigh-Experiment (lambda^-4 live)', 'Atmosphaeren-Weglaengen-Slider', 'Seitenast Mie-Streuung']
    },
    unlocks: ['SENSOR:ATMOSPHERE', 'NAV:ORBITAL'],
    units: [
      {
        id: 'UNIT:HIMMEL-BLAU',
        title: 'Warum blau?',
        entryQuestion: 'Warum ist der Himmel blau — obwohl das Sonnenlicht weiss ist?',
        takeaway: 'Blaues Licht wird von Luftmolekülen ~6× stärker gestreut als rotes — deshalb kommt es von überall, und der Himmel erscheint blau.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:UNTERGANG-ROT' },
        sections: [
          { id: 'OBS:HIMMEL', kind: 'observation', title: 'Beobachtung: Der blaue Himmel', summary: 'Schau in den Himmel — blau. Die Sonne: weisslich. Dasselbe Licht, zwei Farben. Warum?', depthPoints: 4 },
          { id: 'EXP:RAYLEIGH', kind: 'experiment', title: 'Experiment: Rayleigh-Streuung', summary: 'Wellenlaengen-Slider: Streuungsintensitaet steigt mit lambda^-4. Balkendiagramm live.', interactive: true, depthPoints: 8 },
          { id: 'BRANCH:NICHT-VIOLETT', kind: 'branch', title: 'Seitenast: Warum nicht violett?', summary: 'Drei Gruende: Sonnenspektrum, Augenempfindlichkeit, Ozonabsorption.', optional: true, depthPoints: 10 },
          { id: 'QUIZ:HIMMEL-BLAU', kind: 'quiz', title: 'Quiz Rayleigh', summary: 'Warum blau, was ist lambda^-4, warum nicht violett.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:UNTERGANG-ROT',
        title: 'Warum rot beim Untergang?',
        entryQuestion: 'Warum ist die Sonne beim Untergang rot — obwohl sie mittags weiss ist?',
        takeaway: 'Derselbe Mechanismus, längerer Weg — das Blau ist weggefiltert, was bleibt ist Rot. Der blaue Himmel und der rote Untergang sind zwei Seiten derselben Münze.',
        sections: [
          { id: 'OBS:UNTERGANG', kind: 'observation', title: 'Beobachtung: Sonnenuntergang', summary: 'Dieselbe Sonne, verschiedene Farben — der Weg durch die Atmosphaere entscheidet.', depthPoints: 4 },
          { id: 'EXP:WEGLAENGE', kind: 'experiment', title: 'Experiment: Sonnenwinkel und Farbe', summary: 'Winkel-Slider 2-90 Grad: Wegstrecke und Sonnenfarbe live auf Canvas.', interactive: true, depthPoints: 8 },
          { id: 'BRANCH:MIE', kind: 'branch', title: 'Seitenast: Mie-Streuung', summary: 'Groessere Partikel (Staub, Asche) streuen anders — Vulkanasche und spektakulaere Untergang.', optional: true, depthPoints: 8 },
          { id: 'QUIZ:UNTERGANG-ROT', kind: 'quiz', title: 'Quiz Weglaenge', summary: 'Warum laengerer Weg, welche Wellenlaenge bleibt, Mondfinsternis.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:MAT-ERROR-0001',
    title: 'Wie genau wissen wir was wir messen',
    subtitle: 'Fehlerfortpflanzung: Warum der Exponent entscheidet — und wie man den Engpass einer Messung findet.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1101',
    kxfModuleId: 'LRN:SSF:MAT-1101',
    domainsNeeded: ['KD:MAT-CALCULUS', 'KD:MAT-ANALYSIS', 'KD:PHYS-MEASURE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Kugeldichte-Experiment mit Fehler-Balken live', 'Allgemeiner Fehler-Builder (3 Variablen)', 'Seitenast: Gauss vs. lineare Addition']
    },
    unlocks: ['SENSOR:PRECISION', 'ANALYSIS:ERROR'],
    units: [
      {
        id: 'UNIT:FEHLER-FORTPFLANZUNG',
        title: 'Fehler pflanzen sich fort',
        entryQuestion: 'Wenn jede Messung ungenau ist — wie ungenau ist dann das Ergebnis?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:FEHLER-BUILDER' },
        sections: [
          { id: 'OBS:BACKFEHLER', kind: 'observation', title: 'Beobachtung: Backrezept', summary: 'Waage +-5g, Ofen +-10 Grad — addieren sich diese Fehler einfach?', depthPoints: 3 },
          { id: 'EXP:KUGELDICHTE', kind: 'experiment', title: 'Experiment: Kugeldichte', summary: 'Slider fuer m, Deltam, r, Deltar — Fehler-Balken zeigen m- und r-Beitrag live. Exponent 3 macht den Unterschied.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:BETRAEGE', kind: 'branch', title: 'Seitenast: Warum Betraege?', summary: 'Linearer vs. Gaussscher Fehler — pessimistisch vs. statistisch.', optional: true, depthPoints: 8 },
          { id: 'QUIZ:FEHLER-1', kind: 'quiz', title: 'Quiz Fehlerfortpflanzung', summary: 'Exponent multipliziert, warum Betraege, welche Groesse verbessern.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:FEHLER-BUILDER',
        title: 'Engpass finden',
        entryQuestion: 'Wie findet man den Engpass in jeder Messung?',
        sections: [
          { id: 'EXP:BUILDER', kind: 'experiment', title: 'Experiment: Allgemeiner Fehler-Builder', summary: 'Bis zu 3 Groessen, Exponent und relativer Fehler einstellbar — Gesamt-Fehler und dominante Quelle live.', interactive: true, depthPoints: 6 },
          { id: 'QUIZ:FEHLER-2', kind: 'quiz', title: 'Quiz Fehler-Builder', summary: 'Formel einsetzen, Ausloesche bei Differenzen, n Faktoren mit gleichem Fehler.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:EL-DIODE-0001',
    title: 'Warum darf man eine Diode nicht einfach anschliessen',
    subtitle: 'Kennlinie, Schleusenspannung, Lastgerade — warum der Arbeitspunkt alles entscheidet.',
    status: 'prototype',
    sourceModuleId: 'SSF-EL-1101',
    kxfModuleId: 'LRN:SSF:EL-1101',
    domainsNeeded: ['KD:EL-BASICS', 'KD:EL-SEMICONDUCTOR'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Kennlinie-Canvas live (Us, rD Slider)', 'Arbeitspunkt + Lastgerade Canvas', 'Parallelwiderstand-Experiment']
    },
    unlocks: ['CIRCUIT:DIODE', 'SENSOR:CURRENT'],
    units: [
      {
        id: 'UNIT:KENNLINIE',
        title: 'Kennlinie & Schleusenspannung',
        entryQuestion: 'Was passiert wenn man eine Diode direkt an eine Batterie haengt?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ARBEITSPUNKT' },
        sections: [
          { id: 'OBS:DIODE-ALLTAG', kind: 'observation', title: 'Beobachtung: Dioden im Alltag', summary: 'Fernbedienung, Ladegeraet, LED — ueberall Dioden. Direktes Anschliessen zerstoert sie.', depthPoints: 3 },
          { id: 'EXP:KENNLINIE', kind: 'experiment', title: 'Experiment: Diodenkennlinie', summary: 'Us und rD als Slider — Kennlinie zeichnet sich live. Dioden-Typ-Erkennung (Ge, Si, Schottky, LED).', interactive: true, depthPoints: 6 },
          { id: 'QUIZ:KENNLINIE', kind: 'quiz', title: 'Quiz Kennlinie', summary: 'Warum kein Direktanschluss, was ist Us, was bedeutet 1/rD.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:ARBEITSPUNKT',
        title: 'Arbeitspunkt & Lastgerade',
        entryQuestion: 'Wo arbeitet die Diode wirklich — und was aendert ein Parallelwiderstand?',
        sections: [
          { id: 'EXP:ARBEITSPUNKT', kind: 'experiment', title: 'Experiment: Lastgerade & Arbeitspunkt', summary: 'Uq, Rv, Rp Slider — Lastgerade und Kennlinie, AP als goldener Punkt live. Alle Stroeme berechnet.', interactive: true, depthPoints: 7 },
          { id: 'BRANCH:MODELL', kind: 'branch', title: 'Seitenast: Warum bleibt UD bei US?', summary: 'Konsistenzpruefung des Schleusenmodells — wann es bricht.', optional: true, depthPoints: 8 },
          { id: 'QUIZ:ARBEITSPUNKT', kind: 'quiz', title: 'Quiz Arbeitspunkt', summary: 'Was ist AP, was aendert Rp, wie berechnet man Lastgerade.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:MAT-SERIES-0001',
    title: 'Wann hoert eine unendliche Summe auf zu wachsen',
    subtitle: 'Von Zenons Paradoxon zur Fourier-Synthese: Konvergenz, Reihen und der Klang der Mathematik.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1102',
    kxfModuleId: 'LRN:SSF:MAT-1102',
    domainsNeeded: ['KD:MAT-ANALYSIS', 'KD:MAT-SERIES', 'KD:PHYS-WAVE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Geometrische Reihe: q-Slider Partialsummen live', 'Fourier-Synthesizer (Saegezahn/Rechteck/Dreieck, N=1..20, Web Audio)', 'Seitenast Taylor-Approximation sin(x)']
    },
    unlocks: ['SIGNAL:FOURIER', 'SENSOR:WAVE'],
    units: [
      {
        id: 'UNIT:GEOM-REIHE',
        title: 'Geometrische Reihe',
        entryQuestion: 'Wenn du immer die Haelfte der verbleibenden Strecke gehst — kommst du je an?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:FOURIER' },
        sections: [
          { id: 'OBS:ZENON', kind: 'observation', title: 'Zenons Paradoxon', summary: 'Unendlich viele Schritte — trotzdem endlich. Warum Zenon Unrecht hatte.', depthPoints: 4 },
          { id: 'EXP:REIHE', kind: 'experiment', title: 'Experiment: Geometrische Reihe', summary: 'q-Slider -0.99..0.99: Balken schrumpfen live, Grenzwert 1/(1-q) als Linie.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:KRITERIEN', kind: 'branch', title: 'Seitenast: Konvergenzkriterien', summary: 'Quotient, Wurzel, Leibniz — Entscheidungsbaum.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:REIHE', kind: 'quiz', title: 'Quiz Reihen', summary: 'Summe 1+1/2+..., Leibniz-Kriterium, Wurzelkriterium.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:FOURIER',
        title: 'Fourier-Synthesizer',
        entryQuestion: 'Wie baut man aus runden Wellen eine eckige?',
        sections: [
          { id: 'OBS:SYNTHESIZER', kind: 'observation', title: 'Beobachtung: Synthesizer & Klang', summary: 'Jeder Klang ist eine Fourier-Reihe. Ein Synthesizer addiert Sinuswellen.', depthPoints: 3 },
          { id: 'EXP:FOURIER', kind: 'experiment', title: 'Experiment: Fourier-Synthesizer', summary: 'Saegezahn/Rechteck/Dreieck, N=1..20 Obertoene, Web Audio, 3 Canvas-Ansichten.', interactive: true, depthPoints: 8 },
          { id: 'BRANCH:TAYLOR', kind: 'branch', title: 'Seitenast: Taylor-Approximation', summary: 'sin(x) als Polynom — Polynomgrad-Slider, Approximation live auf dunklem Canvas.', optional: true, depthPoints: 8 },
          { id: 'QUIZ:FOURIER', kind: 'quiz', title: 'Quiz Fourier', summary: 'Satz von Fourier, N=1 klingt wie Sinus, Gibbs-Phaenomen.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:MAT-DIFFGEO-0001',
    title: 'Wie beschreibt man eine Kurve die sich dreht',
    subtitle: 'Polarkurven, Bogenlange und Kruemmung — von Schneckenhaeusen zu Schmiegekreisen.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1103',
    kxfModuleId: 'LRN:SSF:MAT-1103',
    domainsNeeded: ['KD:MAT-CALCULUS', 'KD:MAT-GEOMETRY', 'KD:MAT-ANALYSIS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Polarkurven-Plotter (4 Kurven, phi-Slider, Animation)', 'Schmiegekreis live (3 Parameterkurven)', 'Seitenast: Koordinatenwahl']
    },
    unlocks: ['NAV:CURVATURE', 'SENSOR:GEODESIC'],
    units: [
      {
        id: 'UNIT:POLARKURVEN',
        title: 'Polarkurven',
        entryQuestion: 'Warum haben Schnecken und Sonnenblumen dieselbe Spirale?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BOGENLANGE' },
        sections: [
          { id: 'OBS:NATUR-SPIRALE', kind: 'observation', title: 'Beobachtung: Spiralen in der Natur', summary: 'Schneckenhaus, Sonnenblume, Weisskohlwirbel — alle folgen Polarkurven.', depthPoints: 4 },
          { id: 'EXP:POLARKURVEN', kind: 'experiment', title: 'Experiment: Polarkurven-Plotter', summary: 'Kardioide, Spirale, Rose(3), Lemniskate — phi-Slider zeichnet Kurve schrittweise. Animation-Button.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:COORDS', kind: 'branch', title: 'Seitenast: Koordinatenwahl', summary: 'Wann Polar, wann kartesisch? Umrechnung r=6cos(phi) zu Kreis.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:POLAR', kind: 'quiz', title: 'Quiz Polarkurven', summary: 'Spirale geometrisch, Flaechenformel, warum Polar einfacher.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:BOGENLANGE',
        title: 'Bogenlange & Kruemmung',
        entryQuestion: 'Wie misst man eine Kurve — und wie stark biegt sie sich?',
        sections: [
          { id: 'OBS:SCHIENE', kind: 'observation', title: 'Beobachtung: Eisenbahnkurven', summary: 'Kruemmungsradius darf nicht zu klein sein — Ingenieure brauchen kappa an jedem Punkt.', depthPoints: 3 },
          { id: 'EXP:SCHMIEGEKREIS', kind: 'experiment', title: 'Experiment: Schmiegekreis live', summary: 'Parabel, Evolvente, Spirale — Punkt-Slider, Schmiegekreis als blauer Kreis live.', interactive: true, depthPoints: 7 },
          { id: 'QUIZ:KRUEMMUNG', kind: 'quiz', title: 'Quiz Kruemmung', summary: 'Grosser rK bedeutet, Trick bei Evolvente, warum Polar fuer Spirale.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:MAT-VEC-0001',
    title: 'Warum greift man eine Tuer am Rand an',
    subtitle: 'Vektoren als Pfeile mit Richtung und Betrag — Skalarprodukt, Winkel, Kreuzprodukt und Drehmoment.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1104',
    kxfModuleId: 'LRN:SSF:MAT-1104',
    domainsNeeded: ['KD:MAT-VECTORS', 'KD:PHYS-MECH', 'KD:ENG-STATICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Vektor-Rechner: Addition + Parallelogramm live auf Canvas', 'Skalarprodukt: Projektion + Winkel live', 'Drehmoment: Hebelarm + Winkel + Effizienz-Balken live', 'Seitenast Statik-Anwendung (Arbeit, schiefe Ebene)', 'Seitenast Kreuzprodukt-Berechnung (Determinante, Sarrus)']
    },
    unlocks: ['MECH:WORK', 'MECH:TORQUE', 'CIRCUIT:MOMENT'],
    units: [
      {
        id: 'UNIT:VEC-GRUNDLAGEN',
        title: 'Vektoren & Grundrechenarten',
        entryQuestion: 'Was ist der Unterschied zwischen 50 km/h und 50 km/h nach Norden?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SKALARPRODUKT' },
        sections: [
          { id: 'OBS:KRAFT-RICHTUNG', kind: 'observation', title: 'Beobachtung: Kraft braucht Richtung', summary: 'Tisch auf Rollen — schraeg druecken bewegt ihn in anderer Richtung als gerade. Eine Zahl reicht nicht.', depthPoints: 3 },
          { id: 'EXP:VEC-RECHNER', kind: 'experiment', title: 'Experiment: Vektor-Rechner', summary: 'ax, ay, bx, by als Slider — Parallelogramm-Addition live auf Canvas, Betrag berechnet.', interactive: true, depthPoints: 5 },
          { id: 'QUIZ:VEC-1', kind: 'quiz', title: 'Quiz Vektoren', summary: 'Skalar vs. Vektor, Betrag von (3,4), Kraeftegleichgewicht.', depthPoints: 12 }
        ]
      },
      {
        id: 'UNIT:SKALARPRODUKT',
        title: 'Skalarprodukt & Winkel',
        entryQuestion: 'Wie viel Arbeit leistet eine Kraft — wenn sie nicht in Bewegungsrichtung zeigt?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KREUZPRODUKT' },
        sections: [
          { id: 'OBS:KOFFER', kind: 'observation', title: 'Beobachtung: Koffer ziehen', summary: 'Schraeger Griff — Winkel zwischen Kraft und Bewegung bestimmt Effizienz. Bei 90 Grad: keine Arbeit.', depthPoints: 3 },
          { id: 'EXP:SKALAR', kind: 'experiment', title: 'Experiment: Skalarprodukt live', summary: 'Winkel-Slider 0-180 Grad: Projektion und Skalarprodukt live. Bei 90 Grad: springt auf 0.', interactive: true, depthPoints: 5 },
          { id: 'BRANCH:STATIK', kind: 'branch', title: 'Seitenast: Statik-Anwendung', summary: 'Arbeit W=F*s, Leistung P=F*v, schiefe Ebene: Hangabtriebskraft als Projektion.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:VEC-2', kind: 'quiz', title: 'Quiz Skalarprodukt', summary: 'Orthogonalit aet, Arbeit senkrechter Kraft, Winkel (3,0)*(0,4).', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:KREUZPRODUKT',
        title: 'Kreuzprodukt & Drehmoment',
        entryQuestion: 'Warum greift man eine Tuer am Rand an — und nicht an der Angel?',
        sections: [
          { id: 'OBS:TUER', kind: 'observation', title: 'Beobachtung: Tuer und Schraubenschluessel', summary: 'Angel: kein Drehmoment. Rand: maximales Drehmoment. Laengerer Schluessel: mehr Moment.', depthPoints: 3 },
          { id: 'EXP:DREHMOMENT', kind: 'experiment', title: 'Experiment: Drehmoment M=r×F', summary: 'Hebelarm r, Kraft F, Winkel alpha als Slider — Drehmoment und Effizienz-Balken live.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:KREUZPROD', kind: 'branch', title: 'Seitenast: Kreuzprodukt berechnen', summary: 'Determinante 3x3, Sarrus-Regel, Antikommutativitaet a×b = -b×a.', optional: true, depthPoints: 8 },
          { id: 'QUIZ:VEC-3', kind: 'quiz', title: 'Quiz Drehmoment', summary: 'Warum kein Moment an Angel, maximales Moment bei 90 Grad, parallele Vektoren.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:ENG-EDM-0001',
    title: 'Wie schneidet man Stahl der haerter ist als jedes Werkzeug',
    subtitle: 'Erodieren: Funken schneiden was Fraesen nicht kann — Draht, Bohr- und Senkerodieren.',
    status: 'prototype',
    sourceModuleId: 'SSF-ENG-1101',
    kxfModuleId: 'LRN:SSF:ENG-1101',
    domainsNeeded: ['KD:ENG-MANUFACTURING', 'KD:PHYS-PLASMA', 'KD:EL-BASICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Funkenentladung: U/I/t_on Slider → Pulsenergie, Krater-Canvas, Schrupp/Schlicht-Vergleich', 'Draht-Schnitt-Simulator: Kontur + Konuswinkel + Fortschritt live', 'Aspektverhaeltnis-Rechner: d/t Slider → Verfahren + Machbarkeit + Vergleich Menschenhaar']
    },
    unlocks: ['TOOL:WIRE-EDM', 'TOOL:SINK-EDM', 'PRECISION:MIKRON'],
    units: [
      {
        id: 'UNIT:EDM-GRUNDPRINZIP',
        title: 'Grundprinzip & Funkenentladung',
        entryQuestion: 'Wie kann ein duenner Messingdraht polykristallinen Diamant schneiden — ohne ihn zu beruehren?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DRAHTERODIEREN' },
        sections: [
          { id: 'OBS:PARADOXON', kind: 'observation', title: 'Das Paradoxon', summary: 'Diamant haerter als jedes Werkzeug — und trotzdem formbar. Das Werkzeug beruehrt das Material nicht.', depthPoints: 4 },
          { id: 'EXP:FUNKE', kind: 'experiment', title: 'Experiment: Funkenentladung', summary: 'U/I/t_on Slider → Pulsenergie W, Krater-Canvas mit Plasma, Schrupp/Schlicht-Vergleichsbalken.', interactive: true, depthPoints: 6 },
          { id: 'QUIZ:EDM-1', kind: 'quiz', title: 'Quiz Grundprinzip', summary: 'Womit Abtrag, was bestimmt Ra, welche Materialeigenschaft noetig.', depthPoints: 13 }
        ]
      },
      {
        id: 'UNIT:DRAHTERODIEREN',
        title: 'Drahterodieren',
        entryQuestion: 'Warum kann man mit Drahterodieren keine Sacklocher machen?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BOHR-SENK' },
        sections: [
          { id: 'OBS:BANDSAEGE', kind: 'observation', title: 'Prinzip Drahterodieren', summary: 'Wie eine Bandsaege — aber beruehrungslos, mikrometergenau, durch gehaerteten Stahl.', depthPoints: 3 },
          { id: 'EXP:DRAHT', kind: 'experiment', title: 'Experiment: Draht-Schnitt-Simulator', summary: 'Kontur (Quadrat/Zahnform/Freiform), Drahtdurchmesser, Konuswinkel, Fortschritt — Draufsicht + Querschnitt live.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:WIRE-DETAIL', kind: 'branch', title: 'Seitenast: Toleranzen und Anwendungen', summary: '+/-0,001 mm Toleranz, Drahtmaterialien, Uhrenindustrie, Turbinenschaufeln.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:EDM-2', kind: 'quiz', title: 'Quiz Drahterodieren', summary: 'Warum kein Sackloch, was ermoeglicht Konusschnitt, warum duenne Stege moeglich.', depthPoints: 15 }
        ]
      },
      {
        id: 'UNIT:BOHR-SENK',
        title: 'Bohr- und Senkerodieren',
        entryQuestion: 'Wie bohrt man ein Loch das 1000x tiefer als breit ist?',
        sections: [
          { id: 'OBS:WELTREKORD', kind: 'observation', title: 'Weltrekord Aspektverhaeltnis', summary: 'Durchmesser 0,003 mm, Tiefe 3 mm — 20x duenner als ein Menschenhaar, 3 mm tief.', depthPoints: 4 },
          { id: 'EXP:ASPEKT', kind: 'experiment', title: 'Experiment: Aspektverhaeltnis', summary: 'Durchmesser- und Tiefe-Slider → Verfahrensempfehlung (konv./Tiefbohren/Bohrerodieren/Weltrekord), Querschnitt-Canvas.', interactive: true, depthPoints: 5 },
          { id: 'BRANCH:SINK-DETAIL', kind: 'branch', title: 'Seitenast: Elektroden und Dielektrikum', summary: 'Kupfer vs. Graphit, Oel vs. Wasser, Elektrodenverschleiss Schrupp/Schlicht.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:EDM-3', kind: 'quiz', title: 'Quiz Bohr- und Senkerodieren', summary: 'Warum Dielektrikum durch Elektrode, Hauptvorteil Senkerodieren, Schrupp/Schlicht-Elektroden.', depthPoints: 18 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:MAT-LGS-0001',
    title: 'Wie loest man zwei Bedingungen gleichzeitig',
    subtitle: 'Lineare Gleichungssysteme — grafisch als Schnittpunkt, systematisch mit Gauss-Elimination.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1105',
    kxfModuleId: 'LRN:SSF:MAT-1105',
    domainsNeeded: ['KD:MAT-LINEAR-ALGEBRA','KD:MAT-ANALYSIS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links','Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Grafischer LGS-Solver: 6 Koeffizienten-Slider, zwei Geraden live, Schnittpunkt animiert','Gauss-Elimination: 4-Schritt-Walkthrough mit Zeilenoperationen','Seitenast Cramer-Regel fuer 2x2']
    },
    unlocks: ['MATH:LGS','ANALYSIS:MATRIX'],
    units: [
      {
        id: 'UNIT:LGS-GRAFISCH',
        title: 'Grafisch & geometrisch',
        entryQuestion: 'Zwei Rohre fuellen ein Becken — wie lange braucht jedes allein?',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GAUSS' },
        sections: [
          { id: 'OBS:ROHRE', kind: 'observation', title: 'Beobachtung: Rohrproblem', summary: 'Eine Unbekannte reicht nicht — zwei Bedingungen brauchen zwei Gleichungen.', depthPoints: 3 },
          { id: 'EXP:LGS-GRAFISCH', kind: 'experiment', title: 'Experiment: Zwei Geraden', summary: '6 Slider fuer a1,b1,c1,a2,b2,c2 — Schnittpunkt live, Status eindeutig/parallel/identisch, Determinante.', interactive: true, depthPoints: 5 },
          { id: 'QUIZ:LGS-1', kind: 'quiz', title: 'Quiz: Grafische Loesung', summary: 'Geometrische Bedeutung, Determinante, konkretes 2x2 LGS.', depthPoints: 12 }
        ]
      },
      {
        id: 'UNIT:GAUSS',
        title: 'Gauss-Elimination',
        entryQuestion: 'Wie loest man drei Gleichungen mit drei Unbekannten — ohne zu raten?',
        sections: [
          { id: 'EXP:GAUSS', kind: 'experiment', title: 'Experiment: Gauss-Elimination animiert', summary: '4-Schritt-Walkthrough: Ausgangsmatrix → Pivot Sp.1 → Pivot Sp.2 → Rueckwaertseinsetzen.', interactive: true, depthPoints: 6 },
          { id: 'BRANCH:CRAMER', kind: 'branch', title: 'Seitenast: Cramer-Regel', summary: 'x = det(Ax)/det(A), y = det(Ay)/det(A) — elegant fuer 2x2.', optional: true, depthPoints: 7 },
          { id: 'QUIZ:LGS-2', kind: 'quiz', title: 'Quiz: Gauss', summary: 'Ziel der Gauss-Elimination, erlaubte Operationen, unendlich viele Loesungen.', depthPoints: 15 }
        ]
      }
    ]
  },
  {
    id: 'PATH:SSF:ENG-DMS-0001',
    title: 'Warum kann Stahl brechen',
    subtitle: 'Von der Waermedehnung zum Dehnungsmessstreifen: Spannung, Dehnung und wie ein DMS aus Widerstandsaenderung Kraft sichtbar macht.',
    status: 'prototype',
    sourceModuleId: 'SSF-ENG-1102',
    kxfModuleId: 'LRN:SSF:ENG-1102',
    domainsNeeded: ['KD:ENG-MATERIALS', 'KD:PHYS-MECHANICS', 'KD:EL-BASICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Kapitel 1-8 mit Takeaways',
        'Experimente: Thermische Dehnung, Hookesches Gesetz, Querkontraktions-Visualisierung, DMS-Bruecke live, Rosetten-Rechner'
      ]
    },
    unlocks: ['SENSOR:STRAIN', 'SENSOR:STRESS', 'CIRCUIT:WHEATSTONE'],
    units: [
      {
        id: 'UNIT:DMS-WAERME',
        title: 'Warum werden Materialien laenger?',
        entryQuestion: 'Warum legt man zwischen Schienen-Segmenten Luecken — und warum nur im Sommer?',
        takeaway: 'Jedes Material dehnt sich bei Waerme aus — der Ausdehnungskoeffizient sagt wie stark. Stahl waechst pro Grad und Meter um 12 Mikrometer.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-SPANNUNG' },
        sections: [
          {
            id: 'OBS:SCHIENEN',
            kind: 'observation',
            title: 'Beobachtung: Schienenstoesse im Sommer',
            summary: 'Eisenbahnschienen haben Dehnungsfugen. Im Sommer schrumpfen sie fast auf null — im Winter klaffen sie offen. Dasselbe Metall, andere Temperatur, andere Laenge. Warum?',
            depthPoints: 4
          },
          {
            id: 'EXP:DEHNUNG-WAERME',
            kind: 'experiment',
            title: 'Experiment: Thermische Dehnung',
            summary: 'Material- und Temperatur-Slider: Delta-L = alpha * L0 * Delta-T live. Vergleich Stahl / Aluminium / Beton / Invar.',
            interactive: true,
            depthPoints: 6
          },
          {
            id: 'QUIZ:DMS-1',
            kind: 'quiz',
            title: 'Quiz: Thermische Dehnung',
            summary: 'Warum Dehnungsfugen, was ist alpha, Rechenbeispiel Stahl 10m bei 30 Grad.',
            depthPoints: 12
          }
        ]
      },
      {
        id: 'UNIT:DMS-SPANNUNG',
        title: 'Was ist Spannung?',
        entryQuestion: 'Wenn zwei Kräfte an einem Stab ziehen — was passiert im Inneren des Materials?',
        takeaway: 'Spannung ist Kraft pro Fläche — nicht die Kraft selbst. Derselbe Zug auf einen dünnen Draht reisst ihn, auf einen dicken kaum spürbar.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-DEHNUNG' },
        sections: [
          {
            id: 'OBS:ZUG-DRUCK',
            kind: 'observation',
            title: 'Beobachtung: Zugversuch',
            summary: 'Ein dünner Draht und ein dicker Stab aus demselben Material. Gleiche Kraft — der Draht reisst, der Stab nicht. Der Unterschied liegt nicht in der Kraft, sondern in der Fläche.',
            depthPoints: 4
          },
          {
            id: 'EXP:SPANNUNG',
            kind: 'experiment',
            title: 'Experiment: Normalspannung sigma = F/A',
            summary: 'Kraft F und Querschnitt A als Slider — Spannung sigma live. Vergleich: Draht vs. Stab. Zugspannung (positiv) und Druckspannung (negativ) sichtbar.',
            interactive: true,
            depthPoints: 6
          },
          {
            id: 'QUIZ:DMS-2',
            kind: 'quiz',
            title: 'Quiz: Normalspannung',
            summary: 'Was ist sigma, Einheit N/mm2 = MPa, warum Querschnitt entscheidend.',
            depthPoints: 12
          }
        ]
      },
      {
        id: 'UNIT:DMS-DEHNUNG',
        title: 'Was ist Dehnung?',
        entryQuestion: 'Wenn ein Stab unter Spannung steht — wie sehr verändert er seine Länge?',
        takeaway: 'Dehnung ist dimensionslos — ein Verhältnis. epsilon = 0,001 bedeutet: ein Meter wird um einen Millimeter länger. Kleine Zahlen, grosse Konsequenzen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-QUERKONTRAKTION' },
        sections: [
          {
            id: 'EXP:HOOKE',
            kind: 'experiment',
            title: 'Experiment: Hookesches Gesetz sigma = E * epsilon',
            summary: 'E-Modul und epsilon als Slider — sigma live. Spannungs-Dehnungs-Diagramm mit linearem Bereich, Streckgrenze, Bruch. Material-Vergleich: Stahl / Aluminium / Gummi.',
            interactive: true,
            depthPoints: 7
          },
          {
            id: 'QUIZ:DMS-3',
            kind: 'quiz',
            title: 'Quiz: Dehnung und Hookesches Gesetz',
            summary: 'Was ist epsilon, E-Modul-Vergleich, warum linear nur bis Streckgrenze.',
            depthPoints: 12
          }
        ]
      },
      {
        id: 'UNIT:DMS-QUERKONTRAKTION',
        title: 'Warum werden Materialien dünner?',
        entryQuestion: 'Wenn ein Stab länger wird — wird er gleichzeitig dünner?',
        takeaway: 'Querkontraktion ist unvermeidlich — Volumen bleibt (näherungsweise) erhalten. Die Poisson-Zahl nu beschreibt das Verhältnis: für Stahl etwa 0,3.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-PRINZIP' },
        sections: [
          {
            id: 'OBS:RADIERGUMMI',
            kind: 'observation',
            title: 'Beobachtung: Radiergummi strecken',
            summary: 'Nimm einen Radiergummi und zieh ihn in die Länge. Er wird länger — aber auch dünner. Das ist Querkontraktion. Dasselbe passiert in Stahlträgern unter Last, nur unsichtbar klein.',
            depthPoints: 4
          },
          {
            id: 'EXP:QUERKONTRAKTION',
            kind: 'experiment',
            title: 'Experiment: Querkontraktion und Poisson-Zahl',
            summary: 'Laengsdehnung-Slider — Querdehnung epsilon_q = -nu * epsilon_l live. Visualisierung: Stabquerschnitt verändert sich. Material-Vergleich mit nu-Werten.',
            interactive: true,
            depthPoints: 6
          },
          {
            id: 'QUIZ:DMS-4',
            kind: 'quiz',
            title: 'Quiz: Querkontraktion',
            summary: 'Was ist nu, warum negatives Vorzeichen, Kork nu ~ 0 warum ideal fuer Flaschenverschluss.',
            depthPoints: 12
          }
        ]
      },
      {
        id: 'UNIT:DMS-PRINZIP',
        title: 'Wie misst ein DMS?',
        entryQuestion: 'Wie kann man aus einer winzigen Längenänderung einen elektrischen Messwert machen?',
        takeaway: 'Der DMS klebt auf dem Bauteil und dehnt sich mit — sein Widerstand ändert sich proportional zur Dehnung. k-Faktor beschreibt die Empfindlichkeit.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-BRUECKE' },
        sections: [
          {
            id: 'OBS:DMS-FOTO',
            kind: 'observation',
            title: 'Beobachtung: DMS unter der Lupe',
            summary: 'Ein DMS ist ein mäandrierender Metallfoliengitter auf Trägerfolie — kaum grösser als ein Fingernagel. Er klebt auf dem Bauteil und verformt sich mit ihm. Die Änderung des elektrischen Widerstands verrät die Dehnung.',
            depthPoints: 4
          },
          {
            id: 'EXP:DMS-WIDERSTAND',
            kind: 'experiment',
            title: 'Experiment: DMS-Widerstandsänderung',
            summary: 'Dehnung epsilon und k-Faktor als Slider — Delta-R/R0 live. Typische Werte: epsilon = 1000 microepsilon, k = 2, Delta-R/R0 = 0,2%. Warum so klein?',
            interactive: true,
            depthPoints: 7
          },
          {
            id: 'QUIZ:DMS-5',
            kind: 'quiz',
            title: 'Quiz: DMS-Prinzip',
            summary: 'Was ist der k-Faktor, warum Delta-R/R so klein, was heisst Gauge Factor.',
            depthPoints: 12
          }
        ]
      },
      {
        id: 'UNIT:DMS-BRUECKE',
        title: 'Die Wheatstone-Brücke',
        entryQuestion: 'Eine Widerstandsänderung von 0,2% messen — wie geht das präzise?',
        takeaway: 'Die Wheatstone-Brücke macht aus einer winzigen Widerstandsänderung eine messbare Spannung — und unterdrückt dabei Temperatureinflüsse automatisch.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-ROSETTE' },
        sections: [
          {
            id: 'EXP:BRUECKE',
            kind: 'experiment',
            title: 'Experiment: Wheatstone-Brücke live',
            summary: 'Viertel-, Halb- und Vollbruecke waehlbar. Dehnung-Slider — Brueckenspannung Uab live. Temperaturkompensation sichtbar: Viertelbruecke driftet, Halbbruecke stabil.',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'QUIZ:DMS-6',
            kind: 'quiz',
            title: 'Quiz: Wheatstone-Brücke',
            summary: 'Warum Bruecke statt direkter Messung, Viertel- vs. Halbbruecke, Temperaturkompensation.',
            depthPoints: 15
          }
        ]
      },
      {
        id: 'UNIT:DMS-ROSETTE',
        title: 'Die DMS-Rosette',
        entryQuestion: 'Wenn Spannung in mehrere Richtungen wirkt — wie misst man alle gleichzeitig?',
        takeaway: 'Drei DMS in 0°/45°/90° geben drei Messungen — daraus lassen sich Hauptspannungen und ihre Richtung berechnen. Das ist der Mohrschen Spannungskreis.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DMS-AUSWERTUNG' },
        sections: [
          {
            id: 'EXP:ROSETTE',
            kind: 'experiment',
            title: 'Experiment: DMS-Rosetten-Rechner',
            summary: 'Drei Dehnungen epsilon_a/b/c eingeben — Hauptspannungen sigma_1/sigma_2 und Winkel alpha live berechnet. Mohrsche Kreis visualisiert.',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'QUIZ:DMS-7',
            kind: 'quiz',
            title: 'Quiz: DMS-Rosette',
            summary: 'Warum drei DMS, was sind Hauptspannungen, was zeigt der Mohrsche Kreis.',
            depthPoints: 15
          }
        ]
      },
      {
        id: 'UNIT:DMS-AUSWERTUNG',
        title: 'Vom Messwert zur Spannung',
        entryQuestion: 'Du hast eine Brückenspannung von 1,2 mV — wie gross ist die mechanische Spannung im Bauteil?',
        takeaway: 'Der Weg von Uab zu sigma ist eine Kette: Spannung → Dehnung (k-Faktor) → Spannung (E-Modul). Jeder Schritt hat eine Fehlerquelle — deshalb braucht es Kalibrierung.',
        sections: [
          {
            id: 'EXP:AUSWERTUNG',
            kind: 'experiment',
            title: 'Experiment: Vollständige Messkette',
            summary: 'Uab, Uv, k-Faktor, E-Modul als Slider — epsilon und sigma live. Fehlerfortpflanzung: welcher Parameter dominiert?',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'QUIZ:DMS-8',
            kind: 'quiz',
            title: 'Quiz: Messkette',
            summary: 'Vollstaendige Berechnung sigma aus Uab, warum Kalibrierung, typische Fehlerquellen.',
            depthPoints: 18
          }
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════════════
  // REINIGUNG & MATERIALIEN — 10 Lernpfade
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001',
    title: 'Warum loest Spuelmittel Fett — aber Wasser allein nicht',
    subtitle: 'Tenside, Mizellen und die Grenze zwischen Wasser und Oel — warum ein Molekuel mit zwei Seiten alles veraendert.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2001',
    kxfModuleId: 'LRN:SSF:CHE-3001',
    domainsNeeded: ['KD:CHE-SURFACTANTS', 'KD:CHE-POLARITY', 'KD:PHY-SURFACES'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Molekuel-Visualisierung: hydrophiler Kopf / hydrophober Schwanz animiert',
        'Mizellen-Slider: Konzentration → Mizellen-Bildung live',
        'Grenzflaechenspannung: Wasser mit/ohne Tensid — Tropfenform Canvas'
      ]
    },
    unlocks: ['CHEM:SURFACTANT', 'CHEM:MICELLE', 'SENSE:POLARITY'],
    units: [
      {
        id: 'UNIT:TENSIDE-PROBLEM',
        title: 'Das Fett-Problem',
        entryQuestion: 'Warum perlt Wasser von fettigem Geschirr ab — statt es sauber zu waschen?',
        takeaway: 'Wasser und Fett mischen sich nicht weil Wasser polar ist und Fett unpolar — sie sprechen verschiedene chemische Sprachen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:TENSIDE-LOESUNG' },
        sections: [
          {
            id: 'OBS:FETT-WASSER',
            kind: 'observation',
            title: 'Beobachtung: Wasser auf fettigem Teller',
            summary: 'Du spuelst einen fettigen Teller unter fliessendem Wasser — das Wasser laeuft ab, das Fett bleibt. Wasser und Fett wollen einfach nicht zusammen. Warum verweigern sie die Zusammenarbeit?',
            depthPoints: 4,
          },
          {
            id: 'EXP:POLARITAET',
            kind: 'experiment',
            title: 'Experiment: Polar und unpolar',
            summary: 'Zwei Molekuel-Typen: polar (Wasser, dreht sich im Feld) und unpolar (Oel, gleichgueltig). Slider zeigt wie sich gleiche Ladungen abstossen und ungleiche anziehen — Grundlage der Nicht-Mischbarkeit.',
            interactive: true,
            depthPoints: 6,
          },
          {
            id: 'QUIZ:TENSIDE-1',
            kind: 'quiz',
            title: 'Quiz: Polaritaet',
            summary: 'Warum mischen sich Wasser und Oel nicht, was bedeutet polar, welche Alltagsstoffe sind unpolar.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:TENSIDE-LOESUNG',
        title: 'Die Tensid-Loesung',
        entryQuestion: 'Wie schafft ein einziges Molekuel es, Wasser und Fett zu verbinden?',
        takeaway: 'Ein Tensid-Molekuel hat zwei Enden: einen wasserliebendem Kopf und einen fettliebenden Schwanz. Es stellt sich zwischen beide — und macht die Verbindung moeglich.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:TENSIDE-MIZELLE' },
        sections: [
          {
            id: 'EXP:TENSID-MOLEKUEL',
            kind: 'experiment',
            title: 'Experiment: Das Tensid-Molekuel',
            summary: 'Animiertes Tensid: hydrophiler Kopf dreht sich zum Wasser, hydrophober Schwanz zum Fett. Slider: Konzentration — ab kritischer Mizellenkonzentration bilden sich Mizellen automatisch.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:TENSIDE-2',
            kind: 'quiz',
            title: 'Quiz: Tenside',
            summary: 'Was ist ein Tensid, warum zwei Enden, was passiert unterhalb der CMC.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:TENSIDE-MIZELLE',
        title: 'Die Mizelle',
        entryQuestion: 'Wie wird Fett vom Teller ins Wasser transportiert — ohne dass beide sich wirklich mischen?',
        takeaway: 'Tenside umhuellen Fetttroepfchen zu Mizellen: Fett innen, Wasserkoepfe aussen. So kann Fett im Wasser schwimmen — und wird weggespuelt.',
        sections: [
          {
            id: 'EXP:MIZELLE',
            kind: 'experiment',
            title: 'Experiment: Mizellen-Bildung',
            summary: 'Canvas: Fetttroepfchen wird von Tensid-Molekuelen umgeben. Slider: wie viele Tenside braucht man fuer eine stabile Mizelle? Groesse der Mizelle variiert mit Fettmenge.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:TENSIDE-3',
            kind: 'quiz',
            title: 'Quiz: Mizellen',
            summary: 'Aufbau einer Mizelle, warum Fett jetzt wassermischbar, warum mehr Spuelmittel nicht immer besser.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-KALK-0001',
    title: 'Warum greift Essig Kalk an — aber nicht Fett',
    subtitle: 'Saeuren und Basen im Haushalt: Kalkstein, Neutralisation und warum pH-Wert ueber Wirksamkeit entscheidet.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2002',
    kxfModuleId: 'LRN:SSF:CHE-2002',
    domainsNeeded: ['KD:CHE-ACID-BASE', 'KD:CHE-CARBONATE', 'KD:PHY-PH'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'pH-Skala Slider: Farbe der Indikatorloesung live',
        'Reaktions-Animation: Essig + Kalk → CO2-Blasen',
        'Haushaltsmittel-Sortierer: sauer / basisch / neutral'
      ]
    },
    unlocks: ['CHEM:ACID-BASE', 'CHEM:PH-SCALE', 'TOOL:DESCALER'],
    units: [
      {
        id: 'UNIT:KALK-WAS',
        title: 'Was ist Kalk?',
        entryQuestion: 'Warum entsteht in Wasserkocher und Dusche ein weisser Belag — und warum nur in manchen Regionen?',
        takeaway: 'Kalk ist Calciumcarbonat (CaCO3) — geloest im Wasser als Ionen, ausgefaellt als harter weisser Belag wenn Wasser verdunstet oder erwaermt wird.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KALK-ESSIG' },
        sections: [
          {
            id: 'OBS:KALKBELAG',
            kind: 'observation',
            title: 'Beobachtung: Weisser Belag',
            summary: 'Im Wasserkocher bildet sich ein weisser krustiger Belag. In manchen Staedten mehr, in anderen kaum. Das Wasser sieht gleich aus — aber es ist nicht gleich.',
            depthPoints: 4,
          },
          {
            id: 'EXP:HAERTE',
            kind: 'experiment',
            title: 'Experiment: Wasserhaerte',
            summary: 'Karte Deutschland: Haerte nach Region. Slider: Ca2+-Konzentration → wann faellt Kalk aus? Temperatur-Einfluss: 100 Grad beschleunigt Ausfaellung sichtbar.',
            interactive: true,
            depthPoints: 6,
          },
          {
            id: 'QUIZ:KALK-1',
            kind: 'quiz',
            title: 'Quiz: Kalk und Wasserhaerte',
            summary: 'Was ist Kalk chemisch, warum mehr Belag bei hartem Wasser, warum hilft Erwaermen die Ausfaellung.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:KALK-ESSIG',
        title: 'Essig gegen Kalk',
        entryQuestion: 'Warum loest Essig Kalk auf — und was passiert dabei genau?',
        takeaway: 'Essigsaeure reagiert mit Calciumcarbonat zu Calciumacetat, Wasser und CO2. Die Blaeschen sind kein Trick — das ist die Reaktion.',
        sections: [
          {
            id: 'OBS:ESSIG-BLAESCHEN',
            kind: 'observation',
            title: 'Beobachtung: Blaeschen beim Entkalken',
            summary: 'Du gibst Essig auf Kalk — sofort entstehen Blaeschen. Das ist kein Schaum vom Essig. Da passiert eine chemische Reaktion. Was genau?',
            depthPoints: 4,
          },
          {
            id: 'EXP:NEUTRALISATION',
            kind: 'experiment',
            title: 'Experiment: Saeure trifft Karbonat',
            summary: 'pH-Slider: von sauer zu basisch. Animation zeigt H+-Ionen die CO3-Ionen angreifen — CO2-Blasen entstehen, Kalk loest sich auf. Konzentrations-Slider: mehr Saeure = schnellere Aufloesung.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:KALK-2',
            kind: 'quiz',
            title: 'Quiz: Entkalken',
            summary: 'Reaktionsgleichung vereinfacht, warum Fett nicht reagiert, warum zu viel Saeure Oberflaechen angreift.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-CHLOR-0001',
    title: 'Warum bleicht Chlor — und warum darf man es nicht mit Essig mischen',
    subtitle: 'Oxidation, Desinfektion und ein gefaehrlicher Fehler: was Chlor im Molekuel anrichtet und wann es gefaehrlich wird.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2003',
    kxfModuleId: 'LRN:SSF:CHE-2003',
    domainsNeeded: ['KD:CHE-OXIDATION', 'KD:CHE-REDOX', 'KD:CHE-SAFETY'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Oxidations-Animation: Farbstoffmolekuel wird durch Cl angegriffen, Farbe verschwindet',
        'Reaktions-Warnung: Chlor + Saeure → Chlorgas Visualisierung',
        'Desinfektion-Slider: Konzentration vs. Wirksamkeit vs. Sicherheit'
      ]
    },
    unlocks: ['CHEM:OXIDATION', 'CHEM:DISINFECTION', 'SAFETY:CHEMICAL-MIXING'],
    units: [
      {
        id: 'UNIT:CHLOR-BLEICH',
        title: 'Warum verschwindet Farbe?',
        entryQuestion: 'Warum wird ein Rotweinfleck auf weissem Stoff mit Bleichmittel unsichtbar — aber der Stoff bleibt weiss?',
        takeaway: 'Chlor zerstoert die Doppelbindungen in Farbstoff-Molekuelen — die Molekuele koennen kein Licht mehr absorbieren und werden farblos. Der Stoff bleibt, die Farbe ist weg.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:CHLOR-GEFAHR' },
        sections: [
          {
            id: 'OBS:BLEICH',
            kind: 'observation',
            title: 'Beobachtung: Fleck verschwindet',
            summary: 'Bleichmittel auf einem Farbfleck — nach Minuten ist die Farbe weg. Aber was ist passiert? Die Farbe ist nicht weggespuelt worden. Sie ist verschwunden.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OXIDATION',
            kind: 'experiment',
            title: 'Experiment: Oxidation eines Farbstoffs',
            summary: 'Animation: Farbstoffmolekuel mit Doppelbindungen (Chromophore). Chlor-Slider: je mehr Cl, desto mehr Bindungen werden angegriffen. Farbe verblasst live auf Canvas.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:CHLOR-1',
            kind: 'quiz',
            title: 'Quiz: Bleichen',
            summary: 'Was ist Oxidation, warum verschwinden Farben, warum bleicht Chlor aber nicht Wasser.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:CHLOR-GEFAHR',
        title: 'Der gefaehrliche Fehler',
        entryQuestion: 'Was passiert wenn man Chlorreiniger und Essig im selben Eimer mischt?',
        takeaway: 'Chlor + Saeure = Chlorgas. Das ist kein Geruch — das ist ein Atemgift. Niemals Chlorreiniger mit saeuren Mitteln mischen.',
        sections: [
          {
            id: 'OBS:MISCHUNG',
            kind: 'observation',
            title: 'Beobachtung: Der Fehler im Alltag',
            summary: 'Viele Menschen mischen Reinigungsmittel um "staerker" zu putzen. Chlorreiniger und Essigreiniger im selben Eimer — das riecht beissend und macht Augen und Atemwege brennen. Das ist kein Zufall.',
            depthPoints: 4,
          },
          {
            id: 'EXP:CHLORGAS',
            kind: 'experiment',
            title: 'Experiment: Chlorgas-Reaktion',
            summary: 'Visualisierung (keine echte Reaktion): pH-Slider zeigt wie bei pH < 4 Hypochlorit zu Chlorgas wird. Konzentrations-Balken zeigt Gefaehrdung. Warnung prominent im Interface.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:CHLOR-2',
            kind: 'quiz',
            title: 'Quiz: Chemische Sicherheit',
            summary: 'Welche Kombinationen sind gefaehrlich, warum Chlorgas entsteht, was tun bei Exposition.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-REINIGUNG-OBERFLAECHEN-0001',
    title: 'Warum funktioniert derselbe Schwamm auf Glas anders als auf Stein',
    subtitle: 'Haerte, Poroesitaet und Oberflaechenstruktur: warum jedes Material anders auf Reinigung reagiert.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-2001',
    kxfModuleId: 'LRN:SSF:PHY-3001',
    domainsNeeded: ['KD:PHY-SURFACES', 'KD:MAT-HARDNESS', 'KD:MAT-POROSITY'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Mohs-Haerte Vergleich: interaktive Skala mit Alltagsmaterialien',
        'Mikro-Oberflaechenstruktur: Glas vs. Naturstein vs. Fliese unter Lupe animiert',
        'Kratzer-Simulator: welches Werkzeug schadet welchem Material'
      ]
    },
    unlocks: ['TOOL:SURFACE-ANALYSIS', 'MAT:HARDNESS-SCALE'],
    units: [
      {
        id: 'UNIT:OBERFLAECHE-HAERTE',
        title: 'Haerte und Kratzer',
        entryQuestion: 'Warum hinterlaesst ein Stahlschwamm auf Edelstahl Kratzer — aber auf Beton nicht?',
        takeaway: 'Haerteres Material kratzt weicheres. Die Mohs-Skala ordnet Materialien nach Haerte — wer oben steht, kratzt alle darunter.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:OBERFLAECHE-POREN' },
        sections: [
          {
            id: 'OBS:KRATZER',
            kind: 'observation',
            title: 'Beobachtung: Kratzer auf dem falschen Material',
            summary: 'Stahlschwamm auf dem Cerankochfeld — sofort Kratzer. Derselbe Schwamm auf der Betongarage — kein Problem. Nicht die Kraft macht den Unterschied, sondern das Material.',
            depthPoints: 4,
          },
          {
            id: 'EXP:MOHS',
            kind: 'experiment',
            title: 'Experiment: Mohs-Haerte-Skala',
            summary: 'Interaktive Skala 1-10: Fingernagel (2.5), Muenze (3.5), Glas (5.5), Stahl (6.5), Quarz (7), Korund (9), Diamant (10). Zwei Materialien waehlen — wer kratzt wen? Ergebnis live.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:OBERFLAECHE-1',
            kind: 'quiz',
            title: 'Quiz: Haerte und Mohs-Skala',
            summary: 'Mohs-Prinzip, welches Material kratzt welches, warum Diamant alles kratzt.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:OBERFLAECHE-POREN',
        title: 'Poroesitaet und Schmutz',
        entryQuestion: 'Warum ist Naturstein nach dem Putzen oft dunkler als vorher?',
        takeaway: 'Poroese Materialien wie Marmor oder Sandstein saugen Reinigungsmittel und Wasser auf — Schmutz wandert tiefer statt weggespuelt zu werden. Versiegeln hilft mehr als schrubben.',
        sections: [
          {
            id: 'OBS:STEIN-DUNKEL',
            kind: 'observation',
            title: 'Beobachtung: Nasser Stein wird dunkler',
            summary: 'Naturstein im Bad — nach dem Putzen wirkt er dunkler und fleckiger als vorher. Kein Dreck mehr drauf, aber irgendwie schlechter. Was ist passiert?',
            depthPoints: 4,
          },
          {
            id: 'EXP:POROESITAET',
            kind: 'experiment',
            title: 'Experiment: Poroesitaet unter der Lupe',
            summary: 'Querschnitt-Canvas: Glas (glatt, kaum Poren), Fliese (glasiert, dicht), Marmor (mittel), Sandstein (sehr poroes). Fluessigkeits-Slider zeigt wie tief Wasser eindringt je nach Material.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:OBERFLAECHE-2',
            kind: 'quiz',
            title: 'Quiz: Poroesitaet',
            summary: 'Warum Stein dunkler wird, was Impraegnierung bewirkt, welche Materialien empfindlich auf saure Reiniger reagieren.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-FENSTER-0001',
    title: 'Warum hinterlaesst Fensterputzen Streifen — und wie vermeidet man sie',
    subtitle: 'Oberflaechenspannung, Verdunstung und warum der perfekte Wischer-Winkel existiert.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2004',
    kxfModuleId: 'LRN:SSF:CHE-2004',
    domainsNeeded: ['KD:PHY-SURFACE-TENSION', 'KD:CHE-EVAPORATION', 'KD:PHY-OPTICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Verdunstungs-Slider: Temperatur und Luftfeuchtigkeit → Streifenbildung live',
        'Oberflaechenspannungs-Canvas: Tropfen auf Glas, Kontaktwinkel',
        'Wischer-Winkel-Simulator: optimaler Winkel fuer streifenfreies Ergebnis'
      ]
    },
    unlocks: ['TOOL:STREAK-FREE', 'PHY:SURFACE-TENSION'],
    units: [
      {
        id: 'UNIT:FENSTER-STREIFEN',
        title: 'Warum Streifen entstehen',
        entryQuestion: 'Warum hinterlaesst Zeitungspapier weniger Streifen als ein Tuch — obwohl Papier rauer ist?',
        takeaway: 'Streifen entstehen wenn Wasser zu schnell verdunstet und geloeste Stoffe zurueckbleiben. Zeitungspapier nimmt Fluessigkeit schneller auf — die Oberflaechespannung bricht zusammen bevor Streifen entstehen koennen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:FENSTER-LOESUNG' },
        sections: [
          {
            id: 'OBS:FENSTER-ZEITUNG',
            kind: 'observation',
            title: 'Beobachtung: Der Zeitung-Trick',
            summary: 'Grosseltern putzten Fenster mit feuchter Zeitung — und sie waren streifenfrei. Modernes Mikrofasertuch, teurer Glasreiniger — und trotzdem Streifen. Irgendwas stimmt hier nicht.',
            depthPoints: 4,
          },
          {
            id: 'EXP:VERDUNSTUNG',
            kind: 'experiment',
            title: 'Experiment: Verdunstung und Rueckstaende',
            summary: 'Canvas: Wasserfilm auf Glas. Temperatur-Slider und Luftfeuchtigkeits-Slider — je heisser und trockener, desto schneller verdunstet Wasser und hinterlaesst Minerale als weissen Schleier.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:FENSTER-1',
            kind: 'quiz',
            title: 'Quiz: Streifenbildung',
            summary: 'Warum entstehen Streifen, was loest sich im Wasser, warum ist weniger Reinigungsmittel oft besser.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:FENSTER-LOESUNG',
        title: 'Die Technik des streifenfreien Putzen',
        entryQuestion: 'Warum putzen Profis Fenster bei bewoelktem Himmel — niemals in der Sonne?',
        takeaway: 'Direkte Sonne erwaermt das Glas und beschleunigt Verdunstung — Streifen entstehen bevor man fertig ist. Bewoelkt, kuehler Schatten: Wasser verdunstet langsam genug zum gleichmaessigen Abziehen.',
        sections: [
          {
            id: 'EXP:WISCHER-TECHNIK',
            kind: 'experiment',
            title: 'Experiment: Wischer-Winkel und Geschwindigkeit',
            summary: 'Wischer-Simulator: Winkel 30-90 Grad, Geschwindigkeit Slider. Optimaler Bereich markiert. Zu steil: Wasser schiesst seitlich. Zu flach: Streifen bleiben. Canvas zeigt Wasserfilm-Verteilung.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:FENSTER-2',
            kind: 'quiz',
            title: 'Quiz: Putztechnik',
            summary: 'Warum nicht in der Sonne, optimaler Wischer-Winkel, warum destilliertes Wasser keine Streifen macht.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
    title: 'Warum macht heisses Wasser einen Rotweinfleck schlimmer',
    subtitle: 'Proteindenaturierung, Loeslichkeit und warum der erste Reflex beim Fleck oft der falsche ist.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2005',
    kxfModuleId: 'LRN:SSF:CHE-2005',
    domainsNeeded: ['KD:CHE-PROTEINS', 'KD:CHE-SOLUBILITY', 'KD:PHY-TEMPERATURE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Temperatur-Slider: Protein-Struktur faltet sich auf Canvas — Denaturierung sichtbar',
        'Loeslichkeits-Kurven: welcher Stoff loest sich bei welcher Temperatur besser',
        'Fleck-Behandlungs-Simulator: kalt/warm/Salz/Soda — Ergebnis live'
      ]
    },
    unlocks: ['CHEM:PROTEIN-DENATURATION', 'TOOL:STAIN-REMOVAL'],
    units: [
      {
        id: 'UNIT:ROTWEIN-FEHLER',
        title: 'Der heisse Fehler',
        entryQuestion: 'Warum wird ein Rotweinfleck auf weissem Hemd mit heissem Wasser dauerhaft — mit kaltem Wasser aber entfernbar?',
        takeaway: 'Rotwein enthaelt Anthocyane und Proteine. Heisses Wasser denaturiert die Proteine — sie vernetzen sich mit der Textilfaser und der Fleck wird permanent. Kalt spuelen zuerst.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ROTWEIN-LOESUNG' },
        sections: [
          {
            id: 'OBS:ROTWEIN-SCHOCK',
            kind: 'observation',
            title: 'Beobachtung: Der Fleck der bleibt',
            summary: 'Rotwein auf weissem Hemd — Panik. Jemand sagt: heisses Wasser drueber. Das Ergebnis: der Fleck ist jetzt grau-braun und geht nicht mehr raus. Was ist passiert?',
            depthPoints: 4,
          },
          {
            id: 'EXP:DENATURIERUNG',
            kind: 'experiment',
            title: 'Experiment: Protein-Denaturierung',
            summary: 'Canvas: Protein-Knauel in Textil. Temperatur-Slider 20-100 Grad. Ab 60 Grad: Protein entfaltet sich, vernetzt mit Faser — Verbindung wird sichtbar staerker. Analogie: wie ein Ei das fest wird.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:ROTWEIN-1',
            kind: 'quiz',
            title: 'Quiz: Denaturierung',
            summary: 'Was ist Denaturierung, warum kalt zuerst, warum Ei nicht mehr fluessig wird.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ROTWEIN-LOESUNG',
        title: 'Was wirklich hilft',
        entryQuestion: 'Warum hilft Salz auf einem frischen Rotweinfleck — und Soda auf einem alten?',
        takeaway: 'Salz wirkt osmotisch: es zieht Fluessigkeit aus der Faser bevor sie eintrocknet. Soda (basisch) loest bereits getrocknete Farbstoffe durch chemische Reaktion. Verschiedene Probleme brauchen verschiedene Loesungen.',
        sections: [
          {
            id: 'EXP:FLECK-BEHANDLUNG',
            kind: 'experiment',
            title: 'Experiment: Fleck-Behandlungs-Vergleich',
            summary: 'Vier Methoden: Salz (frisch), kaltes Wasser (frisch), Soda-Paste (getrocknet), Enzymwaschmittel (eingetrocknet). Slider: Zeit seit Fleck. Ergebnis-Balken zeigt Effizienz je nach Timing.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:ROTWEIN-2',
            kind: 'quiz',
            title: 'Quiz: Fleckentfernung',
            summary: 'Warum Salz osmotisch wirkt, warum Enzyme in Waschmitteln helfen, warum heisses Waschen nach kalter Vorbehandlung ok ist.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-REINIGUNG-FLIESEN-HOLZ-0001',
    title: 'Warum vertraegt Holz kein stehendes Wasser — aber Fliesen schon',
    subtitle: 'Zellulose, Quellung und warum das Material entscheidet welches Reinigungsmittel sicher ist.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-2002',
    kxfModuleId: 'LRN:SSF:PHY-3002',
    domainsNeeded: ['KD:MAT-WOOD', 'KD:MAT-CERAMICS', 'KD:CHE-WATER-ABSORPTION'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Quellungs-Animation: Holzfaser nimmt Wasser auf, dehnt sich, reisst',
        'Material-Vergleich: Wasser-Aufnahme Holz vs. Fliese vs. Vinyl vs. Laminat',
        'Reinigungsmittel-Kompatibilitaets-Matrix interaktiv'
      ]
    },
    unlocks: ['MAT:WOOD-CARE', 'MAT:TILE-CARE', 'TOOL:FLOOR-CLEANING'],
    units: [
      {
        id: 'UNIT:HOLZ-WASSER',
        title: 'Holz und Wasser',
        entryQuestion: 'Warum quillt Holzparkett auf wenn Wasser steht — aber ein nasses Tuch schnell drueberwischen kein Problem ist?',
        takeaway: 'Holz ist eine lebende Zellstruktur aus Zellulose — sie nimmt Wasser auf und gibt es ab. Kurz feucht: kein Problem. Stehend nass: die Fasern quellen, verformen sich, reissen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MATERIAL-VERGLEICH' },
        sections: [
          {
            id: 'OBS:PARKETT-SCHADEN',
            kind: 'observation',
            title: 'Beobachtung: Aufgequollenes Parkett',
            summary: 'Nach einem Wasserschaden: Parkettdielen stehen wie Zelte in der Luft. Dabei ist das Parkett versiegelt. Trotzdem quillt es. Was ist in das Holz eingedrungen?',
            depthPoints: 4,
          },
          {
            id: 'EXP:QUELLUNG',
            kind: 'experiment',
            title: 'Experiment: Holzquellung',
            summary: 'Canvas: Querschnitt einer Holzfaser. Wasser-Slider: 0-100% Feuchte. Fasern dehnen sich sichtbar, Zellstruktur weitet sich. Bei 100%: Risse entstehen. Vergleich: frisches Holz vs. versiegeltes Holz.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:HOLZ-1',
            kind: 'quiz',
            title: 'Quiz: Holz und Feuchtigkeit',
            summary: 'Warum quillt Holz, was ist Zellulose, warum schadet stehend Wasser mehr als Spritzwasser.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:MATERIAL-VERGLEICH',
        title: 'Jedes Material braucht seine Pflege',
        entryQuestion: 'Warum darf man Marmor nicht mit Essigwasser wischen — obwohl das bei Fliesen funktioniert?',
        takeaway: 'Marmor ist Calciumcarbonat — Saeure loest ihn auf. Keramikfliesen sind glasiert und saeureresistent. Gleiches Werkzeug, verschiedene Materialien: voellig verschiedene Reaktion.',
        sections: [
          {
            id: 'EXP:MATERIAL-MATRIX',
            kind: 'experiment',
            title: 'Experiment: Reinigungsmittel-Kompatibilitaet',
            summary: 'Interaktive Matrix: Material (Holz, Marmor, Keramik, Vinyl, Laminat) x Reinigungsmittel (Essig, Chlor, pH-neutral, Seife). Ampel-System: gruen/gelb/rot. Klick zeigt Erklaerung.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:MATERIAL-2',
            kind: 'quiz',
            title: 'Quiz: Material und Reinigung',
            summary: 'Warum Essig Marmor schadet, was glasierte Fliesen schuetzt, warum Laminat wie Holz behandelt wird.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-EMULSION-0001',
    title: 'Warum trennt sich Salatdressing — und wie haelt Mayonnaise zusammen',
    subtitle: 'Emulsionen, Emulgatoren und warum Eigelb das Geheimnis der Kuechenchemie ist.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2006',
    kxfModuleId: 'LRN:SSF:CHE-2006',
    domainsNeeded: ['KD:CHE-EMULSION', 'KD:CHE-LECITHIN', 'KD:PHY-COLLOIDS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Emulsions-Canvas: Oel-Tropfen in Wasser, ohne/mit Emulgator animiert',
        'Lecithin-Molekuel: wie Tensid aber fuer Oel-in-Wasser-Systeme',
        'Mayonnaise-Simulator: Eigelb-Menge vs. Stabilitaet'
      ]
    },
    unlocks: ['CHEM:EMULSION', 'CHEM:LECITHIN', 'TOOL:KITCHEN-CHEMISTRY'],
    units: [
      {
        id: 'UNIT:EMULSION-TRENNUNG',
        title: 'Warum sich Oel und Wasser trennen',
        entryQuestion: 'Warum muss man Salatdressing vor jedem Gebrauch schuetteln — und warum trennt es sich trotzdem wieder?',
        takeaway: 'Oel und Wasser trennen sich weil das System so weniger Energie hat — Grenzflaeche minimiert sich. Schuetteln erzeugt kuenstlich viele kleine Tropfen, aber ohne Emulgator kehrt das System zurueck.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:EMULSION-STABIL' },
        sections: [
          {
            id: 'OBS:DRESSING-TRENNUNG',
            kind: 'observation',
            title: 'Beobachtung: Das Dressing trennt sich',
            summary: 'Essig und Oel im Glaeser — schuetteln, kurz vermischt, dann wieder getrennt. Unten Essig, oben Oel. Immer. Warum kehren sie immer zurueck?',
            depthPoints: 4,
          },
          {
            id: 'EXP:OEL-WASSER',
            kind: 'experiment',
            title: 'Experiment: Oel-Wasser-Grenzflaeche',
            summary: 'Canvas: Oel-Tropfen in Wasser. Energie-Balken zeigt: grosse Tropfen = weniger Grenzflaeche = weniger Energie = stabiler. Schuetteln-Button: viele kleine Tropfen entstehen, aber Energie ist hoeher — nicht stabil.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:EMULSION-1',
            kind: 'quiz',
            title: 'Quiz: Emulsionen',
            summary: 'Warum trennt sich Oel und Wasser, was ist eine Emulsion, warum schuetteln nur temporaer hilft.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:EMULSION-STABIL',
        title: 'Das Geheimnis der Mayonnaise',
        entryQuestion: 'Warum bleibt Mayonnaise wochenlang stabil — obwohl sie fast nur aus Oel und Wasser besteht?',
        takeaway: 'Lecithin im Eigelb ist ein Emulgator: ein Molekuel mit wasserliebender und oelliebender Seite — wie Tenside beim Spuelen. Es stabilisiert jeden Oel-Tropfen dauerhaft.',
        sections: [
          {
            id: 'OBS:MAYO-STABIL',
            kind: 'observation',
            title: 'Beobachtung: Mayonnaise fault nicht aus',
            summary: 'Mayonnaise ist fast zu 80% Oel — und trotzdem cremig, stabil, monatelang haltbar. Salatdressing trennt sich nach Sekunden. Der Unterschied: ein Eigelb.',
            depthPoints: 4,
          },
          {
            id: 'EXP:LECITHIN',
            kind: 'experiment',
            title: 'Experiment: Lecithin als Emulgator',
            summary: 'Lecithin-Molekuel animiert: Phosphat-Kopf (wasserliebend) und Fettsaeure-Schwanz (oelliebend). Slider: Lecithin-Konzentration → Tropfen-Stabilisierung live. Ab kritischer Konzentration: stabile Emulsion.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:EMULSION-2',
            kind: 'quiz',
            title: 'Quiz: Emulgatoren',
            summary: 'Was ist Lecithin, warum stabilisiert es Emulsionen, was haben Mayonnaise und Spuelmittel gemeinsam.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-REINIGUNG-OSMOSE-0001',
    title: 'Warum wird Gurke in Salzlake weich — und Kartoffel in Salzwasser hart',
    subtitle: 'Osmose, Zellturgor und warum Wasser immer in Richtung der hoeheren Konzentration wandert.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2007',
    kxfModuleId: 'LRN:SSF:CHE-2007',
    domainsNeeded: ['KD:CHE-OSMOSIS', 'KD:BIO-CELL-MEMBRANE', 'KD:PHY-DIFFUSION'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Osmose-Animation: Wassermolekuele wandern durch semipermeable Membran',
        'Konzentrations-Slider: Salz innen vs. aussen → Wasserfluss-Richtung',
        'Zell-Turgor-Visualisierung: prall vs. welk vs. plasmolyse'
      ]
    },
    unlocks: ['CHEM:OSMOSIS', 'BIO:CELL-MEMBRANE', 'TOOL:FOOD-PRESERVATION'],
    units: [
      {
        id: 'UNIT:OSMOSE-PRINZIP',
        title: 'Wasser wandert bergauf',
        entryQuestion: 'Warum zieht eine trockene Rosine in Wasser wieder auf — obwohl niemand Wasser hineingepresst hat?',
        takeaway: 'Wasser wandert von niedrigerer zu hoeherer Konzentration geloester Stoffe — durch die Zellmembran hindurch. Das ist Osmose: kein Druck, nur Konzentrationsgefaelle.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:OSMOSE-KUECHE' },
        sections: [
          {
            id: 'OBS:ROSINE',
            kind: 'observation',
            title: 'Beobachtung: Die quellende Rosine',
            summary: 'Rosine in Wasser legen — nach Stunden ist sie prall und gross. Wasser ist in sie hineingegangen. Aber die Rosine war nicht offen. Wie kommt das Wasser durch die Haut?',
            depthPoints: 4,
          },
          {
            id: 'EXP:OSMOSE',
            kind: 'experiment',
            title: 'Experiment: Osmose durch die Membran',
            summary: 'Canvas: semipermeable Membran, links Salzwasser (hoch konzentriert), rechts reines Wasser. Wassermolekuele wandern von rechts nach links — Pfeile zeigen Nettofluss. Konzentrationsslider: Gleichgewicht einstellen.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:OSMOSE-1',
            kind: 'quiz',
            title: 'Quiz: Osmose',
            summary: 'Richtung des Wasserflusses, was ist semipermeable Membran, warum quillt Rosine in Wasser aber schrumpft in Salzlake.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:OSMOSE-KUECHE',
        title: 'Osmose in der Kueche',
        entryQuestion: 'Warum macht man Gurkensalat mit Salz — und warum wird die Gurke dann waeSSrig?',
        takeaway: 'Salz aussen, Wasser innen: Osmose zieht Wasser aus der Gurkenzelle. Die Gurke wird weich und gibt Fluessigkeit ab. Derselbe Effekt macht eingelegte Gemuese haltbar — Bakterien verlieren ihr Zellwasser.',
        sections: [
          {
            id: 'EXP:ZELLTURGOR',
            kind: 'experiment',
            title: 'Experiment: Zellturgor',
            summary: 'Pflanzenzelle Canvas: Vakuole gefuellt mit Zellsaft. Aussen-Salzkonzentration Slider. Hoch: Wasser stroemt raus, Zelle schrumpft (Plasmolyse). Niedrig: Wasser stroemt rein, Zelle prall (Turgor). Gurken-Analogie.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:OSMOSE-2',
            kind: 'quiz',
            title: 'Quiz: Osmose in der Kueche',
            summary: 'Warum Gurkensalat waessrig wird, wie Einlegen Gemuese haltbar macht, warum zu viel Salz Gemuese zerstoert.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-REINIGUNG-SIEDEPUNKT-0001',
    title: 'Warum kocht Wasser in den Bergen bei weniger als 100 Grad',
    subtitle: 'Luftdruck, Siedepunkt und warum Hochgebirgskochen laenger dauert — obwohl das Wasser heisser klingt.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-2003',
    kxfModuleId: 'LRN:SSF:PHY-3003',
    domainsNeeded: ['KD:PHY-PRESSURE', 'KD:PHY-PHASE-TRANSITION', 'KD:PHY-THERMODYNAMICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Hoehen-Siedepunkt-Slider: Hoehe → Luftdruck → Siedetemperatur live',
        'Phasendiagramm Wasser: Druck-Temperatur-Canvas mit Siedekurve',
        'Kochzeit-Rechner: Nudeln in den Alpen vs. Meeresspiegel'
      ]
    },
    unlocks: ['PHY:PHASE-DIAGRAM', 'PHY:BOILING-POINT', 'TOOL:ALTITUDE-COOKING'],
    units: [
      {
        id: 'UNIT:SIEDEPUNKT-DRUCK',
        title: 'Druck und Siedepunkt',
        entryQuestion: 'Warum sprudelt Wasser im Gebirge bei 90 Grad — obwohl es zu Hause erst bei 100 Grad kocht?',
        takeaway: 'Wasser siedet wenn sein Dampfdruck den Umgebungsdruck uebersteigt. Weniger Luftdruck im Gebirge = niedrigere Temperatur noetig. Kochen bei 90 Grad, aber langsamer garen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SIEDEPUNKT-KUECHE' },
        sections: [
          {
            id: 'OBS:BERG-KOCHEN',
            kind: 'observation',
            title: 'Beobachtung: Nudeln im Hochgebirge',
            summary: 'Berghuette auf 2500 m — Wasser kocht schnell, aber die Nudeln sind nach normaler Zeit noch hart. Das Wasser hat gekocht, also muss es heiss genug gewesen sein. War es das?',
            depthPoints: 4,
          },
          {
            id: 'EXP:SIEDEPUNKT',
            kind: 'experiment',
            title: 'Experiment: Hoehe und Siedetemperatur',
            summary: 'Hoehen-Slider 0-8848 m (Meeresspiegel bis Everest): Luftdruck faellt, Siedetemperatur faellt. Live: Hamburg 100 Grad, Zugspitze 95 Grad, Everest 70 Grad. Canvas zeigt Luftdruckbalken.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:SIEDEPUNKT-1',
            kind: 'quiz',
            title: 'Quiz: Siedepunkt',
            summary: 'Warum kocht Wasser im Gebirge kuelter, was ist Dampfdruck, warum Schnellkochtopf das Gegenteil bewirkt.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:SIEDEPUNKT-KUECHE',
        title: 'Kochen unter Druck',
        entryQuestion: 'Warum gart ein Schnellkochtopf Lebensmittel doppelt so schnell — obwohl er nicht heisser klingt?',
        takeaway: 'Schnellkochtopf erhoeht den Druck — Siedepunkt steigt auf 120 Grad. Hoeherer Druck = hoehere Gartemperatur = schnellere chemische Reaktionen. Das Gegenteil des Gebirgs-Problems.',
        sections: [
          {
            id: 'EXP:SCHNELLKOCHTOPF',
            kind: 'experiment',
            title: 'Experiment: Druck und Garzeit',
            summary: 'Druck-Slider 0.5-3 bar: Siedetemperatur von 80 bis 133 Grad. Garzeit-Balken: Kartoffeln normal 25 min, Schnellkochtopf 8 min. Phasendiagramm-Ausschnitt zeigt Siedekurve.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:SIEDEPUNKT-2',
            kind: 'quiz',
            title: 'Quiz: Druck und Kochen',
            summary: 'Schnellkochtopf-Prinzip, warum Dampf heisser als 100 Grad sein kann, Vakuum-Destillation als Extremfall.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-REINIGUNG-WAERME-0001',
    title: 'Warum kuehlst Kaffee in einer breiten Tasse schneller ab als in einer schmalen',
    subtitle: 'Waermeabgabe, Oberflaeche und warum Form Physik ist — nicht nur Aesthetik.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-2004',
    kxfModuleId: 'LRN:SSF:PHY-3004',
    domainsNeeded: ['KD:PHY-HEAT-TRANSFER', 'KD:PHY-RADIATION', 'KD:PHY-CONVECTION'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Tassen-Form-Slider: Durchmesser vs. Hoehe → Oberflaeche → Abkuehlrate live',
        'Newton-Kurve: Temperaturverlauf verschiedener Tassenformen animiert',
        'Waermetransfer-Visualisierung: Strahlung / Konvektion / Leitung anteile'
      ]
    },
    unlocks: ['PHY:HEAT-TRANSFER', 'PHY:SURFACE-AREA', 'TOOL:THERMAL-DESIGN'],
    units: [
      {
        id: 'UNIT:WAERME-OBERFLAECHE',
        title: 'Oberflaeche und Abkuehlung',
        entryQuestion: 'Warum kuehlst Suppe auf einem flachen Teller schneller ab als in einer tiefen Schuessel?',
        takeaway: 'Waerme wird ueber die Oberflaeche abgegeben. Groessere Oberflaeche = mehr Kontakt mit kuehler Luft = schnellere Abkuehlung. Flacher Teller: mehr Oberflaeche pro Volumen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WAERME-TRANSPORT' },
        sections: [
          {
            id: 'OBS:TELLER-SCHUESSEL',
            kind: 'observation',
            title: 'Beobachtung: Suppe auf Teller vs. Schuessel',
            summary: 'Dieselbe Suppe, gleiches Volumen: flacher Teller kuehlst in 5 Minuten auf Trinktemperatur, tiefe Schuessel braucht 12 Minuten. Der Unterschied ist nur die Form.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OBERFLAECHE-VOLUMEN',
            kind: 'experiment',
            title: 'Experiment: Oberflaeche-zu-Volumen-Verhaeltnis',
            summary: 'Tassen-Konfigurator: Durchmesser und Hoehe Slider. Canvas zeigt Tasse mit Oberflaeche-Markierung. Abkuehlrate-Balken passt sich an. Gleiche Fuellmenge, verschiedene Formen: Ergebnis live.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:WAERME-1',
            kind: 'quiz',
            title: 'Quiz: Waermeabgabe',
            summary: 'Warum Form die Abkuehlung beeinflusst, Oberflaeche-Volumen-Verhaeltnis berechnen, warum Thermo-Becher doppelwandig ist.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:WAERME-TRANSPORT',
        title: 'Wie Waerme entkommt',
        entryQuestion: 'Warum haelt ein Porzellan-Becher Kaffee laenger warm als ein Metall-Becher?',
        takeaway: 'Drei Wege der Waermeabgabe: Strahlung, Konvektion, Leitung. Metall leitet gut (Leitung an Haende, schnell kalt). Porzellan isoliert (schlechter Leiter). Doppelwand-Vakuum blockiert alle drei.',
        sections: [
          {
            id: 'EXP:WAERMETRANSPORT',
            kind: 'experiment',
            title: 'Experiment: Drei Waermetransportwege',
            summary: 'Canvas: Kaffeetasse mit drei animierten Transportwegen. Strahlung (rote Pfeile nach aussen), Konvektion (Luftstroemung um Tasse), Leitung (Waerme durch Tassenwand in Hand). Material-Slider: Metall, Porzellan, Glas, Vakuum — Anteile aendern sich.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:WAERME-2',
            kind: 'quiz',
            title: 'Quiz: Waermetransport',
            summary: 'Drei Transportwege benennen, warum Vakuum alle blockiert, warum Umruehren schneller kuehlt.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },
  {
    id: 'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
    title: 'Warum karamellisiert Zucker erst bei 160 Grad',
    subtitle: 'Von suessem Zucker zu goldenem Karamell: thermische Zersetzung, Molekuelstruktur und die Kunst des perfekten Timings.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-1005',
    kxfModuleId: 'LRN:SSF:CHE-1005',
    domainsNeeded: ['KD:CHE-ORGANIC', 'KD:CHE-THERMAL', 'KD:PHY-THERMODYNAMICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Temperatur-Slider 100-200 Grad: Zustandsaenderung live (weiss → fluessig → gold → braun → verbrannt)',
        'Zuckerarten-Vergleich: Fruchtzucker 110, Traubenzucker 150, Haushalts 160, Malz 180 Grad',
        'Karamell-Simulator: Temperatur + Zeit → Farbe + Aroma + Warnung'
      ]
    },
    unlocks: ['TOOL:CARAMELIZATION', 'SENSE:SWEET', 'CHEM:THERMAL-DECOMP'],
    units: [
      {
        id: 'UNIT:KUECHE-KARAMELL-K1',
        title: 'Von weiss zu goldbraun',
        entryQuestion: 'Warum wird Zucker im Topf braun — und riecht dann so gut?',
        takeaway: 'Zucker beginnt bei etwa 160°C zu schmelzen und zerfaellt in kleinere Molekuele. Diese reagieren zu hunderten neuen Aromastoffen — Karamell. Unter 160°C passiert nichts.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-KARAMELL-K2' },
        sections: [
          {
            id: 'OBS:ZUCKER-SCHMELZEN',
            kind: 'observation',
            title: 'Beobachtung: Zucker im Topf',
            summary: 'Du erhitzt Zucker in einem Topf. Erst passiert lange nichts. Irgendwann wird er fluessig, dann braun — und ploetzlich riecht es wunderbar nach Karamell. Was ist mit dem Zucker passiert und warum hat es so lange gedauert?',
            depthPoints: 4,
          },
          {
            id: 'EXP:KARAMELL-TEMP',
            kind: 'experiment',
            title: 'Experiment: Die Temperatur-Schwelle',
            summary: 'Temperatur-Slider 100-200 Grad: unter 160 Grad passiert nichts, bei 160 schmilzt Zucker, bei 170 erste Braeunug, bei 180 volles Aroma, ueber 190 verbrennt es.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:KARAMELL-K1',
            kind: 'quiz',
            title: 'Quiz: Karamellisierung',
            summary: 'Warum 160 Grad die Schwelle ist, was passiert mit dem Molekuel, warum Aroma entsteht.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:KUECHE-KARAMELL-K2',
        title: 'Warum verschiedener Zucker anders karamellisiert',
        entryQuestion: 'Warum karamellisiert Honig schneller als Haushaltszucker — und Puderzucker anders als Wuerfelzucker?',
        takeaway: 'Fruchtzucker (Honig) karamellisiert bei 110°C, Traubenzucker bei 150°C, Haushaltszucker bei 160°C. Die Molekuelstruktur bestimmt wie leicht ein Zucker sich zersetzt.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-KARAMELL-K3' },
        sections: [
          {
            id: 'OBS:VERSCHIEDENE-ZUCKER',
            kind: 'observation',
            title: 'Beobachtung: Honig und Haushaltszucker',
            summary: 'Honig wird im Topf schnell braun — Haushaltszucker braucht laenger. Beide sind suess, beide sind Zucker — aber sie verhalten sich unterschiedlich.',
            depthPoints: 4,
          },
          {
            id: 'EXP:ZUCKERARTEN',
            kind: 'experiment',
            title: 'Experiment: Verschiedene Zucker-Typen',
            summary: 'Zuckerart-Auswahl: Fruchtzucker (110°C), Traubenzucker (150°C), Haushaltszucker (160°C), Malzzucker (180°C). Molekuelstruktur und Karamellisierungstemperatur live verglichen.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:KARAMELL-K2',
            kind: 'quiz',
            title: 'Quiz: Zuckerarten',
            summary: 'Welcher Zucker bei welcher Temperatur, warum Honig schneller, was bestimmt die Schwelle.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:KUECHE-KARAMELL-K3',
        title: 'Karamell in der Kueche',
        entryQuestion: 'Wie macht man perfektes Karamell — und warum sind die letzten Sekunden entscheidend?',
        takeaway: 'Zwischen perfektem Karamell und verbranntem Zucker liegen Sekunden. Der Topf speichert Waerme — von der Herdplatte nehmen bevor es perfekt aussieht.',
        sections: [
          {
            id: 'OBS:KARAMELL-PERFEKT',
            kind: 'observation',
            title: 'Beobachtung: Die perfekte Farbe',
            summary: 'Goldbraun und gut riechend — fertig. Zu frueh: blass und aromatlos. Zu spaet: verbrannt und bitter. Der Unterschied sind oft nur Sekunden.',
            depthPoints: 4,
          },
          {
            id: 'EXP:KARAMELL-SIMULATION',
            kind: 'experiment',
            title: 'Experiment: Karamell-Simulator',
            summary: 'Temperatur-Slider und Zeit-Slider: Farbe des Zuckers von weiss zu gold zu braun zu schwarz. Aroma-Skala und Warnung bei Verbrennung. Restwaerme-Effekt sichtbar nach Herd-aus.',
            interactive: true,
            depthPoints: 10,
          },
          {
            id: 'QUIZ:KARAMELL-K3',
            kind: 'quiz',
            title: 'Quiz: Karamell in der Praxis',
            summary: 'Warum nicht ruehren, Restwaerme-Effekt, welche Temperatur fuer welchen Zweck.',
            depthPoints: 12,
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════
  // WASSER-CLUSTER — 7 Lernpfade
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:PHY-WASSER-MOLEKUEL-0001',
    title: 'Warum ist Wasser eigentlich so seltsam',
    subtitle: 'Das Dipol-Molekuel, Wasserstoffbruecken und warum Wasser fast alle anderen Fluessigkeiten in seinen Eigenschaften uebertrifft.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3001',
    kxfModuleId: 'LRN:SSF:PHY-3001',
    domainsNeeded: ['KD:CHE-MOLECULAR', 'KD:PHY-POLARITY', 'KD:CHE-HYDROGEN-BOND'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Wasser-Molekuel 3D: Bindungswinkel 104.5 Grad, Dipol-Pfeile animiert',
        'Wasserstoffbruecken: Netzwerk-Animation, Anzahl-Slider',
        'Vergleich: Wasser vs. H2S vs. CH4 — Siedepunkt-Anomalie'
      ]
    },
    unlocks: ['CHEM:WATER-MOLECULE', 'CHEM:HYDROGEN-BOND', 'CHEM:DIPOLE'],
    units: [
      {
        id: 'UNIT:WASSER-DIPOL',
        title: 'Das schiefe Molekuel',
        entryQuestion: 'Warum hat Wasser einen so viel hoeheren Siedepunkt als andere kleine Molekuele — obwohl es so leicht ist?',
        takeaway: 'Das Wasser-Molekuel ist schief — der Bindungswinkel betraegt 104,5 Grad. Dadurch ist es ein Dipol: eine Seite negativ, eine positiv. Diese Asymmetrie macht Wasser zu etwas Besonderem.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WASSER-HBRUECKEN' },
        sections: [
          {
            id: 'OBS:WASSER-ANOMALIE',
            kind: 'observation',
            title: 'Beobachtung: Wasser tut was es nicht sollte',
            summary: 'Methan (CH4) siedet bei -161 Grad, Schwefelwasserstoff (H2S) bei -60 Grad. Nach diesem Muster muesste Wasser bei etwa -80 Grad sieden. Stattdessen: +100 Grad. Wasser bricht alle Regeln. Warum?',
            depthPoints: 4,
          },
          {
            id: 'EXP:WASSER-MOLEKUEL',
            kind: 'experiment',
            title: 'Experiment: Das Wasser-Molekuel',
            summary: 'Molekuel-Canvas: H2O mit Bindungswinkel-Slider (90-120 Grad). Bei 104.5 Grad: maximales Dipolmoment sichtbar. Vergleich mit linearem CO2 (kein Dipol) und gewinkeltem H2O (Dipol). Ladungsverteilung als Farbgradient.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:WASSER-MOL-1',
            kind: 'quiz',
            title: 'Quiz: Dipolmolekuel',
            summary: 'Warum ist Wasser ein Dipol, was bedeutet Bindungswinkel, warum siedet Wasser so hoch.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:WASSER-HBRUECKEN',
        title: 'Das Netzwerk der Wasserstoffbruecken',
        entryQuestion: 'Warum ist fluessiges Wasser so schwer zu verdampfen — obwohl jedes einzelne Molekuel so leicht ist?',
        takeaway: 'Jedes Wassermolekuel bildet im Schnitt 3,4 Wasserstoffbruecken zu seinen Nachbarn. Diese Bruecken sind schwach genug um zu brechen — aber stark genug um Wasser fluessig zu halten bis 100 Grad.',
        sections: [
          {
            id: 'EXP:HBRUECKEN',
            kind: 'experiment',
            title: 'Experiment: Wasserstoffbruecken-Netzwerk',
            summary: 'Canvas: 20 Wasser-Molekuele als Netzwerk. Temperatur-Slider: bei niedrig — dichtes Netzwerk, viele Bruecken (blau). Bei hoch — Bruecken brechen, Molekuele entweichen (rot). Energie-Balken zeigt wie viel Energie zum Brechen noetig ist.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:WASSER-MOL-2',
            kind: 'quiz',
            title: 'Quiz: Wasserstoffbruecken',
            summary: 'Was ist eine Wasserstoffbruecke, warum braucht Verdampfen so viel Energie, Vergleich mit anderen Molekuelen.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-WASSER-AGGREGAT-0001',
    title: 'Warum hat Wasser genau drei Formen — und wie wechselt es zwischen ihnen',
    subtitle: 'Schmelzen, Sieden, Sublimieren: Phasenuebergaenge, latente Waerme und das Phasendiagramm des Wassers.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3002',
    kxfModuleId: 'LRN:SSF:PHY-3002',
    domainsNeeded: ['KD:PHY-PHASE-TRANSITION', 'KD:PHY-LATENT-HEAT', 'KD:PHY-PRESSURE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Phasendiagramm Wasser: Druck-Temperatur-Canvas, Phasengrenzen live',
        'Erwaermungskurve: Temperatur vs. Zeit mit Plateaus bei 0 und 100 Grad',
        'Latente-Waerme-Visualisierung: Energie geht rein aber Temperatur steigt nicht'
      ]
    },
    unlocks: ['PHY:PHASE-DIAGRAM', 'PHY:LATENT-HEAT', 'PHY:TRIPLE-POINT'],
    units: [
      {
        id: 'UNIT:AGGREGAT-KURVE',
        title: 'Die merkwuerdige Erwaermungskurve',
        entryQuestion: 'Warum steigt die Temperatur von Eiswasser nicht sofort wenn man es erwaermt — obwohl Energie hineinfliesst?',
        takeaway: 'Beim Schmelzen und Sieden wird Energie nicht zur Temperaturerhohung genutzt — sie bricht Bindungen. Diese latente Waerme ist unsichtbar aber real: Eis bei 0 Grad braucht 334 J/g nur zum Schmelzen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AGGREGAT-PHASEN' },
        sections: [
          {
            id: 'OBS:EISWASSER-PLATEAU',
            kind: 'observation',
            title: 'Beobachtung: Das Eiswasser-Experiment',
            summary: 'Eis in einem Topf erwaermen. Thermometer eingetaucht — die Temperatur steigt kaum, obwohl der Herd laeuft. Erst wenn alles Eis geschmolzen ist, geht es weiter. Energie fliesst rein — aber die Temperatur bewegt sich nicht. Wo geht die Energie hin?',
            depthPoints: 4,
          },
          {
            id: 'EXP:ERWAERMUNGSKURVE',
            kind: 'experiment',
            title: 'Experiment: Erwaermungskurve mit Plateaus',
            summary: 'Zeit-Slider von 0-20 Minuten: Temperaturkurve zeichnet sich live. Zwei Plateaus sichtbar: bei 0 Grad (Schmelzen) und 100 Grad (Sieden). Energie-Balken laeuft durch — Temperatur-Balken stoppt. Latente Waerme als Zahl sichtbar.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:AGGREGAT-1',
            kind: 'quiz',
            title: 'Quiz: Latente Waerme',
            summary: 'Was ist latente Waerme, warum Plateau bei 0 Grad, wieviel Energie braucht 1 kg Eis zum Schmelzen.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:AGGREGAT-PHASEN',
        title: 'Das Phasendiagramm',
        entryQuestion: 'Kann Eis direkt zu Dampf werden — ohne fluessig zu werden?',
        takeaway: 'Ja — Sublimation. Bei niedrigem Druck (wie im Gefrierschrank oder auf dem Everest) kann Wasser direkt von fest zu gasfoermig wechseln. Das Phasendiagramm zeigt welcher Zustand bei welchem Druck und welcher Temperatur stabil ist.',
        sections: [
          {
            id: 'EXP:PHASENDIAGRAMM',
            kind: 'experiment',
            title: 'Experiment: Phasendiagramm Wasser',
            summary: 'Druck-Temperatur-Canvas: drei Phasenbereiche (Eis, Wasser, Dampf) farbig. Slider fuer Druck (0.001-200 bar) und Temperatur (-50 bis 200 Grad). Punkt bewegt sich durch Diagramm — aktueller Aggregatzustand live. Tripelpunkt und kritischer Punkt markiert.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:AGGREGAT-2',
            kind: 'quiz',
            title: 'Quiz: Phasenuebergaenge',
            summary: 'Was ist Sublimation, Tripelpunkt erklaeren, warum Gefrierschrank-Eis sublimiert.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-WASSER-ANOMALIE-0001',
    title: 'Warum platzen Wasserleitungen im Winter von innen',
    subtitle: 'Die Dichteanomalie des Wassers: warum Eis auf Wasser schwimmt — und was das fuer das Leben auf der Erde bedeutet.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3003',
    kxfModuleId: 'LRN:SSF:PHY-3003',
    domainsNeeded: ['KD:PHY-DENSITY', 'KD:PHY-EXPANSION', 'KD:CHE-ICE-STRUCTURE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Dichte-Temperatur-Kurve: Maximum bei 4 Grad sichtbar, interaktiver Punkt',
        'Eis-Kristallstruktur: hexagonales Gitter vs. fluessiges Wasser animiert',
        'Rohr-Spreng-Simulation: Volumenausdehnung beim Gefrieren live'
      ]
    },
    unlocks: ['PHY:DENSITY-ANOMALY', 'PHY:ICE-STRUCTURE', 'KD:LIFE-ON-EARTH'],
    units: [
      {
        id: 'UNIT:ANOMALIE-DICHTE',
        title: 'Das Maximum bei 4 Grad',
        entryQuestion: 'Warum sinkt ein Stein im Wasser — aber Eis schwimmt oben?',
        takeaway: 'Wasser ist bei 4 Grad am dichtesten — nicht bei 0 Grad. Eis hat eine offene Kristallstruktur und ist leichter als fluessiges Wasser. Deshalb schwimmt es. Das rettet das Leben in Seen im Winter.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ANOMALIE-ROHR' },
        sections: [
          {
            id: 'OBS:EIS-SCHWIMMT',
            kind: 'observation',
            title: 'Beobachtung: Eiswuerfel im Glas',
            summary: 'Eiswuerfel ins Wasser — sie schwimmen. Steine sinken. Fast alles sinkt wenn es fest wird. Wasser macht das Gegenteil: Eis ist leichter als fluessiges Wasser. Das ist physikalisch aussergewoehnlich.',
            depthPoints: 4,
          },
          {
            id: 'EXP:DICHTE-KURVE',
            kind: 'experiment',
            title: 'Experiment: Dichte-Temperatur-Kurve',
            summary: 'Canvas: Dichte von Wasser auf Y-Achse, Temperatur -10 bis 30 Grad auf X-Achse. Kurve mit Maximum bei 4 Grad. Temperatur-Slider: Punkt bewegt sich auf Kurve. Bei 0 Grad: Sprung auf Eis-Dichte (0.917 g/cm3). Seetiefe-Visualisierung: wie Schichten sich im Winter ordnen.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ANOMALIE-1',
            kind: 'quiz',
            title: 'Quiz: Dichteanomalie',
            summary: 'Warum ist Eis leichter als Wasser, bei welcher Temperatur ist Wasser am dichtesten, warum gefrieren Seen von oben.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ANOMALIE-ROHR',
        title: 'Warum platzen Rohre',
        entryQuestion: 'Wasser dehnt sich beim Gefrieren um 9% aus — was bedeutet das fuer ein geschlossenes Rohr?',
        takeaway: 'Wasser dehnt sich beim Gefrieren aus. In einem geschlossenen Rohr entsteht Druck von bis zu 2500 bar — genug um Stahl zu sprengen. Praeventiv: Rohre entleeren oder isolieren.',
        sections: [
          {
            id: 'OBS:ROHR-WINTER',
            kind: 'observation',
            title: 'Beobachtung: Geborstene Wasserleitung',
            summary: 'Nach einem Kälteeinbruch: Wasserleitung geplatzt, obwohl das Rohr aus solidem Kupfer war. Nicht der Frost hat das Rohr zerstoert — sondern das Wasser darin beim Gefrieren.',
            depthPoints: 4,
          },
          {
            id: 'EXP:ROHR-SPRENGUNG',
            kind: 'experiment',
            title: 'Experiment: Volumenausdehnung und Druck',
            summary: 'Rohr-Querschnitt Canvas. Temperatur-Slider: 10 bis -10 Grad. Wasser-Volumen waechst beim Uebergang 0 Grad um 9%. Druck-Anzeige steigt: bei geschlossenem Rohr bis 2500 bar. Rohr-Material-Slider: Kupfer bricht fruehzeitig, Stahl spaeter, Kunststoff gibt nach.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ANOMALIE-2',
            kind: 'quiz',
            title: 'Quiz: Gefrieren und Druck',
            summary: 'Wie viel Prozent dehnt Wasser aus, warum platzt Rohr und nicht Eis, wie verhindert man Rohrbruch.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-WASSER-OBERFLAECHE-0001',
    title: 'Warum kann eine Bueroklamme auf Wasser schwimmen',
    subtitle: 'Oberflaechenspannung, Kohaesion und Kapillarkraft — warum Wasser an sich selbst klebt.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3004',
    kxfModuleId: 'LRN:SSF:PHY-3004',
    domainsNeeded: ['KD:PHY-SURFACE-TENSION', 'KD:PHY-COHESION', 'KD:PHY-CAPILLARY'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Oberflaechenspannungs-Canvas: Molekuelkraefte an Oberflaeche vs. Inneres',
        'Kontaktwinkel-Simulator: Wasser auf verschiedenen Oberflaechen (hydrophil/hydrophob)',
        'Kapillar-Experiment: Roehren-Durchmesser-Slider — Steighoehe live'
      ]
    },
    unlocks: ['PHY:SURFACE-TENSION', 'PHY:CAPILLARY-ACTION', 'PHY:CONTACT-ANGLE'],
    units: [
      {
        id: 'UNIT:OBERF-SPANNUNG',
        title: 'Die Haut des Wassers',
        entryQuestion: 'Warum kann eine Stecknadelspitze auf Wasser schwimmen — obwohl Stahl viel dichter ist?',
        takeaway: 'Wassermolekuele an der Oberflaeche haben keine Nachbarn nach oben — sie werden staerker nach unten und zur Seite gezogen. Das erzeugt eine Spannung in der Oberflaeche: eine Art elastische Haut.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:OBERF-KAPILLAR' },
        sections: [
          {
            id: 'OBS:BUEROKLAMME',
            kind: 'observation',
            title: 'Beobachtung: Bueroklamme auf Wasser',
            summary: 'Vorsichtig eine Bueroklamme auf Wasser legen — sie schwimmt. Nicht weil sie leicht ist (Stahl ist 8x dichter als Wasser), sondern weil die Wasseroberflaeche sie traegt wie eine Haut. Wasserlaeufer-Insekten nutzen dasselbe Prinzip.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OBERFLSPANNUNG',
            kind: 'experiment',
            title: 'Experiment: Oberflaechenspannung',
            summary: 'Canvas: Querschnitt durch Wasseroberflaeche. Innere Molekuele: Kraefte von allen Seiten (ausgeglichen). Oberflaechen-Molekuele: Kraefte nur nach unten und zur Seite. Temperatur-Slider: je waermer, desto schwaecher die Spannung. Tensid-Slider: Spuelimittel zerstoert die Spannung sofort.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:OBERF-1',
            kind: 'quiz',
            title: 'Quiz: Oberflaechenspannung',
            summary: 'Warum haben Oberflaechen-Molekuele mehr Energie, warum zerstoert Spuelmittel die Spannung, warum Insekten auf Wasser laufen koennen.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:OBERF-KAPILLAR',
        title: 'Wasser steigt aufwaerts',
        entryQuestion: 'Wie kommt Wasser vom Boden bis in die Blaetter eines 30 Meter hohen Baumes?',
        takeaway: 'Kapillarkraft: Wasser klebt an engen Roehren und zieht sich selbst nach oben. Je enger die Roehre, desto hoeher steigt es. Baeume nutzen Millionen haarfeiner Roehren — das Holz ist ihr Transportsystem.',
        sections: [
          {
            id: 'EXP:KAPILLAR',
            kind: 'experiment',
            title: 'Experiment: Kapillarsteigung',
            summary: 'Mehrere Glasroehren verschiedener Durchmesser (0.1 bis 5 mm) im Wasserbehaelter. Hoehe des Wasseranstiegs live: h = 2γcosθ / (ρgr). Durchmesser-Slider: enger = hoeher. Fluessigkeits-Slider: Quecksilber sinkt (hydrophob), Wasser steigt (hydrophil).',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:OBERF-2',
            kind: 'quiz',
            title: 'Quiz: Kapillarkraft',
            summary: 'Warum steigt Wasser in engen Roehren, warum sinkt Quecksilber statt zu steigen, wie hoch kann Kapillarsteigung gehen.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-WASSER-DAMPF-0001',
    title: 'Warum trocknet Waesche auch im Winter draussen',
    subtitle: 'Verdunstung, Sublimation, Dampfdruck und relative Luftfeuchtigkeit — Wasser wechselt den Aggregatzustand auch ohne zu kochen.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3005',
    kxfModuleId: 'LRN:SSF:PHY-3005',
    domainsNeeded: ['KD:PHY-EVAPORATION', 'KD:PHY-VAPOR-PRESSURE', 'KD:PHY-HUMIDITY'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Dampfdruck-Kurve: Temperatur-Slider → Saettigungsdampfdruck live',
        'Relative-Feuchte-Canvas: Taupunkt, wann kondensiert Wasser an Scheibe',
        'Verdunstungs-Simulator: Wind, Temperatur, Feuchte → Trockenzeit Waesche'
      ]
    },
    unlocks: ['PHY:VAPOR-PRESSURE', 'PHY:DEW-POINT', 'PHY:SUBLIMATION'],
    units: [
      {
        id: 'UNIT:DAMPF-VERDUNSTUNG',
        title: 'Wasser verdampft ohne zu kochen',
        entryQuestion: 'Warum wird eine Pfuetze trocken — obwohl es nie 100 Grad warm wird?',
        takeaway: 'Nicht alle Wassermolekuele brauchen dieselbe Energie. Einige an der Oberflaeche haben genug kinetische Energie um zu entweichen — auch bei 20 Grad. Das ist Verdunstung: keine Temperaturgrenze, nur Wahrscheinlichkeit.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DAMPF-FEUCHTE' },
        sections: [
          {
            id: 'OBS:PFUETZE',
            kind: 'observation',
            title: 'Beobachtung: Die verschwindende Pfuetze',
            summary: 'Nach dem Regen: Pfuetze auf dem Asphalt. Keine Sonne, 15 Grad, leichter Wind. Nach zwei Stunden: weg. Das Wasser ist nicht weggeflossen — es ist in die Luft gegangen. Bei 15 Grad. Ohne zu kochen.',
            depthPoints: 4,
          },
          {
            id: 'EXP:VERDUNSTUNG-RATE',
            kind: 'experiment',
            title: 'Experiment: Was beeinflusst die Verdunstung?',
            summary: 'Drei Slider: Temperatur (0-40 Grad), Wind (0-10 m/s), relative Feuchte (0-100%). Verdunstungsrate-Balken passt sich an. Extremfall: 40 Grad, Wind 10 m/s, Feuchte 0% — maximale Verdunstung. Waesche-Trockenzeit-Anzeige.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:DAMPF-1',
            kind: 'quiz',
            title: 'Quiz: Verdunstung',
            summary: 'Warum verdunstet Wasser unter 100 Grad, was beschleunigt Verdunstung, warum trocknet Waesche im Wind schneller.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:DAMPF-FEUCHTE',
        title: 'Beschlagene Scheiben und Taupunkt',
        entryQuestion: 'Warum beschlaegt die Fensterscheibe im Winter innen — und nicht aussen?',
        takeaway: 'Luft kann nur eine begrenzte Menge Wasserdampf halten — abhaengig von der Temperatur. Kuehlt die warme Innenluft an der kalten Scheibe ab, unterschreitet sie den Taupunkt: Wasser kondensiert. Innen, weil die Scheibe innen kalt ist.',
        sections: [
          {
            id: 'EXP:TAUPUNKT',
            kind: 'experiment',
            title: 'Experiment: Taupunkt und Kondensation',
            summary: 'Innentemperatur-Slider (18-25 Grad) und relative Feuchte (30-90%). Scheiben-Temperatur-Slider (-10 bis +15 Grad). Live: Taupunkt berechnet. Wenn Scheibentemp < Taupunkt: Kondensation sichtbar auf Canvas. Schimmel-Risikoindikator.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:DAMPF-2',
            kind: 'quiz',
            title: 'Quiz: Luftfeuchtigkeit und Taupunkt',
            summary: 'Was ist relativer Feuchte, Taupunkt berechnen, warum Lueften im Winter gegen Schimmel hilft.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-WASSER-LOESUNG-0001',
    title: 'Warum loest Wasser fast alles — aber nicht Oel',
    subtitle: 'Hydratation, Ionen-Gitter und das Prinzip Gleiches loest Gleiches — warum der Dipol entscheidet was sich loest.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-3001',
    kxfModuleId: 'LRN:SSF:CHE-3001',
    domainsNeeded: ['KD:CHE-SOLUBILITY', 'KD:CHE-HYDRATION', 'KD:CHE-ION-LATTICE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Salz-Loesungs-Animation: Na+ und Cl- werden von Wassermolekuelen umhueltt',
        'Loeslichkeits-Slider: Temperatur vs. Loeslichkeit verschiedener Stoffe',
        'Polar/Unpolar-Sortierer: welcher Stoff loest sich in Wasser, welcher in Oel'
      ]
    },
    unlocks: ['CHEM:HYDRATION', 'CHEM:ION-DISSOLUTION', 'CHEM:SOLUBILITY'],
    units: [
      {
        id: 'UNIT:LOESUNG-SALZ',
        title: 'Wie Salz verschwindet',
        entryQuestion: 'Warum verschwindet Kochsalz im Wasser — obwohl es ein fester Kristall war?',
        takeaway: 'Wasser-Molekuele sind Dipole — sie umgeben Natrium- und Chlorid-Ionen und reissen sie aus dem Kristallgitter. Das Salz loest sich nicht auf — es wird Molekuel fuer Molekuel vom Wasser umhueltt und in Loesung getragen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LOESUNG-POLAR' },
        sections: [
          {
            id: 'OBS:SALZ-WASSER',
            kind: 'observation',
            title: 'Beobachtung: Salz im Wasser',
            summary: 'Ein Loeffel Salz ins Wasser — Umruehren, das Salz verschwindet. Das Wasser sieht genauso aus wie vorher. Wo ist das Salz hin? Es ist noch da — aber unsichtbar verteilt.',
            depthPoints: 4,
          },
          {
            id: 'EXP:HYDRATATION',
            kind: 'experiment',
            title: 'Experiment: Hydratation von Ionen',
            summary: 'NaCl-Kristallgitter Canvas. Wasser-Slider: Molekuele naehern sich. Na+ wird von negativ-Ende der Wassermolekuele umgeben (Animation), Cl- vom positiv-Ende. Kristall loest sich auf. Hydratationsenergie vs. Gitterenergie als Balken.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:LOESUNG-1',
            kind: 'quiz',
            title: 'Quiz: Loesungsvorgang',
            summary: 'Was ist Hydratation, warum loest Wasser Salz aber nicht Zucker als Ion, Saetigungsgrenze erklaeren.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:LOESUNG-POLAR',
        title: 'Gleiches loest Gleiches',
        entryQuestion: 'Warum loest Benzin Fett — aber Wasser nicht?',
        takeaway: 'Polare Loesungsmittel (Wasser) loesen polare und ionische Stoffe. Unpolare Loesungsmittel (Benzin, Oel) loesen unpolare Stoffe. Das Prinzip heisst Similia similibus solvuntur — Gleiches loest Gleiches.',
        sections: [
          {
            id: 'EXP:POLAR-SORTIERER',
            kind: 'experiment',
            title: 'Experiment: Was loest sich wo?',
            summary: 'Zwei Behaelter: Wasser und Oel. Stoffe per Klick zuordnen: Salz (Wasser), Zucker (Wasser), Fett (Oel), Farbe (je nach Typ), Alkohol (beides). Richtig: gruene Animation. Falsch: Stoff bleibt an Oberflaeche. Molekuel-Struktur als Hinweis.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:LOESUNG-2',
            kind: 'quiz',
            title: 'Quiz: Loeslichkeit',
            summary: 'Similia similibus, warum Alkohol in beidem loeslich, praktische Anwendung beim Entfernen von Flecken.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-WASSER-WAERME-0001',
    title: 'Warum braucht Wasser so lange zum Kochen — aber kuehlt so langsam ab',
    subtitle: 'Spezifische Waermekapazitaet, Wasser als Waermespeicher und warum das Klima ohne Ozeane unmoeglich waere.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-3006',
    kxfModuleId: 'LRN:SSF:PHY-3006',
    domainsNeeded: ['KD:PHY-HEAT-CAPACITY', 'KD:PHY-THERMODYNAMICS', 'KD:ENV-CLIMATE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Waermekapazitaets-Vergleich: Wasser vs. Eisen vs. Luft vs. Sand — Slider',
        'Kochzeit-Rechner: Masse, Anfangstemperatur, Herdleistung → Zeit live',
        'Klimaeffekt-Visualisierung: Kuestenklima vs. Kontinentalklima'
      ]
    },
    unlocks: ['PHY:HEAT-CAPACITY', 'PHY:THERMAL-MASS', 'ENV:OCEAN-CLIMATE'],
    units: [
      {
        id: 'UNIT:WAERME-KAPAZITAET',
        title: 'Warum Wasser so viel Energie speichert',
        entryQuestion: 'Warum wird Sand am Strand so viel heisser als das Meer daneben — obwohl beide dieselbe Sonne abbekommen?',
        takeaway: 'Wasser hat eine aussergewoehnlich hohe spezifische Waermekapazitaet: 4186 J/(kg·K) — 5x mehr als Sand, 10x mehr als Eisen. Es braucht viel Energie um sich zu erwaermen — und gibt sie genauso langsam wieder ab.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WAERME-KUECHE' },
        sections: [
          {
            id: 'OBS:SAND-MEER',
            kind: 'observation',
            title: 'Beobachtung: Sand und Meer',
            summary: 'Mittags am Strand: der Sand brennt unter den Fuessen — das Wasser ist angenehm kuehl. Abends: der Sand ist kalt — das Wasser noch warm. Gleiche Sonne, gleiches Material? Nein.',
            depthPoints: 4,
          },
          {
            id: 'EXP:WAERMEKAPAZITAET',
            kind: 'experiment',
            title: 'Experiment: Waermekapazitaet im Vergleich',
            summary: 'Vier Behaelter: Wasser, Sand, Eisen, Luft. Gleiche Energie-Zufuhr-Slider. Temperatur-Anzeige: Wasser steigt am langsamsten. Formel: Q = m·c·DeltaT. Material-Slider: c-Wert live. Kochzeit-Rechner fuer 1 Liter Wasser.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:WAERME-1',
            kind: 'quiz',
            title: 'Quiz: Waermekapazitaet',
            summary: 'Was ist spezifische Waermekapazitaet, Berechnung Q=mcT, warum braucht 1L Wasser ca. 7 Minuten zum Kochen.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:WAERME-KUECHE',
        title: 'Wasser in der Kueche und im Klima',
        entryQuestion: 'Warum sind Kuestenstaedte im Sommer kuehl und im Winter mild — verglichen mit Staedten im Landesinneren?',
        takeaway: 'Ozeane sind gigantische Waermespeicher. Sie nehmen im Sommer Waerme auf und geben sie im Winter ab — das glaettet das Klima. Ohne die hohe Waermekapazitaet des Wassers waere das Klima auf der Erde viel extremer.',
        sections: [
          {
            id: 'EXP:KLIMA-EFFEKT',
            kind: 'experiment',
            title: 'Experiment: Kuesten- vs. Kontinentalklima',
            summary: 'Jahresverlauf-Canvas: zwei Kurven — Kuestenstadt und Binnenstadt. Ozean-Abstand-Slider: je weiter vom Meer, desto extremere Temperaturschwankungen. Wasser-Anteil-Slider: mehr Wasser = glaettere Kurve. Reale Beispiele: Hamburg vs. Moskau.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:WAERME-2',
            kind: 'quiz',
            title: 'Quiz: Wasser als Klimaregler',
            summary: 'Warum Kuestenstaedte mildes Klima, Berechnung Waermemenge fuer Ozean, warum Wasser ideal als Kuehlmittel.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },
  {
  id: 'PATH:SSF:PHY-AUTO-BESCHLEUNIGUNG-0001',
  title: 'Warum beschleunigt ein Auto — und was hält es am Boden',
  subtitle: 'Von Kraft und Bewegung: Entdecke wie Antriebskraft und Haftung zusammenwirken.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2003',
  kxfModuleId: 'LRN:SSF:PHY-3003',
  domainsNeeded: ['KD:PHY-MECHANICS', 'KD:PHY-FRICTION', 'KD:PHY-FORCES'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Antriebs-Slider: Kraftübertragung von Motor zu Rad',
      'Reibungs-Slider: Haftung und Durchdrehen',
      'Gewichtsverteilung-Slider: Beschleunigung und Traktion'
    ]
  },
  unlocks: ['TOOL:ACCELERATION', 'SENSE:GRIP'],
  units: [
    {
      id: 'UNIT:AUTO-BESCHLEUNIGUNG-K1',
      title: 'Wie kommt die Kraft auf die Straße?',
      entryQuestion: 'Warum drehen die Räder durch wenn man zu viel Gas gibt — aber nicht wenn man vorsichtig fährt?',
      takeaway: 'Die Kraft vom Motor geht über die Antriebswelle auf die Räder. Die Räder drücken gegen die Straße — und die Straße drückt zurück (actio = reactio). Wenn die Kraft die Haftung übersteigt, drehen die Räder durch. Mehr Gewicht oder mehr Grip verhindern das.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-BESCHLEUNIGUNG-K2' },
      sections: [
        {
          id: 'OBS:DURCHDREHEN',
          kind: 'observation',
          title: 'Beobachtung: Durchdrehende Räder',
          summary: 'Bei Regen oder Schnee geben viele Autofahrer zu viel Gas — die Räder drehen durch, das Auto kommt nicht vorwärts. Das gleiche Auto, gleicher Motor — aber auf trockener Straße geht es. Was macht den Unterschied?',
          depthPoints: 4,
        },
        {
          id: 'EXP:HAFTUNG-REIBUNG',
          kind: 'experiment',
          title: 'Experiment: Haftung und Reibung',
          summary: 'Reibungs-Slider zeigt verschiedene Untergründe: Eis (sehr wenig Haftung), Schnee (wenig Haftung), Regen (mittlere Haftung), trockener Asphalt (viel Haftung). Zeigt wie die Kraft übertragen wird und wann die Räder durchdrehen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:GEWICHT-TRAKTION',
          kind: 'experiment',
          title: 'Experiment: Gewicht verteilt sich',
          summary: 'Gewichtsverteilung-Slider zeigt beim Beschleunigen: das Gewicht verlagert sich nach hinten, die Hinterräder haben mehr Haftung (deshalb haben Sportwagen Heckantrieb). Bei Frontantrieb haben die Vorderräder weniger Haftung.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BESCHLEUNIGUNG-K1',
          kind: 'quiz',
          title: 'Quiz: Kraft und Haftung',
          summary: '3 Fragen zu Kraftübertragung, Reibung und Traktion.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-BESCHLEUNIGUNG-K2',
      title: 'Die Physik des Beschleunigens',
      entryQuestion: 'Warum beschleunigt ein Auto schneller wenn man den Motor hochtourig dreht — aber nicht unendlich?',
      takeaway: 'Beschleunigung ist Kraft geteilt durch Masse (F = m·a). Mehr Motordrehzahl = mehr Kraft (bis zu einem bestimmten Punkt). Wenn der Motor zu hoch dreht, sinkt die Kraft wieder — deshalb schaltet man hoch.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-BESCHLEUNIGUNG-K3' },
      sections: [
        {
          id: 'OBS:BESCHLEUNIGUNG',
          kind: 'observation',
          title: 'Beobachtung: Beschleunigen auf der Autobahn',
          summary: 'Du gibst Gas, das Auto wird schneller. Aber bei einer bestimmten Geschwindigkeit wird es nicht mehr schneller — trotz Vollgas. Was begrenzt die Beschleunigung?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KRAFT-DREHZAHL',
          kind: 'experiment',
          title: 'Experiment: Drehmoment und Drehzahl',
          summary: 'Drehzahl-Slider zeigt das Drehmoment (Kraft) über der Drehzahl: bei 1500 U/min wenig Kraft, bei 3000-4000 U/min maximale Kraft, bei 6000 U/min fällt die Kraft wieder ab.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BESCHLEUNIGUNG-K2',
          kind: 'quiz',
          title: 'Quiz: Beschleunigungsphysik',
          summary: '3 Fragen zu Drehmoment, Beschleunigung und Schaltpunkten.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-BESCHLEUNIGUNG-K3',
      title: 'Warum sind Sportwagen schneller?',
      entryQuestion: 'Warum beschleunigt ein Sportwagen schneller von 0 auf 100 als ein Familienauto — obwohl beide vier Räder haben?',
      takeaway: 'Sportwagen haben: 1) mehr Motorleistung, 2) weniger Gewicht, 3) breitere Reifen (mehr Grip), 4) besser abgestimmtes Fahrwerk (Gewichtsverteilung). Die Kombination aus mehr Kraft, weniger Masse und besserer Haftung ergibt die bessere Beschleunigung.',
      sections: [
        {
          id: 'OBS:SPORTWAGEN-VERGLEICH',
          kind: 'observation',
          title: 'Beobachtung: 0 auf 100',
          summary: 'Ein VW Golf braucht 8 Sekunden von 0 auf 100 km/h. Ein Porsche 911 schafft das in 3 Sekunden. Was genau macht den Unterschied aus — es sind doch beides Autos?',
          depthPoints: 4,
        },
        {
          id: 'EXP:BESCHLEUNIGUNG-VERGLEICH',
          kind: 'experiment',
          title: 'Experiment: Autos im Vergleich',
          summary: 'Vergleich verschiedener Autotypen (Golf, 911, Formel 1) mit Parametern: Leistung, Gewicht, Reifenbreite, Antriebsart. Zeigt den Beschleunigungsunterschied und erklärt ihn mit den physikalischen Größen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BESCHLEUNIGUNG-K3',
          kind: 'quiz',
          title: 'Quiz: Sportwagen-Physik',
          summary: '3 Fragen zu Leistung, Gewicht und Beschleunigung.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-KUECHE-SIEDEPUNKT-0001',
  title: 'Warum kocht Wasser in den Bergen früher',
  subtitle: 'Vom Berggipfel bis zum Schnellkochtopf: Entdecke wie Luftdruck und Temperatur zusammenwirken.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-1002',
  kxfModuleId: 'LRN:SSF:PHY-1002',
  domainsNeeded: ['KD:PHY-THERMODYNAMICS', 'KD:PHY-FLUIDS'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Höhen-Slider: Siedepunkt in Abhängigkeit von der Höhe',
      'Druck-Slider: Siedepunkt unter Überdruck und Unterdruck',
      'Schnellkochtopf-Simulation: Temperatur und Druck live'
    ]
  },
  unlocks: ['TOOL:PRESSURE_COOKER', 'SENSE:TEMP'],
  units: [
    {
      id: 'UNIT:KUECHE-SIEDEPUNKT-K1',
      title: 'Blasen im Topf',
      entryQuestion: 'Warum fängt Wasser in den Bergen an zu kochen — obwohl es noch nicht 100°C erreicht hat?',
      takeaway: 'Der Siedepunkt ist die Temperatur bei der der Dampfdruck der Flüssigkeit den Umgebungsdruck erreicht. Niedrigerer Luftdruck bedeutet niedrigeren Siedepunkt — auf dem Mount Everest kocht Wasser bei 70°C.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-SIEDEPUNKT-K2' },
      sections: [
        {
          id: 'OBS:KOCHEN-BERGE',
          kind: 'observation',
          title: 'Beobachtung: Kochen im Gebirge',
          summary: 'Auf dem Gipfel des Mount Everest (8848 m) kocht Wasser bereits bei 70°C. In einem Schnellkochtopf dagegen kocht es erst bei 120°C. Die gleiche Flüssigkeit, aber unterschiedliche Temperaturen zum Kochen. Was bestimmt eigentlich den Siedepunkt?',
          depthPoints: 4,
        },
        {
          id: 'EXP:SIEDEPUNKT-HOEHE',
          kind: 'experiment',
          title: 'Experiment: Höhe und Siedepunkt',
          summary: 'Höhen-Slider von 0 bis 9000 Metern zeigt den Siedepunkt von Wasser: auf Meereshöhe 100°C, auf 2000 Metern 93°C, auf 5000 Metern 83°C, auf 8848 Metern 70°C.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:SIEDEPUNKT-K1',
          kind: 'quiz',
          title: 'Quiz: Siedepunkt und Höhe',
          summary: '3 Fragen zu Siedepunkt, Höhenabhängigkeit und praktischen Konsequenzen.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-SIEDEPUNKT-K2',
      title: 'Dampfdruck: Die unsichtbare Kraft',
      entryQuestion: 'Warum "drückt" Wasser aus dem Topf — und was hat das mit Luftdruck zu tun?',
      takeaway: 'Die Moleküle im Wasser bewegen sich umso schneller je wärmer es wird. Irgendwann haben sie genug Energie um die Oberfläche zu durchbrechen — und erzeugen Dampf. Der Siedepunkt ist erreicht wenn dieser Dampfdruck den äußeren Luftdruck überwindet.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-SIEDEPUNKT-K3' },
      sections: [
        {
          id: 'OBS:DAMPFDRUCK',
          kind: 'observation',
          title: 'Beobachtung: Das Zischen der Pfanne',
          summary: 'Wenn Wasser kocht, siehst du Blasen, die von unten aufsteigen. Diese Blasen sind Dampf — Wasser im gasförmigen Zustand. Aber warum steigen sie gerade jetzt auf und nicht schon früher? Und warum gibt es bei unterschiedlichen Temperaturen unterschiedlich viele Blasen?',
          depthPoints: 4,
        },
        {
          id: 'EXP:DAMPFDRUCK-TEMP',
          kind: 'experiment',
          title: 'Experiment: Dampfdruckkurve',
          summary: 'Temperatur-Slider zeigt den Dampfdruck von Wasser: bei 20°C nur 0,02 bar, bei 100°C 1 bar (Siedepunkt bei Normaldruck), bei 120°C 2 bar (Schnellkochtopf).',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:DRUCK-BLASEN',
          kind: 'experiment',
          title: 'Experiment: Blasen-Entstehung',
          summary: 'Simulation von Wasser-Molekülen: bei niedriger Temperatur wenige schnelle Moleküle. Bei steigender Temperatur mehr Moleküle erreichen die "Fluchtenegie" und werden zu Dampf. Druck-Slider zeigt wie sich die Schwelle verschiebt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:SIEDEPUNKT-K2',
          kind: 'quiz',
          title: 'Quiz: Dampfdruck',
          summary: '3 Fragen zu Dampfdruck, Moleküldynamik und Druckabhängigkeit.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-SIEDEPUNKT-K3',
      title: 'Der Schnellkochtopf',
      entryQuestion: 'Warum gart Essen im Schnellkochtopf schneller — obwohl es die gleiche Temperatur ist?',
      takeaway: 'Ein Schnellkochtopf erhöht den Druck im Inneren auf etwa 2 bar. Dadurch steigt der Siedepunkt auf 120°C. Höhere Temperatur bedeutet schnellere Kochzeit — ohne dass das Wasser verdampft.',
      sections: [
        {
          id: 'OBS:SCHNELLKOCHTOPF',
          kind: 'observation',
          title: 'Beobachtung: Schneller garen unter Druck',
          summary: 'Ein Schnellkochtopf kann Kartoffeln in 8 Minuten garen statt 20 Minuten. Bohnen in 10 Minuten statt 60 Minuten. Und das bei der gleichen Wassermenge. Wie kann das sein — und warum funktioniert das?',
          depthPoints: 4,
        },
        {
          id: 'EXP:SCHNELLKOCHTOPF',
          kind: 'experiment',
          title: 'Experiment: Druck und Kochzeit',
          summary: 'Vergleich der Kochzeiten: Normaldruck (100°C) vs. Schnellkochtopf (120°C) bei verschiedenen Lebensmitteln. Zeigt die kürzeren Garzeiten und erklärt warum.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:SIEDEPUNKT-K3',
          kind: 'quiz',
          title: 'Quiz: Der Schnellkochtopf',
          summary: '3 Fragen zu Druck, Temperatur, Garzeit und praktischer Anwendung.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-AUTO-MOTOR-0001',
  title: 'Warum wird ein Motor heiß — und wie bleibt er kühl',
  subtitle: 'Von der Explosion im Zylinder zum Kühlkreislauf: Entdecke wie ein Verbrennungsmotor Wärme erzeugt und wieder loswird.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2001',
  kxfModuleId: 'LRN:SSF:PHY-3001',
  domainsNeeded: ['KD:PHY-THERMODYNAMICS', 'KD:PHY-MECHANICS', 'KD:CHE-COMBUSTION'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Verbrennungs-Simulation: Temperatur und Druck im Zylinder',
      'Kühlkreislauf-Slider: Wie Kühlwasser die Wärme abführt',
      'Wirkungsgrad-Slider: Wie viel Energie wird zu Bewegung — wie viel zu Wärme?'
    ]
  },
  unlocks: ['TOOL:ENGINE', 'SENSE:THERMAL'],
  units: [
    {
      id: 'UNIT:AUTO-MOTOR-K1',
      title: 'Die kleine Explosion',
      entryQuestion: 'Warum wird der Motorblock eines Autos so heiß — und was hat das mit dem Antrieb zu tun?',
      takeaway: 'Im Zylinder verbrennt Benzin bei etwa 2500°C. Ein Teil der Energie drückt den Kolben nach unten (das ist die Arbeit), der größte Teil (über 60%) wird als Wärme an den Motorblock abgegeben — deshalb wird er heiß und muss gekühlt werden.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-MOTOR-K2' },
      sections: [
        {
          id: 'OBS:MOTOR-WAERME',
          kind: 'observation',
          title: 'Beobachtung: Die Motorhaube',
          summary: 'Nach einer Fahrt ist die Motorhaube heiß. Nicht warm — richtig heiß. Man kann sie kaum anfassen. Wo kommt diese Hitze her? Das Auto hat ja keine Heizung unter der Haube — es wird einfach heiß während es fährt.',
          depthPoints: 4,
        },
        {
          id: 'EXP:VERBRENNUNG-TEMP',
          kind: 'experiment',
          title: 'Experiment: Verbrennung im Zylinder',
          summary: 'Temperatur-Slider zeigt den Verbrennungsprozess: Benzin-Luft-Gemisch wird gezündet, die Temperatur steigt auf 2500°C, der Druck steigt auf 50-100 bar. Zeigt wie viel Energie als Druck (Arbeit) und als Wärme (Verlust) anfällt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:WIRKUNGSGRAD',
          kind: 'experiment',
          title: 'Experiment: Was bleibt übrig?',
          summary: 'Energie-Slider zeigt die Verteilung: 35% werden zu Bewegung (Kolben/Kurbelwelle), 35% gehen an das Kühlsystem (Wärme), 30% gehen als Abgaswärme aus dem Auspuff. Nur ein Drittel wird tatsächlich zum Fahren genutzt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:MOTOR-K1',
          kind: 'quiz',
          title: 'Quiz: Wärme im Motor',
          summary: '3 Fragen zur Verbrennungstemperatur, Energieverteilung und Wärmeentstehung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-MOTOR-K2',
      title: 'Kühlung: Wohin mit der Hitze?',
      entryQuestion: 'Warum hat ein Auto einen Kühler — und warum ist darin Wasser?',
      takeaway: 'Der Kühlkreislauf nutzt Wasser (mit Frostschutz) um die Wärme vom Motorblock zum Kühler zu transportieren. Dort wird die Wärme über die großen Kühlerlamellen an die Luft abgegeben. Ohne Kühlung würde der Motor sich selbst zerstören — Metall schmilzt bei über 1000°C nicht, aber es verformt sich und Öl verbrennt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-MOTOR-K3' },
      sections: [
        {
          id: 'OBS:KUEHLER-FUNKTION',
          kind: 'observation',
          title: 'Beobachtung: Der Kühler vorne',
          summary: 'Vorne im Auto ist ein großer Kühler — wie ein Heizkörper. Aber er heizt nicht, er kühlt. Wenn du warme Luft davor fühlst, ist das die Wärme die aus dem Motor kommt. Wie transportiert das Wasser die Hitze und wie wird sie los?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KUEHLKREISLAUF',
          kind: 'experiment',
          title: 'Experiment: Der Kühlkreislauf',
          summary: 'Simulation des Kühlkreislaufs: Wasserpumpe, Thermostat, Kühler. Slider zeigt wie die Wassertemperatur steigt (Motorwärme), der Thermostat den Kühlkreislauf öffnet und der Kühler die Wärme abgibt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:MOTOR-K2',
          kind: 'quiz',
          title: 'Quiz: Kühlung',
          summary: '3 Fragen zum Kühlkreislauf, Wärmeübertragung und Kühlerfunktion.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-MOTOR-K3',
      title: 'Warum braucht ein Auto Öl?',
      entryQuestion: 'Warum muss man beim Auto Öl wechseln — und was passiert wenn man es vergisst?',
      takeaway: 'Motoröl schmiert die beweglichen Teile und verhindert dass Metall auf Metall reibt. Es kühlt auch, indem es Wärme von heißen Stellen wegführt. Mit der Zeit zersetzt sich das Öl durch die Hitze und verliert seine Schmierfähigkeit — dann verschleißen die Teile schnell.',
      sections: [
        {
          id: 'OBS:OELWECHSEL',
          kind: 'observation',
          title: 'Beobachtung: Das schwarze Öl',
          summary: 'Wenn du Motoröl wechselst, ist das alte Öl schwarz und riecht verbrannt. Frisches Öl ist goldbraun und klar. Was ist mit dem Öl passiert — und warum muss es regelmäßig gewechselt werden?',
          depthPoints: 4,
        },
        {
          id: 'EXP:OELEIGENSCHAFTEN',
          kind: 'experiment',
          title: 'Experiment: Motoröl unter Hitze',
          summary: 'Temperatur-Slider zeigt wie die Viskosität (Zähflüssigkeit) von Öl mit der Temperatur sinkt. Bei 100°C ist das Öl dünnflüssig und kann überall hinkommen. Bei 250°C beginnt es zu verbrennen und verliert seine Schmierfähigkeit.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:MOTOR-K3',
          kind: 'quiz',
          title: 'Quiz: Motoröl',
          summary: '3 Fragen zu Schmierung, Ölalterung und Wartung.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-KUECHE-EMULSION-0001',
  title: 'Warum trennt sich Salatdressing',
  subtitle: 'Von Öl und Essig zu Mayonnaise: Entdecke wie Emulsionen funktionieren.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-1004',
  kxfModuleId: 'LRN:SSF:PHY-1004',
  domainsNeeded: ['KD:PHY-INTERFACES', 'KD:CHE-SURFACE'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Mischungs-Slider: Öl-Wasser-Trennung live',
      'Emulgator-Slider: Stabilisierung vs. Trennung',
      'Temperatur-Slider: Emulsions-Stabilität'
    ]
  },
  unlocks: ['TOOL:EMULSIFICATION', 'SENSE:MOUTHFEEL'],
  units: [
    {
      id: 'UNIT:KUECHE-EMULSION-K1',
      title: 'Öl und Wasser — eine schwierige Liebe',
      entryQuestion: 'Warum vermisst sich Öl nicht mit Wasser — auch wenn man kräftig schüttelt?',
      takeaway: 'Öl und Wasser sind wie zwei Nachbarn die sich nicht mögen: Wasser-Moleküle sind polar (wie kleine Magnete), Öl-Moleküle sind unpolar (wie kleine Plastikkugeln). Ohne Hilfe bleiben sie getrennt — sobald man aufhört zu schütteln, trennen sie sich wieder.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-EMULSION-K2' },
      sections: [
        {
          id: 'OBS:DRESSING-TRENNUNG',
          kind: 'observation',
          title: 'Beobachtung: Das Dressing im Glas',
          summary: 'Du schüttelst die Vinaigrette — aber nach ein paar Minuten trennt sie sich wieder: Öl oben, Essig unten. Was auch immer die beiden zusammenhält, es hält nicht lange. Was ist das Geheimnis einer stabilen Emulsion?',
          depthPoints: 4,
        },
        {
          id: 'EXP:EMULSION-TRENNUNG',
          kind: 'experiment',
          title: 'Experiment: Öl-Wasser-Trennung',
          summary: 'Mischungs-Slider zeigt das Verhältnis von Öl zu Wasser und wie schnell sich die Phasen trennen. Simulation der Tröpfchen-Bewegung: große Tröpfchen steigen schnell auf, kleine Tröpfchen bleiben länger verteilt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:EMULSION-K1',
          kind: 'quiz',
          title: 'Quiz: Öl und Wasser',
          summary: '3 Fragen zu Polarität, Tröpfchengröße und Trennung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-EMULSION-K2',
      title: 'Der Emulgator — der Vermittler',
      entryQuestion: 'Warum hält Mayonnaise zusammen — obwohl sie zu 80% aus Öl besteht?',
      takeaway: 'Emulgatoren sind Moleküle die sowohl mit Wasser als auch mit Öl verbinden können. Das Eigelb in der Mayonnaise enthält Lecithin — ein natürlicher Emulgator. Es umhüllt die Öltröpfchen und verhindert dass sie sich wieder zusammenschließen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-EMULSION-K3' },
      sections: [
        {
          id: 'OBS:MAYONNAISE',
          kind: 'observation',
          title: 'Beobachtung: Die stabile Mayonnaise',
          summary: 'Mayonnaise besteht fast nur aus Öl, ein bisschen Essig und Eigelb — aber sie trennt sich nicht. Irgendetwas im Eigelb hält die 80% Öl in der Schwebe. Was macht das Eigelb so besonders?',
          depthPoints: 4,
        },
        {
          id: 'EXP:EMULGATOR-WIRKUNG',
          kind: 'experiment',
          title: 'Experiment: Emulgator im Einsatz',
          summary: 'Emulgator-Slider zeigt wie verschiedene Mengen Lecithin die Stabilität beeinflussen: ohne Emulgator sofortige Trennung, mit wenig Emulgator langsame Trennung, mit viel Emulgator stabile Emulsion über Stunden.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:EMULSION-K2',
          kind: 'quiz',
          title: 'Quiz: Der Emulgator',
          summary: '3 Fragen zu Emulgatoren, Stabilisierung und natürlichen Quellen.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-EMULSION-K3',
      title: 'Die Kunst der Mayonnaise',
      entryQuestion: 'Warum gelingt Mayonnaise manchmal — und manchmal nicht?',
      takeaway: 'Mayonnaise gelingt wenn man Öl langsam unter ständigem Rühren zu Eigelb und Essig gibt. Zu schnelles Öl gibt große Tröpfchen die sich wieder trennen. Zu viel Essig zerstört die Emulsion. Die richtige Balance und Technik ist entscheidend.',
      sections: [
        {
          id: 'OBS:MAYONNAISE-MISSERFOLG',
          kind: 'observation',
          title: 'Beobachtung: Die missglückte Mayonnaise',
          summary: 'Manchmal wird Mayonnaise flüssig und trennt sich — obwohl alle Zutaten richtig waren. Was ist da passiert? Und wie kann man es retten?',
          depthPoints: 4,
        },
        {
          id: 'EXP:MAYONNAISE-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Mayonnaise herstellen',
          summary: 'Interaktive Simulation mit Öl-Zugabe-Geschwindigkeit (langsam bis schnell), Essig-Menge (wenig bis viel), Rührgeschwindigkeit. Zeigt wie sich die Emulsion entwickelt oder bricht.',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'QUIZ:EMULSION-K3',
          kind: 'quiz',
          title: 'Quiz: Die Mayonnaise',
          summary: '3 Fragen zu Mayonnaise, Technik und Problemlösung.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-AUTO-KOLBEN-0001',
  title: 'Wie funktioniert ein Kolben — und warum bewegt er sich auf und ab',
  subtitle: 'Von der Explosion zur Drehbewegung: Entdecke die Mechanik des Motors.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2004',
  kxfModuleId: 'LRN:SSF:PHY-3004',
  domainsNeeded: ['KD:PHY-MECHANICS', 'KD:PHY-FORCES', 'KD:PHY-THERMODYNAMICS'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Kolben-Simulation: Viertakt-Bewegung live',
      'Kraft-Slider: Druck auf Kolben und Kurbelwelle',
      'Drehzahl-Slider: Wie schnell der Kolben arbeitet'
    ]
  },
  unlocks: ['TOOL:PISTON', 'SENSE:MECHANICAL'],
  units: [
    {
      id: 'UNIT:AUTO-KOLBEN-K1',
      title: 'Auf und ab — und dann rund',
      entryQuestion: 'Warum bewegt sich der Kolben im Motor auf und ab — aber das Auto fährt vorwärts?',
      takeaway: 'Der Kolben bewegt sich auf und ab (linear). Über die Pleuelstange wird diese Bewegung auf die Kurbelwelle übertragen, die sich dann dreht (rotatorisch). Die Kurbelwelle treibt über Getriebe und Antriebswelle die Räder an.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-KOLBEN-K2' },
      sections: [
        {
          id: 'OBS:MOTOR-BEWEGUNG',
          kind: 'observation',
          title: 'Beobachtung: Motor in Bewegung',
          summary: 'Wenn der Motor läuft, bewegt sich alles schnell. Aber wenn du genau hinschaust: der Kolben geht auf und ab, aber das Auto fährt vorwärts. Wie wird die eine Bewegung zur anderen?',
          depthPoints: 4,
        },
        {
          id: 'EXP:VIERTAKT',
          kind: 'experiment',
          title: 'Experiment: Der Viertakt-Motor',
          summary: 'Animation des Viertakt-Prüfstands: ① Ansaugen (Kolben geht nach unten), ② Verdichten (Kolben geht nach oben), ③ Arbeit (Explosion drückt Kolben nach unten), ④ Ausstoßen (Kolben geht nach oben). Zeigt die Kurbelwellen-Bewegung.',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'EXP:KOLBEN-KURBEL',
          kind: 'experiment',
          title: 'Experiment: Hub und Drehung',
          summary: 'Slider zeigt den Zusammenhang von Kolbenhub und Kurbelwinkel. Bei 0° ist der Kolben oben, bei 180° unten, bei 360° wieder oben. Die Bewegung wird zur Drehung der Kurbelwelle.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLBEN-K1',
          kind: 'quiz',
          title: 'Quiz: Kolben und Kurbelwelle',
          summary: '3 Fragen zum Viertakt-Prinzip, Bewegungsumwandlung und Kurbelwelle.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-KOLBEN-K2',
      title: 'Die Kräfte im Zylinder',
      entryQuestion: 'Warum ist der Kolben so stark — und warum braucht er so viel Schmierung?',
      takeaway: 'Auf den Kolben wirken enorme Kräfte: der Verbrennungsdruck beträgt bis zu 100 bar (100-facher Atmosphärendruck). Das ist wie 100 kg Gewicht pro cm². Die Kolbenringe dichten ab und das Öl schmiert die Zylinderwand — sonst würde der Kolben sich festfressen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-KOLBEN-K3' },
      sections: [
        {
          id: 'OBS:KOLBEN-KRAEFTE',
          kind: 'observation',
          title: 'Beobachtung: Die Belastung',
          summary: 'Ein Kolben hält tausende Explosionen pro Minute aus — jede einzelne drückt mit mehreren Tonnen Kraft. Das ist ein enormer Stress für ein Metallteil. Wie hält er das aus?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KOLBEN-DRUCK',
          kind: 'experiment',
          title: 'Experiment: Druck im Zylinder',
          summary: 'Druck-Slider zeigt die Kolbenkraft: bei 10 bar kaum Kraft, bei 50 bar mittlere Kraft, bei 100 bar maximale Kraft. Zeigt die Belastung der Bauteile und die Notwendigkeit der Schmierung.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLBEN-K2',
          kind: 'quiz',
          title: 'Quiz: Kräfte und Schmierung',
          summary: '3 Fragen zu Druck, Kolbenringen und Ölschmierung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-KOLBEN-K3',
      title: 'Warum kann ein Motor nicht ewig laufen?',
      entryQuestion: 'Warum verschleißt ein Motor — und was passiert wenn er zu lange läuft?',
      takeaway: 'Jede Bewegung erzeugt Reibung. Die Kolbenringe reiben an der Zylinderwand, die Kurbelwellen-Lager reiben. Durch die Reibung entsteht Wärme und Verschleiß. Mit der Zeit werden die Toleranzen größer, der Motor verliert Leistung und verbraucht Öl — bis zum Motorschaden.',
      sections: [
        {
          id: 'OBS:VERSCHLEISS-MOTOR',
          kind: 'observation',
          title: 'Beobachtung: Der alte Motor',
          summary: 'Ein alter Motor läuft nicht mehr so rund, verbraucht mehr Öl, hat weniger Leistung. Irgendwann ist er einfach "durch". Was nutzt sich ab und warum?',
          depthPoints: 4,
        },
        {
          id: 'EXP:MOTOR-VERSCHLEISS',
          kind: 'experiment',
          title: 'Experiment: Motorverschleiß simulieren',
          summary: 'Kilometer-Slider zeigt den Verschleiß der Zylinder: nach 50.000 km kaum sichtbar, nach 100.000 km erste Abnutzung, nach 200.000 km deutlicher Verschleiß, nach 300.000 km Austausch notwendig.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLBEN-K3',
          kind: 'quiz',
          title: 'Quiz: Motorverschleiß',
          summary: '3 Fragen zu Verschleiß, Wartung und Motorschaden.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
    id: 'PATH:SSF:PHY-AUTO-BATTERIE-0001',
    title: 'Warum wird eine Batterie beim Laden warm — und kalt beim Entladen',
    subtitle: 'Reibungswärme trifft Entropie: zwei Kräfte die gegeneinander wirken — und warum langsames Entladen wirklich kühlt.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-2006',
    kxfModuleId: 'LRN:SSF:PHY-2006',
    domainsNeeded: ['KNOW:PHY-THERMODYNAMICS', 'KNOW:CHE-ELECTROCHEMISTRY', 'KNOW:PHY-ELECTRICITY'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Temperatur-Experiment: Laden vs. Entladen, C-Rate-Slider, realistisches Thermometer',
        'Pop-up-Begriffe: C-Rate = Ladegeschwindigkeit, SOC = Füllstand, Innenwiderstand = Reibung',
        'Zwei-Quellen-Darstellung: Reibungswärme (immer heizt) vs. Entropie (kühlt beim Entladen)',
        'Überraschungs-Moment: 0,5C Entladen → Zelle kühlt auf 23°C (sichtbar, erklärbar)',
      ]
    },
    unlocks: ['SENSE:THERMAL', 'TOOL:BATTERY', 'PHY:ENTROPY-BASICS'],
    units: [
      {
        id: 'UNIT:BATTERIE-WARM-KALT',
        title: 'Warm oder kalt — was passiert gerade?',
        entryQuestion: 'Warum fühlt sich eine Batterie beim Laden warm an — aber beim langsamen Entladen manchmal kühl?',
        takeaway: 'Zwei Effekte wirken gleichzeitig: Reibungswärme (Elektronen stoßen auf Widerstand — immer Wärme) und Entropie (Ionen ordnen sich um — gibt beim Laden Wärme ab, nimmt beim Entladen Wärme auf). Bei langsamer Entladung gewinnt die Entropie — die Zelle kühlt wirklich ab.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BATTERIE-MECHANISMUS' },
        sections: [
          {
            id: 'OBS:BATTERIE-HAND',
            kind: 'observation',
            title: 'Leg die Hand auf eine ladende Batterie',
            summary: 'Dein Handy wird beim Laden warm — das spürt jeder. Aber hier ist die Überraschung: Eine Batterie die langsam Strom abgibt, kühlt sich dabei leicht ab. Nicht wegen schlechter Isolierung — sondern wegen der Chemie im Inneren. Zwei Kräfte arbeiten gegeneinander.',
            depthPoints: 4,
          },
          {
            id: 'EXP:BATTERIE-LADEN-ENTLADEN',
            kind: 'experiment',
            title: 'Experiment: Temperatur beim Laden und Entladen',
            summary: 'Schalte zwischen Laden und Entladen. Stelle die Ladegeschwindigkeit ein. Beobachte das Thermometer: Bei 0,5C Entladen sinkt die Temperatur unter Umgebung. Bei 2C Laden steigt sie auf 42°C. Klicke auf die unterstrichenen Begriffe für Erklärungen.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:BATTERIE-1',
            kind: 'quiz',
            title: 'Denkanstoß: Was überrascht dich?',
            summary: 'Welcher Effekt kühlt eine Batterie beim Entladen? Was passiert bei sehr schnellem Entladen mit der Temperatur? Wann überwiegt die Reibungswärme?',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:BATTERIE-MECHANISMUS',
        title: 'Die zwei Wärmequellen',
        entryQuestion: 'Was genau erzeugt Wärme in einer Batterie — und was erzeugt Kälte?',
        takeaway: 'Quelle 1: Reibungswärme (I² × R) — Elektronen stoßen auf Widerstand, immer Wärme, mehr bei höherem Strom. Quelle 2: Entropiewärme (T × ΔS) — Ionen ordnen sich beim Laden und geben Wärme ab; beim Entladen lösen sie sich und nehmen Wärme aus der Umgebung auf. Die Summe bestimmt ob die Zelle heizt oder kühlt.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BATTERIE-AUTO' },
        sections: [
          {
            id: 'OBS:BATTERIE-REIBUNG',
            kind: 'observation',
            title: 'Reibung im Inneren der Batterie',
            summary: 'Stell dir vor du rennst durch einen vollgefüllten Raum — das kostet Energie, die als Wärme entsteht. Genauso: Elektronen fließen durch das Innere der Batterie und stoßen auf Widerstand. Je mehr Strom, desto mehr Reibung, desto mehr Wärme. Das passiert immer — beim Laden und beim Entladen.',
            depthPoints: 4,
          },
          {
            id: 'EXP:IMPEDANZ',
            kind: 'experiment',
            title: 'Experiment: Reibung vs. Entropie',
            summary: 'Das Experiment zeigt beide Wärmequellen separat als Balken: Reibung (immer positiv, wächst mit Strom²) und Entropie (positiv beim Laden, negativ beim Entladen). Stelle 0,5C Entladen ein: Entropie kühlt mehr als Reibung heizt — Netto-Kühlung sichtbar.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:BATTERIE-2',
            kind: 'quiz',
            title: 'Quiz: Reibung und Entropie',
            summary: 'Welche Formel beschreibt Reibungswärme, warum kühlt Entropie beim Entladen, wann überwiegt welcher Effekt.',
            depthPoints: 15,
          },
        ],
      },
      {
        id: 'UNIT:BATTERIE-AUTO',
        title: 'Warum E-Autos im Winter weniger Reichweite haben',
        entryQuestion: 'Was hat die Batterie-Thermodynamik mit der Winterreichweite eines Elektroautos zu tun?',
        takeaway: 'Kälte erhöht den Innenwiderstand — mehr Reibungswärme, aber auch mehr Spannungsabfall. Gleichzeitig läuft die chemische Reaktion langsamer. Das BMS (Batterie-Management-System) begrenzt Lade- und Entladestrom um Schäden zu vermeiden. Ergebnis: weniger Leistung, weniger Reichweite, längere Ladezeit.',
        sections: [
          {
            id: 'OBS:BATTERIE-WINTER',
            kind: 'observation',
            title: 'Das E-Auto im Winter',
            summary: 'Viele E-Auto-Fahrer kennen das: Im Winter zeigt das Navi 280 km Reichweite, aber nach 200 km ist die Batterie leer. Kein Defekt. Die Physik der Batterie ändert sich bei Kälte — und das Thermomanagement des Autos kämpft dagegen an.',
            depthPoints: 4,
          },
          {
            id: 'EXP:BATTERIE-ALTERUNG',
            kind: 'experiment',
            title: 'Experiment: Temperatur und Leistung',
            summary: 'Temperatur-Slider von -20°C bis +40°C. Zeigt: verfügbare Kapazität (%), maximaler Lade-/Entladestrom (C-Rate), und Innenwiderstand (mΩ). Bei -20°C: nur noch 65% Kapazität nutzbar, Strom auf 0.3C begrenzt. Bei +25°C: volle Leistung.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:BATTERIE-3',
            kind: 'quiz',
            title: 'Quiz: Winter und Batterie',
            summary: 'Warum sinkt die Reichweite im Winter, was macht das BMS bei Kälte, warum hilft Vorheizen der Batterie.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },
  {
  id: 'PATH:SSF:PHY-PUMPE-WASSER-0001',
  title: 'Wie funktioniert eine Pumpe — und wie fördert sie Wasser',
  subtitle: 'Von Unterdruck bis Zentrifugalkraft: Entdecke wie Pumpen Wasser bewegen und wie du selbst eine baust.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-3001',
  kxfModuleId: 'LRN:SSF:PHY-3001',
  domainsNeeded: ['KD:PHY-FLUIDS', 'KD:PHY-MECHANICS', 'KD:PHY-PRESSURE'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Pumpen-Simulation: Kolben- und Kreiselpumpe im Vergleich',
      'Unterdruck-Slider: Wie Wasser angesaugt wird',
      'Förderhöhe-Slider: Wie hoch kann eine Pumpe fördern?',
      'Bastelanleitung: Schritt-für-Schritt zur eigenen Pumpe'
    ]
  },
  unlocks: ['TOOL:PUMP', 'SENSE:HYDRAULICS'],
  units: [
    {
      id: 'UNIT:PUMPE-KOLBEN-K1',
      title: 'Die Kolbenpumpe — einfach und genial',
      entryQuestion: 'Wie kann man mit einer Spritze Wasser fördern — und warum funktioniert das?',
      takeaway: 'Eine Kolbenpumpe nutzt Unterdruck: Wenn der Kolben zurückgezogen wird, entsteht ein Vakuum im Zylinder. Der Außendruck drückt das Wasser durch das Ventil in den Zylinder. Beim Vorschieben des Kolbens wird das Wasser durch das Auslassventil gedrückt. So fördert eine Pumpe Wasser — in beide Richtungen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PUMPE-KOLBEN-K2' },
      sections: [
        {
          id: 'OBS:SPRITZE-WASSER',
          kind: 'observation',
          title: 'Beobachtung: Die Spritze als Pumpe',
          summary: 'Ziehst du den Kolben einer Spritze zurück, saugt sie Wasser an. Drückst du ihn vor, spritzt das Wasser wieder heraus. Das ist die einfachste Pumpe der Welt. Aber was passiert da genau und warum fließt das Wasser in eine bestimmte Richtung?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KOLBENPUMPE-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Die Kolbenpumpe in Aktion',
          summary: 'Interaktive Simulation einer Kolbenpumpe: Kolbenposition-Slider zeigt das Ansaugen (Kolben zurück, Unterdruck) und Ausstoßen (Kolben vor, Druck). Zeigt die Ventile die sich öffnen und schließen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:UNTERDRUCK-SAUGEN',
          kind: 'experiment',
          title: 'Experiment: Wie stark saugt eine Pumpe?',
          summary: 'Unterdruck-Slider zeigt: maximal 1 bar Unterdruck möglich (Vakuum). Bei 0,5 bar Unterdruck wird Wasser bis 5 Meter hoch gesaugt (10 Meter = 1 bar). Zeigt die Grenzen der Saugkraft.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'BASTEL:KOLBENPUMPE',
          kind: 'experiment',
          title: 'Basteltipp: Deine eigene Kolbenpumpe',
          summary: 'Material: Große Spritze (20 ml), zwei Ventile (aus Fahrradschlauch oder Einwegventile), zwei Schläuche, Wasser. Bauanleitung: Ventile an Spritze anbringen — eins saugt, eins drückt. Fertig ist die erste Pumpe!',
          interactive: false,
          depthPoints: 10,
        },
        {
          id: 'QUIZ:PUMPE-K1',
          kind: 'quiz',
          title: 'Quiz: Kolbenpumpe',
          summary: '3 Fragen zu Unterdruck, Ventilen und Funktionsweise.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:PUMPE-KOLBEN-K2',
      title: 'Warum kann eine Pumpe nur bis 10 Meter saugen?',
      entryQuestion: 'Warum kann man mit einer Pumpe kein Wasser aus 15 Meter Tiefe saugen — egal wie stark man zieht?',
      takeaway: 'Die maximale Saughöhe einer Pumpe ist etwa 10 Meter. Das liegt daran, dass der atmosphärische Druck nur 1 bar beträgt. Dieser Druck kann das Wasser nur bis zu dieser Höhe nach oben drücken. Tiefer geht nicht — selbst bei perfektem Vakuum. Für größere Tiefen braucht man eine Pumpe im Wasser oder eine mehrstufige Pumpe.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PUMPE-ZENTRIFUGAL-K1' },
      sections: [
        {
          id: 'OBS:BRUNNEN-TIEFE',
          kind: 'observation',
          title: 'Beobachtung: Die Grenze der Saugkraft',
          summary: 'Alte Handpumpen an Brunnen sind nie tiefer als 8-10 Meter. Wenn der Brunnen tiefer ist, muss eine Pumpe direkt ins Wasser oder eine Tiefbrunnenpumpe verwendet werden. Warum kann man nicht einfach stärker ziehen?',
          depthPoints: 4,
        },
        {
          id: 'EXP:SAUGHOEHE',
          kind: 'experiment',
          title: 'Experiment: Die 10-Meter-Grenze',
          summary: 'Tiefen-Slider 0-20 Meter: Zeigt das Wasser in einem Rohr. Bei 0-10 Meter steigt das Wasser, bei 10 Meter ist Schluss, darunter passiert nichts mehr. Zeigt den atmosphärischen Druck als "Wassersäule" (10 Meter = 1 bar).',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:PUMPE-K2',
          kind: 'quiz',
          title: 'Quiz: Saughöhe',
          summary: '3 Fragen zu atmosphärischem Druck, Saughöhe und praktischen Grenzen.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:PUMPE-ZENTRIFUGAL-K1',
      title: 'Die Kreiselpumpe — Wasser im Wirbel',
      entryQuestion: 'Warum sind Kreiselpumpen so weit verbreitet — und wie funktionieren sie?',
      takeaway: 'Eine Kreiselpumpe nutzt die Zentrifugalkraft: Ein rotierendes Laufrad (Flügelrad) beschleunigt das Wasser nach außen. Durch die Fliehkraft entsteht Druck, der das Wasser durch den Auslass drückt. Gleichzeitig entsteht am Einlass ein Unterdruck, der neues Wasser ansaugt. Kreiselpumpen sind einfach, robust und können große Fördermengen liefern.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PUMPE-ZENTRIFUGAL-K2' },
      sections: [
        {
          id: 'OBS:KREISELPUMPE-ALLTAG',
          kind: 'observation',
          title: 'Beobachtung: Pumpen überall',
          summary: 'Deine Heizungspumpe, die Waschmaschine, der Geschirrspüler, die Gartenpumpe — fast überall sind Kreiselpumpen im Einsatz. Sie sind klein, leise und fördern große Wassermengen. Aber wie machen sie das?',
          depthPoints: 4,
        },
        {
          id: 'EXP:ZENTRIFUGAL-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Die Zentrifugalkraft',
          summary: 'Drehzahl-Slider zeigt das Laufrad in Aktion: Bei niedriger Drehzahl wenig Druck, bei hoher Drehzahl viel Druck. Zeigt die Wasserbewegung (Pfeile) — nach außen beschleunigt, durch den Auslass gedrückt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:PUMPENKENNLINIE',
          kind: 'experiment',
          title: 'Experiment: Förderhöhe vs. Fördermenge',
          summary: 'Kennlinien-Slider: Zeigt den Zusammenhang zwischen Förderhöhe (Druck) und Fördermenge (Liter pro Minute). Je höher die Pumpe fördern muss, desto weniger Wasser schafft sie. Die Kurve zeigt den optimalen Arbeitspunkt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'BASTEL:KREISELPUMPE',
          kind: 'experiment',
          title: 'Basteltipp: Mini-Kreiselpumpe',
          summary: 'Material: Kleiner Elektromotor (3-6V), CD oder Scheibe, Karton, Schlauch, Wasser. Bauanleitung: CD als Laufrad mit Schaufeln aus Karton, Motor unten befestigen, Gehäuse aus Pappe. Pumpe in Wasser stellen — Motor starten — Wasser fließt!',
          interactive: false,
          depthPoints: 10,
        },
        {
          id: 'QUIZ:PUMPE-K3',
          kind: 'quiz',
          title: 'Quiz: Kreiselpumpe',
          summary: '3 Fragen zu Zentrifugalkraft, Kennlinie und Anwendung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:PUMPE-ZENTRIFUGAL-K2',
      title: 'Pumpen im Auto — Wasserpumpe und mehr',
      entryQuestion: 'Warum hat ein Auto eine Wasserpumpe — und was macht sie im Motor?',
      takeaway: 'Die Wasserpumpe im Auto ist eine Kreiselpumpe. Sie fördert das Kühlwasser durch den Motorblock (Wärme aufnehmen) und den Kühler (Wärme abgeben). Sie läuft immer mit der Motordrehzahl und sorgt für den ständigen Kreislauf. Ohne Wasserpumpe würde der Motor in wenigen Minuten überhitzen.',
      sections: [
        {
          id: 'OBS:WASSERPUMPE-AUTO',
          kind: 'observation',
          title: 'Beobachtung: Die Wasserpumpe im Motorraum',
          summary: 'Unter der Motorhaube sitzt die Wasserpumpe — angetrieben vom Zahnriemen oder Keilriemen. Wenn sie defekt ist, überhitzt der Motor. Die Pumpe macht manchmal Geräusche oder verliert Wasser. Aber was genau macht sie im Motor?',
          depthPoints: 4,
        },
        {
          id: 'EXP:MOTOR-KUEHLKREISLAUF',
          kind: 'experiment',
          title: 'Experiment: Kühlkreislauf im Auto',
          summary: 'Simulation des Kühlkreislaufs: Motor, Wasserpumpe, Kühler, Thermostat. Slider zeigt den Wasserfluss: Die Pumpe fördert kaltes Wasser zum Motor, warmes Wasser zum Kühler, und wieder zurück. Zeigt Temperaturen im Kreislauf.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:PUMPE-K4',
          kind: 'quiz',
          title: 'Quiz: Wasserpumpe im Auto',
          summary: '3 Fragen zur Wasserpumpe, Kühlkreislauf und Motor-Thermodynamik.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-AUTO-BREMSE-0001',
  title: 'Warum quietschen Bremsen — und warum werden sie heiß',
  subtitle: 'Von Reibung und Wärme: Entdecke wie Bremsen Energie in Wärme verwandeln.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2002',
  kxfModuleId: 'LRN:SSF:PHY-3002',
  domainsNeeded: ['KD:PHY-MECHANICS', 'KD:PHY-THERMODYNAMICS', 'KD:PHY-FRICTION'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Reibungs-Slider: Bremskraft und Wärmeentwicklung',
      'Geschwindigkeits-Slider: Bremsweg und Energie',
      'Bremsbelag-Simulation: Verschleiß und Hitze'
    ]
  },
  unlocks: ['TOOL:BRAKES', 'SENSE:FRICTION'],
  units: [
    {
      id: 'UNIT:AUTO-BREMSE-K1',
      title: 'Die Kunst zu bremsen',
      entryQuestion: 'Warum wird eine Bremsscheibe glühend heiß — und wie funktioniert das Bremsen überhaupt?',
      takeaway: 'Bremsen wandeln Bewegungsenergie in Wärme um. Wenn die Bremsbeläge auf die Scheibe drücken, entsteht Reibung — und Reibung erzeugt Wärme. Ein Auto mit 100 km/h hat so viel Energie wie 50 Tassen kochendes Wasser — die Bremse muss das in Sekunden umwandeln.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-BREMSE-K2' },
      sections: [
        {
          id: 'OBS:BREMSE-HEISS',
          kind: 'observation',
          title: 'Beobachtung: Die glühende Bremsscheibe',
          summary: 'Nach einer scharfen Bremsung riecht es verbrannt, die Bremsscheiben sind heiß — bei Rennwagen glühen sie sogar rot. Aber wo kommt diese Hitze her? Das Auto wird ja langsamer — aber es verbrennt nichts. Was passiert da?',
          depthPoints: 4,
        },
        {
          id: 'EXP:BREMSENERGIE',
          kind: 'experiment',
          title: 'Experiment: Energieumwandlung',
          summary: 'Geschwindigkeits-Slider zeigt die kinetische Energie des Autos und wie sie beim Bremsen in Wärme umgewandelt wird. Bei 100 km/h entsteht genug Wärme um 1 Liter Wasser zum Kochen zu bringen — in wenigen Sekunden.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:REIBUNG-WAERME',
          kind: 'experiment',
          title: 'Experiment: Reibung erzeugt Hitze',
          summary: 'Reibungs-Slider zeigt wie verschiedene Bremsbelag-Materialien und Anpressdrücke die Wärmeentwicklung beeinflussen. Mehr Druck = mehr Reibung = mehr Wärme = kürzerer Bremsweg.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BREMSE-K1',
          kind: 'quiz',
          title: 'Quiz: Bremsen und Energie',
          summary: '3 Fragen zur Energieumwandlung, Reibung und Wärmeentwicklung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-BREMSE-K2',
      title: 'Warum quietschen Bremsen?',
      entryQuestion: 'Warum machen Bremsen manchmal ein lautes Quietschen — und manchmal nicht?',
      takeaway: 'Bremsquietschen entsteht durch Vibrationen wenn die Bremsbeläge auf der Scheibe "rutschen" statt gleichmäßig zu gleiten. Das passiert oft bei verschlissenen Belägen oder wenn sich Staub und Schmutz zwischen Belag und Scheibe sammelt. Neue oder gute Bremsen quietschen fast nie.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-BREMSE-K3' },
      sections: [
        {
          id: 'OBS:BREMSE-QUIETSCHEN',
          kind: 'observation',
          title: 'Beobachtung: Bremsgeräusche',
          summary: 'Du bremst, und es macht ein durchdringendes Quietschen. Anderes Auto bremst leise. Warum quietschen manche Bremsen und andere nicht? Hat das etwas mit der Qualität zu tun — oder mit dem Zustand?',
          depthPoints: 4,
        },
        {
          id: 'EXP:BREMSVIBRATION',
          kind: 'experiment',
          title: 'Experiment: Vibration und Schall',
          summary: 'Reibungs-Slider und Zustand-Slider zeigen wie glatte/verschmutzte Bremsbeläge Vibrationen erzeugen. Simulation des Quietschtons bei verschiedenen Bedingungen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BREMSE-K2',
          kind: 'quiz',
          title: 'Quiz: Bremsgeräusche',
          summary: '3 Fragen zu Vibration, Verschleiß und Materialeigenschaften.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-BREMSE-K3',
      title: 'Verschleiß — warum Bremsbeläge nicht ewig halten',
      entryQuestion: 'Warum muss man Bremsbeläge wechseln — und wann sind sie verschlissen?',
      takeaway: 'Bremsbeläge sind Verschleißteile — die Reibung mit der Bremsscheibe reibt das Material ab. Wenn die Beläge zu dünn werden (unter 4 mm), wird die Bremsleistung schlechter und es quietscht. Moderne Beläge haben eine Verschleiß-Anzeige die bei Erreichen der Grenze quietscht.',
      sections: [
        {
          id: 'OBS:VERSCHLEISS',
          kind: 'observation',
          title: 'Beobachtung: Die abgenutzten Beläge',
          summary: 'Beim Bremsenwechsel siehst du: die neuen Beläge sind dick (ca. 15 mm), die alten sind dünn (unter 5 mm). Irgendwann ist einfach kein Material mehr da. Aber wie genau wird das Material weniger — und wie merkt man es rechtzeitig?',
          depthPoints: 4,
        },
        {
          id: 'EXP:VERSCHLEISS-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Verschleiß über Zeit',
          summary: 'Kilometer-Slider zeigt den Verschleiß: nach 10.000 km kaum sichtbar, nach 30.000 km erste Abnutzung, nach 60.000 km deutlicher Verschleiß, nach 80.000 km Austausch notwendig.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:BREMSE-K3',
          kind: 'quiz',
          title: 'Quiz: Verschleiß',
          summary: '3 Fragen zu Verschleiß, Wartung und Sicherheit.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:CHE-AUTO-VERBRENNUNG-0001',
  title: 'Warum ist der Auspuff heiß — und was kommt da eigentlich raus',
  subtitle: 'Von Benzin zu CO₂: Entdecke die Chemie der Verbrennung.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2001',
  kxfModuleId: 'LRN:SSF:CHE-3001',
  domainsNeeded: ['KD:CHE-COMBUSTION', 'KD:CHE-REACTIONS', 'KD:CHE-GASES'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Verbrennungs-Simulation: Benzin reagiert mit Sauerstoff',
      'Abgas-Slider: Was entsteht bei der Verbrennung',
      'Katalysator-Slider: Wie Schadstoffe umgewandelt werden'
    ]
  },
  unlocks: ['TOOL:COMBUSTION', 'SENSE:EXHAUST'],
  units: [
    {
      id: 'UNIT:AUTO-VERBRENNUNG-K1',
      title: 'Benzin + Luft = ?',
      entryQuestion: 'Warum kommt aus dem Auspuff heiße Luft — und warum ist da eigentlich Rauch?',
      takeaway: 'Benzin (C₈H₁₈) reagiert mit Sauerstoff (O₂) zu CO₂ und H₂O — das ist die chemische Reaktion die Energie liefert. Es entstehen CO₂ (Kohlendioxid), H₂O (Wasser) und Wärme (ca. 2500°C). Der Auspuff ist heiß weil die Abgase aus dem Zylinder noch 700-900°C haben.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-VERBRENNUNG-K2' },
      sections: [
        {
          id: 'OBS:ABGAS-WAERME',
          kind: 'observation',
          title: 'Beobachtung: Heiße Abgase',
          summary: 'Hinter einem Auto kommt heiße Luft aus dem Auspuff. Im Winter sieht man den Wasserdampf, im Sommer ist es unsichtbar. Das heiße Gas war gerade im Motor und hat den Kolben nach unten gedrückt. Was ist das eigentlich für ein Gas?',
          depthPoints: 4,
        },
        {
          id: 'EXP:VERBRENNUNG-CHEMIE',
          kind: 'experiment',
          title: 'Experiment: Benzin verbrennt',
          summary: 'Chemische Reaktion-Simulation: C₈H₁₈ + 12,5 O₂ → 8 CO₂ + 9 H₂O + Wärme. Slider zeigt die Moleküle vor und nach der Reaktion, die Temperatur und die entstehenden Produkte.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:VERBRENNUNG-K1',
          kind: 'quiz',
          title: 'Quiz: Verbrennungschemie',
          summary: '3 Fragen zu Reaktionsgleichung, Produkten und Energie.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-VERBRENNUNG-K2',
      title: 'Gute Abgase — schlechte Abgase',
      entryQuestion: 'Warum braucht ein Auto einen Katalysator — und was macht der eigentlich?',
      takeaway: 'Bei der Verbrennung entstehen nicht nur CO₂ und Wasser, sondern auch CO (Kohlenmonoxid, giftig), NOx (Stickoxide, giftig) und unverbrannte Kohlenwasserstoffe. Der Katalysator wandelt diese Schadstoffe um: CO zu CO₂, NOx zu N₂ und HC zu CO₂ und H₂O.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-VERBRENNUNG-K3' },
      sections: [
        {
          id: 'OBS:ABGASE',
          kind: 'observation',
          title: 'Beobachtung: Der Geruch von Abgasen',
          summary: 'Ein gut gewartetes Auto riecht kaum nach Abgasen. Ein altes Auto mit defektem Katalysator riecht stechend und beißend. Was ist der Unterschied und warum der Geruch?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KATALYSATOR',
          kind: 'experiment',
          title: 'Experiment: Der Katalysator wirkt',
          summary: 'Slider zeigt die Umwandlung im Katalysator: CO wird zu CO₂, NOx zu N₂, HC zu CO₂ und H₂O. Zeigt die Reduktion der Schadstoffkonzentration von 80% auf unter 1%.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:VERBRENNUNG-K2',
          kind: 'quiz',
          title: 'Quiz: Abgase und Katalysator',
          summary: '3 Fragen zu Schadstoffen, Katalysatorfunktion und Abgasreinigung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-VERBRENNUNG-K3',
      title: 'Der Auspuff — mehr als ein Rohr',
      entryQuestion: 'Warum ist der Auspuff so lang und gewunden — und warum klingt er wie er klingt?',
      takeaway: 'Der Auspuff hat mehrere Funktionen: 1) die heißen Abgase aus dem Motorraum leiten, 2) die Verbrennungsgeräusche dämpfen (Schalldämpfer), 3) die Abgase kühlen. Die Form und Länge beeinflusst den Klang — Sportauspuffe klingen lauter weil sie weniger dämpfen.',
      sections: [
        {
          id: 'OBS:AUSPUFF-KLANG',
          kind: 'observation',
          title: 'Beobachtung: Unterschiedliche Klänge',
          summary: 'Ein Motorrad klingt anders als ein Auto. Ein Sportwagen klingt anders als ein Familienauto. Die Abgasanlage formt den Klang — aber wie?',
          depthPoints: 4,
        },
        {
          id: 'EXP:SCHALLDAEMPFUNG',
          kind: 'experiment',
          title: 'Experiment: Klang und Dämpfung',
          summary: 'Auspuff-Slider zeigt die Schalldämpfung über die Länge und Form des Auspuffrohrs. Dämpfung durch Schalldämpfer, Resonatoren und Endrohr. Zeigt die Schallwellen und wie sie gedämpft werden.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:VERBRENNUNG-K3',
          kind: 'quiz',
          title: 'Quiz: Der Auspuff',
          summary: '3 Fragen zu Auspufffunktion, Schalldämpfung und Klang.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:PHY-AUTO-DIFFERENTIAL-0001',
  title: 'Wie funktioniert ein Differential — und warum braucht man es',
  subtitle: 'Von Kurven und Drehzahlen: Entdecke die Mechanik des Ausgleichsgetriebes.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2005',
  kxfModuleId: 'LRN:SSF:PHY-2005',
  domainsNeeded: ['KD:PHY-MECHANICS', 'KD:PHY-FORCES', 'KD:PHY-ROTATION'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Differential-Simulation: Kurvenfahrt und Drehzahlen',
      'Gang-Slider: Übersetzungsverhältnisse',
      'Sperrdifferential-Slider: Traktion und Haftung'
    ]
  },
  unlocks: ['TOOL:DIFFERENTIAL', 'SENSE:STEERING'],
  units: [
    {
      id: 'UNIT:AUTO-DIFFERENTIAL-K1',
      title: 'Warum drehen sich Räder in Kurven unterschiedlich schnell?',
      entryQuestion: 'Warum braucht ein Auto ein Differential — und was passiert wenn es kaputt ist?',
      takeaway: 'In einer Kurve legt das äußere Rad einen weiteren Weg zurück als das innere Rad. Ohne Differential würden beide Räder gleich schnell drehen und das Auto würde "kämpfen" oder die Reifen würden quietschen. Das Differential teilt die Drehzahl auf die Räder auf.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-DIFFERENTIAL-K2' },
      sections: [
        {
          id: 'OBS:KURVENFAHRT',
          kind: 'observation',
          title: 'Beobachtung: In der Kurve',
          summary: 'Wenn du eine Kurve fährst, legt das linke und rechte Rad unterschiedliche Wege zurück. Das äußere Rad rollt weiter als das innere. Aber das Auto hat nur eine Antriebswelle von der Hinterachse — wie macht es das?',
          depthPoints: 4,
        },
        {
          id: 'EXP:DIFFERENTIAL-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Differential in Aktion',
          summary: 'Kurvenradien-Slider zeigt die Drehzahlen der Räder: In der Kurve (Radius 10 m) dreht das äußere Rad 10% schneller als das innere. Bei Geradeausfahrt sind beide gleich schnell.',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'QUIZ:DIFFERENTIAL-K1',
          kind: 'quiz',
          title: 'Quiz: Differential-Funktion',
          summary: '3 Fragen zu Differential, Kurvenfahrt und Drehzahlunterschied.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-DIFFERENTIAL-K2',
      title: 'Der Aufbau des Differentials',
      entryQuestion: 'Wie sieht ein Differential von innen aus — und wie funktioniert die Mechanik?',
      takeaway: 'Das Differential besteht aus einer Tellerrad- und einem Kegelrad-Antrieb. Die Planetenräder und Sonnenräder verteilen die Bewegung. Bei Geradeausfahrt drehen alle Räder gleich schnell. In der Kurve können die Planetenräder rotieren und die Drehzahlunterschiede ausgleichen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:AUTO-DIFFERENTIAL-K3' },
      sections: [
        {
          id: 'OBS:DIFFERENTIAL-AUFBAU',
          kind: 'observation',
          title: 'Beobachtung: Der Zahnkranz',
          summary: 'Unter dem Auto sitzt das Differential — ein Gehäuse mit Zahnrädern. Wenn es kaputt geht, gibt es ein lautes Heulen oder Knacken. Wie funktioniert diese Mechanik und was macht sie?',
          depthPoints: 4,
        },
        {
          id: 'EXP:DIFFERENTIAL-MECHANIK',
          kind: 'experiment',
          title: 'Experiment: Zahnräder im Differential',
          summary: '3D-Animation des Differentials: Zeigt die Planetenräder und Sonnenräder. Slider zeigt wie sich die Drehzahlverteilung ändert: Geradeausfahrt, Rechtskurve, Linkskurve.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:DIFFERENTIAL-K2',
          kind: 'quiz',
          title: 'Quiz: Differential-Mechanik',
          summary: '3 Fragen zu Zahnrädern, Planetengetriebe und Drehzahlausgleich.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:AUTO-DIFFERENTIAL-K3',
      title: 'Offenes Differential vs. Sperrdifferential',
      entryQuestion: 'Warum haben Geländewagen und Sportwagen ein anderes Differential als normale Autos?',
      takeaway: 'Ein offenes Differential verteilt die Kraft gleichmäßig — aber wenn ein Rad durchdreht, geht die ganze Kraft ans durchdrehende Rad. Ein Sperrdifferential oder "LSD" (Limited Slip Differential) begrenzt den Drehzahlunterschied und verteilt die Kraft besser — wichtig für Traktion bei Schnee oder in Kurven.',
      sections: [
        {
          id: 'OBS:TRACTION',
          kind: 'observation',
          title: 'Beobachtung: Durchdrehende Räder',
          summary: 'Im Schnee dreht ein Rad durch, das andere steht still — und das Auto kommt nicht vorwärts. Ein Geländewagen oder Sportwagen kommt besser weg. Was macht den Unterschied?',
          depthPoints: 4,
        },
        {
          id: 'EXP:DIFFERENTIAL-VERGLEICH',
          kind: 'experiment',
          title: 'Experiment: Differential-Typen im Vergleich',
          summary: 'Vergleich der Differential-Typen: offenes Differential (Kraft geht ans durchdrehende Rad), Sperrdifferential (begrenzt Drehzahlunterschied), elektronische Differentialsperre (steuert per Sensor). Zeigt die Traktion in verschiedenen Situationen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:DIFFERENTIAL-K3',
          kind: 'quiz',
          title: 'Quiz: Differential-Typen',
          summary: '3 Fragen zu Differentialarten, Traktion und Anwendungsfällen.',
          depthPoints: 12,
        },
      ],
    },
  ],
},
  {
  id: 'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001',
  title: 'Warum wird Gulasch zart — wenn man es lange kocht',
  subtitle: 'Von zähem Fleisch zu zartem Gulasch: Entdecke wie Kollagen zu Gelatine wird.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-1003',
  kxfModuleId: 'LRN:SSF:CHE-1003',
  domainsNeeded: ['KD:CHE-BIOCHEMISTRY', 'KD:CHE-PROTEINS', 'KD:PHY-THERMODYNAMICS'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Temperatur-Slider: Kollagen-Denaturierung live',
      'Zeit-Slider: Gelatine-Bildung über Zeit',
      'Fleisch-Simulation: Zähigkeit vs. Zartheit'
    ]
  },
  unlocks: ['TOOL:SLOW_COOK', 'SENSE:TEXTURE'],
  units: [
    {
      id: 'UNIT:KUECHE-KOLLAGEN-K1',
      title: 'Zähes Fleisch — zartes Gulasch',
      entryQuestion: 'Warum wird ein teures Rindersteak kurz gebraten — aber ein Gulasch stundenlang gekocht?',
      takeaway: 'Fleisch enthält Bindegewebe aus Kollagen — ein Protein das erst bei längerem Garen (über 70°C) zu Gelatine zerfällt. Dadurch wird das Fleisch zart. Kurzes Braten bei hoher Temperatur macht nur oberflächlich braun — das Bindegewebe bleibt zäh.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-KOLLAGEN-K2' },
      sections: [
        {
          id: 'OBS:GULASCH-STEAK',
          kind: 'observation',
          title: 'Beobachtung: Unterschiedliche Garzeiten',
          summary: 'Ein Rindersteak wird 3 Minuten pro Seite gebraten — und ist butterzart. Gulasch wird 3 Stunden geköchelt — und ist ebenfalls butterzart. Das gleiche Tier, das gleiche Fleisch — aber komplett unterschiedliche Zubereitung. Was ist der Unterschied zwischen beiden Stücken?',
          depthPoints: 4,
        },
        {
          id: 'EXP:KOLLAGEN-TEMP',
          kind: 'experiment',
          title: 'Experiment: Kollagen und Temperatur',
          summary: 'Temperatur-Slider zeigt wie Kollagen bei steigender Temperatur schrumpft und sich verändert: bei 50°C schrumpft es, bei 60°C wird es zäh, bei 70°C beginnt es zu Gelatine zu zerfallen, bei 100°C ist es vollständig aufgelöst.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLLAGEN-K1',
          kind: 'quiz',
          title: 'Quiz: Kollagen und Garzeiten',
          summary: '3 Fragen zu Kollagen, Garzeiten und Fleischstruktur.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-KOLLAGEN-K2',
      title: 'Gelatine — das Geheimnis der Zartheit',
      entryQuestion: 'Warum wird Fleisch zart wenn man es lange kocht — und warum wird Suppe fest wenn sie kalt wird?',
      takeaway: 'Wenn Kollagen zu Gelatine zerfällt, verbindet sich die Gelatine mit Wasser — und bildet später beim Abkühlen ein Gel. Das ist der gleiche Prozess der Gulasch zart macht und Suppe zu Aspik werden lässt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-KOLLAGEN-K3' },
      sections: [
        {
          id: 'OBS:SUPPE-ASPIK',
          kind: 'observation',
          title: 'Beobachtung: Von Suppe zu Gallert',
          summary: 'Eine reichhaltige Fleischsuppe wird nach dem Abkühlen manchmal fest — wie Wackelpudding. Das ist kein Fehler, das ist ein Zeichen für gutes Kollagen. Was passiert da genau und warum wird das Fleisch so zart?',
          depthPoints: 4,
        },
        {
          id: 'EXP:GELATINE-BILDUNG',
          kind: 'experiment',
          title: 'Experiment: Gelatine-Bildung',
          summary: 'Zeit-Slider zeigt die Umwandlung von Kollagen zu Gelatine: in den ersten 30 Minuten passiert wenig, nach 1 Stunde beginnt die Umwandlung, nach 2 Stunden ist viel Gelatine entstanden, nach 3 Stunden ist fast alles Kollagen aufgelöst.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLLAGEN-K2',
          kind: 'quiz',
          title: 'Quiz: Gelatine',
          summary: '3 Fragen zu Gelatine, Gelbildung und praktischer Anwendung.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-KOLLAGEN-K3',
      title: 'Die richtige Fleischwahl',
      entryQuestion: 'Warum eignet sich Schulter besser für Gulasch als Filet — und umgekehrt?',
      takeaway: 'Fleischstücke mit viel Bindegewebe (Schulter, Nacken, Wade) profitieren vom langsamen Garen. Muskeln die wenig bewegt werden (Filet, Rücken) haben kaum Kollagen und werden beim kurzen Braten zart.',
      sections: [
        {
          id: 'OBS:FLEISCH-STRUKTUR',
          kind: 'observation',
          title: 'Beobachtung: Struktur und Bewegung',
          summary: 'Jeder Muskel hat eine Funktion: Das Filet ist ein Muskel der kaum bewegt wird — er besteht aus feinen Fasern ohne viel Bindegewebe. Die Schulter trägt viel Gewicht — sie ist durchzogen von Kollagen. Wie hängt das mit der Zubereitung zusammen?',
          depthPoints: 4,
        },
        {
          id: 'EXP:FLEISCH-SIMULATION',
          kind: 'experiment',
          title: 'Experiment: Fleischstruktur und Garmethode',
          summary: 'Simulation verschiedener Fleischstücke mit Kollagen-Gehalt-Slider: Zeigt wie die Garzeiten variieren und warum bestimmte Stücke bestimmte Zubereitungsarten brauchen.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:KOLLAGEN-K3',
          kind: 'quiz',
          title: 'Quiz: Fleisch und Zubereitung',
          summary: '3 Fragen zu Fleischstruktur, Garmethoden und optimaler Zubereitung.',
          depthPoints: 12,
        },
      ],
    },
  ],
},

  {
    id: 'PATH:SSF:PHY-MAGNETISMUS-0001',
    title: 'Warum zieht ein Magnet Eisen an — aber keine Holzschraube',
    subtitle: 'Vom Kühlschrankmagnet zum Elektronenspin: Warum manche Stoffe magnetisch sind und andere nicht — und was Magnetismus mit Strom zu tun hat.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-4001',
    kxfModuleId: 'LRN:SSF:PHY-4001',
    domainsNeeded: ['KD:PHY-ELECTROMAGNETISM', 'KD:PHY-SPIN', 'KD:MAT-CRYSTAL'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Spin-Visualisierung: Elektronen rotieren — Richtungs-Slider zeigt Netto-Magnetfeld',
        'Elektromagnet: Strom-Slider — Magnetfeld entsteht und verschwindet live',
        'Magnetfeld-Canvas: Feldlinien um Stabmagnet, Nord/Südpol interaktiv',
        'Material-Vergleich: Eisen vs. Holz vs. Kupfer — warum unterschiedlich',
      ]
    },
    unlocks: ['SENSOR:MAGNETIC', 'TOOL:ELECTROMAGNET', 'CHEM:ELECTRON-SPIN'],
    units: [
      {
        id: 'UNIT:MAGNETISMUS-ALLTAG',
        title: 'Warum zieht ein Magnet an?',
        entryQuestion: 'Warum zieht ein Magnet Eisennägel an — aber keine Holzschrauben?',
        takeaway: 'Magnetismus entsteht durch rotierende Elektronen. In Eisen richten sich diese Rotationen gleichgerichtet aus — das erzeugt ein messbares Magnetfeld. In Holz rotieren alle Elektronen durcheinander und heben sich gegenseitig auf.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAGNETISMUS-SPIN' },
        sections: [
          {
            id: 'OBS:MAGNET-ALLTAG',
            kind: 'observation',
            title: 'Beobachtung: Der Kühlschrankmagnet',
            summary: 'Ein Kühlschrankmagnet haftet an der Stahltür — aber nicht an der Holztür daneben. Beide Oberflächen sind glatt. Was macht den Unterschied? Und warum zieht ein Magnet immer einen Nordpol und einen Südpol gleichzeitig an?',
            depthPoints: 4,
          },
          {
            id: 'EXP:MATERIAL-MATRIX',
            kind: 'experiment',
            title: 'Experiment: Welche Stoffe reagieren auf Magnete?',
            summary: 'Material-Auswahl: Eisen (stark), Nickel (mittel), Kupfer (nicht), Aluminium (nicht), Holz (nicht), Wasser (fast nicht). Slider zeigt Anziehungskraft. Erklärung: Elektronenstruktur des Materials bestimmt die Reaktion.',
            interactive: true,
            depthPoints: 6,
          },
          {
            id: 'QUIZ:MAGNETISMUS-1',
            kind: 'quiz',
            title: 'Quiz: Magnetische Stoffe',
            summary: 'Warum reagiert Eisen auf Magnete, warum Kupfer nicht, was haben Eisen und Nickel gemeinsam.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:MAGNETISMUS-SPIN',
        title: 'Das Geheimnis des Elektronenspins',
        entryQuestion: 'Warum drehen sich Elektronen — und was hat das mit Magnetismus zu tun?',
        takeaway: 'Elektronen rotieren immer um die eigene Achse — das nennt man Spin. Diese Rotation erzeugt ein winziges Magnetfeld. In den meisten Stoffen heben sich die Spins gegenseitig auf. In Eisen nicht: dort richten sich Millionen Spins gleichgerichtet aus — das Ergebnis ist ein messbarer Magnet.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAGNETISMUS-STROM' },
        sections: [
          {
            id: 'OBS:SPIN-KONZEPT',
            kind: 'observation',
            title: 'Beobachtung: Elektrizität ohne Strom',
            summary: 'Ein Permanentmagnet erzeugt ein Magnetfeld — ohne Strom, ohne Batterie, ohne Bewegung. Wie ist das möglich? Irgendwo muss doch eine Bewegung sein, wenn Magnetismus durch Bewegung entsteht.',
            depthPoints: 4,
          },
          {
            id: 'EXP:POLARITAET',
            kind: 'experiment',
            title: 'Experiment: Elektronenspins und Netto-Magnetfeld',
            summary: 'Canvas: 16 Elektronen als rotierende Pfeile. Ausrichtungs-Slider: von "alle durcheinander" (kein Magnetfeld, Netto = 0) bis "alle gleichgerichtet" (starkes Magnetfeld). Temperatur-Slider: Wärme zerstört die Ausrichtung — Curie-Temperatur sichtbar.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:MAGNETISMUS-2',
            kind: 'quiz',
            title: 'Quiz: Elektronenspin',
            summary: 'Was ist Spin, warum heben sich Spins auf, was passiert beim Erhitzen eines Magneten.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:MAGNETISMUS-STROM',
        title: 'Magnetismus und Strom — Zwillinge',
        entryQuestion: 'Warum entsteht ein Magnetfeld wenn Strom durch einen Draht fließt — und warum hört es auf wenn der Strom stoppt?',
        takeaway: 'Elektronen im Kabel bewegen sich gerichtet — das erzeugt ein Magnetfeld. Wickelt man den Draht zur Spule, addieren sich die Felder: Elektromagnet. Schaltet man den Strom ab, stoppt die Bewegung — das Feld verschwindet. Permanentmagnet und Elektromagnet funktionieren nach demselben Grundprinzip: bewegte Elektronen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAGNETISMUS-POLE' },
        sections: [
          {
            id: 'OBS:ELEKTROMAGNET',
            kind: 'observation',
            title: 'Beobachtung: Der schaltbare Magnet',
            summary: 'Ein Schrottplatzkran hebt Autos mit einem Elektromagneten auf — und lässt sie fallen wenn der Strom abgeschaltet wird. Das ist kein Trick: Strom ein = Magnet an. Strom aus = Magnet weg. Wie macht der Strom das?',
            depthPoints: 4,
          },
          {
            id: 'EXP:DRAHT',
            kind: 'experiment',
            title: 'Experiment: Strom erzeugt Magnetfeld',
            summary: 'Gerader Draht auf Canvas. Strom-Slider (0–10 A): Magnetfeldlinien erscheinen kreisförmig um den Draht, Stärke wächst mit Strom. Spulen-Slider: mehr Wicklungen = stärkeres Feld. Material-Kern: Luft vs. Eisen — Eisen verstärkt das Feld dramatisch.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:MAGNETISMUS-3',
            kind: 'quiz',
            title: 'Quiz: Elektromagnetismus',
            summary: 'Warum erzeugt Strom ein Magnetfeld, warum verschwindet es beim Abschalten, warum verstärkt Eisen im Kern das Feld.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:MAGNETISMUS-POLE',
        title: 'Nord und Süd — warum immer beide?',
        entryQuestion: 'Kann man einen Magneten in zwei Hälften teilen — und dann nur den Nordpol behalten?',
        takeaway: 'Nein. Teilt man einen Magneten, entstehen zwei neue Magnete — jeder mit eigenem Nord- und Südpol. Das ist ein fundamentaler Unterschied zur Elektrizität: Elektrische Ladungen können getrennt werden, magnetische Pole nicht. Es gibt (soweit bekannt) kein magnetisches Monopol.',
        sections: [
          {
            id: 'OBS:MAGNET-TEILEN',
            kind: 'observation',
            title: 'Beobachtung: Der unzerstörbare Doppelpol',
            summary: 'Ein Stabmagnet: Nordpol oben, Südpol unten. Man sägt ihn in der Mitte durch. Ergebnis: zwei Magnete — jeder mit Nordpol und Südpol. Nochmal sägen: wieder zwei. Und immer so weiter. Es gibt kein Magnetstück ohne beide Pole.',
            depthPoints: 4,
          },
          {
            id: 'EXP:LICHTSPEKTRUM',
            kind: 'experiment',
            title: 'Experiment: Magnetfeld-Visualisierung',
            summary: 'Stabmagnet auf Canvas. Feldlinien-Animation: von Nordpol zu Südpol außen, von Südpol zu Nordpol innen. Zweiten Magneten platzieren: gleiche Pole stoßen ab (Feldlinien biegen sich weg), ungleiche ziehen an. Trenn-Slider: Magnet teilen — sofort zwei Magnete.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:MAGNETISMUS-4',
            kind: 'quiz',
            title: 'Quiz: Magnetische Pole',
            summary: 'Warum gibt es keinen isolierten Nordpol, Unterschied elektrische vs. magnetische Ladung, was ist ein magnetischer Monopol.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // ASTROBIOLOGIE-CLUSTER — 3 Lernpfade
  // Quelle: Erythrulose-Fund in G+0.693-0.027, Nature Astronomy 2026
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:CHE-ZUCKER-MOLEKUEL-0001',
    title: 'Was ist Zucker eigentlich — und warum braucht Leben ihn',
    subtitle: 'Von Haushaltszucker zu DNA-Bausteinen: Monosaccharide, Ribose und warum Zucker weit mehr ist als Süße.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-5001',
    kxfModuleId: 'LRN:SSF:CHE-5001',
    domainsNeeded: ['KD:CHE-ORGANIC', 'KD:CHE-CARBOHYDRATES', 'KD:BIO-MOLECULES'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Molekuel-Baukasten: C, H, O zu Monosaccharid zusammensetzen',
        'Zucker-Vergleich: Glucose vs. Ribose vs. Erythrulose — Strukturen live',
        'DNA-Baustein-Animation: Ribose als Rückgrat der RNA'
      ]
    },
    unlocks: ['CHEM:MONOSACCHARIDE', 'CHEM:RIBOSE', 'BIO:DNA-BACKBONE'],
    units: [
      {
        id: 'UNIT:ZUCKER-WAS',
        title: 'Mehr als Süße',
        entryQuestion: 'Warum heißt Zucker Zucker — und was hat er mit unserer DNA zu tun?',
        takeaway: 'Zucker sind Moleküle aus Kohlenstoff, Wasserstoff und Sauerstoff. Glucose liefert Zellen Energie. Ribose bildet das Rückgrat der RNA. Ohne Zucker kein genetisches Material — kein Leben wie wir es kennen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ZUCKER-TYPEN' },
        sections: [
          {
            id: 'OBS:ZUCKER-ALLTAG',
            kind: 'observation',
            title: 'Beobachtung: Zucker überall',
            summary: 'Haushaltszucker im Kaffee. Glucose in Trauben. Ribose in jeder lebenden Zelle. Erythrulose in Himbeeren — und jetzt im Weltall. Das sind alles "Zucker", aber sie sind sehr verschieden. Was haben sie gemeinsam?',
            depthPoints: 4,
          },
          {
            id: 'EXP:ZUCKERARTEN',
            kind: 'experiment',
            title: 'Experiment: Zucker-Moleküle vergleichen',
            summary: 'Strukturformel-Viewer: Glucose (C6), Ribose (C5), Erythrulose (C4), Glycolaldehyd (C2). Slider wechselt zwischen Strukturen — Kohlenstoffkette, OH-Gruppen, Ringform sichtbar. Funktion der jeweiligen Zuckerart eingeblendet.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:ZUCKER-1',
            kind: 'quiz',
            title: 'Quiz: Zucker-Moleküle',
            summary: 'Was ist ein Monosaccharid, warum ist Ribose für DNA wichtig, was unterscheidet Glucose von Saccharose.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ZUCKER-TYPEN',
        title: 'Die vier Bausteine des Lebens',
        entryQuestion: 'Woraus besteht ein Lebewesen — auf molekularer Ebene?',
        takeaway: 'Alle bekannten Lebewesen bestehen aus vier großen Molekülklassen: Proteine (Bauen und Steuern), DNA/RNA mit Zuckerbausteinen (Informationsspeicher), Fette (Membranen), und Zucker (Energie und Struktur). Kein Leben ohne alle vier.',
        sections: [
          {
            id: 'EXP:POLAR-SORTIERER',
            kind: 'experiment',
            title: 'Experiment: Bausteine des Lebens',
            summary: 'Interaktive Zelle: vier Molekülklassen als farbige Bereiche. Klick auf Bereich zeigt Funktion, Beispiel, und ob der Baustein im Weltall gefunden wurde. Meteoriten-Treffer-Animation: was kam von außen, was entstand auf der Erde.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ZUCKER-2',
            kind: 'quiz',
            title: 'Quiz: Bausteine des Lebens',
            summary: 'Welcher Baustein ist wofür zuständig, warum braucht RNA Ribose, was wäre ohne Zucker nicht möglich.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:CHE-ZUCKER-WELTALL-0001',
    title: 'Wie entsteht Zucker im Weltall — und warum wurde er gerade erst gefunden',
    subtitle: 'Erythrulose in der Gaswolke G+0.693-0.027: interstellare Chemie auf Staubteilchen bei fast absolutem Nullpunkt.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-5002',
    kxfModuleId: 'LRN:SSF:CHE-5002',
    domainsNeeded: ['KD:CHE-ASTROCHEMISTRY', 'KD:PHY-SPECTROSCOPY', 'KD:PHY-INTERSTELLAR'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Staubkorn-Reaktor: Moleküle lagern sich auf Staubkorn ab — Reaktion bei -263 Grad',
        'Radioteleskop-Fingerabdruck: Spektrallinie-Vergleich Labor vs. Weltraum',
        'Gaswolken-Karte: G+0.693-0.027 im Milchstraßenzentrum verortet'
      ]
    },
    unlocks: ['SENSOR:SPECTRAL', 'CHEM:ASTROCHEMISTRY', 'KD:INTERSTELLAR-MEDIUM'],
    units: [
      {
        id: 'UNIT:WELTALL-CHEMIE',
        title: 'Chemie zwischen den Sternen',
        entryQuestion: 'Wie kann im leeren Weltraum — bei fast absolutem Nullpunkt — ein Zuckermolekül entstehen?',
        takeaway: 'Der Weltraum ist nicht leer. Interstellare Gaswolken enthalten Staub, auf dessen Oberfläche sich Moleküle anlagern. UV-Strahlung liefert Energie für Reaktionen. Bei -263°C, fast am absoluten Nullpunkt, entstehen auf diesen Staubteilchen komplexe organische Moleküle — darunter Zucker.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WELTALL-NACHWEIS' },
        sections: [
          {
            id: 'OBS:WELTALL-LEER',
            kind: 'observation',
            title: 'Beobachtung: Der Weltraum ist nicht leer',
            summary: 'Zwischen den Sternen liegt scheinbar nichts. Aber interstellare Molekülwolken wie G+0.693-0.027 enthalten Gas und Staub — und darauf: organische Moleküle. 2026 fanden Forscher dort Erythrulose. Wie kann das sein?',
            depthPoints: 4,
          },
          {
            id: 'EXP:DAMPFDRUCK-TEMP',
            kind: 'experiment',
            title: 'Experiment: Staubkorn als chemischer Reaktor',
            summary: 'Staubkorn-Canvas: Moleküle (CO, H2O, NH3) lagern sich auf gefrorenem Staubteilchen ab. UV-Slider: Strahlung trifft Oberfläche — einfache Moleküle reagieren zu komplexeren. Temperatur bei -263°C sichtbar. Erythrulose entsteht aus zwei C2-Vorgängern.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:WELTALL-1',
            kind: 'quiz',
            title: 'Quiz: Interstellare Chemie',
            summary: 'Warum ist der Weltraum nicht leer, wie entsteht Chemie ohne Lösungsmittel, warum braucht es Staubteilchen.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:WELTALL-NACHWEIS',
        title: 'Wie man Zucker im Weltall findet',
        entryQuestion: 'Wie kann man aus 26.000 Lichtjahren Entfernung erkennen, dass dort Zucker schwebt?',
        takeaway: 'Jedes Molekül sendet und absorbiert elektromagnetische Strahlung bei charakteristischen Frequenzen — wie ein Fingerabdruck. Radioteleskope messen diese Signale aus dem Weltall. Stimmt das Muster mit Labormessungen von Erythrulose überein, ist der Nachweis erbracht.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WELTALL-BEDEUTUNG' },
        sections: [
          {
            id: 'OBS:SPEKTRUM-FINGERABDRUCK',
            kind: 'observation',
            title: 'Beobachtung: Der Fingerabdruck eines Moleküls',
            summary: 'Jedes Element und jedes Molekül emittiert Licht bei ganz bestimmten Frequenzen — wie ein Barcode. Natrium macht Flammen gelb. Neon macht Röhren orange-rot. Dasselbe Prinzip nutzen Radioteleskope um Moleküle in Gaswolken zu identifizieren.',
            depthPoints: 4,
          },
          {
            id: 'EXP:ABSORPTIONSLINIEN',
            kind: 'experiment',
            title: 'Experiment: Spektrallinien als Molekül-Fingerabdruck',
            summary: 'Spektrum-Canvas: Radiofrequenz-Spektrum von G+0.693-0.027 oben, Labormessung Erythrulose unten. Slider verschiebt Frequenzbereich — Übereinstimmung der Linien leuchtet auf. Signal-zu-Rausch-Slider: ab welcher Qualität gilt der Nachweis als gesichert?',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:WELTALL-2',
            kind: 'quiz',
            title: 'Quiz: Spektroskopie',
            summary: 'Warum hat jedes Molekül einen eigenen Spektral-Fingerabdruck, wie funktioniert ein Radioteleskop, was bedeutet Signal-zu-Rausch.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:WELTALL-BEDEUTUNG',
        title: 'Warum dieser Fund die Wissenschaft aufgeregt hat',
        entryQuestion: 'Was bedeutet es für unser Verständnis des Lebens, dass Zucker im interstellaren Raum existiert?',
        takeaway: 'Bisher dachte man: Zucker kam über Meteoriten auf die frühe Erde. Der Fund in einer interstellaren Gaswolke zeigt: Zucker entsteht bereits vor der Entstehung von Planetensystemen — im Rohmaterial aus dem Sterne und Planeten entstehen. Leben könnte überall im Universum chemisch vorprogrammiert sein.',
        sections: [
          {
            id: 'EXP:OSMOSE',
            kind: 'experiment',
            title: 'Experiment: Vom Staubkorn zur Erde',
            summary: 'Zeitstrahl 13,8 Mrd. Jahre: Big Bang → erste Moleküle → Gaswolken → Sternenentstehung → Planetensystem → Meteoriten → frühe Erde → erstes Leben. Erythrulose-Fund markiert Schritt 3. Klick auf jeden Schritt: was war schon da, was fehlte noch.',
            interactive: true,
            depthPoints: 10,
          },
          {
            id: 'QUIZ:WELTALL-3',
            kind: 'quiz',
            title: 'Quiz: Bedeutung des Funds',
            summary: 'Warum ist der Fund außerhalb von Meteoriten besonders, was bedeutet Panspermie, warum ist Erythrulose kein lebensnotwendiger Zucker aber trotzdem wichtig.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
    title: 'Wie entstand das erste Leben auf der Erde',
    subtitle: 'Von Molekülwolken bis zur ersten Zelle: chemische Evolution, Panspermie und die offene Frage nach dem Beginn.',
    status: 'prototype',
    sourceModuleId: 'SSF-BIO-5001',
    kxfModuleId: 'LRN:SSF:BIO-5001',
    domainsNeeded: ['KD:BIO-ORIGIN-OF-LIFE', 'KD:CHE-PREBIOTIC', 'KD:PHY-EARLY-EARTH'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Frühe-Erde-Simulator: Atmosphäre, Temperatur, UV-Strahlung einstellbar',
        'Miller-Urey-Experiment: Animation — Blitz + Ursuppe = Aminosäuren',
        'RNA-Welt: Wie RNA sich selbst kopieren kann — Animation',
        'Meteoriten-Lieferant: welche Moleküle kamen von außen'
      ]
    },
    unlocks: ['BIO:ORIGIN-OF-LIFE', 'CHEM:PREBIOTIC-CHEMISTRY', 'MISSION:LAB-ALPHA'],
    units: [
      {
        id: 'UNIT:LEBEN-FRUEHE-ERDE',
        title: 'Die frühe Erde — eine Welt ohne Leben',
        entryQuestion: 'Wie sah die Erde vor 4 Milliarden Jahren aus — und was fehlte noch, damit Leben entstehen konnte?',
        takeaway: 'Die frühe Erde hatte keine freien Sauerstoff, eine dichte CO2-Atmosphäre, kein Ozon, intensive UV-Strahlung und heiße Ozeane. Kein Leben wie wir es kennen hätte überlebt — aber genau diese rauen Bedingungen waren die Voraussetzung für chemische Evolution.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LEBEN-BAUSTEINE' },
        sections: [
          {
            id: 'OBS:ERDE-HEUTE-DAMALS',
            kind: 'observation',
            title: 'Beobachtung: Zwei Erden',
            summary: 'Heute: Erde hat 21% Sauerstoff, Ozonschicht, flüssiges Wasser, gemäßigte Temperaturen. Vor 4 Milliarden Jahren: fast kein Sauerstoff, kein Ozon, intensive Strahlung, Meteoritenbeschuss. Und trotzdem: irgendwann entstand Leben. Wie?',
            depthPoints: 4,
          },
          {
            id: 'EXP:KLIMA-EFFEKT',
            kind: 'experiment',
            title: 'Experiment: Frühe Erde einstellen',
            summary: 'Atmosphären-Konfigurator: CO2, N2, H2O, CH4 Slider. Temperatur (50-300°C), UV-Intensität, Meteoritenbeschuss-Rate. Canvas zeigt Ozean, Atmosphäre, Vulkane. Lebensfreundlichkeits-Balken: wo liegt die Zone in der Chemie möglich, aber nicht zu aggressiv?',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:LEBEN-1',
            kind: 'quiz',
            title: 'Quiz: Frühe Erde',
            summary: 'Warum kein Sauerstoff auf früher Erde, was ist Ursuppe, warum war UV-Strahlung gleichzeitig Problem und Energiequelle.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:LEBEN-BAUSTEINE',
        title: 'Woher kamen die Bausteine des Lebens?',
        entryQuestion: 'Entstanden die Moleküle des Lebens auf der Erde — oder kamen sie aus dem All?',
        takeaway: 'Beides. 1953 zeigte das Miller-Urey-Experiment: Aminosäuren entstehen spontan wenn man Blitz, Wasser und einfache Gase zusammenbringt. Meteoriten lieferten zusätzlich fertige organische Moleküle — darunter Zucker. Der Erythrulose-Fund 2026 zeigt: diese Bausteine sind im Universum weit verbreitet.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LEBEN-RNA' },
        sections: [
          {
            id: 'OBS:MILLER-UREY',
            kind: 'observation',
            title: 'Beobachtung: Der Ursuppen-Versuch',
            summary: '1953, Chicago: Stanley Miller füllt einen Kolben mit Wasser, Methan, Ammoniak und Wasserstoff. Er lässt elektrische Entladungen hindurchzucken — Blitze. Nach einer Woche: im Kolben sind Aminosäuren entstanden. Die Bausteine des Lebens, aus nichts als einfachen Gasen und Energie.',
            depthPoints: 4,
          },
          {
            id: 'EXP:MILLER-UREY',
            kind: 'experiment',
            title: 'Experiment: Miller-Urey nachbauen',
            summary: 'Kolben-Simulation: Gas-Zusammensetzung wählen (CH4, NH3, H2O, H2). Blitz-Energie-Slider. Nach Reaktion: welche organischen Moleküle entstehen? Aminosäuren-Ausbeute als Balken. Vergleich: mit vs. ohne Sauerstoff (mit O2: keine Aminosäuren — O2 würde sie zerstören).',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'EXP:HYDRATATION',
            kind: 'experiment',
            title: 'Experiment: Meteoriten als Lieferdienst',
            summary: 'Meteoriten-Inventar: welche Moleküle wurden auf Meteoriten gefunden? Aminosäuren (>70 Typen), Zucker (Ribose, Glucose, Erythrulose), Nukleobasen. Zeitstrahl: wann trafen Meteoriten die frühe Erde besonders häufig (Late Heavy Bombardment ~3.9 Mrd. Jahre).',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:LEBEN-2',
            kind: 'quiz',
            title: 'Quiz: Ursprung der Bausteine',
            summary: 'Was bewies Miller-Urey, was ist Panspermie, warum ist der Erythrulose-Fund 2026 bedeutsam.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:LEBEN-RNA',
        title: 'Die RNA-Welt — das Huhn-Ei-Problem des Lebens',
        entryQuestion: 'Was war zuerst da — die DNA die Proteine baut, oder die Proteine die DNA bauen?',
        takeaway: 'Weder noch. RNA kann beides: Information speichern wie DNA und chemische Reaktionen katalysieren wie Proteine. Die RNA-Welt-Hypothese: Vor DNA und Proteinen gab es RNA-Moleküle die sich selbst kopierten. Das löst das Huhn-Ei-Problem — und RNA braucht Ribose, einen Zucker.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:LEBEN-ZELLE' },
        sections: [
          {
            id: 'OBS:HUHN-EI',
            kind: 'observation',
            title: 'Beobachtung: Das molekulare Huhn-Ei-Problem',
            summary: 'DNA enthält die Bauanleitung für Proteine. Proteine bauen DNA. Was war zuerst? Ohne DNA keine Proteine. Ohne Proteine keine DNA. Dieses Paradoxon blockierte jahrzehntelang das Verständnis des Lebensursprungs.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OSMOSE',
            kind: 'experiment',
            title: 'Experiment: RNA als Alleskönner',
            summary: 'RNA-Animations-Canvas: RNA-Strang faltet sich zur 3D-Struktur. Zwei Funktionen sichtbar: als Speicher (Sequenz wird abgelesen) und als Enzym (Ribozym katalysiert eigene Verdopplung). Ribose-Hervorhebung: Zuckermolekül als Rückgrat. Warum Ribose und nicht Glucose?',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:LEBEN-3',
            kind: 'quiz',
            title: 'Quiz: RNA-Welt',
            summary: 'Was kann RNA was DNA nicht kann, warum löst RNA das Huhn-Ei-Problem, welche Rolle spielt Ribose.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:LEBEN-ZELLE',
        title: 'Der Sprung zur ersten Zelle',
        entryQuestion: 'Wie wird aus einem Haufen Moleküle eine Zelle — die sich teilt und Energie erzeugt?',
        takeaway: 'Fettsäuren bilden spontan Blasen (Vesikel) — primitive Membranen. RNA-Moleküle können sich darin einschließen. Wenn die Blase wächst und sich teilt, verteilen sich die RNA-Kopien. Das ist noch kein Leben — aber es ist der Schritt davor. Die Grenze ist fließend.',
        sections: [
          {
            id: 'OBS:ERSTE-ZELLE',
            kind: 'observation',
            title: 'Beobachtung: Was ist eine Zelle?',
            summary: 'Eine Zelle ist eine Membran die innen von außen trennt, mit Molekülen die Energie umwandeln und sich selbst kopieren können. Klingt einfach. Ist es nicht. Wie kam dieser Schritt zustande — von Molekülen zu einem selbst erhaltenden System?',
            depthPoints: 4,
          },
          {
            id: 'EXP:EMULSION-TRENNUNG',
            kind: 'experiment',
            title: 'Experiment: Vesikel und primitive Membranen',
            summary: 'Fettsäuren in Wasser: spontane Vesikel-Bildung animiert. pH-Slider: bei pH 7-8 stabile Blasen, darunter und darüber kollabieren sie. RNA-Einschluss-Animation: Moleküle gelangen durch Poren ins Innere. Teilungs-Simulation: Blase wächst, teilt sich — RNA-Kopien verteilt.',
            interactive: true,
            depthPoints: 10,
          },
          {
            id: 'QUIZ:LEBEN-4',
            kind: 'quiz',
            title: 'Quiz: Erste Zelle',
            summary: 'Wie bilden sich Vesikel, warum sind Membranen lebensnotwendig, was fehlt einem Vesikel noch zum echten Leben.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-PIEZO-0001',
    title: 'Warum leuchtet ein Fahrradhelm wenn man ihn drückt',
    subtitle: 'Piezoelektrischer Effekt: Wie mechanischer Druck direkt zu elektrischem Strom wird — und warum Straßen bald Energie erzeugen könnten.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-4002',
    kxfModuleId: 'LRN:SSF:PHY-4002',
    domainsNeeded: ['KD:PHY-PIEZOELECTRIC', 'KD:MAT-CRYSTAL', 'KD:PHY-ELECTROSTATICS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Kristallgitter-Canvas: Druck verformt Atome — Ladungstrennung sichtbar',
        'Druck-Strom-Slider: Kraft auf Material → Spannung live',
        'Anwendungs-Simulator: Schritt → Energie → LED leuchtet',
        'Material-Vergleich: Quarz vs. Perowskit vs. bleifreie Keramik'
      ]
    },
    unlocks: ['SENSOR:PIEZO', 'TOOL:ENERGY-HARVESTING', 'PHY:DIPOLE-MOMENT'],
    units: [
      {
        id: 'UNIT:PIEZO-BEOBACHTUNG',
        title: 'Strom aus Druck',
        entryQuestion: 'Warum erzeugt ein Gasanzünder einen Funken ohne Batterie — nur durch einen Knopfdruck?',
        takeaway: 'Bestimmte Kristalle erzeugen elektrische Spannung wenn man sie verformt. Das nennt man Piezoelektrischer Effekt. Im Gasanzünder drückt ein Stift auf einen Quarzkristall — der Funke entsteht ohne Batterie, direkt aus dem Druck.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PIEZO-MECHANISMUS' },
        sections: [
          {
            id: 'OBS:FEUERZEUG',
            kind: 'observation',
            title: 'Beobachtung: Der Funken ohne Batterie',
            summary: 'Ein piezoelektrisches Gasanzünder — kein Akku, keine Batterie. Nur ein Knopfdruck. Trotzdem entsteht ein elektrischer Funken der das Gas entzündet. Auch Ultraschallsensoren in Einparkhilfen, Mikrofone in Smartphones und Lautsprecher nutzen denselben Effekt. Was passiert im Inneren?',
            depthPoints: 4,
          },
          {
            id: 'EXP:FUNKE',
            kind: 'experiment',
            title: 'Experiment: Druck erzeugt Spannung',
            summary: 'Kraft-Slider (0-100 N) auf Quarzkristall. Canvas zeigt Kristallgitter — bei Druck verformen sich die Atome, positive und negative Ladungen trennen sich. Spannung-Anzeige steigt live. Entlastung: Spannung kehrt sich um. Frequenz-Slider: schnelles Drücken = Wechselspannung.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:PIEZO-1',
            kind: 'quiz',
            title: 'Quiz: Piezoelektrischer Effekt',
            summary: 'Was ist der piezoelektrische Effekt, warum braucht ein Gasanzünder keine Batterie, was passiert beim Loslassen.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:PIEZO-MECHANISMUS',
        title: 'Wie Druck Ladungen trennt',
        entryQuestion: 'Warum funktioniert der Effekt nur bei bestimmten Materialien — und nicht bei Stahl oder Holz?',
        takeaway: 'Piezoelektrische Materialien haben eine Kristallstruktur ohne Symmetrieachse. Wenn Druck diese Symmetrie leicht bricht, verschieben sich die Ladungsschwerpunkte — ein elektrisches Dipolmoment entsteht. Bei symmetrischen Kristallen heben sich alle Verschiebungen auf — kein Effekt.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PIEZO-MATERIALIEN' },
        sections: [
          {
            id: 'OBS:SYMMETRIE',
            kind: 'observation',
            title: 'Beobachtung: Warum nur manche Materialien?',
            summary: 'Quarz reagiert piezoelektrisch. Silizium nicht — obwohl es chemisch ähnlich ist. Keramiken können es, wenn sie richtig hergestellt werden. Metalle nie. Der Unterschied liegt in der Kristallstruktur — genauer: ob die Struktur eine Symmetrieachse hat oder nicht.',
            depthPoints: 4,
          },
          {
            id: 'EXP:DMS-WIDERSTAND',
            kind: 'experiment',
            title: 'Experiment: Symmetrie und Dipolmoment',
            summary: 'Zwei Kristalle nebeneinander: NaCl (symmetrisch, kein Piezo) und Quarz (asymmetrisch, Piezo). Druck-Slider: bei NaCl — alle Ladungsverschiebungen heben sich auf, Netto = 0. Bei Quarz — Verschiebung in eine Richtung, Dipolmoment entsteht. Vergleichsbalken live.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:PIEZO-2',
            kind: 'quiz',
            title: 'Quiz: Kristallsymmetrie',
            summary: 'Was ist ein Dipolmoment, warum kein Piezo bei symmetrischen Kristallen, Unterschied Quarz vs. NaCl.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:PIEZO-MATERIALIEN',
        title: 'Neue Materialien — ohne giftiges Blei',
        entryQuestion: 'Warum enthalten viele Piezo-Materialien Blei — und was macht das neue RPI-Material besonders?',
        takeaway: 'PZT (Blei-Zirkonat-Titanat) ist das leistungsfähigste bekannte Piezo-Material — aber hochgiftig. Das neue Chalkogenid-Perowskit-Material vom RPI ist bleifrei, nur 0,3 mm dünn und kann aus weit verbreiteten Elementen hergestellt werden. Ein entscheidender Schritt für nachhaltige Piezo-Technologie.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:PIEZO-ANWENDUNG' },
        sections: [
          {
            id: 'OBS:BLEI-PROBLEM',
            kind: 'observation',
            title: 'Beobachtung: Das Blei-Problem',
            summary: 'Die meisten leistungsstarken Piezo-Materialien enthalten Blei — ein Schwermetall das in der EU zunehmend verboten wird. Smartphones, Ultraschall-Geräte, Sensoren: überall steckt giftiges PZT drin. Das RPI-Team hat 2024 ein bleifreies Material entwickelt das ähnlich stark reagiert.',
            depthPoints: 4,
          },
          {
            id: 'EXP:HAERTE',
            kind: 'experiment',
            title: 'Experiment: Material-Vergleich',
            summary: 'Vier Materialien: Quarz (natürlich, schwach), PZT (stark, giftig), PVDF-Polymer (flexibel, schwach), Chalkogenid-Perowskit RPI (stark, bleifrei). Druck-Slider: Ausgangsspannung pro Material vergleichen. Umwelt-Score als zweite Achse. Optimum: rechts oben (stark + sauber).',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:PIEZO-3',
            kind: 'quiz',
            title: 'Quiz: Piezo-Materialien',
            summary: 'Warum ist PZT so verbreitet trotz Toxizität, was ist ein Perowskit, warum ist bleifreies Material ein Fortschritt.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:PIEZO-ANWENDUNG',
        title: 'Energie aus dem Alltag ernten',
        entryQuestion: 'Wie viel Strom kann ein Schritt auf einer Piezo-Straße wirklich erzeugen — und reicht das für etwas Nützliches?',
        takeaway: 'Ein Schritt erzeugt je nach Material und Fläche 1-5 mW Leistung — genug für eine LED oder einen Sensor. Für eine Straßenlaterne bräuchte man Tausende Schritte. Piezo-Harvesting ist keine Lösung für das Energieproblem — aber ideal für autonome Kleinsensoren, Sicherheitsbeleuchtung und Wearables.',
        sections: [
          {
            id: 'OBS:SCHUH-LEUCHTET',
            kind: 'observation',
            title: 'Beobachtung: Der leuchtende Schuh',
            summary: 'RPI-Forscher ließen Probanden auf dem neuen Material gehen, klatschen und laufen. Das Material erzeugte genug Strom um LEDs mit der Aufschrift "RPI" zum Leuchten zu bringen. Kein Kabel, keine Batterie — nur Bewegung. Was bedeutet das für die Zukunft?',
            depthPoints: 4,
          },
          {
            id: 'EXP:WIRKUNGSGRAD',
            kind: 'experiment',
            title: 'Experiment: Energie-Ernter',
            summary: 'Anwendungs-Simulator: Schritt-Frequenz (Schritte/min), Material-Fläche (cm²), Kraft (N). Ausgabe: Leistung in mW. Verbraucher-Auswahl: LED (0.1W), Temperatursensor (1mW), GPS-Tracker (50mW), Straßenlaterne (60W). Wie viele Schritte/min brauche ich für was? Realismus-Check live.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:PIEZO-4',
            kind: 'quiz',
            title: 'Quiz: Energy Harvesting',
            summary: 'Wie viel Leistung erzeugt ein Schritt, warum ist Piezo keine Lösung für Großenergie, welche Anwendungen sind realistisch.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // ROHSTOFFE & ENERGIEWENDE — 3 Lernpfade
  // Quelle: Fraunhofer ISI/IZM, DERA 2026
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:CHE-IRIDIUM-0001',
    title: 'Warum könnte ein Metall die Energiewende blockieren das kaum jemand kennt',
    subtitle: 'Iridium: 6,8 Tonnen Weltförderung, 85 Tonnen Bedarf bis 2045. Wie ein seltenes Edelmetall zum Flaschenhals der Wasserstoffwirtschaft werden könnte.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-6001',
    kxfModuleId: 'LRN:SSF:CHE-6001',
    domainsNeeded: ['KD:CHE-PLATINUM-GROUP', 'KD:CHE-CATALYSIS', 'KD:ENV-CRITICAL-MATERIALS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Periodensystem-Spotlight: Iridium im Kontext der Platingruppe',
        'Fördermengen-Vergleich: Iridium 6.8t vs. Gold 3000t/Jahr animiert',
        'Bedarfs-Projektor: Elektrolyseur-Ausbau 2.5 GW → 4350 GW, Iridiumbedarf live',
        'Rohstoff-Karte: 70% aus Südafrika, Beiprodukt des Platinbergbaus'
      ]
    },
    unlocks: ['CHEM:PLATINUM-GROUP', 'CHEM:IRIDIUM', 'ENV:CRITICAL-MATERIALS'],
    units: [
      {
        id: 'UNIT:IRIDIUM-WAS',
        title: 'Das unbekannteste Metall der Welt',
        entryQuestion: 'Was ist Iridium — und warum haben die meisten Menschen noch nie davon gehört?',
        takeaway: 'Iridium ist eines der seltensten Elemente der Erde. Nur 6,8 Tonnen werden weltweit pro Jahr gefördert — zum Vergleich: Gold 3000 Tonnen. Es fällt ausschließlich als Beiprodukt des Platinabbaus an. Ein eigenständiger Iridium-Bergbau existiert nicht — das Angebot kann kaum erhöht werden.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:IRIDIUM-WARUM' },
        sections: [
          {
            id: 'OBS:IRIDIUM-ALLTAG',
            kind: 'observation',
            title: 'Beobachtung: Ein Metall das überall fehlt',
            summary: 'Lithium kennt jeder — es steckt in Smartphone-Akkus. Kupfer, Stahl, Aluminium: Alltagsmetalle. Aber Iridium? Das Metall mit der höchsten Dichte und dem höchsten Schmelzpunkt aller Elemente nach Osmium ist so selten, dass die gesamte Jahresproduktion der Welt in einen einzigen PKW-Kofferraum passen würde.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OXIDATION',
            kind: 'experiment',
            title: 'Experiment: Iridium im Periodensystem',
            summary: 'Periodensystem-Canvas: Platingruppenmetalle hervorgehoben (Pt, Pd, Rh, Ru, Os, Ir). Klick auf Iridium: Dichte 22.56 g/cm³, Schmelzpunkt 2446°C, Jahresproduktion 6.8t. Vergleichsbalken: Au 3000t, Ag 25000t, Cu 22 Mio.t. Logarithmische Skala zeigt den Unterschied.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:IRIDIUM-1',
            kind: 'quiz',
            title: 'Quiz: Iridium',
            summary: 'Warum gibt es kein eigenständiges Iridiumbergwerk, was ist die Platingruppe, warum ist die Förderung kaum steigerbar.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:IRIDIUM-WARUM',
        title: 'Warum braucht Wasserstoff Iridium?',
        entryQuestion: 'Warum ist Iridium unersetzbar für die Elektrolyse — und was macht diese Bedingung so schwierig?',
        takeaway: 'In PEM-Elektrolyseuren herrscht an der Anode eine extrem saure, korrosive Umgebung. Nur Iridiumoxid übersteht diese Bedingungen dauerhaft bei ausreichender Katalyseleistung. Rutheniumoxid wäre günstiger — korrodiert aber zu schnell. Kein anderes bekanntes Material erfüllt bisher beide Anforderungen gleichzeitig.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:IRIDIUM-RECHNUNG' },
        sections: [
          {
            id: 'OBS:ELEKTROLYSEUR',
            kind: 'observation',
            title: 'Beobachtung: Wasser zerlegen mit Strom',
            summary: 'Ein PEM-Elektrolyseur spaltet Wasser (H₂O) mit Strom in Wasserstoff (H₂) und Sauerstoff (O₂). Das klingt einfach. Aber an der Anode — wo der Sauerstoff entsteht — herrschen extreme Bedingungen: stark sauer, oxidierend, hohe Temperaturen. Die meisten Materialien versagen dort innerhalb von Stunden.',
            depthPoints: 4,
          },
          {
            id: 'EXP:KATALYSATOR',
            kind: 'experiment',
            title: 'Experiment: Katalysator-Überleben',
            summary: 'Vier Materialien an Anode: Iridiumoxid (IrO₂), Rutheniumoxid (RuO₂), Platin (Pt), Kohlenstoff. pH-Slider (0-14), Temperatur-Slider (20-80°C), Zeit-Slider (0-1000h). Korrosionsrate live: RuO₂ zerfällt nach 100h, Pt passiviert, Kohlenstoff sofort weg. IrO₂: stabil.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:IRIDIUM-2',
            kind: 'quiz',
            title: 'Quiz: PEM-Elektrolyse',
            summary: 'Warum ist die Anode das Problem, was macht IrO₂ besonders, warum reicht Platin nicht.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:IRIDIUM-RECHNUNG',
        title: 'Die Fraunhofer-Rechnung',
        entryQuestion: 'Wie viel Iridium braucht die Wasserstoffwende — und was bedeutet das für die Welt?',
        takeaway: '2023: Iridiumbedarf durch Elektrolyse = 0,05 Tonnen. 2045 im Nachhaltigkeitsszenario: 85 Tonnen — das 12,5-Fache der heutigen Weltproduktion. Der Preis stieg bereits von 826 $/Unze (2013) auf 4682 $/Unze (2023) — fast das Sechsfache, noch bevor der Hochlauf begann.',
        sections: [
          {
            id: 'EXP:WIRKUNGSGRAD',
            kind: 'experiment',
            title: 'Experiment: Bedarfsprojektion 2023-2045',
            summary: 'Zeitstrahl 2023-2045. Elektrolyseur-Kapazitäts-Slider: 2.5 GW → 4350 GW. Iridium-Bedarf-Kurve steigt live: 0.12 g/kW × Kapazität = Jahresbedarf. Vergleichslinie: Weltproduktion 6.8t/Jahr (konstant, da Beiprodukt). Kreuzungspunkt: wann überschreitet Bedarf Angebot? Drei Szenarien umschaltbar.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:IRIDIUM-3',
            kind: 'quiz',
            title: 'Quiz: Rohstoffengpass',
            summary: 'Iridium-Bedarf 2045 in Tonnen berechnen, warum Preis schon jetzt steigt, was Recycling und Substitution leisten können.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-ELEKTROLYSE-0001',
    title: 'Wie zerlegt ein Elektrolyseur Wasser in Wasserstoff und Sauerstoff',
    subtitle: 'PEM-Elektrolyse: Elektrochemie, Membranen und warum grüner Wasserstoff mehr ist als Strom ins Wasser halten.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-5001',
    kxfModuleId: 'LRN:SSF:PHY-5001',
    domainsNeeded: ['KD:CHE-ELECTROCHEMISTRY', 'KD:PHY-ELECTRICITY', 'KD:CHE-PROTON-EXCHANGE'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Elektrolyse-Animation: H₂O → H₂ + O₂, Ionentransport durch Membran',
        'Wirkungsgrad-Slider: Strom → Wasserstoff-Energie, Verluste sichtbar',
        'PEM vs. alkalisch vs. Hochtemperatur: Vergleich interaktiv'
      ]
    },
    unlocks: ['CHEM:ELECTROLYSIS', 'PHY:PEM', 'ENV:GREEN-HYDROGEN'],
    units: [
      {
        id: 'UNIT:ELEKTROLYSE-PRINZIP',
        title: 'Wasser mit Strom zerlegen',
        entryQuestion: 'Wie kann man aus Wasser und Strom einen Brennstoff herstellen?',
        takeaway: 'Elektrolyse ist das Umkehrprinzip der Brennstoffzelle. Strom treibt eine chemische Reaktion: An der Kathode entstehen H₂-Moleküle, an der Anode O₂. Nötig sind mindestens 1,23 Volt. In der Praxis braucht man 1,8-2,0 V wegen Überspannungen. Wirkungsgrad: 60-80%.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ELEKTROLYSE-PEM' },
        sections: [
          {
            id: 'OBS:WASSER-STROM',
            kind: 'observation',
            title: 'Beobachtung: Blasen am Draht',
            summary: 'Zwei Drähte in Salzwasser, Batterie angeschlossen. Am Minuspol (Kathode): Wasserstoffblasen. Am Pluspol (Anode): Sauerstoffblasen. Doppelt so viele Wasserstoffblasen wie Sauerstoff — weil H₂O aus 2 Wasserstoff- und 1 Sauerstoffatom besteht.',
            depthPoints: 4,
          },
          {
            id: 'EXP:BATTERIE-LADEN-ENTLADEN',
            kind: 'experiment',
            title: 'Experiment: Elektrolyse live',
            summary: 'Elektrolysezelle-Canvas: Kathode links (H₂-Blasen), Anode rechts (O₂-Blasen). Spannung-Slider 0-3V: unter 1.23V passiert nichts, dann Blasenproduktion. Stromstärke-Slider: mehr Strom = mehr Gas. Wirkungsgrad-Anzeige: verlustfreie Theorie vs. Realität.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ELEKTROLYSE-1',
            kind: 'quiz',
            title: 'Quiz: Elektrolyse-Prinzip',
            summary: 'Warum doppelt so viele H₂-Blasen, Mindesstspannung 1.23V berechnen, was passiert bei zu wenig Spannung.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ELEKTROLYSE-PEM',
        title: 'Die PEM-Membran — Herzstück des modernen Elektrolyseurs',
        entryQuestion: 'Warum braucht ein moderner Elektrolyseur eine spezielle Membran — und was macht sie so besonders?',
        takeaway: 'Die Protonen-Austauschmembran (PEM) lässt nur Protonen (H⁺) durch, keine anderen Ionen, kein Gas. Das ermöglicht hochreinen Wasserstoff, kompakten Aufbau und schnelles An- und Abfahren. Nachteil: Die saure Umgebung erfordert Iridium an der Anode — das macht PEM-Elektrolyse teuer und rohstoffkritisch.',
        sections: [
          {
            id: 'OBS:MEMBRAN-FILTER',
            kind: 'observation',
            title: 'Beobachtung: Die selektive Membran',
            summary: 'Eine Membran die nur bestimmte Teilchen durchlässt — das kennt man von Osmose. In PEM-Elektrolyseuren ist die Membran nur für Protonen durchlässig. Elektronen müssen außen herum über den Stromkreis. Das trennt Wasserstoff und Sauerstoff sauber.',
            depthPoints: 4,
          },
          {
            id: 'EXP:OSMOSE',
            kind: 'experiment',
            title: 'Experiment: PEM-Elektrolyseur Querschnitt',
            summary: 'Schematischer Querschnitt: Anode (IrO₂, O₂ entsteht) | Membran (nur H⁺ durch) | Kathode (Pt, H₂ entsteht). Animation: H₂O an Anode gespalten, O₂ bleibt, H⁺ wandert durch Membran, nimmt Elektron auf → H₂. Temperatur- und Druckslider: Einfluss auf Effizienz.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:ELEKTROLYSE-2',
            kind: 'quiz',
            title: 'Quiz: PEM-Elektrolyse',
            summary: 'Was macht die Membran, warum ist IrO₂ an der Anode nötig, Vor- und Nachteile PEM vs. alkalisch.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:ENV-ROHSTOFFE-ENERGIEWENDE-0001',
    title: 'Warum braucht die Energiewende so viele seltene Materialien',
    subtitle: 'Lithium, Iridium, Kupfer, Dysprosium: Welche Rohstoffe die Energiewende braucht — und wo sie knapp werden könnten.',
    status: 'prototype',
    sourceModuleId: 'SSF-ENV-6001',
    kxfModuleId: 'LRN:SSF:ENV-6001',
    domainsNeeded: ['KD:ENV-CRITICAL-MATERIALS', 'KD:ENV-ENERGY-TRANSITION', 'KD:CHE-ELEMENTS'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Rohstoff-Dashboard: 12 kritische Metalle, Bedarf 2045 vs. Förderung 2023',
        'Technologie-Rohstoff-Matrix: welches Gerät braucht was',
        'Knappheits-Ampel: Risikobewertung interaktiv',
        'Recycling-Potenzial-Slider: wie viel kann Kreislaufwirtschaft lösen'
      ]
    },
    unlocks: ['ENV:CRITICAL-MATERIALS', 'ENV:CIRCULAR-ECONOMY', 'KD:ENERGY-TRANSITION'],
    units: [
      {
        id: 'UNIT:ROHSTOFFE-TECHNOLOGIE',
        title: 'Was steckt in einer Windkraftanlage?',
        entryQuestion: 'Eine Windkraftanlage erzeugt sauberen Strom — aber was steckt in ihr drin?',
        takeaway: 'Eine 3-MW-Windkraftanlage enthält etwa 335 Tonnen Stahl, 4,7 Tonnen Kupfer, 2 Tonnen Dysprosium (für den Permanentmagneten), 0,67 Tonnen Neodym und Spuren von Terbium. Ohne diese Seltenen Erden dreht der Generator nicht effizient. "Sauber" bezieht sich auf den Betrieb — nicht auf die Herstellung.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ROHSTOFFE-KNAPPHEIT' },
        sections: [
          {
            id: 'OBS:WINDRAD-INHALT',
            kind: 'observation',
            title: 'Beobachtung: Das Material einer Windkraftanlage',
            summary: 'Eine Windkraftanlage sieht aus wie Stahl und Plastik. Aber im Generator stecken Permanentmagnete aus Neodym-Eisen-Bor — mit Dysprosium und Terbium als Hochtemperatur-Stabilisatoren. Ohne diese seltenen Erden würde der Magnet bei Betriebstemperatur entmagnetisieren.',
            depthPoints: 4,
          },
          {
            id: 'EXP:MATERIAL-MATRIX',
            kind: 'experiment',
            title: 'Experiment: Technologie-Rohstoff-Matrix',
            summary: 'Interaktive Matrix: Zeilen = Rohstoffe (Li, Cu, Nd, Dy, Ir, Pt, Graphit, Sc...), Spalten = Technologien (E-Auto, Windrad, Solarpanel, Elektrolyseur, Rechenzentrum, Wärmepumpe). Klick auf Zelle: wie viel kg pro MW oder pro Stück. Gesamt-Farbe: rot = kritisch, gelb = aufmerksam, grün = unkritisch.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ROHSTOFFE-1',
            kind: 'quiz',
            title: 'Quiz: Rohstoffe in Technologien',
            summary: 'Welches Metall in welcher Technologie, warum Seltene Erden in Windrädern, was macht Dysprosium in einem Magneten.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ROHSTOFFE-KNAPPHEIT',
        title: 'Wann wird es knapp?',
        entryQuestion: 'Welche Rohstoffe könnten die Energiewende bremsen — und welche werden gar kein Problem?',
        takeaway: 'Laut Fraunhofer-Studie 2026: Bei 12 von 14 untersuchten Metallen könnte der Bedarf 2045 die heutige Weltproduktion überschreiten. Kritischstes Metall: Iridium (12,5-facher Bedarf). Lithium: 4,7-fach. Aber Kupfer und Titan bleiben unkritisch. Die Lösung: Recycling, Substitution, Effizienzsteigerung.',
        sections: [
          {
            id: 'EXP:WIRKUNGSGRAD',
            kind: 'experiment',
            title: 'Experiment: Fraunhofer-Dashboard 2045',
            summary: 'Dashboard: 12 Metalle als Balken. X-Achse: Bedarf 2045 / Förderung 2023 (Faktor). Iridium: 12.5×. Lithium: 4.7×. Scandium: 2.6×. Dysprosium: 2.2×. Kupfer: 0.64×. Drei Szenarien umschaltbar (Nachhaltig / Mittel / Wachstum). Klick auf Metall: Haupttreiber-Technologie.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:ROHSTOFFE-2',
            kind: 'quiz',
            title: 'Quiz: Kritische Rohstoffe',
            summary: 'Fraunhofer-Zahlen lesen, warum Iridium kritischer als Lithium, was Recycling leisten kann und was nicht.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // WIRTSCHAFT — 2 Lernpfade (ECO-L0, KG-kanonisch)
  // KG-Modul-IDs: ECO-L0-000001, ECO-L0-000002
  // Request: KG-SSF-REQ-20260719-ECO-L0
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:ECO-KREDIT-0001',
    title: 'Was ist ein Kredit — und warum gibt jemand heute etwas das erst spaeter zurueckkommt',
    subtitle: 'Kreditgeber, Kreditnehmer, Laufzeit und Tilgung: wie geliehenes Geld funktioniert und was es wirklich kostet.',
    status: 'prototype',
    sourceModuleId: 'ECO-L0-000001',
    kxfModuleId: 'LRN:SSF:ECO-L0-000001',
    domainsNeeded: ['KNOW:ECO-FINANCE', 'KNOW:MAT-ARITHMETIC'],
    suppliedBy: {
      knowledgeGraph: ['ECO-L0-000001 canonical module', 'Prerequisite: MAT-L0-000001'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Kredit-Simulator: Betrag, Laufzeit, Zinssatz → Monatsrate und Gesamtkosten live',
        'Tilgungsplan-Visualisierung: wie viel geht jeden Monat an Zinsen vs. Tilgung',
        'Vergleich: Kreditbetrag vs. tatsaechliche Rueckzahlung'
      ]
    },
    unlocks: ['ECO:CREDIT-BASICS', 'ECO:LOAN-MECHANICS', 'NOXIA:BANK-CREDIT-TAB'],
    units: [
      {
        id: 'UNIT:KREDIT-WAS',
        title: 'Was ist ein Kredit?',
        entryQuestion: 'Warum gibt jemand heute Geld her — obwohl er es erst spaeter zurueckbekommt?',
        takeaway: 'Ein Kredit ist eine Kapitalueberlassung auf Zeit: der Kreditgeber verzichtet voruebergehend auf sein Geld und bekommt es spaeter mit Zinsen zurueck. Der Kreditnehmer kann heute mehr ausgeben als er hat — zahlt dafuer aber mehr zurueck als er bekommen hat.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KREDIT-KOSTEN' },
        sections: [
          {
            id: 'OBS:KREDIT-ALLTAG',
            kind: 'observation',
            title: 'Beobachtung: Das neue Fahrrad',
            summary: 'Ein Freund kauft ein 800-Euro-Fahrrad — obwohl er nur 200 Euro gespart hat. Er zahlt 50 Euro pro Monat, 18 Monate lang. Am Ende hat er 900 Euro gezahlt. Was war das? Kein Geschenk, kein Rabatt — ein Kredit.',
            depthPoints: 4,
          },
          {
            id: 'EXP:GAUSS',
            kind: 'experiment',
            title: 'Experiment: Kredit-Grundstruktur',
            summary: 'Drei Schieberegler: Kreditbetrag (100-10.000 EUR), Laufzeit (1-60 Monate), Zinssatz (0-15%). Ausgabe: Monatsrate, Gesamtrueckzahlung, Zinsanteil in Euro und Prozent. Balken zeigt Verhraeltnis Tilgung zu Zinsen.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:KREDIT-1',
            kind: 'quiz',
            title: 'Quiz: Kreditgrundlagen',
            summary: 'Was ist der Unterschied Kredit vs. Geschenk vs. Einkommen, wer ist Kreditgeber und wer Kreditnehmer, warum zahlt man mehr zurueck als man bekommen hat.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:KREDIT-KOSTEN',
        title: 'Was ein Kredit wirklich kostet',
        entryQuestion: 'Warum zahlt man am Ende mehr zurueck als man geliehen hat — und wie viel mehr?',
        takeaway: 'Die Differenz zwischen Rueckzahlung und Kreditbetrag sind die Zinskosten. Je laenger die Laufzeit und je hoeher der Zinssatz, desto teurer wird der Kredit. Ein langer Kredit mit niedrigem Zinssatz kann teurer sein als ein kurzer mit hohem.',
        sections: [
          {
            id: 'EXP:ARBEITSPUNKT',
            kind: 'experiment',
            title: 'Experiment: Tilgungsplan visualisiert',
            summary: 'Monat-fuer-Monat-Balken: roter Anteil = Zinsen, gruener Anteil = Tilgung. Am Anfang: viel Zinsen, wenig Tilgung. Am Ende umgekehrt. Laufzeit-Slider zeigt wie sich das Verhaeltnis verschiebt. Gesamtkosten-Vergleich fuer verschiedene Szenarien.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:KREDIT-2',
            kind: 'quiz',
            title: 'Quiz: Kreditkosten',
            summary: 'Gesamtkosten berechnen, warum laengere Laufzeit mehr Zinsen bedeutet, Unterschied Sollzins vs. Effektivzins.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:ECO-ZINS-0001',
    title: 'Warum waechst ein Betrag schneller wenn auch die Zinsen verzinst werden',
    subtitle: 'Einfacher Zins und Zinseszins: lineares versus exponentielles Wachstum — und warum der Unterschied bei langen Zeitraeumen dramatisch wird.',
    status: 'prototype',
    sourceModuleId: 'ECO-L0-000002',
    kxfModuleId: 'LRN:SSF:ECO-L0-000002',
    domainsNeeded: ['KNOW:ECO-FINANCE', 'KNOW:MAT-EXPONENTIAL'],
    suppliedBy: {
      knowledgeGraph: ['ECO-L0-000002 canonical module', 'Prerequisite: ECO-L0-000001'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Zinseszins-Simulator: Startkapital, Zinssatz, Jahre → Endkapital live',
        'Vergleichsgraph: linear (einfacher Zins) vs. exponentiell (Zinseszins)',
        'Verdopplungszeit: Faustregel Regel-70 interaktiv erklaert'
      ]
    },
    unlocks: ['ECO:COMPOUND-INTEREST', 'MATH:EXPONENTIAL-GROWTH', 'NOXIA:INVESTMENT-MECHANICS'],
    units: [
      {
        id: 'UNIT:ZINS-EINFACH',
        title: 'Einfacher Zins',
        entryQuestion: 'Wenn 1000 Euro 5% Zinsen pro Jahr bringen — wie viel hat man nach 10 Jahren?',
        takeaway: 'Einfacher Zins: jedes Jahr dieselbe absolute Summe. 1000 Euro × 5% = 50 Euro pro Jahr. Nach 10 Jahren: 1500 Euro. Das Wachstum ist linear — eine Gerade.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ZINS-ESZINS' },
        sections: [
          {
            id: 'OBS:SPARBUCH-ALT',
            kind: 'observation',
            title: 'Beobachtung: Das alte Sparbuch',
            summary: 'Grossmutter hat 1000 Euro auf ein Sparbuch gelegt, 3% Zinsen pro Jahr, Zinsen werden ausgezahlt. Nach 20 Jahren: 1600 Euro. Klingt gut. Aber war es gut? Das haengt davon ab was mit den ausgezahlten Zinsen passiert ist.',
            depthPoints: 4,
          },
          {
            id: 'EXP:REIHE',
            kind: 'experiment',
            title: 'Experiment: Einfacher Zins',
            summary: 'Startkapital-Slider, Zinssatz-Slider, Jahre-Slider. Balkengrafik: jedes Jahr gleich hoher Zuwachs. Formel: K_n = K_0 × (1 + n × p/100). Ergebnis als Tabelle und Linie.',
            interactive: true,
            depthPoints: 7,
          },
          {
            id: 'QUIZ:ZINS-1',
            kind: 'quiz',
            title: 'Quiz: Einfacher Zins',
            summary: 'Zinsbetrag berechnen, Unterschied Zinssatz vs. Zinsbetrag, warum lineares Wachstum.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ZINS-ESZINS',
        title: 'Zinseszins — der Unterschied der alles veraendert',
        entryQuestion: 'Was passiert wenn die Zinsen nicht ausgezahlt werden — sondern selbst wieder verzinst werden?',
        takeaway: 'Zinseszins: die Zinsen werden dem Kapital hinzugefuegt und selbst verzinst. Das Wachstum ist exponentiell — am Anfang kaum sichtbar, spaeter dramatisch. Nach 30 Jahren bei 7% Zins: 1000 Euro werden zu 7612 Euro statt 3100 Euro.',
        sections: [
          {
            id: 'OBS:EINSTEIN-ZITAT',
            kind: 'observation',
            title: 'Beobachtung: Der Unterschied nach 30 Jahren',
            summary: 'Zwei Sparer starten mit 1000 Euro, 5% Zinsen, 30 Jahre. Sparer A: Zinsen werden ausgezahlt (einfacher Zins). Sparer B: Zinsen bleiben angelegt (Zinseszins). Ergebnis: A hat 2500 Euro, B hat 4322 Euro. Fast doppelt so viel — durch denselben Zinssatz.',
            depthPoints: 4,
          },
          {
            id: 'EXP:KARAMELL-TEMP',
            kind: 'experiment',
            title: 'Experiment: Zinseszins-Simulator',
            summary: 'Startkapital, Zinssatz (1-15%), Jahre (1-50). Zwei Kurven: linear (einfacher Zins) und exponentiell (Zinseszins). Bei kurzem Zeitraum kaum Unterschied. Bei 30-50 Jahren: dramatische Schere. Verdopplungszeit live angezeigt (Regel 70: Jahre = 70 / Zinssatz).',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:ZINS-2',
            kind: 'quiz',
            title: 'Quiz: Zinseszins',
            summary: 'Zinseszins-Formel anwenden, Verdopplungszeit berechnen, warum Zeit der wichtigste Faktor ist.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },


  // ═══════════════════════════════════════════════════
  // NOXIA-BETA TIER-1 LERNPFADE
  // Direkt von NOXIA angefordert — schalten Beta-Gates frei
  // SSF-0009 / SSF-0011 / SSF-0012
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:AST-SONNENSYSTEM-0001',
    title: 'Warum fliegen Raumschiffe Kurven — und nicht den direkten Weg',
    subtitle: 'Hohmann-Transfer, Gravitationsschlingen und warum Energie im All teurer ist als Zeit.',
    status: 'prototype',
    sourceModuleId: 'AST-L1-000001',
    kxfModuleId: 'LRN:SSF:AST-L1-000001',
    domainsNeeded: ['KNOW:PHY-ORBITAL-MECHANICS', 'KNOW:PHY-GRAVITY', 'KNOW:AST-SOLAR-SYSTEM'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Sonnensystem-Canvas: Planeten auf Umlaufbahnen, Transferbogen animiert',
        'Delta-v-Slider: Energie für Transferbahn, Reisezeit live',
        'Transferfenster-Rechner: wann starten für minimale Energie',
        'Vergleich direkter Weg vs. Hohmann: Energiedifferenz sichtbar',
      ]
    },
    unlocks: ['NAV:ORBITAL', 'UNL:NOX:NAV:ORBITAL', 'AST:HOHMANN-TRANSFER'],
    units: [
      {
        id: 'UNIT:ORBITAL-WARUM-KURVEN',
        title: 'Warum keine geraden Wege im All?',
        entryQuestion: 'Warum fliegen Raumschiffe nicht einfach direkt von Planet zu Planet — sondern große Bögen?',
        takeaway: 'Im Weltall gibt es keinen Widerstand — aber es gibt Gravitation. Ein Raumschiff das "geradeaus" fliegt würde durch Gravitationsfelder abgelenkt. Effizienter ist es, Umlaufbahnen zu nutzen: Man beschleunigt einmal, die Schwerkraft erledigt den Rest. Der Hohmann-Transfer ist die energieminimale Verbindung zwischen zwei kreisförmigen Umlaufbahnen.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ORBITAL-HOHMANN' },
        sections: [
          {
            id: 'OBS:ORBITAL-ERDE-MARS',
            kind: 'observation',
            title: 'Erde zu Mars — 6 Monate, aber warum?',
            summary: 'Eine Reise von der Erde zum Mars dauert im günstigsten Fall 6-9 Monate. Die Entfernung beträgt dann rund 78 Millionen Kilometer. Aber ein Auto das mit 120 km/h fährt würde über 74 Jahre brauchen — und das wäre der direkte Weg. Raumschiffe fahren nicht direkt. Warum?',
            depthPoints: 4,
          },
          {
            id: 'EXP:ORBITAL-DEMO',
            kind: 'experiment',
            title: 'Experiment: Sonnensystem und Transferbahnen',
            summary: 'Klicke auf Erde und Mars um eine Transferbahn zu berechnen. Slider: Startgeschwindigkeit (Δv). Anzeige: benötigte Energie, Reisezeit, Ankunftsfenster. Direkter Weg vs. Hohmann-Bogen Vergleich. Realistisch: Hohmann-Transfer Erde→Mars benötigt Δv ≈ 2.9 km/s, Reisezeit ≈ 259 Tage.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:ORBITAL-1',
            kind: 'quiz',
            title: 'Quiz: Transferbahnen',
            summary: 'Warum brauchen Raumschiffe nicht den direkten Weg? Was ist ein Transferfenster? Warum ist Hohmann energieoptimal?',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:ORBITAL-HOHMANN',
        title: 'Der Hohmann-Transfer — elegante Physik',
        entryQuestion: 'Was ist der energieminimale Weg zwischen zwei Umlaufbahnen — und was hat das mit Ellipsen zu tun?',
        takeaway: 'Der Hohmann-Transfer nutzt eine halbelliptische Bahn: Aphelion berührt die Zielbahn, Perihelion die Startbahn. Zwei Triebwerksmanöver genügen. Die benötigte Geschwindigkeitsänderung (Δv) ist minimal. Formel: Δv₁ = √(μ/r₁) · (√(2r₂/(r₁+r₂)) - 1), wobei μ = GM. Für Erde→Mars: Δv₁ ≈ 2.94 km/s.',
        sections: [
          {
            id: 'OBS:ELLIPSE-KEPLER',
            kind: 'observation',
            title: 'Keplers Erkenntnis: Planeten fliegen Ellipsen',
            summary: 'Johannes Kepler erkannte 1609: Planeten bewegen sich nicht in Kreisen, sondern in Ellipsen — die Sonne steht in einem Brennpunkt. Das ist kein Zufall, sondern folgt direkt aus dem Gravitationsgesetz. Eine Transferbahn ist auch eine Ellipse — nur eben eine die zwei verschiedene Planetenbahnen verbindet.',
            depthPoints: 4,
          },
          {
            id: 'EXP:SOLAR-SYSTEM',
            kind: 'experiment',
            title: 'Experiment: Δv und Reisezeit',
            summary: 'Interaktiver Hohmann-Rechner: Startorbit (AU), Zielorbit (AU). Ausgabe: Δv₁ (m/s), Δv₂ (m/s), Gesamtenergie (MJ/kg), Reisezeit (Tage). Voreingestellt: Erde (1 AU) → Mars (1.524 AU) → 259 Tage, Δv_ges ≈ 5.6 km/s. Vergleich mit Jupiter: 996 Tage, Δv_ges ≈ 9.2 km/s.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:ORBITAL-2',
            kind: 'quiz',
            title: 'Quiz: Hohmann-Transfer',
            summary: 'Zwei Δv-Manöver beim Hohmann-Transfer benennen, Reisezeit Erde→Mars schätzen, warum längere Reise manchmal weniger Energie braucht.',
            depthPoints: 15,
          },
        ],
      },
    ],
  },

  {
    id: 'PATH:SSF:PHY-SPEKTRALANALYSE-0001',
    title: 'Wie liest man aus dem Licht was ein Stern enthält',
    subtitle: 'Spektrallinien als Fingerabdruck: Warum Natrium gelb leuchtet, Helium nicht auf der Erde entdeckt wurde — und wie NOXIA-Scanner Ressourcen erkennen.',
    status: 'prototype',
    sourceModuleId: 'PHY-L1-000001',
    kxfModuleId: 'LRN:SSF:PHY-L1-000001',
    domainsNeeded: ['KNOW:PHY-SPECTROSCOPY', 'KNOW:PHY-QUANTUM', 'KNOW:AST-STELLAR'],
    suppliedBy: {
      knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
      kueperCom: [], overtimeArchive: [],
      ssf: [
        'Spektrum-Canvas: Absorptionslinien live, Element-Fingerabdrücke vergleichen',
        'Fraunhofer-Linien: Sonnenspektrum mit identifizierten Elementen',
        'NOXIA-Scanner-Modus: Kachel-Spektrum → Ressource identifizieren',
        'Doppler-Erweiterung: Rotverschiebung als Geschwindigkeitsindikator',
      ]
    },
    unlocks: ['SENSOR:SPECTRAL', 'UNL:NOX:SENSOR:SPECTRAL', 'PHY:QUANTUM-LEVELS'],
    units: [
      {
        id: 'UNIT:SPEKTRAL-FINGERABDRUCK',
        title: 'Jedes Element hat einen Fingerabdruck aus Licht',
        entryQuestion: 'Warum leuchten Straßenlaternen gelb — und wie nutzt man dasselbe Prinzip um Sterne zu analysieren?',
        takeaway: 'Atome können Energie nur in diskreten Paketen aufnehmen und abgeben (Quantenmechanik). Jedes Element hat eine einzigartige Energiestufenstruktur — daher einzigartige Wellenlängen. Natrium emittiert bei 589 nm (gelb). Diese Linien im Spektrum sind so eindeutig wie Fingerabdrücke. Gustav Kirchhoff und Robert Bunsen entdeckten das 1859.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SPEKTRAL-STERNE' },
        sections: [
          {
            id: 'OBS:SPEKTRAL-LAMPE',
            kind: 'observation',
            title: 'Warum leuchten Natriumlampen gelb?',
            summary: 'Straßenlaternen leuchten oft orange-gelb. Das ist keine Designentscheidung — es ist Physik. Natriumatome können nur Licht bei 589 nm emittieren. Diese Wellenlänge erscheint unserem Auge gelb. Kein anderes Element hat diese exakte Farbe. Das macht Spektrallinien so nützlich.',
            depthPoints: 4,
          },
          {
            id: 'EXP:ABSORPTIONSLINIEN',
            kind: 'experiment',
            title: 'Experiment: Spektrallinien identifizieren',
            summary: 'Spektrum-Canvas mit Regenbogenband. Klick auf Elemente (H, He, Na, Fe, Ca, Mg): charakteristische Linien erscheinen als schwarze Striche. Sonnen-Fraunhofer-Spektrum laden: welche Elemente erkennst du? Nachweis: Helium wurde 1868 zuerst in der Sonne entdeckt — erst 27 Jahre später auf der Erde.',
            interactive: true,
            depthPoints: 8,
          },
          {
            id: 'QUIZ:SPEKTRAL-1',
            kind: 'quiz',
            title: 'Quiz: Spektrallinien',
            summary: 'Warum hat jedes Element eigene Spektrallinien, wie entdeckte man Helium in der Sonne, was bedeutet Absorptionsspektrum vs. Emissionsspektrum.',
            depthPoints: 12,
          },
        ],
      },
      {
        id: 'UNIT:SPEKTRAL-STERNE',
        title: 'Wie Astronomen Sterne analysieren',
        entryQuestion: 'Wie kann man aus dem Licht eines Sterns ablesen woraus er besteht — ohne je dort hinzufliegen?',
        takeaway: 'Sternenlicht passiert die äußere Atmosphäre des Sterns. Bestimmte Wellenlängen werden dort absorbiert — jedes Element hinterlässt seinen Fingerabdruck. Teleskope zerlegen das Licht in Spektren. Fraunhofer zählte 1814 über 570 dunkle Linien im Sonnenspektrum. Heute kennen wir die meisten: Ca, Fe, Mg, H, Na, Ti.',
        sections: [
          {
            id: 'OBS:SPEKTRAL-FRAUNHOFER',
            kind: 'observation',
            title: 'Fraunhofers dunkle Linien',
            summary: 'Joseph von Fraunhofer entdeckte 1814 in München dunkle Linien im Sonnenspektrum. Er konnte sie nicht erklären, aber er kartographierte sie. Heute wissen wir: Kalzium erzeugt die auffälligen H und K Linien bei 393 und 396 nm. Diese Linien sieht man in fast jedem Stern — Kalzium ist im Universum häufig.',
            depthPoints: 4,
          },
          {
            id: 'EXP:LICHTSPEKTRUM',
            kind: 'experiment',
            title: 'Experiment: Stern-Spektrum analysieren',
            summary: 'Drei Sterntypen wählen (Sonnenähnlich G2, heißer Stern A0, kühler Riese K5). Spektren werden angezeigt. Welche Linien dominieren wo? A-Stern: starke Wasserstofflinien (Balmer-Serie). G-Stern: Kalzium, Eisen. K-Stern: Molekülbanden (TiO). Temperatur-Farb-Relation: heiß = blau, kühl = rot.',
            interactive: true,
            depthPoints: 9,
          },
          {
            id: 'QUIZ:SPEKTRAL-2',
            kind: 'quiz',
            title: 'Quiz: Stern-Spektroskopie',
            summary: 'Wie liest man Sternzusammensetzung aus Spektrum, warum dominieren Wasserstofflinien in heißen Sternen, was verrät Rotverschiebung.',
            depthPoints: 15,
          },
        ],
      },
    ],
  }
];

export function getLearningPathById(id: string) {
  return learningPaths.find((path) => path.id === id) ?? null;
}
