'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { DidacticInteraction } from '../lib/didacticInteractions';

type Task = {
  prompt: string;
  hint?: string;
  solution: string;
};

type Check = {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

type CompletionNextModule = {
  id: string;
  title: string;
  href: string;
  domain: string;
  durationMinutes: number;
};

type CompletionPath = {
  id: string;
  title: string;
  href: string;
};

type Props = {
  task: Task;
  check: Check;
  interaction?: DidacticInteraction;
  learningGoals: string[];
  nextModules?: CompletionNextModule[];
  pathContext?: CompletionPath | null;
};

export default function DidacticInteractionPanel({
  task,
  check,
  interaction,
  learningGoals,
  nextModules = [],
  pathContext = null,
}: Props) {
  const [taskComplete, setTaskComplete] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [sequenceValues, setSequenceValues] = useState<string[]>(
    interaction?.type === 'sequence' ? interaction.answers.map(() => '') : []
  );
  const [numericValues, setNumericValues] = useState<string[]>(
    interaction?.type === 'numeric-fields' ? interaction.fields.map(() => '') : []
  );
  const [choiceValues, setChoiceValues] = useState<(number | null)[]>(
    interaction?.type === 'choice-fields' ? interaction.fields.map(() => null) : []
  );
  const [taskFeedback, setTaskFeedback] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const completed = Number(taskComplete) + Number(checkComplete);
  const progress = completed * 50;
  const progressLabel = completed === 2 ? 'Geschafft' : completed === 1 ? 'Prüfen' : 'Ausprobieren';

  const sequenceLabel = useMemo(() => {
    if (interaction?.type !== 'sequence') return null;
    return interaction.sequence.join('  →  ');
  }, [interaction]);

  function finishTask(correct: boolean, correctFeedback: string, incorrectFeedback: string) {
    setAttempts((value) => value + 1);
    setTaskFeedback(correct ? correctFeedback : incorrectFeedback);
    setTaskComplete(correct);
  }

  function checkSequence() {
    if (interaction?.type !== 'sequence') return;
    const parsed = sequenceValues.map((value) => Number(value.trim()));
    const correct = parsed.length === interaction.answers.length
      && parsed.every((value, index) => Number.isFinite(value) && value === interaction.answers[index]);
    finishTask(correct, interaction.correctFeedback, interaction.incorrectFeedback);
  }

  function checkNumericFields() {
    if (interaction?.type !== 'numeric-fields') return;
    const parsed = numericValues.map((value) => Number(value.trim().replace(',', '.')));
    const correct = parsed.length === interaction.fields.length
      && parsed.every((value, index) => Number.isFinite(value) && value === interaction.fields[index].answer);
    finishTask(correct, interaction.correctFeedback, interaction.incorrectFeedback);
  }

  function checkChoiceFields() {
    if (interaction?.type !== 'choice-fields') return;
    const correct = choiceValues.length === interaction.fields.length
      && choiceValues.every((value, index) => value === interaction.fields[index].correctOption);
    finishTask(correct, interaction.correctFeedback, interaction.incorrectFeedback);
  }

  function chooseOption(index: number) {
    setSelectedOption(index);
    setCheckComplete(index === check.correctOption);
  }

  const answerWrong = selectedOption !== null && selectedOption !== check.correctOption;
  const answerCorrect = selectedOption === check.correctOption;

  return (
    <>
      <section aria-label="Modulfortschritt" style={{ maxWidth: 900, marginTop: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 8 }}>
          <strong>{progressLabel}</strong>
          <span className="mono" style={{ color: 'var(--muted)' }}>{completed}/2 aktive Schritte abgeschlossen</span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: 'color-mix(in srgb, var(--steel) 14%, transparent)', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', borderRadius: 999, background: 'var(--steel)', transition: 'width 220ms ease' }} />
        </div>
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 8, color: 'var(--muted)', fontSize: 12 }}>
          <span>Entdecken</span><span>Ausprobieren</span><span>Prüfen</span><span>Geschafft</span>
        </div>
      </section>

      <section className="subject-section" style={{ maxWidth: 900 }}>
        <h2 className="section-title" style={{ fontSize: 34 }}>Kannst du es anwenden?</h2>
        <div className="platform-card">
          <p style={{ fontWeight: 650, fontSize: 18 }}>{task.prompt}</p>

          {interaction?.type === 'sequence' ? (
            <div style={{ marginTop: 22 }}>
              <div aria-label="Zahlenfolge" style={{ padding: '18px 20px', borderRadius: 18, background: 'color-mix(in srgb, var(--steel) 7%, transparent)', fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>
                {sequenceLabel}<span aria-hidden="true">  →  </span>
                {sequenceValues.map((value, index) => (
                  <input
                    key={index}
                    aria-label={`Antwort ${index + 1}`}
                    inputMode="numeric"
                    value={value}
                    onChange={(event) => {
                      const next = [...sequenceValues];
                      next[index] = event.target.value;
                      setSequenceValues(next);
                      setTaskFeedback(null);
                    }}
                    style={{ width: 74, marginLeft: 10, padding: '8px 10px', borderRadius: 10, border: '1px solid var(--line)', font: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }}
                  />
                ))}
              </div>
              <button type="button" onClick={checkSequence} className="btn" style={{ marginTop: 18 }}>Prüfen</button>
              {taskFeedback && <p role="status" style={{ marginTop: 14, fontWeight: 600 }}>{taskComplete ? '✓ ' : ''}{taskFeedback}</p>}
              {!taskComplete && attempts >= 2 && <details style={{ marginTop: 14 }}><summary>Lösung ansehen</summary><p>{task.solution}</p></details>}
            </div>
          ) : interaction?.type === 'numeric-fields' ? (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: 'grid', gap: 14, padding: '18px 20px', borderRadius: 18, background: 'color-mix(in srgb, var(--steel) 7%, transparent)' }}>
                {interaction.fields.map((field, index) => (
                  <label key={field.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, 1fr) minmax(100px, 180px)', gap: 14, alignItems: 'center' }}>
                    <strong>{field.label}</strong>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        aria-label={field.label}
                        inputMode="decimal"
                        value={numericValues[index] ?? ''}
                        onChange={(event) => {
                          const next = [...numericValues];
                          next[index] = event.target.value;
                          setNumericValues(next);
                          setTaskFeedback(null);
                        }}
                        style={{ width: '100%', minWidth: 0, padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)', font: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }}
                      />
                      {field.suffix && <span>{field.suffix}</span>}
                    </span>
                  </label>
                ))}
              </div>
              <button type="button" onClick={checkNumericFields} className="btn" style={{ marginTop: 18 }}>Prüfen</button>
              {taskFeedback && <p role="status" style={{ marginTop: 14, fontWeight: 600 }}>{taskComplete ? '✓ ' : ''}{taskFeedback}</p>}
              {!taskComplete && attempts >= 2 && <details style={{ marginTop: 14 }}><summary>Lösung ansehen</summary><p>{task.solution}</p></details>}
            </div>
          ) : interaction?.type === 'choice-fields' ? (
            <div style={{ marginTop: 22 }}>
              <div style={{ display: 'grid', gap: 18 }}>
                {interaction.fields.map((field, fieldIndex) => (
                  <fieldset key={field.label} style={{ border: 0, padding: 0, margin: 0 }}>
                    <legend style={{ fontWeight: 700, marginBottom: 10 }}>{field.label}</legend>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {field.options.map((option, optionIndex) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            const next = [...choiceValues];
                            next[fieldIndex] = optionIndex;
                            setChoiceValues(next);
                            setTaskFeedback(null);
                          }}
                          style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', background: choiceValues[fieldIndex] === optionIndex ? 'color-mix(in srgb, var(--steel) 9%, var(--paper))' : 'var(--paper)', color: 'var(--ink)', cursor: 'pointer', font: 'inherit' }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <button type="button" onClick={checkChoiceFields} className="btn" style={{ marginTop: 18 }}>Prüfen</button>
              {taskFeedback && <p role="status" style={{ marginTop: 14, fontWeight: 600 }}>{taskComplete ? '✓ ' : ''}{taskFeedback}</p>}
              {!taskComplete && attempts >= 2 && <details style={{ marginTop: 14 }}><summary>Lösung ansehen</summary><p>{task.solution}</p></details>}
            </div>
          ) : (
            <div style={{ marginTop: 18 }}>
              {task.hint && <details><summary>Hinweis</summary><p>{task.hint}</p></details>}
              <details style={{ marginTop: 14 }}><summary>Lösung vergleichen</summary><p>{task.solution}</p></details>
              <button type="button" className="btn secondary" style={{ marginTop: 18 }} onClick={() => setTaskComplete(true)}>
                Weiter zur Wissensfrage →
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="subject-section" style={{ maxWidth: 900 }}>
        <h2 className="section-title" style={{ fontSize: 34 }}>Kurz geprüft</h2>
        <div className="platform-card">
          <p style={{ fontWeight: 650, fontSize: 18 }}>{check.question}</p>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {check.options.map((option, index) => {
              const selected = selectedOption === index;
              const correct = selected && index === check.correctOption;
              const incorrect = selected && index !== check.correctOption;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseOption(index)}
                  style={{ textAlign: 'left', padding: '14px 16px', borderRadius: 14, border: `1px solid ${correct ? 'var(--steel)' : 'var(--line)'}`, background: selected ? 'color-mix(in srgb, var(--steel) 9%, var(--paper))' : 'var(--paper)', color: 'var(--ink)', cursor: 'pointer', font: 'inherit' }}
                >
                  <strong style={{ marginRight: 10 }}>{String.fromCharCode(65 + index)}</strong>{option}{correct ? ' ✓' : incorrect ? ' · noch nicht' : ''}
                </button>
              );
            })}
          </div>
          {answerWrong && <p role="status" style={{ marginTop: 16 }}>Noch nicht ganz. Prüfe die Aussagen noch einmal.</p>}
          {answerCorrect && <p role="status" style={{ marginTop: 16, fontWeight: 600 }}>✓ {check.explanation}</p>}
        </div>
      </section>

      {taskComplete && checkComplete && (
        <section className="subject-section" style={{ maxWidth: 900 }}>
          <div className="platform-card" style={{ background: 'color-mix(in srgb, var(--steel) 7%, var(--paper))' }}>
            <p className="kicker">Modul abgeschlossen</p>
            <h2 className="section-title" style={{ fontSize: 30 }}>Das kannst du jetzt</h2>
            <ul style={{ marginBottom: 0, paddingLeft: 22 }}>
              {learningGoals.map((goal) => <li key={goal} style={{ marginBottom: 8 }}>✓ {goal}</li>)}
            </ul>

            {(nextModules.length > 0 || pathContext) && (
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 22 }}>Wie geht es weiter?</h3>
                {pathContext && (
                  <p style={{ marginTop: 0 }}>
                    <span style={{ color: 'var(--muted)' }}>Dein Lernpfad: </span>
                    <Link href={pathContext.href}><strong>{pathContext.title}</strong></Link>
                  </p>
                )}
                {nextModules.length > 0 && (
                  <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                    {nextModules.map((nextModule, index) => (
                      <Link
                        key={nextModule.id}
                        href={nextModule.href}
                        className="subject-card"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <span className="code">{index === 0 ? 'Empfohlener nächster Schritt' : 'Weiterlernen'}</span>
                        <strong style={{ display: 'block', marginTop: 10 }}>{nextModule.title}</strong>
                        <span className="mono" style={{ display: 'block', marginTop: 8, color: 'var(--muted)' }}>
                          {nextModule.domain} · {nextModule.durationMinutes} min · {nextModule.id}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
