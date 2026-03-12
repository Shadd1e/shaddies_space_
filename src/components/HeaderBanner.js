"use client";

import Link from "next/link";

export default function HeaderBanner() {
  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[#191970] text-white text-center py-3 px-4">
      <span className="text-sm">AutomateX Cohort 2 is open — </span>
      <Link
        href="/n8n"
        className="text-sm font-semibold underline hover:text-white/80 transition-colors duration-200"
      >
        Secure your seat →
      </Link>
    </div>
  );
}
