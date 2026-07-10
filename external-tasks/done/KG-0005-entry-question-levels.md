# KG-0005

Status: done (KXF-Seite)
Completed: 2026-07-10

## Resolution

KXF-Schema: `meta.entryQuestions` mit L0/L1/L2 als optionale Felder hinzugefügt.
Alle Module mit bestehender entryQuestion haben L0=L1=bestehende Frage.
L2 ist für alle Module [AUSSTEHEND] — wird kuratiert befüllt wenn Inhalte vorliegen.

SSF-seitige Nutzung (lib/learning-modules.ts): normalizeModule() ergänzen um
entryQuestions-Mapping. Auswahl-Logik (L0 für neue Nutzer etc.) bleibt SSF-intern.

Akzeptanzkriterium: KXF-Schema backward-kompatibel (Felder optional). ✓
