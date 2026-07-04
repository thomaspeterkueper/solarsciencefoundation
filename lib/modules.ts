/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/modules.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/modules.ts
 * Name: modules - local didactic fallback registry
 * Version: 0.2.0
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
  summary: string;
  source: {
    authority: string;
    kxfEntityIds: string[];
  };
  unlocks: string[];
  exercises: Exercise[];
};

export const learningModules: LearningModule[] = [
  {
    id: 'SSF-MAT-0001',
    title: 'Numbers and place value',
    domain: 'Mathematics',
    difficulty: 0,
    durationMinutes: 7,
    summary:
      'A first mathematics module about digits, place value and why the position of a digit changes its value.',
    source: {
      authority: 'ssf-local-fallback',
      kxfEntityIds: ['CON:MAT:L0:numbers', 'CON:MAT:L0:place-value']
    },
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
      'A foundation module about addition as combining quantities and using it to count totals reliably.',
    source: {
      authority: 'ssf-local-fallback',
      kxfEntityIds: ['CON:MAT:L0:addition']
    },
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
      'A first multiplication module: equal groups, repeated addition and why multiplication is useful in science.',
    source: {
      authority: 'ssf-local-fallback',
      kxfEntityIds: ['CON:MAT:L0:multiplication']
    },
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
      'A foundation module about fractions: numerator, denominator and parts of one whole.',
    source: {
      authority: 'ssf-local-fallback',
      kxfEntityIds: ['CON:MAT:L1:fractions']
    },
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
      'A first percentage module: percent means per hundred and helps compare parts, rates and progress.',
    source: {
      authority: 'ssf-local-fallback',
      kxfEntityIds: ['CON:MAT:L1:percentages']
    },
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
  {
    id: 'SSF-PHY-1101',
    title: 'What is gravity?',
    domain: 'Physics',
    difficulty: 1,
    durationMinutes: 8,
    summary:
      'A short foundation module about gravity as attraction between masses and as the basis for orbits, falling bodies and space navigation.',
    source: {
      authority: 'kueper-knowledge-graph',
      kxfEntityIds: ['CON:L1:gravitation', 'CON:L1:orbitalmechanik']
    },
    unlocks: ['UNL:NOX:orbital-navigation'],
    exercises: [
      {
        id: 'EX:SSF-PHY-1101:001',
        type: 'single_choice',
        question: 'What does gravity do between masses?',
        options: ['It repels them.', 'It attracts them.', 'It removes inertia.', 'It creates light.'],
        correctOption: 1
      },
      {
        id: 'EX:SSF-PHY-1101:002',
        type: 'single_choice',
        question: 'Why is gravity important for NOXIA orbital navigation?',
        options: [
          'Because routes depend on orbital motion.',
          'Because ships do not need fuel.',
          'Because stations cannot move.',
          'Because planets have no mass.'
        ],
        correctOption: 0
      }
    ]
  },
  {
    id: 'TM2-COMB-001',
    title: 'Überlagerung von Spannungen',
    domain: 'Engineering',
    difficulty: 3,
    durationMinutes: 60,
    summary:
      'Normalspannungen aus Normalkraft und Biegung werden punktweise addiert. Schubspannungen werden je nach Richtung addiert oder vektoriell überlagert; Normal- und Schubspannung führen gemeinsam zum Spannungszustand.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:stress-superposition', 'CON:TM:eccentric-load', 'CON:TM:biaxial-bending']
    },
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
      'Ein dünnwandiger Zylinder unter Innendruck besitzt Längsspannung und Umfangsspannung. Die Umfangsspannung ist doppelt so groß wie die Längsspannung und beide liegen in schubspannungsfreien Hauptschnitten.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:pressure-vessel', 'CON:TM:hoop-stress', 'CON:TM:longitudinal-stress']
    },
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
      'Spannung hängt von der Schnittrichtung ab. Ein Punkt besitzt keinen einzelnen Spannungswert, sondern einen ebenen Spannungszustand aus Normalspannungen und Schubspannung.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:stress-state', 'CON:TM:inclined-section', 'CON:TM:stress-transformation']
    },
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
      'Hauptspannungen sind die Extremwerte der Normalspannung. Der Mohrsche Kreis zeigt Mittelpunkt, Radius, maximale Schubspannung und die Beziehung zwischen Bauteildrehung und Spannungszustand.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:principal-stress', 'CON:TM:principal-direction', 'CON:TM:mohr-circle']
    },
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
      'Bei Wellen treffen am Rand maximale Biegespannung und maximale Torsionsschubspannung zusammen, während Querkraftschub dort verschwindet. Daraus wird der kritische Spannungszustand aufgebaut.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:shaft', 'CON:TM:critical-point', 'CON:TM:bending-and-torsion']
    },
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
      'Das Modul behandelt Querkontraktion, Hooke für mehrachsige Spannungszustände und DMS-Rosetten als experimentellen Zugang zur Bestimmung von Dehnungs- und Spannungszuständen.',
    source: {
      authority: 'ssf-local-module-yaml',
      kxfEntityIds: ['CON:TM:multiaxial-hooke-law', 'CON:TM:poisson-contraction', 'CON:TM:strain-gauge-rosette']
    },
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
