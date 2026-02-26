"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert FormData to a standard JSON object
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(
        "https://signl.shaddies.space/webhook/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // If the browser blocks the response (CORS error), it skips this and goes to catch
      if (res.ok) {
        // Clear the response stream
        await res.json();
        // Force the redirect
        window.location.href = "https://shaddies.space/signl";
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setLoading(false);
      alert("Registration failed. Please check the console (F12) for CORS errors.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FlowBackground />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Join Signal</h1>
        <p className="text-sm opacity-70 mb-6">
          Curated intelligence, built around your interests.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <input
            name="niche"
            placeholder="Your field (tech, finance...)"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <input
            name="keywords"
            placeholder="Topics (AI, startups...)"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          />

          <select
            name="frequency_hours"
            defaultValue="24"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
          >
            <option value="12">Twice daily</option>
            <option value="24">Daily</option>
            <option value="48">Every 2 days</option>
            <option value="168">Weekly</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold transition hover:scale-[1.02]"
          >
            {loading ? "Joining..." : "Join Signal"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center opacity-70">
          Already subscribed?{" "}
          <Link href="/signl" className="underline hover:opacity-100">
            Manage here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}