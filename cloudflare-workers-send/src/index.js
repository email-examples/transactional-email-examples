/**
 * Cloudflare Worker — send via Notify fetch.
 * Secret: wrangler secret put NOTIFY_API_KEY
 */
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'POST only' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!env.NOTIFY_API_KEY) {
      return new Response(JSON.stringify({ error: 'NOTIFY_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { to, subject, html } = payload;
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'to, subject, and html are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sandbox = env.NOTIFY_SANDBOX === '1';
    const path = sandbox ? '/api/email/send/test' : '/api/email/send';

    const res = await fetch(`https://notify.cx${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.NOTIFY_API_KEY,
      },
      body: JSON.stringify({
        to,
        from: env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
        subject,
        html,
      }),
    });

    return new Response(await res.text(), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
