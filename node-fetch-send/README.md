# Node.js + native `fetch`

Minimal transactional send. No SDK.

## Setup

```bash
cp .env.example .env
# set NOTIFY_API_KEY from https://notify.cx/dashboard/credentials
```

## Sandbox (no delivery)

```bash
NOTIFY_SANDBOX=1 node --env-file=.env send.mjs
```

## Production

Requires a [verified domain](https://notify.cx/docs/domain-verification) for custom `from`.

```bash
node --env-file=.env send.mjs
```

## Security

Keep `NOTIFY_API_KEY` on the server / local env only. Never embed in a browser bundle.

## Tests (mocked)

```bash
node --test send.test.mjs
```

## Docs

- https://notify.cx/docs/how-to-use-notify-with-nodejs
- https://notify.cx/docs/quick-start-guide
