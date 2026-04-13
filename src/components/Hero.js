"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const t1 = "Automation is the skill.";
  const t2 = "Intelligence is the edge.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setA(t1.slice(0, ++i));
      if (i === t1.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (a !== t1) return;
    let i = 0;
    const t = setInterval(() => {
      setB(t2.slice(0, ++i));
      if (i === t2.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [a]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-[90vh] px-6 pt-36 pb-24 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Subtle ambient glow behind text */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--neon), transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.06,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mono text-xs uppercase tracking-widest mb-10"
          style={{ color: "var(--neon)" }}
        >
          Shaddies.Space — AI, Automation & Software Education
        </motion.p>

        <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] space-y-2 mb-8">
          <p style={{ color: "var(--text)" }}>
            {a}
            <span className="animate-pulse" style={{ color: "var(--neon)" }}>|</span>
          </p>
          <p style={{ color: "var(--neon)" }}>{b}</p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          style={{ color: "var(--muted)" }}
        >
          Shaddies Space teaches builders, professionals, and students how to
          automate with AI — and builds custom automation systems for businesses
          that want the same results without the learning curve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link
            href="/automatex"
            className="inline-block px-10 py-4 text-base font-bold transition-all duration-300"
            style={{ background: "var(--neon)", color: "#fff", borderRadius: 6 }}
          >
            AutomateX Course →
          </Link>
          <Link
            href="#solutions"
            className="inline-block border px-10 py-4 text-base font-semibold transition-all duration-300"
            style={{ color: "var(--neon)", borderColor: "var(--border)", borderRadius: 6 }}
          >
            Build with us →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="flex flex-wrap gap-10 items-center pt-10"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { stat: "2",    label: "Cohorts Completed" },
            { stat: "n8n",  label: "Core Platform"     },
            { stat: "3+",   label: "Live Products"     },
            { stat: "24/7", label: "Community Access"  },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-2xl md:text-3xl font-bold mono" style={{ color: "var(--neon)" }}>{stat}</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "var(--muted)" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
