import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import TrustStrip from "./components/TrustStrip.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import BentoSection from "./components/BentoSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

export default function App() {
  return (
    <>
      <a
        href="#servicos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <BentoSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
