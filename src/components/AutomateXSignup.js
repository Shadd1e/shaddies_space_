"use client";

import { motion } from "framer-motion";
import AutomateXSignup from "@/components/AutomateXSignup";

export default function AutomateX() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-28 bg-[#191970] text-white"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Left — info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
            AutomateX
          </p>

          <h3 className="text-3xl md:text-4xl font-semibold mb-2">
            Cohort 2
          </h3>

          <p className="text-white/40 text-sm mb-6">
            Cohort 1 complete · Cohort 2 begins May 2026
          </p>

          <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-sm">
            Learn no-code automation with n8n. Build AI-powered systems that
            run your business without you babysitting workflows. Live classes,
            recordings included.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Live on Google Meet",
              "All sessions recorded",
              "Practical assessments",
              "Certificate of completion",
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-2xl font-semibold">₦25,000</p>
          <p className="text-white/35 text-sm mt-1">One-time · Laptop + internet required</p>
        </div>

        {/* Right — signup form */}
        <div>
          <p className="text-sm font-medium text-white/50 mb-6">
            Register below — confirmation sent immediately.
          </p>
          <AutomateXSignup />
        </div>

      </div>
    </motion.section>
  );
}