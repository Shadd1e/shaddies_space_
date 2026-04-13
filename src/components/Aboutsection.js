"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    mark: "01",
    title: "Practical, Not Theoretical",
    body:  "Every lesson ends with something you built. No filler modules, no fluffy content — just real automations you can deploy the same week.",
  },
  {
    mark: "02",
    title: "Nigerian Context, Global Standards",
    body:  "Pricing, platforms, client profiles — all taught with the Nigerian market in mind. Our students work locally and get paid globally.",
  },
  {
    mark: "03",
    title: "AI-First Curriculum",
    body:  "We don't treat AI as a bonus feature. Every workflow integrates LLMs — ChatGPT, Claude, Gemini — so your automations are intelligent, not just mechanical.",
  },
  {
    mark: "04",
    title: "Income-Generating Skills",
    body:  "We teach automation because it pays. Students leave with marketable skills, client acquisition frameworks, and ongoing community support.",
  },
];

export default function AboutSection() {
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
          About
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          We teach automation<br />
          <span style={{ color: "var(--neon)" }}>the way it should be taught.</span>
        </h2>
        <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: "var(--muted)" }}>
          Shaddies Space is a technology education brand. We exist because automation is one of the highest-leverage skills anyone can learn right now — and most courses teach it wrong. We fix that.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-lg glow-hover"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <span className="mono text-xs font-bold mb-4 block" style={{ color: "var(--neon)", opacity: 0.5 }}>{p.mark}</span>
              <h3 className="font-bold mb-2 text-sm">{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
