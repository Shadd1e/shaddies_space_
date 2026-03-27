"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

const BRANCHES = [
  {
    slug: "defi",
    title: "DeFi & Decentralised Finance",
    icon: "⛓",
    color: "var(--neon)",
    border: "rgba(0,255,180,0.3)",
    summary: "Understand liquidity pools, AMMs, yield strategies, and how to audit DeFi protocols for vulnerabilities.",
    level: "Intermediate",
  },
  {
    slug: "smart-contracts",
    title: "Smart Contract Development",
    icon: "📜",
    color: "var(--neon2)",
    border: "rgba(0,200,255,0.3)",
    summary: "Write, deploy, and secure smart contracts in Solidity on Ethereum and EVM-compatible chains.",
    level: "Intermediate–Advanced",
  },
  {
    slug: "nfts",
    title: "NFTs & Digital Ownership",
    icon: "🖼",
    color: "var(--neon3)",
    border: "rgba(123,92,255,0.3)",
    summary: "From ERC-721 standards to marketplaces and royalty mechanics — the full NFT stack explained.",
    level: "Beginner–Intermediate",
  },
  {
    slug: "daos",
    title: "DAOs & On-Chain Governance",
    icon: "🏛",
    color: "#ff9f43",
    border: "rgba(255,159,67,0.3)",
    summary: "How decentralised autonomous organisations work, how to contribute to or build one, and governance attack vectors.",
    level: "Intermediate",
  },
  {
    slug: "web3-security",
    title: "Web3 Security & Auditing",
    icon: "🔒",
    color: "#ff4c6a",
    border: "rgba(255,76,106,0.3)",
    summary: "Reentrancy, flash loans, oracle manipulation, and how to audit protocols before they get exploited.",
    level: "Advanced",
  },
  {
    slug: "blockchain-foundations",
    title: "Blockchain Foundations",
    icon: "🧱",
    color: "#f9ca24",
    border: "rgba(249,202,36,0.3)",
    summary: "Cryptographic primitives, consensus mechanisms, UTXO vs account models, and the architecture beneath the hype.",
    level: "Beginner",
  },
];

export default function Web3Page() {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main style={{background:"var(--bg)",minHeight:"100vh"}}>
        {/* Hero */}
        <section className="px-6 pt-44 pb-20 cyber-grid relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{background:"radial-gradient(ellipse at 60% 40%, var(--neon3), transparent 60%)",filter:"blur(60px)"}} />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{color:"var(--neon3)"}}>Education Track</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Web3 Courses<br />
                <span style={{color:"var(--neon3)"}}>Six Branches.</span>
              </h1>
              <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{color:"var(--muted)"}}>
                Web3 is not one subject. It is an ecosystem. Each branch below is a dedicated course with its own curriculum, instructor track, and certification. Choose your entry point.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Branches Grid */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANCHES.map((b, i) => (
              <motion.div key={b.slug}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1}}
              >
                <Link href={`/web3/${b.slug}`}
                  className="flex flex-col h-full p-8 rounded-xl glow-hover block"
                  style={{background:"var(--surface)",border:`1px solid ${b.border}`,textDecoration:"none"}}>
                  <div className="text-4xl mb-5">{b.icon}</div>
                  <p className="mono text-xs uppercase tracking-widest mb-2" style={{color:b.color}}>
                    {b.level}
                  </p>
                  <h3 className="text-xl font-bold mb-4" style={{color:"var(--text)"}}>{b.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{color:"var(--muted)"}}>{b.summary}</p>
                  <span className="text-sm font-semibold" style={{color:b.color}}>
                    Explore course →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center" style={{background:"var(--bg2)"}}>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
            <p className="mb-8" style={{color:"var(--muted)"}}>Blockchain Foundations is the recommended entry point for those new to Web3.</p>
            <Link href="/web3/blockchain-foundations"
              className="inline-block px-10 py-4 font-bold transition-all duration-300"
              style={{background:"var(--neon3)",color:"white"}}>
              Start with the Basics →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
