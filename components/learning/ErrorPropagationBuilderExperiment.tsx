'use client';

import { useMemo, useState } from 'react';

type Term = { exponent: number; relativeError: number };

export default function ErrorPropagationBuilderExperiment() {
  const [terms, setTerms] = useState<Term[]>([
    { exponent: 1, relativeError: 2 },
    { exponent: 2, relativeError: 1 },
    { exponent: -1, relativeError: 3 },
  ]);

  const contributions = useMemo(() => terms.map(t => Math.abs(t.exponent) * t.relativeError), [terms]);
  const linear = contributions.reduce((a, b) => a + b, 0);
  const rss = Math.sqrt(contributions.reduce((a, b) => a + b * b, 0));
  const dominant = contributions.indexOf(Math.max(...contributions));

  const change = (index: number, patch: Partial<Term>) => setTerms(current => current.map((t, i) => i === index ? { ...t, ...patch } : t));

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Fehlerfortpflanzung: Welcher Messwert dominiert?</h4>
    <p>Für ein Produkt bzw. einen Quotienten der Form y ∝ x₁ᵃ x₂ᵇ x₃ᶜ zeigt dieses Lehrmodell die Beiträge |Exponent| × relativer Fehler.</p>
    {terms.map((term, i) => <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
      <label>x{i+1}: Exponent <strong>{term.exponent.toFixed(1)}</strong><input type="range" min="-4" max="4" step="0.5" value={term.exponent} onChange={e=>change(i,{exponent:+e.target.value})} style={{width:'100%'}} /></label>
      <label>relativer Fehler <strong>{term.relativeError.toFixed(1)} %</strong><input type="range" min="0.1" max="10" step="0.1" value={term.relativeError} onChange={e=>change(i,{relativeError:+e.target.value})} style={{width:'100%'}} /></label>
    </div>)}
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>lineare Obergrenze<br/><strong>{linear.toFixed(1)} %</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>RSS bei unabhängigen Zufallsbeiträgen<br/><strong>{rss.toFixed(1)} %</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>größter Einzelbeitrag<br/><strong>x{dominant+1}: {contributions[dominant].toFixed(1)} %</strong></div>
    </div>
    <p style={{marginBottom:0}}>Die RSS-Zusammenfassung setzt unabhängige, geeignete Unsicherheitsbeiträge voraus. Korrelationen, systematische Fehler und Differenzen mit möglicher Auslöschung brauchen eine eigene Behandlung.</p>
  </div>;
}
