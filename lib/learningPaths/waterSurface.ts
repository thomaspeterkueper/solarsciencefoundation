import type { LearningPath } from '../learningPaths';

export const waterSurfaceLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-WASSER-OBERFLAECHE-0001',
  title: 'Warum kann eine Büroklammer auf Wasser getragen werden?',
  subtitle: 'Oberflächenspannung, Benetzung und Kapillarität als Grenzflächenphänomene.',
  status: 'prototype', sourceModuleId: 'SSF-PHY-3004', kxfModuleId: 'LRN:SSF:PHY-3004',
  domainsNeeded: ['KD:PHYS:N1'],
  suppliedBy: { knowledgeGraph: ['KG legacy-domain mapping 0.1.1: surface tension/capillarity → KD:PHYS:N1'], kueperCom: [], overtimeArchive: [], ssf: ['Grenzflächenmodell', 'Kapillaritätsmodell'] },
  unlocks: ['PHY:SURFACE-TENSION', 'PHY:CAPILLARY-ACTION', 'PHY:CONTACT-ANGLE'],
  units: [{
    id: 'UNIT:WASSER-GRENZFLAECHE', title: 'Die Wasseroberfläche ist keine Haut',
    entryQuestion: 'Warum kann eine vorsichtig aufgelegte Büroklammer getragen werden, obwohl Stahl dichter als Wasser ist?',
    takeaway: 'Oberflächenspannung ist eine Eigenschaft der Flüssigkeitsgrenzfläche. Zusammen mit Benetzung, Kontaktlinie, Geometrie und Gewicht kann sie kleine Objekte tragen — ohne dass eine materielle „Haut“ existiert.',
    gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:WASSER-KAPILLAR' },
    sections: [
      { id: 'OBS:WASSER-KLAMMER', kind: 'observation', title: 'Eine verformte Grenzfläche', summary: 'Eine vorsichtig aufgelegte Büroklammer kann die Wasseroberfläche eindellen, ohne sie zu durchbrechen. Wird die Benetzung oder die Belastung verändert, kann sie sinken.', depthPoints: 5 },
      { id: 'EXPL:WASSER-OBERFLAECHE', kind: 'explanation', title: 'Molekulare Wechselwirkungen und Grenzflächenenergie', summary: 'Moleküle im Inneren und an der Grenzfläche haben unterschiedliche Umgebungen. Makroskopisch beschreibt die Oberflächenspannung, wie sich die freie Energie mit der Grenzfläche ändert. Temperatur und gelöste grenzflächenaktive Stoffe können sie verändern.', depthPoints: 8 },
      { id: 'EXP:OBERFLSPANNUNG', kind: 'experiment', title: 'Experiment: Grenzfläche verändern', summary: 'Untersuche qualitativ Temperatur und grenzflächenaktive Stoffe. Das Modell zeigt Trends; es behauptet nicht, dass ein Tropfen Spülmittel jede reale Oberfläche sofort und vollständig „zerstört“.', interactive: true, depthPoints: 9 },
      { id: 'QUIZ:WASSER-OBERFLAECHE', kind: 'quiz', title: 'Kurztest: Oberflächenspannung', summary: 'Prüfe Grenzfläche, Benetzung und die Grenzen der Haut-Analogie.', depthPoints: 10 },
    ]
  }, {
    id: 'UNIT:WASSER-KAPILLAR', title: 'Warum Flüssigkeit in engen Röhren steigt oder fällt',
    entryQuestion: 'Warum steigt Wasser in einer benetzenden engen Glasröhre über den äußeren Wasserspiegel?',
    takeaway: 'Kapillarität entsteht aus Oberflächenspannung, Kontaktwinkel, Dichte, Schwerkraft und Geometrie. In einer idealen zylindrischen Kapillare beschreibt die Jurin-Beziehung den Gleichgewichtstrend.',
    sections: [
      { id: 'EXPL:KAPILLAR-MODELL', kind: 'explanation', title: 'Kontaktwinkel gehört zur Gleichung', summary: 'Die bekannte Beziehung h = 2γ cosθ/(ρgr) gilt für ein idealisiertes Gleichgewicht in einer zylindrischen Kapillare. Sie zeigt: kleinerer Radius kann größere Steighöhe bedeuten, aber nur zusammen mit Benetzung und den übrigen Größen.', depthPoints: 8 },
      { id: 'EXP:KAPILLAR', kind: 'experiment', title: 'Experiment: Radius und Benetzung', summary: 'Verändere Röhrenradius und Benetzung im idealisierten Modell. Nutze es nicht als vollständige Erklärung des Wassertransports in hohen Bäumen: dort wirken zusätzlich Transpiration, Kohäsion, Xylemstruktur und Druckgradienten.', interactive: true, depthPoints: 10 },
      { id: 'QUIZ:WASSER-KAPILLAR', kind: 'quiz', title: 'Kurztest: Kapillarität', summary: 'Prüfe Radius, Kontaktwinkel und warum Kapillarität allein keinen 30-Meter-Baum erklärt.', depthPoints: 10 },
    ]
  }]
};
