<!--
KUEPER · Solar Science Foundation (SSF)
Path:     docs/OPEN-QUESTIONS.md
Version:  0.1.0 (Konzept — Phase 3)
Created:  2026-07-08
Source:   SSF-0002
-->

# OPEN-QUESTIONS.md
## Didaktischer Wissenslücken-Workflow (Konzept)

**Status:** Konzept · Phase 3  
**Quelle:** SSF-0002  
**Blocking:** Nein — Phase 1/2 nicht betroffen  

---

## 1. Prinzip

Wissenslücken sind kein Fehler — sie sind produktiver Teil des Lernprozesses.

Wenn ein Lernender eine Frage stellt, die kein bestehendes Modul beantwortet,
erhält diese Frage einen Status — analog zum KG-Request-Workflow:

```
Lernender stellt Frage
  → SSF nimmt sie entgegen (OFFEN)
  → Kuratorische Prüfung (IN PRÜFUNG)
  → KG-Request falls Modul fehlt (GEPLANT)
  → Integration in SSF als neues Modul (BEANTWORTET)
  → oder: Frage liegt außerhalb Scope (AUSSERHALB)
```

---

## 2. Statusmodell

| Status | Bedeutung |
|--------|-----------|
| OFFEN | Frage eingereicht, noch nicht geprüft |
| IN PRÜFUNG | Kuratorische Bewertung läuft |
| GEPLANT | Modul in Entwicklung |
| BEANTWORTET | Verweis auf vorhandenes oder neues Modul |
| AUSSERHALB | Frage liegt außerhalb des SSF-Scope |

---

## 3. Technische Voraussetzungen (Phase 3)

- Supabase-Tabelle `open_questions`
- Moderationsinterface für den Kurator
- Anzeige im Lernbereich (LearnMap oder Modulseite)
- KXF-Integration: neues Feld `open_questions` oder Verknüpfung mit KG-Request

---

## 4. Abgrenzung

Dieser Workflow ist kein Feedback-Formular und kein Bug-Tracker.  
Er ist ein didaktisches Signal: **Wissen wächst durch Fragen.**

---

*Konzept — Implementierung in Phase 3. Kurator: T.P.K. · 2026-07-08*
