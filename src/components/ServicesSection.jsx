import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/siteContent";
import { scaleIn } from "../lib/motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function ServicesSection() {
  return (
    <section id="servicos" data-section className="section-shell scroll-mt-28 md:scroll-mt-32">
      <Container>
        <SectionHeading
          eyebrow="Serviços"
          title="Escolha a frente certa para o seu momento, com o mesmo padrão premium de entrega."
          description="A Samtech desenvolve sistemas, aplicativos mobile e sites profissionais sob demanda. Cada frente pode ser contratada de forma independente ou combinada conforme o escopo do projeto."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                {...scaleIn(index * 0.08)}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/18 hover:bg-white/[0.06] sm:p-6 md:backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute right-[-20%] top-0 hidden h-20 w-72 rotate-12 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-2xl opacity-0 transition duration-300 group-hover:opacity-100 md:block" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan-200">
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-slate-500 transition duration-300 group-hover:text-cyan-200" />
                  </div>

                  <div className="mb-8 rounded-lg border border-white/[0.08] bg-slate-950/50 p-4">
                    <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      <span>Entrega premium</span>
                      <span>0{index + 1}</span>
                    </div>
                    <div className="grid gap-3">
                      <div className="h-24 rounded-[1.2rem] bg-gradient-to-br from-cyan-300/15 via-sky-500/6 to-white/5" />
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 3 }).map((_, itemIndex) => (
                          <div key={itemIndex} className="h-10 rounded-2xl bg-white/[0.04]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
