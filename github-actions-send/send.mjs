/**
 * Background / cron send for GitHub Actions.
 * Secrets: NOTIFY_API_KEY (and optional NOTIFY_TO / NOTIFY_FROM)
 */
const apiKey = process.env.NOTIFY_API_KEY;
if (!apiKey) {
  console.error('Missing NOTIFY_API_KEY');
  process.exit(1);
}

const sandbox = process.env.NOTIFY_SANDBOX === '1';
const path = sandbox ? '/api/email/send/test' : '/api/email/send';

const res = await fetch(`https://notify.cx${path}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
  body: JSON.stringify({
    to: process.env.NOTIFY_TO || 'ops@your-verified-domain.com',
    from: process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
    subject: process.env.NOTIFY_SUBJECT || 'Scheduled Notify job',
    html: process.env.NOTIFY_HTML || '<p>Cron / CI notification.</p>',
  }),
});

const text = await res.text();
if (!res.ok) {
  console.error(text);
  process.exit(1);
}
console.log(text);
