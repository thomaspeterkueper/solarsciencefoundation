/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths/dynamicsFoundations.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths/dynamicsFoundations.ts
 * Name:      Grundlagen Dynamik – Bewegung, Beschleunigung, Kraft, Kreisbewegung, Schwingung (Lernpfad)
 * Version:   0.1.0
 * Created:   2026-11-08
 * Modified:  2026-11-08 09:00 CET
 * Depends:   lib/learningPaths.ts, lib/learningPaths/quizAuthoring.ts
 *
 * Mechanik-Grundmodul zur Dynamik. Schließt die Lücke aus docs/engineering-design-foundation-plan-2026-11.md
 * (Stufe C, KG): Kraft und Moment (PHY-L1-000032) behandelt Statik, hier kommt die Bewegung dazu.
 * Bewegung → Beschleunigung → Newtonsche Axiome und Trägheitskraft → Kreisbewegung und Zentripetalkraft
 * → harmonische Schwingung als Schatten der Kreisbewegung.
 *
 * Didaktischer Zielpunkt ist der Kurbeltrieb (PATH:SSF:ENG-KURBELTRIEB-0001, KG ENG-L2-000004):
 * Massenkräfte sind F = m · a am Kolben, die rotierende Massenkraft ist eine Zentripetalkraft,
 * die Massenkraft 1. Ordnung ist eine harmonische Schwingung.
 *
 * KG: kanonisch als PHY-L1-000034 (EXT-SSF-KG-20261108-dynamik-grundlagen), Domain KD:PHYS-MECH:N1,
 * sechs Konzepte CON:L1:* im Shard mechanics-foundations. Status 'prototype' bis zur didaktischen Prüfung.
 */

import type { LearningPath, LearningPathSection } from '../learningPaths';
import { quiz } from './quizAuthoring';

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 10 };
}

export const dynamicsFoundationsLearningPath: LearningPath = {
  id: 'PATH:SSF:PHY-DYNAMIK-0001',
  title: 'Warum drückt es dich in der Kurve nach außen?',
  subtitle:
    'Grundlagen der Dynamik: Geschwindigkeit, Beschleunigung, Newtonsche Axiome und Trägheitskraft, Kreisbewegung, Zentripetalkraft und harmonische Schwingung.',
  status: 'prototype',
  sourceModuleId: 'PHY-L1-000034',
  kxfModuleId: 'PHY-L1-000034',
  domainsNeeded: ['KD:PHYS-MECH:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'PHY-L1-000034',
      'KD:PHYS-MECH:N1',
      'CON:L1:kraft',
      'CON:L1:geschwindigkeit',
      'CON:L1:beschleunigung',
      'CON:L1:newtonsche-axiome',
      'CON:L1:kreisbewegung',
      'CON:L1:zentripetalkraft',
      'CON:L1:harmonische-schwingung',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: ['Dramaturgie Beobachtung → Erklärung → Aufgabe → Kurztest', 'Brückenaufgaben zum Kurbeltrieb'],
  },
  unlocks: [],
  units: [
    // ── 1 · Bewegung und Geschwindigkeit ─────────────────────────────────────
    {
      id: 'UNIT:DYN:BEWEGUNG',
      title: 'Wie schnell ist schnell? Weg, Zeit und Geschwindigkeit',
      entryQuestion: 'Ein Kolben legt im Motor pro Sekunde viele Meter zurück und steht trotzdem zweimal pro Umdrehung still. Wie schnell ist er denn nun?',
      takeaway: 'Die mittlere Geschwindigkeit sagt, wie weit man in einer Zeit kommt. Die momentane sagt, wie schnell man genau jetzt ist – und kann davon weit abweichen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DYN:BESCHLEUNIGUNG' },
      sections: [
        {
          id: 'OBS:DYN:TACHO',
          kind: 'observation',
          title: 'Tacho und Navi sind sich nicht einig',
          summary:
            'Nach einer Stadtfahrt zeigt das Navi eine Durchschnittsgeschwindigkeit von 22 km/h an. Der Tacho stand dabei oft auf 50 km/h, an Ampeln auf null. Beide Anzeigen stimmen – sie messen nur verschiedene Dinge.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:DYN:GESCHWINDIGKEIT',
          kind: 'explanation',
          title: 'Mittlere und momentane Geschwindigkeit',
          summary:
            'Die mittlere Geschwindigkeit ist zurückgelegter Weg geteilt durch die dafür gebrauchte Zeit: v_m = Δs/Δt. Die momentane Geschwindigkeit ist derselbe Quotient für ein sehr kleines Zeitintervall, mathematisch die Ableitung v = ds/dt – genau das zeigt der Tacho. Geschwindigkeit hat eine Richtung, sie ist ein Vektor. Ein Kolben, der hoch- und runterläuft, kehrt seine Geschwindigkeit in jedem Totpunkt um. SI-Einheit ist m/s; 1 m/s = 3,6 km/h.',
          depthPoints: 8,
        },
        exercise(
          'EXERCISE:DYN:KOLBEN-VM',
          'Mittlere Kolbengeschwindigkeit',
          'Ein Kolben hat 80 mm Hub, die Kurbelwelle dreht mit 3000 min⁻¹. Welchen Weg legt der Kolben pro Umdrehung zurück, und wie groß ist seine mittlere Geschwindigkeit?',
          'Pro Umdrehung läuft der Kolben einmal hin und einmal zurück: 2 · 80 mm = 0,16 m. Bei 3000 min⁻¹ = 50 s⁻¹ dauert eine Umdrehung 0,02 s. v_m = 0,16 m / 0,02 s = 8 m/s, also knapp 29 km/h. Die momentane Geschwindigkeit schwankt zwischen null in den Totpunkten und einem Höchstwert dazwischen.',
        ),
        {
          id: 'QUIZ:DYN:BEWEGUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Zug fährt mit 108 km/h. Wie viele Meter legt er pro Sekunde zurück?',
              a: ['10,8 m', '30 m', '389 m', '18 m'],
              correct: 1,
              why: '108 km/h geteilt durch 3,6 ergibt 30 m/s. Der Faktor 3,6 kommt aus 1000 m pro km und 3600 s pro Stunde.',
            },
            {
              q: 'Ein Radfahrer fährt eine Runde und kommt wieder am Start an. Wie groß ist seine mittlere Geschwindigkeit als Vektor?',
              a: ['Null, weil Start und Ziel zusammenfallen.', 'Die Rundenlänge geteilt durch die Zeit.', 'Seine Höchstgeschwindigkeit.', 'Das lässt sich ohne Tacho nicht sagen.'],
              correct: 0,
              why: 'Als Vektor zählt die Ortsänderung, und die ist nach einer vollen Runde null. Im Alltag meint man mit Durchschnittsgeschwindigkeit meist die Bahnlänge durch die Zeit – das ist die mittlere Bahngeschwindigkeit, nicht der Vektor.',
            },
            {
              q: 'Warum reicht die mittlere Kolbengeschwindigkeit nicht aus, um die Kräfte im Kurbeltrieb zu berechnen?',
              a: ['Weil sie in km/h angegeben wird.', 'Weil Kräfte von Geschwindigkeitsänderungen abhängen, und die zeigt nur der zeitliche Verlauf der momentanen Geschwindigkeit.', 'Weil der Kolben im Mittel stillsteht.', 'Weil sie vom Hubraum unabhängig ist.'],
              correct: 1,
              why: 'Eine konstante Geschwindigkeit braucht keine Kraft. Kräfte entstehen, wenn sich die Geschwindigkeit ändert – beim Kolben ständig. Dafür braucht man den Verlauf der momentanen Geschwindigkeit, also die Beschleunigung.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 2 · Beschleunigung ───────────────────────────────────────────────────
    {
      id: 'UNIT:DYN:BESCHLEUNIGUNG',
      title: 'Schneller, langsamer, umkehren: Beschleunigung',
      entryQuestion: 'Warum ist der Bremsweg bei doppelter Geschwindigkeit nicht doppelt, sondern viermal so lang?',
      takeaway: 'Beschleunigung ist Geschwindigkeitsänderung pro Zeit. Bremsen ist Beschleunigung gegen die Bewegungsrichtung.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DYN:NEWTON' },
      sections: [
        {
          id: 'OBS:DYN:SITZ',
          kind: 'observation',
          title: 'In den Sitz gedrückt',
          summary:
            'Beim Anfahren wird man in den Sitz gedrückt, beim Bremsen in den Gurt. Bei gleichmäßiger Fahrt auf der Autobahn spürt man dagegen nichts, selbst bei 130 km/h. Der Körper spürt nicht die Geschwindigkeit, sondern ihre Änderung.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:DYN:BESCHLEUNIGUNG',
          kind: 'explanation',
          title: 'Beschleunigung und gleichmäßig beschleunigte Bewegung',
          summary:
            'Beschleunigung ist die Änderung der Geschwindigkeit pro Zeit: a = Δv/Δt, momentan a = dv/dt, Einheit m/s². Sie kann die Geschwindigkeit vergrößern, verkleinern (Bremsen, negatives Vorzeichen) oder nur ihre Richtung ändern. Bei konstanter Beschleunigung aus dem Stand gilt v = a · t und s = ½ · a · t². Daraus folgt der Bremsweg aus der Geschwindigkeit v: s = v²/(2a). Weil v quadratisch eingeht, vervierfacht doppelte Geschwindigkeit den Bremsweg. Zum Vergleich: Die Erdbeschleunigung beträgt g = 9,81 m/s², ein Pkw bremst mit etwa 7–9 m/s², ein Kolben bei Nenndrehzahl erreicht mehrere tausend m/s².',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:DYN:ANFAHREN-BREMSEN',
          'Anfahren und Bremsen',
          'Ein Auto beschleunigt gleichmäßig in 10 s von 0 auf 100 km/h. Wie groß ist die Beschleunigung und welche Strecke braucht es dafür? Danach bremst es aus 50 km/h mit 7 m/s². Wie lange dauert das Bremsen und wie lang ist der Bremsweg (ohne Reaktionszeit)?',
          'a = (100/3,6 m/s)/10 s ≈ 2,78 m/s², s = ½ · 2,78 · 10² ≈ 139 m. Bremsen: v = 50/3,6 ≈ 13,9 m/s, t = v/a ≈ 1,98 s, s = v²/(2a) = 13,9²/14 ≈ 13,8 m. Aus 100 km/h wären es mit derselben Verzögerung rund 55 m – viermal so viel.',
        ),
        {
          id: 'QUIZ:DYN:BESCHLEUNIGUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Sprinter erreicht nach 2 s eine Geschwindigkeit von 8 m/s. Wie groß war seine mittlere Beschleunigung?',
              a: ['16 m/s²', '0,25 m/s²', '4 m/s²', '8 m/s²'],
              correct: 2,
              why: 'a = Δv/Δt = 8 m/s / 2 s = 4 m/s². Die Einheit m/s² heißt: pro Sekunde kommen 4 m/s Geschwindigkeit dazu.',
            },
            {
              q: 'Ein Auto fährt mit konstant 50 km/h durch einen Kreisverkehr. Ist es beschleunigt?',
              a: ['Nein, der Tacho zeigt ja immer dasselbe.', 'Nur beim Einfahren und Ausfahren.', 'Ja, weil sich die Richtung der Geschwindigkeit ständig ändert.', 'Nur wenn es bremst.'],
              correct: 2,
              why: 'Geschwindigkeit ist ein Vektor. Ändert sich ihre Richtung, ändert sich der Vektor – das ist eine Beschleunigung, auch bei gleichem Betrag. Sie zeigt zum Kreismittelpunkt; mehr dazu in der Einheit zur Kreisbewegung.',
            },
            {
              q: 'Ein Kolben läuft nach oben und kommt im OT kurz zum Stillstand. Wohin zeigt seine Beschleunigung kurz vor dem OT?',
              a: ['Nach oben, weil er nach oben läuft.', 'Nach unten, weil er abgebremst wird und gleich nach unten umkehrt.', 'Sie ist null, weil er gleich steht.', 'Waagerecht.'],
              correct: 1,
              why: 'Der Kolben wird langsamer und kehrt dann um. Beides heißt: Die Beschleunigung zeigt entgegen der Aufwärtsbewegung, also nach unten. Im OT selbst ist die Geschwindigkeit null, die Beschleunigung aber gerade am größten.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 3 · Newtonsche Axiome ────────────────────────────────────────────────
    {
      id: 'UNIT:DYN:NEWTON',
      title: 'Kraft macht Beschleunigung: die Newtonschen Axiome',
      entryQuestion: 'Warum braucht man im Weltall keinen Motor, um weiterzufliegen, aber einen sehr starken, um schneller zu werden?',
      takeaway: 'Ohne Kraft bleibt die Bewegung, wie sie ist. Mit Kraft ändert sie sich – umso weniger, je größer die Masse: F = m · a.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DYN:KREIS' },
      sections: [
        {
          id: 'OBS:DYN:TISCHDECKE',
          kind: 'observation',
          title: 'Der Tischdeckentrick',
          summary:
            'Zieht man eine glatte Tischdecke ruckartig unter Geschirr weg, bleiben Teller und Gläser fast an ihrem Platz. Zieht man langsam, rutscht alles mit. Schwere Gegenstände bleiben dabei noch zuverlässiger stehen als leichte.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:DYN:AXIOME',
          kind: 'explanation',
          title: 'Trägheit, Grundgesetz, Wechselwirkung',
          summary:
            '1. Trägheitsprinzip: Ein Körper bleibt in Ruhe oder in gleichförmiger geradliniger Bewegung, solange keine resultierende Kraft auf ihn wirkt. 2. Grundgesetz: Die resultierende Kraft ist Masse mal Beschleunigung, F = m · a; 1 N ist die Kraft, die 1 kg mit 1 m/s² beschleunigt. 3. Wechselwirkungsprinzip: Übt ein Körper eine Kraft auf einen anderen aus, wirkt eine gleich große, entgegengesetzte Kraft zurück (actio = reactio). Die Gewichtskraft ist F_G = m · g. Masse ist also zugleich Maß für die Schwere und für die Trägheit.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:DYN:TRAEGHEITSKRAFT',
          kind: 'explanation',
          title: 'Trägheitskraft: die Sicht von innen',
          summary:
            'Wer im anfahrenden Bus steht, spürt einen Zug nach hinten, obwohl niemand an ihm zieht. Von außen betrachtet beschleunigt der Bus, und der Körper will nach dem Trägheitsprinzip zurückbleiben. Im mitbeschleunigten System beschreibt man das bequem mit einer Trägheitskraft F_T = −m · a, die der Beschleunigung entgegenzeigt (Prinzip von d’Alembert). Genau so rechnet man im Motor: Die oszillierende Massenkraft des Kolbens ist die Trägheitskraft −m · a, die Pleuel und Lager aufnehmen müssen.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:DYN:AUFZUG',
          'Seilkraft im Aufzug',
          'Eine Aufzugkabine mit 800 kg fährt aufwärts an und beschleunigt dabei mit 1,5 m/s². Wie groß ist die Seilkraft beim Anfahren, bei gleichmäßiger Fahrt und beim Abbremsen mit 1,5 m/s² vor dem Halt (g = 9,81 m/s²)?',
          'Das Seil muss die Gewichtskraft tragen und zusätzlich die Beschleunigungskraft liefern. Anfahren nach oben: F = m(g + a) = 800 · 11,31 ≈ 9,05 kN. Gleichmäßige Fahrt: a = 0, F = m · g ≈ 7,85 kN. Abbremsen (Beschleunigung nach unten): F = m(g − a) = 800 · 8,31 ≈ 6,65 kN. Die Fahrgäste fühlen sich deshalb beim Anfahren schwerer und beim Bremsen leichter.',
        ),
        {
          id: 'QUIZ:DYN:NEWTON',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Kolben mit 0,5 kg wird mit 10 000 m/s² beschleunigt. Welche Kraft ist dafür nötig?',
              a: ['5 N', '20 000 N', '500 N', '5 000 N'],
              correct: 3,
              why: 'F = m · a = 0,5 kg · 10 000 m/s² = 5 000 N. Das entspricht der Gewichtskraft von rund 500 kg – erzeugt von einem Bauteil, das man mit einer Hand hält.',
            },
            {
              q: 'Ein Lkw und ein Pkw stoßen frontal zusammen. Welches Fahrzeug übt die größere Kraft auf das andere aus?',
              a: ['Der Lkw, weil er schwerer ist.', 'Der Pkw, weil er schneller abgebremst wird.', 'Beide gleich, die Kräfte sind entgegengesetzt gleich groß.', 'Das hängt von den Geschwindigkeiten ab.'],
              correct: 2,
              why: 'Nach dem Wechselwirkungsprinzip sind die Kräfte gleich groß. Der Pkw erfährt wegen seiner kleineren Masse aber die viel größere Beschleunigung, a = F/m – deshalb ist er stärker gefährdet.',
            },
            {
              q: 'Warum belastet die Trägheitskraft des Kolbens das Pleuel bei hoher Drehzahl auch dann, wenn im Zylinder kaum Gasdruck herrscht?',
              a: ['Weil das Pleuel den Kolben in jedem Totpunkt abbremsen und umkehren muss, und dafür ist nach F = m · a eine Kraft nötig.', 'Weil das Öl bei hoher Drehzahl zäher wird.', 'Weil die Gewichtskraft des Kolbens mit der Drehzahl steigt.', 'Weil der Kolben im Zylinder klemmt.'],
              correct: 0,
              why: 'Die Kraft hängt an der Beschleunigung, nicht am Gasdruck. Bei hoher Drehzahl ist die Kolbenbeschleunigung sehr groß, also auch die Kraft, die das Pleuel aufbringen muss – gut zu sehen im Ladungswechsel-OT, wo das Pleuel auf Zug belastet wird.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 4 · Kreisbewegung ────────────────────────────────────────────────────
    {
      id: 'UNIT:DYN:KREIS',
      title: 'Immer im Kreis: Winkelgeschwindigkeit und Zentripetalkraft',
      entryQuestion: 'Warum fliegt beim Schleudern das Wasser aus der Wäsche, aber die Wäsche nicht aus der Trommel?',
      takeaway: 'Wer im Kreis läuft, wird ständig zur Mitte beschleunigt. Die nötige Kraft wächst mit dem Quadrat der Drehzahl.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:DYN:SCHWINGUNG' },
      sections: [
        {
          id: 'OBS:DYN:KURVE',
          kind: 'observation',
          title: 'Nach außen gedrückt',
          summary:
            'In einer schnell gefahrenen Kurve rutscht man im Sitz nach außen, ein Becher auf dem Armaturenbrett ebenfalls. Fährt man die Kurve doppelt so schnell, ist der Effekt nicht doppelt, sondern viermal so stark – bis die Reifen nicht mehr halten.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:DYN:WINKELGESCHWINDIGKEIT',
          kind: 'explanation',
          title: 'Drehzahl, Winkelgeschwindigkeit, Bahngeschwindigkeit',
          summary:
            'Drehzahl n zählt Umdrehungen pro Zeit (in Rechnungen immer in 1/s; 3000 min⁻¹ = 50 s⁻¹). Die Winkelgeschwindigkeit ω gibt den überstrichenen Winkel im Bogenmaß pro Sekunde an: Eine Umdrehung sind 2π, also ω = 2π · n. Ein Punkt im Abstand r von der Drehachse bewegt sich mit der Bahngeschwindigkeit v = ω · r. Alle Punkte einer starren Scheibe haben dasselbe ω, außen ist v aber größer.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:DYN:ZENTRIPETAL',
          kind: 'explanation',
          title: 'Zentripetalbeschleunigung und Fliehkraft',
          summary:
            'Auch bei konstantem Tempo ändert sich auf der Kreisbahn ständig die Richtung der Geschwindigkeit. Dazu gehört eine Beschleunigung zum Mittelpunkt: a_z = v²/r = ω² · r. Nach F = m · a braucht man dafür eine nach innen gerichtete Zentripetalkraft F_z = m · ω² · r – geliefert von Reifenhaftung, Trommelwand oder Kurbelwange. Im mitdrehenden System erscheint sie als nach außen gerichtete Fliehkraft (Zentrifugalkraft), eine Trägheitskraft. Wasser verlässt die Wäsche, weil die Löcher der Trommel ihm diese Kraft nicht liefern. Wichtig für Maschinen: F ∼ ω² ∼ n². Doppelte Drehzahl heißt vierfache Kraft. Im Motor ist die rotierende Massenkraft F_r = m_r · r · ω² genau diese Zentripetalkraft.',
          depthPoints: 10,
        },
        exercise(
          'EXERCISE:DYN:SCHLEUDERN',
          'Kräfte in der Waschmaschine und in der Kurve',
          'Eine Waschtrommel mit r = 25 cm schleudert mit 1200 min⁻¹. Wie groß sind ω, die Zentripetalbeschleunigung und die Kraft auf ein nasses Wäschestück von 0,2 kg? Zum Vergleich: Ein Auto mit 1200 kg fährt mit 72 km/h durch eine Kurve mit 50 m Radius. Welche Seitenkraft müssen die Reifen aufbringen?',
          'n = 20 s⁻¹, ω = 2π · 20 ≈ 125,7 s⁻¹. a_z = ω² · r = 125,7² · 0,25 ≈ 3 950 m/s², also rund das 400-Fache von g. F = 0,2 · 3 950 ≈ 790 N. Auto: v = 20 m/s, a_z = v²/r = 400/50 = 8 m/s², F = 1200 · 8 = 9,6 kN – fast die ganze Haftung, die trockene Reifen hergeben (μ · g ≈ 9 m/s² bei μ ≈ 0,9).',
        ),
        {
          id: 'QUIZ:DYN:KREIS',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Eine Welle dreht mit 6000 min⁻¹. Wie groß ist ihre Winkelgeschwindigkeit?',
              a: ['ca. 628 s⁻¹', '100 s⁻¹', 'ca. 37 700 s⁻¹', '6000 s⁻¹'],
              correct: 0,
              why: 'n = 6000/60 = 100 s⁻¹, ω = 2π · 100 ≈ 628 s⁻¹. Wer die Drehzahl in min⁻¹ einsetzt, erhält das 60-fache, also rund 37 700 – ein typischer Fehler.',
            },
            {
              q: 'Ein Unwuchtgewicht auf einer Welle erzeugt bei 1000 min⁻¹ eine Fliehkraft von 200 N. Wie groß ist sie bei 3000 min⁻¹?',
              a: ['600 N', '1 800 N', '200 N', '400 N'],
              correct: 1,
              why: 'F = m · r · ω² wächst mit dem Quadrat der Drehzahl. Dreifache Drehzahl ergibt die neunfache Kraft: 9 · 200 N = 1 800 N. Deshalb muss man schnell drehende Teile so sorgfältig auswuchten.',
            },
            {
              q: 'Ein Hammerwerfer lässt den Hammer los. In welche Richtung fliegt er im ersten Moment?',
              a: ['Radial nach außen, weil die Fliehkraft ihn wegdrückt.', 'Tangential, also in Richtung seiner momentanen Bahngeschwindigkeit.', 'Zum Werfer hin.', 'Senkrecht nach oben.'],
              correct: 1,
              why: 'Mit dem Loslassen fehlt die Zentripetalkraft. Nach dem Trägheitsprinzip fliegt der Hammer geradeaus weiter, und zwar in die Richtung, in die er sich gerade bewegt hat: tangential. Die Fliehkraft gibt es nur im mitdrehenden System, sie stößt den Hammer nicht nach außen.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 5 · Harmonische Schwingung ───────────────────────────────────────────
    {
      id: 'UNIT:DYN:SCHWINGUNG',
      title: 'Der Schatten der Kreisbewegung: harmonische Schwingung',
      entryQuestion: 'Eine Kurbel dreht gleichmäßig, der Kolben schwingt hin und her. Wie hängen die beiden Bewegungen zusammen?',
      takeaway: 'Eine gleichförmige Kreisbewegung, von der Seite betrachtet, ist eine harmonische Schwingung. Ihre Beschleunigung ist immer zur Mitte gerichtet und am Umkehrpunkt am größten.',
      sections: [
        {
          id: 'OBS:DYN:SCHATTEN',
          kind: 'observation',
          title: 'Ein Schatten an der Wand',
          summary:
            'Lässt man einen Ball an einer Schnur gleichmäßig im Kreis laufen und beleuchtet ihn von der Seite, bewegt sich sein Schatten auf der Wand auf und ab: in der Mitte schnell, an den Enden langsam, mit kurzem Stillstand beim Umkehren. Genau so bewegt sich ein Kolben mit sehr langem Pleuel.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:DYN:HARMONISCH',
          kind: 'explanation',
          title: 'Auslenkung, Geschwindigkeit, Beschleunigung',
          summary:
            'Läuft ein Punkt mit ω auf einem Kreis mit Radius r, ist seine Projektion auf eine Achse x = r · cos(ω t). Das ist eine harmonische Schwingung mit Amplitude r, Frequenz f = n und Periodendauer T = 1/f. Ableiten ergibt v = −r ω · sin(ω t) und a = −r ω² · cos(ω t) = −ω² · x. Die Geschwindigkeit ist in der Mitte am größten (v_max = ω r) und an den Umkehrpunkten null. Die Beschleunigung zeigt immer zur Mitte und ist an den Umkehrpunkten am größten (a_max = ω² r). Die nötige Kraft F = m · a ist also proportional zur Auslenkung und wechselt einmal pro Umdrehung die Richtung.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:DYN:BRUECKE-KURBELTRIEB',
          kind: 'explanation',
          title: 'Brücke zum Kurbeltrieb',
          summary:
            'Wäre das Pleuel unendlich lang, liefe der Kolben exakt diese harmonische Schwingung: Seine Beschleunigung wäre a = r ω² cos α, die Massenkraft F = m · r ω² cos α. Im Motor heißt das Massenkraft 1. Ordnung. Weil das Pleuel endlich lang ist (λ = r/l), kommt ein zweiter, doppelt so schneller Anteil λ · cos 2α dazu, die Massenkraft 2. Ordnung. Die rotierende Massenkraft des Kurbelzapfens ist dagegen die Zentripetalkraft aus der vorigen Einheit – derselbe Betrag m · r ω², aber mit umlaufender Richtung.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:DYN:KURBELSCHATTEN',
          'Höchstgeschwindigkeit und Höchstbeschleunigung des Kolbens',
          'Eine Kurbel mit r = 40 mm dreht mit 3000 min⁻¹. Betrachte den Kolben vereinfachend als harmonisch schwingend (sehr langes Pleuel). Berechne Periodendauer, v_max und a_max und vergleiche v_max mit der mittleren Kolbengeschwindigkeit aus Einheit 1.',
          'f = 50 Hz, T = 0,02 s. ω = 2π · 50 ≈ 314,2 s⁻¹. v_max = ω r ≈ 12,6 m/s, a_max = ω² r ≈ 3 950 m/s². Die mittlere Kolbengeschwindigkeit war 8 m/s; v_max/v_m = π/2 ≈ 1,57. Für eine harmonische Schwingung gilt dieses Verhältnis immer, weil ein Hub 2r in einer halben Periode zurückgelegt wird.',
        ),
        {
          id: 'QUIZ:DYN:SCHWINGUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Eine Kurbel mit 50 mm Radius dreht mit 1500 min⁻¹. Wie groß ist die größte Beschleunigung der harmonischen Projektion?',
              a: ['ca. 7,9 m/s²', 'ca. 1 234 m/s²', 'ca. 157 m/s²', 'ca. 4 935 m/s²'],
              correct: 1,
              why: 'n = 25 s⁻¹, ω = 2π · 25 ≈ 157,1 s⁻¹, a_max = ω² · r = 157,1² · 0,05 ≈ 1 234 m/s². 7,9 m/s wäre v_max – Einheit und Größe beachten.',
            },
            {
              q: 'An welcher Stelle einer harmonischen Schwingung ist die Rückstellkraft am größten?',
              a: ['In der Mitte, wo die Geschwindigkeit am größten ist.', 'Überall gleich.', 'An den Umkehrpunkten, wo die Auslenkung am größten ist.', 'Kurz nach der Mitte.'],
              correct: 2,
              why: 'a = −ω² · x, die Beschleunigung und damit die Kraft wachsen mit der Auslenkung. An den Umkehrpunkten ist x maximal, die Geschwindigkeit null. Beim Kolben entspricht das den Totpunkten.',
            },
            {
              q: 'Warum treten im Motor neben der Massenkraft 1. Ordnung auch Massenkräfte 2. Ordnung auf?',
              a: ['Weil der Kolben wegen des endlich langen Pleuels nicht exakt harmonisch schwingt.', 'Weil die Kurbelwelle ungleichmäßig dreht.', 'Weil zwei Kolben pro Kurbelzapfen arbeiten.', 'Weil die Gaskraft zweimal pro Umdrehung wirkt.'],
              correct: 0,
              why: 'Nur bei unendlich langem Pleuel wäre die Kolbenbewegung die reine Projektion der Kurbelbewegung. Das schräg stehende Pleuel verzerrt sie, mathematisch kommt ein Anteil mit doppelter Frequenz hinzu – die 2. Ordnung, Größenordnung λ = r/l.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },
  ],
};
