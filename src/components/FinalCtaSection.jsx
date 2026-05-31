import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";

export default function FinalCtaSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-line bg-surface/60 px-8 py-14 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade [background-size:32px_32px] opacity-30" />
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand-500/25 blur-[100px]" />

          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Sua próxima grande ideia merece um software à altura
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-mist">
            Vamos construir juntos a solução que o seu negócio precisa. Fale com a
            Samps Projetos hoje mesmo.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as="a" href="#contato">
              Começar meu projeto
              <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
