"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { label: "AI & Automation", href: "/automatex" },
  { label: "Projects",        href: "/#projects"  },
  { label: "Solutions",       href: "/solutions"  },
  { label: "About",           href: "/about"      },
];

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [dark, setDark]     = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ss_theme");
    if (saved) setDark(saved === "dark");
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("ss_theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[90]"
      style={{
        background: scrolled ? "rgba(5,8,16,0.96)" : "rgba(5,8,16,0.80)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(0,255,180,0.08)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="asimovian text-sm tracking-widest flicker" style={{ color: "var(--neon)" }}>
          SHADDIES.SPACE
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <Link key={l.label} href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={e => e.target.style.color = "var(--neon)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}
            >{l.label}</Link>
          ))}
          <Link href="/automatex"
            className="text-sm px-5 py-2 font-semibold transition-all duration-200 border"
            style={{ color: "var(--neon)", borderColor: "rgba(0,255,180,0.4)" }}>
            Enroll Now →
          </Link>
          <button
            onClick={() => setDark(d => !d)}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, transition: "all 0.2s", color: "var(--text)",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,255,180,0.4)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
          >{dark ? "☀" : "☾"}</button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDark(d => !d)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--text)", padding: 4 }}>
            {dark ? "☀" : "☾"}
          </button>
          <button className="flex flex-col gap-1.5 p-1" onClick={() => setOpen(o => !o)}>
            <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} style={{ background: "var(--neon)" }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? "opacity-0" : ""}`} style={{ background: "var(--neon)" }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "var(--neon)" }} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 py-6 space-y-5" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          {LINKS.map(l => (
            <Link key={l.label} href={l.href} className="block text-sm font-medium"
              style={{ color: "var(--muted)" }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/automatex" className="inline-block text-sm px-5 py-2 border font-semibold"
            style={{ color: "var(--neon)", borderColor: "rgba(0,255,180,0.4)" }} onClick={() => setOpen(false)}>
            Enroll Now →
          </Link>
        </div>
      )}
    </nav>
  );
}
