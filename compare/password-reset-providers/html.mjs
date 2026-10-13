/** Shared password-reset HTML for provider comparison kits. */
export function resetHtml(resetUrl) {
  return `<p>Reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, ignore this email.</p>`;
}
