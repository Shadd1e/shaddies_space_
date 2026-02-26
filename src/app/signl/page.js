"use client";

import { useSearchParams } from "next/navigation";
import FlowBackground from "@/components/FlowBackground";

export default function SignlPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <FlowBackground />

      <div className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur rounded-xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Signal Newsletter</h1>
        <p className="text-sm opacity-80 mb-6">
          Personalized updates delivered to your inbox.
        </p>

        {/* Status Messages */}
        {status === "success" && (
          <div className="mb-4 text-sm bg-green-600/20 border border-green-500/40 p-3 rounded">
            Subscription successful.
          </div>
        )}

        {status === "updated" && (
          <div className="mb-4 text-sm bg-blue-600/20 border border-blue-500/40 p-3 rounded">
            Details updated successfully.
          </div>
        )}

        {status === "deactivated" && (
          <div className="mb-4 text-sm bg-red-600/20 border border-red-500/40 p-3 rounded">
            Deactivated successfully. You may subscribe again below.
          </div>
        )}

        <form
          action="https://signl.shaddies.space/webhook/register"
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

          <select
            name="frequency_hours"
            defaultValue="24"
            className="w-full p-3 rounded bg-black/40 border border-white/20"
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