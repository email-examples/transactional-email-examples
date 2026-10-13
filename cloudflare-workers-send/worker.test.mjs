import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import worker from './src/index.js';

describe('cloudflare-workers-send', () => {
  it('rejects non-POST', async () => {
    const res = await worker.fetch(new Request('https://example.com/', { method: 'GET' }), {});
    assert.equal(res.status, 405);
  });

  it('requires secret', async () => {
    const res = await worker.fetch(
      new Request('https://example.com/', {
        method: 'POST',
        body: JSON.stringify({ to: 'a@b.com', subject: 'Hi', html: '<p>x</p>' }),
      }),
      {}
    );
    assert.equal(res.status, 500);
  });

  it('proxies mocked Notify success', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = mock.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ success: true, data: { messageId: 'w1' } }),
    }));
    try {
      const res = await worker.fetch(
        new Request('https://example.com/', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: 'a@b.com', subject: 'Hi', html: '<p>x</p>' }),
        }),
        { NOTIFY_API_KEY: 'nk_test', NOTIFY_SANDBOX: '1' }
      );
      assert.equal(res.status, 200);
      const body = JSON.parse(await res.text());
      assert.equal(body.success, true);
    } finally {
      globalThis.fetch = original;
    }
  });
});
