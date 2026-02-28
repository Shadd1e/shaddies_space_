"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function Signl() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <FlowBackground />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full bg-black/60 backdrop-blur-xl rounded-2xl p-10 text-white shadow-2xl space-y-10"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Signl</h1>
          <p className="text-white/80">
            Manage your Signl preferences below.
          </p>
        </div>

        {/* STATUS MESSAGE */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-lg bg-green-600/20 border border-green-500/40 text-sm"
            >
              {status === "success" && "Registration successful."}
              {status === "updated" && "Your preferences have been updated."}
              {status === "deactivated" && "Subscription deactivated."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* UPDATE NICHE */}
        <SectionCard title="Change Your Field (Niche)">
          <form
            action="https://signl.shaddies.space/webhook/update-niche"
            method="POST"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />
            <input
              name="niche"
              placeholder="New field (e.g Technology)"
              required
              className="input"
            />
            <button type="submit" className="btn">
              Update Field
            </button>
          </form>
        </SectionCard>

        {/* UPDATE KEYWORDS */}
        <SectionCard title="Change Keywords">
          <form
            action="https://signl.shaddies.space/webhook/update-keywords"
            method="POST"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />
            <input
              name="keywords"
              placeholder="New keywords (AI, startups...)"
              required
              className="input"
            />
            <button type="submit" className="btn">
              Update Keywords
            </button>
          </form>
        </SectionCard>

        {/* UPDATE FREQUENCY */}
        <SectionCard title="Change Delivery Frequency">
          <form
            action="https://signl.shaddies.space/webhook/update-frequency"
            method="POST"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />
            <select
              name="frequency_hours"
              required
              className="input"
            >
              <option value="12">Twice daily</option>
              <option value="24">Daily</option>
              <option value="48">Every 2 days</option>
              <option value="168">Weekly</option>
            </select>
            <button type="submit" className="btn">
              Update Frequency
            </button>
          </form>
        </SectionCard>

        {/* DEACTIVATE */}
        <SectionCard title="Deactivate Subscription">
          <form
            action="https://signl.shaddies.space/webhook/deactivate"
            method="POST"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />
            <button type="submit" className="btn bg-red-600 hover:bg-red-700">
              Deactivate
            </button>
          </form>
        </SectionCard>

        {/* LEGAL LINKS (ADDED ONLY) */}
        <div className="pt-6 border-t border-white/10 text-sm text-white/70 flex justify-between">
          <Link href="/signl/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/signl/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

      </motion.div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
        }
        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: white;
          color: black;
          font-weight: 600;
          transition: 0.2s ease;
        }
        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/5 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}