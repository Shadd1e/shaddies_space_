"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    mark: "—",
    title: "Workflow Automation",
    body:  "We map your existing processes — sales, ops, finance, support — and build automation systems that eliminate repetitive work, reduce errors, and free your team for the things that matter.",
    tags:  ["n8n", "Make", "Zapier", "API integration"],
  },
  {
    mark: "—",
    title: "AI-Powered Systems",
    body:  "We integrate large language models into your business operations — AI assistants, intelligent document processing, automated customer responses, and decision-support tools built to your workflow.",
    tags:  ["ChatGPT", "Claude API", "Gemini", "Custom LLM pipelines"],
  },
  {
    mark: "—",
    title: "Custom Software Products",
    body:  "From SaaS platforms to internal tools and mobile apps — we design and build software that solves real business problems. Scoped properly, delivered on time.",
    tags:  ["FastAPI", "Next.js", "React Native", "PostgreSQL"],
  },
  {
    mark: "—",
    title: "WhatsApp Business Automation",
    body:  "Customer support, order management, appointment booking, payment collection — all through WhatsApp. We build the systems that run your business conversations automatically.",
    tags:  ["Meta Cloud API", "WhatsApp Business", "Flutterwave", "Custom flows"],
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="px-6 py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>
            For Businesses
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            We build the systems.<br />
            <span style={{ color: "var(--neon)" }}>You run the business.</span>
          </h2>
          <p className="text-lg mb-16 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
            Companies hire us to design and build automation and software systems that reduce overhead, accelerate operations, and create new revenue channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 rounded-xl glow-hover"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>{s.body}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t => (
                  <span key={t} className="mono text-xs px-3 py-1 rounded"
                    style={{ background: "rgba(77,121,255,0.07)", color: "var(--neon)", border: "1px solid var(--border)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-xl"
          style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
        >
          <div>
            <h3 className="text-xl font-bold mb-1">Have a project in mind?</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Tell us what you're building or where you're losing time. We'll tell you exactly what we can do.
            </p>
          </div>
          <a href="#contact"
            className="inline-block px-8 py-3 font-bold text-sm transition-all duration-200 neon-glow whitespace-nowrap"
            style={{ background: "var(--neon)", color: "#fff", borderRadius: 6 }}>
            Talk to us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
