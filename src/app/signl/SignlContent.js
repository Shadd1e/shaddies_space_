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

    const niche = formData.get("niche")?.toString().trim();
    const keywords = formData.get("keywords")?.toString().trim();
    const limit = parseInt(formData.get("limit") || "20");
    const timeframe = formData.get("timeframe") || "week";

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
            limit,
            timeframe,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const data = await response.json();

      if (!data?.html) {
        throw new Error("No results returned.");
      }

      setResultsHtml(data.html);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch updates. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Search Form */}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Niche */}

        <input
          name="niche"
          placeholder="Field or industry (AI, robotics, fintech...)"
          required
          className="w-full p-3 rounded-lg border border-black/20 text-black"
        />

        {/* Keywords */}

        <input
          name="keywords"
          placeholder="Optional keywords (agents, startups, research...)"
          className="w-full p-3 rounded-lg border border-black/20 text-black"
        />

        {/* Result Count */}

        <div className="grid grid-cols-2 gap-4">

          <select
            name="limit"
            defaultValue="20"
            className="p-3 rounded-lg border border-black/20 text-black"
          >
            <option value="5">5 results</option>
            <option value="10">10 results</option>
            <option value="15">15 results</option>
            <option value="20">20 results</option>
          </select>

          {/* Timeframe */}

          <select
            name="timeframe"
            defaultValue="week"
            className="p-3 rounded-lg border border-black/20 text-black"
          >
            <option value="6h">Last 6 hours</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>

        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-[#182E6F] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Scanning the web..." : "Generate Updates"}
        </button>

      </form>

      {/* Error */}

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
            <div dangerouslySetInnerHTML={{ __html: resultsHtml }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}