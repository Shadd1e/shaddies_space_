import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroPreview from "./course/IntroPreview";
import preview from "@/data/automatex-preview.json";

const portrait = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=88";

export default function AutomateXLanding() {
  return <>
    <Navbar />
    <main className="page-shell automatex-page">
      <section className="automatex-hero px-5 sm:px-6 pt-14 md:pt-20 pb-14">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_.82fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-5">AUTOMATE X · INTRODUCTORY CLASS</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.02] tracking-[-.05em] max-w-3xl" style={{color:"var(--text)"}}>
              AI and automation,<br/><span style={{color:"var(--neon)"}}>without the jargon.</span>
            </h1>
            <p className="text-base md:text-lg max-w-xl leading-relaxed mt-6" style={{color:"var(--muted)"}}>
              Start with the fundamentals. Understand what these tools do, how they work together and where they can make a real difference.
            </p>
            <div className="automatex-facts mt-8">
              <span>For beginners</span><span>No technical background needed</span><span>Free introduction</span>
            </div>
          </div>
          <div className="automatex-portrait">
            <img src={portrait} alt="Expressive close-up portrait in natural light" />
            <div className="automatex-portrait-label"><span className="eyebrow">YOUR FIRST CLASS</span><strong>Start with the why.<br/>Build from there.</strong></div>
          </div>
        </div>
      </section>

      <section className="automatex-class px-5 sm:px-6 py-14 md:py-20" id="first-class">
        <div className="max-w-6xl mx-auto">
          <div className="automatex-class-heading">
            <div><p className="eyebrow mb-4">THE INTRODUCTION</p><h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{color:"var(--text)"}}>First, understand the basics.</h2></div>
            <p style={{color:"var(--muted)"}}>Read through the short class below. No account or extra navigation is needed to begin.</p>
          </div>
          <IntroPreview preview={preview}/>
        </div>
      </section>

      <section className="automatex-next px-5 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div><p className="eyebrow mb-2">WHEN YOU'RE READY</p><h2 className="text-2xl font-semibold" style={{color:"var(--text)"}}>Keep learning at your own pace.</h2><p className="text-sm mt-2" style={{color:"var(--muted)"}}>Create an account when you want to save your progress and continue through the full course.</p></div>
          <Link href="/sign-in?next=%2Fautomatex%2Fcourse" className="btn btn-primary shrink-0">Save my progress <span aria-hidden="true" className="ml-2">↗</span></Link>
        </div>
      </section>
      <p className="max-w-6xl mx-auto px-5 sm:px-6 pb-12 text-xs" style={{color:"var(--muted)"}}>For learners aged 16 and over. No payment is required for the introductory course. <Link className="underline" href="/automatex/privacy">Privacy note</Link>.</p>
    </main>
    <Footer />
  </>;
}
