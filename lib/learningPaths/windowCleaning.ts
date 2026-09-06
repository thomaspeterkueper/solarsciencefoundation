import type { LearningPath } from '../learningPaths';

export const windowCleaningLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-REINIGUNG-FENSTER-0001',
  title: 'Warum bleiben nach dem Fensterputzen Streifen zurück?',
  subtitle: 'Wasserfilm, gelöste Stoffe, Benetzung und Abziehen: Ursachen unterscheiden statt einen „perfekten Winkel“ zu behaupten.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2004',
  kxfModuleId: 'LRN:SSF:CHE-2004',
  domainsNeeded: ['KD:PHYS:N1', 'KD:CHM:N1'],
  suppliedBy: { knowledgeGraph: [], kueperCom: [], overtimeArchive: [], ssf: ['Verdunstungsmodell', 'Wischergeometrie', 'Rückstandsmodell'] },
  unlocks: ['TOOL:STREAK-FREE', 'PHY:SURFACE-TENSION'],
  units: [
    {
      id: 'UNIT:WINDOW:RESIDUE',
      title: 'Streifen sind kein einzelner Mechanismus',
      entryQuestion: 'Was bleibt eigentlich auf dem Glas zurück, wenn ein Wasserfilm trocknet?',
      takeaway: 'Streifen können durch gelöste Mineralien, Reinigungsmittelreste, Schmutzfilme oder ungleichmäßig verbliebene Flüssigkeit entstehen. Schnelle Verdunstung kann Rückstände sichtbarer machen, ist aber nicht die einzige Ursache.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WINDOW:SQUEEGEE' },
      sections: [
        { id: 'OBS:WINDOW:FILM', kind: 'observation', title: 'Der letzte dünne Film entscheidet', summary: 'Nach dem Reinigen bleibt oft ein sehr dünner Flüssigkeitsfilm zurück. Verdunstet er, bleiben nichtflüchtige Stoffe auf dem Glas; wird er ungleichmäßig verteilt oder teilweise abgezogen, können sichtbare Bahnen entstehen.', depthPoints: 4 },
        { id: 'EXP:VERDUNSTUNG', kind: 'experiment', title: 'Experiment: Verdunstung und Rückstand', summary: 'Temperatur und Luftfeuchte verändern die Verdunstungsgeschwindigkeit. Das Modell zeigt qualitativ, dass nichtflüchtige Rückstände mit dem Wasser nicht mitverdampfen.', interactive: true, depthPoints: 7 },
        { id: 'EXPL:WINDOW:NEWSPAPER', kind: 'explanation', title: 'Zeitungspapier ist keine physikalische Sonderlösung', summary: 'Ob Papier, Mikrofasertuch oder Abzieher gut funktioniert, hängt von Material, Sauberkeit, Flüssigkeitsmenge und Technik ab. Eine allgemeine Überlegenheit von Zeitungspapier oder ein Zusammenbruch der Oberflächenspannung durch Zeitung wird nicht behauptet.', depthPoints: 7 },
        { id: 'QUIZ:WINDOW:RESIDUE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Zwischen Verdunstung, Rückständen und mechanisch verbliebenem Flüssigkeitsfilm unterscheiden.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:WINDOW:SQUEEGEE',
      title: 'Abziehen statt Zauberwinkel',
      entryQuestion: 'Warum kann ein Abzieher einen Wasserfilm sauber entfernen und trotzdem bei schlechter Technik Spuren hinterlassen?',
      takeaway: 'Entscheidend sind gleichmäßiger Kontakt, eine saubere Gummilippe, kontrollierte Überlappung und passende Flüssigkeitsmenge. Es gibt keinen universellen „optimalen Winkel“ für alle Abzieher und Bedingungen.',
      sections: [
        { id: 'EXP:WISCHER-TECHNIK', kind: 'experiment', title: 'Experiment: Kontakt und Bewegung des Abziehers', summary: 'Variiere Winkel und Bewegung als Geometrieparameter. Das Modell zeigt, wie Kontakt und Flüssigkeitsführung zusammenhängen, ohne einen universell optimalen Zahlenbereich zu behaupten.', interactive: true, depthPoints: 7 },
        { id: 'EXPL:WINDOW:WATER', kind: 'explanation', title: 'Destilliertes Wasser reduziert nur eine mögliche Rückstandsquelle', summary: 'Wasser mit geringer Mineralstofffracht kann mineralische Trocknungsrückstände verringern. Es garantiert aber keine streifenfreie Oberfläche, wenn Tenside, Fett, Schmutz oder ungleichmäßiges Abziehen verbleiben.', depthPoints: 8 },
        { id: 'QUIZ:WINDOW:SQUEEGEE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Erklären, warum Sonne schnelle Verdunstung begünstigt, warum das Ergebnis trotzdem von mehr als Verdunstung abhängt und welche Faktoren beim Abziehen kontrolliert werden.', depthPoints: 15 },
      ],
    },
  ],
};
