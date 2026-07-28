import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import HeroVisual from "./HeroVisual.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { whatsappLink } from "../data/site.js";
import { trackConversion } from "../lib/analytics.js";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 sm:pt-40"
    >
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.a
            variants={fadeUp}
            href="#servicos"
            className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2.5 text-xs font-medium text-mist backdrop-blur-sm transition-colors hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            5 anos desenvolvendo software sob medida
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2.25rem,8.5vw,4.25rem)] font-bold leading-[1.07] text-white"
          >
            Sistemas sob medida para acabar com o{" "}
            <span className="text-gradient">trabalho manual</span> da sua empresa
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
          >
            Automatizamos processos e desenvolvemos sistemas web feitos para a
            sua operação — falando direto com quem programa, sem intermediário.
            Também criamos sites e aplicativos.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button as="a" href="#contato">
              Quero um diagnóstico gratuito
              <ArrowRight size={18} />
            </Button>
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              onClick={() => trackConversion("clique_whatsapp_hero")}
              variant="secondary"
            >
              Falar no WhatsApp
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm text-mist/80"
          >
            Automações a partir de{" "}
            <strong className="font-semibold text-white">R$ 6.000</strong> ·
            Diagnóstico gratuito de 30 min · Retorno em até 1 dia útil
          </motion.p>
        </motion.div>

        {/* visual de produto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
