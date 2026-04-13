"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Footer from "@/components/Footer";

const values = [
  { icon: "🎯", title: "Precision Over Volume", body: "We run smaller cohorts intentionally. Every student gets real attention, not a seat in a crowd." },
  { icon: "🌍", title: "Africa-Born, Globally Competitive", body: "Our programmes are designed to the same standard as top global institutions — built for students who intend to compete on the world stage." },
  { icon: "🔐", title: "Security First", body: "Every course we offer — even Web3 — has a security lens. We believe no builder should ship without understanding the threat landscape." },
  { icon: "📈", title: "Outcomes, Not Just Certificates", body: "We measure success by what happens after graduation — jobs, clients, audits, and deployments. Not completion rates." },
];

const team = [
  { initial: "S", name: "Dr. Amara Osei", role: "Head of Cybersecurity Curriculum", bio: "15 years in enterprise security. Former lead at a Big 4 advisory firm. Certified CISSP, CEH, and OSCP." },
  { initial: "K", name: "Kwame Asante", role: "Lead Web3 Instructor", bio: "Smart contract developer since 2018. Audited protocols with over $400M TVL. Contributor to multiple open-source DeFi projects." },
  { initial: "I", name: "Ifeoma Chukwu", role: "Student Success Director", bio: "Built Shaddies Space's cohort system from the ground up. Obsessed with making sure every student finishes with deployable work." },
  { initial: "R", name: "Remi Adeyemi", role: "Corporate Partnerships Lead", bio: "Connects graduates to hiring partners across fintech, banking, and Web3-native organisations in Nigeria and globally." },
];

const stats = [
  { val: "3", label: "Active Courses" },
  { val: "12+", label: "Countries Reached" },
  { val: "400+", label: "Graduates" },
  { val: "89%", label: "Employment Rate" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main style={{background:"var(--bg)",minHeight:"100vh"}}>

        {/* Hero */}
        <section className="px-6 pt-44 pb-20 cyber-grid relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{background:"radial-gradient(ellipse at 40% 50%, var(--neon2), transparent 65%)",filter:"blur(80px)"}} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{color:"var(--neon2)"}}>Who We Are</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Shaddies Space<br />
                <span style={{color:"var(--neon2)"}}>Corporation.</span>
              </h1>
              <p className="text-lg max-w-2xl leading-relaxed" style={{color:"var(--muted)"}}>
                We are a technology education corporation. Our mandate is simple: close the skills gap in cybersecurity and Web3 by producing graduates who are immediately deployable — not just certified.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16" style={{background:"var(--bg2)"}}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
                className="text-center">
                <p className="text-4xl font-bold mono mb-2" style={{color:"var(--neon)"}}>{s.val}</p>
                <p className="text-xs uppercase tracking-widest" style={{color:"var(--muted)"}}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{color:"var(--neon)"}}>Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Built for the era<br />
                <span style={{color:"var(--neon)"}}>after the firewall.</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{color:"var(--muted)"}}>
                The skills gap in cybersecurity is not a talent problem. It is a training problem. Most programmes produce people who can pass exams. We produce people who can do the work.
              </p>
              <p className="text-base leading-relaxed" style={{color:"var(--muted)"}}>
                Shaddies Space was founded to be different — smaller cohorts, practitioner-led instruction, and a relentless focus on real outcomes. Every module ends with something you can show an employer or a client.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div key={v.title}
                  initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.1}}
                  className="p-5 rounded-xl"
                  style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="text-sm font-bold mb-2" style={{color:"var(--neon)"}}>{v.title}</h3>
                  <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-24" style={{background:"var(--bg2)"}}>
          <div className="max-w-6xl mx-auto">
            <p className="mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--neon)"}}>Leadership</p>
            <h2 className="text-3xl font-bold mb-12">The team.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.name}
                  initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.1}}
                  className="p-6 rounded-xl"
                  style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mono mb-5"
                    style={{background:"rgba(0,255,180,0.1)",color:"var(--neon)",border:"1px solid rgba(0,255,180,0.3)"}}>
                    {member.initial}
                  </div>
                  <h3 className="font-bold mb-1" style={{color:"var(--text)"}}>{member.name}</h3>
                  <p className="mono text-xs mb-3" style={{color:"var(--neon)"}}>{member.role}</p>
                  <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center cyber-grid relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{background:"radial-gradient(circle at 50% 50%, var(--neon), transparent 65%)"}} />
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to join us?</h2>
            <p className="mb-10" style={{color:"var(--muted)"}}>
              Orientation for our Cybersecurity Fundamentals course starts April 3rd, 2026. Seats are limited.
            </p>
            <a href="/cybersecurity#pricing"
              className="inline-block px-12 py-5 font-bold text-lg transition-all duration-300 neon-glow"
              style={{background:"var(--neon)",color:"#050810"}}>
              View Courses →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
