export type SequenceInteraction = {
  type: 'sequence';
  sequence: number[];
  answers: number[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type DidacticInteraction = SequenceInteraction;

const interactions: Record<string, DidacticInteraction> = {
  'MAT-L0-000001': {
    type: 'sequence',
    sequence: [3, 6, 9, 12],
    answers: [15, 18],
    correctFeedback: 'Genau. Die Folge wächst von Schritt zu Schritt immer um 3.',
    incorrectFeedback: 'Noch nicht ganz. Vergleiche den Abstand zwischen zwei benachbarten Zahlen.'
  }
};

export function getDidacticInteraction(moduleId: string): DidacticInteraction | undefined {
  return interactions[moduleId.toUpperCase()];
}
