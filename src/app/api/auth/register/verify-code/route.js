import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { emailShell, sendBrevoEmail } from "@/lib/email/brevo";
import { normalizeEmail, validEmail, verificationHash } from "@/lib/email/verification";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    let body;
    try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
    const email = normalizeEmail(body?.email);
    const code = typeof body?.code === "string" ? body.code.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!validEmail(email) || !/^\d{6}$/.test(code)) return NextResponse.json({ error: "Enter the email address and six-digit code." }, { status: 400 });
    if (password.length < 10 || password.length > 72) return NextResponse.json({ error: "Your password must be between 10 and 72 characters long." }, { status: 400 });
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Account sign-in is not configured yet. Please try again later." }, { status: 503 });
    }

    const admin = createAdminClient();
    const { data: verified, error: verifyError } = await admin.rpc("consume_email_verification_challenge", {
      p_email: email,
      p_code_hash: verificationHash(email, code),
    });
    if (verifyError) throw verifyError;
    if (!verified) return NextResponse.json({ error: "That code is incorrect or has expired. Request a new code and try again." }, { status: 400 });

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createError || !created?.user) {
      return NextResponse.json({ error: "We could not create this account. If you already have an account, sign in instead." }, { status: 409 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(items) { items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); },
        },
      }
    );
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      return NextResponse.json({ error: "Your account was created, but we could not start your session. Please sign in with your new password." }, { status: 201 });
    }

    try {
      await sendBrevoEmail({
        to: email,
        subject: "Welcome to Shaddies.Space",
        htmlContent: emailShell(`<h1 style="font-size:26px;margin:8px 0 14px">Welcome.</h1><p style="line-height:1.7;color:#555">Your Shaddies.Space account is ready. You can now explore the learning space and continue with one account across the site.</p><p style="margin-top:26px"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://shaddies.space"}/learn" style="display:inline-block;padding:13px 20px;background:#b89a5b;color:#171717;text-decoration:none;border-radius:8px;font-weight:bold">Explore Learn</a></p>`),
        textContent: "Welcome to Shaddies.Space. Your account is ready. Visit the Learn area to continue.",
      });
    } catch (emailError) {
      console.error("Welcome email delivery failed:", emailError?.message || "unknown error");
    }

    return NextResponse.json({ ok: true, redirectTo: "/learn" }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Registration verification failed:", error?.message || "unknown error");
    return NextResponse.json({ error: "We could not complete verification. Please try again." }, { status: 500 });
  }
}
