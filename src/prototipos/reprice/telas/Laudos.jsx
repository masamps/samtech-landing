import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { navegar, useEstado } from "../estado.jsx";
import { MODELOS, modeloPorId } from "../dados.js";
import { dataBR, hojeISO } from "../campos.js";
import { Botao, CarimboSituacao, Placa, Rotulo, TipoServico, Vazio, estiloEntrada } from "../componentes/Ui.jsx";

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const destino = (l) => (l.status === "rascunho" ? `#/laudos/${l.id}/editar` : `#/laudos/${l.id}`);

function Filtro({ opcoes, valor, aoMudar, rotulo }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1" role="group" aria-label={rotulo}>
      <Rotulo className="mr-2 w-[68px] sm:w-auto">{rotulo}</Rotulo>
      {opcoes.map(([v, r], i) => (
        <span key={v || "todos"} className="flex items-center">
          {i > 0 && <span className="px-1 text-linha-forte" aria-hidden="true">/</span>}
          <button
            type="button"
            aria-pressed={valor === v}
            onClick={() => aoMudar(v)}
            className={`px-1 font-cond text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors ${valor === v ? "grifo text-tinta" : "text-tinta-3 hover:text-tinta"}`}
          >
            {r}
          </button>
        </span>
      ))}
    </div>
  );
}

// Colunas do livro: nº | data | serviço | proprietário | veículo | situação | →
const GRADE = "lg:grid lg:grid-cols-[96px_104px_118px_minmax(0,1fr)_minmax(0,250px)_124px_28px] lg:items-center";

export default function Laudos() {
  const { estado } = useEstado();
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");

  const mes = hojeISO().slice(0, 7);
  const emitidosMes = estado.laudos.filter((l) => l.status === "emitido" && l.servico.dataEmissao?.startsWith(mes));
  const rascunhos = estado.laudos.filter((l) => l.status === "rascunho");
  const cancelados = estado.laudos.filter((l) => l.status === "cancelado");

  const lista = useMemo(() => {
    const termo = busca.trim().toUpperCase().replace(/[.\-/\s]/g, "");
    return estado.laudos
      .filter((l) => (!tipo || l.modeloId === tipo) && (!status || l.status === status))
      .filter((l) => {
        if (!termo) return true;
        const alvo = [l.numero, l.proprietario.nome, l.proprietario.doc, l.veiculo.placa, l.veiculo.vin, l.veiculo.marcaModelo]
          .filter(Boolean)
          .join("|")
          .toUpperCase()
          .replace(/[.\-/\s]/g, "");
        return alvo.includes(termo);
      })
      .sort((a, b) => {
        // Rascunhos no topo (pedem ação); depois do número mais recente ao mais antigo.
        const ra = a.status === "rascunho";
        const rb = b.status === "rascunho";
        if (ra !== rb) return ra ? -1 : 1;
        return (b.numero || 0) - (a.numero || 0);
      });
  }, [estado.laudos, busca, tipo, status]);

  const resumo = [
    [`Emitidos em ${MESES[Number(mes.slice(5)) - 1].slice(0, 3)}.`, String(emitidosMes.length).padStart(2, "0"), MODELOS.map((m) => `${emitidosMes.filter((l) => l.modeloId === m.id).length} ${m.contagem}`).join(" · ")],
    ["Rascunhos", String(rascunhos.length).padStart(2, "0"), rascunhos.length ? "aguardando emissão" : "nada pendente"],
    ["Cancelados", String(cancelados.length).padStart(2, "0"), "número mantido no livro"],
    ["Próximo nº", String(estado.numeracao.proximo), `sequência de ${estado.numeracao.ano}`],
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <Rotulo>Registro de {estado.numeracao.ano}</Rotulo>
          <h1 className="mt-1 font-cond text-[46px] font-bold uppercase leading-[0.9] tracking-[0.01em] sm:text-[60px]">Livro de laudos</h1>
        </div>
        <dl className="grid w-full grid-cols-2 border-[1.5px] border-tinta bg-papel-claro sm:w-auto sm:grid-cols-4">
          {resumo.map(([rotulo, valor, nota], i) => (
            <div key={rotulo} className={`border-tinta px-4 py-3 ${i % 2 ? "border-l-[1.5px] border-tinta" : ""} ${i > 1 ? "border-t-[1.5px] border-tinta sm:border-t-0" : ""} ${i === 2 ? "sm:border-l-[1.5px]" : ""} ${i === 3 ? "bg-sinal-claro" : ""}`}>
              <dt><Rotulo>{rotulo}</Rotulo></dt>
              <dd className="mt-0.5 font-mono text-[28px] font-semibold leading-none tabular-nums">{valor}</dd>
              <dd className="mt-1.5 font-mono text-[10.5px] text-tinta-3">{nota}</dd>
            </div>
          ))}
        </dl>
      </div>

      {rascunhos.length > 0 && !status && (
        <div className="mt-7 flex flex-wrap items-stretch border-[1.5px] border-tinta bg-sinal-claro">
          <span className="faixa-risco w-3 shrink-0" aria-hidden="true" />
          <p className="min-w-0 flex-1 px-4 py-3 text-[15px]">
            <span className="font-cond font-bold uppercase tracking-[0.08em]">Rascunho em aberto · </span>
            {rascunhos[0].proprietario.nome || "sem proprietário"}
            {rascunhos[0].veiculo.marcaModelo && <span className="text-tinta-2"> · {rascunhos[0].veiculo.marcaModelo}</span>}
            {rascunhos.length > 1 && <span className="text-tinta-2"> e mais {rascunhos.length - 1}</span>}
          </p>
          <div className="flex items-center px-3 py-2">
            <Botao variante="tinta" tamanho="sm" onClick={() => navegar(`/laudos/${rascunhos[0].id}/editar`)}>
              Continuar <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Botao>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <Rotulo>Buscar no livro</Rotulo>
          <Search className="pointer-events-none absolute bottom-3 left-1 h-4 w-4 text-tinta-3" aria-hidden="true" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="nº, proprietário, CPF, placa ou chassi" className={`${estiloEntrada()} pl-7`} />
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          <Filtro rotulo="Serviço" valor={tipo} aoMudar={setTipo} opcoes={[["", "Todos"], ...MODELOS.map((m) => [m.id, m.contagem])]} />
          <Filtro rotulo="Situação" valor={status} aoMudar={setStatus} opcoes={[["", "Todas"], ["rascunho", "Rascunho"], ["emitido", "Emitido"], ["cancelado", "Cancelado"]]} />
        </div>
      </div>

      {/* O livro: folha pautada com linha de margem, como os livros de registro. */}
      <div className="relative mt-4 border-[1.5px] border-tinta bg-papel-claro">
        <span className="pointer-events-none absolute inset-y-0 left-[96px] hidden w-[4px] border-x border-margem/70 lg:block" aria-hidden="true" />
        <div className={`hidden border-b-[1.5px] border-tinta py-2.5 ${GRADE}`}>
          {["Nº", "Data", "Serviço", "Proprietário", "Veículo", "Situação", ""].map((c, i) => (
            <Rotulo key={i} className={i === 0 ? "pl-5" : "pl-4"}>{c}</Rotulo>
          ))}
        </div>

        {lista.length === 0 ? (
          <Vazio titulo="Nada neste livro" texto="Nenhum laudo com essa busca ou filtro." />
        ) : (
          <ul>
            {lista.map((l) => {
              const modelo = modeloPorId(l.modeloId);
              const cancelado = l.status === "cancelado";
              return (
                <li key={l.id} className="border-b border-linha last:border-b-0">
                  <a href={destino(l)} className={`group block px-4 py-3.5 transition-colors hover:bg-sinal-claro/70 lg:px-0 lg:py-0 ${GRADE}`}>
                    <div className="flex items-start justify-between gap-3 lg:contents">
                      <span className={`font-mono text-[22px] font-semibold leading-none tabular-nums lg:py-4 lg:pl-5 ${cancelado ? "text-carimbo-vermelho line-through decoration-2" : ""}`}>
                        {l.numero || <span className="text-[15px] text-tinta-3">s/ nº</span>}
                      </span>
                      <span className="lg:hidden"><CarimboSituacao status={l.status} /></span>
                    </div>
                    <span className="mt-1 block font-mono text-[13px] tabular-nums text-tinta-2 lg:mt-0 lg:pl-4">
                      {l.status === "rascunho" ? "—" : dataBR(l.servico.dataEmissao)}
                    </span>
                    <span className="mt-2 block lg:mt-0 lg:pl-4"><TipoServico modelo={modelo} /></span>
                    <span className="mt-1 block min-w-0 lg:mt-0 lg:pl-4">
                      <span className="block truncate text-[15px] font-semibold">{l.proprietario.nome || <span className="font-normal italic text-tinta-3">sem proprietário</span>}</span>
                      <span className="block font-mono text-[11.5px] tabular-nums text-tinta-3">{l.proprietario.doc}</span>
                    </span>
                    <span className="mt-2 flex min-w-0 items-center gap-2.5 lg:mt-0 lg:pl-4">
                      <Placa placa={l.veiculo.placa} />
                      <span className="truncate text-[13px] text-tinta-2">{l.veiculo.marcaModelo}</span>
                    </span>
                    <span className="hidden lg:block lg:pl-4"><CarimboSituacao status={l.status} /></span>
                    <ArrowRight className="hidden h-4 w-4 text-tinta-3 transition group-hover:translate-x-0.5 group-hover:text-tinta lg:block" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <p className="mt-2 text-right font-mono text-[11px] text-tinta-3">{lista.length} de {estado.laudos.length} registros</p>
    </div>
  );
}
