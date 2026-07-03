# SSF-CORE.md
## Solar Science Foundation · Kerndokument

**Version:** 0.2.1  
**Erstellt:** 2026-07-03  
**Geändert:** 2026-07-03 · KG-0004 RESOLVED: EP-Präfix, Modul-IDs, PATH-Modell, Repo-Slug, Autoren-Merksatz  
**Status:** Draft · bereit zur Übernahme als Referenzversion  
**Repo:** thomaspeterkueper/solarsciencefoundation  

---

## 0. Vorbemerkung

Dieses Dokument ist das Kerndokument der Solar Science Foundation (SSF).

Es beschreibt nicht, was die SSF veröffentlicht.  
Es beschreibt, **warum sie existiert, wie sie Wissen versteht, und wie dieses Wissen strukturiert wird.**

Alle anderen SSF-Dokumente, Module, Lernpfade, Visualisierungen und NOXIA-Verbindungen leiten sich aus diesem Kerndokument ab.

---

## 1. Mission

Die Solar Science Foundation ist eine unabhängige Lernplattform für wissenschaftliche Neugier.

Sie richtet sich an Menschen, die verstehen wollen, **wie die Welt funktioniert** — nicht an Menschen, die einen Kursabschluss brauchen.

Die SSF glaubt:

- Wissenschaft beginnt nicht mit Definitionen. Sie beginnt mit Beobachtungen.
- Jeder Mensch hat Fragen. Die SSF verbindet diese Fragen mit dem Wissen, das dahinterliegt.
- Lernen ist kein linearer Fortschritt. Es ist ein Netzwerk aus Entdeckungen.

Die SSF ist kein Schulbuch. Sie ist kein MOOC. Sie ist ein **Wissensnetzwerk** — durchquerbar, verlinkbar, und dauerhaft wachsend.

---

## 2. Wissenschaftsverständnis

### 2.1 Neugier vor Taxonomie

Die SSF zeigt Lernenden **keine Disziplinlabels**.

Ein Modul trägt nicht die Aufschrift „Physik" oder „Chemie". Es beginnt mit einer Frage oder einer Beobachtung:

> *Warum klingt ein vorbeifahrendes Auto anders als ein stehendes?*  
> *Warum schillert eine CD im Licht?*  
> *Warum kühlt Kaffee in einer breiten Tasse schneller ab als in einer schmalen?*

Die Disziplinzugehörigkeit ist interne Architektur — sie gehört in den Knowledge Graph, nicht auf den Bildschirm des Lernenden.

### 2.2 Wissen hat Voraussetzungen

Kein Wissensinhalt existiert isoliert. Jedes Konzept setzt anderes Wissen voraus. Die SSF macht diese Struktur sichtbar — als Netzwerk, nicht als Curriculum.

Ein Lernender, der noch nicht bei Voraussetzung A ist, sieht Modul B als **gesperrte Vorschau**, nicht als leere Seite. Der Horizont ist sichtbar. Die Neugier bleibt erhalten.

### 2.3 Tiefe ist asymptotisch

Kein Thema ist je vollständig gelernt. Die SSF verwendet eine logarithmische Tiefenformel:

```
Tiefe = 100 × (1 − 1 / (1 + Fortschritt / 28))
```

Frühe Schritte fühlen sich schnell an. Spätere Schritte werden kleiner — nicht weil das Lernen schlechter wird, sondern weil das Thema tiefer wird. 100 % wird nie erreicht. Das ist kein Fehler. Das ist Ehrlichkeit.

### 2.4 Narrative illustrieren, definieren nicht

Die SSF nutzt Geschichten, Analogien und Beispiele aus dem Alltag. Diese Elemente sind **EP4-Inhalte** in der SSF-Wissenspyramide (s. §3.1): Sie illustrieren Wissen, definieren es aber nicht.

Kanonisches Wissen — Formeln, Definitionen, Relationen — stammt immer aus dem KUEPER Knowledge Graph (EP0–EP2).

---

## 3. Wissensmodell

Die SSF konsumiert Wissen aus dem KUEPER Knowledge Graph (KG) via KXF-Export.

Sie definiert **kein eigenes kanonisches Wissen**. Wenn Wissen fehlt, wird ein KG-Request gestellt.

### 3.1 Epistemische Pyramide (EP0–EP4) — intern, nicht lernerseitig sichtbar

Die SSF verwendet eine fünfstufige epistemische Pyramide zur Klassifikation von Inhaltstypen. Das Präfix `EP` (Epistemic Pyramid) ist kollisionsfrei gegenüber den kanonischen KG-Skalen (ARC-0006 §VI: `L0–L9` = Modul-Komplexität; ARC-0005: `N0–N3` = Dokument-Vorwissen).

| Stufe | Bezeichnung | Beispiel |
|-------|-------------|---------|
| EP0 | Foundation | Physikalische Konstanten, Grundaxiome |
| EP1 | Knowledge | Konzepte, Definitionen, Formeln |
| EP2 | Models | Vereinfachende Modelle, Theorien |
| EP3 | Applications | Konkrete Anwendungen, Aufgaben |
| EP4 | Narratives | Analogien, Geschichten, Alltagsbeispiele |

Der Informationsfluss ist EP0 → EP4. Narrative definieren keine Grundlagen.

**Verhältnis zu kanonischen KG-Skalen:** Die EP-Stufe beschreibt den *epistemischen Typ* eines Inhalts (was er ist). Die kanonische L0–L9-Skala (ARC-0006 §VI) beschreibt die *Komplexität* eines Moduls (wie schwer es ist). Beide Achsen sind orthogonal und können gleichzeitig an einem Modul anliegen.

> **Merksatz für Autoren:**  
> `EP` beschreibt die **Art** des Wissens.  
> `L` beschreibt die **Komplexität** des Moduls.  
> `N` beschreibt das **benötigte Vorwissen**.  
> Drei Fragen — drei Achsen — keine Überschneidung.

### 3.2 Modul-Struktur (KXF)

Jedes SSF-Lernmodul ist im KXF-Format beschrieben. Ein Modul enthält:

- **id** — kanonische KG-ID, vergeben ausschließlich durch den KG (ARC-0006 §III.2), Format z. B. `PHY-L1-000001`
- **legacyId** — Export-/Tracking-Schicht (ARC-0006 §III.3), Format `LRN:SSF:PHY-1101`; nicht als primäre ID verwenden
- **Titel** — intern, für die KG-Verwaltung
- **Einstiegsfrage** — lernerseitig sichtbar, keine Disziplinkennzeichnung
- **Prerequisites** — Liste von kanonischen Modul-IDs, die vorher abgeschlossen sein müssen
- **Domain** — interne Zuordnung (z. B. `PHY`, `CHE`, `MAT`)
- **Komplexität** — Modul-Komplexitätsstufe nach ARC-0006 §VI (`L0–L9`)
- **NOXIA-Keys** — Fähigkeiten, die nach Abschluss freigeschaltet werden

### 3.3 Wissensarchitektur

```text
KUEPER Knowledge Graph
        │
       KXF
        │
Solar Science Foundation
   ├── Lernmodule (Inhalte, Fragen, Visualisierungen)
   ├── Lernpfade (abgeleitete Graphen aus Prerequisites)
   ├── Fortschrittslogik (lib/progress.ts)
   └── NOXIA-Key-Grants (Fähigkeiten für das Spiel)
```

Die SSF **liest** Wissen. Der KG **definiert** Wissen.

---

## 4. Lernpfade

Lernpfade in der SSF sind keine manuell kuratierten Kurse. Sie basieren auf **PATH-Objekten** (`PATH:SSF:*`), die im KG registriert und in der SSF didaktisch zusammengestellt werden (ARC-0006 §VIII).

Ein PATH-Objekt beschreibt eine geordnete oder teilgeordnete Sequenz von Modul-IDs mit einem definierten Zielmodul. Die Ableitung eines Pfades aus der reinen Prerequisite-Struktur — z. B. als kürzester Weg — ist eine mögliche Zusammenstellungsstrategie, aber keine Definition eines Lernpfades. Verzweigte und nicht-lineare Pfade sind als `[OFFEN]` geführt (ARC-0006 §X) und werden hier nicht als gelöst behandelt.

Wenn ein benötigter PATH noch nicht im KG registriert ist, wird ein KG-Request gestellt.

### 4.1 Sichtbarkeit und Pull

Lernende sehen immer:

- **Was sie abgeschlossen haben** — freigeschaltet, vollständig zugänglich
- **Was als nächstes möglich ist** — freigeschaltet, aber noch nicht begonnen
- **Was danach kommt** — gesperrte Vorschau, Titel und Einstiegsfrage sichtbar

Die gesperrte Vorschau ist absichtlich. Sie erzeugt Anticipation statt Obligation.

### 4.2 Kein vorgeschriebener Einstieg

Es gibt keinen Pflicht-Startpunkt. Lernende beginnen dort, wo ihre Neugier ist. Fehlen Voraussetzungen, zeigt das System transparent, was noch aussteht — ohne Bewertung.

---

## 5. Lernmodule — Aufbau

Ein SSF-Lernmodul folgt diesem Grundprinzip (angelehnt an das PDF-Lernheft-Format als Referenz):

```
1. Einstiegsfrage / Beobachtung
   (Alltagsanker, keine Disziplinbezeichnung)

2. Erklärung
   (konzise, mit Visualisierung nur wo notwendig)

3. Kernkonzept
   (das eine Ding, das dieses Modul vermittelt)

4. Aufgabe / Quiz
   (Anwendung, nicht Reproduktion)

5. Verbindungen
   (was dieses Modul mit anderen Modulen verbindet)
```

**Visualisierungen:** Nur dort eingesetzt, wo Text allein das Konzept nicht vermitteln kann. Kein Dekor.

**Sprache:** Bilingual DE/EN. Deutsch für inhaltliche Stimme, Englisch für Code und technische Spezifikation.

---

## 6. Prüfungen und Fortschritt

Die SSF verzichtet auf klassische Prüfungslogik im Sinne von „Bestehen oder Scheitern".

Stattdessen:

- Quizfragen messen Verständnis, kein Auswendiglernen
- Falsche Antworten öffnen Erklärungen, keine Strafpunkte
- Fortschritt ist kumulativ und logarithmisch (s. Abschnitt 2.3)
- Badges und Zertifikate sind möglich, aber nachrangig gegenüber dem Lernerleben

---

## 7. NOXIA-Verbindung

NOXIA ist ein Science-Exploration-Spiel, das mit der SSF verbunden ist.

Lernende, die SSF-Module abschließen, erhalten **NOXIA-Keys** — Fähigkeiten im Spiel, die ohne das zugrundeliegende Wissen nicht verfügbar wären.

Beispiele:

| NOXIA-Key | Freigeschaltet durch |
|-----------|----------------------|
| `SENSOR:SPECTRAL` | Optik-Modul (Lichtspektrum) |
| `MISSION:LAB-ALPHA` | Grundlagenpaket Chemie |
| `NAV:ORBITAL` | Astronomie-Modul (Umlaufbahnen) |

NOXIA illustriert Wissen durch Spiel. NOXIA definiert kein Wissen.  
Der Kausalfluss ist: **SSF-Modul → NOXIA-Key**, nie umgekehrt.

---

## 8. Verbindung zu KUEPER.com

KUEPER.com ist die Publikationsplattform im KUEPER-Ökosystem.

SSF-Inhalte können dort als Artikel oder Essays erscheinen (EP4-Ebene: Narratives). Diese Inhalte sind Derivate von SSF-Modulen, keine Quellen.

---

## 9. Governance

### 9.1 Grundregel

Die SSF definiert keine eigenen kanonischen Entitäten, Relationen oder Taxonomien.

Alle strukturellen Anfragen gehen als KG-Request in den KUEPER Knowledge Graph.

### 9.2 Request-Workflow

```
SSF stellt fest: Wissen fehlt oder Modul-ID wird benötigt
        ↓
KG-Request erstellen (external-tasks/open/KG-000N.md)
        ↓
Kuratorische Prüfung im KG
        ↓
Annahme → KXF-Export → SSF konsumiert
Ablehnung → SSF passt Anfrage an oder verwirft
```

### 9.3 Scope-Kontrolle

Neue Features und Erweiterungen werden **zuerst als Request dokumentiert**, bevor sie implementiert werden. Das verhindert Parallel-Entwicklungen und Scope-Creep.

---

## 10. Langfristiges Ziel

Die SSF ist kein Kursanbieter, der Wissen in Pakete verpackt.  
Sie ist ein **Wissensnetzwerk** — durchquerbar, verlinkbar, wachsend.

Der Unterschied:

| | Inhalte | Kurse | SSF |
|---|---------|-------|-----|
| Wikipedia | ✓ | | |
| Udemy | | ✓ | |
| SSF | | | ✓ Wissensnetzwerk |

Der KUEPER Knowledge Graph ist das dauerhafte Gedächtnis dieses Netzwerks.  
SSF-Module, Lernpfade, NOXIA-Keys und Inhalte entstehen, verändern sich und werden ersetzt.  
Der Graph bleibt.

---

*Solar Science Foundation · SSF-CORE.md · v0.2.1 · 2026-07-03*  
*Autor: Thomas Peter Küper · Repo: thomaspeterkueper/solarsciencefoundation*  
*v0.2.0: KG-0004 — EP-Präfix (§2.4, §3.1), kanonische Modul-IDs (§3.2), PATH-Modell (§4), Repo-Slug*  
*v0.2.1: KG-0004 RESOLVED — Autoren-Merksatz EP/L/N (§3.1) · Status: Referenzversion*
