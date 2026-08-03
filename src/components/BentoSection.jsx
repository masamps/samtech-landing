import { motion } from "framer-motion";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { differentials } from "../data/site.js";

export default function BentoSection() {
  return (
    <section id="diferenciais" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Por que a Samps"
          title="O que você leva além do sistema"
          description="Contratar software envolve confiança. Estes são os compromissos que assumimos em todo projeto."
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
              className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-7 transition-colors duration-300 hover:border-white/20 hover:bg-surface/60"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="mt-5 text-base font-semibold leading-snug text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mist">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
