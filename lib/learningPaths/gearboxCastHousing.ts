/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths/gearboxCastHousing.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths/gearboxCastHousing.ts
 * Name:      Getriebegehäuse als Gussteil (Lernpfad)
 * Version:   0.1.0
 * Created:   2026-11-05
 * Modified:  2026-11-05 17:45 CET
 * Depends:   lib/learningPaths.ts, lib/learningPaths/quizAuthoring.ts,
 *            components/learning/GearboxHousingExperiment.tsx (EXP:GEHAEUSE-SANDGUSS, EXP:GETRIEBE-MONTAGE)
 *
 * Konstruktionslehre-Pilot nach docs/ENGINEERING-LEARNING-TEMPLATE.md:
 * Anforderung → Teilung/Montierbarkeit → Lagerung → gießgerechte Gestaltung → Montage, Dichtung, Schmierung.
 * Anlass: Konstruktionsübung „Ölpumpengetriebe“ (zweistufiges Stirnradgetriebe, 3 Wellen).
 * Die Aufgabenstellung der Übung dient nur als Anwendungsfall; alle Texte sind eigenständig formuliert.
 *
 * KG-Status: Kanonische IDs (sourceModuleId, CON:*) sind beim kueper-knowledge-graph angefragt.
 * Bis zur Rückmeldung laufen sie als SSF-lokale Kandidaten; der Pfad bleibt 'prototype'.
 */

import type { LearningPath, LearningPathSection } from '../learningPaths';
import { quiz } from './quizAuthoring';

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 10 };
}

export const gearboxCastHousingLearningPath: LearningPath = {
  id: 'PATH:SSF:ENG-GETRIEBEGEHAEUSE-GUSS-0001',
  title: 'Wie konstruiert man ein Getriebegehäuse, das sich gießen und montieren lässt?',
  subtitle:
    'Vom Klotz mit Deckel zum funktionierenden Gussgehäuse: Aufgaben, Teilung, Lagerung, gießgerechte Gestaltung und Montagefolge an einem zweistufigen Stirnradgetriebe.',
  status: 'prototype',
  sourceModuleId: 'SSF-ENG-GETRIEBEGEHAEUSE-0001',
  kxfModuleId: 'LRN:SSF:ENG-GETRIEBEGEHAEUSE-GUSS-0001',
  domainsNeeded: ['KD:ENG:N1', 'KD:MTL:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'KD:ENG:N1',
      'KD:MTL:N1',
      'Kandidat CON:ENG:gearbox-housing-functions',
      'Kandidat CON:ENG:housing-split-line',
      'Kandidat CON:ENG:locating-floating-bearing',
      'Kandidat CON:ENG:bearing-fit-load-type',
      'Kandidat CON:MTL:sand-casting',
      'Kandidat CON:ENG:design-for-casting',
      'Kandidat CON:ENG:assembly-sequence',
      'Kandidat CON:ENG:splash-lubrication',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Engineering-Dramaturgie (ENGINEERING-LEARNING-TEMPLATE.md)',
      '3D-Ablauf Sandguss und Montage',
      'Transfer auf das eigene Konstruktionsprojekt',
    ],
  },
  unlocks: [],
  units: [
    // ── 1 · Anforderung ──────────────────────────────────────────────────────
    {
      id: 'UNIT:GHG:AUFGABE',
      title: 'Was ein Getriebegehäuse leisten muss',
      entryQuestion: 'Warum reicht es nicht, die Zahnräder einfach auf ein Blech zu schrauben?',
      takeaway: 'Das Gehäuse ist kein Deckel für die Zahnräder. Es ist das Bauteil, das die Wellen auf Hundertstel genau zueinander hält.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GHG:TEILUNG' },
      sections: [
        {
          id: 'OBS:GHG:AUFGABE',
          kind: 'observation',
          title: 'Drei Wellen, zwei Stufen, ein Ölbad',
          summary:
            'Ein Motor treibt über ein zweistufiges Stirnradgetriebe eine Ölpumpe an. Die Antriebswelle kommt auf einer Seite heraus, die Abtriebswelle auf beiden Seiten, dazwischen liegt eine Zwischenwelle. Sechs Lager, vier Zahnräder und mehrere Liter Öl müssen irgendwo sitzen – und das Ganze muss sich zusammenbauen lassen.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:GHG:FUNKTIONEN',
          kind: 'explanation',
          title: 'Sechs Aufgaben eines Gehäuses',
          summary:
            '1. Lager aufnehmen und die Wellen in genauem Achsabstand und parallel halten. 2. Zahn- und Lagerkräfte aufnehmen und über die Füße ins Fundament leiten – das Gehäuse schließt den Kraftfluss. 3. Öl halten und die Schmierung ermöglichen. 4. Nach außen abdichten: kein Öl hinaus, kein Schmutz hinein. 5. Die drehenden Teile schützen und abschirmen. 6. Befestigung und Anschluss an Motor und Pumpe bieten. Aufgabe 1 bestimmt fast alle Genauigkeitsanforderungen.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:GHG:STEIFIGKEIT',
          kind: 'explanation',
          title: 'Warum Steifigkeit wichtiger ist als Festigkeit',
          summary:
            'Ein Gehäuse bricht selten. Kritischer ist, dass es sich unter Last verformt. Schon wenige Hundertstel Millimeter Versatz zwischen den Lagerbohrungen lassen die Zahnräder schief kämmen: Sie tragen nur noch an einer Kante, werden laut und verschleißen. Deshalb bekommen Lagerstellen verdickte Lageraugen und Rippen.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:GHG:AUFGABE',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Die Achsabstände eines Getriebes sind auf ±0,03 mm toleriert. Welche Stellen am Gussgehäuse müssen deshalb besonders genau gefertigt werden?',
              a: ['Die Außenkontur und die Rippen', 'Die Lagerbohrungen und ihre Lage zueinander', 'Die Füße und die Befestigungslöcher', 'Die Innenwände rund um die Zahnräder'],
              correct: 1,
              why: 'Der Achsabstand wird nur über die Lagerbohrungen festgelegt. Außenkontur und Innenwände bleiben Gusshaut mit etwa einem Millimeter Toleranz – das ist unkritisch, solange nichts streift.',
            },
            {
              q: 'Wohin gelangen die Kräfte, die zwischen zwei Zahnrädern entstehen?',
              a: ['Sie heben sich im Zahneingriff vollständig auf.', 'Sie werden vom Öl aufgenommen und gedämpft.', 'Sie bleiben in der Welle und belasten nur diese.', 'Sie laufen über Welle und Lager ins Gehäuse und von dort über die Füße ins Fundament.'],
              correct: 3,
              why: 'Die Zahnkraft auf das eine Rad hat eine gleich große Gegenkraft auf das andere. Beide Wellen drücken über ihre Lager auf das Gehäuse. Das Gehäuse schließt den Kraftfluss und muss diese Kräfte steif aufnehmen.',
            },
            {
              q: 'Ein Gehäuse ist stabil genug, um nicht zu brechen, federt unter Last aber sichtbar auf. Was ist die wahrscheinlichste Folge im Betrieb?',
              a: ['Die Übersetzung des Getriebes ändert sich.', 'Die Zahnräder tragen nur noch an einer Kante und verschleißen schneller.', 'Das Öl wird dünnflüssiger.', 'Nichts – die Lager gleichen den Versatz aus.'],
              correct: 1,
              why: 'Die Übersetzung hängt nur von den Zähnezahlen ab. Verformung verschiebt aber Achsabstand und Parallelität. Dann liegt die Last nicht mehr über die ganze Zahnbreite, sondern an einer Kante: Geräusch, Grübchen, früher Ausfall.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 2 · Teilung und Montierbarkeit ───────────────────────────────────────
    {
      id: 'UNIT:GHG:TEILUNG',
      title: 'Klotz und Deckel: Wo man das Gehäuse teilt',
      entryQuestion: 'Wenn beide Gehäusehälften Lager haben – wie bekommt man die Wellen überhaupt hinein?',
      takeaway: 'Ein Gehäuse wird so geteilt, wie es montiert wird: Die Teilfuge bestimmt, in welcher Richtung alles hineingeschoben wird.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GHG:LAGERUNG' },
      sections: [
        {
          id: 'OBS:GHG:KLOTZ',
          kind: 'observation',
          title: 'Ein geschlossener Klotz lässt sich nicht montieren',
          summary:
            'Ein vollständig geschlossener Kasten mit sechs Lagerbohrungen wäre ideal steif – aber kein Zahnrad käme hinein. Das Gehäuse braucht mindestens eine Öffnung, die groß genug für das größte Rad ist.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:GHG:TEILFUGE',
          kind: 'explanation',
          title: 'Zwei Möglichkeiten der Teilung',
          summary:
            'Teilfuge quer zu den Wellen (Topf + Deckel): Ein Lager jeder Welle sitzt im Topfboden, das andere im Deckel. Man schiebt die vormontierten Wellen axial ein und setzt den Deckel darüber. Vorteil: einfacher Topf zum Gießen, nur eine Dichtfläche. Nachteil: Die Lagerbohrungen liegen in zwei Teilen und müssen exakt fluchten. – Teilfuge in der Wellenebene (Unterkasten + Oberkasten): Die Wellen werden von oben eingelegt, beide Lagerhälften liegen in der Fuge. Vorteil: sehr gut zugänglich. Nachteil: Bei drei Wellen müssen alle Achsen in einer Ebene liegen, und die Lagerbohrungen werden über die Fuge hinweg gebohrt.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:GHG:PASSSTIFTE',
          kind: 'explanation',
          title: 'Schrauben halten, Passstifte zentrieren',
          summary:
            'Deckelschrauben sitzen in Durchgangslöchern mit Spiel und können den Deckel nicht genau positionieren. Zwei Passstifte, möglichst weit auseinander und diagonal versetzt, legen die Lage des Deckels fest. Oft werden die Lagerbohrungen in Topf und Deckel im verstifteten Zustand gemeinsam gebohrt; die Stifte stellen diese Lage bei jeder Montage wieder her.',
          depthPoints: 8,
        },
        exercise(
          'EXERCISE:GHG:OEFFNUNG',
          'Passt das große Rad durch?',
          'Das große Rad der zweiten Stufe hat 21 Zähne bei Modul 3 mm. Die Öffnung des Topfs ist innen 160 mm hoch. Prüfe, ob das Rad durch die Öffnung passt. Kopfkreisdurchmesser: d_a = m·(z + 2).',
          'd_a = 3 mm · (21 + 2) = 69 mm. Das Rad passt locker durch die 160-mm-Öffnung. Entscheidend ist aber nicht nur der Durchmesser: Beim axialen Einschieben muss die ganze vormontierte Welle mit allen Rädern und Lagern durch die Öffnung, und der Abstand zu den Wänden sollte auch im eingebauten Zustand 10–15 mm betragen.',
        ),
        {
          id: 'QUIZ:GHG:TEILUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Rad hat 180 mm Kopfkreisdurchmesser, die Topföffnung ist innen 170 mm hoch. Was folgt für die Konstruktion?',
              a: ['Das Rad lässt sich schräg gekippt einführen, das reicht.', 'Das ist unkritisch, weil der Deckel die Öffnung vergrößert.', 'Die Öffnung muss größer werden oder die Teilung geändert werden, sonst lässt sich das Getriebe nicht montieren.', 'Man wählt einfach eine engere Passung für das Lager.'],
              correct: 2,
              why: 'Bei Teilung quer zu den Wellen wird jede Welle axial eingeschoben. Dafür muss alles durch die Öffnung passen. 180 mm Rad gegen 170 mm Öffnung geht nicht – und ein gekipptes Rad kommt auf der Welle nicht in Eingriff.',
            },
            {
              q: 'Wozu braucht ein Deckel zwei Passstifte, wenn er schon mit zwölf Schrauben befestigt ist?',
              a: ['Die Schrauben haben Spiel im Loch; erst die Stifte legen die Lage fest, damit die Lagerbohrungen in Topf und Deckel fluchten.', 'Die Stifte übertragen das Drehmoment des Antriebs.', 'Die Stifte dichten die Teilfuge ab.', 'Die Stifte verhindern, dass sich die Schrauben lösen.'],
              correct: 0,
              why: 'Schrauben erzeugen Anpresskraft, aber keine genaue Position. Zwei Stifte mit Passung bestimmen Lage und Verdrehung des Deckels. Ohne sie würde jede Montage die Fluchtung der Lager leicht verändern.',
            },
            {
              q: 'Ein Team will auf Passstifte verzichten und den Deckel stattdessen über einen umlaufenden Zentrierbund am Topf ausrichten. Was muss es dann sicherstellen?',
              a: ['Dass der Bund Gusshaut behält, damit er rau genug ist.', 'Dass Bund und Gegenfläche bearbeitet und eng toleriert sind und eine Verdrehung des Deckels trotzdem ausgeschlossen ist.', 'Dass der Bund aus einem anderen Werkstoff besteht.', 'Nichts weiter, ein Bund zentriert immer genauer als Stifte.'],
              correct: 1,
              why: 'Ein Zentrierbund kann die Stifte ersetzen, wenn er genau gefertigt ist. Ein runder Bund zentriert aber nur, er verhindert kein Verdrehen. Bei mehreren Wellen braucht man zusätzlich ein Merkmal gegen Verdrehung – zum Beispiel doch einen Stift.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 3 · Lagerung ─────────────────────────────────────────────────────────
    {
      id: 'UNIT:GHG:LAGERUNG',
      title: 'Festlager, Loslager und die richtige Passung',
      entryQuestion: 'Warum lässt sich der Deckel von Hand über die Lager schieben, obwohl die Welle später spielfrei laufen soll?',
      takeaway: 'Was mitdreht, sitzt fest. Was steht, darf gleiten – und genau das macht die Montage möglich.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GHG:GUSS' },
      sections: [
        {
          id: 'EXPL:GHG:FEST-LOS',
          kind: 'explanation',
          title: 'Jede Welle wird nur an einer Stelle axial festgehalten',
          summary:
            'Eine Welle wird im Betrieb wärmer als das Gehäuse und dehnt sich aus. Wären beide Lager axial geklemmt, würde die Welle verspannt und die Lager zusätzlich belastet. Deshalb gibt es pro Welle ein Festlager (Außenring zwischen Bohrungsschulter und Lagerdeckel geklemmt) und ein Loslager (Außenring kann in der Bohrung axial wandern). Beim Topf-Deckel-Gehäuse liegen die Festlager meist im steiferen Topf.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:GHG:PASSUNG',
          kind: 'explanation',
          title: 'Umfangslast und Punktlast',
          summary:
            'Der Innenring dreht mit der Welle, die Lastrichtung bleibt aber gleich. Damit läuft die Last ständig um den Ring herum (Umfangslast). Ein loser Innenring würde wandern und die Welle beschädigen – er bekommt eine feste Passung, typisch k6 oder m6. Der Außenring steht still, die Last drückt immer auf dieselbe Stelle (Punktlast). Hier genügt eine Spiel- bis Übergangspassung, typisch H7. Deshalb lässt sich die fertig vormontierte Welle von Hand einschieben, und der Deckel gleitet über die Außenringe.',
          depthPoints: 10,
        },
        exercise(
          'EXERCISE:GHG:WAERMEDEHNUNG',
          'Wie weit muss das Loslager wandern?',
          'Der Lagerabstand beträgt 140 mm. Die Stahlwelle (α = 12 · 10⁻⁶ 1/K) wird im Betrieb 30 K wärmer als das Gehäuse. Um wie viel wird die Welle zwischen den Lagern länger? Vereinfachung: Die Ausdehnung des Gehäuses wird vernachlässigt.',
          'ΔL = α · ΔT · L = 12 · 10⁻⁶ 1/K · 30 K · 140 mm ≈ 0,05 mm. Das klingt wenig, reicht aber, um zwei fest geklemmte Rillenkugellager spürbar zu verspannen. Das Loslager im Deckel nimmt diesen Weg auf, wenn hinter seinem Außenring ein kleiner Spalt bleibt.',
        ),
        {
          id: 'QUIZ:GHG:LAGERUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Eine Stahlwelle (α = 12 · 10⁻⁶ 1/K) hat 400 mm Lagerabstand und wird 40 K wärmer als das Gehäuse. Um wie viel wächst der Lagerabstand auf der Welle?',
              a: ['ca. 0,019 mm', 'ca. 0,19 mm', 'ca. 1,9 mm', 'ca. 19 mm'],
              correct: 1,
              why: 'ΔL = 12 · 10⁻⁶ · 40 · 400 mm = 0,192 mm. Fast zwei Zehntel Millimeter müssen irgendwo hin – das ist die Aufgabe des Loslagers.',
            },
            {
              q: 'Warum darf der Außenring locker (H7) im Gehäuse sitzen, der Innenring auf der Welle aber nicht?',
              a: ['Der Außenring ist größer und hält deshalb durch sein Eigengewicht.', 'Der Außenring wird vom Öl festgehalten.', 'Der Innenring ist dünner und würde sonst brechen.', 'Der Innenring dreht gegenüber der Last (Umfangslast) und würde wandern; der Außenring steht zur Last (Punktlast).'],
              correct: 3,
              why: 'Entscheidend ist, ob sich der Ring relativ zur Lastrichtung dreht. Unter Umfangslast würde ein loser Ring langsam auf seinem Sitz kriechen und ihn beschädigen. Unter Punktlast passiert das nicht, deshalb genügt dort eine lockere Passung.',
            },
            {
              q: 'Ein Team klemmt bei einer Welle beide Lager axial fest. Was passiert, wenn die Welle im Betrieb warm wird?',
              a: ['Die Welle wird zwischen den Lagern verspannt; zusätzliche Axialkräfte belasten die Lager und verkürzen ihre Lebensdauer.', 'Die Welle biegt sich elastisch durch und das gleicht alles aus.', 'Nichts, Rillenkugellager haben unbegrenztes Axialspiel.', 'Die Zahnräder rutschen axial auf der Welle.'],
              correct: 0,
              why: 'Die Längenausdehnung kann nirgends hin. Die Welle drückt beide Lager gegeneinander. Bei Wälzlagern führt das zu Erwärmung und frühem Ausfall – deshalb die Fest-Los-Lagerung.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 4 · Gießgerecht gestalten ────────────────────────────────────────────
    {
      id: 'UNIT:GHG:GUSS',
      title: 'Gießgerecht konstruieren',
      entryQuestion: 'Gerade Wände lassen sich doch nicht gießen – oder?',
      takeaway: 'Ein Gussteil wird für zwei Zustände konstruiert: für die Form, aus der es heraus muss, und für die Maschine, die nur wenige Flächen genau macht.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:GHG:MONTAGE' },
      sections: [
        {
          id: 'OBS:GHG:GERADE-WAENDE',
          kind: 'observation',
          title: 'Fast gerade ist auch gerade',
          summary:
            'Auf der Zeichnung wirken die Wände des Topfs senkrecht. Tatsächlich sind sie um 1–3° geneigt. Diese kleine Schräge ist der Grund, warum sich der Topf überhaupt aus einer Sandform lösen lässt.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:GHG:SANDGUSS',
          kind: 'explanation',
          title: 'Wie Sandguss abläuft',
          summary:
            'Ein Modell aus Holz oder Kunststoff, etwa 1 % größer als das Teil (Schwindmaß bei Grauguss), wird in einen Formkasten gestellt und mit Formsand umstampft. Dann wird das Modell in Ziehrichtung herausgezogen. In den Hohlraum fließt Gusseisen mit rund 1 350–1 450 °C. Nach dem Erstarren wird der Sand abgeschlagen, Einguss und Speiser werden abgetrennt. Beim offenen Topf bildet der Sandballen im Inneren den Hohlraum – ein eigener Kern ist nicht nötig.',
          depthPoints: 9,
        },
        {
          id: 'EXP:GHG:SANDGUSS',
          kind: 'experiment',
          title: 'Sieh dem Topf beim Entstehen zu',
          summary:
            'Verfolge im 3D-Modell Einformen, Modell ziehen, Gießen, Auspacken und die Bearbeitung von Teilfuge und Lagersitzen. Drehe das Modell und achte darauf, in welcher Richtung das Modell aus dem Sand kommt.',
          interactive: true,
          interactiveId: 'EXP:GEHAEUSE-SANDGUSS',
          depthPoints: 12,
        },
        {
          id: 'EXPL:GHG:GESTALTUNGSREGELN',
          kind: 'explanation',
          title: 'Die Gestaltungsregeln und ihr Grund',
          summary:
            'Aushebeschräge 1–3° an allen Wänden in Ziehrichtung – sonst reißt beim Ziehen Sand ab. Möglichst gleichmäßige Wandstärke (kleine Graugussgehäuse etwa 6–10 mm) – dicke Stellen erstarren zuletzt und bilden Lunker. Radien statt scharfer Kanten – Ecken reißen beim Abkühlen und wirken als Kerben. Rippen statt dicker Wände – Steifigkeit ohne Materialanhäufung, Rippendicke etwa 0,8 × Wandstärke. Bearbeitungszugabe von 2–3 mm nur an Funktionsflächen: Lagersitze, Teilfuge, Auflagen für Lagerdeckel, Schrauben und Füße. Alles andere bleibt Gusshaut.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:GHG:HINTERSCHNITT',
          kind: 'explanation',
          title: 'Hinterschneidungen erkennen',
          summary:
            'Alles, was quer zur Ziehrichtung absteht, hält das Modell in der Form fest – etwa ein seitliches Auge für die Ölablassschraube. Lösungen: das Auge am Modell als Losteil ausführen, das beim Ziehen im Sand bleibt und danach seitlich entnommen wird; die Kontur mit einem Kern abbilden; oder das Auge so verlegen, dass es in Ziehrichtung liegt.',
          depthPoints: 8,
        },
        exercise(
          'EXERCISE:GHG:HINTERSCHNITTE',
          'Finde die Hinterschneidungen in deinem Entwurf',
          'Lege die Ziehrichtung deines Topfs fest (bei Topf + Deckel: senkrecht zur Teilfuge). Gehe alle Formelemente durch – Wände, Lageraugen, Rippen, Füße, Ablass- und Entlüftungsauge – und markiere jedes, das quer zur Ziehrichtung absteht. Notiere für jedes eine Lösung.',
          'Lageraugen am Topfboden und Rippen, die in Ziehrichtung verlaufen, sind unkritisch. Füße an der Unterseite stehen quer ab, wenn die Ziehrichtung waagerecht liegt – sie werden deshalb meist in die Teilungsebene der Form gelegt oder als Losteil ausgeführt. Ablass- und Entlüftungsauge an Boden und Decke des Gehäuses sind typische Losteile. Faustregel: Alles in Ziehrichtung bekommt eine Schräge, alles quer dazu braucht eine Lösung.',
        ),
        {
          id: 'QUIZ:GHG:GUSS',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Eine Wand ist in Ziehrichtung 80 mm hoch und bekommt 2° Aushebeschräge. Um wie viel ist sie oben gegenüber unten versetzt?',
              a: ['ca. 0,28 mm', 'ca. 1,6 mm', 'ca. 2,8 mm', 'ca. 16 mm'],
              correct: 2,
              why: 'Versatz = h · tan(2°) = 80 mm · 0,035 ≈ 2,8 mm. Das sieht man auf der Zeichnung kaum, muss aber bei Innenmaßen und Abständen zu den Zahnrädern berücksichtigt werden.',
            },
            {
              q: 'Warum vermeidet man an Gussteilen Materialanhäufungen, etwa einen dicken Block an einer dünnen Wand?',
              a: ['Weil der Formsand dort weich wird.', 'Weil dicke Stellen zuletzt erstarren; das schwindende Metall kann nicht mehr nachfließen und es entstehen Lunker und Spannungen.', 'Weil dicke Stellen beim Fräsen zu hart sind.', 'Weil das Gussteil sonst zu schwer für den Kran wird.'],
              correct: 1,
              why: 'Metall schwindet beim Erstarren. Erstarrt eine dicke Stelle als letzte, ist um sie herum schon alles fest und es kommt kein flüssiges Metall mehr nach. Es bleibt ein Hohlraum – ein Lunker. Gleichmäßige Wände erstarren gleichmäßig.',
            },
            {
              q: 'Am Topf steht das Auge für die Ölablassschraube quer zur Ziehrichtung ab. Welche Lösung ist gießgerecht?',
              a: ['Die Aushebeschräge an diesem Auge auf 10° vergrößern.', 'Das Auge nach dem Gießen an den Grauguss anschweißen.', 'Den Sand an dieser Stelle fester stampfen.', 'Das Auge am Modell als Losteil ausführen oder durch einen Kern abbilden.'],
              correct: 3,
              why: 'Eine Schräge hilft nur in Ziehrichtung, nicht quer dazu. Grauguss lässt sich schlecht schweißen. Ein Losteil bleibt beim Ziehen des Modells im Sand und wird danach seitlich herausgenommen – so entsteht die Kontur ohne Hinterschneidung am Modell.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 5 · Montage, Dichtung, Schmierung ────────────────────────────────────
    {
      id: 'UNIT:GHG:MONTAGE',
      title: 'Montage, Abdichtung und Schmierung',
      entryQuestion: 'In welcher Reihenfolge kommt alles zusammen, damit am Ende kein Öl herausläuft?',
      takeaway: 'Eine Konstruktion ist erst fertig, wenn ihre Montagefolge aufgeschrieben ist und jedes Teil darin einen Platz hat.',
      sections: [
        {
          id: 'EXP:GHG:MONTAGE',
          kind: 'experiment',
          title: 'Baue das Getriebe zusammen',
          summary:
            'Verfolge im 3D-Modell, wie die drei vormontierten Wellen waagerecht in den Topf geschoben werden, der Deckel über die Loslager gleitet und das Getriebe mit Öl in Betrieb geht.',
          interactive: true,
          interactiveId: 'EXP:GETRIEBE-MONTAGE',
          depthPoints: 12,
        },
        {
          id: 'EXPL:GHG:MONTAGEFOLGE',
          kind: 'explanation',
          title: 'Die Montagefolge',
          summary:
            '1. Wellen außerhalb vormontieren: Passfedern, Zahnräder an den Wellenbund, Distanzhülsen, beide Lager, Sicherungsringe. 2. Geschlossene Lagerdeckel der Festlager am Topf anschrauben. 3. Wellenpakete nacheinander axial einschieben; jedes Ritzel gleitet dabei in sein Gegenrad. 4. Passstifte setzen, Dichtmittel auf die Teilfuge, Deckel über die Loslager schieben. 5. Über Kreuz verschrauben. 6. Restliche Lagerdeckel und Wellendichtringe montieren. 7. Ablassschraube, Öl bis zur Marke, Entlüftung.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:GHG:DICHTUNG-SCHMIERUNG',
          kind: 'explanation',
          title: 'Dichten nur, wo es nötig ist – schmieren, wo es zählt',
          summary:
            'Radialwellendichtringe nur dort, wo eine Welle das Gehäuse verlässt: in diesem Getriebe am Antrieb einmal, am Abtrieb zweimal. Die Zwischenwelle bleibt mit geschlossenen Lagerdeckeln ganz innen. Geschmiert wird per Tauchschmierung: Das große Rad taucht einige Zahnhöhen ins Öl und schleudert es an die anderen Räder und Lager. Darunter bleibt Abstand zum Boden, damit sich Abrieb absetzt. Die Ablassschraube sitzt am tiefsten Punkt, die Entlüftung oben.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:GHG:TRANSFER',
          'Transfer: Prüfe dein eigenes Gehäuse',
          'Nimm deinen Gehäuseentwurf und gehe ihn mit dieser Liste durch: Passt das größte Rad durch die Öffnung? Hat jede Welle genau ein Festlager und ein Loslager? Lässt sich jedes Teil in der Montagefolge einbauen, ohne dass etwas eingesperrt wird? Sind Passstifte, gefräste Teilfuge und Dichtung vorgesehen? Ist die Wandstärke gleichmäßig, gibt es Radien, Aushebeschrägen und Rippen? Sind nur die Funktionsflächen bearbeitet? Sitzen Ölablass unten und Entlüftung oben?',
          'Typische Funde bei ersten Entwürfen: ein großes Rad, das an einer fremden Welle streift; ein Lagerdeckel, der vor dem Einschieben der Welle montiert werden müsste, aber erst danach zugänglich ist; scharfe Innenkanten; ein bearbeitetes Maß, für das keine Bearbeitungszugabe vorgesehen ist; ein Wellendichtring, der über eine Passfedernut geschoben werden müsste.',
        ),
        {
          id: 'QUIZ:GHG:MONTAGE',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Antrieb tritt einseitig aus, Abtrieb beidseitig, die Zwischenwelle bleibt innen. Wie viele Radialwellendichtringe braucht das Getriebe?',
              a: ['Sechs – an jeder Lagerstelle einen', 'Einen – nur am Antrieb', 'Drei – einen am Antrieb, zwei am Abtrieb', 'Vier – an An- und Abtrieb jeweils beidseitig'],
              correct: 2,
              why: 'Gedichtet wird nur, wo eine drehende Welle das Gehäuse verlässt. Das sind hier drei Stellen. Alle anderen Lagerstellen bekommen geschlossene Lagerdeckel – sie sind dichter und haben keine Reibung an einer Dichtlippe.',
            },
            {
              q: 'Warum braucht ein geschlossenes Getriebe eine Entlüftung?',
              a: ['Damit beim Erwärmen kein Überdruck entsteht, der Öl an den Dichtringen vorbeidrückt.', 'Damit frische Luft das Öl kühlt.', 'Damit Kondenswasser verdunsten kann – sonst nichts.', 'Damit man den Ölstand von außen sieht.'],
              correct: 0,
              why: 'Im Betrieb wird das Getriebe warm, und die eingeschlossene Luft dehnt sich aus. Ohne Ausgleich steigt der Innendruck und drückt Öl an den Dichtlippen vorbei. Die Entlüftung sitzt oben, damit kein Öl austritt.',
            },
            {
              q: 'Warum schiebt man einen Wellendichtring nicht einfach über ein Wellenende mit Passfedernut?',
              a: ['Weil er dann zu fest sitzt.', 'Weil die Passfedernut das Öl ableitet.', 'Weil der Ring dann falsch herum eingebaut wird.', 'Weil Nutkanten die weiche Dichtlippe beschädigen – man nutzt eine Montagehülse oder setzt den Ring erst nach der Montage ein.'],
              correct: 3,
              why: 'Die Dichtlippe ist das empfindlichste Teil der Abdichtung. Schon ein feiner Schnitt durch eine scharfe Nutkante führt zu einer Leckage. Deshalb werden Dichtringe über eine glatte Montagehülse geschoben oder erst eingesetzt, wenn die Welle schon sitzt.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },
  ],
};
