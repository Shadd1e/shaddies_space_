"use client";
import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Web3", href: "/web3" },
  { label: "About",  href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-10 left-0 w-full z-[90]" style={{background:"rgba(5,8,16,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(0,255,180,0.08)"}}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="asimovian text-sm tracking-widest flicker" style={{color:"var(--neon)"}}>
          SHADDIES.SPACE
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link key={l.label} href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{color:"var(--muted)"}}
              onMouseEnter={e=>e.target.style.color="var(--neon)"}
              onMouseLeave={e=>e.target.style.color="var(--muted)"}
            >{l.label}</Link>
          ))}
          <Link href="/cybersecurity#pricing"
            className="text-sm px-5 py-2 font-semibold transition-all duration-200 border border-pulse"
            style={{color:"var(--neon)",borderColor:"rgba(0,255,180,0.4)"}}>
            Enroll Now →
          </Link>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(o => !o)}>
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open?"rotate-45 translate-y-2":""}`} style={{background:"var(--neon)"}} />
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open?"opacity-0":""}`} style={{background:"var(--neon)"}} />
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open?"-rotate-45 -translate-y-2":""}`} style={{background:"var(--neon)"}} />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-6 space-y-5" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}}>
          {LINKS.map(l => (
            <Link key={l.label} href={l.href}
              className="block text-sm font-medium" style={{color:"var(--muted)"}}
              onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/cybersecurity#pricing"
            className="inline-block text-sm px-5 py-2 border font-semibold" style={{color:"var(--neon)",borderColor:"rgba(0,255,180,0.4)"}}>
            Enroll Now →
          </Link>
        </div>
      )}
    </nav>
  );
}
