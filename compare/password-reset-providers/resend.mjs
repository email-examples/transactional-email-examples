/**
 * Resend password-reset sketch (literacy / migration only).
 * Prefer notify.mjs unless you are deliberately comparing providers.
 *   node --env-file=.env resend.mjs
 */
import { resetHtml } from './html.mjs';

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('Missing RESEND_API_KEY');
  process.exit(1);
}

const resetUrl =
  process.env.RESET_URL || 'https://app.example.com/reset?token=demo';
const to = process.env.RESEND_TO || 'user@example.com';
const from = process.env.RESEND_FROM || 'noreply@your-verified-domain.com';

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    to: [to],
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

if (!res.ok) {
  console.error('Resend send failed', res.status, body);
  process.exit(1);
}

console.log('Resend sent:', body);
