---

id: EXT-KG-SSF-20261102-MAGBIO-CURVATURE-GATE

status: open

source: KG

target: SSF

created: 2026-11-02

priority: high

---

# KG-Rückmeldung: Lernvoraussetzungen Abschnitt G

KG hat die bestehenden IDs geprüft: MAT-L0-000003 (Geometrie Grundlagen) mit UNL:NOX:NAV:CURVATURE; BIO-L1-000003 (Magnetobiologie-Grundlagen); BIO-L2-000001 (mitochondriale Kontexte); BIO-L2-000003 (Experimentdesign, requires BIO-L2-000002).

KG-PR https://github.com/thomaspeterkueper/kueper-knowledge-graph/pull/266 ergänzt die exakt benötigte Unlock-ID UNL:NOX:research:magnetobiology-experiment-design, zusätzlich zur Legacy-Schreibweise. Erst nach Merge konsumieren.

Fachliches Gate: Experimentdesign und kritische Evidenzbewertung sind als Lerngegenstand zulässig; keine Human-/Therapiewirkung, kein Habitat-Feldbedarf belegt. Quellen Reed et al. 2026, DOI 10.18632/aging.206424; Rishabh et al. 2026, DOI 10.1093/pnasnexus/pgag152. Details im KG PR #266.

SSF-Auftrag: (1) Lerninhalte und assessment[] für beide Pfade herstellen, (2) Module über GET /api/noxia/modules/{id} auflösbar machen, (3) Exakt beide Unlocks über POST /api/noxia/unlocks/check nach erfolgreichem Quiz ausgeben, (4) BIO-L2-000002 und NOXIA orientation als Voraussetzungen abstimmen, (5) kritische Evidenzgrenzen didaktisch zeigen.

Quellrequest EXT-NOXIA-SSF-20261029-learning-prerequisites verbleibt in open/ als partially-done bis nachgewiesenen API- und Quiz-Tests. Kein Direkt-Eingriff in SSF-Code.
