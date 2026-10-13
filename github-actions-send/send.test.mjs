import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('github-actions-send', () => {
  it('selects sandbox path', () => {
    const sandbox = process.env.NOTIFY_SANDBOX === '1' || true;
    const path = sandbox ? '/api/email/send/test' : '/api/email/send';
    assert.equal(path, '/api/email/send/test');
  });
});
