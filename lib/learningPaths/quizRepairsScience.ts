import { q, type QuizTriple } from './quizAuthoring';

/** Ersatz-Kurztests der übrigen Physik-, Mathematik-, Elektronik-, Chemie- und Biologie-Module. Aufbau siehe quizRepairs.ts. */
export const scienceQuizRepairs: Record<string, QuizTriple> = {
  'PATH:SSF:PHY-WAVE-SPECTRUM-0001|UNIT:KLANG': [
    q('Du trinkst eine halb volle Tasse halb leer und klopfst erneut an. Wie ändert sich der Ton?', ['Er wird tiefer, weil die Luftsäule länger wird', 'Er wird höher', 'Er bleibt gleich', 'Er verschwindet'], 0, 'Je weniger Wasser, desto länger die schwingende Luftsäule und desto tiefer der Ton.'),
    q('Warum ist der Ton bei kürzerer Luftsäule höher?', ['Die stehende Welle hat eine kürzere Wellenlänge und damit eine höhere Frequenz', 'Die Tasse wird kälter', 'Die Luft wird schwerer', 'Der Löffel schlägt härter'], 0, 'Kürzere Resonator-Länge heißt kürzere Wellenlänge und höhere Frequenz.'),
    q('Welche Erfahrung folgt demselben Prinzip?', ['Kürzere Orgelpfeifen klingen höher', 'Dickere Gitarrensaiten klingen höher', 'Lautere Töne klingen höher', 'Wärmere Luft macht immer tiefere Töne'], 0, 'Orgelpfeifen, Flöten und Stimmgabeln sind Resonatoren, deren Länge die Tonhöhe bestimmt.'),
  ],
  'PATH:SSF:PHY-SKY-0001|UNIT:HIMMEL-BLAU': [
    q('Die Streuung ist proportional zu λ⁻⁴. Wie viel stärker wird Blau (450 nm) gegenüber Rot (700 nm) gestreut?', ['Etwa 1,6-mal', 'Etwa 2,5-mal', 'Etwa 6-mal', 'Etwa 24-mal'], 2, '(700 / 450)⁴ ergibt etwa 5,9. Daher der Wert von rund sechs.'),
    q('Warum erscheint die Sonne selbst weißlich, der Himmel aber blau?', ['Das direkte Licht verliert nur einen Teil des Blaus, das gestreute Blau kommt aus allen Richtungen', 'Die Sonne ist weiß, die Luft ist blau gefärbt', 'Der Himmel spiegelt das Meer', 'Die Sonne sendet nur Blau aus'], 0, 'Gestreutes blaues Licht erreicht unser Auge von überall, das direkte Sonnenlicht bleibt fast weiß.'),
    q('Warum ist der Himmel nicht violett, obwohl Violett noch stärker gestreut wird?', ['Wenig Violett im Sonnenspektrum, geringere Augenempfindlichkeit und Ozonabsorption', 'Violett wird nicht gestreut', 'Die Augen sehen Violett am besten', 'Die Atmosphäre enthält kein Violett'], 0, 'Drei Gründe zusammen: Sonnenspektrum, Augenempfindlichkeit und Ozon.'),
  ],
  'PATH:SSF:MAT-ERROR-0001|UNIT:FEHLER-FORTPFLANZUNG': [
    q('Die Dichte einer Kugel wird aus der Masse und dem Radius berechnet (ρ ∝ m / r³). Der Radius ist 1 % unsicher. Wie groß ist der Beitrag zum relativen Fehler der Dichte ungefähr?', ['0,3 %', '1 %', '3 %', '9 %'], 2, 'Der Exponent 3 verdreifacht den relativen Fehler, also etwa 3 %.'),
    q('Warum zählt eine Größe mit hohem Exponenten stärker für die Unsicherheit?', ['Ihr relativer Fehler wird mit dem Exponenten multipliziert', 'Sie ist immer ungenauer gemessen', 'Sie hat das größere Zeichen', 'Sie wird zweimal gemessen'], 0, 'Bei Potenzen wächst der relative Fehler mit dem Exponenten.'),
    q('Worin unterscheidet sich die lineare von der Gaußschen Fehlerfortpflanzung?', ['Die lineare addiert Beträge (pessimistisch), die Gaußsche addiert quadratisch (statistisch, meist kleiner)', 'Beide sind identisch', 'Die lineare liefert immer kleinere Fehler', 'Die Gaußsche kennt keine Fehler'], 0, 'Die lineare Rechnung gibt den größtmöglichen Fehler, die Gaußsche den typischen.'),
  ],
  'PATH:SSF:EL-DIODE-0001|UNIT:KENNLINIE': [
    q('Eine Diode wird direkt, ohne Vorwiderstand, an eine Spannungsquelle in Durchlassrichtung angeschlossen. Was passiert?', ['Der Strom steigt stark an und kann sie zerstören', 'Nichts', 'Sie sperrt', 'Sie wird kälter'], 0, 'Oberhalb der Schleusenspannung steigt der Strom steil. Ein Vorwiderstand begrenzt ihn.'),
    q('Was bedeutet die Schleusenspannung?', ['Die Spannung, ab der die Diode in Durchlassrichtung deutlich leitet', 'Die maximale Sperrspannung', 'Die Spannung bei Kurzschluss', 'Die Spannung am Netzteil'], 0, 'Unterhalb fließt kaum Strom, darüber steigt er stark an.'),
    q('Welche der Dioden hat typischerweise die höchste Schleusenspannung?', ['Eine LED', 'Eine Germaniumdiode', 'Eine Schottkydiode', 'Eine Siliziumdiode'], 0, 'LEDs liegen je nach Farbe bei rund 1,8 bis 3 V, Silizium bei etwa 0,7 V.'),
  ],
  'PATH:SSF:MAT-SERIES-0001|UNIT:GEOM-REIHE': [
    q('Wie groß ist die Summe 1 + 1/2 + 1/4 + 1/8 + … (q = 0,5)?', ['1', '1,5', '2', 'Unendlich'], 2, 'Die Summe ist 1 / (1 − q) = 1 / 0,5 = 2.'),
    q('Warum hatte Zenon mit dem Paradoxon unrecht?', ['Unendlich viele Summanden können eine endliche Summe ergeben', 'Unendlich viele Schritte brauchen unendlich viel Zeit', 'Die Schritte werden größer', 'Die Reihe divergiert'], 0, 'Bei |q| < 1 konvergiert die geometrische Reihe gegen einen Grenzwert.'),
    q('Was geschieht bei q = 1,2?', ['Die Reihe divergiert, die Summe wächst über alle Grenzen', 'Die Summe ist 5', 'Die Summe ist 0', 'Die Summe ist 1'], 0, 'Die Reihe konvergiert nur für |q| < 1.'),
  ],
  'PATH:SSF:MAT-DIFFGEO-0001|UNIT:POLARKURVEN': [
    q('Welche Kurve beschreibt r = 6 cos φ?', ['Einen Kreis durch den Ursprung mit Durchmesser 6', 'Eine Gerade', 'Eine Spirale', 'Eine Parabel'], 0, 'Umgerechnet in kartesische Koordinaten ergibt sich ein Kreis.'),
    q('Welche Kurve entsteht, wenn der Radius mit dem Winkel stetig wächst?', ['Eine Spirale', 'Ein Kreis um den Ursprung', 'Eine Gerade', 'Eine Ellipse'], 0, 'Nimmt r mit φ zu, windet sich die Kurve nach außen.'),
    q('Wann sind Polarkoordinaten besonders passend?', ['Bei Problemen mit Drehsymmetrie', 'Nur bei Geraden', 'Nie', 'Nur bei Parabeln'], 0, 'Kreise, Spiralen und Rosen sind in Polarform einfach zu beschreiben.'),
  ],
  'PATH:SSF:MAT-VEC-0001|UNIT:VEC-GRUNDLAGEN': [
    q('Die Vektoren a = (3, 0) und b = (0, 4) werden addiert. Wie groß ist der Betrag der Summe?', ['1', '5', '7', '12'], 1, 'a + b = (3, 4), der Betrag ist √(9 + 16) = 5.'),
    q('Warum genügt für eine Kraft eine einzelne Zahl nicht?', ['Eine Kraft hat Betrag und Richtung', 'Kräfte haben keinen Betrag', 'Zahlen sind ungenau', 'Kräfte sind immer null'], 0, 'Schräg zu drücken bewegt den Tisch anders als gerade zu drücken.'),
    q('Wie ergibt sich die Summe zweier Vektoren in der Zeichnung?', ['Als Diagonale des Parallelogramms', 'Als Seitenlänge', 'Als Mittelpunkt', 'Als Differenz der Längen'], 0, 'Parallelogramm-Addition: die Diagonale vom gemeinsamen Anfangspunkt.'),
  ],
  'PATH:SSF:MAT-VEC-0001|UNIT:SKALARPRODUKT': [
    q('Du ziehst einen Koffer mit F = 100 N unter 60° zur Bewegungsrichtung über s = 10 m. Wie groß ist die Arbeit?', ['500 J', '866 J', '1000 J', '0 J'], 0, 'W = F · s · cos 60° = 100 · 10 · 0,5 = 500 J.'),
    q('Wie groß ist das Skalarprodukt zweier Vektoren, die senkrecht zueinander stehen?', ['Null', 'Eins', 'Das Produkt der Beträge', 'Unendlich'], 0, 'Bei 90° ist cos φ = 0. Deshalb leistet eine senkrechte Kraft keine Arbeit.'),
    q('Bei welchem Winkel zwischen Kraft und Weg ist die Arbeit am größten?', ['Bei 0°', 'Bei 90°', 'Bei 180°', 'Bei 270°'], 0, 'cos 0° = 1: Die ganze Kraft wirkt in Bewegungsrichtung.'),
  ],
  'PATH:SSF:ENG-EDM-0001|UNIT:EDM-GRUNDPRINZIP': [
    q('Wie kann EDM ein Material bearbeiten, das härter ist als jedes Werkzeug?', ['Funkenentladungen tragen das Material ohne Berührung ab', 'Das Werkzeug ist härter', 'Das Werkzeug schmilzt das Material', 'Das Material wird gesägt'], 0, 'Die Härte spielt keine Rolle, weil das Werkzeug das Werkstück nicht berührt.'),
    q('Mit U = 100 V, I = 10 A und t_on = 10 µs: Wie groß ist die Pulsenergie W = U · I · t?', ['1 mJ', '10 mJ', '100 mJ', '1 J'], 1, '100 · 10 · 10⁻⁵ J = 0,01 J = 10 mJ.'),
    q('Wann wählt man hohe, wann niedrige Pulsenergie?', ['Hohe zum Schruppen (schnell, rauer), niedrige zum Schlichten (langsam, glatter)', 'Hohe zum Schlichten', 'Immer hohe', 'Immer niedrige'], 0, 'Mehr Energie trägt mehr Material ab, hinterlässt aber größere Krater.'),
  ],
  'PATH:SSF:ENG-EDM-0001|UNIT:DRAHTERODIEREN': [
    q('Welche Voraussetzung muss das Werkstück beim Drahterodieren erfüllen?', ['Es muss elektrisch leitfähig sein', 'Es muss magnetisch sein', 'Es muss transparent sein', 'Es muss flüssig sein'], 0, 'Der Funke braucht ein leitfähiges Werkstück.'),
    q('Welche Toleranz ist beim Drahterodieren erreichbar?', ['Etwa ±0,001 mm', 'Etwa ±1 mm', 'Etwa ±10 mm', 'Etwa ±1 m'], 0, 'Drahterodieren schneidet mikrometergenau.'),
    q('Wofür eignet sich das Verfahren besonders?', ['Präzise Konturen in gehärtetem Stahl, etwa Uhrenteile oder Turbinenschaufeln', 'Holz sägen', 'Kunststoff kleben', 'Stoff nähen'], 0, 'Berührungslos und genau, auch durch gehärtete Werkstoffe.'),
  ],
  'PATH:SSF:MAT-LGS-0001|UNIT:LGS-GRAFISCH': [
    q('Zwei Geraden schneiden sich in genau einem Punkt. Was bedeutet das für das Gleichungssystem?', ['Es hat genau eine Lösung', 'Es hat keine Lösung', 'Es hat unendlich viele Lösungen', 'Es ist nicht lösbar'], 0, 'Der Schnittpunkt ist die Lösung beider Gleichungen.'),
    q('Was gilt bei parallelen, verschiedenen Geraden?', ['Es gibt keine Lösung', 'Es gibt genau eine Lösung', 'Es gibt unendlich viele', 'Es gibt zwei'], 0, 'Parallele Geraden schneiden sich nicht. Sind sie identisch, gibt es unendlich viele gemeinsame Punkte.'),
    q('Die Determinante des Systems ist null. Was folgt?', ['Die Geraden sind parallel oder identisch, es gibt keine eindeutige Lösung', 'Die Lösung ist 0', 'Die Lösung ist eindeutig', 'Die Geraden stehen senkrecht'], 0, 'Eine Determinante ungleich null bedeutet eine eindeutige Lösung.'),
  ],
  'PATH:SSF:CHE-ZUCKER-MOLEKUEL-0001|UNIT:ZUCKER-WAS': [
    q('Aus welchen Elementen bestehen Zucker?', ['Kohlenstoff, Wasserstoff und Sauerstoff', 'Nur Kohlenstoff', 'Stickstoff und Schwefel', 'Eisen und Kupfer'], 0, 'Zucker sind Kohlenhydrate. Das Verhältnis kann je nach Zucker variieren.'),
    q('Welche Rolle hat Ribose?', ['Sie bildet das Rückgrat der RNA', 'Sie liefert Zellen Energie als Hauptbrennstoff', 'Sie färbt Himbeeren', 'Sie ist ein Gas'], 0, 'Ohne Ribose gäbe es keine RNA. Glucose dagegen liefert Zellen Energie.'),
    q('Welcher dieser Zucker hat fünf Kohlenstoffatome?', ['Ribose', 'Glucose', 'Glycolaldehyd', 'Erythrulose'], 0, 'Glucose hat C6, Ribose C5, Erythrulose C4, Glycolaldehyd C2.'),
  ],
  'PATH:SSF:CHE-ZUCKER-WELTALL-0001|UNIT:WELTALL-CHEMIE': [
    q('Wo entstehen in interstellaren Wolken komplexe organische Moleküle?', ['Auf der Oberfläche eisiger Staubteilchen', 'In der Sonne', 'In Flüssigkeitsozeanen', 'Im Vakuum frei schwebend'], 0, 'Moleküle lagern sich auf Staubkörnern an und reagieren dort.'),
    q('Welche Energiequelle treibt die Reaktionen an?', ['UV-Strahlung', 'Schwerkraft', 'Wind', 'Gezeiten'], 0, 'Ultraviolettes Licht liefert die Energie, aus einfachen Molekülen komplexere zu bauen.'),
    q('Bei −263 °C ist das Staubkorn ungefähr wie kalt in Kelvin?', ['10 K', '263 K', '100 K', '536 K'], 0, '−263 °C plus 273 ergibt etwa 10 K, nahe dem absoluten Nullpunkt.'),
  ],
  'PATH:SSF:CHE-ZUCKER-WELTALL-0001|UNIT:WELTALL-NACHWEIS': [
    q('Wie wird ein Molekül in einer Gaswolke identifiziert?', ['Das gemessene Linienmuster stimmt mit der Labormessung des Moleküls überein', 'Man holt eine Probe', 'Man sieht es mit bloßem Auge', 'Man wiegt die Wolke'], 0, 'Jedes Molekül hat charakteristische Frequenzen wie einen Fingerabdruck.'),
    q('Welche Instrumente messen diese Signale?', ['Radioteleskope', 'Mikroskope', 'Thermometer', 'Waagen'], 0, 'Radioteleskope erfassen die Frequenzen, bei denen Moleküle senden oder absorbieren.'),
    q('Warum braucht der Nachweis eine ausreichende Signalqualität?', ['Bei viel Rauschen kann ein Zufallsmuster ein Molekül vortäuschen', 'Rauschen macht Linien schärfer', 'Das Signal wäre sonst zu laut', 'Labormessungen sind unnötig'], 0, 'Erst ab einem ausreichenden Signal-Rausch-Verhältnis gilt der Nachweis als gesichert.'),
  ],
  'PATH:SSF:BIO-LEBEN-URSPRUNG-0001|UNIT:LEBEN-FRUEHE-ERDE': [
    q('Was fehlte der frühen Erde im Vergleich zu heute?', ['Freier Sauerstoff und eine Ozonschicht', 'Wasser', 'Schwerkraft', 'Sonne'], 0, 'Damals gab es kaum Sauerstoff, dafür viel CO₂ und starke UV-Strahlung.'),
    q('Heute enthält die Atmosphäre etwa 21 % Sauerstoff. Wie war das vor etwa 4 Milliarden Jahren?', ['Fast kein freier Sauerstoff', 'Ebenfalls 21 %', 'Über 50 %', 'Reiner Sauerstoff'], 0, 'Der Sauerstoff entstand erst später durch Photosynthese.'),
    q('Warum waren die rauen Bedingungen eine Voraussetzung chemischer Evolution?', ['Energie aus UV, Blitzen und Hitze trieb Reaktionen an, die Bausteine entstehen ließen', 'Sie verhinderten jede Reaktion', 'Sie erzeugten Sauerstoff', 'Sie kühlten die Erde'], 0, 'Ohne Energiezufuhr entstehen keine komplexen Moleküle. Zu aggressive Bedingungen würden sie aber zerstören.'),
  ],
  'PATH:SSF:BIO-LEBEN-URSPRUNG-0001|UNIT:LEBEN-BAUSTEINE': [
    q('Was zeigte das Miller-Urey-Experiment von 1953?', ['Aus Wasser, Methan, Ammoniak, Wasserstoff und Blitzen entstehen Aminosäuren', 'Leben entsteht in einer Woche', 'Sauerstoff erzeugt Aminosäuren', 'Meteoriten sind unnötig'], 0, 'Einfache Gase und Energie genügten, um Aminosäuren zu bilden.'),
    q('Warum entstanden mit Sauerstoff in der Simulation keine Aminosäuren?', ['Sauerstoff würde sie zerstören', 'Sauerstoff ist inert', 'Sauerstoff kühlt', 'Sauerstoff ist zu schwer'], 0, 'Die frühe Erde ohne Sauerstoff war chemisch günstig für die Entstehung.'),
    q('Was lieferten Meteoriten zusätzlich?', ['Fertige organische Moleküle wie Aminosäuren, Zucker und Nukleobasen', 'Sauerstoff', 'Wasser allein', 'Nichts'], 0, 'Meteoriten transportierten organische Bausteine auf die frühe Erde.'),
  ],
  'PATH:SSF:BIO-LEBEN-URSPRUNG-0001|UNIT:LEBEN-RNA': [
    q('Worin besteht das Huhn-Ei-Problem des Lebensursprungs?', ['DNA enthält die Bauanleitung für Proteine, Proteine bauen DNA', 'Huhn und Ei kamen gleichzeitig', 'Es gab keine Zellen', 'Es gab nur Proteine'], 0, 'Keines von beiden kann ohne das andere entstanden sein.'),
    q('Wie löst die RNA-Welt-Hypothese das Problem?', ['RNA kann Information speichern und Reaktionen katalysieren', 'RNA ist ein Protein', 'RNA ersetzt Zucker', 'RNA entsteht aus Luft'], 0, 'Selbstkopierende RNA-Moleküle könnten beides geleistet haben.'),
    q('Welcher Zucker bildet das Rückgrat der RNA?', ['Ribose', 'Glucose', 'Saccharose', 'Fructose'], 0, 'RNA braucht Ribose, einen Zucker mit fünf Kohlenstoffatomen.'),
  ],
  'PATH:SSF:ENV-ROHSTOFFE-ENERGIEWENDE-0001|UNIT:ROHSTOFFE-TECHNOLOGIE': [
    q('Welche Metalle stecken in den Permanentmagneten vieler Windkraftgeneratoren?', ['Neodym, Eisen und Bor, ergänzt durch Dysprosium', 'Nur Aluminium', 'Nur Kupfer', 'Gold'], 0, 'NdFeB-Magnete mit Seltenen Erden machen den Generator effizient.'),
    q('Wozu dienen Dysprosium und Terbium im Magneten?', ['Sie stabilisieren ihn bei hohen Betriebstemperaturen', 'Sie färben ihn', 'Sie machen ihn leichter', 'Sie schalten ihn ab'], 0, 'Ohne sie würde der Magnet bei Betriebstemperatur entmagnetisieren.'),
    q('Was bedeutet „sauber“ bei erneuerbaren Energien im Hinblick auf Rohstoffe?', ['Es bezieht sich auf den Betrieb, nicht auf die Herstellung', 'Die Herstellung ist ohne Rohstoffe möglich', 'Es gibt keinen Rohstoffbedarf', 'Die Anlagen bestehen nur aus Recyclingmaterial'], 0, 'Herstellung und Rohstoffgewinnung haben eigene Umweltfolgen.'),
  ],
};
