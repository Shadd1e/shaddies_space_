"use client";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    initials: "BL",
    name:     "Bennies Logistics",
    role:     "Logistics & Last-Mile Delivery, Lagos",
    text:     "They automated our entire order notification and driver assignment flow. What used to take our ops team 2 hours every morning now runs itself before anyone gets to the office. The ROI was clear within the first week.",
  },
  {
    initials: "AC",
    name:     "AltekFlo Clients",
    role:     "Enterprise Automation, Multiple Sectors",
    text:     "Shaddies Space built our internal reporting pipeline — pulling data from five different tools and delivering a clean weekly summary to the team automatically. We stopped wasting analyst hours on copy-paste work.",
  },
  {
    initials: "RH",
    name:     "Real Estate Client",
    role:     "Property Agency, Port Harcourt",
    text:     "Our WhatsApp inquiry system was chaos before. Now every lead is captured, categorized, and followed up automatically. We closed three deals in the first month that would have fallen through old-system cracks.",
  },
  {
    initials: "FS",
    name:     "Finance Services Client",
    role:     "Microfinance & Lending, Abuja",
    text:     "Invoice automation, payment reminders, and reconciliation — all set up in two weeks. Our finance team went from firefighting to actually analysing the business. That shift alone changed how we operate.",
  },
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-28"
      style={{ background: "var(--bg2)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>
          Results
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Businesses we've helped.
        </h2>
        <p className="text-lg max-w-xl mb-16 leading-relaxed" style={{ color: "var(--muted)" }}>
          Outcomes from businesses that brought us in to build or automate their operations.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              className="p-8 rounded-xl glow-hover"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3" style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mono text-xs font-bold"
                  style={{ background: "rgba(77,121,255,0.12)", color: "var(--neon)", border: "1px solid var(--border)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
