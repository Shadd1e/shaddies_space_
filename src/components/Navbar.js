"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/learn", label: "Learn" },
  { href: "/build-with-me", label: "Build with me" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [theme, setTheme] = useState("system");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ss_theme_preference");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (mode) => {
      const resolved = mode === "system" ? (media.matches ? "dark" : "light") : mode;
      document.documentElement.setAttribute("data-theme", resolved);
    };
    const initial = saved || "system";
    setTheme(initial);
    apply(initial);
    const onSystemChange = () => { if (!localStorage.getItem("ss_theme_preference")) apply("system"); };
    const onScroll = () => setScrolled(window.scrollY > 20);
    media.addEventListener?.("change", onSystemChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      media.removeEventListener?.("change", onSystemChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cycleTheme = () => {
    const next = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
    if (next === "system") localStorage.removeItem("ss_theme_preference");
    else localStorage.setItem("ss_theme_preference", next);
    const dark = next === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : next === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  };

  const navBg = scrolled ? "var(--nav-glass)" : "var(--nav-glass-soft)";
  return (
    <nav className="fixed top-0 left-0 w-full z-[90]" style={{ background: navBg, backdropFilter: "blur(18px)", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition: "all .25s ease" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        <Link href="/" className="asimovian text-sm tracking-widest flicker shrink-0" style={{ color: "var(--neon)" }}>SHADDIES.SPACE</Link>
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-[var(--neon)]" style={{ color: "var(--muted)" }}>{item.label}</Link>)}
          <Link href="/contact" className="text-sm font-medium" style={{ color: "var(--muted)" }}>Contact</Link>
          <button onClick={cycleTheme} title={`Theme: ${theme}. Click to change.`} aria-label={`Theme preference: ${theme}`} className="theme-control">{theme === "system" ? "◐" : theme === "dark" ? "☀" : "☾"}</button>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <button onClick={cycleTheme} className="theme-control" aria-label={`Theme preference: ${theme}`}>{theme === "system" ? "◐" : theme === "dark" ? "☀" : "☾"}</button>
          <button className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? "×" : "☰"}</button>
        </div>
      </div>
      {menuOpen && <div className="md:hidden px-5 pb-5 pt-2 flex flex-col gap-4" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        {[...navItems, { href: "/contact", label: "Contact" }].map(item => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm py-1" style={{ color: "var(--text)" }}>{item.label}</Link>)}
      </div>}
    </nav>
  );
}
