import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function CoursesPage() {
  return <><Navbar /><main className="page-shell px-5 sm:px-6 py-20"><div className="max-w-4xl mx-auto"><p className="eyebrow mb-4">Courses</p><h1 className="text-4xl sm:text-5xl font-semibold mb-5" style={{ color: "var(--text)" }}>Keep learning. Keep building.</h1><p className="max-w-2xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>Start with a free foundation, then return for deeper courses and practical learning paths as they are released.</p><div className="surface-card p-7 sm:p-9"><p className="eyebrow mb-3">Free · Start here</p><h2 className="text-2xl font-semibold mb-3" style={{ color: "var(--text)" }}>Automate X: Introduction to Automation and AI Agents</h2><p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Eight self-paced modules, practical scenarios, module tests, a final exam and a verifiable certificate. Designed for beginners aged 16 and over.</p><Link href="/automatex" className="btn btn-primary !w-auto">EXPLORE AUTOMATE X <ArrowUpRight size={16} className="ml-2" /></Link></div><p className="text-xs mt-8" style={{color:'var(--muted)'}}>Additional paid courses can be listed here as they become available.</p></div></main><Footer /></>;
}
