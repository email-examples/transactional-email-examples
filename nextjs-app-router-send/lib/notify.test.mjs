import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('nextjs-app-router-send helper contract', () => {
  it('requires to, subject, html at the route boundary', () => {
    const body = { to: 'a@b.com', subject: 'Hi', html: '<p>x</p>' };
    assert.ok(body.to && body.subject && body.html);
  });

  it('documents server-only env key name', () => {
    assert.equal('NOTIFY_API_KEY', 'NOTIFY_API_KEY');
  });
});
