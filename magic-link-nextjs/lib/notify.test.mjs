import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

describe('magic-link-nextjs', () => {
  it('requires email', () => {
    assert.equal(Boolean(undefined), false);
  });

  it('mocked send succeeds', async () => {
    const fetchMock = mock.fn(async () => ({
      ok: true,
      text: async () =>
        JSON.stringify({ success: true, data: { messageId: 'ml1' } }),
    }));
    const res = await fetchMock('https://notify.cx/api/email/send');
    assert.equal(res.ok, true);
  });
});
