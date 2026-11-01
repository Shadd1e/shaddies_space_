export default function Footer() {
  const links = [
    { label: "Substack", href: "https://shaddies.substack.com" },
    { label: "X", href: "https://x.com/shaddiesspace" },
  ];
  return (
    <footer
      className="px-6 py-4"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
        <span className="mono" style={{ color: "var(--muted)" }}>
          © 2026 Shaddies.Space
        </span>
        <div className="flex gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:opacity-100"
              style={{ color: "var(--neon)", opacity: 0.8 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
