import type { LearningPath } from '../learningPaths';

/**
 * SSF didactic drafts for the acid/base foundation chain.
 * Intentionally NOT registered until KG resolves SSF-KG-REQ-20260901-002-acid-base-foundations.md.
 * SSF owns didactics; KG owns canonical KD/CON/LRN identities.
 */
export const acidBaseFoundationDrafts: LearningPath[] = [
  {
    id: 'PATH:SSF:CHE-ACID-BASE-FOUNDATIONS-0001',
    title: 'Warum schmeckt Zitrone sauer – und Seife nicht?',
    subtitle: 'Ein Einstieg in Säuren und Basen über beobachtbare Eigenschaften, Teilchenmodell und Protonenübertragung.',
    status: 'prototype',
    sourceModuleId: 'DRAFT:SSF:CHE-ACID-BASE-FOUNDATIONS-0001',
    kxfModuleId: 'PENDING:KG:CHE-ACID-BASE-FOUNDATIONS-0001',
    domainsNeeded: [],
    suppliedBy: {
      knowledgeGraph: ['PENDING: SSF-KG-REQ-20260901-002-acid-base-foundations.md'],
      kueperCom: [],
      overtimeArchive: [],
      ssf: ['Didaktische Dramaturgie', 'Teilchenbild', 'Alltagsbeispiele', 'Verständnisfragen'],
    },
    unlocks: [],
    units: [
      {
        id: 'UNIT:CHE-ACIDBASE:QUESTION',
        title: 'Sauer und basisch sind mehr als Geschmackswörter',
        entryQuestion: 'Warum schmeckt Zitrone sauer – und warum fühlt sich Seifenlösung völlig anders an?',
        takeaway: 'Säuren können Protonen abgeben, Basen Protonen aufnehmen; in Wasser zeigt sich das unter anderem durch veränderte Konzentrationen von Oxonium- und Hydroxidionen.',
        sections: [
          {
            id: 'OBS:CHE-ACIDBASE:EVERYDAY',
            kind: 'observation',
            title: 'Zwei sehr unterschiedliche Alltagsstoffe',
            summary: 'Zitronensaft schmeckt sauer, Seifenlösung fühlt sich anders an und beide verändern Indikatorfarben. Die Unterschiede sind kein Etikett, sondern Ausdruck unterschiedlicher chemischer Teilchen und Reaktionen.',
            depthPoints: 4,
          },
          {
            id: 'EXPL:CHE-ACIDBASE:PROTON',
            kind: 'explanation',
            title: 'Das kleinste brauchbare Modell',
            summary: 'Im Brønsted-Modell ist eine Säure ein Protonendonator und eine Base ein Protonenakzeptor. In Wasser entstehen dadurch charakteristische Gleichgewichte; freie Protonen werden dabei nicht als isolierte H+-Teilchen behandelt, sondern sind an Wassermoleküle gebunden.',
            depthPoints: 8,
          },
          {
            id: 'EXAMPLE:CHE-ACIDBASE:WATER-SCHEMA',
            kind: 'example',
            title: 'Teilchenbild statt Etiketten',
            summary: 'Schema: Säure + H2O → konjugierte Base + H3O+. Für eine Base gilt entsprechend: Base + H2O ⇌ konjugierte Säure + OH−. Entscheidend ist die Protonenübertragung, nicht der Name des Haushaltsprodukts.',
            depthPoints: 8,
          },
          {
            id: 'EXPL:CHE-ACIDBASE:STRENGTH-AMOUNT',
            kind: 'explanation',
            title: 'Stärke und Menge nicht verwechseln',
            summary: 'Wie stark eine Säure oder Base reagiert und wie viel davon in einer Lösung vorhanden ist, sind verschiedene Fragen. Eine verdünnte starke Säure kann weniger Stoffmenge enthalten als eine konzentriertere schwache Säure.',
            depthPoints: 8,
          },
          {
            id: 'QUIZ:CHE-ACIDBASE:FOUNDATION',
            kind: 'quiz',
            title: 'Anwendung → Verständnis → Transfer',
            summary: 'Welche Rolle spielen Säure, Base und Wasser bei der Protonenübertragung, und warum reicht die Produktbezeichnung nicht aus?',
            depthPoints: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'PATH:SSF:CHE-PH-FOUNDATIONS-0001',
    title: 'Was bedeutet eigentlich pH 3 oder pH 10?',
    subtitle: 'Die pH-Skala nicht als Farbleiste, sondern als logarithmisches Maß für die Säurewirkung in wässrigen Lösungen verstehen.',
    status: 'prototype',
    sourceModuleId: 'DRAFT:SSF:CHE-PH-FOUNDATIONS-0001',
    kxfModuleId: 'PENDING:KG:CHE-PH-FOUNDATIONS-0001',
    domainsNeeded: [],
    suppliedBy: {
      knowledgeGraph: ['PENDING: SSF-KG-REQ-20260901-002-acid-base-foundations.md'],
      kueperCom: [],
      overtimeArchive: [],
      ssf: ['pH-Erklärung', 'logarithmischer Vergleich', 'pH-Erkundung', 'Verständnisfragen'],
    },
    unlocks: [],
    units: [
      {
        id: 'UNIT:CHE-PH:SCALE',
        title: 'Eine Zahl, die Zehnerpotenzen versteckt',
        entryQuestion: 'Ist pH 3 nur ein bisschen saurer als pH 4?',
        takeaway: 'Eine pH-Stufe entspricht bei idealisierter Betrachtung einem Faktor zehn in der Oxoniumionenaktivität; deshalb sind kleine Zahlendifferenzen chemisch groß.',
        sections: [
          {
            id: 'OBS:CHE-PH:NUMBERS',
            kind: 'observation',
            title: 'Die Zahlen sehen harmlos aus',
            summary: 'Zwischen pH 3 und pH 4 liegt auf der Skala nur eine Einheit. Trotzdem beschreibt diese Differenz keinen linearen Schritt wie auf einem Lineal.',
            depthPoints: 4,
          },
          {
            id: 'EXPL:CHE-PH:LOG',
            kind: 'explanation',
            title: 'Warum die Skala logarithmisch ist',
            summary: 'Der pH-Wert ist logarithmisch definiert. Für eine intuitive Foundation-Betrachtung genügt: eine Änderung um eine pH-Einheit entspricht ungefähr einem Faktor zehn bei der relevanten Oxoniumionenaktivität. Zwei Einheiten entsprechen etwa Faktor hundert.',
            depthPoints: 8,
          },
          {
            id: 'EXP:CHE-PH:SCALE',
            kind: 'experiment',
            title: 'pH-Skala erkunden',
            summary: 'Verschiebe den pH-Wert und beobachte zugleich den linearen Skalenwert und die zugehörige Größenordnung der Oxoniumionenaktivität. Ziel ist nicht Farbspiel, sondern das Verständnis des logarithmischen Maßstabs.',
            interactive: true,
            depthPoints: 10,
          },
          {
            id: 'EXPL:CHE-PH:CONTEXT',
            kind: 'explanation',
            title: 'pH ist kein universelles Etikett für jeden Stoff',
            summary: 'pH ist für wässrige Systeme definiert und hängt von Bedingungen wie Temperatur, Zusammensetzung und Messmethode ab. Eine einzelne pH-Zahl ersetzt daher nicht die Beschreibung einer Lösung.',
            depthPoints: 8,
          },
          {
            id: 'QUIZ:CHE-PH:FOUNDATION',
            kind: 'quiz',
            title: 'Anwendung → Verständnis → Transfer',
            summary: 'pH-Differenzen als Größenordnungen deuten und erkennen, wann eine pH-Angabe überhaupt sinnvoll ist.',
            depthPoints: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'PATH:SSF:CHE-NEUTRALISATION-FOUNDATIONS-0001',
    title: 'Was passiert, wenn Säure und Base aufeinandertreffen?',
    subtitle: 'Neutralisation als Stoffmengen- und Reaktionsproblem verstehen – nicht als magisches „pH 7 entsteht immer“.',
    status: 'prototype',
    sourceModuleId: 'DRAFT:SSF:CHE-NEUTRALISATION-FOUNDATIONS-0001',
    kxfModuleId: 'PENDING:KG:CHE-NEUTRALISATION-FOUNDATIONS-0001',
    domainsNeeded: [],
    suppliedBy: {
      knowledgeGraph: ['PENDING: SSF-KG-REQ-20260901-002-acid-base-foundations.md'],
      kueperCom: [],
      overtimeArchive: [],
      ssf: ['Neutralisationsmodell', 'Stoffmengen-Erkundung', 'Carbonat-Transfer', 'Verständnisfragen'],
    },
    unlocks: [],
    units: [
      {
        id: 'UNIT:CHE-NEUTRAL:REACTION',
        title: 'Nicht zwei Etiketten, sondern Teilchen reagieren',
        entryQuestion: 'Wenn man gleich viel Säure und Base mischt – ist die Lösung danach automatisch neutral?',
        takeaway: 'Neutralisation hängt von reagierenden Teilchen und Stoffmengen ab; gleiche Volumina bedeuten nicht automatisch gleiche Stoffmengen oder pH 7.',
        sections: [
          {
            id: 'OBS:CHE-NEUTRAL:MIX',
            kind: 'observation',
            title: '„Gleich viel“ ist chemisch mehrdeutig',
            summary: '50 mL Säure und 50 mL Base sind gleiche Volumina. Ob sie sich stöchiometrisch ausgleichen, hängt aber zusätzlich von Konzentration und Reaktionsgleichung ab.',
            depthPoints: 4,
          },
          {
            id: 'EXPL:CHE-NEUTRAL:IONIC',
            kind: 'explanation',
            title: 'Der Kern der Reaktion',
            summary: 'Für starke Säure/Base-Paare lässt sich der Kern vereinfacht als H3O+ + OH− → 2 H2O beschreiben. Welche Ionen danach in Lösung verbleiben, hängt von den Ausgangsstoffen und Mengen ab.',
            depthPoints: 8,
          },
          {
            id: 'EXP:CHE-NEUTRAL:STOICHIOMETRY',
            kind: 'experiment',
            title: 'Stoffmengen statt Volumen vergleichen',
            summary: 'Verändere Konzentration und Volumen von Säure und Base. Die Darstellung zeigt, welcher Reaktionspartner im Überschuss bleibt. Es wird ausdrücklich nicht behauptet, dass jede Neutralisation bei pH 7 endet.',
            interactive: true,
            depthPoints: 10,
          },
          {
            id: 'EXAMPLE:CHE-NEUTRAL:CARBONATE',
            kind: 'example',
            title: 'Warum Kalk mit Säure Bläschen bildet',
            summary: 'Carbonat ist ein eigener Reaktionsfall: Säure protoniert Carbonat/Hydrogencarbonat; dabei kann CO2 entstehen. Das erklärt die Gasentwicklung beim Entkalken besser als die bloße Aussage „Säure löst Kalk“.',
            depthPoints: 8,
          },
          {
            id: 'QUIZ:CHE-NEUTRAL:FOUNDATION',
            kind: 'quiz',
            title: 'Anwendung → Verständnis → Transfer',
            summary: 'Aus Volumen und Konzentration qualitativ auf Überschuss schließen und den Carbonat-Fall vom einfachen Säure/Base-Schema unterscheiden.',
            depthPoints: 10,
          },
        ],
      },
    ],
  },
];
