"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-28"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Photo */}
        <div className="order-2 md:order-1">
          <img
            src="/Shaddie.jpg"
            alt="Shaddie Nelson"
            className="w-full max-w-sm object-cover grayscale"
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#191970] mb-6">
            About
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            Engineer. Builder.<br />Recovering classical music addict.
          </h2>

          <p className="text-lg text-black/65 leading-relaxed mb-10">
            I build things that run without me. That's the whole philosophy.
            Systems, automations, products — if it needs constant supervision,
            it's not finished yet. I founded Shaddies Space as a place where
            that kind of thinking lives. I've built systems for teams I'll never
            meet in countries I've never visited, built solutions that now serve
            multinational teams, written a book about why nobody is coming to
            save you, and I'm currently on my third attempt to quit classical
            music. It hasn't worked.
          </p>

          <a
            href="https://shaddienelson.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#191970] text-[#191970] px-8 py-4 font-semibold hover:bg-[#191970] hover:text-white transition"
          >
            Read my newsletter →
          </a>
        </div>

      </div>
    </motion.section>
  );
}