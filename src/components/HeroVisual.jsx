import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  CreditCard,
  Monitor,
  Search,
  Smartphone,
  Store,
  Users,
} from "lucide-react";
import { PhoneMockup } from "./ServiceMockups.jsx";

const views = [
  { id: "web", label: "Sistema Web", icon: Monitor },
  { id: "app", label: "Aplicativo", icon: Smartphone },
];

/* ---------- Painel no navegador ---------- */
function WebView() {
  const nav = [
    { icon: BarChart3, label: "Visão geral", active: true },
    { icon: Users, label: "Clientes" },
    { icon: CreditCard, label: "Faturas" },
    { icon: Store, label: "Produtos" },
  ];

  return (
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
          {nav.map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
                item.active ? "bg-brand-500/15 text-white" : "text-mist"
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
              <p className="text-lg font-semibold text-white">
                Seu negócio em tempo real
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-medium text-accent-300">
              <Activity size={13} /> Ao vivo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Receita", value: "R$ 128k" },
              { label: "Pedidos", value: "1.204" },
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

          <div className="rounded-xl border border-line bg-ink/40 p-4">
            <div className="flex h-24 items-end gap-2">
              {[40, 65, 50, 80, 60, 90, 72, 100, 84].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
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
  );
}

/* ---------- Aplicativo mobile ---------- */
function AppView() {
  const perks = [
    { icon: Smartphone, title: "Android e iOS", text: "Um app para as duas lojas" },
    { icon: Bell, title: "Notificações", text: "Avise o cliente na hora certa" },
    { icon: Activity, title: "Sincronizado", text: "Mesmos dados do sistema web" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 rounded-2xl border border-line bg-surface/40 p-8 sm:p-10 lg:flex-row lg:gap-14">
      <PhoneMockup />

      <ul className="flex w-full max-w-xs flex-col gap-4">
        {perks.map((p) => (
          <li
            key={p.title}
            className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-brand-300">
              <p.icon size={17} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">
                {p.title}
              </span>
              <span className="text-xs text-mist">{p.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Alternador ---------- */
export default function HeroVisual() {
  const [view, setView] = useState("web");

  return (
    <div className="relative">
      {/* realce sutil atrás do produto */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 -z-10 mx-auto h-56 w-3/4 rounded-full bg-brand-500/15 blur-[120px]" />

      {/* seletor web / app */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div
          role="tablist"
          aria-label="Alternar entre sistema web e aplicativo"
          className="inline-flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur"
        >
          {views.map((v) => {
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setView(v.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-ink"
                    : "text-mist hover:text-white"
                }`}
              >
                <v.icon size={15} />
                {v.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-mist">
          Clique para ver os dois formatos que entregamos
        </p>
      </div>

      {/* conteúdo */}
      <div className="flex min-h-[420px] items-center sm:min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {view === "web" ? <WebView /> : <AppView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
