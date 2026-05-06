import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { heroButtons, heroHighlights } from "../data/siteContent";
import Button from "./Button";
import Container from "./Container";
import HeroVisual from "./HeroVisual";

const heroReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.46,
    delay,
    ease: [0.22, 1, 0.36, 1],
  },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-section
      className="relative scroll-mt-28 overflow-hidden px-0 pb-16 pt-28 md:scroll-mt-32 md:pb-28 md:pt-40"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-20">
          <div className="relative z-10 max-w-2xl">
            <motion.span {...heroReveal()} className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Desenvolvimento sob demanda para marcas que querem mais
            </motion.span>

            <motion.h1
              {...heroReveal(0.04)}
              className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:mt-8 md:text-6xl md:leading-[1.02] lg:text-[5rem]"
            >
              <span className="text-balance">
                Desenvolvimento de sistemas, apps e sites com{" "}
                <span className="text-gradient">
                  padrão profissional.
                </span>
              </span>
            </motion.h1>

            <motion.p
              {...heroReveal(0.08)}
              className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:mt-8 md:text-lg md:leading-8"
            >
              A Samtech cria soluções digitais sob medida para empresas que precisam de
              tecnologia com performance, design e escalabilidade. Você contrata uma frente
              específica ou combina frentes quando isso fizer sentido.
            </motion.p>

            <motion.div {...heroReveal(0.12)} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10 md:gap-4">
              <Button href={heroButtons.primary.href} className="w-full sm:w-auto">
                {heroButtons.primary.label}
              </Button>
              <Button href={heroButtons.secondary.href} variant="secondary" className="w-full sm:w-auto">
                {heroButtons.secondary.label}
              </Button>
            </motion.div>

            <motion.div
              {...heroReveal(0.16)}
              className="mt-8 grid gap-3 sm:grid-cols-3 md:mt-10 lg:max-w-none"
            >
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              {...heroReveal(0.2)}
              className="mt-12 hidden items-center gap-3 text-sm text-slate-400 lg:inline-flex"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                <ChevronRight className="h-4 w-4 text-cyan-300" />
              </span>
              Sistema, app, site ou uma combinação sob medida para o seu projeto.
            </motion.div>
          </div>

          <motion.div {...heroReveal(0.1)} className="relative mt-2 lg:mt-0">
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
