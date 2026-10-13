import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.post('/send', async (c) => {
  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) {
    return c.json({ error: 'NOTIFY_API_KEY is not set' }, 500);
  }

  const { to, subject, html } = await c.req.json();
  if (!to || !subject || !html) {
    return c.json({ error: 'to, subject, and html are required' }, 400);
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
      to,
      from: process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
      subject,
      html,
    }),
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
});

const port = Number(process.env.PORT || 8788);
serve({ fetch: app.fetch, port });
console.log(`Hono listening on http://localhost:${port}`);
