import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const photos = {
  close: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1100&q=88",
  work: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=88",
};

export default function LearnPage() {
  return <>
    <Navbar />
    <main className="page-shell learn-page">
      <section className="learn-intro px-5 sm:px-6 pt-16 md:pt-24 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_.9fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-5">THE LEARNING SPACE</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.02] tracking-[-.045em] mb-6" style={{color:"var(--text)"}}>
              Understand it.<br/><span style={{color:"var(--neon)"}}>Then put it to work.</span>
            </h1>
            <p className="text-base md:text-lg max-w-lg leading-relaxed mb-8" style={{color:"var(--muted)"}}>
              Clear, practical lessons for people who want to understand AI and automation — without needing a technical background.
            </p>
            <Link href="/automatex" className="btn btn-primary">Explore the first class <span aria-hidden="true" className="ml-2">↗</span></Link>
          </div>
          <div className="learn-editorial-image">
            <img src={photos.close} alt="An intimate editorial portrait" />
            <span className="learn-image-caption">A good place to begin is with a better question.</span>
          </div>
        </div>
      </section>

      <section className="learn-method px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="learn-method-heading">
            <p className="eyebrow mb-4">HOW THE CLASSES WORK</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{color:"var(--text)"}}>Learn by understanding, not memorising.</h2>
          </div>
          <div className="learn-method-grid">
            <article><span className="learn-method-number">01</span><h3>Get the idea</h3><p>Plain explanations, grounded in examples you recognise.</p></article>
            <article><span className="learn-method-number">02</span><h3>See it in use</h3><p>Follow how the idea works in a real situation.</p></article>
            <article><span className="learn-method-number">03</span><h3>Try it yourself</h3><p>Short questions help you check what you have understood.</p></article>
          </div>
        </div>
      </section>

      <section className="learn-course px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[.92fr_1.08fr] gap-10 md:gap-16 items-center">
          <div className="learn-course-image"><img src={photos.work} alt="A small team working through an idea together" /></div>
          <div>
            <p className="eyebrow mb-4">START HERE · AUTOMATE X</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5" style={{color:"var(--text)"}}>AI and automation, explained.</h2>
            <p className="leading-relaxed max-w-xl mb-7" style={{color:"var(--muted)"}}>An introductory class that makes the fundamentals clear, shows where the two meet and helps you recognise useful ways to apply them.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-8" style={{color:"var(--muted)"}}>
              <span>Beginner friendly</span><span>Practical examples</span><span>Free to start</span>
            </div>
            <Link href="/automatex" className="btn btn-primary">Start the introduction <span aria-hidden="true" className="ml-2">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
