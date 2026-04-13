import "./globals.css";
import FlowBackground from "@/components/FlowBackground";

export const metadata = {
  title: "Shaddies.Space",
  description: "Designing systems that run without you.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body style={{ margin: 0, padding: 0, background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
        <FlowBackground />
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
