# SSF-0007

Status: done
Completed: 2026-07-13

## Root cause (two stacked bugs, not one)

**1. `package.json` pinned `"typescript": "7.0.2"`.** Next.js 16.2.10's
build worker does not recognize this TypeScript release - every build
re-triggered a spurious "TypeScript not installed, installing..." step, and
the actual crash ("The 'id' argument must be of type string. Received
undefined") happened inside Next's TypeScript-integration code during page
data collection, not in application code at all. This is why no file/line
reference ever appeared, and why it was previously mistaken for a
Turbopack-specific issue - it reproduced identically under `--webpack` too
once actually tested. Downgraded to `typescript@5.7.3`.

**2. `@/` path-alias imports.** Six files (`components/LearnMap/*.tsx`,
`lib/learning-modules.ts`) were the only place in the entire codebase using
`@/lib/...` / `@/components/...` imports - everywhere else uses relative
paths. These failed to resolve under both webpack and Turbopack despite
`tsc` resolving them fine (a real TS-vs-bundler resolution gap, root cause
not fully chased down given the ecosystem-wide relative-path convention
already worked reliably). Converted all six to relative imports, matching
the rest of the codebase.

Fixing only #1 revealed #2 as the next blocker (clear "Module not found"
errors once the vague crash was gone) - both had to be fixed together to get
a clean build.

**3. Smaller, found once the above cleared:** `app/learning-paths/page.tsx`
passed `onMouseEnter`/`onMouseLeave` handlers on an async Server Component -
not allowed in React Server Components. Replaced with a `.path-card` CSS
class (`:hover` in `app/design-system.css`) - same visual effect, no JS
needed for what was always a pure hover-state style change.

## Verification

`rm -rf .next && npx next build --webpack` -> exit 0, all 43+ routes
generated. `rm -rf .next && npx next build` (Turbopack, the default) -> exit
0 also. Both builders now produce a clean production build.

## Why this matters beyond the crash itself

Confirmed via a live screenshot that this was blocking real Vercel
deployments, not just local builds - the live site was showing stale
content (old footer text, missing CSS, dead links) from before several
today's fixes (SSF-0005, SSF-0006, MISSION.md/BRAND.md updates), because
every deploy since whenever `typescript@7.0.2` landed had been silently
failing while Vercel kept serving the last successful build. This should
unblock all of that once it deploys.
