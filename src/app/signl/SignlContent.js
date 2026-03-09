"use client";

import { useState, useRef, useEffect } from "react";
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

const STEPS = [
  { label: "Receiving request",   duration: 1500 },
  { label: "Fetching live feeds", duration: 5000 },
  { label: "Filtering articles",  duration: 3000 },
  { label: "Running AI digest",   duration: 8000 },
  { label: "Finalising results",  duration: 2000 },
];

const WEBHOOK = "https://signl.shaddies.space/webhook/generate-digest";

// ── Processing Screen ─────────────────────────────────────────────────────────
function ProcessingScreen({ niche }) {
  const [currentStep, setCurrentStep]     = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [elapsed, setElapsed]             = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let step = 0;
    let timeout;
    function advance() {
      if (step >= STEPS.length - 1) return;
      timeout = setTimeout(() => {
        setCompletedSteps(prev => [...prev, step]);
        step++;
        setCurrentStep(step);
        advance();
      }, STEPS[step].duration);
    }
    advance();
    return () => clearTimeout(timeout);
  }, []);

  const progress = Math.min(
    (completedSteps.length / STEPS.length) * 100 + (currentStep < STEPS.length ? 8 : 0),
    95
  );

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-black/10 shadow-lg bg-white p-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Building your digest</h2>
          <p className="text-sm text-black/40 mt-0.5">
            {NICHES.find(n => n.value === niche)?.label} · {elapsed}s elapsed
          </p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-[#182E6F]/20 border-t-[#182E6F] animate-spin" />
      </div>

      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#182E6F] rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const done    = completedSteps.includes(i);
          const active  = currentStep === i;
          const pending = !done && !active;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: pending ? 0.35 : 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                done   ? "bg-[#182E6F]" :
                active ? "border-2 border-[#182E6F]" :
                         "border-2 border-black/10"
              }`}>
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {active && <div className="w-2 h-2 rounded-full bg-[#182E6F] animate-pulse" />}
              </div>
              <span className={`text-sm transition-all duration-300 ${
                done   ? "text-black/40 line-through" :
                active ? "text-black font-medium" :
                         "text-black/30"
              }`}>
                {step.label}
              </span>
              {active && <span className="ml-auto text-xs text-[#182E6F] font-medium animate-pulse">In progress</span>}
              {done   && <span className="ml-auto text-xs text-black/25">Done</span>}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-black/30 text-center">
        This usually takes 15–30 seconds. Please don't close the page.
      </p>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SignlContent() {
  const [view, setView]         = useState("form");
  const [niche, setNiche]       = useState("general");
  const [articles, setArticles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function pollForResult(jobId, attempts = 0) {
    if (attempts > 10) throw new Error("Your digest took too long. Please try again.");
    await new Promise(r => setTimeout(r, 3000));
    const res  = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    const data = await res.json();
    if (data?.status === "processing") return pollForResult(jobId, attempts + 1);
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const keywords = new FormData(e.target).get("keywords")?.toString().trim() || "";

    setView("processing");
    setErrorMsg("");
    setArticles([]);

    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, keywords }),
      });

      if (!res.ok) throw new Error("The server returned an error. Please try again.");

      let data = await res.json();
      if (res.status === 202 && data?.jobId) {
        data = await pollForResult(data.jobId);
      }

      const returned = data?.articles || data?.content?.articles || [];
      if (!returned.length) throw new Error("No articles came back. Try different keywords.");

      setArticles(returned);
      setView("results");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setView("error");
    }
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* FORM */}
        {view === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full p-3 rounded-lg bg-[#182E6F] text-white font-semibold hover:opacity-90 transition"
              >
                Generate Updates
              </button>
            </form>
          </motion.div>
        )}

        {/* PROCESSING */}
        {view === "processing" && (
          <ProcessingScreen key="processing" niche={niche} />
        )}

        {/* RESULTS */}
        {view === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl border border-black/10 shadow-lg"
          >
            <div className="max-w-6xl mx-auto p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Latest Updates</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-black/30 border border-black/10 px-3 py-1 rounded-full">
                    {NICHES.find(n => n.value === niche)?.label}
                  </span>
                  <button
                    onClick={() => setView("form")}
                    className="text-xs text-[#182E6F] font-medium hover:underline"
                  >
                    ← New search
                  </button>
                </div>
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
                    <h3 className="text-lg font-semibold leading-snug">{article.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{article.summary}</p>
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
                Thank you for using SIGNL.<br />© {new Date().getFullYear()}
              </footer>
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {view === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-200 bg-red-50 p-8 text-center space-y-4"
          >
            <div className="text-3xl">⚠️</div>
            <p className="text-red-700 font-medium">{errorMsg}</p>
            <button
              onClick={() => setView("form")}
              className="mt-2 px-6 py-2.5 rounded-lg bg-[#182E6F] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Try again
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}