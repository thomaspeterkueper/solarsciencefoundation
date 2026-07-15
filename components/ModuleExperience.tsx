'use client';

import { useState } from 'react';
import type { LearningModule } from '../lib/modules';
import type { ModuleLesson } from '../lib/moduleLessons';
import ModuleRunner from './ModuleRunner';
import StrainRosetteExperiment from './StrainRosetteExperiment';

export default function ModuleExperience({ learningModule, lesson }: { learningModule: LearningModule; lesson: ModuleLesson | null }) {
  const [view, setView] = useState<'learn' | 'quiz'>(lesson ? 'learn' : 'quiz');

  return (
    <div className="module-experience">
      <div className="module-experience__nav" role="tablist" aria-label="Modulbereiche">
        {lesson && (
          <button
            type="button"
            role="tab"
            aria-selected={view === 'learn'}
            className={view === 'learn' ? 'module-experience__tab is-active' : 'module-experience__tab'}
            onClick={() => setView('learn')}
          >
            Lernmodul
          </button>
        )}
        <button
          type="button"
          role="tab"
          aria-selected={view === 'quiz'}
          className={view === 'quiz' ? 'module-experience__tab is-active' : 'module-experience__tab'}
          onClick={() => setView('quiz')}
        >
          Wissen prüfen
        </button>
      </div>

      {view === 'learn' && lesson ? (
        <div className="module-lesson">
          <section className="module-lesson__intro">
            <p>{lesson.intro}</p>
            <div className="module-lesson__goals">
              <span>Nach diesem Modul kannst du</span>
              <ul>
                {lesson.learningGoals.map((goal) => <li key={goal}>{goal}</li>)}
              </ul>
            </div>
          </section>

          {lesson.sections.map((section) => (
            <section key={section.id} className="module-lesson__section">
              <p className="module-lesson__eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.formula && <div className="module-lesson__formula">{section.formula}</div>}
              {section.note && <div className="module-lesson__note">{section.note}</div>}
            </section>
          ))}

          {lesson.experiment === 'strain-rosette' && <StrainRosetteExperiment />}

          <div className="module-lesson__finish">
            <div>
              <span>Nächster Schritt</span>
              <strong>Prüfe, ob du die Zusammenhänge selbst anwenden kannst.</strong>
            </div>
            <button type="button" className="btn" onClick={() => setView('quiz')}>
              Wissen prüfen →
            </button>
          </div>
        </div>
      ) : (
        <section className="module-quiz">
          <div className="module-quiz__intro">
            <p className="module-lesson__eyebrow">Wissen prüfen</p>
            <h2>Kannst du die Messung jetzt einordnen?</h2>
            <p>Beantworte alle Fragen. Du kannst jederzeit zum Lernmodul zurückkehren und nachsehen.</p>
            {lesson && (
              <button type="button" className="btn secondary" onClick={() => setView('learn')}>
                ← Zum Lernmodul
              </button>
            )}
          </div>
          <ModuleRunner learningModule={learningModule} />
        </section>
      )}
    </div>
  );
}
