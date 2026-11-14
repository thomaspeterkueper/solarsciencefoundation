import { q, type QuizTriple } from './quizAuthoring';

/** Ersatz-Kurztests der Wasser-Module (Stichwort-Quizze waren nicht auswertbar). Aufbau siehe quizRepairs.ts. */
export const waterQuizRepairs: Record<string, QuizTriple> = {
  'PATH:SSF:PHY-WASSER-MOLEKUEL-0001|UNIT:WASSER-DIPOL': [
    q('CO₂ ist linear gebaut und hat zwei polare Bindungen, trotzdem aber kein Dipolmoment. Warum?', ['Die beiden Bindungsdipole zeigen in entgegengesetzte Richtungen und heben sich auf', 'CO₂ enthält keine Elektronen', 'Kohlenstoff ist unpolar', 'Die Bindungen sind unpolar'], 0, 'Bei Wasser verhindert der Winkel von 104,5° das Aufheben der Bindungsdipole. Bei linearem CO₂ gleichen sie sich aus.'),
    q('Was macht das Wassermolekül zum Dipol?', ['Es ist gewinkelt, sodass die Ladungsschwerpunkte nicht zusammenfallen: Sauerstoffseite negativ, Wasserstoffseite positiv', 'Es ist elektrisch geladen', 'Es ist linear gebaut', 'Es enthält ein freies Proton'], 0, 'Der Bindungswinkel von 104,5° und die stärkere Elektronenanziehung des Sauerstoffs erzeugen zwei ungleiche Pole.'),
    q('Ein geladener Kamm lenkt einen dünnen Wasserstrahl ab. Was zeigt das?', ['Wassermoleküle richten sich im elektrischen Feld aus und werden angezogen, weil sie Dipole sind', 'Wasser ist magnetisch', 'Der Kamm erwärmt das Wasser', 'Wasser ist ein Metall'], 0, 'Die Pole der Wassermoleküle werden vom geladenen Kamm angezogen. Das ist ein einfacher Nachweis des Dipolcharakters.'),
  ],
  'PATH:SSF:PHY-WASSER-AGGREGAT-0001|UNIT:AGGREGAT-KURVE': [
    q('Eis schmilzt mit 334 J/g. Wie viel Energie braucht 500 g Eis bei 0 °C, um vollständig zu schmelzen?', ['0,67 kJ', '16,7 kJ', '167 kJ', '1670 kJ'], 2, '500 g mal 334 J/g sind 167 000 J, also 167 kJ. Die Temperatur bleibt dabei bei 0 °C.'),
    q('Warum steigt die Temperatur beim Schmelzen von Eis nicht, obwohl der Herd Energie liefert?', ['Die Energie wird zum Aufbrechen von Bindungen im Eisgitter gebraucht', 'Das Thermometer zeigt falsch an', 'Eis nimmt keine Wärme auf', 'Die Energie geht verloren'], 0, 'Diese latente Wärme ist nötig, um Bindungen zu lösen. Erst danach erhöht weitere Energie die Temperatur.'),
    q('Ein Getränk wird mit 100 g Eis bei 0 °C gekühlt oder mit 100 g Wasser bei 0 °C. Was kühlt stärker?', ['Das Eis, weil es beim Schmelzen zusätzlich 334 J/g aufnimmt', 'Das Wasser, weil es flüssig ist', 'Beides gleich', 'Keines von beiden'], 0, 'Eis bei 0 °C nimmt Schmelzwärme auf, ohne wärmer zu werden. Das Wasser bei 0 °C hat diesen Zusatzeffekt nicht.'),
  ],
  'PATH:SSF:PHY-WASSER-ANOMALIE-0001|UNIT:ANOMALIE-DICHTE': [
    q('Ein See ist im Winter oben von Eis bedeckt. Welche Temperatur hat das Wasser am Grund ungefähr?', ['0 °C', '4 °C', '10 °C', '−4 °C'], 1, 'Wasser ist bei 4 °C am dichtesten und sinkt ab. Darüber liegen kälteres Wasser und das Eis.'),
    q('Eis hat eine Dichte von 0,917 g/cm³. Wie groß ist der Anteil eines schwimmenden Eisblocks, der unter Süßwasser liegt?', ['Etwa 9 %', 'Etwa 50 %', 'Etwa 92 %', '100 %'], 2, 'Der eingetauchte Anteil entspricht dem Dichteverhältnis 0,917 zu 1,0, also rund 92 %.'),
    q('Warum ist Eis leichter als flüssiges Wasser?', ['Es hat eine offene Kristallstruktur mit größeren Abständen zwischen den Molekülen', 'Es enthält weniger Moleküle pro Gramm', 'Es ist leichter, weil es kälter ist', 'Es enthält Luft'], 0, 'Wasserstoffbrücken zwingen die Moleküle im Eis in ein lockeres Gitter. Dadurch nimmt dieselbe Masse mehr Volumen ein.'),
  ],
  'PATH:SSF:PHY-WASSER-OBERFLAECHE-0001|UNIT:OBERF-SPANNUNG': [
    q('Eine Büroklammer schwimmt auf Wasser. Du gibst einen Tropfen Spülmittel dazu. Was passiert?', ['Sie sinkt, weil das Spülmittel die Oberflächenspannung zerstört', 'Sie schwimmt weiter', 'Sie steigt auf', 'Das Wasser wird dichter'], 0, 'Tenside senken die Oberflächenspannung stark. Die Wasserhaut trägt die Klammer dann nicht mehr.'),
    q('Warum entsteht an der Wasseroberfläche eine Spannung?', ['Moleküle an der Oberfläche haben oben keine Nachbarn und werden nach unten und zur Seite stärker gezogen', 'Luft drückt auf das Wasser', 'Wasser ist an der Oberfläche kälter', 'Es gibt dort mehr Salz'], 0, 'Im Inneren ziehen Nachbarn von allen Seiten, an der Oberfläche fehlt der Zug nach oben. Das ergibt eine elastische Haut.'),
    q('Warmes Wasser benetzt Stoffe und Poren besser als kaltes. Welcher Zusammenhang erklärt das?', ['Die Oberflächenspannung sinkt mit steigender Temperatur', 'Die Oberflächenspannung steigt mit der Temperatur', 'Warmes Wasser ist dichter', 'Warmes Wasser enthält weniger Moleküle'], 0, 'Mit wachsender Temperatur schwächt sich der Zusammenhalt der Oberfläche ab. Das Wasser dringt leichter in feine Räume ein.'),
  ],
  'PATH:SSF:PHY-WASSER-DAMPF-0001|UNIT:DAMPF-VERDUNSTUNG': [
    q('Welche Bedingungen trocknen Wäsche am schnellsten?', ['Hohe Temperatur, starker Wind, niedrige Luftfeuchte', 'Niedrige Temperatur, Windstille, hohe Luftfeuchte', 'Hohe Luftfeuchte und Wind', 'Windstille bei trockener Luft'], 0, 'Wärme gibt Molekülen mehr Energie, Wind führt Dampf ab, trockene Luft nimmt viel auf. Alle drei beschleunigen die Verdunstung.'),
    q('Warum verdunstet Wasser schon bei 20 °C, obwohl es erst bei 100 °C kocht?', ['Einzelne Moleküle an der Oberfläche haben genug kinetische Energie, um zu entweichen', 'Bei 20 °C kocht Wasser leicht', 'Wasser zerfällt bei 20 °C', 'Verdunstung braucht keine Energie'], 0, 'Die Energie der Moleküle ist verteilt. Immer einige schnelle können entweichen, auch ohne Kochen.'),
    q('Warum kühlt Verdunstung die zurückbleibende Flüssigkeit?', ['Die energiereichsten Moleküle verlassen die Flüssigkeit, die mittlere Energie des Rests sinkt', 'Dampf ist kalt', 'Die Luft entzieht Wärme ohne Verdunstung', 'Wasser wird dichter'], 0, 'Wer entweicht, nimmt überdurchschnittlich viel Energie mit. Die Restflüssigkeit wird kühler, wie beim Schwitzen.'),
  ],
  'PATH:SSF:CHE-WASSER-LOESUNG-0001|UNIT:LOESUNG-SALZ': [
    q('Wie wird ein Na⁺-Ion in Wasser umgeben?', ['Vom negativen Ende (Sauerstoff) der Wassermoleküle', 'Vom positiven Ende der Wassermoleküle', 'Von keinem Wassermolekül', 'Von Salzmolekülen'], 0, 'Positive Ionen werden von der negativen Seite der Wasserdipole angezogen. Chlorid-Ionen werden von der positiven Seite umgeben.'),
    q('Warum löst sich Kochsalz in Wasser, aber nicht in Speiseöl?', ['Öl-Moleküle sind unpolar und können die Ionen nicht umhüllen', 'Öl ist zu kalt', 'Öl enthält kein Wasser', 'Salz ist schwerer als Öl'], 0, 'Nur Dipole können die Ionenladungen abschirmen und die Ionen aus dem Gitter lösen.'),
    q('Salzwasser wird bis zur Trockenheit eingekocht. Was bleibt zurück?', ['Salzkristalle, weil die Ionen nur umhüllt und nicht zerstört wurden', 'Nichts', 'Natrium und Chlorgas', 'Nur Wasserdampf'], 0, 'Beim Lösen bleiben die Ionen erhalten. Verdunstet das Wasser, ordnen sie sich wieder zum Kristall.'),
  ],
  'PATH:SSF:PHY-WASSER-WAERME-0001|UNIT:WAERME-KAPAZITAET': [
    q('Wie viel Energie braucht 1 kg Wasser (c = 4186 J/(kg·K)), um sich um 10 K zu erwärmen?', ['4,19 kJ', '41,9 kJ', '419 kJ', '4186 kJ'], 1, 'Q = m · c · ΔT = 1 kg · 4186 J/(kg·K) · 10 K = 41 860 J, also etwa 41,9 kJ.'),
    q('Warum ist Sand mittags viel heißer als Meerwasser?', ['Sand hat eine viel kleinere Wärmekapazität, dieselbe Energie erhöht seine Temperatur stärker', 'Sand bekommt mehr Sonne', 'Wasser reflektiert alles Licht', 'Sand ist dunkler als Wasser'], 0, 'Wasser braucht etwa fünfmal mehr Energie pro Kelvin als Sand. Bei gleicher Einstrahlung steigt seine Temperatur langsamer.'),
    q('Warum ist das Klima an Küsten ausgeglichener als im Landesinneren?', ['Das Meer speichert viel Wärme und gibt sie langsam ab', 'Das Meer erzeugt Wärme', 'Küsten bekommen mehr Sonne', 'Wind fehlt an Küsten'], 0, 'Die hohe Wärmekapazität des Wassers dämpft Temperaturschwankungen zwischen Tag und Nacht und zwischen den Jahreszeiten.'),
  ],
};
