import type { LearningEvidenceLevel, LearningPath, LearningPathSection } from '../learningPaths';
import { q, quiz } from './quizAuthoring';

// Lernpfad „Alte Rezepte nachkochen“ – Teil 1 der Reihe Rezepte (Thomas, 14.11.2026:
// „Rezepte fehlen da noch, und warum manche Zutaten zusammenpassen oder auch nicht,
// ist ein sehr spannendes Feld, weil es auch die Chemie mit einbindet“).
// Historische Grundlage: noxiagame docs/world/chronomap-erde/wissen/rezepte.md
// (Yale-Tafeln YBC 4644, Cato De agri cultura 75/84). Belegstufen nach docs/SSF-BELEGSTUFEN.md.

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function practice(id: string, title: string, summary: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Praxis: ${title}`, summary, optional: true, depthPoints: 8 };
}

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 8 };
}

const path: LearningPath = {
  id: 'PATH:SSF:CHE-KUECHE-ALTE-REZEPTE-0001',
  title: 'Kann man ein Rezept nachkochen, das 3700 Jahre alt ist?',
  subtitle: 'Von babylonischen Keilschrifttafeln und Catos Opferkuchen zur Küchenchemie: was alte Rezepte verraten, was sie verschweigen – und warum manche Zutaten zusammenpassen und andere nicht.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2101',
  kxfModuleId: 'LRN:SSF:CHE-2101',
  domainsNeeded: ['KD:CHM:N1', 'KD:HIS-ARCH'],
  suppliedBy: {
    knowledgeGraph: [],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Quellentexte: Yale-Tafel YBC 4644 (um 1730 v. Chr.), Cato De agri cultura 75 und 84 (um 160 v. Chr.)',
      'Experiment: Ei und Stärke – was einen Teig zusammenhält',
      'Experiment: Milch und Säure – wann es flockt',
      'Praxis: Knoblauch-Probe, Frischkäse selbst machen, Libum backen',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:ALTE-REZEPTE:LESEN',
      title: 'Ein Rezept auf Ton',
      entryQuestion: 'Was steht in einem Rezept, das 3700 Jahre alt ist – und was fehlt?',
      takeaway: 'Alte Rezepte nennen Zutaten und Handgriffe, aber kaum Mengen, Zeiten und Temperaturen – wer sie nachkocht, muss ergänzen und sollte offen sagen, was er ergänzt hat.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ALTE-REZEPTE:LAUCH' },
      sections: [
        { id: 'OBS:REZEPTE:TAFEL', kind: 'observation', title: 'Ein Eintopf in Keilschrift', summary: 'In der Babylonischen Sammlung der Universität Yale liegen Tontafeln mit Kochanweisungen. Drei davon stammen aus der Zeit um 1730 v. Chr. Eine nennt 25 Eintöpfe und Brühen, 21 davon mit Fleisch. Einer lautet sinngemäß: „Eintopf vom Lamm. Fleisch wird verwendet. Du bereitest Wasser. Du gibst Fett hinein. Du gibst feines Salz, getrocknete Gerstenkuchen, Zwiebel, persische Schalotte und Milch dazu. Lauch und Knoblauch zerstößt du und gibst sie dazu.“', depthPoints: 4 },
        { id: 'EXPL:REZEPTE:ENTDECKUNG', kind: 'explanation', title: 'Lange für Medizin gehalten', summary: 'Die Tafeln kamen um 1911 nach Yale und wurden zunächst als medizinische Texte verzeichnet. In den 1940er-Jahren vermutete die Forscherin Mary Hussey, dass es Rezepte sind; der französische Assyriologe Jean Bottéro übersetzte sie später als solche. 2019 kochte ein Team um Gojko Barjamovic einige davon nach. Viele Eintöpfe enthalten Bier; die Zutaten – Lauch, Zwiebel, Knoblauch, Koriander, Gerste, Fett – sind bis heute die Grundlage vieler Küchen des Nahen Ostens.', depthPoints: 8 },
        { id: 'EXPL:REZEPTE:LIBUM', kind: 'explanation', title: 'Ein Kuchen bei Cato', summary: 'Der Römer Cato schrieb um 160 v. Chr. ein Handbuch für den Gutshof. Darin steht das Libum: „Zerreibe 2 Pfund Käse gründlich im Mörser. Wenn er gut zerrieben ist, gib 1 Pfund Weizenmehl dazu – oder, wenn der Kuchen feiner sein soll, ½ Pfund feines Mehl – und mische es gut mit dem Käse. Gib 1 Ei dazu und knete alles gut durch. Forme einen Laib, lege Blätter darunter und backe ihn langsam auf dem heißen Herd unter einer Tonhaube.“ Ein römisches Pfund wog rund 327 Gramm.', depthPoints: 8 },
        exercise('EXR:REZEPTE:ERGAENZEN', 'Quelle oder Ergänzung?', 'Ein Kochbuch druckt Catos Libum so: „250 g Ricotta, 120 g Mehl, 1 Ei, Lorbeerblätter, bei 190 °C 35 Minuten backen, mit Honig beträufeln.“ Welche Angaben stehen bei Cato, welche hat das Kochbuch ergänzt?', 'Bei Cato stehen: Käse, Weizenmehl, ein Ei, Blätter unter dem Laib, langsames Backen unter einer Tonhaube, das Mengenverhältnis 2 : 1 Käse zu Mehl. Ergänzt sind: Ricotta (Cato sagt nur „Käse“), Lorbeer (Cato sagt nur „Blätter“), die Grammzahlen (und das Verhältnis ist verändert: 250 : 120 ist ungefähr 2 : 1, passt also), Ofentemperatur und Zeit – und der Honig, der im Libum-Rezept bei Cato nicht vorkommt.'),
        { id: 'QUIZ:REZEPTE:LESEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Die babylonische Tafel sagt „Du gibst Fett hinein“. Was fehlt dir, um genau nachzukochen?', ['Wie viel Fett, welches Fett und wie lange gekocht wird', 'Nichts, die Angabe ist vollständig', 'Nur die Farbe des Topfes', 'Die Sprache, in der gekocht wurde'], 0, 'Alte Rezepte nennen meist Zutaten und Reihenfolge, selten Mengen, Sorten, Zeiten und Temperaturen. Das muss man beim Nachkochen begründet ergänzen.'),
          q('Warum wurden die Yale-Tafeln lange für medizinische Texte gehalten?', ['Weil Kochanweisungen und Heilmittelanweisungen ähnlich aufgebaut sind: Zutaten, Handgriffe, Zubereitung', 'Weil sie in einem Krankenhaus gefunden wurden', 'Weil Babylonier nicht kochten', 'Weil sie nur Zahlen enthalten'], 0, 'Beide Textsorten zählen Zutaten auf und beschreiben Handgriffe. Erst genaues Lesen zeigt, dass es um Speisen geht.'),
          q('Ein Kochbuch schreibt „Catos Honigkuchen“ über das Libum. Was ist daran zu prüfen?', ['Ob der Honig wirklich im Rezept steht oder später ergänzt wurde', 'Ob Cato Honig mochte', 'Ob es damals Kuchen gab', 'Nichts, Kochbücher übernehmen Quellen immer wörtlich'], 0, 'Im Libum-Rezept (Kapitel 75) steht kein Honig; er steht in Catos Savillum (Kapitel 84). Viele moderne Fassungen ergänzen ihn. Das ist erlaubt, wenn man es sagt.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ALTE-REZEPTE:LAUCH',
      title: 'Warum man Knoblauch zerstößt',
      entryQuestion: 'Warum steht in einem 3700 Jahre alten Rezept, dass man Lauch und Knoblauch zerstoßen soll?',
      takeaway: 'Knoblauch und seine Verwandten bilden ihren scharfen Geschmack erst, wenn ihre Zellen zerstört werden – zerstoßen, schneiden und warten verändert das Aroma, Hitze macht es danach milder und süßer.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ALTE-REZEPTE:BINDEN' },
      sections: [
        { id: 'OBS:REZEPTE:KNOBLAUCH', kind: 'observation', title: 'Eine ganze Zehe riecht kaum', summary: 'Eine ganze, ungeschälte Knoblauchzehe riecht fast nach nichts. Zerdrückt man sie, ist der scharfe Geruch sofort da. Eine ganze Zehe im Eintopf schmeckt mild und fast süß, zerdrückter Knoblauch kräftig. Die babylonische Köchin schrieb nicht „gib Knoblauch dazu“, sondern „zerstoße ihn“.', depthPoints: 4 },
        { id: 'EXPL:REZEPTE:ALLIIN', kind: 'explanation', title: 'Ein Stoff und sein Werkzeug, sauber getrennt', summary: 'In der Knoblauchzelle liegen ein geruchloser Ausgangsstoff (Alliin) und ein Enzym (Alliinase) in getrennten Abteilen. Erst wenn die Zelle zerdrückt wird, treffen sie aufeinander. Das Enzym baut den Ausgangsstoff in Sekunden zu Allicin um – das riecht und schmeckt scharf. Je feiner zerstoßen, desto mehr Zellen öffnen sich. Zwiebel und Lauch arbeiten ähnlich; bei der Zwiebel entsteht dabei auch der Stoff, der die Augen tränen lässt.', depthPoints: 8 },
        { id: 'EXPL:REZEPTE:HITZE-MILD', kind: 'explanation', title: 'Hitze macht milder', summary: 'Hitze zerstört das Enzym. Kommt eine ganze Zehe gleich in den heißen Topf, entsteht kaum Allicin – sie bleibt mild. Allicin selbst ist unbeständig und zerfällt beim Kochen in mildere Schwefelverbindungen. Darum schmeckt lange geschmorter Knoblauch süßlich und rund. Wann man zerstößt und wann man erhitzt, ist also eine Geschmacksentscheidung.', depthPoints: 8 },
        practice('PRX:REZEPTE:KNOBLAUCH-PROBE', 'Drei Zehen, drei Geschmäcker', 'Nimm drei Knoblauchzehen. Die erste kommt ganz in einen kleinen Topf mit siedendem Wasser. Die zweite zerdrückst du und gibst sie sofort dazu. Die dritte zerdrückst du, lässt sie zehn Minuten liegen und gibst sie dann hinein. Nach fünf Minuten kosten: Welche ist am schärfsten, welche am mildesten? Schreib auf, was du schmeckst, bevor du die Erklärung noch einmal liest.'),
        { id: 'QUIZ:REZEPTE:LAUCH', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Du willst einen Eintopf mit kräftigem Knoblauchgeschmack. Was tust du?', ['Den Knoblauch zerdrücken, kurz liegen lassen und erst spät in den Topf geben', 'Ganze Zehen von Anfang an mitkochen', 'Den Knoblauch einfrieren', 'Den Knoblauch nur auflegen und wieder entfernen'], 0, 'Zerdrücken bringt Enzym und Ausgangsstoff zusammen; das scharfe Allicin entsteht. Kurze Garzeit erhält mehr davon.'),
          q('Warum riecht eine ganze Knoblauchzehe kaum?', ['Ausgangsstoff und Enzym liegen in getrennten Teilen der Zelle und treffen erst beim Zerstören aufeinander', 'Weil die Schale den Geruch einschließt', 'Weil Knoblauch erst beim Kochen Geruch bildet', 'Weil der Stoff nur in den Wurzeln steckt'], 0, 'Der scharfe Geruch ist ein Abwehrsystem der Pflanze: Er entsteht erst, wenn ein Tier in die Zelle beißt.'),
          q('Eine Zwiebel wird lange geschmort und schmeckt danach süß. Was passt zur Erklärung dieses Lernpfads?', ['Hitze zerstört das Enzym und baut scharfe Stoffe ab, der vorhandene Zucker tritt in den Vordergrund', 'Die Zwiebel nimmt beim Schmoren Zucker aus dem Topf auf', 'Schmoren macht aus Wasser Zucker', 'Zwiebeln enthalten gar keine scharfen Stoffe'], 0, 'Zwiebeln enthalten von Natur aus Zucker. Wenn die Schärfe verschwindet, schmeckt man ihn – beim Anbraten kommen Bräunungsreaktionen hinzu.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ALTE-REZEPTE:BINDEN',
      title: 'Was einen Teig zusammenhält',
      entryQuestion: 'Warum wird Catos weicher Teig aus Käse, Mehl und einem Ei im Ofen zu einem festen Kuchen?',
      takeaway: 'Beim Erhitzen entfalten sich Eiweiße und verhaken sich zu einem Netz, und die Stärke im Mehl quillt – darum wird ein weicher Teig fest und ein Eintopf mit Gerstenkuchen oder Brotbröseln sämig.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ALTE-REZEPTE:PASST-NICHT' },
      sections: [
        { id: 'OBS:REZEPTE:BROESEL', kind: 'observation', title: 'Brösel im Topf', summary: 'Im babylonischen Lammeintopf stehen „getrocknete Gerstenkuchen“, in einem anderen Rezept derselben Tafel streut man zerstoßenen, getrockneten Sauerteig über den Topf, bevor man ihn vom Feuer nimmt. Der Eintopf wird dadurch dicker. Und bei Cato hält ein einziges Ei einen Laib aus Käse und Mehl zusammen.', depthPoints: 4 },
        { id: 'EXP:REZEPTE:EI-BINDET', kind: 'experiment', title: 'Experiment: Ei und Stärke im Teig', summary: 'Erhöhe die Temperatur im Inneren des Teigs. Das Modell zeigt, wann die Eiweiße im Eiklar und Eigelb stocken und wann die Stärke im Mehl quillt – und wie daraus ein fester Kuchen wird.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:REZEPTE:EIWEISS-NETZ', kind: 'explanation', title: 'Ein Netz aus Eiweiß', summary: 'Eiweiße sind lange Ketten, die zu Knäueln gefaltet sind. Hitze faltet sie auf; die offenen Ketten verhaken sich miteinander und halten Wasser, Fett und Mehl fest. Im Eiklar beginnt das bei etwa 62 °C, ganz fest wird es um 80 °C, Eigelb stockt bei etwa 65 bis 70 °C. Auch das Eiweiß im Käse trägt zum Netz bei.', depthPoints: 8 },
        { id: 'EXPL:REZEPTE:STAERKE', kind: 'explanation', title: 'Stärke quillt', summary: 'Mehl, Gerstenkuchen und Brot bestehen zum großen Teil aus Stärke. In warmem Wasser nehmen die Stärkekörner Wasser auf und schwellen an, je nach Getreide etwa ab 55 bis 70 °C. Sie werden dabei weich und machen die Flüssigkeit sämig. Darum bindet ein Brösel aus getrocknetem Sauerteig einen Eintopf – das Prinzip jeder Mehlschwitze.', depthPoints: 8 },
        exercise('EXR:REZEPTE:VERHAELTNIS', 'Catos Mengen umrechnen', 'Cato nimmt 2 Pfund Käse und 1 Pfund Mehl. Ein römisches Pfund wog rund 327 g. Wie viel Gramm sind das? Und wie viel Käse brauchst du, wenn du nur 150 g Mehl im Haus hast?', '2 Pfund sind etwa 2 · 327 g = 654 g Käse, 1 Pfund sind 327 g Mehl. Das Verhältnis ist 2 : 1. Bei 150 g Mehl brauchst du also 300 g Käse. Wie viel Ei? Cato nimmt ein Ei auf rund 980 g Teig; bei 450 g Teig reicht ein kleines Ei oder ein halbes.'),
        { id: 'QUIZ:REZEPTE:BINDEN', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Ein Libum ist nach dem Backen innen noch flüssig. Was ist am wahrscheinlichsten?', ['Das Innere war nicht lange genug heiß genug, damit Ei und Stärke fest werden', 'Es war zu viel Mehl im Teig', 'Der Käse war zu trocken', 'Der Ofen war zu heiß'], 0, 'Eiweiß und Stärke brauchen im Inneren ihre Temperaturbereiche. Außen ist es längst heiß, innen dauert es – darum backte Cato langsam unter einer Tonhaube.'),
          q('Warum wird ein Eintopf dick, wenn man getrocknete Brotbrösel hineinstreut und weiterköchelt?', ['Die Stärke im Brot nimmt Wasser auf, quillt und macht die Flüssigkeit sämig', 'Das Brot verdunstet das Wasser', 'Das Brot bildet Eis', 'Das Brot enthält Gelatine'], 0, 'Quellende Stärke bindet Wasser. Gerstenkuchen und Sauerteigbrösel waren die Bindemittel der babylonischen Küche.'),
          q('Du ersetzt das Ei im Libum durch Wasser. Was erwartest du?', ['Der Teig hält schlechter zusammen, weil das Eiweißnetz fehlt', 'Nichts ändert sich', 'Der Kuchen wird fester', 'Der Kuchen wird süßer'], 0, 'Käse und Mehl tragen Eiweiß und Stärke bei, aber das Ei liefert viel Eiweiß, das beim Backen zum Netz wird.'),
        ]), depthPoints: 12 },
      ],
    },
    {
      id: 'UNIT:ALTE-REZEPTE:PASST-NICHT',
      title: 'Was nicht zusammenpasst – und wann doch',
      entryQuestion: 'Warum flockt Milch aus, wenn man etwas Saures dazugibt – und warum wollen Käsemacher genau das?',
      takeaway: 'Ob Zutaten zusammenpassen, entscheidet oft die Chemie: Säure nimmt den Milcheiweißen ihre Abstoßung, und sie flocken – im Eintopf ein Fehler, beim Frischkäse das Ziel.',
      sections: [
        { id: 'OBS:REZEPTE:MILCH-BIER', kind: 'observation', title: 'Milch im Lamm, Bier in der Bete', summary: 'Auf der babylonischen Tafel steht ein Lammeintopf mit Milch und ein Eintopf mit Roter Bete, für den die heutigen Nachköche saures Bier nehmen. Wer Milch in einen sauren, heißen Topf gießt, sieht oft weiße Flocken: Die Milch „gerinnt“. Passt Milch also nicht zu Saurem?', depthPoints: 4 },
        { id: 'EXP:REZEPTE:MILCH-SAEURE', kind: 'experiment', title: 'Experiment: Milch und Säure', summary: 'Stelle Säuregrad und Temperatur ein. Das Modell zeigt, wann die Eiweißkügelchen der Milch sich nicht mehr abstoßen und zu Flocken zusammenlagern.', interactive: true, depthPoints: 8 },
        { id: 'EXPL:REZEPTE:CASEIN', kind: 'explanation', title: 'Gleiche Ladung hält Abstand', summary: 'Das wichtigste Milcheiweiß, Casein, bildet winzige Kügelchen. Bei frischer Milch (etwa pH 6,7) sind sie gleich geladen und stoßen sich ab, darum bleibt die Milch glatt. Säure nimmt ihnen die Ladung; um pH 4,6 ist sie fast verschwunden, die Kügelchen lagern sich zusammen. Wärme beschleunigt das. Darum flockt Milch im heißen, sauren Topf leichter als im kalten Glas.', depthPoints: 8 },
        { id: 'EXPL:REZEPTE:KAESE', kind: 'explanation', title: 'Aus dem Fehler wird Käse', summary: 'Genau dieses Ausflocken nutzen Käsemacher. Erhitzt man Milch und gibt Zitronensaft oder Essig dazu, trennt sie sich in festen Bruch und Molke – ein Frischkäse, wie er in vielen Küchen bis heute hergestellt wird. Welchen Käse Cato für sein Libum nahm, schreibt er nicht. Ob Zutaten „zusammenpassen“, hängt also davon ab, was man erreichen will.', depthPoints: 8 },
        exercise('EXR:REZEPTE:RETTEN', 'Den Eintopf retten', 'Du kochst den babylonischen Lammeintopf mit Milch und willst ihn mit etwas saurem Bier abrunden. Wie gehst du vor, damit die Milch nicht flockt?', 'Die Milch erst am Ende und nicht mehr kochend zugeben, das Bier vorher einkochen oder getrennt verwenden, nur wenig Säure nehmen. Stärke im Topf (die Gerstenkuchen!) hilft zusätzlich, weil sie die Eiweißteilchen umhüllt und das Zusammenlagern bremst. Oder man folgt der Tafel: Dort stehen Milch und Bier in verschiedenen Eintöpfen.'),
        practice('PRX:REZEPTE:FRISCHKAESE-LIBUM', 'Frischkäse machen und ein Libum backen', 'Erwärme 1 Liter Vollmilch langsam bis kurz vor dem Kochen. Nimm den Topf vom Herd und rühre 3 bis 4 Esslöffel Zitronensaft ein. Nach einigen Minuten trennen sich Bruch und Molke. Gieße alles durch ein Tuch und lass den Frischkäse abtropfen – du erhältst etwa 150 bis 200 g. Zerreibe ihn, wie Cato es sagt, mit halb so viel Mehl und einem kleinen Ei, forme einen Laib, lege Lorbeerblätter darunter und backe ihn langsam bei mittlerer Hitze, bis er fest und goldbraun ist. Schreib dir auf, was du gegenüber Cato ergänzen musstest.'),
        { id: 'QUIZ:REZEPTE:PASST-NICHT', kind: 'quiz', title: QUIZ_TITLE, summary: quiz([
          q('Du gibst kalten Zitronensaft in ein Glas kalte Milch, sie bleibt fast glatt. Im heißen Topf flockt sie sofort. Warum?', ['Wärme beschleunigt das Zusammenlagern der Eiweißkügelchen, wenn ihre Ladung durch Säure geschwächt ist', 'Kalte Milch enthält kein Eiweiß', 'Zitronensaft wirkt nur in der Hitze sauer', 'Die Milch verdampft im Topf'], 0, 'Säure senkt die Abstoßung, Wärme lässt die Teilchen schneller zusammenstoßen und verhaken.'),
          q('Warum bleibt frische Milch glatt, obwohl sie voller Eiweißkügelchen ist?', ['Die Kügelchen sind gleich geladen und stoßen sich ab', 'Weil sie ständig umgerührt wird', 'Weil Fett die Kügelchen auflöst', 'Weil Milch keine Teilchen enthält'], 0, 'Gleiche Ladungen halten Abstand. Erst wenn Säure die Ladung wegnimmt, können sich die Kügelchen zusammenlagern.'),
          q('Für einen Frischkäse soll Milch möglichst vollständig flocken. Welche Bedingungen wählst du?', ['Warme Milch und so viel Säure, dass der pH-Wert in die Nähe von 4,6 kommt', 'Eiskalte Milch ohne Säure', 'Warme Milch mit Natron', 'Kalte Milch mit viel Salz'], 0, 'Nahe pH 4,6 ist die Abstoßung fast weg, die Wärme beschleunigt das Ausflocken. Natron würde die Milch sogar weniger sauer machen.'),
        ]), depthPoints: 12 },
      ],
    },
  ],
};

// Belegstufen (docs/SSF-BELEGSTUFEN.md). Küchenchemie bleibt ohne Stufe.
export const HISTORICAL_RECIPES_SECTION_EVIDENCE: Record<string, LearningEvidenceLevel> = {
  'OBS:REZEPTE:TAFEL': 'quelle',
  'EXPL:REZEPTE:ENTDECKUNG': 'forschung',
  'EXPL:REZEPTE:LIBUM': 'quelle',
  'EXR:REZEPTE:ERGAENZEN': 'rekonstruktion',
  'OBS:REZEPTE:KNOBLAUCH': 'quelle',
  'PRX:REZEPTE:KNOBLAUCH-PROBE': 'rekonstruktion',
  'OBS:REZEPTE:BROESEL': 'quelle',
  'EXR:REZEPTE:VERHAELTNIS': 'rekonstruktion',
  'OBS:REZEPTE:MILCH-BIER': 'forschung',
  'EXR:REZEPTE:RETTEN': 'rekonstruktion',
  'EXPL:REZEPTE:KAESE': 'forschung',
  'PRX:REZEPTE:FRISCHKAESE-LIBUM': 'rekonstruktion',
};

function withEvidence(source: LearningPath): LearningPath {
  return {
    ...source,
    units: source.units.map(unit => ({
      ...unit,
      sections: unit.sections.map(section => {
        const evidence = HISTORICAL_RECIPES_SECTION_EVIDENCE[section.id];
        return evidence ? { ...section, evidence } : section;
      }),
    })),
  };
}

export const historicalRecipesLearningPath: LearningPath = withEvidence(path);
