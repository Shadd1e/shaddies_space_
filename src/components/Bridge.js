"use client";

import { motion } from "framer-motion";

export default function Bridge() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 px-6 py-16"
    >
      <div className="max-w-6xl mx-auto">

        <div className="asimovian text-xs text-[#191970] mb-6">
          SHADDIES.SPACE
        </div>

        <p className="text-lg md:text-xl max-w-3xl">
          Where brands and businesses find systems tailored to their needs.
        </p>

        <div className="mt-6 flex flex-wrap gap-5">

          <a
            href="https://calendar.app.google/9QaFeGRrmzqX7s2z7"
            target="_blank"
            className="border border-[#191970] text-[#191970] px-7 py-3 hover:bg-[#191970] hover:text-white transition"
          >
            Book a meeting
          </a>

          <a
            href="/solutions"
            className="border border-[#191970] text-[#191970] px-7 py-3 hover:bg-[#191970] hover:text-white transition"
          >
            Explore solutions
          </a>

        </div>

      </div>
    </motion.section>
  );
}
