"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

// Orientation date: 7 days from March 27 2026
const ORIENTATION = new Date("2026-04-03T09:00:00");

function Countdown() {
  const [time, setTime] = useState({ d:0,h:0,m:0,s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = ORIENTATION - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const blocks = [
    { val: time.d, label: "Days" },
    { val: time.h, label: "Hours" },
    { val: time.m, label: "Mins" },
    { val: time.s, label: "Secs" },
  ];
  return (
    <div className="flex gap-4 flex-wrap justify-center md:justify-start">
      {blocks.map(b => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="digit-block w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg neon-glow mono">
            {String(b.val).padStart(2,"0")}
          </div>
          <span className="text-xs uppercase tracking-widest mt-2" style={{color:"var(--muted)"}}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

const TIERS = [
  {
    name: "Foundation",
    price: "₦100,000",
    usd: "≈ $63",
    tag: "Starter",
    color: "var(--neon2)",
    borderColor: "rgba(0,200,255,0.25)",
    features: [
      "Access to 4 core modules",
      "Self-paced video content",
      "Course completion certificate",
      "Basic cybersecurity terminology guide",
      "Access to student community forum",
      "1 practice quiz per module",
      "Email support (72hr response)",
      "Module progress tracking",
    ],
    cta: "Enroll — Foundation",
    href: "#payment-placeholder",
    note: "Best for individuals exploring cybersecurity for the first time.",
    hero: false,
  },
  {
    name: "Professional",
    price: "₦500,000",
    usd: "≈ $313",
    tag: "Most Popular",
    color: "var(--neon)",
    borderColor: "rgba(0,255,180,0.5)",
    features: [
      "All 12 full course modules",
      "Live weekly instructor sessions",
      "Hands-on virtual lab environment",
      "Penetration testing practicals",
      "Network forensics deep-dives",
      "OSINT & threat intelligence labs",
      "CTF (Capture the Flag) challenges",
      "Resume & portfolio review session",
      "LinkedIn profile optimisation",
      "Mock technical interviews (x2)",
      "Dedicated Slack channel access",
      "Priority email support (12hr)",
      "Official Shaddies Space certificate",
      "Lifetime access to course updates",
      "Access to alumni job board",
      "Guest speaker sessions — active practitioners",
      "Both physical & online orientation",
      "1-on-1 mentorship session (30 mins)",
    ],
    cta: "Enroll — Professional",
    href: "#payment-placeholder",
    note: "The complete package. Built for career changers and serious learners.",
    hero: true,
  },
  {
    name: "Enterprise",
    price: "₦2,000,000",
    usd: "≈ $1,250",
    tag: "Maximum Access",
    color: "var(--neon3)",
    borderColor: "rgba(123,92,255,0.4)",
    features: [
      "Everything in Professional",
      "Team seat (up to 5 members)",
      "Dedicated success manager",
      "Custom onboarding session",
      "Monthly 1-on-1 mentorship (x6 months)",
      "Private Slack channel for your team",
      "Custom cybersecurity audit of your business",
      "Incident response simulation exercise",
      "Cloud security (AWS/Azure) module",
      "Compliance & regulatory frameworks (GDPR, ISO 27001)",
      "SOC setup consultation",
      "Security policy documentation templates",
      "Executive cybersecurity briefing session",
      "Priority direct line to instructors",
      "Attendance at Shaddies Space annual summit",
      "Early access to all new courses",
      "Shaddies Space partner directory listing",
      "Verified corporate badge on alumni network",
    ],
    cta: "Enroll — Enterprise",
    href: "#payment-placeholder",
    note: "For companies, teams, and professionals who need the full ecosystem.",
    hero: false,
  },
];

const MODULES = [
  "Cybersecurity Foundations & Threat Landscape",
  "Networking Fundamentals for Security Professionals",
  "Operating Systems & Command Line Mastery",
  "Ethical Hacking & Penetration Testing",
  "Network Monitoring & Traffic Analysis",
  "Web Application Security (OWASP Top 10)",
  "Cryptography & Secure Communications",
  "Digital Forensics & Incident Response",
  "OSINT & Threat Intelligence",
  "Cloud Security Architecture",
  "Compliance, Risk & Governance",
  "Capstone: Live Red vs Blue Team Exercise",
];

const FAQS = [
  { q: "Do I need a technical background?", a: "No. The course is structured to take you from zero. Module 1 assumes nothing. By Module 4 you will be running tools used by working professionals." },
  { q: "What is the orientation format?", a: "Orientation runs both physically (Lagos) and online via Zoom on April 3rd, 2026 at 9:00 AM WAT. Both sessions cover the same content." },
  { q: "Is the certificate industry-recognised?", a: "Yes. The Shaddies Space certificate is recognised by our corporate partners. We also guide you on complementary industry certs like CompTIA Security+ and CEH." },
  { q: "Can my company pay for multiple seats?", a: "Yes. The Enterprise tier covers up to 5 team members. For larger teams, contact us directly for a custom arrangement." },
  { q: "What happens after I pay?", a: "You receive a confirmation email within 1 hour with onboarding steps and your community invite. Orientation details follow within 24 hours." },
  { q: "Is there a refund policy?", a: "Yes — full refund within 48 hours of purchase if you have not started any module. After orientation begins, no refunds apply." },
];

export default function CybersecurityPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main style={{background:"var(--bg)",minHeight:"100vh"}}>

        {/* Hero */}
        <section className="px-6 pt-44 pb-20 cyber-grid relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
            style={{background:"radial-gradient(circle, var(--neon), transparent 70%)",filter:"blur(80px)"}} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{color:"var(--neon)"}}>Now Enrolling</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Cybersecurity<br />
                <span style={{color:"var(--neon)"}}>Fundamentals</span>
              </h1>
              <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{color:"var(--muted)"}}>
                A 12-module, hands-on cybersecurity programme built for the real world. From networking basics to live red-team exercises — structured for career changers, IT professionals, and corporate teams alike.
              </p>
              <div className="mb-8">
                <p className="text-sm uppercase tracking-widest mb-4 font-semibold" style={{color:"var(--neon)"}}>
                  ⏱ Orientation begins in:
                </p>
                <Countdown />
              </div>
              <div className="flex flex-wrap gap-4 text-sm mt-6" style={{color:"var(--muted)"}}>
                <span className="flex items-center gap-2">🏛 Physical — Lagos</span>
                <span className="flex items-center gap-2">💻 Online — Zoom</span>
                <span className="flex items-center gap-2">📅 Starts: April 3, 2026</span>
                <span className="flex items-center gap-2">🕘 9:00 AM WAT</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modules */}
        <section className="px-6 py-20" style={{background:"var(--bg2)"}}>
          <div className="max-w-6xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--neon)"}}>Curriculum</p>
            <h2 className="text-3xl font-bold mb-10">12 Modules. Zero Fluff.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.map((m, i) => (
                <motion.div key={m}
                  initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.06}}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
                  <span className="mono text-xs font-bold mt-0.5 flex-shrink-0" style={{color:"var(--neon)"}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span className="text-sm leading-relaxed" style={{color:"var(--text)"}}>{m}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--neon)"}}>Pricing</p>
            <h2 className="text-3xl font-bold mb-4">Choose your tier.</h2>
            <p className="mb-14" style={{color:"var(--muted)"}}>All tiers include orientation access. Payment links go live at orientation.</p>
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {TIERS.map((tier, i) => (
                <motion.div key={tier.name}
                  initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.12}}
                  className={`rounded-xl p-8 flex flex-col relative ${tier.hero ? "tier-hero" : ""}`}
                  style={{background:"var(--surface)",border:`1px solid ${tier.borderColor}`}}>
                  {tier.hero && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold mono"
                      style={{background:"var(--neon)",color:"#050810"}}>
                      ★ MOST POPULAR
                    </div>
                  )}
                  <p className="mono text-xs uppercase tracking-widest mb-2" style={{color:tier.color}}>{tier.tag}</p>
                  <h3 className="text-2xl font-bold mb-1" style={{color:"var(--text)"}}>{tier.name}</h3>
                  <div className="mb-6">
                    <p className="text-4xl font-bold mono" style={{color:tier.color}}>{tier.price}</p>
                    <p className="mono text-xs mt-1 opacity-60" style={{color:tier.color}}>{tier.usd}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{color:"var(--muted)"}}>
                        <span className="flex-shrink-0 mt-0.5" style={{color:tier.color}}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs mb-6 italic" style={{color:"var(--muted)"}}>{tier.note}</p>
                  <a href={tier.href}
                    className="block text-center py-4 rounded-lg font-bold text-sm transition-all duration-300"
                    style={tier.hero
                      ? {background:"var(--neon)",color:"#050810"}
                      : {border:`1px solid ${tier.borderColor}`,color:tier.color}}>
                    {tier.cta}
                  </a>
                  <p className="text-center text-xs mt-3 mono" style={{color:"var(--muted)"}}>Payment link active at orientation</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20" style={{background:"var(--bg2)"}}>
          <div className="max-w-3xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--neon)"}}>FAQ</p>
            <h2 className="text-3xl font-bold mb-10">Common questions.</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-lg overflow-hidden"
                  style={{border:"1px solid var(--border)",background:"var(--surface)"}}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-sm">
                    <span style={{color:"var(--text)"}}>{faq.q}</span>
                    <span style={{color:"var(--neon)",fontSize:"1.2rem"}}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm leading-relaxed" style={{color:"var(--muted)"}}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center cyber-grid relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15"
            style={{background:"radial-gradient(circle at 50% 50%, var(--neon), transparent 65%)"}} />
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to begin?</h2>
            <p className="mb-10 text-lg" style={{color:"var(--muted)"}}>
              Orientation is in 7 days. Seats are limited. Every day you wait is a day behind.
            </p>
            <Link href="#pricing"
              className="inline-block px-12 py-5 font-bold text-lg transition-all duration-300 neon-glow"
              style={{background:"var(--neon)",color:"#050810"}}>
              View Pricing →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
