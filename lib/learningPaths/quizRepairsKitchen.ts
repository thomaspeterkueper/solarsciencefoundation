import { q, type QuizTriple } from './quizAuthoring';

/** Ersatz-Kurztests der Küchen- und Reinigungsmodule. Aufbau siehe quizRepairs.ts. */
export const kitchenQuizRepairs: Record<string, QuizTriple> = {
  'PATH:SSF:CHE-KUECHE-KARAMELL-0001|UNIT:CHE-KARAMELL:EVENTS': [
    q('Für Saccharose wird bei 1 °C/min ein DSC-Onset von 184,5 °C berichtet. Wie ist die Zahl einzuordnen?', ['Als Ereignis dieser Probe bei dieser Heizrate, nicht als universelle Karamellisierungstemperatur', 'Als fester Schmelzpunkt, der immer gilt', 'Als Temperatur, bei der jeder Zucker verbrennt', 'Als Beweis, dass Karamell erst darüber entsteht'], 0, 'Thermische Ereignisse verschieben sich mit Probe und Heizrate. Ein Messwert braucht seinen Kontext.'),
    q('Warum gibt es keine „magische 160-°C-Grenze“ der Karamellisierung?', ['Der Reaktionsfortschritt hängt von Temperatur und Zeit gemeinsam ab', 'Zucker reagiert erst oberhalb von 200 °C', 'Karamell braucht immer Wasser', 'Die Temperatur spielt keine Rolle'], 0, 'Bei niedrigerer Temperatur läuft die Reaktion langsamer, aber über längere Zeit ebenfalls ab. Eine feste Schwelle gibt es nicht.'),
    q('Welche drei Vorgänge beim Erhitzen von Zucker sind auseinanderzuhalten?', ['Verlust der Kristallstruktur, thermische Zersetzung und Bräunungsreaktionen', 'Nur Verdunsten, Kondensieren und Gefrieren', 'Nur Schmelzen, Sieden und Verdampfen', 'Lösen, Fällen und Filtern'], 0, 'Ein DSC-Ereignis beim Verlust der Kristallstruktur ist nicht automatisch Zersetzung oder sichtbare Bräunung.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001|UNIT:ROTWEIN-CHEMIE': [
    q('Welche Stoffgruppe prägt die Farbe von Rotwein wesentlich?', ['Anthocyane und weitere Polyphenole', 'Chlorophyll', 'Eiweiße', 'Carbonate'], 0, 'Die Rotweinfarbe kommt im Kern von Polyphenolen. Das bestimmt, welche Reinigungschemie passt.'),
    q('Woraus besteht Baumwolle überwiegend?', ['Aus Cellulose, nicht aus Protein', 'Aus Keratin', 'Aus Kollagen', 'Aus Kalk'], 0, 'Baumwolle ist ein Cellulose-Substrat. Eine Proteinvernetzung zwischen Wein und Faser passt dazu nicht.'),
    q('Rotwein, Blut und Fruchtsaft hinterlassen ähnlich auffällige Flecken. Was folgt daraus für die Reinigung?', ['Gleiche Farbe bedeutet nicht gleiche Chemie, der Mechanismus muss je Fleck geklärt werden', 'Alle Flecken lassen sich gleich behandeln', 'Nur Blut ist ein echter Fleck', 'Das Aussehen verrät den Mechanismus sicher'], 0, 'Rotwein folgt einem Polyphenol-/Cellulose-Modell, Blut einem Protein-Modell. Das Aussehen allein unterscheidet sie nicht.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-KALK-0001|UNIT:KALK:IDENTIFY': [
    q('Ein weißer Belag am Wasserhahn besteht überwiegend aus Calciumcarbonat. Welche Chemie ist für das Entkalken relevant?', ['Die Reaktion von Säure mit Carbonat', 'Die Wirkung von Tensiden auf Fett', 'Die Oxidation von Farbstoffen', 'Die Verdunstung von Wasser'], 0, 'Säuren übertragen Protonen auf Carbonat und lösen es auf. Das ist das Modell hinter dem Entkalken.'),
    q('Warum hilft Säure nicht gegen einen Fettfilm?', ['Fett ist kein Carbonat, für Fett passen Polarität und Tenside', 'Säure ist zu schwach', 'Fett löst sich in Säure nicht auf, weil es zu heiß ist', 'Fett ist ein Salz'], 0, 'Fettfilme werden nicht durch Protonenübertragung gelöst, sondern durch Tenside, die zwischen Wasser und Fett vermitteln.'),
    q('Warum sollte man vor dem Reinigen klären, was der Belag ist?', ['Ein Mittel wirkt nur, wenn mit dem konkreten Stoff eine passende Reaktion oder Wechselwirkung möglich ist', 'Weil jedes Mittel gegen jeden Schmutz wirkt', 'Weil Beläge immer gleich aufgebaut sind', 'Weil es keinen Unterschied macht'], 0, 'Reiniger wirken nicht gegen „Schmutz“ allgemein. Entscheidend sind Material und mögliche Reaktion.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-CHLOR-0001|UNIT:CHLOR:BLEACH': [
    q('Ein Farbstoff wird nach Kontakt mit einem Hypochlorit-Bleichmittel blasser. Was ist damit zunächst belegt?', ['Seine Lichtabsorption hat sich verändert', 'Der Stoff wurde restlos entfernt', 'Er wurde in Wasser umgewandelt', 'Nichts'], 0, 'Sichtbar wird nur, dass sich die Absorption geändert hat. Ob der Stoff entfernt wurde, ist damit nicht gezeigt.'),
    q('Was ist ein Chromophor im vereinfachten Modell?', ['Eine Molekülstruktur, die sichtbares Licht absorbiert und so zur Farbe beiträgt', 'Ein Bleichmittel', 'Ein Salz', 'Ein Tensid'], 0, 'Oxidierende Bleichmittel können solche Strukturen verändern, sodass das Licht anders absorbiert wird.'),
    q('Warum ist „gebleicht“ nicht dasselbe wie „entfernt“?', ['Der Stoff kann nach der Reaktion noch vorhanden sein, nur seine Farbstruktur ist verändert', 'Bleichen löscht Stoffe immer vollständig', 'Entfernen heißt immer Aufhellen', 'Beides bedeutet dasselbe'], 0, 'Das Modell beschreibt die Veränderung von Chromophoren, nicht das Verschwinden des Stoffes.'),
  ],
  'PATH:SSF:CHE-KUECHE-MAILLARD-0001|UNIT:KUECHE-MAILLARD-K1': [
    q('Beim Toasten reagieren welche beiden Stoffgruppen miteinander?', ['Aminosäuren und reduzierende Zucker', 'Fette und Salze', 'Wasser und Stärke allein', 'Säuren und Basen'], 0, 'Die Maillard-Reaktion braucht beide. Daraus entstehen Melanoidine als braune Farbstoffe und viele Aromastoffe.'),
    q('Warum bräunt Laugengebäck besonders kräftig?', ['Alkalische Bedingungen beschleunigen die Maillard-Reaktion', 'Lauge enthält Zucker', 'Lauge senkt die Temperatur', 'Saure Bedingungen beschleunigen sie'], 0, 'Der pH-Wert beeinflusst die Reaktionsgeschwindigkeit: sauer bremst, alkalisch beschleunigt.'),
    q('Warum beginnt kräftige Bräunung oft erst, wenn die Oberfläche abgetrocknet ist?', ['Solange Wasser verdampft, bleibt die Oberfläche nahe dem Siedepunkt, sichtbare Bräunung braucht deutlich mehr als 100 °C', 'Wasser verhindert jede Reaktion bei jeder Temperatur', 'Trockene Oberflächen enthalten mehr Zucker', 'Die Reaktion läuft nur bei Dunkelheit'], 0, 'Verdunstendes Wasser hält die Oberflächentemperatur bei rund 100 °C. Sichtbare Maillard-Bräunung wird ab etwa 140 °C deutlich.'),
  ],
  'PATH:SSF:CHE-KUECHE-MAILLARD-0001|UNIT:KUECHE-MAILLARD-K2': [
    q('Fleisch im Wasser bleibt außen blass, in der heißen Pfanne bildet es eine Kruste. Warum?', ['Eine nasse Oberfläche bleibt bei etwa 100 °C, die trockene Pfanne erreicht höhere Temperaturen', 'Wasser entfernt alle Aminosäuren', 'Fleisch enthält in der Pfanne mehr Zucker', 'Die Pfanne erzeugt Aromastoffe von selbst'], 0, 'Nicht das Lebensmittel ist anders, sondern die Bedingungen an seiner Oberfläche.'),
    q('Woher kommen die neuen Röstaromen?', ['Aus einem Reaktionsnetz, in dem Aminosäuren und Zucker viele neue Moleküle bilden', 'Aus verdampftem Wasser', 'Aus Fett allein', 'Aus der Pfanne'], 0, 'Über viele Zwischenschritte entstehen flüchtige Aromamoleküle und braune Farbstoffe.'),
    q('Pommes werden vor dem Frittieren trockengetupft. Welchen Zweck hat das aus Sicht der Maillard-Chemie?', ['Weniger Oberflächenwasser, die Oberfläche kann schneller über 100 °C steigen und bräunen', 'Das Wasser würde den Zucker lösen und entfernen', 'Trockene Kartoffeln enthalten mehr Aminosäuren', 'Es verhindert Aroma'], 0, 'Wasser an der Oberfläche begrenzt die Temperatur. Trockene Oberflächen bräunen schneller.'),
  ],
  'PATH:SSF:CHE-KUECHE-MAILLARD-0001|UNIT:KUECHE-MAILLARD-K3': [
    q('Reiner Zucker wird beim Erhitzen braun. Welcher Prozess ist das?', ['Karamellisierung, die thermische Umwandlung von Zucker allein', 'Maillard-Reaktion', 'Gärung', 'Osmose'], 0, 'Ohne Aminosäuren läuft nur die Karamellisierung ab.'),
    q('Ein Keks wird goldbraun. Welche Zutaten ermöglichen dort die Maillard-Reaktion?', ['Zucker zusammen mit Aminosäuren aus Proteinen', 'Nur Zucker', 'Nur Fett', 'Nur Wasser'], 0, 'Maillard braucht reduzierende Zucker und Aminosäuren.'),
    q('Warum riechen Karamell und Keks trotz ähnlicher Farbe verschieden?', ['Die Reaktionswege sind verschieden und liefern andere Aromastoffe', 'Die Farbe bestimmt den Geruch', 'Beide enthalten dieselben Moleküle', 'Der Keks ist feuchter'], 0, 'Gleiche Farbe bedeutet nicht gleiche Chemie. Das Reaktionsnetz der Maillard-Reaktion ist breiter.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001|UNIT:TENSIDE-PROBLEM': [
    q('Du spülst einen fettigen Teller nur mit Wasser. Warum bleibt das Fett?', ['Wasser ist polar, Fett unpolar, beide mischen sich nicht', 'Das Wasser ist zu kalt', 'Fett ist schwerer als Wasser', 'Fett löst sich nur in Luft'], 0, 'Polare Moleküle ziehen einander an. Unpolares Fett bleibt dabei außen vor.'),
    q('Welche Kräfte erklären, warum sich Wasser und Öl nicht mischen?', ['Wassermoleküle ziehen einander stärker an als sie Ölmoleküle anziehen und bleiben beieinander', 'Beide stoßen sich elektrisch ab, weil Öl geladen ist', 'Öl ist schwerer', 'Wasser zersetzt Öl'], 0, 'Ungleiche Moleküle bleiben getrennt, weil die Anziehung unter gleichen Molekülen überwiegt.'),
    q('Warum löst Benzin Fett, Wasser aber nicht?', ['Benzin ist wie Fett unpolar, gleiches löst sich in Gleichem', 'Benzin ist wärmer', 'Benzin ist ein Tensid', 'Fett löst sich nur in Salz'], 0, 'Unpolare Stoffe mischen sich mit unpolaren. Mit polarem Wasser nicht.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001|UNIT:TENSIDE-LOESUNG': [
    q('Wie ist ein Tensid-Molekül aufgebaut?', ['Mit einem wasserliebenden Kopf und einem fettliebenden Schwanz', 'Mit zwei wasserliebenden Köpfen', 'Als reiner Fettstoff', 'Als einzelnes Ion'], 0, 'Der hydrophile Kopf geht zum Wasser, der hydrophobe Schwanz zum Fett.'),
    q('Was bilden Tenside ab der kritischen Mizellenkonzentration?', ['Mizellen, in denen die Schwänze nach innen zeigen', 'Kristalle', 'Gase', 'Salzlösungen'], 0, 'Ab dieser Konzentration lagern sich Tensidmoleküle selbstständig zu Mizellen zusammen.'),
    q('Warum wäscht Spülmittel Fett vom Teller?', ['Die Schwänze lagern sich ans Fett, die Köpfe zeigen ins Wasser, das Fett wird in Mizellen weggespült', 'Es löst Fett in reines Wasser auf', 'Es erwärmt das Fett', 'Es verdampft das Fett'], 0, 'Das Tensid vermittelt zwischen Fett und Wasser und macht die Verbindung möglich.'),
  ],
  'PATH:SSF:PHY-REINIGUNG-OBERFLAECHEN-0001|UNIT:OBERFLAECHE-HAERTE': [
    q('Welches der Materialien kratzt Glas (Mohs 5,5)?', ['Fingernagel (2,5)', 'Münze (3,5)', 'Quarz (7)', 'Gips'], 2, 'Wer in der Mohs-Skala höher steht, kratzt alle darunter. Quarz steht über Glas.'),
    q('Was entscheidet, ob ein Material zerkratzt wird?', ['Die Härte beider Materialien im Vergleich, nicht allein die Kraft', 'Nur die Kraft beim Reiben', 'Die Farbe', 'Das Gewicht'], 0, 'Der Stahlschwamm zerkratzt ein weicheres Material, nicht aber ein härteres.'),
    q('Ein Staubkorn aus Quarz (Mohs 7) liegt in einem Putztuch und wird über Glas (5,5) gewischt. Was ist zu erwarten?', ['Feine Kratzer im Glas', 'Nichts', 'Das Korn wird zerstört', 'Das Glas wird poliert'], 0, 'Quarz ist härter als Glas. Auch kleinste Körner können Kratzer erzeugen.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-FENSTER-0001|UNIT:FENSTER-STREIFEN': [
    q('Du putzt ein Fenster in praller Sonne bei trockener Luft. Was passiert eher?', ['Wasser verdunstet schnell und hinterlässt Minerale als Schleier', 'Das Fenster wird besonders klar', 'Nichts bleibt zurück', 'Das Wasser kondensiert'], 0, 'Schnelle Verdunstung lässt gelöste Stoffe auf dem Glas zurück.'),
    q('Warum kann Zeitungspapier streifenfreie Fenster liefern?', ['Es nimmt Flüssigkeit schnell auf, bevor Streifen entstehen', 'Die Druckerfarbe poliert', 'Es enthält Tenside', 'Es macht das Glas wärmer'], 0, 'Der Film wird schnell aufgenommen, bevor die Oberflächenspannung ihn zu Tropfen und Streifen zusammenzieht.'),
    q('Warum hinterlässt Leitungswasser mehr Schleier als destilliertes Wasser?', ['Es enthält gelöste Minerale, die beim Verdunsten zurückbleiben', 'Es ist wärmer', 'Es verdunstet langsamer', 'Es enthält mehr Luft'], 0, 'Destilliertes Wasser lässt kaum Rückstand zurück.'),
  ],
  'PATH:SSF:PHY-REINIGUNG-FLIESEN-HOLZ-0001|UNIT:HOLZ-WASSER': [
    q('Parkett quillt nach einem Wasserschaden, obwohl es versiegelt ist. Was ist passiert?', ['Wasser ist in die Holzfasern eingedrungen und die Cellulose hat es aufgenommen', 'Das Holz hat Hitze aufgenommen', 'Die Versiegelung hat sich ausgedehnt', 'Das Holz hat Luft verloren'], 0, 'Holz nimmt Wasser auf und quillt. Versiegelung schützt nur begrenzt, besonders an Fugen und Kanten.'),
    q('Warum ist kurzes Feuchtwischen unproblematisch, stehende Nässe aber nicht?', ['Bei kurzer Feuchte dringt wenig Wasser ein, bei stehender Nässe quellen die Fasern und reißen', 'Kurz feuchtes Holz wird härter', 'Stehendes Wasser verdunstet nicht', 'Es gibt keinen Unterschied'], 0, 'Entscheidend ist die aufgenommene Wassermenge. Zu viel lässt die Fasern aufquellen und verformt das Holz.'),
    q('Wie reinigt man Holzböden schonend?', ['Nebelfeucht wischen und gleich trocknen lassen', 'Mit viel Wasser fluten', 'Nass stehen lassen', 'Mit Dampf behandeln'], 0, 'Wenig Wasser und schnelles Trocknen verhindern das Aufquellen.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-EMULSION-0001|UNIT:EMULSION-TRENNUNG': [
    q('Ein geschütteltes Dressing trennt sich wieder in Essig unten und Öl oben. Warum?', ['Das System hat mit kleinerer Grenzfläche weniger Energie und kehrt dorthin zurück', 'Öl und Essig sind gleich schwer', 'Schütteln zerstört das Öl', 'Essig verdampft'], 0, 'Große Tropfen haben weniger Grenzfläche und sind stabiler als viele kleine.'),
    q('Was bewirkt das Schütteln?', ['Es erzeugt viele kleine Tropfen mit mehr Grenzfläche und höherer Energie, das ist nicht stabil', 'Es löst Öl in Essig dauerhaft', 'Es verbindet beide Stoffe chemisch', 'Es entfernt die Grenzfläche'], 0, 'Der Zustand mit vielen kleinen Tropfen ist nur vorübergehend. Dann fließen Tropfen wieder zusammen.'),
    q('Was braucht eine Mischung aus Öl und Wasser, um dauerhaft stabil zu bleiben?', ['Einen Emulgator', 'Mehr Schütteln', 'Wärme', 'Kälte'], 0, 'Ohne Emulgator kehrt das System zur Trennung zurück.'),
  ],
  'PATH:SSF:CHE-REINIGUNG-OSMOSE-0001|UNIT:OSMOSE-PRINZIP': [
    q('Eine Rosine liegt in Wasser und wird prall. In welche Richtung wandert das Wasser?', ['Zur höheren Konzentration gelöster Stoffe, also in die Rosine', 'Aus der Rosine heraus', 'In keine Richtung', 'Nach unten'], 0, 'Osmose bringt Wasser durch die Membran dorthin, wo mehr Stoffe gelöst sind.'),
    q('Links einer Membran ist Salzwasser, rechts reines Wasser. Wohin fließt netto das Wasser?', ['Nach links, zum Salzwasser', 'Nach rechts', 'Es fließt nicht', 'Salz fließt nach rechts'], 0, 'Das Wasser wandert zur höheren Konzentration. Die Membran lässt Wasser durch, nicht das Salz.'),
    q('Warum zieht Salz beim Einlegen von Gurken Wasser heraus?', ['Außen ist die Salzkonzentration höher, Wasser wandert aus den Zellen nach außen', 'Salz verdampft das Wasser', 'Salz erwärmt die Gurke', 'Die Gurke nimmt Salz auf und wird leichter'], 0, 'Osmose wirkt hier umgekehrt wie bei der Rosine: Wasser geht in Richtung höherer Konzentration.'),
  ],
  'PATH:SSF:PHY-REINIGUNG-SIEDEPUNKT-0001|UNIT:SIEDEPUNKT-DRUCK': [
    q('Auf einer Berghütte kocht Wasser schnell, die Nudeln bleiben aber hart. Warum?', ['Der Siedepunkt liegt wegen des geringeren Luftdrucks niedriger, das Wasser ist weniger heiß', 'Das Wasser ist zu heiß', 'Nudeln garen im Gebirge nie', 'Das Wasser kocht nicht'], 0, 'Kochendes Wasser ist dort kälter. Das Garen dauert länger.'),
    q('Wann siedet eine Flüssigkeit?', ['Wenn ihr Dampfdruck den Umgebungsdruck erreicht oder übersteigt', 'Wenn sie 100 °C erreicht, egal bei welchem Druck', 'Wenn sie sich bewegt', 'Wenn sie Luft enthält'], 0, 'Der Siedepunkt hängt vom Außendruck ab. 100 °C gelten nur bei Normaldruck.'),
    q('Warum gart ein Schnellkochtopf schneller?', ['Der erhöhte Druck hebt den Siedepunkt, das Wasser wird heißer', 'Er kocht bei niedrigerer Temperatur', 'Er enthält weniger Wasser', 'Er verdampft schneller'], 0, 'Höherer Druck bedeutet höhere Siedetemperatur, bei etwa 2 bar rund 120 °C.'),
  ],
  'PATH:SSF:PHY-REINIGUNG-WAERME-0001|UNIT:WAERME-OBERFLAECHE': [
    q('Dieselbe Suppe kühlt auf dem flachen Teller schneller ab als in der tiefen Schüssel. Warum?', ['Größere Oberfläche pro Volumen, mehr Kontakt mit kühler Luft', 'Der Teller ist kälter', 'Suppe wird auf Tellern dünner', 'Die Schüssel isoliert nicht'], 0, 'Wärme wird über die Oberfläche abgegeben. Bei gleichem Volumen bedeutet mehr Oberfläche schnelleres Abkühlen.'),
    q('Über welchen Weg wird Wärme an die Umgebung abgegeben?', ['Über die Oberfläche, die mit der kühleren Umgebung in Kontakt ist', 'Über das Volumen im Inneren', 'Nur über das Gewicht', 'Überhaupt nicht'], 0, 'Je größer der Kontakt mit der kühleren Luft, desto schneller geht Wärme ab.'),
    q('Wie hältst du einen Tee möglichst lange heiß?', ['In einer hohen, schmalen Tasse mit Deckel', 'In einem flachen Teller', 'Auf einer Metallplatte', 'Offen im Wind'], 0, 'Wenig Oberfläche und ein Deckel verringern den Wärmeverlust.'),
  ],
  'PATH:SSF:PHY-KUECHE-SIEDEPUNKT-0001|UNIT:KUECHE-SIEDEPUNKT-K1': [
    q('Auf dem Mount Everest kocht Wasser bei etwa 70 °C. Was bedeutet das fürs Eierkochen?', ['Das kochende Wasser ist weniger heiß, das Ei gart langsamer', 'Das Ei gart schneller', 'Das Ei gart nicht, weil es nie kocht', 'Das Wasser ist heißer als auf Meereshöhe'], 0, 'Der niedrigere Luftdruck senkt den Siedepunkt. Die Gartemperatur sinkt damit.'),
    q('Was bestimmt den Siedepunkt einer Flüssigkeit?', ['Der Druck der Umgebung, den der Dampfdruck erreichen muss', 'Nur die Menge der Flüssigkeit', 'Nur die Farbe', 'Die Form des Topfes'], 0, 'Der Siedepunkt ist die Temperatur, bei der der Dampfdruck den Umgebungsdruck erreicht.'),
    q('Warum kocht Wasser im Schnellkochtopf erst bei etwa 120 °C?', ['Der Druck im Topf ist höher, deshalb muss der Dampfdruck höher werden', 'Der Topf ist dicker', 'Das Wasser ist salzig', 'Es gibt weniger Dampf'], 0, 'Höherer Außendruck verschiebt den Siedepunkt nach oben.'),
  ],
  'PATH:SSF:PHY-KUECHE-SIEDEPUNKT-0001|UNIT:KUECHE-SIEDEPUNKT-K2': [
    q('Wasser hat bei 100 °C einen Dampfdruck von 1 bar. Bei welchem Umgebungsdruck kocht es dann bei 100 °C?', ['Bei 1 bar', 'Bei 0,02 bar', 'Bei 2 bar', 'Bei 10 bar'], 0, 'Siedepunkt heißt Dampfdruck gleich Umgebungsdruck. Normaldruck liegt bei etwa 1 bar.'),
    q('Im Schnellkochtopf herrschen etwa 2 bar, der Dampfdruck von Wasser erreicht 2 bar bei etwa 120 °C. Bei welcher Temperatur kocht das Wasser dort?', ['Etwa 120 °C', 'Etwa 100 °C', 'Etwa 60 °C', 'Etwa 20 °C'], 0, 'Erst bei 120 °C hat der Dampf genug Druck, um gegen die 2 bar anzukommen.'),
    q('Warum steigen Blasen erst am Siedepunkt auf?', ['Erst dann ist der Dampfdruck in der Blase so hoch wie der Druck der Umgebung', 'Weil das Wasser vorher keinen Dampf erzeugt', 'Weil die Blasen Luft sind', 'Weil der Topf heiß wird'], 0, 'Bei niedrigerem Dampfdruck würde die Blase vom Außendruck zusammengedrückt.'),
  ],
  'PATH:SSF:PHY-KUECHE-EMULSION-0001|UNIT:KUECHE-EMULSION-K1': [
    q('Warum trennt sich eine geschüttelte Vinaigrette wieder?', ['Wasser ist polar, Öl unpolar, die beiden Phasen mischen sich nicht dauerhaft', 'Öl verdampft', 'Essig wird fest', 'Beide sind gleich dicht'], 0, 'Ohne Vermittler bleiben unpolare und polare Flüssigkeiten getrennt.'),
    q('Welche Tröpfchen steigen in einer Öl-Wasser-Mischung schneller auf?', ['Große Tröpfchen', 'Kleine Tröpfchen', 'Alle gleich schnell', 'Keine'], 0, 'Große Tröpfchen trennen sich rasch ab, kleine bleiben länger verteilt.'),
    q('Du schüttelst zwei Dressings, das eine sehr fein, das andere grob. Welches bleibt länger vermischt?', ['Das fein geschüttelte mit kleineren Tröpfchen', 'Das grobe', 'Beide gleich lang', 'Keines'], 0, 'Kleinere Tröpfchen steigen langsamer auf und sind kurzzeitig stabiler.'),
  ],
  'PATH:SSF:PHY-KUECHE-EMULSION-0001|UNIT:KUECHE-EMULSION-K2': [
    q('Welche Funktion hat Lecithin im Eigelb?', ['Es umhüllt die Öltröpfchen und verhindert, dass sie wieder zusammenfließen', 'Es färbt die Mayonnaise', 'Es verdampft Wasser', 'Es verbrennt Öl'], 0, 'Lecithin ist ein natürlicher Emulgator und verbindet Öl und Wasser.'),
    q('Mayonnaise besteht zu rund 80 % aus Öl und bleibt dennoch stabil. Was hält sie zusammen?', ['Der Emulgator im Eigelb', 'Der Essig allein', 'Die Kälte', 'Das Rühren allein'], 0, 'Ohne Emulgator würde sich so viel Öl rasch abtrennen.'),
    q('Was ändert sich, wenn man den Emulgatoranteil erhöht?', ['Die Emulsion bleibt länger stabil', 'Sie trennt sich schneller', 'Sie wird fest', 'Sie verdampft'], 0, 'Mit mehr Emulgator werden die Tröpfchen besser abgeschirmt, die Emulsion hält über Stunden.'),
  ],
  'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001|UNIT:KUECHE-KOLLAGEN-K1': [
    q('Gulasch aus bindegewebsreichem Fleisch wird erst nach etwa 3 Stunden zart. Warum?', ['Kollagen zerfällt erst bei längerem Garen über etwa 70 °C zu Gelatine', 'Das Fleisch braucht Zeit zum Trocknen', 'Salz wirkt erst nach Stunden', 'Fett wird fest'], 0, 'Kollagen im Bindegewebe braucht Zeit und Hitze, bis es zu Gelatine zerfällt.'),
    q('Was passiert mit Kollagen bei steigender Temperatur?', ['Es schrumpft und wird zäh, später zerfällt es zu Gelatine', 'Es bleibt immer gleich', 'Es wird sofort zu Gelatine', 'Es verdampft'], 0, 'Bei etwa 50 °C schrumpft Kollagen, bei 60 °C wird es zäh, ab 70 °C beginnt es zu Gelatine zu zerfallen.'),
    q('Du brätst ein Gulaschstück nur 3 Minuten scharf an. Was ist zu erwarten?', ['Außen braun, innen zäh, weil das Bindegewebe nicht zerfällt', 'Butterzart', 'Verkohlt und weich', 'Flüssig'], 0, 'Kurzes Braten färbt nur die Oberfläche. Das Bindegewebe braucht lange Garzeit.'),
  ],
  'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001|UNIT:KUECHE-KOLLAGEN-K2': [
    q('Eine kräftige Fleischsuppe wird nach dem Abkühlen fest. Was zeigt das?', ['Gelöste Gelatine bildet beim Abkühlen ein Gel, ein Zeichen für viel Kollagen', 'Die Suppe ist verdorben', 'Wasser ist verdunstet', 'Fett wurde zu Eis'], 0, 'Gelatine bindet Wasser und bildet beim Abkühlen ein Gel.'),
    q('Wie entwickelt sich die Umwandlung von Kollagen beim langen Garen?', ['Anfangs wenig, nach etwa 3 Stunden ist fast alles Kollagen aufgelöst', 'Sie ist sofort abgeschlossen', 'Sie beginnt nie', 'Sie läuft in den ersten Minuten vollständig ab'], 0, 'Die Umwandlung braucht Zeit und läuft über Stunden.'),
    q('Warum wird Fleisch beim Schmoren zart?', ['Kollagen wird zu Gelatine, die mit Wasser eine weiche Struktur bildet', 'Das Fleisch verliert alle Proteine', 'Das Fleisch nimmt Fett auf', 'Muskelfasern verdampfen'], 0, 'Der Abbau des Bindegewebes macht das Fleisch weich.'),
  ],
};
