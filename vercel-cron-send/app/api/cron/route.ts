/**
 * Vercel Cron / scheduled Route Handler.
 * Protect with CRON_SECRET; set NOTIFY_API_KEY in project env.
 *
 * vercel.json example:
 * { "crons": [{ "path": "/api/cron", "schedule": "0 9 * * 1" }] }
 */
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'NOTIFY_API_KEY missing' }, { status: 500 });
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
      subject: process.env.NOTIFY_SUBJECT || 'Scheduled job',
      html: '<p>Vercel cron notification via Notify.</p>',
    }),
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
