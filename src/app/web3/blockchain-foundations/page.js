"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "blockchain-foundations",
  title: "Blockchain Foundations",
  subtitle: "The architecture beneath the hype.",
  icon: "🧱",
  color: "#f9ca24",
  border: "rgba(249,202,36,0.35)",
  level: "Beginner",
  duration: "5 weeks",
  price: "₦240,000",
  usd: "≈ $150",
  tagline: "Start here. Understand what blockchain actually is before you build anything on top of it.",
  modules: [
    "Cryptographic primitives — hashing, signatures, keys",
    "How distributed ledgers work",
    "Consensus mechanisms — PoW, PoS, DPoS and beyond",
    "UTXO vs account-based models",
    "Bitcoin and Ethereum architecture compared",
    "Layer 2 solutions and scaling",
  ],
  outcomes: [
    "Explain blockchain technology accurately to anyone",
    "Understand why different chains make different tradeoffs",
    "Read and understand block explorer data",
    "Navigate wallet setup and transaction signing safely",
    "Prepare confidently for any advanced Web3 course",
  ],
  faqs: [
    { q: "Is this a beginner-friendly course?", a: "Yes. This is the recommended starting point for anyone entering Web3 with no prior background." },
    { q: "Does this course cover specific coins or tokens?", a: "We use Bitcoin and Ethereum as primary examples but this is not an investment course. We focus on technical architecture." },
    { q: "Can I go straight to a specialised course after this?", a: "Yes — Blockchain Foundations feeds into any of the five other Web3 tracks." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
