import { useEffect, useState } from "react";
import { X, LoaderCircle } from "lucide-react";
import { sanitizeText } from "../../lib/sanitize.js";
import { STATUS, CANAIS, TRILHAS, AVALIACOES } from "../../lib/supabase.js";

const VAZIO = {
  empresa: "",
  trilha: "",
  cidade: "",
  fonte: "",
  sinal_porte: "",
  vale_prototipo: "",
  contato: "",
  cargo: "",
  canal: "",
  data_primeiro_contato: "",
  status: "Não contatado",
  data_follow_up: "",
  proxima_acao: "",
  observacoes: "",
};

// Limites por campo. O banco já tem CHECK nos campos de lista; aqui é só para
// não mandar texto gigante numa caixa que deveria ser curta.
const LIMITES = {
  empresa: 120,
  cidade: 80,
  fonte: 120,
  sinal_porte: 400,
  contato: 80,
  cargo: 80,
  proxima_acao: 300,
  observacoes: 2000,
};

const rotulo = "mb-1.5 block text-xs uppercase tracking-wide text-mist";
const campo =
  "w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white outline-none transition focus:border-brand-400";

export default function FormProspect({ inicial, onSalvar, onFechar }) {
  const [dados, setDados] = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!inicial) return setDados(VAZIO);
    const preenchido = { ...VAZIO };
    for (const chave of Object.keys(VAZIO)) {
      preenchido[chave] = inicial[chave] ?? "";
    }
    setDados(preenchido);
  }, [inicial]);

  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [onFechar]);

  function definir(chave, valor) {
    setDados((atual) => ({ ...atual, [chave]: valor }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");

    const empresa = sanitizeText(dados.empresa, LIMITES.empresa, { singleLine: true });
    if (!empresa) return setErro("O nome da empresa é obrigatório.");

    // Campos de data vazios precisam virar null — string vazia quebra o tipo date.
    const limpo = {
      ...dados,
      empresa,
      cidade: sanitizeText(dados.cidade, LIMITES.cidade, { singleLine: true }),
      fonte: sanitizeText(dados.fonte, LIMITES.fonte, { singleLine: true }),
      sinal_porte: sanitizeText(dados.sinal_porte, LIMITES.sinal_porte),
      contato: sanitizeText(dados.contato, LIMITES.contato, { singleLine: true }),
      cargo: sanitizeText(dados.cargo, LIMITES.cargo, { singleLine: true }),
      proxima_acao: sanitizeText(dados.proxima_acao, LIMITES.proxima_acao),
      observacoes: sanitizeText(dados.observacoes, LIMITES.observacoes),
    };
    for (const chave of ["trilha", "vale_prototipo", "canal", "data_primeiro_contato", "data_follow_up"]) {
      if (!limpo[chave]) limpo[chave] = null;
    }

    setSalvando(true);
    const problema = await onSalvar(limpo);
    setSalvando(false);
    if (problema) setErro(problema);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={inicial ? "Editar prospect" : "Novo prospect"}
    >
      <form
        onSubmit={enviar}
        className="my-8 w-full max-w-2xl rounded-2xl border border-line bg-surface p-6"
        noValidate
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">
            {inicial ? "Editar prospect" : "Novo prospect"}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="rounded-lg p-2 text-mist transition hover:bg-ink hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="empresa" className={rotulo}>Empresa *</label>
            <input id="empresa" className={campo} value={dados.empresa}
              onChange={(e) => definir("empresa", e.target.value)}
              maxLength={LIMITES.empresa} required />
          </div>

          <div>
            <label htmlFor="trilha" className={rotulo}>Trilha</label>
            <select id="trilha" className={campo} value={dados.trilha}
              onChange={(e) => definir("trilha", e.target.value)}>
              <option value="">—</option>
              {TRILHAS.map((t) => (
                <option key={t.valor} value={t.valor}>{t.rotulo}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cidade" className={rotulo}>Cidade</label>
            <input id="cidade" className={campo} value={dados.cidade}
              onChange={(e) => definir("cidade", e.target.value)} maxLength={LIMITES.cidade} />
          </div>

          <div>
            <label htmlFor="fonte" className={rotulo}>Fonte</label>
            <input id="fonte" className={campo} value={dados.fonte}
              onChange={(e) => definir("fonte", e.target.value)} maxLength={LIMITES.fonte}
              placeholder="Google Maps, Econodata, indicação..." />
          </div>

          <div>
            <label htmlFor="vale_prototipo" className={rotulo}>Vale protótipo?</label>
            <select id="vale_prototipo" className={campo} value={dados.vale_prototipo}
              onChange={(e) => definir("vale_prototipo", e.target.value)}>
              <option value="">—</option>
              {AVALIACOES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sinal_porte" className={rotulo}>Sinal de porte</label>
            <textarea id="sinal_porte" rows={2} className={campo} value={dados.sinal_porte}
              onChange={(e) => definir("sinal_porte", e.target.value)} maxLength={LIMITES.sinal_porte}
              placeholder="Quantos técnicos, frota, nº de avaliações, selo de vendedor..." />
          </div>

          <div>
            <label htmlFor="contato" className={rotulo}>Contato</label>
            <input id="contato" className={campo} value={dados.contato}
              onChange={(e) => definir("contato", e.target.value)} maxLength={LIMITES.contato} />
          </div>

          <div>
            <label htmlFor="cargo" className={rotulo}>Cargo</label>
            <input id="cargo" className={campo} value={dados.cargo}
              onChange={(e) => definir("cargo", e.target.value)} maxLength={LIMITES.cargo} />
          </div>

          <div>
            <label htmlFor="canal" className={rotulo}>Canal</label>
            <select id="canal" className={campo} value={dados.canal}
              onChange={(e) => definir("canal", e.target.value)}>
              <option value="">—</option>
              {CANAIS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="status" className={rotulo}>Status</label>
            <select id="status" className={campo} value={dados.status}
              onChange={(e) => definir("status", e.target.value)}>
              {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="data_primeiro_contato" className={rotulo}>1º contato</label>
            <input id="data_primeiro_contato" type="date" className={campo}
              value={dados.data_primeiro_contato || ""}
              onChange={(e) => definir("data_primeiro_contato", e.target.value)} />
          </div>

          <div>
            <label htmlFor="data_follow_up" className={rotulo}>Follow-up</label>
            <input id="data_follow_up" type="date" className={campo}
              value={dados.data_follow_up || ""}
              onChange={(e) => definir("data_follow_up", e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="proxima_acao" className={rotulo}>Próxima ação</label>
            <input id="proxima_acao" className={campo} value={dados.proxima_acao}
              onChange={(e) => definir("proxima_acao", e.target.value)} maxLength={LIMITES.proxima_acao} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="observacoes" className={rotulo}>Observações</label>
            <textarea id="observacoes" rows={3} className={campo} value={dados.observacoes}
              onChange={(e) => definir("observacoes", e.target.value)} maxLength={LIMITES.observacoes} />
          </div>
        </div>

        {erro && <p role="alert" className="mt-4 text-sm text-red-400">{erro}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onFechar}
            className="rounded-lg border border-line px-4 py-2 text-sm text-mist transition hover:text-white">
            Cancelar
          </button>
          <button type="submit" disabled={salvando}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60">
            {salvando && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
