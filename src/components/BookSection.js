"use client";

import { motion } from "framer-motion";

export default function BookSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-6 py-28 bg-[#191970] text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <img
            src="/book.png"
            alt="Nobody is coming to save you"
            className="w-full max-w-sm"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Nobody is coming to save you.
          </h2>

          <p className="text-lg max-w-xl mb-10">
            A practical manifesto on building systems, reclaiming your time, and
            designing businesses that don’t collapse without you.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.amazon.com/dp/B0FP81DLXJ"
              target="_blank"
              className="border border-white px-8 py-4 hover:bg-white hover:text-[#191970] transition"
            >
              Buy on Amazon
            </a>

            <a
              href="https://selar.com/q6nw278862"
              target="_blank"
              className="border border-white px-8 py-4 hover:bg-white hover:text-[#191970] transition"
            >
              Get on Selar
            </a>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
