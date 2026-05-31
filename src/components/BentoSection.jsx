import { motion } from "framer-motion";
import { Sparkles, Gauge, ShieldCheck, MessagesSquare } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { stagger, fadeUp } from "../lib/motion.js";

const tiles = [
  {
    icon: Sparkles,
    title: "Design que transmite confiança",
    description:
      "Interfaces limpas e intuitivas, pensadas para que o seu cliente use sem fricção e a sua marca pareça profissional.",
    className: "md:col-span-2",
    visual: "ui",
  },
  {
    icon: Gauge,
    title: "Performance de verdade",
    description:
      "Aplicações rápidas e otimizadas. Cada segundo conta para a experiência e para o SEO.",
    className: "",
    visual: "speed",
  },
  {
    icon: ShieldCheck,
    title: "Código de qualidade",
    description:
      "Boas práticas e código organizado para o seu sistema crescer sem virar dor de cabeça.",
    className: "",
    visual: "code",
  },
  {
    icon: MessagesSquare,
    title: "Acompanhamento próximo, do início ao suporte",
    description:
      "Você conversa direto com quem desenvolve, com prazos claros e suporte contínuo depois da entrega.",
    className: "md:col-span-2",
    visual: "chat",
  },
];

function TileVisual({ type }) {
  if (type === "ui") {
    return (
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-line bg-ink/40 p-3">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient" />
            <div className="h-2 w-full rounded bg-white/15" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }
  if (type === "speed") {
    return (
      <div className="mt-6 flex items-end gap-1.5">
        {[30, 50, 40, 70, 90, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded bg-gradient-to-t from-brand-500/30 to-accent-400/80"
            style={{ height: `${h * 0.5}px` }}
          />
        ))}
      </div>
    );
  }
  if (type === "code") {
    return (
      <div className="mt-6 space-y-1.5 rounded-xl border border-line bg-ink/50 p-3 font-mono text-[10px]">
        <p className="text-accent-300">const samps = () =&gt; {"{"}</p>
        <p className="pl-3 text-mist">build(<span className="text-brand-300">"qualidade"</span>)</p>
        <p className="text-accent-300">{"}"}</p>
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-2">
      <div className="ml-auto w-2/3 rounded-2xl rounded-tr-sm bg-brand-500/20 px-3 py-2 text-xs text-white">
        Como está meu projeto?
      </div>
      <div className="w-2/3 rounded-2xl rounded-tl-sm border border-line bg-ink/40 px-3 py-2 text-xs text-mist">
        Entrega da nova tela hoje. ✨
      </div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section id="diferenciais" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Por que a Samps"
          title="Qualidade que você sente em cada detalhe"
          description="Não basta entregar um sistema que funciona. Entregamos produtos sólidos, bonitos e feitos para durar."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {tiles.map((tile) => (
            <motion.div
              key={tile.title}
              variants={fadeUp}
              className={`flex flex-col rounded-3xl border border-line bg-surface/40 p-7 transition-colors hover:border-white/20 ${tile.className}`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-ink/60 text-brand-300">
                <tile.icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {tile.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {tile.description}
              </p>
              <TileVisual type={tile.visual} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
