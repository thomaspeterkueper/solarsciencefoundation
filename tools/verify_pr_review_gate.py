#!/usr/bin/env python3
"""Fail-closed exact-head gate for KUEPER automated PR review evidence.

The gate is deliberately provider-agnostic: it does not call a reviewer. It only
accepts already-published PASS evidence for the exact pull-request head SHA.
If the reviewer is unavailable, stale, or has reviewed another head, this check
fails closed.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request


def api(path: str):
    token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not token:
        raise RuntimeError("GITHUB_TOKEN is missing")
    req = urllib.request.Request(f"https://api.github.com{path}")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read())


def main() -> int:
    repo = os.environ.get("GITHUB_REPOSITORY", "").strip()
    pr_raw = os.environ.get("PR_NUMBER", "").strip()
    head = os.environ.get("PR_HEAD_SHA", "").strip().lower()
    if not repo or not pr_raw or not head:
        print("review-gate: missing repository, PR number, or head SHA", file=sys.stderr)
        return 2

    owner, name = repo.split("/", 1)
    pr = int(pr_raw)
    accepted_prefixes = {head, head[:12], head[:13]}
    page = 1
    found = False
    while page <= 10:
        comments = api(f"/repos/{owner}/{name}/issues/{pr}/comments?per_page=100&page={page}")
        if not comments:
            break
        for item in comments:
            body = str(item.get("body") or "")
            lower = body.lower()
            if "kueper automated review" not in lower or "**pass**" not in lower:
                continue
            if any(f"`{prefix}`" in lower for prefix in accepted_prefixes):
                found = True
                break
        if found or len(comments) < 100:
            break
        page += 1

    if not found:
        print(
            f"review-gate: no KUEPER automated PASS evidence for exact head {head}; failing closed",
            file=sys.stderr,
        )
        return 1

    print(f"review-gate: exact-head PASS evidence found for {head}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, urllib.error.URLError, ValueError) as exc:
        print(f"review-gate: {exc}; failing closed", file=sys.stderr)
        raise SystemExit(2)
