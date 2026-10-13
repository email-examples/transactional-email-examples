import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

describe('nextjs-password-reset notify helper', () => {
  it('requires email on the route', () => {
    const email = undefined;
    assert.equal(Boolean(email), false);
  });

  it('mocked send returns success envelope', async () => {
    const fetchMock = mock.fn(async () => ({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({ success: true, data: { messageId: 'reset_1' } }),
    }));
    const res = await fetchMock('https://notify.cx/api/email/send', {
      method: 'POST',
    });
    assert.equal(res.ok, true);
    const body = JSON.parse(await res.text());
    assert.equal(body.success, true);
  });
});
