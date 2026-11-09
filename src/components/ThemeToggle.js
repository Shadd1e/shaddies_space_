"use client";

import { useEffect, useState } from "react";

// Same behaviour as the Navbar toggle: system -> dark -> light -> system
export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

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
    const onSystemChange = () => {
      if (!localStorage.getItem("ss_theme_preference")) apply("system");
    };
    media.addEventListener?.("change", onSystemChange);
    return () => media.removeEventListener?.("change", onSystemChange);
  }, []);

  const cycle = () => {
    const next = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
    if (next === "system") localStorage.removeItem("ss_theme_preference");
    else localStorage.setItem("ss_theme_preference", next);
    const dark = next === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : next === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  };

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme}. Click to change.`}
      aria-label={`Theme preference: ${theme}`}
      className="theme-control"
    >
      {theme === "system" ? "◐" : theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
