import type { LearningPath } from '../learningPaths';

export const caramelizationLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
  title: 'Wann wird Zucker zu Karamell?',
  subtitle: 'Warum Temperatur allein nicht reicht: Kristallstruktur, Zersetzung und Bräunung als unterschiedliche thermische Vorgänge.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2001',
  kxfModuleId: 'LRN:SSF:CHE-2001',
  domainsNeeded: ['KD:CHE-FOOD-THERMAL:N2'],
  suppliedBy: {
    knowledgeGraph: [
      'CON:CHE:sugar-crystal-structure-loss',
      'CON:CHE:thermal-decomposition',
      'CON:CHE:caramelization',
      'CON:CHE:thermal-process-kinetics',
      'CON:CHE:matrix-water-dependence',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Temperatur-Zeit-Erkundung', 'Kontextualisierte DSC-Beispiele', 'Transfer auf unterschiedliche Zucker und Küchenmatrizen'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:CHE-KARAMELL:EVENTS',
      title: 'Drei Dinge, die beim Erhitzen nicht dasselbe sind',
      entryQuestion: 'Wenn Zucker beim Erhitzen seine Struktur verliert, ist er dann automatisch schon karamellisiert?',
      takeaway: 'Kristallstrukturverlust, thermische Zersetzung und Karamellisierungs-/Bräunungsreaktionen sind unterschiedliche Vorgänge.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:CHE-KARAMELL:KINETICS' },
      sections: [
        { id: 'OBS:CHE-KARAMELL:KITCHEN', kind: 'observation', title: 'Beobachtung', summary: 'In Rezepten tauchen oft einzelne Temperaturwerte auf. In Messdaten verschieben sich thermische Ereignisse jedoch mit Probe und Heizrate. Was misst eine solche Zahl eigentlich?', depthPoints: 4 },
        { id: 'EXPL:CHE-KARAMELL:THREE-EVENTS', kind: 'explanation', title: 'Erst das Ereignis benennen', summary: 'Ein DSC-Ereignis beim Verlust kristalliner Struktur ist nicht automatisch ein universeller Schmelzpunkt und nicht automatisch die Temperatur, bei der Karamellisierung einsetzt. Thermische Zersetzung und sichtbare Bräunung müssen davon getrennt betrachtet werden.', depthPoints: 8 },
        { id: 'EXP:KARAMELL-TEMP', kind: 'experiment', title: 'Temperatur × Zeit', summary: 'Verändere Temperatur und Zeit gemeinsam. Die Simulation zeigt qualitativ, dass Reaktionsfortschritt von beiden Größen abhängt und keine magische 160-°C-Grenze existiert.', interactive: true, depthPoints: 9 },
        { id: 'EXPL:CHE-KARAMELL:DSC-CONTEXT', kind: 'explanation', title: 'Messwerte brauchen Kontext', summary: 'Bei 1 °C/min wurden für konkrete Proben ungefähr 112,7 °C (β-D-Fructopyranose), 146,5 °C (α-D-Glucopyranose) und 184,5 °C (D-Saccharose) als DSC-Onsets berichtet. Bei anderer Heizrate verschieben sich die Werte; sie sind keine universellen Karamellisierungstemperaturen.', depthPoints: 8 },
        { id: 'QUIZ:CHE-KARAMELL:EVENTS', kind: 'quiz', title: 'Kurztest', summary: 'Anwendung → Verständnis → Transfer: Messereignis, Zersetzung und Bräunung korrekt auseinanderhalten.', depthPoints: 10 },
      ],
    },
    {
      id: 'UNIT:CHE-KARAMELL:KINETICS',
      title: 'Warum Zeit und Matrix mitentscheiden',
      entryQuestion: 'Warum kann derselbe Zucker bei ähnlicher Temperatur je nach Zeit, Wassergehalt und Umgebung anders reagieren?',
      takeaway: 'Thermische Lebensmittelchemie ist kinetisch und matrixabhängig: Temperatur beschleunigt Prozesse, aber Zeit, Wassergehalt, Zuckerform und Umgebung bestimmen mit.',
      sections: [
        { id: 'OBS:CHE-KARAMELL:TIME', kind: 'observation', title: 'Beobachtung', summary: 'Kurzes starkes Erhitzen und längeres moderates Erhitzen können sichtbar unterschiedliche Ergebnisse liefern. Eine Temperaturangabe ohne Zeit beschreibt den Prozess deshalb unvollständig.', depthPoints: 4 },
        { id: 'EXPL:CHE-KARAMELL:KINETICS', kind: 'explanation', title: 'Reaktionsgeschwindigkeit statt Schalter', summary: 'Karamellisierungs- und Bräunungsreaktionen laufen mit temperaturabhängiger Geschwindigkeit ab. Eine feste Regel „darunter nichts, darüber Karamell“ ist daher kein geeignetes Realweltmodell.', depthPoints: 8 },
        { id: 'EXP:ZUCKERARTEN', kind: 'experiment', title: 'Zucker unter gleichen Bedingungen vergleichen', summary: 'Vergleiche Fructose, Glucose und Saccharose bei gleicher Temperatur und Zeit. Die Anzeige vermittelt qualitative Unterschiede, ohne universelle Einzeltemperaturen zu erfinden.', interactive: true, depthPoints: 9 },
        { id: 'EXPL:CHE-KARAMELL:MATRIX', kind: 'explanation', title: 'Wasser und Matrix', summary: 'Wassergehalt und Lebensmittelmatrix verändern Wärmeübertragung, Konzentration und Reaktionspfade. Deshalb ist eine Messung an reiner Zuckerprobe nicht automatisch eine Rezeptregel.', depthPoints: 8 },
        { id: 'QUIZ:CHE-KARAMELL:KINETICS', kind: 'quiz', title: 'Kurztest', summary: 'Anwendung → Verständnis → Transfer: aus Temperatur, Zeit und Matrix eine begründete qualitative Erwartung ableiten.', depthPoints: 10 },
      ],
    },
  ],
};
