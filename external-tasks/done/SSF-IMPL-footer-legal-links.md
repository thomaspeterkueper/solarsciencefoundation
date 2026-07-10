# SSF-IMPL-footer-legal-links

Status: done
Completed: 2026-07-10

## Resolution

- components/SiteFooter.tsx: Links korrigiert
  - /imprint → prefix/impressum
  - /legal/privacy → prefix/datenschutz
  - Neu: prefix/nutzungsbedingungen
- EN-Redirects: app/en/impressum, app/en/privacy, app/en/terms
  leiten auf deutsche Seiten weiter (Rechtstexte nur auf DE)
