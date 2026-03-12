import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Hero from "@/components/Hero";
import AboutSection from "@/components/Aboutsection";
import Testimonials from "@/components/Testimonials";
import SignlSection from "@/components/Signlsection";
import BookSection from "@/components/BookSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <Hero />
      <AboutSection />
      <Testimonials />
      <SignlSection />
      <BookSection />
      <Footer />
    </>
  );
}
