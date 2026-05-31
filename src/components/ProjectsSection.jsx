import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { stagger, fadeUp } from "../lib/motion.js";
import { projects } from "../data/site.js";

export default function ProjectsSection() {
  return (
    <section id="projetos" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Projetos"
          title="O tipo de produto que entregamos"
          description="Exemplos de soluções que desenvolvemos para diferentes segmentos. Cada projeto é único, assim como o seu."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-card"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 bg-grid-fade [background-size:24px_24px] opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="card-surface w-3/4 p-3 shadow-card transition-transform duration-500 group-hover:scale-105">
                    <div className="flex gap-1.5 border-b border-line pb-2">
                      <span className="h-2 w-2 rounded-full bg-mist/30" />
                      <span className="h-2 w-2 rounded-full bg-mist/30" />
                      <span className="h-2 w-2 rounded-full bg-mist/30" />
                    </div>
                    <div className="space-y-2 pt-3">
                      <div className="h-2 w-2/3 rounded bg-mist/25" />
                      <div className="h-2 w-full rounded bg-mist/15" />
                      <div className="h-2 w-4/5 rounded bg-mist/15" />
                      <div className="mt-3 h-6 w-1/2 rounded bg-brand-gradient" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  {project.category}
                </span>
                <h3 className="mt-2 flex items-center gap-1 text-lg font-bold text-white">
                  {project.title}
                  <ArrowUpRight
                    size={18}
                    className="text-brand-300 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-ink/40 px-3 py-1 text-xs text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
