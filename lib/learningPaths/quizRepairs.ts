import { quiz, q, type QuizTriple } from './quizAuthoring';
import { waterQuizRepairs } from './quizRepairsWater';
import { kitchenQuizRepairs } from './quizRepairsKitchen';
import { materialsQuizRepairs } from './quizRepairsMaterials';
import { technikQuizRepairs } from './quizRepairsTechnik';
import { scienceQuizRepairs } from './quizRepairsScience';
import type { LearningPath, LearningPathSection } from '../learningPaths';

/**
 * Ersatz für Kurztests, die in den Ursprungsmodulen nur als Stichwort, Freitext oder mit zwei Fragen
 * vorliegen und deshalb nicht auswertbar sind (siehe lib/learningQuiz.ts). Jeder Eintrag steht unter
 * `Pfad-ID|Einheit-ID` und gilt nur, solange die Einheit keinen auswertbaren Kurztest hat.
 * Fragen folgen der Reihenfolge Anwendung, Verständnis, Transfer; alle nötigen Zahlen stehen in der Frage.
 */

export const quizRepairs: Record<string, QuizTriple> = {
  ...waterQuizRepairs,
  ...kitchenQuizRepairs,
  ...materialsQuizRepairs,
  ...technikQuizRepairs,
  ...scienceQuizRepairs,
  'PATH:SSF:PHY-SPEKTRALANALYSE-0001|UNIT:SPEKTRAL-FINGERABDRUCK': [
    q('In einem Spektrum zeigt sich eine helle Linie bei 589 nm. Welche Aussage ist am besten begründet?', ['Die Probe besteht aus Eisen', 'Natrium ist beteiligt, weil dieser Wellenlängensatz zu Natrium gehört', 'Die Linie ist ein Messfehler des Geräts', 'Die Probe ist kälter als 0 °C'], 1, 'Jedes Element sendet bei eigenen Wellenlängen. 589 nm ist die charakteristische gelbe Linie von Natrium, daher der gelbe Schein von Natriumlampen.'),
    q('Warum nennt man das Linienmuster eines Elements einen Fingerabdruck?', ['Weil jedes Element gleich viele Linien hat', 'Weil die Wellenlängen, bei denen es Licht aussendet oder absorbiert, zu diesem Element gehören', 'Weil das Muster mit der Temperatur beliebig wechselt', 'Weil man es ohne Gerät ablesen kann'], 1, 'Die Linienlagen folgen aus dem Atombau und sind für jedes Element charakteristisch. Daraus lässt sich die Zusammensetzung einer Probe ablesen.'),
    q('Ein Instrument trennt Linien auf 0,0001 nm statt auf 1 nm. Welchen Vorteil hat das für Messungen in NOXIA?', ['Es trennt dicht benachbarte Linien und zeigt kleine Spurenanteile', 'Es macht die Probe wärmer', 'Es ersetzt die Kalibrierung', 'Es misst die Masse der Probe'], 0, 'Höhere spektrale Auflösung trennt Linien, die sonst verschmelzen, und macht schwache Signaturen kleiner Beimengungen sichtbar.'),
  ],
  'PATH:SSF:PHY-WASSER-DIPOL-0001|UNIT:WASSER-100GRAD': [
    q('Methan (CH₄, kein Dipol) siedet bei −161 °C, Wasser bei +100 °C. Welche Erklärung trägt?', ['Wasser-Moleküle sind viel größer als Methan-Moleküle', 'Wasser-Moleküle bilden als Dipole Wasserstoffbrücken, die beim Sieden zusätzlich überwunden werden müssen', 'Wasser enthält Sauerstoff, der Wärme speichert', 'Der Druck über Wasser ist immer höher'], 1, 'Wasser und Methan sind ähnlich groß. Der Unterschied liegt in den Wasserstoffbrücken zwischen den Dipolen: sie halten die Moleküle zusammen und heben den Siedepunkt stark an.'),
    q('Was ist ein Dipol?', ['Ein Molekül, dessen eines Ende leicht positiv und dessen anderes leicht negativ geladen ist', 'Zwei verbundene Moleküle', 'Ein Atom mit doppelter Ladung', 'Ein Molekül ohne Ladungsverteilung'], 0, 'Beim Wasser zieht der Sauerstoff die Elektronen stärker an. Dadurch entsteht ein negativer und ein positiver Pol.'),
    q('Nach seiner Molekülgröße müsste Wasser etwa bei −80 °C sieden. Welche Folge hätte das für die Erde?', ['Die Ozeane wären wärmer', 'Bei Raumtemperatur gäbe es kein flüssiges Wasser, Ozeane und Leben wie wir es kennen wären nicht möglich', 'Wasser würde bei 100 °C gefrieren', 'Es würde sich nichts ändern'], 1, 'Der hohe Siedepunkt kommt von Dipol und Wasserstoffbrücken. Ohne sie wäre Wasser bei Umgebungstemperatur ein Gas.'),
  ],
  'PATH:SSF:PHY-WASSER-PHASEN-0001|UNIT:PHASEN-GRUNDLAGEN': [
    q('Auf dem Mars liegt der Druck oft unter 611,7 Pa, dem Tripelpunktdruck von Wasser. Was passiert mit Eis, das dort erwärmt wird?', ['Es schmilzt bei 0 °C wie auf der Erde', 'Es sublimiert direkt zu Wasserdampf', 'Es bleibt unbegrenzt fest', 'Es zerfällt in Wasserstoff und Sauerstoff'], 1, 'Unterhalb des Tripelpunktdrucks gibt es keine flüssige Phase. Eis geht beim Erwärmen direkt in Dampf über.'),
    q('Was kennzeichnet den Tripelpunkt von Wasser?', ['Die Temperatur der größten Dichte', 'Der einzige Druck-Temperatur-Punkt, an dem fest, flüssig und gasförmig gleichzeitig im Gleichgewicht stehen', 'Der Siedepunkt bei Normaldruck', 'Der Druck im Erdkern'], 1, 'Am Tripelpunkt (etwa 611,7 Pa und 0,01 °C) koexistieren alle drei Phasen. Darunter gibt es keine flüssige Phase.'),
    q('Unter erhöhtem Druck schmilzt Eis schon bei etwas unter 0 °C. Wodurch unterscheidet sich Wasser damit von den meisten Stoffen?', ['Wasser hat keinen Schmelzpunkt', 'Seine Schmelzlinie fällt mit dem Druck, bei den meisten Stoffen steigt der Schmelzpunkt mit dem Druck', 'Sein Siedepunkt sinkt mit dem Druck, bei anderen Stoffen steigt er', 'Wasser ist als einziger Stoff flüssig'], 1, 'Wasser ist wegen der offenen Eisstruktur eine Ausnahme: Eis ist weniger dicht als Wasser, daher begünstigt Druck die flüssige Phase.'),
  ],
  'PATH:SSF:PHY-WASSER-EIS-0001|UNIT:EIS-DICHTE': [
    q('Eis hat 917 kg/m³, Wasser bei 4 °C etwa 1000 kg/m³. Was geschieht mit einem Eiswürfel im Wasserglas?', ['Er sinkt, weil fest immer dichter ist', 'Er schwimmt, etwa 92 % seines Volumens liegen unter Wasser', 'Er schwimmt vollständig über der Oberfläche', 'Er schwebt in der Mitte'], 1, 'Der Anteil unter Wasser entspricht dem Dichteverhältnis 917 zu 1000, also etwa 92 %.'),
    q('Warum hat Eis eine geringere Dichte als flüssiges Wasser?', ['Eis enthält Luftblasen', 'Die Wasserstoffbrücken zwingen die Moleküle in ein offenes hexagonales Gitter mit größeren Abständen', 'Beim Gefrieren verlieren die Moleküle Masse', 'Eis besteht aus leichteren Molekülen'], 1, 'Die Moleküle behalten im Kristall einen festen Abstand. Das Gitter ist weniger dicht gepackt als die Flüssigkeit.'),
    q('Ein See friert im Winter zu. Welche Folge hat die Dichteanomalie für das Leben darin?', ['Der See friert von unten nach oben durch', 'Eis schwimmt oben und isoliert, darunter bleibt das Wasser flüssig', 'Das Wasser am Grund wird wärmer als 20 °C', 'Alle Fische sterben'], 1, 'Weil Eis schwimmt, bildet sich eine isolierende Decke. Das Wasser darunter bleibt bei etwa 4 °C flüssig.'),
  ],
  'PATH:SSF:PHY-WASSER-SUBLIM-0001|UNIT:SUBLIM-PRINZIP': [
    q('Eis bei −10 °C hat einen Dampfdruck von 2,6 mbar. Die Winterluft enthält Wasserdampf mit 1,0 mbar. Was tut das Eis?', ['Es bleibt unverändert, weil −10 °C zu kalt ist', 'Es sublimiert langsam, weil sein Dampfdruck den Partialdruck in der Luft übersteigt', 'Es schmilzt zuerst', 'Es nimmt Wasserdampf auf und wächst'], 1, 'Ein Stoff geht in die Gasphase über, wenn sein Dampfdruck größer ist als sein Partialdruck in der Umgebung.'),
    q('Wann sublimiert ein fester Stoff?', ['Wenn seine Temperatur über dem Schmelzpunkt liegt', 'Wenn sein Dampfdruck den Partialdruck des Stoffes in der Umgebung übersteigt', 'Nur im luftleeren Raum', 'Nur bei Wind'], 1, 'Entscheidend ist das Druckverhältnis, nicht ein fester Temperaturwert. Sublimation läuft auch unter dem Schmelzpunkt und in Luft.'),
    q('Gefrorene Wäsche trocknet im Winter draußen, obwohl die Temperatur nie über 0 °C steigt. Warum?', ['Der Frost zieht Wasser in den Stoff', 'Das Eis sublimiert in die trockene Luft', 'Der Wind erwärmt die Wäsche über 0 °C', 'Eis verdunstet nicht, die Wäsche war nie nass'], 1, 'Trockene Winterluft hat weniger Wasserdampf als der Dampfdruck von Eis. Das Eis geht direkt in Dampf über.'),
  ],
  'PATH:SSF:ENG-COLONY-FOUND-0001|UNIT:COLONY-STANDORT': [
    q('Drei Kandidaten: Nordpol (Wasser, sechs Monate Dunkelheit), Äquatortiefland (viel Sonne, kein Eis, mehr Strahlung), Lavahöhleneingang (Schutz, Wasser in 200 m Tiefe, Licht). Was ist die richtige Entscheidungsgrundlage?', ['Der Ort mit der meisten Sonne', 'Wasser, Energie und Schutz gegeneinander abwägen, weil kein Ort alle drei perfekt erfüllt', 'Der Ort mit dem nächsten Wassereis, egal wie tief', 'Der Ort mit der geringsten Entfernung zur Landestelle'], 1, 'Der Standort ist ein Kompromiss aus Wasser, Energie und Schutz. Ein einzelner Faktor reicht nicht.'),
    q('Das Wasserrecycling einer Kolonie fällt von über 95 % auf 80 %. Warum ist das gefährlich?', ['Wasser schmeckt dann schlechter', 'Der Verlust summiert sich täglich, ohne Nachschub ist der Vorrat nach Wochen leer', 'Recycling ist nur Komfort', 'Der Verlust gleicht sich nach drei Tagen von selbst aus'], 1, 'Jeder Tag verbraucht Vorrat, den kein Nachschub ersetzt. Deshalb muss die Recyclingrate hoch und stabil bleiben.'),
    q('Ein Sonnensturm trifft die Kolonie am ersten Tag. Welche Standortwahl hätte die Besatzung am besten geschützt?', ['Offenes Tiefland mit maximaler Sonne', 'Ein Standort mit natürlichem Schutz, etwa Lavahöhle oder Kraterwand', 'Ein Standort ohne Wasser', 'Ein Standort auf dem höchsten Gipfel'], 1, 'Natürliche Abschirmung durch Gestein senkt die Dosis, ohne dass Masse für zusätzliche Abschirmung transportiert werden muss.'),
  ],
  'PATH:SSF:ENG-STATION-FOUND-0001|UNIT:STATION-ORBIT': [
    q('Ein Satellit soll dauerhaft über demselben Punkt des Äquators stehen. Welche Bahn braucht er?', ['Niedrige Bahn bei 408 km', 'Geostationär bei 35.786 km mit einer Umdrehung pro Erdtag', 'Mittlere Bahn bei 20.000 km', 'Eine polare Bahn bei 800 km'], 1, 'Nur bei 35.786 km entspricht die Umlaufzeit der Erddrehung. Dann bleibt der Satellit über einem Punkt.'),
    q('Warum braucht eine Station in niedriger Bahn (408 km) regelmäßig einen Reboost?', ['Die Restatmosphäre bremst sie, sie verliert langsam an Höhe', 'Die Sonne verschiebt die Bahn', 'Sie verliert Gewicht durch Verdunsten', 'Der Mond zieht sie nach oben'], 0, 'In 408 km Höhe gibt es noch dünne Atmosphäre. Der Luftwiderstand bremst die Station, sie muss regelmäßig angehoben werden.'),
    q('Warum ist ein Rückflug aus der geostationären Bahn zur Erde so aufwendig?', ['Die Erde ist dort nicht erreichbar', 'Es ist sehr viel Geschwindigkeitsänderung (Delta-v) nötig', 'Die Atmosphäre ist dort zu dicht', 'Es gibt keine Funkverbindung'], 1, 'Die Bahn ist hoch und schnell. Um in die Atmosphäre abzusinken, muss viel Energie abgebaut werden.'),
  ],
  'PATH:SSF:PHY-WASSER-VAKUUM-0001|UNIT:VAKUUM-TRIPELPUNKT': [
    q('Flüssiges Wasser braucht mindestens 611,7 Pa. Der Mars-Druck steigt auf 1.500 Pa. Ist flüssiges Wasser dann möglich?', ['Nein, erst ab 101.325 Pa', 'Ja, wenn die Temperatur zwischen Schmelz- und Siedepunkt liegt', 'Ja, bei jeder Temperatur', 'Nein, der Mars ist grundsätzlich zu kalt'], 1, 'Über dem Tripelpunktdruck gibt es einen Temperaturbereich mit flüssigem Wasser. Welche Temperatur dort herrscht, bestimmt zusätzlich, ob es auch auftritt.'),
    q('Ein Raumanzug leckt auf dem Mond (fast Vakuum). Was passiert unterhalb der Armstrong-Grenze von 6,3 kPa?', ['Körperflüssigkeiten gefrieren sofort', 'Wasser in Körperflüssigkeiten siedet bei Körpertemperatur', 'Der Körper dehnt sich nicht, es passiert nichts', 'Der Sauerstoff im Blut wird zu Wasserstoff'], 1, 'Der Siedepunkt sinkt mit dem Druck. Unter 6,3 kPa liegt er bei Körpertemperatur.'),
    q('Ein Wasserextraktor erhitzt Regolith bei Mars-Bodendruck. Warum braucht er eine Kondensationsfalle?', ['Der Dampf würde sonst bei dem niedrigen Druck entweichen', 'Der Dampf würde die Kammer abkühlen', 'Regolith lässt sich nur mit Kälte bearbeiten', 'Die Falle ersetzt den Heizer'], 0, 'Bei dem niedrigen Umgebungsdruck verdampft Wasser leicht und würde ohne Falle verloren gehen.'),
  ],
  'PATH:SSF:AST-MARS-REGOLITH-0001|UNIT:REGOLITH-ZUSAMMENSETZUNG': [
    q('Eine Marsregolith-Probe enthält 0,7 Gew.-% Perchlorat. Wie viel Perchlorat steckt in 100 kg Regolith?', ['0,07 kg', '0,7 kg', '7 kg', '70 kg'], 1, '0,7 % von 100 kg sind 0,7 kg. Auch kleine Anteile sind relevant, weil Perchlorat hochtoxisch ist.'),
    q('Warum darf Marsregolith nicht direkt für Hydroponik oder Gartenbau verwendet werden?', ['Er enthält zu viel organischen Kohlenstoff', 'Perchlorat ist toxisch und muss vorher entfernt werden', 'Er ist zu weich', 'Er enthält kein Eisen'], 1, 'Perchlorat schädigt Pflanzen und beim Menschen die Schilddrüse. Marsregolith enthält keinen organischen Kohlenstoff, der Nährboden wäre.'),
    q('Wie lässt sich Perchlorat im Regolith unschädlich machen?', ['Durch Abkühlen unter −100 °C', 'Durch Auswaschen oder Filtern oder thermische Zersetzung oberhalb von etwa 600 °C', 'Durch Trocknen an der Sonne', 'Gar nicht, es muss ein anderer Planet gewählt werden'], 1, 'Perchlorat ist löslich und kann ausgewaschen werden. Oberhalb von etwa 600 °C zerfällt es thermisch.'),
  ],
  'PATH:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001|UNIT:MONDSTAUB-EIGENSCHAFTEN': [
    q('Apollo-Astronauten konnten ihre Anzüge nach Ausflügen kaum noch öffnen und reinigen. Welche Eigenschaft des Staubs trägt dazu bei?', ['Er ist flüssig', 'Er ist elektrostatisch aufgeladen und scharfkantig, daher haftet er und verklemmt Dichtungen', 'Er ist radioaktiv', 'Er ist feucht'], 1, 'Der Staub haftet durch elektrostatische Aufladung und scheuert an Gelenken und Dichtungen.'),
    q('Warum ist Mondstaub scharfkantiger als irdischer Sand?', ['Er ist viel älter', 'Weder Wasser noch Wind runden die Kanten ab', 'Er besteht aus Metall', 'Er wird von Pflanzen zerkleinert'], 1, 'Ohne Erosion durch Wasser und Wind bleiben die Bruchkanten erhalten.'),
    q('Ein Rover mit Drahtgeflechträdern (Mesh-Wheels) fährt monatelang auf Mondregolith. Womit muss er trotzdem rechnen?', ['Mit Luftverlust durch Reifenpanne', 'Mit Abrasion an Lagern und Dichtungen', 'Mit Rost an den Rädern', 'Mit dem Gefrieren der Räder'], 1, 'Mesh-Wheels vermeiden Luftverlust, schützen aber nicht vor dem scheuernden Staub an den beweglichen Teilen.'),
  ],
  'PATH:SSF:ENG-LIFESUPPORT-MOBIL-0001|UNIT:LIFESUPPORT-BUDGET': [
    q('Zwei Personen fahren 30 Stunden. Jede braucht 0,84 kg Sauerstoff pro Tag. Wie viel Sauerstoff benötigen sie mindestens?', ['1,05 kg', '2,1 kg', '4,2 kg', '25 kg'], 1, '2 · 0,84 kg/Tag · (30/24) Tage = 2,1 kg. Dazu kommen Reserve und Sicherheitsmarge.'),
    q('Warum ist die CO₂-Entfernung in einer geschlossenen Kabine so kritisch?', ['CO₂ reichert sich laufend an und wirkt toxisch, bevor Sauerstoffmangel auffällt', 'CO₂ verbrennt den Sauerstoff', 'CO₂ ist leichter als Sauerstoff', 'CO₂ macht die Kabine dunkel'], 0, 'Der Mensch erzeugt laufend CO₂. Steigt es, treten Kopfschmerz und Schwindel auf, lange bevor der Sauerstoff knapp wird.'),
    q('Die Notfallreserve beträgt Rückweg plus 20 % Sicherheitsmarge. Warum nicht 0 %?', ['Weil Reserve Gewicht spart', 'Ausfälle und Umwege treten im ungünstigsten Moment auf, die Marge deckt sie ab', 'Weil 20 % gesetzlich vorgeschrieben sind', 'Weil Rückwege nie länger sind'], 1, 'Eine Reserve ohne Marge reicht nur, wenn alles nach Plan läuft. Die Marge macht Fehler und Verzögerungen überlebbar.'),
  ],
  'PATH:SSF:AST-MONDNAVIGATION-0001|UNIT:MONDNAV-GRUNDLAGEN': [
    q('Das Gyroskop eines Rovers driftet. Wie entwickelt sich der Positionsfehler bei reiner Inertialnavigation über viele Stunden?', ['Er bleibt konstant', 'Er akkumuliert und wächst mit der Zeit', 'Er verschwindet von selbst', 'Er springt nur beim Start'], 1, 'Kleine Messfehler addieren sich beim Aufintegrieren der Bewegung. Deshalb braucht Inertialnavigation Korrekturfixe.'),
    q('Warum ist Sternennavigation auf dem Mond günstiger als auf der Erde?', ['Es gibt keine Atmosphäre: kein Szintillieren, Sterne sind immer sichtbar', 'Der Mond hat mehr Sterne', 'Der Mond dreht sich schneller', 'Die Sterne sind dort heller als die Sonne'], 0, 'Ohne Atmosphäre fehlen Streulicht und Flimmern. Die Sterne lassen sich genauer anpeilen.'),
    q('Warum kombiniert man auf Langstrecken mehrere Navigationsmethoden?', ['Weil jede Methode für sich zu teuer ist', 'Weil keine Methode allein zuverlässig ist und große Abweichungen zwischen ihnen vor Fehlern warnen', 'Weil die Methoden alle dasselbe messen', 'Weil man so keinen Rechner braucht'], 1, 'Jede Methode hat eigene Fehler: Drift, Schlupf, Reichweite. Redundanz begrenzt sie und macht Fehler erkennbar.'),
  ],
  'PATH:SSF:AST-MARS-REGOLITH-0001|UNIT:REGOLITH-EISGEHALT': [
    q('Ein Standort hat 3 Gew.-% Wassereis unter 4 m Überdeckung. Wie ist er für eine Extraktion einzuordnen?', ['Wirtschaftlich gut geeignet', 'Eher ungeeignet: unter 5 Gew.-% Eis und mehr als 2 m Überdeckung', 'Nur der Perchloratgehalt zählt', 'Gut geeignet, weil tiefer Aushub mehr Eis findet'], 1, 'Als Faustwert gelten mehr als 5 Gew.-% Eis und weniger als 2 m Überdeckung. Beides wird hier verfehlt: wenig Ertrag bei hohem Aufwand.'),
    q('Wie finden Orbiter Wassereis im Marsboden, ohne zu landen?', ['Sie messen Wasserstoff-Signaturen im Boden, mehr Wasserstoff bedeutet mehr Eis', 'Sie hören Wasser mit einem Mikrofon', 'Sie messen die Farbe der Atmosphäre', 'Sie wiegen den Boden aus dem Orbit'], 0, 'Neutronenspektrometer erfassen Wasserstoff im oberen Boden. Daraus lassen sich Eiskarten ableiten, die erst vor Ort überprüft werden müssen.'),
    q('Warum steigt der Aufwand stark, wenn die Überdeckung über dem Eis dicker wird?', ['Tieferer Aushub braucht überproportional mehr Energie und erhöht den Maschinenverschleiß', 'Eis wird mit der Tiefe wärmer und schmilzt', 'Die Schwerkraft nimmt zu', 'Perchlorat verschwindet in der Tiefe'], 0, 'Mehr Aushub heißt mehr Energie, mehr Zeit und mehr Verschleiß am Gerät. Deshalb ist die Überdeckung ein Auswahlkriterium.'),
  ],
  'PATH:SSF:AST-MONDNAVIGATION-0001|UNIT:MONDNAV-PRAXIS': [
    q('Inertialnavigation und Sternennavigation weichen um 800 m voneinander ab. Wie ist das zu bewerten?', ['Als Normalfall, weil beide immer gleich messen', 'Als Fehlerwarnung: mindestens eine Methode liegt falsch und muss geprüft werden', 'Als Beweis, dass die Sternennavigation ausfällt', 'Es braucht keine Maßnahme'], 1, 'Ein großer Unterschied zwischen unabhängigen Methoden zeigt, dass etwas nicht stimmt. Dann hilft ein Referenz-Fix, zum Beispiel per Bake oder Laser an der Basis.'),
    q('Was versteht man unter Dead Reckoning?', ['Eine Positionsschätzung aus letzter bekannter Position, Richtung, Geschwindigkeit und Zeit', 'Eine Navigation allein nach Sternen', 'Ein GPS-Verfahren', 'Das Anpeilen einer Bake'], 0, 'Dead Reckoning rechnet die Bewegung vom letzten bekannten Punkt weiter. Der Fehler wächst mit der Strecke, deshalb braucht es Kalibrierung.'),
    q('Warum nutzt man Odometrie, obwohl sie auf lockerem Boden durch Schlupf ungenau wird?', ['Sie liefert schnelle Updates zwischen den Sternen-Fixes', 'Sie ist die genaueste Methode', 'Sie braucht keine Räder', 'Sie ersetzt jede andere Methode'], 0, 'Odometrie überbrückt die Zeit zwischen seltenen, aber genauen Fixes. Die Fixes kalibrieren dann ihren wachsenden Fehler.'),
  ],
  'PATH:SSF:ENG-COLONY-FOUND-0001|UNIT:COLONY-LEBEN': [
    q('Eine Kolonie braucht 100 l Wasser pro Tag und recycelt 95 %. Wie viel Wasser fehlt täglich?', ['0,5 l', '5 l', '50 l', '95 l'], 1, '5 % von 100 l sind 5 l. Diese Lücke muss aus Vorräten oder Eisgewinnung kommen, deshalb ist eine hohe Recyclingquote entscheidend.'),
    q('Wozu dient ein 14-Tage-Backup an Sauerstoff, obwohl er per Elektrolyse hergestellt wird?', ['Er überbrückt einen Ausfall der Elektrolyse, bis sie repariert ist', 'Er ersetzt die Elektrolyse dauerhaft', 'Er wird zum Heizen gebraucht', 'Er verlängert die Tage'], 0, 'Kritische Systeme brauchen eine Reserve. Fällt die Erzeugung aus, bleibt Zeit für die Reparatur.'),
    q('Was leistet ISRU für eine Kolonie?', ['Sie macht lokale Ressourcen nutzbar und senkt die Abhängigkeit von Nachschub von der Erde', 'Sie ersetzt Strom und Wasser vollständig', 'Sie funktioniert nur auf der Erde', 'Sie erhöht die Transportkosten'], 0, 'Aus Marsatmosphäre, Wasser und Regolith lassen sich Treibstoff und Baumaterial herstellen. Jedes lokal erzeugte Kilogramm spart teuren Transport.'),
  ],
  'PATH:SSF:ENG-LIFESUPPORT-MOBIL-0001|UNIT:LIFESUPPORT-NOTFALL': [
    q('Der CO₂-Filter fällt aus. Die Basis ist 60 km entfernt, der Rover fährt 20 km/h, die Grenze bis zur CO₂-Vergiftung liegt bei 2 bis 4 Stunden. Was ist richtig?', ['Sofort umkehren: die Fahrt dauert 3 Stunden und liegt im Grenzbereich', 'Noch 2 Stunden weiterfahren und dann entscheiden', 'Stehenbleiben und warten', 'Die Rückfahrt ist wegen 3 Stunden nicht möglich'], 0, '60 km bei 20 km/h sind 3 Stunden, im Bereich der Grenze. Jede Verzögerung verkleinert die Reserve, daher sofort umkehren und CO₂ messen.'),
    q('Welche Symptome zeigen sich bei beginnender CO₂-Vergiftung, und was ist die erste Priorität?', ['Kopfschmerz und Schwindel; zuerst das CO₂-Niveau messen', 'Hunger; zuerst essen', 'Ohrensausen; zuerst funken', 'Keine Symptome; zuerst warten'], 0, 'Die Symptome werden oft mit Sauerstoffmangel verwechselt. Zuerst muss gemessen werden, um richtig zu handeln.'),
    q('Warum werden zwei voneinander unabhängige Life-Support-Kreise gebaut?', ['Um einen Single Point of Failure zu vermeiden', 'Um Gewicht zu sparen', 'Weil ein Kreis nie funktioniert', 'Um doppelt so viel Sauerstoff zu atmen'], 0, 'Fällt ein Kreis aus, trägt der zweite weiter. Raumanzüge mit eigener Versorgung dienen als weitere Rückfallebene.'),
  ],
  'PATH:SSF:ENG-STATION-FOUND-0001|UNIT:STATION-ANDOCKEN': [
    q('Eine Kapsel nähert sich mit 0,3 m/s, 1 Grad Winkelabweichung und 5 cm Versatz. Die Zielwerte sind unter 0,05 m/s, unter 2 Grad und unter 10 cm. Was ist zu korrigieren?', ['Die Geschwindigkeit', 'Der Winkel', 'Der Versatz', 'Nichts'], 0, 'Winkel und Versatz liegen im Rahmen, die Geschwindigkeit ist sechsmal zu hoch.'),
    q('Die Annäherungsgeschwindigkeit steigt von 0,05 m/s auf 0,5 m/s. Wie ändert sich die Aufprallenergie?', ['Sie verzehnfacht sich', 'Sie verhundertfacht sich', 'Sie bleibt gleich', 'Sie verdoppelt sich'], 1, 'Die kinetische Energie wächst mit dem Quadrat der Geschwindigkeit: zehnfaches Tempo bedeutet hundertfache Energie.'),
    q('Eine Station braucht 15 l Wasser pro Tag und recycelt 93 %. Wie viel Frischwasser ist täglich nötig?', ['0,15 l', '1,05 l', '10,5 l', '14 l'], 1, '7 % von 15 l sind 1,05 l. Ohne Recycling wäre der Vorrat in Tagen leer.'),
  ],
  'PATH:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001|UNIT:MONDSTAUB-TECHNIK': [
    q('Mesh-Wheel-Räder haben keinen Luftreifen. Welcher Nachteil bleibt?', ['Sie verlieren bei einem Einstich sofort Luft', 'Es bleibt Abrasion und die Federung ist geringer', 'Sie funktionieren nur im Vakuum nicht', 'Sie sind schwerer als Luftreifen'], 1, 'Das Drahtgeflecht beseitigt das Druckverlust-Risiko, nicht aber den Abrieb durch scharfkantigen Staub.'),
    q('Warum verlieren Solarzellen auf dem Mond mit der Zeit Leistung?', ['Staubbelag verringert den Lichtdurchgang', 'Die Sonne wird schwächer', 'Der Mond hat keine Schwerkraft', 'Die Zellen frieren fest'], 0, 'Der Staub haftet elektrostatisch und bildet eine Schicht, die weniger Licht zur Zelle lässt.'),
    q('Warum ist elektrische Staubabwehr noch keine Standardtechnik?', ['Sie ist grundsätzlich unmöglich', 'Sie ist noch experimentell und kein Verfahren erreicht 100 %', 'Sie braucht Wasser', 'Mondstaub ist nicht geladen'], 1, 'Elektrische Felder können Staub abstoßen, sind aber noch in der Erprobung. Reinigung und Dichtungstausch bleiben nötig.'),
  ],
  'PATH:SSF:PHY-SPEKTRALANALYSE-0001|UNIT:SPEKTRAL-STERNE': [
    q('Im Spektrum eines Sterns dominieren Linien bei 656, 486 und 434 nm. Welcher Sterntyp passt?', ['Ein heißer Stern mit Wasserstoff-Balmer-Linien', 'Ein kühler Stern mit Kalzium', 'Ein Stern ohne Atmosphäre', 'Ein Planet'], 0, 'Diese Wellenlängen gehören zur Balmer-Serie des Wasserstoffs, die in heißen Sternen dominiert.'),
    q('Was zeigt eine Rotverschiebung der Linien?', ['Der Stern bewegt sich von uns weg', 'Der Stern kommt näher', 'Der Stern ist kälter geworden', 'Das Spektrum ist falsch kalibriert'], 0, 'Bewegt sich die Quelle weg, verschieben sich alle Linien zu größeren Wellenlängen.'),
    q('Was waren Fraunhofers dunkle Linien im Sonnenlicht?', ['Absorptionslinien: die Sonnenatmosphäre verschluckt Licht bestimmter Wellenlängen', 'Fehler der Linse', 'Schatten von Sonnenflecken', 'Reflexionen der Erdatmosphäre'], 0, 'Die Elemente der Sonnenatmosphäre absorbieren ihre eigenen Wellenlängen. Daraus liest man die Zusammensetzung ab.'),
  ],
  'PATH:SSF:PHY-WASSER-DIPOL-0001|UNIT:WASSER-HBRUECKEN': [
    q('Eine Wasserstoffbrücke hat etwa 23 kJ/mol, eine O–H-Bindung etwa 460 kJ/mol. Wie viel schwächer ist die Brücke?', ['Etwa 2-mal', 'Etwa 20-mal', 'Etwa 200-mal', 'Gleich stark'], 1, '460 geteilt durch 23 ergibt etwa 20. Die schwachen Brücken wirken durch ihre riesige Zahl.'),
    q('Wie viele Wasserstoffbrücken kann ein Wassermolekül höchstens bilden?', ['1', '2', '4', '8'], 2, 'Zwei über die Wasserstoffe und zwei über die Elektronenpaare des Sauerstoffs: bis zu 4.'),
    q('Warum kühlt Schweiß die Haut?', ['Beim Verdunsten müssen Wasserstoffbrücken gelöst werden, die Energie kommt von der Haut', 'Schweiß ist kälter als die Haut', 'Salz zieht Wärme an', 'Schweiß ist elektrisch geladen'], 0, 'Verdunstung braucht Energie, weil das Netzwerk aufgebrochen wird. Diese Wärme wird der Haut entzogen.'),
  ],
  'PATH:SSF:PHY-WASSER-EIS-0001|UNIT:EIS-LEBEN': [
    q('Ein See kühlt im Winter ab. Wo sammelt sich das Wasser mit der höchsten Dichte, 4 °C?', ['An der Oberfläche', 'Am Grund', 'Gleichmäßig verteilt', 'Im Eis'], 1, 'Wasser ist bei 4 °C am dichtesten und sinkt ab. Kälteres Wasser und Eis bleiben oben.'),
    q('Warum schützt eine Eisdecke das Leben im See?', ['Sie isoliert und lässt darunter flüssiges Wasser bei etwa 4 °C', 'Sie wärmt den See', 'Sie erzeugt Sauerstoff', 'Sie verhindert Regen'], 0, 'Eis schwimmt, bildet eine Isolierschicht und das Wasser darunter bleibt flüssig.'),
    q('Was würde passieren, wenn Eis dichter als Wasser wäre?', ['Seen würden von unten gefrieren und könnten ganz durchfrieren', 'Nichts', 'Seen würden nie gefrieren', 'Fische könnten bei 4 °C nicht leben'], 0, 'Gefrierendes Eis würde absinken, sich am Grund sammeln und Seen vollständig durchfrieren lassen.'),
  ],
  'PATH:SSF:PHY-WASSER-PHASEN-0001|UNIT:PHASEN-MARS': [
    q('Der Marsdruck beträgt 400 Pa, der Tripelpunktdruck von Wasser 611,7 Pa. Kann dort flüssiges Wasser bestehen?', ['Ja, immer', 'Nein, bei diesem Druck gibt es keine flüssige Phase', 'Nur nachts', 'Nur in Tiefen unter 10 km'], 1, 'Unterhalb des Tripelpunktdrucks geht Eis direkt in Dampf über. Flüssiges Wasser ist dort unmöglich.'),
    q('Was geschah mit dem Eis um die Phoenix-Sonde, als es erwärmt wurde?', ['Es schmolz zu Pfützen', 'Es sublimierte direkt zu Dampf', 'Es verwandelte sich in Methan', 'Es blieb unverändert'], 1, 'Phoenix sah das Eis verschwinden, ohne dass es nass wurde. Das folgt aus dem Phasendiagramm.'),
    q('Warum ist flüssiges Wasser selbst bei 870 Pa auf dem Mars nicht stabil?', ['Der Druck liegt nur knapp über dem Tripelpunkt, das Wasser verdunstet oder gefriert rasch', 'Wasser kann nie flüssig sein', 'Die Schwerkraft ist zu hoch', 'Es gibt dort zu viel Sauerstoff'], 0, 'Knapp über dem Tripelpunktdruck ist nur ein schmales Temperaturfenster flüssig. Dort verdunstet Wasser schnell.'),
  ],
  'PATH:SSF:PHY-WASSER-SUBLIM-0001|UNIT:SUBLIM-TITAN': [
    q('Auf Titan herrschen etwa −180 °C, Methan siedet bei −161 °C. In welchem Zustand liegt Methan am Boden vor?', ['Gasförmig', 'Flüssig', 'Als Plasma', 'Als Wasserdampf'], 1, 'Bei −180 °C ist es kälter als der Siedepunkt, aber nicht unter dem Gefrierpunkt. Methan bildet Seen und regnet.'),
    q('Welche Rolle spielt Methan auf Titan?', ['Dieselbe wie Wasser auf der Erde: Kreislauf aus Verdunstung, Wolken, Regen und Seen', 'Keine, Methan existiert dort nicht', 'Es ersetzt den Sauerstoff', 'Es bildet nur Eis'], 0, 'Methan durchläuft auf Titan einen Kreislauf wie Wasser auf der Erde, bei sehr niedriger Temperatur.'),
    q('Warum bildet Wasser auf Titan keinen Kreislauf?', ['Es ist felsartig gefroren und bei −180 °C zu kalt für Phasenübergänge', 'Es ist zu heiß', 'Es gibt dort zu viel Druck', 'Wasser löst sich in Methan'], 0, 'Eis bleibt bei −180 °C fest wie Gestein. Für Phasenübergänge ist es viel zu kalt.'),
  ],
  'PATH:SSF:PHY-WASSER-VAKUUM-0001|UNIT:VAKUUM-ISRU': [
    q('Ein Regolith enthält 2 % statt 20 % Eis. Welche Folge hat das für den Wasserextraktor?', ['Etwa 10-mal mehr Energie pro Liter', 'Etwa 10-mal weniger Energie pro Liter', 'Keine', 'Der Extraktor funktioniert nicht'], 0, 'Bei geringem Eisgehalt muss viel mehr Material erwärmt werden, um dieselbe Wassermenge zu gewinnen.'),
    q('Warum ist der niedrige Druck auf dem Mars für die Sublimation von Vorteil?', ['Sublimation beginnt bei niedrigerer Temperatur, als Verdampfung nötig wäre', 'Er macht Eis härter', 'Er erzeugt Wasser', 'Er verhindert jede Erwärmung'], 0, 'Im Niederdruck geht Eis schon bei geringer Erwärmung in Dampf über, was Energie spart.'),
    q('Wozu dient die Kältefalle bei etwa −80 °C im Extraktor?', ['Der Wasserdampf rekondensiert dort zu Frost, der anschließend aufgeschmolzen wird', 'Sie erwärmt den Regolith', 'Sie filtert Perchlorat aus der Luft', 'Sie erzeugt Strom'], 0, 'Der abgesaugte Dampf wird in der Kältefalle zu Frost, der dann zu flüssigem Wasser geschmolzen wird.'),
  ],
};

/** Ersetzt in `path` die Kurztests der Einheiten, die keinen auswertbaren haben. Die Gate-Logik bleibt unberührt. */
export function applyQuizRepairs(path: LearningPath, isPlayable: (summary: string | undefined) => boolean): LearningPath {
  if (!Object.keys(quizRepairs).some((key) => key.startsWith(`${path.id}|`))) return path;
  return {
    ...path,
    units: path.units.map((unit) => {
      const repair = quizRepairs[`${path.id}|${unit.id}`];
      if (!repair || unit.sections.some((section) => section.kind === 'quiz' && isPlayable(section.summary))) return unit;
      if (!unit.sections.some((section) => section.kind === 'quiz')) {
        // Einheit ohne Kurztest: ans Ende anhängen, damit die Prüfung sie mitzählt.
        const quizSection: LearningPathSection = { id: `QUIZ:${unit.id.replace(/^UNIT:/, '')}`, kind: 'quiz', title: 'Kurztest', summary: quiz(repair) };
        return { ...unit, sections: [...unit.sections, quizSection] };
      }
      let replaced = false;
      return {
        ...unit,
        sections: unit.sections.map((section) => {
          if (section.kind !== 'quiz' || replaced) return section;
          replaced = true;
          return { ...section, summary: quiz(repair) };
        }),
      };
    }),
  };
}
