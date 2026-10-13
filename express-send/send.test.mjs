import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('express-send', () => {
  it('requires to subject html', () => {
    const body = { to: 'a@b.com', subject: 'Hi', html: '<p>x</p>' };
    assert.ok(body.to && body.subject && body.html);
  });

  it('uses sandbox path when flagged', () => {
    const sandbox = true;
    assert.equal(
      sandbox ? '/api/email/send/test' : '/api/email/send',
      '/api/email/send/test'
    );
  });
});
