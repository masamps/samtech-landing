import { motion } from "framer-motion";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { differentials } from "../data/site.js";

export default function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
      </div>

      <Container>
        <SectionHeading
          eyebrow="Por que a Samps"
          title="Qualidade que você sente em cada detalhe"
          description="Não basta entregar um sistema que funciona. Entregamos produtos sólidos, bonitos e feitos para durar."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {differentials.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-brand-400/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
