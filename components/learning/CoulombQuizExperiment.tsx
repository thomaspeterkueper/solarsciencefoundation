'use client';
/**
 * CoulombQuizExperiment
 * Rule: no number with more than 6 zeros without a real-world comparison.
 * Three questions, escalating scale, each with a punchline.
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

type QState = 'idle' | 'correct' | 'wrong';

const QUESTIONS = [
  {
    q: 'Ein Wassermolekül hat eine Teilladung von −0,66 e. Wie viele Wassermoleküle braucht man, um 1 Coulomb Ladung zu sammeln?',
    options: [
      { text: 'Etwa 10 Millionen — wie Einwohner von Berlin', correct: false },
      { text: 'Etwa 10 Billionen — wie alle Ameisen auf der Erde', correct: false },
      { text: 'Etwa 10 Trilliarden — wie Atome in einem Salzkorn', correct: true },
    ],
    reveal: {
      heading: 'Richtig: ca. 9,46 × 10¹⁸ — rund 10 Trilliarden',
      lines: [
        '≈ Atome in einem Salzkorn (~10¹⁸)',
        '≈ Sekunden seit dem Urknall (~4 × 10¹⁷)',
        '≈ Sandkorn an einem Strand (~10¹⁹)',
      ],
      punchline: 'Ein Coulomb ist winzig im Alltag — riesig auf molekularer Ebene.',
    },
  },
  {
    q: 'Ein Blitz transportiert 5–10 Coulomb. Wie viele Wassermoleküle müssten ihre Ladung abgeben, um einen Blitz zu erzeugen?',
    options: [
      { text: 'So viele wie Menschen auf der Erde (8 Milliarden)', correct: false },
      { text: 'So viele wie Sterne in unserer Galaxie (100 Milliarden)', correct: false },
      { text: 'So viele wie Atome in einem Wassertropfen (~10²²)', correct: true },
    ],
    reveal: {
      heading: 'Richtig: ~10²² — wie Atome in einem Wassertropfen',
      lines: [
        '10.000× mehr als Sterne in unserer Galaxie',
        'Und trotzdem: der Blitz dauert nur Millisekunden',
      ],
      punchline: 'Ein Blitz = unvorstellbar viele Moleküle — und trotzdem ein kleiner Funken.',
    },
  },
  {
    q: 'Dein Handy-Akku hat 3.000 mAh — das sind etwa 10.800 Coulomb. Wie viele Wassermoleküle müssten ihre Ladung abgeben, um dein Handy einmal zu laden?',
    options: [
      { text: 'Etwa so viele wie Wassertropfen in einem Glas', correct: false },
      { text: 'Etwa so viele wie Sandkorn in der Sahara (~10²³)', correct: false },
      { text: 'Etwa so viele wie Atome in deinem Körper (~10²⁷)', correct: true },
    ],
    reveal: {
      heading: 'Richtig: ~10²⁷ — wie Atome in deinem Körper',
      lines: [
        'Dein Körper: ~7 × 10²⁷ Atome',
        '10 Millionen Mal mehr als Sterne im beobachtbaren Universum',
        'Trotzdem ist dein Akku nach einem Tag leer.',
      ],
      punchline: 'In deinem Akku steckt buchstäblich die Energie von Trilliarden Molekülen.',
    },
  },
];

export default function CoulombQuizExperiment() {
  const [current, setCurrent] = useState(0);
  const [qStates, setQStates] = useState<QState[]>(['idle','idle','idle']);
  const [selected, setSelected] = useState<number|null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const qs = qStates[current];

  function pick(i: number) {
    if (qs !== 'idle') return;
    const ns = [...qStates];
    ns[current] = q.options[i].correct ? 'correct' : 'wrong';
    setQStates(ns);
    setSelected(i);
  }

  function next() {
    if (current < QUESTIONS.length - 1) { setCurrent(c=>c+1); setSelected(null); }
    else setDone(true);
  }

  if (done) return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Quiz</span><strong>Coulomb — Quiz abgeschlossen</strong></div>
      <div style={{textAlign:'center',padding:'16px 0'}}>
        <div style={{fontSize:36,marginBottom:10}}>⚡</div>
        <p style={{fontFamily:'var(--font-serif)',fontSize:17,lineHeight:1.55,marginBottom:14}}>
          Du weißt jetzt was ein Coulomb wirklich bedeutet.
        </p>
        <div style={{padding:'14px 16px',background:'var(--navy)',borderRadius:8,textAlign:'left'}}>
          <p style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#C9A84C',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:8}}>Merke</p>
          <p style={{fontSize:13,color:'rgba(255,255,255,.82)',lineHeight:1.75,margin:0}}>
            1 Coulomb = 6,24 Trilliarden Elektronen<br/>
            ≈ so viele, wie Menschen jemals lebten (100 Mrd.) × 60.000<br/>
            ≈ Atome in einem Salzkorn<br/>
            ≈ Sekunden seit dem Urknall<br/>
            <br/>
            Keine Zahl mit mehr als 6 Nullen ohne Vergleich!
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Quiz</span><strong>Was bedeutet 1 Coulomb wirklich?</strong></div>
      <div style={{display:'flex',gap:6,marginBottom:14}}>
        {QUESTIONS.map((_,i)=>(
          <div key={i} style={{flex:1,height:4,borderRadius:2,transition:'background .3s',
            background: i<current?'#7AAD7A':i===current?'#C9A84C':'var(--border)'}} />
        ))}
      </div>
      <p style={{fontFamily:'var(--font-serif)',fontSize:16,lineHeight:1.6,marginBottom:14,color:'var(--ink)'}}>
        {q.q}
      </p>
      <div style={{display:'grid',gap:8,marginBottom:14}}>
        {q.options.map((opt,i)=>{
          const show = qs !== 'idle';
          const isMe = selected===i;
          let bg='var(--soft)', brd='var(--border)', col='var(--ink)';
          if (show && opt.correct) { bg='#EBF7ED'; brd='#3A7D44'; col='#2A5C32'; }
          else if (show && isMe && !opt.correct) { bg='#FDECEA'; brd='#C0392B'; col='#922B21'; }
          return (
            <button key={i} onClick={()=>pick(i)} disabled={show} style={{
              padding:'11px 15px',borderRadius:8,textAlign:'left',
              border:'1.5px solid '+brd,background:bg,color:col,
              fontSize:14,lineHeight:1.4,cursor:show?'default':'pointer',
              fontFamily:'var(--font-sans)',transition:'all .15s',
            }}>
              {opt.text}{show&&opt.correct?' ✓':''}{show&&isMe&&!opt.correct?' ✗':''}
            </button>
          );
        })}
      </div>
      {qs!=='idle'&&(
        <div style={{padding:'14px 16px',background:'var(--navy)',borderRadius:8,marginBottom:12}}>
          <p style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#7AAD7A',fontWeight:600,marginBottom:8}}>{q.reveal.heading}</p>
          {q.reveal.lines.map((l,i)=>(
            <p key={i} style={{fontSize:13,color:'rgba(255,255,255,.72)',margin:'3px 0',paddingLeft:10,borderLeft:'2px solid #C9A84C44'}}>{l}</p>
          ))}
          <p style={{marginTop:10,fontSize:13,color:'#C9A84C',fontStyle:'italic'}}>{q.reveal.punchline}</p>
        </div>
      )}
      {qs==='correct'&&(
        <button onClick={next} style={{
          width:'100%',padding:'10px 0',borderRadius:8,border:'none',
          background:'var(--navy)',color:'#fff',
          fontFamily:'var(--font-mono)',fontSize:12,cursor:'pointer',letterSpacing:'.06em',
        }}>{current<QUESTIONS.length-1?'Nächste Frage →':'Abschließen ✓'}</button>
      )}
      {qs==='wrong'&&(
        <p style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#C9A84C',textAlign:'center'}}>
          Noch einmal — eine Antwort ist richtig.
        </p>
      )}
    </div>
  );
}
