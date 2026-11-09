const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export async function sendBrevoEmail({ to, subject, htmlContent, textContent, replyTo }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Shaddies.Space";
  if (!apiKey || !senderEmail) throw new Error("Brevo email is not configured.");

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }], subject, htmlContent, textContent,
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo rejected the email (${response.status}): ${detail.slice(0, 300)}`);
  }
  return response.json().catch(() => ({}));
}

export function emailShell(content) {
  return `<!doctype html><html><body style="margin:0;background:#f5f3ee;padding:32px 12px;font-family:Arial,sans-serif;color:#171717"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden"><tr><td style="padding:28px 32px;border-bottom:1px solid #eee"><strong style="letter-spacing:.04em">SHADDIES.SPACE</strong></td></tr><tr><td style="padding:32px">${content}</td></tr><tr><td style="padding:20px 32px;background:#faf9f6;color:#777;font-size:12px">A little more clarity. A little more possibility.<br>support@shaddies.space</td></tr></table></td></tr></table></body></html>`;
}
