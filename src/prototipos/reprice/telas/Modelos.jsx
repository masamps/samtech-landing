import { useMemo } from "react";
import { useEstado, laudoVazio } from "../estado.jsx";
import { CAMPOS_VEICULO, DECLARACAO_PADRAO, MODELOS, camposDoModelo } from "../dados.js";
import { Botao, Rotulo, TipoServico } from "../componentes/Ui.jsx";
import { Previa } from "../componentes/Previa.jsx";

export default function Modelos() {
  const { estado, acoes } = useEstado();
  const vazios = useMemo(() => Object.fromEntries(MODELOS.map((m) => [m.id, laudoVazio(m.id)])), []);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:pt-10">
      <Rotulo>Documentos</Rotulo>
      <h1 className="mt-1 font-cond text-[46px] font-bold uppercase leading-[0.9] sm:text-[60px]">Modelos de laudo</h1>
      <p className="mt-3 max-w-2xl text-[15px] text-tinta-2">Cada serviço tem o seu laudo, com os campos e as fotos certos. O texto da declaração pode ser ajustado aqui e vale para os próximos laudos.</p>

      <div className="mt-8 space-y-8">
        {MODELOS.map((m, i) => {
          const exemplo = estado.laudos.find((l) => l.modeloId === m.id && l.status === "emitido") || vazios[m.id];
          const texto = estado.declaracoes[m.id];
          return (
            <section key={m.id} className="grid border-[1.5px] border-tinta bg-papel-claro lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="bg-tinta px-2 py-0.5 font-mono text-[12px] font-semibold text-sinal">0{i + 1}</span>
                  <TipoServico modelo={m} />
                  {m.validado ? (
                    <span className="carimbo text-[11px] text-carimbo-verde">Igual ao atual</span>
                  ) : (
                    <span className="carimbo text-[11px] text-tinta-3 [border-style:dashed]">Proposta</span>
                  )}
                </div>
                <h2 className="mt-3 font-cond text-[32px] font-bold uppercase leading-none">{m.nome}</h2>
                {!m.validado && <p className="mt-2 text-[14px] text-tinta-2">Montado com os campos que esse serviço exige. Ajustamos assim que vocês mandarem o laudo atual.</p>}

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <Rotulo>Dados do veículo</Rotulo>
                    <ul className="mt-2 border-t border-linha">
                      {camposDoModelo(m).map((c) => (
                        <li key={c} className="border-b border-linha py-1.5 text-[14px]">{CAMPOS_VEICULO[c].rotulo}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Rotulo>Fotos</Rotulo>
                    <ul className="mt-2 border-t border-linha">
                      {m.fotos.flatMap((b) => b.slots).map((s) => (
                        <li key={s.chave} className="border-b border-linha py-1.5 text-[14px]">{s.rotulo.charAt(0) + s.rotulo.slice(1).toLowerCase()}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-end justify-between gap-3">
                    <label htmlFor={`decl-${m.id}`}><Rotulo>Texto da declaração</Rotulo></label>
                    {texto !== DECLARACAO_PADRAO && (
                      <Botao variante="texto" className="text-[13px]" onClick={() => acoes.atualizarDeclaracao(m.id, DECLARACAO_PADRAO)}>Voltar ao original</Botao>
                    )}
                  </div>
                  {/* Papel pautado: cada linha do texto cai sobre uma linha da pauta. */}
                  <textarea
                    id={`decl-${m.id}`}
                    rows={4}
                    value={texto}
                    onChange={(e) => acoes.atualizarDeclaracao(m.id, e.target.value)}
                    className="mt-1 block w-full resize-y border-[1.5px] border-tinta bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_25px,#D2C9B7_25px,#D2C9B7_26px)] bg-white px-3 pt-[3px] font-serif text-[15px] leading-[26px] outline-none focus:bg-[#FFFDF5]"
                  />
                </div>
              </div>
              <div className="border-t-[1.5px] border-tinta bg-papel-escuro p-4 lg:border-l-[1.5px] lg:border-t-0">
                <Rotulo>Como sai impresso</Rotulo>
                <div className="mt-2">
                  <Previa laudo={exemplo} larguraMaxima={306} />
                </div>
              </div>
            </section>
          );
        })}

        <div className="border-[1.5px] border-dashed border-tinta-3 px-5 py-5 text-[15px] text-tinta-2">
          <span className="font-cond text-[18px] font-bold uppercase tracking-[0.06em] text-tinta">Outro serviço? </span>
          Novos modelos entram no sistema conforme vocês precisarem, com os campos e as fotos que cada um exige.
        </div>
      </div>
    </div>
  );
}
