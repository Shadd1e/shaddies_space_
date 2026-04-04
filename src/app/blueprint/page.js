"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Plus, CheckCircle, Star, Zap, DollarSign, Users,
  Target, Globe, Rocket, Briefcase, Building2, ShoppingBag,
  MessageCircle, Search, FileText, Download, CreditCard, Package,
  BookOpen, Cpu, Bot, BarChart, Smartphone
} from "lucide-react";
import Footer from "@/components/Footer";

// ── Config ────────────────────────────────────────────────────────────────────
const SELAR_LINK       = "https://selar.co/your-selar-link";
const FLUTTERWAVE_LINK = "https://flutterwave.com/pay/9oujlxbdovcl";
const ORIGINAL_PRICE   = "₦50,000";
const SALE_PRICE       = "₦5,000";

// ── Data ──────────────────────────────────────────────────────────────────────
const WHAT_YOU_GET = [
  { Icon: BookOpen,   title: "Complete Automation Blueprint",  desc: "A step-by-step system for building automations that generate income — from zero to production-ready." },
  { Icon: Search,     title: "How & Where to Find Clients",    desc: "Proven outreach scripts, platforms to target, and positioning strategies that win automation clients in Nigeria and globally." },
  { Icon: Package,    title: "100 Premium Done-For-You Tools", desc: "100 hand-picked, pre-built automation tools across Sales, CRM, Finance, Social, and Ops — ready to deploy today." },
  { Icon: Bot,        title: "AI-Powered Workflows",           desc: "Integrate ChatGPT, Gemini and Claude into your automations to create intelligent systems that think and act." },
  { Icon: DollarSign, title: "Income Playbook",                desc: "Exact pricing structures, service packages, and closing scripts to turn automation skills into recurring revenue." },
  { Icon: FileText,   title: "Templates & Swipe Files",        desc: "Proposal templates, client email scripts, onboarding docs — every asset you need to look professional from day one." },
];

const TOOLS_CATEGORIES = [
  {
    category: "Lead Generation", Icon: Target,
    tools: [
      "Auto-qualify leads from contact forms",
      "Scrape and enrich LinkedIn leads automatically",
      "Send personalised cold outreach via email",
      "Track open rates and follow up on clicks",
      "Auto-notify when a hot lead visits your site",
      "Build a lead database from Instagram comments",
      "Sync new leads from ads directly to your CRM",
      "Auto-create prospect profiles from business cards",
      "Run A/B test sequences and log results",
      "Weekly lead pipeline report sent to WhatsApp",
    ],
  },
  {
    category: "Client Management", Icon: Users,
    tools: [
      "Auto-send onboarding checklist after payment",
      "Monthly client health score report",
      "Escalate unresponsive clients to Slack",
      "Auto-log every call and meeting to CRM",
      "Send birthday messages to clients on autopilot",
      "Weekly client status update digest",
      "Flag contracts expiring within 30 days",
      "Auto-generate project briefs from intake forms",
      "Sync client notes across Notion, Gmail, WhatsApp",
      "NPS survey triggered 30 days after project close",
    ],
  },
  {
    category: "Revenue & Finance", Icon: DollarSign,
    tools: [
      "Auto-send invoice on project completion",
      "Chase overdue invoices with polite reminders",
      "Weekly revenue summary to your email",
      "Alert when monthly spend exceeds budget",
      "Auto-categorise transactions from bank statements",
      "Generate monthly P&L report automatically",
      "Log expenses from WhatsApp receipt photos",
      "Auto-reconcile payments against invoices",
      "End-of-month tax summary for your accountant",
      "Forecast cash flow from pipeline data",
    ],
  },
  {
    category: "Content & Social", Icon: Smartphone,
    tools: [
      "Auto-post approved content across all platforms",
      "Repurpose blog posts into Twitter/X threads",
      "Monitor brand mentions and alert you instantly",
      "Schedule a week of content in one click",
      "Auto-reply to common DM questions",
      "Turn YouTube videos into LinkedIn posts",
      "Save viral posts from competitors to swipe file",
      "Auto-generate captions from product images",
      "Monthly social media performance digest",
      "Convert newsletters into social micro-content",
    ],
  },
  {
    category: "Productivity", Icon: Zap,
    tools: [
      "Daily task briefing sent to your phone every morning",
      "Auto-summarise long emails into 3 bullet points",
      "Create Notion task from any starred Gmail",
      "Weekly personal performance report",
      "Auto-block focus time on Google Calendar",
      "Meeting notes transcribed and saved automatically",
      "AI-written daily to-do list from your calendar",
      "End-of-day summary of everything you completed",
      "Reminder system for unread messages after 24hrs",
      "Auto-organise files by type, date and project",
    ],
  },
];

const CLIENT_SOURCES = [
  { Icon: Globe,         title: "LinkedIn",           desc: "Search for ops managers, agency founders, and e-commerce owners posting about manual work pains. DM them with a specific problem-solution hook." },
  { Icon: MessageCircle, title: "WhatsApp Groups",    desc: "Business, tech, and entrepreneur groups are full of people who need automation. Be helpful first. Clients follow naturally." },
  { Icon: BarChart,      title: "Upwork & Remote OK", desc: "International clients pay in USD. Automation services are in huge demand. We show you exactly how to position your profile to win." },
  { Icon: Briefcase,     title: "Local Businesses",   desc: "Restaurants, real estate agents, clinics, and logistics firms all have repetitive processes. Walk in with a problem-solution pitch." },
  { Icon: Building2,     title: "Referrals",          desc: "Your first three clients will refer your next ten. We show you how to build a referral engine into every project handoff." },
  { Icon: Rocket,        title: "Cold Email",         desc: "Targeted, personalised cold email campaigns. Swipe-file templates included — proven response rates above 15%." },
];

const TESTIMONIALS = [
  { name: "Adaeze Nwachukwu", role: "Freelance Automation Consultant, Lagos",    initials: "AN", text: "I downloaded this blueprint on a Friday. By Monday I had landed my first automation client at ₦80,000. The client acquisition section alone is worth 10x the price. I wish I had this a year ago." },
  { name: "Emeka Okafor",     role: "Digital Agency Owner, Abuja",               initials: "EO", text: "The 100 DFY tools are insane. I deployed 12 of them for a logistics client in one week. They're now paying me a ₦45,000 monthly retainer to maintain the workflows. This pays for itself every single month." },
  { name: "Fatima Bello",     role: "Virtual Assistant turned Automation Specialist", initials: "FB", text: "I was charging ₦15,000/month as a VA. After going through the income playbook and repositioning as an automation specialist, I now charge ₦120,000/month for the same hours. The transformation is real." },
  { name: "Chukwuemeka Eze",  role: "300L Engineering Student, FUTA",            initials: "CE", text: "I'm a student and I've already made ₦240,000 since buying this blueprint — automating processes for three small businesses in Akure. No experience required is absolutely true." },
  { name: "Ngozi Okonkwo",    role: "E-commerce Founder, Port Harcourt",         initials: "NO", text: "The blueprint cut my operational workload by 70%. Orders, invoices, customer follow-ups, supplier reminders — all automated. I now run a bigger business with less stress and fewer staff." },
  { name: "Taiwo Adeyemi",    role: "Remote Sales Manager",                      initials: "TA", text: "The client acquisition playbook is different from anything I've seen. Specific, actionable, Nigerian context. Within two weeks I had three discovery calls booked with serious business owners." },
];

const FAQS = [
  { q: "Do I need to know how to code?",               a: "Not at all. Every tool in this blueprint uses visual no-code interfaces. If you can use a smartphone, you can use these tools. We start from zero." },
  { q: "How do I get access after payment?",           a: "Immediately. Whether you pay via Selar or directly via Flutterwave, you'll receive a download link within minutes of payment confirmation." },
  { q: "Is this a physical product or digital?",       a: "This is a digital product — a comprehensive blueprint delivered as a PDF and tool bundle. Download it instantly and access it on any device." },
  { q: "How long is the Easter price available?",      a: "The ₦5,000 price is available for a limited Easter window only. After this period, it returns to the standard ₦50,000. We will not extend this offer." },
  { q: "What are the 100 DFY tools exactly?",          a: "100 pre-built, importable automation workflows across Lead Generation, Client Management, Finance, Social Media, and Productivity. They run on n8n, Make, and Zapier — all with free tiers." },
  { q: "Can I use this to find real paying clients?",  a: "Yes — and that's the core promise. The client acquisition section includes outreach scripts, platform guides, positioning advice, and closing frameworks tested in the Nigerian and global market." },
  { q: "What if I already have automation experience?", a: "The blueprint meets you where you are. The 100 DFY tools and client acquisition playbook are valuable whether you're starting from zero or have existing skills to monetise." },
  { q: "Is there a refund policy?",                    a: "Given the Easter pricing and instant digital delivery, this purchase is final. The value far exceeds the price — we're confident in that." },
];

// ── Shared helpers ────────────────────────────────────────────────────────────
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

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-6 cursor-pointer group" onClick={() => setOpen(o => !o)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium group-hover:text-[#0a1f5c] transition-colors duration-200">{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={15} className="flex-shrink-0 text-[#0a1f5c]" strokeWidth={2} />
        </motion.div>
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

function DualCTA({ light = false, size = "default" }) {
  const pad = size === "sm" ? "px-6 py-3 text-sm" : "px-8 py-4 text-base";
  const primary   = light ? "border-white text-white hover:bg-white hover:text-[#0a1f5c]"           : "border-[#0a1f5c] text-[#0a1f5c] hover:bg-[#0a1f5c] hover:text-white";
  const secondary = light ? "border-white/25 text-white/50 hover:border-white/60 hover:text-white" : "border-black/18 text-black/45 hover:border-[#0a1f5c]/45 hover:text-[#0a1f5c]";
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={FLUTTERWAVE_LINK} target="_blank" rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 font-semibold border transition-all duration-300 ${pad} ${primary}`}>
        <CreditCard size={15} strokeWidth={2} />
        Buy Directly — {SALE_PRICE}
        <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
      </a>
      <a href={SELAR_LINK} target="_blank" rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 font-semibold border transition-all duration-300 ${pad} ${secondary}`}>
        <ShoppingBag size={15} strokeWidth={2} />
        Buy via Selar
        <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlueprintPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="relative z-10">

      {/* ══ DARK HERO ══════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[92vh] px-6 pt-32 pb-24 flex flex-col justify-center cyber-grid overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(77,121,255,0.09) 0%, transparent 70%)",
        }} />

        <div className="max-w-5xl mx-auto relative">

          {/* Easter badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 border px-4 py-2 mb-8"
            style={{ borderColor: "rgba(77,121,255,0.35)", background: "rgba(77,121,255,0.06)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--neon)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest mono" style={{ color: "var(--neon)" }}>
              Easter Bonus · Limited Time · {SALE_PRICE} only
            </span>
          </motion.div>

          {/* Partnership */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--muted)" }}
          >
            American Automations Agency{" "}
            <span style={{ color: "var(--neon)", opacity: 0.5 }}>×</span>{" "}
            Shaddies Space
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
            style={{ color: "var(--text)" }}
          >
            Stop learning more skills.<br />
            <span style={{ color: "var(--neon)" }}>Start earning through automations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }}
            className="text-xl max-w-2xl mb-6 leading-relaxed" style={{ color: "var(--muted)" }}
          >
            The complete blueprint for building income-generating automation systems —
            including how and where to find clients, and 100 premium done-for-you
            tools ready to deploy today.
          </motion.p>

          {/* Slashed price */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-baseline gap-4 mb-10"
          >
            <span className="text-2xl font-medium line-through" style={{ color: "rgba(232,234,240,0.22)" }}>
              {ORIGINAL_PRICE}
            </span>
            <span className="text-5xl font-bold" style={{ color: "var(--text)" }}>{SALE_PRICE}</span>
            <span className="text-xs font-bold px-2 py-1 border mono tracking-widest"
              style={{ color: "var(--neon)", borderColor: "rgba(77,121,255,0.4)", background: "rgba(77,121,255,0.08)" }}>
              90% OFF
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
            <DualCTA light />
            <p className="text-xs mt-4" style={{ color: "rgba(232,234,240,0.2)" }}>
              Instant digital download · Secure payment · No subscriptions
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 max-w-sm"
            style={{ borderTop: "1px solid rgba(77,121,255,0.14)" }}
          >
            {[
              { value: "100", label: "DFY Tools" },
              { value: "6",   label: "Client Channels" },
              { value: "90%", label: "Price Reduction" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-semibold" style={{ color: "var(--neon)" }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══ LIGHT — What's inside ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Everything inside the blueprint.</h2>
          <p className="text-black/50 max-w-lg mb-16 leading-relaxed">
            This isn't a generic course. It's a practical, actionable system built for people who want to earn — not just learn.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="border border-black/8 bg-white p-6 hover:border-[#0a1f5c]/25 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <Icon size={18} className="text-[#0a1f5c] mb-4 group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                  <p className="font-semibold mb-2 text-sm">{title}</p>
                  <p className="text-xs text-black/45 leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ LIGHT — 100 DFY Tools ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">100 premium done-for-you tools.</h2>
          <p className="text-black/55 max-w-lg mb-12 leading-relaxed">
            Pre-built, tested, importable. Deploy them as-is or adapt for any client. Each tool solves a real, recurring business problem.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {TOOLS_CATEGORIES.map(({ category, Icon }, i) => (
              <button key={category} onClick={() => setActiveCategory(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all duration-200 ${
                  activeCategory === i
                    ? "bg-[#0a1f5c] text-white border-[#0a1f5c]"
                    : "border-black/15 text-black/50 hover:border-[#0a1f5c]/35 hover:text-[#0a1f5c]"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} />{category}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={activeCategory}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 gap-x-12"
            >
              {TOOLS_CATEGORIES[activeCategory].tools.map((tool, i) => (
                <li key={i} className="flex items-start gap-3 py-3.5 border-b border-black/6 text-sm text-black/60 hover:text-black/80 hover:border-[#0a1f5c]/18 transition-colors duration-150 group">
                  <CheckCircle size={14} className="text-[#0a1f5c] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-150" strokeWidth={1.5} />
                  {tool}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <div className="mt-14 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-semibold">All 100 tools included</p>
              <p className="text-sm text-black/40 mt-1">Lead Gen · Client Mgmt · Finance · Social · Productivity</p>
            </div>
            <DualCTA size="sm" />
          </div>
        </div>
      </motion.section>

      {/* ══ DARK — How to find clients ═════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="relative px-6 py-28 overflow-hidden"
        style={{ background: "var(--bg2)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 55% 60% at 85% 50%, rgba(77,121,255,0.07) 0%, transparent 70%)",
        }} />
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            How and where to find clients.
          </h2>
          <p className="max-w-lg mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
            The skill alone doesn't pay. Knowing how to sell it does.
            The blueprint walks you through 6 proven acquisition channels — scripts included.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {CLIENT_SOURCES.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="group">
                  <Icon size={20} className="mb-4 group-hover:scale-110 transition-all duration-200"
                    style={{ color: "rgba(77,121,255,0.45)" }} strokeWidth={1.5} />
                  <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ LIGHT — Testimonials ═══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Real results from real people.</h2>
          <p className="text-black/50 max-w-lg mb-14 leading-relaxed">
            These are the outcomes people are achieving by applying this blueprint.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.07}>
                <div className="border border-black/10 bg-white p-8 hover:border-[#0a1f5c]/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-[#0a1f5c] fill-[#0a1f5c]" />)}
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#0a1f5c] text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
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

      {/* ══ LIGHT — How it works ═══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">How it works.</h2>
          <p className="text-black/50 max-w-lg mb-16 leading-relaxed">
            From payment to your first automation client — this is the path.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", Icon: CreditCard,  title: "Pay once",               desc: "Choose your checkout — Selar or direct via Flutterwave. One payment, no recurring fees." },
              { step: "02", Icon: Download,    title: "Instant access",          desc: "You receive a download link immediately. Blueprint + all 100 tools delivered to you." },
              { step: "03", Icon: Cpu,         title: "Build your first system", desc: "Follow the blueprint to deploy your first workflow. Most people do this within 48 hours." },
              { step: "04", Icon: DollarSign,  title: "Land your first client",  desc: "Use the client acquisition playbook to find, pitch, and close your first paying client." },
            ].map(({ step, Icon, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <span className="text-[10px] font-bold tracking-widest text-[#0a1f5c]/20 mb-4 block mono">{step}</span>
                <Icon size={18} className="text-[#0a1f5c] mb-4" strokeWidth={1.5} />
                <p className="font-semibold mb-2 text-sm">{title}</p>
                <p className="text-xs text-black/45 leading-relaxed">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ DARK — Pricing card ════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="relative px-6 py-28 overflow-hidden cyber-grid"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            One price. Everything included.
          </h2>
          <p className="max-w-lg mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
            This Easter window is the only time this will be at {SALE_PRICE}. After this, it returns to {ORIGINAL_PRICE}.
          </p>
          <FadeIn>
            <div className="p-10 border-pulse" style={{
              background: "rgba(77,121,255,0.04)",
              border: "1px solid rgba(77,121,255,0.3)",
            }}>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-medium line-through" style={{ color: "rgba(232,234,240,0.2)" }}>
                  {ORIGINAL_PRICE}
                </span>
                <span className="text-5xl font-bold" style={{ color: "var(--neon)" }}>{SALE_PRICE}</span>
              </div>
              <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>
                One-time payment · Instant digital delivery · Easter limited offer
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Complete Automation Blueprint (PDF)",
                  "100 Premium Done-For-You Automation Tools",
                  "Client Acquisition Playbook & Scripts",
                  "Income Packaging & Pricing Guide",
                  "Proposal Templates & Onboarding Docs",
                  "AI-Powered Workflow Integration Guide",
                  "Lifetime access — no expiry",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                    <CheckCircle size={14} style={{ color: "var(--neon)", flexShrink: 0 }} strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <DualCTA light />
              <p className="text-xs mt-6" style={{ color: "rgba(232,234,240,0.2)" }}>
                Powered by{" "}
                <strong style={{ color: "rgba(232,234,240,0.4)" }}>AltekFlo</strong>
                {" "}×{" "}
                <strong style={{ color: "rgba(232,234,240,0.4)" }}>World Automations Society</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </motion.section>

      {/* ══ LIGHT — FAQ ════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="px-6 py-28 bg-[#f8f7f4]"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10">Frequently asked questions</h2>
          {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </motion.section>

      {/* ══ DARK — Final CTA ══════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="relative px-6 py-28 overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 55% at 50% 110%, rgba(77,121,255,0.11) 0%, transparent 60%)",
        }} />
        <div className="max-w-5xl mx-auto relative">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6 mono"
            style={{ color: "rgba(232,234,240,0.22)" }}>
            Easter Bonus · Limited Period Only
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight" style={{ color: "var(--text)" }}>
            Stop learning more skills.<br />
            <span style={{ color: "rgba(232,234,240,0.28)" }}>Start earning through automations.</span>
          </h2>
          <p className="max-w-md mb-10 leading-relaxed" style={{ color: "var(--muted)" }}>
            The complete blueprint. 100 done-for-you tools. Client acquisition playbook.
            Everything you need to build income-generating automations — at {SALE_PRICE} for Easter.
          </p>
          <DualCTA light />
          <p className="text-xs mt-5" style={{ color: "rgba(232,234,240,0.16)" }}>
            Instant delivery · One-time {SALE_PRICE} · Powered by AltekFlo × World Automations Society
          </p>

          {/* Partnership */}
          <div className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{ borderTop: "1px solid rgba(77,121,255,0.1)" }}>
            <span className="text-xs uppercase tracking-widest mono" style={{ color: "rgba(232,234,240,0.18)" }}>
              A partnership between
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold" style={{ color: "rgba(232,234,240,0.38)" }}>
                American Automations Agency
              </span>
              <span style={{ color: "rgba(77,121,255,0.35)" }}>×</span>
              <span className="text-sm font-semibold" style={{ color: "rgba(232,234,240,0.38)" }}>
                Shaddies Space
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
