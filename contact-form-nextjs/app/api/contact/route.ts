import { NextResponse } from 'next/server';
import { sendContactEmail } from '../../../lib/notify';

/**
 * Contact form endpoint — key stays on the server.
 * Add rate limiting / captcha before exposing publicly.
 */
export async function POST(req: Request) {
  const { name, email, message } = (await req.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'name, email, and message are required' },
      { status: 400 }
    );
  }

  // Basic length guard
  if (message.length > 5000) {
    return NextResponse.json({ error: 'message too long' }, { status: 400 });
  }

  const inbox = process.env.CONTACT_TO || 'you@your-verified-domain.com';
  const from =
    process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com';

  try {
    await sendContactEmail({
      to: inbox,
      from,
      subject: `Contact form: ${name}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</p>`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Send failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
