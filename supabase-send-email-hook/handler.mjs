/**
 * Supabase Auth Send Email Hook → Notify.
 * Deploy as an Edge Function or HTTPS endpoint that Supabase calls.
 * Docs: https://notify.cx/docs/recipe-supabase-send-email-hook
 */

export async function handleSendEmailHook(payload, env = process.env) {
  const apiKey = env.NOTIFY_API_KEY;
  if (!apiKey) {
    throw new Error('NOTIFY_API_KEY is not set');
  }

  const to = payload?.user?.email || payload?.email;
  if (!to) {
    throw new Error('Missing recipient email on hook payload');
  }

  const action = payload?.email_data?.email_action_type || payload?.type || 'auth';
  const tokenHash = payload?.email_data?.token_hash;
  const redirectTo = payload?.email_data?.redirect_to;
  const otp = payload?.email_data?.token;

  let subject = 'Your login link';
  let html = `<p>Complete sign-in for your account.</p>`;

  if (action === 'recovery') {
    subject = 'Reset your password';
  } else if (action === 'signup' || action === 'invite') {
    subject = 'Confirm your email';
  } else if (action === 'magiclink') {
    subject = 'Your magic link';
  }

  if (otp) {
    html += `<p>Your code: <strong>${otp}</strong></p>`;
  }
  if (tokenHash && redirectTo) {
    const link = `${redirectTo}#token_hash=${encodeURIComponent(tokenHash)}&type=${encodeURIComponent(action)}`;
    html += `<p><a href="${link}">Continue</a></p>`;
  }

  const sandbox = env.NOTIFY_SANDBOX === '1';
  const path = sandbox ? '/api/email/send/test' : '/api/email/send';

  const res = await fetch(`https://notify.cx${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      to,
      from: env.NOTIFY_FROM || 'noreply@your-verified-domain.com',
      subject,
      html,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Notify failed: ${text}`);
  }
  return JSON.parse(text);
}

// CLI: RUN_DEMO=1 NOTIFY_SANDBOX=1 node --env-file=.env handler.mjs
if (process.env.RUN_DEMO === '1') {
  const demo = {
    user: { email: process.env.NOTIFY_TO || 'you@example.com' },
    email_data: { email_action_type: 'magiclink', token: '123456' },
  };
  handleSendEmailHook(demo)
    .then((r) => console.log(r))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
