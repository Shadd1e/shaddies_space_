"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "AutomateX", href: "/n8n" },
  { label: "SIGNL",     href: "/signl" },
  { label: "Solutions", href: "/solutions" },
  { label: "Book",      href: "https://www.amazon.com/dp/B0FP81DLXJ", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-10 left-0 w-full z-[90] bg-white/90 backdrop-blur-sm border-b border-black/6">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="asimovian text-sm text-[#191970] tracking-widest hover:opacity-70 transition-opacity duration-200">
          SHADDIES.SPACE
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l =>
            l.external
              ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-black/55 hover:text-[#191970] transition-colors duration-200 font-medium">{l.label}</a>
              : <Link key={l.label} href={l.href}
                  className="text-sm text-black/55 hover:text-[#191970] transition-colors duration-200 font-medium">{l.label}</Link>
          )}
          <a href="https://calendar.app.google/9QaFeGRrmzqX7s2z7" target="_blank" rel="noopener noreferrer"
            className="border border-[#191970] text-[#191970] text-sm px-4 py-1.5 hover:bg-[#191970] hover:text-white transition-all duration-200">
            Book a call
          </a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-black/6 px-6 py-6 space-y-5">
          {LINKS.map(l =>
            l.external
              ? <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="block text-sm font-medium text-black/70 hover:text-[#191970] transition-colors" onClick={() => setOpen(false)}>{l.label}</a>
              : <Link key={l.label} href={l.href}
                  className="block text-sm font-medium text-black/70 hover:text-[#191970] transition-colors" onClick={() => setOpen(false)}>{l.label}</Link>
          )}
          <a href="https://calendar.app.google/9QaFeGRrmzqX7s2z7" target="_blank" rel="noopener noreferrer"
            className="inline-block border border-[#191970] text-[#191970] text-sm px-5 py-2 hover:bg-[#191970] hover:text-white transition-all duration-200">
            Book a call
          </a>
        </div>
      )}
    </nav>
  );
}
