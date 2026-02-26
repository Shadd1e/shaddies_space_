"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function SignlClient() {
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
        {/* BIG WELCOME */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Signal</h1>

          <p className="text-white/80 leading-relaxed">
            Signal delivers curated intelligence tailored to your interests.
            You choose your field, your keywords, and how often you want updates.
          </p>

          <p className="text-white/60 text-sm">
            Use this page to update your preferences or deactivate your
            subscription. Every action requires your registered email address.
          </p>
        </div>

        {/* STATUS POPUP */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg text-sm ${
                status === "success"
                  ? "bg-green-600/20 border border-green-500/40"
                  : status === "updated"
                  ? "bg-blue-600/20 border border-blue-500/40"
                  : status === "deactivated"
                  ? "bg-red-600/20 border border-red-500/40"
                  : "bg-white/10"
              }`}
            >
              {status === "success" && "Registration successful."}
              {status === "updated" && "Your preferences have been updated."}
              {status === "deactivated" &&
                "Your subscription has been deactivated."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHANGE NICHE */}
        <SectionCard title="Change Your Field (Niche)">
          <p className="text-white/60 text-sm mb-4">
            Update the primary field Signal uses to curate your updates.
          </p>

          <form action="/api/update-niche" method="POST" className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />

            <input
              name="niche"
              placeholder="New field (e.g. Technology)"
              required
              className="input"
            />

            <button className="btn">Update Field</button>
          </form>
        </SectionCard>

        {/* CHANGE KEYWORDS */}
        <SectionCard title="Change Keywords">
          <p className="text-white/60 text-sm mb-4">
            Refine the topics you want included in your updates.
          </p>

          <form
            action="/api/update-keywords"
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

            <button className="btn">Update Keywords</button>
          </form>
        </SectionCard>

        {/* CHANGE FREQUENCY */}
        <SectionCard title="Change Delivery Frequency">
          <p className="text-white/60 text-sm mb-4">
            Choose how often you want to receive updates.
          </p>

          <form
            action="/api/update-frequency"
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

            <select name="frequency_hours" required className="input">
              <option value="12">Twice daily</option>
              <option value="24">Daily</option>
              <option value="48">Every 2 days</option>
              <option value="168">Weekly</option>
            </select>

            <button className="btn">Update Frequency</button>
          </form>
        </SectionCard>

        {/* DEACTIVATE */}
        <SectionCard title="Deactivate Subscription">
          <p className="text-white/60 text-sm mb-4">
            Stop receiving updates. You can re-register anytime.
          </p>

          <form action="/api/deactivate" method="POST" className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Your registered email"
              required
              className="input"
            />

            <button className="btn bg-red-600 hover:bg-red-700">
              Deactivate
            </button>
          </form>
        </SectionCard>

        {/* REGISTER LINK */}
        <div className="text-center text-sm text-white/70">
          Not subscribed yet?{" "}
          <Link href="/signl/register" className="underline hover:text-white">
            Register here
          </Link>
        </div>
      </motion.div>

      {/* Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
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

/* Reusable Card */
function SectionCard({ title, children }) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/5 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}