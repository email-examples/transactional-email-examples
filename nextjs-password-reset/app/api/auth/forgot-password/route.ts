/**
 * Example forgot-password route — email send sketch only.
 * Wire to your own user/token store before production use.
 * This is not a complete auth system.
 */
import { NextResponse } from 'next/server';
import { sendNotifyEmail } from '../../../../lib/notify';

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  // TODO: look up user, create a one-time token, store a hash server-side
  const resetUrl = `https://yourapp.com/reset?token=REPLACE_ME`;

  try {
    await sendNotifyEmail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      from:
        process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Send failed';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  // Always return ok to avoid email enumeration in production apps
  return NextResponse.json({ ok: true });
}
