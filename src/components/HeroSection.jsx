import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import HeroVisual from "./HeroVisual.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { whatsappLink } from "../data/site.js";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* fundo decorativo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-mist"
            >
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-accent-400 text-accent-400" />
                ))}
              </span>
              Software sob medida para empresas que querem crescer
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl"
            >
              Criamos{" "}
              <span className="text-gradient">sistemas, sites e aplicativos</span>{" "}
              que impulsionam o seu negócio
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-mist"
            >
              A Samps Projetos transforma ideias em produtos digitais de verdade —
              com design moderno, performance e código de qualidade do primeiro
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
              <Button as="a" href="#projetos" variant="secondary">
                Ver projetos
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-mist"
            >
              {["Sistemas Web", "Sites & Landing Pages", "Apps Android & iOS"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          <div className="order-first lg:order-last">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
