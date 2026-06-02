import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import Icon from "./Icon.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { cases, labProjects } from "../data/site.js";

export default function CasesSection() {
  return (
    <section id="projetos" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Projetos"
          title="Trabalho real, no ar"
          description="Da advocacia ao e-commerce: alguns dos sistemas e sites que já desenvolvemos e seguem em produção."
        />

        {/* cases de clientes */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {cases.map((c) => (
            <motion.article
              key={c.client}
              variants={fadeUp}
              className="flex flex-col rounded-3xl border border-line bg-surface/40 p-7 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-right text-xs text-mist">
                  {c.type} · {c.segment}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">{c.client}</h3>

              <div className="mt-4 space-y-3.5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                    Desafio
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {c.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                    Solução
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {c.solution}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-ink/40 p-3.5">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-400" />
                <p className="text-sm leading-relaxed text-mist">{c.result}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-ink/40 px-3 py-1 text-xs text-mist"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* projetos próprios */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <p className="text-center text-sm text-mist">
            Além dos clientes, também desenvolvemos nossos próprios aplicativos
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {labProjects.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                  <Icon name={p.icon} size={20} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold text-white">
                      {p.title}
                    </h4>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wide text-mist">
                      Projeto próprio
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-mist">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
