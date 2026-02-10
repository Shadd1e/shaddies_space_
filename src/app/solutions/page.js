"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const SOLUTIONS = [
  {
    key: "ordaa",
    name: "ORDAA",
    desc: "Multi-tenant automation infrastructure for managing multiple businesses, workflows, credentials, and integrations from one control layer.",
  },
  {
    key: "callflow",
    name: "CALLFLOW",
    desc: "Smart calling and meeting orchestration with automatic booking, confirmations, reminders, and follow-ups.",
  },
  {
    key: "prepstack",
    name: "PREPSTACK",
    desc: "Meeting and interview intelligence. Scans the internet for people, companies, and context so you walk in prepared.",
  },
  {
    key: "readless",
    name: "READLESS",
    desc: "Unlimited document summarization. Upload anything and receive clean, actionable summaries regardless of length.",
  },
  {
    key: "prodmap",
    name: "PRODMAP",
    desc: "Product and market research engine analyzing competitors, pricing, positioning, and customer sentiment.",
  },
  {
    key: "nudge",
    name: "NUDGE",
    desc: "Client invoicing and payment reminders across WhatsApp and email to stabilize cashflow.",
  },
  {
    key: "signal",
    name: "SIGNAL",
    desc: "Daily intelligence monitoring across industries, consumer habits, client sectors, and government policy.",
  },
  {
    key: "enterprise",
    name: "ENTERPRISE",
    desc: "Custom automation architecture including discovery, design, build, and deployment of bespoke systems.",
  },
];

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState("");
  const formRef = useRef(null);

  const handleSelect = (solution) => {
    setSelectedSolution(solution);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="relative z-10 system-grid">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[30vh] px-6 pt-16 flex items-center"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Solutions built as systems.
          </h1>

          <p className="text-xl max-w-3xl">
            Choose a system below. Tell us what you need.
            A customer agent will contact you.
          </p>
        </div>
      </motion.section>

      {/* SOLUTIONS */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto space-y-8">

          {SOLUTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSelect(s.name)}
              className="
                w-full
                border border-[#191970]
                px-8 py-6
                transition
                glow-hover
              "
            >
              <div className="grid grid-cols-[60px_1fr] gap-6 items-start">

                {/* ICON */}
                <img
                  src={`/solutions/${s.key}.png`}
                  className="h-12 w-12 object-contain mt-1"
                />

                {/* TEXT */}
                <div className="text-left">
                  <p className="text-xl font-semibold mb-2">
                    {s.name}
                  </p>

                  <p className="text-base opacity-80 max-w-xl">
                    {s.desc}
                  </p>
                </div>

              </div>
            </button>
          ))}

        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="px-6 py-28 bg-[#f8f7f4]">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-semibold mb-10">
            Tell us what you want to build
          </h2>

          <form
            action="https://formspree.io/f/xvzbzpra"
            method="POST"
            className="space-y-6"
          >
            <input type="text" name="full_name" placeholder="Full name" required className="w-full border px-4 py-3" />
            <input type="email" name="email" placeholder="Email address" required className="w-full border px-4 py-3" />
            <input type="text" name="company" placeholder="Company name" className="w-full border px-4 py-3" />

            <select name="solution" required value={selectedSolution} onChange={(e) => setSelectedSolution(e.target.value)} className="w-full border px-4 py-3">
              <option value="">Select solution</option>
              {SOLUTIONS.map((s) => (
                <option key={s.key} value={s.name}>{s.name}</option>
              ))}
            </select>

            <textarea name="description" placeholder="Describe your need" required rows={5} className="w-full border px-4 py-3" />
            <textarea name="questions" placeholder="Any further questions?" rows={4} className="w-full border px-4 py-3" />

            <button type="submit" className="border border-[#191970] px-10 py-4 hover:bg-[#191970] hover:text-white transition">
              Submit request
            </button>

            <p className="text-sm text-black/60">
              A customer agent will contact you after submission.
            </p>

          </form>

        </div>
      </section>

      <Footer />

    </main>
  );
}
