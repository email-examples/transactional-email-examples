# Next.js magic-link email (sketch)

Sends a magic-link email via Notify. You must store and verify tokens yourself.

## Setup

Copy into a Next.js App Router app. Set `NOTIFY_API_KEY` from `.env.example`.

## Tests

```bash
node --test lib/notify.test.mjs
```

## Docs

- https://notify.cx/docs/how-to-send-magic-link-and-otp-emails
- https://notify.cx/use-cases/magic-link
