import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Info, X } from "lucide-react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import FaqList from "../components/FaqList.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { trackConversion } from "../lib/analytics.js";
import { whatsappLink } from "../data/site.js";
import { appB2B } from "../data/appB2B.js";

export default function AppB2BPage() {
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
                Seu catálogo no bolso do cliente —{" "}
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
                Do código-fonte por{" "}
                <strong className="font-semibold text-white">R$ 2.000</strong> à
                implantação completa · No ar em 2 a 4 semanas
              </motion.p>
            </motion.div>

            {/* Pitch central */}
            <Reveal className="mx-auto mt-14 max-w-3xl rounded-3xl border border-brand-400/40 bg-surface/60 p-7 text-center shadow-glow sm:p-9">
              <p className="text-lg leading-relaxed text-white">
                {appB2B.pitch}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Problema */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="O problema"
              title="Como o pedido chega hoje na sua empresa"
            />
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mx-auto mt-10 flex max-w-2xl flex-col gap-3"
            >
              {appB2B.problems.map((p) => (
                <motion.li
                  key={p}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface/40 p-4"
                >
                  <X size={18} className="mt-0.5 shrink-0 text-red-400/80" />
                  <span className="text-sm leading-relaxed text-mist">{p}</span>
                </motion.li>
              ))}
            </motion.ul>
          </Container>
        </section>

        {/* Para quem é */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={appB2B.whoFor.title}
              title="Feito para quem vende para outras empresas"
              description={appB2B.whoFor.intro}
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {appB2B.whoFor.items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Funcionalidades */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="O que o aplicativo faz"
              title="Do catálogo ao pedido dentro do seu sistema"
              description="Tudo o que a operação precisa já vem pronto e testado."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 md:grid-cols-2"
            >
              {appB2B.features.map((group) => (
                <motion.div
                  key={group.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-ink">
                      <Icon name={group.icon} size={20} />
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
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
              eyebrow="Por que este e não outro"
              title="O que existe por baixo do aplicativo"
              description="Decisões técnicas que aparecem no prazo, no custo e na estabilidade."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {appB2B.differentials.map((d) => (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-white/20"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                    <Icon name={d.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{d.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Benefícios */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="O que muda"
              title="O resultado na operação do dia a dia"
            />
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
            >
              {appB2B.benefits.map((b) => (
                <motion.li
                  key={b}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface/40 p-4"
                >
                  <Check size={17} className="mt-0.5 shrink-0 text-accent-400" />
                  <span className="text-sm leading-relaxed text-mist">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </Container>
        </section>

        {/* Planos */}
        <section id="planos" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Investimento"
              title="Implantação uma vez, manutenção enquanto durar"
              description="Preço transparente. O valor final é fechado na proposta, depois do diagnóstico."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid items-start gap-5 lg:grid-cols-3"
            >
              {appB2B.plans.map((plan) => {
                const featured = Boolean(plan.highlight);
                return (
                  <motion.div
                    key={plan.id}
                    variants={fadeUp}
                    className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                      featured
                        ? "border-brand-400/50 bg-surface/70 shadow-glow"
                        : "border-line bg-surface/40"
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-7 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
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

                    <p className="mt-4 text-sm leading-relaxed text-mist">
                      {plan.summary}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
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
                      {plan.id === "template" ? "Quero a licença" : "Pedir diagnóstico"}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Parceria / revenda */}
            <Reveal className="mt-6 rounded-3xl border border-line bg-surface/40 p-7 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                    {appB2B.partner.eyebrow}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {appB2B.partner.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                    {appB2B.partner.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {appB2B.partner.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-mist"
                      >
                        <Check size={15} className="mt-1 shrink-0 text-accent-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0">
                  <Button as="a" href="/#contato" size="md">
                    {appB2B.partner.cta}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Observações */}
            <Reveal className="mx-auto mt-8 flex max-w-3xl flex-col gap-3">
              {appB2B.notes.map((n) => (
                <p
                  key={n}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-mist"
                >
                  <Info size={15} className="mt-1 shrink-0 text-brand-300" />
                  {n}
                </p>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* Dúvidas */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="O que perguntam antes de contratar"
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
                Quer ver o aplicativo funcionando com a sua marca?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-mist">
                Em 30 minutos entendemos a sua operação, mostramos o app rodando e
                dizemos o que seria necessário para integrar ao seu sistema.
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
