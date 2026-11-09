import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectPlanner from "@/components/ProjectPlanner";
import ProjectEnquiryForm from "@/components/ProjectEnquiryForm";
import { ArrowUpRight, CalendarDays, ClipboardList, MessageCircle, Mail, Workflow } from "lucide-react";

const steps = [
  { icon: ClipboardList, n: "01", title: "Tell us what you know", text: "Share the idea, the problem, what you have tried and what you hope to achieve. It is fine if some parts are still unclear." },
  { icon: Workflow, n: "02", title: "We explore the right approach", text: "We review the context, ask the important questions and work out whether the best answer is automation, software, integration or a different approach." },
  { icon: CalendarDays, n: "03", title: "Agree on the next step", text: "If there is a fit, we arrange a conversation, clarify the scope and discuss a practical way forward." },
];

export default function BuildWithMePage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : null;
  return <>
    <Navbar />
    <main className="page-shell">
      <section className="relative px-5 sm:px-6 pt-20 md:pt-28 pb-20 cyber-grid overflow-hidden">
        <div className="ambient-orb w-[440px] h-[440px] -top-32 -right-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="eyebrow mb-6">Build with me</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold max-w-4xl leading-[1.05] tracking-tight mb-7" style={{ color: "var(--text)" }}>You bring the problem.<br /><span style={{ color: "var(--neon)" }}>We'll work out what to build.</span></h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mb-9" style={{ color: "var(--muted)" }}>You do not need a complete brief or a technical plan. Start with what you know. We'll help turn the moving parts into a clear direction.</p>
          <div className="flex flex-col sm:flex-row gap-3"><a href="#project-enquiry" className="btn btn-primary">SHARE YOUR PROJECT <ArrowUpRight size={16} className="ml-2" /></a><a href="#plan-an-idea" className="btn btn-secondary">I HAVE AN IDEA TO EXPLORE</a></div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto"><div className="max-w-2xl mb-12"><p className="eyebrow mb-4">A straightforward process</p><h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: "var(--text)" }}>From a rough idea to a considered plan.</h2><p style={{ color: "var(--muted)" }}>The first conversation is about understanding the problem, not forcing a solution.</p></div>
          <div className="grid md:grid-cols-3 gap-4">{steps.map(({ icon: Icon, n, title, text }) => <article key={n} className="surface-card p-6 sm:p-7"><div className="flex items-center justify-between mb-8"><Icon size={22} style={{ color: "var(--neon)" }} /><span className="mono text-xs" style={{ color: "var(--muted)" }}>{n}</span></div><h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{text}</p></article>)}</div>
        </div>
      </section>

      <section id="plan-an-idea" className="px-5 sm:px-6 py-20"><div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-start"><div className="lg:sticky lg:top-28"><p className="eyebrow mb-4">Not sure where to begin?</p><h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-5" style={{ color: "var(--text)" }}>Let's give the idea some shape.</h2><p className="leading-relaxed mb-6" style={{ color: "var(--muted)" }}>Answer a few prompts and Shaddies.Space will create a rough first-pass project exploration: possible direction, an initial scope, questions to resolve and things to watch out for.</p><div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}><MessageCircle size={18} className="mt-0.5 shrink-0" style={{ color: "var(--neon)" }} /><p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>This is an exploratory starting point. It is not a commitment, quote, technical specification or substitute for a proper project discussion.</p></div></div><ProjectPlanner /></div></section>

      <section id="project-enquiry" className="px-5 sm:px-6 py-20" style={{ background: "var(--bg2)" }}><div className="max-w-6xl mx-auto grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-start"><div><p className="eyebrow mb-4">Tell us about it</p><h2 className="text-3xl sm:text-4xl font-semibold mb-5" style={{ color: "var(--text)" }}>A few details are enough to start.</h2><p className="leading-relaxed mb-8" style={{ color: "var(--muted)" }}>Share as much or as little as you know. We can fill in the gaps together.</p><div className="space-y-4">
          {calendly ? <a href={calendly} target="_blank" rel="noreferrer" className="surface-card p-4 flex items-center gap-4 glow-hover"><CalendarDays style={{ color: "var(--neon)" }} /><span className="flex-1"><strong className="block text-sm" style={{ color: "var(--text)" }}>Book a conversation</strong><small style={{ color: "var(--muted)" }}>Choose a time that works for you.</small></span><ArrowUpRight size={16} style={{ color: "var(--muted)" }} /></a> : <div className="surface-card p-4 flex items-center gap-4"><CalendarDays style={{ color: "var(--neon)" }} /><span><strong className="block text-sm" style={{ color: "var(--text)" }}>Meeting scheduler</strong><small style={{ color: "var(--muted)" }}>Calendly link will appear here once configured.</small></span></div>}
          {waHref ? <a href={waHref} target="_blank" rel="noreferrer" className="surface-card p-4 flex items-center gap-4 glow-hover"><MessageCircle style={{ color: "var(--neon)" }} /><span className="flex-1"><strong className="block text-sm" style={{ color: "var(--text)" }}>Chat on WhatsApp</strong><small style={{ color: "var(--muted)" }}>Start a direct conversation.</small></span><ArrowUpRight size={16} style={{ color: "var(--muted)" }} /></a> : <div className="surface-card p-4 flex items-center gap-4"><MessageCircle style={{ color: "var(--neon)" }} /><span><strong className="block text-sm" style={{ color: "var(--text)" }}>WhatsApp</strong><small style={{ color: "var(--muted)" }}>Number will appear here once configured.</small></span></div>}
          <a href="mailto:support@shaddies.space" className="surface-card p-4 flex items-center gap-4 glow-hover"><Mail style={{ color: "var(--neon)" }} /><span className="flex-1"><strong className="block text-sm" style={{ color: "var(--text)" }}>Send an email</strong><small style={{ color: "var(--muted)" }}>support@shaddies.space</small></span><ArrowUpRight size={16} style={{ color: "var(--muted)" }} /></a>
        </div></div><ProjectEnquiryForm /></div></section>
    </main>
    <Footer />
  </>;
}
