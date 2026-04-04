"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SignlSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-24 bg-[#f8f7f4]"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <img
            src="/signllogo.png"
            alt="SIGNL"
            className="h-10 object-contain mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">
            Your AI-powered digest generator.
          </h2>
          <p className="text-lg text-black/60 mb-8 leading-relaxed max-w-md">
            Pick a niche, add keywords, and get a curated digest of the 10 most
            relevant news articles — summarised by AI, delivered instantly.
            No account needed.
          </p>
          <Link
            href="/signl"
            className="inline-block border border-[#0a1f5c] text-[#0a1f5c] px-10 py-4 font-semibold hover:bg-[#0a1f5c] hover:text-white transition"
          >
            Try SIGNL free →
          </Link>
        </div>

        {/* Right — feature pills */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "30+ niches",          desc: "From crypto to fashion" },
            { label: "AI summaries",         desc: "Gemini-powered digests" },
            { label: "Keyword filtering",    desc: "Get what matters to you" },
            { label: "Instant results",      desc: "No account, no friction" },
          ].map(item => (
            <div key={item.label} className="border border-black/8 bg-white p-5 rounded-lg">
              <p className="font-semibold text-sm text-[#0a1f5c] mb-1">{item.label}</p>
              <p className="text-xs text-black/45">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}