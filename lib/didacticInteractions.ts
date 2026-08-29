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

export type ChoiceField = {
  label: string;
  options: string[];
  correctOption: number;
};

export type ChoiceFieldsInteraction = {
  type: 'choice-fields';
  fields: ChoiceField[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type DidacticInteraction = SequenceInteraction | NumericFieldsInteraction | ChoiceFieldsInteraction;

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
  },
  'PHY-L1-000001': {
    type: 'choice-fields',
    fields: [
      { label: 'Tonhöhe', options: ['gleich', 'verschieden'], correctOption: 0 },
      { label: 'Lautstärke', options: ['gleich', 'verschieden'], correctOption: 1 },
      { label: 'Größere Amplitude klingt', options: ['leiser', 'lauter'], correctOption: 1 }
    ],
    correctFeedback: 'Genau. Gleiche Frequenz bedeutet gleiche Tonhöhe. Unterschiedliche Amplitude bedeutet unterschiedliche Lautstärke; die größere Amplitude wird lauter wahrgenommen.',
    incorrectFeedback: 'Ordne die Begriffe noch einmal zu: Frequenz bestimmt die Tonhöhe, Amplitude die Stärke der Schwingung.'
  },
  'CHE-L1-000001': {
    type: 'choice-fields',
    fields: [
      { label: 'Wasser ist überwiegend', options: ['polar', 'unpolar'], correctOption: 0 },
      { label: 'Speiseöl ist überwiegend', options: ['polar', 'unpolar'], correctOption: 1 },
      { label: 'Darum mischen sich beide', options: ['gut', 'nur schlecht'], correctOption: 1 }
    ],
    correctFeedback: 'Richtig. Wasser ist polar, typische Ölmoleküle sind überwiegend unpolar. Deshalb sind günstige Wechselwirkungen zwischen beiden Stoffen begrenzt und sie trennen sich.',
    incorrectFeedback: 'Prüfe zuerst die Polarität beider Stoffe. Wasser bevorzugt Wechselwirkungen mit geladenen oder polaren Teilchen.'
  },
  'AST-L1-000001': {
    type: 'choice-fields',
    fields: [
      { label: 'Bei gleichem Radius ist das Volumen', options: ['gleich', 'verschieden'], correctOption: 0 },
      { label: 'Planet A hat bei doppelter Masse die Dichte', options: ['halb so groß', 'gleich groß', 'doppelt so groß'], correctOption: 2 },
      { label: 'Das kann auf mehr', options: ['dichte Materialien', 'leere Räume', 'leichte Gase allein'], correctOption: 0 }
    ],
    correctFeedback: 'Genau. Bei gleichem Radius ist das Volumen gleich. Doppelte Masse bei gleichem Volumen bedeutet doppelte mittlere Dichte und kann auf einen höheren Anteil dichter Materialien hindeuten.',
    incorrectFeedback: 'Nutze ρ = m/V: Gleicher Radius bedeutet gleiches Volumen. Vergleiche dann nur noch die Massen.'
  }
};

export function getDidacticInteraction(moduleId: string): DidacticInteraction | undefined {
  return interactions[moduleId.toUpperCase()];
}
