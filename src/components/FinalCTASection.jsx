import { motion } from "framer-motion";
import { closingStatement } from "../data/siteContent";
import { fadeUp } from "../lib/motion";
import Button from "./Button";
import Container from "./Container";

export default function FinalCTASection() {
  return (
    <section id="contato" data-section className="section-shell scroll-mt-28 pb-10 md:scroll-mt-32">
      <Container>
        <motion.div
          {...fadeUp()}
          className="glass-panel relative overflow-hidden px-4 py-12 text-center sm:px-10 sm:py-16 md:py-20"
        >
          <div className="absolute left-[-18%] top-1/2 h-44 w-[34rem] -translate-y-1/2 -rotate-12 bg-gradient-to-r from-transparent via-cyan-300/14 to-transparent blur-[90px]" />
          <div className="absolute right-[-18%] top-0 h-36 w-[32rem] rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-[90px]" />
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

          <div className="relative mx-auto max-w-4xl">
            <span className="eyebrow">Pronto para elevar o nível</span>
            <h2 className="mt-8 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-6xl">
              <span className="text-balance">{closingStatement.title}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {closingStatement.description}
            </p>
            <div className="mt-10 flex justify-center">
              <Button href={closingStatement.button.href} icon={closingStatement.button.icon}>
                {closingStatement.button.label}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
