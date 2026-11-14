/**
 * Authoring helper for SSF Kurztests (docs/SSF-QUIZ-RICHTLINIEN.md).
 * Builds the compact string format read by lib/learningQuiz.ts, including the
 * optional explanation (`||?Erklärung`) that NOXIA shows after each answer.
 */
export type QuizQuestion = {
  q: string;
  /** Vier Antworten; die richtige steht an Position `correct`. */
  a: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  why: string;
};

export type QuizTriple = [QuizQuestion, QuizQuestion, QuizQuestion];

export function quiz(questions: QuizTriple): string {
  return questions
    .map(({ q, a, correct, why }) => {
      const options = a.map((option, index) => (index === correct ? `${option}*` : option));
      return [q, ...options, `?${why}`].join('||');
    })
    .join('---');
}

/** Kurzform für Fragen in Ersatz-Kurztests (siehe quizRepairs.ts). */
export const q = (question: string, a: QuizQuestion['a'], correct: QuizQuestion['correct'], why: string): QuizQuestion => ({ q: question, a, correct, why });
