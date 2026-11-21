import type { LearningEvidenceLevel, LearningPath, LearningPathSection } from '../learningPaths';
import { q, quiz } from './quizAuthoring';

// Lernpfad „Recht, Macht und Besatzung in Galiläa um 30“ – Teil 3 der Reihe Chronomaps (Thomas, 21.11.2026:
// „Mach das“; Fahrplan docs/SSF-CHRONOMAP-WISSEN.md). Grundlage: noxiagame docs/world/chronomap-erde/wissen/
// recht-gericht.md (1, 1a, 2–5), arbeit-handwerk.md 4a, geld-preise.md 8a, militaer-besatzung.md;
// IDs im Wissensgraphen (kueper-knowledge-graph, Shards history-galilaea-um-30 und history-roemischer-osten).
// Belegstufen nach docs/SSF-BELEGSTUFEN.md. Rechenaufgaben sind Rekonstruktionen, keine Messwerte.

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

const path: LearningPath = {
  id: 'PATH:SSF:HIS-RECHT-MACHT-GALILAEA-30-0001',
  title: 'Wer hatte in Galiläa um das Jahr 30 das Sagen?',
  subtitle: 'Gericht, Marktaufsicht, Zoll, Steuern und Soldaten – aus Mischna, Josephus, Inschriften und Steuerquittungen, und wie die Nachbarn im Osten des Reichs rechneten.',
  status: 'prototype',
  sourceModuleId: 'SSF-HIS-3003',
  kxfModuleId: 'LRN:SSF:HIS-3003',
  domainsNeeded: ['KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: [
      'PER:L1:herodes-antipas', 'PER:L1:pontius-pilatus', 'PER:L1:agrippa-i', 'PLC:L1:tiberias', 'PLC:L1:kafarnaum',
      'OBJ:L1:bleigewicht-agoranomos-tiberias', 'DOC:L1:pilatus-inschrift', 'OBJ:L1:pilatus-ring-herodeion',
      'OBJ:L1:fersenbein-jehohanan', 'EVT:L1:kreuzigungen-varus-4-vchr', 'EVT:L1:census-quirinius-6',
      'EVT:L1:schilde-streit-pilatus', 'EVT:L1:niederlage-antipas-aretas-36',
      'DOC:L1:zolltarif-palmyra', 'DOC:L1:zollgesetz-asia', 'DOC:L1:tarif-koptos', 'EVT:L1:zollreform-nero-58', 'PER:L1:germanicus',
      'DOC:L1:tacitus-annalen-2-42', 'OBJ:L1:ostrakon-berlin-p-1623', 'OBJ:L1:ostrakon-berlin-p-4308', 'OBJ:L1:ostrakon-berlin-p-1630',
      'OBJ:L1:ostrakon-kopfsteuer-elephantine-114', 'PLC:L1:sebaste', 'PLC:L1:caesarea', 'PLC:L1:burg-antonia',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Quellen: Mischna (Sanhedrin 1,1–6; 4,1; Makkot 1,10; Schewiit 10,3–4; Bava Kamma 10,1; Tohorot 7,6), Josephus (Altertümer 17,295.318–320; 18,1–10.109–119.147–150; 20,176.200–203), Philon (Gesandtschaft an Gaius 299–305), Tacitus (Annalen 1,17; 2,42; 13,50–51; 15,44; Historien 5,9), Cicero (Gegen Verres 2,5,158–170)',
      'Funde: Bleigewicht des Marktaufsehers aus Tiberias, Pilatus-Inschrift aus Caesarea, Ring vom Herodeion, Fersenbein des Jehohanan, Zolltarif von Palmyra, Zollgesetz von Asia, Tarif von Koptos, Steuerquittungen aus Ägypten (Berlin P 1623, P 4308, P 1630)',
      'Chronomap Jesus in noxia: Zoll von Kafarnaum, Abgaben als Kalenderereignis, Quittung auf einer Scherbe, Soldaten des Antipas',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:RECHT-30:GERICHT',
      title: 'Wer richtet?',
      entryQuestion: 'Wer entschied einen Streit im Dorf – und wer durfte ein Todesurteil fällen?',
      takeaway: 'Geldstreit entschieden drei Männer im Ort, Kapitalsachen größere Gerichte; über Leben und Tod in Judäa entschied am Ende der römische Statthalter. Die Mischna beschreibt ein Ideal der Rabbinen um 200, nicht sicher die Praxis um 30.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:RECHT-30:VERWALTUNG' },
      sections: [
        { id: 'OBS:RECHT-30:SELTEN', kind: 'observation', title: 'Einmal in siebzig Jahren', summary: 'Die Mischna (Makkot 1,10) nennt ein Gericht, das einmal in sieben Jahren hinrichtet, „verderblich“. Rabbi Eleasar ben Asarja sagt: schon einmal in siebzig Jahren. Rabbi Tarfon und Rabbi Akiba meinen, unter ihnen wäre nie ein Mensch getötet worden. Rabban Schimon ben Gamliel widerspricht: Dann hätten sie die Mörder in Israel vermehrt.', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:STUFEN', kind: 'explanation', title: 'Drei, dreiundzwanzig, einundsiebzig', summary: 'Nach der Mischna (Sanhedrin 1,1–6) richteten drei Männer über Geldsachen, 23 Richter über Kapitalsachen und 71 im großen Synedrion in Jerusalem. Für ein Urteil brauchte man zwei Zeugen; ein Freispruch durfte am selben Tag fallen, eine Verurteilung erst am nächsten, und nicht am Vorabend eines Sabbats oder Festes (Sanhedrin 4,1). Gegen diese Regel wird oft der nächtliche Prozess Jesu gelesen (Mk 14,53–65). Ob sie um 30 schon galt, ist offen.', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:BLUTGERICHT', kind: 'explanation', title: 'Durften die Juden töten?', summary: 'Im Johannesevangelium sagen die Ankläger zu Pilatus: „Wir dürfen niemand töten“ (Joh 18,31). Josephus erzählt, der Hohepriester Hannas (Ananus) habe im Jahr 62 Jakobus, den Bruder Jesu, steinigen lassen – in der Lücke zwischen zwei Statthaltern – und sei dafür abgesetzt worden (Altertümer 20,200–203). Beides zusammen spricht dafür, dass ein Todesurteil ohne den Statthalter nicht erlaubt war. In Galiläa entschied der Tetrarch: Antipas ließ Johannes den Täufer in Machärus töten (Altertümer 18,116–119; Mk 6,17–29).', depthPoints: 8 },
        exercise('EXR:RECHT-30:IDEAL', 'Ideal oder Bericht?', 'Ordne zu und begründe: (1) Die Mischna sagt, ein Gericht, das einmal in sieben Jahren tötet, sei verderblich. (2) Josephus erzählt, Ananus sei nach der Steinigung des Jakobus abgesetzt worden. (3) In Susanna überführt Daniel zwei falsche Zeugen, indem er sie getrennt verhört. (4) Mk 14 erzählt einen Prozess in der Nacht.', '(1) Ideal und Streit der Rabbinen – sie lebten, als jüdische Gerichte keine Todesurteile mehr fällten. (2) Bericht eines Geschichtsschreibers; nicht unabhängig geprüft, aber ein konkreter Vorfall mit Folgen. (3) Lehrgeschichte zum Zeugenrecht, keine Prozessakte. (4) Überlieferung der Evangelien; ob sie eine spätere Regel „verletzt“, hängt davon ab, ob die Regel um 30 galt. Wer Recht rekonstruiert, trennt Norm, Erzählung und Bericht.'),
        { id: 'QUIZ:RECHT-30:GERICHT', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Zwei Bauern streiten um eine Schuld. Wer entscheidet nach der Mischna?', ['Ein Gericht aus drei Männern im Ort', 'Das große Synedrion in Jerusalem', 'Der Kaiser in Rom', 'Der Statthalter persönlich'], 0, 'Sanhedrin 1,1: Geldsachen vor drei. Größere Gerichte waren für Kapitalsachen da.'),
          q('Warum ist der Spruch „einmal in siebzig Jahren“ kein Beleg dafür, wie oft um 30 hingerichtet wurde?', ['Er ist ein späteres Ideal und ein Streit unter Rabbinen, kein Bericht', 'Weil es keine Gerichte gab', 'Weil er von einem Römer stammt', 'Weil um 30 täglich hingerichtet wurde'], 0, 'Die Sprecher lebten nach 70. Sie diskutieren, wie ein Gericht sein sollte.'),
          q('Was spricht dafür, dass jüdische Gerichte in Judäa ohne den Statthalter niemanden hinrichten durften?', ['Ananus wurde nach der Steinigung des Jakobus abgesetzt', 'Die Mischna erlaubt keine Strafen', 'Pilatus war selbst Richter im Synedrion', 'Es gab keine Zeugen'], 0, 'Die Absetzung zeigt: Er hatte seine Befugnis überschritten. Joh 18,31 sagt dasselbe von innen.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:RECHT-30:VERWALTUNG',
      title: 'Ein Gewicht aus unserem Jahr',
      entryQuestion: 'Wer prüfte auf dem Markt von Tiberias, ob Waage und Maß stimmten?',
      takeaway: 'Ein Bleigewicht aus Tiberias nennt einen Marktaufseher im Jahr 34 des Antipas, also 30/31 n. Chr. Die neue Hauptstadt hatte ein Marktamt mit einem Amtsträger römischen Namens. Ob es der spätere König Agrippa war, ist eine Deutung.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:RECHT-30:ZOLL' },
      sections: [
        { id: 'OBS:RECHT-30:GEWICHT', kind: 'observation', title: '„Als Gaius Julius Marktaufseher war“', summary: 'Ein Bleigewicht aus Tiberias trägt die Inschrift: „Unter Herodes dem Tetrarchen, Jahr 34, als Gaius Julius Marktaufseher (agoranomos) war.“ Der Marktaufseher prüfte Maße und Gewichte. Ein solches Gewicht war das amtliche Vergleichsstück – wer betrog, wog falsch gegen das Gewicht des Amtes.', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:AGRIPPA', kind: 'explanation', title: 'Ein verschuldeter Prinz als Marktaufseher', summary: 'Josephus erzählt: Agrippa, Enkel Herodes des Großen, kam verschuldet aus Rom zurück und wollte sich in einem Turm in Idumäa das Leben nehmen. Seine Frau Kypros schrieb an seine Schwester Herodias, die Frau des Antipas. Man gab ihm Tiberias als Wohnsitz, Geld und ein städtisches Amt (Altertümer 18,147–149). Bei einem Gelage in Tyros warf Antipas ihm vor, er lebe von seinem Brot, und Agrippa ging (18,150). Die Forscherin Alla Stein erwägt, dass Gaius Julius dieser Agrippa war – die Familie trug den Namen Julius. Bewiesen ist das nicht.', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:RING', kind: 'explanation', title: 'Drei Lesungen eines Rings', summary: 'Im Herodeion fand man 1968/69 einen billigen Siegelring aus Kupferlegierung mit den Buchstaben ΠΙΛΑΤΟ. Die Erstveröffentlichung 2018 dachte an Pilatus, hielt den Ring aber kaum für seinen eigenen. Eine Arbeit von 2023 trennt die Buchstaben in zwei Wörter und sieht keinen Pilatus. 2026 las Catherine Bonesho „für Pilatus“ und vermutet den Ring eines Sklaven oder Freigelassenen, der im Dienst eines Verwalters siegelte. Sicher ist nur der Befund; der Name ist Deutung. Sicher belegt ist Pilatus durch die Inschrift aus Caesarea, die ihn praefectus von Judäa nennt.', depthPoints: 8 },
        exercise('EXR:RECHT-30:JAHR34', 'Welches Jahr ist „Jahr 34“?', 'Antipas wurde 4 v. Chr. Tetrarch; sein erstes Regierungsjahr beginnt dort. Tiberias wurde um 19/20 n. Chr. gegründet und zählte später nach eigener Ära. Welches Jahr n. Chr. ist „Jahr 34“ in beiden Rechnungen? Achtung: Es gibt kein Jahr 0. Welche Rechnung passt zu „unter Herodes dem Tetrarchen“?', 'Nach Antipas: Jahr 1 = 4/3 v. Chr. Zählt man 33 Jahre weiter und überspringt das fehlende Jahr 0, landet man bei 30/31 n. Chr. Nach der Ära der Stadt: Jahr 1 ≈ 19/20, Jahr 34 ≈ 52–54 n. Chr. Antipas war aber 39 verbannt worden; „unter Herodes dem Tetrarchen“ passt nur zur ersten Rechnung. So datierte Alla Stein das Gewicht auf 30/31, gegen die Erstveröffentlichung, die 29/30 las. Ein Fehler beim Jahr 0 verschiebt jedes Datum um ein Jahr.'),
        { id: 'QUIZ:RECHT-30:VERWALTUNG', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Was war die Aufgabe eines agoranomos?', ['Maße, Gewichte und Handel auf dem Markt zu prüfen', 'Soldaten anzuwerben', 'Im Tempel zu opfern', 'Zoll an der Grenze zu kassieren'], 0, 'Der Marktaufseher war für ehrliche Maße zuständig. Das Gewicht mit seinem Namen war das amtliche Maß.'),
          q('„Gaius Julius war Agrippa I.“ ist …', ['eine Deutung, gestützt auf Josephus und den Familiennamen, nicht bewiesen', 'ein Befund auf dem Gewicht', 'ein Zitat aus den Evangelien', 'ausgeschlossen, weil Agrippa nie in Tiberias war'], 0, 'Auf dem Gewicht steht Gaius Julius, nicht Agrippa. Die Gleichsetzung ist möglich, aber offen.'),
          q('Der Ring vom Herodeion trägt ΠΙΛΑΤΟ. Was kann man am sichersten sagen?', ['Es ist ein billiger Siegelring mit diesen Buchstaben; ob er mit Pilatus zu tun hat, ist strittig', 'Es ist der persönliche Ring des Pilatus', 'Er beweist, dass Pilatus im Herodeion wohnte', 'Er ist eine Fälschung'], 0, 'Drei Forschergruppen, drei Lesungen. Der Befund bleibt, die Deutung wechselt.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:RECHT-30:ZOLL',
      title: 'Zoll – wie die Nachbarn rechneten',
      entryQuestion: 'Was musste ein Kaufmann an Levis Zolltisch in Kafarnaum zahlen?',
      takeaway: 'Für Kafarnaum ist kein Tarif erhalten. Zollordnungen aus Palmyra, Asia und Koptos zeigen, wie ein Zoll im Osten funktionierte: Sätze je Ladung, je Tier, je Mensch – und ständiger Streit, wo der Satz nur „nach Brauch“ galt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:RECHT-30:STEUERN' },
      sections: [
        { id: 'OBS:RECHT-30:PALMYRA', kind: 'observation', title: 'Ein Tarif in Stein', summary: 'Im Jahr 137 ließ der Rat von Palmyra den Zolltarif zweisprachig auf Griechisch und Palmyrenisch in Stein setzen – die längste aramäische Steininschrift überhaupt. Anlass: Die meisten Abgaben galten nur nach Brauch, und Kaufleute stritten ständig mit den Zollpächtern. Für Schlachtvieh beruft sich der Tarif auf eine Anordnung des Germanicus, der 18/19 im Osten war – gut zehn Jahre vor unserem Jahr 30.', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:SAETZE', kind: 'explanation', title: 'Je Kamel, je Sklave, je Werkstatt', summary: 'Einige Sätze aus Palmyra: 22 Denare je eingeführtem Sklaven, 3 Denare je Kamelladung getrockneter Ware, die Eselsladung weniger, ein leeres Kamel 1 Denar, jede Werkstatt 1 Denar im Monat. In Koptos an der Straße zum Roten Meer zahlten im Jahr 90 Menschen: ein Matrose 5 Drachmen, ein Steuermann 8. In Ephesos fand man 1976 das Zollgesetz der Provinz Asia von 62 mit Regeln aus fast zwei Jahrhunderten, auch wo Zollhäuser stehen dürfen.', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:ZOELLNER', kind: 'explanation', title: 'Warum man Zöllnern misstraute', summary: 'Die Mischna verbietet, aus der Kasse eines Zöllners Geld zu wechseln oder Almosen zu nehmen, weil man annimmt, das Geld sei unrecht erworben (Bava Kamma 10,1). Der Täufer sagt den Zöllnern: „Fordert nicht mehr, als euch vorgeschrieben ist“ (Lk 3,12–13). Tacitus berichtet, Nero habe 58 befohlen, die bis dahin geheimen Gesetze der Pächter öffentlich auszuhängen (Annalen 13,50–51). Wer den Satz nicht kannte, war dem Pächter ausgeliefert. Levi in Kafarnaum war kein Römer, sondern ein Galiläer im Dienst des Antipas.', depthPoints: 8 },
        exercise('EXR:RECHT-30:KARAWANE', 'Was kostet eine Karawane?', 'Rechne mit den Sätzen aus Palmyra (ein Muster, nicht der Tarif von Kafarnaum): Eine Karawane bringt 12 Kamelladungen getrockneter Ware und 2 Sklaven in die Stadt; auf dem Rückweg ziehen 4 Kamele leer hinaus. Wie viele Denare Zoll fallen an, und wie viele Tageslöhne zu einem Denar sind das? Was ändert sich, wenn der Pächter für die leeren Kamele 2 statt 1 Denar verlangt, weil es „Brauch“ sei?', '12 · 3 = 36 Denare für die Ware, 2 · 22 = 44 Denare für die Sklaven, 4 · 1 = 4 Denare für die leeren Kamele – zusammen 84 Denare, also 84 Tageslöhne eines Arbeiters. Mit 2 Denaren je leerem Kamel sind es 88. Der Unterschied ist klein, aber er wiederholt sich bei jeder Karawane – genau darüber stritt man in Palmyra, bis die Sätze in Stein standen.'),
        { id: 'QUIZ:RECHT-30:ZOLL', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Warum ließ der Rat von Palmyra den Tarif in Stein setzen?', ['Weil viele Abgaben nur nach Brauch galten und ständig gestritten wurde', 'Weil der Kaiser Stein liebte', 'Weil es kein Papier gab', 'Weil Zoll abgeschafft wurde'], 0, 'Ein öffentlicher Satz schützt den Kaufmann vor willkürlichen Forderungen.'),
          q('Der Täufer sagt: „Fordert nicht mehr, als euch vorgeschrieben ist.“ Welche Quelle zielt auf dasselbe Problem?', ['Neros Befehl, die Gesetze der Pächter öffentlich auszuhängen', 'Der Pilatus-Stein', 'Das Fersenbein des Jehohanan', 'Die Synagoge von Magdala'], 0, 'Beide Male geht es um die Grenze zwischen festem Satz und Willkür.'),
          q('Darf man den Tarif von Palmyra als Tarif von Kafarnaum ausgeben?', ['Nein – er ist ein Muster aus der Nachbarschaft, für Kafarnaum gibt es keinen Tarif', 'Ja, alle Zölle waren gleich', 'Ja, Palmyra gehörte zu Galiläa', 'Nein, weil Palmyra keinen Zoll kannte'], 0, 'Ein Vergleich zeigt, wie es funktionieren konnte. Für das Spiel wird der Satz als erfunden gekennzeichnet.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:RECHT-30:STEUERN',
      title: 'Steuern und Abgaben',
      entryQuestion: 'Wie viel musste ein Bauer in Galiläa im Jahr abgeben – und wem?',
      takeaway: 'Antipas bekam aus Galiläa und Peräa 200 Talente im Jahr; dazu kamen Tempelsteuer, Hebe und Zehnte. Wie viel das für eine Familie hieß, lässt sich nur schätzen. Aus Ägypten zeigen Tausende Steuerquittungen, wie Zahlung und Raten im Alltag aussahen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:RECHT-30:BESATZUNG' },
      sections: [
        { id: 'OBS:RECHT-30:QUITTUNG', kind: 'observation', title: 'Eine Quittung auf einer Scherbe', summary: 'Auf einer Tonscherbe in Berlin (P 1623) ist quittiert, dass Kametis, Sohn des Petearpres, im Jahr 72 seine Kopfsteuer in Raten zahlte: zwischen dem 16. und 24. Februar und am 20. April je 8 Drachmen, am 28. April noch 4. Solche Quittungen sind aus Ägypten zu Tausenden erhalten – mit Namen, Vatername, Betrag und Datum.', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:TRIBUT', kind: 'explanation', title: '200 Talente für den Tetrarchen', summary: 'Josephus nennt die Einnahmen der Söhne des Herodes: Galiläa und Peräa zahlten Antipas 200 Talente im Jahr, Philippus erhielt 100, Archelaos 600 (Altertümer 17,318–320). Ein Talent sind 6000 Denare. Ob Antipas selbst Tribut nach Rom schickte, sagt Josephus nicht – das ist strittig. In Judäa, seit 6 römische Provinz, ging die Steuer an den Kaiser; daher die Frage nach dem Denar mit dem Bild des Kaisers (Mk 12,13–17). Tacitus berichtet, Syrien und Judäa hätten im Jahr 17, erschöpft von Lasten, um weniger Tribut gebeten (Annalen 2,42).', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:TEMPEL', kind: 'explanation', title: 'Die Abgaben an Gott', summary: 'Dazu kam die religiöse Last: der halbe Schekel Tempelsteuer jährlich für jeden Mann (Ex 30,13; Mt 17,24), die Hebe für die Priester, der Zehnte für die Leviten, der zweite Zehnte, den man in Jerusalem verzehrte, und alle drei Jahre der Armenzehnt (Dtn 14,22–29). Tobit rühmt sich, alle drei Zehnten treu gegeben zu haben – als Vorbild, nicht als Normalfall. Wie streng Galiläer um 30 den Zehnten gaben, weiß man nicht; die Mischna misstraut dem einfachen Landvolk dabei.', depthPoints: 8 },
        exercise('EXR:RECHT-30:LAST', 'Wie viele Tageslöhne fressen die Abgaben?', 'Nimm an, in Galiläa und Peräa lebten zwischen 150.000 und 300.000 Menschen (eine grobe Schätzung der Forschung). Verteile die 200 Talente gleichmäßig: Wie viele Denare sind das je Mensch und für eine Familie mit fünf Köpfen? Rechne dann den halben Schekel Tempelsteuer für zwei Männer der Familie dazu (1 Schekel = 4 Denare). Wie viele Tageslöhne zu einem Denar sind das zusammen?', '200 · 6000 = 1.200.000 Denare. Geteilt durch 300.000 sind es 4 Denare je Mensch, durch 150.000 sind es 8. Für fünf Köpfe also 20 bis 40 Denare. Zwei halbe Schekel = 1 Schekel = 4 Denare. Zusammen 24 bis 44 Denare, also 24 bis 44 Tageslöhne – ohne Zehnte, Zölle und Pachten. Die Rechnung ist eine Rekonstruktion: Ob in den 200 Talenten auch Zölle und Pachten stecken, sagt Josephus nicht, und niemand zahlte gleichmäßig.'),
        { id: 'QUIZ:RECHT-30:STEUERN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('An wen gingen die 200 Talente aus Galiläa?', ['An den Tetrarchen Herodes Antipas', 'Direkt an den Kaiser in Rom', 'An den Tempel in Jerusalem', 'An die Stadt Tiberias'], 0, 'Josephus nennt sie als Einnahme des Antipas. Ob er davon etwas nach Rom gab, ist offen.'),
          q('Warum fragt man Jesus in Jerusalem nach dem Denar des Kaisers, nicht in Galiläa nach dem des Antipas?', ['Weil Judäa römische Provinz war und Steuer an den Kaiser zahlte', 'Weil es in Galiläa kein Geld gab', 'Weil Antipas keine Steuern nahm', 'Weil der Kaiser in Jerusalem wohnte'], 0, 'Seit 6 n. Chr. stand Judäa unter einem römischen Präfekten. Galiläa blieb beim Tetrarchen.'),
          q('Was zeigen die ägyptischen Steuerquittungen für Galiläa?', ['Wie Zahlung in Raten und Quittung im Alltag aussehen konnten – als Vergleich, nicht als Beleg für Galiläa', 'Die genauen Steuersätze in Galiläa', 'Dass Galiläer in Ägypten zahlten', 'Nichts, weil sie gefälscht sind'], 0, 'Ein Nachbarbeleg füllt eine Lücke im Bild, nicht in der Quelle.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:RECHT-30:BESATZUNG',
      title: 'Soldaten im Land',
      entryQuestion: 'Standen um 30 römische Legionäre in Galiläa?',
      takeaway: 'In Galiläa standen keine Legionäre, sondern Soldaten des Antipas. In Judäa hielt der Präfekt Hilfstruppen aus Caesarea und Sebaste, die Legionen lagen in Syrien. Die Erinnerung an Census und Kreuze von 4 v. Chr. und 6 n. Chr. war um 30 noch lebendig.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:RECHT-30:NACHBARN' },
      sections: [
        { id: 'OBS:RECHT-30:SOLD', kind: 'observation', title: 'Zehn Asse für Leib und Seele', summary: 'Im Aufstand der pannonischen Legionen im Jahr 14 klagt der Soldat Percennius bei Tacitus, Leib und Seele seien mit zehn Assen am Tag bewertet; davon müssten Kleidung, Waffen und Zelte gekauft und die Centurionen bestochen werden (Annalen 1,17). Die Prätorianer in Rom bekämen zwei Denare am Tag.', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:TRUPPEN', kind: 'explanation', title: 'Wer hatte Soldaten?', summary: 'Galiläa und Peräa gehörten dem Tetrarchen Antipas mit eigenem Heer; der „Hauptmann“ von Kafarnaum (Lk 7,1–10) war wohl sein Offizier. In Judäa hatte der Präfekt in Caesarea keine Legion, sondern Hilfstruppen, die meist aus Caesarea und Sebaste stammten (Altertümer 20,176), und eine Kohorte in der Burg Antonia am Tempel. Die Legionen lagen beim Legaten von Syrien. Um 36 verlor Antipas sein ganzes Heer gegen den Nabatäerkönig Aretas; manche Juden sahen darin die Strafe für den Tod des Täufers (18,116).', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:ERINNERUNG', kind: 'explanation', title: 'Census und Kreuze', summary: 'Nach dem Tod Herodes des Großen 4 v. Chr. ließ Varus etwa zweitausend Aufständische kreuzigen (Altertümer 17,295). Im Jahr 6 schätzte Quirinius die Vermögen in Judäa; Judas aus Galiläa rief, Steuer an Rom sei Knechtschaft (18,1–10). Ein Grabstein aus dem Nachbarland nennt einen Offizier, der für Quirinius in Apamea 117.000 Bürger zählte. Das einzige archäologische Kreuzigungszeugnis ist das Fersenbein des Jehohanan mit einem 11,5 cm langen Nagel, gefunden 1968 in Jerusalem. Tacitus fasst die Zeit um 30 in einem Satz: Unter Tiberius war Ruhe (Historien 5,9).', depthPoints: 8 },
        exercise('EXR:RECHT-30:SOLD', 'Verdient ein Legionär mehr als ein Tagelöhner?', 'Zur Zeit Jesu gilt 1 Denar = 16 Asse. Percennius bekommt 10 Asse am Tag, ein Tagelöhner im Weinberggleichnis einen Denar (Mt 20,2), ein Prätorianer zwei Denare. Rechne alle drei in Asse und in Denare. Was muss man bedenken, bevor man daraus schließt, der Tagelöhner sei besser dran?', 'Legionär: 10 Asse = 10/16 = 0,625 Denar. Tagelöhner: 1 Denar = 16 Asse. Prätorianer: 2 Denare = 32 Asse. Auf dem Papier verdient der Tagelöhner 60 % mehr als der Legionär. Aber: Der Legionär wird an jedem Tag des Jahres bezahlt, der Tagelöhner nur, wenn ihn jemand anwirbt – im Gleichnis warten manche bis zur elften Stunde. Der Soldat hat Verpflegung und Aussicht auf Abfindung; Percennius klagt dagegen über Abzüge. Ein Tagessatz allein sagt wenig über ein Jahreseinkommen.'),
        { id: 'QUIZ:RECHT-30:BESATZUNG', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Wer war der „Hauptmann“ von Kafarnaum am wahrscheinlichsten?', ['Ein Offizier des Antipas', 'Ein Legat aus Rom', 'Pontius Pilatus', 'Ein Priester'], 0, 'In Galiläa standen um 30 keine römischen Legionen. Die Soldaten gehörten dem Tetrarchen.'),
          q('Warum hassten viele Juden die Hilfstruppen in Judäa besonders?', ['Sie stammten meist aus den heidnischen Nachbarstädten Caesarea und Sebaste', 'Sie kamen aus Gallien', 'Sie waren Priester', 'Sie zahlten keine Steuern'], 0, 'Nachbarn als Besatzer: Josephus erzählt, dieselben Soldaten hätten 44 den Tod Agrippas I. gefeiert.'),
          q('„Unter Tiberius war Ruhe“ (Tacitus). Wie passt das zu den Konflikten unter Pilatus?', ['Sie blieben Proteste und wurden kein Krieg – aus römischer Sicht Ruhe', 'Es gab keine Konflikte', 'Tacitus kannte Pilatus nicht', 'Pilatus regierte nach Tiberius'], 0, 'Feldzeichen, Schilde und Wasserleitung führten zu Protesten, nicht zu einem Aufstand. Was „Ruhe“ heißt, hängt vom Blick ab.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:RECHT-30:NACHBARN',
      title: 'Pilatus und das Kreuz im Blick der anderen',
      entryQuestion: 'Wie beschrieben ein jüdischer Philosoph in Alexandria und ein römischer Redner Statthalter und Kreuz?',
      takeaway: 'Philon zeichnet Pilatus als Schreckbild, weil er einem Kaiser eine Lehre erteilen will; Cicero empört sich über die Kreuzigung, aber nur, weil sie einen römischen Bürger traf. Wer solche Texte liest, fragt immer: Für wen schreibt er, und wozu?',
      sections: [
        { id: 'OBS:RECHT-30:SCHILDE', kind: 'observation', title: 'Goldene Schilde ohne Bild', summary: 'Philon erzählt, Pilatus habe im Herodespalast in Jerusalem vergoldete Schilde aufgestellt, eher um die Juden zu ärgern als um Tiberius zu ehren. Die Schilde trugen kein Bild, nur Inschriften. Die vier Söhne des Königs baten um Entfernung; Tiberius ließ die Schilde nach Caesarea bringen (Gesandtschaft an Gaius 299–305).', depthPoints: 4 },
        { id: 'EXPL:RECHT-30:PHILON', kind: 'explanation', title: 'Ein Schreckbild mit Absicht', summary: 'Philon zählt Pilatus’ Vergehen auf: Bestechlichkeit, Raub, Kränkungen, Hinrichtungen ohne Urteil. Er schreibt aber um 41 als Diaspora-Jude in Alexandria, und sein Text soll Kaiser Caligula davon abbringen, seine Statue in den Tempel zu stellen. Pilatus ist sein abschreckendes Beispiel: Selbst Tiberius habe ihn gebremst. Josephus berichtet unabhängig von Feldzeichen, Wasserleitung und einem Massaker an Samaritanern, nach dem Pilatus abberufen wurde (Altertümer 18,55–62.85–89). Beide zusammen machen ein hartes Regiment wahrscheinlich; Philons Wortwahl bleibt Anklage.', depthPoints: 8 },
        { id: 'EXPL:RECHT-30:CICERO', kind: 'explanation', title: '„Ich bin römischer Bürger“', summary: 'Im Jahr 70 v. Chr. klagt Cicero den Statthalter Verres an: In Messina ließ er Publius Gavius, einen römischen Bürger, geißeln und kreuzigen, obwohl der immer wieder seine Bürgerschaft ausrief; das Kreuz stellte Verres mit Blick auf Italien auf (Gegen Verres 2,5,158–170). Cicero nennt die Kreuzigung die grausamste und abscheulichste Strafe. Seine Empörung gilt dem Bürger, nicht der Strafe: An Sklaven und Provinzialen war sie selbstverständlich. Die Kreuzesinschrift „König der Juden“ (Mk 15,26) nennt den römischen Grund – Aufruhr.', depthPoints: 8 },
        exercise('EXR:RECHT-30:ABSICHT', 'Für wen, wozu?', 'Bestimme für jede Quelle, für wen sie schreibt und was sie erreichen will: (1) Philon über Pilatus’ Vergehen. (2) Cicero über Gavius. (3) Die Pilatus-Inschrift aus Caesarea, die einen Bau für Tiberius nennt. (4) Tacitus: „Unter Tiberius war Ruhe.“ Welche ist für die Frage „Wie hart regierte Pilatus?“ am wenigsten parteiisch – und was kann sie dazu sagen?', '(1) Für Caligula und jüdische Leser: Pilatus als Warnung, darum zugespitzt. (2) Für römische Richter: Verres verurteilen, darum die Empörung über den Bürger. (3) Für Tiberius und die Öffentlichkeit von Caesarea: Ehrung des Kaisers durch den Präfekten – Selbstdarstellung. (4) Für römische Leser um 100: Rückblick aus der Ferne, Ruhe heißt „kein Krieg“. Am wenigsten parteiisch ist die Inschrift; sie sagt aber nur, dass Pilatus praefectus war und dem Kaiser baute – über seine Härte sagt sie nichts. Unparteiisch und aussagekräftig zugleich ist keine Quelle; man braucht mehrere.'),
        { id: 'QUIZ:RECHT-30:NACHBARN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Warum muss man Philons Bild von Pilatus vorsichtig lesen?', ['Er will Caligula mit Pilatus als Schreckbild warnen und spitzt darum zu', 'Er hat Pilatus nie gekannt und erfindet alles', 'Er war Römer und lobt Pilatus', 'Er schreibt 500 Jahre später'], 0, 'Die Absicht des Textes formt die Darstellung. Josephus bestätigt Konflikte, aber nicht jede Anklage.'),
          q('Wogegen empört sich Cicero im Fall Gavius?', ['Dass ein römischer Bürger gekreuzigt wurde', 'Gegen die Kreuzigung überhaupt', 'Gegen die Steuern in Sizilien', 'Gegen die Juden'], 0, 'Für Sklaven und Provinziale hielt er die Strafe für normal. Das Recht hing vom Status ab.'),
          q('Was sagt die Inschrift „König der Juden“ am Kreuz aus römischer Sicht?', ['Den Grund der Strafe: Anspruch auf Herrschaft, also Aufruhr', 'Dass Jesus als König geehrt wurde', 'Dass Pilatus Jude war', 'Dass Kreuzigung eine jüdische Strafe war'], 0, 'Kreuzigung war Strafe für Sklaven, Räuber und Aufrührer. Die Tafel nannte das Vergehen.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

// Belegstufen (docs/SSF-BELEGSTUFEN.md). Rechen- und Zuordnungsaufgaben sind Rekonstruktionen.
export const GALILEE_LAW_SECTION_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'OBS:RECHT-30:SELTEN': 'quelle',
  'EXPL:RECHT-30:STUFEN': 'quelle',
  'EXPL:RECHT-30:BLUTGERICHT': 'quelle',
  'EXR:RECHT-30:IDEAL': 'rekonstruktion',
  'OBS:RECHT-30:GEWICHT': 'quelle',
  'EXPL:RECHT-30:AGRIPPA': 'forschung',
  'EXPL:RECHT-30:RING': 'forschung',
  'EXR:RECHT-30:JAHR34': 'rekonstruktion',
  'OBS:RECHT-30:PALMYRA': 'quelle',
  'EXPL:RECHT-30:SAETZE': 'quelle',
  'EXPL:RECHT-30:ZOELLNER': 'quelle',
  'EXR:RECHT-30:KARAWANE': 'rekonstruktion',
  'OBS:RECHT-30:QUITTUNG': 'quelle',
  'EXPL:RECHT-30:TRIBUT': 'quelle',
  'EXPL:RECHT-30:TEMPEL': 'quelle',
  'EXR:RECHT-30:LAST': 'rekonstruktion',
  'OBS:RECHT-30:SOLD': 'quelle',
  'EXPL:RECHT-30:TRUPPEN': 'quelle',
  'EXPL:RECHT-30:ERINNERUNG': 'quelle',
  'EXR:RECHT-30:SOLD': 'rekonstruktion',
  'OBS:RECHT-30:SCHILDE': 'quelle',
  'EXPL:RECHT-30:PHILON': 'forschung',
  'EXPL:RECHT-30:CICERO': 'quelle',
  'EXR:RECHT-30:ABSICHT': 'rekonstruktion',
};

function withEvidence(source: LearningPath): LearningPath {
  return {
    ...source,
    units: source.units.map(unit => ({
      ...unit,
      sections: unit.sections.map(section => {
        const evidence = GALILEE_LAW_SECTION_EVIDENCE[section.id];
        return evidence ? { ...section, evidence } : section;
      }),
    })),
  };
}

export const galileeLawPowerLearningPath: LearningPath = withEvidence(path);
