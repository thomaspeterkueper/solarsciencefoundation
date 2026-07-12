# SSF-0005

Status: done
Completed: 2026-07-12

## Resolution

- Dead links fixed under a separate task (`SSF-IMPL-footer-legal-links`,
  2026-07-10) - /imprint, /datenschutz, new /nutzungsbedingungen, EN
  redirects to DE (legal texts only in German).
- `Progress` already removed from the public footer by that same change -
  now About / Membership / Sign in.
- `LegalProjectInfo` already carries `contactEmail`/`postalAddress` - the
  legal data source moved entirely (`lib/legal.ts` v1.1.0, reads
  `registry/legal/impressum-master.json`) and was built with these fields
  from the start.
- Missing CSS (`.site-footer` and children had zero rules, links rendered
  with no spacing) - fixed 2026-07-12, `app/design-system.css`, commit
  88cc675. Matches existing design tokens (`--border`, `--muted`, `--navy`,
  font vars) rather than introducing new ones.
