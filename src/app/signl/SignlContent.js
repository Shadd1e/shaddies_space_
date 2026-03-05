"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SignlContent() {
  const [loading, setLoading] = useState(false);
  const [resultsHtml, setResultsHtml] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);
    const niche = formData.get("niche");
    const keywords = formData.get("keywords");

    setLoading(true);
    setError("");
    setResultsHtml("");

    try {
      const response = await fetch(
        "https://signl.shaddies.space/webhook/generate-digest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            niche,
            keywords,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate updates.");
      }

      const data = await response.json();

      if (!data?.html) {
        throw new Error("No results returned.");
      }

      setResultsHtml(data.html);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching updates. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Search Form */}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="niche"
          placeholder="Field or industry (AI, robotics, fintech...)"
          required
          className="w-full p-3 rounded-lg border border-black/20 text-black"
        />

        <input
          name="keywords"
          placeholder="Optional keywords (agents, startups, research...)"
          className="w-full p-3 rounded-lg border border-black/20 text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-[#182E6F] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Scanning the web..." : "Generate Updates"}
        </button>

      </form>

      {/* Error Message */}

      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700 border border-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Results */}

      {resultsHtml && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden"
        >
          <div className="max-w-3xl mx-auto p-6">
            <div
              dangerouslySetInnerHTML={{ __html: resultsHtml }}
            />
          </div>
        </motion.div>
      )}

    </div>
  );
}