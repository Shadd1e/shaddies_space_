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

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("https://signl.shaddies.space/webhook/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      // We read the custom JSON you set in n8n
      const result = await res.json();

      // If the JSON contains a redirectUrl, we go there
      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        // Fallback if the JSON structure is wrong
        window.location.href = "/signl?status=success";
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Registration failed. Ensure n8n has CORS headers enabled.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FlowBackground />
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-2">Join Signal</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Your name" required className="w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          <input name="email" type="email" placeholder="Email address" required className="w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          <input name="niche" placeholder="Your field" className="w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          <input name="keywords" placeholder="Topics" className="w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          <select name="frequency_hours" defaultValue="24" className="w-full p-3 rounded-lg bg-black/40 border border-white/20">
            <option value="12">Twice daily</option>
            <option value="24">Daily</option>
          </select>
          <button type="submit" disabled={loading} className="w-full bg-white text-black py-3 rounded-lg font-semibold">
            {loading ? "Joining..." : "Join Signal"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}