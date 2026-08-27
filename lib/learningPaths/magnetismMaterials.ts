import type { LearningPath } from '../learningPaths';

export const magnetismMaterialsLearningPath: LearningPath = {
  id: 'PATH:SSF:MAGNETISM-MATERIALS',
  title: 'Magnetismus & funktionale Materialien',
  subtitle: 'Vom Magnetfeld zum funktionalen Werkstoff: Struktur, Temperatur, Herstellung und Anwendung.',
  status: 'prototype',
  sourceModuleId: 'LRN:SSF:MAG-001',
  kxfModuleId: 'PHY-L1-000017',
  domainsNeeded: [],
  suppliedBy: {
    knowledgeGraph: [
      'Kanonische Modul-IDs PHY-L1-000017 bis PHY-L1-000024',
      'Abhaengigkeitskette und fachlicher Scope im KXF-Export'
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Didaktische Reihenfolge und Lerndauern',
      'Lernziele, Beispiele und Assessments aus modules/materials/MAG-001..008.yaml'
    ]
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:MAG-001',
      title: 'Magnetfelder verstehen',
      entryQuestion: 'Was ist ein Magnetfeld — und wie kann elektrischer Strom eines erzeugen?',
      takeaway: 'Magnetismus wird als Feld beschrieben; Magnete sind Dipole, und bewegte elektrische Ladungen erzeugen Magnetfelder.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-002' },
      sections: [
        { id: 'EXPL:MAG-001', kind: 'explanation', title: 'Felder und Dipole', summary: 'Magnetfelder, magnetische Dipole und die Verbindung zwischen elektrischem Strom und Magnetfeld.', depthPoints: 8 },
        { id: 'QUIZ:MAG-001', kind: 'quiz', title: 'Quiz: Magnetfeld', summary: 'Feldmodell, Dipolstruktur und stromerzeugte Magnetfelder unterscheiden.', depthPoints: 12 }
      ]
    },
    {
      id: 'UNIT:MAG-002',
      title: 'Warum Materialien magnetisch sind',
      entryQuestion: 'Warum wird Eisen stark magnetisch, Kupfer aber nicht?',
      takeaway: 'Magnetische Eigenschaften entstehen aus mikroskopischen Momenten und ihrer kollektiven Ordnung im Material.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-003' },
      sections: [
        { id: 'EXPL:MAG-002', kind: 'explanation', title: 'Momente und Domaenen', summary: 'Magnetische Momente, Dia-, Para- und Ferromagnetismus sowie magnetische Domaenen.', depthPoints: 8 },
        { id: 'QUIZ:MAG-002', kind: 'quiz', title: 'Quiz: Materialverhalten', summary: 'Dia-, Para- und Ferromagnetismus sowie Domaenen einordnen.', depthPoints: 12 }
      ]
    },
    {
      id: 'UNIT:MAG-003',
      title: 'Weich- und hartmagnetische Werkstoffe',
      entryQuestion: 'Warum braucht ein Transformator einen anderen Magnetwerkstoff als ein Permanentmagnet?',
      takeaway: 'Hysterese, Remanenz und Koerzitivfeldstaerke bestimmen, ob ein Werkstoff leicht ummagnetisierbar oder dauerhaft magnetisiert ist.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-004' },
      sections: [
        { id: 'EXPL:MAG-003', kind: 'explanation', title: 'Hysterese lesen', summary: 'Hysteresekurve, Remanenz, Koerzitivfeldstaerke und die funktionale Trennung weich- und hartmagnetischer Werkstoffe.', depthPoints: 10 },
        { id: 'QUIZ:MAG-003', kind: 'quiz', title: 'Quiz: Werkstoffwahl', summary: 'Transformator, Elektromagnet und Permanentmagnet passenden Werkstofftypen zuordnen.', depthPoints: 14 }
      ]
    },
    {
      id: 'UNIT:MAG-004',
      title: 'Permanentmagnete als Werkstoffe',
      entryQuestion: 'Ist der staerkste Magnet automatisch der beste Magnet?',
      takeaway: 'Ferrit, AlNiCo, SmCo und NdFeB sind Kompromisse aus magnetischer Leistung, Temperatur, Korrosion, Kosten und Rohstofflage.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-005' },
      sections: [
        { id: 'EXPL:MAG-004', kind: 'explanation', title: 'Vier Magnetklassen', summary: 'Ferrit, AlNiCo, SmCo und NdFeB anhand technischer Auswahlkriterien vergleichen.', depthPoints: 10 },
        { id: 'QUIZ:MAG-004', kind: 'quiz', title: 'Quiz: Permanentmagnete', summary: 'Magnetwerkstoffe fuer unterschiedliche Einsatzprofile auswaehlen.', depthPoints: 14 }
      ]
    },
    {
      id: 'UNIT:MAG-005',
      title: 'Magnetismus und Temperatur',
      entryQuestion: 'Wann verliert ein Magnet seine Wirkung — und kommt sie beim Abkuehlen zurueck?',
      takeaway: 'Arbeitstemperatur, reversible Verluste und Curie-Temperatur sind verschiedene Grenzen eines Magnetwerkstoffs.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-006' },
      sections: [
        { id: 'EXPL:MAG-005', kind: 'explanation', title: 'Temperaturgrenzen', summary: 'Curie-Temperatur sowie reversible und irreversible Entmagnetisierung unterscheiden.', depthPoints: 10 },
        { id: 'QUIZ:MAG-005', kind: 'quiz', title: 'Quiz: Temperatur', summary: 'Arbeitstemperatur und Curie-Temperatur korrekt einordnen.', depthPoints: 14 }
      ]
    },
    {
      id: 'UNIT:MAG-006',
      title: 'Vom Rohstoff zum Magneten',
      entryQuestion: 'Warum reicht die chemische Zusammensetzung nicht aus, um einen Magneten zu beschreiben?',
      takeaway: 'Technische Eigenschaften entstehen aus Zusammensetzung, Mikrostruktur und Verarbeitung — nicht aus dem Elementnamen allein.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-007' },
      sections: [
        { id: 'EXPL:MAG-006', kind: 'explanation', title: 'Die Werkstoffkette', summary: 'Rohstoff, Zusammensetzung, Mikrostruktur, Verarbeitung, Recycling und Bauteilfunktion als zusammenhaengende Prozesskette.', depthPoints: 12 },
        { id: 'QUIZ:MAG-006', kind: 'quiz', title: 'Quiz: Prozesskette', summary: 'Einfluss von Verarbeitung und Mikrostruktur auf die Magnetfunktion einordnen.', depthPoints: 16 }
      ]
    },
    {
      id: 'UNIT:MAG-007',
      title: 'Anwendungen magnetischer Materialien',
      entryQuestion: 'Was haben Motor, Transformator und Hall-Sensor gemeinsam — und was brauchen sie jeweils anders?',
      takeaway: 'Die Anwendung entscheidet, welche magnetische Funktion und damit welcher Werkstoff gebraucht wird.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MAG-008' },
      sections: [
        { id: 'EXPL:MAG-007', kind: 'explanation', title: 'Von Motor bis Sensor', summary: 'Elektromotoren, Generatoren, Transformatoren, Hall-Sensoren und magnetische Lager nach ihrer Materialfunktion vergleichen.', depthPoints: 12 },
        { id: 'QUIZ:MAG-007', kind: 'quiz', title: 'Quiz: Anwendungen', summary: 'Permanentmagnet, weichmagnetischen Kern und Elektromagnet funktional unterscheiden.', depthPoints: 16 }
      ]
    },
    {
      id: 'UNIT:MAG-008',
      title: 'Fortgeschrittene magnetische Funktionen',
      entryQuestion: 'Welche magnetischen Effekte werden interessant, wenn klassische Permanentmagnete nicht mehr ausreichen?',
      takeaway: 'Wirbelstroeme, Abschirmung, Magnetokalorik, Supraleitung und Flux Pinning erweitern Magnetismus zu einer Familie funktionaler Materialeffekte.',
      sections: [
        { id: 'EXPL:MAG-008', kind: 'explanation', title: 'Jenseits des Permanentmagneten', summary: 'Elektromagnete, Wirbelstroeme, magnetische Abschirmung, Magnetokalorik, Supraleitung und Flux Pinning als weiterfuehrende Funktionen.', depthPoints: 14 },
        { id: 'QUIZ:MAG-008', kind: 'quiz', title: 'Abschlussquiz', summary: 'Magnetische Materialfunktionen auf physikalische Prinzipien und Werkstoffeigenschaften zurueckfuehren.', depthPoints: 20 }
      ]
    }
  ]
};
