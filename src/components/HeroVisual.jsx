import { ArrowUpRight, Layers3 } from "lucide-react";

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
  return (
    <div className="relative mx-auto w-full max-w-[580px] sm:h-[560px] lg:h-[620px]">
      <div className="absolute left-1/2 top-[12%] hidden h-40 w-[28rem] -translate-x-1/2 -rotate-6 bg-gradient-to-r from-transparent via-cyan-300/14 to-transparent blur-[72px] sm:block" />

      <div className="hero-grid absolute inset-0 hidden rounded-[2.75rem] sm:block" />
      <div className="absolute inset-x-12 bottom-6 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent sm:block" />

      <div className="glass-panel panel-glow relative z-20 p-4 sm:absolute sm:inset-x-10 sm:bottom-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-cyan-300" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px] sm:tracking-[0.26em]">
                Samtech Suite
              </span>
            </div>
            <h3 className="text-balance font-display text-base font-semibold leading-snug text-white sm:text-lg">
              Soluções digitais com presença e precisão.
            </h3>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
            Deploy premium
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-white/[0.08] bg-slate-950/60 p-3 sm:rounded-[1.8rem] sm:p-4">
            <div className="mb-4 flex items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">
                  Painel central
                </span>
                <p className="max-w-sm text-xs leading-6 text-slate-300 sm:text-sm">
                  Visibilidade, ritmo e controle em uma interface precisa.
                </p>
              </div>
              <div className="mt-1 flex shrink-0 gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
            </div>
            <div className="rounded-[1.2rem] bg-white/[0.04] p-3 sm:rounded-[1.4rem] sm:p-4">
              <div className="mb-4 h-16 rounded-[1rem] bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-transparent sm:mb-5 sm:h-20 sm:rounded-[1.2rem]" />
              <MetricBar value="86%" className="h-2.5" />
            </div>
          </div>

          <div className="grid gap-3">
            {["Arquitetura", "UX", "Escala"].map((label, index) => (
              <div key={label} className="rounded-[1rem] bg-white/[0.04] p-3 sm:rounded-[1.2rem]">
                <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs sm:tracking-[0.18em]">{label}</div>
                <MetricBar value={`${70 + index * 10}%`} className="h-2.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
