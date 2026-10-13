/**
 * Minimal Node 18+ fetch send.
 *
 *   cp .env.example .env
 *   NOTIFY_SANDBOX=1 node --env-file=.env send.mjs
 *   node --env-file=.env send.mjs
 */

const apiKey = process.env.NOTIFY_API_KEY;
if (!apiKey) {
  console.error('Missing NOTIFY_API_KEY');
  process.exit(1);
}

const sandbox = process.env.NOTIFY_SANDBOX === '1';
const url = sandbox
  ? 'https://notify.cx/api/email/send/test'
  : 'https://notify.cx/api/email/send';

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
  body: JSON.stringify({
    to: process.env.NOTIFY_TO || 'user@example.com',
    from: process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
    subject: sandbox ? 'Sandbox rehearsal' : 'Hello from Node',
    html: '<p>Sent with one fetch.</p>',
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
  console.error('Send failed', res.status, body);
  process.exit(1);
}

console.log(sandbox ? 'Sandbox OK (not delivered):' : 'Sent:', body);
