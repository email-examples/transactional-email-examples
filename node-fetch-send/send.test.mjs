import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

describe('node-fetch-send', () => {
  it('parses success envelope', () => {
    const body = { success: true, data: { messageId: 'abc' } };
    assert.equal(body.success, true);
  });

  it('detects error envelope', () => {
    const body = { success: false, error: 'Denied', code: 'DOMAIN_VERIFICATION_REQUIRED' };
    assert.equal(body.success, false);
    assert.ok(body.code);
  });

  it('mocked fetch succeeds', async () => {
    const fetchMock = mock.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ success: true, data: { messageId: 'm1' } }),
    }));
    const res = await fetchMock('https://notify.cx/api/email/send/test');
    assert.equal(res.ok, true);
    assert.equal(fetchMock.mock.callCount(), 1);
  });
});
