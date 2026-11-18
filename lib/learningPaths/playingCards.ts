import type { LearningEvidenceLevel, LearningPath, LearningPathSection } from '../learningPaths';
import { q, quiz } from './quizAuthoring';

// Reihe „Am Kartentisch“ (Thomas, 18.11.2026: „Kartenspiele integrieren … dazu auch im SSF und KG
// Lernmodule anlegen“). Drei Lernpfade: Geschichte der Spielkarten, Wahrscheinlichkeit am Kartentisch,
// Skat rechnen. Die Spiele selbst stehen in noxiagame (lib/game/cards, Seite /cards); dort verweist jedes
// Spiel auf seinen Lernpfad. NPCs in noχ¹ᐃ lernen aus denselben Pfaden (noxiagame R-48).
// Wissensknoten: kueper-knowledge-graph, Shard games-playing-cards. Belegstufen nach docs/SSF-BELEGSTUFEN.md.

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

function practice(id: string, title: string, summary: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Praxis: ${title}`, summary, optional: true, depthPoints: 8 };
}

// ---------------------------------------------------------------------------------------------
// 1. Geschichte der Spielkarten
// ---------------------------------------------------------------------------------------------

const historyPath: LearningPath = {
  id: 'PATH:SSF:HIS-SPIELKARTEN-0001',
  title: 'Woher kommen unsere Spielkarten?',
  subtitle: 'Von mamlukischen Hofkarten ohne Gesicht über Kartenverbote und Bußpredigten bis zu Skat aus Altenburg und Canasta aus Montevideo – mit dem Blick der Obrigkeit, der Prediger und der Spieler selbst.',
  status: 'prototype',
  sourceModuleId: 'SSF-HIS-3101',
  kxfModuleId: 'LRN:SSF:HIS-3101',
  domainsNeeded: ['KD:HIS-ARCH', 'KD:HIS-METHOD'],
  suppliedBy: {
    knowledgeGraph: [
      'OBJ:L1:mamluken-spielkarten-topkapi', 'EVT:L1:florenz-kartenverbot-1377', 'DOC:L1:rheinfelden-tractatus-1377',
      'EVT:L1:bernardino-predigt-bologna-1423', 'CON:L1:deutsches-blatt', 'CON:L1:franzoesisches-blatt',
      'ORG:L1:brommesche-tarok-gesellschaft', 'DOC:L1:hempel-scatspiel-1848', 'EVT:L1:erster-skatkongress-1886',
      'OBJ:L1:skatbrunnen-altenburg', 'EVT:L1:canasta-montevideo-1939', 'DOC:L1:thorp-beat-the-dealer-1962',
      'EVT:L1:abschaffung-spielkartensteuer-1981',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Quellen: Florentiner Verbot vom 23. März 1377, Traktat des Johannes von Rheinfelden (Abschrift Basel 1429), Bundestags-Drucksache 8/3687 (1980)',
      'Funde: Mamlukische Karten im Topkapı-Palast (L. A. Mayer 1939)',
      'Spiel: Kartentisch in noχ¹ᐃ (Mau-Mau, Schwimmen, Skat, Doppelkopf, Rommé, Canasta, Blackjack, Patience)',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:SPIELKARTEN:OSTEN',
      title: 'Karten aus dem Osten',
      entryQuestion: 'Warum haben Spielkarten vier Farben – und woher kommt diese Idee?',
      takeaway: 'Das älteste fast vollständige Kartenspiel mit vier Farben zu je dreizehn Karten stammt aus dem Mamlukenreich; seine Farben Münzen, Becher, Schwerter und Polostäbe kehren in den italienischen und spanischen Karten wieder. Ob Karten ursprünglich aus China kamen, ist wahrscheinlich, aber nicht sicher belegt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SPIELKARTEN:1377' },
      sections: [
        { id: 'OBS:SPIELKARTEN:MAMLUKEN', kind: 'observation', title: 'Hofkarten ohne Gesicht', summary: 'Im Topkapı-Palast in Istanbul liegt ein fast vollständiges, von Hand gemaltes Kartenspiel aus dem Mamlukenreich (Ägypten und Syrien, 15. oder frühes 16. Jahrhundert). Es hat vier Farben – Münzen, Becher, Schwerter und Polostäbe – mit je zehn Zahlenkarten und drei Hofkarten: König, Stellvertreter und zweiter Stellvertreter. Die Hofkarten zeigen keine Menschen, nur ihren Rang in Schrift und Ornament. Der Orientalist Leo Aryeh Mayer machte die Karten 1939 bekannt.', depthPoints: 4 },
        { id: 'EXPL:SPIELKARTEN:CHINA', kind: 'explanation', title: 'Papier, Druck und ein Blätterspiel', summary: 'Karten setzen billiges Papier und am besten Druck voraus – beides gab es zuerst in China. Ein Text aus dem 9. Jahrhundert erzählt, dass Prinzessin Tongchang im Jahr 868 ein „Blätterspiel“ spielte. Ob damit Karten gemeint sind, ist in der Forschung umstritten. Sicher sind chinesische Geldkarten aus späterer Zeit.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:LATEIN', kind: 'explanation', title: 'Vom Polostab zum Stab', summary: 'Die ältesten europäischen Karten Italiens und Spaniens haben die Farben Münzen, Becher, Schwerter und Stäbe – fast genau die mamlukischen. Aus dem Polostab, einem Sportgerät der mamlukischen Oberschicht, wurde ein einfacher Stab: Polo kannte in Europa kaum jemand. Die Forschung schließt daraus, dass die Karten über den Handel im Mittelmeer nach Europa kamen.', depthPoints: 8 },
        exercise('EXR:SPIELKARTEN:VERGLEICH', 'Ein altes und ein neues Blatt', 'Das mamlukische Blatt hat vier Farben mit je zehn Zahlenkarten und drei Hofkarten. Wie viele Karten sind das? Vergleiche mit einem heutigen Blatt für Blackjack oder Patience: Wie viele Karten hat es, und wie ist eine Farbe aufgebaut?', 'Mamlukisch: 4 · (10 + 3) = 52 Karten. Das heutige französische Blatt hat ebenfalls 52 Karten: je Farbe Ass bis Zehn (zehn Zahlenkarten, das Ass als Eins) und drei Bildkarten (Bube, Dame, König). Aufbau und Zahl stimmen also überein – nur die Farbzeichen und die Figuren sind andere, und aus dem zweiten Stellvertreter wurde eine Dame.'),
        { id: 'QUIZ:SPIELKARTEN:OSTEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein italienisches Kartenspiel zeigt Münzen, Becher, Schwerter und Stäbe. Welche Herkunft legt das nahe?', ['Rom in der Antike', 'Die mamlukischen Karten mit Münzen, Bechern, Schwertern und Polostäben', 'Der Hof in Paris', 'Die Skatrunde in Altenburg'], 1, 'Die vier Farben entsprechen fast genau den mamlukischen; nur aus dem Polostab wurde ein Stab. Darum gilt der Weg über das Mittelmeer als wahrscheinlich.'),
          q('Warum zeigen die mamlukischen Hofkarten keine Gesichter?', ['Weil die Maler keine Gesichter malen konnten', 'Weil die Karten unfertig blieben', 'Weil in ihrer Kultur die Darstellung von Menschen gemieden wurde und der Rang auch in Schrift zu erkennen war', 'Weil Hofkarten damals verboten waren'], 2, 'Die Forschung erklärt das mit der Zurückhaltung gegenüber Menschenbildern im sunnitischen Islam. Der Rang steht als Schrift auf der Karte.'),
          q('Eine Zeitschrift schreibt: „Die Chinesen erfanden 868 die Spielkarten.“ Was ist daran zu prüfen?', ['Ob das „Blätterspiel“ von 868 wirklich ein Kartenspiel war – das ist umstritten', 'Nichts, das ist sicher belegt', 'Ob es 868 schon Papier gab', 'Ob die Prinzessin wirklich lebte'], 0, 'Belegt ist ein Text über ein Blätterspiel. Ob damit Karten gemeint sind, ist eine Deutung. Aus „vielleicht“ darf kein „sicher“ werden.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SPIELKARTEN:1377',
      title: '1377 – ein neues Spiel und seine Gegner',
      entryQuestion: 'Was dachten die Menschen, als im 14. Jahrhundert plötzlich überall Karten gespielt wurde?',
      takeaway: 'Ab 1377 tauchen Karten in Europa schlagartig in Quellen auf: als neues Spiel, das Städte verbieten, das ein Dominikaner als Bild der Gesellschaft beschreibt und gegen das Prediger zu Felde ziehen. Die Quellen zeigen den Blick der Obrigkeit und der Kirche – die Spieler selbst kommen kaum zu Wort.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SPIELKARTEN:FARBEN' },
      sections: [
        { id: 'OBS:SPIELKARTEN:FLORENZ', kind: 'observation', title: 'Ein Verbot in Florenz', summary: 'Am 23. März 1377 verbietet die Regierung von Florenz ein Spiel, das „neu aufgekommen“ sei: das Kartenspiel. Im selben Jahr beschreibt ein Dominikaner in Basel das Spiel ausführlich – die älteste bekannte Beschreibung von Spielkarten in Europa. Eine Abschrift von 1429 liegt in der Universitätsbibliothek Basel und ist heute online zu lesen.', depthPoints: 4 },
        { id: 'EXPL:SPIELKARTEN:RHEINFELDEN', kind: 'explanation', title: 'Karten als Bild der Gesellschaft', summary: 'Der Mönch, bekannt als Johannes von Rheinfelden (er stammte wohl aus Freiburg), erklärt nicht nur die Regeln. Wie sein Ordensbruder Jacobus de Cessolis es mit dem Schach getan hatte, deutet er die Karten als Ordnung der Gesellschaft: Könige, Diener, Stände – und was ein guter Christ daraus lernen soll. Das Spiel war für ihn ein Anlass zur Moral.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:PREDIGT', kind: 'explanation', title: 'Wie die Nachbarn das Spiel sahen', summary: 'Viele Städte erließen Verbote, meist gegen das Spielen um Geld. Der Franziskaner Bernardino von Siena predigte 1423 in Bologna so wirkungsvoll gegen Karten und Würfel, dass seine Zuhörer ihre Karten verbrannten. Eine Legende erzählt, ein ruinierter Kartenmaler habe danach Tafeln mit dem Christuszeichen IHS gemalt und damit mehr verdient als zuvor. Das ist Überlieferung aus Heiligenleben, kein gesicherter Befund. Eine angeblich noch frühere Erwähnung in Bern 1367 gilt als unsicher.', depthPoints: 8 },
        exercise('EXR:SPIELKARTEN:QUELLE-LEGENDE', 'Quelle, Deutung oder Legende?', 'Ordne zu: (a) Florenz verbietet 1377 das Kartenspiel. (b) Die Karten kamen über Händler aus dem Mamlukenreich nach Italien. (c) Ein Kartenmaler wurde nach Bernardinos Predigt mit IHS-Tafeln reich. (d) Johannes von Rheinfelden beschreibt 1377 das Kartenspiel.', '(a) Quelle – das Verbot ist überliefert. (b) Deutung der Forschung – sie stützt sich auf die Ähnlichkeit der Farben, ein direkter Beleg des Weges fehlt. (c) Legende – erzählt in späteren Heiligenleben, nicht belegt. (d) Quelle – der Traktat ist in Abschriften erhalten.'),
        { id: 'QUIZ:SPIELKARTEN:1377', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Die Quellen von 1377 sind Verbote, ein Moraltraktat und später Predigten. Was fehlt in diesem Bild?', ['Die Sicht der Spielerinnen und Spieler selbst', 'Die Sicht der Obrigkeit', 'Die Sicht der Kirche', 'Nichts – das Bild ist vollständig'], 0, 'Schriftliche Quellen stammen meist von Obrigkeit und Kirche. Wie die Spieler ihr Spiel erlebten, müssen wir aus Spuren erschließen – ein typisches Problem der Geschichte des Alltags.'),
          q('Warum deutete Johannes von Rheinfelden die Karten als Ordnung der Gesellschaft?', ['Weil die Karten Porträts echter Könige zeigten', 'Weil er wie beim Schach ein beliebtes Spiel nutzte, um Moral zu lehren', 'Weil er die Karten erfunden hatte', 'Weil es ein Gesetz verlangte'], 1, 'Spiele mit Königen und Dienern boten sich als Gleichnis an. Jacobus de Cessolis hatte es mit dem Schach vorgemacht.'),
          q('Ein Stadtführer erzählt die Geschichte vom Kartenmaler, der durch IHS-Tafeln reich wurde, als Tatsache. Wie reagierst du?', ['Sie stimmt, weil sie oft erzählt wird', 'Sie ist sicher erfunden', 'Ich zähle sie zu den Legenden: Sie steht in späteren Heiligenleben und ist nicht anders belegt', 'Ich glaube sie, weil Bernardino ein Heiliger ist'], 2, 'Häufiges Erzählen macht aus einer Legende keine Quelle. Erfunden muss sie deshalb nicht sein – wir wissen es nur nicht.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SPIELKARTEN:FARBEN',
      title: 'Eichel oder Kreuz?',
      entryQuestion: 'Warum spielt man Skat in Altenburg mit Eicheln und Schellen, in Hamburg aber mit Kreuz und Karo?',
      takeaway: 'Im 15. Jahrhundert setzten sich im deutschen Raum Eichel, Grün (Laub), Herz und Schellen mit Ober und Unter durch, um 1480 machten französische Kartenmacher daraus Kreuz, Pik, Herz und Karo mit Dame und Bube. Die einfachen französischen Zeichen ließen sich leicht drucken und eroberten über England die Welt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SPIELKARTEN:SKAT' },
      sections: [
        { id: 'OBS:SPIELKARTEN:ZWEI-BLAETTER', kind: 'observation', title: 'Dasselbe Spiel, zwei Blätter', summary: 'Am Skattisch in Sachsen oder Thüringen liegen Karten mit Eicheln, grünen Blättern, Herzen und Schellen; statt Dame und Bube gibt es Ober und Unter. In Norddeutschland spielt man dasselbe Spiel mit Kreuz, Pik, Herz und Karo. Beim Doppelkopf-Turnier des Deutschen Doppelkopf-Verbands ist das französische Bild sogar vorgeschrieben.', depthPoints: 4 },
        { id: 'EXPL:SPIELKARTEN:DEUTSCH', kind: 'explanation', title: 'Das deutsche Blatt', summary: 'Die frühen deutschen Karten waren bunt gemischt: Falken, Hunde, Hirsche, Blumen – jeder Kartenmacher hatte eigene Farben. Um 1450 hatte sich das deutsche System durchgesetzt: Eichel, Laub (Grün), Herz und Schellen. Die Bildkarten heißen Ober und Unter, das „Ass“ ist eigentlich ein Daus und trägt zwei Zeichen. Heute ist das deutsche Blatt in Süd- und Ostdeutschland, Österreich und vielen Ländern Mitteleuropas verbreitet.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:FRANZOESISCH', kind: 'explanation', title: 'Das französische Blatt', summary: 'Um 1480 übernahmen französische Kartenmacher das deutsche System und vereinfachten es: aus Laub wurde Pik, aus Eichel Kreuz (Treff), aus Schellen Karo. Die flachen, einfarbigen Zeichen ließen sich mit Schablonen schnell drucken. Über England kam das französische Blatt nach Amerika und in die ganze Welt.', depthPoints: 8 },
        exercise('EXR:SPIELKARTEN:UEBERSETZEN', 'Übersetzen am Skattisch', 'Deine Mitspielerin spielt mit dem deutschen Blatt und sagt: „Ich hab den Eichel-Unter, den Grün-Ober und den Schellen-Daus.“ Wie heißen die drei Karten im französischen Blatt?', 'Eichel-Unter = Kreuz-Bube, Grün-Ober = Pik-Dame, Schellen-Daus = Karo-Ass. Eichel entspricht Kreuz, Grün (Laub) Pik, Herz bleibt Herz, Schellen entspricht Karo; Ober = Dame, Unter = Bube, Daus = Ass.'),
        { id: 'QUIZ:SPIELKARTEN:FARBEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Beim Skat mit deutschem Blatt ist der höchste Trumpf der „Eichel-Unter“. Welche Karte ist das im französischen Blatt?', ['Kreuz-Dame', 'Pik-Bube', 'Kreuz-Ass', 'Kreuz-Bube'], 3, 'Eichel entspricht Kreuz, der Unter dem Buben. Der Kreuz-Bube ist beim Skat der höchste Trumpf.'),
          q('Warum setzte sich das französische Blatt weltweit durch?', ['Seine einfachen Zeichen ließen sich leicht drucken, und über England verbreitete es sich in Amerika und den Kolonien', 'Weil es älter ist als das deutsche', 'Weil der Papst es vorschrieb', 'Weil es mehr Karten hat'], 0, 'Die Druckbarkeit machte die Karten billiger, und die Handels- und Kolonialwege taten den Rest.'),
          q('Ein Museum zeigt eine Karte mit Falken und Hunden als Farbe. Was schließt du?', ['Es ist eine Fälschung', 'Sie stammt sicher aus Frankreich', 'Sie stammt wohl aus der Zeit vor der Festlegung der Farben im 15. Jahrhundert', 'Sie gehört zu einem Doppelkopf-Blatt'], 2, 'Bevor sich Eichel, Laub, Herz und Schellen um 1450 durchsetzten, experimentierten die Kartenmacher mit Tieren und Pflanzen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SPIELKARTEN:SKAT',
      title: 'Wie Altenburg den Skat erfand',
      entryQuestion: 'Kann man wissen, wer ein Kartenspiel erfunden hat?',
      takeaway: 'Skat entstand zwischen 1810 und 1813 in einer Altenburger Spielrunde aus älteren Spielen (Schafkopf, Tarock, L’Hombre); das Wort „Scat“ steht erstmals 1813 in einer Spielkladde. Dass ein einzelner Advokat ihn an einem Abend erfand, ist eine widerlegte Legende – Regeln, Kongresse und das Skatgericht zeigen, wie ein Spiel gemeinsam wächst.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SPIELKARTEN:AMERIKA' },
      sections: [
        { id: 'OBS:SPIELKARTEN:KLADDE', kind: 'observation', title: 'Ein Wort in einer Spielkladde', summary: 'Ein Altenburger Kanzler, Hans Carl Leopold von der Gabelentz, schrieb über Jahre seine Gewinne und Verluste beim Spiel auf. Am 4. September 1813 steht darin zum ersten Mal das Wort „Scat“. Seine Aufzeichnungen liegen heute im Thüringischen Staatsarchiv Altenburg.', depthPoints: 4 },
        { id: 'EXPL:SPIELKARTEN:BROMME', kind: 'explanation', title: 'Eine Runde im Gasthaus', summary: 'Die Spieler trafen sich als „Brommesche Tarok-Gesellschaft“: ein Gymnasialprofessor (Johann Friedrich Ludwig Hempel), ein Hofadvokat (Friedrich Ferdinand Hempel), ein Medizinalrat, ein Rat und der Kanzler von der Gabelentz. Aus dem Schafkopf und Zügen von Tarock und L’Hombre wurde ein Spiel zu dritt mit zwei weggelegten Karten. Der Name kommt wohl vom Weggelegten (italienisch scartare, ablegen). Die erste gedruckte Nachricht erschien 1818 in den „Osterländer Blättern“, die erste Regelschrift 1848: „Das Scatspiel“ von Professor Hempel.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:KONGRESS', kind: 'explanation', title: 'Regeln, Gericht und ein Brunnen', summary: 'Jede Gegend spielte anders. Am 7. August 1886 trafen sich in Altenburg Skatspieler zum ersten Skatkongress, um die Regeln zu vereinheitlichen. 1920 kam ein Skatgericht dazu, das Streitfälle entscheidet – heute das Internationale Skatgericht mit Sitz in Altenburg. Seit 1903 steht dort der Skatbrunnen mit vier raufenden Buben, aus Spenden gebaut, 1942 für sein Metall eingeschmolzen und 1954 neu gegossen. Ein Brauch sagt, wer seine Karten im Brunnen „tauft“, hat Glück im Spiel.', depthPoints: 8 },
        exercise('EXR:SPIELKARTEN:SAGE', 'Eine Sage prüfen', 'Lange erzählte man: Der Hofadvokat Friedrich Ferdinand Hempel habe sich eines Abends beim Solo-Spiel gelangweilt und dabei den Skat erfunden. Welche Befunde sprechen dagegen, welche für einen wahren Kern?', 'Dagegen: Die Spielkladde zeigt eine Runde mehrerer Spieler; Professor Hempel beschrieb 1818, 1833 und 1848 eine schrittweise Entwicklung aus älteren Spielen; Oskar Stein widerlegte die Anekdote 1887. Für einen wahren Kern: Friedrich Ferdinand Hempel gehörte zur Runde und hatte offenbar Anteil an der Entwicklung. Die Sage verdichtet eine gemeinsame Entwicklung auf einen Mann und einen Abend – ein häufiges Muster bei Erfindungsgeschichten.'),
        practice('PRX:SPIELKARTEN:AUGEN', 'Eine Kladde führen', 'Spiele am noχ¹ᐃ-Kartentisch oder zu Hause drei Runden Skat und führe wie von der Gabelentz eine Kladde: Datum, Mitspieler, Spiel, gewonnen oder verloren, Punkte. Was kann jemand in 200 Jahren aus deiner Kladde über dich erfahren – und was nicht?'),
        { id: 'QUIZ:SPIELKARTEN:SKAT', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Woher wissen wir, dass es den Namen „Scat“ 1813 schon gab?', ['Aus einer Inschrift am Skatbrunnen', 'Aus der Spielkladde eines Mitspielers, in der das Wort am 4. September 1813 steht', 'Aus dem Regelbuch von 1886', 'Aus einer Zeitung von 1813'], 1, 'Private Aufzeichnungen wie eine Spielkladde sind wertvolle Quellen: Sie wurden ohne Absicht für die Nachwelt geschrieben.'),
          q('Warum brauchte der Skat 1886 einen Kongress?', ['Weil der Skat verboten werden sollte', 'Weil ein Gericht es verlangte', 'Weil jede Gegend andere Regeln spielte und Spieler aus verschiedenen Orten sich nicht einig wurden', 'Weil der Brunnen eingeweiht wurde'], 2, 'Ein Spiel, das sich verbreitet, verändert sich überall ein wenig. Gemeinsame Regeln braucht man erst, wenn Fremde miteinander spielen.'),
          q('Du hörst: „Mein Opa hat den Doppelkopf erfunden.“ Was wäre nach diesem Kapitel die beste Rückfrage?', ['Gibt es Aufzeichnungen aus der Zeit, und spielten andere schon Ähnliches?', 'Welche Farbe hatten seine Karten?', 'Wie alt ist er geworden?', 'Hat er auch den Skatbrunnen gebaut?'], 0, 'Erfindungen von Spielen sind fast immer gemeinsame Entwicklungen. Zeitnahe Aufzeichnungen und Vorgänger-Spiele helfen, eine Familiengeschichte einzuordnen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SPIELKARTEN:AMERIKA',
      title: 'Rommé, Canasta, Blackjack – Spiele aus Amerika',
      entryQuestion: 'Warum sind einige unserer beliebtesten Kartenspiele gar nicht in Europa entstanden?',
      takeaway: 'Rommé stammt wohl vom mexikanischen Conquian ab, Canasta wurde 1939 in Montevideo entwickelt, Blackjack wuchs aus dem französischen Vingt-et-un in amerikanischen Spielsälen. Mit Edward Thorp wurde 1962 ein Kartenspiel zum Gegenstand der Mathematik – und der Staat strich 1981 in der Bundesrepublik die Steuer auf Spielkarten.',
      sections: [
        { id: 'OBS:SPIELKARTEN:MONTEVIDEO', kind: 'observation', title: 'Zwei Bridgepartner in Montevideo', summary: 'Im Jahr 1939 entwickelten der Anwalt Segundo Santos und der Architekt Alberto Serrato in Montevideo (Uruguay) ein Spiel, das schneller gehen sollte als Bridge und weniger vom Zufall abhängen als Rommé: Canasta, spanisch „Korb“. Sie meldeten es nie zum Schutz an und verdienten nichts am weltweiten Erfolg.', depthPoints: 4 },
        { id: 'EXPL:SPIELKARTEN:ROMME', kind: 'explanation', title: 'Von Conquian zum Rommé', summary: 'Spiele, bei denen man Sätze und Reihen sammelt, tauchen im 19. Jahrhundert in Mexiko auf: Conquian ist ab 1852 belegt. Der Spieleforscher David Parlett hält Conquian für den Vorfahren aller Rommé-Spiele; eine Herkunft aus China wird ebenfalls diskutiert. Das deutsche Rommé mit zwei Blättern und Jokern ist eine spätere Form.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:THORP', kind: 'explanation', title: 'Ein Mathematiker schlägt die Bank', summary: 'Blackjack entwickelte sich aus dem französischen Vingt-et-un („einundzwanzig“). 1962 veröffentlichte der Mathematiker Edward O. Thorp „Beat the Dealer“: Mit Rechnungen auf einem IBM-704-Großrechner zeigte er, dass man den Vorteil der Bank durch Mitzählen der Karten umkehren kann. Die Spielbanken reagierten mit mehr Blättern im Schuh und früherem Mischen.', depthPoints: 8 },
        { id: 'EXPL:SPIELKARTEN:STEUER', kind: 'explanation', title: 'Der Staat am Kartentisch', summary: 'Lange verdiente der Staat an jedem Kartenspiel mit: Spielkarten trugen einen Steuerstempel. Am 21. Februar 1980 legte die Bundesregierung einen Gesetzentwurf vor, die Spielkarten-, Zündwaren- und Essigsäuresteuer abzuschaffen – sie brachten zusammen nur noch etwa 19 Millionen DM im Jahr. Seit 1981 sind Spielkarten in der Bundesrepublik steuerfrei.', depthPoints: 8 },
        exercise('EXR:SPIELKARTEN:ZEITLEISTE', 'Eine Zeitleiste legen', 'Bringe in die richtige Reihenfolge: erster Skatkongress; Florentiner Kartenverbot; Canasta in Montevideo; deutsches Blatt mit Eichel und Schellen setzt sich durch; „Beat the Dealer“; Bernardinos Predigt in Bologna; das Wort „Scat“ in der Kladde; französisches Blatt mit Pik und Karo; Spielkarten werden in der Bundesrepublik steuerfrei.', '1377 Florentiner Kartenverbot – 1423 Bernardinos Predigt – um 1450 deutsches Blatt – um 1480 französisches Blatt – 1813 „Scat“ in der Kladde – 1886 erster Skatkongress – 1939 Canasta – 1962 „Beat the Dealer“ – 1981 Spielkarten steuerfrei.'),
        { id: 'QUIZ:SPIELKARTEN:AMERIKA', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Santos und Serrato wollten ein Spiel „schneller als Bridge, weniger zufällig als Rommé“. Was sagt das über Spielerfindungen?', ['Neue Spiele entstehen oft aus Unzufriedenheit mit vorhandenen und übernehmen deren Teile', 'Neue Spiele entstehen ohne Vorbilder', 'Bridge war verboten', 'Rommé war unbekannt'], 0, 'Wie beim Skat in Altenburg: Erfinder kombinieren, was sie kennen, und ändern, was sie stört.'),
          q('Warum spielen Spielbanken Blackjack heute mit sechs oder acht Blättern und mischen früh?', ['Weil Karten billiger geworden sind', 'Weil Thorp zeigte, dass Mitzählen der Karten den Vorteil umkehren kann – mehr Karten und frühes Mischen erschweren das', 'Weil es das Gesetz verlangt', 'Weil Spieler das so wünschten'], 1, 'Das Zählen nutzt aus, dass gespielte Karten die Zusammensetzung des Restes verändern. Je mehr Karten und je früher gemischt wird, desto weniger bringt es.'),
          q('Die Spielkartensteuer brachte zuletzt nur wenig ein. Warum schaffte man sie ab?', ['Weil Kartenspielen verboten wurde', 'Weil Spielkarten seitdem aus Kunststoff sind', 'Weil Karten nicht mehr gedruckt wurden', 'Weil der Aufwand für eine kleine Steuer zu groß war – das Ziel war ein einfacheres Steuerrecht'], 3, 'Der Gesetzentwurf von 1980 nennt die Vereinfachung des Steuerrechts als Ziel. Bagatellsteuern kosten oft fast so viel Verwaltung, wie sie einbringen.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

export const PLAYING_CARDS_HISTORY_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'OBS:SPIELKARTEN:MAMLUKEN': 'quelle',
  'EXPL:SPIELKARTEN:CHINA': 'forschung',
  'EXPL:SPIELKARTEN:LATEIN': 'forschung',
  'EXR:SPIELKARTEN:VERGLEICH': 'rekonstruktion',
  'OBS:SPIELKARTEN:FLORENZ': 'quelle',
  'EXPL:SPIELKARTEN:RHEINFELDEN': 'forschung',
  'EXPL:SPIELKARTEN:PREDIGT': 'forschung',
  'EXR:SPIELKARTEN:QUELLE-LEGENDE': 'rekonstruktion',
  'OBS:SPIELKARTEN:ZWEI-BLAETTER': 'quelle',
  'EXPL:SPIELKARTEN:DEUTSCH': 'forschung',
  'EXPL:SPIELKARTEN:FRANZOESISCH': 'forschung',
  'EXR:SPIELKARTEN:UEBERSETZEN': 'rekonstruktion',
  'OBS:SPIELKARTEN:KLADDE': 'quelle',
  'EXPL:SPIELKARTEN:BROMME': 'forschung',
  'EXPL:SPIELKARTEN:KONGRESS': 'forschung',
  'EXR:SPIELKARTEN:SAGE': 'rekonstruktion',
  'PRX:SPIELKARTEN:AUGEN': 'rekonstruktion',
  'OBS:SPIELKARTEN:MONTEVIDEO': 'forschung',
  'EXPL:SPIELKARTEN:ROMME': 'forschung',
  'EXPL:SPIELKARTEN:THORP': 'forschung',
  'EXPL:SPIELKARTEN:STEUER': 'quelle',
  'EXR:SPIELKARTEN:ZEITLEISTE': 'rekonstruktion',
};

// ---------------------------------------------------------------------------------------------
// 2. Wahrscheinlichkeit am Kartentisch
// ---------------------------------------------------------------------------------------------

const probabilityPath: LearningPath = {
  id: 'PATH:SSF:MAT-KARTEN-WAHRSCHEINLICHKEIT-0001',
  title: 'Wie wahrscheinlich ist ein Blackjack?',
  subtitle: 'Mischen, Zählen, Erwartungswert: Wahrscheinlichkeitsrechnung an Blackjack, Schwimmen und Skat – bis zu der Frage, ob man die Bank schlagen kann.',
  status: 'prototype',
  sourceModuleId: 'SSF-MAT-2201',
  kxfModuleId: 'LRN:SSF:MAT-2201',
  domainsNeeded: ['KD:MATH-STAT:N1', 'KD:MATH:N1'],
  suppliedBy: {
    knowledgeGraph: ['CON:L1:fakultaet-anordnungen', 'CON:L1:laplace-wahrscheinlichkeit', 'CON:L1:ziehen-ohne-zuruecklegen', 'CON:L1:erwartungswert', 'CON:L1:kartenzaehlen-hi-lo', 'CON:L1:blackjack', 'DOC:L1:bayer-diaconis-1992', 'DOC:L1:thorp-beat-the-dealer-1962'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Spiel: noχ¹ᐃ-Kartentisch mit Zählhilfe (Hi-Lo) und Grundstrategie beim Blackjack', 'Forschung: Bayer & Diaconis, Trailing the Dovetail Shuffle to its Lair (1992); Thorp, Beat the Dealer (1962)'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:KARTEN-WS:MISCHEN',
      title: 'Gab es diese Reihenfolge schon einmal?',
      entryQuestion: 'Wenn du ein Kartenspiel gut mischst – hatte es diese Reihenfolge schon einmal jemand in der Hand?',
      takeaway: 'Ein Blatt mit 52 Karten hat 52! ≈ 8 · 10⁶⁷ Reihenfolgen – mehr, als je gemischt wurden. Gut gemischt ist ein Blatt erst, wenn jede Reihenfolge fast gleich wahrscheinlich ist; beim Riffeln braucht man dafür etwa sieben Durchgänge.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KARTEN-WS:ASS' },
      sections: [
        { id: 'OBS:KARTEN-WS:MISCHEN', kind: 'observation', title: 'Einmal mischen', summary: 'Nimm ein frisch gekauftes Blatt, die Karten liegen sortiert. Mische einmal durch und lege die Karten auf: Ganze Reihen stehen noch in der alten Reihenfolge. Nach dem dritten Mischen sieht es schon durcheinander aus – aber ist es das auch?', depthPoints: 4 },
        { id: 'EXPL:KARTEN-WS:FAKULTAET', kind: 'explanation', title: 'So viele Reihenfolgen', summary: 'Für die erste Stelle gibt es 52 Karten, für die zweite noch 51, für die dritte 50 – zusammen 52 · 51 · 50 · … · 1. Diese Zahl schreibt man 52! („52 Fakultät“). Sie ist etwa 8 · 10⁶⁷, eine 8 mit 67 Nullen. Selbst wenn alle Menschen seit Jahrtausenden jede Sekunde mischten, käme man nicht annähernd an so viele Reihenfolgen. Beim Skatblatt sind es 32! ≈ 2,6 · 10³⁵.', depthPoints: 8 },
        { id: 'EXPL:KARTEN-WS:SIEBEN', kind: 'explanation', title: 'Sieben Mal riffeln', summary: 'Die Mathematiker Dave Bayer und Persi Diaconis untersuchten 1992 das Riffeln, bei dem man zwei Hälften ineinanderblättert. Ergebnis: Bis zum vierten Mal bleibt viel Ordnung erhalten, um das siebte Mal herum wird jede Reihenfolge fast gleich wahrscheinlich. Mit dem Überhandmischen dauert es viel länger. Ein Computer wie der noχ¹ᐃ-Kartentisch mischt anders: Er zieht jede Position zufällig nach (Fisher-Yates) und erreicht so sofort jede Reihenfolge mit gleicher Wahrscheinlichkeit.', depthPoints: 8 },
        exercise('EXR:KARTEN-WS:ANORDNUNGEN', 'Wie schnell das wächst', 'Wie viele Reihenfolgen gibt es für 3 Karten, für 4 Karten und für 10 Karten? Schreibe für 3 Karten alle Reihenfolgen auf.', '3! = 6 (ABC, ACB, BAC, BCA, CAB, CBA). 4! = 24. 10! = 3 628 800. Jede weitere Karte vervielfacht die Zahl – darum explodiert sie bei 32 oder 52 Karten.'),
        practice('PRX:KARTEN-WS:RIFFELN', 'Wie viel Ordnung bleibt?', 'Sortiere ein Blatt nach Farben und Werten. Riffle einmal, zweimal, dreimal und lege jeweils die Karten auf. Zähle, wie viele Paare nebeneinanderliegender Karten noch in der ursprünglichen Reihenfolge stehen. Ab wann findest du kaum noch welche?'),
        { id: 'QUIZ:KARTEN-WS:MISCHEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein Freund mischt ein neues Blatt zweimal kurz und teilt aus. Was ist zu erwarten?', ['Die Karten sind völlig zufällig verteilt', 'Viele Karten liegen noch in Gruppen der ursprünglichen Ordnung', 'Jede Reihenfolge ist gleich wahrscheinlich', 'Die Karten sind rückwärts sortiert'], 1, 'Zwei Riffel-Durchgänge zerlegen die Ordnung nur in wenige ineinandergeschobene Stapel. Erst nach etwa sieben Durchgängen ist kaum noch etwas übrig.'),
          q('Warum ist 52! so viel größer als 32!?', ['Weil jede zusätzliche Karte die Zahl mit einem immer größeren Faktor multipliziert', 'Weil 52 fast doppelt so groß ist wie 32, also ist 52! doppelt so groß', 'Weil es mehr Farben gibt', 'Weil Joker dazukommen'], 0, 'Von 32! zu 52! kommen zwanzig Faktoren zwischen 33 und 52 dazu – das ergibt einen Unterschied von rund 32 Zehnerpotenzen.'),
          q('Ein Online-Spiel wirbt: „Unsere Karten werden siebenmal geriffelt.“ Was fällt dir auf?', ['Das ist zu wenig', 'Das ist nötig, damit es fair ist', 'Ein Computer muss nicht riffeln; er kann jede Reihenfolge direkt gleich wahrscheinlich erzeugen', 'Das ist verboten'], 2, 'Sieben Riffel sind eine Regel für Hände. Ein Programm mischt mit einem Zufallsverfahren, das in einem Schritt jede Reihenfolge gleich wahrscheinlich macht.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:KARTEN-WS:ASS',
      title: 'Wie oft kommt ein Ass?',
      entryQuestion: 'Wie wahrscheinlich ist es, dass die erste Karte ein Ass ist?',
      takeaway: 'Sind alle Karten gleich wahrscheinlich, ist die Wahrscheinlichkeit die Zahl der günstigen geteilt durch die Zahl der möglichen Fälle: ein Ass aus 52 Karten 4/52 = 1/13 ≈ 7,7 %. Beim Schwimmen sind 31 auf die Hand ein seltener Glücksfall von 24 aus 4960 möglichen Händen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KARTEN-WS:OHNE-ZURUECK' },
      sections: [
        { id: 'OBS:KARTEN-WS:ERSTE-KARTE', kind: 'observation', title: 'Die erste Karte', summary: 'Am Blackjack-Tisch ist die erste Karte, die du bekommst, mal ein Ass, mal eine Zehn, mal eine Drei. Wie oft ist es ein Ass? Spiele zwanzig Runden am Kartentisch und zähle mit.', depthPoints: 4 },
        { id: 'EXPL:KARTEN-WS:LAPLACE', kind: 'explanation', title: 'Günstige durch mögliche Fälle', summary: 'Wenn jede Karte gleich wahrscheinlich ist, gilt: Wahrscheinlichkeit = Zahl der günstigen Fälle ÷ Zahl der möglichen Fälle. Ein Blatt hat 52 Karten, davon 4 Asse: 4/52 = 1/13 ≈ 7,7 %. Die Wahrscheinlichkeit, kein Ass zu bekommen, ist der Rest: 1 − 1/13 = 12/13. Wer zählt, muss sauber trennen, was „günstig“ ist.', depthPoints: 8 },
        { id: 'EXPL:KARTEN-WS:SCHWIMMEN', kind: 'explanation', title: '31 auf die Hand', summary: 'Beim Schwimmen bekommst du drei von 32 Karten. Es gibt 4960 verschiedene Hände (32 · 31 · 30 ÷ 6). Genau 31 hat man nur mit einem Ass und zwei Zehnerkarten (Zehn, Bube, Dame, König) derselben Farbe: je Farbe 6 Möglichkeiten, zusammen 24. Also 24/4960 ≈ 0,5 %. „Feuer“, drei Asse, gibt es nur 4-mal: 4/4960 ≈ 0,08 %.', depthPoints: 8 },
        exercise('EXR:KARTEN-WS:ZAEHLEN', 'Günstige Fälle zählen', 'Aus einem gut gemischten 52er-Blatt wird eine Karte gezogen. Wie wahrscheinlich ist (a) ein Herz, (b) eine Bildkarte (Bube, Dame, König), (c) eine Karte, die beim Blackjack 10 zählt?', '(a) 13/52 = 1/4 = 25 %. (b) 12/52 = 3/13 ≈ 23,1 %. (c) Zehn, Bube, Dame, König: 16/52 = 4/13 ≈ 30,8 % – fast jede dritte Karte zählt beim Blackjack 10.'),
        { id: 'QUIZ:KARTEN-WS:ASS', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Wie wahrscheinlich ist es, dass die erste Karte aus einem Skatblatt (32 Karten) ein Bube ist?', ['1/32', '1/8', '1/4', '4/52'], 1, 'Vier Buben unter 32 Karten: 4/32 = 1/8 = 12,5 %. Gegenüber dem 52er-Blatt ist die Chance höher, weil die kleinen Karten fehlen.'),
          q('Warum darf man beim Zählen von Händen beim Schwimmen nicht einfach 32 · 31 · 30 nehmen?', ['Weil dann jede Hand sechsmal gezählt würde – die Reihenfolge der drei Karten spielt keine Rolle', 'Weil es weniger Karten gibt', 'Weil Asse doppelt zählen', 'Weil 30½ dazukommt'], 0, 'Drei Karten lassen sich auf 3! = 6 Arten ordnen. Für Hände, bei denen die Reihenfolge egal ist, teilt man darum durch 6.'),
          q('Jemand sagt: „Ich hatte gestern zweimal Feuer beim Schwimmen – das Spiel ist gezinkt.“ Was antwortest du?', ['Das ist unmöglich', 'Das ist ganz normal', 'Es ist sehr selten (je Hand etwa 1 zu 1240), aber bei vielen Runden und vielen Spielern nicht ausgeschlossen – ein Beweis für gezinkte Karten ist es allein nicht', 'Feuer gibt es nicht'], 2, 'Seltene Ereignisse passieren, wenn man oft genug spielt. Verdächtig wird es erst, wenn sie viel häufiger auftreten, als die Rechnung erwarten lässt.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:KARTEN-WS:OHNE-ZURUECK',
      title: 'Jede Karte verändert die Chancen',
      entryQuestion: 'Warum ist die Chance auf ein Ass anders, wenn schon zwei Asse auf dem Tisch liegen?',
      takeaway: 'Beim Ziehen ohne Zurücklegen hängen die Wahrscheinlichkeiten davon ab, was schon gezogen wurde. So ergibt sich die Chance auf einen Blackjack (rund 4,8 % mit einem Blatt) – und so rechnet ein Skatspieler, ob ein Bube im Skat liegt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KARTEN-WS:ERWARTUNG' },
      sections: [
        { id: 'OBS:KARTEN-WS:ZWEI-ASSE', kind: 'observation', title: 'Zwei Asse liegen schon', summary: 'Am Blackjack-Tisch liegen schon zwei Asse offen bei anderen Spielern. Du bekommst gleich deine Karte. Ist die Chance auf ein Ass jetzt noch 1/13?', depthPoints: 4 },
        { id: 'EXPL:KARTEN-WS:BLACKJACK', kind: 'explanation', title: 'Die Chance auf einen Blackjack', summary: 'Ein Blackjack sind ein Ass und eine Zehnerkarte in den ersten zwei Karten. Mit einem Blatt: erst ein Ass (4/52), dann eine Zehnerkarte aus den restlichen 51 (16/51) – oder umgekehrt. Zusammen 2 · 4/52 · 16/51 = 128/2652 ≈ 4,8 %. Im Schuh aus sechs Blättern: 2 · 24/312 · 96/311 ≈ 4,75 %. Die zweite Karte kommt aus einem Rest, in dem eine Karte fehlt – das ist „Ziehen ohne Zurücklegen“.', depthPoints: 8 },
        { id: 'EXPL:KARTEN-WS:SKAT-BUBE', kind: 'explanation', title: 'Liegt ein Bube im Skat?', summary: 'Du hast beim Skat keinen Buben auf der Hand. Die 22 Karten, die du nicht kennst, enthalten also alle vier Buben, und zwei davon liegen im Skat. Die Chance, dass im Skat kein Bube liegt: 18/22 · 17/21 = 306/462 ≈ 66 %. Also liegt mit etwa 34 % mindestens ein Bube im Skat – eine Rechnung, die beim Reizen hilft.', depthPoints: 8 },
        exercise('EXR:KARTEN-WS:UEBERKAUFEN', 'Überkaufen bei 16 und bei 12', 'Du hast beim Blackjack 16 Punkte (ohne Ass) und nimmst eine Karte. Welche Werte lassen dich überkaufen? Wie wahrscheinlich ist das ungefähr, wenn man den kleinen Effekt der schon gezogenen Karten vernachlässigt? Und bei 12 Punkten?', 'Bei 16 überkauft jede Karte ab 6: 6, 7, 8, 9 und die vier Zehnerkarten (Zehn, Bube, Dame, König) – 8 von 13 Werten, also etwa 8/13 ≈ 62 %. Bei 12 überkaufen nur die Zehnerkarten: 4/13 ≈ 31 %. Ob man trotzdem zieht, hängt von der offenen Karte der Bank ab – das regelt die Grundstrategie.'),
        { id: 'QUIZ:KARTEN-WS:OHNE-ZURUECK', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Aus einem 52er-Blatt sind zwei Asse und zehn andere Karten offen gespielt. Wie groß ist die Chance auf ein Ass als nächste Karte?', ['4/52', '2/40', '2/52', '4/40'], 1, 'Übrig sind 40 Karten, darunter noch zwei Asse: 2/40 = 5 %. Die gespielten Karten fehlen im Rest.'),
          q('Warum wird ein Blackjack seltener, wenn schon viele Zehnerkarten gespielt sind?', ['Weil die Bank dann öfter gewinnt', 'Weil der Rest weniger Zehnerkarten enthält, die zusammen mit einem Ass einen Blackjack ergeben', 'Weil Asse dann mehr zählen', 'Das stimmt nicht – Karten haben kein Gedächtnis'], 1, 'Einzelne Würfe eines Würfels sind unabhängig, gezogene Karten nicht: Was weg ist, fehlt im Rest.'),
          q('Du hast beim Skat zwei Buben. Wie viele Buben können höchstens im Skat liegen, und unter wie vielen unbekannten Karten?', ['Zwei Buben unter 22 Karten', 'Vier Buben unter 22 Karten', 'Zwei Buben unter 32 Karten', 'Einer unter 20 Karten'], 0, 'Du kennst deine zehn Karten. Die übrigen 22 enthalten die zwei fehlenden Buben, und beide könnten im Skat liegen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:KARTEN-WS:ERWARTUNG',
      title: 'Lohnt sich die Versicherung?',
      entryQuestion: 'Die Bank bietet eine „Versicherung“ an – ist das ein gutes Geschäft?',
      takeaway: 'Der Erwartungswert ist der durchschnittliche Gewinn je Spiel: jeder mögliche Ausgang mal seiner Wahrscheinlichkeit, zusammengezählt. Ist er negativ, verliert man auf Dauer – so verdient die Bank, und so erkennt man schlechte Wetten wie die Versicherung beim Blackjack.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KARTEN-WS:ZAEHLEN' },
      sections: [
        { id: 'OBS:KARTEN-WS:VERSICHERUNG', kind: 'observation', title: 'Ein Angebot der Bank', summary: 'Die Bank zeigt ein Ass. Der Croupier fragt: „Versicherung?“ Man setzt die Hälfte seines Einsatzes und bekommt das Doppelte zurück, wenn die Bank einen Blackjack hat. Viele nehmen das an, um „sicher“ zu sein. Am noχ¹ᐃ-Tisch gibt es die Versicherung nicht – warum wohl?', depthPoints: 4 },
        { id: 'EXPL:KARTEN-WS:ERWARTUNGSWERT', kind: 'explanation', title: 'Der Durchschnitt auf lange Sicht', summary: 'Erwartungswert = Summe aller Ausgänge × ihre Wahrscheinlichkeit. Beispiel mit einem Blatt: Du siehst das Ass der Bank und deine zwei Karten, keine davon eine Zehnerkarte. Unter den 49 unbekannten Karten sind 16 Zehnerkarten. Für jeden Chip Versicherung: mit 16/49 gewinnst du 2 Chips, mit 33/49 verlierst du 1. Erwartungswert: (2 · 16 − 33) / 49 = −1/49 ≈ −2 %. Hältst du selbst zwei Zehnerkarten, sind es nur noch 14 unter 49: (28 − 35)/49 ≈ −14 %.', depthPoints: 8 },
        { id: 'EXPL:KARTEN-WS:HAUSVORTEIL', kind: 'explanation', title: 'Warum die Bank verdient', summary: 'Die Regeln sind so gemacht, dass der Erwartungswert für den Spieler leicht negativ ist: Wer zuerst überkauft, verliert, auch wenn die Bank danach ebenfalls überkauft. Mit der Grundstrategie – der rechnerisch besten Entscheidung für jede Hand und jede offene Bankkarte – sinkt der Vorteil der Bank auf deutlich unter ein Prozent. Ganz verschwindet er nicht.', depthPoints: 8 },
        exercise('EXR:KARTEN-WS:WETTE', 'Eine Wette an der Theke', 'An der Bar bietet jemand an: Du setzt 10 Chips und ziehst eine Karte aus einem Skatblatt (32 Karten). Ist es ein Ass, bekommst du 70 Chips (deinen Einsatz plus 60 Gewinn), sonst sind die 10 Chips weg. Lohnt sich das auf Dauer?', 'Ass: 4/32 = 1/8, Gewinn +60. Kein Ass: 7/8, Verlust −10. Erwartungswert: 1/8 · 60 − 7/8 · 10 = 7,5 − 8,75 = −1,25 Chips je Spiel. Auf Dauer verliert man rund 12,5 % des Einsatzes. Fair wäre die Wette bei einem Gewinn von 70 (plus Einsatz zurück, also 80 Chips Auszahlung).'),
        { id: 'QUIZ:KARTEN-WS:ERWARTUNG', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Eine Wette gewinnt in 1 von 4 Fällen 3 Chips und verliert sonst 1 Chip. Wie hoch ist der Erwartungswert?', ['+0,5 Chips', '−0,25 Chips', '0 Chips', '+0,75 Chips'], 2, '1/4 · 3 − 3/4 · 1 = 0,75 − 0,75 = 0. Die Wette ist fair: Auf Dauer gewinnt und verliert man gleich viel.'),
          q('Warum ist die Versicherung schlechter, wenn du selbst zwei Zehnerkarten hast?', ['Weil dann weniger Zehnerkarten im Rest sind und der Blackjack der Bank seltener wird', 'Weil die Bank dann mehr bezahlt', 'Weil 20 Punkte verlieren', 'Sie ist dann sogar besser'], 0, 'Deine Karten fehlen im Rest. Jede Zehnerkarte in deiner Hand senkt die Chance, dass die verdeckte Karte der Bank eine Zehn ist.'),
          q('Ein NPC in noχ¹ᐃ spielt jeden Abend Blackjack mit Grundstrategie und gleichen Einsätzen. Was erwartest du nach einem Jahr?', ['Er hat viel gewonnen', 'Er hat genau so viel wie am Anfang', 'Er hat etwas verloren – der Erwartungswert ist leicht negativ, auch mit bester Strategie', 'Das lässt sich nicht sagen, weil Karten keinen Durchschnitt kennen'], 2, 'Einzelne Abende schwanken stark. Über viele Spiele setzt sich der Erwartungswert durch – mit Grundstrategie nur ein kleiner Verlust, aber ein Verlust.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:KARTEN-WS:ZAEHLEN',
      title: 'Kann man die Bank schlagen?',
      entryQuestion: 'Was nützt es, sich die gespielten Karten zu merken?',
      takeaway: 'Beim Hi-Lo-Zählen bekommen kleine Karten +1 und große −1; geteilt durch die restlichen Blätter ergibt sich der echte Zählwert. Ist er hoch, liegen viele Zehnen und Asse im Schuh – dann steigen die Chancen des Spielers, und wer klug zählt, setzt mehr. Der Vorteil ist klein, schwankt stark und wird von Spielbanken bekämpft.',
      sections: [
        { id: 'OBS:KARTEN-WS:ZAEHLHILFE', kind: 'observation', title: 'Die Zählhilfe am Tisch', summary: 'Am noχ¹ᐃ-Blackjack-Tisch steht eine Zählhilfe: „laufend +4, echt ≈ +1,6“. Manche Stammspieler setzen dann plötzlich mehr. Was zählen sie da – und warum wirkt es?', depthPoints: 4 },
        { id: 'EXPL:KARTEN-WS:HILO', kind: 'explanation', title: 'Hi-Lo: plus eins, minus eins', summary: 'Jede gesehene Karte verändert eine Zahl im Kopf: Zwei bis Sechs zählen +1, Sieben bis Neun 0, Zehnerkarten und Asse −1. Über alle Karten eines Blattes heben sich +20 und −20 auf. Ist der laufende Zählwert hoch, sind viele kleine Karten weg und viele große übrig. Weil ein Schuh mehrere Blätter hat, teilt man durch die noch übrigen Blätter: echter Zählwert = laufender Zählwert ÷ restliche Blätter.', depthPoints: 8 },
        { id: 'EXPL:KARTEN-WS:WARUM', kind: 'explanation', title: 'Warum große Karten dem Spieler helfen', summary: 'Viele Zehnen und Asse im Rest bedeuten: mehr Blackjacks, die 3:2 zahlen – die Bank bekommt sie genauso oft, aber nur der Spieler wird dafür extra bezahlt. Außerdem muss die Bank bis 16 ziehen und überkauft mit vielen Zehnerkarten öfter. Edward Thorp zeigte 1962, dass Spieler so zeitweise im Vorteil sind. Der Vorteil ist klein und schwankt; Spielbanken mischen deshalb früher und weisen Zähler ab. In noχ¹ᐃ ist Zählen erlaubt – es ist Mathematik.', depthPoints: 8 },
        exercise('EXR:KARTEN-WS:MITZAEHLEN', 'Mitzählen', 'Es fallen nacheinander: 2, 5, König, Ass, 6, 3, 9, Zehn, 4. Wie lautet der laufende Zählwert? Im Schuh sind noch etwa zwei Blätter. Wie hoch ist der echte Zählwert, und was bedeutet er?', '+1 +1 −1 −1 +1 +1 0 −1 +1 = +2. Echter Zählwert: +2 ÷ 2 = +1. Es sind etwas mehr große Karten übrig als im Durchschnitt – ein leichter Vorteil für den Spieler, noch kein Grund für hohe Einsätze.'),
        practice('PRX:KARTEN-WS:BLATT-ZAEHLEN', 'Ein ganzes Blatt durchzählen', 'Nimm ein 52er-Blatt, decke Karte für Karte auf und zähle nach Hi-Lo mit. Am Ende muss 0 herauskommen. Stoppe die Zeit; wer geübt ist, schafft ein Blatt in unter 30 Sekunden. Lege vorher heimlich eine Karte zur Seite: Kannst du am Ende sagen, ob sie hoch oder niedrig war?'),
        { id: 'QUIZ:KARTEN-WS:ZAEHLEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Der laufende Zählwert ist +6, im Schuh sind noch drei Blätter. Wie hoch ist der echte Zählwert?', ['+18', '+3', '+6', '+2'], 3, '+6 ÷ 3 = +2. Derselbe laufende Wert bedeutet bei vielen übrigen Blättern weniger als bei wenigen.'),
          q('Warum heben sich die Hi-Lo-Werte über ein ganzes Blatt genau auf?', ['Weil es gleich viele Karten mit +1 (2–6, fünf Werte) wie mit −1 (10, B, D, K, A, fünf Werte) gibt', 'Weil Asse nicht zählen', 'Weil die Bank mitzählt', 'Das tun sie nicht'], 0, 'Je Farbe fünf kleine und fünf große Werte – 20 mal +1 und 20 mal −1. Darum zeigt der Zählwert, ob im Rest mehr Große oder mehr Kleine liegen.'),
          q('Eine Spielbank mischt den Schuh immer schon nach der Hälfte. Was bewirkt das für Zähler?', ['Nichts', 'Hohe Zählwerte entstehen seltener und halten kürzer, der Vorteil schrumpft', 'Zählen wird einfacher', 'Die Bank verliert dadurch Geld'], 1, 'Große Abweichungen im Rest entstehen erst, wenn viele Karten gespielt sind. Frühes Mischen nimmt dem Zählen die Grundlage.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

export const CARD_PROBABILITY_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'EXPL:KARTEN-WS:SIEBEN': 'forschung',
  'EXPL:KARTEN-WS:WARUM': 'forschung',
  'PRX:KARTEN-WS:RIFFELN': 'rekonstruktion',
};

// ---------------------------------------------------------------------------------------------
// 3. Skat rechnen
// ---------------------------------------------------------------------------------------------

const skatPath: LearningPath = {
  id: 'PATH:SSF:MAT-SKAT-RECHNEN-0001',
  title: 'Warum braucht man beim Skat 61 Augen?',
  subtitle: 'Augen zählen, Spielwert ausrechnen, richtig reizen, Trümpfe mitzählen: Kopfrechnen und Kombinatorik am Skattisch.',
  status: 'prototype',
  sourceModuleId: 'SSF-MAT-2202',
  kxfModuleId: 'LRN:SSF:MAT-2202',
  domainsNeeded: ['KD:MATH:N1', 'KD:MATH-STAT:N1'],
  suppliedBy: {
    knowledgeGraph: ['CON:L1:skat', 'CON:L1:skat-spielwert', 'CON:L1:skat-reizen', 'CON:L1:binomialkoeffizient', 'ORG:L1:brommesche-tarok-gesellschaft', 'EVT:L1:erster-skatkongress-1886'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Regeln: Internationale Skatordnung (Deutscher Skatverband / ISPA)', 'Spiel: noχ¹ᐃ-Kartentisch, Skat mit französischem oder deutschem Blatt'],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:SKAT-RECHNEN:AUGEN',
      title: 'Warum 61?',
      entryQuestion: 'Warum gewinnt man beim Skat mit 61 Augen und nicht mit 60?',
      takeaway: 'Ein Skatblatt hat 120 Augen (je Farbe 11 + 10 + 4 + 3 + 2 = 30). Der Alleinspieler braucht mehr als die Hälfte, also 61; bei 60 : 60 gewinnen die Gegner. Wer 90 erreicht, spielt die Gegner „Schneider“, wer alle Stiche macht, „schwarz“.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SKAT-RECHNEN:SPIELWERT' },
      sections: [
        { id: 'OBS:SKAT-RECHNEN:ZAEHLEN', kind: 'observation', title: 'Nach dem letzten Stich', summary: 'Das Spiel ist vorbei. Der Alleinspieler legt seine Stiche und den Skat zusammen und zählt laut: „Elf, einundzwanzig, fünfundzwanzig …“ Am Ende: „Sechzig!“ Die Gegner jubeln. Warum reichen sechzig nicht?', depthPoints: 4 },
        { id: 'EXPL:SKAT-RECHNEN:AUGENWERTE', kind: 'explanation', title: 'Ass 11, Zehn 10, König 4, Dame 3, Bube 2', summary: 'Nur fünf Kartenwerte zählen: Ass 11, Zehn 10, König 4, Dame 3, Bube 2; Neun, Acht und Sieben zählen nichts. Je Farbe sind das 30 Augen, bei vier Farben 120. Der Alleinspieler spielt gegen zwei und braucht mehr als die Hälfte: 61. Bei 60 : 60 hat er nicht mehr als die Gegner – verloren. Der Skat zählt für den Alleinspieler mit.', depthPoints: 8 },
        { id: 'EXPL:SKAT-RECHNEN:SCHNEIDER', kind: 'explanation', title: 'Schneider und schwarz', summary: 'Haben die Gegner höchstens 30 Augen, sind sie „Schneider“ – der Alleinspieler hat also mindestens 90. Macht eine Partei keinen einzigen Stich, ist sie „schwarz“. Beides erhöht den Spielwert. Umgekehrt kann auch der Alleinspieler Schneider werden, wenn er höchstens 30 Augen bekommt.', depthPoints: 8 },
        exercise('EXR:SKAT-RECHNEN:STICHE', 'Augen zählen', 'Der Alleinspieler hat in seinen Stichen: Kreuz-Ass, Kreuz-Zehn, Herz-König, Karo-Dame, Pik-Bube und Herz-Sieben. Im Skat liegen Karo-Zehn und Pik-König. Wie viele Augen hat er? Wie viele fehlen ihm zum Gewinn?', '11 + 10 + 4 + 3 + 2 + 0 = 30 in den Stichen, dazu 10 + 4 = 14 im Skat: 44 Augen. Zum Gewinn fehlen 61 − 44 = 17 Augen.'),
        { id: 'QUIZ:SKAT-RECHNEN:AUGEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Die Gegner haben zusammen 58 Augen. Hat der Alleinspieler gewonnen?', ['Ja, er hat 62 Augen', 'Nein, er hat nur 58', 'Ja, aber nur knapp mit 60', 'Das lässt sich nicht sagen'], 0, '120 − 58 = 62 – mehr als 60, also gewonnen. Man muss nur eine Seite zählen.'),
          q('Warum gewinnt der Alleinspieler nicht bei 60 : 60?', ['Weil der Skat nicht zählt', 'Weil er mehr als die Hälfte braucht – bei Gleichstand hat er die Gegner nicht übertroffen', 'Weil Buben doppelt zählen', 'Weil die Gegner den letzten Stich hatten'], 1, 'Die Regel verlangt mehr als die Hälfte der 120 Augen. Gleichstand reicht nicht.'),
          q('Ein Alleinspieler hat 89 Augen. Was fehlt ihm zum Schneider?', ['Nichts, ab 89 ist man Schneider', 'Ein Auge – Schneider sind die Gegner erst mit höchstens 30, er braucht also 90', 'Zehn Augen', 'Ein Stich'], 1, 'Die Gegner haben 120 − 89 = 31 Augen, einen über der Schneidergrenze.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SKAT-RECHNEN:SPIELWERT',
      title: 'Was ist ein Spiel wert?',
      entryQuestion: 'Warum ist ein Grand mehr wert als ein Karospiel – und wie rechnet man das aus?',
      takeaway: 'Spielwert = Grundwert × Stufen. Grundwerte: Karo 9, Herz 10, Pik 11, Kreuz 12, Grand 24. Stufen: Spitzen („mit“ oder „ohne“ so viele oberste Trümpfe) plus 1 für das Spiel, dazu je 1 für Hand, Schneider, Schneider angesagt, Schwarz, Schwarz angesagt, Ouvert. Null-Spiele haben feste Werte: 23, 35, 46, 59.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SKAT-RECHNEN:REIZEN' },
      sections: [
        { id: 'OBS:SKAT-RECHNEN:LISTE', kind: 'observation', title: 'Eine Zahl auf der Liste', summary: 'Auf der Skatliste steht nach einem gewonnenen Spiel „+36“, nach einem anderen „+144“. Beide Spieler haben gewonnen. Woher kommen so verschiedene Zahlen?', depthPoints: 4 },
        { id: 'EXPL:SKAT-RECHNEN:SPITZEN', kind: 'explanation', title: 'Spitzen: mit oder ohne', summary: 'Die Trümpfe haben eine feste Reihenfolge: Kreuz-Bube, Pik-Bube, Herz-Bube, Karo-Bube, dann Ass, Zehn, König, Dame, Neun, Acht, Sieben der Trumpffarbe. Hat der Alleinspieler (mit Skat) den Kreuz-Buben und den Pik-Buben, aber nicht den Herz-Buben, spielt er „mit zwei“. Fehlen ihm Kreuz- und Pik-Bube, hat er aber den Herz-Buben, spielt er „ohne zwei“. Beim Grand zählen nur die vier Buben.', depthPoints: 8 },
        { id: 'EXPL:SKAT-RECHNEN:STUFEN', kind: 'explanation', title: 'Stufen mal Grundwert', summary: 'Spitzen + 1 („Spiel“) ergibt die Grundstufen; dazu kommt je eine Stufe für Hand (ohne Skat gespielt), Schneider, Schneider angesagt, Schwarz, Schwarz angesagt und Ouvert. Die Summe mal Grundwert ist der Spielwert. Kreuz mit zwei: (2 + 1) · 12 = 36. Grand mit vier, Hand, Schneider: (4 + 1 + 1 + 1) · 24 = 168. Gewonnen zählt der Wert auf der Liste plus, verloren doppelt minus.', depthPoints: 8 },
        exercise('EXR:SKAT-RECHNEN:WERTE', 'Drei Spiele ausrechnen', 'Rechne den Spielwert aus: (a) Herz mit eins, gewonnen ohne Schneider. (b) Kreuz ohne drei, Hand gespielt. (c) Grand mit zwei, die Gegner werden Schneider.', '(a) (1 + 1) · 10 = 20. (b) (3 + 1 + 1) · 12 = 60. (c) (2 + 1 + 1) · 24 = 96.'),
        { id: 'QUIZ:SKAT-RECHNEN:SPIELWERT', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein Pikspiel „mit drei“ wird gewonnen, ohne Schneider. Was steht auf der Liste?', ['+33', '+36', '+44', '+48'], 2, '(3 + 1) · 11 = 44. Die drei Spitzen und das Spiel ergeben vier Stufen, mal Grundwert 11.'),
          q('Warum zählt „ohne drei“ genauso viel wie „mit drei“?', ['Weil ein Fehler in der Regel steht', 'Weil der Alleinspieler ohne die drei höchsten Trümpfe ebenso ein Risiko trägt – die Stufen messen die ununterbrochene Reihe, ob mit oder ohne', 'Weil Buben nicht zählen', 'Das stimmt nicht'], 1, 'Die Spitzen zählen die Länge der Reihe von oben – entweder die Trümpfe, die man hat, oder die, die einem fehlen.'),
          q('Ein Grand Hand ohne Schneider wird gewonnen, der Spieler hat alle vier Buben. Was ist das Spiel wert?', ['144', '120', '168', '96'], 0, '(4 + 1 + 1) · 24 = 144. Mit Schneider wären es 168.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SKAT-RECHNEN:REIZEN',
      title: 'Warum gibt es beim Reizen keine 19?',
      entryQuestion: 'Warum reizt man 18, 20, 22, 23, 24 – und nicht einfach 18, 19, 20?',
      takeaway: 'Gereizt wird nur mit Werten, die ein Spiel wirklich haben kann: Vielfache der Grundwerte ab zwei Stufen und die Nullwerte. Wer mehr reizt, als sein Spiel am Ende wert ist, hat sich „überreizt“ und verliert – mit dem nächsten Vielfachen des Grundwerts über dem Reizwert.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:SKAT-RECHNEN:KOMBINATORIK' },
      sections: [
        { id: 'OBS:SKAT-RECHNEN:REIZFOLGE', kind: 'observation', title: '„18?“ – „Ja.“ – „20?“', summary: 'Beim Reizen sagt die Mittelhand Zahlen, die Vorhand antwortet mit „Ja“ oder „Passe“: 18, 20, 22, 23, 24, 27, 30, 33, 35, 36, 40 … Wer zum ersten Mal zuhört, wundert sich über die Lücken.', depthPoints: 4 },
        { id: 'EXPL:SKAT-RECHNEN:REIZWERTE', kind: 'explanation', title: 'Nur mögliche Spielwerte', summary: 'Jedes Farbspiel hat mindestens zwei Stufen (mit oder ohne eins, Spiel zwei). Die kleinsten Werte sind also 2 · 9 = 18 (Karo), 2 · 10 = 20 (Herz), 2 · 11 = 22 (Pik), 2 · 12 = 24 (Kreuz); 23 ist der Null. Dann 3 · 9 = 27, 3 · 10 = 30, 3 · 11 = 33, 35 (Null Hand), 3 · 12 = 36 und so weiter. 19 oder 21 kann kein Spiel wert sein – also reizt man sie nicht.', depthPoints: 8 },
        { id: 'EXPL:SKAT-RECHNEN:UEBERREIZT', kind: 'explanation', title: 'Überreizt', summary: 'Wer reizt, verspricht ein Spiel mindestens dieses Werts. Reizt jemand bis 33 und spielt dann Pik „mit eins“ (22), hat er sich überreizt: Das Spiel ist verloren, auch mit 61 Augen. Gewertet wird das nächste Vielfache des Grundwerts, das den Reizwert erreicht – hier 3 · 11 = 33, in der einfachen Liste also −66. Oft hoffen Spieler beim Reizen auf Spitzen im Skat – das ist eine Wette.', depthPoints: 8 },
        exercise('EXR:SKAT-RECHNEN:BIS-WOHIN', 'Bis wohin reizen?', 'Du hast Kreuz-Bube und Pik-Bube, dazu fünf Pik-Karten mit Ass und Zehn. Du willst Pik spielen. Bis wohin darfst du sicher reizen? Und bis wohin, wenn du Hand spielen willst?', 'Mit zwei Spitzen: (2 + 1) · 11 = 33 – bis 33 ist sicher, denn die Spitzen hast du in der Hand und der Skat kann sie nur erhöhen. Hand: (2 + 1 + 1) · 11 = 44. Höher zu reizen ist nur sinnvoll, wenn man auf Schneider hofft.'),
        { id: 'QUIZ:SKAT-RECHNEN:REIZEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Welche Zahl kommt beim Reizen nach 30?', ['31', '32', '33', '35'], 2, '33 = 3 · 11 (Pik mit oder ohne zwei). 31 und 32 sind keine möglichen Spielwerte.'),
          q('Warum gehört die 23 in die Reizfolge, obwohl kein Farbspiel 23 wert ist?', ['Weil der Null 23 wert ist', 'Weil 23 eine Primzahl ist', 'Weil man so den Grand erreicht', 'Weil Hand 23 dazuzählt'], 0, 'Reizwerte sind alle möglichen Spielwerte, auch die festen Nullwerte 23, 35, 46 und 59.'),
          q('Jemand reizt bis 27, nimmt den Skat und spielt Herz „mit eins“. Er macht 70 Augen. Was steht auf der Liste?', ['+20, gewonnen', '−60, überreizt: das nächste Herz-Vielfache über 27 ist 30', '+27', '−54'], 1, 'Herz mit eins ist (1 + 1) · 10 = 20 wert, weniger als 27. Überreizt ist verloren, gewertet mit 30 (3 · 10), doppelt minus: −60.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:SKAT-RECHNEN:KOMBINATORIK',
      title: 'Zählen und Merken',
      entryQuestion: 'Wie viele verschiedene Blätter kann man beim Skat bekommen – und was hilft das Mitzählen?',
      takeaway: 'Es gibt 64 512 240 verschiedene Skatblätter für einen Spieler (10 aus 32) und rund 2,75 Billiarden Kartenverteilungen. Niemand kann sie alle kennen – aber jeder kann mitzählen: Im Farbspiel gibt es 11 Trümpfe, im Grand 4. Wer weiß, wie viele noch draußen sind, spielt besser.',
      sections: [
        { id: 'OBS:SKAT-RECHNEN:NIE-GLEICH', kind: 'observation', title: 'Nie dasselbe Blatt', summary: 'Ein Skatspieler, der jeden Abend 50 Spiele macht, hat nach 40 Jahren etwa 700 000 Blätter gesehen. Ist ihm je dasselbe Blatt zweimal begegnet?', depthPoints: 4 },
        { id: 'EXPL:SKAT-RECHNEN:BINOMIAL', kind: 'explanation', title: '10 aus 32', summary: 'Wie viele Möglichkeiten gibt es, 10 Karten aus 32 zu bekommen, wenn die Reihenfolge egal ist? 32 · 31 · … · 23 geteilt durch 10! – das schreibt man „32 über 10“ (Binomialkoeffizient): 64 512 240. Für die ganze Verteilung auf drei Spieler und den Skat sind es etwa 2,75 · 10¹⁵. Dass ein Spieler in seinem Leben ein Blatt zweimal bekommt, ist darum unwahrscheinlich, aber bei 700 000 Blättern nicht ausgeschlossen.', depthPoints: 8 },
        { id: 'EXPL:SKAT-RECHNEN:TRUMPF-ZAEHLEN', kind: 'explanation', title: 'Trümpfe mitzählen', summary: 'Im Farbspiel gibt es 11 Trümpfe (4 Buben und 7 Karten der Trumpffarbe), im Grand nur die 4 Buben. Der Alleinspieler kennt seine Trümpfe und den Skat. Fallen bei den Gegnern Trümpfe, zieht er sie ab. So weiß er, ob er noch einmal Trumpf ziehen muss oder ob seine Asse jetzt sicher sind. Die Figuren am noχ¹ᐃ-Tisch, die das gelernt haben, spielen so.', depthPoints: 8 },
        exercise('EXR:SKAT-RECHNEN:TRUMPF', 'Wie viele Trümpfe sind noch draußen?', 'Du spielst Herz und hast sechs Trümpfe auf der Hand, im Skat liegt kein Trumpf. In den ersten zwei Stichen hast du Trumpf ausgespielt, und die Gegner haben jedes Mal beide bedient. Wie viele Trümpfe haben die Gegner noch?', '11 Trümpfe insgesamt, 6 bei dir, 0 im Skat – also hatten die Gegner 5. In zwei Stichen haben sie 4 abgegeben. Draußen ist noch genau 1 Trumpf.'),
        { id: 'QUIZ:SKAT-RECHNEN:KOMBINATORIK', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Im Grand hast du drei Buben, und in den ersten Stichen ist kein Bube gefallen. Wo ist der vierte?', ['Sicher im Skat', 'Bei einem der Gegner oder – wenn du Hand spielst – vielleicht im Skat', 'Bei dir', 'Es gibt nur drei Buben'], 1, 'Nimmst du den Skat auf, kennst du ihn: Dann muss der Bube bei den Gegnern sein. Spielst du Hand, kann er auch im Skat liegen.'),
          q('Warum teilt man bei „10 aus 32“ durch 10!?', ['Weil zehn Karten ausgeteilt werden', 'Weil die Reihenfolge der zehn Karten auf der Hand keine Rolle spielt und jede Hand sonst 10! Mal gezählt würde', 'Weil es zehn Stiche gibt', 'Weil Zehnen doppelt zählen'], 1, 'Zieht man 10 Karten nacheinander, entsteht jede Hand in 10! verschiedenen Reihenfolgen. Für die Hand selbst zählt nur, welche Karten es sind.'),
          q('Eine Kartenspielerin sagt: „Ich merke mir nur die Trümpfe und die Asse.“ Ist das klug?', ['Nein, man muss sich alle 32 Karten merken', 'Nein, Merken bringt nichts', 'Nein, nur die Siebenen sind wichtig', 'Ja – Trümpfe und Asse entscheiden die meisten Stiche, und weniger zu merken heißt weniger Fehler'], 3, 'Gute Spieler merken sich, was den Ausgang verändert. Im Farbspiel sind das vor allem Trümpfe und die hohen Karten der Fehlfarben.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

export const SKAT_ARITHMETIC_EVIDENCE: Record<string, LearningEvidenceLevel> = {};

function withEvidence(source: LearningPath, levels: Record<string, LearningEvidenceLevel>): LearningPath {
  return {
    ...source,
    units: source.units.map(unit => ({
      ...unit,
      sections: unit.sections.map(section => (levels[section.id] ? { ...section, evidence: levels[section.id] } : section)),
    })),
  };
}

export const playingCardsHistoryLearningPath: LearningPath = withEvidence(historyPath, PLAYING_CARDS_HISTORY_EVIDENCE);
export const cardProbabilityLearningPath: LearningPath = withEvidence(probabilityPath, CARD_PROBABILITY_EVIDENCE);
export const skatArithmeticLearningPath: LearningPath = withEvidence(skatPath, SKAT_ARITHMETIC_EVIDENCE);
export const playingCardsLearningPaths: LearningPath[] = [playingCardsHistoryLearningPath, cardProbabilityLearningPath, skatArithmeticLearningPath];
