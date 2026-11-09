import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, BrainCircuit, Compass, MessageCircle, Sparkles, Target, ArrowUpRight } from "lucide-react";

const pillars = [
  { icon: Compass, number: "01", title: "Follow a clear path", text: "Move through a carefully structured learning journey, one idea at a time. No assumed knowledge and no unexplained jumps." },
  { icon: MessageCircle, number: "02", title: "Think while you learn", text: "Short prompts, knowledge checks and practical questions help turn reading into understanding." },
  { icon: BrainCircuit, number: "03", title: "Learn with Shaddie", text: "Ask questions, request another explanation and explore a concept from a different angle with your AI learning companion." },
];

export default function LearnPage() {
  return <>
    <Navbar />
    <main className="page-shell relative overflow-hidden">
      <section className="relative px-5 sm:px-6 pt-20 md:pt-28 pb-20 cyber-grid">
        <div className="ambient-orb w-[420px] h-[420px] -top-28 -right-24" />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
          <div>
            <p className="eyebrow mb-6">The learning space</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.04] tracking-tight mb-7" style={{ color: "var(--text)" }}>Understand the idea.<br /><span style={{ color: "var(--neon)" }}>Then make it real.</span></h1>
            <p className="text-base md:text-lg max-w-xl leading-relaxed mb-9" style={{ color: "var(--muted)" }}>A free, guided learning experience built around clear explanations, practical thinking and an AI companion that helps you work things out.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#learning-method" className="btn btn-primary">EXPLORE HOW IT WORKS <ArrowUpRight size={16} className="ml-2" /></a>
              <Link href="/sign-in" className="btn btn-secondary">SIGN IN</Link>
            </div>
            <p className="mono text-[10px] mt-6 tracking-wider" style={{ color: "var(--muted)" }}>FREE TO LEARN · BUILT FOR REAL UNDERSTANDING</p>
          </div>
          <div className="relative max-w-lg w-full mx-auto">
            <div className="surface-card p-5 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3"><span className="eyebrow">A preview of Shaddie</span><span className="w-2 h-2 rounded-full" style={{ background: "var(--neon)" }} /></div>
              <p className="text-[10px] mono mb-6" style={{ color: "var(--muted)" }}>EXAMPLE LEARNING CONVERSATION</p>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--neon) 12%, transparent)", color: "var(--neon)" }}><Sparkles size={19} /></div>
                <div><p className="font-semibold mb-1" style={{ color: "var(--text)" }}>Shaddie</p><p className="text-xs" style={{ color: "var(--muted)" }}>Your AI learning companion</p></div>
              </div>
              <div className="rounded-2xl rounded-tl-sm p-4 mb-3" style={{ background: "var(--bg2)" }}><p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>A good system does more than complete a task. It makes the process repeatable. Want to unpack what that means?</p></div>
              <div className="rounded-2xl rounded-tr-sm p-4 ml-8" style={{ background: "color-mix(in srgb, var(--neon) 10%, var(--surface))", border: "1px solid var(--border)" }}><p className="text-sm" style={{ color: "var(--text)" }}>Can you give me a real-world example?</p></div>
              <div className="mt-7 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--neon)" }} /><span className="h-1.5 w-1.5 rounded-full opacity-60" style={{ background: "var(--neon)" }} /><span className="h-1.5 w-1.5 rounded-full opacity-30" style={{ background: "var(--neon)" }} /><span className="text-[10px] mono ml-2" style={{ color: "var(--muted)" }}>ASK · EXPLORE · UNDERSTAND</span></div>
            </div>
            <div className="absolute -z-10 -bottom-5 -right-5 w-32 h-32 rounded-full" style={{ background: "var(--neon)", opacity: .08, filter: "blur(35px)" }} />
          </div>
        </div>
      </section>

      <section id="learning-method" className="px-5 sm:px-6 py-20" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12"><p className="eyebrow mb-4">A different kind of course</p><h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: "var(--text)" }}>Not just content to consume.</h2><p className="leading-relaxed" style={{ color: "var(--muted)" }}>The experience is designed to help you build understanding as you go — with room to pause, question, practise and revisit.</p></div>
          <div className="grid md:grid-cols-3 gap-4">{pillars.map(({ icon: Icon, number, title, text }) => <article key={number} className="surface-card p-6 sm:p-7"><div className="flex justify-between items-start mb-9"><span className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--neon) 10%, transparent)", color: "var(--neon)" }}><Icon size={20} /></span><span className="mono text-xs" style={{ color: "var(--muted)" }}>{number}</span></div><h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[.9fr_1.1fr] gap-12 items-center">
          <div><p className="eyebrow mb-4">Designed to stay with you</p><h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-5" style={{ color: "var(--text)" }}>Learn at your pace.<br /><span style={{ color: "var(--neon)" }}>Return when you need.</span></h2><p className="leading-relaxed" style={{ color: "var(--muted)" }}>The course experience is being prepared for this space. Its course bank, stories, assessments and Shaddie experience will be connected here as a separate learning application.</p></div>
          <div className="soft-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-7"><BookOpen style={{ color: "var(--neon)" }} size={21} /><span className="font-semibold" style={{ color: "var(--text)" }}>The learning experience</span></div>
            {["Guided lessons and stories", "Questions and knowledge checks", "A final assessment", "Shaddie, available as you learn", "A clear record of your progress"].map((item, i) => <div key={item} className="flex items-center gap-3 py-3" style={{ borderTop: "1px solid var(--border)" }}><span className="mono text-xs" style={{ color: "var(--neon)" }}>0{i + 1}</span><span className="text-sm" style={{ color: "var(--text)" }}>{item}</span></div>)}
            <p className="text-xs mt-5" style={{ color: "var(--muted)" }}>Course lessons and account features will appear here after the course package is integrated.</p>
          </div>
        </div>
      </section>
      <section className="px-5 sm:px-6 pb-20"><div className="max-w-6xl mx-auto soft-panel p-7 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"><div><p className="eyebrow mb-3">Have a project in mind?</p><h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: "var(--text)" }}>You can learn it — or build it with us.</h2></div><Link href="/build-with-me" className="btn btn-primary shrink-0">BUILD WITH ME <ArrowUpRight size={16} className="ml-2" /></Link></div></section>
    </main>
    <Footer />
  </>;
}
