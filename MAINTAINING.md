# Maintaining examples

| Fact | Canonical |
|------|-----------|
| API behaviour | https://notify.cx/openapi.yaml |
| Product docs | https://notify.cx/docs |
| SDK / MCP | https://github.com/notifycx/notifycx |

When Notify’s send contract changes, update kits that call `/api/email/send` (or `/test`), refresh mocked envelope assertions, and re-check README commands.

Do not copy the full docs site into this repo — link out.
