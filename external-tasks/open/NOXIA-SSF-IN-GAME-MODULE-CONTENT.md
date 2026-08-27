# NOXIA → SSF: Lernmodule vollständig im Spiel rendern

**Status:** open
**Quelle:** NOXIA Akademie
**Ziel-Repository:** `thomaspeterkueper/solarsciencefoundation`
**Priorität:** hoch

## Problem

NOXIA konsumiert derzeit die SSF-Modulliste über die SSF-Schnittstelle. Für komplexere Module verweist NOXIA anschließend über `ssfUrl` bzw. `/learn?...` auf die Solar Science Foundation. Dadurch verlässt der Spieler die NOXIA-Akademie und teilweise sogar die aktuelle Seite/den aktuellen Tab.

Das widerspricht der gewünschten Integration: Die Solar Science Foundation soll Content-Provider und wissenschaftliche Source of Truth sein; das eigentliche Lernerlebnis für NOXIA-Spieler soll innerhalb von NOXIA stattfinden.

## Anforderung

SSF soll NOXIA eine maschinenlesbare, versionierte Schnittstelle für den **vollständigen Inhalt eines einzelnen Lernmoduls** bereitstellen. NOXIA muss daraus einen eigenen In-Game-Viewer rendern können, ohne HTML-Seiten der SSF einzubetten oder den Spieler auf `solarsciencefoundation.vercel.app` weiterzuleiten.

Benötigt wird mindestens:

- stabile Modul-ID
- Titel
- Domain/Fachgebiet
- Schwierigkeitsgrad
- geschätzte Dauer
- Kurzbeschreibung
- vollständiger strukturierter Lerninhalt
- Inhaltsabschnitte in definierter Reihenfolge
- unterstützte Inhaltstypen, zunächst mindestens Text, Überschrift, Merksatz und Frage/Quiz; Bilder/Diagramme optional mit stabiler Asset-URL und Alt-Text
- Quiz-/Prüfungsdaten, soweit Teil des Moduls
- Freischaltungen als strukturiertes Feld (`key`, `condition` usw.)
- Voraussetzungen/Prerequisites
- Quellen/Referenzen, sofern vorhanden
- Schema-/Content-Version

## Gewünschte API-Form

Beispielsweise:

`GET /api/noxia/modules/{moduleId}`

Antwort schematisch:

```json
{
  "schema": "SSF-NOXIA-MODULE-1.0",
  "module": {
    "id": "...",
    "title": "...",
    "domain": "physics",
    "difficulty": 1,
    "durationMinutes": 3,
    "summary": "...",
    "sections": [
      { "type": "heading", "text": "..." },
      { "type": "text", "text": "..." },
      { "type": "key_point", "text": "..." }
    ],
    "assessment": [],
    "unlocks": [
      { "key": "...", "condition": {} }
    ],
    "prerequisites": [],
    "sources": [],
    "version": "..."
  }
}
```

Die genaue Struktur darf SSF festlegen; entscheidend ist eine stabile, dokumentierte und für NOXIA renderbare Content-Struktur.

## NOXIA-Kontext / gewünschter Flow

`Spielproblem → Akademie empfiehlt Modul → SSF liefert Modulinhalt → NOXIA rendert Modul → Spieler lernt → Anwendung im Spiel → Journey/Freischaltung`

SSF bleibt Source of Truth für den wissenschaftlichen Lerninhalt. NOXIA speichert bzw. definiert keine konkurrierende Kopie dieses Inhalts.

## Akzeptanzkriterien

1. Ein NOXIA-Client kann anhand einer bekannten Modul-ID den vollständigen Lerninhalt abrufen.
2. Der Response enthält keine React-/HTML-spezifische Darstellung, sondern strukturierte Inhaltsdaten.
3. Komplexe Module wie „Was die Welt aus sich macht“ lassen sich vollständig aus dem Response rekonstruieren/rendern.
4. `unlocks` und andere strukturierte Felder besitzen ein dokumentiertes Schema.
5. Die bestehende Modullisten-API bleibt kompatibel oder verweist auf die Detailressource.
6. CORS/Auth/Protection ist mit dem bestehenden serverseitigen NOXIA→SSF-Abruf kompatibel.

## Nicht Teil dieser Anforderung

- NOXIA-UI/Viewer implementieren
- NOXIA-Journey-Logik ändern
- wissenschaftliche Inhalte in NOXIA duplizieren
