import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import HeroVisual from "./HeroVisual.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { whatsappLink } from "../data/site.js";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 sm:pt-40"
    >
      {/* aurora / glow de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-aurora [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute inset-0 bg-grid-fade [background-size:54px_54px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      </div>

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
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-sm transition-colors hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Software sob medida para empresas que querem crescer
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[2.6rem] font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          >
            O atalho da sua empresa
            <br />
            para o <span className="text-gradient">digital</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
          >
            A Samps Projetos cria sistemas web, sites e aplicativos sob medida —
            com design impecável, performance e código de qualidade. Do primeiro
            clique à publicação.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button as="a" href="#contato">
              Solicitar orçamento
              <ArrowRight size={18} />
            </Button>
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              variant="secondary"
            >
              Falar no WhatsApp
            </Button>
          </motion.div>
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
