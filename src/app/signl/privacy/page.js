"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function SignlPrivacyPage() {
  return (
    <main className="relative z-10 system-grid">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[60vh] px-6 pt-32 flex flex-col justify-center"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Signl — Privacy Policy
          </h1>
          <p className="text-lg text-black/70 max-w-3xl">
            This policy explains how we collect, use, and protect your
            information when you subscribe to Signl.
          </p>
        </div>
      </motion.section>

      {/* CONTENT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto space-y-12 text-lg max-w-3xl">

          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-black/70">
              We collect your name, email address, selected niche, frequency,
              and keywords when you subscribe.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use It</h2>
            <p className="text-black/70">
              Your information is used to deliver personalized newsletter
              content and improve our service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Data Storage</h2>
            <p className="text-black/70">
              Data is stored securely within our database infrastructure.
              Reasonable technical safeguards are implemented to protect it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
            <p className="text-black/70">
              We do not sell or trade your personal information. Third-party
              providers may process data strictly for operational purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Unsubscribe & Rights</h2>
            <p className="text-black/70">
              You may unsubscribe at any time. You may also request correction
              or deletion of your personal data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Updates</h2>
            <p className="text-black/70">
              This Privacy Policy may be updated periodically. Continued use
              of Signl indicates acceptance of changes.
            </p>
          </div>

        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">Privacy Contact</h2>
          <p>
            For privacy-related requests, contact: privacy@shaddies.space
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}