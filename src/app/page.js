import HomeClient from "@/components/HomeClient";
import Bridge from "@/components/Bridge";
import BookSection from "@/components/BookSection";
import Testimonials from "@/components/Testimonials";
import AutomateX from "@/components/AutomateXSignup";
import Footer from "@/components/Footer";
import AutomateXSignup from "./automatex/page";

export default function Home() {
  return (
    <>
      <HomeClient />
      <Bridge />
      <BookSection />
      <Testimonials />
      <AutomateXSignup />
      <Footer />
    </>
  );
}