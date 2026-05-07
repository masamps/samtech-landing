import { motion } from "framer-motion";
import { differentials } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function DifferentialsSection() {
  const featuredDifferentials = differentials.slice(0, 4);

  return (
    <section id="diferenciais" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que escolher a Samcore"
          description="A proposta é simples: unir visão estratégica, execução técnica e acabamento visual de alto nível em soluções que realmente sustentam crescimento."
          className="mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <Reveal delay={0.08}>
            <div className="glass-panel relative overflow-hidden p-8 lg:min-h-[35rem]">
              <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <span className="eyebrow">Foco em valor</span>
                  <p className="mt-5 text-2xl leading-10 text-white">
                    A Samcore combina racionalidade técnica com sensibilidade de design para que cada
                    entrega pareça tão consistente quanto funciona.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Clareza visual", "Arquitetura evolutiva", "Experiência premium", "Execução confiável"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredDifferentials.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  {...scaleIn(index * 0.07)}
                  className="motion-card group flex min-h-[15rem] flex-col rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/18 hover:bg-white/[0.06] sm:p-6 md:backdrop-blur-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 text-cyan-200 transition duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-300/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-display text-lg font-semibold leading-snug text-white sm:min-h-[3.25rem] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
