/**
 * Server-only Notify helper using native fetch.
 * Do not import from Client Components.
 */
export async function sendNotifyEmail(input: {
  to: string;
  from: string;
  subject: string;
  html?: string;
  message?: string;
}) {
  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) {
    throw new Error('NOTIFY_API_KEY is not set');
  }

  const body = input.html ?? input.message;
  if (!body) {
    throw new Error('Provide html or message');
  }

  const res = await fetch('https://notify.cx/api/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      to: input.to,
      from: input.from,
      subject: input.subject,
      html: body,
    }),
  });

  const text = await res.text();
  let json: unknown = text;
  try {
    json = JSON.parse(text);
  } catch {
    /* keep text */
  }

  if (!res.ok) {
    throw new Error(
      typeof json === 'object' && json && 'error' in json
        ? String((json as { error: string }).error)
        : `Notify error: ${text}`
    );
  }

  return json;
}
