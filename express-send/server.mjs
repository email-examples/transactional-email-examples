import express from 'express';

const app = express();
app.use(express.json());

app.post('/send', async (req, res) => {
  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'NOTIFY_API_KEY is not set' });
  }

  const { to, subject, html } = req.body || {};
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'to, subject, and html are required' });
  }

  const sandbox = process.env.NOTIFY_SANDBOX === '1';
  const path = sandbox ? '/api/email/send/test' : '/api/email/send';

  const upstream = await fetch(`https://notify.cx${path}`, {
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

  const text = await upstream.text();
  res.status(upstream.status).type('json').send(text);
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`Express listening on http://localhost:${port}`);
});
