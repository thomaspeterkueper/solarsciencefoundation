import type { LearningPath } from '../learningPaths';

/** Application path built on the KG-governed acid/base foundation chain. */
export const limescaleCleaningLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-REINIGUNG-KALK-0001',
  title: 'Warum greift Essig Kalk an – aber nicht Fett?',
  subtitle: 'Carbonatchemie als Anwendung von Säure/Base, pH und Neutralisation: vom Kalkbelag bis zur CO₂-Entwicklung.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2002',
  kxfModuleId: 'LRN:SSF:CHE-2002',
  domainsNeeded: ['KD:CHM-ACID-BASE:N2', 'KD:CHM-CARBONATE:N2'],
  suppliedBy: {
    knowledgeGraph: [
      'KD:CHM-ACID-BASE:N2', 'KD:CHM-CARBONATE:N2',
      'CHM-L1-000001', 'CHM-L1-000002', 'CHM-L1-000003',
      'CON:CHM:carbonate-acid-reaction', 'CON:CHM:calcium-carbonate-acid-reaction',
    ],
    kueperCom: [], overtimeArchive: [],
    ssf: ['Kalk-Anwendungsdramaturgie', 'Carbonat-Reaktionsschema', 'Materialtransfer', 'Verständnisfragen'],
  },
  unlocks: ['TOOL:DESCALER'],
  units: [
    {
      id: 'UNIT:KALK:IDENTIFY',
      title: 'Erst klären, was der Belag ist',
      entryQuestion: 'Warum kann Essig einen weißen Kalkbelag lösen, während er gegen einen Fettfilm kaum die richtige Chemie mitbringt?',
      takeaway: 'Reinigungsmittel wirken nicht gegen „Schmutz“ allgemein. Entscheidend ist, aus welchem Material der Belag besteht und welche Reaktion oder Wechselwirkung möglich ist.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KALK:ACID-REACTION' },
      sections: [
        { id: 'OBS:KALK:TWO-STAINS', kind: 'observation', title: 'Zwei Beläge, zwei chemische Probleme', summary: 'Auf einer Oberfläche liegen ein mineralischer Kalkbelag und daneben ein Fettfilm. Dass beide sichtbar verschmutzen, macht sie chemisch noch nicht ähnlich.', depthPoints: 4 },
        { id: 'EXPL:KALK:CARBONATE', kind: 'explanation', title: 'Kalk als Carbonatproblem', summary: 'Typische Kalkablagerungen enthalten Calciumcarbonat. Für das Entkalken ist deshalb Carbonatchemie relevant. Die zuvor gelernten Säure/Base-Grundlagen liefern das Modell für die Protonenübertragung.', depthPoints: 7 },
        { id: 'EXAMPLE:KALK:FAT-CONTRAST', kind: 'example', title: 'Warum Fett ein anderer Fall ist', summary: 'Ein Fettfilm ist kein Carbonat. Eine Säure-Carbonat-Reaktion erklärt daher nicht seine Entfernung. Für Fett sind unter anderem Polarität und Tenside der passendere Lernpfad.', depthPoints: 6 },
        { id: 'QUIZ:KALK:IDENTIFY', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Belag anhand des Materials einordnen und entscheiden, ob Säure-Carbonat-Chemie überhaupt das passende Modell ist.', depthPoints: 10 },
      ],
    },
    {
      id: 'UNIT:KALK:ACID-REACTION',
      title: 'Warum beim Entkalken Bläschen entstehen',
      entryQuestion: 'Woher kommt das Gas, wenn Säure auf Calciumcarbonat trifft?',
      takeaway: 'Säure protoniert Carbonat schrittweise; über Kohlensäure entsteht schließlich CO₂ und Wasser, während Calcium in Lösung übergehen kann.',
      sections: [
        { id: 'OBS:KALK:BUBBLES', kind: 'observation', title: 'Die Bläschen sind Reaktionsprodukt', summary: 'Beim Kontakt eines geeigneten sauren Entkalkers mit Calciumcarbonat kann Gasentwicklung sichtbar werden. Die Blasen sind ein Hinweis auf die Carbonat-Säure-Reaktion.', depthPoints: 4 },
        { id: 'EXPL:KALK:REACTION', kind: 'explanation', title: 'Vom Carbonat zum Kohlendioxid', summary: 'Vereinfacht wird Carbonat durch Protonen zunächst zu Hydrogencarbonat und weiter zu Kohlensäure protoniert; diese steht mit CO₂ und Wasser im Zusammenhang. Für Calciumcarbonat lässt sich die Nettoreaktion als CaCO₃ + 2 H⁺ → Ca²⁺ + CO₂ + H₂O schreiben.', depthPoints: 9 },
        { id: 'EXAMPLE:KALK:PARTICLES', kind: 'example', title: 'Reaktionsschema statt fachfremdem Slider', summary: 'Teilchenbild: Protonen werden an Carbonatspezies übertragen, Calciumcarbonat wird verbraucht und CO₂ verlässt die Flüssigkeit als Gas. Das ist eine Carbonatreaktion und nicht identisch mit der einfachen H₃O⁺/OH⁻-Neutralisation.', depthPoints: 8 },
        { id: 'EXPL:KALK:RATE', kind: 'explanation', title: 'Wirksamkeit ist mehr als eine einzelne pH-Zahl', summary: 'Wie schnell ein Belag verschwindet, hängt nicht allein vom pH ab. Unter anderem Säureart und -menge, Konzentration, Oberfläche, Durchmischung, Temperatur und Belagstruktur beeinflussen den Verlauf. Eine universelle Auflösungsrate wird deshalb nicht behauptet.', depthPoints: 8 },
        { id: 'QUIZ:KALK:REACTION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'CO₂-Entwicklung erklären, Neutralisation und Carbonatreaktion unterscheiden und erkennen, warum pH allein keine vollständige Reinigungsanweisung ist.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:KALK:MATERIAL',
      title: 'Entkalken heißt auch Material prüfen',
      entryQuestion: 'Wenn Säure Kalk löst: Was passiert auf einer Oberfläche, die selbst Carbonat enthält?',
      takeaway: 'Ein wirksamer Entkalker kann zugleich ein ungeeignetes Mittel für das Bauteil sein. Material, Oberfläche, Konzentration und Einwirkzeit gehören zur Entscheidung.',
      sections: [
        { id: 'EXAMPLE:KALK:MARBLE', kind: 'example', title: 'Marmor zeigt die Grenze der Idee', summary: 'Carbonathaltige Natursteine können selbst mit Säure reagieren. „Säure löst Kalk“ ist daher kein allgemeiner Reinigungstipp, sondern eine chemische Aussage, die mit dem Material der Oberfläche abgeglichen werden muss.', depthPoints: 7 },
        { id: 'EXPL:KALK:SURFACE', kind: 'explanation', title: 'Material + Oberfläche + Stoff + Bedingungen', summary: 'Ob eine Behandlung geeignet ist, hängt vom konkreten Werkstoff und seiner Oberfläche sowie vom eingesetzten Stoff, dessen Konzentration und Einwirkzeit ab. Produkt- und Materialfreigaben haben Vorrang vor einer vereinfachten Schulreaktion.', depthPoints: 8 },
        { id: 'QUIZ:KALK:MATERIAL', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Für neue Oberflächen entscheiden, welche Information vor dem Einsatz eines sauren Entkalkers noch fehlt.', depthPoints: 12 },
      ],
    },
  ],
};
