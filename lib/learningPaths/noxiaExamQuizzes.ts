import { quiz, type QuizQuestion, type QuizTriple } from './quizAuthoring';

/**
 * Kurztests (je 3 Fragen: Anwendung → Verständnis → Transfer) für Module, die NOXIA freischaltet.
 * Jedes Modul hat zwei Tests (6 Fragen), damit die Bestehensgrenze von 70 % mit einem Fehler erreichbar bleibt.
 * Alle für die Antwort nötigen Größen stehen in der Frage, damit die Tests ohne Vorwissen aus anderen Kapiteln lösbar sind.
 */
const q = (question: string, a: QuizQuestion['a'], correct: QuizQuestion['correct'], why: string): QuizQuestion => ({
  q: question,
  a,
  correct,
  why,
});

const tests: Record<string, QuizTriple> = {
  // ── Drucksysteme ────────────────────────────────────────────────────────────
  'PRESSURE-SYSTEMS:2': [
    q(
      'Ein Habitat hält 100 kPa Innendruck, außen herrscht nahezu Vakuum. Welche Kraft wirkt ungefähr auf eine Luke mit 1 m² Fläche?',
      ['ca. 100 N', 'ca. 10 kN', 'ca. 100 kN', 'ca. 1 000 kN'],
      2,
      'F = p·A = 100 000 Pa · 1 m² = 100 000 N = 100 kN. Das entspricht der Gewichtskraft von rund zehn Tonnen. Wer kPa nicht in Pa umrechnet, landet bei 100 N und unterschätzt die Last um den Faktor 1 000.',
    ),
    q(
      'Zwei Luken sehen gleich aus, die zweite ist aber doppelt so breit und doppelt so hoch. Die Druckdifferenz ist gleich. Wie verhalten sich die Kräfte?',
      ['Die Kräfte sind gleich, weil der Druck gleich ist.', 'Die zweite Luke trägt doppelt so viel Kraft.', 'Die zweite Luke trägt viermal so viel Kraft.', 'Die zweite Luke trägt achtmal so viel Kraft.'],
      2,
      'Die Kraft ist F = p·A. Die Fläche wächst mit Breite mal Höhe, also 2 · 2 = 4. Gleicher Druck heißt nicht gleiche Kraft: Je größer die Fläche, desto größer die Last auf Rahmen und Dichtung.',
    ),
    q(
      'Ein Habitat mit 200 m³ Volumen und konstanter Temperatur verliert innerhalb von 10 Stunden Druck von 100 kPa auf 99 kPa. Wie viel der Luft ist entwichen?',
      ['ca. 0,1 %', 'ca. 1 %', 'ca. 10 %', 'ca. 99 %'],
      1,
      'Bei gleichem Volumen und gleicher Temperatur ist der Druck proportional zur Gasmenge. 1 kPa von 100 kPa sind 1 %. Ein kleiner Druckabfall kann also einer erheblichen absoluten Gasmenge entsprechen: 1 % von 200 m³ sind 2 m³.',
    ),
  ],
  'PRESSURE-SYSTEMS:3': [
    q(
      'Ein Habitat verliert 0,6 m³ Luft in 12 Stunden (gemessen bei Habitatdruck). Die Nachspeisung liefert dauerhaft 0,04 m³ pro Stunde. Was geschieht langfristig mit dem Druck?',
      ['Er bleibt konstant, weil Nachspeisung vorhanden ist.', 'Er sinkt langsam, weil 0,05 m³/h verloren gehen und nur 0,04 m³/h ersetzt werden.', 'Er steigt langsam, weil die Nachspeisung dauerhaft läuft.', 'Das lässt sich ohne Kenntnis der Außentemperatur nicht sagen.'],
      1,
      'Die Leckrate beträgt 0,6 m³ / 12 h = 0,05 m³/h. Die Nachspeisung gleicht davon nur 0,04 m³/h aus. Die Differenz von 0,01 m³/h summiert sich, der Druck fällt also langsam weiter.',
    ),
    q(
      'Ein Habitat hat eine sehr gut gedichtete Hülle. Warum braucht es trotzdem Drucksensoren und eine Nachspeisung?',
      ['Weil Sensoren die Dichtheit der Hülle erhöhen, sobald sie eingebaut sind.', 'Weil jede reale Dichtung altert und Gas verliert; nur Messung und Nachspeisung machen das früh sichtbar und ausgleichbar.', 'Weil Druck nur durch Ventile gehalten wird und nicht durch die Struktur.', 'Weil eine Nachspeisung die Fläche der Hülle verkleinert und die Kraft senkt.'],
      1,
      'Dichtungen, Durchführungen und Schweißnähte sind nie vollkommen dicht und verändern sich mit Temperatur und Belastung. Ein Drucksystem ist daher eine Kette aus Struktur, Dichtung, Sensorik, Ventilen und Regelung. Ohne Messung bleibt ein schleichendes Leck unbemerkt.',
    ),
    q(
      'Der Druck liegt bei 99,2 kPa, der Alarm löst bei 95 kPa aus. In dieser Woche musste die Nachspeisung jeden Tag länger laufen. Was ist die beste Schlussfolgerung?',
      ['Alles in Ordnung, solange der Druck über der Alarmgrenze liegt.', 'Der Alarm sollte auf 99 kPa angehoben werden, damit er häufiger auslöst.', 'Die Nachspeisung ist offenbar zu stark eingestellt und sollte gedrosselt werden.', 'Der steigende Nachspeisebedarf deutet auf ein wachsendes Leck; es sollte gesucht werden, bevor der Alarm greift.'],
      3,
      'Ein einzelner Messwert über der Grenze sagt wenig. Der Trend (täglich mehr Nachspeisung) zeigt, dass die Leckrate wächst. Wer früh auf Trends reagiert, repariert planbar, statt erst beim Alarm unter Zeitdruck.',
    ),
  ],

  // ── Schleuse ────────────────────────────────────────────────────────────────
  'AIRLOCK:2': [
    q(
      'Eine Schleuse mit 4 m³ Volumen wird bei jedem Zyklus ohne Rückgewinnung ins Vakuum entlüftet. Luft hat bei Habitatdruck eine Dichte von etwa 1,2 kg/m³. Wie viel Luft geht pro Zyklus verloren?',
      ['ca. 0,5 kg', 'ca. 4,8 kg', 'ca. 48 kg', 'ca. 480 kg'],
      1,
      'Verlorene Masse = Volumen · Dichte = 4 m³ · 1,2 kg/m³ = 4,8 kg. Weil dieser Verlust bei jedem Zyklus anfällt, summiert er sich bei häufigen Außeneinsätzen schnell zu einem echten Versorgungsproblem.',
    ),
    q(
      'Warum dauert der Druckausgleich einer großen Schleuse bei gleicher Pumpleistung länger als der einer kleinen?',
      ['Weil größere Türen schwerer zu bewegen sind.', 'Weil in einem größeren Volumen mehr Gas bewegt werden muss und die Pumpe pro Zeit nur eine begrenzte Gasmenge fördert.', 'Weil in größeren Räumen der Außendruck höher ist.', 'Weil sich Gas in großen Räumen schlechter mit der Habitatluft mischt.'],
      1,
      'Zeitbedarf und Gasbedarf folgen dem Volumen: doppeltes Volumen bedeutet bei gleicher Förderleistung etwa doppelt so viel Zeit und doppelt so viel Gas. Deshalb wird das Schleusenvolumen so klein gewählt, wie es der Einsatz erlaubt.',
    ),
    q(
      'Eine zweite Schleuse hat nur 1 m³ statt 4 m³ Volumen, der Druck ist gleich. Wie verändert sich die pro Zyklus verlorene Luftmenge (ohne Rückgewinnung)?',
      ['Sie bleibt gleich, weil der Druck gleich ist.', 'Sie halbiert sich.', 'Sie sinkt auf ein Viertel.', 'Sie sinkt auf ein Sechzehntel.'],
      2,
      'Bei gleichem Druck und gleicher Temperatur ist die Gasmasse proportional zum Volumen. 1 m³ statt 4 m³ ergibt ein Viertel, also etwa 1,2 kg statt 4,8 kg pro Zyklus. Kleine Schleusen sparen Luft, begrenzen aber Platz für Ausrüstung.',
    ),
  ],
  'AIRLOCK:3': [
    q(
      'In einer Schleuse bleibt eine Restdruckdifferenz von 5 kPa zwischen Schleuse und Habitat. Die Innentür hat 0,8 m² Fläche. Welche Kraft hält die Tür etwa geschlossen?',
      ['ca. 40 N', 'ca. 400 N', 'ca. 4 kN', 'ca. 40 kN'],
      2,
      'F = p·A = 5 000 Pa · 0,8 m² = 4 000 N = 4 kN, entsprechend etwa 400 kg Gewichtskraft. Von Hand lässt sich das nicht aufdrücken. Deshalb muss der Druckausgleich vollständig sein, bevor eine Tür freigegeben wird.',
    ),
    q(
      'Welche Bedingung muss technisch erfüllt sein, bevor die Außentür der Schleuse freigegeben wird?',
      ['Der Bediener bestätigt per Knopfdruck, dass alles in Ordnung ist.', 'Seit dem Schließen der Innentür sind mindestens 60 Sekunden vergangen.', 'Die Innentür ist geschlossen und verriegelt, und der gemessene Schleusendruck entspricht dem Außendruck.', 'Beide Türen sind kurz offen, damit der Druck sich ausgleicht.'],
      2,
      'Freigabe muss auf gemessenem Zustand und gegenseitiger Verriegelung beruhen. Ein Knopfdruck oder ein Timer ersetzt keine Messung, und gleichzeitig geöffnete Türen verbinden Habitat und Außenwelt unkontrolliert.',
    ),
    q(
      'Der Drucksensor der Schleuse bleibt wegen eines Defekts dauerhaft bei 0 kPa stehen, obwohl in der Schleuse tatsächlich noch 100 kPa herrschen. Wie sollte die Steuerung reagieren?',
      ['Die Außentür freigeben, weil 0 kPa einem Druckausgleich mit dem Vakuum entspricht.', 'Die Innentür freigeben, weil der Sensor nur den Außenbereich misst.', 'Beide Türen gesperrt halten und den Fehler melden, bis ein unabhängiger zweiter Sensor den Druck bestätigt.', 'Den Sensorwert ignorieren und nach Zeitplan öffnen.'],
      2,
      'Ein ausgefallener Sensor darf nie eine Freigabe auslösen. Würde die Außentür bei tatsächlichen 100 kPa öffnen, käme es zu einer schlagartigen Entlüftung. Das System muss in den sicheren Zustand (Türen gesperrt) fallen und eine unabhängige Messung verlangen.',
    ),
  ],

  // ── Lebenserhaltung ─────────────────────────────────────────────────────────
  'LIFE-SUPPORT:2': [
    q(
      'Ein Mensch verbraucht etwa 0,84 kg Sauerstoff pro Tag. Wie viel Sauerstoff braucht eine Crew von 4 Personen für 30 Tage?',
      ['ca. 25 kg', 'ca. 100 kg', 'ca. 250 kg', 'ca. 1 000 kg'],
      1,
      '0,84 kg · 4 Personen · 30 Tage = 100,8 kg. Der Vorrat wächst linear mit Personenzahl und Dauer. Wer eine Größenordnung verschätzt, plant Tanks oder Erzeugungsleistung falsch.',
    ),
    q(
      'Warum hängt die Luftaufbereitung eines Habitats indirekt von Wasser und Energieversorgung ab?',
      ['Weil Sauerstoff häufig per Elektrolyse aus Wasser gewonnen wird und Lüfter, Wäscher und Regelung Strom brauchen.', 'Weil Wasser das CO₂ im Habitat vollständig bindet.', 'Weil Strom die Luft chemisch verändert, sobald er durch Leitungen fließt.', 'Weil Luftaufbereitung nur bei laufender Wasserkühlung des Reaktors funktioniert.'],
      0,
      'Wasser liefert über Elektrolyse Sauerstoff, und jede aktive Aufbereitung (CO₂-Entfernung, Umwälzung, Messung) braucht Strom. Fällt Wasser oder Energie aus, sinkt deshalb auch die Luftqualität, obwohl das Luftsystem selbst intakt ist.',
    ),
    q(
      'In einem gut durchmischten Habitat mit 100 m³ steigt der CO₂-Gehalt durch 4 Personen um etwa 900 ppm pro Stunde, wenn die CO₂-Entfernung ausfällt. Der Start liegt bei 400 ppm, der Alarm bei 3 000 ppm. Wann löst der Alarm etwa aus?',
      ['nach ca. 30 Minuten', 'nach ca. 3 Stunden', 'nach ca. 12 Stunden', 'nach ca. 3 Tagen'],
      1,
      '(3 000 − 400) ppm / 900 ppm pro Stunde ≈ 2,9 Stunden. Ein Ausfall der CO₂-Entfernung bleibt also nicht lange folgenlos: Es bleibt nur wenig Zeit, die Ursache zu beheben oder auf eine Reserve umzuschalten.',
    ),
  ],
  'LIFE-SUPPORT:3': [
    q(
      'Eine Crew von 4 Personen setzt 3 Liter Wasser pro Person und Tag um. Die Aufbereitung gewinnt 90 % zurück. Wie viel Frischwasser muss in 30 Tagen nachgeliefert werden?',
      ['ca. 12 L', 'ca. 36 L', 'ca. 108 L', 'ca. 324 L'],
      1,
      'Gesamtumsatz: 4 · 3 L · 30 d = 360 L. Verloren gehen 10 %, also 36 L. Die Zahl 324 L wäre die zurückgewonnene Menge. Hohe Recyclingquoten senken den Nachschub drastisch, machen das System aber abhängig von Aufbereitung und Energie.',
    ),
    q(
      'Welche Reserve macht die Luftversorgung robuster?',
      ['Ein zweites identisches CO₂-Gerät am selben Stromkreis.', 'Ein unabhängiger alternativer Weg, etwa ein passives Sorbens-System mit eigenen Kartuschen.', 'Eine längere Garantie für das vorhandene Gerät.', 'Ein zusätzlicher Sensor, der den Ausfall meldet.'],
      1,
      'Ein identisches Gerät am selben Stromkreis fällt bei derselben Ursache gemeinsam aus. Ein unabhängiger Weg mit anderem Wirkprinzip und eigener Versorgung bleibt auch dann verfügbar. Sensoren melden den Ausfall, ersetzen aber keine Funktion.',
    ),
    q(
      'Nur noch 60 % der Energie stehen zur Verfügung. Welcher Verbraucher sollte zuletzt abgeschaltet werden?',
      ['Experimente im Labor', 'Komfortbeleuchtung in Gemeinschaftsräumen', 'CO₂-Entfernung und Druckregelung', 'Datenübertragung zur Erde'],
      2,
      'Bei knapper Energie zählt die Reihenfolge der Folgen: Ohne CO₂-Entfernung und Druckregelung entsteht innerhalb von Stunden Gefahr, Labor, Komfort und Datenverbindung sind aufschiebbar. Ein Degradationsplan legt diese Reihenfolge vorab fest.',
    ),
  ],

  // ── Thermische Kontrolle ────────────────────────────────────────────────────
  'THERMAL-CONTROL:2': [
    q(
      'Im Habitat entstehen durch Geräte und Menschen dauerhaft 8 kW Wärme. Die Radiatoren geben 6 kW ab. Wie sieht die Wärmebilanz aus?',
      ['−2 kW: das Habitat kühlt ab.', '0 kW: die Bilanz ist ausgeglichen.', '+2 kW: das Habitat heizt sich netto auf.', '+14 kW: beide Werte addieren sich.'],
      2,
      'Netto = erzeugte minus abgegebene Wärmeleistung = 8 kW − 6 kW = +2 kW. Solange die Abgabe unter der Erzeugung liegt, steigt die Temperatur, auch wenn das Habitat gut isoliert ist.',
    ),
    q(
      'Warum kann ein sehr gut isoliertes Habitat überhitzen?',
      ['Weil Isolation Wärme erzeugt.', 'Weil Isolation auch die Abgabe der intern erzeugten Wärme behindert; ohne Wärmesenke steigt die Temperatur.', 'Weil Isolation nur gegen Kälte wirkt, nicht gegen Wärme.', 'Weil sich gut isolierte Wände durch Sonnenlicht stärker aufheizen als Wände ohne Isolation.'],
      1,
      'Isolation verringert den Wärmeaustausch in beide Richtungen. Interne Quellen bleiben aber bestehen. Deshalb braucht ein Habitat zusätzlich Transportpfade und eine Senke, an die die Wärme aktiv abgegeben wird.',
    ),
    q(
      'Ein Wassertank mit 20 000 kg (c ≈ 4,18 kJ/(kg·K)) nimmt netto 2 kW Wärme auf. Wie lange dauert es etwa, bis sich das Wasser um 2 K erwärmt hat?',
      ['ca. 23 Minuten', 'ca. 2,3 Stunden', 'ca. 23 Stunden', 'ca. 23 Tage'],
      2,
      'Wärmemenge Q = m·c·ΔT = 20 000 kg · 4,18 kJ/(kg·K) · 2 K ≈ 167 000 kJ. Bei 2 kJ/s sind das rund 83 600 s ≈ 23 Stunden. Große Wassermassen verschaffen Zeit, ersetzen aber keine dauerhafte Wärmeabfuhr.',
    ),
  ],
  'THERMAL-CONTROL:3': [
    q(
      'Die Heizung eines Habitats fällt aus. Die Wärmekapazität der Innenmasse beträgt 5 000 kJ/K, der Wärmeverlust nach außen 2 kW. Wie schnell sinkt die Innentemperatur etwa?',
      ['ca. 0,14 K pro Stunde', 'ca. 1,4 K pro Stunde', 'ca. 14 K pro Stunde', 'ca. 140 K pro Stunde'],
      1,
      'Temperaturänderung pro Sekunde = 2 kJ/s / 5 000 kJ/K = 0,0004 K/s ≈ 1,44 K pro Stunde. Hohe Wärmekapazität bremst das Auskühlen, aber nach einigen Stunden werden die Grenzen des Komforts erreicht.',
    ),
    q(
      'Warum ist die Wärmeabgabe eines Habitats im Vakuum schwieriger als auf der Erde?',
      ['Weil Wärme im Vakuum nicht existiert.', 'Weil ohne umgebende Luft keine Konvektion möglich ist und Wärme nur über Strahlung abgegeben werden kann.', 'Weil Wärme im Vakuum nur nach unten abfließt.', 'Weil Metall im Vakuum Wärme schlechter leitet als in Luft.'],
      1,
      'Im Vakuum entfallen Leitung und Konvektion an die Umgebung. Es bleibt die Abstrahlung, die mit der Fläche und stark mit der Temperatur der Radiatoren (T⁴) wächst. Deshalb sind Radiatorflächen ein zentrales Auslegungsmaß.',
    ),
    q(
      'Durch einen Stromausfall stehen die Kühlmittelpumpen still, die Geräte im Habitat erzeugen aber weiter Wärme. Was geschieht zuerst?',
      ['Die Temperatur fällt sofort, weil keine Pumpen mehr Wärme erzeugen.', 'Die Temperatur bleibt unbegrenzt konstant.', 'Der Wärmetransport zu den Radiatoren stoppt, die Temperatur steigt zeitverzögert, weil Wasser und Struktur die Wärme zunächst puffern.', 'Die Radiatoren geben ab sofort mehr Wärme ab.'],
      2,
      'Ohne Umwälzung kommt die Wärme nicht mehr bei den Radiatoren an. Thermische Trägheit puffert den Anstieg, aber nur für begrenzte Zeit. Ein Stromausfall ist deshalb auch ein thermisches Problem mit Verzögerung.',
    ),
  ],

  // ── Strahlenschutz ──────────────────────────────────────────────────────────
  'RADIATION-PROTECTION:2': [
    q(
      'Die Strahlungsdosis an der Oberfläche beträgt etwa 0,5 mSv pro Tag. Wie hoch ist die Gesamtdosis nach 60 Tagen Aufenthalt ohne zusätzlichen Schutz?',
      ['ca. 3 mSv', 'ca. 30 mSv', 'ca. 300 mSv', 'ca. 3 000 mSv'],
      1,
      'Dosis = Dosisrate · Zeit = 0,5 mSv/Tag · 60 Tage = 30 mSv. Die Dosis wächst mit der Aufenthaltsdauer, deshalb ist Zeitplanung ein eigener Schutzhebel.',
    ),
    q(
      'Warum werden im Weltraum für den Strahlenschutz oft Polyethylen oder Wasser statt Blei diskutiert?',
      ['Pro Masse bremsen wasserstoffreiche Stoffe kosmische Strahlung wirksamer, und es entsteht weniger energiereiche Sekundärstrahlung.', 'Blei schirmt jede Art von Strahlung schlechter ab als jeder andere Stoff.', 'Polyethylen ist dichter als Blei und schirmt deshalb stärker ab.', 'Wasser und Polyethylen erzeugen selbst Strahlung, die vor anderer Strahlung schützt.'],
      0,
      'Wasserstoffreiche Materialien fragmentieren und bremsen schwere kosmische Teilchen effektiv und erzeugen weniger energiereiche Sekundärteilchen. Mehr Masse ist deshalb nicht in jedem Fall gleich wirksam: Material und Strahlungsart entscheiden.',
    ),
    q(
      'Eine Außenarbeit bei 10 µSv/h dauert 4 Stunden. Mit Robotereinsatz lässt sie sich auf 1,5 Stunden verkürzen. Wie viel Dosis wird eingespart?',
      ['ca. 15 µSv', 'ca. 25 µSv', 'ca. 40 µSv', 'ca. 60 µSv'],
      1,
      'Dosis ohne Roboter: 4 h · 10 µSv/h = 40 µSv. Mit Roboter: 1,5 h · 10 µSv/h = 15 µSv. Eingespart: 25 µSv. Kürzere Aufenthaltszeit senkt die Dosis genauso wie zusätzliche Abschirmung.',
    ),
  ],
  'RADIATION-PROTECTION:3': [
    q(
      'Ein Abschirmmaterial halbiert die Dosisrate pro 10 cm Dicke (vereinfachtes Modell). Wie dick muss es sein, um die Dosisrate auf ein Viertel zu senken?',
      ['10 cm', '20 cm', '30 cm', '40 cm'],
      1,
      'Zwei Halbierungen ergeben ein Viertel (½ · ½). Bei 10 cm je Halbierung sind das 20 cm. Die Abschwächung wirkt multiplikativ, nicht additiv. Reale Strahlungsfelder sind komplexer, das Prinzip bleibt.',
    ),
    q(
      'Wo sollte ein besonders geschützter Rückzugsraum im Habitat liegen?',
      ['An der Außenwand, möglichst auf der Sonnenseite.', 'Im Kern des Habitats, umgeben von Wasser- und Vorratstanks.', 'In einem Außenbereich unter einem leichten Schutzdach.', 'Direkt neben dem Haupteingang.'],
      1,
      'Wasser, Vorräte und Struktur wirken als zusätzliche Abschirmung, und im Kern liegt zwischen Raum und Außenwelt die größte Materialdicke. Schutzkonzepte nutzen Geometrie und ohnehin vorhandene Masse, statt nur Wände zu verdicken.',
    ),
    q(
      'Eine Warnung meldet in wenigen Stunden einen Sonnensturm mit stark erhöhter Strahlung. Was ist die beste Reaktion?',
      ['Außenarbeiten fortsetzen, bis der Sturm tatsächlich eintrifft.', 'Außenarbeiten beenden, die Crew in den geschützten Rückzugsraum bringen und die Dosis überwachen.', 'Das Habitat vollständig abschalten, um Strahlung zu vermeiden.', 'Die Crew gleichmäßig auf alle Räume verteilen.'],
      1,
      'Vorwarnzeit ist ein Schutzgut: Sie erlaubt, die Aufenthaltsdauer im ungeschützten Bereich zu beenden und die Crew dorthin zu bringen, wo die Abschirmung am besten ist. Dosimetrie zeigt, ob der Plan wirkt.',
    ),
  ],

  // ── Umweltmonitoring ────────────────────────────────────────────────────────
  'ENVIRONMENT-MONITORING:2': [
    q(
      'Die CO₂-Konzentration liegt bei 2 000 ppm und steigt um 500 ppm pro Stunde. Der Alarm löst bei 5 000 ppm aus. Wie viel Zeit bleibt bis dahin?',
      ['ca. 2 Stunden', 'ca. 4 Stunden', 'ca. 6 Stunden', 'ca. 10 Stunden'],
      2,
      '(5 000 − 2 000) ppm / 500 ppm pro Stunde = 6 Stunden. Der Trend liefert die Restzeit, schon lange bevor der Grenzwert erreicht ist. Ein einzelner Messwert zeigt nur den aktuellen Zustand.',
    ),
    q(
      'Warum bemerken Menschen sinkenden Sauerstoffgehalt oft erst sehr spät?',
      ['Weil der Körper keinen direkten Sinn für Sauerstoffmangel hat; erste Symptome wie Müdigkeit oder Kopfschmerz sind spät und unspezifisch.', 'Weil Sauerstoff geruchlos ist, Stickstoff aber stark riecht.', 'Weil Sauerstoffmangel immer von lautem Alarm begleitet wird.', 'Weil Menschen Sauerstoff nur über die Haut aufnehmen.'],
      0,
      'Atemreiz und Wahrnehmung hängen vor allem vom CO₂-Gehalt ab, nicht vom Sauerstoff. Deshalb muss Sensorik solche Zustände überwachen, die Menschen nicht rechtzeitig spüren.',
    ),
    q(
      'Im Habitat sinkt der Sauerstoffanteil langsam, gleichzeitig steigt das CO₂, die Temperatur ist normal. Was legen die gekoppelten Messwerte nahe?',
      ['Zwei Sensoren sind gleichzeitig defekt.', 'Atmung (oder Verbrennung) verbraucht Sauerstoff und erzeugt CO₂, und die Aufbereitung kommt nicht nach.', 'Die Temperaturregelung ist ausgefallen.', 'Der Druck im Habitat steigt.'],
      1,
      'Gegenläufige Änderungen von O₂ und CO₂ passen zu einem physikalischen Zusammenhang (Atmung). Gekoppelte Messgrößen ermöglichen eine Diagnose, die einzelne Schwellenwerte nicht liefern.',
    ),
  ],
  'ENVIRONMENT-MONITORING:3': [
    q(
      'Drei Drucksensoren melden 100,1 kPa, 99,9 kPa und 0,0 kPa. Die Atemluft ist unverändert, die Crew spürt nichts. Was ist die wahrscheinlichste Erklärung?',
      ['Der dritte Sensor ist defekt.', 'Das Habitat hat ein Leck, nur ein Sensor misst richtig.', 'Der Druck fällt gleichzeitig und ungleichmäßig.', 'Alle drei Sensoren sind korrekt.'],
      0,
      'Zwei übereinstimmende, plausible Werte und ein Ausreißer mit 0 kPa sprechen für einen Sensorfehler. Ein echter Druckverlust würde alle Sensoren erfassen und sich in Nachspeisung und Atemluft zeigen. Redundante Messung trennt Fehler von Zustandsänderung.',
    ),
    q(
      'Ein Alarm löst wegen zu empfindlicher Grenzwerte zwanzigmal pro Tag fälschlich aus. Welches Risiko entsteht dadurch?',
      ['Keines, denn mehr Alarme sind immer sicherer.', 'Die Crew gewöhnt sich an Alarme und reagiert auf einen echten Alarm zu spät oder gar nicht.', 'Die Sensoren nutzen sich schneller ab.', 'Der Druck im Habitat steigt.'],
      1,
      'Häufige Fehlalarme führen zu Alarmmüdigkeit. Ein gutes Monitoring-Konzept trennt Warnung und Alarm, nutzt Trends und bestätigt kritische Werte, bevor es die Crew alarmiert.',
    ),
    q(
      'Zwei CO₂-Sensoren hängen am selben Kabelstrang und an derselben Stromversorgung. Wie viel Sicherheit gewinnt man durch den zweiten Sensor?',
      ['Doppelt so viel, weil zwei Sensoren vorhanden sind.', 'Nur begrenzt, weil beide bei einem gemeinsamen Fehler ausfallen; unabhängige Pfade oder ein anderes Messprinzip sind robuster.', 'Gar keine, ein zweiter Sensor ist grundsätzlich nutzlos.', 'Mehr als bei zwei getrennten Sensoren, weil gemeinsame Verkabelung die Messung verbessert.'],
      1,
      'Gemeinsame Kabel oder Stromversorgung sind Common-Mode-Ursachen. Besser sind physikalisch unabhängige Messungen, etwa zusätzlich die Massenbilanz der Nachspeisung. Redundanz zählt nur, wenn die Pfade wirklich getrennt sind.',
    ),
  ],

  // ── Redundanz ───────────────────────────────────────────────────────────────
  'HABITAT-REDUNDANCY:2': [
    q(
      'Zwei Pumpen sind jeweils zu 99 % verfügbar und fallen unabhängig voneinander aus. Wie wahrscheinlich fallen beide gleichzeitig aus?',
      ['0,01 %', '0,1 %', '1 %', '2 %'],
      0,
      'Bei unabhängigen Ausfällen multiplizieren sich die Wahrscheinlichkeiten: 0,01 · 0,01 = 0,0001 = 0,01 %. Diese starke Verbesserung gilt aber nur bei wirklicher Unabhängigkeit.',
    ),
    q(
      'Beide Pumpen hängen an derselben Stromschiene, die mit 1 % Wahrscheinlichkeit ausfällt. Was gilt für die Ausfallwahrscheinlichkeit beider Pumpen?',
      ['Sie liegt weiterhin bei 0,01 %.', 'Sie liegt bei 0,1 %.', 'Sie beträgt mindestens etwa 1 %, weil die gemeinsame Stromschiene beide Pumpen ausschaltet.', 'Sie sinkt, weil die Stromschiene beide Pumpen schützt.'],
      2,
      'Die Stromschiene ist eine gemeinsame Abhängigkeit (Single Point of Failure). Fällt sie aus, stehen beide Pumpen still. Die Gesamtwahrscheinlichkeit kann daher nicht kleiner sein als die der Stromschiene, hier etwa 1 %.',
    ),
    q(
      'Welches Beispiel ist ein Common-Mode-Fehler?',
      ['Eine einzelne Pumpe verschleißt.', 'Ein Sensor driftet langsam.', 'Beide Steuerrechner führen dasselbe fehlerhafte Software-Update aus.', 'Ein Lüfter in einem der beiden Rechner fällt aus.'],
      2,
      'Common-Mode-Fehler haben eine gemeinsame Ursache und treffen mehrere scheinbar unabhängige Komponenten gleichzeitig. Gemeinsame Software, Energie, Leitungen, Umgebung oder Bedienprozesse sind typische Quellen.',
    ),
  ],
  'HABITAT-REDUNDANCY:3': [
    q(
      'Für die Wasserversorgung werden mindestens 3 Pumpen benötigt. Installiert sind 4, die unabhängig voneinander versorgt werden. Wie viele Pumpen dürfen ausfallen, ohne dass die Versorgung sinkt?',
      ['keine', 'eine', 'zwei', 'drei'],
      1,
      'Mit 4 vorhandenen und 3 benötigten Pumpen bleibt bei einem Ausfall die Versorgung erhalten. Bei zwei Ausfällen sinkt sie. Diese Auslegung heißt N+1.',
    ),
    q(
      'Was ist ein sicherer Degradationsmodus?',
      ['Das System schaltet bei einem Fehler alles ab.', 'Alle Systeme laufen gleichmäßig mit reduzierter Leistung weiter.', 'Ein vorab definierter, reduzierter Betriebszustand, der lebenskritische Funktionen priorisiert und andere gezielt abschaltet.', 'Der Betrieb läuft unverändert weiter, bis nichts mehr geht.'],
      2,
      'Ein Degradationsmodus legt vorab fest, was bei knappen Ressourcen noch versorgt wird. Dadurch muss die Crew im Ernstfall nicht improvisieren, und die wichtigsten Funktionen bleiben so lange wie möglich erhalten.',
    ),
    q(
      'Ein Reservegenerator wird nur im Notfall genutzt und wurde nie getestet. Welches Risiko entsteht?',
      ['Keines, denn nicht genutzte Geräte verschleißen nicht.', 'Ein verborgener Fehler fällt erst im Ernstfall auf, wenn die Reserve gebraucht wird.', 'Der Generator läuft zu zuverlässig.', 'Der Generator verbraucht ohne Betrieb Treibstoff.'],
      1,
      'Ungetestete Reserven können verdeckte Fehler enthalten: leere Tanks, Fehlkonfiguration oder fehlende Wartung. Regelmäßige Tests machen Reserven zu echten Reserven.',
    ),
  ],

  // ── Mars-Habitat ────────────────────────────────────────────────────────────
  'MARS-HABITAT:2': [
    q(
      'Ein Habitat hat 8 kW Dauerlast und verbraucht damit 192 kWh pro Tag. Im Staubsturm liefern die Solarmodule nur 120 kWh pro Tag. Wie groß ist das tägliche Energiedefizit?',
      ['24 kWh', '72 kWh', '120 kWh', '192 kWh'],
      1,
      '8 kW · 24 h = 192 kWh Bedarf, abzüglich 120 kWh Erzeugung ergibt 72 kWh Defizit pro Tag. Das Defizit muss aus Speichern, einer Reserve oder durch weniger Verbrauch gedeckt werden.',
    ),
    q(
      'Ein Staubsturm senkt die Solarleistung stark. Welche Folge erreicht die Lebenserhaltung wahrscheinlich indirekt?',
      ['Keine, solange die Druckhülle dicht ist.', 'Weniger Strom lässt Elektrolyse, Wasseraufbereitung und Heizung drosseln, und dadurch sinken Luftqualität und Temperatur mit Zeitverzögerung.', 'Der Staub lässt den Sauerstoffgehalt sofort steigen.', 'Nur die Kommunikation zur Erde wird beeinträchtigt.'],
      1,
      'Energie, Wasser, Luft und Wärme bilden ein Abhängigkeitsnetz. Eine Störung in einem Teilsystem wirkt über mehrere Ebenen. Diese Kaskaden sind der Grund, ein Habitat als Gesamtsystem zu betrachten.',
    ),
    q(
      'Die Batterie speichert 288 kWh. Das Habitat hat ein Defizit von 72 kWh pro Tag. Wie viele Tage lässt sich das Defizit damit überbrücken?',
      ['2 Tage', '4 Tage', '8 Tage', '12 Tage'],
      1,
      '288 kWh / 72 kWh pro Tag = 4 Tage. Dauert ein Sturm länger, braucht es zusätzliche Erzeugung oder weniger Verbrauch. Speicher verschieben Energie nur zeitlich.',
    ),
  ],
  'MARS-HABITAT:3': [
    q(
      'Welche Kombination eignet sich für einen integrierten Habitat-Test?',
      ['Drei gleichartige Ausfälle derselben Pumpe nacheinander.', 'Staubsturm (weniger Strom), ein kleines Leck (Druck) und ein ausgefallener Sensor (Diagnose) gleichzeitig.', 'Nur ein einzelner Ausfall, damit der Test übersichtlich bleibt.', 'Ein Test ohne Störung, um die Normalfunktion zu zeigen.'],
      1,
      'Ein integrierter Test kombiniert Störungen aus verschiedenen Systemen, um Kaskaden, Reserven und Diagnose zugleich zu prüfen. Gleichartige Ausfälle derselben Komponente zeigen kaum etwas über das Zusammenspiel.',
    ),
    q(
      'Warum reichen Einzeltests der Teilsysteme nicht aus, um ein Habitat als sicher einzustufen?',
      ['Weil Teilsysteme nie funktionieren.', 'Weil Wechselwirkungen und Kaskaden erst im Verbund auftreten.', 'Weil Einzeltests teurer sind als Systemtests.', 'Weil Teilsysteme nur im Gesamtsystem existieren.'],
      1,
      'Jedes Teilsystem kann für sich bestehen und im Verbund trotzdem scheitern, etwa durch gemeinsame Abhängigkeiten oder zeitliche Kopplung. Nur Szenarien über mehrere Systeme hinweg machen solche Schwächen sichtbar.',
    ),
    q(
      'Während eines Stromausfalls entsteht zusätzlich ein Leck. Was hat Vorrang?',
      ['Experimente sichern, damit keine Daten verloren gehen.', 'Das Leck eingrenzen oder die Crew in einen druckhaltigen Bereich bringen und lebenskritische Basisfunktionen sichern; danach Energie priorisieren.', 'Zuerst die Kommunikation zur Erde wiederherstellen.', 'Das Habitat vollständig abschalten, um Energie zu sparen.'],
      1,
      'Bei gleichzeitigen Störungen entscheidet die Schwere der Folgen. Druck und Atemluft sichern zuerst, weil Gefahr in Minuten bis Stunden entsteht. Energie wird danach nach festgelegter Priorität verteilt.',
    ),
  ],

  // ── Energieerzeugung ────────────────────────────────────────────────────────
  'QUIZ:POWER:CONVERSION': [
    q(
      'Ein Solarmodul liefert Strom, eine Batterie speichert ihn, eine Lampe nutzt ihn. Welches Bauteil ist der Wandler?',
      ['die Sonne', 'das Solarmodul', 'die Batterie', 'die Lampe'],
      1,
      'Das Solarmodul wandelt Strahlungsenergie in elektrische Energie. Die Sonne ist die Quelle, die Batterie ein Speicher und die Lampe der Verbraucher. Energie wird umgewandelt und nicht erzeugt.',
    ),
    q(
      'Warum kann nachts das Licht ausgehen, obwohl die Sonne als Quelle „unerschöpflich“ ist?',
      ['Weil Solarmodule nachts Energie verbrauchen.', 'Weil nachts keine Strahlung ankommt und ohne Speicher oder Zusatzquelle nichts zur Verfügung steht.', 'Weil die Lampe nachts mehr Leistung braucht.', 'Weil die Sonne nachts weniger Energie abgibt, aber trotzdem ausreicht.'],
      1,
      'Eine Quelle ist nur so nützlich wie ihr Zugang zur Last. Nachts kommt keine Strahlung an. Ohne Speicher oder regelbare Zusatzquelle bricht die Versorgung ab, auch wenn die Quelle an sich unerschöpflich ist.',
    ),
    q(
      'Ein Habitat hat Solarmodule, aber weder Speicher noch weitere Quelle. Was fehlt, damit die Nachtlast versorgt wird?',
      ['Ein größerer Verbraucher.', 'Ein Speicher oder eine regelbare Zusatzquelle, die Energie vom Tag in die Nacht verschiebt oder ersetzt.', 'Ein zweites Solarmodul gleicher Bauart am selben Platz.', 'Ein Sensor, der die Dunkelheit meldet.'],
      1,
      'Ein zweites gleichartiges Modul liefert nachts ebenfalls nichts. Es braucht ein Element, das Energie zeitlich verschiebt (Speicher) oder unabhängig vom Licht liefert. Das ist der Grund, warum Versorgung als System betrachtet wird.',
    ),
  ],
  'QUIZ:POWER:P-VS-E': [
    q(
      'Eine Anlage liefert 3 Stunden lang konstant 10 kW. Wie viel Energie ist das?',
      ['ca. 3,3 kWh', '13 kWh', '30 kWh', '30 kW'],
      2,
      'Energie = Leistung · Zeit = 10 kW · 3 h = 30 kWh. Die Einheit kW beschreibt eine Leistung, kWh eine Energiemenge.',
    ),
    q(
      'Ein Verbraucher hat 2 kW Leistung. Welche Aussage ist physikalisch sinnvoll?',
      ['Der Verbraucher braucht 2 kW pro Stunde.', 'Der Verbraucher braucht über 5 Stunden 10 kWh.', 'Die Momentanleistung beträgt 2 kWh.', 'Der Verbraucher benötigt 2 kW Energie.'],
      1,
      '2 kW · 5 h = 10 kWh. Der Ausdruck „kW pro Stunde“ vermischt Leistung und Energie, und kWh ist keine Leistungseinheit.',
    ),
    q(
      'Eine 5-kW-Anlage läuft 2 Stunden lang mit der Hälfte ihrer Nennleistung. Wie viel Energie liefert sie?',
      ['2,5 kWh', '5 kWh', '10 kWh', '25 kWh'],
      1,
      '5 kW · 0,5 = 2,5 kW, und 2,5 kW · 2 h = 5 kWh. Nennleistung sagt nichts über die tatsächlich gelieferte Energie, wenn die Anlage nicht dauernd mit voller Leistung läuft.',
    ),
  ],
  'QUIZ:POWER:EFFICIENCY': [
    q(
      'Eine Kette besteht aus Solarmodul (20 %), Wechselrichter (95 %) und Batterie (90 %). Wie hoch ist der Gesamtwirkungsgrad?',
      ['ca. 5 %', 'ca. 17 %', 'ca. 68 %', 'ca. 100 %'],
      1,
      'Die Wirkungsgrade multiplizieren sich: 0,20 · 0,95 · 0,90 = 0,171, also etwa 17 %. Den Mittelwert (68 %) zu bilden oder Verluste zu addieren (ca. 5 %) sind typische Denkfehler.',
    ),
    q(
      'Ein Hersteller wirbt mit 98 % Wirkungsgrad für den Wechselrichter. Was sagt das über das Gesamtsystem?',
      ['Das Gesamtsystem hat ebenfalls 98 %.', 'Nur etwas über diese Stufe; der Gesamtwirkungsgrad ist das Produkt aller Stufen.', 'Es sagt aus, dass die Batterie verlustfrei arbeitet.', 'Es zeigt, dass das Solarmodul 98 % des Lichts nutzt.'],
      1,
      'Ein hoher Wert in einer Stufe sagt nichts über die anderen. Die Systemgrenze muss festgelegt werden, bevor man von „Wirkungsgrad“ spricht.',
    ),
    q(
      'Eine Kette hat Solarmodul 20 %, Wechselrichter 90 %, Batterie 90 %. Eine Verbesserung um 10 Prozentpunkte ist an jeder Stelle möglich (Wechselrichter und Batterie nur bis 100 %). Welche Stufe verbessert den Gesamtwirkungsgrad am stärksten?',
      ['das Solarmodul (20 % → 30 %)', 'der Wechselrichter (90 % → 100 %)', 'die Batterie (90 % → 100 %)', 'alle drei wirken gleich stark'],
      0,
      'Solarmodul: 0,30 · 0,90 · 0,90 = 24,3 %. Wechselrichter oder Batterie: 0,20 · 1,0 · 0,90 = 18 %. Gesamt vorher: 16,2 %. Ein relativer Sprung von 20 auf 30 % wirkt stärker als zehn Prozentpunkte auf einer bereits hohen Stufe.',
    ),
  ],
  'QUIZ:POWER:SYSTEM': [
    q(
      'Ein Habitat braucht nachts 12 Stunden lang 10 kW. Wie viel nutzbare Batterieenergie wird mindestens benötigt?',
      ['10 kWh', '22 kWh', '120 kWh', '1 440 kWh'],
      2,
      '10 kW · 12 h = 120 kWh. Die Tagesenergie ist unerheblich, wenn die Batterie die Nachtlast nicht decken kann: Entscheidend ist die Versorgung zu jedem Zeitpunkt.',
    ),
    q(
      'Ein Habitat hat 6 kW Dauerlast (144 kWh/Tag). Die Solaranlage liefert 100 kWh/Tag. Löst eine größere Batterie das Problem?',
      ['Ja, eine ausreichend große Batterie gleicht jedes Defizit aus.', 'Nein, eine Batterie verschiebt nur Energie; die Tagesbilanz von −44 kWh muss durch eine regelbare Quelle oder weniger Verbrauch ausgeglichen werden.', 'Ja, Batterien erzeugen zusätzliche Energie.', 'Nein, weil Batterien nachts nie entladen werden können.'],
      1,
      'Speicher erzeugen keine Energie. Sie verschieben sie vom Überschuss in die Lücke. Wenn die Tagessumme negativ ist, leert sich jeder Speicher irgendwann.',
    ),
    q(
      'Zwei Solarfelder und zwei Batterien sind über denselben Wechselrichter angeschlossen. Wie robust ist die Versorgung?',
      ['Sehr robust, weil alles doppelt vorhanden ist.', 'Nur begrenzt, weil der gemeinsame Wechselrichter ein Single Point of Failure ist.', 'Gar nicht, weil Batterien nicht redundant sein können.', 'Robuster als bei zwei getrennten Wechselrichtern.'],
      1,
      'Dopplung allein macht noch keine Redundanz. Fällt das gemeinsame Bauteil aus, fallen beide Pfade gleichzeitig aus. Unabhängige Pfade brauchen getrennte Komponenten.',
    ),
  ],

  // ── Gravitation (Gravitationsbrunnen) ───────────────────────────────────────
  'QUIZ:GRAVITATIONSBRUNNEN-1': [
    q(
      'Ein Objekt wird von der Oberfläche (r = R) auf r = 2R gehoben, also um einen Körperradius. Welchen Anteil der gesamten idealen Fluchtarbeit hat man damit aufgebracht?',
      ['ca. ein Zehntel', 'ca. ein Viertel', 'die Hälfte', 'ca. drei Viertel'],
      2,
      'Die Fluchtarbeit ist GMm/R. Bis 2R beträgt die Potentialdifferenz GM/R − GM/(2R) = GM/(2R), also genau die Hälfte. Die ersten Kilometer enthalten nicht den größten Teil der Arbeit: Das Potential verläuft über große Entfernungen.',
    ),
    q(
      'Warum ist die ideale Mindestarbeit für das Verlassen des Gravitationsfelds endlich, obwohl die Kraft nie ganz null wird?',
      ['Weil die Gravitation in großer Entfernung plötzlich verschwindet.', 'Weil die Kraft mit 1/r² abnimmt und die insgesamt aufzubringende Arbeit gegen den endlichen Wert GMm/R strebt.', 'Weil die Kraft konstant bleibt, die Entfernung aber begrenzt ist.', 'Weil das Potential nach außen gegen −∞ geht.'],
      1,
      'Die Kraft sinkt mit dem Quadrat des Abstands. Die Summe der Arbeitsbeiträge konvergiert, und das Potential nähert sich nach außen dem Wert null. Entscheidend ist die Potentialdifferenz, nicht die Kraft an einem Ort.',
    ),
    q(
      'Zwei Himmelskörper haben dieselbe Masse. Der zweite hat den doppelten Radius. Wie verhält sich die ideale Fluchtarbeit pro Kilogramm von der Oberfläche?',
      ['gleich', 'halb so groß', 'doppelt so groß', 'viermal so groß'],
      1,
      'Fluchtarbeit pro Kilogramm = GM/R. Bei gleichem M und doppeltem R halbiert sich der Wert. Eine größere, aber gleich schwere Oberfläche liegt „flacher“ im Gravitationsbrunnen.',
    ),
  ],
  'QUIZ:GRAVITATIONSBRUNNEN-2': [
    q(
      'Für die Erde gilt GM/R ≈ 62,5 MJ/kg. Wie groß ist die ideale Mindestarbeit, um 1 Tonne ins Unendliche zu bringen?',
      ['ca. 6,25 GJ', 'ca. 62,5 GJ', 'ca. 625 GJ', 'ca. 6 250 GJ'],
      1,
      '62,5 MJ/kg · 1 000 kg = 62,5 GJ, das sind etwa 17 MWh. Das ist die ideale Untergrenze, ohne Luftwiderstand und Raketenverluste.',
    ),
    q(
      'Wie ändert sich die Fluchtgeschwindigkeit vₑ = √(2GM/r), wenn der Abstand r vervierfacht wird?',
      ['Sie bleibt gleich.', 'Sie halbiert sich.', 'Sie viertelt sich.', 'Sie verdoppelt sich.'],
      1,
      'vₑ ist proportional zu 1/√r. Vervierfachtes r ergibt √4 = 2 im Nenner, also die halbe Geschwindigkeit. Aus großer Höhe zu entkommen kostet weniger Geschwindigkeit als von der Oberfläche.',
    ),
    q(
      'Warum liegt der reale Energiebedarf eines Raketenstarts deutlich über der idealen Fluchtenergie?',
      ['Weil Gravitation bei Raketen stärker wirkt.', 'Weil Luftwiderstand, Steuerverluste und das Mitbeschleunigen des Treibstoffs zusätzliche Energie kosten.', 'Weil Raketen das Gravitationsfeld ausschalten müssen.', 'Weil die Fluchtenergie nur für Planeten ohne Atmosphäre gilt.'],
      1,
      'Die Fluchtenergie ist ein Idealmodell. Real geht Energie durch Luftwiderstand und durch Verluste beim langsamen Steigen verloren, und der Treibstoff muss selbst mit beschleunigt werden. Das Idealmodell bleibt trotzdem die Untergrenze.',
    ),
  ],

  // ── Orbitalmechanik (Hohmann) ───────────────────────────────────────────────
  'QUIZ:ORBITAL-1': [
    q(
      'Warum fliegt ein Raumschiff zum Mars nicht einfach auf einer geraden Linie?',
      ['Weil im Weltraum Luftwiderstand gerade Wege bremst.', 'Weil Schiff und Mars sich im Gravitationsfeld der Sonne bewegen und die energiesparende Bahn die Bewegung der Erde nutzt.', 'Weil Raketen technisch nur Kurven fliegen können.', 'Weil eine gerade Linie immer der längere Weg ist.'],
      1,
      'Das Schiff startet mit der Bahngeschwindigkeit der Erde und steht unter der Schwerkraft der Sonne. Die Zielplaneten bewegen sich ebenfalls. Statt gegen diese Bewegung anzufliegen, nutzt man eine Ellipse, die beide Bahnen verbindet.',
    ),
    q(
      'Was ist ein Transferfenster?',
      ['Ein Fenster im Raumschiff für die Beobachtung der Bahn.', 'Der Zeitraum, in dem die Planeten so zueinander stehen, dass die Transferellipse das Ziel zur Ankunft trifft; Erde–Mars etwa alle 26 Monate.', 'Eine Zeitspanne, in der der Funkkontakt zur Erde besteht.', 'Der Abstand zwischen zwei Triebwerkszündungen.'],
      1,
      'Erde und Mars umlaufen die Sonne unterschiedlich schnell. Nur bei passender Stellung trifft die energiesparende Bahn den Zielplaneten. Diese Konstellation wiederholt sich etwa alle 26 Monate.',
    ),
    q(
      'Ein Raumschiff verpasst das Startfenster zum Mars. Welche Konsequenz ist am sinnvollsten?',
      ['Sofort starten und mehr Energie verwenden, ohne auf Stellung zu achten.', 'Auf das nächste Fenster warten, weil ein Start zu einer ungünstigen Stellung deutlich mehr Δv verlangen würde.', 'Den Start ausfallen lassen und zur Venus fliegen.', 'Die Bahn geradeaus wählen, weil die Stellung egal ist.'],
      1,
      'Außerhalb des Fensters trifft die Transferbahn den Mars nicht. Das Treffen zu erzwingen kostet viel zusätzliche Geschwindigkeitsänderung. Im All ist Warten oft billiger als Energie.',
    ),
  ],
  'QUIZ:ORBITAL-2': [
    q(
      'Wie viele Triebwerksmanöver braucht ein Hohmann-Transfer zwischen zwei Kreisbahnen mindestens?',
      ['eins', 'zwei', 'drei', 'vier'],
      1,
      'Ein Manöver bringt das Schiff aus der Startbahn auf die Transferellipse, ein zweites passt die Geschwindigkeit am Ziel an die Zielbahn an. Daher hat der Hohmann-Transfer genau zwei Zündungen.',
    ),
    q(
      'Die Transferellipse Erde–Mars hat eine große Halbachse von etwa 1,262 AE. Nach dem dritten Keplerschen Gesetz beträgt die Umlaufzeit T = a^1,5 Jahre. Wie lange dauert die Reise (halbe Ellipse) etwa?',
      ['ca. 26 Tage', 'ca. 100 Tage', 'ca. 259 Tage', 'ca. 520 Tage'],
      2,
      'T = 1,262^1,5 ≈ 1,42 Jahre. Die halbe Ellipse dauert 0,71 Jahre ≈ 259 Tage. Der Hohmann-Transfer ist langsam, aber sparsam.',
    ),
    q(
      'Warum kann eine längere Reise weniger Energie brauchen als eine kürzere?',
      ['Weil Raumschiffe auf längeren Wegen weniger wiegen.', 'Weil die energiesparende Ellipse nur wenig Geschwindigkeitsänderung braucht, während schnellere Bahnen deutlich mehr Δv verlangen.', 'Weil im All lange Wege immer kostenlos sind.', 'Weil die Schwerkraft auf längeren Wegen verschwindet.'],
      1,
      'Δv ist die entscheidende Kostengröße. Der Hohmann-Transfer minimiert sie, und der Preis dafür ist Zeit. Schnellere Transfers verlangen höhere Geschwindigkeitsänderungen und damit viel mehr Treibstoff.',
    ),
  ],
};

/**
 * Die Antworten sind oben nach Sinn geschrieben. Damit die richtige Antwort nicht auffällig oft an derselben Stelle steht,
 * werden Fragen mit Satzantworten deterministisch gedreht (die Reihenfolge bleibt zyklisch erhalten).
 * Fragen mit Zahlen- oder Kurzantworten behalten ihre natürliche, meist aufsteigende Reihenfolge.
 */
function isSentenceLike(options: QuizQuestion['a']): boolean {
  return options.reduce((sum, option) => sum + option.length, 0) / options.length >= 30;
}

function balance(key: string, test: QuizTriple): QuizTriple {
  const keyIndex = Object.keys(tests).indexOf(key);
  return test.map((question, index) => {
    if (!isSentenceLike(question.a)) return question;
    const target = (keyIndex * 2 + index * 3 + 1) % 4;
    const shift = (target - question.correct + 4) % 4;
    const rotated = [0, 1, 2, 3].map((i) => question.a[(i - shift + 4) % 4]) as QuizQuestion['a'];
    return { ...question, a: rotated, correct: target as QuizQuestion['correct'] };
  }) as QuizTriple;
}

export function examQuiz(key: string): string {
  const test = tests[key];
  if (!test) throw new Error(`Kein Kurztest für ${key} definiert`);
  return quiz(balance(key, test));
}

export function hasExamQuiz(key: string): boolean {
  return key in tests;
}

export const noxiaExamQuizKeys = Object.keys(tests);
