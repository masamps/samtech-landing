import { motion } from "framer-motion";
import { processSteps } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function ProcessSection() {
  return (
    <section id="processo" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <SectionHeading
          eyebrow="Processo"
          title="Um fluxo claro para transformar complexidade em uma entrega segura e elegante."
          description="Cada etapa é adaptada ao escopo contratado, seja um sistema, um aplicativo, um site ou uma combinação planejada."
          align="center"
          className="mb-14"
        />

        <div className="relative hidden lg:block">
          <div className="absolute left-10 right-10 top-10 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          <div className="grid gap-5 lg:grid-cols-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  {...scaleIn(index * 0.06)}
                  className="relative rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md md:backdrop-blur-xl"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:hidden">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                {...scaleIn(index * 0.06)}
                className="relative rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md md:backdrop-blur-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
