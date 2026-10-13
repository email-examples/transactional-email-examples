export async function sendContactEmail(input: {
  to: string;
  from: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.NOTIFY_API_KEY;
  if (!apiKey) throw new Error('NOTIFY_API_KEY is not set');

  const res = await fetch('https://notify.cx/api/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(input),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return JSON.parse(text);
}
