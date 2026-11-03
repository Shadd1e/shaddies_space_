"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


export default function Navbar() {
  const [dark, setDark]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ss_theme");
    if (saved) setDark(saved === "dark");
    else setDark(false); // default light
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("ss_theme", dark ? "dark" : "light");
  }, [dark]);

  const navBg = dark
    ? (scrolled ? "rgba(5,8,16,0.97)" : "rgba(5,8,16,0.85)")
    : (scrolled ? "rgba(247,248,252,0.97)" : "rgba(247,248,252,0.88)");

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[90]"
      style={{
        background: navBg,
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="asimovian text-sm tracking-widest flicker" style={{ color: "var(--neon)" }}>
          SHADDIES.SPACE
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/about"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--neon)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >Who we are</Link>
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

      </div>
    </nav>
  );
}
