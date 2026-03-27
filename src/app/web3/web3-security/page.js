"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "web3-security",
  title: "Web3 Security & Auditing",
  subtitle: "Find the bugs before the hackers do.",
  icon: "🔒",
  color: "#ff4c6a",
  border: "rgba(255,76,106,0.35)",
  level: "Advanced",
  duration: "12 weeks",
  price: "₦960,000",
  usd: "≈ $600",
  tagline: "The most in-demand skill in Web3. Learn to audit smart contracts and protect protocols.",
  modules: [
    "Security mindset for Web3 environments",
    "Common vulnerability classes — reentrancy, integer overflow, access control",
    "Flash loan attacks — anatomy and prevention",
    "Oracle manipulation — mechanics and mitigations",
    "Cross-chain bridge vulnerabilities",
    "Formal verification fundamentals",
    "Manual auditing methodology",
    "Automated tools — Slither, Mythril, Echidna",
    "Reading and writing audit reports",
    "Bug bounty platforms — Immunefi, Code4rena",
    "Case studies: major exploits dissected",
    "Capstone: live audit of a test protocol",
  ],
  outcomes: [
    "Conduct smart contract security audits",
    "Write professional audit reports",
    "Participate in competitive audit contests",
    "Submit valid bug bounty reports",
    "Protect protocols from known attack vectors",
  ],
  faqs: [
    { q: "Is this the hardest Web3 course here?", a: "Yes. This is designed for people who are already comfortable with Solidity and want to specialise in security." },
    { q: "Can I earn from this?", a: "Bug bounties on platforms like Immunefi pay hundreds of thousands of dollars for critical findings. This course gets you audit-ready." },
    { q: "Should I take Smart Contracts first?", a: "Yes — strong Solidity knowledge is a firm prerequisite for this course." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
