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
head SHA. A stale PASS from an older head is rejected. Reviewer/provider outage
therefore leaves the check red rather than silently degrading to mergeable.

The check is intentionally provider-independent. It does not invoke DeepSeek or
any alternative provider; it validates evidence already produced by the
Ecosystem review service.

## Activation boundary

This PR only prepares the check. It does **not** change repository rules or
branch protection. For enforcement, an owner must separately decide to make
`SSF Exact-Head Review Gate / exact-head-review-gate` a required check on
`main`, and must decide whether any narrowly defined exception class is allowed.

Until that governance decision is made, the workflow is diagnostic/advisory.
