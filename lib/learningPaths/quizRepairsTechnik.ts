import { q, type QuizTriple } from './quizAuthoring';

/** Ersatz-Kurztests der Auto-, Pumpen- und Dehnungsmessstreifen-Module. Aufbau siehe quizRepairs.ts. */
export const technikQuizRepairs: Record<string, QuizTriple> = {
  'PATH:SSF:PHY-AUTO-BESCHLEUNIGUNG-0001|UNIT:AUTO-BESCHLEUNIGUNG-K1': [
    q('Auf Eis drehen die Antriebsräder durch. Was ist die Ursache?', ['Die Antriebskraft übersteigt die mögliche Haftkraft', 'Der Motor hat zu wenig Kraft', 'Die Räder sind zu schwer', 'Das Auto hat zu viel Haftung'], 0, 'Übertragbar ist nur so viel Kraft, wie die Haftung zwischen Reifen und Straße erlaubt.'),
    q('Wie kommt das Auto nach vorn, wenn die Räder gegen die Straße drücken?', ['Die Straße drückt mit gleicher Kraft zurück (actio = reactio)', 'Der Motor schiebt das Auto direkt', 'Die Luft zieht das Auto', 'Die Schwerkraft schiebt es'], 0, 'Die Räder drücken nach hinten, die Reaktionskraft der Straße treibt das Auto an.'),
    q('Beim starken Beschleunigen verlagert sich das Gewicht nach hinten. Welche Räder haben dann mehr Haftung?', ['Die Hinterräder', 'Die Vorderräder', 'Beide gleich', 'Keine'], 0, 'Mehr Gewicht auf einem Rad bedeutet mehr Anpresskraft und damit mehr Haftung.'),
  ],
  'PATH:SSF:PHY-AUTO-BESCHLEUNIGUNG-0001|UNIT:AUTO-BESCHLEUNIGUNG-K2': [
    q('Dieselbe Antriebskraft wirkt auf ein Auto mit doppelter Masse. Wie ändert sich die Beschleunigung?', ['Sie halbiert sich', 'Sie verdoppelt sich', 'Sie bleibt gleich', 'Sie vervierfacht sich'], 0, 'Aus F = m · a folgt a = F / m. Doppelte Masse heißt halbe Beschleunigung.'),
    q('Bei sehr hoher Drehzahl fällt das Drehmoment ab. Welche Folge hat das?', ['Man schaltet hoch, damit der Motor wieder im günstigen Bereich arbeitet', 'Man schaltet herunter', 'Man bremst', 'Es ändert sich nichts'], 0, 'Im mittleren Drehzahlbereich ist das Drehmoment am höchsten. Hochschalten bringt den Motor dorthin zurück.'),
    q('Warum wird ein Auto trotz Vollgas ab einer bestimmten Geschwindigkeit nicht mehr schneller?', ['Die Gegenkräfte wachsen, bis sie die Antriebskraft ausgleichen und die Beschleunigung null wird', 'Der Tank leert sich', 'Der Motor hört auf', 'Die Straße wird glatt'], 0, 'Bei Kräftegleichgewicht ist die Summe der Kräfte null und die Beschleunigung ebenfalls.'),
  ],
  'PATH:SSF:PHY-AUTO-MOTOR-0001|UNIT:AUTO-MOTOR-K1': [
    q('Nach der Fahrt ist die Motorhaube sehr heiß. Woher kommt die Wärme?', ['Aus der Verbrennung, deren Energie nur zum Teil in Bewegung umgesetzt wird', 'Aus der Sonne', 'Aus der Batterie', 'Aus der Bremse'], 0, 'Der größere Teil der Brennstoffenergie wird als Wärme frei.'),
    q('Im Modell werden 35 % der Verbrennungsenergie zu Bewegung. Wie viel von 100 kJ Brennstoffenergie werden dann nicht genutzt?', ['35 kJ', '65 kJ', '100 kJ', '0 kJ'], 1, '100 minus 35 sind 65 kJ. Sie gehen als Wärme an das Kühlsystem und in die Abgase.'),
    q('Warum ist der Auspuff so heiß?', ['Die Abgase verlassen den Zylinder noch mit hoher Temperatur', 'Er enthält eine Heizung', 'Er wird von der Sonne erwärmt', 'Er enthält Wasser'], 0, 'Etwa ein Drittel der Energie geht als Abgaswärme verloren.'),
  ],
  'PATH:SSF:PHY-AUTO-MOTOR-0001|UNIT:AUTO-MOTOR-K2': [
    q('Welche Aufgabe hat das Kühlwasser im Motor?', ['Es transportiert Wärme vom Motorblock zum Kühler', 'Es treibt den Kolben an', 'Es schmiert die Zylinder', 'Es verbrennt mit dem Benzin'], 0, 'Dort geben die Kühlerlamellen die Wärme an die Luft ab.'),
    q('Was macht der Thermostat?', ['Er öffnet den Kreislauf zum Kühler, wenn das Wasser warm genug ist', 'Er erhitzt das Wasser', 'Er misst nur den Druck', 'Er pumpt das Wasser'], 0, 'So erreicht der Motor schnell Betriebstemperatur und wird dann nicht zu heiß.'),
    q('Warum enthält das Kühlwasser Frostschutz?', ['Damit es im Winter nicht gefriert', 'Damit es besser brennt', 'Damit es schwerer wird', 'Damit es stärker verdunstet'], 0, 'Gefrierendes Wasser dehnt sich aus und kann den Motor beschädigen.'),
  ],
  'PATH:SSF:PHY-AUTO-KOLBEN-0001|UNIT:AUTO-KOLBEN-K1': [
    q('Wie wird die Auf-und-ab-Bewegung des Kolbens zur Drehung?', ['Über Pleuelstange und Kurbelwelle', 'Über den Auspuff', 'Über den Tank', 'Über das Kühlwasser'], 0, 'Die Pleuelstange überträgt die lineare Bewegung auf die Kurbelwelle, die sich dreht.'),
    q('Welche Reihenfolge haben die vier Takte?', ['Ansaugen, Verdichten, Arbeiten, Ausstoßen', 'Verdichten, Ansaugen, Ausstoßen, Arbeiten', 'Arbeiten, Ansaugen, Verdichten, Ausstoßen', 'Ausstoßen, Arbeiten, Verdichten, Ansaugen'], 0, 'Erst wird Gemisch angesaugt und verdichtet, dann gezündet, am Ende werden die Abgase ausgestoßen.'),
    q('Der Kolben steht bei Kurbelwinkel 0° oben. Wo steht er bei 180°?', ['Unten', 'Oben', 'In der Mitte, aufsteigend', 'Er steht still'], 0, 'Bei einer halben Kurbelwellenumdrehung ist der Kolben am unteren Totpunkt.'),
  ],
  'PATH:SSF:PHY-AUTO-KOLBEN-0001|UNIT:AUTO-KOLBEN-K2': [
    q('Der Verbrennungsdruck beträgt 100 bar, die Kolbenfläche 10 cm². Wie groß ist die Kraft ungefähr? (1 bar entspricht 10 N pro cm².)', ['1 kN', '10 kN', '100 kN', '1000 kN'], 1, '100 bar sind 1000 N/cm², mal 10 cm² ergibt 10 000 N, also etwa 10 kN.'),
    q('Wozu dienen die Kolbenringe?', ['Sie dichten den Kolben gegen die Zylinderwand ab', 'Sie kühlen den Kolben', 'Sie zünden das Gemisch', 'Sie treiben die Kurbelwelle an'], 0, 'Ohne Abdichtung würde Verbrennungsgas am Kolben vorbeiströmen.'),
    q('Was passiert, wenn das Öl im Zylinder fehlt?', ['Der Kolben läuft heiß und frisst sich fest', 'Der Motor läuft leiser', 'Der Verbrennungsdruck sinkt auf null', 'Nichts'], 0, 'Öl schmiert die Zylinderwand. Ohne Schmierung entsteht hohe Reibung und der Kolben klemmt.'),
  ],
  'PATH:SSF:PHY-AUTO-BATTERIE-0001|UNIT:BATTERIE-WARM-KALT': [
    q('Welche zwei Effekte bestimmen die Temperatur einer Batterie im Betrieb?', ['Reibungswärme und Entropiewärme', 'Nur Sonneneinstrahlung', 'Nur Wind', 'Nur die Gehäuseform'], 0, 'Reibungswärme entsteht immer, die Entropie gibt beim Laden Wärme ab und nimmt sie beim Entladen auf.'),
    q('Warum kann sich eine Zelle bei langsamer Entladung (0,5C) leicht abkühlen?', ['Die Entropie nimmt mehr Wärme auf, als die Reibung erzeugt', 'Das Gehäuse ist kalt', 'Die Zelle strahlt Kälte ab', 'Die Chemie kehrt sich um'], 0, 'Bei kleinem Strom ist die Reibungswärme gering. Dann überwiegt der kühlende Entropieeffekt.'),
    q('Warum wird die Zelle bei schnellem Laden (2C) warm?', ['Die Reibungswärme wächst mit dem Strom und die Entropie gibt zusätzlich Wärme ab', 'Die Zelle wird kalt', 'Die Ionen bewegen sich nicht', 'Das Netzteil strahlt'], 0, 'Beim Laden addieren sich beide Wärmequellen.'),
  ],
  'PATH:SSF:PHY-AUTO-BATTERIE-0001|UNIT:BATTERIE-MECHANISMUS': [
    q('Der Strom durch eine Zelle wird verdoppelt. Wie ändert sich die Reibungswärme (I² · R)?', ['Sie vervierfacht sich', 'Sie verdoppelt sich', 'Sie bleibt gleich', 'Sie halbiert sich'], 0, 'Die Wärme wächst mit dem Quadrat des Stroms.'),
    q('Wie verhält sich die Entropiewärme beim Laden und Entladen?', ['Sie wird beim Laden abgegeben und beim Entladen aufgenommen', 'Sie wird immer abgegeben', 'Sie wird immer aufgenommen', 'Sie ist stets null'], 0, 'Ionen ordnen sich beim Laden um und geben Wärme ab, beim Entladen nehmen sie Wärme auf.'),
    q('Welche Wärmequelle ist immer positiv, also erwärmt die Zelle in jedem Betrieb?', ['Die Reibungswärme', 'Die Entropiewärme', 'Beide', 'Keine'], 0, 'Elektronen stoßen immer auf Widerstand. Das erzeugt Wärme, mehr bei höherem Strom.'),
  ],
  'PATH:SSF:PHY-PUMPE-WASSER-0001|UNIT:PUMPE-KOLBEN-K1': [
    q('Du ziehst den Kolben einer Spritze zurück. Warum strömt Wasser hinein?', ['Es entsteht Unterdruck und der Außendruck drückt das Wasser hinein', 'Der Kolben zieht das Wasser magnetisch an', 'Das Wasser fällt von selbst', 'Die Spritze erwärmt das Wasser'], 0, 'Der äußere Luftdruck presst das Wasser in den Raum mit niedrigerem Druck.'),
    q('Wozu braucht eine Kolbenpumpe zwei Ventile?', ['Damit das Wasser nur in einer Richtung fließt', 'Damit sie leiser wird', 'Damit sie wärmer wird', 'Damit sie schneller dreht'], 0, 'Ein Ventil öffnet beim Saugen, das andere beim Drücken. Ohne sie fließt das Wasser hin und her.'),
    q('Bei einem Unterdruck von 0,5 bar wird Wasser etwa wie hoch gesaugt? (10 m entsprechen 1 bar.)', ['0,5 m', '5 m', '10 m', '50 m'], 1, 'Die Saughöhe ist proportional zum Unterdruck, also halber Druck gleich 5 m.'),
  ],
  'PATH:SSF:PHY-PUMPE-WASSER-0001|UNIT:PUMPE-KOLBEN-K2': [
    q('Ein Brunnen ist 15 m tief. Was gilt für eine Saugpumpe an der Oberfläche?', ['Sie kann das Wasser nicht mehr ansaugen, man braucht eine Pumpe im Wasser', 'Sie schafft es mit mehr Kraft', 'Sie schafft es nur nachts', 'Sie schafft es mit warmem Wasser'], 0, 'Der Luftdruck von 1 bar trägt eine Wassersäule von etwa 10 m. Tiefer geht es nicht.'),
    q('Warum kann man nicht einfach stärker ziehen, um tiefer zu saugen?', ['Selbst ein perfektes Vakuum liefert nur den Außendruck von 1 bar, der das Wasser etwa 10 m hoch drückt', 'Handpumpen sind zu kurz', 'Wasser ist zu schwer', 'Das Vakuum zieht schneller'], 0, 'Nicht die Pumpe zieht das Wasser hoch, sondern der Luftdruck drückt es.'),
    q('Welcher Druck entspricht einer 10 m hohen Wassersäule?', ['Etwa 1 bar', 'Etwa 0,1 bar', 'Etwa 10 bar', 'Etwa 100 bar'], 0, 'Der Atmosphärendruck entspricht etwa einer Wassersäule von 10 m.'),
  ],
  'PATH:SSF:PHY-PUMPE-WASSER-0001|UNIT:PUMPE-ZENTRIFUGAL-K1': [
    q('Wie fördert eine Kreiselpumpe das Wasser?', ['Ein Laufrad beschleunigt es nach außen, dort entsteht Druck', 'Ein Kolben schiebt es', 'Ein Magnet zieht es', 'Die Schwerkraft zieht es'], 0, 'Durch die Fliehkraft entsteht außen Druck, am Einlass ein Unterdruck, der neues Wasser nachsaugt.'),
    q('Was passiert bei höherer Drehzahl?', ['Der Druck steigt', 'Der Druck sinkt', 'Nichts', 'Die Pumpe saugt Luft'], 0, 'Schneller drehendes Laufrad beschleunigt das Wasser stärker.'),
    q('Welcher Zusammenhang gilt für die Kennlinie einer Kreiselpumpe?', ['Je höher die Förderhöhe, desto geringer die Fördermenge', 'Je höher die Förderhöhe, desto größer die Fördermenge', 'Beide sind unabhängig', 'Die Fördermenge ist immer null'], 0, 'Gegen einen höheren Druck schafft die Pumpe weniger Liter pro Minute.'),
  ],
  'PATH:SSF:PHY-AUTO-BREMSE-0001|UNIT:AUTO-BREMSE-K1': [
    q('Wohin geht die Bewegungsenergie beim Bremsen?', ['In Wärme durch Reibung an der Bremsscheibe', 'In Licht', 'In Kraftstoff', 'Sie verschwindet'], 0, 'Reibung wandelt Bewegungsenergie in Wärme um. Deshalb werden Bremsscheiben heiß.'),
    q('Die Geschwindigkeit verdoppelt sich. Wie ändert sich die Bewegungsenergie?', ['Sie vervierfacht sich', 'Sie verdoppelt sich', 'Sie bleibt gleich', 'Sie halbiert sich'], 0, 'Die kinetische Energie wächst mit dem Quadrat der Geschwindigkeit.'),
    q('Warum glühen Bremsscheiben von Rennwagen nach scharfen Bremsungen?', ['Sehr viel Bewegungsenergie wird in kurzer Zeit in Wärme umgewandelt', 'Sie sind aus glühendem Material', 'Sie bekommen Strom', 'Der Motor heizt sie'], 0, 'Bei hoher Geschwindigkeit muss die Bremse sehr viel Energie in wenigen Sekunden aufnehmen.'),
  ],
  'PATH:SSF:PHY-AUTO-BREMSE-0001|UNIT:AUTO-BREMSE-K2': [
    q('Was verursacht Bremsquietschen?', ['Vibrationen, wenn die Beläge auf der Scheibe rutschen statt gleichmäßig zu gleiten', 'Zu viel Bremsflüssigkeit', 'Ein zu leichter Wagen', 'Zu kalte Luft'], 0, 'Das ruckartige Gleiten regt Schwingungen an, die man als Ton hört.'),
    q('Welche Zustände fördern das Quietschen?', ['Verschlissene Beläge oder Schmutz zwischen Belag und Scheibe', 'Neue, saubere Beläge', 'Nur hohe Geschwindigkeit', 'Ein voller Tank'], 0, 'Der Zustand der Reibfläche entscheidet, ob das Gleiten gleichmäßig ist.'),
    q('Ein Auto quietscht beim Bremsen, ein anderes nicht. Was ist die wahrscheinlichste Erklärung?', ['Der Zustand der Bremsen, nicht allein die Qualität', 'Das eine Auto ist schwerer', 'Das eine hat mehr Benzin', 'Beide bremsen gleich'], 0, 'Neue oder gut gewartete Bremsen quietschen fast nie.'),
  ],
  'PATH:SSF:CHE-AUTO-VERBRENNUNG-0001|UNIT:AUTO-VERBRENNUNG-K1': [
    q('Welche Hauptprodukte entstehen bei der vollständigen Verbrennung von Benzin?', ['CO₂ und H₂O', 'Nur CO', 'Nur Sauerstoff', 'Methan'], 0, 'C₈H₁₈ + 12,5 O₂ ergibt 8 CO₂ + 9 H₂O und Wärme.'),
    q('Wie viele CO₂-Moleküle entstehen bei der Verbrennung eines C₈H₁₈-Moleküls?', ['4', '8', '9', '12,5'], 1, 'Jedes der acht Kohlenstoffatome wird zu einem CO₂-Molekül.'),
    q('Warum sieht man im Winter Wasserdampf am Auspuff, im Sommer kaum?', ['Der Wasserdampf kondensiert in kalter Luft zu sichtbaren Tröpfchen', 'Im Sommer entsteht kein Wasser', 'Im Winter wird mehr Benzin verbrannt', 'Der Auspuff friert zu'], 0, 'Bei der Verbrennung entsteht immer Wasser. Sichtbar wird es erst, wenn es kondensiert.'),
  ],
  'PATH:SSF:CHE-AUTO-VERBRENNUNG-0001|UNIT:AUTO-VERBRENNUNG-K2': [
    q('Welche giftigen Nebenprodukte entstehen bei der Verbrennung?', ['Kohlenmonoxid, Stickoxide und unverbrannte Kohlenwasserstoffe', 'Nur Wasser', 'Nur Sauerstoff', 'Nur Edelgase'], 0, 'Unvollständige Verbrennung und hohe Temperaturen erzeugen Schadstoffe neben CO₂ und Wasser.'),
    q('Was macht der Katalysator mit CO und NOx?', ['Er wandelt CO zu CO₂ und NOx zu N₂ um', 'Er speichert sie dauerhaft', 'Er verdoppelt sie', 'Er erzeugt daraus Benzin'], 0, 'Auch unverbrannte Kohlenwasserstoffe werden zu CO₂ und Wasser umgesetzt.'),
    q('Ein altes Auto riecht stechend nach Abgasen. Was ist wahrscheinlich?', ['Der Katalysator ist defekt und wandelt die Schadstoffe nicht mehr um', 'Der Tank ist voll', 'Der Reifendruck ist zu hoch', 'Die Batterie ist leer'], 0, 'Ein intakter Katalysator senkt die Schadstoffkonzentration stark.'),
  ],
  'PATH:SSF:PHY-AUTO-DIFFERENTIAL-0001|UNIT:AUTO-DIFFERENTIAL-K1': [
    q('In einer Kurve legt das äußere Rad einen weiteren Weg zurück. Was folgt für die Drehzahlen?', ['Das äußere Rad dreht schneller als das innere', 'Beide drehen gleich schnell', 'Das innere dreht schneller', 'Beide stehen still'], 0, 'Ein größerer Weg in derselben Zeit verlangt mehr Umdrehungen.'),
    q('Was geschieht ohne Differential in einer Kurve?', ['Die Räder müssen gleich schnell drehen, die Reifen verspannen oder quietschen', 'Das Auto fährt schneller', 'Das Auto bremst von selbst', 'Nichts'], 0, 'Eine starre Achse zwingt beide Räder zu gleicher Drehzahl.'),
    q('Wie verhalten sich die Raddrehzahlen bei Geradeausfahrt?', ['Beide Räder drehen gleich schnell', 'Das linke dreht schneller', 'Das rechte dreht schneller', 'Sie drehen entgegengesetzt'], 0, 'Auf gerader Strecke legen beide Räder den gleichen Weg zurück.'),
  ],
  'PATH:SSF:PHY-AUTO-DIFFERENTIAL-0001|UNIT:AUTO-DIFFERENTIAL-K2': [
    q('Wie verhalten sich Planetenräder bei Geradeausfahrt?', ['Alle Räder drehen gleich schnell, die Planetenräder drehen nicht um ihre eigene Achse', 'Sie drehen schneller', 'Sie stehen vollständig still und das Auto steht', 'Sie lösen sich'], 0, 'Beide Achshälften bewegen sich gleich, daher ist kein Ausgleich nötig.'),
    q('Was tun die Planetenräder in der Kurve?', ['Sie rotieren und gleichen die Drehzahlunterschiede aus', 'Sie stoppen den Motor', 'Sie bremsen beide Räder', 'Sie heizen das Öl'], 0, 'Sie verteilen die Bewegung so, dass das äußere Rad schneller drehen kann.'),
    q('Ein Heulen oder Knacken unter dem Auto kommt von einem defekten Differential. Was ist die Funktion dieser Mechanik?', ['Sie verteilt die Antriebsbewegung auf beide Räder und lässt unterschiedliche Drehzahlen zu', 'Sie kühlt den Motor', 'Sie erzeugt Strom', 'Sie lenkt das Auto'], 0, 'Tellerrad und Kegelrad leiten die Antriebsbewegung auf die Achse. Sonnen- und Planetenräder verteilen sie.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-WAERME': [
    q('Eine 100 m lange Stahlschiene (α = 12 µm pro m und K) erwärmt sich um 40 K. Wie viel dehnt sie sich?', ['4,8 mm', '48 mm', '480 mm', '4,8 m'], 1, 'ΔL = α · L₀ · ΔT = 12·10⁻⁶ · 100 · 40 m = 0,048 m, also 48 mm.'),
    q('Warum haben Eisenbahnschienen Dehnungsfugen?', ['Die Schienen dehnen sich bei Wärme aus und brauchen Platz', 'Zur Entwässerung', 'Zur Schalldämmung', 'Zur Farbgebung'], 0, 'Ohne Fugen entstünden bei Hitze große Druckspannungen.'),
    q('Für Präzisionsteile wird Invar verwendet. Warum?', ['Es hat einen sehr kleinen Ausdehnungskoeffizienten', 'Es ist besonders leicht', 'Es dehnt sich stark aus', 'Es ist ein Gas'], 0, 'Bei Temperaturschwankungen ändert sich seine Länge kaum.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-SPANNUNG': [
    q('Eine Kraft von 1000 N wirkt auf einen Stab mit 2 mm² Querschnitt. Wie groß ist die Spannung?', ['50 N/mm²', '500 N/mm²', '2000 N/mm²', '2 N/mm²'], 1, 'σ = F / A = 1000 N / 2 mm² = 500 N/mm², also 500 MPa.'),
    q('Warum reißt ein dünner Draht unter derselben Kraft, ein dicker Stab nicht?', ['Die Spannung ist im Draht höher, weil die Fläche kleiner ist', 'Der Draht ist leichter', 'Die Kraft ist kleiner', 'Der Stab ist wärmer'], 0, 'Spannung ist Kraft pro Fläche. Nicht die Kraft allein entscheidet.'),
    q('Der Durchmesser eines runden Stabes wird verdoppelt, die Kraft bleibt gleich. Wie ändert sich die Spannung?', ['Sie sinkt auf ein Viertel', 'Sie halbiert sich', 'Sie verdoppelt sich', 'Sie bleibt gleich'], 0, 'Die Fläche wächst mit dem Quadrat des Durchmessers, also um den Faktor vier.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-DEHNUNG': [
    q('Ein 2 m langer Stab hat die Dehnung ε = 0,001. Um wie viel wird er länger?', ['0,2 mm', '2 mm', '20 mm', '2 m'], 1, 'ΔL = ε · L₀ = 0,001 · 2000 mm = 2 mm.'),
    q('Stahl hat einen E-Modul von etwa 210 000 N/mm². Welche Spannung gehört zur Dehnung ε = 0,001?', ['21 N/mm²', '210 N/mm²', '2100 N/mm²', '0,21 N/mm²'], 1, 'σ = E · ε = 210 000 · 0,001 = 210 N/mm².'),
    q('Was geschieht oberhalb der Streckgrenze?', ['Die Verformung bleibt teilweise bestehen', 'Das Material wird wieder unverformt', 'Es wird kalt', 'Es wird magnetisch'], 0, 'Unterhalb gilt das Hookesche Gesetz elastisch, darüber verformt sich das Material bleibend.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-QUERKONTRAKTION': [
    q('Ein Stab mit ν = 0,3 wird um ε = 0,001 gedehnt. Wie groß ist die Querdehnung?', ['+0,0003', '−0,0003', '−0,003', '0'], 1, 'ε_q = −ν · ε_l = −0,3 · 0,001. Der Stab wird dünner.'),
    q('Warum wird ein gedehnter Radiergummi dünner?', ['Das Volumen bleibt näherungsweise erhalten', 'Er verliert Material', 'Er kühlt ab', 'Er wird schwerer'], 0, 'Wird er länger, muss der Querschnitt kleiner werden.'),
    q('Was beschreibt die Poisson-Zahl?', ['Das Verhältnis von Querdehnung zu Längsdehnung', 'Die Dichte', 'Die Härte', 'Die Wärmeleitung'], 0, 'Für Stahl liegt sie bei etwa 0,3.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-PRINZIP': [
    q('Ein DMS mit k = 2 erfährt die Dehnung 1000 µε (ε = 0,001). Wie groß ist ΔR/R₀?', ['0,02 %', '0,2 %', '2 %', '20 %'], 1, 'ΔR/R₀ = k · ε = 2 · 0,001 = 0,002, also 0,2 %.'),
    q('Welche Größe wird beim DMS direkt gemessen?', ['Die Änderung des elektrischen Widerstands', 'Die Temperatur', 'Die Masse', 'Die Lichtstärke'], 0, 'Der Widerstand ändert sich proportional zur Dehnung des Bauteils, auf dem der DMS klebt.'),
    q('Warum ist die Widerstandsänderung so klein?', ['Die Dehnungen sind sehr klein', 'Der DMS ist defekt', 'Der Widerstand sinkt auf null', 'Der Messstrom ist zu groß'], 0, 'Typische Dehnungen liegen bei Bruchteilen eines Promille. Deshalb braucht man eine empfindliche Schaltung.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-BRUECKE': [
    q('Wozu dient die Wheatstone-Brücke beim DMS?', ['Sie wandelt eine winzige Widerstandsänderung in eine messbare Spannung um', 'Sie erzeugt Dehnung', 'Sie erhitzt das Bauteil', 'Sie speichert Energie'], 0, 'Die Brückenspannung ist proportional zur Verstimmung.'),
    q('Welche Schaltung gleicht Temperatureinflüsse besser aus?', ['Die Halbbrücke, bei der Temperaturänderungen in beiden Zweigen gleich wirken', 'Die Viertelbrücke', 'Keine', 'Eine Brücke ohne Widerstände'], 0, 'In der Viertelbrücke driftet das Signal mit der Temperatur, in der Halbbrücke bleibt es stabil.'),
    q('Warum ist Temperaturkompensation wichtig?', ['Temperaturänderung verändert den Widerstand ähnlich wie Dehnung und würde das Ergebnis verfälschen', 'Temperatur beeinflusst den DMS nie', 'Sie macht den DMS teurer', 'Sie ändert die Dehnung'], 0, 'Ohne Kompensation wird Wärme als scheinbare Dehnung gemessen.'),
  ],
  'PATH:SSF:ENG-DMS-0001|UNIT:DMS-ROSETTE': [
    q('Wie sind die drei DMS einer Rosette angeordnet?', ['Bei 0°, 45° und 90°', 'Alle bei 0°', 'Bei 0°, 10° und 20°', 'Bei 0°, 180° und 360°'], 0, 'Diese Winkel liefern drei unabhängige Dehnungsmessungen.'),
    q('Warum genügt ein einzelner DMS nicht, wenn die Hauptrichtungen unbekannt sind?', ['Es gibt drei Unbekannte: zwei Hauptspannungen und ihre Richtung', 'Ein DMS misst nichts', 'Er ist zu teuer', 'Er misst nur Temperatur'], 0, 'Drei Unbekannte brauchen drei Messungen.'),
    q('Wozu dient der Mohrsche Spannungskreis?', ['Er verbindet die Messwerte mit den Hauptspannungen und ihrer Richtung', 'Er misst Temperatur', 'Er erzeugt Dehnung', 'Er zeigt die Dichte'], 0, 'Aus den drei Dehnungen berechnet man σ₁, σ₂ und den Winkel.'),
  ],
};
