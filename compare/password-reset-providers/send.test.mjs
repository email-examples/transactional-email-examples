import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { resetHtml } from './html.mjs';

describe('compare/password-reset-providers', () => {
  it('shared HTML includes reset URL', () => {
    const html = resetHtml('https://app.example.com/reset?token=abc');
    assert.match(html, /token=abc/);
    assert.match(html, /Reset your password/);
  });

  it('Notify request shape uses x-api-key and html', async () => {
    const fetchMock = mock.fn(async (_url, init) => {
      const body = JSON.parse(init.body);
      assert.equal(init.headers['x-api-key'], 'test_key');
      assert.ok(body.html);
      assert.equal(body.subject, 'Reset your password');
      return {
        ok: true,
        status: 200,
        text: async () =>
          JSON.stringify({ success: true, data: { messageId: 'n1' } }),
      };
    });

    const res = await fetchMock('https://notify.cx/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test_key',
      },
      body: JSON.stringify({
        to: 'a@b.com',
        from: 'noreply@example.com',
        subject: 'Reset your password',
        html: resetHtml('https://example.com/r'),
      }),
    });
    assert.equal(res.ok, true);
    assert.equal(fetchMock.mock.callCount(), 1);
  });

  it('Resend request shape uses Bearer auth', async () => {
    const fetchMock = mock.fn(async (_url, init) => {
      assert.match(init.headers.Authorization, /^Bearer /);
      const body = JSON.parse(init.body);
      assert.ok(Array.isArray(body.to));
      assert.ok(body.html);
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ id: 're_1' }),
      };
    });

    const res = await fetchMock('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer re_test',
      },
      body: JSON.stringify({
        to: ['a@b.com'],
        from: 'noreply@example.com',
        subject: 'Reset your password',
        html: resetHtml('https://example.com/r'),
      }),
    });
    assert.equal(res.ok, true);
  });

  it('Postmark request shape uses server token header', async () => {
    const fetchMock = mock.fn(async (_url, init) => {
      assert.ok(init.headers['X-Postmark-Server-Token']);
      const body = JSON.parse(init.body);
      assert.ok(body.HtmlBody);
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ MessageID: 'pm_1' }),
      };
    });

    const res = await fetchMock('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': 'pm_test',
      },
      body: JSON.stringify({
        To: 'a@b.com',
        From: 'noreply@example.com',
        Subject: 'Reset your password',
        HtmlBody: resetHtml('https://example.com/r'),
        MessageStream: 'outbound',
      }),
    });
    assert.equal(res.ok, true);
  });
});
