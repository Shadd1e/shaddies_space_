"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">

        {/* Brand */}
        <div className="asimovian text-sm text-[#191970] mb-6">
          SHADDIES.SPACE
        </div>

        {/* Tagline */}
        <p className="text-lg mb-8">
          Designing systems that run without you.
        </p>

        {/* Socials */}
        <div className="flex gap-8 mb-12 items-center">

          <a
            href="https://www.facebook.com/SNNelsonSnr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/facebook.png" className="h-6 w-6 object-contain" />
          </a>

          <a
            href="https://x.com/blakk_brd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/twitter.png" className="h-6 w-6 object-contain" />
          </a>

          <a
            href="https://shaddienelson.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/substack.png" className="h-6 w-6 object-contain" />
          </a>

        </div>

        {/* Copyright */}
        <p className="text-sm text-black/60">
          © 2026 Shaddies.Space. All rights reserved.
        </p>

      </div>
    </motion.footer>
  );
}
