import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutomateX from "@/components/AutomateX";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SolutionsSection from "@/components/SolutionsSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AutomateX />
      <ProjectsSection />
      <SolutionsSection />
      <AboutSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
}
