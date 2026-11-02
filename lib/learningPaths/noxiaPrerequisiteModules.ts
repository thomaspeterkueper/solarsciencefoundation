import type { LearningPath, LearningPathSection, LearningPathUnit } from '../learningPaths';
import { quiz, type QuizQuestion } from './quizAuthoring';

/**
 * Lernmodule für NOXIA-Lernvoraussetzungen (Request EXT-NOXIA-SSF-20261029-learning-prerequisites).
 *
 * Jedes Modul liefert genau die NOXIA-Freischaltung, die NOXIA serverseitig verlangt
 * (Präfix und Schreibweise unverändert), und enthält Kurztests nach docs/SSF-QUIZ-RICHTLINIEN.md:
 * je Test drei Fragen (Anwendung, Verständnis, Transfer) mit vier Antworten und Erklärung.
 *
 * Identitäten: `sourceModuleId` ist die Legacy-ID, `kxfModuleId` die KXF-ID. Wo das KG noch
 * keine Kennung vergeben hat (NOX-SMELTING, NOX-ROBOT-FABRICATION, NOX-PRECISION-INSTRUMENTATION),
 * folgt die Benennung dem Muster der bestehenden NOXIA-Fundamentmodule und wird beim KG
 * zur Bestätigung gemeldet.
 */

function section(
  id: string,
  kind: LearningPathSection['kind'],
  title: string,
  summary: string,
  depthPoints: number,
  extra: Partial<LearningPathSection> = {},
): LearningPathSection {
  return { id, kind, title, summary, depthPoints, ...extra };
}

type UnitSpec = {
  id: string;
  title: string;
  entryQuestion: string;
  takeaway: string;
  nextUnitId?: string;
  observation: [string, string];
  explanations: Array<[string, string, string]>;
  exercise: [string, string, string];
  quiz: [QuizQuestion, QuizQuestion, QuizQuestion];
};

function unit(spec: UnitSpec): LearningPathUnit {
  const slug = spec.id.replace(/^UNIT:/, '');
  const sections: LearningPathSection[] = [
    section(`OBS:${slug}`, 'observation', spec.observation[0], spec.observation[1], 5),
    ...spec.explanations.map(([id, title, summary]) => section(`EXPL:${slug}-${id}`, 'explanation', title, summary, 8)),
    section(`EXERCISE:${slug}`, 'exercise', spec.exercise[0], spec.exercise[1], 10, { solution: spec.exercise[2] }),
    section(`QUIZ:${slug}`, 'quiz', 'Kurztest', quiz(spec.quiz), 10),
  ];
  return {
    id: spec.id,
    title: spec.title,
    entryQuestion: spec.entryQuestion,
    takeaway: spec.takeaway,
    ...(spec.nextUnitId ? { gate: { type: 'quiz_all_correct' as const, unlocksUnitId: spec.nextUnitId } } : {}),
    sections,
  };
}

/* ------------------------------------------------------------------ */
/* B · Schmelze                                                        */
/* ------------------------------------------------------------------ */

export const noxiaSmeltingLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-SMELTING-0001',
  title: 'Wie wird aus Erz ein nutzbares Metall?',
  subtitle: 'Reduktion, Schmelzen, Schlacke, Energiebedarf, Reinheit, Legieren und Gießen als zusammenhängende Prozesskette.',
  status: 'prototype',
  sourceModuleId: 'SSF-NOX-SMELTING-0001',
  kxfModuleId: 'LRN:SSF:NOX-SMELTING',
  domainsNeeded: ['KD:ENG:N1', 'KD:MTL:N1', 'KD:PHYS-THERM:N1'],
  suppliedBy: {
    knowledgeGraph: ['Kanonische Modulidentität LRN:SSF:NOX-SMELTING (Vorschlag, KG-Bestätigung offen)', 'Fachliche Voraussetzung: LRN:SSF:NOX-RESOURCE-EXTRACTION'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Lernsequenz Reduktion → Schmelze → Legierung', 'Rechenaufgaben zu Massen- und Energiebilanz', 'Kurztests mit Erklärung'],
  },
  unlocks: ['UNL:NOX:smelting'],
  units: [
    unit({
      id: 'UNIT:NOX-SMELTING-1',
      title: 'Im Erz steckt Metall nur gebunden',
      entryQuestion: 'Warum lässt sich aus einem rostroten Stein nicht einfach durch Erhitzen ein Eisenbarren schmelzen?',
      takeaway: 'Im Erz ist das Metall chemisch an Sauerstoff gebunden; erst eine Reduktion macht daraus Metall, das Schmelzen kommt danach.',
      nextUnitId: 'UNIT:NOX-SMELTING-2',
      observation: ['Rost und Erz sind verwandt', 'Rost auf einem Nagel und rotes Eisenerz bestehen im Kern aus demselben Stoffgrundtyp: Eisenoxid. Erhitzt du einen Rostfleck, entsteht kein glänzendes Eisen – das Metall bleibt an Sauerstoff gebunden. Zum Metall führt nur der umgekehrte Weg: der Sauerstoff muss weg.'],
      explanations: [
        ['REDUKTION', 'Reduktion: dem Oxid den Sauerstoff wegnehmen', 'Ein Reduktionsmittel nimmt dem Metalloxid den Sauerstoff ab. Mit Kohlenstoffmonoxid gilt Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂, mit Wasserstoff entsteht stattdessen Wasserdampf. Welches Reduktionsmittel einer Basis zur Verfügung steht, entscheidet die Prozesskette: Auf dem Mond gibt es kaum Kohlenstoff, aber Wassereis, das sich elektrolytisch in Wasserstoff und Sauerstoff zerlegen lässt – hier greift das Modul zur Wasseraufbereitung ein.'],
        ['AUSBEUTE', 'Wie viel Metall steckt im Erz?', 'Fe₂O₃ besteht zu rund 70 % seiner Masse aus Eisen (2 · 55,85 u von 159,7 u). Der Rest ist Sauerstoff. Enthält ein Erz nur einen Teil Eisenoxid, sinkt der theoretisch mögliche Eisenanteil entsprechend – und praktisch geht ein Teil in die Schlacke verloren.'],
      ],
      exercise: [
        'Erzbilanz',
        '1 t Erz enthält 40 % Eisenoxid Fe₂O₃. Wie viel Eisen steckt höchstens darin? Und wie viel Sauerstoff muss das Reduktionsmittel entfernen?',
        '400 kg Fe₂O₃ · 0,70 ≈ 280 kg Eisen. Die übrigen rund 120 kg Fe₂O₃-Masse sind Sauerstoff, den das Reduktionsmittel aufnehmen muss. Die restlichen 600 kg des Erzes sind Begleitgestein.',
      ],
      quiz: [
        {
          q: 'Ein Erz besteht zu 50 % aus Eisenoxid Fe₂O₃, das zu rund 70 % seiner Masse aus Eisen besteht. Wie viel Eisen steckt höchstens in 100 kg Erz?',
          a: ['50 kg', '70 kg', '35 kg', '100 kg'],
          correct: 2,
          why: '50 kg Fe₂O₃ · 0,70 = 35 kg Eisen. Der Rest ist Sauerstoff und Begleitgestein. Das ist eine Obergrenze: In der Praxis geht ein Teil des Eisens in die Schlacke.',
        },
        {
          q: 'Warum reicht bloßes Erhitzen von Eisenoxid nicht, um Eisenmetall zu erhalten?',
          a: ['Weil Eisenoxid bei jeder Temperatur fest bleibt', 'Weil das Eisen im Oxid chemisch an Sauerstoff gebunden ist und ein Reduktionsmittel den Sauerstoff aufnehmen muss', 'Weil Hitze Eisen immer in Gas verwandelt', 'Weil Erz grundsätzlich kein Eisen enthält'],
          correct: 1,
          why: 'Schmelzen ändert nur den Aggregatzustand. Um aus dem Oxid Metall zu machen, muss der Sauerstoff chemisch entfernt werden – das ist die Reduktion.',
        },
        {
          q: 'Auf einer Mondbasis gibt es kaum Kohlenstoff, aber Wassereis aus Polarkratern. Welches Reduktionsmittel liegt nahe?',
          a: ['Wasserstoff aus der Wasser-Elektrolyse', 'Argon aus dem Boden', 'Stickstoff aus der Atmosphäre', 'Sand'],
          correct: 0,
          why: 'Wasserstoff nimmt den Sauerstoff als Wasserdampf auf, der kondensiert und wieder elektrolysiert werden kann. Der Mond hat keine nutzbare Atmosphäre, Argon reagiert nicht, und Sand (SiO₂) ist selbst ein Oxid.',
        },
      ],
    }),
    unit({
      id: 'UNIT:NOX-SMELTING-2',
      title: 'Schmelze, Schlacke und Energie',
      entryQuestion: 'Wenn das Metall flüssig ist – warum ist der Barren noch nicht fertig?',
      takeaway: 'Metall entsteht im Ofen als Gesamtsystem: Energie, Schlacke, Reinheit, Legierung und Erstarrung bestimmen Menge und Qualität.',
      observation: ['Zwei Flüssigkeiten im Tiegel', 'Im Ofen trennen sich zwei flüssige Schichten: unten das schwere Metall, oben eine dünnere Schicht Schlacke aus dem verflüssigten Begleitgestein. Wie Öl auf Wasser schwimmt die leichtere Schlacke oben.'],
      explanations: [
        ['SCHLACKE', 'Schlacke bindet Verunreinigungen', 'Begleitgestein besteht oft aus Silikaten. Mit passenden Zuschlägen wird es zu einer flüssigen Schlacke mit deutlich geringerer Dichte (etwa 2,5 bis 3 g/cm³ gegenüber rund 7 g/cm³ bei Eisen). Sie sammelt Verunreinigungen und lässt sich vom Metall abziehen. Ihre Menge und ihr Wärmeinhalt gehören zur Energiebilanz.'],
        ['ENERGIE', 'Schmelzen kostet Energie', 'Eisen schmilzt bei etwa 1538 °C. Aufheizen und Schmelzen eines Kilogramms braucht größenordnungsmäßig 1 MJ, dazu kommen Wärmeverluste, die Schlacke und ggf. die Reduktion. Je höher der Verlustanteil, desto weniger Metall schafft ein Ofen mit gegebener Leistung.'],
        ['LEGIEREN', 'Legieren und Gießen', 'Kleine Zusätze verändern Eigenschaften: Stahl ist Eisen mit wenigen Prozent Kohlenstoff oder weniger. Beim Gießen schrumpft das Metall beim Erstarren; die Form muss das berücksichtigen, sonst entstehen Hohlräume (Lunker). Die nötige Reinheit hängt vom Verwendungszweck ab – für einfache Halterungen genügt weniger als für tragende Präzisionsteile.'],
      ],
      exercise: [
        'Ofenleistung abschätzen',
        'Ein Ofen mit 5 kW elektrischer Leistung verliert die Hälfte der Energie als Wärme an die Umgebung. Aufheizen und Schmelzen brauchen rund 1,2 MJ je kg. Wie viel Metall schafft er in einer Stunde?',
        '5 kW · 3600 s = 18 MJ; die Hälfte (9 MJ) kommt am Metall an. 9 MJ / 1,2 MJ je kg ≈ 7,5 kg pro Stunde. Halbiert man die Verluste, steigt die Menge auf rund 11 kg – Isolierung lohnt sich.',
      ],
      quiz: [
        {
          q: 'Ein Ofen liefert nutzbar 9 MJ pro Stunde ans Metall. Aufheizen und Schmelzen brauchen rund 1,2 MJ je kg. Wie viel Metall schafft er etwa pro Stunde?',
          a: ['10,8 kg', '7,5 kg', '1,2 kg', '75 kg'],
          correct: 1,
          why: '9 MJ geteilt durch 1,2 MJ je kg ergibt 7,5 kg. Wer multipliziert statt dividiert, erhält 10,8 – die Einheit MJ je kg zeigt, dass geteilt werden muss.',
        },
        {
          q: 'Warum schwimmt die Schlacke im Ofen oben auf dem flüssigen Metall?',
          a: ['Weil sie heißer ist als das Metall', 'Weil sie aus Gas besteht', 'Weil das Metall magnetisch nach unten gezogen wird', 'Weil sie eine geringere Dichte hat und sich nicht mit dem Metall mischt'],
          correct: 3,
          why: 'Schlacke ist deutlich leichter als flüssiges Eisen und mischt sich nicht damit. Deshalb sammelt sie sich oben und lässt sich abziehen.',
        },
        {
          q: 'Eine Basis hat knappen Strom und braucht zuerst einfache Halterungen. Höhere Reinheit kostet mehr Energie und liefert weniger Metall. Was ist sinnvoll?',
          a: ['Immer die höchste Reinheit anstreben', 'Die Reinheit am Verwendungszweck ausrichten – für einfache Halterungen genügt weniger', 'Die Schlackentrennung ganz weglassen', 'Nur legierte Spezialstähle herstellen'],
          correct: 1,
          why: 'Reinheit ist ein Kompromiss zwischen Qualität, Energie und Ausbeute. Wo das Bauteil geringe Anforderungen hat, spart eine angepasste Reinheit knappe Ressourcen.',
        },
      ],
    }),
  ],
};

/* ------------------------------------------------------------------ */
/* C · Phobos-Werkstatt                                                */
/* ------------------------------------------------------------------ */

export const noxiaRobotFabricationLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-ROBOT-FABRICATION-0001',
  title: 'Wie baut man Werkzeuge für Roboter, die bei fast keiner Schwerkraft arbeiten?',
  subtitle: 'Modulare Werkzeuge, Schnittstellen, Reaktionskräfte beim Bohren, Staubdichtigkeit und Ersatzteilhaltung.',
  status: 'prototype',
  sourceModuleId: 'SSF-NOX-ROBOT-FABRICATION-0001',
  kxfModuleId: 'LRN:SSF:NOX-ROBOT-FABRICATION',
  domainsNeeded: ['KD:ENG:N1', 'KD:PHYS:N1', 'KD:MTL:N1'],
  suppliedBy: {
    knowledgeGraph: ['Kanonische Modulidentität LRN:SSF:NOX-ROBOT-FABRICATION (Vorschlag, KG-Bestätigung offen)'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Lernsequenz Modularität → Reaktionskraft', 'Rechenaufgaben zu Masse und Beschleunigung', 'Kurztests mit Erklärung'],
  },
  unlocks: ['UNL:NOX:ENG:ROBOT-FABRICATION'],
  units: [
    unit({
      id: 'UNIT:NOX-ROBOT-FAB-1',
      title: 'Ein Arm, viele Werkzeuge',
      entryQuestion: 'Warum bekommt ein Roboter nicht einfach für jede Aufgabe eine eigene Hand?',
      takeaway: 'Modulare Werkzeuge sparen Masse und Ersatzteile, brauchen aber eine definierte mechanische, elektrische und Datenschnittstelle.',
      nextUnitId: 'UNIT:NOX-ROBOT-FAB-2',
      observation: ['Der Akkuschrauber mit Bits', 'Ein Akkuschrauber hat einen Antrieb, aber viele Aufsätze: Bohrer, Schraubendreher, Fräser. Der teure Teil – Motor, Akku, Gehäuse – wird einmal gebaut, der Wechselteil ist klein, leicht und ersetzbar.'],
      explanations: [
        ['SCHNITTSTELLE', 'Drei Schnittstellen in einer', 'Ein Werkzeugwechsler muss drei Dinge leisten: mechanisch fest und spielfrei verriegeln, elektrisch Energie übertragen und per Daten dem Roboter melden, welches Werkzeug angekoppelt ist. Fehlt eine dieser drei, kann das Werkzeug zwar sitzen, aber nicht sicher gesteuert werden.'],
        ['MASSE', 'Masse ist im All Geld', 'Jedes Kilogramm kostet Transportenergie. Ein Arm mit Wechsler spart gegenüber mehreren fest montierten Armen die Antriebe der zusätzlichen Arme, braucht aber Wechsler und ein Magazin. Dazu kommt ein Ersatzteilrack: Verschleißteile werden vorab geplant, statt im Notfall improvisiert.'],
      ],
      exercise: [
        'Masse vergleichen',
        'Variante A: drei Arme, je 15 kg inkl. Antrieb, fest montierte Werkzeuge 8 kg, 12 kg und 10 kg. Variante B: ein Arm (15 kg), Wechsler 4 kg, dieselben drei Werkzeuge. Wie viel Masse spart B?',
        'A: 3 · 15 kg + 30 kg = 75 kg. B: 15 kg + 4 kg + 30 kg = 49 kg. Ersparnis: 26 kg. Preis dafür: nur ein Werkzeug gleichzeitig, und der Wechsler muss zuverlässig sein.',
      ],
      quiz: [
        {
          q: 'Ein Roboter kann entweder zwei fest montierte Arme (je 20 kg) mit Werkzeugen von 6 kg und 9 kg tragen oder einen Arm (20 kg) mit Wechsler (3 kg) und beiden Werkzeugen. Wie groß ist die Massenersparnis des Wechslers?',
          a: ['3 kg', '15 kg', '20 kg', '17 kg'],
          correct: 3,
          why: 'Fest montiert: 2 · 20 + 15 = 55 kg. Mit Wechsler: 20 + 3 + 15 = 38 kg. Die Differenz beträgt 17 kg – die Einsparung ist der eingesparte Arm abzüglich des Wechslers.',
        },
        {
          q: 'Wozu braucht ein Werkzeugwechsler neben der mechanischen Verriegelung eine Datenverbindung?',
          a: ['Damit der Roboter erkennt, welches Werkzeug angekoppelt ist, und es richtig ansteuert', 'Damit das Werkzeug schwerer wird', 'Damit kein Strom fließen muss', 'Damit die Schwerkraft ausgeglichen wird'],
          correct: 0,
          why: 'Ohne Rückmeldung wüsste der Roboter nicht, ob er gerade eine Schaufel oder einen Bohrer führt. Daten machen aus „sitzt fest“ ein „ist sicher steuerbar“.',
        },
        {
          q: 'Werkzeug und Roboterarm stammen von verschiedenen Herstellern und passen mechanisch zusammen, aber der Roboter erkennt das Werkzeug nicht. Was fehlt?',
          a: ['Mehr Masse am Werkzeug', 'Eine abgestimmte Daten- und Energieschnittstelle zusätzlich zur Mechanik', 'Eine dickere Staubschicht', 'Nichts – mechanisch passend reicht immer'],
          correct: 1,
          why: 'Eine Schnittstelle besteht aus Mechanik, Energie und Daten. Nur wenn alle drei vereinbart sind, ist das Werkzeug nutzbar.',
        },
      ],
    }),
    unit({
      id: 'UNIT:NOX-ROBOT-FAB-2',
      title: 'Bohren, wo nichts andrückt',
      entryQuestion: 'Warum kann ein Bohrer auf Phobos den Roboter vom Boden abdrücken?',
      takeaway: 'Wo kaum Gewichtskraft andrückt, wird die Reaktionskraft zur Hauptsache: Bohren braucht Verankerung oder Kraftkompensation.',
      observation: ['Gewicht hält den Bohrer unten', 'Auf der Erde drückt das Eigengewicht eines Geräts den Bohrer ins Material. Auf Phobos beträgt die Schwerebeschleunigung nur rund 0,006 m/s² – weniger als ein Tausendstel des Erdwerts. Ein 40-kg-Roboter wiegt dort gerade 0,23 N und hält praktisch nichts.'],
      explanations: [
        ['REAKTION', 'Kraft und Gegenkraft', 'Drückt der Bohrer mit einer Kraft F auf das Gestein, wirkt dieselbe Kraft entgegengesetzt auf den Roboter. Seine Beschleunigung ist a = F / m. Ohne Verankerung wird er weggedrückt, statt zu bohren. Lösungen: Anker oder Spreizen, die den Roboter am Boden fixieren, oder ein reaktionskompensierter Bohrer, dessen Gegenkraft über eine bewegte Gegenmasse aufgefangen wird.'],
        ['STAUB', 'Staub und Verschleiß', 'Regolith ist feinkörnig, scharfkantig und elektrostatisch aufgeladen. Er dringt in Gelenke ein und schleift Dichtungen ab. Dagegen helfen staubdichte Gehäuse, geschlossene Förderwege (etwa ein geschlossener Materialhopper) und planbarer Austausch von Verschleißteilen aus dem Ersatzteilrack.'],
      ],
      exercise: [
        'Abdrücken berechnen',
        'Ein 40-kg-Roboter presst auf Phobos mit 300 N gegen das Gestein. Wie groß ist die Beschleunigung, mit der er ohne Verankerung wegfliegt? Vergleiche mit seiner Gewichtskraft von 0,23 N.',
        'a = F / m = 300 N / 40 kg = 7,5 m/s². Die Gewichtskraft von 0,23 N ist rund 1300-mal kleiner als die Bohrkraft und kann sie nicht ausgleichen – ohne Anker oder Kompensation scheitert das Bohren.',
      ],
      quiz: [
        {
          q: 'Ein 40-kg-Roboter drückt auf Phobos mit 300 N gegen das Gestein. Welche Beschleunigung erfährt er ohne Verankerung etwa in Gegenrichtung?',
          a: ['0,13 m/s²', '300 m/s²', '7,5 m/s²', '0,006 m/s²'],
          correct: 2,
          why: 'a = F / m = 300 N / 40 kg = 7,5 m/s². Die Schwerebeschleunigung von Phobos (rund 0,006 m/s²) spielt dafür praktisch keine Rolle – sie hält ihn nicht am Boden.',
        },
        {
          q: 'Was leistet ein reaktionskompensierter Bohrer?',
          a: ['Er fängt die Gegenkraft des Bohrens durch Verankerung oder eine bewegte Gegenmasse auf, damit der Roboter nicht abgedrückt wird', 'Er bohrt ohne jede Kraft', 'Er erhöht die Schwerkraft am Einsatzort', 'Er macht das Gestein weicher'],
          correct: 0,
          why: 'Kraft und Gegenkraft lassen sich nicht abschaffen, nur auffangen. Bei fast fehlender Gewichtskraft muss das Gerät die Gegenkraft selbst aufnehmen.',
        },
        {
          q: 'Welche Maßnahme verlängert die Lebensdauer von Gelenken im scharfkantigen Regolithstaub am meisten?',
          a: ['Mehr Schmierfett offen auftragen', 'Staubdichte Gehäuse und Dichtungen sowie planbarer Austausch von Verschleißteilen', 'Gelenke größer bauen und ungeschützt lassen', 'Nur nachts arbeiten, weil der Staub dann verschwindet'],
          correct: 1,
          why: 'Offenes Fett bindet Staub und wirkt wie Schleifpaste. Dichtungen halten Staub fern, und ein Ersatzteilrack macht den unvermeidlichen Verschleiß planbar.',
        },
      ],
    }),
  ],
};

/* ------------------------------------------------------------------ */
/* C · Präzisionsinstrumente                                           */
/* ------------------------------------------------------------------ */

export const noxiaPrecisionInstrumentationLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-PRECISION-INSTRUMENTATION-0001',
  title: 'Wie misst man genau, wo nichts so ist wie auf der Erde?',
  subtitle: 'Messprinzip, Kalibrierung und Messunsicherheit – dazu Bodenradar, Massemessung ohne Gewichtskraft und Bildinspektion.',
  status: 'prototype',
  sourceModuleId: 'SSF-NOX-PRECISION-INSTRUMENTATION-0001',
  kxfModuleId: 'LRN:SSF:NOX-PRECISION-INSTRUMENTATION',
  domainsNeeded: ['KD:ENG:N1', 'KD:PHYS:N1', 'KD:MATH:N1'],
  suppliedBy: {
    knowledgeGraph: ['Kanonische Modulidentität LRN:SSF:NOX-PRECISION-INSTRUMENTATION (Vorschlag, KG-Bestätigung offen)'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Lernsequenz Messen → Messunsicherheit → Instrumente', 'Rechenaufgaben zu Radarlaufzeit und Schwingungsmessung', 'Kurztests mit Erklärung'],
  },
  unlocks: ['UNL:NOX:ENG:PRECISION-INSTRUMENTATION'],
  units: [
    unit({
      id: 'UNIT:NOX-PRECISION-1',
      title: 'Messen heißt vergleichen',
      entryQuestion: 'Eine Waage zeigt 100,0 g an – warum kann der wahre Wert trotzdem 100,4 g sein?',
      takeaway: 'Jede Messung ist ein Vergleich mit einer Referenz und trägt eine Unsicherheit; Kalibrierung macht Abweichungen bekannt und kleiner.',
      nextUnitId: 'UNIT:NOX-PRECISION-2',
      observation: ['Zwei Küchenwaagen, zwei Zahlen', 'Legst du dasselbe Paket auf zwei Waagen, zeigen sie selten genau dasselbe. Nicht jede Zahl auf einem Display ist der wahre Wert – sie ist das Ergebnis eines Vergleichs mit einer Referenz, die nie perfekt ist.'],
      explanations: [
        ['FEHLER', 'Systematisch und zufällig', 'Ein Messwert weicht aus zwei Gründen vom wahren Wert ab. Ein systematischer Fehler verschiebt alle Werte in dieselbe Richtung (falscher Nullpunkt, falscher Faktor). Ein zufälliger Fehler streut die Einzelwerte um einen Mittelwert. Mehrfaches Messen und Mitteln verkleinert die Streuung, aber nicht den systematischen Fehler.'],
        ['KALIBRIERUNG', 'Kalibrierung und Messunsicherheit', 'Bei der Kalibrierung misst man eine bekannte Referenz und korrigiert das Gerät. Zu jedem Messwert gehört eine Unsicherheit, etwa 100,0 g ± 0,5 g. Sie sagt, wie weit man Schlussfolgerungen trauen darf – zum Beispiel ob zwei Messwerte wirklich verschieden sind.'],
      ],
      exercise: [
        'Kalibrierung auswerten',
        'Ein Referenzgewicht von 100,0 g wird fünfmal gewogen: 100,2 g; 100,3 g; 100,2 g; 100,4 g; 100,3 g. Was verrät das über Waage und Messung?',
        'Mittelwert ≈ 100,28 g, also eine systematische Abweichung von rund +0,3 g; die Streuung der Einzelwerte ist mit etwa 0,1 g klein. Die Waage ist präzise (wenig Streuung), aber nicht richtig (falscher Nullpunkt oder Faktor). Eine Kalibrierung korrigiert die +0,3 g.',
      ],
      quiz: [
        {
          q: 'Eine Waage zeigt für ein Referenzgewicht von 100,0 g im Mittel 100,3 g an, die Einzelwerte streuen kaum. Was ist das Hauptproblem?',
          a: ['Zufällige Streuung, die nur mehr Messungen beseitigen', 'Ein systematischer Fehler, den eine Kalibrierung korrigieren kann', 'Die Referenz ist zu schwer', 'Es gibt kein Problem, weil die Streuung klein ist'],
          correct: 1,
          why: 'Kleine Streuung heißt hohe Präzision, nicht Richtigkeit. Alle Werte liegen um etwa 0,3 g zu hoch – das ist ein systematischer Fehler, den man über eine Referenz korrigiert.',
        },
        {
          q: 'Warum gehört zu einem Messwert eine Messunsicherheit?',
          a: ['Weil Messgeräte nie funktionieren', 'Weil jede Messung begrenzt genau ist und die Angabe zeigt, wie sicher Schlussfolgerungen sind', 'Weil man Zahlen sonst nicht runden darf', 'Weil die Unsicherheit den Messwert ersetzt'],
          correct: 1,
          why: 'Ohne Unsicherheit lässt sich nicht beurteilen, ob zwei Werte verschieden sind oder ein Grenzwert eingehalten ist.',
        },
        {
          q: 'Zwei Sensoren messen dasselbe Bauteil: A zeigt 21,0 ± 0,1 °C, B zeigt 21,5 ± 0,1 °C. Was folgt daraus?',
          a: ['Beide stimmen exakt überein', 'B ist richtiger, weil sein Wert größer ist', 'Die Unsicherheit spielt keine Rolle', 'Die Werte sind innerhalb ihrer Unsicherheiten nicht vereinbar – mindestens ein Gerät hat einen systematischen Fehler'],
          correct: 3,
          why: 'Die Bereiche 20,9 bis 21,1 °C und 21,4 bis 21,6 °C überlappen nicht. Damit muss mindestens ein Sensor falsch kalibriert sein.',
        },
      ],
    }),
    unit({
      id: 'UNIT:NOX-PRECISION-2',
      title: 'Radar, Masse ohne Gewicht, Bildinspektion',
      entryQuestion: 'Wie wiegt man etwas, wenn es kaum Gewichtskraft gibt – und wie sieht man unter den Boden?',
      takeaway: 'Instrumente nutzen verschiedene Messprinzipien – Wellenlaufzeit, Trägheit, Licht – und jedes hat eigene Grenzen.',
      observation: ['Eine Federwaage auf Phobos', 'Eine Probe von 1 kg wiegt auf Phobos nur etwa 0,006 N. Eine Federwaage zeigt praktisch nichts an – obwohl die Masse unverändert 1 kg beträgt. Masse und Gewichtskraft sind verschiedene Größen.'],
      explanations: [
        ['TRAEGHEIT', 'Masse aus der Trägheit', 'Hängt man eine Probe an eine Feder (Federkonstante k) und lässt sie schwingen, gilt T = 2π · √(m / k). Aus der Periode T folgt die Masse, auch ohne nennenswerte Gewichtskraft – denn die Schwingung hängt von der Trägheit ab, nicht vom Gewicht.'],
        ['RADAR', 'Bodenradar misst Laufzeiten', 'Ein Radar sendet einen Puls in den Boden und misst die Zeit, nach der Reflexionen von Schichtgrenzen zurückkommen. Die Tiefe ist d = v · t / 2, weil der Weg hin und zurück läuft. Die Ausbreitungsgeschwindigkeit im Gestein ist kleiner als c; für trockenen Regolith nimmt man etwa die Hälfte bis zwei Drittel der Lichtgeschwindigkeit an.'],
        ['BILD', 'Bildinspektion hat Grenzen', 'Kamerabilder zeigen Oberflächen. Auflösung, Beleuchtung und Kontrast bestimmen, welche Risse oder Verschleißspuren sichtbar sind. Ein Bild ersetzt weder eine Maßprüfung noch eine Materialprüfung – es ergänzt sie.'],
      ],
      exercise: [
        'Zwei Messungen auswerten',
        'a) Ein Bodenradar misst eine Echolaufzeit von 60 ns; die Wellen laufen mit 1,5·10⁸ m/s. b) Ein Schwinger aus Probe und Feder (k = 200 N/m) hat die Periode 0,63 s. Berechne Tiefe und Masse.',
        'a) d = v · t / 2 = 1,5·10⁸ m/s · 60·10⁻⁹ s / 2 = 4,5 m. b) m = k · T² / (4π²) = 200 N/m · 0,397 s² / 39,5 ≈ 2,0 kg.',
      ],
      quiz: [
        {
          q: 'Ein Bodenradar misst eine Echolaufzeit von 60 ns. Im Regolith breiten sich die Wellen mit etwa 1,5·10⁸ m/s aus. Wie tief liegt die Schichtgrenze etwa?',
          a: ['9 m', '0,9 m', '4,5 m', '18 m'],
          correct: 2,
          why: 'Das Echo läuft hin und zurück: d = v · t / 2 = 1,5·10⁸ · 60·10⁻⁹ / 2 = 4,5 m. Wer die Laufzeit nicht halbiert, erhält 9 m.',
        },
        {
          q: 'Warum kann eine Federwaage auf Phobos die Masse einer Probe nicht sinnvoll bestimmen?',
          a: ['Weil die Masse auf Phobos kleiner ist als auf der Erde', 'Weil Federn im Vakuum schmelzen', 'Weil sie die sehr kleine Gewichtskraft misst, nicht die Trägheit – eine Schwingungsmessung nutzt die Trägheit', 'Weil Masse dort nicht existiert'],
          correct: 2,
          why: 'Die Masse ändert sich nicht, nur die Gewichtskraft. Beim Schwingen bestimmt die Trägheit die Periode, also bleibt die Messung auch bei fast fehlender Schwere möglich.',
        },
        {
          q: 'Ein Schwinger aus Probe und Feder (k = 200 N/m) schwingt mit der Periode 1,26 s. Ungefähr welche Masse hat die Probe?',
          a: ['8 kg', '2 kg', '16 kg', '63 kg'],
          correct: 0,
          why: 'm = k · T² / (4π²) = 200 · 1,59 / 39,5 ≈ 8 kg. Die doppelte Periode gegenüber dem Beispiel mit 0,63 s bedeutet die vierfache Masse (2 kg → 8 kg), weil T mit √m wächst.',
        },
      ],
    }),
  ],
};

/* ------------------------------------------------------------------ */
/* E · Sicherheitenwert                                                */
/* ------------------------------------------------------------------ */

export const ecoCollateralLearningPath: LearningPath = {
  id: 'PATH:SSF:ECO-SICHERHEIT-NOXIA-0001',
  title: 'Was ist ein Sicherheitenwert?',
  subtitle: 'Warum eine Bank nur einen Teil des Werts einer Sicherheit beleiht – und wie daraus ein Kreditrahmen entsteht.',
  status: 'prototype',
  sourceModuleId: 'ECO-L0-000003',
  kxfModuleId: 'LRN:SSF:ECO-L0-000003',
  domainsNeeded: ['KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
  suppliedBy: {
    knowledgeGraph: ['ECO-L0-000003', 'KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Einführung Sicherheit und Beleihung', 'Rechenaufgaben zu Beleihungsquote und Kreditrahmen', 'NOXIA-Anwendung und Transfer'],
  },
  unlocks: ['UNL:NOX:bank-collateral'],
  units: [
    unit({
      id: 'UNIT:ECO-SICHERHEIT:GRUNDLAGEN',
      title: 'Warum die Bank nicht den vollen Wert leiht',
      entryQuestion: 'Dein Schiff ist 10 000 Cr wert – warum bekommst du dafür keinen Kredit über 10 000 Cr?',
      takeaway: 'Eine Sicherheit deckt das Ausfallrisiko nur, wenn ihr Wert bei der Verwertung noch reicht; deshalb beleiht die Bank nur einen Teil.',
      nextUnitId: 'UNIT:ECO-SICHERHEIT:NOXIA',
      observation: ['Das Pfandhaus', 'Ein Pfandhaus gibt für eine Uhr im Wert von 1000 Cr nicht 1000 Cr, sondern weniger. Es muss die Uhr bei Nichtzahlung verkaufen – und beim schnellen Verkauf erzielt man selten den vollen Wert.'],
      explanations: [
        ['BELEIHUNG', 'Beleihungsquote und Kreditrahmen', 'Eine Sicherheit ist ein Gegenstand, auf den die Bank im Notfall zugreifen darf. Der Kreditrahmen ergibt sich als Sicherheitenwert mal Beleihungsquote. Die Quote liegt unter 100 %, weil der Verwertungserlös unter dem Wert liegen kann, Preise schwanken und der Verkauf Zeit und Kosten braucht. Je stärker eine Sicherheit an Wert verliert, desto niedriger die Quote.'],
      ],
      exercise: [
        'Kreditrahmen berechnen',
        'Eine Bank beleiht eine Maschine im Wert von 8000 Cr mit 70 %. Wie hoch ist der Kreditrahmen? Und wie hoch wäre er bei einer Beleihungsquote von 50 %?',
        '8000 Cr · 0,70 = 5600 Cr. Bei 50 %: 4000 Cr. Die Quote spiegelt das Risiko wider: Je unsicherer der Wiederverkaufswert, desto weniger leiht die Bank.',
      ],
      quiz: [
        {
          q: 'Eine Bank beleiht eine Maschine im Wert von 8000 Cr mit 70 %. Wie hoch ist der Kreditrahmen?',
          a: ['8000 Cr', '2400 Cr', '11 429 Cr', '5600 Cr'],
          correct: 3,
          why: '8000 · 0,70 = 5600 Cr. Wer durch 0,70 teilt (11 429 Cr), dreht die Rechnung um.',
        },
        {
          q: 'Warum leiht eine Bank nicht 100 % des Sicherheitenwerts?',
          a: ['Weil Banken grundsätzlich keine Gewinne wollen', 'Weil Sicherheiten keinen Wert haben', 'Weil der Verwertungserlös bei einem Ausfall unter dem Wert liegen kann und der Abschlag diese Lücke abdeckt', 'Weil der Zinssatz sonst negativ wird'],
          correct: 2,
          why: 'Der Abschlag ist ein Puffer: Fällt der Preis oder verursacht der Verkauf Kosten, reicht der Erlös trotzdem für die Restschuld.',
        },
        {
          q: 'Zwei Kreditnehmer haben gleich hohe Sicherheitenwerte. A besitzt Gebäude mit stabilem Wert, B ein Fahrzeug, das schnell an Wert verliert. Was ist plausibel?',
          a: ['Die Bank setzt für B eine niedrigere Beleihungsquote an', 'B bekommt mehr Kredit als A', 'Beide bekommen immer exakt gleich viel', 'Der Wert der Sicherheit ist für den Kreditrahmen unerheblich'],
          correct: 0,
          why: 'Je schneller eine Sicherheit an Wert verliert, desto größer das Risiko der Bank – und desto niedriger die Beleihungsquote.',
        },
      ],
    }),
    unit({
      id: 'UNIT:ECO-SICHERHEIT:NOXIA',
      title: 'Der Kreditrahmen in NOXIA',
      entryQuestion: 'Wie viel Kredit gibt dir die Bank in NOXIA, wenn du Gebäude und ein Schiff besitzt?',
      takeaway: 'Der Kreditrahmen folgt dem Wert der Sicherheiten, nicht dem Wunsch des Kreditnehmers – und hat eine Obergrenze je Kunde.',
      observation: ['Gebäude und Schiff als Sicherheit', 'In NOXIA zählen Gebäude und Schiffe als Sicherheiten. Schiffe verlieren schnell an Wert und zählen deshalb nur zu 60 % ihres Neupreises. Dieser Wert wird anschließend mit der Beleihungsquote von 70 % multipliziert. Der Rahmen ist außerdem auf höchstens 50 000 Cr begrenzt (Stand dieses Moduls).'],
      explanations: [
        ['OBERGRENZE', 'Warum es eine Obergrenze gibt', 'Eine Bank begrenzt das Gesamtrisiko je Kunde, auch wenn die Sicherheiten hoch sind. Ein sehr hoher Sicherheitenwert ergibt dann nicht beliebig viel Kredit; ab der Grenze bremst die Obergrenze, nicht mehr die Sicherheit.'],
      ],
      exercise: [
        'Kreditrahmen in NOXIA',
        'Ein Spieler besitzt Gebäude im Wert von 20 000 Cr und ein Schiff mit Neupreis 30 000 Cr (zählt zu 60 %). Wie hoch ist der Kreditrahmen bei 70 % Beleihung? Was ändert sich, wenn das Schiff verkauft wird?',
        'Sicherheitenwert: 20 000 + 0,6 · 30 000 = 38 000 Cr. Rahmen: 0,7 · 38 000 = 26 600 Cr. Ohne das Schiff bleibt 0,7 · 20 000 = 14 000 Cr – der Rahmen sinkt um 12 600 Cr.',
      ],
      quiz: [
        {
          q: 'Ein Spieler besitzt Gebäude im Wert von 20 000 Cr und ein Schiff mit Neupreis 30 000 Cr (zählt zu 60 %). Beleihungsquote 70 %. Wie hoch ist der Kreditrahmen?',
          a: ['32 000 Cr', '26 600 Cr', '38 000 Cr', '50 000 Cr'],
          correct: 1,
          why: 'Sicherheitenwert: 20 000 + 18 000 = 38 000 Cr, davon 70 % = 26 600 Cr. Die 32 000 Cr entstehen, wenn die 70-%-Beleihung nur auf die Gebäude angewendet wird.',
        },
        {
          q: 'Warum ist der Kreditrahmen auch bei sehr hohem Sicherheitenwert nach oben begrenzt?',
          a: ['Weil Sicherheiten nach einiger Zeit verfallen', 'Weil Kredite dann nie zurückgezahlt werden', 'Weil Zinsen dann null sind', 'Weil die Bank das Gesamtrisiko je Kunde begrenzt, auch wenn Sicherheiten vorhanden sind'],
          correct: 3,
          why: 'Selbst gute Sicherheiten können im Krisenfall an Wert verlieren. Eine Obergrenze begrenzt das Klumpenrisiko eines einzelnen Kunden.',
        },
        {
          q: 'Ein Schiff, das als Sicherheit für einen Kredit dient, wird verkauft. Was folgt?',
          a: ['Die Sicherheit entfällt, der verfügbare Kreditrahmen sinkt', 'Nichts – die Schuld bleibt unverändert und der Rahmen auch', 'Der Rahmen steigt, weil Geld hereinkommt', 'Die Schuld verschwindet'],
          correct: 0,
          why: 'Der Rahmen hängt am Wert der vorhandenen Sicherheiten. Fällt eine weg, sinkt der Rahmen – bestehende Schulden bleiben bestehen.',
        },
      ],
    }),
  ],
};

/* ------------------------------------------------------------------ */
/* F · Handel und Bodenwert                                            */
/* ------------------------------------------------------------------ */

export const ecoArbitrageLearningPath: LearningPath = {
  id: 'PATH:SSF:ECO-ARBITRAGE-NOXIA-0001',
  title: 'Was ist Arbitrage?',
  subtitle: 'Preisunterschiede zwischen Orten nutzen: Transportkosten, Gebühren, Zeit und Risiko entscheiden, ob aus dem Unterschied ein Gewinn wird.',
  status: 'prototype',
  sourceModuleId: 'ECO-L1-000001',
  kxfModuleId: 'LRN:SSF:ECO-L1-000001',
  domainsNeeded: ['KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
  suppliedBy: {
    knowledgeGraph: ['ECO-L1-000001', 'KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Einführung in Preisunterschiede', 'Rechenaufgaben zu Gewinn, Gebühren und Zeit', 'NOXIA-Anwendung Warenhandel'],
  },
  unlocks: ['UNL:NOX:advanced-trading'],
  units: [
    unit({
      id: 'UNIT:ECO-ARBITRAGE:PREISUNTERSCHIED',
      title: 'Preisunterschied ist noch kein Gewinn',
      entryQuestion: 'Brot kostet in Ort A 100 Cr je Tonne und in Ort B 140 Cr. Warum sind die 40 Cr nicht dein Gewinn?',
      takeaway: 'Arbitragegewinn = Preisunterschied minus Transportkosten, Gebühren und Risiko – und er schrumpft, wenn viele ihn nutzen.',
      nextUnitId: 'UNIT:ECO-ARBITRAGE:ZEIT',
      observation: ['Zwei Märkte, zwei Preise', 'Dieselbe Ware kostet an zwei Orten verschieden viel, weil dort Angebot und Nachfrage verschieden sind. Wer sie am billigen Ort kauft und am teuren verkauft, kann daran verdienen – muss sie aber zuerst dorthin bringen.'],
      explanations: [
        ['KOSTEN', 'Was vom Preisunterschied übrig bleibt', 'Vom Erlös gehen Einkaufspreis, Transportkosten und Gebühren ab. In NOXIA nehmen Spediteure (bis 40 t je Fahrt) 12 % vom Erlös. Ein Preisunterschied lohnt sich nur, wenn er größer ist als diese Kosten.'],
        ['AUSGLEICH', 'Warum Unterschiede verschwinden', 'Wenn viele Händler dieselbe Route nutzen, steigt am billigen Ort die Nachfrage und am teuren Ort das Angebot. Die Preise nähern sich an, und der Gewinn schrumpft. Arbitrage ist deshalb eher ein Ausgleichsprozess als ein dauerhaftes Geschenk.'],
      ],
      exercise: [
        'Gewinn einer Route',
        'Du kaufst 40 t zu 100 Cr/t und verkaufst sie am anderen Ort zu 140 Cr/t. Der Spediteur nimmt 12 % vom Erlös. Wie hoch ist dein Gewinn?',
        'Erlös: 40 · 140 = 5600 Cr. Einkauf: 40 · 100 = 4000 Cr. Spediteur: 0,12 · 5600 = 672 Cr. Gewinn: 5600 − 4000 − 672 = 928 Cr. Der Roh-Unterschied von 1600 Cr schrumpft auf knapp 60 %.',
      ],
      quiz: [
        {
          q: 'Du kaufst 40 t zu 100 Cr/t und verkaufst sie am anderen Ort zu 140 Cr/t. Ein Spediteur nimmt 12 % vom Erlös. Wie hoch ist der Gewinn?',
          a: ['1600 Cr', '672 Cr', '928 Cr', '5600 Cr'],
          correct: 2,
          why: 'Erlös 5600 Cr, Einkauf 4000 Cr, Spediteur 672 Cr: 5600 − 4000 − 672 = 928 Cr. Die 1600 Cr sind nur der Preisunterschied vor Kosten.',
        },
        {
          q: 'Warum schrumpft ein Arbitragegewinn, wenn viele Händler dieselbe Route nutzen?',
          a: ['Weil Zusatzangebot am Zielort den Preis drückt und die Nachfrage am Startort den Preis hebt', 'Weil Transportkosten automatisch steigen', 'Weil Ware beim Transport leichter wird', 'Weil Steuern nie bezahlt werden'],
          correct: 0,
          why: 'Mehr Ware am Zielort senkt dort den Preis, stärkere Nachfrage am Startort hebt ihn. Der Unterschied – und damit der Gewinn – wird kleiner.',
        },
        {
          q: 'Der Preisunterschied zwischen zwei Orten beträgt 8 %, der Spediteur nimmt 12 % vom Erlös. Lohnt sich die Route?',
          a: ['Ja, weil 8 % positiv sind', 'Nein – die Kosten übersteigen den Preisvorteil, auch bei größerer Menge wächst der Verlust nur', 'Ja, weil Transportkosten bei Arbitrage nie zählen', 'Ja, wenn die Ware besonders schwer ist'],
          correct: 1,
          why: 'Bei Einkauf 100 und Verkauf 108 kostet der Spediteur 12,96: 108 − 100 − 12,96 ≈ −5. Eine größere Menge vergrößert nur den Verlust.',
        },
      ],
    }),
    unit({
      id: 'UNIT:ECO-ARBITRAGE:ZEIT',
      title: 'Zeit und Risiko gehören zur Rechnung',
      entryQuestion: 'Warum nimmt ein Händler manchmal den kleineren Gewinn, wenn er dafür früher zurück ist?',
      takeaway: 'Kapital, das in Ware auf dem Weg steckt, arbeitet nicht; schneller Umschlag und sichere Preise können einen kleineren Einzelgewinn überholen.',
      observation: ['Die Ware ist unterwegs', 'Solange die Ware transportiert wird, ist dein Geld gebunden: Du kannst es nicht für eine zweite Fahrt einsetzen. Außerdem kann sich der Preis am Zielort ändern, bevor du ankommst.'],
      explanations: [
        ['UMSCHLAG', 'Gewinn pro Zeit', 'Der Vergleich zweier Routen sollte den Gewinn je Zeiteinheit betrachten, nicht nur den Gewinn je Fahrt. Eine kürzere Route mit kleinerem Gewinn kann pro Tag mehr bringen und das Kapital früher für die nächste Fahrt freigeben.'],
        ['RISIKO', 'Preisrisiko', 'Der Zielpreis kann bis zur Ankunft fallen. Wer nur auf den heutigen Preisunterschied schaut, rechnet mit einem Wert, der sich vor dem Verkauf noch ändern kann. Ein Sicherheitsabschlag oder eine Verteilung auf mehrere Routen senkt das Risiko.'],
      ],
      exercise: [
        'Zwei Routen vergleichen',
        'Route A bringt 900 Cr Gewinn in 10 Tagen, Route B 600 Cr in 5 Tagen. Beide binden dasselbe Kapital. Welche Route bringt pro Tag mehr, und wie viel Gewinn schafft Route B in 10 Tagen, wenn die Fahrt sofort wiederholt wird?',
        'A: 90 Cr/Tag. B: 120 Cr/Tag. In 10 Tagen schafft B zwei Fahrten mit zusammen 1200 Cr. Die kleinere Einzelfahrt gewinnt wegen des schnelleren Umschlags.',
      ],
      quiz: [
        {
          q: 'Route A bringt 900 Cr Gewinn in 10 Tagen, Route B 600 Cr in 5 Tagen. Beide binden dasselbe Kapital. Welche Aussage stimmt?',
          a: ['A ist besser, weil 900 größer als 600 ist', 'B bringt pro Tag mehr (120 gegenüber 90 Cr)', 'Beide sind exakt gleich gut', 'Die Dauer spielt keine Rolle'],
          correct: 1,
          why: 'Gewinn je Tag: A = 90 Cr, B = 120 Cr. Wird B wiederholt, erzielt es in 10 Tagen 1200 Cr und schlägt A.',
        },
        {
          q: 'Warum kann der Zielpreis ein Risiko für den Händler sein?',
          a: ['Weil er bis zur Ankunft sinken kann und der erwartete Gewinn dann kleiner ausfällt', 'Weil Preise nie ändern', 'Weil Ware schwerer wird', 'Weil Spediteure den Preis festlegen'],
          correct: 0,
          why: 'Der Gewinn entsteht erst beim Verkauf. Ändert sich der Preis unterwegs, passt die ursprüngliche Rechnung nicht mehr.',
        },
        {
          q: 'Ein Händler hat nur Geld für eine Ladung und kann zwischen einer riskanten Route mit hohem Einzelgewinn und einer sicheren mit kleinerem Gewinn wählen. Was ist eine sinnvolle Überlegung?',
          a: ['Immer die riskante Route, weil der Gewinn höher ist', 'Erwarteten Gewinn, Dauer und mögliche Verluste gemeinsam vergleichen', 'Nur die Farbe der Ware beachten', 'Gar nicht handeln, weil jede Route riskant ist'],
          correct: 1,
          why: 'Ein einzelner Maximalwert sagt wenig. Sinnvoll sind erwarteter Ertrag, Dauer und die Frage, ob ein möglicher Verlust verkraftbar ist.',
        },
      ],
    }),
  ],
};

export const ecoLandValueLearningPath: LearningPath = {
  id: 'PATH:SSF:ECO-BODENWERT-NOXIA-0001',
  title: 'Was ist Bodenwert?',
  subtitle: 'Warum gleich große Grundstücke verschieden viel kosten – und welche Rolle Lage, Steuern und Nutzung spielen.',
  status: 'prototype',
  sourceModuleId: 'ECO-L1-000002',
  kxfModuleId: 'LRN:SSF:ECO-L1-000002',
  domainsNeeded: ['KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
  suppliedBy: {
    knowledgeGraph: ['ECO-L1-000002', 'KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Problemorientierte Einführung Lage und Bodenwert', 'Rechenaufgaben zu Bodenwert, Netto/Brutto und laufenden Kosten', 'NOXIA-Anwendung Verwaltung'],
  },
  unlocks: ['UNL:NOX:land-value'],
  units: [
    unit({
      id: 'UNIT:ECO-BODENWERT:LAGE',
      title: 'Die Lage macht den Preis',
      entryQuestion: 'Zwei Grundstücke sind gleich groß – warum kostet das eine mehr als das doppelte?',
      takeaway: 'Bodenwert entsteht aus Lage und Nutzbarkeit; er ist nicht der Preis des Gebäudes darauf.',
      nextUnitId: 'UNIT:ECO-BODENWERT:KOSTEN',
      observation: ['Mitte und Rand', 'Ein Laden in der Ortsmitte erreicht viele Kunden, am Ortsrand nur wenige. Wer an der besten Stelle baut, kann mehr verdienen – und ist deshalb bereit, mehr für den Boden zu zahlen.'],
      explanations: [
        ['LAGE', 'Warum Lage zählt', 'Der Bodenwert hängt davon ab, welchen Nutzen man von dem Grundstück haben kann: Erreichbarkeit, Nähe zu Kunden und Infrastruktur, Platz zum Bauen. Boden lässt sich nicht vermehren – gute Lagen sind knapp, und Knappheit hebt den Preis. Gebäude kann man nachbauen, die Lage nicht.'],
      ],
      exercise: [
        'Bodenwert vergleichen',
        'Ein Grundstück nahe der Ortsmitte kostet 400 Cr/m², eines am Rand 150 Cr/m². Beide sind 200 m² groß. Wie viel kosten sie, und wie groß ist der Unterschied?',
        '200 · 400 = 80 000 Cr gegenüber 200 · 150 = 30 000 Cr. Unterschied: 50 000 Cr bei gleicher Fläche – der Mehrwert stammt allein aus der Lage.',
      ],
      quiz: [
        {
          q: 'Ein Grundstück nahe der Ortsmitte kostet 400 Cr/m², eines am Rand 150 Cr/m². Beide haben 200 m². Wie groß ist der Preisunterschied?',
          a: ['30 000 Cr', '80 000 Cr', '250 Cr', '50 000 Cr'],
          correct: 3,
          why: '200 · 400 = 80 000 Cr, 200 · 150 = 30 000 Cr, Unterschied 50 000 Cr. Die 250 Cr sind nur der Unterschied je Quadratmeter.',
        },
        {
          q: 'Warum ist ein Grundstück in guter Lage meist teurer als ein gleich großes in schlechter Lage?',
          a: ['Weil gute Lagen mehr Nutzen bringen und knapp sind', 'Weil die Erde dort schwerer ist', 'Weil dort nie Steuern anfallen', 'Weil Gebäude dort teurer zu bauen sind'],
          correct: 0,
          why: 'Wer an der besten Stelle mehr verdienen kann, zahlt mehr für den Boden. Weil gute Lagen nicht vermehrbar sind, bleibt der Preis hoch.',
        },
        {
          q: 'Ein Grundstück wird mit einem teuren Gebäude bebaut. Was passiert mit dem Bodenwert?',
          a: ['Er steigt automatisch um den Gebäudepreis', 'Er hängt weiter vor allem von der Lage ab – das Gebäude ist ein eigener Wert', 'Er wird null', 'Er entspricht immer den Baukosten'],
          correct: 1,
          why: 'Boden und Gebäude sind getrennte Werte. Das Gebäude kann verschleißen, der Bodenwert hängt an der Lage.',
        },
      ],
    }),
    unit({
      id: 'UNIT:ECO-BODENWERT:KOSTEN',
      title: 'Steuern und laufende Kosten',
      entryQuestion: 'Was kostet es wirklich, ein Grundstück zu besitzen und zu bebauen?',
      takeaway: 'Zum Preis kommen Steuern und laufende Kosten; dabei rechnet man brutto und netto sauber getrennt.',
      observation: ['Preisschild und Rechnung', 'Auf einer Rechnung stehen Nettopreis, Steuer und Bruttopreis. Wer von 1190 Cr brutto einfach 19 % abzieht, erhält nicht den Nettopreis – die Steuer wurde auf den Nettopreis aufgeschlagen, nicht auf den Bruttopreis.'],
      explanations: [
        ['STEUER', 'Netto, Brutto und Grundsteuer', 'Bei 19 % Konsumsteuer gilt Brutto = Netto · 1,19. Umgekehrt ist Netto = Brutto / 1,19, nicht Brutto · 0,81. Zusätzlich kann der Besitz von Boden laufende Kosten verursachen, etwa eine Grundsteuer, die sich am Bodenwert orientiert: Wer wertvollen Boden unbebaut hält, zahlt, ohne zu verdienen.'],
      ],
      exercise: [
        'Netto und Brutto',
        'Ein Gebäude kostet brutto 1190 Cr bei 19 % Konsumsteuer. Wie hoch ist der Nettopreis und wie viel Steuer ist enthalten? Warum ist 1190 · 0,81 falsch?',
        'Netto = 1190 / 1,19 = 1000 Cr, Steuer = 190 Cr. 1190 · 0,81 = 963,9 Cr wäre zu niedrig, weil die 19 % auf den Nettopreis, nicht auf den Bruttopreis berechnet wurden.',
      ],
      quiz: [
        {
          q: 'Ein Gebäude kostet brutto 1190 Cr bei 19 % Konsumsteuer. Wie hoch ist der Nettopreis?',
          a: ['964 Cr', '1000 Cr', '1171 Cr', '1416 Cr'],
          correct: 1,
          why: 'Netto = Brutto / 1,19 = 1000 Cr. Wer 19 % vom Bruttopreis abzieht (964 Cr), rechnet mit der falschen Basis.',
        },
        {
          q: 'Warum kann unbebauter Boden in guter Lage teuer im Unterhalt sein?',
          a: ['Weil er automatisch verfällt', 'Weil Steuern und Kosten sich am Bodenwert orientieren können, ohne dass der Boden Erträge bringt', 'Weil Boden schwerer wird', 'Weil man ihn nicht verkaufen darf'],
          correct: 1,
          why: 'Eine wertbezogene Steuer fällt auch ohne Nutzung an. Teurer Boden ohne Ertrag kostet daher laufend Geld.',
        },
        {
          q: 'Du kannst ein Grundstück in der Ortsmitte (hoher Preis, hohe Erträge) oder am Rand (niedriger Preis, geringe Erträge) kaufen. Was solltest du vergleichen?',
          a: ['Nur den niedrigeren Kaufpreis', 'Nur die Farbe der Karte', 'Nur die Größe des Gebäudes', 'Erträge, Kaufpreis und laufende Kosten gemeinsam'],
          correct: 3,
          why: 'Ein günstiger Preis nützt wenig, wenn der Ertrag fehlt; ein hoher Preis ist tragfähig, wenn der Ertrag ihn trägt. Entscheidend ist die Gesamtrechnung.',
        },
      ],
    }),
  ],
};

export const noxiaPrerequisiteLearningPaths: LearningPath[] = [
  noxiaSmeltingLearningPath,
  noxiaRobotFabricationLearningPath,
  noxiaPrecisionInstrumentationLearningPath,
  ecoCollateralLearningPath,
  ecoArbitrageLearningPath,
  ecoLandValueLearningPath,
];
