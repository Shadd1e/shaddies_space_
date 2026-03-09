import HomeClient from "@/components/HomeClient";
import Bridge from "@/components/Bridge";
import BookSection from "@/components/BookSection";
import Testimonials from "@/components/Testimonials";
import AutomateX from "@/components/AutomateX";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HomeClient />
      <Bridge />
      <BookSection />
      <Testimonials />
      <AutomateX />
      <Footer />
    </>
  );
}