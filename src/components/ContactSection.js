"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm]       = useState({ name: "", email: "", type: "business", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | sent | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Formspree endpoint — replace FORM_ID with your actual ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-6 py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Let's talk.
          </h2>
          <p className="text-lg mb-16 max-w-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Whether you want to automate your business, enroll in the course, or explore a partnership — reach out and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "sent" ? (
              <div className="p-10 rounded-xl text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(77,121,255,0.1)", border: "1px solid var(--border)" }}>
                  <span className="text-xl" style={{ color: "var(--neon)" }}>✓</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Message sent.</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Type selector */}
                <div className="flex gap-3">
                  {["business", "student", "other"].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => set("type", t)}
                      className="mono text-xs px-4 py-2 rounded capitalize transition-all duration-200"
                      style={{
                        background:   form.type === t ? "var(--neon)"    : "var(--surface)",
                        color:        form.type === t ? "#fff"            : "var(--muted)",
                        border:       form.type === t ? "1px solid var(--neon)" : "1px solid var(--border)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest mono" style={{ color: "var(--muted)" }}>Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={e => set("name", e.target.value)}
                      placeholder="Your name"
                      className="px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit" }}
                      onFocus={e  => e.target.style.borderColor = "var(--neon)"}
                      onBlur={e   => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest mono" style={{ color: "var(--muted)" }}>Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className="px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit" }}
                      onFocus={e => e.target.style.borderColor = "var(--neon)"}
                      onBlur={e  => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest mono" style={{ color: "var(--muted)" }}>Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={e => set("message", e.target.value)}
                    placeholder="Tell us what you're working on or what you need..."
                    className="px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = "var(--neon)"}
                    onBlur={e  => e.target.style.borderColor = "var(--border)"}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#e55" }}>Something went wrong. Try emailing us directly.</p>
                )}

                <button
                  type="submit" disabled={status === "sending"}
                  className="px-8 py-4 font-bold text-sm transition-all duration-200 neon-glow"
                  style={{ background: "var(--neon)", color: "#fff", borderRadius: 6, opacity: status === "sending" ? 0.6 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right side — direct channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {[
              { label: "Email",     value: "hello@shaddies.space",           href: "mailto:hello@shaddies.space" },
              { label: "WhatsApp",  value: "Chat with us directly",          href: "https://wa.me/2348000000000" },
              { label: "Twitter/X", value: "@shaddiesspace",                 href: "https://twitter.com/shaddiesspace" },
              { label: "Substack",  value: "Read our automation newsletter", href: "https://shaddies.substack.com" },
            ].map(c => (
              <div key={c.label} className="p-6 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>{c.label}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-sm transition-colors duration-200"
                  style={{ color: "var(--neon)", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.opacity = "0.7"}
                  onMouseLeave={e => e.target.style.opacity = "1"}>
                  {c.value} →
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
