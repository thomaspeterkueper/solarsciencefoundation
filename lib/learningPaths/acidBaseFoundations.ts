import type { LearningPath } from '../learningPaths';

/**
 * SSF didactic implementation of the KG-governed acid/base foundation chain.
 * Canon: kueper-knowledge-graph/exports/chemistry-acid-base-0.1.json
 * SSF owns didactics; KG owns canonical KD/CON/LearningModule identities and prerequisites.
 */
export const acidBaseFoundationLearningPaths: LearningPath[] = [
  {
    id: 'PATH:SSF:CHE-ACID-BASE-FOUNDATIONS-0001',
    title: 'Warum schmeckt Zitrone sauer – und Seife nicht?',
    subtitle: 'Ein Einstieg in Säuren und Basen über beobachtbare Eigenschaften, Teilchenmodell und Protonenübertragung.',
    status: 'prototype',
    sourceModuleId: 'CHM-L1-000001',
    kxfModuleId: 'LRN:SSF:CHM-ACID-BASE-FOUND-0001',
    domainsNeeded: ['KD:CHM-ACID-BASE:N2'],
    suppliedBy: {
      knowledgeGraph: ['CHM-L1-000001', 'CON:CHM:bronsted-acid-base', 'CON:CHM:hydronium-hydroxide'],
      kueperCom: [], overtimeArchive: [],
      ssf: ['Didaktische Dramaturgie', 'Teilchenbild', 'Alltagsbeispiele', 'Verständnisfragen'],
    },
    unlocks: [],
    units: [{
      id: 'UNIT:CHE-ACIDBASE:QUESTION', title: 'Sauer und basisch sind mehr als Geschmackswörter',
      entryQuestion: 'Warum schmeckt Zitrone sauer – und warum fühlt sich Seifenlösung völlig anders an?',
      takeaway: 'Im Brønsted-Modell geben Säuren Protonen ab und Basen nehmen Protonen auf; in Wasser spielen dabei unter anderem Oxonium- und Hydroxidionen eine zentrale Rolle.',
      sections: [
        { id: 'OBS:CHE-ACIDBASE:EVERYDAY', kind: 'observation', title: 'Zwei sehr unterschiedliche Alltagsstoffe', summary: 'Zitronensaft schmeckt sauer, Seifenlösung fühlt sich anders an und beide verändern Indikatorfarben. Die Unterschiede sind Ausdruck unterschiedlicher chemischer Teilchen und Reaktionen.', depthPoints: 4 },
        { id: 'EXPL:CHE-ACIDBASE:PROTON', kind: 'explanation', title: 'Das kleinste brauchbare Modell', summary: 'Im Brønsted-Modell ist eine Säure ein Protonendonator und eine Base ein Protonenakzeptor. In Wasser werden Protonen nicht als dauerhaft isolierte H+-Teilchen betrachtet, sondern sind an Wassermoleküle gebunden.', depthPoints: 8 },
        { id: 'EXAMPLE:CHE-ACIDBASE:WATER-SCHEMA', kind: 'example', title: 'Teilchenbild statt Etiketten', summary: 'Schema: Säure + H2O → konjugierte Base + H3O+. Für eine Base in Wasser kann entsprechend OH− entstehen. Entscheidend ist die Protonenübertragung, nicht der Name des Haushaltsprodukts.', depthPoints: 8 },
        { id: 'EXPL:CHE-ACIDBASE:STRENGTH-AMOUNT', kind: 'explanation', title: 'Stärke und Menge nicht verwechseln', summary: 'Wie stark eine Säure oder Base reagiert und wie viel davon in einer Lösung vorhanden ist, sind verschiedene Fragen. Diese Unterscheidung wird später für pH und Neutralisation wichtig.', depthPoints: 8 },
        { id: 'QUIZ:CHE-ACIDBASE:FOUNDATION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Welche Rolle spielen Säure, Base und Wasser bei der Protonenübertragung, und warum reicht die Produktbezeichnung nicht aus?', depthPoints: 10 },
      ],
    }],
  },
  {
    id: 'PATH:SSF:CHE-PH-FOUNDATIONS-0001',
    title: 'Was bedeutet eigentlich pH 3 oder pH 10?',
    subtitle: 'Die pH-Skala als logarithmisches Maß für wässrige Systeme verstehen – nicht nur als Farbleiste.',
    status: 'prototype',
    sourceModuleId: 'CHM-L1-000002',
    kxfModuleId: 'LRN:SSF:CHM-PH-FOUND-0001',
    domainsNeeded: ['KD:CHM-ACID-BASE:N2'],
    suppliedBy: { knowledgeGraph: ['CHM-L1-000002', 'CON:CHM:ph-scale', 'requires CHM-L1-000001'], kueperCom: [], overtimeArchive: [], ssf: ['pH-Erklärung', 'logarithmischer Vergleich', 'pH-Erkundung', 'Verständnisfragen'] },
    unlocks: [],
    units: [{
      id: 'UNIT:CHE-PH:SCALE', title: 'Eine Zahl, die Zehnerpotenzen versteckt', entryQuestion: 'Ist pH 3 nur ein bisschen saurer als pH 4?',
      takeaway: 'Die pH-Skala ist logarithmisch; eine Differenz von einer pH-Einheit entspricht einer Größenordnung in der Wasserstoffionenaktivität.',
      sections: [
        { id: 'OBS:CHE-PH:NUMBERS', kind: 'observation', title: 'Die Zahlen sehen harmlos aus', summary: 'Zwischen pH 3 und pH 4 liegt auf der Skala nur eine Einheit. Trotzdem beschreibt diese Differenz keinen linearen Schritt wie auf einem Lineal.', depthPoints: 4 },
        { id: 'EXPL:CHE-PH:LOG', kind: 'explanation', title: 'Warum die Skala logarithmisch ist', summary: 'Der pH-Wert ist ein logarithmisches Maß für die Aktivität von Wasserstoffionen in wässrigen Systemen. Auf Foundation-Level kann die Größenordnung näherungsweise über die H3O+-Konzentration veranschaulicht werden: eine pH-Einheit entspricht einem Faktor zehn.', depthPoints: 8 },
        { id: 'EXP:CHE-PH:SCALE', kind: 'experiment', title: 'pH-Skala erkunden', summary: 'Verschiebe den pH-Wert und beobachte zugleich den Skalenwert und die zugehörige Größenordnung der näherungsweise dargestellten H3O+-Konzentration. Ziel ist das Verständnis des logarithmischen Maßstabs.', interactive: true, depthPoints: 10 },
        { id: 'EXPL:CHE-PH:CONTEXT', kind: 'explanation', title: 'pH ist kein universelles Etikett für jeden Stoff', summary: 'pH beschreibt wässrige Systeme und hängt von den Bedingungen ab. Eine einzelne pH-Zahl ersetzt deshalb nicht die Beschreibung der Lösung.', depthPoints: 8 },
        { id: 'QUIZ:CHE-PH:FOUNDATION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'pH-Differenzen als Größenordnungen deuten und erkennen, wann eine pH-Angabe sinnvoll ist.', depthPoints: 10 },
      ],
    }],
  },
  {
    id: 'PATH:SSF:CHE-NEUTRALISATION-FOUNDATIONS-0001',
    title: 'Was passiert, wenn Säure und Base aufeinandertreffen?',
    subtitle: 'Neutralisation als Stoffmengen- und Reaktionsproblem verstehen – nicht als magisches „pH 7 entsteht immer“.',
    status: 'prototype',
    sourceModuleId: 'CHM-L1-000003',
    kxfModuleId: 'LRN:SSF:CHM-NEUTRALIZATION-FOUND-0001',
    domainsNeeded: ['KD:CHM-ACID-BASE:N2'],
    suppliedBy: { knowledgeGraph: ['CHM-L1-000003', 'CON:CHM:neutralization', 'CON:CHM:acid-base-stoichiometry', 'requires CHM-L1-000001 + CHM-L1-000002'], kueperCom: [], overtimeArchive: [], ssf: ['Neutralisationsmodell', 'Stoffmengen-Erkundung', 'Carbonat-Transfer', 'Verständnisfragen'] },
    unlocks: [],
    units: [{
      id: 'UNIT:CHE-NEUTRAL:REACTION', title: 'Nicht zwei Etiketten, sondern Teilchen reagieren', entryQuestion: 'Wenn man gleich viel Säure und Base mischt – ist die Lösung danach automatisch neutral?',
      takeaway: 'Neutralisation hängt von reagierenden Teilchen und Stoffmengen ab; gleiche Volumina bedeuten nicht automatisch gleiche Stoffmengen oder pH 7.',
      sections: [
        { id: 'OBS:CHE-NEUTRAL:MIX', kind: 'observation', title: '„Gleich viel“ ist chemisch mehrdeutig', summary: '50 mL Säure und 50 mL Base sind gleiche Volumina. Ob sie sich stöchiometrisch ausgleichen, hängt zusätzlich von Konzentration und Reaktionsgleichung ab.', depthPoints: 4 },
        { id: 'EXPL:CHE-NEUTRAL:IONIC', kind: 'explanation', title: 'Der Kern der Reaktion', summary: 'Für starke Säure/Base-Paare lässt sich der Kern vereinfacht als H3O+ + OH− → 2 H2O beschreiben. Welche Teilchen danach in Lösung verbleiben, hängt von Ausgangsstoffen und Stoffmengen ab.', depthPoints: 8 },
        { id: 'EXP:CHE-NEUTRAL:STOICHIOMETRY', kind: 'experiment', title: 'Stoffmengen statt Volumen vergleichen', summary: 'Verändere Konzentration und Volumen von Säure und Base. Die Darstellung zeigt, welcher Reaktionspartner im vereinfachten 1:1-Modell im Überschuss bleibt. Es wird nicht behauptet, dass jede Neutralisation bei pH 7 endet.', interactive: true, depthPoints: 10 },
        { id: 'EXAMPLE:CHE-NEUTRAL:CARBONATE', kind: 'example', title: 'Der nächste Fall: Warum Kalk mit Säure Bläschen bildet', summary: 'Carbonat + Säure ist eine anschließende Anwendung: Protonierung von Carbonat/Hydrogencarbonat kann CO2 freisetzen. Der kanonische Kalkpfad vertieft diesen eigenen Carbonat-Fall.', depthPoints: 8 },
        { id: 'QUIZ:CHE-NEUTRAL:FOUNDATION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Aus Volumen und Konzentration qualitativ auf Überschuss schließen und den Carbonat-Fall als anschließende Anwendung erkennen.', depthPoints: 10 },
      ],
    }],
  },
];
