"""Deterministic unit tests for the exact-head review gate.

No network access: the GitHub API helper is mocked. Exercises the two
governance-critical properties of tools/verify_pr_review_gate.py:

- PASS evidence is only accepted from comments authored by an allowed
  reviewer login (forgery by arbitrary commenters is rejected);
- comment-triggered runs report the verdict as a check run on the PR's
  exact head SHA via the Checks API.
"""
from __future__ import annotations

import json
import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "tools"))

import verify_pr_review_gate as gate  # noqa: E402

HEAD = "48b4cdac7bb4bcb7f618d45435bed3bd48f689a9"
REPO = "thomaspeterkueper/solarsciencefoundation"
EVIDENCE = (
    "KUEPER automated review: **PASS** for `" + HEAD[:12] + "`"
)


def comment(body, login="thomaspeterkueper", cid=1):
    return {
        "id": cid,
        "user": {"login": login},
        "body": body,
        "html_url": f"https://github.com/{REPO}/pull/7#issuecomment-{cid}",
    }


class EvidenceMatchTest(unittest.TestCase):
    def setUp(self):
        self.prefixes = {HEAD, HEAD[:12], HEAD[:13]}
        self.reviewers = {"thomaspeterkueper"}

    def test_authorized_pass_is_accepted(self):
        self.assertIsNotNone(
            gate.evidence_match(comment(EVIDENCE), self.prefixes, self.reviewers)
        )

    def test_authorized_pass_with_full_head_is_accepted(self):
        body = f"KUEPER automated review: **PASS** for `{HEAD}`"
        self.assertIsNotNone(
            gate.evidence_match(comment(body), self.prefixes, self.reviewers)
        )

    def test_unauthenticated_pass_is_rejected(self):
        # Any GitHub user can post the same string; without author validation
        # this would forge a green light on a public repository.
        item = comment(EVIDENCE, login="mallory")
        self.assertIsNone(
            gate.evidence_match(item, self.prefixes, self.reviewers)
        )

    def test_deleted_user_is_rejected(self):
        item = comment(EVIDENCE)
        item["user"] = None
        self.assertIsNone(
            gate.evidence_match(item, self.prefixes, self.reviewers)
        )

    def test_reviewer_login_is_case_insensitive(self):
        item = comment(EVIDENCE, login="ThomasPeterKueper")
        self.assertIsNotNone(
            gate.evidence_match(item, self.prefixes, self.reviewers)
        )

    def test_wrong_head_prefix_is_rejected(self):
        body = "KUEPER automated review: **PASS** for `000000000000`"
        self.assertIsNone(
            gate.evidence_match(comment(body), self.prefixes, self.reviewers)
        )

    def test_missing_markers_are_rejected(self):
        body = "KUEPER automated review: **CHANGES_REQUIRED** for `" + HEAD[:12] + "`"
        self.assertIsNone(
            gate.evidence_match(comment(body), self.prefixes, self.reviewers)
        )


class ReviewerLoginsTest(unittest.TestCase):
    def test_parses_space_and_comma_separated(self):
        with mock.patch.dict(
            os.environ, {"REVIEWER_LOGINS": "Alice, bob carol", "GITHUB_TOKEN": "t"}
        ):
            self.assertEqual(
                gate.reviewer_logins(), {"alice", "bob", "carol"}
            )

    def test_empty_allowlist_is_empty(self):
        with mock.patch.dict(os.environ, {"REVIEWER_LOGINS": ""}):
            self.assertEqual(gate.reviewer_logins(), set())


class FakeResponse:
    def __init__(self, payload):
        self._payload = payload

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def read(self):
        return self._payload


class ApiTest(unittest.TestCase):
    def test_get_sends_auth_headers(self):
        captured = {}

        def fake_urlopen(req, timeout=None):
            captured["req"] = req
            return FakeResponse(b"{}")

        with mock.patch.dict(os.environ, {"GITHUB_TOKEN": "tok"}, clear=True):
            with mock.patch("urllib.request.urlopen", side_effect=fake_urlopen):
                gate.api("/repos/x/y/pulls/1")
        req = captured["req"]
        self.assertEqual(req.get_method(), "GET")
        self.assertEqual(req.get_header("Authorization"), "Bearer tok")
        self.assertEqual(req.get_header("Accept"), "application/vnd.github+json")
        self.assertIsNone(req.data)

    def test_post_encodes_json_payload(self):
        captured = {}

        def fake_urlopen(req, timeout=None):
            captured["req"] = req
            return FakeResponse(b'{"id": 1}')

        with mock.patch.dict(os.environ, {"GITHUB_TOKEN": "tok"}, clear=True):
            with mock.patch("urllib.request.urlopen", side_effect=fake_urlopen):
                result = gate.api("/repos/x/y/check-runs", {"name": "n", "head_sha": HEAD})
        req = captured["req"]
        self.assertEqual(req.get_method(), "POST")
        # urllib normalizes header names (Content-Type -> Content-type).
        self.assertEqual(req.get_header("Content-type"), "application/json")
        self.assertEqual(json.loads(req.data), {"name": "n", "head_sha": HEAD})
        self.assertEqual(result, {"id": 1})


class MainTest(unittest.TestCase):
    def setUp(self):
        self.env = {
            "GITHUB_REPOSITORY": REPO,
            "PR_NUMBER": "54",
            "PR_HEAD_SHA": HEAD,
            "GITHUB_TOKEN": "token",
            "REVIEWER_LOGINS": "thomaspeterkueper",
            "REPORT_CHECK_RUN": "false",
        }

    def pr_metadata(self, state="open"):
        return {"state": state, "head": {"sha": HEAD}}

    def run_main(self, api_calls, env=None):
        merged = dict(self.env)
        if env:
            merged.update(env)
        with mock.patch.dict(os.environ, merged, clear=True):
            with mock.patch.object(gate, "api", side_effect=api_calls) as mocked:
                code = gate.main()
        return code, mocked

    def test_forged_pass_from_unapproved_commenter_fails_closed(self):
        comments = [comment(EVIDENCE, login="mallory")]
        code, mocked = self.run_main([self.pr_metadata(), comments])
        self.assertEqual(code, 1)
        # The gate must not report a green check run for forged evidence.
        self.assertEqual(mocked.call_count, 2)

    def test_authorized_pass_passes(self):
        comments = [comment(EVIDENCE)]
        code, _ = self.run_main([self.pr_metadata(), comments])
        self.assertEqual(code, 0)

    def test_authorized_pass_reports_check_run_on_exact_head(self):
        comments = [comment(EVIDENCE)]
        code, mocked = self.run_main(
            [self.pr_metadata(), comments, {"html_url": "https://github.com/x"}],
            env={"REPORT_CHECK_RUN": "true"},
        )
        self.assertEqual(code, 0)
        path, payload = mocked.call_args_list[2].args
        self.assertTrue(path.endswith("/check-runs"))
        self.assertEqual(payload["name"], gate.CHECK_RUN_NAME)
        self.assertEqual(payload["head_sha"], HEAD)
        self.assertEqual(payload["status"], "completed")
        self.assertEqual(payload["conclusion"], "success")
        self.assertIn("thomaspeterkueper", payload["output"]["summary"])

    def test_no_evidence_does_not_create_check_run(self):
        code, mocked = self.run_main(
            [self.pr_metadata(), []],
            env={"REPORT_CHECK_RUN": "true"},
        )
        self.assertEqual(code, 1)
        for call in mocked.call_args_list:
            self.assertNotIn("/check-runs", call.args[0])

    def test_missing_reviewer_config_fails_closed(self):
        code, _ = self.run_main([], env={"REVIEWER_LOGINS": ""})
        self.assertEqual(code, 2)

    def test_stale_event_head_fails_closed(self):
        comments = [comment(EVIDENCE)]
        code, _ = self.run_main(
            [self.pr_metadata(), comments],
            env={"PR_HEAD_SHA": "1111111111111111111111111111111111111111"},
        )
        self.assertEqual(code, 1)

    def test_closed_pr_fails_closed(self):
        code, _ = self.run_main([self.pr_metadata(state="closed")])
        self.assertEqual(code, 2)


if __name__ == "__main__":
    unittest.main()
