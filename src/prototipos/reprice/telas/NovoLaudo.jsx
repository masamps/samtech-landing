import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CAMPOS_VEICULO, MODELOS, camposDoModelo, slotsDoModelo } from "../dados.js";
import { laudoVazio, navegar, useEstado } from "../estado.jsx";
import { Placa, Rotulo, TipoServico } from "../componentes/Ui.jsx";
import { Previa } from "../componentes/Previa.jsx";

// Dados que outra tela quer levar para o novo laudo (ex.: "novo laudo para
// este cliente"). Consumido uma única vez, na criação do rascunho.
let preenchimento = null;
export const prepararNovoLaudo = (base) => {
  preenchimento = base;
  navegar("/laudos/novo");
};

/*
 * Em vez de um menu de opções, os três documentos em branco lado a lado:
 * escolhe-se o serviço olhando o laudo que vai ser preenchido.
 */
export default function NovoLaudo() {
  const { estado, acoes } = useEstado();
  const exemplos = useMemo(() => MODELOS.map((m) => laudoVazio(m.id)), []);

  function criar(modeloId) {
    // Repete a CIRETRAN e o responsável do último laudo: quase sempre são os mesmos.
    const ultimo = [...estado.laudos].sort((a, b) => (b.criadoEm || "").localeCompare(a.criadoEm || ""))[0];
    const laudo = laudoVazio(modeloId, {
      autorizacao: ultimo ? { ciretran: ultimo.autorizacao.ciretran, responsavel: ultimo.autorizacao.responsavel } : {},
      ...preenchimento,
    });
    preenchimento = null;
    acoes.salvarLaudo(laudo);
    navegar(`/laudos/${laudo.id}/editar`);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:pt-10">
      <a href="#/laudos" className="inline-flex items-center gap-1.5 font-cond text-[15px] font-semibold uppercase tracking-[0.1em] text-tinta-2 hover:text-tinta">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Livro
      </a>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Rotulo>Novo laudo</Rotulo>
          <h1 className="mt-1 font-cond text-[42px] font-bold uppercase leading-[0.92] sm:text-[56px]">Qual serviço foi feito?</h1>
        </div>
        {preenchimento?.proprietario?.nome && (
          <div className="flex items-center gap-3 border-[1.5px] border-tinta bg-sinal-claro px-4 py-2.5">
            <Rotulo className="text-tinta-2">Para</Rotulo>
            <span className="font-semibold">{preenchimento.proprietario.nome}</span>
            {preenchimento.veiculo?.placa && <Placa placa={preenchimento.veiculo.placa} />}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {MODELOS.map((m, i) => {
          const extras = camposDoModelo(m).filter((c) => !["vin", "marcaModelo", "fabModelo", "placa"].includes(c));
          return (
            <button key={m.id} type="button" onClick={() => criar(m.id)} className="group flex flex-col text-left outline-none">
              <div className="relative border-[1.5px] border-tinta bg-papel-escuro p-3 transition duration-150 group-hover:-translate-y-1 group-hover:bg-sinal group-hover:shadow-[5px_5px_0_#17140F] group-focus-visible:bg-sinal">
                <span className="absolute -left-[1.5px] -top-[1.5px] z-10 bg-tinta px-2 py-0.5 font-mono text-[11px] font-semibold text-sinal">0{i + 1}</span>
                <div className="pointer-events-none">
                  <Previa laudo={exemplos[i]} larguraMaxima={420} sombra={false} />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <TipoServico modelo={m} />
                  <h2 className="mt-1 font-cond text-[26px] font-bold uppercase leading-none">{m.nome}</h2>
                </div>
                <span className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center border-[1.5px] border-tinta transition group-hover:bg-tinta group-hover:text-sinal">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-tinta-2">{m.descricao}</p>
              <p className="mt-2 font-mono text-[11.5px] uppercase leading-relaxed text-tinta-3">
                {slotsDoModelo(m).length} fotos
                {extras.length > 0 && ` · + ${extras.map((c) => CAMPOS_VEICULO[c].rotulo.toLowerCase()).join(", ")}`}
              </p>
              {!m.validado && (
                <p className="mt-2 border-l-[3px] border-sinal pl-2 text-[13px] text-tinta-2">Modelo proposto — ajustamos ao laudo de vocês.</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
