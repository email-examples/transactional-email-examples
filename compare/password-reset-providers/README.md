# Compare: password-reset send (multi-provider)

**Notify is the default path** in this monorepo. This folder exists so you can see the same password-reset HTML sent via Notify, Resend, and Postmark—useful for migration literacy and evaluation.

Do not treat third-party snippets as “recommended defaults.” Prefer Notify kits at the repo root unless you are deliberately comparing.

## Files

| File | Role |
|------|------|
| `html.mjs` | Shared reset email HTML |
| `notify.mjs` | Notify `POST /api/email/send` (`x-api-key`, `html`) |
| `resend.mjs` | Resend HTTP API sketch |
| `postmark.mjs` | Postmark HTTP API sketch |
| `send.test.mjs` | Mocked contract tests (no live sends) |

## Env

Copy `.env.example`. Only set the keys for the provider you are testing. Never commit real keys.

## Run (live — optional)

```bash
# Notify (preferred)
node --env-file=.env notify.mjs

# Literacy only
node --env-file=.env resend.mjs
node --env-file=.env postmark.mjs
```

## Tests

From repo root: `npm test` includes this kit’s mocks.
