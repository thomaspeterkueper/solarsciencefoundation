# SSF-LERNPFAD-TEMPLATE.md
## Solar Science Foundation · Lernpfad-Vorlage

**Version:** 0.1.0
**Erstellt:** 2026-07-15
**Status:** Vorlage

---

Kopiere diesen Block in `/lib/learningPaths.ts` und ersetze alle `[PLATZHALTER]`.

```typescript
{
  id: 'PATH:SSF:[DOMAIN]-[SLUG]-0001',
  // Beispiel: 'PATH:SSF:PHY-DOPPLER-0001'
  // Domain: PHY, MAT, ENG, CHE, BIO, ...

  title: '[Einstiegsfrage als Titel]',
  // Beispiel: 'Warum klingt ein vorbeifahrendes Auto anders'
  // Keine Sonderzeichen, kein Fragezeichen im ID-Feld

  subtitle: '[2-3 Sätze was der Lernende entdecken wird]',
  // Beispiel: 'Vom Klang eines Autos zum Doppler-Effekt:
  //            Wellenstauchung, Rotverschiebung und warum Rettungswagen anders klingen.'

  status: 'prototype',
  // 'prototype' während Entwicklung, 'active' nach didaktischer Prüfung

  sourceModuleId: 'SSF-[DOMAIN]-[NUMMER]',
  kxfModuleId: 'LRN:SSF:[DOMAIN]-[NUMMER]',

  domainsNeeded: ['KNOW:[DOMAIN]-[THEMA]'],
  // Beispiel: ['KNOW:PHY-WAVES', 'KNOW:PHY-SOUND']

  suppliedBy: {
    knowledgeGraph: ['Prerequisite links', 'Unlock mapping'],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      // Kurzbeschreibung jedes Experiments
      // Beispiel: 'Frequenz-Slider: Ton live, Wellenlänge Canvas'
    ]
  },

  unlocks: ['[NOXIA-KEY-1]', '[NOXIA-KEY-2]'],
  // Beispiel: ['SENSOR:DOPPLER', 'NAV:SPECTRAL']

  units: [
    {
      id: 'UNIT:[PFAD-SLUG]-[KAPITEL]',
      // Beispiel: 'UNIT:DOPPLER-BEOBACHTUNG'

      title: '[Kurztitel intern]',
      // Beispiel: 'Beobachtung: Das klingende Auto'

      entryQuestion: '[Die Einstiegsfrage des Kapitels]',
      // Beispiel: 'Warum klingt ein Auto beim Vorbeifahren erst hoch und dann tief?'
      // PFLICHT: Keine Fachbegriffe, aus Alltagsperspektive

      takeaway: '[Die Kern-Entdeckung in einem Satz]',
      // Beispiel: 'Die Wellenlänge komprimiert sich vor der Quelle
      //            und dehnt sich dahinter — deshalb ändert sich die wahrgenommene Frequenz.'
      // Erscheint erst nach 3/3 Quiz

      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:[NAECHSTES-KAPITEL]' },
      // Letztes Kapitel hat kein gate

      sections: [
        {
          id: 'OBS:[SLUG]',
          kind: 'observation',
          title: '[Titel der Beobachtung]',
          summary: '[2-4 Sätze Alltagsbeobachtung, keine Fachbegriffe]',
          depthPoints: 4,
        },
        {
          id: 'EXP:[SLUG]',
          kind: 'experiment',
          title: '[Titel des Experiments]',
          summary: '[Was der Slider macht und was sichtbar wird]',
          interactive: true,
          depthPoints: 6,
        },
        {
          id: 'QUIZ:[SLUG]',
          kind: 'quiz',
          title: 'Quiz: [Kapitelthema]',
          summary: '[3 Fragen im Format: Rechnung, Verständnis, Transfer]',
          depthPoints: 12,
        },
      ],
    },
    // Weitere Kapitel hier...
  ],
},
```

---

## Checkliste vor dem Commit

- [ ] `id` folgt dem Format `PATH:SSF:[DOMAIN]-[SLUG]-0001`
- [ ] `entryQuestion` hat keinen Fachbegriff
- [ ] Jede Unit hat `entryQuestion` und `takeaway`
- [ ] Jede Unit hat mindestens eine `observation` und ein `quiz`
- [ ] `gate` bei allen Units außer der letzten vorhanden
- [ ] `unlocks` enthält NOXIA-Keys im Format `DOMAIN:SLUG`

---

*Solar Science Foundation · SSF-LERNPFAD-TEMPLATE.md · v0.1.0 · 2026-07-15*
