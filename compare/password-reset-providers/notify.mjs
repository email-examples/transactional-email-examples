/**
 * Notify password-reset send (preferred path in this monorepo).
 *   node --env-file=.env notify.mjs
 */
import { resetHtml } from './html.mjs';

const apiKey = process.env.NOTIFY_API_KEY;
if (!apiKey) {
  console.error('Missing NOTIFY_API_KEY');
  process.exit(1);
}

const resetUrl =
  process.env.RESET_URL || 'https://app.example.com/reset?token=demo';
const to = process.env.NOTIFY_TO || 'user@example.com';
const from = process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com';

const res = await fetch('https://notify.cx/api/email/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
  body: JSON.stringify({
    to,
    from,
    subject: 'Reset your password',
    html: resetHtml(resetUrl),
  }),
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

if (!res.ok || (body && body.success === false)) {
  console.error('Notify send failed', res.status, body);
  process.exit(1);
}

console.log('Notify sent:', body);
