<!--
KUEPER · Solar Science Foundation (SSF)
Path:    external-tasks/open/SSF-IMPL-footer-legal-links.md
Version: 1.0.0
Created: 2026-07-10
Depends: REQ-KG-LEGAL-ACCESS-20260710 (done)
-->

# SSF-IMPL-footer-legal-links
## Legal-Links im Footer einbauen

**Target:** `SYS:KUEPER:ssf`
**Origin:** OTA-Kurator
**Status:** Open
**Priority:** High — vor öffentlicher Bewerbung
**Blocking:** Vollständige Datenschutz-Compliance

---

## Ist-Zustand

`components/SiteFooter.tsx` enthält im "Rechtliches"-Block:
```tsx
<Link href="/imprint">Impressum</Link>
<Link href="/legal/privacy">Datenschutz</Link>
```

Die verlinkten Routen `/imprint` und `/legal/privacy` existieren nicht.  
Die neuen Seiten liegen unter:
- `/de/impressum` → `app/de/impressum/page.tsx`
- `/de/datenschutz` → `app/de/datenschutz/page.tsx`
- `/de/nutzungsbedingungen` → `app/de/nutzungsbedingungen/page.tsx`

---

## Requested Change

### 1. `components/SiteFooter.tsx` — Links korrigieren

```tsx
<div className="site-footer-group">
  <span>{isGerman ? 'Rechtliches' : 'Legal'}</span>
  <Link href={`${prefix}/impressum`}>
    {isGerman ? 'Impressum' : 'Imprint'}
  </Link>
  <Link href={`${prefix}/datenschutz`}>
    {isGerman ? 'Datenschutz' : 'Privacy'}
  </Link>
  <Link href={`${prefix}/nutzungsbedingungen`}>
    {isGerman ? 'Nutzungsbedingungen' : 'Terms'}
  </Link>
</div>
```

### 2. EN-Routen ergänzen (optional, falls EN-Sprachpfad genutzt wird)

Englische Äquivalente anlegen oder auf DE-Seiten weiterleiten:
- `app/en/impressum/page.tsx` → redirect auf `/de/impressum`
- `app/en/privacy/page.tsx` → redirect auf `/de/datenschutz`
- `app/en/terms/page.tsx` → redirect auf `/de/nutzungsbedingungen`

### 3. Verifikation

- Footer zeigt alle drei Links in DE und EN
- `/de/impressum`, `/de/datenschutz`, `/de/nutzungsbedingungen` laden korrekt
- Inhalte kommen aus KG (kein lokaler Text)
- Draft-Banner sichtbar bis Status `released`

---

## Akzeptanzkriterien

- `href="/imprint"` und `href="/legal/privacy"` nicht mehr im Code
- Alle drei Legal-Seiten über Footer erreichbar
- Kein 404 auf Legal-Routen

---

*Kurator: T.P.K. · 2026-07-10*
