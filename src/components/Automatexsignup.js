"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Replace YOUR_FORM_ID with your Formspree form ID ─────────────────────────
// Get one free at formspree.io — takes 2 minutes to set up
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const PAYMENT_LINK       = "https://flutterwave.com/pay/9oujlxbdovcl";

const ROLES = [
  "Student", "Entrepreneur", "Freelancer", "Developer",
  "Virtual Assistant", "Business Owner", "Marketing / Content Creator", "Other",
];

// dark=true when used inside the dark blue cohort popup/AutomateX section
// dark=false when used on a light background page
export default function AutomateXSignup({ dark = true }) {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST", body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  const labelColor  = dark ? "rgba(255,255,255,0.7)"  : "var(--muted)";
  const inputStyle  = dark
    ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }
    : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" };
  const selectStyle = dark
    ? { background: "#0a1f5c", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }
    : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" };
  const focusBorder  = dark ? "rgba(255,255,255,0.5)" : "var(--neon)";
  const blurBorder   = dark ? "rgba(255,255,255,0.2)" : "var(--border)";
  const noteColor    = dark ? "rgba(255,255,255,0.25)" : "var(--muted)";
  const successColor = dark ? "#fff" : "var(--text)";
  const btnStyle     = dark
    ? { border: "1px solid #fff", color: "#fff", background: "transparent" }
    : { background: "var(--neon)", color: "#fff", border: "none" };

  const inputClass = "w-full px-4 py-3 rounded-lg outline-none transition font-inherit";

  return (
    <AnimatePresence mode="wait">
      {status !== "success" && (
        <motion.div key="form"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: labelColor }}>Full Name</label>
              <input name="full_name" placeholder="e.g. Tunde Adeyemi" required
                className={inputClass} style={{ ...inputStyle, fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = focusBorder}
                onBlur={e  => e.target.style.borderColor = blurBorder} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: labelColor }}>Email Address</label>
              <input name="email" type="email" placeholder="you@example.com" required
                className={inputClass} style={{ ...inputStyle, fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = focusBorder}
                onBlur={e  => e.target.style.borderColor = blurBorder} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: labelColor }}>
                Phone Number <span style={{ color: noteColor, fontWeight: 400 }}>(WhatsApp preferred)</span>
              </label>
              <input name="phone" type="tel" placeholder="+234 800 000 0000" required
                className={inputClass} style={{ ...inputStyle, fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = focusBorder}
                onBlur={e  => e.target.style.borderColor = blurBorder} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: labelColor }}>Which best describes you?</label>
              <select name="role" required defaultValue=""
                className={inputClass} style={{ ...selectStyle, fontFamily: "inherit", appearance: "none", cursor: "pointer" }}>
                <option value="" disabled>Select one…</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <input type="hidden" name="_subject" value="AutomateX Cohort 2 — New Registration" />

            {status === "error" && (
              <p className="text-sm" style={{ color: dark ? "#fca5a5" : "#e55" }}>
                Something went wrong. Please try again or reach out directly.
              </p>
            )}

            <button type="submit" disabled={status === "loading"}
              className="w-full px-10 py-4 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={btnStyle}
              onMouseEnter={e => { if (dark) { e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#0a1f5c"; }}}
              onMouseLeave={e => { if (dark) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#fff"; }}}>
              {status === "loading" ? "Registering…" : "Reserve My Spot"}
            </button>

            <p className="text-xs text-center" style={{ color: noteColor }}>
              A confirmation email will be sent to you after registration.
            </p>
          </form>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div key="success"
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }} className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ border: dark ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--neon)" }}>
            <svg className="w-6 h-6" style={{ color: dark ? "#fff" : "var(--neon)" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold" style={{ color: successColor }}>You're in.</h3>
          <p className="max-w-sm mx-auto leading-relaxed text-sm" style={{ color: noteColor }}>
            Check your inbox — we've sent everything you need to secure your spot in AutomateX Cohort 2.
          </p>
          <a href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-4 px-8 py-3 font-semibold rounded-lg text-sm transition"
            style={dark ? { border: "1px solid #fff", color: "#fff" } : { background: "var(--neon)", color: "#fff" }}>
            Complete Payment Now →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
