'use client';

import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Scenario = 'fresh' | 'aged' | 'protein';

const SCENARIOS = {
  fresh: {
    label: 'Frischer Rotweinfleck',
    substrate: 'Baumwolle = Cellulosefaser',
    chemistry: 'Anthocyane und weitere Polyphenole liegen in einer wässrig-alkoholischen Matrix vor und können mit der Faseroberfläche wechselwirken.',
    evidence: 'Aus dem chemischen Kern folgt keine universelle Heiß-/Kalt-Regel. Fleckenalter, Faser, Textilausrüstung, Waschchemie, Wassergehalt und thermische Vorgeschichte beeinflussen das Ergebnis.',
  },
  aged: {
    label: 'Gealterter Rotweinfleck',
    substrate: 'Baumwolle = Cellulosefaser',
    chemistry: 'Mit Zeit verändern sich Flüssigkeitsverteilung, Adsorption und die Zusammensetzung des Flecks. Die sichtbare Farbe bleibt wesentlich durch Anthocyanin-/Polyphenolchemie geprägt.',
    evidence: 'Ein publiziertes Modellsystem zeigt, dass Tanninsäure an hydrophiler Baumwolle adsorbieren kann. Daraus lässt sich aber keine allgemeine Haushalts-Waschregel ableiten.',
  },
  protein: {
    label: 'Kontrast: echte Proteinflecken',
    substrate: 'z. B. Blut, Ei oder Milch',
    chemistry: 'Hier können Proteine durch Wärme ihre räumliche Struktur verändern. Denaturierung ist deshalb für echte Proteinflecken ein sinnvoller eigener Mechanismus.',
    evidence: 'Dieser Kontrastfall darf nicht auf Rotwein auf Baumwolle übertragen werden: Rotwein ist kein Protein-Fleckenmodell und Baumwolle ist Cellulose, keine Proteinfaser.',
  },
} as const;

export default function RotweinExperiment() {
  const [scenario, setScenario] = useState<Scenario>('fresh');
  const current = SCENARIOS[scenario];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Erkundung</span>
        <strong>Rotweinfleck: Chemie von Pflegeempfehlung trennen</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Wähle einen Fall. Entscheidend ist zuerst: <strong>Welche Stoffe sind im Fleck, und aus welchem Material besteht die Faser?</strong>
        Erst danach kann man über eine konkrete Behandlung sprechen.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 8, margin: '14px 0' }}>
        {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setScenario(key)}
            style={{
              padding: '10px 12px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
              border: `1.5px solid ${scenario === key ? '#C9A84C' : 'var(--border)'}`,
              background: scenario === key ? 'rgba(201,168,76,.12)' : 'var(--soft)',
              color: 'var(--ink)',
            }}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Substrat</strong>
          <p style={{ margin: '5px 0 0', lineHeight: 1.6 }}>{current.substrate}</p>
        </div>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Chemischer Kern</strong>
          <p style={{ margin: '5px 0 0', lineHeight: 1.6 }}>{current.chemistry}</p>
        </div>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Was die Evidenz erlaubt</strong>
          <p style={{ margin: '5px 0 0', lineHeight: 1.6 }}>{current.evidence}</p>
        </div>
      </div>

      {scenario !== 'protein' && (
        <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.86)', lineHeight: 1.65 }}>
            <strong>Wichtig:</strong> SSF gibt hier bewusst keine erfundene 40/80-°C-Schwelle und keine universelle „heiß“-/„kalt“-Regel aus. Eine praktische Pflegeempfehlung ist konditional und muss zum konkreten Textil und Pflegeetikett passen.
          </p>
        </div>
      )}
    </div>
  );
}
