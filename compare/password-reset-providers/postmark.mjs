/**
 * Postmark password-reset sketch (literacy / migration only).
 * Prefer notify.mjs unless you are deliberately comparing providers.
 *   node --env-file=.env postmark.mjs
 */
import { resetHtml } from './html.mjs';

const serverToken = process.env.POSTMARK_SERVER_TOKEN;
if (!serverToken) {
  console.error('Missing POSTMARK_SERVER_TOKEN');
  process.exit(1);
}

const resetUrl =
  process.env.RESET_URL || 'https://app.example.com/reset?token=demo';
const to = process.env.POSTMARK_TO || 'user@example.com';
const from = process.env.POSTMARK_FROM || 'noreply@your-verified-domain.com';

const res = await fetch('https://api.postmarkapp.com/email', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Postmark-Server-Token': serverToken,
  },
  body: JSON.stringify({
    To: to,
    From: from,
    Subject: 'Reset your password',
    HtmlBody: resetHtml(resetUrl),
    MessageStream: 'outbound',
  }),
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

if (!res.ok) {
  console.error('Postmark send failed', res.status, body);
  process.exit(1);
}

console.log('Postmark sent:', body);
