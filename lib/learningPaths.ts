/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths.ts
 * Name:      Learning Paths registry
 * Version:   0.9.4
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
  }
,

  {
    id: 'PATH:SSF:PHY-SKY-0001',
    title: 'Warum ist der Himmel blau',
    subtitle: 'Von der Farbe des Himmels zu Sonnenuntergaengen: Rayleigh-Streuung, Wellenlaenge und das Auge.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-1103',
    kxfModuleId: 'LRN:SSF:PHY-1103',
    domainsNeeded: ['KNOW:PHYS-WAVE', 'KNOW:PHYS-OPTICS', 'KNOW:ASTRO-ATMO'],
    suppliedBy: {
      knowledgeGraph: [
        'Knowledge Domain IDs',
        'Prerequisite link to PATH:SSF:PHY-WAVE-SPECTRUM-0001',
        'Unlock mapping to NOXIA'
      ],
      kueperCom: [],
      overtimeArchive: [],
      ssf: [
        'Didactic sequencing, entry questions',
        'Interactive Rayleigh-Streuungs-Experiment (Wellenlaengen-Slider + Streuungsintensitaet)',
        'Atmosphaeren-Weglaengen-Experiment (Sonnenwinkel-Slider + Farbwechsel)',
        'Seitenast: Warum nicht violett?',
        'Persoenliche Beobachtungen (Foto kommt spaeter)'
      ]
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
          {
            id: 'OBS:HIMMEL',
            kind: 'observation',
            title: 'Beobachtung: Der blaue Himmel',
            summary: 'Schau an einem klaren Tag in den Himmel — nicht in die Sonne. Blau. Aber die Sonne selbst ist weisslich-gelb. Dasselbe Licht, zwei verschiedene Farben. Wie?',
            // image will be added when photo arrives
            depthPoints: 4
          },
          {
            id: 'EXP:RAYLEIGH',
            kind: 'experiment',
            title: 'Experiment: Rayleigh-Streuung live',
            summary: 'Wellenlaengen-Slider 380–700 nm: Streuungsintensitaet steigt mit lambda^-4. Blau (450 nm) wird ~5.5x staerker gestreut als Rot (700 nm). Canvas zeigt Streuung visuell.',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'EXP:ATMOSPHAERE-PFAD',
            kind: 'experiment',
            title: 'Experiment: Lichtweg durch die Atmosphaere',
            summary: 'Sonnenwinkel-Slider 0–90 Grad: zeigt wie viel Atmosphaere das Licht durchquert. Bei flachem Winkel vielfach laengerer Weg — Blau fast vollstaendig weggestreut.',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'BRANCH:NICHT-VIOLETT',
            kind: 'branch',
            title: 'Seitenast: Warum nicht violett?',
            summary: 'Violett wird staerker gestreut als Blau — trotzdem ist der Himmel blau. Drei Gruende: Sonnenspektrum, Augenempfindlichkeit, Absorption in der oberen Atmosphaere.',
            optional: true,
            depthPoints: 10
          },
          {
            id: 'QUIZ:HIMMEL-BLAU',
            kind: 'quiz',
            title: 'Quiz: Rayleigh-Streuung',
            summary: 'Drei Fragen: Warum blau (nicht rot), was ist lambda^-4, warum nicht violett.',
            depthPoints: 15
          }
        ]
      },
      {
        id: 'UNIT:UNTERGANG-ROT',
        title: 'Warum rot beim Untergang?',
        entryQuestion: 'Warum ist die Sonne beim Untergang rot — obwohl sie mittags weiss-gelb ist?',
        sections: [
          {
            id: 'OBS:UNTERGANG',
            kind: 'observation',
            title: 'Beobachtung: Sonnenuntergang',
            summary: 'Dieselbe Sonne, eine andere Farbe. Mittags fast weiss. Beim Untergang tief orange-rot. Nicht die Sonne aendert sich — der Weg des Lichts durch die Atmosphaere wird laenger.',
            depthPoints: 4
          },
          {
            id: 'EXP:WEGLAENGE',
            kind: 'experiment',
            title: 'Experiment: Weglaenge bestimmt die Farbe',
            summary: 'Interaktiver Querschnitt durch die Atmosphaere: Sonnenposition veraendert Weglaenge, Canvas zeigt Farbwechsel von weiss zu orange zu tiefrot. Wellenlaengen-Filterung sichtbar.',
            interactive: true,
            depthPoints: 8
          },
          {
            id: 'BRANCH:DUNSTROT',
            kind: 'branch',
            title: 'Seitenast: Warum ist Dunst auch rot?',
            summary: 'Dunst, Nebel, Staub verstaerken die Streuung — groessere Partikel streuen alle Wellenlaengen staerker (Mie-Streuung). Waldbraende, Saharastaub, Vulkanasche machen Untergang roter.',
            optional: true,
            depthPoints: 8
          },
          {
            id: 'BRANCH:MOND-ROT',
            kind: 'branch',
            title: 'Seitenast: Warum ist der Mond bei der Mondfinsternis rot?',
            summary: 'Alle Sonnenuntergaenge der Erde gleichzeitig beleuchten den Mond in der Erdschatten — das Licht das durchkommt ist das Rot das die Atmosphaere durchlaesst. Derselbe Mechanismus.',
            optional: true,
            depthPoints: 10
          },
          {
            id: 'QUIZ:UNTERGANG-ROT',
            kind: 'quiz',
            title: 'Quiz: Weglaenge und Farbe',
            summary: 'Drei Fragen: Warum laengerer Weg beim Untergang, welche Wellenlaenge bleibt uebrig, was hat die Mondfinsternis damit zu tun.',
            depthPoints: 18
          }
        ]
      }
    ]
  }
,
  {
    id: 'PATH:SSF:PHY-SKY-0001',
    title: 'Warum ist der Himmel blau',
    subtitle: 'Von Rayleigh-Streuung zu Sonnenuntergaengen und Mondfinsternissen — dasselbe Prinzip, zwei Perspektiven.',
    status: 'prototype',
    sourceModuleId: 'SSF-PHY-1103',
    kxfModuleId: 'LRN:SSF:PHY-1103',
    domainsNeeded: ['KNOW:PHYS-WAVE', 'KNOW:PHYS-OPTICS', 'KNOW:ASTRO-ATMO'],
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
    domainsNeeded: ['KNOW:MAT-CALCULUS', 'KNOW:MAT-ANALYSIS', 'KNOW:PHYS-MEASURE'],
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
    domainsNeeded: ['KNOW:EL-BASICS', 'KNOW:EL-SEMICONDUCTOR'],
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
    domainsNeeded: ['KNOW:MAT-ANALYSIS', 'KNOW:MAT-SERIES', 'KNOW:PHYS-WAVE'],
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
    domainsNeeded: ['KNOW:MAT-CALCULUS', 'KNOW:MAT-GEOMETRY', 'KNOW:MAT-ANALYSIS'],
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
  }
,
  {
    id: 'PATH:SSF:MAT-VEC-0001',
    title: 'Warum greift man eine Tuer am Rand an',
    subtitle: 'Vektoren als Pfeile mit Richtung und Betrag — Skalarprodukt, Winkel, Kreuzprodukt und Drehmoment.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1104',
    kxfModuleId: 'LRN:SSF:MAT-1104',
    domainsNeeded: ['KNOW:MAT-VECTORS', 'KNOW:PHYS-MECH', 'KNOW:ENG-STATICS'],
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
  }
,
  {
    id: 'PATH:SSF:ENG-EDM-0001',
    title: 'Wie schneidet man Stahl der haerter ist als jedes Werkzeug',
    subtitle: 'Erodieren: Funken schneiden was Fraesen nicht kann — Draht, Bohr- und Senkerodieren.',
    status: 'prototype',
    sourceModuleId: 'SSF-ENG-1101',
    kxfModuleId: 'LRN:SSF:ENG-1101',
    domainsNeeded: ['KNOW:ENG-MANUFACTURING', 'KNOW:PHYS-PLASMA', 'KNOW:EL-BASICS'],
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
  }
,
  {
    id: 'PATH:SSF:MAT-LGS-0001',
    title: 'Wie loest man zwei Bedingungen gleichzeitig',
    subtitle: 'Lineare Gleichungssysteme — grafisch als Schnittpunkt, systematisch mit Gauss-Elimination.',
    status: 'prototype',
    sourceModuleId: 'SSF-MAT-1105',
    kxfModuleId: 'LRN:SSF:MAT-1105',
    domainsNeeded: ['KNOW:MAT-LINEAR-ALGEBRA','KNOW:MAT-ANALYSIS'],
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
  }
,
  {
    id: 'PATH:SSF:ENG-DMS-0001',
    title: 'Warum kann Stahl brechen',
    subtitle: 'Von der Waermedehnung zum Dehnungsmessstreifen: Spannung, Dehnung und wie ein DMS aus Widerstandsaenderung Kraft sichtbar macht.',
    status: 'prototype',
    sourceModuleId: 'SSF-ENG-1102',
    kxfModuleId: 'LRN:SSF:ENG-1102',
    domainsNeeded: ['KNOW:ENG-MATERIALS', 'KNOW:PHYS-MECHANICS', 'KNOW:EL-BASICS'],
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
  }
];

export function getLearningPathById(id: string) {
  return learningPaths.find((path) => path.id === id) ?? null;
}
