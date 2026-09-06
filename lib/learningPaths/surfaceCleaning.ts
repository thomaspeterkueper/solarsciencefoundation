import type { LearningPath } from '../learningPaths';

export const surfaceCleaningLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-REINIGUNG-OBERFLAECHEN-0001',
  title: 'Warum derselbe Schwamm auf Glas anders wirkt als auf Stein',
  subtitle: 'Ritzhärte, Partikel, Kontaktbedingungen und Porosität: Materialeigenschaften statt pauschaler Putzregeln.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2001',
  kxfModuleId: 'LRN:SSF:PHY-3001',
  domainsNeeded: ['KD:MTL:N1', 'KD:PHYS:N1'],
  suppliedBy: { knowledgeGraph: [], kueperCom: [], overtimeArchive: [], ssf: ['Mohs-Ritzvergleich', 'Porositätsmodell', 'materialgerechte Reinigungsentscheidung'] },
  unlocks: ['TOOL:SURFACE-ANALYSIS', 'MAT:HARDNESS-SCALE'],
  units: [
    {
      id: 'UNIT:SURFACE:SCRATCH',
      title: 'Wann entsteht ein Kratzer?',
      entryQuestion: 'Warum kann ein harter Partikel eine Oberfläche ritzen, während ein weicherer Kontakt kaum Spuren hinterlässt?',
      takeaway: 'Ritzhärte ist wichtig, aber nicht allein entscheidend: Partikelhärte, Form, Kraft, Relativbewegung, Beschichtung und Verunreinigungen bestimmen gemeinsam das Schadensrisiko.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SURFACE:POROSITY' },
      sections: [
        { id: 'OBS:SURFACE:SCRATCH', kind: 'observation', title: 'Ein Kratzer ist ein Kontaktproblem', summary: 'Zwei scheinbar gleiche Reinigungsvorgänge können unterschiedlich enden, weil Werkzeug, eingeschlossene Partikel, Beschichtung und Kontaktkraft verschieden sind. Aus dem Materialnamen allein folgt noch keine sichere Putzregel.', depthPoints: 4 },
        { id: 'EXPL:SURFACE:MOHS', kind: 'explanation', title: 'Was die Mohs-Skala wirklich sagt', summary: 'Die Mohs-Skala ist eine relative mineralogische Ritzhärteskala. Sie ordnet, welcher Referenzstoff einen anderen ritzen kann; die Abstände sind nicht linear. Sie ist keine universelle Kennzahl für Kratzfestigkeit technischer Oberflächen.', depthPoints: 7 },
        { id: 'EXP:MOHS', kind: 'experiment', title: 'Experiment: relativer Ritzhärte-Vergleich', summary: 'Vergleiche Referenzminerale auf der Mohs-Skala. Das Modell zeigt ausschließlich die relative Ritzordnung und trennt diese bewusst von realem Reinigungsschaden.', interactive: true, depthPoints: 7 },
        { id: 'QUIZ:SURFACE:SCRATCH', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Ritzhärte einordnen, Mohs nicht als lineare Werkstoffskala missverstehen und weitere Einflussgrößen eines Kratzers benennen.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SURFACE:POROSITY',
      title: 'Poren, Oberflächen und Flüssigkeit',
      entryQuestion: 'Warum kann Naturstein nach dem Benetzen dunkler aussehen, ohne dass dadurch automatisch „Schmutz tiefer gezogen“ wurde?',
      takeaway: 'Flüssigkeit kann in zugängliche Poren eindringen und die optischen Eigenschaften einer Oberfläche verändern. Wie stark das geschieht, hängt vom konkreten Gestein, Porensystem, Finish und einer möglichen Imprägnierung oder Beschichtung ab.',
      sections: [
        { id: 'OBS:SURFACE:WET-STONE', kind: 'observation', title: 'Nasser Stein sieht anders aus', summary: 'Beim Benetzen verändern sich Grenzflächen und Lichtstreuung; zugleich kann Flüssigkeit in offene Poren eindringen. Sichtbare Verdunkelung ist deshalb kein zuverlässiger Beweis für eine bestimmte Schmutzwanderung.', depthPoints: 4 },
        { id: 'EXP:POROESITAET', kind: 'experiment', title: 'Experiment: zugängliche Poren vergleichen', summary: 'Das qualitative Modell vergleicht dichte und porösere Oberflächen. Es behauptet keine universelle Porosität für „Marmor“, „Fliese“ oder „Sandstein“, sondern macht die Rolle des Porensystems sichtbar.', interactive: true, depthPoints: 7 },
        { id: 'EXPL:SURFACE:CARE', kind: 'explanation', title: 'Werkstoff + Oberfläche + Mittel + Zeit', summary: 'Eine sichere Reinigungsempfehlung braucht den konkreten Werkstoff und Oberflächenaufbau, das Mittel samt Konzentration sowie Einwirkzeit und mechanische Belastung. Hersteller- und Materialfreigaben haben Vorrang vor pauschalen Regeln.', depthPoints: 8 },
        { id: 'QUIZ:SURFACE:POROSITY', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Porosität von Oberflächenfinish unterscheiden und entscheiden, welche Information vor einer Behandlung noch fehlt.', depthPoints: 15 },
      ],
    },
  ],
};
