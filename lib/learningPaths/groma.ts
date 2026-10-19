import type { LearningPath } from '../learningPaths';

// Canonical identities from kueper-knowledge-graph (2026-10-19):
// module TEC-L1-000001 (learning/ssf-tec-groma-vermessung.yaml),
// concepts CON:L1:groma, CON:L1:zenturiation, CON:L1:chorobates, CON:L1:nivellement,
// CON:L1:triangulation, path PATH:SSF:TEC-GROMA-0001.
// SSF owns the didactic design. Non-interactive: observation, explanation, schema, quiz.

const GROMA_DIAGRAM = {
  src: '/images/diagrams/groma-aufbau.svg',
  alt: 'Schema einer Groma: senkrechter Stab, seitlicher Ausleger, drehbares Kreuz mit vier Loten an den Armenden und ein Zentrallot über dem Messpunkt am Boden.',
  credit: 'Schema: Solar Science Foundation',
};

export const gromaLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-GROMA-0001',
  title: 'Wie vermisst man die Welt ohne Laser und GPS?',
  subtitle: 'Von der römischen Groma über Wasserwaage und Nivellement bis zur Triangulation: wie Lot, Wasserspiegel und Dreiecke Geraden, Höhen und Entfernungen messbar machen.',
  status: 'prototype',
  sourceModuleId: 'TEC-L1-000001',
  kxfModuleId: 'LRN:SSF:TEC-L1-000001',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L1-000001', 'CON:L1:groma', 'CON:L1:zenturiation', 'CON:L1:chorobates', 'CON:L1:nivellement', 'CON:L1:triangulation'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Schema: Aufbau der Groma', 'Schema: Nivellement', 'Schema: Entfernung über eine Basislinie', 'Peilprinzip als Schrittfolge', 'Quiz je Einheit'],
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
        { id: 'QUIZ:GROMA:GERADE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Du stehst hinter zwei Fluchtstäben und siehst beide nebeneinander statt hintereinander. Was folgt daraus?||Die Stäbe stehen auf einer Linie mit dir||Du stehst nicht auf der Verlängerung der Linie durch die beiden Stäbe*||Die Stäbe sind zu kurz||Die Linie ist bereits rechtwinklig---Warum hängt eine Lotschnur senkrecht?||Weil die Schnur steif ist||Weil die Schwerkraft das Gewicht senkrecht nach unten zieht*||Weil der Wind sie ausrichtet||Weil sie vorher gerade gezogen wurde---Ein Peilstab steckt leicht schräg im Boden. Warum ist eine Lotschnur als Peilmarke besser?||Sie ist leichter zu sehen||Sie stellt sich unabhängig vom Boden von selbst senkrecht ein*||Sie ist länger als jeder Stab||Sie misst zusätzlich die Entfernung', depthPoints: 12 },
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
        { id: 'EX:GROMA:SCHEMA', kind: 'example', title: 'Schema: die Teile der Groma', summary: 'Der Stab (ferramentum) wird senkrecht in den Boden gesteckt. Ein waagerechter Ausleger trägt das drehbare Kreuz (stella) mit vier gleich langen Armen im rechten Winkel. An jedem Armende hängt ein Lot. Unter der Kreuzmitte hängt ein weiteres Lot, das Zentrallot.', image: GROMA_DIAGRAM, depthPoints: 8 },
        { id: 'EXPL:GROMA:VERSATZ', kind: 'explanation', title: 'Warum der Stab seitlich sitzt', summary: 'Der Stab steht nicht unter der Kreuzmitte, sondern ist durch den Ausleger seitlich versetzt. Sonst stünde er genau in der Sichtlinie, über die gepeilt wird. Das Zentrallot übernimmt die Aufgabe, die Kreuzmitte über den Ausgangspunkt am Boden zu bringen.', depthPoints: 8 },
        { id: 'QUIZ:GROMA:AUFBAU', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Der Vermesser will von einem bestimmten Grenzstein aus messen. Welches Teil richtet er darüber aus?||Den Stab||Das Zentrallot unter der Kreuzmitte*||Ein beliebiges Armlot||Den Ausleger---Warum ist der Stab der Groma seitlich versetzt?||Damit sie leichter zu tragen ist||Damit er die Sichtlinien über die Kreuzmitte nicht verdeckt*||Damit das Kreuz schneller dreht||Damit der Wind weniger angreift---Ein Nachbau hat ein Kreuz, dessen Arme nicht genau im rechten Winkel stehen. Was ist die Folge?||Die Geraden werden kürzer||Die zweite abgesteckte Linie steht nicht rechtwinklig zur ersten*||Die Lote hängen schief||Nichts, die Lote gleichen das aus', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:WINKEL',
      title: 'Peilen und rechte Winkel',
      entryQuestion: 'Wie wird aus einem Kreuz mit Schnüren ein rechter Winkel auf dem Acker?',
      takeaway: 'Wer über zwei gegenüberliegende Lote peilt, steckt eine Gerade ab; das andere Lotpaar liefert die rechtwinklige Linie – so entstehen die Hauptachsen cardo und decumanus.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:ZENTURIATION' },
      sections: [
        { id: 'OBS:GROMA:ZWEI-SCHNUERE', kind: 'observation', title: 'Zwei Schnüre werden zu einer', summary: 'Schaut man an zwei hintereinander hängenden Schnüren vorbei, gibt es genau eine Blickrichtung, in der die hintere hinter der vorderen verschwindet. Diese Blickrichtung ist eine Gerade – und sie lässt sich mit Stäben ins Gelände übertragen.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ABLAUF', kind: 'explanation', title: 'Der Messablauf in vier Schritten', summary: 'Erstens: Stab einstecken und das Zentrallot über den Ausgangspunkt bringen. Zweitens: Das Kreuz drehen, bis ein Arm in die gewünschte Richtung zeigt. Drittens: An zwei gegenüberliegenden Loten vorbeipeilen, bis sie sich decken; ein Helfer setzt in dieser Linie Fluchtstäbe. Viertens: Über das andere Lotpaar genauso peilen – diese Linie steht rechtwinklig zur ersten, weil die Kreuzarme fest im 90-Grad-Winkel stehen.', depthPoints: 10 },
        { id: 'EXPL:GROMA:ACHSEN', kind: 'explanation', title: 'Cardo und decumanus', summary: 'Die beiden rechtwinkligen Hauptlinien hießen decumanus und cardo. Sie bildeten das Grundgerüst für Militärlager, Stadtgrundrisse und die Einteilung von Ackerland. Oft lief der decumanus etwa in Ost-West- und der cardo in Nord-Süd-Richtung, doch häufig richteten sich die Achsen auch nach Gelände, Küste oder vorhandenen Straßen.', depthPoints: 8 },
        { id: 'QUIZ:GROMA:WINKEL', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Der Vermesser hat eine Linie über das erste Lotpaar abgesteckt. Wie bekommt er die rechtwinklige Querlinie?||Er dreht das Kreuz um 45 Grad||Er peilt über das zweite, dazu rechtwinklige Lotpaar*||Er misst mit einem Seil die Diagonale||Er stellt den Stab schräg---Woher kommt der rechte Winkel bei der Groma?||Aus der Schwerkraft||Aus der festen 90-Grad-Anordnung der Kreuzarme*||Aus dem Sonnenstand||Aus der Länge der Lotschnüre---Eine römische Stadt liegt an einer schräg verlaufenden Küste. Ihr Straßenraster ist nicht nach Norden ausgerichtet. Ist das ein Messfehler?||Ja, cardo muss immer genau nach Norden zeigen||Nein, die Achsen wurden oft nach Gelände oder Küste ausgerichtet*||Ja, die Groma kann nur Nord-Süd-Linien messen||Nein, weil Küstenstädte kein Raster hatten', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:ZENTURIATION',
      title: 'Ein Raster für ganze Landschaften',
      entryQuestion: 'Was kann man mit vielen rechten Winkeln anfangen – und wo stößt die Groma an ihre Grenzen?',
      takeaway: 'Mit der Groma teilten die Römer ganze Landschaften in ein Raster aus Quadraten (Zenturiation); Wind störte die Lote, und Höhen konnte sie gar nicht messen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:WAAGERECHTE' },
      sections: [
        { id: 'OBS:GROMA:RASTER', kind: 'observation', title: 'Ein Muster, das man noch heute sieht', summary: 'Auf Luftbildern mancher Gegenden in Italien, Nordafrika oder Südfrankreich erkennt man bis heute ein regelmäßiges Netz aus Wegen, Feldgrenzen und Gräben. Diese Linien gehen oft auf eine römische Landvermessung vor rund 2000 Jahren zurück.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ZENTURIATION', kind: 'explanation', title: 'Zenturiation: Land in Quadraten', summary: 'Ausgehend von cardo und decumanus wurde Land in gleich große Quadrate geteilt, die centuriae. Eine typische centuria maß 20 mal 20 actus, also rund 710 Meter Seitenlänge. Das Raster diente der Zuteilung und Besteuerung von Land, der Anlage von Wegen und Gräben und wurde in Katasterplänen festgehalten.', depthPoints: 10 },
        { id: 'EXPL:GROMA:GRENZEN', kind: 'explanation', title: 'Wind und Hügel', summary: 'Die Schwachstelle der Groma sind die Lote: Wind lässt die Schnüre pendeln und macht die Peilung ungenau. Man schützte sie deshalb mitunter vor dem Wind oder maß bei ruhigem Wetter. Vor allem aber zeigt die Groma nur Richtungen auf der Fläche. Ob ein Punkt höher oder tiefer liegt als ein anderer, verrät sie nicht – dafür brauchte es ein anderes Werkzeug.', depthPoints: 8 },
        { id: 'BR:GROMA:QUELLEN', kind: 'branch', title: 'Woher wissen wir das?', summary: 'Unser Bild der Groma stützt sich vor allem auf Metallteile, die 1912 in Pompeji in der Werkstatt eines Handwerkers namens Verus gefunden wurden, auf die Darstellung einer Groma auf dem Grabstein des Vermessers Lucius Aebutius Faustus in Ivrea und auf die Schriften der römischen Landvermesser. Wie genau einzelne Teile aussahen und hießen, ist in der Forschung teils umstritten – Nachbauten sind Rekonstruktionen.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:GROMA:ZENTURIATION', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Eine centuria hat rund 710 Meter Seitenlänge. Ungefähr wie groß ist ihre Fläche?||Etwa 5 Hektar||Etwa 50 Hektar*||Etwa 500 Hektar||Etwa 7 Hektar---Warum misst man mit der Groma besser bei ruhigem Wetter?||Weil Regen das Holz verzieht||Weil Wind die Lotschnüre pendeln lässt und die Peilung verfälscht*||Weil man sonst die Fluchtstäbe nicht sieht||Weil das Kreuz bei Wind nicht dreht---Für eine Wasserleitung muss ein gleichmäßiges, leichtes Gefälle abgesteckt werden. Reicht die Groma dafür?||Ja, sie misst auch Höhen||Nein, sie zeigt nur Richtungen auf der Fläche, keine Höhenunterschiede*||Ja, wenn man das Kreuz schräg stellt||Nein, weil Wasserleitungen immer gerade sein müssen', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:WAAGERECHTE',
      title: 'Wasser zeigt die Waagerechte',
      entryQuestion: 'Wie baut man eine Wasserleitung, die über viele Kilometer immer ganz leicht bergab fließt?',
      takeaway: 'Eine ruhende Wasseroberfläche ist waagerecht – wer sie als Bezug nutzt wie beim Chorobates, kann Höhenunterschiede erkennen und ein gleichmäßiges Gefälle anlegen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:NIVELLEMENT' },
      sections: [
        { id: 'OBS:GROMA:AQUAEDUKT', kind: 'observation', title: 'Eine Leitung mit fast keinem Gefälle', summary: 'Die römische Wasserleitung nach Nîmes, zu der die berühmte Brücke Pont du Gard gehört, ist rund 50 Kilometer lang. Zwischen Quelle und Stadt liegen trotzdem nur etwa 11 bis 13 Meter Höhenunterschied – je nach Quelle. Das Wasser floss also auf einem Kilometer im Mittel nur ein paar Dutzend Zentimeter bergab.', depthPoints: 4 },
        { id: 'EXPL:GROMA:WASSERSPIEGEL', kind: 'explanation', title: 'Der Wasserspiegel als Lineal', summary: 'Stehendes Wasser bildet immer eine waagerechte Oberfläche, weil die Schwerkraft es überall gleich nach unten zieht. Ein Lot zeigt die Senkrechte, ein Wasserspiegel die Waagerechte. Beides zusammen gibt dem Vermesser ein festes Bezugssystem, das nicht davon abhängt, wie schief der Boden ist.', depthPoints: 8 },
        { id: 'EXPL:GROMA:CHOROBATES', kind: 'explanation', title: 'Der Chorobates', summary: 'Der römische Architekt Vitruv beschreibt den Chorobates: einen langen Holztisch von etwa 20 Fuß, also rund 6 Metern, mit Loten an den Seiten und einer Wasserrinne auf der Oberseite. Steht die Wasseroberfläche überall gleich hoch in der Rinne, liegt der Tisch waagerecht. Über seine Oberkante peilt man dann zu einer entfernten Messlatte und liest ab, wie viel höher oder tiefer der Boden dort liegt.', depthPoints: 10 },
        { id: 'QUIZ:GROMA:WAAGERECHTE', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Eine Leitung verliert auf 50 Kilometern 12 Meter Höhe. Wie groß ist das Gefälle pro Kilometer?||2,4 Meter||24 Zentimeter*||2,4 Zentimeter||24 Meter---Warum eignet sich eine ruhende Wasseroberfläche als Bezug für Höhenmessungen?||Weil Wasser Licht bricht||Weil sie sich durch die Schwerkraft von selbst waagerecht einstellt*||Weil Wasser schwerer ist als Holz||Weil sie immer auf Meereshöhe liegt---Eine moderne Wasserwaage hat eine Luftblase in einer gebogenen Röhre. Was hat sie mit dem Chorobates gemeinsam?||Beide messen Entfernungen||Beide nutzen eine Flüssigkeit, die sich durch die Schwerkraft ausrichtet, um die Waagerechte zu zeigen*||Beide funktionieren nur mit Sonnenlicht||Nichts, die Wasserwaage misst Winkel', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:NIVELLEMENT',
      title: 'Höhen Schritt für Schritt messen',
      entryQuestion: 'Wie findet man heraus, wie viel höher ein Hügel liegt als das Tal, wenn man nicht einfach ein Maßband senkrecht hochhalten kann?',
      takeaway: 'Beim Nivellement zielt man waagerecht auf zwei Messlatten; der Höhenunterschied ist Rückblick minus Vorblick, und lange Strecken setzt man aus vielen solchen Schritten zusammen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:DREIECK' },
      sections: [
        { id: 'OBS:GROMA:BAUSTELLE', kind: 'observation', title: 'Das Gerät auf dem Dreibein', summary: 'Auf Baustellen sieht man oft ein kleines Fernrohr auf einem Dreibein und einige Schritte entfernt jemanden, der eine lange Latte mit Zahlen senkrecht hält. Das Fernrohr bewegt sich nur waagerecht hin und her. Trotzdem bestimmt man damit Höhen auf Millimeter genau.', depthPoints: 4 },
        { id: 'EX:GROMA:NIVELLEMENT-SCHEMA', kind: 'example', title: 'Schema: Rückblick und Vorblick', summary: 'Das Nivelliergerät steht zwischen zwei Punkten A und B und zielt genau waagerecht. Auf der Latte bei A liest man 1,85 Meter ab (Rückblick), auf der Latte bei B 0,60 Meter (Vorblick). Weil die Ziellinie auf beiden Seiten gleich hoch ist, liegt B um 1,85 minus 0,60, also 1,25 Meter höher als A. Je kleiner der abgelesene Wert, desto höher liegt der Boden.', image: { src: '/images/diagrams/nivellement.svg', alt: 'Schema eines Nivellements: waagerechte Ziellinie zwischen zwei Messlatten, Rückblick 1,85 Meter bei A, Vorblick 0,60 Meter bei B, Höhenunterschied 1,25 Meter.', credit: 'Schema: Solar Science Foundation' }, depthPoints: 10 },
        { id: 'EXPL:GROMA:NIVELLEMENT-KETTE', kind: 'explanation', title: 'Lange Strecken als Kette', summary: 'Zwischen Tal und Hügel liegen meist viele hundert Meter. Man stellt das Gerät deshalb immer wieder neu auf und misst Abschnitt für Abschnitt. Die einzelnen Höhenunterschiede werden addiert – steigende Abschnitte positiv, fallende negativ. Stellt man das Gerät jeweils etwa in die Mitte zwischen beide Latten, heben sich kleine Fehler der Zielrichtung gegenseitig auf.', depthPoints: 8 },
        { id: 'QUIZ:GROMA:NIVELLEMENT', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Rückblick auf Latte A: 2,10 Meter. Vorblick auf Latte B: 0,85 Meter. Wie liegt B im Vergleich zu A?||0,85 Meter tiefer||1,25 Meter höher*||2,95 Meter höher||1,25 Meter tiefer---Warum muss die Ziellinie beim Nivellement genau waagerecht sein?||Damit die Latte besser zu lesen ist||Nur dann ist die Ziellinie über beiden Latten gleich hoch und die Differenz der Ablesungen gleich dem Höhenunterschied*||Damit das Fernrohr nicht umfällt||Damit die Entfernung stimmt---Drei Abschnitte ergeben +1,20 Meter, −0,40 Meter und +0,75 Meter. Wie groß ist der gesamte Höhenunterschied?||2,35 Meter||1,55 Meter*||0,05 Meter||0,85 Meter', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:DREIECK',
      title: 'Entfernungen messen, ohne hinzugehen',
      entryQuestion: 'Wie weit ist der Baum auf der anderen Seite des Flusses entfernt, wenn man nicht hinüber kann?',
      takeaway: 'Kennt man eine Strecke und die beiden Winkel an ihren Enden, liegt das ganze Dreieck fest – so lassen sich unerreichbare Entfernungen allein aus einer Basislinie und Winkeln berechnen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:NETZ' },
      sections: [
        { id: 'OBS:GROMA:FLUSS', kind: 'observation', title: 'Ein Ufer, das man nicht erreicht', summary: 'Zwischen dir und einem Baum am anderen Ufer liegt ein breiter Fluss. Ein Maßband kannst du nicht hinüberspannen. Du kannst aber an deinem Ufer entlanggehen und den Baum von verschiedenen Stellen aus anpeilen. Je weiter du gehst, desto mehr ändert sich die Richtung, in der du ihn siehst.', depthPoints: 4 },
        { id: 'EX:GROMA:DREIECK-SCHEMA', kind: 'example', title: 'Schema: eine Basislinie und zwei Winkel', summary: 'Am eigenen Ufer misst man eine Strecke von A nach B, die Basis, hier 100 Meter. Bei A peilt man den Baum genau rechtwinklig zur Basis an, bei B misst man den Winkel zwischen Basis und Baum: 60 Grad. Damit liegt das Dreieck fest. Zeichnet man es maßstäblich, etwa 1 Zentimeter für 10 Meter, kann man die Entfernung von A zum Baum einfach abmessen: rund 173 Meter.', image: { src: '/images/diagrams/triangulation.svg', alt: 'Schema: Basislinie von 100 Metern am Flussufer zwischen A und B, rechter Winkel bei A, 60 Grad bei B, Entfernung von A zum Baum am anderen Ufer etwa 173 Meter.', credit: 'Schema: Solar Science Foundation' }, depthPoints: 10 },
        { id: 'EXPL:GROMA:TANGENS', kind: 'explanation', title: 'Vom Zeichnen zum Rechnen', summary: 'Alle Dreiecke mit denselben Winkeln haben dieselbe Form, nur die Größe ist verschieden. Deshalb ist bei einem rechten Winkel und 60 Grad das Verhältnis der Gegenkathete zur Basis immer gleich, nämlich etwa 1,73. Dieses Verhältnis heißt Tangens des Winkels. Die Rechnung lautet: Entfernung gleich Basis mal Tangens des Winkels, also 100 Meter mal 1,73, rund 173 Meter.', depthPoints: 10 },
        { id: 'EXPL:GROMA:DIOPTRA', kind: 'explanation', title: 'Winkel messen in der Antike', summary: 'Schon in der Antike gab es Geräte, um Winkel zu peilen. Heron von Alexandria beschrieb im 1. Jahrhundert die Dioptra, eine drehbare Visiereinrichtung, mit der man Richtungen und Höhenwinkel bestimmen konnte. Im Unterschied zur Groma kann sie beliebige Winkel messen, nicht nur rechte.', depthPoints: 6 },
        { id: 'QUIZ:GROMA:DREIECK', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Basis 50 Meter, rechter Winkel bei A, bei B werden 45 Grad gemessen. Der Tangens von 45 Grad ist 1. Wie weit ist der Baum von A entfernt?||25 Meter||50 Meter*||71 Meter||100 Meter---Warum reichen eine Strecke und zwei Winkel, um ein Dreieck festzulegen?||Weil der dritte Winkel immer 90 Grad ist||Weil damit Form und Größe des Dreiecks eindeutig bestimmt sind*||Weil alle Dreiecke gleich groß sind||Weil man die anderen Seiten schätzen kann---Ein Wanderer will die Breite einer Schlucht bestimmen. Was muss er auf seiner Seite messen?||Nur die Tiefe der Schlucht||Eine Basislinie entlang der Kante und die Winkel zu einem Punkt auf der anderen Seite*||Die Zeit, die ein Stein zum Fallen braucht||Nur einen einzigen Winkel', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:NETZ',
      title: 'Dreiecke über ganze Länder',
      entryQuestion: 'Wie vermisst man ein ganzes Land, wenn man nur eine einzige Strecke mit dem Maßband messen will?',
      takeaway: 'Bei der Triangulation misst man eine Basislinie genau und alles andere nur über Winkel; ein Netz aneinandergereihter Dreiecke trägt die Maße so über Hunderte Kilometer.',
      sections: [
        { id: 'OBS:GROMA:KIRCHTUERME', kind: 'observation', title: 'Von Turm zu Turm', summary: 'Von einem hohen Kirchturm aus sieht man bei klarem Wetter oft mehrere Nachbarorte, deren Türme ebenfalls weit sichtbar sind. Jeder Turm ist ein fester Punkt, den man aus vielen Richtungen anpeilen kann. Genau solche Punkte nutzten die ersten Landesvermesser.', depthPoints: 4 },
        { id: 'EXPL:GROMA:KETTE', kind: 'explanation', title: 'Ein Dreieck reicht das nächste weiter', summary: 'Hat man in einem Dreieck alle Seiten berechnet, wird eine dieser Seiten zur Basis des nächsten Dreiecks. So entsteht eine Kette oder ein Netz aus Dreiecken. Nur die erste Basislinie misst man mühsam am Boden, alle weiteren Strecken folgen aus Winkelmessungen. Weil sich Winkel über große Entfernungen sehr genau messen lassen, ist diese Methode viel genauer als ein Maßband über Hügel, Wälder und Flüsse.', depthPoints: 10 },
        { id: 'EXPL:GROMA:SNELLIUS', kind: 'explanation', title: 'Snellius und Gauß', summary: 'Der Niederländer Willebrord Snellius begann 1615, die Entfernung zwischen Alkmaar und Bergen op Zoom über ein Dreiecksnetz aus Kirchtürmen zu bestimmen; 1617 veröffentlichte er die Ergebnisse. Zwei Jahrhunderte später leitete Carl Friedrich Gauß die Vermessung des Königreichs Hannover. Sein größtes Dreieck zwischen Brocken, Hohehagen und Inselsberg hatte Seiten von bis zu rund 107 Kilometern. Um so weit peilen zu können, entwickelte er den Heliotrop, einen Spiegel, der Sonnenlicht gezielt zum Nachbarpunkt lenkt.', depthPoints: 10 },
        { id: 'BR:GROMA:WINKELSUMME', kind: 'branch', title: 'Ist der Raum eben?', summary: 'In einem ebenen Dreieck ergeben die drei Winkel zusammen 180 Grad. Auf der gekrümmten Erdoberfläche ist die Summe bei großen Dreiecken etwas größer; beim Dreieck Brocken–Hohehagen–Inselsberg sind es rund 15 Bogensekunden. Die Messungen von Gauß stimmten mit dieser Erwartung im Rahmen der Messgenauigkeit überein. Ob er damit bewusst auch die Geometrie des Raumes selbst prüfen wollte, wird in der Wissenschaftsgeschichte diskutiert.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:GROMA:NETZ', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'In einem Dreiecksnetz sind alle Seiten des ersten Dreiecks berechnet. Wie geht es weiter?||Man misst die nächste Strecke mit dem Maßband||Eine bekannte Seite wird zur Basis des nächsten Dreiecks, dazu misst man nur Winkel*||Man schätzt die nächste Strecke||Man beginnt ein ganz neues Netz---Warum misst man bei der Triangulation fast nur Winkel statt Strecken?||Weil Winkel keine Einheit haben||Weil sich Winkel über große Entfernungen genauer messen lassen als Strecken im Gelände*||Weil Strecken in Dreiecken immer gleich sind||Weil Maßbänder verboten waren---Satellitennavigation bestimmt die Position aus den Entfernungen zu mehreren Satelliten. Wie unterscheidet sich das von klassischer Triangulation?||Gar nicht, beides nutzt nur Winkel||Sie arbeitet mit gemessenen Entfernungen statt mit Winkeln*||Sie braucht keine Geometrie||Sie funktioniert nur bei Tag', depthPoints: 12 },
      ],
    },
  ],
};
