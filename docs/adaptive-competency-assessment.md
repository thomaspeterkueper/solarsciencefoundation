# Adaptives Kompetenzprofil und Einstufung – SSF

Status: Konzept/Implementierungsvertrag, 2026-11-13. Ergänzung zu docs/physics-learning-progression.md und Issue #93.

## Kerngedanke
Ein erster Diagnosetest dient nicht dazu, Menschen in ein starres Level einzusortieren. Er liefert **vorläufige Evidenz** für einzelne Kompetenzen und empfiehlt den nächsten passenden Lernknoten. Weitere praktische Aufgaben, Erklärungen und Tests aktualisieren das Profil kontinuierlich. Dieses Modell ist für die eigenständige SSF und NOXIA gemeinsam nutzbar.

## Drei getrennte Dimensionen
1. **Wissenschaftliche Kompetenzen (SSF)**: nachweisbares fachliches Verständnis je Themengebiet, z. B. Größen messen, Kraft und Bewegung, Umgang mit Unsicherheit. SSF ist Quelle der Wahrheit für Kompetenzstände und Assessment-Evidenz.
2. **Praktische Erfahrung (NOXIA)**: instrumentelle Übung, Bedienung, ausgeführte Handlungen und rollenspielbezogene Erfahrung. NOXIA verantwortet diese Spielskills und ihren Zustand.
3. **Berechtigungen/Freischaltungen (NOXIA)**: explizite Regeln, die aus attestierten Kompetenzen *und gegebenenfalls* Praxiserfahrung, Geräten, Rollen etc. konkrete Spielaktionen erlauben. Kein Gleichsetzen von Wissensniveau mit Bedienungserfahrung.

## Einstufung beim ersten Kontakt
- Optionaler, kurzer, adaptiver Eingangstest (3–8 Aufgaben, mit Obergrenze für Dauer); ebenso direktes Starten auf Anfängerniveau möglich.
- Mix aus visuellen Alltagsfragen, Vorhersagen und Mini-Experimenten. Keine langen Prüfungsbögen.
- Pro Aufgabe Zuordnung zu stabiler Kompetenz-ID, Schwierigkeitsgrad, Rubrik und evidenzbasiertem Auswertungskriterium.
- Ergebnis als Menge individuell eingeschätzter Kompetenzen mit Konfidenz, nicht als pauschales Fach-Level oder wertender Personenvergleich.
- Bei fehlendem Nachweis: Status 'noch nicht nachgewiesen', nicht 'kann es nicht'. Selbstgewählte höhere Herausforderung stets möglich.
- Wiederholung/Neubewertung möglich; Schutz vor Zufallstreffern durch unabhängige Aufgaben und Anwendung.

## Kontinuierliche Fortschreibung
- Neue erfolgreiche Aufgaben erzeugen überprüfbare Kompetenz-Evidenzereignisse mit Modul-ID, Kompetenz-ID, Taskversion, Kontext, Ergebnis und Zeitpunkt.
- Kompetenzstatus beispielsweise: noch nicht geprüft → in Entwicklung → angewendet → sicher nachgewiesen; Konfidenz separat.
- Schlechtere spätere Ergebnisse können gezielte Wiederholung empfehlen; keine willkürliche Löschung historischer Lernleistungen.
- Lernpfadempfehlung basiert auf Voraussetzungskompetenzen und gewünschtem Lernziel. Prüfungen sind nicht zwingend an starre Kapitelnummern gebunden.
- Fortschrittsanzeige getrennt: „Was kann ich?“ (Kompetenzen), „Was habe ich gemacht?“ (Aktivitäten), „Was kann ich im Spiel?“ (NOXIA-Skills/Unlocks).
- Für Spielende darf ein zusammenfassender Einstufungsskill steigen, aber nur als **abgeleiteter, erklärbarer Wert** aus fachspezifischen Kompetenznachweisen. Er ersetzt keine individuellen Voraussetzungen.

## Illustratives Beispiel
Eingangsdiagnostik: Spielerin erkennt einfache Bewegungszusammenhänge, kann Geschwindigkeiten vergleichen, verwechselt aber Messunsicherheit mit Fehler. PHY-02 wird als bereits nachgewiesen eingestuft, PHY-06 als späteres Ziel empfohlen, PHY-01-Übung zur Messgenauigkeit zuerst angeboten. Nach einem geeigneten Experiment steigt die attestierte Messkompetenz; NOXIA kann anschließend eine konkrete Labormission freigeben. Ein Wissensnachweis allein verleiht keine Erfahrung im Bohren.

## Datenvertrag (Vorschlag; zunächst gegen Bestand prüfen)
- competenceId (stabile SSF/KG-verknüpfte ID)
- assessmentId, taskVersion, moduleId
- evidence: type, scoredOutcome, reliability, timestamp, provenance
- competencyLevel, confidence, assessedAt
- learningRecommendation: pathId, reasons, unmetPrerequisites
- progressSource: standaloneSSF / noxiaAdapter (keine verschiedenen Bewertungsregeln)
- eventId/idempotencyKey zur Vermeidung von Doppelgutschriften; Authentisierung und Rechteprüfung serverseitig
- Datenschutzzwecke, minimale Datenspeicherung und erlaubte Profilverknüpfung ausdrücklich festlegen.

## Qualitäts- und Sicherheitsregeln
- Spieler darf keine Kompetenzen oder Credits selbst signieren; bewertet wird serverseitig anhand belegter Aufgabenhandlungen.
- Persistente Verknüpfung SSF ↔ NOXIA nur mit bewusstem Account-Linking; anonyme SSF-Nutzung bleibt möglich.
- Übungsfeedback unmittelbar; summative Prüfungsinhalte/Antworten gegen triviales Wiederholen schützen.
- Fairness: verschiedene Lösungswege, barrierearme Bedienung, kein Nachteil für schwache Lesefertigkeit bei einer Physikkompetenz.
- Kein dauerhafter Fähigkeitsverlust durch Inaktivität ohne fachlich begründete Nachprüfung.

## Tests/Abnahme
1. Anfänger erhält einen sinnvollen Beginn; Fortgeschrittener kann Grundlagen nachweisen und überspringen.
2. Unterschiedliche Fachkompetenzen steigen unabhängig und nachvollziehbar.
3. Die Empfehlung ändert sich nach neuen Erfolgen; Voraussetzungen werden überprüft.
4. SSF ohne NOXIA voll funktionsfähig und ohne Bezug auf Spiel-Credits verständlich.
5. NOXIA erhält nur autorisierte Nachweise/Unlock-Information, keine unsichtbaren Modell- oder Weltwerte.
6. Duplizierte Ereignisse erzeugen keine doppelten Belohnungen; Frontendwerte allein sind nicht ausreichend.
7. Praktischer Spielskill und wissenschaftliches Wissen bleiben getrennt.
