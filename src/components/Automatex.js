"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AutomateXSignup from "@/components/AutomateXSignup";

function CohortPopup({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[201] px-4 pb-4 md:p-6"
          >
            <div className="relative bg-[#191970] w-full max-w-lg rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-8 pt-8 pb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">AutomateX — Cohort 2</p>
                <h2 className="text-2xl font-semibold text-white">Reserve your seat.</h2>
                <p className="text-white/50 text-sm mt-1 mb-6">Begins May 2026 · Live on Google Meet · ₦25,000</p>
              </div>
              <div className="px-8 pb-8">
                <AutomateXSignup />
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AutomateX() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
            AutomateX
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm text-white/35 mb-2">Cohort 1 complete</p>
              <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                Cohort 2 is open.
              </h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Learn no-code automation with n8n. Build AI-powered systems that
                run your business without you babysitting workflows.
                Live classes, recordings included.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "Live on Google Meet",
                  "All sessions recorded",
                  "Practical assessments",
                  "Certificate of completion",
                  "Begins May 2026",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                    <svg className="w-4 h-4 text-white/25 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mb-2">
                <span className="text-2xl font-semibold">₦25,000</span>
                <span className="text-white/35 text-sm ml-2">one-time</span>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="mt-6 border border-white text-white px-10 py-4 font-semibold hover:bg-white hover:text-[#191970] transition"
              >
                Secure your seat →
              </button>
            </div>

            {/* Right — previously cohort 1 */}
            <div className="border border-white/10 p-8 rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-4">Cohort 1 — Complete</p>
              <p className="text-white/50 leading-relaxed text-sm">
                Cohort 1 ran from March 9–21, 2026. Students built real automation
                systems across sales, operations, and client management using n8n.
                Cohort 2 picks up where they left off — with a deeper curriculum
                and more hands-on builds.
              </p>
              <p className="text-white/25 text-xs mt-6">
                Powered by AltekFlo Enterprise · Certificate included
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <CohortPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}