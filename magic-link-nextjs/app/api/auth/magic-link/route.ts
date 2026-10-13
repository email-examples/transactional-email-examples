/**
 * Magic-link email sketch — not a full auth system.
 * Persist a one-time token server-side before calling Notify.
 */
import { NextResponse } from 'next/server';
import { sendNotifyEmail } from '../../../../lib/notify';

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  // TODO: create + store hashed one-time token for this email
  const magicUrl = `https://yourapp.com/auth/verify?token=REPLACE_ME`;

  try {
    await sendNotifyEmail({
      to: email,
      from: process.env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
      subject: 'Your sign-in link',
      html: `<p>Sign in:</p><p><a href="${magicUrl}">${magicUrl}</a></p><p>This link expires soon.</p>`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Send failed';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
