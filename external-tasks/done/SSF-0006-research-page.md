# SSF-0006

Status: done (with one open follow-up)
Completed: 2026-07-12

## Resolution

Built `/research` and `/de/research` - lists OTA documents that have a real
published prerequisite path (currently OTA-SCI-0083, OTA-FND-0028), each
linking to their existing detail page. Honest about scale: notes the total
registered document count (209) and explains why most aren't listed - they
don't have a connected prerequisite path yet, registration and connection
are different steps.

Also built `/ota/[documentId]` - the English document detail page. Only a
German version (`/de/ota/[documentId]`) existed before; an English Research
link would have 404'd without this.

Added `getResearchOverview()` to `lib/ota.ts` to fetch and group this data,
shared by both locale pages.

## Side fixes found and fixed during verification

- Three legal pages (`app/de/impressum`, `app/de/datenschutz`,
  `app/de/nutzungsbedingungen`) had broken JSX syntax - `style={ ... }`
  instead of `style={{ ... }}` - throughout. This failed `tsc --noEmit`
  outright. Fixed all three.
- `app/api/legal/project/route.ts` imported `buildConfirmSignupEmailText`
  from `lib/legal.ts`, which didn't exist - lost when `lib/legal.ts` was
  rewritten to the impressum-master.json version. Added a minimal DE/EN
  implementation using the existing `LegalProjectInfo` fields.

Both were pre-existing, unrelated to this task - found because a real
`next build` was run to verify this work, not just `tsc --noEmit`.

## Not resolved - filed separately

`next build` still fails after all of the above, with a vague, contextless
error ("The 'id' argument must be of type string. Received undefined",
Turbopack build worker crash) that gives no file or line reference.
Confirmed via isolation testing that this is **not** caused by anything in
this task - it reproduces identically with `app/research`, `app/de/research`
and `app/ota/[documentId]` completely removed. Pre-existing, deeper issue.
Filed as `SSF-0007-turbopack-build-worker-crash.md`.

All code in this task passes `tsc --noEmit` cleanly and was verified as
correct as far as static analysis can confirm - the remaining build failure
is unrelated and needs separate investigation, ideally by someone who can
bisect further back in history than this session had time for.
