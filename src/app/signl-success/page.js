// src/app/signl-success/page.js

"use client";

import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function SignlSuccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <FlowBackground />

      <div className="relative z-10 max-w-md w-full bg-black/60 backdrop-blur rounded-xl p-8 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Almost done ✨</h1>

        <p className="opacity-80 mb-6">
          We’ve sent you a verification email.
          <br />
          Please check your inbox and click the link to activate your Signal feed.
        </p>

        <Link
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded font-semibold"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}