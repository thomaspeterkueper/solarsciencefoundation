import type { LearningEvidenceLevel, LearningPath, LearningPathSection } from '../learningPaths';
import { q, quiz } from './quizAuthoring';

// Lernpfad „Alltag am See Genezareth um 30“ – Teil 1 der Reihe Chronomaps (Thomas, 18.11.2026:
// „nicht vergessen alles in SSF“). Grundlage: noxiagame docs/world/chronomap-erde/wissen/
// geld-preise.md, kleidung.md, landwirtschaft-tiere.md, wasser-baeder.md; IDs im Wissensgraphen
// (kueper-knowledge-graph, Shard history-galilaea-um-30). Belegstufen nach docs/SSF-BELEGSTUFEN.md.

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

const path: LearningPath = {
  id: 'PATH:SSF:HIS-ALLTAG-GALILAEA-30-0001',
  title: 'Wie lebte man am See Genezareth um das Jahr 30?',
  subtitle: 'Geld, Kleidung, Tiere und Wasser in Galiläa – aus Münzen, Funden, Mischna und Josephus, mit dem Blick der römischen Nachbarn und einer Übung im Quellenprüfen.',
  status: 'prototype',
  sourceModuleId: 'SSF-HIS-3001',
  kxfModuleId: 'LRN:SSF:HIS-3001',
  domainsNeeded: ['KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: [
      'OBJ:L1:muenzen-antipas-tiberias', 'OBJ:L1:muenzen-pontius-pilatus', 'OBJ:L1:hort-von-isfiya',
      'OBJ:L1:masada-textilfunde', 'OBJ:L1:masada-purpurstoffe', 'OBJ:L1:oelpressen-gamla',
      'DOC:L1:dekret-caesars-judaea', 'PLC:L1:teich-siloah', 'EVT:L1:aquaedukt-aufruhr-pilatus', 'OBJ:L1:badehaus-masada',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Quellen: Mischna (Schabbat 5–6, Ketubbot 7,6, Pea 8,7, Mikwaot 1,7), Josephus (Ant. 16,233; 18,60–62; Krieg 2,175–177), Cato De agri cultura 2,7, Plutarch Cato maior 5, Tacitus Annalen 1,17',
      'Funde: Münzen des Antipas und des Pilatus, Hort von Isfiya, Textilien von Masada und der Höhle der Briefe, Teich Siloah',
      'Chronomap Jesus in noxia: dieselben Regeln im Spiel (Sabbat, Abladen, Kleinvieh)',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:GALILAEA-30:GELD',
      title: 'Drei Münzwelten',
      entryQuestion: 'Warum zahlte man am See mit Münzen ohne Bild, im Tempel aber mit Münzen, auf denen ein Gott zu sehen war?',
      takeaway: 'Um das Jahr 30 liefen drei Münzwelten nebeneinander: bildlose Bronze des Antipas in Galiläa, Münzen mit Kaiserbild jenseits des Jordans und in den Städten, tyrisches Silber mit dem Gott Melqart für den Tempel – entscheidend war beim Tempel die Silberqualität.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GALILAEA-30:KLEIDUNG' },
      sections: [
        { id: 'OBS:GALILAEA-30:MUENZEN', kind: 'observation', title: 'Ein Schilfrohr statt eines Kopfes', summary: 'Die erste Münze, die Herodes Antipas in seiner neuen Stadt Tiberias prägen ließ (20/21 n. Chr.), zeigt ein Schilfrohr und die Worte „des Tetrarchen Herodes, Jahr 24“, auf der Rückseite „Tiberias“ in einem Kranz. Kein Mensch, kein Tier. Sein Bruder Philippus östlich des Jordans prägte dagegen mit dem Kopf des Kaisers Tiberius.', depthPoints: 4 },
        { id: 'EXPL:GALILAEA-30:BILDLOS', kind: 'explanation', title: 'Bilderverbot und Kultgerät', summary: 'In Galiläa und Judäa lebten viele Menschen nach dem Bilderverbot. Antipas nahm darauf Rücksicht. Pontius Pilatus ließ 29–31 in Jerusalem kleine Bronzemünzen prägen, ebenfalls ohne Bild, aber mit römischen Kultgeräten: einer Opferkelle und einem Augurenstab. Die Forschung (J. E. Taylor) deutet das als Zeichen des Kaiserkults auf Alltagsgeld.', depthPoints: 8 },
        { id: 'EXPL:GALILAEA-30:TYROS', kind: 'explanation', title: 'Gutes Silber für den Tempel', summary: 'Die Tempelsteuer wurde in Schekeln aus Tyros gezahlt. Sie zeigen den Gott Melqart und einen Adler, enthalten aber rund 92 % Silber – mehr als die meisten anderen Münzen. Die Tosefta sagt, das in der Tora genannte Silber sei tyrisch. 1960 fand man in Isfiya auf dem Karmel rund 4500 Silbermünzen, meist tyrische Schekel – vielleicht gesammelte Tempelsteuer, die im Krieg 67 vergraben wurde (Deutung, nicht gesichert).', depthPoints: 8 },
        exercise('EXR:GALILAEA-30:BROT', 'Brot und Weizenpreis', 'Die Mischna (Pea 8,7) bestimmt: Einem wandernden Armen gibt man mindestens einen Laib Brot für einen Pondion, wenn vier Sea Weizen einen Sela kosten. Ein Sela sind 4 Denare, ein Denar 6 Maa, eine Maa 2 Pondion. Wie viele Pondion kosten vier Sea Weizen? Und wie viele Laibe zu einem Pondion bekommt man ungefähr aus einem Sea Weizen, wenn ein Sea 6 Kab sind und ein Laib einem halben Kab entspricht?', '1 Sela = 4 Denare = 24 Maa = 48 Pondion. Vier Sea kosten also 48 Pondion, ein Sea 12 Pondion. Ein Sea = 6 Kab = 12 halbe Kab, also 12 Laibe. Für 12 Pondion Weizen bekommt der Arme 12 Laibe zu je einem Pondion – der Mischna-Kommentar Bartenura erklärt, dass der Bäcker am Mahlen und Backen mitverdienen will, darum entspricht der Laib nur einem halben Kab.'),
        { id: 'QUIZ:GALILAEA-30:GELD', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein Pilger aus Kafarnaum will die Tempelsteuer zahlen und hat nur Bronzemünzen des Antipas. Was muss er tun?', ['Beim Geldwechsler in tyrisches Silber tauschen', 'Nichts, Bronze wird im Tempel angenommen', 'Mit Kaisermünzen zahlen', 'In Naturalien zahlen'], 0, 'Für den Tempel galt tyrisches Silber. Deshalb gab es Geldwechsler – und sie verdienten an jedem Tausch.'),
          q('Warum zeigen die Münzen des Antipas kein Gesicht, die des Philippus aber den Kaiser?', ['Antipas regierte über eine Bevölkerung, die das Bilderverbot ernst nahm; östlich des Jordans lebten mehr Nichtjuden', 'Antipas hatte keine Münzmeister', 'Bilder waren damals zu teuer', 'Philippus war Römer'], 0, 'Die Münzbilder richteten sich nach der Bevölkerung. Galiläa war überwiegend jüdisch, die Gebiete des Philippus gemischt.'),
          q('Der Schatz von Isfiya wird oft „Tempelsteuer“ genannt. Was ist daran Befund, was Deutung?', ['Befund: tausende tyrische Silbermünzen in einem Versteck; Deutung: dass es gesammelte Tempelsteuer war', 'Beides ist Befund', 'Beides ist Deutung', 'Befund: Tempelsteuer; Deutung: dass es Münzen waren'], 0, 'Was gefunden wurde, ist Befund. Wozu das Geld diente, schließt die Forschung aus Zusammensetzung, Ort und Zeit – das bleibt eine Deutung.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GALILAEA-30:KLEIDUNG',
      title: 'Was man trug und wie man aussah',
      entryQuestion: 'Konnte man um das Jahr 30 an der Kleidung erkennen, wer Jude war?',
      takeaway: 'Juden trugen im Wesentlichen dieselbe Tunika und denselben Mantel wie ihre Nachbarn; unterschieden haben sie Regeln – keine Wolle mit Leinen, Schaufäden, bedecktes Haar der verheirateten Frau – und Römer erkannten sie eher an Sabbat, Beschneidung und Armut als am Gewand.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GALILAEA-30:TIERE' },
      sections: [
        { id: 'OBS:GALILAEA-30:SCHMUCK', kind: 'observation', title: 'Eine Schmuckliste aus der Mischna', summary: 'Die Mischna (Schabbat 6,1–3) zählt auf, womit eine Frau am Sabbat nicht auf die Straße gehen darf: Bänder im Haar, ein goldener Stirnreif mit dem Bild Jerusalems („Stadt aus Gold“), eine Halskette, Nasenringe, ein Ring ohne Siegel, eine Nadel ohne Öhr, ein Fläschchen mit Balsamöl. Ohrringe sind erlaubt. Begründung: Sie könnte den Schmuck abnehmen, um ihn zu zeigen, und ihn dabei tragen.', depthPoints: 4 },
        { id: 'EXPL:GALILAEA-30:FUNDE', kind: 'explanation', title: 'Was die Funde zeigen', summary: 'In Masada lagen rund 2000 Stofffragmente: Tuniken, Mäntel, Haarnetze, Decken. Zwei Stoffe aus der Zeit des Herodes sind mit echter Purpurschnecke gefärbt. In der Höhle der Briefe fand man ein Kinderhemd aus zwei zusammengenähten Leinenbahnen. Wolle und Leinen kommen in den jüdischen Funden nicht gemischt vor – die Mischna (Kil’ajim 9,1) verbietet genau diese eine Mischung.', depthPoints: 8 },
        { id: 'EXPL:GALILAEA-30:NACHBARN', kind: 'explanation', title: 'Der Blick der Römer', summary: 'Der Dichter Juvenal beschreibt Juden in Rom an Korb und Heubündel – also an ihrer Armut. Tacitus schreibt, sie hätten die Beschneidung eingeführt, „um sich durch den Unterschied kenntlich zu machen“. Purpur war in Rom ein Rangzeichen: Nach Plinius kostete ein Pfund doppelt gefärbter tyrischer Purpur mehr als 1000 Denare.', depthPoints: 8 },
        exercise('EXR:GALILAEA-30:REGEL', 'Erlaubt oder nicht?', 'Eine Figur in der Chronomap trägt einen Mantel aus Kamelhaar, darunter eine Tunika aus Leinen. Eine zweite Figur trägt eine Tunika, in die ein Leinenfaden in Wolle eingewebt ist. Welche Kleidung verstößt nach Kil’ajim 9,1 gegen die Regel?', 'Nur die zweite. Verboten ist allein die Mischung von Schafwolle und Leinen in einem Stoff. Kamelhaar ist keine Schafwolle; Mantel und Tunika sind außerdem zwei getrennte Kleidungsstücke. Die Ausnahme waren Priesterkleider und die Schaufäden.'),
        { id: 'QUIZ:GALILAEA-30:KLEIDUNG', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Warum ist die Schmuckliste der Mischna für Historiker wertvoll, obwohl sie ein Verbot ist?', ['Sie verrät nebenbei, welchen Schmuck Frauen tatsächlich trugen', 'Weil Verbote immer befolgt wurden', 'Weil sie Preise nennt', 'Weil sie aus Rom stammt'], 0, 'Gesetze regeln, was vorkommt. Eine Liste von Verboten ist darum zugleich ein Inventar des Alltags.'),
          q('Ein Römer sieht zwei Männer in Tunika und Mantel. Woran erkennt er nach den römischen Texten am ehesten, dass einer Jude ist?', ['Am Sabbat und an der Beschneidung, nicht am Gewand', 'An einem gelben Hut', 'An Schuhen aus Gold', 'An einer Toga'], 0, 'Juden trugen keine eigene Tracht. Die Satiriker spotten über Beschneidung, Sabbat und Armut.'),
          q('Zwei Stoffe aus Masada sind mit echter Purpurschnecke gefärbt. Was folgt daraus am vorsichtigsten?', ['Am Hof des Herodes gab es teure Purpurstoffe', 'Alle Juden trugen Purpur', 'Purpur war billig', 'Masada war eine Färberei'], 0, 'Zwei Stoffe aus der Zeit des Herodes zeigen Luxus am Hof – nicht, was gewöhnliche Leute trugen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GALILAEA-30:TIERE',
      title: 'Wie man mit Tieren umgehen soll',
      entryQuestion: 'Durfte ein Ochse am Sabbat pflügen – und durfte man ihm beim Dreschen das Maul zubinden?',
      takeaway: 'Tora und Mischna schützen Tiere durch Ruhe (Sabbat), Anteil (Dtn 25,4) und Mitleid (Ex 23,5); der Römer Cato rechnet dagegen in Nutzen und verkauft alte Ochsen wie alte Sklaven, Plutarch widerspricht ihm.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GALILAEA-30:WASSER' },
      sections: [
        { id: 'OBS:GALILAEA-30:SABBAT-TIER', kind: 'observation', title: 'Ein Esel mit Satteldecke', summary: 'Die Mischna (Schabbat 5,1–2) erlaubt: Das Kamel geht am Sabbat mit Halfter, das Pferd mit Halskette, der Esel mit festgebundener Satteldecke gegen die Kälte hinaus. Eine Last darf kein Tier tragen – wegen des Gebots, auch die Tiere ruhen zu lassen.', depthPoints: 4 },
        { id: 'EXPL:GALILAEA-30:DREI-REGELN', kind: 'explanation', title: 'Ruhe, Anteil, Mitleid', summary: 'Am Sabbat ruhen Mensch und Tier (Ex 20,10). „Du sollst dem Ochsen, der drischt, nicht das Maul verbinden“ (Dtn 25,4): Wer arbeitet, darf vom Ertrag essen – die Mischna (Bava Metzia 7,2) sagt dasselbe vom Erntearbeiter. Und liegt der Esel deines Feindes unter seiner Last, sollst du abladen helfen (Ex 23,5). Daraus leitet der Talmud das Verbot ab, Tieren unnötig Leid zuzufügen.', depthPoints: 8 },
        { id: 'EXPL:GALILAEA-30:CATO', kind: 'explanation', title: 'Cato rechnet, Plutarch widerspricht', summary: 'Cato der Ältere rät dem Gutsherrn um 160 v. Chr.: Verkaufe abgearbeitete Ochsen, fehlerhaftes Vieh, einen alten Sklaven, einen kranken Sklaven – „der Herr soll gern verkaufen, nicht gern kaufen“. Plutarch schreibt über 200 Jahre später, man dürfe Lebewesen nicht wie abgenutzte Schuhe wegwerfen; er würde nicht einmal einen alten Ochsen verkaufen, der für ihn gearbeitet hat.', depthPoints: 8 },
        exercise('EXR:GALILAEA-30:SABBATJAHR', 'Rom rechnet mit dem Sabbatjahr', 'Caesar bestimmte 47 v. Chr., dass Judäa jährlich Tribut zahlt – außer im siebten Jahr, weil die Juden dann weder säen noch Früchte ernten (Josephus, Ant. 14,202). Ein Bauer erntet in normalen Jahren 100 Sea Getreide und muss davon 12 Sea für den Tribut abgeben. Wie viel Getreide muss er im sechsten Jahr mindestens zurücklegen, damit er im siebten Jahr dieselbe Menge zum Leben hat wie sonst?', 'In einem normalen Jahr bleiben ihm 100 − 12 = 88 Sea. Im siebten Jahr erntet er nichts, zahlt aber auch keinen Tribut – er braucht also 88 Sea aus dem Vorrat. Im sechsten Jahr erntet er 100 Sea, zahlt 12 Tribut, braucht 88 zum Leben und muss weitere 88 zurücklegen – das geht nur mit einer viel besseren Ernte oder mit Vorräten aus früheren Jahren. Die Tora verheißt für das sechste Jahr eine dreifache Ernte (Lev 25,21).'),
        { id: 'QUIZ:GALILAEA-30:TIERE', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Am Sabbat führt ein Bauer seinen Esel mit einem Sack Getreide durchs Dorf. Was sagt die Mischna?', ['Nicht erlaubt: Das Tier darf am Sabbat keine Last tragen', 'Erlaubt, wenn der Sack klein ist', 'Erlaubt, weil es kein Mensch trägt', 'Erlaubt, wenn der Esel dem Feind gehört'], 0, 'Auch die Tiere sollen ruhen. Erlaubt ist nur, was das Tier führt oder schützt – Halfter, Zaum, festgebundene Satteldecke.'),
          q('Wie würde Cato über einen alten Ochsen entscheiden, wie Plutarch?', ['Cato verkauft ihn, Plutarch behält ihn', 'Beide verkaufen ihn', 'Beide behalten ihn', 'Cato schlachtet ihn, Plutarch verkauft ihn'], 0, 'Cato rechnet in Nutzen, Plutarch denkt an den Charakter des Halters. Beide sind Römer – ihre Haltungen unterscheiden sich trotzdem.'),
          q('Was verbindet Dtn 25,4 mit Bava Metzia 7,2?', ['Wer arbeitet – Tier oder Mensch –, darf von dem essen, woran er arbeitet', 'Beide verbieten das Dreschen am Sabbat', 'Beide regeln den Preis des Ochsen', 'Beide handeln von Wasser'], 0, 'Der dreschende Ochse und der Erntearbeiter haben Anteil am Ertrag. Der Talmud liest beide Regeln zusammen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GALILAEA-30:WASSER',
      title: 'Wasser und Reinheit',
      entryQuestion: 'Warum stritt Jerusalem um eine Wasserleitung – und wie viel Wasser braucht ein Tauchbad?',
      takeaway: 'Wasser war Versorgung und Reinheit zugleich: Ein Tauchbad (Mikwe) braucht 40 Sea stehendes, nicht geschöpftes Wasser; Pilatus’ Wasserleitung löste einen Aufruhr aus, weil er sie mit dem Tempelschatz bezahlte.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GALILAEA-30:QUELLEN' },
      sections: [
        { id: 'OBS:GALILAEA-30:SILOAH', kind: 'observation', title: 'Zwei Stufen unter einem Abwasserrohr', summary: 'Im Juni 2004 legten Arbeiter in Jerusalem bei der Reparatur einer Abwasserleitung zwei Steinstufen frei. Die Archäologen Ronny Reich und Eli Shukron erkannten die Treppe zum Teich Siloah aus der Zeit des Zweiten Tempels: Abschnitte zu je fünf Stufen mit breiten Absätzen. Reich deutete den Teich als große Mikwe, an der Pilger sich vor dem Aufstieg zum Tempel reinigten.', depthPoints: 4 },
        { id: 'EXPL:GALILAEA-30:MIKWE', kind: 'explanation', title: '40 Sea stehendes Wasser', summary: 'Die Mischna (Mikwaot 1,1–8) ordnet Wasser in sechs Stufen. Erst eine Mikwe mit 40 Sea Wasser reinigt Menschen und Gegenstände; eine Quelle reinigt schon mit der kleinsten Menge. Das Wasser muss gesammelt sein, nicht geschöpft: Regen, der über Rinnen ohne Gefäß in ein Becken läuft. Die Gelehrten beschrieben 40 Sea als eine Elle mal eine Elle mal drei Ellen.', depthPoints: 8 },
        { id: 'EXPL:GALILAEA-30:LEITUNG', kind: 'explanation', title: 'Eine Leitung aus dem Tempelschatz', summary: 'Josephus berichtet, Pilatus habe Wasser nach Jerusalem geleitet und es mit dem „heiligen Geld“ bezahlt. Zehntausende protestierten; Soldaten in ziviler Kleidung schlugen die Menge nieder (Ant. 18,60–62). Herodes baute in seinen Palästen römische Badehäuser – und gab jedem Kaltbad die Form einer Mikwe.', depthPoints: 8 },
        exercise('EXR:GALILAEA-30:VOLUMEN', 'Wie viel sind 40 Sea?', 'Eine Elle ist je nach Rechnung etwa 45 bis 50 cm lang. Wie viele Liter fasst ein Becken von einer Elle mal einer Elle mal drei Ellen? Rechne mit beiden Werten.', 'Mit 45 cm: 0,45 · 0,45 · 1,35 m = 0,273 m³ ≈ 273 Liter. Mit 50 cm: 0,5 · 0,5 · 1,5 m = 0,375 m³ = 375 Liter. 40 Sea liegen also je nach Ellenmaß bei rund 270 bis 380 Litern; weil die Länge der Elle strittig ist, nennen spätere Rechnungen auch andere Werte. Wichtig: Die Mischna gibt ein Maß an, die Umrechnung ist eine Rekonstruktion.'),
        { id: 'QUIZ:GALILAEA-30:WASSER', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('In eine Mikwe mit 39 Sea Regenwasser gießt jemand drei Log geschöpftes Wasser aus Krügen. Was sagt die Mischna?', ['Die Mikwe wird untauglich', 'Jetzt ist sie besonders rein', 'Das spielt keine Rolle', 'Sie wird zur Quelle'], 0, 'Fehlen die 40 Sea, macht schon wenig geschöpftes Wasser die Mikwe untauglich (Mikwaot 3,1). Darum leitete man Regen über Rinnen ohne Gefäß ein.'),
          q('Warum protestierten die Menschen gegen Pilatus’ Wasserleitung, obwohl sie Wasser brachte?', ['Er bezahlte sie aus dem Tempelschatz – ein Römer verfügte über heiliges Geld', 'Weil das Wasser salzig war', 'Weil sie Wasserleitungen grundsätzlich ablehnten', 'Weil die Leitung am Sabbat gebaut wurde'], 0, 'Josephus betont das „heilige Geld“. Der Streit ging um die Verfügung über den Tempelschatz, nicht um das Wasser.'),
          q('Herodes gab dem Kaltbad seiner römischen Badehäuser die Form einer Mikwe. Was zeigt das am ehesten?', ['Er verband römische Badekultur mit jüdischer Reinheit', 'Er kannte keine römischen Bäder', 'Er lehnte jüdische Bräuche ab', 'Mikwen waren römische Erfindungen'], 0, 'Die Forschung (E. Regev) liest darin den Versuch, beide Lebensarten zu verbinden.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:GALILAEA-30:QUELLEN',
      title: 'Quellen prüfen wie ein Historiker',
      entryQuestion: 'Was tut man, wenn derselbe Autor dieselbe Geschichte zweimal verschieden erzählt?',
      takeaway: 'Historiker vergleichen Fassungen, fragen nach Absicht und Herkunft einer Aussage und trennen Befund, Text und Deutung – auch Josephus widerspricht sich, schreibt polemisch und gibt Gerüchte wieder.',
      sections: [
        { id: 'OBS:GALILAEA-30:200-400', kind: 'observation', title: '200 oder 400 Stadien?', summary: 'In den „Jüdischen Altertümern“ (18,60) schreibt Josephus, Pilatus habe die Quelle seiner Wasserleitung 200 Stadien entfernt gefasst. Im älteren „Jüdischen Krieg“ (2,175) sind es 400 Stadien. Ein Stadion sind rund 185 Meter.', depthPoints: 4 },
        { id: 'EXPL:GALILAEA-30:ABSICHT', kind: 'explanation', title: 'Wer spricht – und warum?', summary: 'Josephus war selbst Befehlshaber in Galiläa, später Gefangener und Schützling der Römer. Über seine Gegner, die Galiläer des Johannes von Gischala, schreibt er, sie hätten Frauenkleider getragen, ihr Haar geflochten und die Augen geschminkt – und dabei getötet (Krieg 4,561–563). Das ist Polemik gegen Feinde. Dass Herodes sein Haar schwarz färbte, berichtet er aus einer Aussage unter Folter (Ant. 16,233) – ein Gerücht, keine Beobachtung.', depthPoints: 8 },
        { id: 'EXPL:GALILAEA-30:STUFEN', kind: 'explanation', title: 'Befund, Text, Deutung', summary: 'Ein Befund ist, was man ausgräbt: Stufen, Münzen, Stoffe. Ein Text sagt, was ein Autor behauptet – mit seiner Absicht. Eine Deutung verbindet beides und kann sich ändern. Die SSF kennzeichnet Abschnitte darum als Quellenbefund, Forschungsdeutung oder didaktische Rekonstruktion.', depthPoints: 8 },
        exercise('EXR:GALILAEA-30:STRECKE', 'Was passt besser?', 'Rechne 200 und 400 Stadien in Kilometer um (1 Stadion ≈ 185 m). Die heute bekannten Leitungen aus der Gegend von Bethlehem nach Jerusalem sind einige Dutzend Kilometer lang. Welche Zahl wirkt plausibler – und warum entscheidet das die Frage nicht endgültig?', '200 Stadien ≈ 37 km, 400 Stadien ≈ 74 km. Die 37 km passen besser zu den bekannten Leitungen aus der Gegend südlich von Bethlehem. Endgültig ist das nicht: Josephus kann die gewundene Länge der Leitung gemeint haben, Abschreiber können Zahlen verändert haben, und welche Leitung Pilatus baute, ist archäologisch nicht sicher.'),
        { id: 'QUIZ:GALILAEA-30:QUELLEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Josephus nennt für dieselbe Leitung 200 und 400 Stadien. Was ist der beste nächste Schritt?', ['Beide Angaben festhalten und mit Befunden und Abschriften vergleichen', 'Die größere Zahl nehmen, weil sie eindrucksvoller ist', 'Josephus ganz verwerfen', 'Den Mittelwert als Tatsache angeben'], 0, 'Widersprüche werden dokumentiert, nicht weggeglättet. Befunde und Handschriften helfen bei der Entscheidung.'),
          q('Josephus schreibt, seine Gegner hätten sich wie Frauen geschminkt. Wie liest ein Historiker das?', ['Als Polemik, die trotzdem verrät, was damals als weiblicher Schmuck galt', 'Als genaue Beschreibung des Kriegsalltags', 'Als Beweis, dass es keine Frauen gab', 'Als Fälschung späterer Christen'], 0, 'Polemik sagt viel über den Autor – und nebenbei etwas über die Vorstellungen seiner Zeit.'),
          q('Welche Aussage ist ein Befund?', ['In Jerusalem wurden 2004 Stufen eines Teichs aus der Zeit des Zweiten Tempels freigelegt', 'Der Teich war eine Mikwe für Pilger', 'Herodes färbte sein Haar', 'Pilatus wollte den Tempel entweihen'], 0, 'Die Stufen sind ausgegraben. Dass der Teich eine Mikwe war, ist Deutung; das Haarfärben ist ein Text über ein Gerücht; die Absicht des Pilatus ist Deutung.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

// Belegstufen (docs/SSF-BELEGSTUFEN.md). Rechenaufgaben sind Rekonstruktionen.
export const GALILEE_EVERYDAY_SECTION_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'OBS:GALILAEA-30:MUENZEN': 'quelle',
  'EXPL:GALILAEA-30:BILDLOS': 'forschung',
  'EXPL:GALILAEA-30:TYROS': 'forschung',
  'EXR:GALILAEA-30:BROT': 'rekonstruktion',
  'OBS:GALILAEA-30:SCHMUCK': 'quelle',
  'EXPL:GALILAEA-30:FUNDE': 'forschung',
  'EXPL:GALILAEA-30:NACHBARN': 'quelle',
  'EXR:GALILAEA-30:REGEL': 'rekonstruktion',
  'OBS:GALILAEA-30:SABBAT-TIER': 'quelle',
  'EXPL:GALILAEA-30:DREI-REGELN': 'quelle',
  'EXPL:GALILAEA-30:CATO': 'quelle',
  'EXR:GALILAEA-30:SABBATJAHR': 'rekonstruktion',
  'OBS:GALILAEA-30:SILOAH': 'quelle',
  'EXPL:GALILAEA-30:MIKWE': 'quelle',
  'EXPL:GALILAEA-30:LEITUNG': 'forschung',
  'EXR:GALILAEA-30:VOLUMEN': 'rekonstruktion',
  'OBS:GALILAEA-30:200-400': 'quelle',
  'EXPL:GALILAEA-30:ABSICHT': 'forschung',
  'EXR:GALILAEA-30:STRECKE': 'rekonstruktion',
};

function withEvidence(source: LearningPath): LearningPath {
  return {
    ...source,
    units: source.units.map(unit => ({
      ...unit,
      sections: unit.sections.map(section => {
        const evidence = GALILEE_EVERYDAY_SECTION_EVIDENCE[section.id];
        return evidence ? { ...section, evidence } : section;
      }),
    })),
  };
}

export const galileeEverydayLearningPath: LearningPath = withEvidence(path);
