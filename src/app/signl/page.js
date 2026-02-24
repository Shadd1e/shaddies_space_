// src/app/signl/page.js

"use client";

import FlowBackground from "@/components/FlowBackground";

export default function SignlPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <FlowBackground />

      <div className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur rounded-xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Signal Newsletter</h1>
        <p className="text-sm opacity-80 mb-6">
          Personalized updates delivered to your inbox.
        </p>

        <form
          action="https://signs.shaddies.space/webhook/register"
          method="POST"
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 rounded bg-black/40 border border-white/20"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="w-full p-3 rounded bg-black/40 border border-white/20"
          />

          <input
            name="niche"
            placeholder="Your field (e.g. tech)"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
          />

          <input
            name="keywords"
            placeholder="Topics (AI, startups, etc)"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
          />

          {/* Daily by default */}
          <select
            name="frequency_hours"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
            defaultValue="24"
          >
            <option value="12">Twice daily</option>
            <option value="24">Daily</option>
            <option value="48">Every 2 days</option>
            <option value="168">Weekly</option>
          </select>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded font-semibold"
          >
            Join Signal
          </button>
        </form>
      </div>
    </div>
  );
}