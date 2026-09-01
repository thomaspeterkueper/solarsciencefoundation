#!/usr/bin/env python3
"""Fail-closed exact-head gate for KUEPER automated PR review evidence.

The gate is deliberately provider-agnostic: it does not call a reviewer. It only
accepts already-published PASS evidence for the pull request's exact current head
SHA, and only when that evidence was posted by an authorized reviewer account
(REVIEWER_LOGINS). If the reviewer is unavailable, stale, or has reviewed another
head, this check fails closed.

Workflows triggered by issue_comment execute on the default branch, so their own
check suite never attaches to the PR head. When invoked from such a run
(REPORT_CHECK_RUN=true), the gate therefore reports its verdict explicitly as a
check run on the PR head via the Checks API; that check run is what the PR merge
box evaluates.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

# Name of the check run reported on the PR head from comment-triggered runs.
# Kept distinct from the workflow job check name ("SSF Exact-Head Review Gate /
# exact-head-review-gate") so the required check never shares a name with the
# pull_request-triggered job's own check run on the same commit.
CHECK_RUN_NAME = "SSF Exact-Head Review Gate / evidence"


def api(path: str, payload: dict | None = None):
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not token:
        raise RuntimeError("GITHUB_TOKEN is missing")
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(f"https://api.github.com{path}", data=data)
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if payload is not None:
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read())


def reviewer_logins() -> set[str]:
    """Authorized reviewer accounts, lowercased, from REVIEWER_LOGINS."""
    raw = os.environ.get("REVIEWER_LOGINS", "").strip()
    return {login.lower() for login in raw.replace(",", " ").split() if login}


def evidence_match(item, accepted_prefixes, reviewers) -> dict | None:
    """Return the comment item if it is PASS evidence for this head from an
    allowed reviewer account, else None. The repository is public and any
    GitHub user can comment, so evidence is only accepted when the comment
    author is an authorized reviewer identity."""
    user = item.get("user") or {}
    login = str(user.get("login") or "").strip().lower()
    if not login or login not in reviewers:
        return None
    body = str(item.get("body") or "")
    lower = body.lower()
    if "kueper automated review" not in lower or "**pass**" not in lower:
        return None
    if not any(f"`{prefix}`" in lower for prefix in accepted_prefixes):
        return None
    return item


def main() -> int:
    repo = os.environ.get("GITHUB_REPOSITORY", "").strip()
    pr_raw = os.environ.get("PR_NUMBER", "").strip()
    event_head = os.environ.get("PR_HEAD_SHA", "").strip().lower()
    reviewers = reviewer_logins()
    if not reviewers:
        print("review-gate: REVIEWER_LOGINS is empty; failing closed", file=sys.stderr)
        return 2
    if not repo or not pr_raw:
        print("review-gate: missing repository or PR number", file=sys.stderr)
        return 2

    owner, name = repo.split("/", 1)
    pr = int(pr_raw)
    metadata = api(f"/repos/{owner}/{name}/pulls/{pr}")
    if str(metadata.get("state") or "").lower() != "open":
        print("review-gate: PR is not open; failing closed", file=sys.stderr)
        return 2
    head = str(((metadata.get("head") or {}).get("sha")) or "").strip().lower()
    if not head:
        print("review-gate: could not resolve current PR head; failing closed", file=sys.stderr)
        return 2
    if event_head and event_head != head:
        print(
            f"review-gate: event head {event_head} differs from current head {head}; failing closed",
            file=sys.stderr,
        )
        return 1

    accepted_prefixes = {head, head[:12], head[:13]}
    page = 1
    evidence = None
    while page <= 10:
        comments = api(f"/repos/{owner}/{name}/issues/{pr}/comments?per_page=100&page={page}")
        if not comments:
            break
        for item in comments:
            if evidence_match(item, accepted_prefixes, reviewers):
                evidence = item
                break
        if evidence or len(comments) < 100:
            break
        page += 1

    if not evidence:
        print(
            f"review-gate: no KUEPER automated PASS evidence for exact head {head}; failing closed",
            file=sys.stderr,
        )
        return 1

    print(f"review-gate: exact-head PASS evidence found for {head}")
    if os.environ.get("REPORT_CHECK_RUN", "").strip().lower() in {"1", "true", "yes"}:
        author = str(((evidence.get("user") or {}).get("login")) or "unknown")
        comment_url = evidence.get("html_url") or ""
        check = api(
            f"/repos/{owner}/{name}/check-runs",
            {
                "name": CHECK_RUN_NAME,
                "head_sha": head,
                "status": "completed",
                "conclusion": "success",
                "details_url": comment_url,
                "output": {
                    "title": "KUEPER exact-head PASS verified",
                    "summary": (
                        f"PASS evidence for head `{head}` verified from authorized "
                        f"reviewer `{author}`."
                    ),
                },
            },
        )
        print(
            f"review-gate: reported {CHECK_RUN_NAME} on {head}: {check.get('html_url')}",
        )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, urllib.error.URLError, ValueError) as exc:
        print(f"review-gate: {exc}; failing closed", file=sys.stderr)
        raise SystemExit(2)
