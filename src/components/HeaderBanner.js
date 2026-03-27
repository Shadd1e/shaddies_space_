"use client";
import Link from "next/link";

export default function HeaderBanner() {
  return (
    <div className="fixed top-0 left-0 w-full z-[100] text-center py-2.5 px-4 mono text-xs font-bold tracking-widest"
      style={{background:"var(--neon)",color:"#050810"}}>
      🔐 Cybersecurity Fundamentals — Orientation starts in 7 days. &nbsp;
      <Link href="/cybersecurity#pricing" className="underline hover:opacity-70 transition">
        Secure your seat →
      </Link>
    </div>
  );
}
