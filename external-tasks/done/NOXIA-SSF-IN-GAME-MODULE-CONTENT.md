# NOXIA → SSF: Lernmodule vollständig im Spiel rendern

**Status:** done
**Quelle:** NOXIA Akademie
**Ziel-Repository:** `thomaspeterkueper/solarsciencefoundation`
**Priorität:** hoch

## Umsetzung

SSF stellt mit `GET /api/noxia/modules/{moduleId}` einen versionierten, React-/HTML-unabhängigen Modulvertrag bereit. Didaktische Inhalte werden als geordnete Sections und Assessments geliefert; kanonische Metadaten, Unlocks, Quellen, Versionen und Lernpfadbezug bleiben strukturiert. Die Listen-API bleibt erhalten und verweist per `detailUrl` auf die Detailressource.

Die NOXIA-UI selbst wurde entsprechend der Repository-Grenze nicht verändert.
