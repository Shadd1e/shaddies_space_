"use client";
import { motion } from "framer-motion";

const pillars = [
  { icon: "🏛", title: "Corporate-Grade Training", body: "We design curricula to the same standard as enterprise security teams — not watered-down bootcamp content." },
  { icon: "🌍", title: "Global, Not Local", body: "Our students operate in 12+ countries. Threats don't respect borders; neither does our education." },
  { icon: "⚡", title: "Deploy-Ready Skills", body: "Every module ends with a real deliverable. You leave with work in your portfolio, not just a certificate." },
  { icon: "🔗", title: "Web3 Native", body: "We cover the full Web3 stack — DeFi, NFTs, DAOs, smart contracts, and on-chain security — all in one place." },
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-28"
      style={{background:"var(--bg2)"}}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p className="mono text-xs uppercase tracking-widest mb-4" style={{color:"var(--neon)"}}>About</motion.p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Built for the era<br />
          <span style={{color:"var(--neon)"}}>after the firewall.</span>
        </h2>
        <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{color:"var(--muted)"}}>
          Shaddies Space is a technology education corporation. We exist because the skills gap in cybersecurity and Web3 is not a talent problem — it is a training problem. We fix that.
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
              style={{background:"var(--surface)",border:"1px solid var(--border)"}}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-bold mb-3" style={{color:"var(--neon)"}}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:"var(--muted)"}}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
