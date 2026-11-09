import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Check, Clock, MessageCircle, Award, Sparkles, BookOpen } from "lucide-react";

export const metadata = {
  title: "Learn automation and AI agents, free | Shaddies.Space",
  description: "A free, beginner-friendly course on automation and AI agents. Eight short modules, plain language, Nigerian examples and Shaddie to help you. Begin the first lesson now, no sign-up needed.",
};

const COURSE_HREF = "/automatex/course";

const modules = [
  ["Ideas are cheap, shipping is the product", "Why delivery beats ideas, and what customers really pay for."],
  ["The anatomy of an automated system", "Inputs, logic, outputs and storage, and what happens when things fail."],
  ["What an AI agent is", "The agent loop, tools, memory, and when not to use an agent."],
  ["Building with AI coding tools", "How to brief an AI tool, review its work and save your progress."],
  ["Architecture: frontend, backend, database", "Where decisions belong and how the pieces connect."],
  ["Securing what you build", "Secrets, permissions, abuse limits and care for people's data."],
  ["Shipping and running it", "Going live, watching it run, and fixing it when it breaks."],
  ["Selling solutions", "Pick a real problem, keep it small and write a one-page proposal."],
];

const steps = [
  { n: "01", title: "Start in minutes", text: "Open the first lesson and read it. There is nothing to sign up for. Your first quick win takes under five minutes." },
  { n: "02", title: "Save your place", text: "When you want to keep your progress, add an email and pick a username. It takes about ten seconds and you stay on the page." },
  { n: "03", title: "Finish and get your certificate", text: "Pass each module test, then the final exam. Your certificate comes with a link anyone can use to check it is real." },
];

const forYou = [
  "You are new to automation or AI and want to understand it properly.",
  "You prefer plain words and local examples to jargon.",
  "You want to know how to build, secure and ship something useful, not only which tools exist.",
];
const notForYou = [
  "You want a list of tools to copy without understanding them.",
  "You want a certificate without doing the work. Every module ends with a test, and the final exam can be taken once.",
];

const faqs = [
  ["Is it really free?", "Yes. The whole course, the tests, the final exam and the certificate are free. A paid course exists for people who want to go further and build with guidance, and you decide that after you finish."],
  ["Do I need to sign up to start?", "No. You can read the first lesson and answer its check question before you give any details. Sign-up only asks for an email and a username, so your progress is saved."],
  ["How long does it take?", "About 16 hours in total across eight modules, and it can be finished in 7 days. A short placement quiz estimates your pace and suggests a daily plan."],
  ["Do I need to know how to code?", "No. The course is written for beginners. It focuses on how systems are put together, how to keep them safe and how to ship them, and it explains every new word."],
  ["What is Shaddie?", "Shaddie is the AI teacher inside the course. Ask him to explain something another way, quiz you on a topic or help you prepare for a test. He stays on automation, agents and the course."],
  ["Who can join?", "Anyone aged 16 and over."],
  ["What does the certificate show?", "Your official name, the course name, the date and a certificate ID. It comes with a public link, so a client or employer can confirm it is genuine."],
];

export default function LearnPage() {
  return <>
    <Navbar />
    <main className="page-shell relative overflow-hidden">
      <section className="relative px-5 sm:px-6 pt-20 md:pt-28 pb-20 cyber-grid">
        <div className="ambient-orb w-[420px] h-[420px] -top-28 -right-24" />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <div>
            <p className="eyebrow mb-6">Free course · Automate X</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.04] tracking-tight mb-7" style={{ color: "var(--text)" }}>Learn how automation and AI agents <span style={{ color: "var(--neon)" }}>really work.</span></h1>
            <p className="text-base md:text-lg max-w-xl leading-relaxed mb-9" style={{ color: "var(--muted)" }}>A free, beginner-friendly course in plain language with Nigerian examples. Eight short modules, a teacher called Shaddie for when you are stuck, and a certificate you can prove is real. No sign-up to begin.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <Link href={COURSE_HREF} className="btn btn-primary">Begin lesson 1 <ArrowUpRight size={16} className="ml-2" /></Link>
              <a href="#modules" className="btn btn-secondary">See what you will learn</a>
            </div>
            <p className="mono text-[11px] mt-6 tracking-wide" style={{ color: "var(--muted)" }}>Free · About 16 hours · Finish in 7 days · Certificate at the end</p>
            <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>Already started? <Link href="/sign-in" className="underline" style={{ color: "var(--neon)" }}>Sign in</Link></p>
          </div>

          <div className="relative max-w-lg w-full mx-auto">
            <div className="surface-card p-5 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between mb-5"><span className="eyebrow">Your first lesson</span><span className="mono text-[11px]" style={{ color: "var(--muted)" }}>7 min read</span></div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text)" }}>The idea trap</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>Today you can type a request into an AI tool and get a working first version in an afternoon. That is exciting, but it has a side effect: everyone else can do it too.</p>
              <div className="rounded-2xl p-4" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
                <p className="mono text-[10px] mb-2" style={{ color: "var(--muted)" }}>QUICK CHECK</p>
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Why does a good idea protect you less than it used to?</p>
                {["AI tools only work for experts", "Anyone can build the same thing quickly with the same tools", "Customers no longer want new things"].map((o, i) => <div key={o} className="flex items-center gap-3 text-sm py-2" style={{ color: "var(--text)", borderTop: i ? "1px solid var(--border)" : "none" }}><span className="w-5 h-5 rounded-full shrink-0" style={{ border: "1px solid var(--border)" }} />{o}</div>)}
              </div>
              <Link href={COURSE_HREF} className="btn btn-primary mt-6 w-full">Begin this lesson</Link>
            </div>
            <div className="absolute -z-10 -bottom-5 -right-5 w-32 h-32 rounded-full" style={{ background: "var(--neon)", opacity: .08, filter: "blur(35px)" }} />
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[[Clock, "About 16 hours", "Eight short modules, finishable in a week"], [BookOpen, "Plain language", "Short lessons, new words explained"], [MessageCircle, "Shaddie helps", "Ask questions, get another explanation"], [Award, "Real certificate", "Comes with a public link to verify it"]].map(([Icon, t, d]) => <div key={t} className="surface-card p-5"><span className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: "color-mix(in srgb, var(--neon) 10%, transparent)", color: "var(--neon)" }}><Icon size={18} /></span><h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>{t}</h3><p className="text-sm" style={{ color: "var(--muted)" }}>{d}</p></div>)}
        </div>
      </section>

      <section id="modules" className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12"><p className="eyebrow mb-4">The eight modules</p><h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: "var(--text)" }}>From the first idea to a proposal you can sell.</h2><p className="leading-relaxed" style={{ color: "var(--muted)" }}>You learn how systems are built, secured and shipped, not only which tools exist. Each module ends with a short test so you know you understood it.</p></div>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map(([t, d], i) => <article key={t} className="surface-card p-5 sm:p-6 flex gap-4"><span className="mono text-xs pt-1" style={{ color: "var(--neon)" }}>{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>{t}</h3><p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{d}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12"><p className="eyebrow mb-4">How it works</p><h2 className="text-3xl sm:text-4xl font-semibold" style={{ color: "var(--text)" }}>Three steps, no pressure.</h2></div>
          <div className="grid md:grid-cols-3 gap-4">{steps.map(s => <article key={s.n} className="surface-card p-6 sm:p-7"><span className="mono text-xs" style={{ color: "var(--neon)" }}>{s.n}</span><h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>{s.title}</h3><p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="soft-panel p-7">
            <h3 className="font-semibold mb-5" style={{ color: "var(--text)" }}>This course is for you if</h3>
            {forYou.map(t => <div key={t} className="flex gap-3 py-2.5 text-sm" style={{ color: "var(--text)" }}><Check size={17} className="shrink-0 mt-0.5" style={{ color: "var(--neon)" }} />{t}</div>)}
          </div>
          <div className="soft-panel p-7">
            <h3 className="font-semibold mb-5" style={{ color: "var(--text)" }}>It may not suit you if</h3>
            {notForYou.map(t => <div key={t} className="flex gap-3 py-2.5 text-sm" style={{ color: "var(--muted)" }}><span className="shrink-0 w-[17px] text-center">–</span>{t}</div>)}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto surface-card p-7 sm:p-10 grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--neon) 12%, transparent)", color: "var(--neon)" }}><Sparkles size={24} /></div>
          <div><h2 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>Meet Shaddie, your teacher.</h2><p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: "var(--muted)" }}>Calm, patient and a little playful. Ask Shaddie to explain a lesson another way, quiz you on a weak topic or help you get ready for a test. He keeps to automation, agents and this course, and he tells you honestly when something is outside what he can help with.</p></div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="text-3xl font-semibold mb-8" style={{ color: "var(--text)" }}>Before you begin</h2>
          <div>{faqs.map(([q, a]) => <details key={q} className="group py-4" style={{ borderTop: "1px solid var(--border)" }}><summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold" style={{ color: "var(--text)" }}>{q}<span className="mono group-open:rotate-45 transition-transform" style={{ color: "var(--neon)" }}>+</span></summary><p className="text-sm leading-relaxed mt-3 pr-8" style={{ color: "var(--muted)" }}>{a}</p></details>)}<div style={{ borderTop: "1px solid var(--border)" }} /></div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto soft-panel p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: "var(--text)" }}>Your first lesson takes about five minutes.</h2>
          <p className="max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>Read it, answer one question and see how the course feels. You decide after that whether to save your progress.</p>
          <Link href={COURSE_HREF} className="btn btn-primary">Begin lesson 1 <ArrowUpRight size={16} className="ml-2" /></Link>
          <p className="text-sm mt-8" style={{ color: "var(--muted)" }}>Have a project in mind instead? <Link href="/build-with-me" className="underline" style={{ color: "var(--neon)" }}>Build it with us</Link></p>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
