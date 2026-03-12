"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const t1 = "Humans burn out.";
  const t2 = "Smart businesses run on systems.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setA(t1.slice(0, ++i)); if (i === t1.length) clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (a !== t1) return;
    let i = 0;
    const t = setInterval(() => { setB(t2.slice(0, ++i)); if (i === t2.length) clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, [a]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-[85vh] px-6 pt-44 pb-24 flex flex-col justify-center system-grid"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-widest text-[#191970]/45 mb-10"
        >
          Shaddies.Space — Automation Education & Tools
        </motion.p>

        <div className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] space-y-2 mb-8">
          <p className="text-black/80">{a}</p>
          <p>
            {b.replace("systems.", "")}
            {b.includes("systems") && <span className="text-blue-600">systems.</span>}
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-lg md:text-xl text-black/50 max-w-2xl leading-relaxed mb-12"
        >
          Learn to build the automations that handle your sales, clients, content,
          and operations — so your business keeps moving while you're not watching.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link
            href="/n8n"
            className="group inline-block bg-[#191970] text-white px-12 py-5 text-base font-semibold hover:bg-blue-800 transition-all duration-300"
          >
            Register for AutomateX →
          </Link>
          <Link
            href="/signl"
            className="inline-block border border-[#191970] text-[#191970] px-12 py-5 text-base font-semibold hover:bg-[#191970] hover:text-white transition-all duration-300"
          >
            Try SIGNL free
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 0.8 }}
          className="flex flex-wrap gap-10 items-center border-t border-black/8 pt-10"
        >
          {[
            { stat: "8",      label: "Live modules" },
            { stat: "40",     label: "Done-for-you templates" },
            { stat: "₦15k",   label: "Cohort 2 · May 2026" },
            { stat: "Cohort 1", label: "Already complete" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-2xl md:text-3xl font-bold text-[#191970]">{stat}</p>
              <p className="text-xs text-black/40 uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
