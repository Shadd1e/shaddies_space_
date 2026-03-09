"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace with your new Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
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
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const data = new FormData(e.target);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
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
                name="full_name"
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
                required
                defaultValue=""
                className="w-full bg-[#191970] border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white/50 transition appearance-none cursor-pointer"
              >
                <option value="" disabled>Select one…</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Hidden field so Formspree knows what this form is */}
            <input type="hidden" name="_subject" value="AutomateX Cohort 2 — New Registration" />

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