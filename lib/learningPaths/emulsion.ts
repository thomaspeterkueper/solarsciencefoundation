import type { LearningPath } from '../learningPaths';

export const emulsionLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-KUECHE-EMULSION-0001',
  title: 'Warum trennt sich ein Dressing — und Mayonnaise oft nicht?',
  subtitle: 'Grenzfläche, Tröpfchengröße und Emulgatoren: Emulsionen als dynamische disperse Systeme.',
  status: 'prototype', sourceModuleId: 'SSF-PHY-1004', kxfModuleId: 'LRN:SSF:PHY-1004',
  domainsNeeded: ['KD:CHM:N1', 'KD:PHYS:N1'],
  suppliedBy: { knowledgeGraph: ['Kanonische Chemie- und Physik-Domänen'], kueperCom: [], overtimeArchive: [], ssf: ['Grenzflächenmodell', 'Tröpfchenvergleich', 'Emulgator-Erklärung'] },
  unlocks: ['TOOL:EMULSIFICATION', 'SENSE:MOUTHFEEL'],
  units: [{
    id: 'UNIT:EMULSION-GRENZFLAECHE', title: 'Viele Tröpfchen bedeuten viel Grenzfläche',
    entryQuestion: 'Was passiert beim Schütteln von Öl und Wasser, wenn beide Stoffe chemisch dieselben bleiben?',
    takeaway: 'Schütteln verteilt eine Phase als Tröpfchen in der anderen und vergrößert die Grenzfläche. Ohne ausreichende Stabilisierung wachsen oder vereinigen sich Tröpfchen wieder und die Phasen trennen sich.',
    gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:EMULSION-EMULGATOR' },
    sections: [
      { id: 'OBS:EMULSION-DRESSING', kind: 'observation', title: 'Dressing nach dem Schütteln', summary: 'Direkt nach dem Schütteln ist das Dressing trüb und fein verteilt. Später entstehen größere Tropfen und schließlich wieder getrennte Phasen. Das zeigt: Verteilen und Stabilisieren sind zwei verschiedene Aufgaben.', depthPoints: 5 },
      { id: 'EXPL:EMULSION-GRENZE', kind: 'explanation', title: 'Warum die Grenzfläche zählt', summary: 'Öl und Wasser bilden eine Grenzfläche mit Grenzflächenspannung. Viele kleine Tropfen besitzen zusammen mehr Grenzfläche als wenige große. Das System kann diese Grenzfläche unter anderem durch Koaleszenz wieder verkleinern.', depthPoints: 8 },
      { id: 'EXP:EMULSION-TRENNUNG', kind: 'experiment', title: 'Experiment: Tröpfchen und Trennung', summary: 'Verändere Tröpfchengröße und Verteilung qualitativ. Beobachte, warum kleinere Tropfen nicht automatisch eine dauerhaft stabile Emulsion bedeuten. Reale Stabilität hängt zusätzlich etwa von Viskosität, Dichteunterschied, Grenzflächenchemie und Temperatur ab.', interactive: true, depthPoints: 10 },
      { id: 'QUIZ:EMULSION-K1', kind: 'quiz', title: 'Kurztest: Emulsion', summary: 'Prüfe den Unterschied zwischen Dispergieren, Grenzfläche und Stabilität.', depthPoints: 10 },
    ]
  }, {
    id: 'UNIT:EMULSION-EMULGATOR', title: 'Wie Emulgatoren Grenzflächen verändern',
    entryQuestion: 'Warum kann Eigelb eine Öl-in-Wasser-Emulsion unterstützen?',
    takeaway: 'Grenzflächenaktive Bestandteile können sich an Öl-Wasser-Grenzflächen anordnen und Tröpfchen gegen Zusammenfließen stabilisieren. Das Ergebnis hängt vom gesamten Rezept und Prozess ab, nicht von einer universellen „kritischen Lecithinkonzentration“.',
    sections: [
      { id: 'OBS:EMULSION-MAYO', kind: 'observation', title: 'Mayonnaise als komplexes System', summary: 'Mayonnaise enthält eine hohe Ölfraktion, Wasserphase und mehrere grenzflächenaktive Bestandteile aus Eigelb. Ihre Struktur entsteht beim Dispergieren und wird durch Zusammensetzung und Verarbeitung stabilisiert.', depthPoints: 5 },
      { id: 'EXPL:EMULGATOR', kind: 'explanation', title: 'Amphiphile Moleküle an der Grenzfläche', summary: 'Viele Emulgatoren besitzen Bereiche mit unterschiedlicher Affinität zu Wasser und Öl. Sie können sich an der Grenzfläche anreichern und die Wechselwirkung zwischen Tröpfchen verändern. Lecithin ist dabei kein einzelnes universelles Mayonnaise-Schalter-Molekül, sondern Teil eines komplexeren Eigelb-Systems.', depthPoints: 8 },
      { id: 'EXP:EMULGATOR-WIRKUNG', kind: 'experiment', title: 'Experiment: Stabilisierung vergleichen', summary: 'Vergleiche schematisch wenig und mehr Grenzflächenstabilisierung. Das Modell zeigt Trends, aber bewusst keinen universellen Konzentrationsgrenzwert und keine garantierte Haltbarkeit.', interactive: true, depthPoints: 10 },
      { id: 'QUIZ:EMULSION-K2', kind: 'quiz', title: 'Kurztest: Emulgatoren', summary: 'Prüfe, welche Rolle Grenzflächenaktive Stoffe spielen und warum Rezeptur und Prozess gemeinsam entscheiden.', depthPoints: 10 },
    ]
  }]
};
