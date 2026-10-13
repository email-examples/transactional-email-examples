# Cloudflare Workers + Notify

Edge send with `fetch` and a Worker secret.

## Setup

```bash
npx wrangler secret put NOTIFY_API_KEY
# optional: create .dev.vars from .env.example for local only
```

## Local

```bash
npx wrangler dev
curl -X POST http://127.0.0.1:8787 \
  -H 'content-type: application/json' \
  -d '{"to":"you@example.com","subject":"Hi","html":"<p>Edge</p>"}'
```

Set `NOTIFY_SANDBOX=1` in vars/`.dev.vars` for `/api/email/send/test`.

## Tests (mocked)

```bash
node --test worker.test.mjs
```

## Security

- Store the key with `wrangler secret`, never in `wrangler.toml` or git.
- Worker runs server-side; do not expose the key to browsers.

## Docs

- https://notify.cx/docs/how-to-use-notify-with-cloudflare-workers
- https://notify.cx/docs/recipe-edge-send
