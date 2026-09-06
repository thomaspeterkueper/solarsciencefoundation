import type { LearningPath } from '../learningPaths';

export const autoMotorLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-AUTO-MOTOR-0001',
  title: 'Warum wird ein Verbrennungsmotor heiß – und wie bleibt er im Arbeitsbereich?',
  subtitle: 'Energieumwandlung, Kühlung, Schmierung und Verschleiß ohne erfundene Universalwerte.',
  status: 'prototype',
  sourceModuleId: 'SSF-PHY-2001',
  kxfModuleId: 'LRN:SSF:PHY-3001',
  domainsNeeded: ['KD:PHYS-THERM:N1', 'KD:PHYS:N1', 'KD:CHM:N1'],
  suppliedBy: { knowledgeGraph: [], kueperCom: [], overtimeArchive: [], ssf: ['Verbrennungsmodell', 'Kühlkreislauf', 'Öl-/Viskositätsmodell', 'Verschleißmodell'] },
  unlocks: ['TOOL:ENGINE', 'SENSE:THERMAL'],
  units: [
    {
      id: 'UNIT:MOTOR:ENERGY',
      title: 'Chemische Energie wird nicht vollständig zu Antriebsarbeit',
      entryQuestion: 'Warum entsteht bei der Verbrennung gleichzeitig Nutzarbeit und Wärme?',
      takeaway: 'Im Zylinder wird chemische Energie in innere Energie, Druckarbeit und schließlich mechanische Arbeit umgewandelt. Ein erheblicher Anteil verlässt das System über Abgas, Kühlung und weitere Verluste; die Aufteilung hängt stark von Motor, Last und Betriebspunkt ab.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MOTOR:COOLING' },
      sections: [
        { id: 'OBS:MOTOR:HEAT', kind: 'observation', title: 'Wärme ist Teil der Energiebilanz', summary: 'Ein laufender Motor erwärmt Zylinderwände, Kühlmittel, Öl und Abgas. Daraus folgt nicht, dass ein fester Prozentsatz der Kraftstoffenergie immer an denselben Pfad geht.', depthPoints: 4 },
        { id: 'EXP:VERBRENNUNG-TEMP', kind: 'experiment', title: 'Experiment: Verbrennung qualitativ', summary: 'Nutze das Modell, um den Zusammenhang von Verbrennung, Druck und Temperatur zu erkunden. Angezeigte Werte sind keine universellen Kennwerte für alle Ottomotoren oder Dieselmotoren.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:MOTOR:BALANCE', kind: 'explanation', title: 'Wirkungsgrad ist ein Betriebspunkt-Ergebnis', summary: 'Thermischer Wirkungsgrad und Verlustpfade verändern sich mit Last, Drehzahl, Gemisch, Verdichtung, Aufladung, Kühlung und Motorbauart. Eine starre Aufteilung wie 35/35/30 wird deshalb nicht als allgemeine Motorphysik gelehrt.', depthPoints: 8 },
        { id: 'QUIZ:MOTOR:ENERGY', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Nutzarbeit und Verlustpfade unterscheiden und erklären, warum eine feste Prozentaufteilung nicht universell ist.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:MOTOR:COOLING',
      title: 'Kühlung hält Bauteile in zulässigen Temperaturbereichen',
      entryQuestion: 'Warum reicht es nicht zu sagen, der Kühler „kühlt den Motor mit Wasser“?',
      takeaway: 'Das Kühlmittel transportiert Wärme vom Motor zum Wärmetauscher. Pumpe, Thermostat, Luftstrom, Kühlmittelgemisch und Regelstrategie bestimmen gemeinsam den Wärmehaushalt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MOTOR:LUBRICATION' },
      sections: [
        { id: 'EXP:KUEHLKREISLAUF', kind: 'experiment', title: 'Experiment: Kühlkreislauf', summary: 'Verfolge Pumpe, Thermostat und Kühler als gekoppeltes System. Das Modell zeigt Funktionszusammenhänge, nicht die exakte Temperaturstrategie eines konkreten Fahrzeugs.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:MOTOR:COOLANT', kind: 'explanation', title: 'Kühlmittel ist mehr als Wasser', summary: 'Fahrzeugkühlmittel sind typischerweise Wasser-Glykol-Gemische mit Additiven. Zusammensetzung und Wartung richten sich nach Herstellervorgaben; reines Wasser ist keine allgemeine Betriebsempfehlung.', depthPoints: 8 },
        { id: 'QUIZ:MOTOR:COOLING', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Wärmetransportpfad und Regelkomponenten erklären und erkennen, warum Kühlmittelzusammensetzung fahrzeugspezifisch ist.', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:MOTOR:LUBRICATION',
      title: 'Schmierung, Ölalterung und Verschleiß',
      entryQuestion: 'Warum hängt Motorverschleiß nicht einfach von der gefahrenen Kilometerzahl ab?',
      takeaway: 'Verschleiß entsteht aus tribologischen Kontaktbedingungen. Schmierstoffzustand, Temperatur, Last, Partikel, Materialpaarung, Start-Stopp-Betrieb und Wartung beeinflussen den Verlauf; Kilometer sind nur eine grobe Nutzungsgröße.',
      sections: [
        { id: 'EXP:OELEIGENSCHAFTEN', kind: 'experiment', title: 'Experiment: Öl und Temperatur', summary: 'Erkunde qualitativ, wie sich Viskosität mit Temperatur ändert. Das Modell vermeidet eine universelle Verbrennungs- oder Versagensschwelle für Motoröle.', interactive: true, depthPoints: 7 },
        { id: 'EXP:MOTOR-VERSCHLEISS', kind: 'experiment', title: 'Experiment: Verschleißbedingungen', summary: 'Variiere Belastung, Weg, abrasive Partikel und Schmierung. Das Modell gibt einen relativen Verschleißindex aus und ausdrücklich keine Lebensdauer in Kilometern.', interactive: true, depthPoints: 8 },
        { id: 'QUIZ:MOTOR:LUBRICATION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Viskosität, Schmierung und Verschleißfaktoren unterscheiden und erklären, warum keine universelle Austauschkilometerzahl existiert.', depthPoints: 15 },
      ],
    },
  ],
};
