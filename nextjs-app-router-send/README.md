# Next.js App Router + `notifycx`

Server Route Handler that sends email with the official SDK.

## Setup

1. Create or open a Next.js App Router app.
2. `npm i notifycx`
3. Copy `lib/notify.ts` and `app/api/email/route.ts` into your app (adjust import paths / use `@/lib/notify`).
4. `cp .env.example .env.local` and set `NOTIFY_API_KEY`.
5. Verify a domain before production custom `from`: https://notify.cx/docs/domain-verification

## Run locally (in your Next app)

```bash
npm run dev
curl -X POST http://localhost:3000/api/email \
  -H 'content-type: application/json' \
  -d '{"to":"you@example.com","subject":"Hi","html":"<p>Hello</p>"}'
```

## Security

- `NOTIFY_API_KEY` must stay in server env (`.env.local` is not exposed to the browser when only used in Route Handlers).
- Do not import `lib/notify.ts` from Client Components.
- Prefer a domain-locked sending key for production apps.

## Fetch alternative

You can replace the SDK with native `fetch` to `POST https://notify.cx/api/email/send` (see `../node-fetch-send`).

## Tests (mocked)

```bash
npm test
```

## Docs

- https://notify.cx/docs/how-to-use-notify-with-nextjs
- https://notify.cx/docs/how-to-use-notify-sdk
