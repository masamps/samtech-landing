import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import StatsSection from "./components/StatsSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import DifferentialsSection from "./components/DifferentialsSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import FinalCtaSection from "./components/FinalCtaSection.jsx";
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
        <StatsSection />
        <ServicesSection />
        <DifferentialsSection />
        <ProcessSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
