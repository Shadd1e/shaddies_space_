"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Suspense, useEffect, useState } from "react";
import SignlContent from "./SignlContent";

export default function SignlHome() {
  const year = new Date().getFullYear();

  const phrase = "In Your World";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(phrase.slice(0, i + 1));
      i++;

      if (i === phrase.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ color: "var(--text)" }}>
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight animate-pulse [animation-duration:3s]" style={{ color: "var(--neon)" }}>
          Signl
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/signl/privacy"
            className="text-[var(--muted)] hover:text-[var(--neon)] transition"
          >
            Privacy
          </Link>

          <Link
            href="/signl/terms"
            className="text-[var(--muted)] hover:text-[var(--neon)] transition"
          >
            Terms
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div className="space-y-8">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[var(--text)]">
              Discover What’s Happening
              <span className="block text-[var(--neon)] min-h-[1.2em]">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl text-[var(--muted)]">
              The internet is noisy. Signl finds the signal.
              Discover the most important launches, research,
              tools and innovations happening in any field you
              care about — all in one place.
            </p>

            {/* Feature List */}
            <div className="space-y-4">

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[var(--neon)] rounded-full"></div>
                <span className="text-[var(--text)]">
                  AI-curated updates from across the web
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[var(--neon)] rounded-full"></div>
                <span className="text-[var(--text)]">
                  Discover tools, products and breakthroughs instantly
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[var(--neon)] rounded-full"></div>
                <span className="text-[var(--text)]">
                  Search any niche or industry
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[var(--neon)] rounded-full"></div>
                <span className="text-[var(--text)]">
                  No signup required. Just explore.
                </span>
              </div>

            </div>
          </div>

          {/* Right Column — Search Form */}
          <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)] shadow-xl">

            <h2 className="text-2xl font-bold text-[var(--neon)] mb-4">
              Explore a Niche
            </h2>

            <p className="text-[var(--muted)] mb-8">
              Enter a topic, industry, or field of interest.
              Signl gathers the latest discoveries,
              innovations and developments happening right now.
            </p>

            <Suspense fallback={<div className="text-[var(--neon)]">Loading...</div>}>
              <SignlContent />
            </Suspense>

          </div>

        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-[var(--neon)] mb-6">
            Latest Discoveries
          </h2>

          <p className="text-[var(--muted)] mb-8">
            Curated updates from across the internet.
          </p>

          <div
            id="results"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Dynamic results render here */}
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between text-[var(--muted)] text-sm">

          <div>© {year} Signl. All rights reserved.</div>

          <div className="space-x-6">
            <Link
              href="/signl/privacy"
              className="hover:text-[var(--neon)] transition"
            >
              Privacy
            </Link>

            <Link
              href="/signl/terms"
              className="hover:text-[var(--neon)] transition"
            >
              Terms
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}