import type { LearningEvidenceLevel, LearningPath, LearningPathSection } from '../learningPaths';
import { q, quiz } from './quizAuthoring';

// Lernpfad „Glauben und Feiern in Galiläa um 30“ – Teil 2 der Reihe Chronomaps (Thomas, 18.11.2026:
// „nicht vergessen alles in SSF“; Fahrplan docs/SSF-CHRONOMAP-WISSEN.md). Grundlage: noxiagame
// docs/world/chronomap-erde/wissen/tageszeiten.md, religion-alltag.md, feste-kalender.md, bildung-wissen.md;
// IDs im Wissensgraphen (kueper-knowledge-graph, Shard history-galilaea-um-30). Belegstufen nach docs/SSF-BELEGSTUFEN.md.

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

const path: LearningPath = {
  id: 'PATH:SSF:HIS-GLAUBE-FEIERN-GALILAEA-30-0001',
  title: 'Wie glaubte und feierte man in Galiläa um das Jahr 30?',
  subtitle: 'Stunden und Nachtwachen, Sabbat, Synagoge, Wallfahrtsfeste – aus Mischna, Josephus und Funden, und wie die Nachbarn die jüdischen Feste missverstanden.',
  status: 'prototype',
  sourceModuleId: 'SSF-HIS-3002',
  kxfModuleId: 'LRN:SSF:HIS-3002',
  domainsNeeded: ['KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: [
      'PLC:L1:magdala-synagoge', 'OBJ:L1:magdala-stein', 'DOC:L1:theodotos-inschrift', 'PLC:L1:kafarnaum-basaltsynagoge',
      'PLC:L1:tempel-frauenvorhof', 'PLC:L1:teich-siloah', 'PLC:L1:sartaba', 'PLC:L1:skythopolis', 'PLC:L1:bet-maon',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Quellen: Mischna (Berakhot 1,2; Tamid 3,2; Schekalim 1,1–3; Sukka 5,1–4; Rosch ha-Schana 2,2–4; Megilla 4,2), Babli Berakhot 3a, Josephus (Krieg 6,422–425), Strabo 16,2,35, Juvenal 14,96–106, Plutarch (Tischgespräche 4,6; Über den Aberglauben 8), Sueton (Augustus 76), Tacitus (Historien 5,5), Plinius (5,74)',
      'Funde: Synagoge und Stein von Magdala, Theodotos-Inschrift, Altar für Dionysos in Skythopolis',
      'Chronomap Jesus in noxia: antike Stunden, Nachtwachen, Öllampen und Tagelöhner im Spiel',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:GLAUBE-30:STUNDEN',
      title: 'Zwölf Stunden, drei Wachen',
      entryQuestion: 'Wie lang war eine Stunde – und woran erkannte man nachts, wie spät es ist?',
      takeaway: 'Der Tag hatte immer zwölf Stunden von Sonnenaufgang bis Sonnenuntergang, darum waren sie im Sommer länger als im Winter; die Nacht teilten Juden in drei Wachen, Römer in vier, und man erkannte sie an Geräuschen, am Licht und an festen Rufen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GLAUBE-30:SABBAT' },
      sections: [
        { id: 'OBS:GLAUBE-30:WACHEN', kind: 'observation', title: 'Esel, Hunde, ein Kind', summary: 'Der Babylonische Talmud (Berakhot 3a) nennt Zeichen für die drei Nachtwachen: In der ersten schreit der Esel, in der zweiten bellen die Hunde, in der dritten saugt das Kind an der Brust seiner Mutter und die Frau spricht mit ihrem Mann. Markus nennt die vier römischen Wachen beim Namen: „am Abend oder um Mitternacht oder um den Hahnenschrei oder am Morgen“ (Mk 13,35).', depthPoints: 4 },
        { id: 'EXPL:GLAUBE-30:MORGEN', kind: 'explanation', title: 'Blau und Weiß, „Barkai!“', summary: 'Wann beginnt der Morgen? Die Mischna (Berakhot 1,2) sagt: Das Morgen-Schma liest man, sobald man Blau und Weiß unterscheiden kann; nach Rabbi Josua bis zur dritten Stunde. Im Tempel stieg ein Wächter aufs Dach; sah er den Osten bis Hebron hell, rief er „Barkai!“ – dann durfte das Morgenopfer geschlachtet werden (Tamid 3,2). Uhren waren selten, Sonnenuhren gab es in Städten; im Dorf richtete man sich nach Licht und Schatten.', depthPoints: 8 },
        { id: 'EXPL:GLAUBE-30:ARBEITSTAG', kind: 'explanation', title: 'Wann der Arbeitstag beginnt', summary: 'Im Gleichnis vom Weinberg (Mt 20,1–16) wirbt der Hausherr früh am Morgen Arbeiter an, dann um die dritte, sechste, neunte und elfte Stunde, und zahlt am Abend jedem einen Denar. Wann man anfängt, richtet sich nach dem Ort (Mischna Bava Metzia 7,1). Der Jerusalemer Talmud nennt zwei Nachbarn am See: In Tiberias fängt man nicht vor Sonnenaufgang an, im nahen Bet Maon arbeitet man vom Morgengrauen bis zum Dunkelwerden.', depthPoints: 8 },
        exercise('EXR:GLAUBE-30:STUNDENLAENGE', 'Wann endet die dritte Stunde?', 'Nimm an, am längsten Tag des Jahres geht die Sonne am See um 4:35 Uhr auf und um 18:45 Uhr unter, am kürzesten Tag um 6:40 und 16:50 Uhr (Sonnenzeit am Ort, gerundet). Wie lang ist jeweils eine Tagesstunde, und um wie viel Uhr endet die dritte Stunde – die Grenze für das Morgen-Schma nach Rabbi Josua?', 'Sommer: 4:35 bis 18:45 sind 14 h 10 min = 850 min, geteilt durch 12 ergibt rund 70,8 min je Stunde. Drei Stunden sind 212,5 min, also endet die dritte Stunde gegen 8:07 Uhr. Winter: 6:40 bis 16:50 sind 10 h 10 min = 610 min, rund 50,8 min je Stunde; drei Stunden sind 152,5 min, Ende gegen 9:12 Uhr. Im Winter liegt die Grenze also später auf der Uhr, die Zeit dafür ist aber über eine Stunde kürzer.'),
        { id: 'QUIZ:GLAUBE-30:STUNDEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein Arbeiter wird im Gleichnis „um die elfte Stunde“ angeworben. Wie lange arbeitet er noch?', ['Etwa eine Stunde bis Sonnenuntergang', 'Elf Stunden', 'Bis Mitternacht', 'Bis 11 Uhr vormittags'], 0, 'Die Stunden zählen ab Sonnenaufgang. Nach der elften bleibt nur die zwölfte Stunde – darum ist der volle Denar für ihn so auffällig.'),
          q('Warum ist eine antike Stunde im Sommer länger als im Winter?', ['Weil der helle Tag immer in zwölf Teile geteilt wird, egal wie lang er ist', 'Weil man im Sommer langsamer zählte', 'Weil die Römer es so befahlen', 'Weil die Sonnenuhr im Sommer vorging'], 0, 'Tag und Nacht hatten je zwölf Stunden. Wächst der Tag, wachsen seine Stunden mit.'),
          q('In einem Text steht „um den Hahnenschrei“. Was ist am wahrscheinlichsten gemeint?', ['Die dritte der vier römischen Nachtwachen, also etwa nach Mitternacht', 'Genau der Sonnenaufgang', 'Die Mittagszeit', 'Ein Fest'], 0, 'Markus nennt die vier Wachen Abend, Mitternacht, Hahnenschrei und Morgen. Der Name bezeichnet eine Zeitspanne, nicht unbedingt einen gehörten Hahn.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GLAUBE-30:SABBAT',
      title: 'Der Sabbat – von innen und von außen',
      entryQuestion: 'Wie weit durfte man am Sabbat gehen – und was dachten Römer und Griechen darüber?',
      takeaway: 'Der Sabbat ordnete die Woche: Ruhe für Mensch und Tier, ein Weg von höchstens 2000 Ellen über den Ort hinaus. Die Nachbarn sahen ihn verschieden – als Fasttag (Augustus), als Aberglaube (Plutarch) oder als Gottesdienst ohne Bild (Strabo).',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GLAUBE-30:SYNAGOGE' },
      sections: [
        { id: 'OBS:GLAUBE-30:AUGUSTUS', kind: 'observation', title: 'Ein Kaiser, der den Sabbat falsch versteht', summary: 'Kaiser Augustus schreibt an Tiberius, nicht einmal ein Jude halte am Sabbat das Fasten so gewissenhaft wie er an diesem Tag (Sueton, Augustus 76). Der Sabbat war aber kein Fasttag. Der Brief zeigt trotzdem: In Rom wusste man vom Sabbat, sogar am Kaiserhof.', depthPoints: 4 },
        { id: 'EXPL:GLAUBE-30:SABBATWEG', kind: 'explanation', title: '2000 Ellen', summary: 'Am Sabbat durfte man sich bis zu 2000 Ellen über die Grenze seines Ortes hinaus bewegen – der „Sabbatweg“. Die Apostelgeschichte misst damit die Entfernung vom Ölberg nach Jerusalem (Apg 1,12). In den Evangelien entzündet sich Streit am Sabbat: Jünger raufen Ähren, Jesus heilt in der Synagoge (Mk 2,23–3,6). Gestritten wurde nicht darüber, ob der Sabbat gilt, sondern was er erlaubt.', depthPoints: 8 },
        { id: 'EXPL:GLAUBE-30:NACHBARBLICK', kind: 'explanation', title: 'Drei Blicke von außen', summary: 'Plutarch spottet, die Juden seien am Sabbat sitzen geblieben, während der Feind Leitern an die Mauern legte – „gefesselt im Netz des Aberglaubens“ (Über den Aberglauben 8). Juvenal höhnt, wer den Sabbat halte, bete nur Wolken und den Himmel an (Satiren 14,96–106). Strabo dagegen schreibt, Mose habe gelehrt, Gott sei das Eine, das Land und Meer umfasst, und man solle ihn ohne Bild verehren (16,2,35) – einer der freundlichsten Blicke eines Griechen.', depthPoints: 8 },
        exercise('EXR:GLAUBE-30:SABBATWEG', 'Wie weit sind 2000 Ellen?', 'Eine Elle misst je nach Rechnung etwa 45 bis 50 cm. Wie lang ist ein Sabbatweg in Metern? Ein Dorf liegt 5 km vom nächsten Dorf entfernt. Wie viele Sabbatwege wären das – und durfte man am Sabbat hingehen?', '2000 · 0,45 m = 900 m, 2000 · 0,50 m = 1000 m – rund ein Kilometer. 5 km sind also gut fünf Sabbatwege. Hingehen durfte man nicht; gerechnet wird ab der Grenze des eigenen Ortes, nicht ab dem Haus. Spätere Regeln (der Eruv) erlaubten, den Bereich zu erweitern – das ist eine Rekonstruktion aus der Mischna, keine Messung.'),
        { id: 'QUIZ:GLAUBE-30:SABBAT', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Augustus hält den Sabbat für einen Fasttag. Was lernt ein Historiker daraus am ehesten?', ['Dass man in Rom vom Sabbat wusste, ihn aber nicht genau kannte', 'Dass die Juden am Sabbat fasteten', 'Dass Augustus Jude war', 'Dass der Brief gefälscht ist'], 0, 'Ein Irrtum ist auch ein Beleg: Er zeigt, was ein Außenstehender wusste und was nicht.'),
          q('Worüber stritten Jesus und seine Gegner in Mk 2,23–3,6?', ['Was am Sabbat erlaubt ist – Ähren raufen, heilen', 'Ob es den Sabbat überhaupt gibt', 'Ob der Sabbat am Sonntag ist', 'Wie lang eine Elle ist'], 0, 'Beide Seiten halten den Sabbat. Strittig ist die Auslegung.'),
          q('Strabo und Juvenal beschreiben denselben Glauben ohne Götterbild. Was unterscheidet die beiden Texte?', ['Strabo würdigt ihn als Verehrung des Einen, Juvenal verspottet ihn als Wolkenanbetung', 'Beide loben ihn', 'Beide sind Juden', 'Strabo schreibt über Ägypten, Juvenal über Indien'], 0, 'Dieselbe Tatsache – kein Bild – wird je nach Haltung gelobt oder verspottet.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GLAUBE-30:SYNAGOGE',
      title: 'Synagoge und Gebet',
      entryQuestion: 'Was geschah in einer Synagoge um das Jahr 30 – und wer konnte dort vorlesen?',
      takeaway: 'Die Synagoge war Versammlungshaus für Lesung und Lehre, kein Tempel; man las aus Gesetz und Propheten und betete das Schma. Nur wenige konnten lesen – geschätzt wenige Prozent –, darum war der Vorleser wichtig.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GLAUBE-30:FESTE' },
      sections: [
        { id: 'OBS:GLAUBE-30:MAGDALA', kind: 'observation', title: 'Ein Leuchter auf einem Stein', summary: '2009 fand man beim Bau eines Hotels in Magdala eine Synagoge aus dem 1. Jahrhundert: etwa 120 m², Steinbänke an den Wänden, Mosaik und Stuck. In der Mitte stand ein Steinblock von 60 × 50 × 40 cm mit einem siebenarmigen Leuchter zwischen zwei Krügen – die älteste Leuchterdarstellung in einer Synagoge.', depthPoints: 4 },
        { id: 'EXPL:GLAUBE-30:LESUNG', kind: 'explanation', title: 'Lesung und Lehre', summary: 'Die Theodotos-Inschrift aus Jerusalem nennt den Zweck einer Synagoge: „zur Vorlesung des Gesetzes und zur Lehre der Gebote“, dazu eine Herberge für Gäste. Lukas erzählt, wie Jesus in Nazareth aufsteht, aus Jesaja liest und sich zum Lehren setzt (Lk 4,16–21). Das griechische Wort synagogé heißt „Versammlung“. Das Schma („Höre, Israel“, Dtn 6,4) sprach man morgens und abends; das Achtzehngebet erhielt seine feste Form erst nach 70.', depthPoints: 8 },
        { id: 'EXPL:GLAUBE-30:LESEN', kind: 'explanation', title: 'Wer lesen konnte', summary: 'Forscher wie Meir Bar-Ilan und Catherine Hezser schätzen, dass im römischen Palästina nur etwa 3 % der Bevölkerung lesen konnten, meist Städter. Die Apostelgeschichte nennt Petrus und Johannes „ungelehrte Leute“ (Apg 4,13). Josephus beschreibt dagegen das Ideal, alle Kinder sollten die Gesetze lesen lernen (Gegen Apion 2,204). Ideal und Wirklichkeit gehen auseinander.', depthPoints: 8 },
        exercise('EXR:GLAUBE-30:VORLESER', 'Genug Vorleser?', 'Ein Dorf am See hat 400 Einwohner. Nimm an, 3 % können lesen. Die Mischna (Megilla 4,2) verlangt, dass am Sabbat sieben Männer aus der Tora vorlesen. Reicht das? Was spricht dafür, dass die Zahl trotzdem kein Problem war?', '3 % von 400 sind 12 Menschen; davon sind nicht alle Männer, nicht alle am Sabbat anwesend. Sieben Leser wären knapp. Aber: Die Regel der Mischna ist später aufgeschrieben und gilt nicht sicher für ein Dorf um 30; wer einen Abschnitt oft gehört hatte, konnte ihn auch auswendig „lesen“; und die 3 % sind eine grobe Schätzung. Die Aufgabe zeigt, wie man eine Schätzung mit einer Regel prüft – nicht, wie es wirklich war.'),
        { id: 'QUIZ:GLAUBE-30:SYNAGOGE', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Was unterscheidet die Synagoge um 30 vom Tempel in Jerusalem?', ['In der Synagoge wurde gelesen und gelehrt, im Tempel geopfert', 'In der Synagoge wurde geopfert', 'Es gab keinen Unterschied', 'Die Synagoge war nur für Priester'], 0, 'Opfer gab es nur im Tempel. Die Synagoge war ein Haus der Versammlung, Lesung und Lehre.'),
          q('Die Deutung, der Magdala-Stein mache die Synagoge zu einem „kleinen Tempel“, ist …', ['eine Forschungsdeutung, die auf dem Befund des Leuchterbildes beruht', 'ein Befund', 'ein Zitat aus der Bibel', 'eine Regel der Mischna'], 0, 'Der Stein mit dem Leuchter ist Befund. Was er bedeuten sollte, deuten Forscher.'),
          q('Warum passt die Schätzung von etwa 3 % Lesekundigen zu „ungelehrten Leuten“ in Apg 4,13?', ['Weil Fischer aus Galiläa meist nicht lesen und schreiben gelernt hatten', 'Weil alle Galiläer Gelehrte waren', 'Weil Petrus Römer war', 'Weil es keine Bücher gab'], 0, 'Lesen war die Ausnahme. Umso mehr fiel auf, wenn jemand ohne Schulung die Schrift auslegte.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GLAUBE-30:FESTE',
      title: 'Wallfahrt nach Jerusalem',
      entryQuestion: 'Welche Feste führten Galiläer nach Jerusalem – und wie viele Menschen kamen?',
      takeaway: 'Pessach, Wochenfest und Laubhütten waren Wallfahrtsfeste; vor Pessach war die Tempelsteuer fällig. Josephus’ Zahlen für Pessach sind übertrieben, zeigen aber, wie gewaltig das Fest erlebt wurde.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GLAUBE-30:NACHBARN' },
      sections: [
        { id: 'OBS:GLAUBE-30:WASSERSCHOEPFEN', kind: 'observation', title: '„Wer das nicht gesehen hat …“', summary: 'Die Mischna (Sukka 5,1–4) beschreibt das Laubhüttenfest: „Wer die Freude des Wasserschöpfens nicht gesehen hat, hat in seinem Leben keine Freude gesehen.“ Im Frauenvorhof des Tempels standen goldene Leuchter; ihre Dochte waren aus alten Priestergewändern. Fromme tanzten mit Fackeln, Leviten spielten auf den fünfzehn Stufen. Morgens holte man mit einem goldenen Krug Wasser vom Schiloach.', depthPoints: 4 },
        { id: 'EXPL:GLAUBE-30:WALLFAHRT', kind: 'explanation', title: 'Drei Feste und eine Steuer', summary: 'Pessach (14./15. Nisan, März/April) erinnert an den Auszug: Lamm am Nachmittag im Tempel, Mahl in Gruppen, ungesäuertes Brot. Fünfzig Tage später das Wochenfest mit den Erstlingen, im Herbst Laubhütten mit Hütten, Feststrauß und Wasserguss. Am 1. Adar rief man den halben Schekel Tempelsteuer aus; am 15. Adar saßen Wechsler im Land, am 25. im Tempel (Schekalim 1,1–3) – kurz vor Pessach, zur Zeit der Tempelreinigung (Mk 11,15).', depthPoints: 8 },
        { id: 'EXPL:GLAUBE-30:ZAHLEN', kind: 'explanation', title: 'Zahlen, die beeindrucken sollen', summary: 'Josephus berichtet, der Statthalter Cestius Gallus habe vor dem Krieg die Pessachopfer zählen lassen: 256.500 Tiere, geschlachtet von der neunten bis zur elften Stunde, mindestens zehn Menschen je Lamm (Krieg 6,422–425). Der Talmud erzählt von 600.000 Paaren. Beide Zahlen gelten als übertrieben. Sie sind trotzdem Quellen – für das Bild, das man sich vom Fest machte.', depthPoints: 8 },
        exercise('EXR:GLAUBE-30:PESSACH', 'Ist das möglich?', 'Nach Josephus wurden 256.500 Lämmer in etwa zwei Stunden geschlachtet, für mindestens zehn Menschen je Lamm. Wie viele Menschen wären das mindestens? Wie viele Tiere müssten pro Minute geschlachtet werden? Was sagt das über die Zahl?', 'Mindestens 2.565.000 Menschen – ein Vielfaches der Einwohner Jerusalems. 256.500 Tiere in 120 Minuten sind über 2100 Tiere pro Minute, also rund 36 pro Sekunde. Das ist praktisch unmöglich. Die Zahl zeigt den Eindruck eines riesigen Festes und vielleicht eine Absicht des Josephus, nicht eine Zählung. Historiker schätzen die Pilger meist auf einige Zehntausend bis wenige Hunderttausend.'),
        { id: 'QUIZ:GLAUBE-30:FESTE', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Warum saßen im Frühjahr Geldwechsler im Tempel?', ['Weil kurz vor Pessach die Tempelsteuer in tyrischem Silber fällig war', 'Weil der Tempel eine Bank war', 'Weil Römer dort Steuern einzogen', 'Weil am Laubhüttenfest Münzen verteilt wurden'], 0, 'Schekalim 1,3: Ab dem 25. Adar saßen die Wechsler im Tempel. So erklärt sich die Szene der Tempelreinigung.'),
          q('Josephus nennt 256.500 Pessachlämmer. Wie geht man damit am besten um?', ['Als Quelle für den Eindruck des Festes nutzen, die Zahl aber nicht als Zählung übernehmen', 'Die Zahl genau übernehmen', 'Josephus ganz verwerfen', 'Die Zahl halbieren und als Tatsache angeben'], 0, 'Eine übertriebene Zahl ist kein Messwert, aber ein Zeugnis dafür, wie man das Fest erlebte und erzählte.'),
          q('Was feierte man beim Wasserschöpfen?', ['Das Laubhüttenfest im Herbst, mit Wasser vom Schiloach und Licht im Frauenvorhof', 'Pessach im Frühjahr', 'Den Sabbat', 'Den Neumond'], 0, 'Sukka 5 beschreibt das Fest der Laubhütten. Joh 7,37 spielt darauf an: „Wen da dürstet, der komme zu mir.“'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GLAUBE-30:NACHBARN',
      title: 'Wie die Nachbarn die Feste sahen',
      entryQuestion: 'Was dachte ein Grieche, wenn er von Laubhütten, Zweigen und Trompeten hörte?',
      takeaway: 'Nachbarn deuteten das Fremde mit eigenen Begriffen: Plutarch hielt Laubhütten für ein Dionysosfest, Tacitus widersprach mit Verachtung. Wer solche Texte liest, trennt das Missverständnis von dem, was es über beide Seiten verrät.',
      sections: [
        { id: 'OBS:GLAUBE-30:PLUTARCH', kind: 'observation', title: 'Ein Gastmahl über Dionysos', summary: 'Bei Plutarch (Tischgespräche 4,6, um 100) behauptet ein Gast aus Athen, das größte Fest der Juden passe zu Dionysos: Nach „dem Fasten“ mitten in der Weinlese stellten sie Tische mit Früchten unter Hütten aus Reben und Efeu, dann folge eine Prozession mit Zweigen. Kleine Trompeten, Leviten mit Harfen – alles erinnere an die Feiern für Bakchos.', depthPoints: 4 },
        { id: 'EXPL:GLAUBE-30:TACITUS', kind: 'explanation', title: 'Widerspruch mit Verachtung', summary: 'Tacitus (Historien 5,5) kennt die Meinung, die Juden verehrten Dionysos, weil ihre Priester zu Flöten und Pauken sängen und Efeu trügen. Er widerspricht – nicht aus Respekt, sondern weil das Fest des Dionysos fröhlich sei, das jüdische aber „widersinnig und schmutzig“. Nebenan in Skythopolis verehrte man Dionysos tatsächlich als Gründer der Stadt: Plinius (5,74) erzählt die Sage, 1987 fand man einen Altar „dem Gott Dionysos, dem Gründer“.', depthPoints: 8 },
        { id: 'EXPL:GLAUBE-30:FEUER', kind: 'explanation', title: 'Feuer auf den Bergen', summary: 'Den Neumond erklärte das Gericht in Jerusalem auf Aussage von Zeugen. Die Nachricht lief anfangs als Feuerkette über die Berge: vom Ölberg nach Sartaba, weiter bis in den Hauran und nach Babylonien. Weil die Samaritaner falsche Feuer anzündeten, schickte man später Boten (Mischna Rosch ha-Schana 2,2–4). Auch Nachbarn konnten also in einen Kalender eingreifen.', depthPoints: 8 },
        exercise('EXR:GLAUBE-30:EINORDNEN', 'Befund, Text, Deutung, Missverständnis', 'Ordne zu: (1) In Skythopolis wurde 1987 ein Altar für Dionysos den Gründer gefunden. (2) Plutarch schreibt, das jüdische Laubhüttenfest sei ein Fest des Dionysos. (3) Forscher meinen, der Magdala-Stein stamme von jemandem, der den Tempelleuchter gesehen hatte. (4) Die Mischna sagt, Samaritaner hätten falsche Feuer angezündet.', '(1) Befund: ein ausgegrabener Altar. (2) Text, und in der Sache ein Missverständnis eines Außenstehenden – wertvoll, weil es zeigt, wie Griechen Fremdes einordneten. (3) Deutung der Forschung auf Grundlage eines Befunds. (4) Text aus jüdischer Sicht über die Nachbarn – ob es so geschah, lässt sich nicht prüfen; er zeigt jedenfalls Misstrauen zwischen Juden und Samaritanern.'),
        { id: 'QUIZ:GLAUBE-30:NACHBARN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Warum hielt ein Grieche das Laubhüttenfest für ein Dionysosfest?', ['Weinlese, Hütten aus Reben, Zweige und Musik erinnerten ihn an Bakchosfeiern', 'Weil die Juden Dionysos verehrten', 'Weil Plutarch in Jerusalem war', 'Weil das Fest im Winter lag'], 0, 'Fremde Bräuche werden mit vertrauten Bildern gedeutet. Das sagt viel über den Betrachter.'),
          q('Tacitus widerspricht der Dionysos-Deutung. Ist er damit ein freundlicher Zeuge?', ['Nein – er widerspricht, weil er das jüdische Fest verachtet', 'Ja, er verteidigt die Juden', 'Er war selbst Jude', 'Er schreibt gar nicht über Feste'], 0, 'Richtig in der Sache, feindselig in der Haltung: Auch ein Widerspruch kann aus Abneigung kommen.'),
          q('Was zeigt die Geschichte der falschen Feuer am ehesten?', ['Wie verletzlich ein Nachrichtenweg über Sichtzeichen war – und wie man Nachbarn misstraute', 'Dass es keinen Kalender gab', 'Dass Samaritaner Feste verboten', 'Dass Feuer am Sabbat erlaubt waren'], 0, 'Eine Feuerkette kann jeder nachahmen. Darum ersetzte man sie durch Boten.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

// Belegstufen (docs/SSF-BELEGSTUFEN.md). Rechen- und Zuordnungsaufgaben sind Rekonstruktionen.
export const GALILEE_FAITH_SECTION_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'OBS:GLAUBE-30:WACHEN': 'quelle',
  'EXPL:GLAUBE-30:MORGEN': 'quelle',
  'EXPL:GLAUBE-30:ARBEITSTAG': 'quelle',
  'EXR:GLAUBE-30:STUNDENLAENGE': 'rekonstruktion',
  'OBS:GLAUBE-30:AUGUSTUS': 'quelle',
  'EXPL:GLAUBE-30:SABBATWEG': 'quelle',
  'EXPL:GLAUBE-30:NACHBARBLICK': 'quelle',
  'EXR:GLAUBE-30:SABBATWEG': 'rekonstruktion',
  'OBS:GLAUBE-30:MAGDALA': 'quelle',
  'EXPL:GLAUBE-30:LESUNG': 'quelle',
  'EXPL:GLAUBE-30:LESEN': 'forschung',
  'EXR:GLAUBE-30:VORLESER': 'rekonstruktion',
  'OBS:GLAUBE-30:WASSERSCHOEPFEN': 'quelle',
  'EXPL:GLAUBE-30:WALLFAHRT': 'quelle',
  'EXPL:GLAUBE-30:ZAHLEN': 'forschung',
  'EXR:GLAUBE-30:PESSACH': 'rekonstruktion',
  'OBS:GLAUBE-30:PLUTARCH': 'quelle',
  'EXPL:GLAUBE-30:TACITUS': 'quelle',
  'EXPL:GLAUBE-30:FEUER': 'quelle',
  'EXR:GLAUBE-30:EINORDNEN': 'rekonstruktion',
};

function withEvidence(source: LearningPath): LearningPath {
  return {
    ...source,
    units: source.units.map(unit => ({
      ...unit,
      sections: unit.sections.map(section => {
        const evidence = GALILEE_FAITH_SECTION_EVIDENCE[section.id];
        return evidence ? { ...section, evidence } : section;
      }),
    })),
  };
}

export const galileeFaithFeastsLearningPath: LearningPath = withEvidence(path);
