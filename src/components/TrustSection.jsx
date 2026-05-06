import { motion } from "framer-motion";
import { firstConversationSteps, trustPoints } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function TrustSection() {
  return (
    <section id="confianca" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Confiança"
              title="Uma marca boutique com atendimento direto e responsabilidade técnica."
              description="A Samtech não tenta parecer maior do que precisa. A proposta é ser próxima, clara e exigente com cada decisão do projeto."
              className="mb-0"
            />

            <Reveal delay={0.08}>
              <div className="mt-8 rounded-lg border border-cyan-300/16 bg-cyan-300/[0.055] p-5 shadow-soft">
                <p className="text-sm leading-7 text-cyan-50/90">
                  O primeiro contato é conduzido por Matheus Sampaio para entender sua necessidade e indicar a frente certa: sistema, app, site ou uma combinação quando fizer sentido.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {trustPoints.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  {...scaleIn(index * 0.07)}
                  className="motion-card rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-soft backdrop-blur-md md:p-6 md:backdrop-blur-xl"
                >
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-slate-950/45 p-4 sm:grid-cols-2 lg:grid-cols-4">
            {firstConversationSteps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/[0.035] p-4">
                <span className="text-xs font-semibold text-cyan-200">0{index + 1}</span>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
