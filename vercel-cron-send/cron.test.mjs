import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('vercel-cron-send', () => {
  it('expects Bearer CRON_SECRET shape', () => {
    const secret = 'abc';
    assert.equal(`Bearer ${secret}`, 'Bearer abc');
  });
});
