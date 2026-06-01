import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { services } from "../data/site.js";
import { WebMockup, SiteMockup, PhoneMockup } from "./ServiceMockups.jsx";

const mockups = {
  sistemas: WebMockup,
  sites: SiteMockup,
  apps: PhoneMockup,
};

const tabLabels = {
  sistemas: "Sistema Web",
  sites: "Site",
  apps: "App Mobile",
};

export default function ServicesSection() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active);
  const Mockup = mockups[active];

  return (
    <section id="servicos" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que criamos"
          title="Veja, na prática, o que construímos para você"
          description="Clique e explore cada tipo de solução — do app no seu celular ao sistema completo no navegador."
        />

        {/* abas */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {services.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-transparent bg-white text-ink shadow-soft"
                    : "border-line bg-surface/40 text-mist hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon name={s.icon} size={16} />
                {tabLabels[s.id]}
              </button>
            );
          })}
        </div>

        {/* preview */}
        <div className="mt-10 grid items-center gap-10 rounded-3xl border border-line bg-surface/30 p-6 sm:p-10 lg:grid-cols-2">
          {/* descrição */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-text`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
                  <Icon name={current.icon} size={22} />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mist">{current.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {current.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-mist"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* dispositivo */}
          <div className="order-1 flex min-h-[300px] items-center justify-center lg:order-2 lg:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-mock`}
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Mockup />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
