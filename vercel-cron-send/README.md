# Vercel Cron + Notify

Scheduled Route Handler that sends via Notify.

## Setup

1. Copy `app/api/cron/route.ts` and `vercel.json` into a Next.js / Vercel project.
2. Set `NOTIFY_API_KEY` and `CRON_SECRET` in Vercel env.
3. Deploy — Vercel invokes `/api/cron` on the schedule.

## Local

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron
```

## Tests

```bash
node --test cron.test.mjs
```

## Docs

- https://notify.cx/docs/recipe-cron-github-actions
- https://notify.cx/docs/how-to-use-notify-with-vercel
