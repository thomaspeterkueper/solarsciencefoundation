import type { LearningPath } from '../learningPaths';

/**
 * SSF didactic implementation of KG contract CHM-L1-000004.
 * Canon: kueper-knowledge-graph/exports/chemistry-cleaning-chlorine-0.1.json
 */
export const chlorineCleaningLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-REINIGUNG-CHLOR-0001',
  title: 'Warum kann Hypochlorit bleichen – und wann wird Mischen gefährlich?',
  subtitle: 'Oxidative Veränderung von Chromophoren verstehen und hypochlorithaltige Reiniger sicher einordnen.',
  status: 'prototype',
  sourceModuleId: 'CHM-L1-000004',
  kxfModuleId: 'LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001',
  domainsNeeded: ['KD:CHM-REDOX:N2', 'KD:CHM-CHEMICAL-SAFETY:N2', 'KD:CHM-ACID-BASE:N2'],
  suppliedBy: {
    knowledgeGraph: [
      'CHM-L1-000004',
      'requires CHM-L1-000001 + CHM-L1-000002',
      'CON:CHM:hypochlorite-aqueous-system',
      'CON:CHM:hypochlorous-acid-hypochlorite-equilibrium',
      'CON:CHM:oxidative-bleaching-chromophores',
      'CON:CHM:hypochlorite-acidification-chlorine-release',
      'CON:CHM:incompatible-cleaner-mixing',
      'CON:CHM:chlorine-inhalation-hazard',
      'REQ:CHM:HYPOCHLORITE-ACID-MIX-SAFETY-0001',
      'REQ:CHM:BLEACH-MECHANISM-QUALIFIER-0001',
    ],
    kueperCom: [], overtimeArchive: [],
    ssf: ['Sicherheitsorientierte Lernsequenz', 'qualitatives Hypochlorit-Modell', 'Transfer auf Haushaltsreiniger'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:CHLOR:BLEACH',
      title: 'Bleichen ist nicht dasselbe wie Entfernen',
      entryQuestion: 'Wenn ein farbiger Fleck nach einem hypochlorithaltigen Reiniger verblasst: Ist der Stoff dann einfach verschwunden?',
      takeaway: 'Hypochlorithaltige Systeme können farbgebende Molekülstrukturen oxidativ verändern. Das Foundation-Modell beschreibt die Veränderung von Chromophoren, nicht einen universellen Einzelmechanismus für jeden Farbstoff.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:CHLOR:SAFETY' },
      sections: [
        { id: 'OBS:CHLOR:COLOR', kind: 'observation', title: 'Farbe verschwindet sichtbar', summary: 'Ein Farbstoff kann nach Kontakt mit einem oxidierenden Bleichmittel deutlich blasser erscheinen. Diese Beobachtung sagt zunächst nur, dass sich seine Lichtabsorption verändert hat.', depthPoints: 4 },
        { id: 'EXPL:CHLOR:CHROMOPHORE', kind: 'explanation', title: 'Chromophore als vereinfachtes Modell', summary: 'Bestimmte Molekülstrukturen absorbieren sichtbares Licht und tragen dadurch zur Farbe bei. Oxidative Reaktionen können solche Strukturen verändern. Welche Reaktionsschritte tatsächlich stattfinden, hängt vom jeweiligen Stoff und den Bedingungen ab.', depthPoints: 8 },
        { id: 'EXP:OXIDATION', kind: 'experiment', title: 'Erkundung: Bleicheffekt und seine Grenze', summary: 'Das qualitative Modell zeigt den Unterschied zwischen sichtbarer Farbänderung und tatsächlicher Entfernung eines Stoffes. Es behauptet ausdrücklich keinen einzigen universellen Bleichmechanismus.', interactive: true, depthPoints: 10 },
        { id: 'QUIZ:CHLOR:BLEACH', kind: 'quiz', title: 'Verstehen statt Farbumschlag merken', summary: 'Warum kann ein Fleck farblos werden, obwohl seine Bestandteile nicht einfach verschwunden sind?||Weil oxidative Reaktionen farbgebende Strukturen verändern können*||Weil jede Bleiche den Stoff vollständig verdampft||Weil Farbe nur von der Temperatur abhängt||Weil Hypochlorit jeden Stoff identisch zerlegt---Ist die Chromophor-Erklärung ein universeller Einzelmechanismus für alle Bleichfälle?||Nein, sie ist ein Foundation-Modell; reale Reaktionswege hängen von Stoff und Bedingungen ab*||Ja, jeder Farbstoff reagiert exakt gleich||Ja, sobald die Farbe verschwindet||Nur bei neutralem pH', depthPoints: 10 },
      ],
    },
    {
      id: 'UNIT:CHLOR:SAFETY',
      title: 'Warum Säure und Hypochlorit nicht zusammengehören',
      entryQuestion: 'Warum ist die Regel „Reiniger nicht mischen“ bei hypochlorithaltigen Produkten chemisch wichtig?',
      takeaway: 'Die Säuerung hypochlorithaltiger beziehungsweise aktivchlorhaltiger Systeme kann unter geeigneten Bedingungen Chlor und gefährliche chlorhaltige Dämpfe freisetzen. Deshalb werden solche Reiniger nicht mit sauren Reinigern gemischt.',
      sections: [
        { id: 'EXPL:CHLOR:EQUILIBRIUM', kind: 'explanation', title: 'Ein wässriges chemisches System', summary: 'Hypochlorithaltige Lösungen enthalten pH-abhängige Gleichgewichte. Säuerung verändert deren Zusammensetzung. Es gibt keinen einzelnen universellen pH-Grenzwert, der für jedes Produkt und jede Konzentration als sichere Trennlinie dienen könnte.', depthPoints: 9 },
        { id: 'EXP:CHLORGAS', kind: 'experiment', title: 'Sicherheitsmodell: Säure + hypochlorithaltiger Reiniger', summary: 'Die Visualisierung erklärt qualitativ, warum Ansäuern gefährlich sein kann. Sie ist kein Mischversuch, gibt keine Mengen oder Rezepturen vor und nennt bewusst keinen universellen Grenzwert.', interactive: true, depthPoints: 10 },
        { id: 'EXPL:CHLOR:INCOMPATIBLE', kind: 'explanation', title: 'Die praktische Sicherheitsregel', summary: 'Hypochlorithaltige Reiniger nicht mit Essig, Entkalkern oder anderen sauren Reinigern kombinieren. Die relevante Gefahr ist nicht die Kurzformel „Chlor + Säure“, sondern die Chemie eines angesäuerten hypochlorithaltigen Systems und die mögliche Freisetzung toxischer Dämpfe.', depthPoints: 9 },
        { id: 'EXPL:CHLOR:SCOPE', kind: 'explanation', title: 'Ammoniak ist ein anderer Sicherheitsfall', summary: 'Gefahren durch das Mischen hypochlorithaltiger Reiniger mit ammoniakhaltigen Produkten beruhen auf anderer Chemie und werden nicht in den Säurefall hineinerklärt. Dieser spätere Chloramin-Fall gehört in eine eigene Lernsequenz.', depthPoints: 7 },
        { id: 'QUIZ:CHLOR:SAFETY', kind: 'quiz', title: 'Sicherheitswissen übertragen', summary: 'Warum soll ein hypochlorithaltiger Reiniger nicht mit Entkalker gemischt werden?||Säuerung kann die Zusammensetzung des Systems verändern und gefährliche chlorhaltige Dämpfe ermöglichen*||Weil Entkalker immer brennbar ist||Weil beide Reiniger dann gefrieren||Nur weil sich die Farbe ändert---Gibt es einen universellen pH-Wert, unterhalb dessen jedes Hypochloritprodukt plötzlich Chlor freisetzt?||Nein; Produktzusammensetzung, Konzentration und Bedingungen unterscheiden sich*||Ja, exakt pH 7||Ja, exakt pH 5||Ja, exakt pH 1---Soll die Ammoniak/Chloramin-Gefahr als derselbe Mechanismus wie die Säuerung erklärt werden?||Nein, das ist ein eigener chemischer Sicherheitsfall*||Ja, beide sind identisch||Nur bei Raumtemperatur||Nur bei farblosen Produkten', depthPoints: 12 },
      ],
    },
  ],
};
