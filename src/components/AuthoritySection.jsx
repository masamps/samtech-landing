import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { authorityCards } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function AuthoritySection() {
  return (
    <section id="autoridade" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Autoridade"
              title="Tecnologia pensada como produto, não apenas como entrega."
              description="A Samtech desenvolve soluções digitais sob medida com foco em performance, design, usabilidade e escalabilidade. Cada projeto pode começar por uma frente específica e evoluir com consistência conforme a necessidade do negócio."
            />

            <Reveal delay={0.12}>
              <div className="glass-panel relative overflow-hidden p-8">
                <div className="absolute right-[-8%] top-0 h-24 w-80 rotate-12 bg-gradient-to-r from-transparent via-cyan-300/12 to-transparent blur-3xl" />
                <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-xl space-y-4">
                    <span className="eyebrow">Direção clara</span>
                    <p className="text-xl leading-9 text-white md:text-2xl">
                      Interfaces premium, base técnica consistente e uma narrativa visual que transmite
                      segurança logo no primeiro contato.
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                    <ArrowUpRight className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {authorityCards.map((item, index) => (
              <motion.div
                key={item.title}
                {...scaleIn(index * 0.08)}
                className="group glass-panel p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.06]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-lg font-semibold text-white transition duration-500 group-hover:border-cyan-300/20 group-hover:text-cyan-200">
                  0{index + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
