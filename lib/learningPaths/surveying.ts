import type { LearningPath, LearningPathSection } from '../learningPaths';

// Surveying series (Vermessung ohne Laser und GPS) – three governed paths.
// Canonical identities from kueper-knowledge-graph (2026-10-19):
//   TEC-L1-000001  Groma            PATH:SSF:TEC-GROMA-0001          CON:L1:groma, CON:L1:zenturiation
//   TEC-L1-000002  Höhenmessung     PATH:SSF:TEC-HOEHEN-0001         CON:L1:chorobates, CON:L1:nivellement
//   TEC-L2-000001  Triangulation    PATH:SSF:TEC-TRIANGULATION-0001  CON:L1:triangulation
// SSF owns the didactic design. Non-interactive: observation, explanation, schema,
// exercise with collapsible solution, practical task (Praxis), quiz.

const CREDIT = 'Schema: Solar Science Foundation';
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
    kueperCom: [],
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
        { id: 'EXPL:GROMA:KNOTENSCHNUR', kind: 'explanation', title: 'Die Probe mit 3, 4 und 5', summary: 'Ob ein Winkel wirklich rechtwinklig ist, lässt sich ohne Instrument prüfen. Man misst auf dem einen Schenkel 3 Längeneinheiten ab, auf dem anderen 4. Ist der Winkel genau rechtwinklig, beträgt der Abstand zwischen den beiden Endpunkten genau 5 Einheiten, denn 3 mal 3 plus 4 mal 4 ergibt 25, und das ist 5 mal 5. Ein Seil mit 12 gleichen Abschnitten, zum Dreieck gelegt, reicht dafür aus.', depthPoints: 8 },
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
    kueperCom: [],
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
    kueperCom: [],
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

export const surveyingLearningPaths: LearningPath[] = [
  gromaLearningPath,
  heightMeasurementLearningPath,
  triangulationLearningPath,
];
