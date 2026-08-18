import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import FaqList from "../components/FaqList.jsx";
import AppDemo from "../components/AppDemo.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { trackConversion } from "../lib/analytics.js";
import { whatsappLink } from "../data/site.js";
import { appB2B } from "../data/appB2B.js";

export default function AppB2BPage() {
  const { comparison } = appB2B;

  return (
    <>
      <a
        href="#produto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main>
        {/* Hero */}
        <section id="produto" className="pt-32 sm:pt-40">
          <Container>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <motion.a
                variants={fadeUp}
                href="/#servicos"
                className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-xs font-medium text-mist transition-colors hover:text-white"
              >
                <ArrowLeft
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                Voltar para os serviços
              </motion.a>

              <motion.span
                variants={fadeUp}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink"
              >
                {appB2B.badge}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-[clamp(2.1rem,7vw,3.75rem)] font-bold leading-[1.08] text-white"
              >
                Aplicativo de pedidos B2B{" "}
                <span className="text-gradient">com a sua marca</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
              >
                {appB2B.subheadline}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button as="a" href="/#contato">
                  Quero um diagnóstico gratuito
                  <ArrowRight size={18} />
                </Button>
                <Button
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackConversion("clique_whatsapp_app_b2b")}
                  variant="secondary"
                >
                  Falar no WhatsApp
                </Button>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 text-sm text-mist/80">
                App pronto por{" "}
                <strong className="font-semibold text-white">R$ 2.000</strong> ·
                No ar em 2 a 4 semanas
              </motion.p>

              {/* público-alvo compacto, logo no topo */}
              <motion.ul
                variants={fadeUp}
                className="mt-8 flex flex-wrap justify-center gap-2"
              >
                {appB2B.audience.map((a) => (
                  <li
                    key={a.label}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-2 text-xs text-mist"
                  >
                    <Icon name={a.icon} size={14} className="text-brand-300" />
                    {a.label}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <Reveal className="mx-auto mt-14 max-w-2xl rounded-3xl border border-brand-400/40 bg-surface/60 p-6 text-center shadow-glow sm:p-8">
              <p className="leading-relaxed text-white sm:text-lg">
                {appB2B.pitch}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Demonstração navegável */}
        <section id="demonstracao" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Experimente"
              title="Percorra o aplicativo como o seu cliente"
              description="Do catálogo bloqueado até o pedido no seu sistema, em seis toques."
            />
            <div className="mt-14">
              <AppDemo passos={appB2B.demo} />
            </div>
          </Container>
        </section>

        {/* Antes e depois */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="O que muda"
              title="Do WhatsApp e da planilha para o pedido automático"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-line bg-surface/30 p-6"
              >
                <h3 className="text-base font-semibold text-mist">
                  {comparison.before.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {comparison.before.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-mist">
                      <X size={16} className="mt-0.5 shrink-0 text-red-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-brand-400/40 bg-surface/60 p-6 shadow-glow"
              >
                <h3 className="text-base font-semibold text-white">
                  {comparison.after.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {comparison.after.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-mist">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Funcionalidades */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Como funciona"
              title="Do catálogo ao pedido dentro do seu sistema"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 md:grid-cols-3"
            >
              {appB2B.features.map((group) => (
                <motion.div
                  key={group.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-ink">
                      <Icon name={group.icon} size={18} />
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-mist"
                      >
                        <Check size={15} className="mt-1 shrink-0 text-accent-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Diferenciais */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Por que este"
              title="Aplicativo white label, pronto e no seu nome"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {appB2B.differentials.map((d) => (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                    <Icon name={d.icon} size={18} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{d.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Planos */}
        <section id="planos" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Investimento"
              title="Escolha até onde a gente vai"
              description="O valor final é fechado na proposta, depois do diagnóstico."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mx-auto mt-12 grid max-w-3xl items-start gap-5 md:grid-cols-2"
            >
              {appB2B.plans.map((plan) => {
                const featured = Boolean(plan.highlight);
                return (
                  <motion.div
                    key={plan.id}
                    variants={fadeUp}
                    className={`relative flex h-full flex-col rounded-3xl border p-6 sm:p-7 ${
                      featured
                        ? "border-brand-400/50 bg-surface/70 shadow-glow"
                        : "border-line bg-surface/40"
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-6 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                        {plan.highlight}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="mt-1 text-xs text-brand-300">{plan.audience}</p>

                    <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
                      <span className="text-2xl font-bold text-gradient">
                        {plan.price}
                      </span>
                      <span className="text-sm text-mist">{plan.period}</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {plan.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                      {plan.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-mist"
                        >
                          <Check size={15} className="mt-1 shrink-0 text-accent-400" />
                          {item}
                        </li>
                      ))}
                      {plan.excluded?.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-mist/60"
                        >
                          <X size={15} className="mt-1 shrink-0 text-mist/40" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex-1" />
                    <Button
                      as="a"
                      href="/#contato"
                      size="md"
                      variant={featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Pedir diagnóstico
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

          </Container>
        </section>

        {/* Dúvidas — o detalhe completo vive aqui */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Tudo sobre o aplicativo de pedidos B2B"
              description="Preço, prazo, integração e publicação nas lojas — respondido em detalhe."
            />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqList faqs={appB2B.faqs} />
            </div>
          </Container>
        </section>

        {/* CTA final */}
        <section className="py-12 sm:py-16">
          <Container>
            <Reveal className="rounded-3xl border border-line bg-surface/50 px-7 py-12 text-center sm:px-12">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                Quer ver o aplicativo com a sua marca?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-mist">
                Em 30 minutos mostramos o app rodando e dizemos o que seria
                necessário para integrar ao seu sistema.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button as="a" href="/#contato">
                  Quero um diagnóstico gratuito
                  <ArrowRight size={18} />
                </Button>
                <Button
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackConversion("clique_whatsapp_app_b2b")}
                  variant="secondary"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
