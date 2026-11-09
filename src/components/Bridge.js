"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Bridge() {
  return <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease: "easeOut" }} className="relative z-10 px-5 sm:px-6 py-16">
    <div className="max-w-6xl mx-auto"><div className="asimovian text-xs mb-6" style={{ color: "var(--neon)" }}>SHADDIES.SPACE</div><p className="text-lg md:text-xl max-w-3xl" style={{ color: "var(--text)" }}>Where ideas become useful systems — through learning, thoughtful design and hands-on building.</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3"><Link href="/build-with-me" className="btn btn-primary !w-auto">Build with me</Link><Link href="/learn" className="btn btn-secondary !w-auto">Explore the learning space</Link></div>
    </div>
  </motion.section>;
}
