import type { LearningPath } from '../learningPaths';

export const financeLearningPaths: LearningPath[] = [
  {
    id: 'PATH:SSF:ECO-KREDIT-NOXIA-0001',
    title: 'Was kostet geliehenes Kapital wirklich?',
    subtitle: 'Kreditsumme, Zinssatz, Laufzeit und Rückzahlung als zusammenhängendes Finanzierungsproblem verstehen.',
    status: 'prototype',
    sourceModuleId: 'ECO-L0-000001',
    kxfModuleId: 'LRN:SSF:ECO-L0-000001',
    domainsNeeded: ['KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
    suppliedBy: {
      knowledgeGraph: ['ECO-L0-000001', 'KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
      kueperCom: [],
      overtimeArchive: [],
      ssf: ['Problemorientierte Kredit-Einführung', 'Kreditrechner', 'NOXIA-Anwendung und Transfer'],
    },
    unlocks: [],
    units: [
      {
        id: 'UNIT:ECO-KREDIT:GRUNDLAGEN',
        title: 'Kredit ist Kapital gegen Zeitpreis',
        entryQuestion: 'Warum kann ein Kredit sinnvoll sein, obwohl am Ende mehr zurückgezahlt wird als ursprünglich geliehen wurde?',
        takeaway: 'Ein Kredit verschiebt verfügbare Kaufkraft in die Gegenwart; Zinsen sind Teil des Preises für diese zeitliche Verschiebung und das übernommene Risiko.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ECO-KREDIT:NOXIA' },
        sections: [
          { id: 'OBS:ECO-KREDIT:ZEITPREIS', kind: 'observation', title: 'Ausgangslage', summary: 'Eine Investition ist heute möglich, die Einnahmen entstehen aber erst später. Ohne Finanzierung müsste gewartet werden; mit Kredit entstehen zusätzliche Finanzierungskosten.', depthPoints: 4 },
          { id: 'EXPL:ECO-KREDIT:KOMPONENTEN', kind: 'explanation', title: 'Vier Größen auseinanderhalten', summary: 'Kreditsumme, Zinssatz, Laufzeit und Rückzahlungsplan bestimmen gemeinsam die Finanzierung. Ein niedriger Zinssatz allein garantiert noch keine geringe Gesamtbelastung.', depthPoints: 8 },
          { id: 'EXP:KREDIT-RECHNER', kind: 'experiment', title: 'Kreditrechner', summary: 'Verändere Kapital, Zinssatz und Laufzeit und beobachte, wie sich Gesamtzins und Rückzahlungsbetrag verändern.', interactive: true, depthPoints: 9 },
          { id: 'QUIZ:ECO-KREDIT:GRUNDLAGEN', kind: 'quiz', title: 'Kurztest', summary: 'Eine Investition kann entweder sofort per Kredit oder erst später aus Eigenmitteln bezahlt werden. Was ist für die Kreditentscheidung besonders wichtig?||Nur die Kreditsumme||Finanzierungskosten und Nutzen des früheren Starts gemeinsam betrachten*||Nur die Zahl der Raten||Nur die Währung---Welche Größen bestimmen die Finanzierung wesentlich?||Kreditsumme, Zinssatz, Laufzeit und Rückzahlungsplan*||Nur Zinssatz und Farbe der Bankkarte||Nur Laufzeit||Nur Kreditsumme---Zwei Kredite haben denselben Zinssatz, aber unterschiedliche Laufzeiten. Was folgt daraus?||Sie kosten zwingend gleich viel||Die Gesamtbelastung kann unterschiedlich sein*||Die Laufzeit spielt keine Rolle||Der kürzere Kredit ist immer teurer', depthPoints: 10 },
        ],
      },
      {
        id: 'UNIT:ECO-KREDIT:NOXIA',
        title: 'Finanzierung als Systementscheidung',
        entryQuestion: 'Wann trägt eine kreditfinanzierte Anlage ihre Finanzierungskosten?',
        takeaway: 'Eine Investition ist nur dann tragfähig, wenn erwartete Rückflüsse, Finanzierungskosten, Risiken und zeitlicher Verlauf gemeinsam berücksichtigt werden.',
        sections: [
          { id: 'OBS:ECO-KREDIT:NOXIA-CASHFLOW', kind: 'observation', title: 'Einnahmen kommen später', summary: 'Eine Mine kostet sofort Kapital, erzeugt ihre Erträge aber erst über mehrere Ticks. Damit werden Zeitpunkt und Höhe der Rückflüsse entscheidend.', depthPoints: 4 },
          { id: 'EXPL:ECO-KREDIT:CASHFLOW', kind: 'explanation', title: 'Nicht nur Endwerte vergleichen', summary: 'Bei Finanzierung zählen Zahlungszeitpunkte. Eine Anlage kann auf lange Sicht Gewinn erzeugen und trotzdem zwischenzeitlich an Liquiditäts- oder Schuldendienstproblemen scheitern.', depthPoints: 8 },
          { id: 'EXP:KREDIT-NOXIA', kind: 'experiment', title: 'NOXIA-Finanzierung simulieren', summary: 'Verändere Investitionskosten, Zinssatz und Ertrag pro Tick und beobachte den Verlauf von Schuld und Einnahmen.', interactive: true, depthPoints: 9 },
          { id: 'QUIZ:ECO-KREDIT:NOXIA', kind: 'quiz', title: 'Kurztest', summary: 'Eine Anlage erwirtschaftet langfristig mehr als sie kostet, hat aber in den ersten Ticks zu geringe Einnahmen für den Schuldendienst. Was ist das Hauptproblem?||Liquidität und zeitlicher Cashflow*||Die Anlage kann grundsätzlich keinen Gewinn machen||Der Zinssatz ist automatisch null||Die Investitionssumme ist bedeutungslos---Warum reicht der Vergleich von Kaufpreis und späterem Gesamtertrag nicht?||Weil Zahlungszeitpunkte und Finanzierungskosten fehlen*||Weil Erträge nie relevant sind||Weil nur die Gebäudegröße zählt||Weil Kredite keine Laufzeit haben---Welche Änderung kann eine Finanzierung robuster machen?||Größere Sicherheitsreserve oder geringere anfängliche Schuldendienstlast*||Jeden Cashflow ignorieren||Nur den Nominalzins betrachten||Die Laufzeit aus der Rechnung entfernen', depthPoints: 10 },
        ],
      },
    ],
  },
  {
    id: 'PATH:SSF:ECO-ZINSESZINS-NOXIA-0001',
    title: 'Warum wächst Zinseszins anders als einfacher Zins?',
    subtitle: 'Lineares und exponentielles Wachstum auseinanderhalten und auf Finanzierung, Sparen und NOXIA-Entscheidungen übertragen.',
    status: 'prototype',
    sourceModuleId: 'ECO-L0-000002',
    kxfModuleId: 'LRN:SSF:ECO-L0-000002',
    domainsNeeded: ['KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
    suppliedBy: {
      knowledgeGraph: ['ECO-L0-000002', 'KD:ECO-FINANCE:N2', 'KD:MATH:N1'],
      kueperCom: [],
      overtimeArchive: [],
      ssf: ['Vergleich von einfachem Zins und Zinseszins', 'Exponentielles Wachstum', 'Transfer in langfristige NOXIA-Finanzierung'],
    },
    unlocks: [],
    units: [
      {
        id: 'UNIT:ECO-ZINSESZINS:VERGLEICH',
        title: 'Linear oder exponentiell?',
        entryQuestion: 'Was ändert sich, wenn nicht nur das Anfangskapital, sondern auch bereits entstandene Zinsen weiter verzinst werden?',
        takeaway: 'Beim einfachen Zins wächst der Zinsbetrag proportional zur Zeit; beim Zinseszins wächst die Berechnungsbasis selbst mit und erzeugt exponentielles Wachstum.',
        gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ECO-ZINSESZINS:TRANSFER' },
        sections: [
          { id: 'OBS:ECO-ZINSESZINS:KURVEN', kind: 'observation', title: 'Zwei zunächst ähnliche Verläufe', summary: 'Bei kurzen Laufzeiten können sich einfacher Zins und Zinseszins ähnlich sehen. Mit zunehmender Zeit öffnet sich der Abstand immer stärker.', depthPoints: 4 },
          { id: 'EXPL:ECO-ZINSESZINS:MODELL', kind: 'explanation', title: 'Die Berechnungsbasis wächst mit', summary: 'Einfacher Zins addiert in jeder Periode denselben auf das Anfangskapital bezogenen Betrag. Beim Zinseszins wird der neue Gesamtstand zur Basis der nächsten Periode.', depthPoints: 8 },
          { id: 'EXP:KREDIT-NOXIA', kind: 'experiment', title: 'Wachstumsverläufe vergleichen', summary: 'Nutze den Zinsmodus des Rechners, um einfache Verzinsung und Zinseszins über mehrere Perioden zu vergleichen.', interactive: true, depthPoints: 9 },
          { id: 'QUIZ:ECO-ZINSESZINS:VERGLEICH', kind: 'quiz', title: 'Kurztest', summary: 'Bei welchem Modell wächst die Berechnungsbasis nach jeder Periode mit?||Beim einfachen Zins||Beim Zinseszins*||Bei beiden nie||Nur bei negativem Kapital---Warum entfernen sich die beiden Verläufe mit der Zeit zunehmend voneinander?||Weil beim Zinseszins bereits entstandene Zinsen mitverzinst werden*||Weil einfacher Zins exponentiell wächst||Weil der Zinssatz automatisch steigt||Weil die Laufzeit kürzer wird---Wann ist der Unterschied besonders relevant?||Bei langen Laufzeiten und wiederholter Verzinsung*||Nur bei genau einer Periode||Nur bei Zinssatz null||Nie', depthPoints: 10 },
        ],
      },
      {
        id: 'UNIT:ECO-ZINSESZINS:TRANSFER',
        title: 'Exponentielles Wachstum richtig einschätzen',
        entryQuestion: 'Warum unterschätzen Menschen langfristige exponentielle Entwicklungen häufig?',
        takeaway: 'Exponentielle Prozesse können lange unspektakulär wirken und später stark auseinanderlaufen; deshalb müssen Rate und Zeithorizont gemeinsam betrachtet werden.',
        sections: [
          { id: 'OBS:ECO-ZINSESZINS:ZEITHORIZONT', kind: 'observation', title: 'Der Zeithorizont verändert die Aussage', summary: 'Ein kleiner prozentualer Unterschied wirkt über wenige Perioden gering, kann sich über viele Perioden aber stark akkumulieren.', depthPoints: 4 },
          { id: 'EXPL:ECO-ZINSESZINS:RATE-TIME', kind: 'explanation', title: 'Rate × Zeit', summary: 'Für exponentielle Entwicklungen reicht die Frage „Wie hoch ist die Rate?“ nicht. Ebenso wichtig ist, wie oft der Wachstumsfaktor angewendet wird.', depthPoints: 8 },
          { id: 'EXERCISE:ECO-ZINSESZINS:NOXIA-TRANSFER', kind: 'exercise', title: 'Finanzierungsentscheidung prüfen', summary: 'Vergleiche zwei NOXIA-Finanzierungen mit unterschiedlichem Zinssatz und Laufzeitprofil. Begründe, welche langfristig robuster ist und warum.', depthPoints: 9 },
          { id: 'QUIZ:ECO-ZINSESZINS:TRANSFER', kind: 'quiz', title: 'Kurztest', summary: 'Zwei Finanzierungen unterscheiden sich nur gering im periodischen Zinssatz, laufen aber sehr lange. Was sollte besonders geprüft werden?||Der kumulierte Effekt über die gesamte Laufzeit*||Nur die erste Periode||Nur die Gebäudefarbe||Nur die Kreditsumme ohne Zeit---Welche Aussage beschreibt exponentielles Wachstum am besten?||Der absolute Zuwachs bleibt immer gleich||Der Zuwachs hängt vom bereits erreichten Stand ab*||Zeit spielt keine Rolle||Die Rate muss in jeder Periode steigen---Warum kann ein kleiner Ratenunterschied langfristig wichtig werden?||Weil er wiederholt auf eine mitwachsende Basis wirkt*||Weil Zinsen nach der ersten Periode verschwinden||Weil exponentielle Prozesse linear werden||Weil der Anfangswert irrelevant ist', depthPoints: 10 },
        ],
      },
    ],
  },
];
