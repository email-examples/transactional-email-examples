# Hono + Notify

Minimal Hono server that sends with native `fetch`.

## Setup

```bash
npm install
cp .env.example .env
# set NOTIFY_API_KEY
```

## Run

```bash
NOTIFY_SANDBOX=1 npm start
curl -X POST http://localhost:8788/send \
  -H 'content-type: application/json' \
  -d '{"to":"you@example.com","subject":"Hi","html":"<p>Hono</p>"}'
```

## Tests (mocked)

```bash
npm test
```

## Security

Server-side key only. Do not expose this handler without auth if it is public.

## Docs

- https://notify.cx/docs/quick-start-guide
- https://notify.cx/openapi.yaml
