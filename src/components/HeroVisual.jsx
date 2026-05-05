import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { useRef } from "react";

function MetricBar({ value, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-full bg-white/[0.04] ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300/90 via-sky-400/80 to-white/90"
        style={{ width: value }}
      />
    </div>
  );
}

export default function HeroVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lightY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [14, -22]);

  return (
    <div ref={ref} className="relative mx-auto h-[560px] w-full max-w-[580px] lg:h-[620px]">
      <motion.div
        style={{ y: lightY }}
        className="absolute left-1/2 top-[12%] h-40 w-[28rem] -translate-x-1/2 -rotate-6 bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent blur-[90px]"
      />

      <div className="hero-grid absolute inset-0 rounded-[2.75rem]" />
      <div className="absolute inset-x-12 bottom-6 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <motion.div
        style={{ y: dashboardY }}
        className="glass-panel panel-glow absolute inset-x-0 bottom-4 z-20 p-4 sm:inset-x-10 sm:p-6"
      >
        <div className="mb-5 flex flex-col gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-cyan-300" />
              <span className="text-[11px] uppercase tracking-[0.26em] text-slate-400">Samtech Suite</span>
            </div>
            <h3 className="text-balance font-display text-lg font-semibold leading-snug text-white">
              Soluções digitais com presença e precisão.
            </h3>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
            Deploy premium
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.8rem] border border-white/[0.08] bg-slate-950/60 p-4">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Painel central</span>
                <p className="max-w-sm text-sm leading-6 text-slate-300">
                  Visibilidade, ritmo e controle em uma interface precisa.
                </p>
              </div>
              <div className="mt-1 flex shrink-0 gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
            </div>
            <div className="rounded-[1.4rem] bg-white/[0.04] p-4">
              <div className="mb-5 h-20 rounded-[1.2rem] bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-transparent" />
              <MetricBar value="86%" className="h-2.5" />
            </div>
          </div>

          <div className="grid gap-3">
            {["Arquitetura", "UX", "Escala"].map((label, index) => (
              <div key={label} className="rounded-[1.2rem] bg-white/[0.04] p-3">
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                <MetricBar value={`${70 + index * 10}%`} className="h-2.5" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
