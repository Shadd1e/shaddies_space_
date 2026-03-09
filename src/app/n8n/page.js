"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  TrendingUp, Users, Zap, Smartphone, DollarSign,
  ArrowRight, Plus, Minus, CheckCircle, Target, Repeat, Code2, Star,
  Briefcase, Building2, ShoppingBag, Monitor, GraduationCap, BarChart3,
  Globe, Shield, Rocket, Brain, Layers, Settings
} from "lucide-react";
import Footer from "@/components/Footer";

const PAYMENT_LINK = "#";

const WORKFLOWS = [
  {
    category: "Sales", Icon: TrendingUp,
    items: [
      "Auto-qualify leads from contact forms",
      "Send follow-up sequences when a lead goes cold",
      "Notify sales team instantly on new enquiry",
      "Auto-create deal in CRM from email",
      "Track proposal status and send reminders",
      "Generate sales reports every Monday morning",
      "Sync new leads from Instagram DMs to spreadsheet",
      "Auto-send invoice after verbal confirmation",
      "Alert manager when a big deal hasn't moved in 3 days",
      "Schedule follow-up calls automatically after demos",
    ],
  },
  {
    category: "CRM", Icon: Users,
    items: [
      "Auto-update contact records from email replies",
      "Tag clients by activity level automatically",
      "Send birthday messages to clients on autopilot",
      "Move client to 'at risk' if no contact in 30 days",
      "Auto-assign new contacts to account managers",
      "Sync client notes across Notion, Gmail and WhatsApp",
      "Weekly client health score report",
      "Auto-log every client call to CRM",
      "Send onboarding checklist when deal is won",
      "Create Slack alert when VIP client emails in",
    ],
  },
  {
    category: "Productivity", Icon: Zap,
    items: [
      "Daily task briefing sent to your phone every morning",
      "Auto-summarise long emails into 3 bullet points",
      "Create Notion task from any starred Gmail",
      "Weekly personal performance report",
      "Auto-block focus time on Google Calendar",
      "Meeting notes transcribed and saved automatically",
      "Remind yourself of unread messages after 24hrs",
      "Auto-organise downloads folder by file type",
      "Daily AI-written to-do list based on your calendar",
      "End-of-day summary of everything you completed",
    ],
  },
  {
    category: "Social Media", Icon: Smartphone,
    items: [
      "Auto-post approved content across all platforms",
      "Repurpose blog posts into Twitter/X threads",
      "Monitor brand mentions and alert you instantly",
      "Schedule a week of content in one click",
      "Auto-reply to common DM questions",
      "Track follower growth in weekly Notion dashboard",
      "Turn YouTube videos into LinkedIn posts",
      "Save viral posts from competitors to swipe file",
      "Auto-generate captions from product images",
      "Monthly social media performance digest",
    ],
  },
  {
    category: "Finance", Icon: DollarSign,
    items: [
      "Auto-send invoice on project completion",
      "Chase overdue invoices with polite reminders",
      "Weekly expense summary to your email",
      "Alert when monthly spend exceeds budget",
      "Auto-categorise transactions from bank statements",
      "Generate monthly P&L report automatically",
      "Remind clients 3 days before invoice is due",
      "Log every expense from WhatsApp receipt photos",
      "Auto-reconcile payments against invoices",
      "End-of-month tax summary for your accountant",
    ],
  },
];

const CURRICULUM = [
  { module: "01", title: "What is automation and why it matters now", lessons: 4, Icon: Globe },
  { module: "02", title: "Setting up n8n — free, fast, no code needed", lessons: 5, Icon: Settings },
  { module: "03", title: "Your first workflow in under 30 minutes", lessons: 6, Icon: Rocket },
  { module: "04", title: "Connecting apps — Gmail, WhatsApp, Notion, Sheets", lessons: 8, Icon: Layers },
  { module: "05", title: "Triggers, conditions and logic flows", lessons: 7, Icon: Code2 },
  { module: "06", title: "AI-powered automations with ChatGPT + Gemini", lessons: 6, Icon: Brain },
  { module: "07", title: "Building client-ready workflows", lessons: 5, Icon: Shield },
  { module: "08", title: "How to sell automation as a service", lessons: 4, Icon: TrendingUp },
];

const WHO = [
  { Icon: Briefcase,     who: "Freelancers",       desc: "Automate client work and charge more for less time" },
  { Icon: Building2,     who: "Agency owners",      desc: "Run operations without hiring more staff" },
  { Icon: ShoppingBag,   who: "Business owners",    desc: "Free yourself from repetitive daily tasks" },
  { Icon: Monitor,       who: "Virtual assistants", desc: "Offer automation as a premium service to clients" },
  { Icon: GraduationCap, who: "Undergraduates",     desc: "Learn a skill that earns before you even graduate" },
  { Icon: BarChart3,     who: "Sales & ops teams",  desc: "Cut manual reporting and follow-up time in half" },
];

const WHY = [
  { Icon: Target, title: "A skill clients pay for",  body: "Businesses in Nigeria are actively looking for people who can automate their operations. This course teaches you exactly what they need." },
  { Icon: Repeat, title: "Build once, run forever",  body: "One workflow you build today can save hours every single week. The compounding value of automation is unlike any other skill." },
  { Icon: Code2,  title: "No code required",         body: "n8n is visual. If you can think through a process step by step, you can automate it. We'll teach you how from scratch." },
];

const TESTIMONIALS = [
  { name: "Tunde Adeyemi", role: "Freelance Digital Marketer, Lagos",   initials: "TA", text: "I used to spend 3 hours every Monday doing reports. Now it's automated. I used what I learnt in this course to build my first workflow in 2 days. Clients are impressed and I charge more for it." },
  { name: "Chioma Obi",    role: "E-commerce Owner, Abuja",             initials: "CO", text: "Honestly I was skeptical. But after the first module I built an automation for my Shopify store. Orders, invoices, customer follow-ups — all running without me. Worth every naira." },
  { name: "Emeka Nwosu",   role: "400L Computer Science, UNILAG",       initials: "EN", text: "I'm a student and I've already made back the course fee by automating workflows for two small businesses near campus. This skill is genuinely different from anything taught in school." },
  { name: "Funke Adewale", role: "Virtual Assistant, Remote",           initials: "FA", text: "My clients started asking me if I know automation. I said yes, bought this course, and two weeks later I was charging 3x my old rate. The DFY workflows alone are worth it." },
];

const FAQS = [
  { q: "Do I need to know how to code?",              a: "Not at all. n8n uses a visual drag-and-drop interface. If you can use WhatsApp, you can learn this. We start from complete zero." },
  { q: "What tools do I need?",                       a: "Just a laptop and internet connection. n8n has a free plan that covers everything in this course. No paid subscriptions required to start." },
  { q: "How long does the course take to complete?",  a: "Most students finish the core modules in a weekend. The 50 workflows are yours to use immediately — no need to wait until you finish." },
  { q: "What are the 50 DFY workflows exactly?",      a: "Done-For-You workflow templates across Sales, CRM, Productivity, Social Media and Finance. Import them into your n8n account and they're ready." },
  { q: "Can I use this to offer services to clients?",a: "Yes — and that's exactly what many of our students do. Building automation workflows for small businesses is a growing service in Nigeria right now." },
  { q: "Is this a one-time payment?",                 a: "Yes. ₦10,000 once. No subscriptions, no hidden fees. Lifetime access to the course and all 50 workflows." },
  { q: "What happens after I pay?",                   a: "You'll be redirected to a private Telegram channel where the full course and all workflow files are waiting for you." },
  { q: "I'm a student, is this relevant for me?",     a: "Very much so. Several of our students are undergraduates who now earn from automation freelancing. The skill pays for itself fast." },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CTAButton({ light = false, className = "" }) {
  return (
    <a
      href={PAYMENT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-10 py-4 text-base font-semibold border transition-all rounded-lg ${
        light
          ? "border-white text-white hover:bg-white hover:text-[#191970]"
          : "border-[#191970] text-[#191970] hover:bg-[#191970] hover:text-white"
      } ${className}`}
    >
      Get Instant Access — ₦10,000
      <ArrowRight size={16} strokeWidth={2} />
    </a>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-6 cursor-pointer" onClick={() => setOpen(o => !o)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium">{q}</span>
        {open
          ? <Minus size={15} className="flex-shrink-0 text-[#191970]" strokeWidth={2} />
          : <Plus  size={15} className="flex-shrink-0 text-[#191970]" strokeWidth={2} />
        }
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="text-black/55 leading-relaxed mt-3 text-sm overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function N8nCoursePage() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  return (
    <main className="relative z-10 system-grid">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[85vh] px-6 pt-32 flex flex-col justify-center"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-6">
            Full Course + 50 Done-For-You Workflows
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
            The unfair advantage<br />
            most people don't<br />
            know exists.
          </h1>
          <p className="text-xl max-w-2xl mb-4 text-black/70 leading-relaxed">
            Learn AI automation with n8n — the skill that gets you paid more,
            closes better clients, and builds businesses that run without you.
            No coding. No fluff.
          </p>
          <p className="text-2xl font-semibold mb-10">₦10,000</p>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <CTAButton />
            <p className="text-sm text-black/35 sm:self-center">
              One-time · Lifetime access · Instant delivery
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-black/10 max-w-md">
            {[
              { value: "50",   label: "DFY Workflows" },
              { value: "8",    label: "Course Modules" },
              { value: "₦10k", label: "One-time only"  },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-semibold">{s.value}</p>
                <p className="text-xs text-black/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* WHY THIS SKILL */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Automation is the new literacy.</h2>
          <p className="text-black/55 max-w-xl mb-16 leading-relaxed">
            The people winning right now aren't working harder. They've learned
            to build systems that work for them — and they're charging accordingly.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {WHY.map(({ Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <Icon size={20} className="text-[#191970] mb-5" strokeWidth={1.5} />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-black/50 leading-relaxed">{body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CURRICULUM */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-14">What you'll learn</h2>
          <div className="grid md:grid-cols-2 gap-x-16">
            {CURRICULUM.map(({ module, title, lessons, Icon }, i) => (
              <FadeIn key={module} delay={i * 0.05}>
                <div className="flex items-start gap-4 py-5 border-b border-black/8">
                  <Icon size={17} className="text-[#191970] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-snug">{title}</p>
                    <p className="text-xs text-black/30 mt-1">{lessons} lessons</p>
                  </div>
                  <span className="text-[10px] font-bold text-black/15 tracking-widest mt-0.5 flex-shrink-0">{module}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 50 DFY WORKFLOWS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">50 done-for-you workflows.</h2>
          <p className="text-black/55 max-w-lg mb-12 leading-relaxed">
            Ready to import. Built for real business problems.
            Use them as-is or customise from day one.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {WORKFLOWS.map(({ category, Icon }, i) => (
              <button
                key={category}
                onClick={() => setActiveWorkflow(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
                  activeWorkflow === i
                    ? "bg-[#191970] text-white border-[#191970]"
                    : "border-black/15 text-black/55 hover:border-[#191970]/40 hover:text-[#191970]"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} />
                {category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={activeWorkflow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 gap-x-12"
            >
              {WORKFLOWS[activeWorkflow].items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 py-3.5 border-b border-black/6 text-sm text-black/60">
                  <CheckCircle size={14} className="text-[#191970] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <div className="mt-14 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-semibold">All 50 workflows included</p>
              <p className="text-sm text-black/40 mt-1">Sales · CRM · Productivity · Social Media · Finance</p>
            </div>
            <CTAButton />
          </div>
        </div>
      </motion.section>

      {/* WHO IT'S FOR */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-14">Built for people who move.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {WHO.map(({ Icon, who, desc }, i) => (
              <FadeIn key={who} delay={i * 0.07}>
                <Icon size={20} className="text-white/40 mb-4" strokeWidth={1.5} />
                <p className="font-semibold mb-1">{who}</p>
                <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-14">Real results, real people.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="border border-black/10 p-8 rounded-lg">
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={13} className="text-[#191970] fill-[#191970]" />
                    ))}
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#191970] text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-black/35">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* COMPARISON */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-14">Compare your options.</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left pb-5 font-medium text-black/35 w-1/3"></th>
                  <th className="pb-5 font-semibold text-[#191970] text-center">This course</th>
                  <th className="pb-5 font-medium text-black/35 text-center">Hire a dev</th>
                  <th className="pb-5 font-medium text-black/35 text-center">Figure it out</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cost",                    "₦10,000",  "₦150k+",    "Free but slow"],
                  ["Time to first workflow",  "Same day", "Weeks",     "Months"],
                  ["You own the skill",       "✓",        "✗",         "Eventually"],
                  ["50 ready-made workflows", "✓",        "✗",         "✗"],
                  ["Ongoing support",         "✓",        "Expensive", "None"],
                  ["Earn from it immediately","✓",        "N/A",       "Maybe"],
                ].map(([label, a, b, c]) => (
                  <tr key={label} className="border-b border-black/6">
                    <td className="py-4 font-medium text-black/55">{label}</td>
                    <td className="py-4 text-center font-semibold text-[#191970]">{a}</td>
                    <td className="py-4 text-center text-black/30">{b}</td>
                    <td className="py-4 text-center text-black/30">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10">Frequently asked questions</h2>
          {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#191970] text-white"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
            Get started today
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            The unfair advantage.<br />
            <span className="text-white/45">Yours for ₦10,000.</span>
          </h2>
          <p className="text-white/45 max-w-md mb-10 leading-relaxed">
            Full course. 50 done-for-you workflows. Lifetime access.
            One payment. Everything you need to learn automation and start earning from it.
          </p>
          <CTAButton light />
          <p className="text-white/20 text-xs mt-5">
            One-time payment · Instant access via Telegram · No subscriptions
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}