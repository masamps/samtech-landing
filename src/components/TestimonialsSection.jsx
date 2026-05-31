import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { testimonials } from "../data/site.js";

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem confia na Samps Projetos"
          description="A satisfação de quem trabalha com a gente é o nosso melhor portfólio."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-line bg-surface/60 p-7"
            >
              <Quote size={28} className="text-brand-400/60" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-mist">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-accent-400 text-accent-400"
                  />
                ))}
              </div>
              <figcaption className="mt-4 border-t border-line pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-mist">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
