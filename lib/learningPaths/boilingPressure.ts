import type { LearningPath } from '../learningPaths';

export const boilingPressureLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-REINIGUNG-SIEDEPUNKT-0001',
  title: 'Warum hängt der Siedepunkt vom Druck ab?',
  subtitle: 'Dampfdruck, Umgebungsdruck und Schnellkochtopf — ohne 100 °C als universelle Naturkonstante.',
  status: 'prototype', sourceModuleId: 'SSF-PHY-2003', kxfModuleId: 'LRN:SSF:PHY-3003',
  domainsNeeded: ['KD:PHYS-THERM:N1', 'KD:PHYS:N1'],
  suppliedBy: { knowledgeGraph: ['Kanonische Physik-Domänen'], kueperCom: [], overtimeArchive: [], ssf: ['Dampfdruckmodell', 'Druck-Siedepunkt-Vergleich', 'Schnellkochtopf-Transfer'] },
  unlocks: ['PHY:PHASE-DIAGRAM', 'PHY:BOILING-POINT', 'TOOL:ALTITUDE-COOKING'],
  units: [{
    id: 'UNIT:SIEDEPUNKT-DRUCK', title: 'Sieden ist ein Druckgleichgewicht',
    entryQuestion: 'Warum kann Wasser an verschiedenen Orten bei unterschiedlichen Temperaturen sieden?',
    takeaway: 'Eine Flüssigkeit siedet, wenn ihr Sättigungsdampfdruck den äußeren Druck erreicht. 100 °C gilt für reines Wasser nur näherungsweise bei Standardatmosphärendruck.',
    gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SIEDEPUNKT-KUECHE' },
    sections: [
      { id: 'OBS:SIEDEPUNKT-ORT', kind: 'observation', title: 'Dasselbe Wasser, anderer Druck', summary: 'Auf großer Höhe ist der Luftdruck geringer. Wasser kann deshalb bei niedrigerer Temperatur sieden. „Es kocht“ sagt also nicht allein, welche Temperatur die Flüssigkeit hat.', depthPoints: 5 },
      { id: 'EXPL:DAMPFDRUCK', kind: 'explanation', title: 'Dampfdruck statt Fluchtenergie', summary: 'Auch unterhalb des Siedepunkts wechseln Moleküle zwischen Flüssigkeit und Gasphase. Der Sättigungsdampfdruck steigt stark mit der Temperatur. Sieden setzt ein, wenn sich Dampfblasen im Flüssigkeitsinneren gegen den äußeren Druck halten können.', depthPoints: 8 },
      { id: 'EXP:SIEDEPUNKT', kind: 'experiment', title: 'Experiment: Druck verschiebt den Siedepunkt', summary: 'Verändere den äußeren Druck und beobachte die zugehörige Siedetemperatur im Modell. Einzelwerte sind Näherungen für reines Wasser; Wetter, Höhe und gelöste Stoffe können reale Werte verändern.', interactive: true, depthPoints: 10 },
      { id: 'QUIZ:SIEDEPUNKT-1', kind: 'quiz', title: 'Kurztest: Druck und Sieden', summary: 'Prüfe den Zusammenhang zwischen Sättigungsdampfdruck, äußerem Druck und Siedetemperatur.', depthPoints: 10 },
    ]
  }, {
    id: 'UNIT:SIEDEPUNKT-KUECHE', title: 'Was der Schnellkochtopf wirklich ändert',
    entryQuestion: 'Warum kann Wasser im Schnellkochtopf heißer als 100 °C werden?',
    takeaway: 'Der geschlossene Topf arbeitet bei erhöhtem Druck. Dadurch steigt die Siedetemperatur des Wassers; die höhere Gartemperatur kann viele Garprozesse beschleunigen. Druck und Temperatur hängen vom konkreten Gerät und Betriebszustand ab.',
    sections: [
      { id: 'OBS:SCHNELLKOCHTOPF', kind: 'observation', title: 'Ventil, Druck und Temperatur', summary: 'Ein Schnellkochtopf hält Dampf zurück und regelt den Betriebsdruck über sein Ventilsystem. Er erzeugt daher nicht eine universelle Temperatur oder eine feste Zeitersparnis für jedes Lebensmittel.', depthPoints: 5 },
      { id: 'EXP:SCHNELLKOCHTOPF', kind: 'experiment', title: 'Experiment: Druck und Siedetemperatur', summary: 'Verändere den modellierten absoluten Druck und beobachte die Siedetemperatur. Nutze die Darstellung zum Vergleich, nicht als Garzeitrechner: Garzeit hängt zusätzlich von Lebensmittel, Größe, Ausgangstemperatur und gewünschtem Ergebnis ab.', interactive: true, depthPoints: 10 },
      { id: 'EXPL:SCHNELL-GAREN', kind: 'explanation', title: 'Warum höhere Temperatur Prozesse beschleunigt', summary: 'Viele chemische und physikalische Veränderungen beim Garen laufen bei höherer Temperatur schneller. Daraus folgt aber keine feste Halbierung der Kochzeit. Die Kinetik ist pro Prozess und Lebensmittel verschieden.', depthPoints: 7 },
      { id: 'QUIZ:SIEDEPUNKT-2', kind: 'quiz', title: 'Kurztest: Kochen unter Druck', summary: 'Prüfe, warum der Siedepunkt steigt und weshalb aus der Temperatur keine universelle Garzeit folgt.', depthPoints: 10 },
    ]
  }]
};
