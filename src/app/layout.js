import "./globals.css";
import FlowBackground from "@/components/FlowBackground";

export const metadata = {
  title: "Shaddies.Space — Learn it. Build it. Put it to work.",
  description: "Learn to build useful technology and work with Shaddies.Space to turn ideas into systems.",
  icons: { icon: "/favicon.ico" },
};

const themeScript = `(() => { try { const saved = localStorage.getItem('ss_theme_preference'); const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); } catch (_) {} })();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body style={{ margin: 0, padding: 0, background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
        <FlowBackground />
        <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
      </body>
    </html>
  );
}
