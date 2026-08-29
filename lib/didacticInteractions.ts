export type SequenceInteraction = {
  type: 'sequence';
  sequence: number[];
  answers: number[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type NumericField = {
  label: string;
  answer: number;
  suffix?: string;
};

export type NumericFieldsInteraction = {
  type: 'numeric-fields';
  fields: NumericField[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type DidacticInteraction = SequenceInteraction | NumericFieldsInteraction;

const interactions: Record<string, DidacticInteraction> = {
  'MAT-L0-000001': {
    type: 'sequence',
    sequence: [3, 6, 9, 12],
    answers: [15, 18],
    correctFeedback: 'Genau. Die Folge wächst von Schritt zu Schritt immer um 3.',
    incorrectFeedback: 'Noch nicht ganz. Vergleiche den Abstand zwischen zwei benachbarten Zahlen.'
  },
  'MAT-L1-000001': {
    type: 'numeric-fields',
    fields: [
      { label: 'g(0)', answer: -2 },
      { label: 'g(2)', answer: 4 },
      { label: 'g(5)', answer: 13 }
    ],
    correctFeedback: 'Richtig. Du hast die Funktionsregel 3x - 2 auf alle drei Eingabewerte korrekt angewendet.',
    incorrectFeedback: 'Noch nicht ganz. Setze jeden Wert einzeln für x ein: zuerst mit 3 multiplizieren, danach 2 abziehen.'
  },
  'MAT-L1-000002': {
    type: 'numeric-fields',
    fields: [
      { label: 'Mittelwert', answer: 6 },
      { label: 'Median', answer: 3 }
    ],
    correctFeedback: 'Genau. Der Mittelwert ist 6, der Median 3. Der Ausreißer 18 zieht den Mittelwert deutlich nach oben.',
    incorrectFeedback: 'Prüfe beide Kennzahlen getrennt: Für den Mittelwert alle Werte addieren und durch 5 teilen; für den Median den mittleren sortierten Wert wählen.'
  },
  'MAT-L1-000003': {
    type: 'numeric-fields',
    fields: [
      { label: 'P(Blau)', answer: 60, suffix: '%' }
    ],
    correctFeedback: 'Richtig. 3 von 5 Kugeln sind blau: 3/5 = 0,6 = 60 %.',
    incorrectFeedback: 'Noch nicht ganz. Es gibt 5 Kugeln insgesamt und davon 3 blaue. Teile die günstigen durch alle möglichen Fälle.'
  }
};

export function getDidacticInteraction(moduleId: string): DidacticInteraction | undefined {
  return interactions[moduleId.toUpperCase()];
}
