import type { LearningPath } from './learningPaths';
import { parseLearningQuiz } from './learningQuiz';

export type NoxiaAssessmentItem = {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

/**
 * Translates the governed Kurztests (`kind: 'quiz'`, see lib/learningQuiz.ts)
 * of a learning path into the machine-readable assessment NOXIA grades against.
 * Questions without an authored explanation fall back to the correct answer
 * plus the unit takeaway, so NOXIA can always show feedback.
 */
export function pathAssessment(path: LearningPath): NoxiaAssessmentItem[] {
  const items: NoxiaAssessmentItem[] = [];
  for (const unit of path.units) {
    for (const section of unit.sections) {
      if (section.kind !== 'quiz') continue;
      const quiz = parseLearningQuiz(section.summary);
      if (!quiz) continue;
      for (const question of quiz) {
        const fallback = [`Richtig: ${question.options[question.correctIndex]}.`, unit.takeaway].filter(Boolean).join(' ');
        items.push({
          type: 'multiple_choice',
          question: question.prompt,
          options: [...question.options],
          correctOption: question.correctIndex,
          explanation: question.explanation ?? fallback,
        });
      }
    }
  }
  return items;
}
