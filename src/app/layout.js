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
    <html lang="en">
      <body className="relative text-black overflow-x-hidden">

        {/* Animated background */}
        <FlowBackground />

        {/* Site content */}
        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}
