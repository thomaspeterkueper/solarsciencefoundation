// Evidence levels for learning-path sections. Kept separate from lib/learningPaths.ts
// so client components can import the labels without bundling path data.
// Rules: docs/SSF-BELEGSTUFEN.md

export type LearningEvidenceLevel = 'quelle' | 'forschung' | 'rekonstruktion';

export const LEARNING_EVIDENCE_LABELS: Record<LearningEvidenceLevel, { label: string; description: string }> = {
  quelle: { label: 'Quellenbefund', description: 'Das sagt ein historischer Text, Fund oder eine Inschrift selbst.' },
  forschung: { label: 'Forschungsdeutung', description: 'Das leitet die Forschung aus den Quellen ab; Einzelheiten können umstritten sein.' },
  rekonstruktion: { label: 'Didaktische Rekonstruktion', description: 'Modell, Aufgabe oder Versuch der SSF – kein Nachweis, dass historisch genau so gearbeitet wurde.' },
};
