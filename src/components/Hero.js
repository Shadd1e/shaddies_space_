"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const t1 = "The internet has no borders.";
  const t2 = "Neither do threats.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setA(t1.slice(0, ++i)); if (i === t1.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (a !== t1) return;
    let i = 0;
    const t = setInterval(() => { setB(t2.slice(0, ++i)); if (i === t2.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, [a]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-[90vh] px-6 pt-44 pb-24 flex flex-col justify-center cyber-grid relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{background:"radial-gradient(circle, var(--neon), transparent 70%)",filter:"blur(60px)"}} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 pointer-events-none"
        style={{background:"radial-gradient(circle, var(--neon2), transparent 70%)",filter:"blur(80px)"}} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mono text-xs uppercase tracking-widest mb-10"
          style={{color:"var(--neon)"}}
        >
          Shaddies.Space — Cybersecurity & Web3 Education
        </motion.p>

        <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] space-y-2 mb-8">
          <p style={{color:"var(--text)"}}>{a}<span className="animate-pulse" style={{color:"var(--neon)"}}>|</span></p>
          <p style={{color:"var(--neon)"}}>{b}</p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          style={{color:"var(--muted)"}}
        >
          Shaddies Space is a technology education corporation equipping the next generation of cybersecurity professionals and Web3 builders with real, deployable skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link href="/cybersecurity"
            className="inline-block px-10 py-4 text-base font-bold transition-all duration-300 neon-glow"
            style={{background:"var(--neon)",color:"#050810"}}>
            Cybersecurity Course →
          </Link>
          <Link href="/web3"
            className="inline-block border px-10 py-4 text-base font-semibold transition-all duration-300 hover:bg-white/5"
            style={{color:"var(--neon2)",borderColor:"rgba(0,200,255,0.4)"}}>
            Explore Web3 →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="flex flex-wrap gap-10 items-center pt-10"
          style={{borderTop:"1px solid rgba(0,255,180,0.1)"}}
        >
          {[
            { stat: "3", label: "Active Courses" },
            { stat: "7", label: "Days to Orientation" },
            { stat: "6", label: "Web3 Branches" },
            { stat: "24/7", label: "Community Access" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-2xl md:text-3xl font-bold mono" style={{color:"var(--neon)"}}>{stat}</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{color:"var(--muted)"}}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
