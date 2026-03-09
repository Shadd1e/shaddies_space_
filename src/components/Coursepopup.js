"use client";

import { motion, AnimatePresence } from "framer-motion";

const COURSE_LINK = "/n8n";

const INCLUDES = [
  "Full n8n course — 8 modules, zero coding required",
  "50 done-for-you workflow templates",
  "Sales, CRM, Productivity, Social Media & Finance",
  "Lifetime access, instant delivery",
  "Private resource library",
];

export default function CoursePopup({ open, onClose }) {
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
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
          />

          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[201] px-4 pb-4 md:p-6"
          >
            <div className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">

              <div className="bg-[#191970] px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                  Limited offer — 50% off
                </p>
                <h2 className="text-2xl font-semibold text-white leading-snug">
                  Learn AI Automations
                </h2>
                <p className="text-white/55 text-sm mt-1">
                  Full course + 50 done-for-you workflows
                </p>
              </div>

              <div className="px-8 py-7">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-semibold text-[#191970]">₦10,000</span>
                  <span className="text-lg text-black/30 line-through">₦20,000</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">50% OFF</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {INCLUDES.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/65">
                      <svg className="w-4 h-4 text-[#191970] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={COURSE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center border border-[#191970] text-[#191970] px-8 py-4 font-semibold hover:bg-[#191970] hover:text-white transition rounded-lg"
                >
                  Get Instant Access — ₦10,000
                </a>

                <p className="text-xs text-black/25 text-center mt-3">
                  One-time payment · Instant access · No subscriptions
                </p>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition"
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