 "use client";
import { motion } from "framer-motion";
import Link from "next/link";

const photos = {
  portrait: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1100&q=88",
  detail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88",
  working: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=88",
};

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .65, ease: "easeOut" }}
      className="home-hero relative overflow-hidden px-5 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_.92fr] gap-12 lg:gap-16 items-center">
        <div className="relative z-10">
          <p className="eyebrow mb-6">SHADDIES.SPACE · LEARN & BUILD</p>
          <h1 className="text-[2.7rem] sm:text-5xl lg:text-[4.5rem] font-semibold leading-[.99] tracking-[-.055em] mb-7" style={{ color: "var(--text)" }}>
            Make technology<br />
            <span style={{ color: "var(--neon)" }}>work for you.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl leading-relaxed mb-9" style={{ color: "var(--muted)" }}>
            Learn how it works. Or bring us an idea and let’s build it together.
          </p>
          <div className="hero-actions flex flex-row flex-wrap gap-3">
            <Link href="/learn" className="btn btn-primary whitespace-nowrap">I want to learn</Link>
            <Link href="/build-with-me" className="btn btn-secondary whitespace-nowrap">Build one for me</Link>
          </div>
        </div>

        <div className="hero-photo-stage relative min-h-[420px] sm:min-h-[520px]" aria-label="People learning and working with technology">
          <div className="hero-photo hero-photo-main">
            <img src={photos.portrait} alt="Close editorial portrait of a woman" />
          </div>
          <div className="hero-photo hero-photo-detail">
            <img src={photos.detail} alt="Expressive close-up portrait" />
          </div>
          <div className="hero-photo hero-photo-work">
            <img src={photos.working} alt="People working together" />
          </div>
          <div className="hero-photo-note">
            <span className="eyebrow">IDEAS INTO PRACTICE</span>
            <span>Learn something useful.<br />Make something real.</span>
          </div>
          <span className="hero-photo-index mono">01 / 03</span>
        </div>
      </div>
    </motion.section>
  );
}
