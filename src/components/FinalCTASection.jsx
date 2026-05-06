import { motion } from "framer-motion";
import { closingStatement, contactChannels, conversionPoints } from "../data/siteContent";
import { fadeUp } from "../lib/motion";
import Button from "./Button";
import Container from "./Container";
import LeadForm from "./LeadForm";

export default function FinalCTASection() {
  return (
    <section id="contato" data-section className="section-shell scroll-mt-28 pb-10 md:scroll-mt-32">
      <Container>
        <motion.div
          {...fadeUp()}
          className="glass-panel relative overflow-hidden px-4 py-10 sm:px-8 sm:py-14 md:p-10 lg:p-12"
        >
          <div className="absolute left-[-18%] top-1/2 h-44 w-[34rem] -translate-y-1/2 -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/14 to-transparent blur-[90px]" />
          <div className="absolute right-[-18%] top-0 h-36 w-[32rem] rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-[90px]" />
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="eyebrow">Fale direto com Matheus Sampaio</span>
              <h2 className="mt-7 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                <span className="text-balance">{closingStatement.title}</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                {closingStatement.description}
              </p>

              <div className="mt-8 grid gap-3">
                {conversionPoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {contactChannels.map((channel, index) => (
                  <Button
                    key={channel.title}
                    href={channel.href}
                    icon={channel.icon}
                    variant={index === 0 ? "primary" : "secondary"}
                    className="w-full sm:w-auto"
                  >
                    {channel.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-3 shadow-card backdrop-blur-md sm:p-4">
              <div className="mb-4 px-2 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                  Briefing rápido
                </span>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Preencha o essencial e envie uma primeira visão do projeto. Matheus Sampaio analisa o contexto e a conversa começa pela frente certa, sem pacote obrigatório.
                </p>
              </div>
              <LeadForm />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
