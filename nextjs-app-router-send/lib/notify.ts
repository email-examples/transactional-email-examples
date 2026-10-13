import Notify, { NotifyError } from 'notifycx';

/**
 * Server-only helper. Import from Route Handlers / Server Actions — never from client components.
 */
export function getNotifyClient() {
  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) {
    throw new Error('NOTIFY_API_KEY is not set');
  }
  return new Notify({ apiKey });
}

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const notify = getNotifyClient();
  const from =
    input.from ||
    process.env.NOTIFY_FROM ||
    'Acme <noreply@your-verified-domain.com>';

  try {
    return await notify.send({
      to: input.to,
      from,
      subject: input.subject,
      html: input.html,
    });
  } catch (err) {
    if (err instanceof NotifyError) {
      throw new Error(`Notify ${err.status}: ${err.message}`);
    }
    throw err;
  }
}
