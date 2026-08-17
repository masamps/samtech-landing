import { motion } from "framer-motion";
import { ClipboardCheck, MessagesSquare, Rocket } from "lucide-react";
import Container from "./Container.jsx";
import { stagger, fadeUp } from "../lib/motion.js";

// Responde a pergunta que trava o visitante: "o que acontece se eu chamar?"
const steps = [
  {
    icon: MessagesSquare,
    step: "1",
    title: "Diagnóstico gratuito",
    description:
      "Uma conversa de 30 minutos para entender o seu processo e o que precisa ser resolvido. Sem custo e sem compromisso.",
  },
  {
    icon: ClipboardCheck,
    step: "2",
    title: "Proposta fechada",
    description:
      "Você recebe escopo, prazo e valor definidos antes de qualquer linha de código. Sem surpresa no meio do caminho.",
  },
  {
    icon: Rocket,
    step: "3",
    title: "Entrega em etapas",
    description:
      "O sistema é construído em ciclos: você acompanha, testa e valida durante o percurso — não só no final.",
  },
];

export default function ProcessStrip() {
  return (
    <section id="como-funciona" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-300"
          >
            Como funciona
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            Do primeiro contato ao sistema no ar, em três passos
          </motion.h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                className="relative flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-ink">
                    <s.icon size={18} />
                  </span>
                  <span className="font-display text-3xl font-bold text-white/10">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-center text-sm text-mist"
          >
            5 anos desenvolvendo software sob medida · Atendemos de São Paulo
            para todo o Brasil · O código entregue é seu
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
