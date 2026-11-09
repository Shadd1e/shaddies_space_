import Link from "next/link";

export default function Footer() {
  const socials = [
    { label: "Substack", href: "https://shaddies.substack.com" },
    { label: "X", href: "https://x.com/shaddiesspace" },
  ];
  return <footer className="px-5 sm:px-6 py-7" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div><span className="mono text-xs" style={{ color: "var(--muted)" }}>© 2026 Shaddies.Space</span><p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Make technology work for you.</p></div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs">
        <Link href="/learn" style={{ color: "var(--muted)" }}>Learn</Link><Link href="/build-with-me" style={{ color: "var(--muted)" }}>Build with me</Link><Link href="/courses" style={{ color: "var(--muted)" }}>Courses</Link><Link href="/contact" style={{ color: "var(--muted)" }}>Contact help</Link><Link href="/privacy" style={{ color: "var(--muted)" }}>Privacy</Link>
        {socials.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--neon)" }}>{link.label}</a>)}
      </div>
    </div>
  </footer>;
}
