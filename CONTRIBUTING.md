# Contributing

- Keep examples minimal — no unnecessary dependencies.
- Use `.env.example` placeholders only; never commit real keys.
- Prefer `html` in request bodies.
- Link each kit to the matching https://notify.cx/docs page.
- Add a mocked test for new kits; distinguish live verification in the README.
- Do not invent undocumented Notify endpoints.

```bash
npm test
```
