import type { LearningPath } from '../learningPaths';

/**
 * SSF implementation of KG learning contract ENG-L1-000001.
 * Canonical source: exports/energy-power-generation-0.1.json
 */
export const powerGenerationLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-POWER-GENERATION-0001',
  title: 'Wie wird aus einer Energiequelle nutzbarer elektrischer Strom?',
  subtitle: 'Energieumwandlung, Leistung, Wirkungsgrad und Versorgung als zusammenhängendes Erzeugungssystem verstehen.',
  status: 'prototype',
  sourceModuleId: 'ENG-L1-000001',
  kxfModuleId: 'LRN:SSF:ENG-POWER-GENERATION-0001',
  domainsNeeded: ['KD:ENG-POWER-GENERATION:N2', 'KD:PHYS:N1', 'KD:ENG:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'KD:ENG-POWER-GENERATION:N2',
      'ENG-L1-000001',
      'CON:ENG:power-vs-energy',
      'CON:ENG:energy-conversion-chain',
      'CON:ENG:generation-efficiency',
      'CON:ENG:generation-profile',
      'CON:ENG:dispatchability',
      'CON:ENG:electrical-generation-balance',
      'CON:ENG:storage-grid-redundancy',
    ],
    kueperCom: [], overtimeArchive: [],
    ssf: ['Problemorientierte Lernsequenz', 'Leistungs-/Energiebilanz', 'NOXIA-Systemtransfer'],
  },
  unlocks: ['UNL:NOX:power-generation'],
  units: [
    {
      id: 'UNIT:POWER:CONVERSION',
      title: 'Von der Quelle zur elektrischen Energie',
      entryQuestion: 'Warum erzeugt eine Energiequelle nicht automatisch elektrischen Strom?',
      takeaway: 'Ein Erzeugungssystem braucht eine Umwandlungskette. Quelle, Wandler und elektrische Abgabe sind unterschiedliche Teile des Systems.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:POWER:POWER-ENERGY' },
      sections: [
        { id: 'OBS:POWER:SOURCES', kind: 'observation', title: 'Sonne, Bewegung, chemische und thermische Quellen', summary: 'Verschiedene Quellen stellen Energie in unterschiedlichen Formen bereit. Erst eine geeignete technische Umwandlung macht daraus elektrische Energie.', depthPoints: 5 },
        { id: 'EXPL:POWER:CHAIN', kind: 'explanation', title: 'Die Energieumwandlungskette', summary: 'Bei Photovoltaik wird Strahlungsenergie direkt elektrisch nutzbar gemacht. Bei einem Generator führt mechanische Bewegung zur elektrischen Erzeugung. Diese Beispiele sind unterschiedliche Anwendungen desselben Grundgedankens: Energie wird umgewandelt, nicht erzeugt.', depthPoints: 9 },
        { id: 'EXAMPLE:POWER:TECHNOLOGIES', kind: 'example', title: 'Technologie ist Anwendung, nicht Universalregel', summary: 'Solar-PV und Generatorprinzip zeigen zwei verschiedene Umwandlungswege. Eigenschaften einer Technologie dürfen nicht automatisch auf alle Erzeuger übertragen werden.', depthPoints: 7 },
        { id: 'QUIZ:POWER:CONVERSION', kind: 'quiz', title: 'Umwandlung verstehen', summary: 'Quelle, Umwandlung und elektrische Abgabe voneinander unterscheiden.', depthPoints: 10 },
      ],
    },
    {
      id: 'UNIT:POWER:POWER-ENERGY',
      title: 'Leistung ist nicht Energie',
      entryQuestion: 'Warum sagt eine Anlage mit 10 kW noch nicht, wie viel Energie sie an einem Tag liefert?',
      takeaway: 'Leistung beschreibt die momentane Rate der Energieübertragung. Energie ergibt sich aus Leistung über Zeit; bei konstanter Leistung gilt E = P · t.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:POWER:EFFICIENCY' },
      sections: [
        { id: 'EXPL:POWER:P-VS-E', kind: 'explanation', title: 'kW und kWh beantworten verschiedene Fragen', summary: 'Kilowatt beschreibt Leistung. Kilowattstunden beschreiben Energie. Eine hohe Nennleistung kann bei kurzer oder schwankender Verfügbarkeit trotzdem eine kleinere Energiemenge liefern.', depthPoints: 9 },
        { id: 'EXAMPLE:POWER:DAY', kind: 'example', title: 'Zeit gehört in die Bilanz', summary: 'Eine konstante elektrische Leistung von 2 kW über 5 Stunden entspricht 10 kWh Energie. Reale Erzeugungsprofile sind häufig nicht konstant, deshalb muss die Leistung über die Zeit betrachtet werden.', depthPoints: 8 },
        { id: 'QUIZ:POWER:P-VS-E', kind: 'quiz', title: 'Leistung und Energie trennen', summary: 'Aus Leistung und Zeit eine Energiebilanz ableiten und typische kW/kWh-Verwechslungen erkennen.', depthPoints: 11 },
      ],
    },
    {
      id: 'UNIT:POWER:EFFICIENCY',
      title: 'Warum nicht die gesamte Eingangsenergie elektrisch ankommt',
      entryQuestion: 'Was bedeutet ein Wirkungsgrad von weniger als 100 Prozent für die Erzeugungskette?',
      takeaway: 'Wirkungsgrad vergleicht nutzbare Ausgangsenergie oder -leistung mit der zugeführten Größe. Verluste müssen in der Systembilanz berücksichtigt werden.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:POWER:PROFILE' },
      sections: [
        { id: 'EXPL:POWER:EFFICIENCY', kind: 'explanation', title: 'Nutzbarer Ausgang und Verluste', summary: 'Vereinfacht gilt η = P_out / P_in beziehungsweise für passende Zeiträume η = E_out / E_in. Welche Verlustmechanismen auftreten, hängt von der jeweiligen Technologie ab.', depthPoints: 10 },
        { id: 'EXAMPLE:POWER:BOUNDARY', kind: 'example', title: 'Die Systemgrenze entscheidet mit', summary: 'Der Wirkungsgrad eines einzelnen Wandlers ist nicht automatisch der Wirkungsgrad der gesamten Versorgung. Leistungselektronik, Leitungen, Speicher und weitere Stufen können zusätzliche Verluste verursachen.', depthPoints: 8 },
        { id: 'QUIZ:POWER:EFFICIENCY', kind: 'quiz', title: 'Wirkungsgrad richtig verwenden', summary: 'Eingang, Ausgang, Verlust und Systemgrenze korrekt unterscheiden.', depthPoints: 11 },
      ],
    },
    {
      id: 'UNIT:POWER:PROFILE',
      title: 'Erzeugung und Bedarf müssen zeitlich zusammenpassen',
      entryQuestion: 'Was hilft eine große Tagesenergiemenge, wenn genau im kritischen Moment keine Leistung verfügbar ist?',
      takeaway: 'Versorgungssicherheit entsteht aus dem zeitlichen Zusammenspiel von Erzeugungsprofil, Bedarf, Regelbarkeit, Speicher, Netz und Reserven.',
      sections: [
        { id: 'OBS:POWER:MISMATCH', kind: 'observation', title: 'Energie genug, Leistung zur falschen Zeit', summary: 'Ein System kann über einen langen Zeitraum genügend Energie erzeugen und trotzdem kurzfristig unterversorgt sein. Die elektrische Bilanz muss deshalb zeitaufgelöst gedacht werden.', depthPoints: 6 },
        { id: 'EXPL:POWER:DISPATCH', kind: 'explanation', title: 'Verfügbarkeit und Regelbarkeit', summary: 'Erzeuger unterscheiden sich darin, wann und wie steuerbar ihre Leistung verfügbar ist. Speicher oder Netzkopplung können zeitliche Differenzen zwischen Erzeugung und Verbrauch ausgleichen.', depthPoints: 9 },
        { id: 'EXPL:POWER:REDUNDANCY', kind: 'explanation', title: 'Redundanz ist mehr als zusätzliche Nennleistung', summary: 'Robustheit verlangt, gemeinsame Fehlerursachen mitzudenken. Zwei Erzeuger sind keine vollständig unabhängige Reserve, wenn beide von derselben kritischen Infrastruktur abhängen.', depthPoints: 9 },
        { id: 'EXERCISE:POWER:NOXIA', kind: 'exercise', title: 'NOXIA: Versorgungssystem entwerfen', summary: 'Ordne für ein Habitat Grundlast, Spitzenlast, Erzeugungsprofile, Speicher und Reservepfade. Begründe, welche Größe die Versorgung begrenzt: Leistung, Energie, Verfügbarkeit oder eine gemeinsame Abhängigkeit.', depthPoints: 12 },
        { id: 'QUIZ:POWER:SYSTEM', kind: 'quiz', title: 'Vom Erzeuger zum Versorgungssystem', summary: 'Eine Systementscheidung aus Leistungs-, Energie-, Wirkungsgrad- und Verfügbarkeitsbilanz begründen.', depthPoints: 12 },
      ],
    },
  ],
};
