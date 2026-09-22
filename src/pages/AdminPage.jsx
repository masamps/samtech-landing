import { useCallback, useEffect, useMemo, useState } from "react";
import { LogOut, Plus, Pencil, Trash2, Search, LoaderCircle } from "lucide-react";
import { supabase, isConfigured, TABELA, STATUS, TRILHAS } from "../lib/supabase.js";
import AdminLogin from "../components/admin/AdminLogin.jsx";
import Funil from "../components/admin/Funil.jsx";
import FormProspect from "../components/admin/FormProspect.jsx";

const CORES_STATUS = {
  "Não contatado": "bg-white/5 text-mist",
  Contatado: "bg-brand-500/15 text-brand-300",
  Respondeu: "bg-accent-500/15 text-accent-300",
  "Em conversa": "bg-accent-500/20 text-accent-300",
  "Proposta enviada": "bg-amber-500/15 text-amber-300",
  Fechado: "bg-emerald-500/15 text-emerald-300",
  Descartado: "bg-white/5 text-mist/50",
};

function Etiqueta({ status }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-md px-2 py-1 text-xs ${CORES_STATUS[status] || "bg-white/5 text-mist"}`}>
      {status}
    </span>
  );
}

function dataBR(iso) {
  if (!iso) return "—";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

export default function AdminPage() {
  const [sessao, setSessao] = useState(undefined); // undefined = ainda verificando
  const [prospects, setProspects] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(null); // null = fechado, {} = novo
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroTrilha, setFiltroTrilha] = useState("");

  useEffect(() => {
    if (!isConfigured) return setSessao(null);
    supabase.auth.getSession().then(({ data }) => setSessao(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, s) => setSessao(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const carregar = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from(TABELA)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setErro("Não foi possível carregar os prospects.");
    else {
      setProspects(data || []);
      setErro("");
    }
    setCarregando(false);
  }, []);

  useEffect(() => {
    if (sessao) carregar();
  }, [sessao, carregar]);

  async function salvar(dados) {
    const { id, ...campos } = dados;
    const alvo = editando?.id;
    const { error } = alvo
      ? await supabase.from(TABELA).update(campos).eq("id", alvo)
      : await supabase.from(TABELA).insert(campos);
    if (error) return "Não foi possível salvar. Tente de novo.";
    setEditando(null);
    await carregar();
    return null;
  }

  async function remover(prospect) {
    const certeza = window.confirm(`Apagar "${prospect.empresa}"? Isso não volta.`);
    if (!certeza) return;
    const { error } = await supabase.from(TABELA).delete().eq("id", prospect.id);
    if (error) setErro("Não foi possível apagar.");
    else await carregar();
  }

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return prospects.filter((p) => {
      if (filtroStatus && p.status !== filtroStatus) return false;
      if (filtroTrilha && p.trilha !== filtroTrilha) return false;
      if (!termo) return true;
      return [p.empresa, p.cidade, p.contato, p.fonte]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(termo));
    });
  }, [prospects, busca, filtroStatus, filtroTrilha]);

  if (!isConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-lg font-semibold text-white">Painel não configurado</h1>
          <p className="mt-2 text-sm text-mist">
            Defina <code className="text-brand-300">VITE_SUPABASE_URL</code> e{" "}
            <code className="text-brand-300">VITE_SUPABASE_PUBLISHABLE_KEY</code> nas variáveis
            de ambiente do projeto na Vercel e publique de novo.
          </p>
        </div>
      </main>
    );
  }

  if (sessao === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <LoaderCircle className="h-5 w-5 animate-spin text-mist" aria-hidden="true" />
      </main>
    );
  }

  if (!sessao) return <AdminLogin />;

  const seletor =
    "rounded-lg border border-line bg-surface px-3 py-2 text-sm text-white outline-none focus:border-brand-400";

  return (
    <main className="min-h-screen bg-ink px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-white">Prospecção</h1>
            <p className="text-sm text-mist">{sessao.user.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditando({})}
              className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Novo
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-mist transition hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sair
            </button>
          </div>
        </header>

        <Funil prospects={prospects} />

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
              aria-hidden="true"
            />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar empresa, cidade, contato..."
              aria-label="Buscar"
              maxLength={80}
              className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-brand-400"
            />
          </div>
          <select aria-label="Filtrar por status" className={seletor}
            value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos os status</option>
            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select aria-label="Filtrar por trilha" className={seletor}
            value={filtroTrilha} onChange={(e) => setFiltroTrilha(e.target.value)}>
            <option value="">Todas as trilhas</option>
            {TRILHAS.map((t) => <option key={t.valor} value={t.valor}>{t.rotulo}</option>)}
          </select>
        </div>

        {erro && <p role="alert" className="mt-4 text-sm text-red-400">{erro}</p>}

        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-mist">
                <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                <th scope="col" className="px-4 py-3 font-medium">Trilha</th>
                <th scope="col" className="px-4 py-3 font-medium">Contato</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium">1º contato</th>
                <th scope="col" className="px-4 py-3 font-medium">Follow-up</th>
                <th scope="col" className="px-4 py-3 font-medium">Próxima ação</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-mist">Carregando...</td></tr>
              )}
              {!carregando && visiveis.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-mist">
                    {prospects.length === 0
                      ? "Nenhum prospect ainda. Comece pelo botão Novo."
                      : "Nenhum resultado para esse filtro."}
                  </td>
                </tr>
              )}
              {!carregando && visiveis.map((p) => (
                <tr key={p.id} className="border-b border-line/50 last:border-0 hover:bg-surface/50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-white">{p.empresa}</span>
                    {p.cidade && <span className="block text-xs text-mist">{p.cidade}</span>}
                  </td>
                  <td className="px-4 py-3 text-mist">{p.trilha || "—"}</td>
                  <td className="px-4 py-3 text-mist">
                    {p.contato || "—"}
                    {p.cargo && <span className="block text-xs text-mist/60">{p.cargo}</span>}
                  </td>
                  <td className="px-4 py-3"><Etiqueta status={p.status} /></td>
                  <td className="px-4 py-3 text-mist">{dataBR(p.data_primeiro_contato)}</td>
                  <td className="px-4 py-3 text-mist">{dataBR(p.data_follow_up)}</td>
                  <td className="max-w-[240px] px-4 py-3 text-mist">{p.proxima_acao || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button onClick={() => setEditando(p)} aria-label={`Editar ${p.empresa}`}
                      className="rounded-lg p-2 text-mist transition hover:bg-ink hover:text-white">
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button onClick={() => remover(p)} aria-label={`Apagar ${p.empresa}`}
                      className="rounded-lg p-2 text-mist transition hover:bg-ink hover:text-red-400">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-mist/60">
          {visiveis.length} de {prospects.length} prospects
        </p>
      </div>

      {editando && (
        <FormProspect
          inicial={editando.id ? editando : null}
          onSalvar={salvar}
          onFechar={() => setEditando(null)}
        />
      )}
    </main>
  );
}
