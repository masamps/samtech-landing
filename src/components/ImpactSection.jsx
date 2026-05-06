import { motion } from "framer-motion";
import { impactMetrics } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import ImpactCounter from "./ImpactCounter";
import SectionHeading from "./SectionHeading";

export default function ImpactSection() {
  return (
    <section id="impacto" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <div className="glass-panel overflow-hidden p-4 sm:p-8 md:p-10">
          <SectionHeading
            eyebrow="Impacto"
            title="Valor percebido nasce da soma entre estratégia, experiência e execução."
            description="Indicadores conceituais que resumem a forma como a Samtech pensa, estrutura e entrega cada projeto."
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {impactMetrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                {...scaleIn(index * 0.08)}
                className="motion-card rounded-lg border border-white/10 bg-slate-950/45 p-6"
              >
                <div className="mb-6 text-4xl font-semibold leading-none text-white sm:text-5xl md:text-6xl">
                  <ImpactCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{metric.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{metric.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
