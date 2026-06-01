import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  Search,
  Smartphone,
  Users,
} from "lucide-react";

// Mockup de produto amplo (estilo "screenshot" do app) com glow colorido.
export default function HeroVisual() {
  return (
    <div className="relative">
      {/* realce sutil atrás do produto */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 -z-10 mx-auto h-56 w-3/4 rounded-full bg-brand-500/15 blur-[120px]" />

      {/* janela do app */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-card backdrop-blur-sm">
        {/* topo da janela */}
        <div className="flex items-center gap-2 border-b border-line bg-ink/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <div className="ml-4 flex flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5">
            <Search size={13} className="text-mist" />
            <span className="text-xs text-mist">Buscar no painel...</span>
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
          {/* sidebar */}
          <aside className="hidden flex-col gap-1 border-r border-line p-4 sm:flex">
            {[
              { icon: LayoutDashboard, label: "Visão geral", active: true },
              { icon: BarChart3, label: "Relatórios" },
              { icon: Users, label: "Clientes" },
              { icon: Smartphone, label: "Aplicativo" },
            ].map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
                  item.active
                    ? "bg-brand-500/15 text-white"
                    : "text-mist"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </span>
            ))}
          </aside>

          {/* conteúdo */}
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-mist">Visão geral</p>
                <p className="text-lg font-semibold text-white">Seu negócio em tempo real</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-medium text-accent-300">
                <Activity size={13} /> Ao vivo
              </span>
            </div>

            {/* cards de métrica */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Receita", value: "R$ 128k" },
                { label: "Usuários", value: "3.4k" },
                { label: "Conversão", value: "+24%" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-line bg-ink/40 p-3"
                >
                  <p className="text-[11px] text-mist">{m.label}</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* gráfico */}
            <div className="rounded-xl border border-line bg-ink/40 p-4">
              <div className="flex h-24 items-end gap-2">
                {[40, 65, 50, 80, 60, 90, 72, 100, 84].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
                    className="flex-1 rounded-md bg-gradient-to-t from-brand-500/30 to-accent-400/80"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-line bg-ink/40 px-4 py-3">
              <CheckCircle2 size={16} className="text-accent-400" />
              <span className="text-xs text-mist">
                Tudo funcionando perfeitamente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* card de app mobile flutuante */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute -bottom-10 -left-2 hidden w-44 animate-float-slow sm:block"
      >
        <div className="rounded-2xl border border-line bg-surface/90 p-3 shadow-glow backdrop-blur">
          <div className="flex items-center gap-2 border-b border-line pb-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-ink">
              <Smartphone size={15} />
            </span>
            <div>
              <div className="h-2 w-16 rounded bg-white/20" />
              <div className="mt-1.5 h-2 w-10 rounded bg-white/10" />
            </div>
          </div>
          <div className="space-y-2 pt-3">
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="mt-3 h-8 rounded-lg bg-brand-gradient" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
