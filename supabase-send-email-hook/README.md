# Supabase Auth Send Email Hook → Notify

Minimal handler that turns Supabase auth email hooks into Notify sends (magic link / OTP / recovery).

## Setup

1. `cp .env.example .env` and set `NOTIFY_API_KEY`.
2. Deploy `handler.mjs` behind HTTPS (Supabase Edge Function or your API).
3. Point Supabase Auth **Send Email Hook** at that URL (see Notify recipe).
4. Verify a domain for production `from`.

## Local rehearsal

```bash
RUN_DEMO=1 NOTIFY_SANDBOX=1 node --env-file=.env handler.mjs
```

## Tests (mocked)

```bash
node --test handler.test.mjs
```

## Security

- Hook endpoint must verify Supabase signatures / shared secret in production (add your verifier; omitted here for brevity).
- Keep Notify key in server secrets only.

## Docs

- https://notify.cx/docs/recipe-supabase-send-email-hook
- https://notify.cx/docs/how-to-use-notify-with-supabase
