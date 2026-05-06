import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioCases } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import PortfolioMockup from "./PortfolioMockup";
import SectionHeading from "./SectionHeading";

export default function PortfolioSection() {
  return (
    <section id="portfolio" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <SectionHeading
          eyebrow="Exemplos de soluções"
          title="Modelos de projeto para visualizar como a Samtech pode atuar."
          description="Estes exemplos mostram possibilidades de escopo. Cada entrega real é definida conforme o objetivo, orçamento e momento do cliente."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {portfolioCases.map((item, index) => (
            <motion.article
              key={item.title}
              {...scaleIn(index * 0.08)}
              className="motion-card group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/18 hover:bg-white/[0.06] md:backdrop-blur-xl"
            >
              <div className="relative overflow-hidden border-b border-white/[0.08] p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-white/[0.03] opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <PortfolioMockup type={item.type} />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="eyebrow">Modelo de projeto</span>
                  <ArrowUpRight className="h-5 w-5 text-slate-500 transition duration-300 group-hover:text-cyan-200" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
