import { NextResponse } from "next/server";
import { emailShell, sendBrevoEmail } from "@/lib/email/brevo";
import { hashRequestIp, makeVerificationCode, normalizeEmail, requestIp, validEmail, verificationHash } from "@/lib/email/verification";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export async function POST(request) {
  try {
    let body;
    try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
    const email = normalizeEmail(body?.email);
    if (!validEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

    const admin = createAdminClient();
    const code = makeVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { data: allowed, error: rateError } = await admin.rpc("issue_email_verification_challenge", {
      p_email: email,
      p_code_hash: verificationHash(email, code),
      p_ip_hash: hashRequestIp(requestIp(request)),
      p_expires_at: expiresAt,
    });
    if (rateError) throw rateError;
    if (!allowed) return NextResponse.json({ error: "Too many code requests. Please try again later." }, { status: 429 });

    const safeEmail = escapeHtml(email);
    try {
      await sendBrevoEmail({
      to: email,
      subject: "Your Shaddies.Space verification code",
      htmlContent: emailShell(`<p style="color:#987a42;font-size:12px;letter-spacing:.12em;font-weight:bold">EMAIL VERIFICATION</p><h1 style="font-size:26px;margin:8px 0 14px">Your code is here.</h1><p style="line-height:1.6;color:#555">Use this code to finish creating your Shaddies.Space account for <strong>${safeEmail}</strong>.</p><div style="margin:26px 0;padding:18px;background:#f6f3eb;border-radius:12px;text-align:center;font-size:34px;font-weight:bold;letter-spacing:10px">${code}</div><p style="color:#666;font-size:13px">This code expires in 10 minutes. If you did not request it, you can safely ignore this email.</p>`),
      textContent: `Your Shaddies.Space verification code is ${code}. It expires in 10 minutes. If you did not request it, ignore this email.`,
      });
    } catch (deliveryError) {
      // Do not leave a live challenge behind when the email was not delivered.
      await admin.from("email_verification_challenges").delete().eq("email", email).eq("code_hash", verificationHash(email, code)).is("consumed_at", null);
      throw deliveryError;
    }
    return NextResponse.json({ ok: true, message: "If this address can be registered, a verification code has been sent." }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Registration code delivery failed:", error?.message || "unknown error");
    const notConfigured = !process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL || !process.env.EMAIL_VERIFICATION_SECRET || !(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY);
    return NextResponse.json({ error: notConfigured ? "Account verification is not fully configured yet. Please try again later." : "We could not send your code. Please try again shortly." }, { status: notConfigured ? 503 : 502 });
  }
}
