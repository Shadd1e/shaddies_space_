"use client";

import { motion, AnimatePresence } from "framer-motion";
import AutomateXSignup from "@/components/AutomateXSignup";

export default function CohortPopup({ open, onClose }) {
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
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                  AutomateX — Cohort 2
                </p>
                <h2 className="text-2xl font-semibold text-white leading-snug">
                  Reserve your spot.
                </h2>
                <p className="text-white/50 text-sm mt-1 mb-6">
                  Begins May 2026 · Live on Google Meet · ₦25,000
                </p>
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