import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, X } from "lucide-react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import FaqList from "../components/FaqList.jsx";
import ConferenciaIlustracao from "../components/ConferenciaIlustracao.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { trackConversion } from "../lib/analytics.js";
import { linkWhatsApp } from "../data/site.js";

/*
 * Página de solução por nicho. O conteúdo vem de src/data/solucoes.js; a
 * estrutura é a mesma para todas: promessa, prova visual, antes e depois,
 * como funciona, recursos, preço, dúvidas e chamada final.
 */

function BotaoWhatsApp({ s, rotulo = "Falar no WhatsApp", variante = "primary" }) {
  return (
    <Button
      as="a"
      href={linkWhatsApp(s.whatsapp)}
      target="_blank"
      rel="noopener"
      variant={variante}
      onClick={() => trackConversion(`clique_whatsapp_${s.id}`)}
    >
      <MessageCircle size={18} />
      {rotulo}
    </Button>
  );
}

function Figura({ imagem, prioridade, className = "" }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-card">
        <img
          src={imagem.src}
          width={imagem.largura}
          height={imagem.altura}
          alt={imagem.legenda}
          loading={prioridade ? "eager" : "lazy"}
          fetchpriority={prioridade ? "high" : undefined}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-mist">{imagem.legenda}</figcaption>
    </figure>
  );
}

export default function SolucaoPage({ solucao: s }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo">
        {/* Promessa */}
        <section className="pt-32 sm:pt-40">
          <Container>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <motion.a
                variants={fadeUp}
                href="/#servicos"
                className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-xs font-medium text-mist transition-colors hover:text-white"
              >
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
                Voltar para os serviços
              </motion.a>

              <motion.span variants={fadeUp} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
                {s.badge}
              </motion.span>

              <motion.h1 variants={fadeUp} className="mt-5 text-[clamp(2rem,6.5vw,3.5rem)] font-bold leading-[1.08] text-white">
                {s.titulo} <span className="text-gradient">{s.tituloDestaque}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
                {s.subtitulo}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BotaoWhatsApp s={s} />
                <Button as="a" href="#como-funciona" variant="secondary">
                  Ver como funciona
                  <ArrowRight size={18} />
                </Button>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 text-sm text-mist/80">
                {s.chamada}
              </motion.p>

              <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-2">
                {s.publico.map((a) => (
                  <li key={a.rotulo} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-2 text-xs text-mist">
                    <Icon name={a.icone} size={14} className="text-brand-300" />
                    {a.rotulo}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </Container>
        </section>

        {/* Prova visual: capturas do sistema ou ilustração */}
        <section className="py-20 sm:py-24">
          <Container>
            {s.galeria && (
              <>
                <SectionHeading eyebrow="Veja o sistema" title={s.galeria.titulo} description={s.galeria.descricao} />
                <Reveal className="mx-auto mt-12 max-w-5xl">
                  <Figura imagem={s.galeria.principal} prioridade />
                </Reveal>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="mx-auto mt-10 grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_0.62fr_1.4fr]"
                >
                  {s.galeria.secundarias.map((img) => (
                    <motion.div key={img.src} variants={fadeUp}>
                      <Figura imagem={img} />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-mist/70">{s.galeria.nota}</p>
              </>
            )}
            {s.ilustracao && (
              <>
                <SectionHeading eyebrow="Como fica" title={s.ilustracao.titulo} description={s.ilustracao.descricao} />
                <Reveal className="mx-auto mt-12 max-w-4xl">
                  <ConferenciaIlustracao />
                  <p className="mt-3 text-center text-xs text-mist/70">{s.ilustracao.nota}</p>
                </Reveal>
              </>
            )}
          </Container>
        </section>

        {/* Antes e depois */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="O que muda" title={`${s.comparacao.antes.titulo} × ${s.comparacao.depois.titulo.toLowerCase()}`} />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2"
            >
              <motion.div variants={fadeUp} className="rounded-3xl border border-line bg-surface/30 p-6">
                <h3 className="text-base font-semibold text-mist">{s.comparacao.antes.titulo}</h3>
                <ul className="mt-4 space-y-3">
                  {s.comparacao.antes.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                      <X size={16} className="mt-0.5 shrink-0 text-red-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-3xl border border-brand-400/40 bg-surface/60 p-6 shadow-glow">
                <h3 className="text-base font-semibold text-white">{s.comparacao.depois.titulo}</h3>
                <ul className="mt-4 space-y-3">
                  {s.comparacao.depois.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Como funciona" title="Três passos, sem complicação" />
            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3"
            >
              {s.passos.map((p, i) => (
                <motion.li key={p.titulo} variants={fadeUp} className="rounded-3xl border border-line bg-surface/40 p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-sm font-bold text-ink">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.texto}</p>
                </motion.li>
              ))}
            </motion.ol>

            {s.caso && (
              <Reveal className="mx-auto mt-8 flex max-w-5xl flex-col gap-2 rounded-3xl border border-accent-400/30 bg-accent-400/[0.06] p-6 sm:flex-row sm:items-center sm:gap-6">
                <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-accent-300">{s.caso.titulo}</span>
                <p className="text-sm leading-relaxed text-mist sm:text-base">{s.caso.texto}</p>
              </Reveal>
            )}
          </Container>
        </section>

        {/* Recursos */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="O que vem junto" title="Feito para o dia a dia de quem usa" />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {s.recursos.map((r) => (
                <motion.div key={r.titulo} variants={fadeUp} className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                    <Icon name={r.icone} size={18} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{r.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{r.texto}</p>
                </motion.div>
              ))}
            </motion.div>

            {s.extra && (
              <Reveal className="mx-auto mt-8 max-w-3xl rounded-3xl border border-brand-400/40 bg-surface/60 p-6 text-center shadow-glow sm:p-8">
                <h3 className="text-lg font-semibold text-white">{s.extra.titulo}</h3>
                <p className="mt-2 leading-relaxed text-mist">{s.extra.texto}</p>
              </Reveal>
            )}
          </Container>
        </section>

        {/* Proposta: sem preço na página — o valor sai depois de entender o caso */}
        <section id="proposta" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Investimento"
              title="Proposta sob medida"
              description="O valor depende de como vocês trabalham hoje. Conversamos, entendemos o caso e enviamos a proposta com o valor fechado."
            />
            <Reveal className="mx-auto mt-12 max-w-3xl rounded-3xl border border-brand-400/50 bg-surface/70 p-7 shadow-glow sm:p-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Implantação</p>
                  <p className="mt-2 leading-relaxed text-white">{s.implantacao}</p>
                  <p className="mt-2 text-sm text-mist">Paga uma vez.</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Acompanhamento mensal</p>
                  <p className="mt-2 leading-relaxed text-white">Hospedagem, cópia de segurança, suporte e ajustes.</p>
                  <p className="mt-2 text-sm text-mist">O sistema continua funcionando e evoluindo.</p>
                </div>
              </div>
              <div className="mt-7 border-t border-line pt-6">
                <BotaoWhatsApp s={s} rotulo="Pedir uma proposta" />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Dúvidas */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas de quem está avaliando" />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqList faqs={s.faqs} />
            </div>
          </Container>
        </section>

        {/* Chamada final */}
        <section className="py-12 sm:py-16">
          <Container>
            <Reveal className="rounded-3xl border border-line bg-surface/50 px-7 py-12 text-center sm:px-12">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">{s.ctaFinal.titulo}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-mist">{s.ctaFinal.texto}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BotaoWhatsApp s={s} />
                <Button as="a" href="/#contato" variant="secondary">
                  Prefiro mandar uma mensagem
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp href={linkWhatsApp(s.whatsapp)} />
    </>
  );
}
