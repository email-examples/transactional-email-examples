import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('contact-form-nextjs', () => {
  it('escapes angle brackets in message sketch', () => {
    const message = '<script>alert(1)</script>';
    const html = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    assert.equal(html.includes('<script>'), false);
  });

  it('requires name email message', () => {
    const body = { name: 'A', email: 'a@b.com', message: 'Hi' };
    assert.ok(body.name && body.email && body.message);
  });
});
