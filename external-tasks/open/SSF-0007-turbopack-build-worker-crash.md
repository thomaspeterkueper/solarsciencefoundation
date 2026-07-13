# SSF-0007

Status: open
Created: 2026-07-13

## Origin
Found while running a full `next build` to verify SSF-0006 (Research page),
not something that task caused - confirmed by removing all of SSF-0006's
files and reproducing the identical failure.

## Reason

`npx next build` fails after TypeScript compilation succeeds:

```text
✓ Compiled successfully in 13-14s
  Running TypeScript ...
  (tsconfig auto-adjusted: jsx -> react-jsx, plugins += next)
The "id" argument must be of type string. Received undefined
Next.js build worker exited with code: 1 and signal: null
```

No file or line reference - the error surfaces from Next's build worker
process itself, after compilation, during whatever "Running TypeScript"
covers in Next 16 (page-data collection / prerendering, not the `tsc`
step - `tsc --noEmit` run separately passes cleanly).

## What was ruled out

- Not caused by SSF-0006's new pages - reproduces identically with
  `app/research`, `app/de/research`, `app/ota/[documentId]` fully removed.
- Not a missing-Supabase-env issue - reproduces identically with placeholder
  `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/
  `SUPABASE_SERVICE_ROLE_KEY` values set.
- Not a `tsc` type error - `npx tsc --noEmit` passes with zero errors
  (aside from one pre-existing, non-blocking `tsconfig.json` `baseUrl`
  deprecation warning).

## What wasn't tried

Time-boxed given this session's scope. Worth trying next:

- Build without Turbopack (`next build` defaults to it in this version;
  check for a webpack fallback flag) - the error text explicitly says
  "Turbopack build worker", so this may be Turbopack-specific.
- Bisect further back through recent commits to find when this started
  passing vs. failing - not done here, no known-good recent commit was
  found in the time available.
- Check for a dynamic route id/param naming collision - "the 'id' argument
  must be a string" is generic enough to originate from several different
  internals (a `[id]`-named route segment somewhere, a Node crypto/worker
  API call, etc.) and wasn't narrowed further.

## Priority
High - if this reproduces in the actual Vercel deployment (not just this
session's local build), production deploys are currently broken. Worth
confirming against a real Vercel build log before treating this as
low-urgency.

## Blocking
Nothing else in this session's work depends on this passing locally - all
code was verified via `tsc --noEmit` instead. But no one can currently
verify a clean production build for the whole app until this is resolved.

## Status
Open
