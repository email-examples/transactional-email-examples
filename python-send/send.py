#!/usr/bin/env python3
"""Minimal Notify send with urllib (stdlib only)."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request


def main() -> int:
    api_key = os.environ.get("NOTIFY_API_KEY")
    if not api_key:
        print("Missing NOTIFY_API_KEY", file=sys.stderr)
        return 1

    sandbox = os.environ.get("NOTIFY_SANDBOX") == "1"
    path = "/api/email/send/test" if sandbox else "/api/email/send"
    url = f"https://notify.cx{path}"

    payload = {
        "to": os.environ.get("NOTIFY_TO", "user@example.com"),
        "from": os.environ.get("NOTIFY_FROM", "noreply@your-verified-domain.com"),
        "subject": "Hello from Python" if not sandbox else "Sandbox rehearsal",
        "html": "<p>Sent with urllib.</p>",
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as res:
            body = res.read().decode("utf-8")
            print(body)
            return 0
    except urllib.error.HTTPError as err:
        print(err.read().decode("utf-8"), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
