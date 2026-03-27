"use client";
import Web3CoursePage from "@/components/Web3CoursePage";

const data = {
  slug: "smart-contracts",
  title: "Smart Contract Development",
  subtitle: "Code that executes without permission.",
  icon: "📜",
  color: "var(--neon2)",
  border: "rgba(0,200,255,0.35)",
  level: "Intermediate–Advanced",
  duration: "10 weeks",
  price: "₦720,000",
  usd: "≈ $450",
  tagline: "Build, deploy and secure smart contracts on Ethereum and EVM-compatible chains.",
  modules: [
    "Solidity fundamentals — syntax, data types, functions",
    "Smart contract architecture & design patterns",
    "ERC-20, ERC-721 and ERC-1155 token standards",
    "Testing with Hardhat and Foundry",
    "Deploying to testnets and mainnet",
    "Contract upgradeability — proxies and patterns",
    "Gas optimisation techniques",
    "Security vulnerabilities in smart contracts",
    "Writing audit-ready code",
    "Integrating contracts with frontend (ethers.js)",
  ],
  outcomes: [
    "Write production-grade Solidity",
    "Deploy contracts to Ethereum and EVM chains",
    "Test contracts thoroughly before deployment",
    "Identify and fix common smart contract vulnerabilities",
    "Build token contracts from scratch",
  ],
  faqs: [
    { q: "What programming background do I need?", a: "Comfort with at least one programming language is recommended. JavaScript or Python background transfers well." },
    { q: "Which tools will we use?", a: "Hardhat, Foundry, Remix, ethers.js, OpenZeppelin libraries, and Alchemy for node access." },
    { q: "Will I deploy to mainnet?", a: "You will deploy to testnets throughout the course. Mainnet deployment is covered conceptually with cost and risk considerations." },
  ],
};

export default function Page() { return <Web3CoursePage {...data} />; }
