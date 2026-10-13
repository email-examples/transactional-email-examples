import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '../../../lib/notify';

/**
 * POST /api/email
 * Body: { to, subject, html }
 *
 * Copy into a Next.js App Router app after: npm i notifycx
 * Env: NOTIFY_API_KEY in .env.local (server only)
 */
export async function POST(req: Request) {
  try {
    const { to, subject, html } = (await req.json()) as {
      to?: string;
      subject?: string;
      html?: string;
    };

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'to, subject, and html are required' },
        { status: 400 }
      );
    }

    const data = await sendTransactionalEmail({ to, subject, html });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Send failed';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
