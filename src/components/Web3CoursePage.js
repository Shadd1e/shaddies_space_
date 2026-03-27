"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Web3CoursePage({ title, subtitle, icon, color, border, level, duration, price, usd, tagline, modules, outcomes, faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main style={{background:"var(--bg)",minHeight:"100vh"}}>

        {/* Hero */}
        <section className="px-6 pt-44 pb-20 cyber-grid relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{background:`radial-gradient(ellipse at 60% 40%, ${color}, transparent 65%)`,filter:"blur(80px)"}} />
          <div className="max-w-6xl mx-auto relative z-10">
            <Link href="/web3" className="mono text-xs uppercase tracking-widest mb-6 inline-block hover:opacity-70 transition" style={{color:"var(--muted)"}}>
              ← All Web3 Courses
            </Link>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <div className="text-5xl mb-6">{icon}</div>
              <p className="mono text-xs uppercase tracking-widest mb-3" style={{color}}>{level} · {duration}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight" style={{color:"var(--text)"}}>{title}</h1>
              <p className="text-xl font-semibold mb-6" style={{color}}>{subtitle}</p>
              <p className="text-lg max-w-xl leading-relaxed mb-10" style={{color:"var(--muted)"}}>{tagline}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <span className="text-4xl font-bold mono" style={{color}}>{price}</span>
                  {usd && <p className="mono text-xs mt-1 opacity-60" style={{color}}>{usd}</p>}
                </div>
                <a href="#payment-placeholder"
                  className="px-10 py-4 font-bold text-sm transition-all duration-300"
                  style={{background:color,color:"#050810"}}>
                  Enroll Now →
                </a>
                <p className="text-xs mono" style={{color:"var(--muted)"}}>Payment link coming at orientation</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modules */}
        <section className="px-6 py-20" style={{background:"var(--bg2)"}}>
          <div className="max-w-6xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color}}>Curriculum</p>
            <h2 className="text-3xl font-bold mb-10">What you'll cover.</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {modules.map((m, i) => (
                <motion.div key={m}
                  initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.07}}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{background:"var(--surface)",border:`1px solid rgba(255,255,255,0.05)`}}>
                  <span className="mono text-xs font-bold mt-0.5 flex-shrink-0" style={{color}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span className="text-sm leading-relaxed" style={{color:"var(--text)"}}>{m}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color}}>Outcomes</p>
            <h2 className="text-3xl font-bold mb-10">What you'll leave with.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outcomes.map((o, i) => (
                <motion.div key={o}
                  initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.08}}
                  className="p-5 rounded-lg flex items-start gap-3"
                  style={{background:"var(--surface)",border:`1px solid ${border}`}}>
                  <span style={{color,flexShrink:0}}>✓</span>
                  <span className="text-sm" style={{color:"var(--text)"}}>{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20" style={{background:"var(--bg2)"}}>
          <div className="max-w-3xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color}}>FAQ</p>
            <h2 className="text-3xl font-bold mb-10">Questions answered.</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg overflow-hidden"
                  style={{border:"1px solid var(--border)",background:"var(--surface)"}}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-sm">
                    <span style={{color:"var(--text)"}}>{faq.q}</span>
                    <span style={{color,fontSize:"1.2rem"}}>{openFaq === i ? "−" : "+"}</span>
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
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{background:`radial-gradient(circle at 50% 50%, ${color}, transparent 65%)`}} />
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to enroll?</h2>
            <p className="mb-8" style={{color:"var(--muted)"}}>Seats are limited per cohort. Reserve yours today.</p>
            <a href="#payment-placeholder"
              className="inline-block px-12 py-5 font-bold text-lg transition-all duration-300"
              style={{background:color,color:"#050810"}}>
              Enroll — {price} {usd ? `(${usd})` : ""} →
            </a>
            <p className="text-xs mt-4 mono" style={{color:"var(--muted)"}}>Payment link active at orientation · April 3, 2026</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
