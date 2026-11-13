/**
 * Konkrete Lerninhalte (Beobachtung, Erklärung, Modell, Rechenaufgabe mit Lösung) für die
 * NOXIA-Freischalt-Lernpfade. Jede Einheit hat ein Szenario mit Zahlen, eine Erklärung mit der
 * tragenden Formel, ein interaktives Modell (wo vorhanden) und eine Aufgabe mit vollständigem Lösungsweg.
 * Die Modelle stehen in lib/habitatModels.ts und sind in components/learning/experimentRegistry.ts registriert.
 */

export type UnitExperiment = { id: string; title: string; summary: string };
export type UnitContent = {
  observation: string;
  explanation: string;
  experiment?: UnitExperiment;
  exercise: { task: string; solution: string };
};

export const unlockUnitContent: Record<string, [UnitContent, UnitContent, UnitContent]> = {
  'RESOURCE-EXTRACTION': [
    {
      observation: 'Ein Erz enthält 2 % nutzbares Metall. Für eine Tonne Metall müssen mindestens 50 Tonnen Gestein abgebaut, zerkleinert und sortiert werden – auch wenn jeder Schritt perfekt funktionierte. Wie viel mehr wird es in der Praxis?',
      explanation: 'Die Konzentration einer Lagerstätte (Gehalt) bestimmt, wie viel Material bewegt werden muss: Gesteinsmasse = Metallmasse ÷ (Gehalt · Ausbeute). Jeder Verarbeitungsschritt verliert einen Teil des Wertstoffs. Die Gesamtausbeute ist das Produkt aller Schrittausbeuten, nicht ihr Mittelwert.',
      exercise: {
        task: 'Eine Anlage soll 2 Tonnen Metall pro Tag liefern. Das Erz hat 2 % Gehalt, die Gesamtausbeute der Kette beträgt 80 %. Wie viele Tonnen Erz müssen täglich verarbeitet werden?',
        solution: 'Metall im Erz = 2 t ÷ 0,80 = 2,5 t. Erz = 2,5 t ÷ 0,02 = 125 t pro Tag. Bei 70 % Ausbeute wären es 143 t – ein Ausbeuteverlust von zehn Punkten kostet also 18 t mehr Gestein pro Tag.',
      },
    },
    {
      observation: 'Nach dem Zerkleinern liegen Wertstoff und Gestein als gemischte Körner vor. Eine Sortierung nutzt Dichte, Magnetismus oder Benetzbarkeit, um sie zu trennen. Aber jeder Schritt erzeugt auch einen Reststrom.',
      explanation: 'Ein Trennschritt hat zwei Kennzahlen: Ausbeute (wie viel Wertstoff gewinnst du?) und Reinheit (wie sauber ist das Produkt?). Beide ziehen in entgegengesetzte Richtung: Engere Trennung erhöht die Reinheit, verliert aber Wertstoff im Abfall. Das Modell zeigt eine Kette aus mehreren Schritten.',
      experiment: { id: 'EXP:NOX-RESOURCE-CHAIN', title: 'Prozesskette der Rohstofftrennung', summary: 'Verändere die Trennschärfe der Schritte und beobachte, wie sich Ausbeute, Reinheit und Reststoffe gemeinsam verschieben.' },
      exercise: {
        task: 'Eine Kette besteht aus drei Schritten mit Ausbeuten von 90 %, 85 % und 80 %. Wie hoch ist die Gesamtausbeute, und wie viel Prozent des Wertstoffs gehen im Abfall verloren?',
        solution: 'Gesamtausbeute = 0,90 · 0,85 · 0,80 = 0,612, also 61,2 %. Verloren gehen 38,8 %. Der Mittelwert der drei Zahlen (85 %) würde das Ergebnis um 24 Punkte überschätzen.',
      },
    },
    {
      observation: 'Ein vierter Aufbereitungsschritt würde die Ausbeute von 61 % auf 70 % heben, kostet aber 25 % mehr Energie und eine zusätzliche Anlage. Lohnt er sich?',
      explanation: 'Ein zusätzlicher Schritt lohnt sich, wenn der Mehrertrag den Mehraufwand übertrifft. Der Maßstab ist der Aufwand pro gewonnener Tonne Metall, nicht der Aufwand pro Schritt. Auch Reststoffe zählen: Mehr Ausbeute bedeutet weniger Abraum.',
      exercise: {
        task: 'Die Kette braucht 100 Energieeinheiten pro 125 t Erz und liefert bei 61 % Ausbeute 1,5 t Metall. Der vierte Schritt hebt die Ausbeute auf 70 % und erhöht den Energiebedarf um 25 %. Vergleiche den Energiebedarf pro Tonne Metall.',
        solution: 'Ohne den Schritt: 100 ÷ 1,5 = 66,7 Einheiten pro Tonne. Mit dem Schritt: 125 ÷ (1,5 · 70/61 = 1,72) = 72,6 Einheiten pro Tonne. Der Schritt liefert 15 % mehr Metall, kostet aber 25 % mehr Energie: pro Tonne wird es schlechter. Er lohnt sich nur, wenn Erz knapp ist oder der Abraum teuer wird.',
      },
    },
  ],

  'PRESSURE-SYSTEMS': [
    {
      observation: 'Eine Luke von 1 m mal 1 m trennt 101 kPa Innendruck von knapp 0,6 kPa Marsatmosphäre. Wie schwer ist das, was die Luke halten muss?',
      explanation: 'Druck wirkt auf jede Fläche und erzeugt eine Kraft: F = Δp · A. Bei 100 kPa auf einem Quadratmeter sind das 100 kN, etwa zehn Tonnen. Verdoppelt sich die Kantenlänge, vervierfacht sich die Kraft. Für einen Zylinder der Wanddicke t und Radius r entsteht in der Wand die Spannung σ = p · r ÷ t.',
      exercise: {
        task: 'Ein zylindrischer Habitatmodul hat 2,5 m Radius und 5 mm Aluminiumwand (Streckgrenze etwa 270 MPa). Der Innendruck beträgt 101 kPa gegen Vakuum. Wie groß ist die Wandspannung, und wie groß ist der Sicherheitsfaktor gegen Fließen?',
        solution: 'σ = p · r ÷ t = 101 000 Pa · 2,5 m ÷ 0,005 m = 50,5 MPa. Sicherheitsfaktor = 270 ÷ 50,5 ≈ 5,3. Das ist komfortabel, lässt aber Schweißnähte, Ausschnitte und Alterung noch nicht berücksichtigt.',
      },
    },
    {
      observation: 'Ein Loch von 12 mm Durchmesser in einem 150-m³-Habitat. Der Druck fällt zunächst kaum merklich. Wie schnell wird es kritisch?',
      explanation: 'Bei einem Leck ins Vakuum strömt die Luft mit Schallgeschwindigkeit durch die Öffnung. Der Massenstrom ist proportional zum Innendruck, deshalb fällt der Druck exponentiell: p(t) = p0 · e^(−t ÷ τ). Die Zeitkonstante τ wächst mit dem Volumen und fällt mit dem Lochquerschnitt, also mit dem Quadrat des Durchmessers. Eine Nachspeisung stellt ein Gleichgewicht ein, aber auf niedrigerem Druck.',
      experiment: { id: 'EXP:HABITAT:PRESSURE-LEAK', title: 'Druckverlust durch ein kleines Leck', summary: 'Verändere Volumen, Lochgröße und Nachspeisung und beobachte die Zeit bis zur Warn- und zur kritischen Schwelle.' },
      exercise: {
        task: 'Im Modell fällt der Druck bei 12 mm Loch und 150 m³ mit τ ≈ 3,1 h. Wie ändert sich τ bei 24 mm, und wie lange dauert es dann bis zur Warnschwelle von 90 kPa?',
        solution: 'Die Fläche wächst mit d², also um den Faktor 4. τ sinkt auf 3,1 h ÷ 4 ≈ 46 min. Bis 90 kPa: t = τ · ln(101,3 ÷ 90) = 46 min · 0,118 ≈ 5,4 min. Ein doppelt so großes Loch lässt nur ein Viertel der Zeit.',
      },
    },
    {
      observation: 'Die Nachspeisung läuft seit der Nacht doppelt so lange wie sonst, aber der Druck liegt konstant bei 101 kPa. Alles in Ordnung?',
      explanation: 'Wenn Nachspeisung und Leckstrom im Gleichgewicht sind, bleibt der Druck stabil, obwohl ein Leck vorliegt. Ein einzelner Grenzwert auf dem Druck erkennt das nicht. Aussagekräftiger sind der Nachspeisestrom, der Trend und die Summe aus Druckverlust und Nachspeisung. Eine Überwachung muss das gesamte Stoffgleichgewicht betrachten.',
      exercise: {
        task: 'Der Druck bleibt bei 101 kPa, aber die Nachspeiserate stieg über Nacht von 20 auf 400 l/min. Was folgt daraus, und welche Maßnahme leitest du ein?',
        solution: 'Die Nachspeisung gleicht einen Verlust von etwa 380 l/min aus, es muss also ein Leck bestehen. Im Beispiel entspricht das einem Loch von etwa 8 bis 9 mm. Maßnahme: Leck lokalisieren (Drucktest je Sektion), betroffene Sektion absperren, Nachspeisereserve prüfen. Ein Alarm auf der Nachspeiserate hätte das Problem Stunden früher gezeigt als einer auf dem Druck.',
      },
    },
  ],

  AIRLOCK: [
    {
      observation: 'Eine Luke von 0,9 m mal 2,0 m trennt Schleuse und Außenraum. Würde sie bei 101 kPa Differenz noch zu öffnen sein?',
      explanation: 'Die Kraft auf die Tür beträgt F = Δp · A. Bei 1,8 m² und 101 kPa sind das 182 kN, rund 18 Tonnen. Eine Schleuse darf eine Tür erst freigeben, wenn der Druck auf beiden Seiten ausgeglichen ist. Das stellt keine Vorschrift sicher, sondern eine Verriegelung, die den gemessenen Druck prüft und nie beide Türen gleichzeitig freigibt.',
      exercise: {
        task: 'Die Innentür darf nur öffnen, wenn die Druckdifferenz höchstens 0,5 kPa beträgt. Wie groß ist dann die Restkraft auf die Tür (1,8 m²), und warum ist eine Schwelle nötig statt „Null“?',
        solution: 'F = 500 Pa · 1,8 m² = 900 N, etwa 92 kg Gewichtskraft – von Hand zu öffnen. Eine Schwelle statt Null ist nötig, weil Sensoren Toleranz und Rauschen haben und ein exakter Ausgleich bei Temperaturänderungen nie exakt gehalten wird.',
      },
    },
    {
      observation: 'Eine Schleuse von 4 m³ wird zwölfmal am Tag benutzt. Bei jedem Zyklus bleibt etwas Luft zurück. Wie viel ist das über eine Woche?',
      explanation: 'Beim Abpumpen wird ein Teil der Luft zurückgewonnen, der Rest entweicht. Verlust je Zyklus = Volumen · Luftdichte · (1 − Rückgewinnung). Die Zyklusdauer folgt aus dem Pumpen: t = V ÷ S · ln(1 ÷ (1 − Rückgewinnung)). Höhere Rückgewinnung spart Luft, kostet aber Zeit.',
      experiment: { id: 'EXP:HABITAT:AIRLOCK-CYCLE', title: 'Luftverlust einer Schleuse über viele Zyklen', summary: 'Verändere Volumen, Rückgewinnung und Zyklenzahl und beobachte, wann die Luftreserve aufgebraucht ist.' },
      exercise: {
        task: 'Schleuse mit 4 m³, 90 % Rückgewinnung, 12 Zyklen am Tag, Luftdichte 1,2 kg/m³. Wie viel Luft geht pro Tag verloren, und wie lange reicht eine Reserve von 40 kg?',
        solution: 'Verlust je Zyklus = 4 · 1,204 · 0,10 = 0,48 kg. Pro Tag: 12 · 0,48 = 5,8 kg. Die Reserve reicht 40 ÷ 5,8 ≈ 6,9 Tage. Mit 99 % Rückgewinnung sinkt der Verlust auf 0,6 kg pro Tag, die Reserve reicht fast 70 Tage.',
      },
    },
    {
      observation: 'Das Team schlägt vor, 99 % Rückgewinnung einzuführen. Das spart Luft, macht aber jeden Außengang länger. Wie entscheidest du?',
      explanation: 'Eine Schleusenauslegung ist ein Zielkonflikt: Luftverlust, Zykluszeit, Pumpenleistung und Zahl der Außengänge. Entscheidend ist der Engpass. Wenn die Luft knapper ist als die Zeit, gewinnt die höhere Rückgewinnung. Wenn viele Außengänge in kurzer Zeit nötig sind, kann die Zykluszeit der Engpass sein.',
      exercise: {
        task: 'Pumpe mit 2 m³/min, Schleuse 4 m³, fixe Türzeit 3 min. Vergleiche 90 % und 99 % Rückgewinnung bei 12 Zyklen am Tag nach Luftverlust pro Tag und Gesamtzeit pro Tag.',
        solution: '90 %: Zykluszeit = 4 ÷ 2 · ln(10) + 3 = 7,6 min, Verlust 5,8 kg, Gesamtzeit 91 min. 99 %: Zykluszeit = 2 · ln(100) + 3 = 12,2 min, Verlust 0,6 kg, Gesamtzeit 146 min. Die höhere Rückgewinnung spart 5,2 kg Luft pro Tag und kostet 55 Minuten. Bei 12 Zyklen am Tag ist das tragbar, bei 60 Zyklen nicht.',
      },
    },
  ],

  'LIFE-SUPPORT': [
    {
      observation: 'Ein Mensch verbraucht pro Tag etwa 0,8 kg Sauerstoff und erzeugt rund 1 kg CO₂. Dazu kommen 2 bis 3 Liter Wasser, die ausgeschieden und wieder aufbereitet werden müssen. Das geschieht ununterbrochen, bei vier Personen also das Vierfache.',
      explanation: 'Lebenserhaltung bedeutet, fortlaufende Stoffströme im Gleichgewicht zu halten: Sauerstoff zuführen, CO₂ entfernen, Wasser aufbereiten, Feuchte und Temperatur regeln. Jeder dieser Ströme braucht Energie und stützt andere Systeme. Nichts davon darf „einmal eingestellt“ werden, es muss laufen.',
      exercise: {
        task: 'Vier Personen leben 30 Tage im Habitat. Wie viel Sauerstoff wird verbraucht und wie viel CO₂ muss entfernt werden (0,84 kg O₂ und 1,0 kg CO₂ je Person und Tag)?',
        solution: 'Sauerstoff = 4 · 30 · 0,84 = 101 kg. CO₂ = 4 · 30 · 1,0 = 120 kg. Das CO₂ wiegt mehr als der verbrauchte Sauerstoff, weil der Kohlenstoff aus der Nahrung stammt.',
      },
    },
    {
      observation: 'Der CO₂-Wäscher fällt aus. Die Luft fühlt sich zunächst normal an. Wie viel Zeit bleibt?',
      explanation: 'Das Luftvolumen ist ein Puffer. Die CO₂-Konzentration steigt linear: Anstieg = Personen · 20 l pro Stunde ÷ Luftvolumen. Je kleiner das Volumen pro Person, desto kürzer die Reaktionszeit. Ein teilweise laufender Reserveweg verlängert die Zeit in gleichem Maß, wie er CO₂ entfernt.',
      experiment: { id: 'EXP:HABITAT:CO2-BUILDUP', title: 'CO₂ steigt, wenn der Wäscher ausfällt', summary: 'Verändere Besatzung, Luftvolumen und Restleistung und beobachte, wann die Grenzwerte erreicht werden.' },
      exercise: {
        task: 'Vier Personen in 150 m³, Ausgangswert 600 ppm. Wie schnell steigt die CO₂-Konzentration nach Ausfall, und wann ist die Dauergrenze von 5.000 ppm erreicht?',
        solution: 'Anstieg = 4 · 20 l/h ÷ 150 000 l = 5,3 · 10⁻⁴ pro Stunde, das sind 533 ppm/h. Bis 5.000 ppm: (5.000 − 600) ÷ 533 = 8,3 Stunden. Mit 12 Personen in 50 m³ wären es nur etwa eine Stunde.',
      },
    },
    {
      observation: 'Das Budget erlaubt entweder einen zweiten, baugleichen CO₂-Wäscher oder einen Satz chemischer Absorberkartuschen (Lithiumhydroxid). Welche Reserve ist robuster?',
      explanation: 'Ein baugleicher zweiter Wäscher teilt dieselbe Stromversorgung, dieselbe Software und dieselben Fehlerursachen. Eine unabhängige Alternative, die ohne Strom funktioniert, ist unabhängiger, verbraucht aber Material. Reserve ist nur dann Reserve, wenn der Ausfallgrund des Hauptsystems sie nicht ebenfalls trifft.',
      exercise: {
        task: 'Bei 4 kg CO₂ pro Tag: Wie viel Lithiumhydroxid braucht man mindestens pro Tag und für eine Sieben-Tage-Reserve? (2 LiOH + CO₂ → Li₂CO₃ + H₂O; Molmassen LiOH 23,95 g/mol, CO₂ 44,0 g/mol)',
        solution: 'Je Mol CO₂ werden 2 Mol LiOH benötigt: 2 · 23,95 = 47,9 g pro 44,0 g CO₂, also 1,09 kg LiOH je kg CO₂. Bei 4 kg CO₂ pro Tag sind das mindestens 4,4 kg LiOH pro Tag, für sieben Tage rund 31 kg – theoretisch, in der Praxis mehr. Dafür läuft diese Reserve ohne Strom.',
      },
    },
  ],

  'THERMAL-CONTROL': [
    {
      observation: 'Ein Habitat erzeugt durch Geräte und Menschen 8 kW Wärme. Die Hülle verliert 60 Watt je Kelvin Temperaturunterschied. Draußen sind es −60 °C. Wo pendelt sich die Innentemperatur ein, wenn nichts kühlt?',
      explanation: 'Im Gleichgewicht ist abgegebene gleich erzeugter Wärme: P = UA · (T_innen − T_außen). Daraus folgt T_innen = T_außen + P ÷ UA. Eine bessere Dämmung (kleineres UA) hebt die Innentemperatur: Isolation entfernt keine Wärmequelle, sie behindert nur die Abgabe.',
      exercise: {
        task: 'P = 8 kW, UA = 60 W/K, Außentemperatur −60 °C. Wie hoch wird die Innentemperatur ohne Kühlung im Gleichgewicht? Wie viel Wärme muss ein Kühlkreis bei 22 °C abführen?',
        solution: 'T_innen = −60 + 8 000 ÷ 60 = 73 °C. Bei 22 °C verliert die Hülle 60 · 82 = 4,9 kW, es bleiben 8 − 4,9 = 3,1 kW, die der Kühlkreis abführen muss. Ein Kühlkreis mit 5 kW hat damit gut 60 % Reserve.',
      },
    },
    {
      observation: 'Der Kühlkreis fällt um vier Uhr aus. Das Habitat ist zuvor bei 22 °C. Wann wird es zu warm?',
      explanation: 'Nach dem Ausfall steigt die Temperatur mit der Rate dT/dt = (P − UA · (T − T_außen)) ÷ C, wobei C die Wärmekapazität ist. Die Zeitkonstante τ = C ÷ UA gibt an, wie langsam das Habitat dem Gleichgewicht zustrebt. Große Wärmekapazität verschafft Zeit, ändert aber das Gleichgewicht nicht.',
      experiment: { id: 'EXP:HABITAT:THERMAL-DRIFT', title: 'Temperaturverlauf nach Ausfall der Kühlung', summary: 'Verändere Wärmeleistung, Dämmung, Wärmekapazität und Ausfallzeit und beobachte, wann 30 °C erreicht werden.' },
      exercise: {
        task: 'Im Beispiel: C = 12 MJ/K, UA = 60 W/K. Wie groß ist τ? Wie schnell steigt die Temperatur direkt nach dem Ausfall (Überschuss 3,1 kW)?',
        solution: 'τ = 12 · 10⁶ ÷ 60 = 200 000 s ≈ 56 h. Anfangsrate = 3 100 W ÷ 12 · 10⁶ J/K = 2,6 · 10⁻⁴ K/s ≈ 0,93 K pro Stunde. Bis 30 °C vergehen etwa 8 bis 10 Stunden. Genug Zeit für eine Reparatur – aber nicht genug, um sie zu vergessen.',
      },
    },
    {
      observation: 'Nun fällt der Strom ganz aus. Es entsteht fast keine Wärme mehr, aber die Hülle verliert weiter. Wie lange dauert es bis zur Kälte?',
      explanation: 'Bei Stromausfall verschwindet auch die interne Wärmequelle bis auf die Menschen (etwa 100 W je Person). Die Temperatur strebt dem neuen, kalten Gleichgewicht zu: T(t) = T_eq + (T_0 − T_eq) · e^(−t ÷ τ). Thermische Trägheit verschafft Zeit, ersetzt aber keine dauerhafte Wärmequelle.',
      exercise: {
        task: 'Vier Personen geben 0,4 kW ab, UA = 60 W/K, C = 12 MJ/K, Außentemperatur −60 °C, Start 22 °C. Wie hoch ist das neue Gleichgewicht, und wann fällt die Temperatur unter 10 °C?',
        solution: 'T_eq = −60 + 400 ÷ 60 = −53 °C. T(t) = −53 + 75 · e^(−t ÷ 56 h). 10 °C: e^(−t ÷ 56) = 63 ÷ 75 = 0,84, also t = 56 · 0,174 ≈ 9,7 Stunden. Ohne Wärmequelle fällt das Habitat in etwa zehn Stunden unter 10 °C.',
      },
    },
  ],

  'RADIATION-PROTECTION': [
    {
      observation: 'Strahlung ist nicht sichtbar, nicht spürbar und wirkt trotzdem auf den Körper. Auf der Marsoberfläche misst man etwa 0,6 bis 0,7 mSv pro Tag, auf der Erde im Mittel etwa 2,4 mSv im ganzen Jahr.',
      explanation: 'Entscheidend ist die Dosis: Dosis = Dosisleistung · Zeit, gemessen in Millisievert (mSv). Das Risiko hängt von Strahlungsart, Intensität und Aufenthaltszeit ab. Planung bedeutet, Dosis zu begrenzen, nicht „Strahlung zu vermeiden“.',
      exercise: {
        task: 'Wie hoch ist die Dosis bei 0,65 mSv pro Tag nach 30 Tagen und nach einem Jahr? Wie viel mal die jährliche Durchschnittsdosis auf der Erde (2,4 mSv) ist das?',
        solution: '30 Tage: 0,65 · 30 = 19,5 mSv. Ein Jahr: 0,65 · 365 = 237 mSv, das sind rund 99 Mal die durchschnittliche Erddosis. Ohne Abschirmung ist ein Marsjahr strahlenmedizinisch bedeutsam.',
      },
    },
    {
      observation: 'Ein Sonnenpartikelsturm liefert für zwei Tage 30 mSv pro Stunde ungeschützt. Der Richtwert für 30 Tage liegt bei 250 mSv. Wie viel Abschirmung braucht man?',
      explanation: 'Abschirmung schwächt die Strahlung ungefähr exponentiell ab: nach jeder Halbwertsdicke ist die Dosisleistung halbiert. D = D₀ · 0,5^(Dicke ÷ Halbwertsdicke). Wasserstoffreiche Stoffe wie Wasser oder Polyethylen sind pro Masse besonders wirksam. Der Schutz wirkt aber nur dort, wo man sich aufhält.',
      experiment: { id: 'EXP:HABITAT:RADIATION-SHELTER', title: 'Dosis in einem Sonnenpartikelsturm', summary: 'Wähle Material, Dicke und die Zeit im Rückzugsraum und beobachte die aufgenommene Dosis über 48 Stunden.' },
      exercise: {
        task: 'Wie hoch ist die Dosis nach 48 Stunden hinter 20 cm Wasser (Halbwertsdicke 6 cm) bei 30 mSv/h ungeschützt, und welche Dicke braucht man mindestens für den Richtwert von 250 mSv?',
        solution: 'Faktor = 0,5^(20 ÷ 6) = 0,099. Dosis = 30 · 48 · 0,099 = 143 mSv. Für 250 mSv: 1 440 mSv ÷ 250 = 5,76, also log₂(5,76) = 2,53 Halbwertsdicken = 15,2 cm Wasser.',
      },
    },
    {
      observation: 'Das Habitat hat nicht genug Masse, um alle Räume dick abzuschirmen. Welcher Raum wird zum Rückzugsraum, und wie gelangt man schnell hinein?',
      explanation: 'Man schirmt nicht überall gleich stark ab, sondern gezielt dort, wo Menschen die meiste Zeit verbringen oder im Sturm Zuflucht suchen. Vorhandene Masse hilft: Wassertanks, Vorräte, Regolith. Ein Rückzugsraum in der Mitte des Habitats, umgeben von Wasser- und Lagerbehältern, schirmt aus allen Richtungen und kostet keine zusätzliche Masse.',
      exercise: {
        task: 'Die Besatzung verbringt im Sturm 50 % der Zeit im Rückzugsraum (20 cm Wasser) und 50 % im Wohnbereich (5 cm Wasser). Wie hoch ist die Dosis nach 48 h bei 30 mSv/h ungeschützt? Was folgt daraus für den Alltag?',
        solution: 'Faktor Rückzug 0,099; Wohnbereich 0,5^(5 ÷ 6) = 0,561. Mittelwert = 0,5 · 0,099 + 0,5 · 0,561 = 0,33. Dosis = 1 440 · 0,33 ≈ 475 mSv, fast doppelt so viel wie der Richtwert. Der Wohnbereich dominiert, weil er viel schwächer abschirmt. Konsequenz: Im Sturm konsequent im Rückzugsraum bleiben und dort schlafen, essen und arbeiten.',
      },
    },
  ],

  'ENVIRONMENT-MONITORING': [
    {
      observation: 'Der Druck im Habitat sinkt um 2 kPa pro Stunde. Das spürt niemand, denn die Ohren merken erst bei deutlich größeren Änderungen etwas. Wie lange dauert es bis zur Warnschwelle von 90 kPa?',
      explanation: 'Menschen nehmen viele Gefahren nicht rechtzeitig wahr: CO₂, Druckverlust, Kohlenmonoxid und niedrigen Sauerstoff-Partialdruck. Deshalb braucht ein Habitat Sensorik, die kontinuierlich misst, speichert und warnt. Eine Zeitreihe zeigt mehr als ein einzelner Wert.',
      exercise: {
        task: 'Der Druck startet bei 101,3 kPa und sinkt mit 2 kPa/h. Nach welcher Zeit ist die Warnschwelle von 90 kPa erreicht? Wie viele Stunden bleiben bis zur kritischen Grenze von 60 kPa?',
        solution: 'Warnschwelle: (101,3 − 90) ÷ 2 = 5,65 h. Kritisch: (101,3 − 60) ÷ 2 = 20,7 h, im Zeitraum ab Warnung also 15 Stunden. Bei einem schnelleren Leck wird diese Spanne dramatisch kürzer – deshalb ist früh erkennen wertvoll.',
      },
    },
    {
      observation: 'Ein Schwellenalarm wartet, bis 90 kPa unterschritten sind. Ein Trendalarm rechnet den Verlauf hoch und warnt, wenn die Schwelle in absehbarer Zeit erreicht würde. Beide haben Schwächen.',
      explanation: 'Ein Trend ergibt sich aus einer Ausgleichsgeraden über die letzten Messwerte. Ihre Steigung zeigt die Änderungsrate, daraus folgt die Zeit bis zur Schwelle. Das Rauschen begrenzt die Empfindlichkeit: Ein kurzes Fenster reagiert schnell, aber auch auf Zufall. Ein langes Fenster ist ruhig, aber träge.',
      experiment: { id: 'EXP:HABITAT:MONITORING-TREND', title: 'Schwellenalarm gegen Trendalarm', summary: 'Verändere Leckrate, Rauschen, Fenster und Sensorausfall und beobachte, wer früher warnt und wer falsch alarmiert.' },
      exercise: {
        task: 'Rauschen σ = 0,5 kPa, Messung alle 5 Minuten. Das Trendfenster umfasst 9 Messwerte (45 min). Die Steigung ist dann nur auf etwa ±0,8 kPa/h genau. Ist ein Trendalarm bei „−1 kPa/h“ vertrauenswürdig?',
        solution: 'Nein, allein nicht: Die Unsicherheit der Steigung (±0,8 kPa/h) liegt in der Größenordnung des Signals (1 kPa/h). Abhilfe: längeres Fenster (120 statt 45 Minuten senkt die Unsicherheit auf etwa ein Viertel), eine Bestätigung durch einen zweiten Sensor oder die Kombination mit einem Schwellenalarm.',
      },
    },
    {
      observation: 'Sensor 2 zeigt plötzlich 70 kPa, Sensor 1 zeigt 101 kPa. Ist die Hülle undicht oder der Sensor defekt?',
      explanation: 'Bei widersprüchlichen Messungen hilft eine unabhängige Gegenprüfung: ein dritter Sensor, ein physikalisch anderer Messweg (Druck und Nachspeiserate) oder Plausibilität (springt ein Wert in einem Schritt um 30 kPa, ist ein Leck unwahrscheinlich). Redundanz in der Messung verhindert Fehlalarme ebenso wie verpasste Alarme.',
      exercise: {
        task: 'Ein Alarm soll nur auslösen, wenn zwei von drei unabhängigen Sensoren die Grenze unterschreiten. Ein Sensor fällt mit 1 % pro Jahr falsch hoch aus. Wie wahrscheinlich ist ein Fehlalarm durch Sensorfehler allein, wenn zwei gleichzeitig falsch sein müssen?',
        solution: 'Zwei von drei fallen gleichzeitig falsch aus: etwa 3 · 0,01² = 3 · 10⁻⁴, also 0,03 % pro Jahr, gegenüber 3 % bei drei Sensoren mit „einer reicht“. Die Abstimmung senkt die Fehlalarmrate um den Faktor 100. Voraussetzung: Die Sensoren sind unabhängig (nicht dieselbe Stromschiene, nicht dieselbe Software).',
      },
    },
  ],

  'HABITAT-REDUNDANCY': [
    {
      observation: 'Zwei Pumpen sollen das Wasser versorgen. Wenn eine ausfällt, übernimmt die andere. Beide hängen an derselben Stromschiene. Was passiert, wenn die Stromschiene ausfällt?',
      explanation: 'Redundanz hilft nur gegen unabhängige Ausfälle. Fehler gemeinsamer Ursache (common cause) treffen alle Einheiten gleichzeitig: dieselbe Stromversorgung, dieselbe Software, dieselbe Wartung, derselbe Raum. Die Redundanz ist dann auf dem Papier vorhanden und im Ernstfall nicht wirksam.',
      exercise: {
        task: 'Jede Pumpe fällt mit 5 % pro Jahr aus. Wie hoch ist die Ausfallwahrscheinlichkeit des Paares, wenn beide unabhängig sind? Wie hoch, wenn 5 % der Ausfälle gemeinsame Ursachen haben (β-Faktor-Modell)?',
        solution: 'Unabhängig: 0,05² = 0,0025, also 0,25 %. Mit β = 5 %: gemeinsam β · p = 0,0025, unabhängig ((1 − β) · p)² = 0,0475² = 0,00226. Summe = 0,0048, also 0,48 %. Die gemeinsame Ursache verdoppelt fast die Ausfallwahrscheinlichkeit des Paares.',
      },
    },
    {
      observation: 'Eine dritte, vierte, fünfte Pumpe würde die Ausfallwahrscheinlichkeit weiter senken – so sagt die Rechnung ohne gemeinsame Ursache. Stimmt das?',
      explanation: 'Mit gemeinsamer Ursache gibt es eine Untergrenze: P ≥ β · p. Jede weitere identische Einheit verbessert nichts mehr unterhalb dieser Grenze. Der Hebel ist dann, β zu senken: getrennte Stromquellen, getrennte Leitungswege, unterschiedliche Software, getrennte Wartung.',
      experiment: { id: 'EXP:HABITAT:REDUNDANCY-COMMON-CAUSE', title: 'Warum mehr Einheiten nicht endlos helfen', summary: 'Verändere Einzelausfall, gemeinsame Ursache und Zielwert und beobachte, ab wann zusätzliche Einheiten wirkungslos werden.' },
      exercise: {
        task: 'p = 5 % pro Jahr, β = 5 %, Ziel 10⁻⁵ pro Jahr. Ist das Ziel mit beliebig vielen identischen Einheiten erreichbar? Was wäre nötig, damit es erreichbar wird?',
        solution: 'Die Untergrenze liegt bei β · p = 0,05 · 0,05 = 2,5 · 10⁻³, also weit über 10⁻⁵. Mit identischen Einheiten ist das Ziel unerreichbar. Nötig wäre β · p ≤ 10⁻⁵, also β ≤ 0,02 % bei p = 5 % – das ist nur mit echt unabhängigen Systemen erreichbar (andere Energie, anderer Hersteller, andere Software), nicht mit mehr Stückzahl.',
      },
    },
    {
      observation: 'Wenn doch mehr ausfällt, als die Reserven tragen: Was wird zuerst versorgt, was wird abgeschaltet?',
      explanation: 'Ein sicherer Degradationsmodus legt vorher fest, welche Funktionen in welcher Reihenfolge weiterlaufen. Lebenskritisches (Luft, Druck, Kommunikation für Notruf) steht über Komfort und Produktion. Der Modus wird getestet, nicht nur beschrieben, und er ist wiederherstellbar.',
      exercise: {
        task: 'Die Energie reicht nur für 60 % der Last. Ordne diese Verbraucher nach Priorität und begründe: Wasseraufbereitung, Gewächshaus-Beleuchtung, Luftaufbereitung, Werkstatt, Funkverbindung, Druckregelung.',
        solution: 'Priorität 1 (bei Ausfall akut lebensgefährlich): Druckregelung, Luftaufbereitung. Priorität 2 (Stunden bis Tage): Funkverbindung (Hilfe holen), Wasseraufbereitung (Vorrat überbrückt Tage). Priorität 3 (verzichtbar): Gewächshaus-Beleuchtung (Pflanzen überstehen kurze Dunkelheit), Werkstatt. Der Plan muss vorher in Zahlen vorliegen: Welche Last in kW gehört zu welcher Stufe.',
      },
    },
  ],

  'MARS-HABITAT': [
    {
      observation: 'Jedes Teilsystem hat seinen Test bestanden: Druck, Wasser, Energie, Luft, Wärme. Trotzdem verliert das Habitat im Dauertest nach vier Tagen die Versorgung. Wie kann das sein?',
      explanation: 'Teilsysteme sind über Abhängigkeiten gekoppelt: Wasseraufbereitung braucht Energie, Luftaufbereitung braucht Wasser und Energie, Wärmeabfuhr braucht Pumpen. Eine Störung an einer Stelle wandert durch das Abhängigkeitsnetz. Die Integration prüft das Netz, nicht die Einzelteile.',
      exercise: {
        task: 'Zeichne die Abhängigkeitskette einer Störung: Staubsturm senkt die Solarleistung. Nenne fünf Folgesysteme in der Reihenfolge, in der sie betroffen sind.',
        solution: 'Solarleistung ↓ → Batterie entlädt → Wasseraufbereitung (energieintensiv) wird gedrosselt → Luftaufbereitung (braucht Wasser und Strom) kommt in den Notbetrieb → Kühlkreis fällt aus, Wärme steigt → Druckregelung (Ventile, Sensoren) verliert Strom. Jedes Glied schwächt das nächste, ohne dass ein einzelner Defekt vorliegt.',
      },
    },
    {
      observation: 'Ein globaler Staubsturm nimmt dem Solarfeld 80 % der Leistung, über fünf Tage. Die Batterie fasst 120 kWh. Reicht das?',
      explanation: 'Die Energiebilanz entscheidet: Tagesertrag minus Tagesverbrauch, gepuffert durch die Batterie. Es gibt drei Hebel: mehr Speicher, mehr Erzeugung, weniger Last (Degradationsmodus). Wirksam ist meist die Kombination, weil jeder Hebel allein begrenzt ist.',
      experiment: { id: 'EXP:HABITAT:MARS-STORM', title: 'Staubsturm und Energiehaushalt über zwölf Tage', summary: 'Verändere Solarfeld, Batterie, Last und Sturmstärke und beobachte, wann der Batteriestand leer läuft.' },
      exercise: {
        task: '20 kW Solarfeld liefert ohne Sturm etwa 153 kWh pro Tag, die Last beträgt 4 kW (96 kWh pro Tag). Wie viel Energie fehlt in einem fünftägigen Sturm mit 80 % Verlust ohne Gegenmaßnahme?',
        solution: 'Sturmertrag = 153 · 0,2 = 31 kWh pro Tag. Defizit = 96 − 31 = 65 kWh pro Tag, bei fünf Tagen 325 kWh, mit Batterieverlusten rund 360 kWh. Die Batterie hat 120 kWh (zu Beginn 96 kWh): sie ist nach etwa vier Tagen leer. Mit 50 % Last und 200 kWh übersteht das Habitat den Sturm.',
      },
    },
    {
      observation: 'Das Team plant einen integrierten Habitat-Test. Drei Störungen sollen gleichzeitig laufen. Welche?',
      explanation: 'Ein integrierter Test wählt Szenarien, die Kaskaden auslösen und gemeinsame Ursachen treffen: Energieausfall, Leckage und Sensorfehler zugleich zeigen, ob Diagnose, Reserven und Degradationsmodus zusammenspielen. Gute Szenarien sind plausibel, kombiniert und messbar bewertet.',
      exercise: {
        task: 'Schlage drei gleichzeitige Störungen für einen Habitat-Test vor und nenne je eine Messgröße, an der du den Erfolg ablesen würdest.',
        solution: 'Beispiel: (1) Staubsturm mit 80 % Leistungsverlust – Messgröße: Batteriestand und Zeit bis zur ersten Lastabschaltung. (2) Kleines Leck von 8 mm – Messgröße: Nachspeiserate und Zeit bis zur Lokalisierung. (3) Ausfall eines Temperatursensors – Messgröße: Zeit, bis das System den Sensorfehler vom echten Fehler unterscheidet. Erfolgskriterium: Wohnbereich bleibt in Druck-, Luft- und Temperaturgrenzen, und der Degradationsmodus schaltet in der geplanten Reihenfolge.',
      },
    },
  ],
};
