'use client';

import { useMemo, useState } from 'react';
import type { LearningPath } from '../../lib/learningPaths';
import {
  MaillardAromaExperiment,
  MaillardCookingExperiment,
  MaillardPhExperiment,
  MaillardReactantsExperiment,
  MaillardTemperatureExperiment,
  MaillardTimeExperiment,
} from './MaillardExperiment';
import styles from './MaillardJourney.module.css';

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const quizzes: Question[][] = [
  [
    {
      question: 'Warum bräunt eine nasse Oberfläche zunächst schlecht?',
      options: ['Wasser hält die Oberfläche zunächst nahe am Siedepunkt', 'Wasser entfernt alle Zucker', 'Wasser zerstört Proteine sofort', 'Nasse Lebensmittel enthalten keine Aminosäuren'],
      correct: 0,
      explanation: 'Solange Wasser verdampft, wird viel Energie dafür verbraucht. Die Oberfläche wird erst nach dem Trocknen deutlich heißer.',
    },
    {
      question: 'Welche Stoffgruppen reagieren bei der Maillard-Reaktion miteinander?',
      options: ['Fette und Wasser', 'Aminosäuren und reduzierende Zucker', 'Salz und Sauerstoff', 'Mineralien und Stärke'],
      correct: 1,
      explanation: 'Aminosäuren aus Proteinen und reduzierende Zucker bilden den Ausgangspunkt des Reaktionsnetzes.',
    },
    {
      question: 'Was beschreibt die Aussage „ab etwa 140 °C“ am besten?',
      options: ['Eine harte Ein-Aus-Grenze', 'Einen Bereich, in dem die Reaktion bei vielen Lebensmitteln deutlich sichtbar wird', 'Den Siedepunkt jedes Lebensmittels', 'Die Temperatur, bei der alles verbrennt'],
      correct: 1,
      explanation: 'Die Reaktion läuft auch darunter, aber meist viel langsamer. Temperatur wirkt auf die Geschwindigkeit, nicht wie ein Schalter.',
    },
  ],
  [
    {
      question: 'Warum schmeckt gebratenes Fleisch anders als gekochtes?',
      options: ['Beim Braten kann die trockene Oberfläche heißer werden', 'Wasser entfernt alle Aromen', 'Braten fügt automatisch Zucker hinzu', 'Kochen verändert keine Moleküle'],
      correct: 0,
      explanation: 'Die höhere Oberflächentemperatur eröffnet Reaktionswege, die beim Kochen in Wasser kaum ablaufen.',
    },
    {
      question: 'Welche Beobachtung spricht für Maillard-Reaktionen?',
      options: ['Eine braune Brotkruste mit Röstaroma', 'Schmelzendes Eis', 'Salz, das sich löst', 'Wasser, das kondensiert'],
      correct: 0,
      explanation: 'Brotkruste enthält Zucker und Aminosäuren; beim Backen entstehen Farbe und Röstaromen.',
    },
    {
      question: 'Was passiert bei zu langer oder zu heißer Behandlung?',
      options: ['Aroma steigt unbegrenzt', 'Bitterkeit und verbrannte Stoffe nehmen zu', 'Die Oberfläche wird wieder blass', 'Die Reaktion kehrt sich vollständig um'],
      correct: 1,
      explanation: 'Nach dem günstigen Bräunungsbereich nimmt thermische Zersetzung zu; das Ergebnis wird dunkel und bitter.',
    },
  ],
  [
    {
      question: 'Was unterscheidet Karamellisierung von der Maillard-Reaktion?',
      options: ['Karamellisierung benötigt Zucker allein', 'Karamellisierung benötigt immer Fleisch', 'Maillard benötigt keinen Zucker', 'Es gibt keinen Unterschied'],
      correct: 0,
      explanation: 'Karamellisierung ist die thermische Umwandlung von Zucker; Maillard benötigt zusätzlich Aminosäuren.',
    },
    {
      question: 'Warum wird ein Keks anders braun als reiner Zucker?',
      options: ['Im Keks sind zusätzlich Proteine beziehungsweise Aminosäuren vorhanden', 'Der Keks bleibt immer kälter', 'Zucker kann nicht braun werden', 'Mehl verhindert jede Reaktion'],
      correct: 0,
      explanation: 'Im Keks laufen Maillard-Reaktion und je nach Rezept auch Karamellisierung nebeneinander ab.',
    },
    {
      question: 'Was passiert bei Zucker ohne geeignete Aminosäuren?',
      options: ['Maillard dominiert', 'Karamellisierung kann stattfinden', 'Es entsteht immer Umami', 'Es gibt niemals Bräunung'],
      correct: 1,
      explanation: 'Zucker kann alleine karamellisieren, aber das ist ein anderer Reaktionsweg.',
    },
  ],
  [
    {
      question: 'Welche Maßnahme fördert eine kräftige Bräunung?',
      options: ['Oberfläche trockentupfen', 'Pfanne mit Wasser füllen', 'Sehr viele Stücke dicht stapeln', 'Temperatur möglichst niedrig halten'],
      correct: 0,
      explanation: 'Weniger Oberflächenwasser bedeutet, dass die Oberfläche schneller über den Siedebereich hinaus erwärmt wird.',
    },
    {
      question: 'Warum sollte die Pfanne nicht überfüllt sein?',
      options: ['Sonst sammelt sich Wasserdampf und das Gargut dämpft', 'Sonst verschwindet das Protein', 'Sonst sinkt der pH-Wert immer auf null', 'Sonst entsteht nur Karamell'],
      correct: 0,
      explanation: 'Viele feuchte Stücke geben gleichzeitig Wasser ab; die Oberfläche bleibt länger nass und kühler.',
    },
    {
      question: 'Welche Aussage ist richtig?',
      options: ['Eine einzige Temperatur ist für jedes Lebensmittel perfekt', 'Passende Bräunung hängt von Lebensmittel, Wasser, Zeit und Temperatur ab', 'Maillard findet nur bei Fleisch statt', 'Je dunkler, desto besser'],
      correct: 1,
      explanation: 'Zusammensetzung und Oberfläche unterscheiden sich. Entscheidend ist das Zusammenspiel der Bedingungen.',
    },
  ],
];

const experimentById: Record<string, React.ComponentType> = {
  'EXP:MAILLARD-TEMP': MaillardTemperatureExperiment,
  'EXP:MAILLARD-TIME': MaillardTimeExperiment,
  'EXP:MAILLARD-PH': MaillardPhExperiment,
  'EXP:MAILLARD-AROMA': MaillardAromaExperiment,
  'EXP:MAILLARD-REAKTANTEN': MaillardReactantsExperiment,
  'EXP:STEAK-COOKING': MaillardCookingExperiment,
};

export default function MaillardJourney({ path }: { path: LearningPath }) {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(() => path.units.map(() => false));

  const unlockedCount = useMemo(() => {
    const firstIncomplete = completed.findIndex((value) => !value);
    return firstIncomplete === -1 ? path.units.length : Math.min(path.units.length, firstIncomplete + 1);
  }, [completed, path.units.length]);

  const unit = path.units[active];

  function completeChapter() {
    setCompleted((previous) => previous.map((value, index) => index === active ? true : value));
    if (active < path.units.length - 1) setActive(active + 1);
  }

  return (
    <div className={styles.journey}>
      <nav className={styles.chapterNav} aria-label="Kapitel der Lernreise">
        {path.units.map((chapter, index) => {
          const unlocked = index < unlockedCount;
          return (
            <button
              key={chapter.id}
              type="button"
              disabled={!unlocked}
              className={[styles.chapterButton, active === index ? styles.active : '', completed[index] ? styles.done : ''].join(' ')}
              onClick={() => unlocked && setActive(index)}
            >
              <span>{completed[index] ? '✓' : index + 1}</span>
              <b>{chapter.title}</b>
            </button>
          );
        })}
      </nav>

      <section className={styles.chapter}>
        <p className={styles.chapterLabel}>Kapitel {active + 1} von {path.units.length}</p>
        <h2>{unit.entryQuestion}</h2>

        <div className={styles.scenes}>
          {unit.sections.filter((section) => section.kind !== 'quiz').map((section) => {
            const Experiment = experimentById[section.id];
            return (
              <article key={section.id} className={[styles.scene, section.kind === 'observation' ? styles.observation : '', section.kind === 'exercise' ? styles.transfer : ''].join(' ')}>
                <span className={styles.kind}>{labelFor(section.kind)}</span>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
                {Experiment && <div className={styles.experiment}><Experiment /></div>}
              </article>
            );
          })}
        </div>

        <ChapterQuiz
          key={unit.id}
          questions={quizzes[active]}
          takeaway={unit.takeaway}
          completed={completed[active]}
          onComplete={completeChapter}
          finalChapter={active === path.units.length - 1}
        />
      </section>
    </div>
  );
}

function ChapterQuiz({ questions, takeaway, completed, onComplete, finalChapter }: {
  questions: Question[];
  takeaway?: string;
  completed: boolean;
  onComplete: () => void;
  finalChapter: boolean;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const allAnswered = answers.every((answer) => answer !== null);
  const allCorrect = answers.every((answer, index) => answer === questions[index].correct);

  function check() {
    if (!allAnswered) return;
    setChecked(true);
  }

  return (
    <div className={styles.quiz}>
      <span className={styles.kind}>Wissen prüfen</span>
      <h3>Was hast du entdeckt?</h3>
      <div className={styles.questions}>
        {questions.map((question, questionIndex) => (
          <div key={question.question} className={styles.question}>
            <p>{question.question}</p>
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                const correct = checked && optionIndex === question.correct;
                const wrong = checked && selected && optionIndex !== question.correct;
                return (
                  <button
                    key={option}
                    type="button"
                    className={[selected ? styles.selected : '', correct ? styles.correct : '', wrong ? styles.wrong : ''].join(' ')}
                    onClick={() => !checked && setAnswers((previous) => previous.map((value, index) => index === questionIndex ? optionIndex : value))}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                  </button>
                );
              })}
            </div>
            {checked && answers[questionIndex] !== question.correct && <small>{question.explanation}</small>}
          </div>
        ))}
      </div>

      {!completed && !checked && <button className={styles.primary} type="button" disabled={!allAnswered} onClick={check}>Antworten prüfen →</button>}
      {!completed && checked && !allCorrect && (
        <button className={styles.secondary} type="button" onClick={() => { setAnswers(questions.map(() => null)); setChecked(false); }}>Noch einmal versuchen</button>
      )}
      {!completed && checked && allCorrect && (
        <div className={styles.takeaway}>
          <span>Erkenntnis</span>
          <p>{takeaway}</p>
          <button className={styles.primary} type="button" onClick={onComplete}>{finalChapter ? 'Lernreise abschließen' : 'Nächstes Kapitel öffnen →'}</button>
        </div>
      )}
      {completed && <div className={styles.completed}>✓ Dieses Kapitel hast du abgeschlossen.</div>}
    </div>
  );
}

function labelFor(kind: string) {
  return ({ observation: 'Beobachtung', experiment: 'Experiment', explanation: 'Erklärung', branch: 'Verbindung', example: 'Beispiel', exercise: 'Im Alltag' } as Record<string, string>)[kind] ?? kind;
}
