"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function SignlTermsPage() {
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
            Signl — Terms of Service
          </h1>
          <p className="text-lg text-black/70 max-w-3xl">
            These Terms govern your access to and use of Signl, a curated
            technology newsletter operated by Shaddies Space.
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
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance</h2>
            <p className="text-black/70">
              By subscribing to Signl, you agree to these Terms. If you do not
              agree, you should not use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-black/70">
              Signl delivers curated insights, tools, and technology updates
              based on your selected niche and frequency preferences.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Subscription</h2>
            <p className="text-black/70">
              By registering, you consent to receive emails at your selected
              interval. You may unsubscribe at any time using the link
              included in each email.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-black/70">
              All newsletter content, design, branding, and materials are
              protected by intellectual property laws. You may not reproduce
              or distribute content without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="text-black/70">
              Content is provided for informational purposes only. We do not
              guarantee the accuracy or completeness of third-party sources.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-black/70">
              We are not liable for any indirect or consequential damages
              arising from use of the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Updates</h2>
            <p className="text-black/70">
              We may update these Terms at any time. Continued use of Signl
              constitutes acceptance of the revised Terms.
            </p>
          </div>

        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <p>
            For legal inquiries, contact: legal@shaddies.space
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}