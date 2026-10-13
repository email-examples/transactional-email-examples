# Transactional email examples (Notify)

Runnable kits for [Notify](https://notify.cx) — minimal transactional email API.

**Clients:** native `fetch` · [`notifycx`](https://www.npmjs.com/package/notifycx) SDK · [`notifycx-mcp`](https://notify.cx/mcp) for IDE agents.

**Pricing:** Free 1,000/mo · Pro $10 / 10k · Scale $50 / 100k — https://notify.cx/pricing

## Kits

| Folder | Stack | Docs |
|--------|-------|------|
| [node-fetch-send](./node-fetch-send/) | Node 18+ `fetch` | [Node.js](https://notify.cx/docs/how-to-use-notify-with-nodejs) |
| [nextjs-app-router-send](./nextjs-app-router-send/) | Next.js App Router + `notifycx` | [Next.js](https://notify.cx/docs/how-to-use-notify-with-nextjs) · [SDK](https://notify.cx/docs/how-to-use-notify-sdk) |
| [nextjs-password-reset](./nextjs-password-reset/) | Password-reset sketch (`fetch`) | [Password reset](https://notify.cx/docs/how-to-send-password-reset-emails) |
| [cloudflare-workers-send](./cloudflare-workers-send/) | Cloudflare Workers | [Workers](https://notify.cx/docs/how-to-use-notify-with-cloudflare-workers) |
| [hono-send](./hono-send/) | Hono | [Quick start](https://notify.cx/docs/quick-start-guide) |
| [supabase-send-email-hook](./supabase-send-email-hook/) | Supabase Auth hook | [Recipe](https://notify.cx/docs/recipe-supabase-send-email-hook) |
| [contact-form-nextjs](./contact-form-nextjs/) | Next.js server route | [REST](https://notify.cx/docs/how-to-send-email-from-rest-api) |
| [github-actions-send](./github-actions-send/) | Scheduled / CI job | [Cron recipe](https://notify.cx/docs/recipe-cron-github-actions) |
| [python-send](./python-send/) | Python stdlib | [Python](https://notify.cx/docs/how-to-use-notify-with-python) |

Official SDK/MCP source: https://github.com/notifycx/notifycx

## Security

- Never commit real `NOTIFY_API_KEY` values — use `.env.example` only.
- Keep keys **server-side** (Route Handlers, Workers, Actions, backends). Never ship keys to the browser.
- Prefer domain-locked sending keys in apps.

## Tests

Automated tests **mock** the Notify API. They do not prove live delivery.

```bash
npm test
```

Live sandbox (optional, uses **your** key):

```bash
cd node-fetch-send
cp .env.example .env   # set NOTIFY_API_KEY
NOTIFY_SANDBOX=1 node --env-file=.env send.mjs
```

## License

MIT
