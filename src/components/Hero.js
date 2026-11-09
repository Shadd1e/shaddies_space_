"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import LineArt from "@/components/LineArt";

export default function Hero() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const t1 = "Make technology work for you.";
  const t2 = "Learn it. Build it. Put it to work.";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => { setA(t1.slice(0, ++i)); if (i === t1.length) clearInterval(timer); }, 45);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (a !== t1) return;
    let i = 0;
    const timer = setInterval(() => { setB(t2.slice(0, ++i)); if (i === t2.length) clearInterval(timer); }, 45);
    return () => clearInterval(timer);
  }, [a]);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="min-h-screen px-5 sm:px-6 pt-28 pb-16 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 md:opacity-100 md:left-[18%]"><LineArt /></div>
      <p className="hidden md:block mono absolute left-6 top-1/2 text-[10px] uppercase tracking-[0.3em] z-10" style={{ color: "var(--muted)", writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>AI · Automation · Software</p>
      <div className="max-w-6xl mx-auto w-full relative z-10 md:pl-8">
        <div className="text-[2.15rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight space-y-2 mb-8">
          <p style={{ color: "var(--text)" }}>{a}<span className="animate-pulse" style={{ color: "var(--neon)" }}>|</span></p>
          <p style={{ color: "var(--neon)" }}>{b}</p>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: .8 }} className="text-base md:text-lg max-w-xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
          Learn to build with AI and automation, or work with us to turn an idea into a system that works.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.3, duration: .6 }} className="flex flex-col sm:flex-row gap-4 max-w-xl">
          <Link href="/learn" className="btn btn-primary">I WANT TO LEARN</Link>
          <Link href="/build-with-me" className="btn btn-secondary">LET'S BUILD TOGETHER</Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
