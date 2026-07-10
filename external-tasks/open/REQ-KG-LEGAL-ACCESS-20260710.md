# REQ-KG-LEGAL-ACCESS-20260710 — Zentrale Rechtstexte aus dem KG beziehen

## Target System
`SYS:KUEPER:ssf`

## Origin
`SYS:KUEPER:knowledge-graph`

## Status
Open

## Priority
High vor öffentlicher Freigabe und vor Aktivierung von Konten

## Zweck
SSF konsumiert zentrale Rechtstexte aus dem Knowledge Graph. Verantwortlichen-Daten und Rechtstexte dürfen nicht als lokale zweite Wahrheit gepflegt werden.

## Kanonische Quellen

- `exports/document-references-0.1.json`
- `registry/legal/impressum-master.json`
- `registry/legal/datenschutz.de.md`
- `registry/legal/terms.de.md`

Quelle: `thomaspeterkueper/kueper-knowledge-graph`

IDs:

- `DOC:KUE:LEGAL-IMPRINT-DE`
- `DOC:KUE:LEGAL-PRIVACY-DE`
- `DOC:KUE:LEGAL-TERMS-DE`

## Requested Change

1. Dokumente über die Document-Reference-Registry auflösen und die angegebenen `sourcePath`-Dateien build- oder serverseitig laden.
2. Impressums-Platzhalter aus `registry/legal/impressum-master.json` ersetzen.
3. Lokale Seiten für Impressum, Datenschutz und Nutzungsbedingungen rendern und im Footer verlinken.
4. Keine Client-seitige GitHub-/KG-Abfrage; Legal-Inhalte müssen im Build oder serverseitig verarbeitet werden.
5. Rechtstexte nicht lokal fachlich verändern. Technische SSF-Fakten als KG-Request zurückmelden.
6. Vor Veröffentlichung ausdrücklich bestätigen, ob SSF produktive Benutzerkonten, Supabase-Auth, Session-Cookies und Lernfortschritt speichert. Diese Bestätigung ist für Abschnitt 7 der Datenschutzerklärung erforderlich.
7. Datenfelder, Region, Löschweg und Aufbewahrungsfristen für SSF-Konten dokumentieren und dem KG melden.
8. Privacy und Terms sind aktuell `draft_productive` und nicht juristisch freigegeben; erst nach `released` als freigegebene Rechtstexte veröffentlichen.

## Temporärer Zugriff

Bis ein öffentlicher KG-Endpunkt verfügbar ist, beim Build aus dem öffentlichen KG-GitHub-Repository lesen. Pfade stets über `exports/document-references-0.1.json` auflösen; keine dauerhaften Textkopien anlegen.

## Akzeptanzkriterien

- SSOT bleibt der KG.
- Verantwortlichen-Daten werden nicht dupliziert.
- Konten-/Supabase-Status ist verifiziert und an den KG zurückgemeldet.
- Keine Browser-Laufzeitabfrage an GitHub/KG.
- Footer-Links und Legal-Seiten funktionieren.
- Draft-/Release-Status wird respektiert.

## Created
2026-07-10

## Curator
T.P.K.
