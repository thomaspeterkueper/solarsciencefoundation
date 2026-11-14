import { q, type QuizTriple } from './quizAuthoring';

/** Ersatz-Kurztests der Magnetismus-, Piezo-, Iridium- und Elektrolyse-Module. Aufbau siehe quizRepairs.ts. */
export const materialsQuizRepairs: Record<string, QuizTriple> = {
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-001': [
    q('Ein gerader Draht führt Strom. Wie verlaufen die Magnetfeldlinien um ihn?', ['Kreisförmig um den Draht', 'Parallel zum Draht', 'Sternförmig vom Draht weg', 'Es entsteht kein Feld'], 0, 'Bewegte Ladungen erzeugen ein Magnetfeld, dessen Linien den Leiter umkreisen.'),
    q('Du brichst einen Stabmagneten in der Mitte durch. Was entsteht?', ['Zwei kleinere Magnete mit je Nord- und Südpol', 'Ein Nordpol und ein Südpol getrennt', 'Zwei unmagnetische Stücke', 'Ein Magnet ohne Pole'], 0, 'Magnete sind Dipole. Einzelne Pole lassen sich nicht abtrennen.'),
    q('Wie lässt sich ein Magnetfeld ohne Permanentmagnet erzeugen?', ['Mit bewegten elektrischen Ladungen, also elektrischem Strom', 'Nur mit Wärme', 'Nur mit Licht', 'Gar nicht'], 0, 'Strom und Magnetfeld sind verknüpft. Das nutzt jeder Elektromagnet.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-002': [
    q('Welche Materialgruppe wird von einem Magneten stark angezogen und kann selbst magnetisiert bleiben?', ['Ferromagnetische Stoffe wie Eisen, Nickel und Cobalt', 'Diamagnetische Stoffe wie Wasser', 'Alle Metalle', 'Alle Kunststoffe'], 0, 'Ferromagnetismus beruht auf kollektiver Ordnung der magnetischen Momente.'),
    q('Wie verhalten sich diamagnetische Stoffe im Magnetfeld?', ['Sie werden sehr schwach abgestoßen', 'Sie werden stark angezogen', 'Sie bleiben unbeeinflusst', 'Sie werden dauerhaft magnetisch'], 0, 'Diamagnetismus ist ein schwacher Effekt, der dem äußeren Feld entgegenwirkt.'),
    q('Ein Eisenstück ist unmagnetisiert, besteht aber aus Domänen. Warum zeigt es nach außen kein Feld?', ['Die Domänen sind in verschiedene Richtungen ausgerichtet und heben sich auf', 'Es enthält keine magnetischen Momente', 'Es ist zu kalt', 'Domänen sind nicht magnetisch'], 0, 'Erst ein äußeres Feld richtet die Domänen aus. Dann entsteht ein Nettofeld.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-003': [
    q('Ein Transformatorkern wird 50-mal pro Sekunde ummagnetisiert. Welche Eigenschaft ist gefragt?', ['Kleine Koerzitivfeldstärke: der Werkstoff lässt sich leicht ummagnetisieren (weichmagnetisch)', 'Hohe Koerzitivfeldstärke', 'Möglichst hohe Remanenz bei hartem Material', 'Keine Magnetisierbarkeit'], 0, 'Weichmagnetische Werkstoffe haben eine schmale Hystereseschleife und geringe Ummagnetisierungsverluste.'),
    q('Was beschreibt die Remanenz?', ['Die verbleibende Magnetisierung, wenn das äußere Feld abgeschaltet wird', 'Die Temperatur, bei der Magnetismus verschwindet', 'Die Härte des Werkstoffs', 'Die Dichte'], 0, 'Remanenz ist die Restmagnetisierung auf der Hysteresekurve beim Feld null.'),
    q('Was braucht ein guter Dauermagnet?', ['Hohe Remanenz und hohe Koerzitivfeldstärke', 'Niedrige Remanenz und niedrige Koerzitivfeldstärke', 'Nur hohe Dichte', 'Keine Hysterese'], 0, 'Er soll stark magnetisiert bleiben und einer Entmagnetisierung widerstehen. Das ist hartmagnetisch.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-004': [
    q('Ein Magnet soll billig und korrosionsfest sein, die Leistung ist zweitrangig. Welche Klasse passt?', ['Ferrit', 'NdFeB', 'SmCo', 'AlNiCo mit Kobaltanteil'], 0, 'Ferritmagnete sind günstig und korrosionsbeständig, haben aber eine geringe Energiedichte.'),
    q('Ein Magnet soll dauerhaft bei hohen Temperaturen arbeiten. Welche der Klassen ist typischerweise besser geeignet als NdFeB?', ['SmCo', 'Ferrit mit Zusatz', 'Kein Werkstoff', 'Weicheisen'], 0, 'SmCo behält seine Eigenschaften bei hohen Temperaturen besser. NdFeB ist temperaturempfindlicher.'),
    q('Welches Risiko bringt NdFeB neben der Leistung mit sich?', ['Abhängigkeit von Seltenen Erden und Korrosionsempfindlichkeit', 'Zu geringe Magnetstärke', 'Zu hohe Dichte', 'Unmagnetisch bei Zimmertemperatur'], 0, 'Leistung, Temperatur, Korrosion, Kosten und Rohstofflage sind immer Kompromisse.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-005': [
    q('Was geschieht oberhalb der Curie-Temperatur mit einem ferromagnetischen Werkstoff?', ['Er verliert seine ferromagnetische Ordnung und wird paramagnetisch', 'Er wird stärker magnetisch', 'Er schmilzt immer sofort', 'Er wird diamagnetisch und stark abgestoßen'], 0, 'Die geordneten Momente werden durch die Wärmebewegung durcheinandergebracht.'),
    q('Ein Magnet wird im Betrieb heiß und schwächer, nach dem Abkühlen ist er wieder so stark wie zuvor. Welcher Verlust ist das?', ['Ein reversibler Verlust', 'Ein irreversibler Verlust', 'Der Curie-Effekt', 'Korrosion'], 0, 'Reversible Verluste verschwinden beim Abkühlen. Irreversible Verluste bleiben.'),
    q('Warum liegt die zulässige Arbeitstemperatur deutlich unter der Curie-Temperatur?', ['Schon weit darunter treten reversible und irreversible Verluste auf', 'Weil die Curie-Temperatur nicht messbar ist', 'Weil Magnete nur bei 20 °C funktionieren', 'Das ist reine Konvention'], 0, 'Arbeitstemperatur, reversible Verluste und Curie-Temperatur sind verschiedene Grenzen.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-006': [
    q('Zwei Magnete haben dieselbe Zusammensetzung, aber verschiedene Verarbeitung. Was ist zu erwarten?', ['Unterschiedliche Eigenschaften durch verschiedene Mikrostruktur', 'Identische Eigenschaften', 'Der eine ist nicht magnetisch', 'Beide sind gleich teuer'], 0, 'Eigenschaften entstehen aus Zusammensetzung, Mikrostruktur und Verarbeitung gemeinsam.'),
    q('Welche Reihenfolge beschreibt die Werkstoffkette?', ['Rohstoff, Zusammensetzung, Mikrostruktur, Verarbeitung, Bauteil', 'Bauteil, Rohstoff, Verarbeitung', 'Mikrostruktur, Bauteil, Rohstoff', 'Verarbeitung, Rohstoff, Bauteil'], 0, 'Die Schritte hängen zusammen: Jeder beeinflusst die Funktion des fertigen Bauteils.'),
    q('Warum ist das Recycling von Magneten aus Altgeräten sinnvoll?', ['Es verringert die Abhängigkeit von knappen Rohstoffen', 'Es erhöht die Curie-Temperatur', 'Es macht Magnete unmagnetisch', 'Es ersetzt die Verarbeitung'], 0, 'Seltene Erden sind begrenzt und regional konzentriert. Rückgewinnung entlastet die Rohstofflage.'),
  ],
  'PATH:SSF:MAGNETISM-MATERIALS|UNIT:MAG-007': [
    q('Welche Materialfunktion braucht ein Transformatorkern?', ['Weichmagnetisch mit geringen Ummagnetisierungsverlusten', 'Hartmagnetisch', 'Unmagnetisch', 'Supraleitend bei 20 °C'], 0, 'Der Kern wird ständig ummagnetisiert und soll dabei wenig Energie verlieren.'),
    q('Was misst ein Hall-Sensor?', ['Ein Magnetfeld, über eine Spannung quer zum Stromfluss', 'Die Temperatur', 'Die Schallgeschwindigkeit', 'Den Luftdruck'], 0, 'Der Hall-Effekt liefert eine Spannung, die vom Magnetfeld abhängt.'),
    q('Ein Elektromotor mit Permanentmagneten im Rotor braucht welche Werkstoffe für die Magnete?', ['Hartmagnetische', 'Weichmagnetische', 'Diamagnetische', 'Keine'], 0, 'Die Magnete sollen dauerhaft magnetisiert bleiben. Das erfordert hohe Koerzitivfeldstärke.'),
  ],
  'PATH:SSF:PHY-MAGNETISMUS-0001|UNIT:MAGNETISMUS-ALLTAG': [
    q('Ein Kühlschrankmagnet haftet an der Stahltür, aber nicht an einer Holztür. Warum?', ['In Eisen sind die Elektronenspins gleichgerichtet, in Holz heben sie sich auf', 'Holz ist zu leicht', 'Stahl ist kälter', 'Holz ist glatter'], 0, 'Nur wenn sich die Spins in großen Bereichen ausrichten, reagiert ein Stoff stark auf Magnete.'),
    q('Welche der Stoffe reagieren deutlich auf einen Magneten?', ['Eisen und Nickel', 'Kupfer und Aluminium', 'Holz und Wasser', 'Glas und Gummi'], 0, 'Die Elektronenstruktur bestimmt die Reaktion. Eisen reagiert stark, Nickel mittel.'),
    q('Du teilst einen Magneten in zwei Hälften. Was entsteht?', ['Zwei Magnete mit je Nord- und Südpol', 'Ein Nordpol und ein Südpol getrennt', 'Zwei unmagnetische Stücke', 'Ein stärkerer Magnet'], 0, 'Magnetpole treten immer paarweise auf.'),
  ],
  'PATH:SSF:PHY-MAGNETISMUS-0001|UNIT:MAGNETISMUS-SPIN': [
    q('Warum erzeugt Holz kein Netto-Magnetfeld?', ['Die Spins sind ungeordnet und heben sich gegenseitig auf', 'Holz enthält keine Elektronen', 'Holz leitet Strom', 'Holz ist zu leicht'], 0, 'Die winzigen Magnetfelder der Elektronen zeigen in alle Richtungen und addieren sich zu null.'),
    q('Was passiert, wenn ein Eisenmagnet über seine Curie-Temperatur erhitzt wird?', ['Die Ausrichtung der Spins wird zerstört, das Feld verschwindet', 'Das Feld wird stärker', 'Nichts', 'Das Eisen wird flüssig'], 0, 'Wärmebewegung bricht die gleichgerichtete Ordnung auf.'),
    q('Wieso wirkt ein Permanentmagnet ohne Batterie?', ['Die Spins von Millionen Elektronen sind gleichgerichtet und erzeugen ein Feld', 'Er speichert Strom', 'Er bezieht Energie aus der Luft', 'Er enthält Wasser'], 0, 'Der Spin jedes Elektrons erzeugt ein winziges Feld. In Eisen summieren sie sich.'),
  ],
  'PATH:SSF:PHY-MAGNETISMUS-0001|UNIT:MAGNETISMUS-STROM': [
    q('Ein Schrottplatzkran lässt das Auto fallen, sobald der Strom abgeschaltet wird. Warum?', ['Ohne Strom bewegen sich die Elektronen nicht gerichtet, das Feld verschwindet', 'Der Kran wird zu schwer', 'Das Eisen schmilzt', 'Das Auto wird leichter'], 0, 'Ein Elektromagnet funktioniert nur mit fließendem Strom.'),
    q('Wie lässt sich das Feld einer Spule erhöhen?', ['Mehr Wicklungen und mehr Strom', 'Weniger Wicklungen', 'Weniger Strom', 'Einen Kunststoffkern einsetzen'], 0, 'Die Felder der einzelnen Windungen addieren sich, ebenso wächst es mit dem Strom.'),
    q('Welche Wirkung hat ein Eisenkern in einer Spule?', ['Er verstärkt das Feld stark', 'Er schwächt das Feld', 'Er hat keinen Einfluss', 'Er löscht das Feld'], 0, 'Eisen wird im Feld selbst magnetisiert und verstärkt es dramatisch.'),
  ],
  'PATH:SSF:PHY-PIEZO-0001|UNIT:PIEZO-BEOBACHTUNG': [
    q('Wie entsteht der Funke in einem piezoelektrischen Gasanzünder?', ['Druck auf einen Quarzkristall erzeugt eine elektrische Spannung', 'Eine Batterie liefert Strom', 'Reibung erhitzt das Gas', 'Eine Solarzelle lädt auf'], 0, 'Beim Verformen trennen sich im Kristall Ladungen. Das erzeugt die Zündspannung.'),
    q('Was passiert mit der Spannung beim Entlasten des Kristalls?', ['Sie kehrt ihr Vorzeichen um', 'Sie steigt weiter', 'Sie bleibt gleich', 'Der Kristall wird warm'], 0, 'Schnelles Drücken und Loslassen liefert eine Wechselspannung.'),
    q('Welche der Geräte nutzen dasselbe Prinzip?', ['Ultraschallsensoren und Mikrofone', 'Glühlampen', 'Wasserkocher', 'Federwaagen'], 0, 'Piezoelemente wandeln Druck in Spannung und umgekehrt.'),
  ],
  'PATH:SSF:PHY-PIEZO-0001|UNIT:PIEZO-MECHANISMUS': [
    q('Quarz ist piezoelektrisch, NaCl nicht. Welche Eigenschaft entscheidet?', ['Die Kristallstruktur ohne Symmetriezentrum', 'Die Farbe', 'Die Härte allein', 'Der Preis'], 0, 'Nur eine unsymmetrische Struktur kann beim Verformen ein Dipolmoment bilden.'),
    q('Was geschieht in Quarz unter Druck?', ['Ladungsschwerpunkte verschieben sich und ein Dipolmoment entsteht', 'Die Atome verschwinden', 'Der Kristall wird flüssig', 'Er wird magnetisch'], 0, 'Das Verschieben der Ladungsschwerpunkte erzeugt die Spannung.'),
    q('Warum zeigt ein symmetrischer Kristall keinen Effekt?', ['Alle Ladungsverschiebungen heben sich gegenseitig auf', 'Er enthält keine Ladungen', 'Er ist zu hart', 'Er ist zu groß'], 0, 'Bei Symmetrie bleibt der Netto-Dipol null.'),
  ],
  'PATH:SSF:PHY-PIEZO-0001|UNIT:PIEZO-MATERIALIEN': [
    q('Was ist der große Nachteil von PZT?', ['Es enthält giftiges Blei', 'Es ist unwirksam', 'Es ist ein Gas', 'Es ist magnetisch'], 0, 'PZT ist leistungsstark, aber bleihaltig. Blei wird zunehmend eingeschränkt.'),
    q('Welche Merkmale hat das neue Material vom RPI?', ['Bleifrei, nur 0,3 mm dünn, aus weit verbreiteten Elementen', 'Bleihaltig und schwach', 'Ein Polymer', 'Ein Gas'], 0, 'Ein Chalkogenid-Perowskit, der ähnlich stark reagiert und nachhaltiger ist.'),
    q('Welches Material wäre für Smartphones in der EU ideal?', ['Eines, das stark reagiert und bleifrei ist', 'Eines, das schwach und giftig ist', 'Ein beliebiges Metall', 'Ein Isolator ohne Piezoeffekt'], 0, 'Optimum im Vergleich: hohe Ausgangsspannung bei geringer Umweltbelastung.'),
  ],
  'PATH:SSF:CHE-IRIDIUM-0001|UNIT:IRIDIUM-WAS': [
    q('Es werden jährlich 6,8 t Iridium und 3000 t Gold gefördert. Wie viel mal weniger Iridium als Gold ist das ungefähr?', ['Etwa 4-mal', 'Etwa 40-mal', 'Etwa 440-mal', 'Etwa 4400-mal'], 2, '3000 geteilt durch 6,8 ergibt rund 440.'),
    q('Warum lässt sich das Iridium-Angebot kaum erhöhen?', ['Es fällt nur als Beiprodukt des Platinabbaus an', 'Es gibt keine Nachfrage', 'Es ist radioaktiv', 'Es ist flüssig'], 0, 'Einen eigenständigen Iridium-Bergbau gibt es nicht.'),
    q('Warum zeigt der Vergleich der Jahresproduktion von Iridium, Gold, Silber und Kupfer eine logarithmische Skala?', ['Die Mengen reichen über viele Größenordnungen, von 6,8 t bis 22 Millionen t', 'Iridium ist logarithmisch verteilt', 'Das Periodensystem ist logarithmisch', 'Um Kupfer zu verstecken'], 0, 'Nur auf einer logarithmischen Skala bleiben die kleinen Werte sichtbar.'),
  ],
  'PATH:SSF:CHE-IRIDIUM-0001|UNIT:IRIDIUM-WARUM': [
    q('Welches Anodenmaterial übersteht im PEM-Elektrolyseur dauerhaft die stark saure, oxidierende Umgebung?', ['Iridiumoxid', 'Kohlenstoff', 'Rutheniumoxid', 'Aluminium'], 0, 'IrO₂ verbindet Stabilität und katalytische Leistung.'),
    q('Warum wird nicht das günstigere Rutheniumoxid verwendet?', ['Es korrodiert zu schnell', 'Es ist unmagnetisch', 'Es ist zu schwer', 'Es leitet nicht'], 0, 'RuO₂ zerfällt im Modell schon nach etwa 100 Stunden.'),
    q('Warum ist Iridium ein Engpass für die Wasserstoffwirtschaft mit PEM-Elektrolyse?', ['Kein anderes bekanntes Material erfüllt beide Anforderungen, und Iridium ist sehr selten', 'Es ist radioaktiv', 'Es ist ein Gas', 'Es verdunstet'], 0, 'Seltenes, kaum steigerbares Angebot trifft auf fehlenden Ersatz.'),
  ],
  'PATH:SSF:PHY-ELEKTROLYSE-0001|UNIT:ELEKTROLYSE-PRINZIP': [
    q('Eine Elektrolysezelle wird mit 1,0 V betrieben. Was geschieht?', ['Es entstehen keine Gase, die Mindestspannung beträgt 1,23 V', 'Es entsteht nur Sauerstoff', 'Es entsteht nur Wasserstoff', 'Die Zelle explodiert'], 0, 'Unter 1,23 V läuft die Wasserspaltung nicht ab.'),
    q('In welchem Verhältnis entstehen Wasserstoff und Sauerstoff?', ['2 zu 1 nach Volumen', '1 zu 2', '1 zu 1', '3 zu 1'], 0, 'Wasser besteht aus 2 Wasserstoff- und 1 Sauerstoffatom. Es entstehen doppelt so viele H₂-Blasen.'),
    q('Eine Zelle läuft bei 1,8 V, die Mindestspannung beträgt 1,23 V. Wie hoch ist der spannungsbezogene Wirkungsgrad?', ['Etwa 32 %', 'Etwa 68 %', '100 %', 'Etwa 146 %'], 1, '1,23 geteilt durch 1,8 ergibt etwa 0,68. Der Rest geht in Überspannungen verloren.'),
  ],
};
