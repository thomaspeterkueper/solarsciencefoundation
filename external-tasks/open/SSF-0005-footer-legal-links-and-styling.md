# SSF-0005

Status: open
Created: 2026-07-10

## Origin
Visual/functional review of the site footer, triggered by a live screenshot showing broken layout and confirmed dead links.

## Target Files
`components/SiteFooter.tsx`, `app/globals.css` or `app/design-system.css`, `lib/legal.ts`

## Reason

Three separate problems in the same component:

**1. Dead links.** `<a href="#">Impressum</a>` and `<a href="#">Datenschutz</a>` go nowhere. Real pages exist at `/imprint` and `/legal/privacy` (`/datenschutz` just redirects to `/legal/privacy`) but nothing links to them.

**2. No CSS at all.** `SiteFooter.tsx` uses `className="site-footer"` and `className="meta"`, but neither class exists anywhere in `app/globals.css` or `app/design-system.css` - confirmed by grep, zero matches. The footer renders with no spacing, no layout, plain browser defaults - links run together as "ImpressumDatenschutzAboutMembershipProgressLogin". This looks like the footer was simply not migrated when the rest of the site moved to the current `.ui-*`/`.learn-*`/`.home-hero-*` design system.

**3. "Progress" in a public, all-visitors footer is questionable IA.** Flagging, not dictating: a personal "your learning progress" link is meaningless to a logged-out visitor and arguably leaks login-state assumptions into global navigation. Recommend moving it into the main nav or an account menu for logged-in users instead, rather than the public footer - but this is a judgment call, not a hard requirement.

## Requested Change

1. Fix the two dead hrefs: `/imprint` and `/legal/privacy` (link directly to `/legal/privacy`, not `/datenschutz` - no reason to route through a redirect).

2. Give the footer real styling consistent with the current design system - reuse `.ui-*` utility classes where they fit rather than reintroducing the old, now-orphaned `.site-footer`/`.meta` rules in isolation.

3. Move `Progress` out of the public footer (see reasoning above) - open to a different resolution if there's a reason to keep it there.

4. Separately, `lib/legal.ts`'s `LegalProjectInfo` type has no `contactEmail` or `postalAddress` fields at all. `app/imprint/page.tsx` currently hardcodes both as literal placeholder strings (`'BITTE-IM-KNOWLEDGE-GRAPH-ERGAENZEN'`) completely disconnected from `getLegalProjectInfo()` - even once the Knowledge Graph fills in `ORG:SSF`'s legal fields (separate request, KG-REQ-20260710-org-ssf-legal-fields), these two would still show the hardcoded placeholder. Extend the type and read from `info.contactEmail`/`info.postalAddress` instead.

## Priority
Medium - not breaking anything critical, but the Impressum/privacy pages are legally-relevant and currently both unreachable from the site and, once reachable, would show a broken layout plus literal placeholder text.

## Blocking
Nothing else blocks on this. Independent of KG-REQ-20260710 (that request supplies the data values; this fixes the code that would otherwise ignore them).

## Status
Open
