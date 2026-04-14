"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutomateXSignup from "@/components/Automatexsignup";

const MODULES = [
  { n: "01", title: "Automation Foundations",       desc: "How automation works, where it creates value, and the mindset shift from doing to building systems." },
  { n: "02", title: "n8n Deep Dive",                desc: "Install, configure, and navigate n8n. Build your first real workflow from scratch." },
  { n: "03", title: "Connecting APIs & Services",   desc: "HTTP requests, webhooks, authentication — connect anything to anything." },
  { n: "04", title: "AI-Powered Workflows",         desc: "Integrate ChatGPT, Claude, and Gemini into your automations for intelligent, decision-making systems." },
  { n: "05", title: "Business Automation Builds",   desc: "Sales pipelines, client management, invoicing, social scheduling — real business workflows, built live." },
  { n: "06", title: "Client Acquisition",           desc: "How to package, price, pitch, and close automation clients in Nigeria and globally." },
  { n: "07", title: "Income Systems",               desc: "Retainer models, productised services, and how to build recurring revenue from automation skills." },
  { n: "08", title: "Capstone Project",             desc: "Build and present a complete automation system for a real business problem. Certificate issued on completion." },
];

const INCLUDES = [
  "8 live sessions on Google Meet",
  "All sessions recorded — lifetime access",
  "100 done-for-you automation templates",
  "Client acquisition playbook",
  "Certificate of completion",
  "Private student community",
  "Direct instructor access",
  "Begins May 2026",
];

export default function AutomateXPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="px-6 pt-40 pb-24 cyber-grid relative overflow-hidden"
        style={{ background: "var(--bg)", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(39,86,232,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mono text-xs uppercase tracking-widest mb-6" style={{ color: "var(--neon)" }}>
            AutomateX — Cohort 2
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6" style={{ letterSpacing: "-0.025em", color: "var(--text)" }}>
            Learn automation.<br />
            <span style={{ color: "var(--neon)" }}>Build income.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-lg max-w-xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
            8 live sessions. Real workflows. A complete system for building and selling automation services —
            with n8n, AI integrations, and a client acquisition playbook built for the Nigerian market.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex flex-wrap items-baseline gap-4 mb-10">
            <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>₦25,000</span>
            <span className="mono text-xs uppercase tracking-widest px-3 py-1 rounded"
              style={{ color: "var(--neon)", background: "rgba(39,86,232,0.08)", border: "1px solid var(--border)" }}>
              One-time · No renewals
            </span>
          </motion.div>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            href="#register"
            className="inline-block px-10 py-4 font-bold text-base rounded-lg transition neon-glow"
            style={{ background: "var(--neon)", color: "#fff" }}>
            Reserve My Spot →
          </motion.a>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="px-6 py-24" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>What's included</p>
          <h2 className="text-3xl font-bold mb-12" style={{ letterSpacing: "-0.02em" }}>Everything in one place.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {INCLUDES.map((item, i) => (
              <motion.div key={item}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="p-5 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span className="mono text-xs font-bold mr-2" style={{ color: "var(--neon)" }}>—</span>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="px-6 py-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>Curriculum</p>
          <h2 className="text-3xl font-bold mb-12" style={{ letterSpacing: "-0.02em" }}>8 modules. Zero filler.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {MODULES.map((m, i) => (
              <motion.div key={m.n}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="p-6 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span className="mono text-xs font-bold block mb-3" style={{ color: "var(--neon)", opacity: 0.6 }}>{m.n}</span>
                <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration form ── */}
      <section id="register" className="px-6 py-24" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>Register</p>
              <h2 className="text-3xl font-bold mb-4" style={{ letterSpacing: "-0.02em" }}>Reserve your seat.</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Cohort 2 begins May 2026. Seats are limited to keep the class size small enough for real interaction.
                Fill the form — you'll receive a payment link immediately after.
              </p>
              <div className="flex flex-col gap-3">
                {["Live on Google Meet", "Begins May 2026", "₦25,000 one-time", "Certificate included"].map(d => (
                  <div key={d} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--neon)" }} />
                    <span className="text-sm" style={{ color: "var(--muted)" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Form on light background — pass dark=false */}
            <div className="p-8 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <AutomateXSignup dark={false} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
