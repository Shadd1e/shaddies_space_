"use client";

import { motion } from "framer-motion";

export default function AutomateX() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-28 bg-[#191970] text-white"
    >
      <div className="max-w-5xl mx-auto">

        <h3 className="text-3xl md:text-4xl font-semibold mb-6">
          AutomateX — Cohort 1
        </h3>

        <p className="max-w-2xl text-lg mb-10">
          Learn no-code automation with n8n. Build AI-powered systems that run your business without you babysitting workflows.
        </p>

        <a
          href="/automatex"
          className="inline-block border border-white px-10 py-4 hover:bg-white hover:text-[#191970] transition"
        >
          Register for AutomateX
        </a>

      </div>
    </motion.section>
  );
}
