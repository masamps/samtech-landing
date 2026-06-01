import {
  BarChart3,
  Battery,
  Bell,
  CreditCard,
  Home,
  PieChart,
  Plus,
  Send,
  ShoppingBag,
  SignalHigh,
  User,
  Users,
  Wifi,
} from "lucide-react";

/* ---------- iPhone (aba "App Mobile") ---------- */
export function PhoneMockup() {
  const actions = [
    { icon: Plus, label: "Adicionar" },
    { icon: Send, label: "Enviar" },
    { icon: CreditCard, label: "Cartão" },
    { icon: PieChart, label: "Metas" },
  ];
  const tx = [
    { name: "Mercado", time: "Hoje, 14:20", value: "- R$ 48" },
    { name: "Salário", time: "Ontem", value: "+ R$ 5.200", up: true },
  ];

  return (
    <div className="relative mx-auto w-[226px] select-none">
      <div className="rounded-[2.6rem] border border-white/15 bg-[#0b0b11] p-2 shadow-card">
        <div className="relative h-[468px] overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-[#101219] to-[#0a0a0f]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <SignalHigh size={11} />
              <Wifi size={11} />
              <Battery size={13} />
            </div>
          </div>

          {/* conteúdo do app */}
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-mist">Bom dia 👋</p>
                <p className="text-sm font-semibold text-white">Sua carteira</p>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">
                <Bell size={14} />
              </span>
            </div>

            {/* saldo */}
            <div className="mt-4 rounded-2xl bg-brand-gradient p-4 text-ink">
              <p className="text-[10px] font-medium opacity-80">Saldo total</p>
              <p className="mt-0.5 text-2xl font-bold">R$ 12.480</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg bg-black/15 px-2.5 py-1 text-[10px] font-semibold">
                  Receber
                </span>
                <span className="rounded-lg bg-black/15 px-2.5 py-1 text-[10px] font-semibold">
                  Enviar
                </span>
              </div>
            </div>

            {/* ações rápidas */}
            <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
              {actions.map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5 text-brand-300">
                    <a.icon size={15} />
                  </span>
                  <span className="text-[8px] text-mist">{a.label}</span>
                </div>
              ))}
            </div>

            {/* transações */}
            <p className="mt-5 text-[11px] font-semibold text-white">Transações</p>
            <div className="mt-2 space-y-2">
              {tx.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] p-2.5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-accent-300">
                    <ShoppingBag size={14} />
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-white">{t.name}</p>
                    <p className="text-[9px] text-mist">{t.time}</p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${
                      t.up ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* barra inferior */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-line bg-[#0b0b11]/95 px-6 py-3 backdrop-blur">
            <Home size={18} className="text-white" />
            <BarChart3 size={18} className="text-mist" />
            <span className="grid h-9 w-9 -translate-y-1 place-items-center rounded-full bg-brand-gradient text-ink shadow-glow">
              <Plus size={18} />
            </span>
            <CreditCard size={18} className="text-mist" />
            <User size={18} className="text-mist" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Janela de navegador (base para web e site) ---------- */
function BrowserChrome({ url, children }) {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface/80 shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-ink/60 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="ml-3 flex flex-1 items-center justify-center rounded-md border border-line bg-surface px-3 py-1 text-[10px] text-mist">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ---------- Sistema Web (aba "Sistema Web") ---------- */
export function WebMockup() {
  const nav = [
    { icon: Home, label: "Visão geral", active: true },
    { icon: BarChart3, label: "Relatórios" },
    { icon: Users, label: "Clientes" },
    { icon: CreditCard, label: "Faturas" },
  ];
  const metrics = [
    { label: "Receita", value: "R$ 128k" },
    { label: "Pedidos", value: "1.204" },
    { label: "Conversão", value: "+24%" },
  ];

  return (
    <BrowserChrome url="app.suaempresa.com">
      <div className="grid grid-cols-[132px_1fr]">
        {/* sidebar */}
        <aside className="flex flex-col gap-1 border-r border-line p-3">
          <div className="mb-2 flex items-center gap-1.5 px-1">
            <span className="h-5 w-5 rounded-md bg-brand-gradient" />
            <span className="h-2 w-12 rounded bg-white/20" />
          </div>
          {nav.map((n) => (
            <span
              key={n.label}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                n.active ? "bg-brand-500/15 text-white" : "text-mist"
              }`}
            >
              <n.icon size={13} />
              {n.label}
            </span>
          ))}
        </aside>

        {/* conteúdo */}
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div className="h-3 w-28 rounded bg-white/20" />
            <span className="rounded-md bg-brand-gradient px-2.5 py-1 text-[10px] font-semibold text-ink">
              Novo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-line bg-ink/40 p-2.5">
                <p className="text-[9px] text-mist">{m.label}</p>
                <p className="mt-0.5 text-sm font-bold text-white">{m.value}</p>
              </div>
            ))}
          </div>

          {/* gráfico */}
          <div className="rounded-lg border border-line bg-ink/40 p-3">
            <div className="flex h-20 items-end gap-1.5">
              {[45, 70, 55, 85, 60, 95, 78, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-brand-500/40 to-accent-400/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* tabela */}
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-line bg-ink/30 p-2"
              >
                <span className="h-6 w-6 rounded-full bg-white/10" />
                <span className="h-2 flex-1 rounded bg-white/15" />
                <span className="h-2 w-10 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ---------- Site / Landing (aba "Site") ---------- */
export function SiteMockup() {
  return (
    <BrowserChrome url="www.suaempresa.com.br">
      <div className="bg-gradient-to-b from-[#0d0d13] to-[#0a0a0f]">
        {/* nav */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-md bg-brand-gradient" />
            <span className="h-2 w-14 rounded bg-white/25" />
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {[10, 12, 10].map((w, i) => (
              <span key={i} className="h-1.5 rounded bg-white/15" style={{ width: w }} />
            ))}
            <span className="rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-ink">
              Contato
            </span>
          </div>
        </div>

        {/* hero */}
        <div className="flex flex-col items-center px-5 py-8 text-center">
          <span className="rounded-full border border-line px-2.5 py-0.5 text-[8px] text-mist">
            ✦ Sua empresa online
          </span>
          <div className="mt-3 h-4 w-3/4 rounded bg-white/25" />
          <div className="mt-2 h-4 w-1/2 rounded bg-white/15" />
          <div className="mt-3 h-1.5 w-2/3 rounded bg-white/10" />
          <div className="mt-4 flex gap-2">
            <span className="rounded-lg bg-brand-gradient px-3 py-1.5 text-[9px] font-semibold text-ink">
              Começar agora
            </span>
            <span className="rounded-lg border border-line px-3 py-1.5 text-[9px] text-mist">
              Saiba mais
            </span>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-3 gap-2 px-5 pb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-white/[0.03] p-3">
              <span className="block h-7 w-7 rounded-lg bg-brand-gradient" />
              <div className="mt-2.5 h-1.5 w-full rounded bg-white/20" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}
