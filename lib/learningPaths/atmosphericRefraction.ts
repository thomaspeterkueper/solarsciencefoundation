/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths/atmosphericRefraction.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths/atmosphericRefraction.ts
 * Name:      Lichtbrechung am Horizont – atmosphärische Refraktion (Lernpfad)
 * Version:   0.1.0
 * Created:   2026-11-28
 * Modified:  2026-11-28 07:30 CET
 * Depends:   lib/learningPaths.ts, lib/learningPaths/quizAuthoring.ts
 *
 * Consumer-Integration nach EXT-KG-SSF-20261023-REFRACTION. Kanonische KG-Identitäten
 * (KXF `exports/kxf-learning-modules-0.1.json`, Autorenquelle `learning/ssf-phy-atmosphaerische-refraktion.yaml`):
 * - LearningModule PHY-L1-000030 (Voraussetzung PHY-L1-000003, Domain KD:PHYS:N1)
 * - Concept CON:L1:atmosphaerische-refraktion
 * - Model MOD:L2:bennett-atmosphaerische-refraktion
 * - Simulator-Consumer NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1 (NOXIA besitzt die Simulatorphysik;
 *   SSF besitzt Lerninhalt, Fallback ohne Simulator und Quiz-Gates)
 *
 * Ersetzt die Entwürfe aus PR #60 (`SSF-PHY-HORIZON-REFRACTION-0001`) und PR #61 (`PHY-L1-000004`).
 * PHY-L1-000004 ist im KG das Wasser-Phasenmodul und darf hier nicht verwendet werden.
 *
 * Fachliche Leitplanken: Die Bennett-Näherung liefert einen Modellwert, keine Messung. Inversionen,
 * Luftspiegelungen und Horizonte unter etwa 0° liegen außerhalb ihrer Gültigkeit.
 * Status 'prototype' bis zur didaktischen Prüfung.
 */

import type { LearningPath, LearningPathSection } from '../learningPaths';
import { quiz } from './quizAuthoring';

export const ATMOSPHERIC_REFRACTION_PATH_ID = 'PATH:SSF:PHY-ATMOSPHAERISCHE-REFRAKTION-0001';
export const ATMOSPHERIC_REFRACTION_SIMULATOR_ID = 'NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1';

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 10 };
}

export const atmosphericRefractionLearningPath: LearningPath = {
  id: ATMOSPHERIC_REFRACTION_PATH_ID,
  title: 'Warum steht die Sonne am Horizont höher, als sie wirklich steht?',
  subtitle:
    'Lichtbrechung am Horizont: geometrische und scheinbare Position trennen, die Bennett-Näherung anwenden, ihre Grenzen erkennen und das Prinzip auf andere Welten übertragen.',
  status: 'prototype',
  sourceModuleId: 'PHY-L1-000030',
  kxfModuleId: 'PHY-L1-000030',
  domainsNeeded: ['KD:PHYS:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'PHY-L1-000030',
      'PHY-L1-000003',
      'KD:PHYS:N1',
      'CON:L1:atmosphaerische-refraktion',
      'MOD:L2:bennett-atmosphaerische-refraktion',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Dramaturgie Beobachtung → Erklärung → Aufgabe → Kurztest',
      'Fallback ohne Simulator für NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1',
      'Ursprung: Issue #57 (Harvest-Moon-Referenzreise), Entwürfe PR #60 und #61',
    ],
  },
  unlocks: [],
  units: [
    // ── 1 · Zwei Positionen eines Gestirns ──────────────────────────────────
    {
      id: 'UNIT:REFRAKTION:ZWEI-POSITIONEN',
      title: 'Wo ist die Sonne wirklich?',
      entryQuestion: 'Wenn du die untergehende Sonne gerade noch auf dem Horizont siehst – ist sie dann schon untergegangen?',
      takeaway:
        'Jedes Gestirn hat zwei Positionen: die geometrische, die aus der Bahn folgt, und die scheinbare, die das Licht nach dem Weg durch die Luft zeigt – am Horizont liegen beide etwa eine Sonnenbreite auseinander.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:REFRAKTION:DICHTE' },
      sections: [
        {
          id: 'OBS:REFRAKTION:SONNENUNTERGANG',
          kind: 'observation',
          title: 'Die Sonne berührt den Horizont',
          summary:
            'Du stehst am Meer und siehst die Sonne als Scheibe, die gerade das Wasser berührt. Ein Kalender nennt für diesen Ort eine Untergangszeit, die einige Minuten früher liegt als der Moment, in dem die Scheibe für dich verschwindet. Die Uhr geht richtig, der Kalender auch.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:REFRAKTION:GEOMETRIE-OPTIK',
          kind: 'explanation',
          title: 'Bahn bestimmt den Ort, Luft bestimmt den Anblick',
          summary:
            'Die geometrische Position eines Gestirns folgt aus seiner Bahn und deinem Standort. Das Licht, das bei dir ankommt, ist aber durch die Atmosphäre gelaufen und dabei leicht zur dichteren Luft hin abgelenkt worden. Weil du die Richtung siehst, aus der das Licht zuletzt kommt, erscheint das Gestirn höher. Diese Differenz heißt atmosphärische Refraktion. Sie verändert nicht die Bahn, nur den Lichtweg.',
          depthPoints: 8,
        },
        exercise(
          'EXP:REFRAKTION:UNTER-DEM-HORIZONT',
          'Schon untergegangen?',
          'Am Horizont beträgt die Refraktion unter Standardbedingungen etwa 34 Bogenminuten, der Sonnendurchmesser etwa 32 Bogenminuten. Du siehst die Mitte der Sonnenscheibe genau auf dem Horizont. Wo stehen Mitte und Oberrand geometrisch?',
          'Die Mitte steht geometrisch etwa 34′ unter dem Horizont. Der Oberrand liegt 16′ darüber, also bei etwa −18′. Die ganze Sonne ist geometrisch schon untergegangen, obwohl du sie noch vollständig siehst (vereinfachend mit einem einheitlichen Refraktionswert gerechnet).',
        ),
        {
          id: 'QUIZ:REFRAKTION:ZWEI-POSITIONEN',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Die Refraktion am Horizont beträgt etwa 34′. Du siehst ein Gestirn genau auf dem Horizont (0°). Wo steht es geometrisch?',
              a: ['Bei +34′, also über dem Horizont', 'Bei etwa −34′, also unter dem Horizont', 'Genau bei 0°', 'Das lässt sich ohne Bahndaten nicht sagen'],
              correct: 1,
              why: 'Die Luft hebt das Bild an. Geometrisch liegt das Gestirn um den Refraktionsbetrag tiefer als es erscheint: 0° − 34′ ≈ −34′.',
            },
            {
              q: 'Warum ändert die Refraktion die Bahn des Mondes nicht?',
              a: [
                'Weil der Mond zu schwer ist',
                'Weil die Refraktion nur nachts wirkt',
                'Weil sie nur den Lichtweg durch die Erdatmosphäre verändert, nicht die Kräfte auf den Mond',
                'Weil sich Refraktion und Schwerkraft gegenseitig aufheben',
              ],
              correct: 2,
              why: 'Refraktion ist ein optischer Effekt beim Beobachter. Die Bahn wird von der Schwerkraft bestimmt; die Atmosphäre der Erde wirkt nicht auf sie.',
            },
            {
              q: 'Ein Kalender nennt Sonnenuntergang 17:02 Uhr. Gerechnet wurde mit Refraktion. Was passiert, wenn man sie weglässt?',
              a: [
                'Die berechnete Uhrzeit würde etwas früher liegen als der beobachtete Untergang',
                'Die berechnete Uhrzeit würde etwas später liegen',
                'Nichts, Refraktion wirkt nur auf den Mond',
                'Die Sonne ginge dann im Norden unter',
              ],
              correct: 0,
              why: 'Ohne Refraktion verschwände die Sonne schon, wenn ihr geometrischer Oberrand den Horizont erreicht. Mit Refraktion bleibt sie einige Minuten länger sichtbar – der Kalender berücksichtigt das.',
            },
          ]),
          depthPoints: 12,
        },
      ],
    },

    // ── 2 · Warum Luft Licht ablenkt ────────────────────────────────────────
    {
      id: 'UNIT:REFRAKTION:DICHTE',
      title: 'Warum ist der Effekt am Horizont so groß?',
      entryQuestion: 'Warum ist die Verschiebung direkt über dem Horizont groß und hoch am Himmel fast null?',
      takeaway:
        'Refraktion wächst mit dem Weg durch dichte Luft: senkrecht über dir ist sie praktisch null, am Horizont am größten – und weil sie dort so schnell zunimmt, wird die Sonne beim Untergang platt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:REFRAKTION:BENNETT' },
      sections: [
        {
          id: 'OBS:REFRAKTION:PLATTE-SONNE',
          kind: 'observation',
          title: 'Die ovale Sonne',
          summary:
            'Kurz vor dem Untergang wirkt die Sonne nicht mehr rund, sondern oben und unten zusammengedrückt, manchmal mit gezackten Rändern. Hoch am Himmel sieht sie nie so aus.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:REFRAKTION:SCHICHTEN',
          kind: 'explanation',
          title: 'Luft als geschichtetes Medium',
          summary:
            'Die Luft wird nach oben dünner, ihre Brechzahl nimmt ab. Ein Lichtstrahl, der schräg durch diese Schichten läuft, wird bei jedem Übergang ein wenig zur dichteren Luft hin gekrümmt. Fällt das Licht senkrecht ein, gibt es keine Ablenkung. Je flacher der Strahl, desto länger sein Weg durch dichte Luft und desto stärker die Krümmung. Am Horizont ändert sich die Refraktion zudem stark mit der Höhe: Der Unterrand der Sonne wird mehr angehoben als der Oberrand.',
          depthPoints: 8,
        },
        exercise(
          'EXP:REFRAKTION:ABPLATTUNG',
          'Wie platt wird die Sonne?',
          'Der Unterrand der Sonne erscheint genau auf dem Horizont (Refraktion ≈ 34,5′). Für den Oberrand, der etwa 27′ hoch erscheint, beträgt die Refraktion nur noch ≈ 29,3′. Der geometrische Durchmesser ist 32′. Wie groß erscheint der senkrechte Durchmesser?',
          'Geometrisch liegt der Unterrand bei 0 − 34,5′ = −34,5′, der Oberrand 32′ höher bei −2,5′. Scheinbar liegt der Oberrand bei −2,5′ + 29,3′ ≈ 26,8′. Der senkrechte Durchmesser erscheint also mit rund 27′ statt 32′ – etwa ein Sechstel kleiner. Der waagerechte Durchmesser bleibt nahezu 32′, daher das Oval.',
        ),
        {
          id: 'QUIZ:REFRAKTION:DICHTE',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Wie groß ist die atmosphärische Refraktion für einen Stern genau im Zenit (90°)?',
              a: ['Etwa 34′', 'Etwa 1′', 'Praktisch null', 'So groß wie am Horizont, nur in anderer Richtung'],
              correct: 2,
              why: 'Senkrecht einfallendes Licht trifft alle Luftschichten senkrecht und wird nicht abgelenkt.',
            },
            {
              q: 'Warum erscheint die untergehende Sonne abgeplattet?',
              a: [
                'Weil die Sonne sich beim Untergang tatsächlich verformt',
                'Weil der Unterrand stärker angehoben wird als der Oberrand',
                'Weil die Erdkrümmung die Sonne verdeckt',
                'Weil das Auge waagerechte Linien bevorzugt',
              ],
              correct: 1,
              why: 'Die Refraktion nimmt nahe dem Horizont schnell mit der Höhe ab. Der tiefere Unterrand wird stärker gehoben, die Scheibe wird senkrecht gestaucht.',
            },
            {
              q: 'Der Vollmond wirkt am Horizont riesig. Was sagt die Refraktion dazu?',
              a: [
                'Sie vergrößert den Mond am Horizont deutlich',
                'Sie erklärt die Größe vollständig',
                'Sie verschiebt den Mond nur waagerecht',
                'Sie staucht ihn senkrecht eher – die „Mondtäuschung“ ist eine Wahrnehmungsfrage, keine Optik der Luft',
              ],
              correct: 3,
              why: 'Gemessen ist der Horizontmond nicht größer. Die Refraktion staucht ihn senkrecht sogar leicht. Dass er groß wirkt, entsteht in der Wahrnehmung.',
            },
          ]),
          depthPoints: 12,
        },
      ],
    },

    // ── 3 · Ein Modell mit Zahlen ───────────────────────────────────────────
    {
      id: 'UNIT:REFRAKTION:BENNETT',
      title: 'Wie viel hebt die Luft das Bild an?',
      entryQuestion: 'Kann man vorhersagen, wie weit ein Stern in 10° Höhe verschoben erscheint?',
      takeaway:
        'Die Bennett-Näherung sagt die Refraktion aus der scheinbaren Höhe auf Bruchteile einer Bogenminute voraus – aber sie liefert einen Modellwert für eine Standardatmosphäre, keine Messung.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:REFRAKTION:BEDINGUNGEN' },
      sections: [
        {
          id: 'OBS:REFRAKTION:STERNWARTE',
          kind: 'observation',
          title: 'Teleskope korrigieren mit',
          summary:
            'Wer mit einem Teleskop einen Stern tief über dem Horizont einstellt, findet ihn nicht ganz an der berechneten Stelle, sondern etwas höher. Steuerprogramme für Teleskope rechnen deshalb eine Korrektur ein, die zum Horizont hin stark wächst.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:REFRAKTION:BENNETT',
          kind: 'explanation',
          title: 'Die Bennett-Näherung',
          summary:
            'Eine bewährte Faustformel stammt von G. G. Bennett (1982): R ≈ 1 / tan(h + 7,31 / (h + 4,4)). Dabei ist h die scheinbare Höhe in Grad, R die Refraktion in Bogenminuten. Sie gilt für eine Standardatmosphäre (1010 hPa, 10 °C) und trifft dort auf etwa 0,1′ genau. Wichtig: Das Ergebnis ist eine Vorhersage aus einem Modell der mittleren Atmosphäre. Was die Luft an einem bestimmten Abend tatsächlich tut, zeigt erst die Beobachtung.',
          depthPoints: 10,
        },
        exercise(
          'EXP:REFRAKTION:BENNETT-RECHNEN',
          'Bennett anwenden',
          'Berechne mit der Bennett-Näherung die Refraktion für einen Stern in 10° und in 45° scheinbarer Höhe.',
          'h = 10°: 7,31 / 14,4 ≈ 0,508; tan(10,508°) ≈ 0,185; R ≈ 1 / 0,185 ≈ 5,4′. h = 45°: 7,31 / 49,4 ≈ 0,148; tan(45,148°) ≈ 1,005; R ≈ 1,0′. Zum Vergleich am Horizont (h = 0°): R ≈ 34,5′.',
        ),
        {
          id: 'SIM:REFRAKTION:NOXIA-DEMONSTRATOR',
          kind: 'experiment',
          title: 'Experiment: erst vorhersagen, dann verschieben',
          summary:
            'Im NOXIA-Refraktionsdemonstrator: Formuliere vor jedem Lauf eine Vorhersage, in welche Richtung sich die scheinbare Höhe ändern sollte. Verändere dann genau einen Parameter (Höhe, Druck oder Temperatur) und vergleiche Richtung und Größenordnung mit deiner Erwartung. Die Anzeige des Demonstrators ist ein Modellergebnis, keine Messung. Ohne Simulator: Lege eine Tabelle für 0°, 2°, 5°, 10°, 20° und 45° an, rechne R mit der Bennett-Näherung und skizziere den Verlauf. Prüfe, wo die Kurve am steilsten ist und warum.',
          depthPoints: 12,
        },
        {
          id: 'QUIZ:REFRAKTION:BENNETT',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Bennett liefert für h = 5° etwa 9,9′. Ein Stern erscheint in 5° Höhe. Wie hoch steht er geometrisch?',
              a: ['Etwa 5,17°', 'Etwa 4,83°', 'Genau 5°', 'Etwa 4,0°'],
              correct: 1,
              why: '9,9′ ≈ 0,165°. Geometrisch liegt der Stern um diesen Betrag tiefer: 5° − 0,165° ≈ 4,83°.',
            },
            {
              q: 'Was ist das Ergebnis der Bennett-Formel erkenntnistheoretisch?',
              a: [
                'Ein Messwert der Atmosphäre an diesem Abend',
                'Ein exakter Wert, der immer gilt',
                'Ein Modellwert für eine Standardatmosphäre',
                'Eine Schätzung ohne jede Grundlage',
              ],
              correct: 2,
              why: 'Die Formel ist an Standardbedingungen angepasst. Sie sagt voraus, was im Mittel zu erwarten ist; die tatsächliche Refraktion muss beobachtet werden.',
            },
            {
              q: 'Ein Navigator misst die Höhe der Sonne mit dem Sextanten zu 30°. Was muss er tun, bevor er rechnet?',
              a: [
                'Nichts, bei 30° gibt es keine Refraktion',
                'Etwa 1,7′ Refraktion abziehen, um die geometrische Höhe zu erhalten',
                'Etwa 34′ abziehen',
                'Etwa 1,7′ addieren',
              ],
              correct: 1,
              why: 'Bennett ergibt bei 30° rund 1,7′. Die gemessene Höhe ist scheinbar, also zu hoch; die Refraktion wird abgezogen.',
            },
          ]),
          depthPoints: 12,
        },
      ],
    },

    // ── 4 · Wetter und Gültigkeitsgrenzen ───────────────────────────────────
    {
      id: 'UNIT:REFRAKTION:BEDINGUNGEN',
      title: 'Wann stimmt das Modell nicht mehr?',
      entryQuestion: 'Warum geht die Sonne an einem eisigen Wintertag später unter, als die Rechnung sagt – und manchmal ganz anders?',
      takeaway:
        'Kalte, dichte Luft bricht stärker als warme; bei Inversionen und Luftspiegelungen versagt jede Standardformel – dann zählt die Beobachtung, nicht das Modell.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:REFRAKTION:ANDERE-WELTEN' },
      sections: [
        {
          id: 'OBS:REFRAKTION:LUFTSPIEGELUNG',
          kind: 'observation',
          title: 'Schiffe über dem Horizont',
          summary:
            'Über kaltem Wasser oder Eis sieht man an manchen Tagen Schiffe oder Küsten, die eigentlich hinter dem Horizont liegen, manchmal sogar doppelt oder auf dem Kopf. Über heißem Asphalt dagegen scheint eine Wasserfläche zu liegen, die nicht da ist.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:REFRAKTION:GRENZEN',
          kind: 'explanation',
          title: 'Druck, Temperatur und Schichtung',
          summary:
            'Die Refraktion hängt von der Luftdichte ab. Höherer Druck und tiefere Temperatur machen die Luft dichter und die Refraktion größer. Für normale Abweichungen genügt ein Faktor: R ≈ R_Bennett · (p / 1010 hPa) · (283 K / (273 + T)), T in °C. Liegt aber kalte Luft unter warmer (Inversion) oder sehr heiße Luft am Boden, ändert sich die Brechzahl nicht mehr gleichmäßig mit der Höhe. Dann entstehen Luftspiegelungen, und die Refraktion am Horizont kann um mehrere Bogenminuten oder mehr vom Modell abweichen. Solche Fälle liegen außerhalb der Gültigkeit der Bennett-Näherung.',
          depthPoints: 10,
        },
        exercise(
          'EXP:REFRAKTION:WINTER-SOMMER',
          'Wintertag gegen Sommerabend',
          'Berechne die Horizontrefraktion (Bennett: 34,5′) für (a) −20 °C bei 1030 hPa und (b) 35 °C bei 1000 hPa mit dem Korrekturfaktor.',
          '(a) Faktor (1030 / 1010) · (283 / 253) ≈ 1,02 · 1,12 ≈ 1,14 → R ≈ 39′. (b) Faktor (1000 / 1010) · (283 / 308) ≈ 0,99 · 0,92 ≈ 0,91 → R ≈ 31′. Der Unterschied von rund 8′ entspricht einem Viertel des Sonnendurchmessers – vorausgesetzt, die Luft ist gleichmäßig geschichtet.',
        ),
        {
          id: 'QUIZ:REFRAKTION:BEDINGUNGEN',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Bei 0 °C und 1010 hPa: Ist die Horizontrefraktion größer oder kleiner als 34,5′?',
              a: [
                'Kleiner, weil Kälte die Luft dünner macht',
                'Genau gleich, die Temperatur spielt keine Rolle',
                'Größer, etwa 35,7′ – kältere Luft ist dichter',
                'Größer, etwa 69′ – doppelt so viel',
              ],
              correct: 2,
              why: 'Faktor 283 / 273 ≈ 1,037; 34,5′ · 1,037 ≈ 35,7′. Kältere Luft ist bei gleichem Druck dichter und bricht stärker.',
            },
            {
              q: 'Warum darf man die Bennett-Formel bei einer starken Inversion nicht einfach verwenden?',
              a: [
                'Weil sie nur nachts gilt',
                'Weil sie eine gleichmäßige Abnahme der Dichte mit der Höhe voraussetzt',
                'Weil Inversionen das Licht nicht beeinflussen',
                'Weil die Formel nur für den Mond gilt',
              ],
              correct: 1,
              why: 'Die Näherung beschreibt eine mittlere, gleichmäßig geschichtete Atmosphäre. Eine Inversion kehrt den Temperaturverlauf um; der Lichtweg ändert sich grundlegend.',
            },
            {
              q: 'Ein Simulator zeigt für einen Abend mit Luftspiegelung eine Refraktion von genau 34,5′. Wie ist das einzuordnen?',
              a: [
                'Als Modellwert, der hier wahrscheinlich nicht zutrifft und durch Beobachtung geprüft werden muss',
                'Als Messung, die die Luftspiegelung widerlegt',
                'Als Beweis, dass es keine Luftspiegelung gab',
                'Als genauer als jede Beobachtung',
              ],
              correct: 0,
              why: 'Ein Modell liefert nur, was seine Annahmen zulassen. Bei einer Luftspiegelung sind die Annahmen verletzt – das Ergebnis ist kein Befund über diesen Abend.',
            },
          ]),
          depthPoints: 12,
        },
      ],
    },

    // ── 5 · Transfer: Mond und andere Welten ────────────────────────────────
    {
      id: 'UNIT:REFRAKTION:ANDERE-WELTEN',
      title: 'Was bleibt auf dem Mars gleich?',
      entryQuestion: 'Sieht man auf dem Mars die Sonne auch noch, wenn sie schon untergegangen ist?',
      takeaway:
        'Das Prinzip reist mit, die Zahlen nicht: Wer Refraktion auf eine andere Welt überträgt, muss Bahngeometrie und Atmosphäre dort getrennt neu bestimmen.',
      sections: [
        {
          id: 'OBS:REFRAKTION:ERNTEMOND',
          kind: 'observation',
          title: 'Der Erntemond',
          summary:
            'Im Herbst geht der Vollmond in unseren Breiten mehrere Abende hintereinander fast zur selben Zeit auf – statt wie sonst jeden Abend fast eine Stunde später. Viele halten das für einen Effekt der Luft.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:REFRAKTION:TRANSFER',
          kind: 'explanation',
          title: 'Geometrie und Optik getrennt bilanzieren',
          summary:
            'Der Erntemond ist ein geometrischer Effekt: Um die Herbst-Tagundnachtgleiche verläuft die Mondbahn abends flach zum Horizont, die tägliche Verspätung des Mondaufgangs schrumpft auf etwa 20 bis 30 Minuten. Die Refraktion verschiebt nur jeden einzelnen Aufgang um wenige Minuten. Auf dem Mars hat die Luft am Boden nur rund 1–2 % der Dichte der Erdluft; die Refraktion ist dort entsprechend viel kleiner. Bahngeometrie, Achsneigung und Atmosphärenprofil müssen für jede Welt eigens bestimmt werden.',
          depthPoints: 10,
        },
        exercise(
          'EXP:REFRAKTION:URSACHEN-ZUORDNEN',
          'Ursache zuordnen',
          'Ordne zu, ob der Effekt aus der Bahngeometrie, aus der atmosphärischen Optik oder aus beidem entsteht: (1) der Erntemond geht mehrere Abende fast gleichzeitig auf, (2) die untergehende Sonne ist oval, (3) der Sonnenuntergang auf dem Mars ist minimal verzögert.',
          '(1) Bahngeometrie: flacher Winkel der Mondbahn zum Horizont. (2) Atmosphärische Optik: die Refraktion nimmt mit der Höhe ab. (3) Beides: Die Untergangszeit folgt aus der Geometrie, die geringe Verzögerung aus der sehr dünnen Marsatmosphäre.',
        ),
        {
          id: 'QUIZ:REFRAKTION:ANDERE-WELTEN',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Die Luft am Marsboden hat nur rund 1–2 % der Dichte der Erdluft. Was gilt für die Horizontrefraktion dort?',
              a: [
                'Sie ist ebenfalls etwa 34′',
                'Sie ist hundertmal größer',
                'Sie ist null, weil es keine Atmosphäre gibt',
                'Sie ist viel kleiner als auf der Erde, aber nicht null',
              ],
              correct: 3,
              why: 'Die Refraktion hängt von der Dichte der Luft ab. Eine viel dünnere Atmosphäre bricht viel schwächer – aber eine Atmosphäre ist da.',
            },
            {
              q: 'Warum erklärt die Refraktion den Erntemond nicht?',
              a: [
                'Weil der Mond im Herbst weiter entfernt ist',
                'Weil die Refraktion jeden Abend nur einen ähnlichen, kleinen Betrag beiträgt – die geringe Verspätung kommt aus der Bahngeometrie',
                'Weil es im Herbst keine Refraktion gibt',
                'Weil der Mond im Herbst schneller läuft',
              ],
              correct: 1,
              why: 'Ein konstanter optischer Versatz verschiebt alle Aufgänge gleich. Dass die Aufgänge zusammenrücken, verlangt eine Änderung der Geometrie.',
            },
            {
              q: 'Du entwirfst eine Welt mit dichter, kalter Atmosphäre. Wie gehst du sauber vor?',
              a: [
                'Erdwerte übernehmen und nur die Farbe des Himmels ändern',
                'Nur die Zahl der Monde festlegen',
                'Zuerst Bahngeometrie und Atmosphärenprofil getrennt bestimmen, dann ihre beobachtbare Kombination modellieren',
                'Die Bennett-Formel unverändert verwenden',
              ],
              correct: 2,
              why: 'Transfer gelingt, wenn Invarianten (das Brechungsprinzip) und weltabhängige Randbedingungen (Bahn, Dichte, Temperatur) getrennt bleiben.',
            },
          ]),
          depthPoints: 12,
        },
      ],
    },
  ],
};
