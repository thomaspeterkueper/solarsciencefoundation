/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths/machineFundamentals.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths/machineFundamentals.ts
 * Name:      Maschinenkunde – Kolbenmaschinen (zwei Lernpfade)
 * Version:   0.3.0
 * Created:   2026-11-06
 * Modified:  2026-11-08 09:00 CET
 * Depends:   lib/learningPaths.ts, lib/learningPaths/quizAuthoring.ts
 *
 * Engineering-Pfade nach docs/ENGINEERING-LEARNING-TEMPLATE.md, aufgeteilt in zwei Module:
 *   1. PATH:SSF:ENG-KOLBENMASCHINEN-PROZESS-0001 – Maschinenart und Pumpe → Takte und
 *      Vergleichsprozesse → Leistung und Wirkungsgradkette → Aufladung
 *   2. PATH:SSF:ENG-KURBELTRIEB-0001 – Kinematik → Kräfte bis Drehmoment → Massenausgleich
 *      Einzylinder → Massenausgleich Mehrzylinder → Drehkraft und Schwungrad
 * Empfohlene Reihenfolge 1 → 2 (Pfad 2 verwendet Zünd-OT, Ausschiebetakt und Taktfaktor).
 * v0.1.0 führte beides als einen Pfad PATH:SSF:ENG-MASCHINENKUNDE-0001; dieser Prototyp ist ersetzt.
 *
 * Anlass: Prüfungsvorbereitung Maschinenkunde (Hochschul-Grundlagenfach, Herbst 2026).
 * Skript und Altklausuren dienten nur als Referenz für Themenauswahl und Gewichtung
 * (Abschnitt 7 des Templates). Alle Texte sind eigenständig formuliert, alle Zahlenbeispiele
 * sind neu gewählt und nachgerechnet.
 *
 * KG-Status: Kanonisch im kueper-knowledge-graph seit 2026-11-07 (EXT-SSF-KG-20261106-maschinenkunde-
 * kolbenmaschinen, done): Module ENG-L2-000003 und ENG-L2-000004, Domain KD:ENG-PISTON-MACHINES:N2,
 * 22 Konzepte CON:L1:*, Ontologie ONT:KG:PISTON-MACHINES-0.1 mit Modellgrenzen.
 * Frühere SSF-Kandidaten: SSF-ENG-KOLBENMASCHINEN-PROZESS-0001, SSF-ENG-KURBELTRIEB-0001 (im KG als Alias).
 * Voraussetzungen laut KG: ENG-L2-000003 ← PHY-L1-000025 (Was ist Energie?), PHY-L1-000032 (Kraft und
 * Moment); ENG-L2-000004 ← ENG-L2-000003, PHY-L1-000032, PHY-L1-000034
 * (Grundlagen Dynamik, PATH:SSF:PHY-DYNAMIK-0001; EXT-SSF-KG-20261108-dynamik-grundlagen).
 * Status bleibt 'prototype' bis zur didaktischen Prüfung (docs/SSF-LERNPFAD-TEMPLATE.md).
 */

import type { LearningPath, LearningPathSection } from '../learningPaths';
import { quiz } from './quizAuthoring';

const QUIZ_TITLE = 'Anwendung → Verständnis → Transfer';

function exercise(id: string, title: string, summary: string, solution: string): LearningPathSection {
  return { id, kind: 'exercise', title: `Aufgabe: ${title}`, summary, solution, depthPoints: 10 };
}

const SSF_SUPPLIED = [
  'Engineering-Dramaturgie (ENGINEERING-LEARNING-TEMPLATE.md)',
  'Durchgerechnete Aufgaben mit Lösungsweg',
];

export const pistonMachineProcessLearningPath: LearningPath = {
  id: 'PATH:SSF:ENG-KOLBENMASCHINEN-PROZESS-0001',
  title: 'Wie viel Arbeit steckt in einem Arbeitsspiel?',
  subtitle:
    'Maschinenkunde, Teil 1: Arbeits- und Kraftmaschinen, Pumpen, Viertakt und Zweitakt, Vergleichsprozesse, Mitteldruck, Leistung, Wirkungsgradkette und Aufladung.',
  status: 'prototype',
  sourceModuleId: 'ENG-L2-000003',
  kxfModuleId: 'ENG-L2-000003',
  domainsNeeded: ['KD:ENG-PISTON-MACHINES:N2', 'KD:PHYS-THERM:N1', 'KD:PHYS-MECH:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'ENG-L2-000003',
      'KD:ENG-PISTON-MACHINES:N2',
      'PHY-L1-000025',
      'PHY-L1-000032',
      'KD:PHYS-THERM:N1',
      'KD:PHYS-MECH:N1',
      'CON:L1:drehmoment',
      'CON:L0:energie',
      'CON:L1:arbeits-und-kraftmaschine',
      'CON:L1:verdraengerpumpe',
      'CON:L1:liefergrad',
      'CON:L1:viertakt-zweitakt',
      'CON:L1:gleichraumprozess',
      'CON:L1:gemischter-vergleichsprozess',
      'CON:L1:verdichtungsverhaeltnis',
      'CON:L1:mitteldruck',
      'CON:L1:wirkungsgradkette-verbrennungsmotor',
      'CON:L1:spezifischer-kraftstoffverbrauch',
      'CON:L1:aufladung-ladeluftkuehlung',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: SSF_SUPPLIED,
  },
  unlocks: [],
  units: [
    // ── 1 · Maschinenart und Verdrängerpumpe ─────────────────────────────────
    {
      id: 'UNIT:MK:MASCHINEN',
      title: 'Arbeitsmaschine oder Kraftmaschine – und wie eine Pumpe fördert',
      entryQuestion: 'Ein Turbolader sitzt am Motor und dreht sich vom Abgas. Ist er eine Kraftmaschine oder eine Arbeitsmaschine?',
      takeaway: 'Nicht der Name entscheidet, sondern die Welle: Wer an ihr Arbeit abgibt, ist Kraftmaschine, wer an ihr Arbeit aufnimmt, ist Arbeitsmaschine.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:PROZESSE' },
      sections: [
        {
          id: 'OBS:MK:TURBOLADER',
          kind: 'observation',
          title: 'Ein Bauteil, zwei Rollen',
          summary:
            'Im Turbolader sitzen zwei Räder auf derselben Welle. Das Turbinenrad wird vom heißen Abgas angeströmt und dreht die Welle. Das Verdichterrad auf der anderen Seite wird von der Welle gedreht und presst Frischluft in den Motor. Dasselbe Aggregat enthält also eine Maschine, die Arbeit abgibt, und eine, die Arbeit aufnimmt.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:ENERGIEFLUSS',
          kind: 'explanation',
          title: 'Die Richtung des Energieflusses an der Welle',
          summary:
            'Kraftmaschinen wandeln eine andere Energieform in Wellenarbeit um und geben sie ab: Otto- und Dieselmotor, Dampfmaschine, Turbine, Windrad, Elektromotor, Hydromotor. Arbeitsmaschinen nehmen Wellenarbeit auf und nutzen sie: Pumpe, Verdichter, Ventilator, Werkzeugmaschine, Kran – und auch der Generator, obwohl er Strom liefert. Bei Fluidmaschinen heißt das: Kraftmaschine = Fluid gibt Energie an die Welle, Arbeitsmaschine = Welle gibt Energie an das Fluid. Bei einem Aggregat betrachtet man jede Komponente einzeln, und bei Maschinen, die die Rolle wechseln (E-Motor beim Rekuperieren), den Betriebszustand.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:MK:ZAHNRADPUMPE',
          kind: 'explanation',
          title: 'Wie eine Außenzahnradpumpe fördert',
          summary:
            'Zwei außenverzahnte Räder drehen gegenläufig in einem eng anliegenden Gehäuse. Auf der Saugseite treten die Zähne aus dem Eingriff, dort wird Raum frei und Öl strömt nach. Das Öl wird in den Zahnlücken außen am Gehäuse entlang zur Druckseite getragen – nicht durch die Mitte. In der Mitte greifen die Zähne ineinander, verdrängen das Öl und sperren den Rückweg. Leckage entsteht am Zahnkopfspalt zum Gehäuse, am Stirnspalt an den Seitenflächen und im Zahneingriff. Bei der Innenzahnradpumpe drehen Ritzel und Hohlrad gleichsinnig, eine Sichel trennt Saug- und Druckraum; bei radialer Spaltkompensation drückt der Öldruck die Sichelteile gegen die Zahnköpfe und verkleinert so den Spalt. Für deutlich höhere Drücke nimmt man Kolbenpumpen.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:MK:PUMPE-VERDICHTER',
          kind: 'explanation',
          title: 'Pumpe und Verdichter im p-V-Diagramm',
          summary:
            'Eine Flüssigkeit lässt sich praktisch nicht zusammendrücken. Bei der Kolbenpumpe springt der Druck deshalb in den Totpunkten schlagartig, das p-V-Diagramm ist fast ein Rechteck, und der ganze Hub steht zum Ansaugen und Ausschieben zur Verfügung. Ein Gas dagegen wird erst verdichtet (1→2), dann ausgeschoben (2→3). Die Luft im Schadraum dehnt sich beim Rückhub wieder aus, bevor das Einlassventil öffnet (Rückexpansion 3→4), erst danach wird angesaugt (4→1). Die Rückexpansion kostet nutzbaren Hub und senkt den Liefergrad.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:MK:PUMPENLEISTUNG',
          kind: 'explanation',
          title: 'Leistungen, Liefergrad und Wirkungsgrad einer Pumpe',
          summary:
            'Mechanische Antriebsleistung P_an = M · ω = M · 2π · n (gemessen werden Moment und Drehzahl, n in 1/s). Hydraulische Nutzleistung P_hyd = Δp · V̇ (gemessen werden Druckdifferenz und Volumenstrom). Das geometrische Fördervolumen V_g pro Umdrehung ergibt den theoretischen Strom V̇_th = V_g · n. Der Liefergrad λ_l = V̇ / V̇_th erfasst die Leckage (hydraulisch typisch 0,92–0,98, bei Gasen eher 0,7–0,8). Gesamtwirkungsgrad η_ges = P_hyd / P_an = λ_l · η_m. Die Antriebsleistung einer Pumpenanlage muss Druckerhöhung, Förderhöhe, Geschwindigkeitsänderung und alle Reibung bezahlen: Steigt die Förderhöhe oder wird der Rohrquerschnitt enger, steigt sie; steigt der Zulaufdruck, fällt die Drehzahl oder wird das Öl im Triebwerk wärmer und dünner, sinkt sie.',
          depthPoints: 10,
        },
        exercise(
          'EXERCISE:MK:ZAHNRADPUMPE',
          'Wie gut arbeitet die Zahnradpumpe?',
          'Eine Außenzahnradpumpe mit V_g = 8 cm³ pro Umdrehung wird mit n = 1500 min⁻¹ und M = 12 Nm angetrieben. Sie fördert V̇ = 11 L/min gegen Δp = 80 bar. Berechne P_an, P_hyd, den Liefergrad λ_l, η_ges und η_m.',
          'n = 1500/60 = 25 s⁻¹, ω = 2π · 25 = 157,1 s⁻¹, P_an = 12 · 157,1 ≈ 1,88 kW. V̇_th = 8 · 10⁻⁶ m³ · 25 s⁻¹ = 2,0 · 10⁻⁴ m³/s = 12 L/min, λ_l = 11/12 ≈ 0,92. V̇ = 11/60000 m³/s = 1,83 · 10⁻⁴ m³/s, P_hyd = 8 · 10⁶ Pa · 1,83 · 10⁻⁴ m³/s ≈ 1,47 kW. η_ges = 1,47/1,88 ≈ 0,78, η_m = η_ges/λ_l ≈ 0,85. Typische Fehlerquellen: n in min⁻¹ eingesetzt, bar nicht in Pa umgerechnet, L/min nicht durch 60 geteilt.',
        ),
        {
          id: 'QUIZ:MK:MASCHINEN',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Eine Pumpe hat V_g = 10 cm³/U und läuft mit 3000 min⁻¹. Der Liefergrad beträgt 0,95. Welcher Volumenstrom kommt tatsächlich an?',
              a: ['30 L/min', '28,5 L/min', '3,0 L/min', '31,6 L/min'],
              correct: 1,
              why: 'V̇_th = 10 cm³ · 3000 min⁻¹ = 30 000 cm³/min = 30 L/min. Davon kommen 95 % an: 28,5 L/min. Der Rest fließt als Leckage durch die Spalte zurück zur Saugseite.',
            },
            {
              q: 'Ein Dieselmotor treibt einen Generator an. Warum zählt der Generator zu den Arbeitsmaschinen?',
              a: ['Weil er elektrische Energie erzeugt und jede Energieerzeugung Arbeit ist.', 'Weil er keine Energie umwandelt, sondern nur weiterleitet.', 'Weil er an seiner Welle mechanische Arbeit aufnimmt.', 'Weil er langsamer dreht als der Motor.'],
              correct: 2,
              why: 'Entscheidend ist die mechanische Schnittstelle. Der Dieselmotor gibt Wellenarbeit ab, der Generator nimmt sie auf und wandelt sie in elektrische Energie. Dass am Ende Strom herauskommt, macht ihn nicht zur Kraftmaschine.',
            },
            {
              q: 'In der Druckleitung einer Kolbenpumpe wird der Rohrquerschnitt verkleinert, der Förderstrom bleibt gleich. Was passiert mit der nötigen Antriebsleistung?',
              a: ['Sie steigt, weil die Strömung schneller wird und die Rohrreibung zunimmt.', 'Sie sinkt, weil weniger Flüssigkeit im Rohr steht.', 'Sie bleibt gleich, weil Förderstrom und Förderhöhe gleich bleiben.', 'Sie sinkt, weil der Druck im engen Rohr fällt.'],
              correct: 0,
              why: 'Bei gleichem Volumenstrom muss die Flüssigkeit im engeren Rohr schneller fließen. Die Reibungsverluste wachsen mit der Geschwindigkeit stark an, und genau diese Verlustleistung muss zusätzlich an der Welle aufgebracht werden.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 2 · Arbeitsverfahren und Vergleichsprozesse ──────────────────────────
    {
      id: 'UNIT:MK:PROZESSE',
      title: 'Takte und Vergleichsprozesse',
      entryQuestion: 'Wie viel Arbeit könnte ein perfekter Motor aus einem Liter Hubraum herausholen – und warum schafft der echte so viel weniger?',
      takeaway: 'Der Vergleichsprozess ist die Obergrenze auf dem Papier. Je höher die Verdichtung, desto höher diese Grenze.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:LEISTUNG' },
      sections: [
        {
          id: 'OBS:MK:DRUCKVERLAUF',
          kind: 'observation',
          title: 'Ein Druckaufnehmer im Zylinder',
          summary:
            'Schraubt man einen Drucksensor in den Brennraum, sieht man über zwei Umdrehungen genau einen hohen Druckberg rund um den Zünd-OT und sonst fast nichts: leichten Unterdruck beim Ansaugen, einen Anstieg beim Verdichten, leichten Überdruck beim Ausschieben. Nur der kurze Berg liefert Arbeit.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:TAKTE',
          kind: 'explanation',
          title: 'Viertakt und Zweitakt',
          summary:
            'Viertakt in zwei Umdrehungen: Ansaugen (OT→UT, Einlass offen, leichter Unterdruck), Verdichten (UT→OT, Ventile zu, Otto etwa 10–16 bar, Diesel 30–50 bar), Arbeiten (Zündung um OT, Spitzendruck Otto etwa 40–70 bar, Diesel 60–100 bar; der einzige Takt, der Arbeit liefert), Ausschieben (UT→OT, Auslass offen). Daher der Taktfaktor i = ½. Der Zweitakter erledigt den Ladungswechsel im unteren Hubteil durch Spülen über Schlitze, ein Arbeitsspiel pro Umdrehung, i = 1. Vorteile: einfach, keine Ventile, mehr Leistung je Hubraum. Nachteile: Frisch- und Abgas vermischen sich, unverbrannter Kraftstoff und Öl im Abgas, rund ein Drittel des Hubs geht für die Spülung verloren. Otto: Gemisch, Fremdzündung. Diesel: reine Luft, Einspritzung kurz vor OT, Selbstzündung.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:VERGLEICHSPROZESSE',
          kind: 'explanation',
          title: 'Gleichraumprozess und gemischter Prozess',
          summary:
            'Otto-Vergleichsprozess (Gleichraum): 1→2 isentrope Verdichtung, 2→3 Wärmezufuhr bei konstantem Volumen, 3→4 isentrope Expansion, 4→1 Wärmeabfuhr bei konstantem Volumen. Diesel (gemischter oder Seiliger-Prozess): wie Otto, aber die Wärmezufuhr ist geteilt in 2→3 isochor und 3→4 isobar, danach 4→5 isentrope Expansion und 5→1 isochore Wärmeabfuhr – fünf Punkte statt vier. Kenngrößen: Verdichtungsverhältnis ε = (V_h + V_c)/V_c = V₁/V₂ (Otto etwa 7–10, Diesel 16–24), Drucksteigerung φ = p₃/p₂, Einspritzverhältnis ψ = V₄/V₃. Isentrop gilt p₂ = p₁ · ε^κ und T₂ = T₁ · ε^(κ−1). Thermischer Wirkungsgrad Otto: η_th = 1 − ε^(1−κ) mit κ = 1,4. Im T-s-Diagramm ist die eingeschlossene Fläche die Nutzwärme, die Fläche unter der Wärmeabfuhr die abgeführte Wärme: η_th = 1 − Q_ab/Q_zu.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:MK:INDIKATOR',
          kind: 'explanation',
          title: 'Das reale Indikatordiagramm',
          summary:
            'Der echte Druckverlauf hat abgerundete Ecken: Gezündet wird vor OT, die Verbrennung braucht Zeit, Wärme geht an die Wände, und unten liegt eine kleine Ladungswechselschleife (Ausschieben leicht über, Ansaugen leicht unter Umgebungsdruck). Die große Schleife zählt positiv, die kleine negativ. Die indizierte Arbeit W_i entspricht einem flächengleichen Rechteck der Breite V_h und der Höhe p_i: W_i = p_i · V_h. Die effektive Arbeit an der Welle hat dieselbe Breite, aber die geringere Höhe p_e = η_m · p_i. Gründe für den Abstand zum Ideal: Restgas, unvollständige und nicht schlagartige Verbrennung, Wandwärme, Strömungsverluste, Gasverlust an den Kolbenringen.',
          depthPoints: 9,
        },
        {
          id: 'BRANCH:MK:WANKEL-DAMPF',
          kind: 'branch',
          title: 'Seitenast: Wankelmotor und Dampfmaschine',
          summary:
            'Der Kreiskolbenmotor (Wankel) lässt einen dreieckigen Läufer auf einer Exzenterwelle kreisen. Alle vier Takte laufen nacheinander an verschiedenen Stellen des Gehäuses ab, der Läufer selbst öffnet und schließt die Kanäle – keine Ventile, keine Nockenwelle, keine oszillierenden Massen, ruhiger Lauf. Nachteil: schwierige Abdichtung, geringe Verdichtung, schlechterer Wirkungsgrad. Die Kolbendampfmaschine ist eine Kraftmaschine mit gasförmigem Medium: Einlass öffnet in OT und Dampf strömt mit nahezu Kesseldruck ein, nach Einlassschluss dehnt er sich aus, kurz vor UT öffnet der Auslass, beim Rückhub wird ausgeschoben, und vor OT schließt der Auslass, damit der Restdampf verdichtet wird und beim Einlassöffnen kein harter Druckstoß entsteht.',
          optional: true,
          depthPoints: 8,
        },
        exercise(
          'EXERCISE:MK:OTTOPROZESS',
          'Der ideale Ottomotor',
          'Ein Zylinder hat V_h = 450 cm³ und V_c = 50 cm³. Ansaugzustand p₁ = 1 bar, T₁ = 300 K, κ = 1,4. Berechne ε, p₂, T₂ und η_th.',
          'ε = (450 + 50)/50 = 10. p₂ = 1 bar · 10^1,4 ≈ 25,1 bar. T₂ = 300 K · 10^0,4 ≈ 754 K, also rund 480 °C – darum muss beim Ottomotor die Verdichtung unter der Klopfgrenze bleiben. η_th = 1 − 10^(−0,4) ≈ 0,60. Zum Vergleich: ε = 8 ergäbe 0,56, ε = 18 wie beim Diesel 0,69.',
        ),
        {
          id: 'QUIZ:MK:PROZESSE',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Zylinder hat V_h = 500 cm³ und V_c = 50 cm³. Wie groß ist das Verdichtungsverhältnis?',
              a: ['11', '10', '9', '12'],
              correct: 0,
              why: 'ε = (V_h + V_c)/V_c = 550/50 = 11. Im UT umfasst der Zylinder Hubraum plus Verdichtungsraum, im OT nur noch den Verdichtungsraum. Wer nur V_h/V_c rechnet, kommt auf 10 – das ist der häufigste Fehler.',
            },
            {
              q: 'Warum hat der Dieselmotor trotz des ungünstigeren Vergleichsprozesses meist den besseren Wirkungsgrad?',
              a: ['Weil Dieselkraftstoff einen viel höheren Heizwert hat.', 'Weil die Gleichdruckverbrennung effizienter ist als die Gleichraumverbrennung.', 'Weil er wegen der Selbstzündung mit deutlich höherem Verdichtungsverhältnis arbeitet.', 'Weil er keine Ladungswechselverluste hat.'],
              correct: 2,
              why: 'Bei gleichem ε wäre der Gleichraumprozess besser. Der Ottomotor ist aber durch das Klopfen auf ε ≈ 10 begrenzt, der Diesel braucht für die Selbstzündung ε ≈ 16–24. Der höhere Verdichtungswert gleicht den Nachteil der Gleichdruckverbrennung mehr als aus.',
            },
            {
              q: 'Im realen p-V-Diagramm ist die Ladungswechselschleife unten größer geworden. Was bedeutet das für p_i?',
              a: ['p_i steigt, weil mehr Fläche im Diagramm liegt.', 'p_i sinkt, weil die Ladungswechselschleife negativ zählt.', 'p_i bleibt gleich, nur p_e ändert sich.', 'p_i steigt, weil mehr Frischgas angesaugt wird.'],
              correct: 1,
              why: 'Die untere Schleife wird gegen den Uhrzeigersinn durchlaufen: Der Kolben leistet Arbeit am Gas, um es hinaus- und hineinzubefördern. Diese Fläche wird von der Hochdruckschleife abgezogen. Größere Strömungsverluste – zum Beispiel durch Drosselung im Teillastbetrieb – senken deshalb p_i.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 3 · Leistung und Wirkungsgrade ───────────────────────────────────────
    {
      id: 'UNIT:MK:LEISTUNG',
      title: 'Leistung, Mitteldruck und die Wirkungsgradkette',
      entryQuestion: 'Von 100 Litern Benzin im Tank bewegen nur etwa 30 Liter das Auto. Wo bleibt der Rest?',
      takeaway: 'Der Motor verliert Leistung in Stufen: η_e = η_th · η_g · η_m. Wer die Kette kennt, kann jede Größe vorwärts und rückwärts rechnen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:AUFLADUNG' },
      sections: [
        {
          id: 'OBS:MK:PRUEFSTAND',
          kind: 'observation',
          title: 'Was ein Motorprüfstand misst',
          summary:
            'Auf dem Prüfstand bremst eine Wirbelstrombremse den Motor. Gemessen werden nur zwei Größen an der Welle: Drehmoment und Drehzahl. Dazu kommt eine Waage für den Kraftstoff. Alles andere – Leistung, Mitteldruck, Wirkungsgrad, spezifischer Verbrauch – wird aus diesen drei Messungen berechnet.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:LEISTUNGSFORMELN',
          kind: 'explanation',
          title: 'Zwei Formeln für dieselbe Leistung',
          summary:
            'An der Welle gemessen: P_e = M · 2π · n. Aus dem Motorprozess: P_e = p_e · V_h · z · n · i, mit V_h = Hubraum eines Zylinders, z = Zylinderzahl, n in 1/s und i = ½ (Viertakt) bzw. 1 (Zweitakt). Analog gilt P_i = p_i · V_h · z · n · i. Der effektive Mitteldruck p_e ist kein messbarer Druck, sondern der gedachte konstante Druck, der über einen Hub dieselbe Arbeit liefern würde wie der Motor an der Welle. Er macht Motoren unterschiedlicher Größe vergleichbar (Pkw-Otto ohne Aufladung etwa 7–10 bar). Literleistung P_l = P_e / V_H.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:WIRKUNGSGRADKETTE',
          kind: 'explanation',
          title: 'Die Wirkungsgradkette',
          summary:
            'Mit dem Kraftstoff zugeführt: Q̇_zu = ṁ_B · H_u (H_u ≈ 42 000 kJ/kg für Benzin und Diesel). Thermischer Wirkungsgrad η_th = P_v/Q̇_zu – was der ideale Vergleichsprozess daraus macht (Richtwert 0,6). Gütegrad η_g = P_i/P_v – wie nah der reale Zylinderprozess dem Ideal kommt (Richtwert 0,7). Mechanischer Wirkungsgrad η_m = P_e/P_i = p_e/p_i – Verluste durch Reibung und Nebenaggregate (Richtwert 0,8). Innenwirkungsgrad η_i = P_i/Q̇_zu = η_th · η_g. Effektiver Wirkungsgrad η_e = P_e/Q̇_zu = η_th · η_g · η_m ≈ 0,34. Spezifischer Verbrauch b_e = ṁ_B/P_e = 1/(η_e · H_u); mit 1 kWh = 3,6 MJ wird daraus b_e ≈ 85 700/η_e in g/kWh.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:MK:BETRIEBSPUNKTE',
          kind: 'explanation',
          title: 'Betriebspunkte und Schaltverhalten',
          summary:
            'Nennleistung: hohes Moment bei hoher Drehzahl, maximale Leistung. Bester Wirkungsgrad: hohes Moment bei niedriger bis mittlerer Drehzahl, mittlere Leistung. Langsame Fahrt in der Spielstraße: sehr geringes Moment nahe Leerlaufdrehzahl, sehr geringe Leistung und schlechter Wirkungsgrad. Bei konstanter Geschwindigkeit ist die Fahrleistung fest; im höheren Gang sinkt die Drehzahl und steigt das Moment, der Betriebspunkt rückt näher an den Bestpunkt und b_e sinkt. Die effektive Leistung steigt mit Drehzahl, Last, Hubraum, Verdichtung, Aufladung, Ladeluftkühlung und besseren Teilwirkungsgraden.',
          depthPoints: 8,
        },
        exercise(
          'EXERCISE:MK:LEISTUNG',
          'Vom Mitteldruck zum Verbrauch',
          'Ein Viertakt-Vierzylinder mit 1,6 L Hubraum erreicht bei 4200 min⁻¹ einen effektiven Mitteldruck von 9 bar, der spezifische Verbrauch beträgt 240 g/kWh, η_m = 0,82. Berechne P_e, das Drehmoment, p_i, den Kraftstoffmassenstrom und η_e.',
          'n = 70 s⁻¹. P_e = 9 · 10⁵ Pa · 1,6 · 10⁻³ m³ · 70 s⁻¹ · 0,5 = 50,4 kW (V_h · z = V_H). M = P_e/(2π · n) = 50 400/(2π · 70) ≈ 115 Nm. p_i = p_e/η_m = 9/0,82 ≈ 11,0 bar. ṁ_B = 0,24 kg/kWh · 50,4 kW ≈ 12,1 kg/h = 3,36 g/s. η_e = 50,4 kW / (3,36 · 10⁻³ kg/s · 42 000 kJ/kg) ≈ 0,36.',
        ),
        {
          id: 'QUIZ:MK:LEISTUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Motor gibt 80 kW ab und hat η_e = 0,32 (H_u = 42 000 kJ/kg). Wie groß ist der Kraftstoffmassenstrom?',
              a: ['ca. 6,9 kg/h', 'ca. 1,9 kg/h', 'ca. 21,4 kg/h', 'ca. 214 kg/h'],
              correct: 2,
              why: 'Q̇_zu = 80 kW/0,32 = 250 kW. ṁ_B = 250 kJ/s / 42 000 kJ/kg ≈ 5,95 g/s ≈ 21,4 kg/h.',
            },
            {
              q: 'Was sagt der mechanische Wirkungsgrad η_m aus?',
              a: ['Wie viel der indizierten Leistung nach Reibung und Antrieb der Nebenaggregate an der Welle ankommt.', 'Wie viel Kraftstoffenergie der ideale Kreisprozess nutzt.', 'Wie nahe der reale Druckverlauf dem Vergleichsprozess kommt.', 'Wie viel Luft im Vergleich zum Hubvolumen angesaugt wird.'],
              correct: 0,
              why: 'η_m = P_e/P_i. Zwischen Zylinder und Kupplung gehen Leistung für Kolbenringe, Lager, Ventiltrieb und Pumpen verloren. Die anderen Antworten beschreiben η_th, den Gütegrad und den Liefergrad.',
            },
            {
              q: 'Bei 100 km/h fährt ein Auto einmal im 3. und einmal im 5. Gang. Warum braucht es im 5. Gang weniger Kraftstoff?',
              a: ['Weil im 5. Gang die Fahrleistung kleiner ist.', 'Weil im 5. Gang der Luftwiderstand sinkt.', 'Weil der Motor im 5. Gang weniger Zylinder nutzt.', 'Weil derselbe Leistungsbedarf bei niedrigerer Drehzahl und höherem Moment näher am Bestpunkt des Motors liegt.'],
              correct: 3,
              why: 'Die Fahrleistung hängt von Geschwindigkeit und Fahrwiderstand ab, nicht vom Gang. Im höheren Gang dreht der Motor langsamer und arbeitet mit mehr Last. Dort sind Reibungs- und Drosselverluste relativ kleiner, b_e sinkt.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 4 · Aufladung ────────────────────────────────────────────────────────
    {
      id: 'UNIT:MK:AUFLADUNG',
      title: 'Mehr Leistung ohne mehr Hubraum: Aufladung',
      entryQuestion: 'Warum leistet ein 1,4-Liter-Turbomotor so viel wie ein 2-Liter-Saugmotor?',
      takeaway: 'Leistung kommt aus Luftmasse, nicht aus Hubraum. Druck allein reicht nicht – die Luft muss auch kalt sein.',
      sections: [
        {
          id: 'OBS:MK:LADELUFTKUEHLER',
          kind: 'observation',
          title: 'Ein Kühler, der kein Wasser kühlt',
          summary:
            'Hinter dem Frontgrill vieler Turbomotoren sitzt ein zweiter Kühler, durch den kein Kühlwasser fließt, sondern Luft. Er liegt zwischen Turbolader und Ansaugkrümmer. Fasst man nach einer Vollgasfahrt das Rohr vor ihm an, ist es heiß, das Rohr dahinter nur noch warm.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:AUFLADUNG',
          kind: 'explanation',
          title: 'Aufladung und Ladeluftkühler',
          summary:
            'Aufladung erhöht die Luftmasse pro Hub. Mehr Luft erlaubt mehr Kraftstoff, die Arbeit pro Arbeitsspiel und damit p_e steigt – bei gleichem Hubraum. Der Verdichter heizt die Luft aber auf: T₂ = T₁ · (p₂/p₁)^((κ−1)/κ). Weil die Dichte ρ = p/(R · T) ist, wächst sie weniger stark als der Druck. Der Ladeluftkühler senkt die Temperatur, hebt die Dichte und verringert zugleich Klopfneigung und Bauteiltemperaturen. Grenzen starker Aufladung: Spitzendruck und mechanische Belastung, Klopfgrenze, Abgas- und Bauteiltemperaturen, Verdichterarbeit und Abgasgegendruck, Ansprechverhalten (Turboloch), Emissionen.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:MK:LADELUFT',
          'Was bringt der Ladeluftkühler?',
          'Der Ladedruck wird absolut von 1,0 auf 1,8 bar erhöht, T₁ = 293 K, Verdichtung isentrop mit κ = 1,4. Um welchen Faktor steigt die Luftdichte ohne Ladeluftkühler, und um welchen Faktor, wenn ein Kühler die Ladeluft auf 318 K zurückkühlt?',
          'T₂ = 293 K · 1,8^0,286 ≈ 347 K. Ohne Kühler: ρ₂/ρ₁ = 1,8 · 293/347 ≈ 1,52. Mit Kühler auf 318 K: 1,8 · 293/318 ≈ 1,66. Mit idealem Kühler auf 293 K wäre es 1,8. Wer die Erwärmung im Verdichter vergisst, rechnet fälschlich mit dem vollen Druckverhältnis.',
        ),
        {
          id: 'QUIZ:MK:AUFLADUNG',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Saugmotor hat p_e = 10 bar. Durch Aufladung steigt die Luftmasse pro Hub um 40 %, Wirkungsgrade und Luftverhältnis bleiben gleich. Welcher effektive Mitteldruck ist zu erwarten?',
              a: ['etwa 10 bar, der Hubraum ist ja gleich', 'etwa 14 bar', 'etwa 20 bar', 'etwa 11,4 bar'],
              correct: 1,
              why: 'Bei gleichem λ wird mit 40 % mehr Luft auch 40 % mehr Kraftstoff verbrannt. Bei gleichen Wirkungsgraden wächst die Arbeit pro Arbeitsspiel und damit p_e im selben Verhältnis: 10 bar · 1,4 = 14 bar.',
            },
            {
              q: 'Warum steigt die Luftdichte nach dem Verdichter weniger stark als der Ladedruck?',
              a: ['Weil ein Teil der Luft am Verdichter vorbeiströmt.', 'Weil Luft bei hohem Druck zu Flüssigkeit kondensiert.', 'Weil die Verdichtung die Luft erwärmt und die Dichte mit p/T geht.', 'Weil der Liefergrad bei Aufladung unter 0,5 fällt.'],
              correct: 2,
              why: 'ρ = p/(R · T). Bei der Verdichtung steigt nicht nur p, sondern auch T, nach T₂ = T₁ · (p₂/p₁)^((κ−1)/κ). Der Temperaturanstieg frisst einen Teil des Dichtegewinns, genau den holt der Ladeluftkühler zurück.',
            },
            {
              q: 'Ein Tuner erhöht beim Ottomotor den Ladedruck stark, ohne sonst etwas zu ändern. Welches Problem tritt am wahrscheinlichsten zuerst auf?',
              a: ['Klopfen, weil Druck und Temperatur der Ladung am Verdichtungsende steigen.', 'Der Motor geht aus, weil zu viel Luft da ist.', 'Die Drehzahl sinkt, weil der Mitteldruck fällt.', 'Der Liefergrad fällt unter 1.'],
              correct: 0,
              why: 'Mehr Ladedruck heißt höherer Druck und höhere Temperatur am Ende der Verdichtung. Beim Ottomotor kann sich das Gemisch dann selbst entzünden, bevor die Flammenfront es erreicht. Gegenmittel: Ladeluftkühlung, späterer Zündzeitpunkt, geringere Verdichtung.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },
  ],
};

export const crankTrainLearningPath: LearningPath = {
  id: 'PATH:SSF:ENG-KURBELTRIEB-0001',
  title: 'Wie wird aus Kolbenkraft ein ruhig laufender Motor?',
  subtitle:
    'Maschinenkunde, Teil 2: Kolbenbewegung, Kräfte im Kurbeltrieb, Drehmoment, Massenkräfte und Massenausgleich, Kurbelstern, Drehkraftverlauf und Schwungrad.',
  status: 'prototype',
  sourceModuleId: 'ENG-L2-000004',
  kxfModuleId: 'ENG-L2-000004',
  domainsNeeded: ['KD:ENG-PISTON-MACHINES:N2', 'KD:PHYS-MECH:N1', 'KD:ENG-MECH:N2'],
  suppliedBy: {
    knowledgeGraph: [
      'ENG-L2-000004',
      'KD:ENG-PISTON-MACHINES:N2',
      'ENG-L2-000003',
      'PHY-L1-000034',
      'KD:PHYS-MECH:N1',
      'KD:ENG-MECH:N2',
      'PHY-L1-000032',
      'CON:L1:kraft',
      'CON:L1:drehmoment',
      'CON:L1:lagerreaktion',
      'CON:L1:kurbeltrieb',
      'CON:L1:pleuelverhaeltnis',
      'CON:L1:kolbenkinematik',
      'CON:L1:oszillierende-massenkraft',
      'CON:L1:rotierende-massenkraft',
      'CON:L1:pleuelstangenkraft-tangentialkraft',
      'CON:L1:massenausgleich',
      'CON:L1:kurbelstern',
      'CON:L1:freies-massenmoment',
      'CON:L1:drehkraftdiagramm',
      'CON:L1:ungleichfoermigkeitsgrad',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [...SSF_SUPPLIED, 'Ergebnistabelle Massenausgleich für R2, R3, R4, Boxer, R6'],
  },
  unlocks: [],
  units: [
    // ── 1 · Kinematik des Kurbeltriebs ───────────────────────────────────────
    {
      id: 'UNIT:MK:KINEMATIK',
      title: 'Der Kurbeltrieb: Wie sich der Kolben bewegt',
      entryQuestion: 'Die Kurbelwelle dreht ganz gleichmäßig. Warum bewegt sich der Kolben trotzdem ruckartig?',
      takeaway: 'Gleichmäßige Drehung wird zu ungleichmäßigem Hub: Der Kolben wird ständig beschleunigt und gebremst – am stärksten im oberen Totpunkt.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:KRAEFTE' },
      sections: [
        {
          id: 'OBS:MK:TOTPUNKTE',
          kind: 'observation',
          title: 'Zweimal Stillstand pro Umdrehung',
          summary:
            'Im oberen Totpunkt (OT) und im unteren Totpunkt (UT) steht der Kolben für einen Moment still und kehrt um. Dazwischen erreicht er hohe Geschwindigkeiten. Bei 6000 min⁻¹ passiert dieses Anhalten und Umkehren 200-mal pro Sekunde.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:GEOMETRIE',
          kind: 'explanation',
          title: 'Kurbelradius, Pleuellänge, Pleuelverhältnis',
          summary:
            'Der Kurbelradius r ist der Abstand Kurbelwellenmitte – Kurbelzapfen, der Hub ist H = 2r. Die Pleuellänge l verbindet Kurbelzapfen und Kolbenbolzen. Ihr Verhältnis λ = r/l liegt bei Pkw-Motoren um 0,25–0,33. Der Kurbelwinkel α wird ab OT gezählt, der Kolbenweg s ebenfalls ab OT. Das Pleuel steht um den Winkel β schräg, mit sin β = λ · sin α. Angaben wie „30° vor Ende des Ausschiebetakts“ übersetzt man zuerst in α ab OT, hier α = 330°.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:MK:KOLBENWEG',
          kind: 'explanation',
          title: 'Kolbenweg, Geschwindigkeit, Beschleunigung',
          summary:
            'Exakt setzt sich der Kolbenweg aus zwei Anteilen zusammen: s = r(1 − cos α) + l(1 − cos β). Der erste stammt aus der Kurbel, der zweite aus der Schrägstellung des Pleuels. Die übliche Näherung lautet s = r · (1 − cos α + λ/2 · sin²α), daraus folgen v = r·ω · (sin α + λ/2 · sin 2α) und a = r·ω² · (cos α + λ · cos 2α). Der Term mit cos α schwingt einmal pro Umdrehung (1. Ordnung), der Term mit λ · cos 2α zweimal (2. Ordnung). Im OT ist a = rω²(1 + λ) am größten, im UT ist |a| = rω²(1 − λ) kleiner. Bei α = 90° ist der Kolben wegen des Pleuelanteils schon über der Hubmitte. Die mittlere Kolbengeschwindigkeit ist v_m = 2 · H · n (n in 1/s); bei Pkw-Motoren liegt sie etwa bei 10–20 m/s.',
          depthPoints: 10,
        },
        exercise(
          'EXERCISE:MK:KOLBENWEG',
          'Wo steht der Kolben bei 90°?',
          'Ein Motor hat r = 40 mm, l = 160 mm und dreht mit n = 4800 min⁻¹. Berechne λ, ω, den Kolbenweg bei α = 90° (Näherung und Pleuelanteil exakt), die Kolbenbeschleunigung in OT und bei 90° sowie v_m.',
          'λ = 40/160 = 0,25, n = 80 s⁻¹, ω = 2π · 80 = 502,7 s⁻¹. Bei 90°: s = 40 · (1 − 0 + 0,125 · 1) = 45 mm, also 5 mm unter der Hubmitte von 40 mm. Exakt: β = arcsin 0,25 = 14,5°, Pleuelanteil l(1 − cos β) = 5,1 mm. a_OT = 0,04 · 502,7² · 1,25 ≈ 12 630 m/s², a(90°) = 0,04 · 502,7² · (0 − 0,25) ≈ −2 530 m/s². Bei 90° ist der Anteil 1. Ordnung null, übrig bleibt nur die 2. Ordnung. v_m = 2 · 0,08 m · 80 s⁻¹ = 12,8 m/s.',
        ),
        {
          id: 'QUIZ:MK:KINEMATIK',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Ein Motor hat 90 mm Hub und dreht mit 6000 min⁻¹. Wie groß ist die mittlere Kolbengeschwindigkeit?',
              a: ['9 m/s', '36 m/s', '28,3 m/s', '18 m/s'],
              correct: 3,
              why: 'v_m = 2 · H · n = 2 · 0,09 m · 100 s⁻¹ = 18 m/s. Pro Umdrehung legt der Kolben den Hub zweimal zurück, einmal hin und einmal zurück.',
            },
            {
              q: 'Warum ist die Kolbenbeschleunigung im OT größer als im UT?',
              a: ['Weil im OT der Gasdruck am höchsten ist.', 'Weil sich im OT die Anteile 1. und 2. Ordnung addieren, im UT aber teilweise aufheben.', 'Weil die Kurbelwelle im OT schneller dreht.', 'Weil das Pleuel im OT am stärksten schräg steht.'],
              correct: 1,
              why: 'a = rω²(cos α + λ cos 2α). Im OT sind cos α = 1 und cos 2α = 1, also rω²(1 + λ). Im UT ist cos α = −1, cos 2α bleibt +1, also rω²(−1 + λ). Das ist eine reine Geometriefolge des endlich langen Pleuels, der Gasdruck spielt dafür keine Rolle.',
            },
            {
              q: 'Ein Konstrukteur verlängert bei gleichem Hub das Pleuel deutlich. Was ändert sich an der Kolbenbewegung?',
              a: ['λ wird kleiner, die Bewegung wird sinusförmiger und der Anteil 2. Ordnung schrumpft.', 'Der Hub wird größer.', 'λ wird größer und die Beschleunigung im OT steigt.', 'Nichts, die Kinematik hängt nur vom Kurbelradius ab.'],
              correct: 0,
              why: 'Mit längerem l sinkt λ = r/l. Je kleiner λ, desto näher kommt die Bewegung einer reinen Sinusbewegung und desto kleiner sind Anteil 2. Ordnung und Pleuelwinkel. Der Hub bleibt 2r. Der Preis ist mehr Bauhöhe und Masse.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 2 · Kräfte im Kurbeltrieb ────────────────────────────────────────────
    {
      id: 'UNIT:MK:KRAEFTE',
      title: 'Vom Gasdruck zum Drehmoment',
      entryQuestion: 'Im oberen Totpunkt ist der Druck im Zylinder am höchsten. Warum liefert der Motor genau dort kein Drehmoment?',
      takeaway: 'Die Kolbenkraft wird erst über die Schrägstellung von Pleuel und Kurbel zu Drehmoment – in OT und UT fehlt der Hebel.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:AUSGLEICH-EINZYLINDER' },
      sections: [
        {
          id: 'OBS:MK:PLEUELBRUCH',
          kind: 'observation',
          title: 'Ein Pleuel reißt beim Ausschieben, nicht beim Zünden',
          summary:
            'Motorschäden bei Überdrehzahl zeigen oft gerissene Pleuel oder Pleuelschrauben – und zwar im Ladungswechsel-OT, wo fast kein Gasdruck herrscht. Im Zünd-OT drücken dagegen viele Tonnen Gaskraft auf den Kolben. Die Erklärung liegt in der Trägheit der Teile, die bei jeder Umdrehung zweimal angehalten werden.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:MASSEN',
          kind: 'explanation',
          title: 'Massen sortieren: Was schwingt, was dreht',
          summary:
            'Das Pleuel bewegt sich kompliziert: oben hin und her, unten im Kreis. Man ersetzt es durch zwei Punktmassen mit gleicher Gesamtmasse und gleichem Schwerpunkt. m_Pl2 sitzt am Kolbenbolzen und schwingt mit, m_Pl1 sitzt am Kurbelzapfen und dreht mit. Ist a der Abstand des Pleuelschwerpunkts vom großen Pleuelauge, gilt m_Pl2 = m_Pl · a/l und m_Pl1 = m_Pl − m_Pl2; grob schwingt etwa ein Drittel. Oszillierende Masse m_os = Kolben samt Ringen und Bolzen + m_Pl2. Rotierende Masse m_r = Kurbelzapfen + Kurbelwangen (auf den Radius r umgerechnet) + m_Pl1.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:KRAFTKETTE',
          kind: 'explanation',
          title: 'Die Kraftkette in sechs Schritten',
          summary:
            '1. Gaskraft F_G = p_ü · A_K mit dem Überdruck im Zylinder und A_K = π d²/4. 2. Oszillierende Massenkraft F_os = m_os · r·ω² · (cos α + λ cos 2α). 3. Kolbenkraft F = F_G − F_os (positiv = Richtung Kurbelwelle). 4. Am Kolbenbolzen zerlegt: Pleuelstangenkraft S = F / cos β und Normalkraft auf die Zylinderwand N = F · tan β. 5. Am Kurbelzapfen zerlegt: Tangentialkraft T = S · sin(α + β) und Radialkraft R = S · cos(α + β). 6. Drehmoment M_d = T · r. Die Rotationsfliehkraft F_r = m_r · r · ω² wirkt zusätzlich am Zapfen und in den Lagern.',
          depthPoints: 10,
        },
        {
          id: 'EXPL:MK:RICHTUNGEN',
          kind: 'explanation',
          title: 'Zug oder Druck im Pleuel?',
          summary:
            'Die Gaskraft drückt den Kolben immer Richtung Kurbelwelle, das Pleuel wird auf Druck belastet; nur beim Ansaugen zieht ein leichter Unterdruck den Kolben nach oben. Die Massenkraft wirkt immer gegen die Beschleunigung. In OT-Nähe wird der Kolben abgebremst und umgekehrt, seine Trägheit will weiter nach oben – das Pleuel wird auf Zug belastet. In UT-Nähe will der Kolben weiter nach unten – Druck im Pleuel. Kurz nach dem Zünd-OT wirkt die Massenkraft deshalb gegen die Gaskraft und entlastet das Triebwerk. Bei hoher Last und niedriger Drehzahl dominiert die Gaskraft, bei hoher Drehzahl die Massenkraft, denn sie wächst mit n².',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:MK:KRAFTKETTE',
          'Drehmoment bei 45° nach Zünd-OT',
          'Motor aus der vorigen Aufgabe (r = 40 mm, l = 160 mm, n = 4800 min⁻¹, ω = 502,7 s⁻¹). Kolbendurchmesser 80 mm, oszillierende Masse 0,6 kg, Gasüberdruck bei α = 45° p_ü = 30 bar. Berechne F_os, F_G, F, β, S, N, T und M_d.',
          'a = 0,04 · 502,7² · (cos 45° + 0,25 · cos 90°) = 10 108 · 0,707 ≈ 7 146 m/s², F_os = 0,6 · 7 146 ≈ 4,29 kN. A_K = π · 0,08²/4 = 5,03 · 10⁻³ m², F_G = 3 · 10⁶ Pa · 5,03 · 10⁻³ m² ≈ 15,08 kN. F = 15,08 − 4,29 = 10,79 kN (positiv: der Kolben treibt an). sin β = 0,25 · 0,707 → β = 10,2°. S = 10,79/cos 10,2° ≈ 10,96 kN, N = 10,79 · tan 10,2° ≈ 1,94 kN. T = 10,96 · sin 55,2° ≈ 9,00 kN, M_d = 9,00 kN · 0,04 m = 360 Nm.',
        ),
        exercise(
          'EXERCISE:MK:FLAECHENPRESSUNG',
          'Belastung des Kurbelzapfenlagers im Ladungswechsel-OT',
          'Derselbe Motor steht im OT am Ende des Ausschiebetakts, die Gaskraft ist vernachlässigbar. m_os = 0,6 kg, rotierender Pleuelanteil m_Pl1 = 0,4 kg, Zapfendurchmesser 45 mm, tragende Lagerbreite 20 mm. Wie groß ist die Flächenpressung im Pleuellager?',
          'Ohne Gaskraft bleibt nur die Massenkraft: F_os = 0,6 · 0,04 · 502,7² · 1,25 ≈ 7,58 kN nach oben, das Pleuel wird auf Zug belastet, S = 7,58 kN (in OT ist β = 0). Die Fliehkraft des unteren Pleuelanteils zeigt im OT ebenfalls nach oben: F_rPl1 = 0,4 · 0,04 · 502,7² ≈ 4,04 kN. Beide addieren sich: 11,62 kN. Projizierte Fläche 45 · 20 = 900 mm², p ≈ 12,9 N/mm². Im Zünd-OT dagegen zeigt S nach unten und die Fliehkraft zieht davon ab. Deshalb immer zuerst die Richtungen skizzieren.',
        ),
        {
          id: 'QUIZ:MK:KRAEFTE',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'In OT beträgt die Kolbenkraft F = 18 kN. Wie groß sind Pleuelstangenkraft S und Drehmoment M_d?',
              a: ['S = 18 kN, M_d = 0 Nm', 'S = 0 kN, M_d = 18 kN · r', 'S = 18 kN · tan β, M_d = S · r', 'S = 18 kN, M_d = 18 kN · r'],
              correct: 0,
              why: 'In OT ist β = 0, also S = F/cos 0 = F. Die Pleuelkraft zeigt genau durch die Kurbelwellenmitte, deshalb ist T = S · sin(0 + 0) = 0 und auch das Drehmoment. Die ganze Kraft geht als Radialkraft in die Lager.',
            },
            {
              q: 'Warum wird das Pleuel kurz vor dem OT des Ausschiebetakts auf Zug belastet?',
              a: ['Weil das Abgas den Kolben nach oben drückt.', 'Weil der Kolben dort abgebremst werden muss und seine Trägheit ihn weiter nach oben ziehen will.', 'Weil die Kurbelwelle dort langsamer dreht.', 'Weil der Unterdruck des Ansaugens schon wirkt.'],
              correct: 1,
              why: 'Die Gaskraft ist beim Ausschieben klein. Der Kolben läuft nach oben und muss bis zum OT auf null abgebremst werden. Die nötige Bremskraft liefert das Pleuel, indem es am Kolben zieht. Die Massenkraft zeigt nach oben – Zug im Pleuel.',
            },
            {
              q: 'Ein Motor läuft statt mit 3000 nun mit 6000 min⁻¹, Last und Gasdruck bleiben ungefähr gleich. Was passiert mit dem Verhältnis von Massenkraft zu Gaskraft?',
              a: ['Es bleibt gleich, weil beide mit der Drehzahl steigen.', 'Es halbiert sich, weil der Kolben weniger Zeit hat.', 'Die Massenkraft vervierfacht sich, die Gaskraft bleibt etwa gleich – die Massenkraft gewinnt an Gewicht.', 'Die Massenkraft verdoppelt sich, die Gaskraft halbiert sich.'],
              correct: 2,
              why: 'F_os ∼ ω² ∼ n². Doppelte Drehzahl bedeutet vierfache Massenkraft. Die Gaskraft hängt am Zylinderdruck, also an der Last. Bei hohen Drehzahlen bestimmen deshalb die Massenkräfte die Belastung von Pleuel und Lagern.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 3 · Massenausgleich am Einzylinder ───────────────────────────────────
    {
      id: 'UNIT:MK:AUSGLEICH-EINZYLINDER',
      title: 'Warum ein Einzylinder rüttelt – und was dagegen hilft',
      entryQuestion: 'Ein Rasenmähermotor vibriert spürbar. Kann man das mit einem Gegengewicht an der Kurbelwelle einfach wegnehmen?',
      takeaway: 'Was rotiert, lässt sich mit einem Gegengewicht ausgleichen. Was hin und her schwingt, braucht zwei gegenläufig drehende Massen.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:AUSGLEICH-MEHRZYLINDER' },
      sections: [
        {
          id: 'OBS:MK:WANDERNDER-MOTOR',
          kind: 'observation',
          title: 'Ein Motor, der über den Tisch wandert',
          summary:
            'Stellt man einen kleinen Einzylinder ohne Befestigung auf eine glatte Werkbank und lässt ihn laufen, hüpft und wandert er. Dreht man ihn höher, wird das Rütteln nicht nur schneller, sondern auch deutlich stärker. Die Ursache sind Kräfte, die nach außen wirken, weil im Motor nichts sie aufhebt.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:DREI-SORTEN',
          kind: 'explanation',
          title: 'Drei Sorten Massenkraft',
          summary:
            'Rotierend: F_r = m_r · r · ω², konstanter Betrag, die Richtung dreht mit der Kurbel. Oszillierend 1. Ordnung: F_I = m_os · r · ω² · cos α, wirkt nur in Zylinderachse und schwingt einmal pro Umdrehung; Maximalwert F_I,max = m_os · r · ω². Oszillierend 2. Ordnung: F_II = λ · m_os · r · ω² · cos 2α, ebenfalls in Zylinderachse, aber zweimal pro Umdrehung; F_II,max = λ · F_I,max. Freie Massenkräfte sind periodisch und regen Motorlager und Umgebung zu Schwingungen an. Ein Einzylinder hat Massenkräfte, aber keine Massenmomente.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:GEGENGEWICHT',
          kind: 'explanation',
          title: 'Gegengewichte: voll für das Rotierende, halb für das Oszillierende',
          summary:
            'Die rotierende Kraft wird vollständig durch Gegengewichte gegenüber dem Kurbelzapfen ausgeglichen. Gegen die oszillierende Kraft 1. Ordnung hilft ein umlaufendes Gegengewicht nur mit seiner senkrechten Komponente; seine waagerechte Komponente ist eine neue Störkraft, die bei 90° ihr Maximum hat. Man gleicht deshalb meist nur etwa 50 % aus (Ausgleichsanteil φ ≈ 0,5) und tauscht so eine große senkrechte Schwingung gegen zwei halb so große in senkrechter und waagerechter Richtung. Je Wange: m_G = φ · m_os · r / (2 · y), mit y = Schwerpunktabstand des Gegengewichts.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:AUSGLEICHSWELLEN',
          kind: 'explanation',
          title: 'Zwei gegenläufige Wellen',
          summary:
            'Zwei Unwuchten, die gegenläufig mit gleicher Drehzahl umlaufen, addieren sich in senkrechter Richtung und heben sich in waagerechter Richtung genau auf. Laufen sie mit Kurbelwellendrehzahl, gleichen sie die 1. Ordnung aus; eine der beiden Wellen darf die Kurbelwelle selbst sein. Für die 2. Ordnung laufen beide mit doppelter Drehzahl (Lanchester-Ausgleich). Die Wellen müssen formschlüssig angetrieben werden (Zahnräder, Kette, Zahnriemen), damit ihre Winkellage zur Kurbel stimmt. Liegen die Wellen auf unterschiedlicher Höhe, entsteht aus den waagerechten Kräften ein Moment um die Kurbelwellenachse.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:MK:EINZYLINDER',
          'Massenkräfte eines Motorradmotors',
          'Einzylinder mit m_os = 0,5 kg, r = 35 mm, λ = 0,25, n = 6000 min⁻¹. Berechne F_I,max und F_II,max. Wie schwer muss je Kurbelwange ein Gegengewicht im Schwerpunktabstand y = 50 mm sein, wenn 50 % der Kraft 1. Ordnung ausgeglichen werden sollen?',
          'ω = 2π · 100 = 628,3 s⁻¹. F_I,max = 0,5 · 0,035 · 628,3² ≈ 6,91 kN, F_II,max = 0,25 · 6,91 ≈ 1,73 kN. m_G = 0,5 · 0,5 kg · 35 mm / (2 · 50 mm) = 0,0875 kg, also rund 88 g je Wange – zusätzlich zu den Gegengewichten für die rotierenden Massen.',
        ),
        {
          id: 'QUIZ:MK:AUSGLEICH-EINZYLINDER',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'm_os = 0,8 kg, r = 40 mm, n = 3000 min⁻¹. Wie groß ist die maximale Massenkraft 1. Ordnung?',
              a: ['ca. 3,16 kN', 'ca. 0,79 kN', 'ca. 100 N', 'ca. 12,6 kN'],
              correct: 0,
              why: 'ω = 2π · 50 = 314,2 s⁻¹, F_I,max = 0,8 · 0,04 · 314,2² ≈ 3 160 N. Wer n in min⁻¹ einsetzt oder ω nicht quadriert, liegt um Größenordnungen daneben.',
            },
            {
              q: 'Warum gleicht man die Massenkraft 1. Ordnung mit einem Gegengewicht an der Kurbelwelle meist nur zur Hälfte aus?',
              a: ['Weil ein volles Gegengewicht die Kurbelwelle bricht.', 'Weil das umlaufende Gegengewicht eine waagerechte Störkraft erzeugt, die bei vollem Ausgleich so groß wäre wie die ursprüngliche Kraft.', 'Weil die Massenkraft 1. Ordnung nur in jeder zweiten Umdrehung wirkt.', 'Weil die Gaskraft die andere Hälfte ausgleicht.'],
              correct: 1,
              why: 'Das Gegengewicht läuft im Kreis, die Kolbenkraft wirkt nur in Zylinderachse. Senkrecht hilft es, waagerecht stört es. Bei 100 % Ausgleich würde die Schwingung nur von senkrecht nach waagerecht verlegt. 50 % verteilt sie auf zwei halb so große Anteile.',
            },
            {
              q: 'Ein Hersteller will bei einem Einzylinder auch die Massenkraft 2. Ordnung beseitigen. Was braucht er?',
              a: ['Ein größeres Schwungrad.', 'Ein zusätzliches Gegengewicht direkt an der Kurbelwelle.', 'Eine einzelne Ausgleichswelle mit Kurbelwellendrehzahl.', 'Zwei gegenläufige Ausgleichswellen, die mit doppelter Kurbelwellendrehzahl laufen.'],
              correct: 3,
              why: 'Die 2. Ordnung schwingt zweimal pro Umdrehung. Eine Ausgleichsmasse muss deshalb mit 2n umlaufen. Damit sich die waagerechten Anteile aufheben, braucht man zwei gegenläufige Wellen. Ein Schwungrad glättet nur die Drehzahl, nicht die Massenkräfte.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 4 · Massenausgleich am Mehrzylinder ──────────────────────────────────
    {
      id: 'UNIT:MK:AUSGLEICH-MEHRZYLINDER',
      title: 'Kurbelstern, Kräfteplan, Momentenplan',
      entryQuestion: 'Ein Vierzylinder-Reihenmotor gilt als gut ausgeglichen. Warum bekommt er trotzdem oft zwei Ausgleichswellen?',
      takeaway: 'Bei der 2. Ordnung zählt der doppelte Winkel – dann zeigen OT- und UT-Zylinder in dieselbe Richtung.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:MK:DREHKRAFT' },
      sections: [
        {
          id: 'OBS:MK:VIERZYLINDER',
          kind: 'observation',
          title: 'Ruhig, aber nicht ganz',
          summary:
            'Ein Vierzylinder-Reihenmotor läuft deutlich ruhiger als ein Ein- oder Zweizylinder. Bei hohen Drehzahlen spürt man trotzdem ein feines Brummen mit doppelter Drehfrequenz. Viele größere Vierzylinder tragen deshalb unten im Ölsumpf zwei kleine Wellen mit Unwuchten, die doppelt so schnell drehen wie die Kurbelwelle.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:KURBELSTERN',
          kind: 'explanation',
          title: 'Zündabstand und Kurbelstern',
          summary:
            'Gleichmäßiger Zündabstand: Viertakt 720°/z, Zweitakt 360°/z. Beim Viertakt-R4 also 180°: Zylinder 1 und 4 stehen gemeinsam im OT, 2 und 3 im UT, Zündfolge 1-3-4-2. Beim R3 Viertakt 240°, beim R4 Zweitakt 90°, beim R2 Viertakt 360° – dann stehen beide Kröpfungen gleich. Der Kurbelstern ist die Kurbelwelle von vorn gesehen: jeder Kurbelarm als Strich mit Zylindernummer, Zylinder 1 meist oben im OT.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:MK:KRAEFTEPLAN',
          kind: 'explanation',
          title: 'Resultierende grafisch bestimmen',
          summary:
            'Lageplan: In Richtung jedes Kurbelarms einen Pfeil der Länge F_r bzw. F_I,max zeichnen. Kräfteplan: die Pfeile aneinanderhängen. Schließt sich der Zug, ist die Resultierende null. Bei 1. und 2. Ordnung wird die Resultierende der Maximalwerte noch auf die Zylinderachse projiziert. Für die 2. Ordnung trägt man jeden Kurbelwinkel verdoppelt ein: 180° wird zu 360°, also zeigt ein UT-Zylinder wie ein OT-Zylinder nach oben. Sind rotierende Kräfte ausgeglichen, sind es die Kräfte 1. Ordnung auch, denn beide Pläne unterscheiden sich nur in der Pfeillänge.',
          depthPoints: 9,
        },
        {
          id: 'EXPL:MK:MOMENTE',
          kind: 'explanation',
          title: 'Massenmomente',
          summary:
            'Die Kräfte greifen an verschiedenen Stellen längs der Kurbelwelle an. Bezogen auf die Motormitte erzeugt jede ein Moment M = F · a, wobei a der Abstand des Zylinders von der Mitte ist; äußere Zylinder haben die größeren Hebel. Im Momentenplan zeigen die Pfeile von Zylindern links der Mitte nach außen, rechts der Mitte nach innen. Die wahre Lage des resultierenden Moments erhält man, indem man die Resultierende um 90° im Uhrzeigersinn dreht. Ergebnisse, die man kennen sollte: R2 Viertakt (beide im OT) – Kräfte aller Sorten doppelt, Momente null. R3 – alle Kräfte null, freie Momente 1. und 2. Ordnung, deshalb eine Ausgleichswelle mit Kurbelwellendrehzahl. R4 Viertakt – Kräfte rotierend und 1. Ordnung null, freie Kraft 2. Ordnung 4 · F_II,max, Momente null. Boxer-4 – Kräfte und Momente 1. Ordnung heben sich paarweise auf. R6 – vollständig ausgeglichen.',
          depthPoints: 10,
        },
        exercise(
          'EXERCISE:MK:R4',
          'Freie Kraft und Momente am Vierzylinder',
          'Viertakt-R4, je Zylinder m_os = 0,4 kg, r = 45 mm, λ = 0,28, n = 5400 min⁻¹, gleichmäßiger Zylinderabstand a = 90 mm. Bestimme F_I,max und F_II,max eines Zylinders, die resultierenden Kräfte 1. und 2. Ordnung sowie das Moment 2. Ordnung eines äußeren und eines inneren Zylinders und das resultierende Moment.',
          'ω = 2π · 90 = 565,5 s⁻¹. F_I,max = 0,4 · 0,045 · 565,5² ≈ 5,76 kN, F_II,max = 0,28 · 5,76 ≈ 1,61 kN. 1. Ordnung: 1 und 4 nach oben, 2 und 3 nach unten → Resultierende null. 2. Ordnung mit doppeltem Winkel: alle vier nach oben → 4 · 1,61 ≈ 6,45 kN. Hebel außen 1,5 · a = 135 mm: M = 1,61 kN · 0,135 m ≈ 218 Nm; innen 0,5 · a = 45 mm: ≈ 73 Nm. Zylinder 1 und 4 bzw. 2 und 3 haben gleiche Kräfte, aber entgegengesetzte Hebel → resultierendes Moment null. Abhilfe für die freie Kraft: zwei gegenläufige Ausgleichswellen mit 2n.',
        ),
        {
          id: 'QUIZ:MK:AUSGLEICH-MEHRZYLINDER',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Welcher Zündabstand ergibt sich bei einem Viertakt-Sechszylinder mit gleichmäßiger Zündfolge?',
              a: ['60°', '180°', '120°', '360°'],
              correct: 2,
              why: 'Ein Viertakter braucht für ein Arbeitsspiel zwei Umdrehungen, also 720°. Verteilt auf sechs Zylinder: 720°/6 = 120°.',
            },
            {
              q: 'Warum hat der Viertakt-R4 eine freie Kraft 2. Ordnung, aber kein freies Moment 2. Ordnung?',
              a: ['Weil die Kräfte 2. Ordnung zu klein sind, um ein Moment zu erzeugen.', 'Weil alle vier Kräfte 2. Ordnung gleichgerichtet sind, ihre Hebel zur Motormitte aber paarweise entgegengesetzt.', 'Weil das Schwungrad das Moment aufnimmt.', 'Weil die Zylinder 2 und 3 keine Kraft 2. Ordnung haben.'],
              correct: 1,
              why: 'Mit doppeltem Winkel zeigen OT- und UT-Zylinder gleich: Summe 4 · F_II. Zylinder 1 und 4 sitzen aber bei ±1,5a, 2 und 3 bei ±0,5a. Gleiche Kraft mal entgegengesetzter Hebel ergibt Momente, die sich aufheben.',
            },
            {
              q: 'Ein Dreizylinder-Reihenmotor hat ausgeglichene Massenkräfte. Wozu bekommt er trotzdem eine Ausgleichswelle mit Kurbelwellendrehzahl?',
              a: ['Um das freie Massenmoment 1. Ordnung auszugleichen, das den Motor um seine Querachse taumeln lässt.', 'Um die freie Kraft 2. Ordnung auszugleichen.', 'Um die Ölpumpe anzutreiben, mehr nicht.', 'Um die Drehungleichförmigkeit zu glätten.'],
              correct: 0,
              why: 'Beim R3 schließen sich die Kräftepläne, weil die Kurbeln um 120° versetzt sind. Die Zylinder liegen aber hintereinander auf unterschiedlichen Hebeln, die Momente heben sich nicht auf. Gegen das Moment 1. Ordnung hilft eine Welle mit versetzten Ausgleichsmassen, die gegenläufig mit Kurbelwellendrehzahl dreht.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },

    // ── 5 · Drehkraft und Schwungrad ─────────────────────────────────────────
    {
      id: 'UNIT:MK:DREHKRAFT',
      title: 'Drehkraftverlauf und Schwungrad',
      entryQuestion: 'Ein Einzylinder-Viertakter schiebt nur in einem von vier Takten. Woher nimmt er die Energie für die anderen drei?',
      takeaway: 'Das Schwungrad ist ein Energiespeicher: Es nimmt im Arbeitstakt auf, was es in den anderen Takten wieder hergibt.',
      sections: [
        {
          id: 'OBS:MK:STANDMOTOR',
          kind: 'observation',
          title: 'Der tuckernde Standmotor',
          summary:
            'Ein alter Einzylinder-Standmotor läuft mit hörbarem Tuck-tuck-tuck: Nach jedem Zündschlag wird er etwas schneller, dann dreht er sich über drei Takte langsamer. Sein Schwungrad ist riesig im Vergleich zum Motor. Ohne dieses Rad bliebe er im Verdichtungstakt stehen.',
          depthPoints: 5,
        },
        {
          id: 'EXPL:MK:DREHKRAFTDIAGRAMM',
          kind: 'explanation',
          title: 'Das Drehkraftdiagramm',
          summary:
            'Trägt man die Tangentialkraft T über dem Kurbelwinkel oder dem Weg des Kurbelzapfens auf, entsteht das Drehkraftdiagramm. Positive Drehkraft treibt die Kurbelwelle an, negative bremst sie. Die mittlere Drehkraft T_m ist der konstante Wert mit derselben Wirkung über das Arbeitsspiel; das mittlere Drehmoment ist M_m = T_m · r. Bei Mehrzylindermotoren werden die gegeneinander versetzten Verläufe überlagert, der Gesamtverlauf wird gleichmäßiger. In OT und UT ist die Drehkraft null.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:MK:SCHWUNGRAD',
          kind: 'explanation',
          title: 'Ungleichförmigkeitsgrad und Schwungrad',
          summary:
            'Liegt die Drehkraft über T_m, wird die Welle schneller und das Schwungrad nimmt Energie auf; liegt sie darunter, gibt es Energie ab. Energie = Kraft × Weg: E = (T − T_m) · r · Δα, mit Δα im Bogenmaß. Der Ungleichförmigkeitsgrad δ = (ω_max − ω_min)/ω_m ist der zulässige Drehzahlschwankungsbereich (Fahrzeugmotor etwa 1/200, Pumpen und Gebläse etwa 1/25). Aus E = Θ · ω_m² · δ folgt das nötige Massenträgheitsmoment Θ = E/(ω_m² · δ); für eine Vollscheibe gilt Θ = m · R²/2. Ein großes Schwungrad glättet die Drehzahl, macht den Motor aber träger beim Hochdrehen.',
          depthPoints: 9,
        },
        exercise(
          'EXERCISE:MK:SCHWUNGRAD',
          'Wie schwer muss das Schwungrad sein?',
          'Vereinfachter Drehkraftverlauf über eine Umdrehung: 0–180° T = +2400 N, 180–360° T = −600 N. Kurbelradius 60 mm, mittlere Drehzahl 3000 min⁻¹, zulässiger Ungleichförmigkeitsgrad δ = 1/50. Berechne T_m, M_m, die Speicherenergie E und die Masse einer Vollscheibe mit R = 150 mm.',
          'T_m = (2400 · 180 − 600 · 180)/360 = 900 N, M_m = 900 N · 0,06 m = 54 Nm. Nur zwischen 0 und 180° liegt T über T_m: E = (2400 − 900) N · π · 0,06 m ≈ 283 J. ω_m = 2π · 50 = 314,2 s⁻¹, Θ = 283/(314,2² · 0,02) ≈ 0,143 kg·m². m = 2Θ/R² = 2 · 0,143/0,0225 ≈ 12,7 kg. Bei 1500 min⁻¹ wäre bei gleichem δ das Vierfache nötig.',
        ),
        {
          id: 'QUIZ:MK:DREHKRAFT',
          kind: 'quiz',
          title: QUIZ_TITLE,
          summary: quiz([
            {
              q: 'Über eine Umdrehung wirkt 0–180° eine Drehkraft von +3000 N, 180–360° von −1000 N. Wie groß ist die mittlere Drehkraft?',
              a: ['2000 N', '1000 N', '4000 N', '1500 N'],
              correct: 1,
              why: 'T_m = (3000 · 180 − 1000 · 180)/360 = 1000 N. Die Flächen werden mit ihren Winkelbereichen gewichtet und vorzeichenrichtig addiert.',
            },
            {
              q: 'Warum braucht ein Einzylinder ein größeres Schwungrad als ein Sechszylinder gleicher Leistung?',
              a: ['Weil der Einzylinder langsamer dreht.', 'Weil der Sechszylinder keine Massenkräfte hat.', 'Weil sich beim Einzylinder die Arbeitstakte nicht überlagern und die Drehkraft stärker um den Mittelwert schwankt.', 'Weil der Einzylinder einen höheren Mitteldruck hat.'],
              correct: 2,
              why: 'Beim Sechszylinder folgt alle 120° ein Arbeitstakt, die Drehkraft liegt fast immer nahe T_m. Beim Einzylinder kommt alle 720° ein einziger Kraftstoß. Die zu speichernde Energie E ist viel größer, also auch das nötige Θ.',
            },
            {
              q: 'Ein Motor soll bei gleicher Speicherenergie und gleichem δ künftig mit doppelter mittlerer Drehzahl laufen. Wie ändert sich das nötige Massenträgheitsmoment?',
              a: ['Es halbiert sich.', 'Es verdoppelt sich.', 'Es bleibt gleich.', 'Es sinkt auf ein Viertel.'],
              correct: 3,
              why: 'Θ = E/(ω_m² · δ). Doppelte Drehzahl heißt vierfaches ω_m², also nur noch ein Viertel des Trägheitsmoments. Schnelllaufende Motoren kommen deshalb mit leichten Schwungrädern aus.',
            },
          ]),
          depthPoints: 9,
        },
      ],
    },
  ],
};

export const machineFundamentalsLearningPaths: LearningPath[] = [pistonMachineProcessLearningPath, crankTrainLearningPath];
