# Next.js contact form → Notify

Server Route Handler only — the API key never reaches the browser.

## Setup

Copy `lib/notify.ts` and `app/api/contact/route.ts` into a Next.js App Router app. Set env from `.env.example`.

## Security

- Rate-limit and/or captcha before production.
- Escape/sanitize user HTML (this sketch escapes `<>`).
- Prefer a verified domain `from`; send notifications to `CONTACT_TO`.

## Tests

```bash
node --test lib/notify.test.mjs
```

## Docs

- https://notify.cx/docs/how-to-send-email-from-rest-api
