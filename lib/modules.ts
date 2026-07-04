/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/modules.ts
 * Repo: github.com/thomaspeterkueper/SolarScienceFoundation/blob/main/lib/modules.ts
 * Name: modules - local didactic content registry
 * Version: 0.3.0
 * Created: 2026-06-26
 * Modified: 2026-07-04
 * Depends: none
 */

export type Exercise = {
  id: string;
  type: 'single_choice';
  question: string;
  options: string[];
  correctOption: number;
};

export type LearningModule = {
  id: string;
  title: string;
  domain: string;
  difficulty: number;
  durationMinutes: number;
  // summary is the entry question — the first thing a visitor reads.
  // It should open curiosity, not describe content.
  summary: string;
  source: {
    authority: string;
    kxfEntityIds: string[];
  };
  unlocks: string[];
  exercises: Exercise[];
};

export const learningModules: LearningModule[] = [

  // ── Mathematik ──────────────────────────────────────────────────────────────

  {
    id: 'SSF-MAT-0001',
    title: 'Numbers and place value',
    domain: 'Mathematics',
    difficulty: 0,
    durationMinutes: 7,
    summary:
      'Warum ist die 7 in 472 nicht dasselbe wie die 7 in 72 — obwohl es dieselbe Ziffer ist?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L0:numbers', 'CON:MAT:L0:place-value'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:SSF-MAT-0001:001',
        type: 'single_choice',
        question: 'In the number 472, what does the digit 7 represent?',
        options: ['7 ones', '7 tens', '7 hundreds', '7 thousands'],
        correctOption: 1
      },
      {
        id: 'EX:SSF-MAT-0001:002',
        type: 'single_choice',
        question: 'Why does place value matter?',
        options: [
          'Because every digit always has the same value.',
          'Because the position of a digit changes its value.',
          'Because only the first digit counts.',
          'Because numbers cannot be compared.'
        ],
        correctOption: 1
      }
    ]
  },

  {
    id: 'SSF-MAT-0002',
    title: 'Addition as combining quantities',
    domain: 'Mathematics',
    difficulty: 0,
    durationMinutes: 7,
    summary:
      'Wenn du 6 Äpfel und 4 Orangen hast — was genau passiert, wenn du beide zusammenzählst?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L0:addition'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:SSF-MAT-0002:001',
        type: 'single_choice',
        question: 'What does addition usually describe?',
        options: ['Combining quantities', 'Splitting equally', 'Measuring angles', 'Finding roots'],
        correctOption: 0
      },
      {
        id: 'EX:SSF-MAT-0002:002',
        type: 'single_choice',
        question: 'Which expression means 6 combined with 4?',
        options: ['6 - 4', '6 + 4', '6 / 4', '6 × 4'],
        correctOption: 1
      }
    ]
  },

  {
    id: 'SSF-MAT-0003',
    title: 'Multiplication as repeated addition',
    domain: 'Mathematics',
    difficulty: 0,
    durationMinutes: 8,
    summary:
      'Vier Schachteln, drei Äpfel pro Schachtel — warum reicht eine einzige Rechnung statt vier?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L0:multiplication'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:SSF-MAT-0003:001',
        type: 'single_choice',
        question: 'What does 4 × 3 mean in equal groups?',
        options: ['4 groups of 3', '4 minus 3', '4 divided by 3', '4 and 3 written together'],
        correctOption: 0
      },
      {
        id: 'EX:SSF-MAT-0003:002',
        type: 'single_choice',
        question: 'Which repeated addition matches 5 × 2?',
        options: ['5 + 2', '2 + 2 + 2 + 2 + 2', '5 - 2', '5 + 5 + 5 + 5 + 5'],
        correctOption: 1
      }
    ]
  },

  {
    id: 'SSF-MAT-0004',
    title: 'Fractions as parts of a whole',
    domain: 'Mathematics',
    difficulty: 1,
    durationMinutes: 10,
    summary:
      'Du teilst eine Pizza in 4 Stücke und nimmst 3 — wie schreibt man das, ohne zu zeichnen?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L1:fractions'] },
    unlocks: ['UNL:NOX:basic-ratio-thinking'],
    exercises: [
      {
        id: 'EX:SSF-MAT-0004:001',
        type: 'single_choice',
        question: 'In the fraction 3/4, what does the denominator 4 tell you?',
        options: ['The number of selected parts', 'The number of equal parts in the whole', 'The result of addition', 'The unit of time'],
        correctOption: 1
      },
      {
        id: 'EX:SSF-MAT-0004:002',
        type: 'single_choice',
        question: 'Which fraction means one half?',
        options: ['1/2', '2/1', '1/3', '3/2'],
        correctOption: 0
      }
    ]
  },

  {
    id: 'SSF-MAT-0005',
    title: 'Percentages as hundredths',
    domain: 'Mathematics',
    difficulty: 1,
    durationMinutes: 10,
    summary:
      'Ein Laden bietet 25% Rabatt. Ein anderer 1/4 Rabatt. Welches Angebot ist besser — oder sind beide gleich?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L1:percentages'] },
    unlocks: ['UNL:NOX:efficiency-readouts'],
    exercises: [
      {
        id: 'EX:SSF-MAT-0005:001',
        type: 'single_choice',
        question: 'What does 25% mean?',
        options: ['25 per thousand', '25 per hundred', '25 plus 100', '100 divided by 25 only'],
        correctOption: 1
      },
      {
        id: 'EX:SSF-MAT-0005:002',
        type: 'single_choice',
        question: 'Which fraction is equal to 50%?',
        options: ['1/2', '1/4', '3/4', '1/10'],
        correctOption: 0
      }
    ]
  },

  // ── SSF-MAT-1001 (KG: MAT-1001 "Zahlen und Muster") ────────────────────────
  {
    id: 'SSF-MAT-1001',
    title: 'Zahlen und Muster',
    domain: 'Mathematics',
    difficulty: 1,
    durationMinutes: 30,
    summary:
      'Warum sehen Schuppen einer Tannenzapfen, Spiralen einer Sonnenblume und Kurven einer Muschel so ähnlich aus — obwohl sie nichts voneinander wissen?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L1:numbers', 'CON:MAT:L1:patterns'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:SSF-MAT-1001:001',
        type: 'single_choice',
        question: 'Was haben die Fibonacci-Zahlen (1, 1, 2, 3, 5, 8, 13 …) mit der Natur zu tun?',
        options: [
          'Nichts — sie sind rein abstrakt.',
          'Sie beschreiben, wie sich viele Wachstumsmuster in der Natur aufbauen.',
          'Sie gelten nur für Spiralen im Weltall.',
          'Sie wurden erst im 20. Jahrhundert entdeckt.'
        ],
        correctOption: 1
      },
      {
        id: 'EX:SSF-MAT-1001:002',
        type: 'single_choice',
        question: 'Was ist ein Muster in der Mathematik?',
        options: [
          'Eine zufällige Anordnung ohne Regel.',
          'Eine sich wiederholende oder regelmäßige Struktur, die sich beschreiben lässt.',
          'Immer eine Symmetrie um eine Achse.',
          'Nur etwas Visuelles, kein mathematisches Konzept.'
        ],
        correctOption: 1
      }
    ]
  },

  // ── SSF-MAT-1002 (KG: MAT-1002 "Algebra Grundlagen") ──────────────────────
  {
    id: 'SSF-MAT-1002',
    title: 'Algebra Grundlagen',
    domain: 'Mathematics',
    difficulty: 1,
    durationMinutes: 30,
    summary:
      'Jeder Rabatt, jeder Zins, jede Gleichgewichtsberechnung folgt demselben Prinzip — warum reicht dafür ein einziger Buchstabe?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:MAT:L1:algebra', 'CON:MAT:L1:variables'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:SSF-MAT-1002:001',
        type: 'single_choice',
        question: 'Was bedeutet es, wenn in einer Gleichung ein Buchstabe wie x steht?',
        options: [
          'Der Buchstabe ist nur ein Platzhalter ohne Bedeutung.',
          'Der Buchstabe steht für eine unbekannte Zahl, die wir suchen oder beschreiben.',
          'Der Buchstabe bedeutet immer 10.',
          'Buchstaben kommen nur in der Geometrie vor.'
        ],
        correctOption: 1
      },
      {
        id: 'EX:SSF-MAT-1002:002',
        type: 'single_choice',
        question: 'Ein T-Shirt kostet x Euro. Du kaufst 3 davon. Wie schreibt man den Gesamtpreis?',
        options: ['x + 3', 'x − 3', '3x', 'x / 3'],
        correctOption: 2
      },
      {
        id: 'EX:SSF-MAT-1002:003',
        type: 'single_choice',
        question: 'Was beschreibt die Algebra grundsätzlich?',
        options: [
          'Ausschließlich Dreiecke und Winkel.',
          'Strukturen und Regeln, die für viele konkrete Zahlen gleichzeitig gelten.',
          'Nur Berechnungen mit sehr großen Zahlen.',
          'Die Schreibweise von Dezimalzahlen.'
        ],
        correctOption: 1
      }
    ]
  },

  // ── Physik ───────────────────────────────────────────────────────────────────

  {
    id: 'SSF-PHY-1101',
    title: 'Was ist Schwerkraft?',
    domain: 'Physics',
    difficulty: 1,
    durationMinutes: 8,
    summary:
      'Warum fällt ein Apfel nicht zur Seite — und warum bleibt der Mond trotzdem oben?',
    source: { authority: 'ssf-local', kxfEntityIds: ['CON:L1:gravitation', 'CON:L1:orbitalmechanik'] },
    unlocks: ['UNL:NOX:orbital-navigation'],
    exercises: [
      {
        id: 'EX:SSF-PHY-1101:001',
        type: 'single_choice',
        question: 'Was bewirkt Schwerkraft zwischen zwei Massen?',
        options: [
          'Sie stoßen sich ab.',
          'Sie ziehen sich an.',
          'Sie bewegen sich immer in gerader Linie voneinander weg.',
          'Schwerkraft wirkt nur auf der Erde.'
        ],
        correctOption: 1
      },
      {
        id: 'EX:SSF-PHY-1101:002',
        type: 'single_choice',
        question: 'Warum fällt der Mond nicht auf die Erde, obwohl die Erde ihn anzieht?',
        options: [
          'Weil der Mond zu weit entfernt ist, um angezogen zu werden.',
          'Weil seine Seitwärtsbewegung ihn immer wieder am Fallen vorbeibringt — er ist ständig im freien Fall.',
          'Weil der Mond leichter als Luft ist.',
          'Weil die Sonne den Mond abstößt.'
        ],
        correctOption: 1
      }
    ]
  },

  // ── Engineering TM2 (unverändert — gut formuliert) ───────────────────────────

  {
    id: 'TM2-COMB-001',
    title: 'Überlagerung von Spannungen',
    domain: 'Engineering',
    difficulty: 3,
    durationMinutes: 60,
    summary:
      'Wann darf man Spannungen einfach addieren — und wann entsteht stattdessen ein Spannungszustand?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:stress-superposition'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-COMB-001:001',
        type: 'single_choice',
        question: 'Welche Spannungen dürfen bei zusammengesetzter Beanspruchung direkt skalar addiert werden?',
        options: [
          'Normalspannung und Schubspannung immer direkt zusammen',
          'Gleichartige Spannungen mit gleicher Richtung',
          'Nur Torsionsspannungen',
          'Nur Spannungen aus Druckbehältern'
        ],
        correctOption: 1
      },
      {
        id: 'EX:TM2-COMB-001:002',
        type: 'single_choice',
        question: 'Wie modelliert man eine außermittig angreifende Zugkraft im Schwerpunkt?',
        options: [
          'Als reine Querkraft',
          'Als mittige Kraft plus ergänzende Momente',
          'Als reine Torsion',
          'Als spannungsfreien Zustand'
        ],
        correctOption: 1
      }
    ]
  },

  {
    id: 'TM2-PRESS-001',
    title: 'Dünnwandige Druckbehälter und Kesselformeln',
    domain: 'Engineering',
    difficulty: 3,
    durationMinutes: 45,
    summary:
      'Warum ist die Umfangsspannung beim Kessel doppelt so groß wie die Längsspannung?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:pressure-vessel'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-PRESS-001:001',
        type: 'single_choice',
        question: 'Welche Spannung ist beim dünnwandigen Zylinder unter Innendruck größer?',
        options: ['Die Längsspannung', 'Die Umfangsspannung', 'Beide sind immer null', 'Die Querkraftspannung'],
        correctOption: 1
      },
      {
        id: 'EX:TM2-PRESS-001:002',
        type: 'single_choice',
        question: 'Warum können σt und σl beim Kessel direkt als Hauptspannungen betrachtet werden?',
        options: [
          'Weil auf diesen Schnitten keine Schubspannung wirkt',
          'Weil Druck keine Spannung erzeugt',
          'Weil sie immer negativ sind',
          'Weil Wanddicke und Durchmesser gleich sind'
        ],
        correctOption: 0
      }
    ]
  },

  {
    id: 'TM2-STRESS-001',
    title: 'Spannungszustand im Punkt',
    domain: 'Engineering',
    difficulty: 3,
    durationMinutes: 75,
    summary:
      'Warum gibt es nicht die eine Spannung im Punkt — sondern immer einen ganzen Zustand?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:stress-state'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-STRESS-001:001',
        type: 'single_choice',
        question: 'Was zeigt ein schräger Schnitt durch einen Zugstab?',
        options: [
          'Nur Normalkraft, aber keine Spannung',
          'Normal- und Schubspannungsanteile',
          'Immer nur Torsion',
          'Immer nur Druckspannung'
        ],
        correctOption: 1
      },
      {
        id: 'EX:TM2-STRESS-001:002',
        type: 'single_choice',
        question: 'Welche Größen beschreiben den ebenen Spannungszustand typischerweise?',
        options: ['σx, σy und τxy', 'Nur die Dichte', 'Nur die Temperatur', 'Nur die Länge des Bauteils'],
        correctOption: 0
      }
    ]
  },

  {
    id: 'TM2-PRINCIPAL-001',
    title: 'Hauptspannungen und Mohrscher Kreis',
    domain: 'Engineering',
    difficulty: 4,
    durationMinutes: 90,
    summary:
      'In welcher Richtung wird die Normalspannung maximal — und wie sieht man das ohne zu rechnen?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:principal-stress'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-PRINCIPAL-001:001',
        type: 'single_choice',
        question: 'Was kennzeichnet einen Hauptschnitt?',
        options: [
          'Die Schubspannung ist dort null',
          'Die Normalspannung ist dort immer null',
          'Er liegt immer parallel zur Gewichtskraft',
          'Er existiert nur bei Druckbehältern'
        ],
        correctOption: 0
      },
      {
        id: 'EX:TM2-PRINCIPAL-001:002',
        type: 'single_choice',
        question: 'Was entspricht der maximalen Schubspannung im Mohrschen Kreis?',
        options: ['Dem Radius', 'Dem Durchmesser des Bauteils', 'Der Wanddicke', 'Der Summe aller Kräfte'],
        correctOption: 0
      }
    ]
  },

  {
    id: 'TM2-COMB-002',
    title: 'Biegung und Torsion an Wellen',
    domain: 'Engineering',
    difficulty: 4,
    durationMinutes: 75,
    summary:
      'Warum ist der Randpunkt einer Welle bei gleichzeitiger Biegung und Torsion der gefährlichste Ort?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:shaft'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-COMB-002:001',
        type: 'single_choice',
        question: 'Wo liegt bei Biegung und Torsion einer Rundwelle typischerweise der kritische Punkt?',
        options: ['Am Rand oben oder unten', 'Immer exakt im Schwerpunkt', 'Außerhalb des Bauteils', 'Nur an der neutralen Faser'],
        correctOption: 0
      },
      {
        id: 'EX:TM2-COMB-002:002',
        type: 'single_choice',
        question: 'Welche Schubspannung ist am Rand bei der klassischen Wellenaufgabe relevant?',
        options: ['Torsionsschubspannung', 'Querkraftschubspannung als Maximum', 'Keine Schubspannung', 'Nur hydrostatischer Druck'],
        correctOption: 0
      }
    ]
  },

  {
    id: 'TM2-STRAIN-001',
    title: 'Mehrachsige Dehnung, Hooke und DMS',
    domain: 'Engineering',
    difficulty: 4,
    durationMinutes: 60,
    summary:
      'Wie kommt man von drei gemessenen Dehnungen am Bauteil zu den tatsächlichen Spannungen?',
    source: { authority: 'ssf-local-module-yaml', kxfEntityIds: ['CON:TM:multiaxial-hooke-law'] },
    unlocks: [],
    exercises: [
      {
        id: 'EX:TM2-STRAIN-001:001',
        type: 'single_choice',
        question: 'Was beschreibt die Querkontraktionszahl?',
        options: [
          'Die Kopplung zwischen Längsdehnung und Querdehnung',
          'Den Durchmesser eines Mohrschen Kreises',
          'Die Anzahl der Lagerkräfte',
          'Die Dichte eines Werkstoffs'
        ],
        correctOption: 0
      },
      {
        id: 'EX:TM2-STRAIN-001:002',
        type: 'single_choice',
        question: 'Wozu dient eine DMS-Rosette?',
        options: [
          'Zur Erfassung des ebenen Dehnungszustands aus mehreren Messrichtungen',
          'Nur zur Farbmessung',
          'Zum Ersetzen der Gleichgewichtsbedingungen',
          'Zur Vermeidung jeder Spannung'
        ],
        correctOption: 0
      }
    ]
  }

];

export function getModuleById(id: string) {
  return learningModules.find((module) => module.id === id) ?? null;
}
