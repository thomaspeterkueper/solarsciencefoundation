import type { LearningPath } from '../learningPaths';

/**
 * SSF learning journey: Maillard reaction.
 * Didactic order follows docs/SSF-DIDAKTIK.md:
 * observation → experiment → explanation → connection → application → quiz.
 */
export const maillardLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-KUECHE-MAILLARD-0001',
  title: 'Warum wird Fleisch braun beim Braten',
  subtitle: 'Von der goldbraunen Kruste zum Geschmack: Entdecke, wie Hitze aus Aminosäuren und Zuckern neue Farben und Aromen entstehen lässt.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-1001',
  kxfModuleId: 'LRN:SSF:CHE-1001',
  domainsNeeded: ['KNOW:CHE-REACTIONS', 'KNOW:CHE-ORGANIC', 'KNOW:PHY-THERMODYNAMICS'],
  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Temperatur-Labor: sichtbare Reaktionsgeschwindigkeit statt harter Temperaturschwelle',
      'Zeit- und Feuchtigkeitsvergleich: warum eine trockene Oberfläche besser bräunt',
      'pH-Labor: saure Bedingungen bremsen, alkalische Bedingungen beschleunigen',
      'Vergleich Maillard-Reaktion und Karamellisierung',
      'Alltagstransfer: Bräunung bei Brot, Kartoffeln, Kaffee, Gebäck und Fleisch beobachten'
    ]
  },
  unlocks: ['TOOL:MAILLARD', 'SENSE:UMAMI'],
  units: [
    {
      id: 'UNIT:KUECHE-MAILLARD-K1',
      title: 'Die goldbraune Kruste',
      entryQuestion: 'Warum wird ein Stück Fleisch beim Braten braun — und warum schmeckt es dann anders?',
      takeaway: 'Beim Erhitzen reagieren Aminosäuren und reduzierende Zucker miteinander. Je wärmer und trockener die Oberfläche ist, desto schneller entstehen braune Farbstoffe und neue Aromen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-MAILLARD-K2' },
      sections: [
        {
          id: 'OBS:MAILLARD-BROT',
          kind: 'observation',
          title: 'Beobachtung: Brot im Toaster',
          summary: 'Eine Scheibe Brot wird von blass zu goldbraun und schließlich dunkel. Ähnliches geschieht beim Braten von Fleisch, Rösten von Kaffee und Backen von Keksen. Die Hitze verändert nicht nur die Farbe — auch der Geruch wird neu.',
          depthPoints: 4,
        },
        {
          id: 'EXP:MAILLARD-TEMP',
          kind: 'experiment',
          title: 'Experiment: Temperatur und Reaktionsgeschwindigkeit',
          summary: 'Verändere die Oberflächentemperatur. Die Reaktion beginnt nicht plötzlich bei einer einzigen Zahl: Sie läuft bei niedriger Temperatur langsam und wird ab ungefähr 140 °C für viele Lebensmittel deutlich sichtbar.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXP:MAILLARD-TIME',
          kind: 'experiment',
          title: 'Experiment: Zeit und Bräunung',
          summary: 'Beobachte, wie sich eine Oberfläche bei gleicher Temperatur mit der Zeit verändert: zuerst kaum sichtbar, dann goldbraun, später dunkel und schließlich bitter-verbrannt.',
          interactive: true,
          depthPoints: 6,
        },
        {
          id: 'EXP:MAILLARD-PH',
          kind: 'experiment',
          title: 'Experiment: Die Rolle des pH-Werts',
          summary: 'Saure Bedingungen bremsen die Maillard-Reaktion, alkalische Bedingungen beschleunigen sie. Darum bräunt Laugengebäck besonders kräftig. Zitronensaft beeinflusst zusätzlich die Oberflächenfeuchtigkeit.',
          interactive: true,
          depthPoints: 6,
        },
        {
          id: 'EXPL:MAILLARD-K1',
          kind: 'explanation',
          title: 'Was hier chemisch geschieht',
          summary: 'Aminosäuren aus Proteinen treffen auf reduzierende Zucker. Über viele Zwischenschritte entstehen Melanoidine als braune Farbstoffe und zahlreiche flüchtige Aromamoleküle. Die Farbe ist das sichtbare Zeichen eines ganzen Reaktionsnetzes.',
          depthPoints: 6,
        },
        {
          id: 'BRANCH:MAILLARD-VERBINDUNGEN-K1',
          kind: 'branch',
          title: 'Verbindungen: Wärme, Wasser und Reaktionsgeschwindigkeit',
          summary: 'Dieser Zusammenhang führt zu Lernreisen über Wärmeübertragung, Siedepunkt und Verdunstung. Solange viel Wasser an der Oberfläche verdampft, bleibt ihre Temperatur nahe dem Siedepunkt — kräftige Bräunung beginnt erst danach.',
          optional: true,
          depthPoints: 5,
        },
        {
          id: 'QUIZ:MAILLARD-K1',
          kind: 'quiz',
          title: 'Quiz: Die Maillard-Reaktion',
          summary: 'Prüfe, warum Temperatur, trockene Oberfläche und pH-Wert die sichtbare Bräunung beeinflussen.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-MAILLARD-K2',
      title: 'Geschmack aus der Pfanne',
      entryQuestion: 'Warum schmeckt gebratenes Fleisch anders als gekochtes — obwohl es dasselbe Stück ist?',
      takeaway: 'Wasser begrenzt die Temperatur einer nassen Oberfläche zunächst auf ungefähr 100 °C. In der trockenen heißen Pfanne kann die Oberfläche deutlich wärmer werden — und das Reaktionsnetz der Maillard-Reaktion erzeugt neue Röstaromen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-MAILLARD-K3' },
      sections: [
        {
          id: 'OBS:MAILLARD-VERGLEICH',
          kind: 'observation',
          title: 'Beobachtung: Gekocht oder gebraten',
          summary: 'Ein Stück Fleisch im Wasser bleibt außen blass. Dasselbe Stück in einer heißen Pfanne bildet eine braune Kruste und riecht kräftiger. Nicht das Lebensmittel ist anders — sondern die Bedingungen an seiner Oberfläche.',
          depthPoints: 4,
        },
        {
          id: 'EXP:MAILLARD-AROMA',
          kind: 'experiment',
          title: 'Experiment: Aromaprofil',
          summary: 'Verändere Temperatur, Zeit und Feuchtigkeit. Das Modell zeigt, wann die Oberfläche noch dämpft, wann kräftige Röstaromen entstehen und wann Bitterkeit durch Überhitzung zunimmt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXAMPLE:MAILLARD-ALLTAG',
          kind: 'example',
          title: 'Dasselbe Prinzip in vielen Lebensmitteln',
          summary: 'Geröstete Nüsse, Brotkruste, Pommes, gebratene Pilze, Kaffee und Kekse nutzen dasselbe Grundprinzip. Welche Aromen entstehen, hängt von den vorhandenen Aminosäuren, Zuckern, der Temperatur und der Zeit ab.',
          depthPoints: 5,
        },
        {
          id: 'QUIZ:MAILLARD-K2',
          kind: 'quiz',
          title: 'Quiz: Aroma und Kochmethode',
          summary: 'Prüfe, warum Kochen und Braten bei demselben Lebensmittel unterschiedliche Oberflächen und Aromen erzeugen.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-MAILLARD-K3',
      title: 'Maillard oder Karamell?',
      entryQuestion: 'Warum wird ein Keks anders braun als geschmolzener Zucker?',
      takeaway: 'Karamellisierung ist die thermische Umwandlung von Zucker allein. Die Maillard-Reaktion braucht Zucker und Aminosäuren. Beide erzeugen Bräunung und Aromen — aber über verschiedene Reaktionswege.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KUECHE-MAILLARD-K4' },
      sections: [
        {
          id: 'OBS:MAILLARD-ZUTATEN',
          kind: 'observation',
          title: 'Beobachtung: Keks und Zucker',
          summary: 'Ein Keks wird goldbraun. Reiner Zucker wird beim Erhitzen ebenfalls braun, riecht und schmeckt aber anders. Die sichtbare Farbe ähnelt sich — die Chemie dahinter nicht.',
          depthPoints: 4,
        },
        {
          id: 'EXP:MAILLARD-REAKTANTEN',
          kind: 'experiment',
          title: 'Experiment: Welche Zutaten sind vorhanden?',
          summary: 'Verändere den Anteil von Zucker und Aminosäuren. Zucker allein führt zur Karamellisierung; zusammen mit Aminosäuren öffnet sich das Reaktionsnetz der Maillard-Reaktion. Ohne geeigneten Zucker bleibt die Bräunung schwach.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'BRANCH:KARAMELL-PFAD',
          kind: 'branch',
          title: 'Weiter entdecken: Warum karamellisiert Zucker?',
          summary: 'Die vorhandene Lernreise zur Karamellisierung zeigt, wie Zucker ohne Proteine braun wird und warum verschiedene Zuckerarten unterschiedliche Temperaturbereiche besitzen.',
          optional: true,
          depthPoints: 6,
        },
        {
          id: 'QUIZ:MAILLARD-K3',
          kind: 'quiz',
          title: 'Quiz: Maillard und Karamellisierung',
          summary: 'Prüfe, welche Ausgangsstoffe beide Reaktionsarten benötigen und warum ihre Aromen nicht identisch sind.',
          depthPoints: 12,
        },
      ],
    },
    {
      id: 'UNIT:KUECHE-MAILLARD-K4',
      title: 'In der Küche anwenden',
      entryQuestion: 'Warum wird eine nasse Oberfläche in der Pfanne zunächst nicht richtig braun?',
      takeaway: 'Für kräftige Bräunung braucht die Oberfläche Wärme, Zeit und wenig freies Wasser. Trockentupfen, ausreichend heiße Pfanne und Platz zwischen den Stücken helfen — ohne dass eine einzige Temperatur für jedes Lebensmittel perfekt wäre.',
      sections: [
        {
          id: 'OBS:STEAK-PERFEKT',
          kind: 'observation',
          title: 'Beobachtung: Wasser in der Pfanne',
          summary: 'Liegt zu viel nasses Gargut dicht nebeneinander, sammelt sich Flüssigkeit. Es zischt weniger, die Oberfläche bleibt grau und das Lebensmittel dämpft. Erst wenn das Wasser verdampft ist, kann kräftige Bräunung einsetzen.',
          depthPoints: 4,
        },
        {
          id: 'EXP:STEAK-COOKING',
          kind: 'experiment',
          title: 'Experiment: Pfanne, Zeit und Feuchtigkeit',
          summary: 'Stelle Temperatur, Zeit und Oberflächenfeuchtigkeit ein. Das Modell zeigt Verdampfung, Bräunungsgrad, Aromaintensität und das Risiko des Verbrennens. Es gibt keinen universellen perfekten Punkt — nur passende Bedingungen.',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'EXERCISE:MAILLARD-HEUTE',
          kind: 'exercise',
          title: 'Schau heute in deinem Alltag danach',
          summary: 'Beobachte Toast, Kartoffeln, Pilze, Gebäck, Kaffee oder Fleisch beim Erhitzen. Wo bleibt die Oberfläche lange feucht? Wann beginnt sie zu bräunen? Handelt es sich wahrscheinlich um Maillard-Reaktion, Karamellisierung — oder beides?',
          depthPoints: 7,
        },
        {
          id: 'EXPL:MAILLARD-JETZT-WEISST-DU',
          kind: 'explanation',
          title: 'Jetzt weißt du …',
          summary: '… warum trockene, heiße Oberflächen kräftiger bräunen, warum gekochtes und gebratenes Essen anders schmecken und warum Brotkruste, Kaffee und Steak trotz ihrer Unterschiede chemisch miteinander verwandt sind.',
          depthPoints: 5,
        },
        {
          id: 'QUIZ:MAILLARD-K4',
          kind: 'quiz',
          title: 'Quiz: Praktische Anwendung',
          summary: 'Prüfe, wie Temperatur, Zeit, Wasser, Zucker, Aminosäuren und pH-Wert zusammenwirken.',
          depthPoints: 12,
        },
      ],
    },
  ],
};
