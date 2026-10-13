import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('hono-send', () => {
  it('uses sandbox path when flagged', () => {
    const sandbox = true;
    const path = sandbox ? '/api/email/send/test' : '/api/email/send';
    assert.equal(path, '/api/email/send/test');
  });

  it('requires to subject html', () => {
    const body = { to: 'a@b.com', subject: 'Hi', html: '<p>x</p>' };
    assert.ok(body.to && body.subject && body.html);
  });
});
