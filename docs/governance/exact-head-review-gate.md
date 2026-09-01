# Exact-Head Review Gate — proposed

Status: **proposal / not activated**

## Problem

Several SSF pull requests were merged shortly after creation without visible
KUEPER automated review evidence. PR #51 and #52 are recent examples: both have
no submitted GitHub reviews, while later PR #53 demonstrates the desired
CHANGES_REQUIRED → fix → PASS → merge sequence.

The repository's `main` branch currently has no branch protection and no
required status checks. A workflow check alone therefore cannot prevent a human
or other actor from merging around it.

## Proposed mechanism

`SSF Exact-Head Review Gate` fails closed for every non-draft PR unless an issue
comment contains KUEPER automated review **PASS** evidence for the exact current
head SHA, posted by an authorized reviewer account. A stale PASS from an older
head is rejected, and PASS text from any other account is ignored. Reviewer or
provider outage therefore leaves the gate red rather than silently degrading to
mergeable.

Evidence is validated by `tools/verify_pr_review_gate.py`:

- The gate resolves the PR's current head SHA from the API and rejects evidence
  for any other head (exact-head semantics).
- The repository is public, so any GitHub user can comment. PASS evidence is
  therefore accepted only from comments authored by logins listed in the
  `REVIEWER_LOGINS` workflow variable; without this author check a PASS string
  would be forgeable by external commenters.
- Comments are re-read and re-validated on every run, including when they are
  edited, and the check is fail-closed: missing, stale, or unauthenticated
  evidence leaves the gate red.

The check is intentionally provider-independent. It does not invoke DeepSeek or
any alternative provider; it validates evidence already produced by the
Ecosystem review service, which publishes PASS comments as the reviewer account.

### Why there are two checks

Workflows triggered by `issue_comment` execute on the default branch
(`GITHUB_SHA` is the `main` tip), so their auto-generated check suite never
attaches to the PR head and cannot flip the PR's required check. When a PASS
comment arrives, the comment-triggered run therefore reports the verdict
explicitly: it creates a check run named `SSF Exact-Head Review Gate / evidence`
on the PR's exact head SHA via the Checks API (the workflow holds
`checks: write`). That API-created check run is what the merge box evaluates;
the `pull_request`-triggered job check
(`SSF Exact-Head Review Gate / exact-head-review-gate`) is the diagnostic
scanner and is advisory only.

## Activation boundary

This PR only prepares the check. It does **not** change repository rules or
branch protection. For enforcement, an owner must separately decide to make
`SSF Exact-Head Review Gate / evidence` a required check on `main`, and must
decide whether any narrowly defined exception class is allowed. The owner must
also keep `REVIEWER_LOGINS` in `.github/workflows/pr-review-gate.yml` set to the
account(s) that may publish KUEPER review evidence.

Until that governance decision is made, the workflow is diagnostic/advisory.
