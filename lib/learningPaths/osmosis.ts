import type { LearningPath } from '../learningPaths';

export const osmosisLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-REINIGUNG-OSMOSE-0001',
  title: 'Warum verändert Salz Pflanzenzellen?',
  subtitle: 'Osmose als Wassertransport durch selektiv permeable Membranen — vom Konzentrationsunterschied zum Turgor.',
  status: 'prototype', sourceModuleId: 'SSF-CHE-2007', kxfModuleId: 'LRN:SSF:CHE-2007',
  domainsNeeded: ['KD:CHM:N1', 'KD:BIO:N1', 'KD:PHYS:N1'],
  suppliedBy: { knowledgeGraph: ['Kanonische Domänen'], kueperCom: [], overtimeArchive: [], ssf: ['Membranmodell', 'Osmoseexperiment', 'Turgor-Transfer'] },
  unlocks: ['CHEM:OSMOSIS', 'BIO:CELL-MEMBRANE', 'TOOL:FOOD-PRESERVATION'],
  units: [{
    id: 'UNIT:OSMOSE-PRINZIP', title: 'Wasser, Membran und gelöste Stoffe',
    entryQuestion: 'Warum kann sich Wasser durch eine Membran netto in eine Richtung bewegen, obwohl Wassermoleküle ständig in beide Richtungen unterwegs sind?',
    takeaway: 'Osmose ist ein Netto-Wassertransport durch eine selektiv permeable Membran. Entscheidend sind die chemischen Potentiale auf beiden Seiten — nicht eine Regel, nach der Wasser immer einfach „zur höheren Konzentration“ läuft.',
    gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:OSMOSE-ZELLE' },
    sections: [
      { id: 'OBS:OSMOSE-MEMBRAN', kind: 'observation', title: 'Zwei Lösungen, eine Membran', summary: 'Stell dir zwei wässrige Lösungen vor, getrennt durch eine Membran, die Wasser passieren lässt, einen gelösten Stoff aber nicht. Auf beiden Seiten bewegen sich Wassermoleküle in beide Richtungen. Trotzdem kann ein Nettofluss entstehen.', depthPoints: 5 },
      { id: 'EXPL:OSMOSE-MODELL', kind: 'explanation', title: 'Was die Membran verändert', summary: 'Gelöste Teilchen verändern das chemische Potential des Wassers. Kann der gelöste Stoff die Membran nicht passieren, kann Wassertransport einen Teil dieses Unterschieds ausgleichen. Ein entstehender hydrostatischer Druck kann dem osmotischen Antrieb entgegenwirken.', depthPoints: 8 },
      { id: 'EXP:OSMOSE', kind: 'experiment', title: 'Experiment: Netto-Wassertransport', summary: 'Verändere die idealisierte Menge gelöster Teilchen auf beiden Seiten und schalte die Wasserpermeabilität der Membran um. Beobachte die qualitative Richtung des Netto-Wassertransports. Das Modell nimmt gleiche Ausgangsvolumina an und ist keine quantitative Berechnung des osmotischen Drucks.', interactive: true, depthPoints: 10 },
      { id: 'QUIZ:OSMOSE-1', kind: 'quiz', title: 'Kurztest: Osmose', summary: 'Prüfe Membranselektivität, Nettofluss und den Unterschied zwischen Teilchenbewegung und makroskopischem Wassertransport.', depthPoints: 10 },
    ]
  }, {
    id: 'UNIT:OSMOSE-ZELLE', title: 'Pflanzenzellen unter osmotischem Stress',
    entryQuestion: 'Warum verliert gesalzenes Gemüse Wasser, ohne dass Salz die Zellwand „herauszieht“?',
    takeaway: 'Bei Pflanzenzellen bestimmen Membrantransport, Zellsaft und Zellwand gemeinsam den Wasserhaushalt. Wasserverlust senkt den Turgor; starke hypertonische Bedingungen können zur Plasmolyse führen.',
    sections: [
      { id: 'OBS:OSMOSE-GURKE', kind: 'observation', title: 'Gesalzene Gurke', summary: 'Nach dem Salzen sammelt sich Flüssigkeit. Das ist ein sichtbarer Hinweis auf veränderten Wasserhaushalt, aber kein Beweis für ein einzelnes isoliertes Molekülmodell.', depthPoints: 4 },
      { id: 'EXP:ZELLTURGOR', kind: 'experiment', title: 'Experiment: Turgor', summary: 'Verändere die Außenbedingungen einer schematischen Pflanzenzelle. Beobachte qualitativ, wie Wasseraufnahme oder Wasserverlust den Turgor verändert. Reale Gewebe enthalten mehrere gelöste Stoffe, Membranen und Transportprozesse.', interactive: true, depthPoints: 9 },
      { id: 'EXPL:OSMOSE-GRENZEN', kind: 'explanation', title: 'Wo die einfache Salzregel endet', summary: 'Lebende Zellen sind keine Beutel mit Salzwasser. Membranproteine, permeable und nicht permeable Stoffe, Zellwanddruck und Stoffwechsel beeinflussen den Zustand. Osmose liefert das Grundmodell, nicht die vollständige Biologie.', depthPoints: 7 },
      { id: 'QUIZ:OSMOSE-2', kind: 'quiz', title: 'Kurztest: Zelle und Turgor', summary: 'Prüfe, wie Außenmedium, selektive Permeabilität und Zellwand beim Wasserhaushalt zusammenwirken.', depthPoints: 10 },
    ]
  }]
};
