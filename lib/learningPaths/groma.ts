import type { LearningPath } from '../learningPaths';

// Canonical identities from kueper-knowledge-graph (2026-10-19):
// module TEC-L1-000001 (learning/ssf-tec-groma-vermessung.yaml),
// concepts CON:L1:groma, CON:L1:zenturiation, path PATH:SSF:TEC-GROMA-0001.
// SSF owns the didactic design. Non-interactive: observation, explanation, schema, quiz.

const GROMA_DIAGRAM = {
  src: '/images/diagrams/groma-aufbau.svg',
  alt: 'Schema einer Groma: senkrechter Stab, seitlicher Ausleger, drehbares Kreuz mit vier Loten an den Armenden und ein Zentrallot über dem Messpunkt am Boden.',
  credit: 'Schema: Solar Science Foundation',
};

export const gromaLearningPath: LearningPath = {
  id: 'PATH:SSF:TEC-GROMA-0001',
  title: 'Wie zogen die Römer schnurgerade Straßen ohne Laser und GPS?',
  subtitle: 'Ein Stab, ein Kreuz und vier Schnüre mit Gewichten: Wie die Groma Geraden und rechte Winkel ins Gelände brachte – und wo ihre Grenzen lagen.',
  status: 'prototype',
  sourceModuleId: 'TEC-L1-000001',
  kxfModuleId: 'LRN:SSF:TEC-L1-000001',
  domainsNeeded: ['KD:MATH-GEO:N1', 'KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: ['TEC-L1-000001', 'CON:L1:groma', 'CON:L1:zenturiation'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Schema: Aufbau der Groma', 'Peilprinzip als Schrittfolge', 'Quiz je Einheit'],
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
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GROMA:GRENZEN' },
      sections: [
        { id: 'OBS:GROMA:ZWEI-SCHNUERE', kind: 'observation', title: 'Zwei Schnüre werden zu einer', summary: 'Schaut man an zwei hintereinander hängenden Schnüren vorbei, gibt es genau eine Blickrichtung, in der die hintere hinter der vorderen verschwindet. Diese Blickrichtung ist eine Gerade – und sie lässt sich mit Stäben ins Gelände übertragen.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ABLAUF', kind: 'explanation', title: 'Der Messablauf in vier Schritten', summary: 'Erstens: Stab einstecken und das Zentrallot über den Ausgangspunkt bringen. Zweitens: Das Kreuz drehen, bis ein Arm in die gewünschte Richtung zeigt. Drittens: An zwei gegenüberliegenden Loten vorbeipeilen, bis sie sich decken; ein Helfer setzt in dieser Linie Fluchtstäbe. Viertens: Über das andere Lotpaar genauso peilen – diese Linie steht rechtwinklig zur ersten, weil die Kreuzarme fest im 90-Grad-Winkel stehen.', depthPoints: 10 },
        { id: 'EXPL:GROMA:ACHSEN', kind: 'explanation', title: 'Cardo und decumanus', summary: 'Die beiden rechtwinkligen Hauptlinien hießen decumanus und cardo. Sie bildeten das Grundgerüst für Militärlager, Stadtgrundrisse und die Einteilung von Ackerland. Oft lief der decumanus etwa in Ost-West- und der cardo in Nord-Süd-Richtung, doch häufig richteten sich die Achsen auch nach Gelände, Küste oder vorhandenen Straßen.', depthPoints: 8 },
        { id: 'QUIZ:GROMA:WINKEL', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Der Vermesser hat eine Linie über das erste Lotpaar abgesteckt. Wie bekommt er die rechtwinklige Querlinie?||Er dreht das Kreuz um 45 Grad||Er peilt über das zweite, dazu rechtwinklige Lotpaar*||Er misst mit einem Seil die Diagonale||Er stellt den Stab schräg---Woher kommt der rechte Winkel bei der Groma?||Aus der Schwerkraft||Aus der festen 90-Grad-Anordnung der Kreuzarme*||Aus dem Sonnenstand||Aus der Länge der Lotschnüre---Eine römische Stadt liegt an einer schräg verlaufenden Küste. Ihr Straßenraster ist nicht nach Norden ausgerichtet. Ist das ein Messfehler?||Ja, cardo muss immer genau nach Norden zeigen||Nein, die Achsen wurden oft nach Gelände oder Küste ausgerichtet*||Ja, die Groma kann nur Nord-Süd-Linien messen||Nein, weil Küstenstädte kein Raster hatten', depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GROMA:GRENZEN',
      title: 'Raster im Land und Grenzen des Instruments',
      entryQuestion: 'Was kann man mit vielen rechten Winkeln anfangen – und was kann die Groma nicht?',
      takeaway: 'Mit der Groma teilten die Römer ganze Landschaften in ein Raster aus Quadraten (Zenturiation); Wind störte die Lote, und Höhenunterschiede maßen sie mit einem anderen Gerät, dem Chorobates.',
      sections: [
        { id: 'OBS:GROMA:RASTER', kind: 'observation', title: 'Ein Muster, das man noch heute sieht', summary: 'Auf Luftbildern mancher Gegenden in Italien, Nordafrika oder Südfrankreich erkennt man bis heute ein regelmäßiges Netz aus Wegen, Feldgrenzen und Gräben. Diese Linien gehen oft auf eine römische Landvermessung vor rund 2000 Jahren zurück.', depthPoints: 4 },
        { id: 'EXPL:GROMA:ZENTURIATION', kind: 'explanation', title: 'Zenturiation: Land in Quadraten', summary: 'Ausgehend von cardo und decumanus wurde Land in gleich große Quadrate geteilt, die centuriae. Eine typische centuria maß 20 mal 20 actus, also rund 710 Meter Seitenlänge. Das Raster diente der Zuteilung und Besteuerung von Land, der Anlage von Wegen und Gräben und wurde in Katasterplänen festgehalten.', depthPoints: 10 },
        { id: 'EXPL:GROMA:GRENZEN', kind: 'explanation', title: 'Wind, Hügel und ein zweites Werkzeug', summary: 'Die Schwachstelle der Groma sind die Lote: Wind lässt die Schnüre pendeln und macht die Peilung ungenau. Man schützte sie deshalb mitunter vor dem Wind oder maß bei ruhigem Wetter. Höhenunterschiede kann die Groma nicht messen. Dafür nutzten die Römer den Chorobates, einen langen Tisch mit Wasserrinne und Loten, eine Art große Wasserwaage.', depthPoints: 8 },
        { id: 'BR:GROMA:QUELLEN', kind: 'branch', title: 'Woher wissen wir das?', summary: 'Unser Bild der Groma stützt sich vor allem auf Metallteile, die 1912 in Pompeji in der Werkstatt eines Handwerkers namens Verus gefunden wurden, auf die Darstellung einer Groma auf dem Grabstein des Vermessers Lucius Aebutius Faustus in Ivrea und auf die Schriften der römischen Landvermesser. Wie genau einzelne Teile aussahen und hießen, ist in der Forschung teils umstritten – Nachbauten sind Rekonstruktionen.', optional: true, depthPoints: 6 },
        { id: 'QUIZ:GROMA:GRENZEN', kind: 'quiz', title: 'Anwendung → Verständnis → Transfer', summary: 'Eine centuria hat rund 710 Meter Seitenlänge. Ungefähr wie groß ist ihre Fläche?||Etwa 5 Hektar||Etwa 50 Hektar*||Etwa 500 Hektar||Etwa 7 Hektar---Warum misst man mit der Groma besser bei ruhigem Wetter?||Weil Regen das Holz verzieht||Weil Wind die Lotschnüre pendeln lässt und die Peilung verfälscht*||Weil man sonst die Fluchtstäbe nicht sieht||Weil das Kreuz bei Wind nicht dreht---Für eine Wasserleitung muss ein gleichmäßiges, leichtes Gefälle abgesteckt werden. Reicht die Groma dafür?||Ja, sie misst auch Höhen||Nein, für Höhenunterschiede braucht man ein Nivelliergerät wie den Chorobates*||Ja, wenn man das Kreuz schräg stellt||Nein, die Römer bauten keine Leitungen mit Gefälle', depthPoints: 12 },
      ],
    },
  ],
};
