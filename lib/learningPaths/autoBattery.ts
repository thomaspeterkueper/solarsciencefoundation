import type { LearningPath } from '../learningPaths';

export const autoBatteryLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-AUTO-BATTERIE-0001',
  title: 'Warum wird eine Batterie warm – und warum ändern Kälte und Schnellladen ihre Grenzen?',
  subtitle: 'Irreversible und reversible Wärme, Innenwiderstand, BMS und Schnellladen ohne universelle Prozent- oder Temperaturschwellen.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2006',
  kxfModuleId: 'LRN:SSF:PHY-2006',
  domainsNeeded: ['KD:PHYS-THERM:N1', 'KD:CHM-ELECTROCHEM:N2', 'KD:ELEC:N1'],
  suppliedBy: { knowledgeGraph: [], kueperCom: [], overtimeArchive: [], ssf: ['Batterie-Wärmemodell', 'BMS-Zustandsmodell', 'Schnelllade-Modell'] },
  unlocks: ['SENSE:THERMAL', 'TOOL:BATTERY', 'PHY:ENTROPY-BASICS'],
  units: [
    {
      id: 'UNIT:BATTERY:HEAT',
      title: 'Eine Zelle kann Wärme erzeugen oder reversible Wärme austauschen',
      entryQuestion: 'Warum reicht die Aussage „Strom macht die Batterie warm“ physikalisch nicht aus?',
      takeaway: 'Zur Zellwärme tragen irreversible Verluste durch ohmsche und elektrochemische Polarisation sowie reversible entropische Wärme bei. Größe und Vorzeichen der reversiblen Komponente hängen unter anderem von Chemie und Ladezustand ab.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BATTERY:BMS' },
      sections: [
        { id: 'OBS:BATTERY:HEAT', kind: 'observation', title: 'Temperatur ist das Ergebnis mehrerer Beiträge', summary: 'Beim Laden und Entladen fließt Strom und es entstehen irreversible Verluste. Zusätzlich kann die elektrochemische Reaktion reversible Wärme aufnehmen oder abgeben. Daraus folgt kein allgemeines Gesetz „Laden wärmt, Entladen kühlt“.', depthPoints: 4 },
        { id: 'EXP:BATTERIE-LADEN-ENTLADEN', kind: 'experiment', title: 'Experiment: Laden und Entladen', summary: 'Nutze das vorhandene Batteriemodell als qualitative Darstellung von Strom, Spannung und Wärme. Konkrete Temperaturwerte werden nicht als universelle Zellkennwerte interpretiert.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:BATTERY:REVERSIBLE', kind: 'explanation', title: 'Reversible Wärme kann ihr Vorzeichen wechseln', summary: 'Der entropische Wärmeanteil ist nicht bei jeder Zellchemie und jedem Ladezustand gleich. Er kann beim Laden oder Entladen heizend oder kühlend wirken. Für eine reale Vorhersage braucht man zellspezifische Daten.', depthPoints: 8 },
        { id: 'QUIZ:BATTERY:HEAT', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Irreversible und reversible Wärme unterscheiden und erklären, warum die Richtung der reversiblen Wärme nicht pauschal an Laden oder Entladen gekoppelt werden darf.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:BATTERY:BMS',
      title: 'Das BMS setzt Betriebsgrenzen aus mehreren Zuständen',
      entryQuestion: 'Was muss ein Batteriemanagementsystem wissen, bevor es hohe Lade- oder Entladeleistung freigibt?',
      takeaway: 'Ein BMS überwacht unter anderem Zellspannungen, Strom und Temperaturen und schätzt Zustände wie SOC. Daraus setzt es Betriebsgrenzen; Zellchemie, Packdesign, Alterung und Herstellerstrategie bestimmen die konkreten Schwellen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:BATTERY:FASTCHARGE' },
      sections: [
        { id: 'EXP:BATTERIE-MANAGEMENT', kind: 'experiment', title: 'Experiment: BMS-Entscheidung', summary: 'Variiere SOC, Zelltemperatur und Zellabweichung. Das Lehrmodell zeigt, warum mehrere Zustände gemeinsam über Freigabe oder Begrenzung entscheiden.', interactive: true, depthPoints: 9 },
        { id: 'EXP:BATTERIE-ALTERUNG', kind: 'experiment', title: 'Experiment: Temperatur und Stromfreigabe', summary: 'Das qualitative Temperaturmodell zeigt, warum Kälte und hohe Temperatur Betriebsgrenzen verändern können. Es behauptet keine universelle Restkapazität bei einer bestimmten Temperatur.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:BATTERY:WINTER', kind: 'explanation', title: 'Winterreichweite ist mehr als Zellkapazität', summary: 'Niedrige Temperatur kann Innenwiderstand, Leistungsfähigkeit und Ladeannahme beeinflussen. Zusätzlich benötigt das Fahrzeug Energie für Innenraum- und Batterietemperierung. Die Reichweitenänderung lässt sich deshalb nicht durch eine einzige feste Kapazitätszahl erklären.', depthPoints: 8 },
        { id: 'QUIZ:BATTERY:BMS', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'BMS-Funktionen und Wintereffekte einordnen und feste Universalgrenzen von zellspezifischen Kennfeldern unterscheiden.', depthPoints: 15 },
      ],
    },
    {
      id: 'UNIT:BATTERY:FASTCHARGE',
      title: 'Schnellladen ist ein dynamischer Betriebspunkt',
      entryQuestion: 'Warum bleibt die höchste Ladeleistung nicht vom niedrigen SOC bis nahezu 100 % konstant?',
      takeaway: 'Ladeleistung wird entlang der Ladekurve durch Zellspannung, Temperatur, SOC, Alterung, Kühlung und Packgrenzen angepasst. Typische Ladeprofile besitzen Hochleistungsbereiche und Tapering, aber keinen universellen 80-%-Knick.',
      sections: [
        { id: 'EXP:SCHNELLLADEN-SIMULATION', kind: 'experiment', title: 'Experiment: Schnelllade-Freigabe', summary: 'Variiere SOC, Temperatur und angeforderte C-Rate. Das Modell macht sichtbar, dass das BMS die tatsächlich freigegebene Ladeleistung dynamisch begrenzen kann.', interactive: true, depthPoints: 9 },
        { id: 'EXPL:BATTERY:AGING', kind: 'explanation', title: 'Alterung hat mehrere Mechanismen', summary: 'Batteriealterung umfasst Kalender- und Zyklusalterung. Temperatur, mittlerer SOC, SOC-Fenster, Lade-/Entladerate, Zellchemie und Zeit wirken zusammen; reine Zyklenzählung ist keine vollständige Lebensdauerbeschreibung.', depthPoints: 8 },
        { id: 'QUIZ:BATTERY:FASTCHARGE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Tapering erklären, BMS-Begrenzung von chemischer Alterung unterscheiden und erkennen, warum ein einzelner Schwellenwert keine reale Ladekurve beschreibt.', depthPoints: 15 },
      ],
    },
  ],
};
