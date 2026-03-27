"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "nfts",
  title: "NFTs & Digital Ownership",
  subtitle: "What tokens actually are. And what they're not.",
  icon: "🖼",
  color: "var(--neon3)",
  border: "rgba(123,92,255,0.35)",
  level: "Beginner–Intermediate",
  duration: "6 weeks",
  price: "₦400,000",
  usd: "≈ $250",
  tagline: "Cut through the noise. Understand NFTs technically, commercially, and legally.",
  modules: [
    "What NFTs actually are — beyond the hype",
    "ERC-721 & ERC-1155 token standards",
    "Metadata, IPFS and decentralised storage",
    "Building and deploying an NFT collection",
    "Marketplaces — OpenSea, Blur, and beyond",
    "Royalty mechanics and on-chain enforcement",
  ],
  outcomes: [
    "Deploy your own NFT collection",
    "Understand metadata and storage correctly",
    "Evaluate NFT projects technically",
    "Navigate NFT marketplaces as a builder",
    "Understand royalty and licensing mechanics",
  ],
  faqs: [
    { q: "Is NFT still relevant in 2026?", a: "Digital ownership and tokenisation of real-world assets is growing. This course focuses on the enduring technical fundamentals, not market speculation." },
    { q: "Will I mint my own NFT?", a: "Yes — you will deploy and mint a collection on a testnet as part of the final module." },
    { q: "Is art or design experience required?", a: "No. The course is technical and business-focused. You do not need to be a designer." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
