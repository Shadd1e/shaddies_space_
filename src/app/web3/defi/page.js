"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "defi",
  title: "DeFi & Decentralised Finance",
  subtitle: "How money moves without banks.",
  icon: "⛓",
  color: "var(--neon)",
  border: "rgba(0,255,180,0.35)",
  level: "Intermediate",
  duration: "8 weeks",
  price: "₦560,000",
  usd: "≈ $350",
  tagline: "Understand the protocols rebuilding global finance — and how to navigate them safely.",
  modules: [
    "What is DeFi? History, primitives and market structure",
    "Liquidity pools & Automated Market Makers (AMMs)",
    "Lending protocols — Aave, Compound and beyond",
    "Yield farming, staking and risk management",
    "Stablecoins — algorithmic vs collateralised",
    "DEX vs CEX: architecture and security tradeoffs",
    "Flash loans — mechanics and attack vectors",
    "DeFi security auditing fundamentals",
  ],
  outcomes: [
    "Navigate DeFi protocols confidently",
    "Identify and assess protocol risks",
    "Understand yield strategies and their tradeoffs",
    "Read and interpret DeFi smart contract logic",
    "Contribute to DeFi protocol audits",
  ],
  faqs: [
    { q: "Do I need prior crypto knowledge?", a: "Basic familiarity with how blockchain works is recommended. The Blockchain Foundations course is an ideal prerequisite." },
    { q: "Is this a trading course?", a: "No. This is a technical and analytical course. We do not teach trading strategies or provide financial advice." },
    { q: "Will I learn to audit DeFi protocols?", a: "Yes — Module 8 is dedicated to DeFi security auditing fundamentals. For advanced auditing, see the Web3 Security course." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
