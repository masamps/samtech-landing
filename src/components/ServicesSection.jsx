import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { services } from "../data/site.js";

export default function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Soluções digitais sob medida"
          description="Do sistema interno ao aplicativo do seu cliente, desenvolvemos cada projeto com foco em qualidade, performance e resultado."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-card"
            >
              <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-ink shadow-glow">
                <Icon name={service.icon} size={22} />
              </span>

              <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {service.summary}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-mist"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
