"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "daos",
  title: "DAOs & On-Chain Governance",
  subtitle: "Organisations without bosses.",
  icon: "🏛",
  color: "#ff9f43",
  border: "rgba(255,159,67,0.35)",
  level: "Intermediate",
  duration: "6 weeks",
  price: "₦448,000",
  usd: "≈ $280",
  tagline: "Learn how decentralised autonomous organisations work, how to contribute, and how to build one.",
  modules: [
    "What is a DAO? History and real examples",
    "Governance token mechanics",
    "Voting systems — on-chain and off-chain (Snapshot)",
    "Treasury management and multisigs",
    "Building a DAO with Aragon and Governor contracts",
    "Governance attack vectors and defences",
  ],
  outcomes: [
    "Understand how DAOs operate structurally",
    "Contribute meaningfully to existing DAOs",
    "Launch a basic DAO using standard tooling",
    "Identify governance risks and attack patterns",
    "Design sound token-weighted voting systems",
  ],
  faqs: [
    { q: "Do I need to know Solidity?", a: "No. This course is governance and operations focused. Some modules show contract code for illustration but you do not need to write it." },
    { q: "Are DAOs legally recognised?", a: "This varies by jurisdiction. We cover the current legal landscape including Wyoming DAO LLC and Marshall Islands structures." },
    { q: "Which DAOs will we study?", a: "We study MakerDAO, Uniswap, Compound, Nouns DAO, and others as live case studies." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
