"use client";

import { useState } from "react";

export default function ProjectEnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", project: "", details: "", contactMethod: "email", phone: "" });
  const [status, setStatus] = useState({ loading: false, message: "", error: false });
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  async function submit(e) {
    e.preventDefault(); setStatus({ loading: true, message: "", error: false });
    try {
      const response = await fetch("/api/project-inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your enquiry could not be submitted.");
      const confirmation = data.emailDelivery === "sent"
        ? "Your project details have been submitted. A confirmation email is on its way, and we'll follow up using your preferred contact details."
        : "Your project details have been saved. Email confirmation is temporarily unavailable; if you do not hear from us, contact support@shaddies.space.";
      setStatus({ loading: false, message: confirmation, error: false });
      setForm({ name: "", email: "", project: "", details: "", contactMethod: "email", phone: "" });
    } catch (error) { setStatus({ loading: false, message: error.message, error: true }); }
  }

  return <form onSubmit={submit} className="surface-card p-5 sm:p-7 space-y-5">
    <div aria-hidden="true" className="sr-only"><label htmlFor="project-website">Leave this field empty</label><input id="project-website" name="website" tabIndex={-1} autoComplete="off" value={form.website || ""} onChange={e => set("website", e.target.value)} /></div>
    <div><p className="eyebrow mb-2">Project enquiry</p><h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>Tell us about your project</h3></div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div><label className="field-label" htmlFor="project-name">Your name</label><input id="project-name" className="field-control" required maxLength={100} value={form.name} onChange={e => set("name", e.target.value)} placeholder="How should we address you?" /></div>
      <div><label className="field-label" htmlFor="project-email">Email address</label><input id="project-email" type="email" className="field-control" required maxLength={254} value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" /></div>
    </div>
    <div><label className="field-label" htmlFor="project-title">What are you looking to build?</label><input id="project-title" className="field-control" required maxLength={160} value={form.project} onChange={e => set("project", e.target.value)} placeholder="A short project name or description" /></div>
    <div><label className="field-label" htmlFor="project-details">Tell us what you know so far</label><textarea id="project-details" className="field-control min-h-36 resize-y" required minLength={20} maxLength={8000} value={form.details} onChange={e => set("details", e.target.value)} placeholder="The problem, who it affects, what you have tried and what you hope to achieve…" /></div>
    <div><label className="field-label" htmlFor="contact-method">Preferred way to follow up</label><select id="contact-method" className="field-control" value={form.contactMethod} onChange={e => set("contactMethod", e.target.value)}><option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="either">Either is fine</option></select></div>
    {form.contactMethod === "whatsapp" && <div><label className="field-label" htmlFor="project-phone">WhatsApp number</label><input id="project-phone" className="field-control" type="tel" required maxLength={40} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Include your country code" /></div>}
    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>Your details will only be used to review and respond to this enquiry. Please do not include passwords, payment details or other sensitive information.</p>
    {status.message && <p role="status" className="text-sm" style={{ color: status.error ? "#d65b5b" : "var(--neon)" }}>{status.message}</p>}
    <button type="submit" disabled={status.loading} className="btn btn-primary">{status.loading ? "SENDING…" : "SEND PROJECT DETAILS"}</button>
  </form>;
}
