import { useEffect, useMemo, useState } from "react";
import { MotionConfig, useScroll, useSpring } from "framer-motion";
import BackgroundDecor from "./components/BackgroundDecor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AuthoritySection from "./components/AuthoritySection";
import ServicesSection from "./components/ServicesSection";
import DifferentialsSection from "./components/DifferentialsSection";
import TrustSection from "./components/TrustSection";
import ProcessSection from "./components/ProcessSection";
import ImpactSection from "./components/ImpactSection";
import PortfolioSection from "./components/PortfolioSection";
import FinalCTASection from "./components/FinalCTASection";
import FloatingCTA from "./components/FloatingCTA";
import Footer from "./components/Footer";
import { navigation } from "./data/siteContent";
import { scrollToHash } from "./lib/scrollToHash";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.18,
  });

  const sectionIds = useMemo(
    () => ["hero", "autoridade", ...navigation.map((item) => item.href.replace("#", "")), "impacto"],
    [],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => scrollToHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(window.location.hash));
      });
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const visibleSections = new Map();
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const mostVisible = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];

        if (mostVisible) {
          setActiveSection(mostVisible[0]);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-22% 0px -30% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell relative overflow-hidden">
        <BackgroundDecor />
        <Navbar
          navigation={navigation}
          activeSection={activeSection}
          isScrolled={isScrolled}
          progressScale={progressScale}
        />

        <main className="relative z-10">
          <HeroSection />
          <AuthoritySection />
          <ServicesSection />
          <DifferentialsSection />
          <TrustSection />
          <ProcessSection />
          <ImpactSection />
          <PortfolioSection />
          <FinalCTASection />
        </main>

        <Footer />
        <FloatingCTA />
      </div>
    </MotionConfig>
  );
}
