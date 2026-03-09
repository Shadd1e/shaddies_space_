import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import Hero from "@/components/Hero";
import SignlSection from "@/components/SignlSection";
import Bridge from "@/components/Bridge";
import BookSection from "@/components/BookSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import AutomateX from "@/components/AutomateX";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <Hero />
      <SignlSection />
      <Bridge />
      <BookSection />
      <AboutSection />
      <Testimonials />
      <AutomateX />
      <Footer />
    </>
  );
}