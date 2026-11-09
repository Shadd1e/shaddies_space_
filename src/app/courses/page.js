import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function CoursesPage() {
  return <><Navbar /><main className="page-shell px-5 sm:px-6 py-20"><div className="max-w-4xl mx-auto"><p className="eyebrow mb-4">Courses</p><h1 className="text-4xl sm:text-5xl font-semibold mb-5" style={{ color: "var(--text)" }}>Keep learning. Keep building.</h1><p className="max-w-2xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>This is where additional courses and deeper learning experiences will be listed. The free learning space is the place to start.</p><div className="surface-card p-7 sm:p-9"><p className="eyebrow mb-3">Start here</p><h2 className="text-2xl font-semibold mb-3" style={{ color: "var(--text)" }}>Explore the free learning space.</h2><p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Learn through guided explanations, interactive questions and Shaddie — your AI learning companion.</p><Link href="/learn" className="btn btn-primary !w-auto">GO TO LEARN <ArrowUpRight size={16} className="ml-2" /></Link></div></div></main><Footer /></>;
}
