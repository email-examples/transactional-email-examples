# Next.js password-reset email (sketch)

Sends a password-reset email via Notify. **Not** a full auth product — you must persist tokens and verify users yourself.

## Setup

1. Copy `lib/notify.ts` and `app/api/auth/forgot-password/route.ts` into a Next.js App Router app.
2. `cp .env.example .env.local` and set `NOTIFY_API_KEY`.
3. Replace `REPLACE_ME` token logic with your store.
4. Verify a domain for production `from`: https://notify.cx/docs/domain-verification

## Verify (mocked)

```bash
node --test lib/notify.test.mjs
```

## Live check (optional)

After wiring into a Next app with your key:

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com"}'
```

For API rehearsal without delivery, point the helper at `/api/email/send/test` temporarily, or use the dashboard guided test.

## Security

- Keep `NOTIFY_API_KEY` server-side only.
- Do not leak whether an email exists (this sketch always returns `{ ok: true }` after a successful send attempt path — adjust carefully).
- Use short-lived, single-use reset tokens stored hashed.

## Docs

- https://notify.cx/docs/how-to-send-password-reset-emails
- https://notify.cx/docs/how-to-use-notify-with-nextjs
