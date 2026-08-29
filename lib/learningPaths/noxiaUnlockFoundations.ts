import type { LearningPath, LearningPathSection } from '../learningPaths';

type UnlockPathSpec = {
  slug: string;
  title: string;
  subtitle: string;
  moduleId: string;
  kxfModuleId: string;
  unlock: string;
  domains: string[];
  questions: [string, string, string];
  takeaways: [string, string, string];
};

function sections(slug: string, topic: string, question: string, takeaway: string): LearningPathSection[] {
  return [
    {
      id: `OBS:${slug}-${topic}`,
      kind: 'observation',
      title: 'Ausgangslage beobachten',
      summary: question,
      depthPoints: 5,
    },
    {
      id: `EXPL:${slug}-${topic}`,
      kind: 'explanation',
      title: 'Das System verstehen',
      summary: takeaway,
      depthPoints: 8,
    },
    {
      id: `EXP:${slug}-${topic}`,
      kind: 'exercise',
      title: 'Entscheidung auf einen Anwendungsfall übertragen',
      summary: 'Ordne die entscheidenden Größen, Risiken und Abhängigkeiten und begründe, welche technische Entscheidung daraus folgt.',
      depthPoints: 8,
    },
    {
      id: `QUIZ:${slug}-${topic}`,
      kind: 'quiz',
      title: 'Verständnis prüfen',
      summary: 'Erkläre die zentrale Ursache-Wirkungs-Kette in eigenen Worten und nenne eine Fehlentscheidung, die dadurch vermieden wird.',
      depthPoints: 5,
    },
  ];
}

function buildPath(spec: UnlockPathSpec): LearningPath {
  const unitIds = [1, 2, 3].map((n) => `UNIT:${spec.slug}-${n}`);
  return {
    id: `PATH:SSF:NOX-${spec.slug}-0001`,
    title: spec.title,
    subtitle: spec.subtitle,
    status: 'prototype',
    sourceModuleId: spec.moduleId,
    kxfModuleId: spec.kxfModuleId,
    domainsNeeded: spec.domains,
    suppliedBy: {
      knowledgeGraph: [
        `Kanonische Lernmodul-Identität ${spec.kxfModuleId}`,
        `Strukturelle Zuordnung zu ${spec.moduleId}`,
        'Fachliche Voraussetzungen und Modulabhängigkeiten',
      ],
      kueperCom: [],
      overtimeArchive: [],
      ssf: [
        'Problemorientierte Lernsequenz',
        'Anwendungsübung und Transfer in einen technischen Systemkontext',
        'Verständnisprüfung nach Beobachtung, Erklärung und Anwendung',
      ],
    },
    unlocks: [spec.unlock],
    units: unitIds.map((unitId, index) => ({
      id: unitId,
      title: index === 0 ? 'Problem erkennen' : index === 1 ? 'Zusammenhänge verstehen' : 'Systementscheidung treffen',
      entryQuestion: spec.questions[index],
      takeaway: spec.takeaways[index],
      gate: index < 2 ? { type: 'quiz_all_correct', unlocksUnitId: unitIds[index + 1] } : undefined,
      sections: sections(spec.slug, String(index + 1), spec.questions[index], spec.takeaways[index]),
    })),
  };
}

const specs: UnlockPathSpec[] = [
  {
    slug: 'RESOURCE-EXTRACTION',
    title: 'Wie gewinnt man Rohstoffe, ohne nur Gestein zu bewegen?',
    subtitle: 'Lagerstätte, Trennbarkeit, Energiebedarf und Ausbeute als zusammenhängendes Extraktionssystem verstehen.',
    moduleId: 'ENG-L1-000005',
    kxfModuleId: 'LRN:SSF:NOX-RESOURCE-EXTRACTION',
    unlock: 'UNL:NOX:resource-extraction',
    domains: ['KD:ENGINEERING', 'KD:GEOLOGY', 'KD:PHYSICS'],
    questions: [
      'Warum ist eine hohe Stoffkonzentration noch keine Garantie für eine wirtschaftlich oder technisch sinnvolle Gewinnung?',
      'Welche Rolle spielen Zerkleinerung, Sortierung und Stofftrennung in einer Prozesskette?',
      'Wann verbessert ein zusätzlicher Aufbereitungsschritt die Gesamtausbeute wirklich?',
    ],
    takeaways: [
      'Rohstoffgewinnung beginnt mit der Lagerstätte, endet aber erst mit einem nutzbaren Stoffstrom.',
      'Jeder Trennschritt nutzt messbare Materialeigenschaften und kostet Energie, Zeit und Anlagenkapazität.',
      'Eine gute Extraktionskette optimiert nicht einen Einzelwert, sondern Ausbeute, Reinheit, Energie und Reststoffe gemeinsam.',
    ],
  },
  {
    slug: 'PRESSURE-SYSTEMS',
    title: 'Wie hält ein Drucksystem eine lebensfähige Umgebung?',
    subtitle: 'Druckdifferenzen, Leckraten, Behälter und Regelung als gekoppeltes System begreifen.',
    moduleId: 'PHY-L1-000026',
    kxfModuleId: 'LRN:SSF:NOX-PRESSURE-SYSTEMS',
    unlock: 'UNL:NOX:pressure-systems',
    domains: ['KD:PHYSICS', 'KD:ENGINEERING'],
    questions: [
      'Warum belastet dieselbe Druckdifferenz große Flächen stärker als kleine?',
      'Warum reicht ein dichter Behälter ohne Messung und Regelung nicht aus?',
      'Welche Messwerte würdest du überwachen, um einen schleichenden Druckverlust früh zu erkennen?',
    ],
    takeaways: [
      'Druck wirkt auf Flächen und erzeugt daraus mechanische Kräfte auf die Struktur.',
      'Ein Drucksystem braucht Struktur, Dichtungen, Sensorik, Ventile und Regelung als gemeinsame Sicherheitskette.',
      'Trends von Druck, Nachspeisung und Leckrate sind oft aussagekräftiger als ein einzelner Grenzwert.',
    ],
  },
  {
    slug: 'AIRLOCK',
    title: 'Warum braucht eine Schleuse mehr als zwei Türen?',
    subtitle: 'Druckausgleich, Verriegelung, Volumen und Betriebsablauf einer Luftschleuse sicher kombinieren.',
    moduleId: 'ENG-L1-000006',
    kxfModuleId: 'LRN:SSF:NOX-AIRLOCK',
    unlock: 'UNL:NOX:airlock',
    domains: ['KD:ENGINEERING', 'KD:PHYSICS'],
    questions: [
      'Was würde passieren, wenn beide Türen einer Schleuse gleichzeitig geöffnet werden könnten?',
      'Warum beeinflusst das Schleusenvolumen Zeit- und Gasbedarf eines Zyklus?',
      'Welche Verriegelung muss technisch gelten, bevor eine Tür freigegeben werden darf?',
    ],
    takeaways: [
      'Eine Schleuse kontrolliert den Übergang zwischen Atmosphären und verhindert eine unkontrollierte Druckverbindung.',
      'Volumen und Druckdifferenz bestimmen wesentlich, wie viel Gas pro Zyklus bewegt oder verloren wird.',
      'Sichere Freigabe basiert auf gemessenem Druckzustand und gegenseitiger Türverriegelung, nicht nur auf Bedienerdisziplin.',
    ],
  },
  {
    slug: 'LIFE-SUPPORT',
    title: 'Wie wird aus einzelnen Geräten ein Lebenserhaltungssystem?',
    subtitle: 'Luft, Wasser, Energie, Stoffkreisläufe und Reserven als zusammenhängende Versorgung betrachten.',
    moduleId: 'BIO-L1-000002',
    kxfModuleId: 'LRN:SSF:NOX-LIFE-SUPPORT',
    unlock: 'UNL:NOX:life-support',
    domains: ['KD:BIOLOGY', 'KD:CHEMISTRY', 'KD:ENGINEERING'],
    questions: [
      'Welche Stoffströme ändern Menschen in einem geschlossenen Habitat fortlaufend?',
      'Warum hängt Luftaufbereitung indirekt auch von Wasser und Energieversorgung ab?',
      'Welche Reserve ist sinnvoller: ein zweites identisches Gerät oder ein unabhängiger alternativer Versorgungsweg?',
    ],
    takeaways: [
      'Lebenserhaltung stabilisiert mehrere gekoppelte Stoff- und Energieströme gleichzeitig.',
      'Wasseraufbereitung, Stromversorgung, Drucksystem und Luftaufbereitung bilden gegenseitige Abhängigkeiten.',
      'Robustheit entsteht durch Reserven, Messbarkeit und möglichst unabhängige Wiederherstellungswege.',
    ],
  },
  {
    slug: 'THERMAL-CONTROL',
    title: 'Wohin verschwindet Wärme in einem geschlossenen Habitat?',
    subtitle: 'Wärmequellen, Transport, Speicherung und Abgabe als Energiebilanz verstehen.',
    moduleId: 'PHY-L1-000027',
    kxfModuleId: 'LRN:SSF:NOX-THERMAL-CONTROL',
    unlock: 'UNL:NOX:thermal-control',
    domains: ['KD:PHYSICS', 'KD:ENGINEERING'],
    questions: [
      'Warum kann ein gut isoliertes Habitat trotzdem überhitzen?',
      'Welche Unterschiede gibt es zwischen Wärme erzeugen, transportieren und nach außen abgeben?',
      'Wie verändert ein Ausfall der Stromversorgung die thermische Lage zeitverzögert?',
    ],
    takeaways: [
      'Isolation reduziert Wärmeaustausch, beseitigt aber interne Wärmequellen nicht.',
      'Thermische Kontrolle benötigt Transportpfade und eine Senke, an die Wärme tatsächlich abgegeben werden kann.',
      'Thermische Trägheit verschafft Zeit, ersetzt aber keine dauerhaft verfügbare Wärmeabfuhr.',
    ],
  },
  {
    slug: 'RADIATION-PROTECTION',
    title: 'Wie plant man Schutz vor Strahlung, die man nicht sieht?',
    subtitle: 'Dosis, Abschirmung, Aufenthaltszeit und Materialwahl zu einer Schutzstrategie verbinden.',
    moduleId: 'PHY-L1-000028',
    kxfModuleId: 'LRN:SSF:NOX-RADIATION-PROTECTION',
    unlock: 'UNL:NOX:radiation-protection',
    domains: ['KD:PHYSICS', 'KD:ENGINEERING'],
    questions: [
      'Warum ist Strahlenschutz nicht nur eine Frage möglichst dicker Wände?',
      'Wie verändern Material, Geometrie und Aufenthaltsdauer die aufgenommene Dosis?',
      'Wo würdest du einen besonders geschützten Rückzugsraum im Habitat anordnen?',
    ],
    takeaways: [
      'Strahlenrisiko wird über Art und Intensität der Strahlung sowie über Exposition und Dosis bewertet.',
      'Abschirmwirkung hängt von Material und Strahlungsart ab; mehr Masse ist nicht in jedem Detail gleich wirksam.',
      'Schutzkonzepte kombinieren Material, Geometrie, Aufenthaltsplanung und besonders geschützte Zonen.',
    ],
  },
  {
    slug: 'ENVIRONMENT-MONITORING',
    title: 'Wie erkennt ein Habitat einen Fehler, bevor Menschen ihn bemerken?',
    subtitle: 'Sensorik, Trends, Redundanz und Alarmgrenzen für kontinuierliches Umweltmonitoring einsetzen.',
    moduleId: 'ENG-L1-000007',
    kxfModuleId: 'LRN:SSF:NOX-ENVIRONMENT-MONITORING',
    unlock: 'UNL:NOX:environment-monitoring',
    domains: ['KD:ENGINEERING', 'KD:CHEMISTRY', 'KD:PHYSICS'],
    questions: [
      'Welche Umweltänderungen können gefährlich werden, bevor sie sinnlich auffallen?',
      'Warum ist die Veränderung eines Messwerts manchmal wichtiger als sein aktueller Wert?',
      'Wie unterscheidest du einen echten Fehler von einem defekten Sensor?',
    ],
    takeaways: [
      'Kritische Atmosphären- und Systemzustände müssen gemessen werden, weil menschliche Wahrnehmung zu spät oder ungeeignet sein kann.',
      'Trends und gekoppelte Messgrößen ermöglichen frühere Diagnose als isolierte Schwellenwerte.',
      'Redundante oder physikalisch unabhängige Messungen helfen, Sensorfehler von realen Zustandsänderungen zu unterscheiden.',
    ],
  },
  {
    slug: 'HABITAT-REDUNDANCY',
    title: 'Wann ist ein System wirklich redundant?',
    subtitle: 'Gemeinsame Fehlerursachen erkennen und Reserven so entwerfen, dass sie im Ernstfall tatsächlich unabhängig bleiben.',
    moduleId: 'ENG-L1-000008',
    kxfModuleId: 'LRN:SSF:NOX-HABITAT-REDUNDANCY',
    unlock: 'UNL:NOX:habitat-redundancy',
    domains: ['KD:ENGINEERING', 'KD:SYSTEMS'],
    questions: [
      'Sind zwei Pumpen redundant, wenn beide dieselbe Stromversorgung brauchen?',
      'Welche gemeinsamen Fehlerursachen können scheinbar getrennte Systeme gleichzeitig ausschalten?',
      'Wie würdest du einen sicheren Degradationsmodus definieren, wenn nicht mehr alles versorgt werden kann?',
    ],
    takeaways: [
      'Mehrfach vorhandene Komponenten sind nur dann robuste Redundanz, wenn kritische gemeinsame Abhängigkeiten beherrscht werden.',
      'Common-Mode-Fehler entstehen durch gemeinsame Energie, Leitungen, Software, Umgebung oder Bedienprozesse.',
      'Ein robustes Habitat plant nicht nur Ausfälle, sondern auch priorisierte Weiterbetriebszustände und Wiederherstellung.',
    ],
  },
  {
    slug: 'MARS-HABITAT',
    title: 'Wie werden Teilsysteme zu einem bewohnbaren Mars-Habitat?',
    subtitle: 'Druck, Wasser, Energie, Lebenserhaltung, Wärme, Strahlenschutz, Monitoring und Redundanz integrieren.',
    moduleId: 'ENG-L1-000009',
    kxfModuleId: 'LRN:SSF:NOX-MARS-HABITAT',
    unlock: 'UNL:NOX:mars-habitat',
    domains: ['KD:ENGINEERING', 'KD:PHYSICS', 'KD:BIOLOGY', 'KD:CHEMISTRY'],
    questions: [
      'Warum kann jedes Teilsystem für sich funktionieren und das Gesamthabitat trotzdem scheitern?',
      'Welche Abhängigkeiten verbinden Wasser, Energie, Druck, Lebenserhaltung und thermische Kontrolle?',
      'Welche drei Störungen würdest du für einen integrierten Habitat-Test gleichzeitig simulieren?',
    ],
    takeaways: [
      'Systemintegration entscheidet, ob lokale Lösungen als Gesamtsystem stabil zusammenarbeiten.',
      'Versorgungssysteme bilden Abhängigkeitsnetze; eine Störung kann sich deshalb über mehrere technische Ebenen ausbreiten.',
      'Ein Habitat wird durch Szenarien geprüft, die Kaskaden, Reserven, Diagnose und kontrollierten Weiterbetrieb gemeinsam testen.',
    ],
  },
];

export const noxiaUnlockFoundationLearningPaths: LearningPath[] = specs.map(buildPath);
