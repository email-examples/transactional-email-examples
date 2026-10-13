import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { handleSendEmailHook } from './handler.mjs';

describe('supabase-send-email-hook', () => {
  it('rejects missing email', async () => {
    await assert.rejects(
      () => handleSendEmailHook({}, { NOTIFY_API_KEY: 'nk_test' }),
      /Missing recipient/
    );
  });

  it('sends via mocked fetch', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = mock.fn(async () => ({
      ok: true,
      text: async () =>
        JSON.stringify({ success: true, data: { messageId: 'sb1' } }),
    }));
    try {
      const result = await handleSendEmailHook(
        {
          user: { email: 'a@b.com' },
          email_data: { email_action_type: 'magiclink', token: '999999' },
        },
        { NOTIFY_API_KEY: 'nk_test', NOTIFY_SANDBOX: '1' }
      );
      assert.equal(result.success, true);
    } finally {
      globalThis.fetch = original;
    }
  });
});
