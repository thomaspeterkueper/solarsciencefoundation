export type LearningQuizQuestion = {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  /** Optional explanation shown after answering, authored as a sixth part starting with `?`. */
  explanation?: string;
};

export type LearningQuiz = [LearningQuizQuestion, LearningQuizQuestion, LearningQuizQuestion];

/**
 * Compact authoring format used by LearningPathSection.summary:
 * question||answer||correct answer*||answer||answer---...
 *
 * An optional sixth part `?Erklärung` carries the feedback for the question:
 * question||A||B*||C||D||?Warum B stimmt
 *
 * Canonical SSF governance requires exactly three questions
 * (Anwendung → Verständnis → Transfer), each with four options and
 * exactly one option marked with a trailing `*`.
 */
export function parseLearningQuiz(summary: string | undefined): LearningQuiz | null {
  if (!summary) return null;

  const blocks = summary.split('---').map((block) => block.trim()).filter(Boolean);
  if (blocks.length !== 3) return null;

  const questions: LearningQuizQuestion[] = [];
  for (const block of blocks) {
    const parts = block.split('||').map((part) => part.trim());
    if ((parts.length !== 5 && parts.length !== 6) || !parts[0]) return null;

    let explanation: string | undefined;
    if (parts.length === 6) {
      if (!parts[5].startsWith('?')) return null;
      explanation = parts[5].slice(1).trim();
      if (!explanation) return null;
    }

    const rawOptions = parts.slice(1, 5);
    const marked = rawOptions
      .map((option, index) => option.endsWith('*') ? index : -1)
      .filter((index) => index >= 0);
    if (marked.length !== 1) return null;

    const options = rawOptions.map((option) => option.endsWith('*') ? option.slice(0, -1).trim() : option.trim());
    if (options.some((option) => !option)) return null;

    questions.push({
      prompt: parts[0],
      options: options as [string, string, string, string],
      correctIndex: marked[0],
      ...(explanation ? { explanation } : {}),
    });
  }

  return questions as LearningQuiz;
}

export function scoreLearningQuiz(quiz: LearningQuiz, answers: readonly number[]): number {
  if (answers.length !== 3) return 0;
  return quiz.reduce((score, question, index) => score + (answers[index] === question.correctIndex ? 1 : 0), 0);
}
