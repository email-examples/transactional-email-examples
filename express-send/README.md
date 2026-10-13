# Express + Notify

Minimal Express route that sends with native `fetch`.

## Setup

```bash
npm install
cp .env.example .env
```

## Run

```bash
NOTIFY_SANDBOX=1 npm start
curl -X POST http://localhost:3001/send \
  -H 'content-type: application/json' \
  -d '{"to":"you@example.com","subject":"Hi","html":"<p>Express</p>"}'
```

## Tests

```bash
npm test
```

## Docs

- https://notify.cx/docs/how-to-use-notify-with-express
