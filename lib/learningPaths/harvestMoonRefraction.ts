import type { LearningPath } from '../learningPaths';

export const harvestMoonRefractionLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-HORIZON-REFRACTION-0001',
  title: 'Warum der Mond am Horizont nicht dort ist, wo er scheint',
  subtitle: 'Vom Erntemond über Horizontgeometrie zur atmosphärischen Refraktion: beobachten, vorhersagen, modellieren und auf andere Welten übertragen.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-HORIZON-REFRACTION-0001',
  kxfModuleId: 'LRN:SSF:PHY-HORIZON-REFRACTION-0001',
  domainsNeeded: ['KD:ASTRO', 'KD:PHYS-OPTICS:N1', 'KD:GEO-PLANET:N1'],
  suppliedBy: {
    knowledgeGraph: [],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Issue #57: Learn → Observe → Model → Experiment → Apply reference journey']
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:HORIZON-REFRACTION:LEARN',
      title: 'Learn: Zwei Ursachen, ein Himmel',
      entryQuestion: 'Wenn der Mond nahe am Horizont anders erscheint als erwartet: Liegt es an seiner Bahn, an der Atmosphäre oder an beidem?',
      takeaway: 'Orbitalgeometrie bestimmt die geometrische Position; atmosphärische Optik kann die scheinbare Position verändern.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HORIZON-REFRACTION:OBSERVE' },
      sections: [
        { id: 'EXPL:HORIZON-REFRACTION:GEOMETRY', kind: 'explanation', title: 'Geometrische Position', summary: 'Mondphase, Ekliptik und lokaler Horizont bestimmen gemeinsam, wann und unter welchem Winkel der Mond geometrisch auf- oder untergeht. Beim Harvest-Moon-Effekt ist insbesondere die Geometrie der Mondbahn relativ zum Horizont entscheidend.', depthPoints: 10 },
        { id: 'EXPL:HORIZON-REFRACTION:OPTICS', kind: 'explanation', title: 'Scheinbare Position', summary: 'Licht wird in einer räumlich veränderlichen Atmosphäre abgelenkt. Dadurch kann ein Objekt nahe dem Horizont scheinbar höher stehen als seine geometrische Position. Geometrie und optischer Effekt müssen getrennt bilanziert werden.', depthPoints: 10 },
        { id: 'QUIZ:HORIZON-REFRACTION:CAUSES', kind: 'quiz', title: 'Ursachen trennen', summary: 'Welche Aussage trennt die Effekte korrekt?||Die Atmosphäre bestimmt die Mondphase||Orbitalgeometrie bestimmt die geometrische Position, die Atmosphäre kann die scheinbare Position verschieben*||Refraktion verändert die Mondbahn||Der Harvest Moon entsteht ausschließlich durch Brechung', depthPoints: 7 }
      ]
    },
    {
      id: 'UNIT:HORIZON-REFRACTION:OBSERVE',
      title: 'Observe: Erst hinschauen, dann erklären',
      entryQuestion: 'Welche Beobachtung brauchst du, um geometrische Vorhersage und scheinbare Position vergleichen zu können?',
      takeaway: 'Eine Beobachtung wird wissenschaftlich nützlich, wenn Zeitpunkt, Standort, Horizont und Unsicherheit zur Vorhersage passen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HORIZON-REFRACTION:MODEL' },
      sections: [
        { id: 'OBS:HORIZON-REFRACTION:COMPARE', kind: 'observation', title: 'Beobachtung am Horizont', summary: 'Notiere Zeitpunkt, Beobachtungsort, freien Horizont und die beobachtete Position von Mond oder Sonne. Vergleiche die Beobachtung mit einer geometrischen Vorhersage und behandle die Differenz zunächst als Messbefund, nicht als fertige Erklärung.', depthPoints: 12 },
        { id: 'EXP:HORIZON-REFRACTION:UNCERTAINTY', kind: 'exercise', title: 'Was könnte den Vergleich verfälschen?', summary: 'Benenne mindestens drei Unsicherheiten, etwa verdeckten oder erhöhten lokalen Horizont, ungenaue Zeit/Position oder ungewöhnliche atmosphärische Schichtung. Trenne Beobachtungsunsicherheit von physikalischer Interpretation.', depthPoints: 12 }
      ]
    },
    {
      id: 'UNIT:HORIZON-REFRACTION:MODEL',
      title: 'Model: Parameter statt Bauchgefühl',
      entryQuestion: 'Welche Parameter würdest du verändern, bevor du behauptest, ein Effekt sei universell?',
      takeaway: 'Ein Modell macht sichtbar, welche Vorhersage von Geometrie und welche von Atmosphäre abhängt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HORIZON-REFRACTION:EXPERIMENT' },
      sections: [
        { id: 'EXPL:HORIZON-REFRACTION:PARAMETERS', kind: 'explanation', title: 'Parameter des Vergleichs', summary: 'Für die Geometrie sind insbesondere Breite, Jahreszeit beziehungsweise Achsgeometrie und Beobachterhöhe relevant. Für die atmosphärische Abweichung kommen Druck, Temperatur beziehungsweise Atmosphärenprofil und je nach Fragestellung Wellenlänge hinzu.', depthPoints: 10 },
        { id: 'SIM:HORIZON-REFRACTION:NOXIA', kind: 'experiment', title: 'NOXIA-Refraktionsdemonstrator', summary: 'Formuliere vor jedem Lauf eine Vorhersage: In welche Richtung sollte sich die scheinbare Position verändern, wenn du einen Parameter änderst? Vergleiche erst danach mit dem Simulatorergebnis und begründe Abweichungen.', depthPoints: 16, externalSimulator: { simulatorId: 'NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1', instruction: 'Gib zuerst eine qualitative Vorhersage ab. Verändere anschließend genau einen Parameter und vergleiche Richtung und Größenordnung des Effekts mit deiner Erwartung.', fallback: 'Ohne Simulator: Vergleiche zwei gedachte Atmosphären bei gleicher Orbitalgeometrie. Eine Änderung der Atmosphäre darf die geometrische Mondbahn nicht verändern; sie kann nur den beobachteten Lichtweg und damit die scheinbare Position beeinflussen. Begründe für jede Variation, welcher Teil der Kausalkette betroffen ist.' } }
      ]
    },
    {
      id: 'UNIT:HORIZON-REFRACTION:EXPERIMENT',
      title: 'Experiment: Vorhersagen vor dem Regler',
      entryQuestion: 'Was lernst du mehr: zehn Reglerbewegungen oder eine überprüfbare Vorhersage?',
      takeaway: 'Ein Experiment prüft eine vorher formulierte Erwartung und nicht nur, ob sich auf dem Bildschirm etwas bewegt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HORIZON-REFRACTION:APPLY' },
      sections: [
        { id: 'EXP:HORIZON-REFRACTION:ONE-VARIABLE', kind: 'exercise', title: 'Ein Parameter pro Versuch', summary: 'Halte Geometrie und alle übrigen Atmosphärenparameter konstant. Sage die qualitative Änderung voraus, variiere genau einen Parameter, dokumentiere Ergebnis und Unsicherheit und entscheide anschließend, ob die Beobachtung deine Erwartung stützt.', depthPoints: 16 },
        { id: 'QUIZ:HORIZON-REFRACTION:INFERENCE', kind: 'quiz', title: 'Was folgt aus dem Ergebnis?', summary: 'Der Simulator zeigt nach einer Atmosphärenänderung eine andere scheinbare Höhe. Was folgt unmittelbar?||Die Mondbahn hat sich geändert||Der optische Anteil der Beobachtung hat sich geändert*||Die Mondphase ist falsch||Die Erdachse hat sich verschoben', depthPoints: 7 }
      ]
    },
    {
      id: 'UNIT:HORIZON-REFRACTION:APPLY',
      title: 'Apply: Erde verlassen',
      entryQuestion: 'Welche Teile deiner Erklärung bleiben auf dem Mars gültig, welche müssen neu bestimmt werden?',
      takeaway: 'Transfer gelingt, wenn du Invarianten und weltabhängige Randbedingungen auseinanderhältst.',
      sections: [
        { id: 'EXAMPLE:HORIZON-REFRACTION:MARS', kind: 'example', title: 'Mars', summary: 'Übertrage die Kausalkette auf den Mars: Bestimme zunächst die lokale Himmels- und Horizontgeometrie und behandle danach die marsianische Atmosphäre als eigenen optischen Randfall. Verwende nicht stillschweigend Erdparameter.', depthPoints: 12 },
        { id: 'EXP:HORIZON-REFRACTION:ALIEN-WORLD', kind: 'exercise', title: 'Mehrere Monde, andere Atmosphäre', summary: 'Entwirf eine Welt mit mehreren Monden und einer anderen Atmosphäre. Markiere für jede beobachtete Besonderheit, ob sie aus Orbitalgeometrie, atmosphärischer Optik oder der Kombination beider entsteht. Nenne mindestens eine Beobachtung, mit der sich zwei konkurrierende Erklärungen unterscheiden ließen.', depthPoints: 16 },
        { id: 'QUIZ:HORIZON-REFRACTION:TRANSFER', kind: 'quiz', title: 'Transferprüfung', summary: 'Welche Vorgehensweise ist wissenschaftlich sauber?||Erdwerte unverändert übernehmen||Zuerst Geometrie und Atmosphäre der Zielwelt getrennt bestimmen und danach ihre beobachtbare Kombination modellieren*||Nur die Atmosphäre betrachten||Nur die Zahl der Monde zählen', depthPoints: 8 }
      ]
    }
  ]
};
