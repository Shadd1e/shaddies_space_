"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function AutomateXPage() {
  return (
    <main className="relative z-10 system-grid">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[85vh] px-6 pt-32 flex flex-col justify-center"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            AutomateX — Cohort 1
          </h1>

          <p className="text-xl max-w-3xl mb-4">
            Learn how to build AI-powered systems with n8n.  
            Replace manual work with automated workflows.  
            Design businesses that run without constant supervision.
          </p>

          <p className="text-lg text-black/70 mb-6">
            March 2 – March 14 • Live on Google Meet • Recordings included
          </p>

          <p className="text-2xl font-semibold mb-10">
            ₦25,000
          </p>

          <a
            href="https://flutterwave.com/pay/yvwxtd6npcip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#191970] px-12 py-5 text-xl font-semibold hover:bg-[#191970] hover:text-white transition"
          >
            Register Now
          </a>
        </div>
      </motion.section>

      {/* FLYER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-4xl mx-auto">
          <img src="/automatex-flyer.png" alt="AutomateX Flyer" className="w-full" />
        </div>
      </motion.section>

      {/* WHAT YOU’LL LEARN */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10">What you’ll learn</h2>

          <ul className="space-y-6 text-lg max-w-3xl">
            <li>• Installing Docker and running local automation stacks</li>
            <li>• n8n fundamentals and workflow architecture</li>
            <li>• Designing business systems (not just automations)</li>
            <li>• Writing logic, conditions, and basic algorithms</li>
            <li>• Working with APIs and understanding how data flows</li>
            <li>• Google Workspace integration</li>
            <li>• Service accounts, credentials, and security practices</li>
            <li>• Building real automations for operations, sales, and admin</li>
          </ul>
        </div>
      </motion.section>

      {/* DELIVERY + REQUIREMENTS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">
            How the workshop runs
          </h2>

          <ul className="space-y-5 text-lg max-w-3xl">
            <li>• Live classes held on Google Meet</li>
            <li>• All sessions are recorded for replay</li>
            <li>• A laptop is required</li>
            <li>• Stable internet connection is required</li>
            <li>• Practical assessments throughout the workshop</li>
            <li>• Certificate of completion powered by AltekFlo Enterprise</li>
          </ul>
        </div>
      </motion.section>

      {/* WHO IT’S FOR */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Who this is for</h2>

          <ul className="space-y-4 text-lg max-w-3xl">
            <li>• Founders tired of manual operations</li>
            <li>• Teams that want automated workflows</li>
            <li>• Builders learning no-code systems</li>
            <li>• Businesses ready to scale intelligently</li>
          </ul>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to build systems?
          </h2>

          <a
            href="https://flutterwave.com/pay/yvwxtd6npcip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#191970] px-12 py-5 text-xl font-semibold hover:bg-[#191970] hover:text-white transition"
          >
            Register Now
          </a>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-semibold mb-10">Frequently asked questions</h2>

          <div className="space-y-8 max-w-3xl">
            <div>
              <p className="font-medium">Do I need prior automation experience?</p>
              <p className="text-black/70">No. We start from fundamentals.</p>
            </div>

            <div>
              <p className="font-medium">Will sessions be recorded?</p>
              <p className="text-black/70">Yes. Every class is recorded.</p>
            </div>

            <div>
              <p className="font-medium">Do I get a certificate?</p>
              <p className="text-black/70">Yes — powered by AltekFlo Enterprise.</p>
            </div>

            <div>
              <p className="font-medium">What happens after payment?</p>
              <p className="text-black/70">You’ll receive onboarding details.</p>
            </div>
          </div>

        </div>
      </motion.section>

      <Footer />

    </main>
  );
}
