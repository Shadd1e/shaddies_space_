"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function SignlClient() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FlowBackground />

      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">Signal Control</h1>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`mb-6 p-3 rounded-lg text-sm text-center ${
                status === "success"
                  ? "bg-green-600/20 border border-green-500/40"
                  : status === "deactivated"
                  ? "bg-red-600/20 border border-red-500/40"
                  : status === "updated"
                  ? "bg-blue-600/20 border border-blue-500/40"
                  : "bg-white/10"
              }`}
            >
              {status === "success" && "Registration successful."}
              {status === "deactivated" && "Subscription deactivated."}
              {status === "updated" && "Preferences updated."}
            </motion.div>
          )}
        </AnimatePresence>

        <form
          action="https://signl.shaddies.space/webhook/update"
          method="POST"
          className="space-y-4 mb-6"
        >
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <input
            name="niche"
            placeholder="Update niche"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <input
            name="keywords"
            placeholder="Update keywords"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <select
            name="frequency_hours"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          >
            <option value="12">Twice daily</option>
            <option value="24">Daily</option>
            <option value="48">Every 2 days</option>
            <option value="168">Weekly</option>
          </select>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold transition hover:scale-[1.02]"
          >
            Update Preferences
          </button>
        </form>

        <div className="text-center text-sm opacity-70">
          Need to subscribe?{" "}
          <Link href="/signl/register" className="underline hover:opacity-100">
            Join Signal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}