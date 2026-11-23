import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
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
 * Página de solução por nicho, curta de propósito: quem chega pela busca
 * entende em segundos o que é e chama no WhatsApp. O conteúdo vem de
 * src/data/solucoes.js. Estrutura: promessa com a imagem logo abaixo,
 * três passos, quatro vantagens, dúvidas (recolhidas) e chamada final.
 */

function BotaoWhatsApp({ s, rotulo = "Falar no WhatsApp" }) {
  return (
    <Button as="a" href={linkWhatsApp(s.whatsapp)} target="_blank" rel="noopener" onClick={() => trackConversion(`clique_whatsapp_${s.id}`)}>
      <MessageCircle size={18} />
      {rotulo}
    </Button>
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
        {/* Promessa + prova visual, tudo no primeiro olhar */}
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

              <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
                {s.subtitulo}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3">
                <BotaoWhatsApp s={s} />
                <span className="text-sm text-mist/80">{s.chamada}</span>
              </motion.div>

              <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-2">
                {s.publico.map((a) => (
                  <li key={a.rotulo} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3.5 py-2 text-xs text-mist">
                    <Icon name={a.icone} size={14} className="text-brand-300" />
                    {a.rotulo}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <Reveal className="mx-auto mt-14 max-w-5xl">
              {s.imagem ? (
                <figure>
                  <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-card">
                    <img
                      src={s.imagem.src}
                      width={s.imagem.largura}
                      height={s.imagem.altura}
                      alt={s.imagem.legenda}
                      fetchpriority="high"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-mist">{s.imagem.legenda}</figcaption>
                </figure>
              ) : (
                <>
                  <ConferenciaIlustracao />
                  <p className="mt-3 text-center text-sm text-mist">{s.ilustracao.nota}</p>
                </>
              )}
            </Reveal>
          </Container>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="scroll-mt-28 py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Como funciona" title="Três passos" />
            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3"
            >
              {s.passos.map((p, i) => (
                <motion.li key={p.titulo} variants={fadeUp} className="rounded-2xl border border-line bg-surface/40 p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-sm font-bold text-ink">{i + 1}</span>
                  <h3 className="mt-3 text-base font-semibold text-white">{p.titulo}</h3>
                  <p className="mt-1 text-sm text-mist">{p.texto}</p>
                </motion.li>
              ))}
            </motion.ol>

            {/* Vantagens: uma linha cada */}
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-6 sm:grid-cols-2"
            >
              {s.recursos.map((r) => (
                <motion.li key={r.titulo} variants={fadeUp} className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                    <Icon name={r.icone} size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{r.titulo}</span>
                    <span className="block text-sm text-mist">{r.texto}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </Container>
        </section>

        {/* Dúvidas: recolhidas — leves para quem lê, completas para a busca */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
            <div className="mx-auto mt-10 max-w-3xl">
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
              <div className="mt-8 flex justify-center">
                <BotaoWhatsApp s={s} />
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
