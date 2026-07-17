/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths.ts
 * Name:      Learning Paths registry
 * Version:   0.9.6
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
,
  // ═══════════════════════════════════════════════════
  // REINIGUNG & MATERIALIEN — 10 Lernpfade
  // ═══════════════════════════════════════════════════

  {
    id: 'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001',
    title: 'Warum loest Spuelmittel Fett — aber Wasser allein nicht',
    subtitle: 'Tenside, Mizellen und die Grenze zwischen Wasser und Oel — warum ein Molekuel mit zwei Seiten alles veraendert.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-2001',
    kxfModuleId: 'LRN:SSF:CHE-2001',
    domainsNeeded: ['KNOW:CHE-SURFACTANTS', 'KNOW:CHE-POLARITY', 'KNOW:PHY-SURFACES'],
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
    domainsNeeded: ['KNOW:CHE-ACID-BASE', 'KNOW:CHE-CARBONATE', 'KNOW:PHY-PH'],
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
    domainsNeeded: ['KNOW:CHE-OXIDATION', 'KNOW:CHE-REDOX', 'KNOW:CHE-SAFETY'],
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
    kxfModuleId: 'LRN:SSF:PHY-2001',
    domainsNeeded: ['KNOW:PHY-SURFACES', 'KNOW:MAT-HARDNESS', 'KNOW:MAT-POROSITY'],
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
    domainsNeeded: ['KNOW:PHY-SURFACE-TENSION', 'KNOW:CHE-EVAPORATION', 'KNOW:PHY-OPTICS'],
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
    domainsNeeded: ['KNOW:CHE-PROTEINS', 'KNOW:CHE-SOLUBILITY', 'KNOW:PHY-TEMPERATURE'],
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
    kxfModuleId: 'LRN:SSF:PHY-2002',
    domainsNeeded: ['KNOW:MAT-WOOD', 'KNOW:MAT-CERAMICS', 'KNOW:CHE-WATER-ABSORPTION'],
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
    domainsNeeded: ['KNOW:CHE-EMULSION', 'KNOW:CHE-LECITHIN', 'KNOW:PHY-COLLOIDS'],
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
    domainsNeeded: ['KNOW:CHE-OSMOSIS', 'KNOW:BIO-CELL-MEMBRANE', 'KNOW:PHY-DIFFUSION'],
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
    kxfModuleId: 'LRN:SSF:PHY-2003',
    domainsNeeded: ['KNOW:PHY-PRESSURE', 'KNOW:PHY-PHASE-TRANSITION', 'KNOW:PHY-THERMODYNAMICS'],
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
    kxfModuleId: 'LRN:SSF:PHY-2004',
    domainsNeeded: ['KNOW:PHY-HEAT-TRANSFER', 'KNOW:PHY-RADIATION', 'KNOW:PHY-CONVECTION'],
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
  }
,
  {
    id: 'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
    title: 'Warum karamellisiert Zucker erst bei 160 Grad',
    subtitle: 'Von suessem Zucker zu goldenem Karamell: thermische Zersetzung, Molekuelstruktur und die Kunst des perfekten Timings.',
    status: 'prototype',
    sourceModuleId: 'SSF-CHE-1005',
    kxfModuleId: 'LRN:SSF:CHE-1005',
    domainsNeeded: ['KNOW:CHE-ORGANIC', 'KNOW:CHE-THERMAL', 'KNOW:PHY-THERMODYNAMICS'],
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
  }
];

export function getLearningPathById(id: string) {
  return learningPaths.find((path) => path.id === id) ?? null;
}
