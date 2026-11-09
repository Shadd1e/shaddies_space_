import { NextResponse } from "next/server";
import { emailShell, sendBrevoEmail } from "@/lib/email/brevo";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashRequestIp, requestIp } from "@/lib/email/verification";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    let body;
    try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request. Please review the form and try again." }, { status: 400 }); }
    // Quiet honeypot: bots that fill hidden fields receive a generic success response.
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Invalid request. Please review the form and try again." }, { status: 400 });
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true, emailDelivery: "not_applicable" });
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254).toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
    const project = typeof body.project === "string" ? body.project.trim().slice(0, 160) : "";
    const details = typeof body.details === "string" ? body.details.trim().slice(0, 8000) : "";
    const contactMethod = ["email", "whatsapp", "either"].includes(body.contactMethod) ? body.contactMethod : "email";
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !project || details.length < 20 || (contactMethod === "whatsapp" && !phone)) return NextResponse.json({ error: "Please complete all required fields with a valid email address." }, { status: 400 });
    const admin = createAdminClient();
    const ipHash = hashRequestIp(requestIp(request));
    const { data: saved, error: saveError } = await admin.rpc("create_project_inquiry", {
      p_contact_name: name,
      p_contact_email: email,
      p_contact_phone: phone || null,
      p_project_name: project,
      p_project_description: details,
      p_contact_method: contactMethod,
      p_request_ip_hash: ipHash,
    });
    if (saveError) throw saveError;
    if (!saved) return NextResponse.json({ error: "We have received several submissions from this connection. Please try again later or email support@shaddies.space." }, { status: 429 });

    let emailDelivery = "not_configured";
    if (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL) {
      const safe = value => String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
      const recipient = process.env.PROJECT_ENQUIRY_TO || "support@shaddies.space";
      try {
        await Promise.all([
          sendBrevoEmail({
            to: recipient,
            replyTo: email,
            subject: `New project enquiry: ${project}`,
            htmlContent: emailShell(`<h1 style="font-size:24px">New project enquiry</h1><p><strong>Contact:</strong> ${safe(name)}</p><p><strong>Email:</strong> ${safe(email)}</p><p><strong>Phone:</strong> ${safe(phone || "Not supplied")}</p><p><strong>Project:</strong> ${safe(project)}</p><p><strong>Preferred contact:</strong> ${safe(contactMethod)}</p><hr style="border:0;border-top:1px solid #eee;margin:22px 0"><p style="white-space:pre-wrap;line-height:1.7">${safe(details)}</p>`),
            textContent: `New project enquiry\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not supplied"}\nProject: ${project}\nPreferred contact: ${contactMethod}\n\n${details}`,
          }),
          sendBrevoEmail({
            to: email,
            subject: "We received your project enquiry",
            htmlContent: emailShell(`<h1 style="font-size:24px">Thanks for reaching out.</h1><p style="line-height:1.7;color:#555">Your project enquiry for <strong>${safe(project)}</strong> has reached Shaddies.Space. We'll review the details and get back to you using your preferred contact method.</p><p style="color:#777;font-size:13px">If you need to add anything, reply to this email or contact support@shaddies.space.</p>`),
            textContent: `Thanks for reaching out. We received your project enquiry for ${project} and will review it. Contact support@shaddies.space if you need to add anything.`,
          }),
        ]);
        emailDelivery = "sent";
      } catch (mailError) {
        emailDelivery = "failed";
        console.error("Project enquiry email delivery failed:", mailError?.message || "unknown error");
      }
    }
    return NextResponse.json({ ok: true, emailDelivery }, { headers: { "Cache-Control": "no-store" } });
  } catch (_) {
    return NextResponse.json({ error: "We could not process your enquiry. Please try again." }, { status: 500 });
  }
}
