"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "I landed my first security analyst role three months after completing this course. The hands-on labs made all the difference — employers could see I had done real work.",
    name: "Adebayo Okonkwo",
    role: "Security Analyst, Lagos",
    initial: "A",
  },
  {
    text: "The DeFi Security module alone was worth double the fee. I caught a reentrancy bug in a client's smart contract the very next week and saved them a serious loss.",
    name: "Chidinma Eze",
    role: "Smart Contract Auditor, Abuja",
    initial: "C",
  },
  {
    text: "I came from a completely non-technical background. By module four I was running my own penetration tests. The pacing and instruction quality are genuinely exceptional.",
    name: "Emeka Okafor",
    role: "Freelance Pentester, Port Harcourt",
    initial: "E",
  },
  {
    text: "Our entire IT team went through the cybersecurity track. We overhauled our infrastructure policy within a month. The ROI was clear inside six weeks.",
    name: "Fatima Aliyu",
    role: "CTO, Kano-based Fintech",
    initial: "F",
  },
  {
    text: "The Web3 curriculum is the most honest I have seen. They don't hype it — they teach you how it actually works, including the risks. That is rare.",
    name: "Tunde Bakare",
    role: "Blockchain Developer, Ibadan",
    initial: "T",
  },
  {
    text: "I enrolled sceptical. I left with a portfolio, a network, and an offer. The community alone is worth the investment — people in this cohort are actually serious.",
    name: "Ngozi Obi",
    role: "Security Engineer, London",
    initial: "N",
  },
  {
    text: "The instructor coverage on network forensics is the best I have encountered anywhere online. And I have taken courses on every major platform. This is a different level.",
    name: "Kelechi Mba",
    role: "SOC Analyst, Dubai",
    initial: "K",
  },
];

function Card({ t }) {
  return (
    <div className="inline-flex flex-col gap-4 min-w-[340px] max-w-[340px] p-6 rounded-lg flex-shrink-0 whitespace-normal align-top"
      style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
      <div className="text-sm leading-relaxed" style={{color:"var(--muted)"}}>
        <span style={{color:"var(--neon)",fontWeight:700,fontSize:"1.4rem",lineHeight:0}}>"</span>
        {t.text}
        <span style={{color:"var(--neon)",fontWeight:700,fontSize:"1.4rem",lineHeight:0}}>"</span>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mono text-xs font-bold"
          style={{background:"rgba(0,255,180,0.12)",color:"var(--neon)",border:"1px solid rgba(0,255,180,0.3)"}}>
          {t.initial}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{color:"var(--text)"}}>{t.name}</p>
          <p className="text-xs" style={{color:"var(--muted)"}}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function ScrollRow({ items, direction = "left" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-6 whitespace-nowrap ${direction === "left" ? "animate-scroll" : "animate-scroll-reverse"}`}>
        {doubled.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(3);

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="py-28 overflow-hidden space-y-6"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <p className="mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--neon)"}}>Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold">What our students say.</h2>
      </div>
      <ScrollRow items={row1} direction="left" />
      <ScrollRow items={row2} direction="right" />

      <div className="mt-16 px-6">
        <p className="text-center text-xs uppercase tracking-widest mb-10" style={{color:"var(--muted)"}}>Brands we've worked with</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40">
          {["altekflo.png","chase.png","bennies.png","logo4.png","logo5.png","logo6.png","logo7.png","logo8.png","logo9.png"].map((logo, i) => (
            <img key={i} src={`/logos/${logo}`} className="h-8 object-contain" style={{filter:"grayscale(1) brightness(2)"}} alt="Brand" />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
