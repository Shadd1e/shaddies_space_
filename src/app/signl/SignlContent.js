"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NICHES = [
  { value: "general",  label: "General" },
  { value: "tech",     label: "Tech" },
  { value: "ai",       label: "AI" },
  { value: "startup",  label: "Startup" },
  { value: "finance",  label: "Finance" },
  { value: "politics", label: "Politics" },
  { value: "science",  label: "Science" },
  { value: "health",   label: "Health" },
  { value: "food",     label: "Food" },
  { value: "fashion",  label: "Fashion" },
];

const WEBHOOK = "https://signl.shaddies.space/webhook/generate-digest";

const STATUS_MESSAGES = [
  "Scanning the web…",
  "Pulling the latest feeds…",
  "Filtering what matters…",
  "Running it through AI…",
  "Almost there…",
  "Just a moment longer…",
];

export default function SignlContent() {
  const [loading, setLoading]   = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [articles, setArticles] = useState([]);
  const [error, setError]       = useState("");
  const [niche, setNiche]       = useState("general");
  const statusTimer = useRef(null);

  function startStatusCycle() {
    let i = 0;
    setStatusIdx(0);
    statusTimer.current = setInterval(() => {
      i = Math.min(i + 1, STATUS_MESSAGES.length - 1);
      setStatusIdx(i);
    }, 4000);
  }

  function stopStatusCycle() {
    clearInterval(statusTimer.current);
  }

  // Poll until job is done or we time out (~30s)
  async function pollForResult(jobId, attempts = 0) {
    if (attempts > 10) {
      throw new Error("Your digest is taking longer than usual. Please try again in a moment.");
    }
    await new Promise(r => setTimeout(r, 3000));
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    const data = await res.json();
    if (data?.status === "processing") {
      return pollForResult(jobId, attempts + 1);
    }
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.target);
    const keywords = formData.get("keywords")?.toString().trim() || "";

    setLoading(true);
    setError("");
    setArticles([]);
    startStatusCycle();

    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, keywords }),
      });

      if (!res.ok) {
        throw new Error("The server returned an error. Please try again.");
      }

      let data = await res.json();

      // 202 means job queued — poll for result
      if (res.status === 202 && data?.jobId) {
        data = await pollForResult(data.jobId);
      }

      const returned = data?.articles || data?.content?.articles || [];

      if (!returned.length) {
        throw new Error("No articles came back. Try a different niche or keywords.");
      }

      setArticles(returned);

    } catch (err) {
      console.error(err);
      setError(
        err.message ||
        "Something went wrong fetching your digest. Please try again."
      );
    } finally {
      stopStatusCycle();
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Niche pill selector */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-2">
            Select a niche
          </p>
          <div className="flex flex-wrap gap-2">
            {NICHES.map(n => (
              <button
                key={n.value}
                type="button"
                onClick={() => setNiche(n.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  niche === n.value
                    ? "bg-[#182E6F] text-white border-[#182E6F]"
                    : "bg-white text-black/70 border-black/20 hover:border-[#182E6F] hover:text-[#182E6F]"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <input
          name="keywords"
          placeholder="Optional keywords (e.g. agents, funding, research…)"
          className="w-full p-3 rounded-lg border border-black/20 text-black placeholder:text-black/30 focus:outline-none focus:border-[#182E6F] transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-[#182E6F] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? STATUS_MESSAGES[statusIdx] : "Generate Updates"}
        </button>

      </form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl border border-black/10 shadow-lg"
          >
            <div className="max-w-6xl mx-auto p-8">

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Latest Updates</h2>
                <span className="text-xs font-medium uppercase tracking-widest text-black/30 border border-black/10 px-3 py-1 rounded-full">
                  {NICHES.find(n => n.value === niche)?.label}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b pb-6"
                  >
                    <h3 className="text-lg font-semibold leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {article.summary}
                    </p>
                    {article.pubDate && (
                      <p className="text-xs text-black/30 mt-2">
                        {new Date(article.pubDate).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })}
                      </p>
                    )}
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-[#182E6F] font-medium text-sm hover:underline"
                    >
                      Read more →
                    </a>
                  </motion.article>
                ))}
              </div>

              <footer className="pt-10 text-sm text-gray-400 text-center">
                Thank you for using SIGNL.
                <br />
                © {new Date().getFullYear()}
              </footer>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}