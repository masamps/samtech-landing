import { motion } from "framer-motion";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { processSteps } from "../data/site.js";

export default function ProcessSection() {
  return (
    <section id="processo" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Um processo claro, do briefing à entrega"
          description="Você sempre sabe em que etapa o seu projeto está. Sem surpresas, com entregas frequentes e comunicação direta."
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              className="relative rounded-2xl border border-line bg-surface/40 p-6"
            >
              <span className="font-display text-4xl font-bold text-brand-500/40">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
