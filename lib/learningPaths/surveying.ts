import type { LearningPath, LearningPathSection } from '../learningPaths';

// Surveying series (Vermessung ohne Laser und GPS) – three governed paths.
// Canonical identities from kueper-knowledge-graph (2026-10-19):
//   TEC-L1-000001  Groma            PATH:SSF:TEC-GROMA-0001          CON:L1:groma, CON:L1:zenturiation
//   TEC-L1-000002  Höhenmessung     PATH:SSF:TEC-HOEHEN-0001         CON:L1:chorobates, CON:L1:nivellement
//   TEC-L2-000001  Triangulation    PATH:SSF:TEC-TRIANGULATION-0001  CON:L1:triangulation
//   AST-L1-000002  Sonnenuhr        PATH:SSF:AST-SONNENUHR-0001      CON:L1:gnomon, CON:L1:sonnenuhr, CON:L1:erdumfang-eratosthenes
//   TEC-L2-000002  Asien & Orient   PATH:SSF:TEC-ASIEN-ORIENT-0001   CON:L1:qanat, CON:L1:doppelte-differenz, CON:L1:erdradius-kimmtiefe
// Historical foundation (kueper.com): DOC:KUE:KUE-HIS-0001-2026-DE
// SSF owns the didactic design. Non-interactive: observation, explanation, schema,
// exercise with collapsible solution, practical task (Praxis), quiz.

const CREDIT = 'Schema: Solar Science Foundation';
const HISTORY_DOC = 'DOC:KUE:KUE-HIS-0001-2026-DE';
const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function practice(id: string, title: string, summary: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Praxis: ${title}`, summary, optional: true, depthPoints: 8 };
}

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

// ─── Modul 1: Groma ──────────────────────────────────────────────────────────

export const gromaLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-GROMA-0001',
  title: 'Wie zogen die Römer schnurgerade Straßen ohne Laser und GPS?',
  subtitle: 'Ein Stab, ein Kreuz und vier Schnüre mit Gewichten: Wie die Groma Geraden und rechte Winkel ins Gelände brachte. Teil 1 der Reihe Vermessung.',
  status: 'prototype',
  sourceModuleId: 'TEC-L1-000001',
  kxfModuleId: 'LRN:SSF:TEC-L1-000001',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L1-000001', 'CON:L1:groma', 'CON:L1:zenturiation'],
    kueperCom: [HISTORY_DOC],
    overtimeArchive: [],
    ssf: ['Schema: Aufbau der Groma', 'Aufgaben mit Lösung', 'Praxis: Fluchtstäbe, Mini-Groma, Knotenschnur', 'Quiz je Einheit'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:GROMA:GERADE',
      title: 'Eine Gerade über freies Feld',
      entryQuestion: 'Wie bekommt man auf einem freien Feld eine kilometerlange, wirklich gerade Linie hin?',
      takeaway: 'Eine Gerade im Gelände entsteht, wenn man mehrere Stäbe so setzt, dass sie sich beim Blick entlang der Linie genau verdecken – und ein Lot liefert dafür eine verlässliche Senkrechte.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:AUFBAU' },
      sections: [
        { id: 'OBS:GROMA:STRASSEN', kind: 'observation', title: 'Straßen wie mit dem Lineal gezogen', summary: 'Viele römische Straßen verlaufen über weite Strecken auffallend gerade, auch wenn sie über Hügel und Felder führen. Wer schon einmal versucht hat, auf einer Wiese eine gerade Linie abzugehen, weiß, wie schnell man vom Kurs abkommt. Irgendetwas muss den Römern geholfen haben, die Richtung zu halten.', depthPoints: 4 },
        { id: 'EXPL:GROMA:FLUCHTSTAEBE', kind: 'explanation', title: 'Peilen über Stäbe', summary: 'Die einfachste Methode: Man steckt zwei Stäbe in den Boden und schaut so an ihnen entlang, dass der vordere den hinteren genau verdeckt. Ein Helfer setzt einen dritten Stab weiter vorn genau in diese Sichtlinie. So lässt sich eine Gerade Stück für Stück verlängern. Damit das funktioniert, müssen die Peilmarken exakt senkrecht stehen – schiefe Stäbe verfälschen die Linie.', depthPoints: 8 },
        { id: 'EXPL:GROMA:LOT', kind: 'explanation', title: 'Das Lot: eine Senkrechte, die sich selbst einstellt', summary: 'Ein Lot ist eine Schnur mit einem Gewicht am Ende. Die Schwerkraft zieht das Gewicht nach unten, deshalb hängt die Schnur von selbst senkrecht. Eine Lotschnur ist damit eine bessere Peilmarke als ein Stab, den man nie ganz gerade in den Boden bekommt. Genau diese Idee nutzt die Groma.', depthPoints: 8 },
        practice('PRX:GROMA:FLUCHTSTAEBE', 'Eine Gerade mit drei Stöcken', 'Du brauchst drei gerade Stöcke oder Stangen und eine Wiese. Stecke zwei Stöcke etwa zehn Schritte voneinander senkrecht in den Boden. Stelle dich hinter den ersten und lass eine zweite Person den dritten Stock weiter vorne so lange verschieben, bis er hinter den beiden anderen verschwindet. Gehe danach zur Seite: Stehen alle drei auf einer Linie? Ein Faden mit einem Schlüssel daran als Lot zeigt dir, ob die Stöcke wirklich senkrecht stehen.'),
        { id: 'QUIZ:GROMA:GERADE', kind: 'quiz', title: QUIZ_TITLE, summary: 'Du stehst hinter zwei Fluchtstäben und siehst beide nebeneinander statt hintereinander. Was folgt daraus?||Die Stäbe stehen auf einer Linie mit dir||Du stehst nicht auf der Verlängerung der Linie durch die beiden Stäbe*||Die Stäbe sind zu kurz||Die Linie ist bereits rechtwinklig---Warum hängt eine Lotschnur senkrecht?||Weil die Schnur steif ist||Weil die Schwerkraft das Gewicht senkrecht nach unten zieht*||Weil der Wind sie ausrichtet||Weil sie vorher gerade gezogen wurde---Ein Peilstab steckt leicht schräg im Boden. Warum ist eine Lotschnur als Peilmarke besser?||Sie ist leichter zu sehen||Sie stellt sich unabhängig vom Boden von selbst senkrecht ein*||Sie ist länger als jeder Stab||Sie misst zusätzlich die Entfernung', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:AUFBAU',
      title: 'Der Aufbau der Groma',
      entryQuestion: 'Was steckt in einem Gerät, das nur aus einem Stab, einem Kreuz und vier Schnüren besteht?',
      takeaway: 'Die Groma trägt an einem seitlich versetzten Stab ein rechtwinkliges Kreuz mit vier Loten; ein Zentrallot bringt die Kreuzmitte genau über den Messpunkt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:WINKEL' },
      sections: [
        { id: 'OBS:GROMA:BAUTEILE', kind: 'observation', title: 'Ein Werkzeug der Landvermesser', summary: 'Römische Landvermesser, die agrimensores, hatten ein Hauptwerkzeug: die Groma. Auf den ersten Blick wirkt sie unscheinbar – ein Stab mit einem Kreuz obendrauf, an dem Schnüre mit kleinen Gewichten baumeln. Gerade diese Einfachheit macht sie robust und im Gelände leicht zu bedienen.', depthPoints: 4 },
        { id: 'EX:GROMA:SCHEMA', kind: 'example', title: 'Schema: die Teile der Groma', summary: 'Der Stab (ferramentum) wird senkrecht in den Boden gesteckt. Ein waagerechter Ausleger trägt das drehbare Kreuz (stella) mit vier gleich langen Armen im rechten Winkel. An jedem Armende hängt ein Lot. Unter der Kreuzmitte hängt ein weiteres Lot, das Zentrallot.', image: { src: '/images/diagrams/groma-aufbau.svg', alt: 'Schema einer Groma: senkrechter Stab, seitlicher Ausleger, drehbares Kreuz mit vier Loten an den Armenden und ein Zentrallot über dem Messpunkt am Boden.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:GROMA:VERSATZ', kind: 'explanation', title: 'Warum der Stab seitlich sitzt', summary: 'Der Stab steht nicht unter der Kreuzmitte, sondern ist durch den Ausleger seitlich versetzt. Sonst stünde er genau in der Sichtlinie, über die gepeilt wird. Das Zentrallot übernimmt die Aufgabe, die Kreuzmitte über den Ausgangspunkt am Boden zu bringen.', depthPoints: 8 },
        practice('PRX:GROMA:MINI-GROMA', 'Baue eine Mini-Groma', 'Nimm einen Besenstiel als Stab und zwei gleich lange Holzleisten von etwa 40 Zentimetern. Lege sie mit einem Geodreieck genau rechtwinklig übereinander und verschraube sie in der Mitte zum Kreuz. Hänge an jedes Ende einen Faden mit einer Schraubenmutter. Befestige das Kreuz mit einer kurzen Leiste als Ausleger seitlich oben am Besenstiel, sodass es sich drehen lässt. Ein fünfter Faden in der Kreuzmitte ist dein Zentrallot.'),
        { id: 'QUIZ:GROMA:AUFBAU', kind: 'quiz', title: QUIZ_TITLE, summary: 'Der Vermesser will von einem bestimmten Grenzstein aus messen. Welches Teil richtet er darüber aus?||Den Stab||Das Zentrallot unter der Kreuzmitte*||Ein beliebiges Armlot||Den Ausleger---Warum ist der Stab der Groma seitlich versetzt?||Damit sie leichter zu tragen ist||Damit er die Sichtlinien über die Kreuzmitte nicht verdeckt*||Damit das Kreuz schneller dreht||Damit der Wind weniger angreift---Ein Nachbau hat ein Kreuz, dessen Arme nicht genau im rechten Winkel stehen. Was ist die Folge?||Die Geraden werden kürzer||Die zweite abgesteckte Linie steht nicht rechtwinklig zur ersten*||Die Lote hängen schief||Nichts, die Lote gleichen das aus', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:WINKEL',
      title: 'Peilen und rechte Winkel',
      entryQuestion: 'Wie wird aus einem Kreuz mit Schnüren ein rechter Winkel auf dem Acker?',
      takeaway: 'Wer über zwei gegenüberliegende Lote peilt, steckt eine Gerade ab; das andere Lotpaar liefert die rechtwinklige Linie – und mit 3, 4 und 5 gleichen Abschnitten lässt sich jeder rechte Winkel nachprüfen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:ZENTURIATION' },
      sections: [
        { id: 'OBS:GROMA:ZWEI-SCHNUERE', kind: 'observation', title: 'Zwei Schnüre werden zu einer', summary: 'Schaut man an zwei hintereinander hängenden Schnüren vorbei, gibt es genau eine Blickrichtung, in der die hintere hinter der vorderen verschwindet. Diese Blickrichtung ist eine Gerade – und sie lässt sich mit Stäben ins Gelände übertragen.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ABLAUF', kind: 'explanation', title: 'Der Messablauf in vier Schritten', summary: 'Erstens: Stab einstecken und das Zentrallot über den Ausgangspunkt bringen. Zweitens: Das Kreuz drehen, bis ein Arm in die gewünschte Richtung zeigt. Drittens: An zwei gegenüberliegenden Loten vorbeipeilen, bis sie sich decken; ein Helfer setzt in dieser Linie Fluchtstäbe. Viertens: Über das andere Lotpaar genauso peilen – diese Linie steht rechtwinklig zur ersten, weil die Kreuzarme fest im 90-Grad-Winkel stehen.', depthPoints: 10 },
        { id: 'EXPL:GROMA:ACHSEN', kind: 'explanation', title: 'Cardo und decumanus', summary: 'Die beiden rechtwinkligen Hauptlinien hießen decumanus und cardo. Sie bildeten das Grundgerüst für Militärlager, Stadtgrundrisse und die Einteilung von Ackerland. Oft lief der decumanus etwa in Ost-West- und der cardo in Nord-Süd-Richtung, doch häufig richteten sich die Achsen auch nach Gelände, Küste oder vorhandenen Straßen.', depthPoints: 8 },
        { id: 'EXPL:GROMA:KNOTENSCHNUR', kind: 'explanation', title: 'Die Probe mit 3, 4 und 5', summary: 'Ob ein Winkel wirklich rechtwinklig ist, lässt sich ohne Instrument prüfen. Man misst auf dem einen Schenkel 3 Längeneinheiten ab, auf dem anderen 4. Ist der Winkel genau rechtwinklig, beträgt der Abstand zwischen den beiden Endpunkten genau 5 Einheiten, denn 3 mal 3 plus 4 mal 4 ergibt 25, und das ist 5 mal 5. Ein Seil mit 12 gleichen Abschnitten, zum Dreieck gelegt, reicht dafür aus. Dass schon ägyptische „Seilspanner“ so gearbeitet hätten, wird oft erzählt, ist aber nicht belegt; sicher belegt sind ganzzahlige Seitenverhältnisse für rechte Winkel in Mesopotamien und in den indischen Śulbasūtras.', depthPoints: 8 },
        exercise('EXR:GROMA:DIAGONALE', 'Diagonale prüfen', 'Du hast mit deiner Groma eine Ecke für ein Beet abgesteckt. Ein Schenkel ist 6 Meter lang, der andere 8 Meter. Wie lang muss die Diagonale zwischen den Endpunkten sein, wenn der Winkel stimmt? Und was bedeutet es, wenn du 10,4 Meter misst?', 'Es gilt 6 · 6 + 8 · 8 = 36 + 64 = 100, die Wurzel aus 100 ist 10. Die Diagonale muss also 10 Meter lang sein – das ist das 3-4-5-Dreieck mal zwei. Misst du 10,4 Meter, ist der Winkel etwas größer als 90 Grad; die Ecke muss nachgerichtet werden.'),
        practice('PRX:GROMA:RECHTER-WINKEL', 'Einen rechten Winkel abstecken und prüfen', 'Stecke mit deiner Mini-Groma oder mit zwei Schnüren eine rechtwinklige Ecke im Garten oder auf einer Wiese ab. Markiere auf dem einen Schenkel 3 Meter und auf dem anderen 4 Meter vom Eckpunkt aus. Miss mit einem Maßband den Abstand zwischen den beiden Markierungen. Wie nah kommst du an 5 Meter heran? Probiere es danach mit einem Seil, in das du 12 Knoten im Abstand von je einem großen Schritt geknüpft hast.'),
        { id: 'QUIZ:GROMA:WINKEL', kind: 'quiz', title: QUIZ_TITLE, summary: 'Der Vermesser hat eine Linie über das erste Lotpaar abgesteckt. Wie bekommt er die rechtwinklige Querlinie?||Er dreht das Kreuz um 45 Grad||Er peilt über das zweite, dazu rechtwinklige Lotpaar*||Er misst mit einem Seil die Diagonale||Er stellt den Stab schräg---Warum beweist ein Abstand von genau 5 Metern zwischen der 3-Meter- und der 4-Meter-Marke einen rechten Winkel?||Weil 3 plus 4 ungefähr 5 ergibt||Weil nur beim rechten Winkel 3 · 3 + 4 · 4 genau 5 · 5 ergibt*||Weil alle Dreiecke mit ganzen Zahlen rechtwinklig sind||Weil 5 Meter die längste Seite sein muss---Eine römische Stadt liegt an einer schräg verlaufenden Küste. Ihr Straßenraster ist nicht nach Norden ausgerichtet. Ist das ein Messfehler?||Ja, cardo muss immer genau nach Norden zeigen||Nein, die Achsen wurden oft nach Gelände oder Küste ausgerichtet*||Ja, die Groma kann nur Nord-Süd-Linien messen||Nein, weil Küstenstädte kein Raster hatten', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:ZENTURIATION',
      title: 'Ein Raster für ganze Landschaften',
      entryQuestion: 'Was kann man mit vielen rechten Winkeln anfangen – und wo stößt die Groma an ihre Grenzen?',
      takeaway: 'Mit der Groma teilten die Römer ganze Landschaften in ein Raster aus Quadraten (Zenturiation); Wind störte die Lote, und Höhen konnte sie gar nicht messen.',
      sections: [
        { id: 'OBS:GROMA:RASTER', kind: 'observation', title: 'Ein Muster, das man noch heute sieht', summary: 'Auf Luftbildern mancher Gegenden in Italien, Nordafrika oder Südfrankreich erkennt man bis heute ein regelmäßiges Netz aus Wegen, Feldgrenzen und Gräben. Diese Linien gehen oft auf eine römische Landvermessung vor rund 2000 Jahren zurück.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ZENTURIATION', kind: 'explanation', title: 'Zenturiation: Land in Quadraten', summary: 'Ausgehend von cardo und decumanus wurde Land in gleich große Quadrate geteilt, die centuriae. Eine typische centuria maß 20 mal 20 actus. Ein actus entspricht 120 römischen Fuß, also etwa 35,5 Metern, die centuria hatte damit rund 710 Meter Seitenlänge. Das Raster diente der Zuteilung und Besteuerung von Land, der Anlage von Wegen und Gräben und wurde in Katasterplänen festgehalten.', depthPoints: 10 },
        exercise('EXR:GROMA:CENTURIAE', 'Ein Gebiet aufteilen', 'Ein ebenes Gebiet ist 7,1 Kilometer lang und 3,55 Kilometer breit. Wie viele centuriae von je 710 Meter Seitenlänge passen hinein? Wie groß ist eine centuria ungefähr in Hektar (1 Hektar = 10.000 Quadratmeter)?', 'In der Länge passen 7.100 : 710 = 10, in der Breite 3.550 : 710 = 5 centuriae, zusammen also 50. Eine centuria hat 710 · 710 = 504.100 Quadratmeter, das sind rund 50 Hektar.'),
        { id: 'EXPL:GROMA:GRENZEN', kind: 'explanation', title: 'Wind und Hügel', summary: 'Die Schwachstelle der Groma sind die Lote: Wind lässt die Schnüre pendeln und macht die Peilung ungenau. Man schützte sie deshalb mitunter vor dem Wind oder maß bei ruhigem Wetter. Vor allem aber zeigt die Groma nur Richtungen auf der Fläche. Ob ein Punkt höher oder tiefer liegt als ein anderer, verrät sie nicht – das ist das Thema des nächsten Moduls.', depthPoints: 8 },
        { id: 'BR:GROMA:QUELLEN', kind: 'branch', title: 'Woher wissen wir das?', summary: 'Unser Bild der Groma stützt sich vor allem auf Metallteile, die 1912 in Pompeji in der Werkstatt eines Handwerkers namens Verus gefunden wurden, auf die Darstellung einer Groma auf dem Grabstein des Vermessers Lucius Aebutius Faustus in Ivrea und auf die Schriften der römischen Landvermesser. Wie genau einzelne Teile aussahen und hießen, ist in der Forschung teils umstritten – Nachbauten sind Rekonstruktionen.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:GROMA:ZENTURIATION', kind: 'quiz', title: QUIZ_TITLE, summary: 'Eine centuria hat rund 710 Meter Seitenlänge. Ungefähr wie groß ist ihre Fläche?||Etwa 5 Hektar||Etwa 50 Hektar*||Etwa 500 Hektar||Etwa 7 Hektar---Warum misst man mit der Groma besser bei ruhigem Wetter?||Weil Regen das Holz verzieht||Weil Wind die Lotschnüre pendeln lässt und die Peilung verfälscht*||Weil man sonst die Fluchtstäbe nicht sieht||Weil das Kreuz bei Wind nicht dreht---Für eine Wasserleitung muss ein gleichmäßiges, leichtes Gefälle abgesteckt werden. Reicht die Groma dafür?||Ja, sie misst auch Höhen||Nein, sie zeigt nur Richtungen auf der Fläche, keine Höhenunterschiede*||Ja, wenn man das Kreuz schräg stellt||Nein, weil Wasserleitungen immer gerade sein müssen', depthPoints: 12 },
      ],
    },
  ],
};

// ─── Modul 2: Höhenmessung ───────────────────────────────────────────────────

export const heightMeasurementLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-HOEHEN-0001',
  title: 'Wie misst man, wie hoch etwas liegt?',
  subtitle: 'Vom römischen Wassertisch über das Nivellement bis zur Höhenmarke an der Kirchenwand: wie Wasserspiegel und waagerechte Ziellinien Höhenunterschiede messbar machen. Teil 2 der Reihe Vermessung.',
  status: 'prototype',
  sourceModuleId: 'TEC-L1-000002',
  kxfModuleId: 'LRN:SSF:TEC-L1-000002',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:PHYS-MECH:N1'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L1-000002', 'CON:L1:chorobates', 'CON:L1:nivellement'],
    kueperCom: [HISTORY_DOC],
    overtimeArchive: [],
    ssf: ['Schema: Nivellement', 'Aufgaben mit Lösung', 'Praxis: Wasserglas, Schlauchwaage, Höhenmarke', 'Quiz je Einheit'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:HOEHEN:WAAGERECHTE',
      title: 'Wasser zeigt die Waagerechte',
      entryQuestion: 'Wie baut man eine Wasserleitung, die über viele Kilometer immer ganz leicht bergab fließt?',
      takeaway: 'Eine ruhende Wasseroberfläche ist waagerecht – wer sie als Bezug nutzt wie beim Chorobates, kann Höhenunterschiede erkennen und ein gleichmäßiges Gefälle anlegen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HOEHEN:NIVELLEMENT' },
      sections: [
        { id: 'OBS:HOEHEN:AQUAEDUKT', kind: 'observation', title: 'Eine Leitung mit fast keinem Gefälle', summary: 'Die römische Wasserleitung nach Nîmes, zu der die berühmte Brücke Pont du Gard gehört, ist rund 50 Kilometer lang. Zwischen Quelle und Stadt liegen trotzdem nur etwa 11 bis 13 Meter Höhenunterschied – je nach Quelle. Das Wasser floss also auf einem Kilometer im Mittel nur ein paar Dutzend Zentimeter bergab.', depthPoints: 4 },
        { id: 'EXPL:HOEHEN:WASSERSPIEGEL', kind: 'explanation', title: 'Der Wasserspiegel als Lineal', summary: 'Stehendes Wasser bildet immer eine waagerechte Oberfläche, weil die Schwerkraft es überall gleich nach unten zieht. Ein Lot zeigt die Senkrechte, ein Wasserspiegel die Waagerechte. Beides zusammen gibt dem Vermesser ein festes Bezugssystem, das nicht davon abhängt, wie schief der Boden ist.', depthPoints: 8 },
        practice('PRX:HOEHEN:WASSERGLAS', 'Das schiefe Glas', 'Fülle ein durchsichtiges Glas halb mit Wasser und kippe es langsam zur Seite, ohne etwas zu verschütten. Beobachte die Wasseroberfläche gegen eine Tischkante oder eine Fensterbank. Das Glas ist schief, die Oberfläche bleibt waagerecht. Genau diese Eigenschaft nutzten die Römer beim Chorobates.'),
        { id: 'EXPL:HOEHEN:CHOROBATES', kind: 'explanation', title: 'Der Chorobates', summary: 'Der römische Architekt Vitruv beschreibt den Chorobates: einen langen Holztisch von etwa 20 Fuß, also rund 6 Metern, mit Loten an den Seiten und einer Wasserrinne auf der Oberseite. Steht die Wasseroberfläche überall gleich hoch in der Rinne, liegt der Tisch waagerecht. Über seine Oberkante peilt man dann zu einer entfernten Messlatte und liest ab, wie viel höher oder tiefer der Boden dort liegt.', depthPoints: 10 },
        exercise('EXR:HOEHEN:GEFAELLE', 'Gefälle berechnen', 'Eine Leitung verliert auf 50 Kilometern 12 Meter Höhe. Wie viele Zentimeter sind das pro Kilometer? Und wie viel Prozent Gefälle sind das (Höhenunterschied geteilt durch Strecke mal 100)?', 'Pro Kilometer: 12 Meter geteilt durch 50 sind 0,24 Meter, also 24 Zentimeter. In Prozent: 0,24 Meter geteilt durch 1.000 Meter mal 100 ergibt 0,024 Prozent. Zum Vergleich: Ein Gehweg mit 2 Prozent Gefälle fällt schon fast hundertmal so steil ab.'),
        { id: 'QUIZ:HOEHEN:WAAGERECHTE', kind: 'quiz', title: QUIZ_TITLE, summary: 'Eine Leitung verliert auf 20 Kilometern 6 Meter Höhe. Wie groß ist das Gefälle pro Kilometer?||3 Meter||30 Zentimeter*||3 Zentimeter||60 Zentimeter---Warum eignet sich eine ruhende Wasseroberfläche als Bezug für Höhenmessungen?||Weil Wasser Licht bricht||Weil sie sich durch die Schwerkraft von selbst waagerecht einstellt*||Weil Wasser schwerer ist als Holz||Weil sie immer auf Meereshöhe liegt---Eine moderne Wasserwaage hat eine Luftblase in einer gebogenen Röhre. Was hat sie mit dem Chorobates gemeinsam?||Beide messen Entfernungen||Beide nutzen eine Flüssigkeit, die sich durch die Schwerkraft ausrichtet, um die Waagerechte zu zeigen*||Beide funktionieren nur mit Sonnenlicht||Nichts, die Wasserwaage misst Winkel', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:HOEHEN:NIVELLEMENT',
      title: 'Rückblick und Vorblick',
      entryQuestion: 'Wie findet man heraus, wie viel höher ein Hügel liegt als das Tal, wenn man nicht einfach ein Maßband senkrecht hochhalten kann?',
      takeaway: 'Beim Nivellement zielt man waagerecht auf zwei Messlatten; der Höhenunterschied ist Rückblick minus Vorblick – je kleiner die Ablesung, desto höher der Boden.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HOEHEN:KETTE' },
      sections: [
        { id: 'OBS:HOEHEN:BAUSTELLE', kind: 'observation', title: 'Das Gerät auf dem Dreibein', summary: 'Auf Baustellen sieht man oft ein kleines Fernrohr auf einem Dreibein und einige Schritte entfernt jemanden, der eine lange Latte mit Zahlen senkrecht hält. Das Fernrohr bewegt sich nur waagerecht hin und her. Trotzdem bestimmt man damit Höhen auf Millimeter genau.', depthPoints: 4 },
        { id: 'EX:HOEHEN:SCHEMA', kind: 'example', title: 'Schema: Rückblick und Vorblick', summary: 'Das Nivelliergerät steht zwischen zwei Punkten A und B und zielt genau waagerecht. Auf der Latte bei A liest man 1,85 Meter ab (Rückblick), auf der Latte bei B 0,60 Meter (Vorblick). Weil die Ziellinie auf beiden Seiten gleich hoch ist, liegt B um 1,85 minus 0,60, also 1,25 Meter höher als A. Je kleiner der abgelesene Wert, desto höher liegt der Boden.', image: { src: '/images/diagrams/nivellement.svg', alt: 'Schema eines Nivellements: waagerechte Ziellinie zwischen zwei Messlatten, Rückblick 1,85 Meter bei A, Vorblick 0,60 Meter bei B, Höhenunterschied 1,25 Meter.', credit: CREDIT }, depthPoints: 10 },
        exercise('EXR:HOEHEN:EINZELMESSUNG', 'Eine Aufstellung auswerten', 'Rückblick auf Latte A: 1,42 Meter. Vorblick auf Latte B: 2,07 Meter. Liegt B höher oder tiefer als A, und um wie viel?', 'Rückblick minus Vorblick: 1,42 − 2,07 = −0,65 Meter. Das Ergebnis ist negativ, B liegt also 65 Zentimeter tiefer als A. Probe: Bei B liest man mehr ab, die Latte ragt dort weiter unter die Ziellinie – der Boden liegt tiefer.'),
        practice('PRX:HOEHEN:SCHLAUCHWAAGE', 'Eine Schlauchwaage bauen', 'Besorge einen durchsichtigen Schlauch von einigen Metern Länge und fülle ihn bis auf je eine Handbreit an den Enden mit Wasser, ohne Luftblasen. Halte beide Enden senkrecht hoch: Das Wasser steht in beiden Enden gleich hoch, egal wie weit sie auseinander sind. Halte ein Ende an eine Tischkante und das andere an eine zweite Tischkante oder eine Treppenstufe. Mit einem Zollstock misst du von beiden Wasserständen nach unten – die Differenz ist der Höhenunterschied.'),
        { id: 'QUIZ:HOEHEN:NIVELLEMENT', kind: 'quiz', title: QUIZ_TITLE, summary: 'Rückblick auf Latte A: 2,10 Meter. Vorblick auf Latte B: 0,85 Meter. Wie liegt B im Vergleich zu A?||0,85 Meter tiefer||1,25 Meter höher*||2,95 Meter höher||1,25 Meter tiefer---Warum muss die Ziellinie beim Nivellement genau waagerecht sein?||Damit die Latte besser zu lesen ist||Nur dann ist die Ziellinie über beiden Latten gleich hoch und die Differenz der Ablesungen gleich dem Höhenunterschied*||Damit das Fernrohr nicht umfällt||Damit die Entfernung stimmt---Bei einer Schlauchwaage steht das Wasser in beiden Enden gleich hoch. Welches Prinzip steckt dahinter?||Wasser fließt immer zum tieferen Ende||In verbundenen Gefäßen stellt sich der Wasserspiegel überall auf dieselbe Höhe ein*||Der Schlauch ist überall gleich dick||Luft drückt das Wasser nach oben', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:HOEHEN:KETTE',
      title: 'Lange Strecken und Kontrolle',
      entryQuestion: 'Wie misst man einen Höhenunterschied über einen ganzen Kilometer – und woher weiß man, dass man sich nicht verrechnet hat?',
      takeaway: 'Lange Strecken misst man als Kette von Aufstellungen und addiert die Teilhöhen; wer hin und zurück misst, erkennt Fehler, weil sich die Ergebnisse aufheben müssen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:HOEHEN:NORMALHOEHE' },
      sections: [
        { id: 'OBS:HOEHEN:WEG', kind: 'observation', title: 'Ein Weg mit Auf und Ab', summary: 'Ein Wanderweg führt vom Dorf zur Kapelle auf dem Hügel, zwischendurch geht es auch einmal bergab. Mit einer einzigen Aufstellung des Geräts sieht man nie von unten bis oben. Die Messung muss also in Etappen erfolgen – und bei vielen Etappen schleichen sich leicht Fehler ein.', depthPoints: 4 },
        { id: 'EXPL:HOEHEN:KETTE', kind: 'explanation', title: 'Aufstellung für Aufstellung', summary: 'Man misst Abschnitt für Abschnitt: Die Latte, auf die man eben vorwärts gezielt hat, bleibt stehen und wird bei der nächsten Aufstellung zur Rückblick-Latte. Die einzelnen Höhenunterschiede werden addiert – steigende Abschnitte positiv, fallende negativ. Stellt man das Gerät jeweils etwa in die Mitte zwischen beide Latten, heben sich kleine Fehler der Zielrichtung gegenseitig auf.', depthPoints: 10 },
        { id: 'EXPL:HOEHEN:KONTROLLE', kind: 'explanation', title: 'Hin und zurück', summary: 'Ein einzelner Ablesefehler bleibt in einer langen Kette unbemerkt. Deshalb misst man die Strecke ein zweites Mal in Gegenrichtung. Hin- und Rückmessung müssen fast denselben Betrag mit umgekehrtem Vorzeichen ergeben. Die kleine Abweichung zeigt, wie genau gemessen wurde; als Ergebnis nimmt man den Mittelwert. Ist die Abweichung zu groß, muss neu gemessen werden.', depthPoints: 8 },
        exercise('EXR:HOEHEN:KETTE', 'Eine Kette auswerten', 'Vom Dorf zur Kapelle wurden vier Abschnitte gemessen: +2,35 Meter, +1,80 Meter, −0,45 Meter und +3,10 Meter. Die Rückmessung von der Kapelle zum Dorf ergab −6,79 Meter. Wie hoch liegt die Kapelle über dem Dorf, und wie groß ist die Abweichung zwischen Hin- und Rückmessung?', 'Hinmessung: 2,35 + 1,80 − 0,45 + 3,10 = 6,80 Meter. Rückmessung: −6,79 Meter. Die Summe aus beiden ist 0,01 Meter, also 1 Zentimeter Abweichung. Der Mittelwert der Beträge ist (6,80 + 6,79) : 2 = 6,795 Meter, rund 6,80 Meter.'),
        { id: 'QUIZ:HOEHEN:KETTE', kind: 'quiz', title: QUIZ_TITLE, summary: 'Drei Abschnitte ergeben +1,20 Meter, −0,40 Meter und +0,75 Meter. Wie groß ist der gesamte Höhenunterschied?||2,35 Meter||1,55 Meter*||0,05 Meter||0,85 Meter---Wozu misst man eine Nivellementstrecke ein zweites Mal in Gegenrichtung?||Um doppelt so viele Punkte zu bekommen||Um Fehler zu erkennen, denn beide Ergebnisse müssen sich fast genau aufheben*||Weil das Gerät nur in eine Richtung misst||Um die Strecke zu verkürzen---Eine Messung führt in einer Schleife zurück zum Startpunkt. Welche Summe aller Höhenunterschiede erwartest du ohne Messfehler?||Die Höhe des höchsten Punktes||Genau null*||Die Länge der Schleife||Das Doppelte der größten Steigung', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:HOEHEN:NORMALHOEHE',
      title: 'Höhen über dem Meer',
      entryQuestion: 'Was bedeutet es eigentlich, wenn auf einem Schild steht, ein Ort liege 112 Meter hoch?',
      takeaway: 'Höhenangaben beziehen sich auf eine gemeinsame Bezugsfläche; Höhenmarken an Gebäuden tragen diese Höhe ins Land, und jedes neue Nivellement schließt an eine solche Marke an.',
      sections: [
        { id: 'OBS:HOEHEN:SCHILD', kind: 'observation', title: 'Die Zahl auf dem Ortsschild', summary: 'Auf Wanderkarten, Gipfelkreuzen und manchmal an Bahnhöfen stehen Höhenangaben in Metern. Niemand hat dafür vom Meeresstrand bis in die Berge ein Maßband gespannt. Trotzdem passen die Zahlen verschiedener Orte zueinander.', depthPoints: 4 },
        { id: 'EXPL:HOEHEN:BEZUG', kind: 'explanation', title: 'Eine gemeinsame Nullfläche', summary: 'Der Meeresspiegel schwankt mit Ebbe, Flut und Wetter. Deshalb legen Staaten eine feste Bezugshöhe fest. In Deutschland werden Höhen heute in Metern über Normalhöhennull angegeben, kurz NHN; der Bezug geht historisch auf den Amsterdamer Pegel zurück. Von dort wurden über Jahrzehnte Nivellementketten durch das ganze Land gemessen.', depthPoints: 10 },
        { id: 'EXPL:HOEHEN:MARKEN', kind: 'explanation', title: 'Höhenmarken: Höhe zum Anfassen', summary: 'Entlang dieser Ketten wurden Höhenfestpunkte dauerhaft markiert, oft als kleine Metallbolzen in den Mauern von Kirchen, Bahnhöfen oder Brücken. Ihre Höhe ist amtlich bekannt. Wer heute eine Baustelle vermisst, beginnt mit einem Rückblick auf eine solche Marke und rechnet von dort weiter.', depthPoints: 8 },
        exercise('EXR:HOEHEN:ANSCHLUSS', 'An eine Höhenmarke anschließen', 'Eine Höhenmarke an der Kirche liegt auf 112,348 Meter über NHN. Rückblick auf die Marke: 1,512 Meter. Vorblick auf einen Pflock auf der Baustelle: 0,734 Meter. Auf welcher Höhe liegt der Pflock?', 'Höhenunterschied: 1,512 − 0,734 = 0,778 Meter, der Pflock liegt also höher als die Marke. Höhe des Pflocks: 112,348 + 0,778 = 113,126 Meter über NHN.'),
        practice('PRX:HOEHEN:MARKE-SUCHEN', 'Eine Höhenmarke finden', 'Halte bei deinem nächsten Spaziergang Ausschau nach kleinen runden Metallbolzen oder Plaketten in den Mauern älterer öffentlicher Gebäude, etwa an Kirchen, Rathäusern oder Bahnhöfen. Viele tragen eine Aufschrift oder ein Symbol der Landesvermessung. Die amtliche Höhe solcher Punkte veröffentlichen die Vermessungsverwaltungen der Länder, oft in ihren Online-Karten.'),
        { id: 'QUIZ:HOEHEN:NORMALHOEHE', kind: 'quiz', title: QUIZ_TITLE, summary: 'Eine Höhenmarke liegt auf 85,200 Meter. Rückblick auf die Marke 1,300 Meter, Vorblick auf Punkt P 2,000 Meter. Wie hoch liegt P?||87,200 Meter||84,500 Meter*||85,900 Meter||83,900 Meter---Warum nimmt man nicht einfach den Meeresspiegel am nächsten Strand als Nullpunkt?||Weil Strände zu weit weg sind||Weil der Meeresspiegel mit Gezeiten und Wetter schwankt und jedes Land einheitlich messen muss*||Weil Wasser keine Höhe hat||Weil der Meeresspiegel überall gleich ist---Zwei Baustellen in verschiedenen Städten schließen jeweils an die nächste amtliche Höhenmarke an. Warum passen ihre Höhen trotzdem zusammen?||Weil beide dasselbe Gerät benutzen||Weil alle amtlichen Marken über Nivellementketten auf dieselbe Bezugsfläche bezogen sind*||Weil Städte immer gleich hoch liegen||Zufall', depthPoints: 12 },
      ],
    },
  ],
};

// ─── Modul 3: Triangulation ──────────────────────────────────────────────────

export const triangulationLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-TRIANGULATION-0001',
  title: 'Wie misst man Entfernungen, ohne hinzugehen?',
  subtitle: 'Schatten, Basislinien und Dreiecksnetze: wie man aus wenigen Strecken und vielen Winkeln Bäume, Flüsse und ganze Länder vermisst – und was GPS anders macht. Teil 3 der Reihe Vermessung.',
  status: 'prototype',
  sourceModuleId: 'TEC-L2-000001',
  kxfModuleId: 'LRN:SSF:TEC-L2-000001',
  domainsNeeded: ['KD:MATH-GEO:N1'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L2-000001', 'CON:L1:triangulation'],
    kueperCom: [HISTORY_DOC],
    overtimeArchive: [],
    ssf: ['Schema: Schattenmessung', 'Schema: Entfernung über eine Basislinie', 'Aufgaben mit Lösung', 'Praxis: Baumhöhe, 45-Grad-Trick, GPS-Genauigkeit', 'Quiz je Einheit'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:TRIANG:SCHATTEN',
      title: 'Gleiche Form, andere Größe',
      entryQuestion: 'Wie hoch ist der Baum im Park, wenn man nicht hinaufklettern kann?',
      takeaway: 'Dreiecke mit gleichen Winkeln haben dieselbe Form; deshalb verhalten sich Höhe und Schatten bei Baum und Stab gleich, und aus einem kleinen Dreieck lässt sich ein großes berechnen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:TRIANG:BASIS' },
      sections: [
        { id: 'OBS:TRIANG:SCHATTEN', kind: 'observation', title: 'Lange Schatten am Abend', summary: 'Am Morgen und am Abend werfen alles lange Schatten, mittags kurze. Dabei fällt auf: Zur selben Zeit ist der Schatten eines hohen Baums lang und der eines kleinen Pfostens kurz, aber beide wachsen und schrumpfen im Laufe des Tages im Gleichschritt.', depthPoints: 4 },
        { id: 'EX:TRIANG:SCHATTEN-SCHEMA', kind: 'example', title: 'Schema: Baum und Stab', summary: 'Die Sonnenstrahlen treffen Baum und Stab im selben Winkel. Dadurch bilden Baum, Schatten und Sonnenstrahl ein Dreieck mit denselben Winkeln wie Stab, Schatten und Strahl – nur größer. Ein 2 Meter hoher Stab wirft 3 Meter Schatten, der Baum 18 Meter. Das große Dreieck ist sechsmal so groß, der Baum also 6 mal 2, gleich 12 Meter hoch.', image: { src: '/images/diagrams/schattenmessung.svg', alt: 'Schema: Baum mit 18 Meter Schatten und Stab von 2 Metern Höhe mit 3 Meter Schatten; die Sonnenstrahlen bilden zwei ähnliche Dreiecke.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:TRIANG:AEHNLICH', kind: 'explanation', title: 'Ähnliche Dreiecke', summary: 'Zwei Dreiecke mit denselben Winkeln heißen ähnlich. Bei ihnen ist das Verhältnis zweier Seiten immer gleich, egal wie groß das Dreieck ist. Der Überlieferung nach soll schon Thales von Milet auf diese Weise die Höhe einer Pyramide aus ihrem Schatten bestimmt haben. Ob die Geschichte so stimmt, ist ungewiss – das Prinzip funktioniert jedenfalls.', depthPoints: 8 },
        exercise('EXR:TRIANG:KIRCHTURM', 'Einen Kirchturm messen', 'Ein 1 Meter langer Stab wirft einen 1,5 Meter langen Schatten. Der Schatten des Kirchturms ist zur selben Zeit 27 Meter lang. Wie hoch ist der Turm?', 'Beim Stab ist die Höhe 1 : 1,5 des Schattens, also zwei Drittel. Für den Turm gilt dasselbe: 27 Meter mal 2 : 3 = 18 Meter. Der Turm ist also etwa 18 Meter hoch.'),
        practice('PRX:TRIANG:BAUMHOEHE', 'Die Höhe eines Baums bestimmen', 'Wähle einen sonnigen Tag und einen frei stehenden Baum. Stelle einen Besenstiel senkrecht auf den Boden – ein Faden mit Gewicht zeigt dir, ob er gerade steht – und miss seine Höhe und die Länge seines Schattens. Miss gleich danach den Schatten des Baums vom Stamm bis zur Spitze des Schattens. Rechne wie in der Aufgabe. Schau dabei nie direkt in die Sonne.'),
        { id: 'QUIZ:TRIANG:SCHATTEN', kind: 'quiz', title: QUIZ_TITLE, summary: 'Ein 1 Meter hoher Pfosten wirft 2 Meter Schatten, ein Mast zur selben Zeit 24 Meter. Wie hoch ist der Mast?||48 Meter||12 Meter*||24 Meter||6 Meter---Warum funktioniert die Schattenmethode nur, wenn Stab und Baum zur selben Zeit gemessen werden?||Weil sich der Baum bewegt||Weil sich der Sonnenstand ändert und die Dreiecke sonst nicht mehr dieselben Winkel haben*||Weil der Schatten nachts verschwindet||Weil der Stab sonst umfällt---Auf einem Foto ist eine Person 1,80 Meter groß und 2 Zentimeter hoch abgebildet, ein Haus daneben 9 Zentimeter. Wie hoch ist das Haus ungefähr?||9 Meter||8,1 Meter*||18 Meter||4,5 Meter', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:TRIANG:BASIS',
      title: 'Eine Basislinie und zwei Winkel',
      entryQuestion: 'Wie weit ist der Baum auf der anderen Seite des Flusses entfernt, wenn man nicht hinüber kann?',
      takeaway: 'Kennt man eine Strecke und die beiden Winkel an ihren Enden, liegt das ganze Dreieck fest – so lassen sich unerreichbare Entfernungen allein aus einer Basislinie und Winkeln berechnen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:TRIANG:NETZ' },
      sections: [
        { id: 'OBS:TRIANG:FLUSS', kind: 'observation', title: 'Ein Ufer, das man nicht erreicht', summary: 'Zwischen dir und einem Baum am anderen Ufer liegt ein breiter Fluss. Ein Maßband kannst du nicht hinüberspannen. Du kannst aber an deinem Ufer entlanggehen und den Baum von verschiedenen Stellen aus anpeilen. Je weiter du gehst, desto mehr ändert sich die Richtung, in der du ihn siehst.', depthPoints: 4 },
        { id: 'EX:TRIANG:BASIS-SCHEMA', kind: 'example', title: 'Schema: eine Basislinie und zwei Winkel', summary: 'Am eigenen Ufer misst man eine Strecke von A nach B, die Basis, hier 100 Meter. Bei A peilt man den Baum genau rechtwinklig zur Basis an, bei B misst man den Winkel zwischen Basis und Baum: 60 Grad. Damit liegt das Dreieck fest. Zeichnet man es maßstäblich, etwa 1 Zentimeter für 10 Meter, kann man die Entfernung von A zum Baum einfach abmessen: rund 173 Meter.', image: { src: '/images/diagrams/triangulation.svg', alt: 'Schema: Basislinie von 100 Metern am Flussufer zwischen A und B, rechter Winkel bei A, 60 Grad bei B, Entfernung von A zum Baum am anderen Ufer etwa 173 Meter.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:TRIANG:TANGENS', kind: 'explanation', title: 'Vom Zeichnen zum Rechnen', summary: 'Alle rechtwinkligen Dreiecke mit demselben Winkel bei B sind ähnlich. Deshalb ist bei 60 Grad das Verhältnis der Gegenseite zur Basis immer gleich, nämlich etwa 1,73. Dieses Verhältnis heißt Tangens des Winkels; jeder Taschenrechner kennt es. Die Rechnung lautet: Entfernung gleich Basis mal Tangens des Winkels, also 100 Meter mal 1,73, rund 173 Meter. Bei 45 Grad ist der Tangens genau 1 – dann ist die Entfernung so lang wie die Basis.', depthPoints: 10 },
        { id: 'EXPL:TRIANG:DIOPTRA', kind: 'explanation', title: 'Winkel messen in der Antike', summary: 'Schon in der Antike gab es Geräte, um Winkel zu peilen. Heron von Alexandria beschrieb im 1. Jahrhundert die Dioptra, eine drehbare Visiereinrichtung, mit der man Richtungen und Höhenwinkel bestimmen konnte. Im Unterschied zur Groma kann sie beliebige Winkel messen, nicht nur rechte.', depthPoints: 6 },
        exercise('EXR:TRIANG:BASIS', 'Die Breite eines Sees', 'Am Ufer eines Sees wird eine Basis von 80 Metern abgesteckt, mit einem rechten Winkel bei A zur Boje auf der anderen Seite. Bei B werden 30 Grad gemessen. Der Tangens von 30 Grad ist etwa 0,577. Wie weit ist die Boje von A entfernt?', 'Entfernung = Basis mal Tangens des Winkels = 80 Meter mal 0,577 ≈ 46 Meter. Probe mit Augenmaß: Bei 30 Grad ist die Gegenseite deutlich kürzer als die Basis – das passt.'),
        practice('PRX:TRIANG:45-GRAD', 'Der 45-Grad-Trick', 'Suche dir auf einem Sportplatz oder einer Wiese ein Ziel in einiger Entfernung, etwa einen Torpfosten. Stelle dich so hin, dass das Ziel genau rechtwinklig vor dir liegt, und markiere diesen Punkt A. Gehe nun seitlich weiter und peile das Ziel immer wieder mit einem Geodreieck über die 45-Grad-Kante an. Sobald es genau unter 45 Grad erscheint, bleibst du stehen. Zähle deine Schritte von A bis hierher: So weit ist das Ziel von A entfernt, denn der Tangens von 45 Grad ist 1. Kontrolliere danach mit dem Maßband.'),
        { id: 'QUIZ:TRIANG:BASIS', kind: 'quiz', title: QUIZ_TITLE, summary: 'Basis 50 Meter, rechter Winkel bei A, bei B werden 45 Grad gemessen. Der Tangens von 45 Grad ist 1. Wie weit ist der Baum von A entfernt?||25 Meter||50 Meter*||71 Meter||100 Meter---Warum reichen eine Strecke und zwei Winkel, um ein Dreieck festzulegen?||Weil der dritte Winkel immer 90 Grad ist||Weil damit Form und Größe des Dreiecks eindeutig bestimmt sind*||Weil alle Dreiecke gleich groß sind||Weil man die anderen Seiten schätzen kann---Ein Wanderer will die Breite einer Schlucht bestimmen. Was muss er auf seiner Seite messen?||Nur die Tiefe der Schlucht||Eine Basislinie entlang der Kante und die Winkel zu einem Punkt auf der anderen Seite*||Die Zeit, die ein Stein zum Fallen braucht||Nur einen einzigen Winkel', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:TRIANG:NETZ',
      title: 'Dreiecke über ganze Länder',
      entryQuestion: 'Wie vermisst man ein ganzes Land, wenn man nur eine einzige Strecke mit dem Maßband messen will?',
      takeaway: 'Bei der Triangulation misst man eine Basislinie genau und alles andere nur über Winkel; ein Netz aneinandergereihter Dreiecke trägt die Maße so über Hunderte Kilometer.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:TRIANG:HEUTE' },
      sections: [
        { id: 'OBS:TRIANG:KIRCHTUERME', kind: 'observation', title: 'Von Turm zu Turm', summary: 'Von einem hohen Kirchturm aus sieht man bei klarem Wetter oft mehrere Nachbarorte, deren Türme ebenfalls weit sichtbar sind. Jeder Turm ist ein fester Punkt, den man aus vielen Richtungen anpeilen kann. Genau solche Punkte nutzten die ersten Landesvermesser.', depthPoints: 4 },
        { id: 'EXPL:TRIANG:KETTE', kind: 'explanation', title: 'Ein Dreieck reicht das nächste weiter', summary: 'Hat man in einem Dreieck alle Seiten berechnet, wird eine dieser Seiten zur Basis des nächsten Dreiecks. So entsteht eine Kette oder ein Netz aus Dreiecken. Nur die erste Basislinie misst man mühsam am Boden, alle weiteren Strecken folgen aus Winkelmessungen. Weil sich Winkel über große Entfernungen sehr genau messen lassen, ist diese Methode viel genauer als ein Maßband über Hügel, Wälder und Flüsse. Zur Kontrolle misst man am Ende des Netzes meist eine zweite Basis.', depthPoints: 10 },
        { id: 'EXPL:TRIANG:SNELLIUS', kind: 'explanation', title: 'Snellius und Gauß', summary: 'Der Niederländer Willebrord Snellius begann 1615, die Entfernung zwischen Alkmaar und Bergen op Zoom über ein Dreiecksnetz aus Kirchtürmen zu bestimmen; 1617 veröffentlichte er die Ergebnisse. Zwei Jahrhunderte später leitete Carl Friedrich Gauß die Vermessung des Königreichs Hannover. Sein größtes Dreieck zwischen Brocken, Hohehagen und Inselsberg hatte Seiten von bis zu rund 107 Kilometern. Um so weit peilen zu können, entwickelte er den Heliotrop, einen Spiegel, der Sonnenlicht gezielt zum Nachbarpunkt lenkt.', depthPoints: 10 },
        exercise('EXR:TRIANG:KONTROLLE', 'Winkel prüfen', 'In einem kleinen Vermessungsdreieck wurden die Winkel 52,4 Grad, 71,3 Grad und 56,5 Grad gemessen. Stimmt die Messung? Und warum lohnt es sich, alle drei Winkel zu messen, obwohl zwei eigentlich reichen würden?', 'Die Summe ist 52,4 + 71,3 + 56,5 = 180,2 Grad. In einem ebenen Dreieck müssten es genau 180 Grad sein; die Abweichung von 0,2 Grad zeigt einen kleinen Messfehler, der auf die drei Winkel verteilt werden kann. Genau dafür misst man den dritten Winkel mit: Er dient als Kontrolle.'),
        { id: 'BR:TRIANG:WINKELSUMME', kind: 'branch', title: 'Ist der Raum eben?', summary: 'In einem ebenen Dreieck ergeben die drei Winkel zusammen 180 Grad. Auf der gekrümmten Erdoberfläche ist die Summe bei großen Dreiecken etwas größer; beim Dreieck Brocken–Hohehagen–Inselsberg sind es rund 15 Bogensekunden. Die Messungen von Gauß stimmten mit dieser Erwartung im Rahmen der Messgenauigkeit überein. Ob er damit bewusst auch die Geometrie des Raumes selbst prüfen wollte, wird in der Wissenschaftsgeschichte diskutiert.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:TRIANG:NETZ', kind: 'quiz', title: QUIZ_TITLE, summary: 'In einem Dreiecksnetz sind alle Seiten des ersten Dreiecks berechnet. Wie geht es weiter?||Man misst die nächste Strecke mit dem Maßband||Eine bekannte Seite wird zur Basis des nächsten Dreiecks, dazu misst man nur Winkel*||Man schätzt die nächste Strecke||Man beginnt ein ganz neues Netz---Warum misst man bei der Triangulation fast nur Winkel statt Strecken?||Weil Winkel keine Einheit haben||Weil sich Winkel über große Entfernungen genauer messen lassen als Strecken im Gelände*||Weil Strecken in Dreiecken immer gleich sind||Weil Maßbänder verboten waren---Die drei gemessenen Winkel eines kleinen Dreiecks ergeben 179,7 Grad. Was folgt daraus?||Das Dreieck liegt auf einer Kugel||Es gibt einen kleinen Messfehler, denn im ebenen Dreieck müssten es 180 Grad sein*||Einer der Winkel ist ein rechter Winkel||Das Dreieck ist besonders genau gemessen', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:TRIANG:HEUTE',
      title: 'Vermessen heute',
      entryQuestion: 'Woher weiß das Handy, wo es gerade ist – und hat das noch etwas mit Dreiecken zu tun?',
      takeaway: 'Heutige Vermessung misst Winkel und Strecken elektronisch; Satellitennavigation bestimmt Positionen aus gemessenen Entfernungen statt aus Winkeln – das ist Trilateration statt Triangulation.',
      sections: [
        { id: 'OBS:TRIANG:HANDY', kind: 'observation', title: 'Ein blauer Punkt auf der Karte', summary: 'Die Kartenapp zeigt deinen Standort als Punkt, oft mit einem Kreis darum. Stehst du still, wandert der Punkt manchmal ein paar Meter hin und her, und zwischen hohen Häusern wird der Kreis größer. Irgendwie misst das Handy, wo es ist – aber nicht ganz genau.', depthPoints: 4 },
        { id: 'EXPL:TRIANG:TACHYMETER', kind: 'explanation', title: 'Das Tachymeter', summary: 'Vermesser arbeiten heute mit dem Tachymeter, einem Gerät auf einem Dreibein, das Winkel elektronisch misst und zusätzlich die Entfernung zu einem Reflektor mit einem Lichtsignal bestimmt. Damit misst es in einem Schritt Richtung und Strecke. Das Prinzip ist immer noch Geometrie im Dreieck, nur viel schneller und genauer als mit der Dioptra.', depthPoints: 8 },
        { id: 'EXPL:TRIANG:TRILATERATION', kind: 'explanation', title: 'Entfernungen statt Winkel', summary: 'Satellitennavigation wie GPS oder Galileo misst keine Winkel. Der Empfänger bestimmt, wie lange die Signale mehrerer Satelliten unterwegs waren, und rechnet daraus Entfernungen. Kennt man die Entfernung zu einem Punkt, liegt man irgendwo auf einer Kugel um ihn. Mehrere solcher Kugeln schneiden sich nur an einer Stelle. Dieses Verfahren heißt Trilateration. Weil Funksignale fast mit Lichtgeschwindigkeit laufen, muss die Zeit extrem genau gemessen werden; dazu braucht der Empfänger mindestens vier Satelliten. Mit Korrekturdaten von Referenzstationen erreichen Vermesser Zentimetergenauigkeit.', depthPoints: 10 },
        exercise('EXR:TRIANG:LAUFZEIT', 'Entfernung aus der Laufzeit', 'Ein Funksignal ist mit rund 300.000 Kilometern pro Sekunde unterwegs. Ein Signal braucht von einem Satelliten bis zum Empfänger 0,07 Sekunden. Wie weit ist der Satellit entfernt? Wie groß wird der Fehler, wenn die Uhr des Empfängers um eine Millionstel Sekunde falsch geht?', 'Entfernung: 300.000 km/s mal 0,07 s = 21.000 Kilometer. Fehler: 300.000 km/s mal 0,000001 s = 0,3 Kilometer, also 300 Meter. Deshalb rechnet der Empfänger den eigenen Uhrfehler mit aus – das ist der Grund für den vierten Satelliten.'),
        practice('PRX:TRIANG:GPS', 'Wie genau ist dein Handy?', 'Stelle dich auf einen Punkt, den du auf der Karte genau erkennst, etwa eine Wegkreuzung oder eine Ecke auf einem Sportplatz. Öffne die Kartenapp und beobachte zwei Minuten lang, wie weit der Standortpunkt von der echten Stelle abweicht und wie groß der Genauigkeitskreis ist. Wiederhole das zwischen hohen Gebäuden oder unter Bäumen. Wo ist die Messung schlechter, und warum könnte das so sein?'),
        { id: 'QUIZ:TRIANG:HEUTE', kind: 'quiz', title: QUIZ_TITLE, summary: 'Ein Signal braucht 0,08 Sekunden vom Satelliten zum Empfänger. Bei 300.000 Kilometern pro Sekunde: Wie weit ist der Satellit entfernt?||2.400 Kilometer||24.000 Kilometer*||240.000 Kilometer||3.750 Kilometer---Was misst ein Satellitenempfänger, um seine Position zu bestimmen?||Die Winkel zu den Satelliten||Die Laufzeiten der Signale und daraus die Entfernungen*||Die Helligkeit der Satelliten||Die Höhe über dem Meeresspiegel direkt---Warum ist die Position zwischen hohen Häusern oft ungenauer?||Weil Häuser magnetisch sind||Weil Signale abgeschattet oder an Wänden reflektiert werden und so falsche Laufzeiten entstehen*||Weil Satelliten Städte meiden||Weil das Handy dort weniger Strom hat', depthPoints: 12 },
      ],
    },
  ],
};

// ─── Modul 4: Sonnenuhr (AST) ────────────────────────────────────────────────

export const sundialLearningPath: LearningPath = {
  id: 'PATH:SSF:AST-SONNENUHR-0001',
  title: 'Was verrät ein Schatten über Richtung, Zeit und die Größe der Erde?',
  subtitle: 'Ein einfacher Stab zeigt, wo Norden liegt, wie spät es ist und wie groß die Erde ist: Schattenstab, Sonnenuhr, Sonnenzeit und das Experiment des Eratosthenes. Teil 4 der Reihe Vermessung.',
  status: 'prototype',
  sourceModuleId: 'AST-L1-000002',
  kxfModuleId: 'LRN:SSF:AST-L1-000002',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:ASTRO-BASIC'],
  suppliedBy: {
    knowledgeGraph: ['AST-L1-000002', 'CON:L1:gnomon', 'CON:L1:sonnenuhr', 'CON:L1:erdumfang-eratosthenes'],
    kueperCom: [HISTORY_DOC],
    overtimeArchive: [],
    ssf: ['Schema: Nordrichtung aus dem Schatten', 'Schema: Erdumfang nach Eratosthenes', 'Aufgaben mit Lösung', 'Praxis: Mittagslinie, Schattenprotokoll, Pappsonnenuhr, Sonnenmittag, Schattenvergleich', 'Quiz je Einheit'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:SONNE:NORDEN',
      title: 'Norden aus dem Schatten',
      entryQuestion: 'Wie findet man ohne Kompass heraus, wo Norden ist?',
      takeaway: 'Ein senkrechter Stab wirft vormittags und nachmittags gleich lange Schatten in spiegelbildliche Richtungen; die Mitte zwischen beiden Schattenspitzen liegt genau im Norden.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SONNE:WANDERN' },
      sections: [
        { id: 'OBS:SONNE:STAB', kind: 'observation', title: 'Ein Stab im Sonnenschein', summary: 'Steckt man einen Stab senkrecht in den Boden, wandert sein Schatten im Laufe des Tages. Am Vormittag ist er lang und zeigt nach Westen, gegen Mittag wird er kürzer, am Nachmittag wieder länger und zeigt nach Osten. Irgendwann dazwischen ist er am kürzesten.', depthPoints: 4 },
        { id: 'EX:SONNE:KREIS-SCHEMA', kind: 'example', title: 'Schema: der Kreis um den Stab', summary: 'Der kürzeste Schatten zeigt bei uns genau nach Norden, aber den Moment des kürzesten Schattens erwischt man schwer. Einfacher ist ein Kreis: Man markiert am Vormittag die Schattenspitze und zieht mit einer Schnur einen Kreis um den Stab durch diese Marke. Am Nachmittag wartet man, bis die Schattenspitze den Kreis wieder berührt, und markiert auch diesen Punkt. Die Mitte zwischen beiden Marken liegt genau nördlich des Stabs.', image: { src: '/images/diagrams/indischer-kreis.svg', alt: 'Draufsicht: Stab in der Mitte eines Kreises, Kurve der Schattenspitze, zwei Marken auf dem Kreis am Vor- und Nachmittag, Nord-Süd-Linie durch die Mitte zwischen beiden Marken.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:SONNE:VITRUV', kind: 'explanation', title: 'Ein Verfahren für Stadtplaner', summary: 'Der römische Architekt Vitruv beschreibt diese Methode für die Planung von Städten: einen ebenen Platz, einen Bronzestab in der Mitte, eine Marke am Vormittag, einen Kreis und eine zweite Marke am Nachmittag. So ließen sich die Himmelsrichtungen festlegen, nach denen Straßen ausgerichtet wurden – die Brücke zu cardo und decumanus aus dem Groma-Modul. Der Trick funktioniert, weil die Sonne vormittags und nachmittags symmetrisch zum Mittag steht. Dasselbe Verfahren beschreiben auch das indische Kātyāyana-Śulbasūtra und der chinesische Text Kaogongji; der Name „indischer Kreis“ geht auf den Gelehrten al-Bīrūnī zurück.', depthPoints: 8 },
        exercise('EXR:SONNE:MITTELSENKRECHTE', 'Norden konstruieren', 'Die beiden Marken auf dem Kreis liegen 3,20 Meter auseinander. Wie findest du ohne Winkelmesser den Punkt genau nördlich des Stabs, und wie legst du die Nord-Süd-Linie fest?', 'Miss die Strecke zwischen den Marken und halbiere sie: Nach 1,60 Metern liegt der Mittelpunkt. Die Linie vom Stab durch diesen Mittelpunkt ist die Nord-Süd-Linie, der Mittelpunkt liegt auf der Nordseite. Ohne Maßband geht es mit einer Schnur als Zirkel: Um beide Marken gleich große Kreisbögen schlagen – die Verbindungslinie ihrer Schnittpunkte geht durch den Stab und zeigt nach Norden.'),
        practice('PRX:SONNE:MITTAGSLINIE', 'Eine Mittagslinie im Garten', 'Stecke an einem sonnigen Tag auf ebenem Boden einen geraden Stab senkrecht in die Erde; prüfe ihn mit einem Faden mit Gewicht. Markiere gegen 10 Uhr die Schattenspitze mit einem Stöckchen. Binde eine Schnur locker um den Stab und ziehe damit einen Kreis durch die Marke. Am Nachmittag wartest du, bis die Schattenspitze den Kreis wieder berührt, und markierst diesen Punkt. Lege die Nord-Süd-Linie fest und vergleiche sie mit einem Kompass: Die Abweichung beträgt in Deutschland nur wenige Grad.'),
        { id: 'QUIZ:SONNE:NORDEN', kind: 'quiz', title: QUIZ_TITLE, summary: 'Am Vormittag zeigt der Schatten eines Stabs nach Westnordwest. In welche Richtung zeigt er bei gleicher Länge am Nachmittag?||Nach Westsüdwest||Nach Ostnordost*||Nach Süden||Genau nach Westen---Warum misst man zwei gleich lange Schatten statt den kürzesten Schatten?||Weil der kürzeste Schatten nach Süden zeigt||Weil man den Moment des kürzesten Schattens schwer genau erkennt, gleich lange Schatten aber leicht mit einem Kreis findet*||Weil kurze Schatten unscharf sind||Weil der Stab mittags umfällt---Eine römische Stadt soll mit dem decumanus genau in Ost-West-Richtung angelegt werden. Wie hilft der Schattenkreis?||Er misst die Länge der Straße||Er liefert die Nord-Süd-Linie, und die Ost-West-Linie steht rechtwinklig dazu*||Er zeigt, wo Wasser fließt||Er ersetzt die Groma vollständig', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SONNE:WANDERN',
      title: 'Warum der Schatten wandert',
      entryQuestion: 'Warum ist der Schatten im Sommer mittags kurz und im Winter lang?',
      takeaway: 'Die Erde dreht sich in 24 Stunden einmal, die Sonne scheint daher 15 Grad pro Stunde weiterzuwandern; wie hoch sie mittags steht, hängt von Breitengrad und Jahreszeit ab.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SONNE:POLSTAB' },
      sections: [
        { id: 'OBS:SONNE:JAHRESZEIT', kind: 'observation', title: 'Kurze Sommerschatten, lange Winterschatten', summary: 'Mittags im Juni ist dein eigener Schatten kürzer als du selbst. Mittags im Dezember ist er ein Vielfaches deiner Körpergröße. Die Sonne steht im Winter einfach viel tiefer am Himmel, obwohl es dieselbe Tageszeit ist.', depthPoints: 4 },
        { id: 'EXPL:SONNE:DREHUNG', kind: 'explanation', title: '15 Grad pro Stunde', summary: 'Nicht die Sonne wandert, sondern die Erde dreht sich. Für eine volle Umdrehung von 360 Grad braucht sie etwa 24 Stunden, in einer Stunde also 360 durch 24, gleich 15 Grad. Um genau diesen Winkel scheint die Sonne jede Stunde am Himmel weiterzurücken – und der Schatten mit ihr.', depthPoints: 8 },
        { id: 'EXPL:SONNE:MITTAGSHOEHE', kind: 'explanation', title: 'Wie hoch steht die Sonne mittags?', summary: 'Die Erdachse ist um etwa 23,4 Grad gegen die Erdbahn geneigt. Zur Tagundnachtgleiche im März und September steht die Sonne mittags 90 Grad minus Breitengrad hoch, auf 50 Grad nördlicher Breite also 40 Grad. Zum Sommeranfang kommen 23,4 Grad hinzu, zum Winteranfang werden sie abgezogen. Je tiefer die Sonne, desto länger der Schatten.', depthPoints: 10 },
        exercise('EXR:SONNE:MITTAGSHOEHE', 'Mittagshöhe berechnen', 'Frankfurt liegt auf etwa 50 Grad nördlicher Breite. Wie hoch steht die Sonne dort mittags zur Tagundnachtgleiche, zum Sommeranfang und zum Winteranfang?', 'Tagundnachtgleiche: 90 − 50 = 40 Grad. Sommeranfang: 40 + 23,4 = 63,4 Grad. Winteranfang: 40 − 23,4 = 16,6 Grad. Ein 1 Meter hoher Stab wirft im Winter mittags deshalb einen über 3 Meter langen Schatten, im Sommer einen nur etwa einen halben Meter langen.'),
        practice('PRX:SONNE:SCHATTENPROTOKOLL', 'Ein Schattenprotokoll', 'Lege an einem sonnigen Tag ein großes Blatt Papier auf eine waagerechte Fläche und stelle einen Stift oder Nagel senkrecht in die Mitte. Markiere jede volle Stunde die Schattenspitze und schreibe die Uhrzeit dazu. Am Abend ziehst du Linien vom Fußpunkt zu jeder Marke und misst die Winkel zwischen benachbarten Linien. Sind sie alle gleich 15 Grad? Notiere das Ergebnis – die nächste Einheit erklärt es.'),
        { id: 'QUIZ:SONNE:WANDERN', kind: 'quiz', title: QUIZ_TITLE, summary: 'Um wie viel Grad scheint die Sonne in 3 Stunden weiterzuwandern?||15 Grad||45 Grad*||30 Grad||90 Grad---Warum ist der Mittagsschatten im Winter länger als im Sommer?||Weil die Erde im Winter weiter von der Sonne entfernt ist||Weil die geneigte Erdachse die Sonne im Winter mittags tiefer stehen lässt*||Weil die Sonne im Winter schwächer leuchtet||Weil sich die Erde im Winter langsamer dreht---In Rom auf etwa 42 Grad nördlicher Breite: Wie hoch steht die Sonne mittags zur Tagundnachtgleiche?||42 Grad||48 Grad*||90 Grad||23,4 Grad', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SONNE:POLSTAB',
      title: 'Die Sonnenuhr',
      entryQuestion: 'Warum steht der Stab an vielen Sonnenuhren schräg und nicht senkrecht?',
      takeaway: 'Zeigt der Stab einer Sonnenuhr parallel zur Erdachse zum Himmelspol, dreht sich sein Schatten gleichmäßig um 15 Grad pro Stunde; seine Neigung gegen den Boden ist gleich dem Breitengrad.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SONNE:UHRZEIT' },
      sections: [
        { id: 'OBS:SONNE:KIRCHENWAND', kind: 'observation', title: 'Sonnenuhren an alten Wänden', summary: 'An Kirchen, Rathäusern und alten Bauernhäusern findet man aufgemalte Sonnenuhren. Ihr Schattenstab ragt meist schräg aus der Wand und zeigt nach unten in Richtung Süden. Die Stundenlinien darunter sind nicht gleichmäßig verteilt.', depthPoints: 4 },
        { id: 'EXPL:SONNE:POLSTAB', kind: 'explanation', title: 'Der Polstab', summary: 'Die Sonne dreht sich scheinbar um die Erdachse. Stellt man den Schattenstab parallel zu dieser Achse, zeigt er auf den Himmelsnordpol, nahe beim Polarstern. Dann dreht sich der Schatten genau gleichmäßig um den Stab, 15 Grad pro Stunde, egal zu welcher Jahreszeit. Damit der Stab parallel zur Erdachse steht, muss er gegen den waagerechten Boden um genau so viele Grad geneigt sein, wie der Breitengrad beträgt.', depthPoints: 10 },
        { id: 'EXPL:SONNE:ZIFFERBLATT', kind: 'explanation', title: 'Gleichmäßige und ungleichmäßige Zifferblätter', summary: 'Steht das Zifferblatt senkrecht zum Polstab, sind die Stundenlinien gleichmäßig 15 Grad voneinander entfernt; das ist die Äquatorialsonnenuhr. Liegt das Zifferblatt dagegen waagerecht auf dem Boden oder hängt senkrecht an einer Wand, wird der gleichmäßig drehende Schatten schräg auf die Fläche projiziert. Die Stundenlinien rücken dann um Mittag eng zusammen und spreizen sich zum Morgen und Abend hin. Auf 50 Grad Breite liegen die Linien einer waagerechten Sonnenuhr etwa 11,6, 23,9, 37,5, 53,0 und 70,7 Grad von der Mittagslinie entfernt.', depthPoints: 10 },
        exercise('EXR:SONNE:NEIGUNG', 'Den Polstab einstellen', 'Wie steil muss der Polstab gegen den waagerechten Boden in Hamburg (etwa 53,5 Grad Breite) und in München (etwa 48,1 Grad Breite) geneigt sein? Und welchen Winkel schließen auf einer Äquatorialsonnenuhr die Linien für 9 Uhr und 12 Uhr ein?', 'Die Neigung ist gleich dem Breitengrad: in Hamburg etwa 53,5 Grad, in München etwa 48,1 Grad. Auf der Äquatorialsonnenuhr liegen zwischen 9 und 12 Uhr drei Stunden, also 3 · 15 = 45 Grad.'),
        practice('PRX:SONNE:PAPPSONNENUHR', 'Eine Äquatorialsonnenuhr aus Pappe', 'Zeichne auf festen Karton einen Kreis und teile ihn mit dem Geodreieck in 24 gleiche Abschnitte von je 15 Grad; beschrifte sie mit den Stunden, 12 Uhr unten. Stich einen Schaschlikspieß genau durch die Mitte, sodass er senkrecht zur Scheibe steht. Stelle die Uhr draußen so auf, dass der Spieß nach Norden zeigt und gegen den Boden um deinen Breitengrad geneigt ist – in Frankfurt etwa 50 Grad. Von März bis September fällt der Schatten auf die Oberseite der Scheibe.'),
        { id: 'QUIZ:SONNE:POLSTAB', kind: 'quiz', title: QUIZ_TITLE, summary: 'Eine Sonnenuhr soll in Kopenhagen auf etwa 55,7 Grad Breite stehen. Wie stark muss der Polstab gegen den Boden geneigt sein?||34,3 Grad||55,7 Grad*||45 Grad||90 Grad---Warum dreht sich der Schatten eines Polstabs gleichmäßig um 15 Grad pro Stunde?||Weil der Stab besonders lang ist||Weil der Stab parallel zur Erdachse steht, um die sich die Sonne scheinbar gleichmäßig dreht*||Weil das Zifferblatt waagerecht liegt||Weil die Sonne mittags am höchsten steht---Bei deinem Schattenprotokoll auf waagerechtem Papier waren die Winkel um Mittag kleiner als 15 Grad. Woran liegt das?||Die Uhr ging falsch||Der senkrechte Stift ist kein Polstab; auf der waagerechten Fläche wird der Schatten ungleichmäßig projiziert*||Die Erde dreht sich mittags langsamer||Das Papier war zu klein', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SONNE:UHRZEIT',
      title: 'Sonnenzeit und Uhrzeit',
      entryQuestion: 'Warum zeigt die Sonnenuhr im Garten im Sommer über eine Stunde weniger an als das Handy?',
      takeaway: 'Die Sonnenuhr zeigt die Ortszeit; die Uhr zeigt die Zeit der Zeitzone – Längengrad, Sommerzeit und die Zeitgleichung erklären den Unterschied.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SONNE:ERATOSTHENES' },
      sections: [
        { id: 'OBS:SONNE:ABWEICHUNG', kind: 'observation', title: 'Die Sonnenuhr geht nach', summary: 'Wer seine Pappsonnenuhr im Juli mit dem Handy vergleicht, wundert sich: Wenn das Handy 13 Uhr anzeigt, steht der Schatten noch deutlich vor 12. Und selbst im Winter, ohne Sommerzeit, stimmen die beiden selten genau überein.', depthPoints: 4 },
        { id: 'EXPL:SONNE:LAENGE', kind: 'explanation', title: 'Ein Mittag für jeden Ort', summary: 'Die Sonne steht für jeden Ort zu einem anderen Zeitpunkt am höchsten: Je weiter westlich, desto später. Bei 15 Grad pro Stunde sind das 4 Minuten pro Längengrad. Damit nicht jeder Ort eine eigene Zeit hat, gilt in Mitteleuropa die Mitteleuropäische Zeit, bezogen auf 15 Grad östlicher Länge. Orte westlich davon haben ihren Sonnenmittag später als 12 Uhr. In der Sommerzeit kommt noch eine Stunde dazu.', depthPoints: 10 },
        { id: 'EXPL:SONNE:ZEITGLEICHUNG', kind: 'explanation', title: 'Die Zeitgleichung', summary: 'Auch am selben Ort kommt der Sonnenmittag nicht jeden Tag zur selben Uhrzeit. Die Erde läuft auf einer leicht elliptischen Bahn unterschiedlich schnell um die Sonne, und ihre Achse ist geneigt. Dadurch schwankt der Sonnenmittag im Laufe des Jahres um bis zu etwa eine Viertelstunde nach vorn und hinten. Diese Korrektur heißt Zeitgleichung; manche Sonnenuhren tragen dafür eine Tabelle oder eine Achterschleife.', depthPoints: 8 },
        exercise('EXR:SONNE:FRANKFURT', 'Sonnenmittag in Frankfurt', 'Frankfurt liegt auf etwa 8,7 Grad östlicher Länge. Um wie viele Minuten liegt der Sonnenmittag später als 12 Uhr Mitteleuropäischer Zeit, wenn man die Zeitgleichung außer Acht lässt? Wann ist das in der Sommerzeit?', 'Unterschied zu 15 Grad: 15 − 8,7 = 6,3 Grad. Mal 4 Minuten ergibt etwa 25 Minuten. Der Sonnenmittag ist also gegen 12:25 Uhr MEZ, in der Sommerzeit gegen 13:25 Uhr. Je nach Jahreszeit verschiebt ihn die Zeitgleichung noch um bis zu etwa eine Viertelstunde.'),
        practice('PRX:SONNE:SONNENMITTAG', 'Den Sonnenmittag finden', 'Nutze deine Mittagslinie aus der ersten Einheit. Beobachte an einem sonnigen Tag, wann der Schatten des Stabs genau auf der Linie liegt, und notiere die Uhrzeit vom Handy. Vergleiche mit deiner Rechnung aus der Aufgabe. Wiederhole die Messung einige Wochen später: Hat sich die Uhrzeit verschoben?'),
        { id: 'QUIZ:SONNE:UHRZEIT', kind: 'quiz', title: QUIZ_TITLE, summary: 'Aachen liegt auf etwa 6,1 Grad östlicher Länge. Wie viele Minuten nach 12 Uhr MEZ ist dort ungefähr Sonnenmittag, ohne Zeitgleichung?||6 Minuten||36 Minuten*||9 Minuten||61 Minuten---Warum zeigt eine Sonnenuhr nicht die Uhrzeit der Zeitzone an?||Weil Sonnenuhren ungenau gebaut sind||Weil sie die Ortszeit nach dem Sonnenstand zeigt, die Zeitzone aber für einen festen Längengrad gilt*||Weil die Sonne nicht immer scheint||Weil die Erde sich nachts langsamer dreht---Görlitz liegt fast genau auf 15 Grad östlicher Länge. Was folgt für eine Sonnenuhr dort im Winter?||Sie geht eine Stunde vor||Sie stimmt bis auf die Zeitgleichung mit der Uhrzeit überein*||Sie geht 15 Minuten nach||Sie funktioniert dort nicht', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SONNE:ERATOSTHENES',
      title: 'Die Erde mit einem Schatten vermessen',
      entryQuestion: 'Kann man mit zwei Stäben und ihren Schatten herausfinden, wie groß die ganze Erde ist?',
      takeaway: 'Weil die Sonnenstrahlen parallel einfallen, entspricht der Unterschied der Schattenwinkel zweier Orte dem Winkel im Erdmittelpunkt; aus diesem Bruchteil des Kreises und der Entfernung folgt der Erdumfang.',
      sections: [
        { id: 'OBS:SONNE:SYENE', kind: 'observation', title: 'Ein Tag ohne Schatten', summary: 'In Syene, dem heutigen Assuan in Ägypten, steht die Sonne am Mittag des Sommeranfangs fast senkrecht über dem Kopf; senkrechte Stäbe werfen dann kaum einen Schatten. Zur selben Zeit wirft ein Stab im weiter nördlich gelegenen Alexandria einen deutlichen, kurzen Schatten.', depthPoints: 4 },
        { id: 'EX:SONNE:ERATOSTHENES-SCHEMA', kind: 'example', title: 'Schema: zwei Stäbe, ein Winkel', summary: 'Die Sonne ist so weit entfernt, dass ihre Strahlen praktisch parallel ankommen. Der Stab in Syene zeigt genau zur Sonne, der Stab in Alexandria steht schräg dazu, weil die Erde gekrümmt ist. Der Schattenwinkel in Alexandria ist deshalb genau so groß wie der Winkel zwischen den beiden Orten im Erdmittelpunkt.', image: { src: '/images/diagrams/eratosthenes.svg', alt: 'Schema: parallele Sonnenstrahlen, Stab in Syene ohne Schatten, Stab in Alexandria mit Schatten, gleicher Winkel im Erdmittelpunkt; Winkel vergrößert gezeichnet.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:SONNE:ERATOSTHENES', kind: 'explanation', title: 'Eratosthenes rechnet', summary: 'Der Gelehrte Eratosthenes maß im 3. Jahrhundert vor Christus in Alexandria einen Winkel von etwa einem Fünfzigstel des Vollkreises, rund 7,2 Grad. Die Entfernung nach Syene gab er mit 5.000 Stadien an. Der ganze Umfang musste also 50-mal so groß sein: 250.000 Stadien. Sein eigenes Werk ist verloren, wir kennen die Rechnung aus späteren Berichten, vor allem von Kleomedes. Wie lang ein Stadion genau war, ist umstritten – je nach Annahme lag er nur wenige Prozent oder bis zu etwa 15 Prozent daneben.', depthPoints: 10 },
        exercise('EXR:SONNE:ERDUMFANG', 'Den Erdumfang nachrechnen', 'Nimm an, Syene und Alexandria liegen 800 Kilometer auseinander und der Schattenwinkel in Alexandria beträgt 7,2 Grad. Welchen Erdumfang erhältst du? Welcher Umfang ergäbe sich bei nur 7 Grad?', 'Der Vollkreis hat 360 Grad, 360 : 7,2 = 50. Umfang = 50 · 800 km = 40.000 Kilometer. Bei 7 Grad: 360 : 7 ≈ 51,4, also etwa 41.100 Kilometer. Ein Messfehler von 0,2 Grad verändert das Ergebnis schon um rund 3 Prozent.'),
        practice('PRX:SONNE:ZWEI-ORTE', 'Das Eratosthenes-Experiment zu zweit', 'Verabrede dich mit jemandem, der einige hundert Kilometer weiter nördlich oder südlich wohnt. Messt am selben Tag zum jeweiligen Sonnenmittag die Länge des Schattens eines genau 1 Meter hohen, senkrechten Stabs. Aus Stablänge und Schattenlänge bestimmt jeder den Sonnenwinkel, zum Beispiel durch eine maßstäbliche Zeichnung. Den Nord-Süd-Abstand eurer Orte findet ihr auf einer Karte. Teilt 360 Grad durch den Unterschied der Winkel und multipliziert mit dem Abstand.'),
        { id: 'BR:SONNE:FRUEHE-SONNENUHREN', kind: 'branch', title: 'Die ältesten Sonnenuhren', summary: 'Schattenuhren sind sehr alt. Im Tal der Könige in Ägypten fanden Forschende der Universität Basel einen bemalten Kalksteinsplitter aus dem 13. Jahrhundert vor Christus: ein Halbkreis, in zwölf Abschnitte von je etwa 15 Grad geteilt, mit einem Loch für einen Schattenstab – eine der ältesten bekannten Sonnenuhren. Der griechische Geschichtsschreiber Herodot berichtet, die Griechen hätten den Schattenstab, den Gnomon, und die Einteilung des Tages in zwölf Teile von den Babyloniern übernommen.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:SONNE:ERATOSTHENES', kind: 'quiz', title: QUIZ_TITLE, summary: 'Zwei Orte liegen 500 Kilometer auseinander, ihre Schattenwinkel unterscheiden sich um 4,5 Grad. Welcher Erdumfang folgt daraus?||36.000 Kilometer||40.000 Kilometer*||45.000 Kilometer||22.500 Kilometer---Warum darf Eratosthenes den Schattenwinkel mit dem Winkel im Erdmittelpunkt gleichsetzen?||Weil die Erde eine Scheibe ist||Weil die Sonnenstrahlen wegen der großen Entfernung der Sonne praktisch parallel einfallen*||Weil Syene genau am Äquator liegt||Weil beide Stäbe gleich lang sind---Was würde die Messung zeigen, wenn die Erde flach wäre und die Sonnenstrahlen parallel einfielen?||Größere Schatten im Norden||An beiden Orten denselben Schattenwinkel*||Keinen Schatten an beiden Orten||Doppelt so lange Schatten in Syene', depthPoints: 12 },
      ],
    },
  ],
};

// ─── Modul 5: Vermessen in Asien und im Orient ───────────────────────────────

export const asiaOrientSurveyingLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-ASIEN-ORIENT-0001',
  title: 'Wie haben Babylon, Indien, Persien und China vermessen?',
  subtitle: 'Seile und Raster, unterirdische Wasserstollen, eine Insel ohne Winkelmessung, riesige Schattenstäbe und ein Erdradius vom Berggipfel: Vermessung und Planung jenseits von Rom. Teil 5 der Reihe Vermessung.',
  status: 'prototype',
  sourceModuleId: 'TEC-L2-000002',
  kxfModuleId: 'LRN:SSF:TEC-L2-000002',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:HIS-ARCH', 'KD:ASTRO-BASIC'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L2-000002', 'CON:L1:qanat', 'CON:L1:doppelte-differenz', 'CON:L1:erdradius-kimmtiefe'],
    kueperCom: [HISTORY_DOC],
    overtimeArchive: [],
    ssf: ['Schema: Liu Huis Inselmessung', 'Schema: Erdradius aus der Kimmtiefe', 'Aufgaben mit Lösung', 'Praxis: Knotenschnur 5-12-13, Schnurwaage, Tischmodell der Inselmessung, Horizont beobachten', 'Quiz je Einheit'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:ASIEN:RASTER',
      title: 'Seile, Raster und Idealstädte',
      entryQuestion: 'Wie teilte man vor 4000 Jahren ein Feld gerecht auf, und wie plante man eine ganze Stadt auf dem Reißbrett?',
      takeaway: 'Seil und Pflock genügten, um rechte Winkel und gerechte Flächen abzustecken; Mesopotamien, Indien und China nutzten dafür ganzzahlige Seitenverhältnisse und planten Städte als Raster.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ASIEN:QANAT' },
      sections: [
        { id: 'OBS:ASIEN:FELD', kind: 'observation', title: 'Ein Feld wird verkauft', summary: 'Wird ein Teil eines Feldes verkauft, muss jemand festlegen, wo genau die neue Grenze verläuft und wie groß die Teile sind. Das ist heute Aufgabe des Katasteramts. Schon vor fast 4000 Jahren gab es dafür Pläne auf Tontafeln.', depthPoints: 4 },
        { id: 'EXPL:ASIEN:BABYLON', kind: 'explanation', title: 'Feldpläne aus Babylonien', summary: 'Eine Tontafel aus Sippar im heutigen Irak, etwa 1900 bis 1600 vor Christus beschrieben, zeigt die Teilung eines Feldes nach einem Teilverkauf. Die rechten Winkel der Teilflächen beruhen auf Seitenverhältnissen wie 3 zu 4 zu 5. Eine Statue des Herrschers Gudea aus derselben Region, rund 2100 vor Christus, hält sogar einen Bauplan mit Maßstab auf dem Schoß.', depthPoints: 8 },
        { id: 'EXPL:ASIEN:SULBA', kind: 'explanation', title: 'Altäre aus Seil und Pflock', summary: 'Die indischen Śulbasūtras sind Anleitungen, um Feueraltäre exakt abzustecken – nur mit Seil (śulba) und Pflöcken. Sie nennen mehrere ganzzahlige Seitenverhältnisse für rechte Winkel, etwa 3-4-5, 5-12-13 und 8-15-17, und beschreiben den Zusammenhang zwischen Diagonale und Seiten eines Rechtecks. Die ältesten dieser Texte werden meist auf etwa 800 bis 500 vor Christus datiert; die Datierung ist umstritten.', depthPoints: 8 },
        { id: 'EXPL:ASIEN:STADTRASTER', kind: 'explanation', title: 'Städte im Raster', summary: 'Schon die Städte der Induskultur wie Mohenjo-daro hatten um 2500 vor Christus Straßen, die überwiegend einem rasterähnlichen Plan folgten, dazu Abwasserkanäle und Ziegel im Verhältnis 1 zu 2 zu 4. Der chinesische Text Kaogongji beschreibt eine ideale quadratische Hauptstadt mit Straßenraster. Gebaut wurde ein solches Raster etwa in Chang’an, gegründet 582, das wiederum Vorbild für Nara und Kyōto in Japan wurde.', depthPoints: 8 },
        exercise('EXR:ASIEN:TRIPEL', 'Ganzzahlige rechte Winkel prüfen', 'Prüfe, ob die Seitenverhältnisse 5-12-13 und 8-15-17 aus den Śulbasūtras wirklich rechte Winkel ergeben. Wie lang muss ein Seil sein, das man für 5-12-13 mit 1 Meter pro Einheit zum Dreieck legt?', '5 · 5 + 12 · 12 = 25 + 144 = 169 = 13 · 13. Und 8 · 8 + 15 · 15 = 64 + 225 = 289 = 17 · 17. Beide ergeben also einen rechten Winkel. Das Seil für 5-12-13 ist 5 + 12 + 13 = 30 Meter lang.'),
        practice('PRX:ASIEN:SEIL', 'Ein Śulba-Seil', 'Nimm eine Schnur und markiere mit Klebeband 30 gleiche Abschnitte, zum Beispiel je 10 Zentimeter. Lege daraus auf dem Boden ein Dreieck mit den Seiten 5, 12 und 13 Abschnitten, indem du drei Markierungen mit Nadeln oder Heringen fixierst. Prüfe den Winkel zwischen den Seiten 5 und 12 mit einem Geodreieck. Wie genau gelingt es dir?'),
        { id: 'QUIZ:ASIEN:RASTER', kind: 'quiz', title: QUIZ_TITLE, summary: 'Ein Seil wird zum Dreieck mit 8, 15 und 17 Abschnitten gelegt. Wo entsteht der rechte Winkel?||Zwischen den Seiten 15 und 17||Zwischen den Seiten 8 und 15*||Zwischen den Seiten 8 und 17||Es entsteht kein rechter Winkel---Warum eignen sich ganzzahlige Seitenverhältnisse wie 3-4-5 für die Feldmessung?||Weil sie besonders kurz sind||Weil man rechte Winkel allein mit einem gleichmäßig unterteilten Seil abstecken kann*||Weil ganze Zahlen genauer sind als Brüche||Weil sie die Fläche verdoppeln---Was unterscheidet die Idealstadt des Kaogongji von einer real gebauten Stadt wie Chang’an?||Nichts, beide sind identisch||Das Kaogongji beschreibt ein Ideal; reale Städte übernahmen das Raster, wichen aber in Einzelheiten ab*||Chang’an hatte kein Straßenraster||Das Kaogongji ist ein Bauplan für Chang’an', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ASIEN:QANAT',
      title: 'Wasser aus dem Berg: die Qanate',
      entryQuestion: 'Wie bringt man Grundwasser kilometerweit durch einen Tunnel in die Wüste, ohne dass es stehen bleibt oder den Stollen ausspült?',
      takeaway: 'Ein Qanat ist ein fast waagerechter Stollen mit gleichmäßigem kleinem Gefälle; Lote übertragen die Richtung von der Oberfläche nach unten, und eine waagerechte Bezugslinie hält das Gefälle.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ASIEN:INSEL' },
      sections: [
        { id: 'OBS:ASIEN:SCHAECHTE', kind: 'observation', title: 'Eine Perlenkette in der Wüste', summary: 'Auf Luftbildern aus dem Iran sieht man lange Reihen kleiner Krater, wie Perlen auf einer Schnur, die von den Bergen in die Ebene führen. Jeder Krater ist der Erdwall um einen senkrechten Schacht. Unter ihnen verläuft ein Tunnel, in dem Wasser fließt.', depthPoints: 4 },
        { id: 'EXPL:ASIEN:QANAT', kind: 'explanation', title: 'Aufbau eines Qanats', summary: 'Am Fuß eines Berges gräbt man zuerst einen Probeschacht bis zum Grundwasser, den Mutterbrunnen. Von der Ebene aus treibt man einen Stollen mit sehr kleinem Gefälle auf ihn zu, im Iran im Mittel etwa ein halbes Prozent. Senkrechte Schächte in Abständen dienen dem Aushub, der Belüftung und der Orientierung. Persische Qanate sind seit dem 5. Jahrhundert vor Christus sicher belegt; elf iranische Qanate sind heute UNESCO-Welterbe.', depthPoints: 10 },
        { id: 'EXPL:ASIEN:QANAT-MESSEN', kind: 'explanation', title: 'Messen unter Tage', summary: 'Beschreibungen aus dem 20. Jahrhundert zeigen, wie Qanat-Bauer arbeiteten: Zwei Lote im Schacht übertragen die Richtung der Linie an der Oberfläche in den Stollen. Eine gespannte, nasse Schnur zeigt die Waagerechte, denn Tropfen laufen zum tieferen Ende. Eine Lampe hilft, die Richtung im Dunkeln zu halten. Der persische Gelehrte al-Karajī schrieb um 1015 bis 1020 das älteste erhaltene Fachbuch dazu, mit eigenen Nivelliergeräten. Dass antike Baumeister ebenso arbeiteten, ist wahrscheinlich, aber nicht direkt belegt.', depthPoints: 10 },
        exercise('EXR:ASIEN:QANAT', 'Einen Qanat planen', 'Ein Qanat soll 3 Kilometer lang werden und ein Gefälle von 0,5 Prozent haben. Wie viele Meter tiefer liegt der Austritt als der Stollenanfang am Mutterbrunnen? Wie viele Schächte braucht man, wenn alle 30 Meter einer gegraben wird?', 'Gefälle: 3.000 Meter mal 0,5 : 100 = 15 Meter. Schächte: 3.000 : 30 = 100 Abstände; je nach Zählung am Anfang und Ende also rund 100 Schächte. Bei geringerem Gefälle fließt das Wasser langsamer und spült den Stollen weniger aus.'),
        practice('PRX:ASIEN:SCHNURWAAGE', 'Die nasse Schnur', 'Spanne draußen eine Schnur von einigen Metern Länge zwischen zwei Stöcken und mache sie mit einem nassen Schwamm feucht. Beobachte, in welche Richtung die Tropfen laufen und wo sie sich sammeln. Verschiebe ein Ende so lange nach oben oder unten, bis die Tropfen nicht mehr wandern. Prüfe das Ergebnis mit einer Wasserwaage oder deiner Schlauchwaage.'),
        { id: 'QUIZ:ASIEN:QANAT', kind: 'quiz', title: QUIZ_TITLE, summary: 'Ein Qanat ist 2 Kilometer lang und fällt um 8 Meter. Wie groß ist das Gefälle?||4 Prozent||0,4 Prozent*||0,04 Prozent||8 Prozent---Wozu hängt man in einem Qanat-Schacht zwei Lote nebeneinander auf?||Um die Tiefe zu messen||Um die Richtung der Linie an der Oberfläche in den Stollen zu übertragen*||Um Wasser zu schöpfen||Um den Schacht zu stützen---Warum darf das Gefälle eines Qanats weder zu groß noch null sein?||Weil sonst die Schächte einstürzen||Ohne Gefälle steht das Wasser, bei zu großem Gefälle spült es den Stollen aus*||Weil das Wasser sonst verdunstet||Weil der Mutterbrunnen sonst überläuft', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ASIEN:INSEL',
      title: 'Die Insel im Meer',
      entryQuestion: 'Wie hoch und wie weit entfernt ist eine Insel, wenn man nur zwei Stangen und das eigene Ufer hat?',
      takeaway: 'Liu Huis „doppelte Differenz“ bestimmt Höhe und Entfernung eines unerreichbaren Punkts allein aus zwei gleich hohen Stangen, ihrem Abstand und den beiden Rücktrittsweiten – ganz ohne Winkelmessung.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ASIEN:GNOMON' },
      sections: [
        { id: 'OBS:ASIEN:INSEL', kind: 'observation', title: 'Ein Gipfel hinter dem Wasser', summary: 'Vom Strand aus sieht man in der Ferne eine Insel mit einem Berg. Wie weit sie weg ist und wie hoch der Berg ist, lässt sich nicht abschreiten. Ein Winkelmesser ist nicht zur Hand – nur zwei gerade Stangen.', depthPoints: 4 },
        { id: 'EX:ASIEN:INSEL-SCHEMA', kind: 'example', title: 'Schema: zwei Stangen, zwei Sichtlinien', summary: 'Der chinesische Mathematiker Liu Hui beschrieb 263 nach Christus diese Aufgabe. Zwei gleich hohe Stangen stehen in bekanntem Abstand hintereinander auf einer Linie zur Insel. Hinter jeder Stange tritt man so weit zurück, bis man – mit dem Auge am Boden – die Stangenspitze genau vor dem Inselgipfel sieht. Hinter der hinteren Stange muss man etwas weiter zurück als hinter der vorderen. Dieser kleine Unterschied verrät alles.', image: { src: '/images/diagrams/liu-hui-insel.svg', alt: 'Schema: Insel links, zwei gleich hohe Stangen S1 und S2 im Abstand d, Sichtlinien vom Gipfel über die Stangenspitzen zum Boden, Rücktrittsweiten a1 und a2.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:ASIEN:DOPPELTE-DIFFERENZ', kind: 'explanation', title: 'Warum der Unterschied genügt', summary: 'Jede Sichtlinie bildet mit Stange und Boden ein kleines Dreieck, das dem großen Dreieck aus Gipfel, Inselhöhe und Boden ähnlich ist. Vergleicht man beide Stangen, fällt die unbekannte Entfernung heraus. Es gilt: Höhe = Stangenhöhe mal Abstand der Stangen geteilt durch die Differenz der Rücktrittsweiten, plus Stangenhöhe. Entfernung der Insel von der vorderen Stange = vordere Rücktrittsweite mal Abstand geteilt durch die Differenz. Liu Huis Handbuch gehörte später zu den Prüfungstexten chinesischer Beamter.', depthPoints: 10 },
        exercise('EXR:ASIEN:LIU-HUI', 'Liu Huis Originalaufgabe', 'Die Stangen sind 5 bu hoch und stehen 1000 bu auseinander. Hinter der vorderen Stange tritt man 123 bu zurück, hinter der hinteren 127 bu. Wie hoch ist die Insel, und wie weit ist sie von der vorderen Stange entfernt? (Ein bu sind etwa 1,5 bis 2 Meter.)', 'Differenz der Rücktritte: 127 − 123 = 4 bu. Höhe: 5 · 1000 : 4 + 5 = 1250 + 5 = 1255 bu. Entfernung: 123 · 1000 : 4 = 30.750 bu. Das sind genau die Zahlen aus Liu Huis Lösung – in heutigen Einheiten grob 2 Kilometer Höhe und 50 Kilometer Entfernung, je nach Länge des bu.'),
        practice('PRX:ASIEN:TISCHMODELL', 'Die Inselmessung auf dem Tisch', 'Stelle am einen Ende eines langen Tisches eine Tasse als Insel auf. Stelle zwei gleich lange Stifte senkrecht in Knete im Abstand von 20 Zentimetern auf eine Linie zur Tasse. Lege das Auge flach an die Tischplatte und rücke hinter jedem Stift so weit zurück, bis Stiftspitze und Tassenrand übereinander liegen; markiere jeweils die Stelle. Rechne mit Liu Huis Formel die Höhe der Tasse und ihre Entfernung aus und miss zur Kontrolle nach.'),
        { id: 'QUIZ:ASIEN:INSEL', kind: 'quiz', title: QUIZ_TITLE, summary: 'Stangen 2 Meter hoch, 50 Meter Abstand, Rücktritte 4 Meter und 5 Meter. Wie hoch ist der Turm dahinter?||52 Meter||102 Meter*||100 Meter||25 Meter---Warum braucht Liu Huis Verfahren keinen Winkelmesser?||Weil alle Winkel 45 Grad sind||Weil ähnliche Dreiecke die Winkel ersetzen und nur Strecken gemessen werden*||Weil die Insel immer gleich weit weg ist||Weil man die Höhe schätzt---Was passiert mit dem Ergebnis, wenn die Differenz der Rücktrittsweiten falsch gemessen wird?||Nichts, sie spielt keine Rolle||Weil man durch eine kleine Zahl teilt, wirken sich schon kleine Messfehler stark aus*||Nur die Höhe ändert sich, nicht die Entfernung||Das Ergebnis wird immer zu klein', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ASIEN:GNOMON',
      title: 'Riesige Schattenstäbe und ein Grad Erde',
      entryQuestion: 'Warum baute man in China einen über zwölf Meter hohen Schattenstab, und wie lang ist ein Grad auf der Erde?',
      takeaway: 'Längere Schattenstäbe machen Messungen genauer; Meridianmessungen in China und im Abbasidenreich bestimmten die Länge eines Breitengrads, indem man Strecken abmaß und Sonnen- oder Polhöhe verglich.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ASIEN:ERDRADIUS' },
      sections: [
        { id: 'OBS:ASIEN:TURM', kind: 'observation', title: 'Ein Turm als Sonnenuhr', summary: 'In Dengfeng in China steht ein Bauwerk aus dem Jahr 1276, das wie ein Turm mit einer langen Steinbahn davor aussieht. Der Turm selbst ist ein riesiger Schattenstab, die Steinbahn sein Maßstab. Er gehört heute zum UNESCO-Welterbe.', depthPoints: 4 },
        { id: 'EXPL:ASIEN:ZHOUBI', kind: 'explanation', title: 'Eine falsche Regel wird widerlegt', summary: 'Ein alter chinesischer Text, das Zhoubi, nahm an, der Mittagsschatten eines 8 chi hohen Stabs ändere sich um 1 cun je 1000 li Nord-Süd-Abstand. Diese Regel beruhte auf der Vorstellung einer flachen Erde. In den Jahren 724 und 725 ließ der Mönch Yi Xing an vielen Orten zwischen dem heutigen Vietnam und der Mongolei Schatten und Polhöhe messen. Das Ergebnis widerlegte die alte Regel.', depthPoints: 8 },
        { id: 'EXPL:ASIEN:GAOCHENG', kind: 'explanation', title: 'Guo Shoujings Riesengnomon', summary: 'Ein Schatten ist am Rand immer etwas unscharf. Je länger der Stab, desto länger der Schatten und desto kleiner wird der relative Ablesefehler. Guo Shoujing ließ deshalb 1276 in Gaocheng einen Querbalken in über 12 Metern Höhe als Schattenwerfer anbringen; davor liegt eine rund 31 Meter lange Steinbahn mit Wasserrinnen, die ihre Waagerechte kontrollieren. Eine kleine Lochblende machte den unscharfen Balkenschatten scharf. Die Messungen flossen in einen Kalender von 1281 ein.', depthPoints: 10 },
        { id: 'EXPL:ASIEN:MAMUN', kind: 'explanation', title: 'Ein Grad abschreiten', summary: 'Um 830 ließ der Kalif al-Ma’mūn in der Ebene von Sindschar im heutigen Irak zwei Gruppen von einem Punkt aus nach Norden und nach Süden gehen, bis sich die Höhe des Himmelspols um ein Grad verändert hatte. Die abgeschrittene Strecke ergab die Länge eines Breitengrads: überliefert sind rund 56⅔ arabische Meilen. Wie lang diese Meile war, ist nicht sicher bekannt.', depthPoints: 8 },
        exercise('EXR:ASIEN:GRAD', 'Vom Grad zum Erdumfang', 'Al-Ma’mūns Vermesser fanden 56⅔ arabische Meilen pro Grad. Welcher Erdumfang in Meilen folgt daraus? Und welcher Umfang ergibt sich, wenn man – wie heute – rund 111 Kilometer pro Grad ansetzt?', '56⅔ · 360 = 20.400 arabische Meilen. Mit 111 Kilometern pro Grad: 111 · 360 ≈ 40.000 Kilometer. Wie gut die arabische Messung war, hängt also allein davon ab, wie lang eine arabische Meile war – und genau das ist umstritten.'),
        { id: 'BR:ASIEN:INO', kind: 'branch', title: 'Japan zu Fuß vermessen', summary: 'Zwischen 1800 und 1816 vermaß der Japaner Inō Tadataka in zehn Reisen die Küsten und Wege Japans – insgesamt rund 35.000 Kilometer – mit Messschnur, Kompassen und Sternbeobachtungen. Seine Gradmessung ergab etwa 111 Kilometer pro Breitengrad. Seine Schüler vollendeten 1821 die erste genaue Landeskarte Japans.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:ASIEN:GNOMON', kind: 'quiz', title: QUIZ_TITLE, summary: 'Ein 2 Meter hoher Stab wirft 3 Meter Schatten. Wie lang ist zur selben Zeit der Schatten eines 12 Meter hohen Gnomons?||15 Meter||18 Meter*||24 Meter||6 Meter---Warum baute Guo Shoujing einen so hohen Schattenwerfer?||Damit man ihn von weitem sieht||Weil ein längerer Schatten denselben Ablesefehler relativ kleiner macht und so genauer misst*||Weil die Sonne in China höher steht||Damit er auch nachts funktioniert---Al-Ma’mūns Leute gingen nach Norden, bis sich die Polhöhe um 1 Grad änderte. Was setzt diese Methode stillschweigend voraus?||Dass die Erde flach ist||Dass die Erde gekrümmt ist, sodass sich die Polhöhe mit der Breite ändert*||Dass der Polarstern sich bewegt||Dass alle Meilen gleich lang sind wie Kilometer', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ASIEN:ERDRADIUS',
      title: 'Den Erdradius vom Berg aus messen',
      entryQuestion: 'Kann man die Größe der Erde von einem einzigen Berggipfel aus bestimmen?',
      takeaway: 'Al-Bīrūnī bestimmte aus Berghöhe und Kimmtiefe den Erdradius; die Methode ist geometrisch elegant, reagiert aber sehr empfindlich auf kleinste Winkelfehler und auf Lichtbrechung.',
      sections: [
        { id: 'OBS:ASIEN:HORIZONT', kind: 'observation', title: 'Der Horizont sinkt', summary: 'Am Strand liegt der Horizont scheinbar genau auf Augenhöhe. Steigt man auf einen Turm oder Berg, liegt er ein kleines Stück unter der Waagerechten, und man sieht weiter. Der Grund ist die Krümmung der Erde.', depthPoints: 4 },
        { id: 'EX:ASIEN:BIRUNI-SCHEMA', kind: 'example', title: 'Schema: Berg, Horizont, Erdmittelpunkt', summary: 'Der Gelehrte al-Bīrūnī maß in den 1020er Jahren bei Nandana im heutigen Pakistan zuerst mit einem Astrolab von zwei Standpunkten aus die Höhe eines Berges. Dann maß er vom Gipfel, wie tief der Horizont unter der Waagerechten liegt – die Kimmtiefe. Die Sichtlinie zum Horizont berührt die Erde, sie steht dort rechtwinklig auf dem Erdradius. So entsteht ein rechtwinkliges Dreieck aus Erdradius, Erdradius plus Berghöhe und Sichtlinie.', image: { src: '/images/diagrams/biruni-erdradius.svg', alt: 'Schema: Berg der Höhe h auf der Erde, waagerechte Linie am Gipfel, Sichtlinie zum Horizont unter dem Winkel theta, Radien zum Gipfel und zum Berührpunkt; nicht maßstäblich.', credit: CREDIT }, depthPoints: 10 },
        { id: 'EXPL:ASIEN:BIRUNI', kind: 'explanation', title: 'Die Rechnung', summary: 'Im Dreieck gilt: Erdradius geteilt durch Erdradius plus Berghöhe ist gleich dem Kosinus der Kimmtiefe. Umgestellt ergibt sich R = h · cos θ : (1 − cos θ). Al-Bīrūnī erhielt mit einer Berghöhe von gut 300 Metern und einer Kimmtiefe von 34 Bogenminuten einen Erdradius, der je nach Umrechnung seiner Ellen bei rund 6.300 Kilometern liegt. Dass das dem heutigen Wert so nahe kommt, ist zum Teil Glück: Die Lichtbrechung in der Luft hebt den Horizont an, und schon eine Bogenminute Messfehler verändert das Ergebnis um rund sechs Prozent.', depthPoints: 10 },
        exercise('EXR:ASIEN:BIRUNI', 'Wie empfindlich ist die Methode?', 'Rechne mit einem Taschenrechner: Berghöhe h = 321,5 Meter, Kimmtiefe θ = 34 Bogenminuten (34 : 60 Grad). Welcher Erdradius ergibt sich? Und welcher bei 33 und bei 35 Bogenminuten?', 'Bei 34 Bogenminuten ist cos θ ≈ 0,999951, also 1 − cos θ ≈ 0,0000489. R ≈ 321,5 · 0,999951 : 0,0000489 ≈ 6.570 Kilometer. Bei 33 Bogenminuten ergeben sich rund 6.980 Kilometer, bei 35 rund 6.200 Kilometer. Eine einzige Bogenminute – ein Sechzigstel Grad – verschiebt das Ergebnis also um etwa 6 Prozent.'),
        practice('PRX:ASIEN:HORIZONT', 'Wie weit sieht man?', 'Für die Sichtweite bis zum Horizont gilt näherungsweise: Sichtweite in Kilometern ≈ 3,57 mal Wurzel aus der Augenhöhe in Metern. Rechne aus, wie weit du am Strand mit 1,7 Metern Augenhöhe, auf einem 30 Meter hohen Turm und auf einem 300 Meter hohen Berg sehen kannst. Überprüfe es beim nächsten Ausflug an einem Aussichtspunkt mit Blick über Wasser oder eine weite Ebene.'),
        { id: 'QUIZ:ASIEN:ERDRADIUS', kind: 'quiz', title: QUIZ_TITLE, summary: 'Mit der Näherung Sichtweite ≈ 3,57 · Wurzel aus der Augenhöhe: Wie weit sieht man ungefähr von einem 100 Meter hohen Turm?||10 Kilometer||36 Kilometer*||357 Kilometer||100 Kilometer---Warum steht die Sichtlinie zum Horizont rechtwinklig auf dem Erdradius?||Weil der Berg senkrecht steht||Weil sie die Erdkugel am Horizont nur berührt, und eine Berührende steht immer rechtwinklig zum Radius*||Weil das Licht gebrochen wird||Weil der Horizont waagerecht ist---Die Luft biegt Lichtstrahlen leicht zur Erde hin. Wie wirkt sich das auf al-Bīrūnīs Messung aus?||Gar nicht||Der Horizont erscheint etwas höher, die gemessene Kimmtiefe wird kleiner und der berechnete Erdradius zu groß*||Der Berg erscheint niedriger||Der Erdradius wird zu klein', depthPoints: 12 },
      ],
    },
  ],
};

export const surveyingLearningPaths: LearningPath[] = [
  gromaLearningPath,
  heightMeasurementLearningPath,
  triangulationLearningPath,
  sundialLearningPath,
  asiaOrientSurveyingLearningPath,
];
