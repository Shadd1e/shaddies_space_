import Navbar from "@/components/Navbar";
import HomeClient from "@/components/HomeClient";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeClient />
      </main>
      <Footer />
    </>
  );
}
