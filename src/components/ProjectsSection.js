"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PROJECTS = [
  {
    tag:    "Live",
    name:   "Projekkt",
    slug:   "projekkt",
    desc:   "Upload a .docx and get back a clean document — plagiarism detected, AI-written sections flagged, everything rewritten by DeepSeek.",
    stack:  ["Next.js", "FastAPI", "DeepSeek", "Flutterwave"],
    href:   "https://projekkt.shaddies.space",
    accent: "#c8ff00",
    ext:    true,
  },
  {
    tag:    "Live",
    name:   "Signl",
    slug:   "signl",
    desc:   "A content digest platform that aggregates niche news from 30+ RSS feeds and delivers a personalized daily briefing.",
    stack:  ["n8n", "Guardian API", "OpenAI", "PostgreSQL"],
    href:   "/signl",
    accent: "var(--neon)",
    ext:    false,
  },
  {
    tag:    "Coming soon",
    name:   "ShopprHQ",
    slug:   "shopprhq",
    desc:   "Multi-tenant WhatsApp commerce SaaS. Nigerian merchants take orders, manage stores, and process payments — all through WhatsApp.",
    stack:  ["FastAPI", "WhatsApp Cloud API", "Flutterwave", "Railway"],
    href:   "#",
    accent: "var(--neon3)",
    ext:    false,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "96px 24px", borderTop: "1px solid rgba(0,255,180,0.08)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>
            Projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Things we're building.
          </h2>
          <p className="text-lg mb-16 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
            Software products built out of Shaddies Space. Some are live, some are loading.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "border-color 0.2s, transform 0.2s",
                cursor: p.href === "#" ? "default" : "pointer",
              }}
              onMouseEnter={e => {
                if (p.href !== "#") {
                  e.currentTarget.style.borderColor = `${p.accent}44`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Tag */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono, monospace)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  padding: "3px 10px", borderRadius: 20,
                  background: p.tag === "Live" ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.05)",
                  color: p.tag === "Live" ? "var(--neon)" : "var(--muted)",
                  border: p.tag === "Live" ? "1px solid rgba(0,255,180,0.2)" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {p.tag === "Live" && <span style={{ marginRight: 5, fontSize: 8, verticalAlign: "middle", display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--neon)", animation: "pulse 2s infinite" }} />}
                  {p.tag}
                </span>
              </div>

              {/* Name */}
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.name}</h3>

              {/* Desc */}
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map(s => (
                  <span key={s} style={{
                    fontSize: 11, padding: "3px 9px", borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--muted)",
                    fontFamily: "monospace",
                  }}>{s}</span>
                ))}
              </div>

              {/* CTA */}
              {p.href !== "#" && (
                p.ext
                  ? <a href={p.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, fontWeight: 700, color: p.accent, textDecoration: "none", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      View project ↗
                    </a>
                  : <Link href={p.href}
                      style={{ fontSize: 13, fontWeight: 700, color: p.accent, textDecoration: "none", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      View project →
                    </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  );
}
