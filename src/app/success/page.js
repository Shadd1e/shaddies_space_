"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2347016877385";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi Shaddie, I'd like to become an affiliate for AutomateX Cohort 2");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function SuccessPage() {
  return (
    <main className="relative z-10 min-h-screen system-grid px-6 pt-24 pb-20 flex flex-col items-center justify-center">

      {/* ── CONFIRMATION ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl w-full text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 border border-[#0a1f5c]/20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={28} className="text-[#0a1f5c]" strokeWidth={1.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs font-semibold uppercase tracking-widest text-[#0a1f5c]/45 mb-4"
        >
          AutomateX — Cohort 2
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold mb-6 leading-tight"
        >
          You're in.<br />
          <span className="text-black/40">See you in May.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-black/55 leading-relaxed mb-4"
        >
          Your registration is confirmed. Check your email — you'll receive your
          cohort details, schedule, and community link shortly.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="text-sm text-black/35"
        >
          Questions? Reach out on{" "}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#0a1f5c] underline hover:no-underline">
            WhatsApp
          </a>
        </motion.p>
      </motion.div>

      {/* ── SIGNL PROMO ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="max-w-xl w-full border border-black/8 bg-white/70 p-8 mb-6"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1f5c]/45 mb-3">
          While you wait
        </p>
        <h2 className="text-xl font-semibold mb-3 leading-snug">
          Try SIGNL — your AI-powered news digest.
        </h2>
        <p className="text-sm text-black/55 leading-relaxed mb-6">
          Pick a niche, add your keywords, and get a curated digest of the 10 most
          relevant news articles — summarised by AI and delivered instantly.
          No account needed. Free to use.
        </p>
        <Link
          href="/signl"
          className="group inline-flex items-center gap-2 border border-[#0a1f5c] text-[#0a1f5c] px-6 py-3 text-sm font-semibold hover:bg-[#0a1f5c] hover:text-white transition-all duration-200"
        >
          Try SIGNL free
          <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-150" />
        </Link>
      </motion.div>

      {/* ── AFFILIATE ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="max-w-xl w-full border border-[#0a1f5c] bg-[#0a1f5c] text-white p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-3">
          Affiliate programme
        </p>
        <h2 className="text-xl font-semibold mb-3 leading-snug">
          Earn 20% on every registration you refer.
        </h2>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Know someone who'd benefit from AutomateX? Refer them and earn 20% of
          their registration fee — automatically. All you have to do is send us a
          message to get started.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-white text-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-[#0a1f5c] transition-all duration-200"
        >
          <MessageCircle size={15} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-150" />
          Join as an affiliate
          <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-150" />
        </a>
      </motion.div>

      {/* ── BACK HOME ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12"
      >
        <Link href="/" className="text-sm text-black/35 hover:text-[#0a1f5c] transition-colors duration-150">
          ← Back to Shaddies.Space
        </Link>
      </motion.div>

    </main>
  );
}
