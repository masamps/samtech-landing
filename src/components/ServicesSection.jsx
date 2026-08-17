import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Smartphone, Wrench } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { services, maintenance } from "../data/site.js";

export default function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Comece pequeno, cresça junto com o sistema"
          description="Não precisa começar por um projeto grande. A gente resolve primeiro o processo que mais dói e evolui a partir do resultado."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid items-start gap-5 md:grid-cols-3"
        >
          {services.map((service) => {
            const featured = Boolean(service.highlight);
            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  featured
                    ? "border-brand-400/50 bg-surface/70 shadow-glow"
                    : "border-line bg-surface/40 hover:border-white/20"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                    {service.highlight}
                  </span>
                )}

                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    featured
                      ? "bg-brand-gradient text-ink shadow-glow"
                      : "border border-line bg-ink/60 text-brand-300"
                  }`}
                >
                  <Icon name={service.icon} size={22} />
                </span>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {service.title}
                </h3>

                {/* preço + prazo */}
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-lg font-bold text-gradient">
                    {service.price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-mist">
                    <Clock size={12} />
                    {service.deadline}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {service.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-mist"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent-400"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex-1" />
                <Button
                  as="a"
                  href="#contato"
                  size="md"
                  variant={featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  Pedir diagnóstico
                </Button>
              </motion.article>
            );
          })}
        </motion.div>

        {/* manutenção recorrente */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface/40 p-6 sm:flex-row sm:items-center sm:gap-6"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
            <Wrench size={20} />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">
              {maintenance.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-mist">
              {maintenance.description}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-ink/40 px-4 py-2 text-sm font-semibold text-gradient">
            {maintenance.price}
          </span>
        </motion.div>

        {/* Produto pronto — categoria diferente dos serviços sob medida */}
        <motion.a
          href="/aplicativo-b2b/"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="group mt-6 flex flex-col gap-5 rounded-3xl border border-brand-400/40 bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 sm:p-7 lg:flex-row lg:items-center lg:gap-7"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
            <Smartphone size={22} />
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                Produto pronto
              </span>
              <h3 className="text-lg font-bold text-white">
                Aplicativo de Pedidos B2B com a sua marca
              </h3>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
              Para distribuidoras, indústrias, representantes e lojas: o seu
              cliente monta o pedido pelo celular e ele cai direto no seu
              sistema — e se você ainda não tem um, a gente monta junto.
            </p>
            <p className="mt-3 text-sm font-semibold text-gradient">
              App pronto por R$ 2.000 ou gestão completa · No ar em 2 a 4 semanas
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-ink/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-brand-400/60">
            Conhecer o aplicativo
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </motion.a>

        <p className="mt-6 text-center text-sm text-mist">
          Valores de referência. O preço final é fechado na proposta, depois do
          diagnóstico — sem surpresa no meio do caminho.
        </p>
      </Container>
    </section>
  );
}
