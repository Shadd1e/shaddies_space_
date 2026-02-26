"use client";

import { useState } from "react";
import FlowBackground from "@/components/FlowBackground";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      window.location.href = "/signl?status=success";
    } else {
      setLoading(false);
      alert("Registration failed.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <FlowBackground />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-4">Join Signal</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Your name" required className="input" />
          <input name="email" type="email" placeholder="Email" required className="input" />
          <input name="niche" placeholder="Your field" className="input" />
          <input name="keywords" placeholder="Topics (AI, startups...)" className="input" />

          <select name="frequency_hours" defaultValue="24" className="input">
            <option value="12">Twice daily</option>
            <option value="24">Daily</option>
            <option value="48">Every 2 days</option>
            <option value="168">Weekly</option>
          </select>

          <button type="submit" disabled={loading} className="btn">
            {loading ? "Joining..." : "Join Signal"}
          </button>
        </form>
      </motion.div>

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
        }
      `}</style>
    </div>
  );
}