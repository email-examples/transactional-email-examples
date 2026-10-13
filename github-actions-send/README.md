# GitHub Actions / cron send

Background job pattern using Node `fetch`.

## Local

```bash
cp .env.example .env
NOTIFY_SANDBOX=1 node --env-file=.env send.mjs
```

## In Actions

1. Add repository secret `NOTIFY_API_KEY`.
2. Copy [`workflow.send.yml`](./workflow.send.yml) into your app repo as `.github/workflows/notify-send.yml` (adjust `working-directory` / path to `send.mjs`).
3. Optionally set `NOTIFY_TO` / `NOTIFY_FROM` as Actions variables.

## Tests

```bash
node --test send.test.mjs
```

## Docs

- https://notify.cx/docs/recipe-cron-github-actions
