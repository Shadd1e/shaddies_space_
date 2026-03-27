"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-20"
      style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}}
    >
      <div className="max-w-6xl mx-auto">
        <div className="asimovian text-sm mb-4 flicker" style={{color:"var(--neon)"}}>SHADDIES.SPACE</div>
        <p className="text-base mb-10" style={{color:"var(--muted)"}}>
          Securing the builders of tomorrow.
        </p>
        <div className="flex flex-wrap gap-8 mb-12 text-sm" style={{color:"var(--muted)"}}>
          <Link href="/cybersecurity" className="hover:text-white transition">Cybersecurity</Link>
          <Link href="/web3" className="hover:text-white transition">Web3</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/cybersecurity#pricing" className="hover:text-white transition">Pricing</Link>
        </div>
        <div className="flex gap-6 mb-12">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/socials/facebook.png" className="h-5 w-5 object-contain opacity-50 hover:opacity-100 transition" alt="Facebook" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src="/socials/twitter.png" className="h-5 w-5 object-contain opacity-50 hover:opacity-100 transition" alt="Twitter" />
          </a>
        </div>
        <p className="text-xs mono" style={{color:"var(--muted)"}}>
          © 2026 Shaddies.Space Corporation. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
