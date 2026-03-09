"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ── EmailJS config — fill these in from your EmailJS dashboard ───────────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

const PAYMENT_LINK = "https://flutterwave.com/pay/9oujlxbdovcl";

const ROLES = [
  "Student",
  "Entrepreneur",
  "Freelancer",
  "Developer",
  "Virtual Assistant",
  "Business Owner",
  "Marketing / Content Creator",
  "Other",
];

export default function AutomateXSignup() {
  const [form, setForm]     = useState({ name: "", email: "", phone: "", role: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.role) return;
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name:      form.name,
          to_email:     form.email,
          phone:        form.phone,
          role:         form.role,
          payment_link: PAYMENT_LINK,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">

      {status !== "success" && (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Tunde Adeyemi"
                required
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/25 px-4 py-3 rounded-lg focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/25 px-4 py-3 rounded-lg focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Phone Number
                <span className="text-white/35 font-normal ml-1">(WhatsApp preferred)</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                required
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/25 px-4 py-3 rounded-lg focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Which best describes you?
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full bg-[#191970] border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white/50 transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select one…</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {status === "error" && (
              <p className="text-red-300 text-sm">
                Something went wrong. Please try again or reach out directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full border border-white text-white px-10 py-4 font-semibold hover:bg-white hover:text-[#191970] transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Registering…" : "Reserve My Spot"}
            </button>

            <p className="text-white/25 text-xs text-center">
              A confirmation email will be sent to you immediately after registration.
            </p>

          </form>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-8 space-y-4"
        >
          <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white">You're in.</h3>
          <p className="text-white/55 max-w-sm mx-auto leading-relaxed text-sm">
            Check your inbox — we've sent everything you need to secure your spot in AutomateX Cohort 2.
          </p>
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 border border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-[#191970] transition rounded-lg text-sm"
          >
            Complete Payment Now →
          </a>
        </motion.div>
      )}

    </AnimatePresence>
  );
}