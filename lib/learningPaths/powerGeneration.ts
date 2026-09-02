import type { LearningPath } from '../learningPaths';

export const powerGenerationLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-POWER-GENERATION-0001', title: 'Wie wird aus einer Energiequelle nutzbarer elektrischer Strom?',
  subtitle: 'Energieumwandlung, Leistung, Wirkungsgrad und Versorgung als zusammenhängendes Erzeugungssystem verstehen.', status: 'prototype',
  sourceModuleId: 'ENG-L1-000001', kxfModuleId: 'LRN:SSF:ENG-POWER-GENERATION-0001', domainsNeeded: ['KD:ENG-POWER-GENERATION:N2','KD:PHYS:N1','KD:ENG:N1'],
  suppliedBy: { knowledgeGraph: ['KD:ENG-POWER-GENERATION:N2','ENG-L1-000001','CON:ENG:power-vs-energy','CON:ENG:energy-conversion-chain','CON:ENG:generation-efficiency','CON:ENG:generation-profile','CON:ENG:dispatchability','CON:ENG:electrical-generation-balance','CON:ENG:storage-grid-redundancy'], kueperCom: [], overtimeArchive: [], ssf: ['Problemorientierte Lernsequenz','Leistungs-/Energiebilanz','NOXIA-Systemtransfer'] },
  unlocks: ['UNL:NOX:power-generation'],
  units: [
    { id:'UNIT:POWER:CONVERSION', title:'Von der Quelle zur elektrischen Energie', entryQuestion:'Die Sonne scheint – warum kann trotzdem das Licht ausgehen?', takeaway:'Energie wird umgewandelt, nicht erzeugt. Quelle, Wandler, Speicher und elektrische Abgabe sind verschiedene Teile eines Versorgungssystems.', gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:POWER:POWER-ENERGY'}, sections:[
      {id:'OBS:POWER:SOURCES',kind:'observation',title:'Energie ist vorhanden – aber in welcher Form?',summary:'Sonnenlicht liefert Strahlungsenergie, Wind Bewegungsenergie und Brennstoffe chemische Energie. Ein Verbraucher benötigt dagegen elektrische Energie in passender Form und zum richtigen Zeitpunkt.',depthPoints:5},
      {id:'EXPL:POWER:CHAIN',kind:'explanation',title:'Quelle → Wandler → Speicher → Verbraucher',summary:'Photovoltaik wandelt Strahlungsenergie elektrisch um; ein Generator wandelt mechanische Energie elektrisch um. Speicher verschieben Energie zeitlich, erzeugen sie aber nicht.',depthPoints:8},
      {id:'EXP:POWER:FLOW',kind:'experiment',title:'Beobachte die Umwandlungskette',summary:'Verfolge den Energiefluss durch mehrere Stufen und beobachte, wo Verluste auftreten.',interactive:true,interactiveId:'EXP:POWER:FLOW',depthPoints:10},
      {id:'QUIZ:POWER:CONVERSION',kind:'quiz',title:'Quelle oder Wandler?',summary:'Ordne Quelle, Wandler, Speicher und Verbraucher korrekt ein.',depthPoints:8}
    ]},
    { id:'UNIT:POWER:POWER-ENERGY', title:'Leistung ist nicht Energie', entryQuestion:'Eine Anlage hat 10 kW. Wie viele kWh liefert sie heute?', takeaway:'Leistung ist die momentane Rate der Energieübertragung. Energie ist Leistung über Zeit.', gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:POWER:EFFICIENCY'}, sections:[
      {id:'EXPL:POWER:P-VS-E',kind:'explanation',title:'kW und kWh beantworten verschiedene Fragen',summary:'Kilowatt beschreibt Leistung. Kilowattstunden beschreiben Energie. 4 kW über 6 Stunden ergeben bei konstanter Leistung 24 kWh.',depthPoints:8},
      {id:'EXP:POWER:P-VS-E',kind:'experiment',title:'Mach aus kW eine kWh-Bilanz',summary:'Verändere Leistung und Zeit. Die dargestellte Fläche macht sichtbar, warum beide Größen nötig sind.',interactive:true,interactiveId:'EXP:POWER:P-VS-E',depthPoints:12},
      {id:'EXAMPLE:POWER:GENERATOR',kind:'example',title:'Generatorvergleich',summary:'Ein Generator mit 5 kW, der drei Stunden konstant mit dieser Leistung läuft, liefert 15 kWh – sofern Energiequelle und Betriebsbedingungen das zulassen.',depthPoints:6},
      {id:'QUIZ:POWER:P-VS-E',kind:'quiz',title:'Finde den kW/kWh-Denkfehler',summary:'Unterscheide Momentanleistung und Energiemenge.',depthPoints:9}
    ]},
    { id:'UNIT:POWER:EFFICIENCY', title:'Warum nicht alles ankommt', entryQuestion:'Warum ist der Wirkungsgrad einer einzelnen Komponente nicht der Wirkungsgrad des Gesamtsystems?', takeaway:'Verluste wirken entlang der gesamten Kette. Bei aufeinanderfolgenden Stufen werden ihre Wirkungsgrade multipliziert.', gate:{type:'quiz_all_correct',unlocksUnitId:'UNIT:POWER:PROFILE'}, sections:[
      {id:'EXPL:POWER:EFFICIENCY',kind:'explanation',title:'Systemgrenze zuerst festlegen',summary:'Vereinfacht gilt η = P_out/P_in oder für passende Zeiträume η = E_out/E_in. PV, Leistungselektronik, Speicher und Leitungen können jeweils eigene Verluste beitragen.',depthPoints:9},
      {id:'EXP:POWER:EFFICIENCY',kind:'experiment',title:'Verluste durch die Kette verfolgen',summary:'Ändere die Wirkungsgrade einzelner Stufen und beobachte den Gesamteffekt.',interactive:true,interactiveId:'EXP:POWER:FLOW',depthPoints:11},
      {id:'QUIZ:POWER:EFFICIENCY',kind:'quiz',title:'Addieren oder multiplizieren?',summary:'Prüfe Wirkungsgrad, Verlust und Systemgrenze.',depthPoints:9}
    ]},
    { id:'UNIT:POWER:PROFILE', title:'Versorgung muss zu jeder Zeit funktionieren', entryQuestion:'Was hilft genügend Tagesenergie, wenn genau nachts die Batterie leer ist?', takeaway:'Versorgungssicherheit entsteht zu jedem Zeitpunkt aus dem Zusammenspiel von Erzeugung, Bedarf, Speicher und unabhängigen Reservepfaden.', sections:[
      {id:'OBS:POWER:MISMATCH',kind:'observation',title:'Der Tagesmittelwert kann täuschen',summary:'Ein Habitat kann über 24 Stunden rechnerisch viel Energie erzeugen und trotzdem in einzelnen Stunden zu wenig Leistung verfügbar haben.',depthPoints:6},
      {id:'EXP:POWER:HABITAT',kind:'experiment',title:'24 Stunden Habitatversorgung',summary:'Verändere Solarspitze, Grundlast und Batteriekapazität und suche die Versorgungslücke.',interactive:true,interactiveId:'EXP:POWER:HABITAT',depthPoints:14},
      {id:'EXPL:POWER:REDUNDANCY',kind:'explanation',title:'Zwei Systeme sind nicht automatisch zwei unabhängige Systeme',summary:'Gemeinsame Leitungen, Leistungselektronik, Kühlung oder andere Single Points of Failure können mehrere Erzeuger gleichzeitig unwirksam machen.',depthPoints:8},
      {id:'EXP:POWER:REDUNDANCY',kind:'experiment',title:'Lass Teile des Systems ausfallen',summary:'Teste Nacht, Staub, Batterie, Reservegenerator und eine gemeinsame Infrastruktur als Fehlerursachen.',interactive:true,interactiveId:'EXP:POWER:REDUNDANCY',depthPoints:14},
      {id:'EXERCISE:POWER:NOXIA',kind:'exercise',title:'Transfer: Entwirf ein Mars-Habitat',summary:'Entwirf aus Solar, Speicher und regelbarer Reserve ein Versorgungskonzept. Begründe mit Leistung, Energie, zeitlicher Verfügbarkeit und unabhängigen Fehlerpfaden – nicht nur mit installierten kW.',depthPoints:14},
      {id:'QUIZ:POWER:SYSTEM',kind:'quiz',title:'Systemcheck',summary:'Bewerte eine Versorgung als Gesamtsystem und identifiziere den tatsächlichen Engpass.',depthPoints:10}
    ]}
  ]
};
