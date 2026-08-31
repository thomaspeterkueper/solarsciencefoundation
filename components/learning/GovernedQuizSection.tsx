'use client';

import { useState } from 'react';
import type { LearningPathSection } from '../../lib/learningPaths';
import { parseLearningQuiz, scoreLearningQuiz } from '../../lib/learningQuiz';
import styles from './PathRunner.module.css';

type Props = {
  section: LearningPathSection;
  onComplete: () => void;
  onDepth: (pts: number) => void;
};

export default function GovernedQuizSection({ section, onComplete, onDepth }: Props) {
  const quiz = parseLearningQuiz(section.summary);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);

  if (!quiz) {
    return (
      <div className={styles.quizSection}>
        <p className={styles.quizQuestion}>Kurztest noch nicht freigegeben.</p>
        <p className={styles.quizFeedback}>
          Dieser Abschnitt enthält noch keinen gültigen SSF-Kurztest mit drei Fragen und je vier Antwortmöglichkeiten. Er schaltet deshalb keine Kompetenz frei.
        </p>
      </div>
    );
  }

  function choose(questionIndex: number, optionIndex: number) {
    if (passed) return;
    setAnswers((current) => current.map((answer, index) => index === questionIndex ? optionIndex : answer));
    setScore(null);
  }

  function evaluate() {
    if (answers.some((answer) => answer === null) || passed) return;
    const result = scoreLearningQuiz(quiz, answers as number[]);
    setScore(result);
    if (result === 3) {
      setPassed(true);
      onDepth(section.depthPoints ?? 5);
      onComplete();
    }
  }

  function retry() {
    setAnswers([null, null, null]);
    setScore(null);
  }

  return (
    <div className={styles.quizSection}>
      {quiz.map((question, questionIndex) => (
        <div key={questionIndex}>
          <p className={styles.quizQuestion}>{questionIndex + 1}. {question.prompt}</p>
          <div className={styles.quizOptions}>
            {question.options.map((option, optionIndex) => {
              const selected = answers[questionIndex] === optionIndex;
              const revealCorrect = score !== null && optionIndex === question.correctIndex;
              const revealWrong = score !== null && selected && optionIndex !== question.correctIndex;
              return (
                <button
                  key={optionIndex}
                  type="button"
                  disabled={passed}
                  aria-pressed={selected}
                  className={[
                    styles.quizOption,
                    selected && score === null ? styles.locked : '',
                    revealCorrect ? styles.correct : '',
                    revealWrong ? styles.wrong : '',
                    passed ? styles.locked : '',
                  ].join(' ')}
                  onClick={() => choose(questionIndex, optionIndex)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!passed && score === null && (
        <button type="button" onClick={evaluate} disabled={answers.some((answer) => answer === null)}>
          Antworten prüfen
        </button>
      )}

      {score !== null && score < 3 && (
        <div>
          <p className={[styles.quizFeedback, styles.wrong].join(' ')}>
            {score}/3 richtig. Für den Kompetenznachweis müssen alle drei Antworten stimmen.
          </p>
          <button type="button" onClick={retry}>Noch einmal versuchen</button>
        </div>
      )}

      {passed && (
        <p className={[styles.quizFeedback, styles.correct].join(' ')}>
          ✓ 3/3 richtig — Kompetenznachweis bestanden.
        </p>
      )}
    </div>
  );
}
