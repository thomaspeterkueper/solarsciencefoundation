import type { LearningPath } from '../learningPaths';

export const tileWoodCleaningLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-REINIGUNG-FLIESEN-HOLZ-0001',
  title: 'Warum reagiert Holz anders auf Wasser als eine keramische Oberfläche?',
  subtitle: 'Hygroskopie, Quellung, Beschichtung und Materialchemie: Reinigung aus dem Aufbau des Werkstoffs ableiten.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2002',
  kxfModuleId: 'LRN:SSF:PHY-3002',
  domainsNeeded: ['KD:MTL:N1', 'KD:CHM:N1'],
  suppliedBy: { knowledgeGraph: [], kueperCom: [], overtimeArchive: [], ssf: ['Quellungsmodell', 'Material-Kompatibilitätsmatrix', 'werkstoffgerechte Reinigung'] },
  unlocks: ['MAT:WOOD-CARE', 'MAT:TILE-CARE', 'TOOL:FLOOR-CLEANING'],
  units: [
    {
      id: 'UNIT:WOOD:MOISTURE',
      title: 'Holz ist hygroskopisch',
      entryQuestion: 'Warum kann länger einwirkende Feuchtigkeit Holzbauteile verformen, obwohl die Zellen des Holzes längst nicht mehr leben?',
      takeaway: 'Holz ist ein biologisch entstandener, aber im verbauten Zustand nicht lebender Werkstoff. Seine Zellwände enthalten unter anderem Cellulose, Hemicellulosen und Lignin und können Wassermoleküle aufnehmen; dadurch ändern sich Abmessungen und mechanische Zustände.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WOOD:MATERIALS' },
      sections: [
        { id: 'OBS:WOOD:SWELLING', kind: 'observation', title: 'Feuchtigkeit wirkt über Zeit und Zugangswege', summary: 'Eine Beschichtung kann die Aufnahme von Wasser verlangsamen, macht ein Holzbauteil aber nicht automatisch hermetisch dicht. Fugen, Kanten, Schadstellen und die Dauer der Einwirkung beeinflussen, wie viel Feuchtigkeit in den Aufbau gelangt.', depthPoints: 4 },
        { id: 'EXP:QUELLUNG', kind: 'experiment', title: 'Experiment: qualitative Holzquellung', summary: 'Das Modell zeigt, dass zunehmende Feuchte zu dimensionsändernder Quellung führen kann. Es stellt bewusst keine universelle Feuchte-Schwelle für Rissbildung oder Parkettschäden dar.', interactive: true, depthPoints: 7 },
        { id: 'EXPL:WOOD:ANISOTROPY', kind: 'explanation', title: 'Quellung ist richtungsabhängig', summary: 'Holz quillt und schwindet anisotrop: längs zur Faser deutlich anders als radial oder tangential. Deshalb lässt sich ein realer Verzug nicht aus einem einzigen Feuchtewert vorhersagen.', depthPoints: 7 },
        { id: 'QUIZ:WOOD:MOISTURE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Zwischen lebendem Gewebe und hygroskopischem Werkstoff unterscheiden und erklären, warum Beschichtung, Fugen und Einwirkdauer relevant sind.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:WOOD:MATERIALS',
      title: '„Fliese“ und „Stein“ sind keine ausreichenden Werkstoffangaben',
      entryQuestion: 'Warum kann ein saurer Reiniger einen kalkhaltigen Naturstein angreifen, während eine glasierte Keramikoberfläche anders reagiert?',
      takeaway: 'Die Reaktion hängt von der konkreten chemischen Zusammensetzung und dem Oberflächenaufbau ab. Carbonathaltige Natursteine können mit Säuren reagieren; keramische Oberflächen sind sehr unterschiedlich und nicht pauschal „säureresistent“.',
      sections: [
        { id: 'EXP:MATERIAL-MATRIX', kind: 'experiment', title: 'Experiment: Material und Reinigungsmittel', summary: 'Nutze die Matrix als qualitative Entscheidungshilfe. Die Ampel ersetzt keine Herstellerfreigabe und keine genaue Kenntnis von Beschichtung, Fuge, Natursteinart oder Reinigungsmittelkonzentration.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:WOOD:MARBLE', kind: 'explanation', title: 'Marmor als Carbonat-Beispiel', summary: 'Marmor besteht überwiegend aus Carbonatmineralen wie Calcit oder Dolomit. Säure kann diese Mineralphase angreifen. Das ist ein konkreter chemischer Mechanismus, keine Regel für jeden Naturstein.', depthPoints: 8 },
        { id: 'EXPL:WOOD:TILE', kind: 'explanation', title: 'Keramikoberflächen differenzieren', summary: 'Glasierte und unglasierte Keramik, Fugen und Beschichtungen können sehr unterschiedliche Beständigkeiten besitzen. Eine pauschale Aussage „Keramikfliesen vertragen Säure“ wird daher vermieden.', depthPoints: 8 },
        { id: 'QUIZ:WOOD:MATERIALS', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Vor einer Reinigung entscheiden, welche Werkstoff- und Oberflächeninformation noch fehlt.', depthPoints: 15 },
      ],
    },
  ],
};
