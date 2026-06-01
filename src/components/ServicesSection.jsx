import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { services } from "../data/site.js";

export default function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que criamos"
          title="Três formas de levar o seu negócio adiante"
          description="Sistema interno, presença online ou app na mão do cliente — desenvolvemos cada projeto com o mesmo padrão de qualidade."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-surface/70"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
                <Icon name={service.icon} size={22} />
              </span>

              <h3 className="mt-5 flex items-center gap-1 text-xl font-bold text-white">
                {service.title}
                <ArrowUpRight
                  size={18}
                  className="text-mist opacity-0 transition-opacity group-hover:opacity-100"
                />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {service.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-line bg-ink/40 px-3 py-1 text-xs text-mist"
                  >
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
