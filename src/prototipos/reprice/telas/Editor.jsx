import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ListChecks, Search, X, FileCheck2, Trash2 } from "lucide-react";
import { navegar, useEstado } from "../estado.jsx";
import { MODELOS, modeloPorId } from "../dados.js";
import { UFS, codigoEtiqueta, problemaPlaca, problemaVin } from "../campos.js";
import { camposDoLaudo, problemaDoCampo, sugestoesPara } from "../camposLaudo.js";
import { Botao, CarimboSituacao, Modal, Placa, Quadro, Rotulo, Segmentos, TipoServico, estiloEntrada, useAviso, useMedia } from "../componentes/Ui.jsx";
import { Previa } from "../componentes/Previa.jsx";
import { marcarRecemEmitido } from "./VerLaudo.jsx";

const SECOES = { modelo: "Autorização", a: "Autorização", p: "Proprietário", v: "Veículo", f: "Fotos", s: "Serviço" };
const secaoDe = (id) => SECOES[id.split(".")[0]];

/* ---------------- Peças da coluna de apoio ---------------- */

function ResultadoCadastro({ s, aoEscolher }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => aoEscolher(s.cliente, s.veiculo)}
      className="flex w-full items-center gap-3 border-b border-linha px-1 py-2.5 text-left last:border-b-0 hover:bg-sinal-claro"
    >
      {s.veiculo ? <Placa placa={s.veiculo.placa} /> : <span className="w-[82px] font-mono text-[11px] text-tinta-3">CLIENTE</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold">{s.cliente.nome}</span>
        <span className="block truncate font-mono text-[11.5px] text-tinta-3">{s.veiculo ? s.veiculo.marcaModelo : s.cliente.doc}</span>
      </span>
    </button>
  );
}

function BuscaCadastro({ aoEscolher }) {
  const { estado } = useEstado();
  const [termo, setTermo] = useState("");
  const resultados = useMemo(() => {
    const t = termo.trim().toUpperCase();
    const d = t.replace(/\W/g, "");
    if (t.length < 2) return [];
    const porVeiculo = estado.veiculos
      .filter((v) => v.placa.replace("-", "").includes(d) || v.vin.includes(d))
      .map((v) => ({ veiculo: v, cliente: estado.clientes.find((c) => c.id === v.clienteId) }));
    const porCliente = estado.clientes
      .filter((c) => c.nome.includes(t) || (d.length >= 3 && /^\d+$/.test(d) && c.doc.replace(/\D/g, "").includes(d)))
      .map((c) => ({ cliente: c, veiculo: null }));
    return [...porVeiculo, ...porCliente].filter((r) => r.cliente).slice(0, 5);
  }, [termo, estado]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Buscar no cadastro</span>
        <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta-3" aria-hidden="true" />
        <input value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Nome, CPF, placa ou chassi" className={`${estiloEntrada()} pl-7`} />
      </label>
      {termo.trim().length >= 2 && (
        <div className="mt-2">
          {resultados.length ? (
            resultados.map((s) => (
              <ResultadoCadastro
                key={`${s.cliente.id}${s.veiculo?.id || ""}`}
                s={s}
                aoEscolher={(c, v) => {
                  aoEscolher(c, v);
                  setTermo("");
                }}
              />
            ))
          ) : (
            <p className="px-1 py-2 text-[13px] text-tinta-3">Não está no cadastro. Preencha no laudo — ele entra no cadastro ao emitir.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Etiqueta({ vin }) {
  return (
    <div className="flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#6b6e72,#2d2f31)] px-4 py-5">
      <span className="rotate-[-1.5deg] rounded-[5px] bg-[#f4f4f2] px-4 py-1.5 font-mono text-[20px] tracking-[0.12em] text-[#2b2b2b] shadow-[0_2px_4px_rgba(0,0,0,0.4)]">*{codigoEtiqueta(vin)}*</span>
    </div>
  );
}

function Conferencia({ campos, problemas, visiveis, aoIr }) {
  let secaoAnterior = null;
  return (
    <ol className="-mx-1">
      {campos
        .filter((d) => d.obrigatorio)
        .map((d) => {
          const secao = secaoDe(d.id);
          const cabecalho = secao !== secaoAnterior;
          secaoAnterior = secao;
          const feito = !problemas[d.id];
          const erro = !feito && visiveis[d.id];
          return (
            <li key={d.id}>
              {cabecalho && <Rotulo className="mb-1 mt-3 block px-1 first:mt-0">{secao}</Rotulo>}
              <button type="button" onClick={() => aoIr(d.id)} className="flex w-full items-start gap-2.5 px-1 py-1.5 text-left hover:bg-sinal-claro">
                <span
                  className={`mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center border-[1.5px] ${feito ? "border-tinta bg-tinta text-sinal" : erro ? "border-carimbo-vermelho text-carimbo-vermelho" : "border-tinta-3"}`}
                  aria-hidden="true"
                >
                  {feito ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : erro ? <span className="text-[10px] font-bold leading-none">!</span> : null}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[14px] leading-snug ${feito ? "text-tinta-3 line-through decoration-tinta-3/50" : "font-medium"}`}>{d.rotulo}</span>
                  {erro && <span className="block text-[12.5px] leading-snug text-carimbo-vermelho">{erro}</span>}
                </span>
              </button>
            </li>
          );
        })}
    </ol>
  );
}

function SugestoesDoCampo({ def, laudo, estado, aoTexto, aoCadastro }) {
  const lista = sugestoesPara(def, def.ler(laudo), estado);
  if (!lista.length) return null;
  return (
    <div className="mt-3">
      <Rotulo>{lista[0].tipo === "cadastro" ? "Do cadastro" : "Usados antes"}</Rotulo>
      <div className="mt-1">
        {lista.map((s, i) =>
          s.tipo === "cadastro" ? (
            <ResultadoCadastro key={i} s={s} aoEscolher={aoCadastro} />
          ) : (
            <button key={i} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => aoTexto(s.valor)} className="block w-full border-b border-linha px-1 py-2 text-left font-mono text-[13px] last:border-b-0 hover:bg-sinal-claro">
              {s.valor}
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* ---------------- Folha de edição (celular) ---------------- */

function FolhaCampo({ def, laudo, estado, posicao, total, erro, aoMudar, aoCadastro, aoAnterior, aoProximo, aoFechar }) {
  const entrada = useRef(null);
  useEffect(() => {
    entrada.current?.focus({ preventScroll: true });
  }, [def.id]);
  const valor = def.ler(laudo);
  const mudar = (v) => aoMudar(def.mascara ? def.mascara(v) : v);
  const classe = `${estiloEntrada(erro)} text-[18px] ${def.mono ? "font-mono" : ""} uppercase`;

  let controle;
  if (def.tipo === "modelo") {
    controle = (
      <div className="mt-2 grid gap-2">
        {MODELOS.map((m) => (
          <button key={m.id} type="button" onClick={() => aoMudar(m.id)} className={`flex items-center justify-between border-[1.5px] px-3 py-2.5 text-left ${valor === m.id ? "border-tinta bg-sinal-claro" : "border-linha-forte"}`}>
            <span className="font-cond text-[17px] font-semibold uppercase tracking-[0.04em]">{m.nome}</span>
            {valor === m.id && <Check className="h-4 w-4" aria-hidden="true" />}
          </button>
        ))}
      </div>
    );
  } else if (def.tipo === "uf") {
    controle = (
      <select ref={entrada} value={valor} onChange={(e) => aoMudar(e.target.value)} className={classe} aria-label={def.rotulo}>
        {UFS.map((uf) => <option key={uf}>{uf}</option>)}
      </select>
    );
  } else if (def.tipo === "data") {
    controle = <input ref={entrada} type="date" value={valor} onChange={(e) => aoMudar(e.target.value)} className={classe} aria-label={def.rotulo} />;
  } else {
    controle = (
      <input
        ref={entrada}
        value={valor}
        onChange={(e) => mudar(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && aoProximo()}
        placeholder={def.placeholder}
        inputMode={def.inputMode}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        enterKeyHint="next"
        className={classe}
        aria-label={def.rotulo}
      />
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[1.5px] border-tinta bg-papel-claro shadow-[0_-10px_30px_-12px_rgba(23,20,15,0.4)]" role="dialog" aria-label={`Editar ${def.rotulo}`}>
      <div className="faixa-risco h-[4px]" aria-hidden="true" />
      <div className="max-h-[58vh] overflow-y-auto px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Rotulo>Campo {posicao} de {total}</Rotulo>
            <p className="font-cond text-[22px] font-bold uppercase leading-tight tracking-[0.03em]">{def.rotulo}</p>
          </div>
          <button type="button" onClick={aoFechar} aria-label="Fechar" className="-mr-1 p-2 hover:bg-sinal-claro">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {controle}
        {(erro || def.dica) && <p className={`mt-2 text-[13.5px] leading-snug ${erro ? "text-carimbo-vermelho" : "text-tinta-3"}`}>{erro || def.dica}</p>}
        <SugestoesDoCampo def={def} laudo={laudo} estado={estado} aoTexto={aoMudar} aoCadastro={aoCadastro} />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Botao icone={ArrowLeft} onClick={aoAnterior} disabled={posicao === 1}>Anterior</Botao>
          <Botao variante="primario" onClick={aoProximo}>
            {posicao === total ? "Pronto" : "Próximo"} {posicao !== total && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </Botao>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Editor ---------------- */

export default function Editor({ id }) {
  const { estado, acoes } = useEstado();
  const avisar = useAviso();
  const laudo = estado.laudos.find((l) => l.id === id);
  const linha = useMedia("(min-width: 1024px) and (pointer: fine)");
  const modo = linha ? "linha" : "toque";

  const [ativo, setAtivo] = useState(null);
  const [folha, setFolha] = useState(null);
  const [tocados, setTocados] = useState(() => new Set());
  const [tentouEmitir, setTentouEmitir] = useState(false);
  const [modal, setModal] = useState(null);
  const ultimaPlaca = useRef("");

  useEffect(() => {
    if (laudo && laudo.status !== "rascunho") navegar(`/laudos/${laudo.id}`);
  }, [laudo]);

  const modelo = modeloPorId(laudo?.modeloId);
  const campos = useMemo(() => camposDoLaudo(modelo), [modelo]);
  const mapa = useMemo(() => new Map(campos.map((d) => [d.id, d])), [campos]);
  const problemas = useMemo(() => {
    if (!laudo) return {};
    const p = {};
    for (const d of campos) {
      const msg = problemaDoCampo(d, laudo);
      if (msg) p[d.id] = msg;
    }
    return p;
  }, [laudo, campos]);

  const alterar = useCallback((fn) => acoes.alterarLaudo(id, fn), [acoes, id]);

  const usarCadastro = useCallback(
    (cliente, veiculo) => {
      const { id: _c, ...dono } = cliente;
      let dados = null;
      if (veiculo) {
        const { id: _v, clienteId, ...resto } = veiculo;
        dados = resto;
        ultimaPlaca.current = veiculo.placa;
      }
      alterar((l) => ({ ...l, proprietario: { ...l.proprietario, ...dono }, veiculo: dados ? { ...l.veiculo, ...dados } : l.veiculo }));
      avisar(veiculo ? `${veiculo.placa}: dono e veículo preenchidos pelo cadastro.` : "Proprietário preenchido pelo cadastro.");
    },
    [alterar, avisar]
  );

  const mudarCampo = useCallback(
    (campoId, valor) => {
      const def = mapa.get(campoId);
      alterar((l) => def.gravar(l, valor));
      if (campoId !== "v.placa" || problemaPlaca(valor) || valor === ultimaPlaca.current) return;
      // Placa completa e já conhecida: puxa o veículo, e o dono se ainda estiver em branco.
      ultimaPlaca.current = valor;
      const veiculo = estado.veiculos.find((v) => v.placa === valor);
      if (!veiculo) return;
      const { id: _v, clienteId, ...dados } = veiculo;
      const dono = estado.clientes.find((c) => c.id === clienteId);
      alterar((l) => {
        const novo = { ...l, veiculo: { ...l.veiculo, ...dados } };
        if (!l.proprietario.nome && dono) {
          const { id: _c, ...resto } = dono;
          novo.proprietario = { ...l.proprietario, ...resto };
        }
        return novo;
      });
      avisar(`${valor} já passou por aqui — veículo preenchido pelo cadastro.`);
    },
    [mapa, alterar, estado.veiculos, estado.clientes, avisar]
  );

  const digitaveis = useMemo(() => campos.filter((d) => d.tipo !== "foto" && d.tipo !== "remarcador"), [campos]);

  const focar = useCallback(
    (campoId) => {
      const el = document.querySelector(`[data-campo="${campoId}"]`);
      if (!el) return;
      if (modo === "toque") {
        const def = mapa.get(campoId);
        if (def && def.tipo !== "foto" && def.tipo !== "remarcador") {
          setFolha(campoId);
          setAtivo(campoId);
        }
        // Deixa a célula no terço de cima, acima da folha de edição.
        const topo = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: topo, behavior: "smooth" });
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(() => el.focus({ preventScroll: true }), 220);
    },
    [modo, mapa]
  );

  const edicao = useMemo(() => {
    const visiveis = {};
    for (const [k, msg] of Object.entries(problemas)) if (tentouEmitir || tocados.has(k)) visiveis[k] = msg;
    return {
      modo,
      campos: mapa,
      ativo,
      problemas: visiveis,
      pendentes: new Set(Object.keys(problemas)),
      aoFocar: setAtivo,
      aoSair: (campoId) => setTocados((t) => (t.has(campoId) ? t : new Set(t).add(campoId))),
      aoMudar: mudarCampo,
      aoErro: (msg) => avisar(msg, "alerta"),
      aoTocar: focar,
      aoAvancar: (campoId) => {
        const i = campos.findIndex((d) => d.id === campoId);
        const proximo = campos.slice(i + 1).find((d) => d.tipo !== "remarcador");
        if (proximo) focar(proximo.id);
      },
    };
  }, [modo, mapa, ativo, problemas, tentouEmitir, tocados, mudarCampo, avisar, focar, campos]);

  if (!laudo) {
    return (
      <div className="px-6 py-16 text-center">
        Rascunho não encontrado. <a className="font-semibold underline" href="#/laudos">Voltar ao livro</a>
      </div>
    );
  }

  const obrigatorios = campos.filter((d) => d.obrigatorio);
  const feitos = obrigatorios.filter((d) => !problemas[d.id]).length;
  const total = obrigatorios.length;
  const nPendencias = Object.keys(problemas).length;
  const defAtivo = ativo ? mapa.get(ativo) : null;
  const etaPronta = laudo.modeloId === "eta" && !problemaVin(laudo.veiculo.vin);

  function pedirEmissao() {
    setTentouEmitir(true);
    setFolha(null);
    setModal(nPendencias ? "pendencias" : "confirmar");
  }

  function emitir() {
    const numero = `${estado.numeracao.proximo}/${estado.numeracao.ano}`;
    acoes.emitir(laudo.id);
    marcarRecemEmitido(laudo.id);
    avisar(`Laudo ${numero} emitido.`);
    navegar(`/laudos/${laudo.id}`);
  }

  const posicaoFolha = folha ? digitaveis.findIndex((d) => d.id === folha) : -1;

  return (
    <div className={folha ? "pb-[62vh]" : "pb-28 lg:pb-12"}>
      {/* Faixa do documento em edição */}
      <div className="sticky top-0 z-30 border-b-[1.5px] border-tinta bg-papel-claro">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6">
          <a href="#/laudos" className="flex items-center gap-1.5 font-cond text-[15px] font-semibold uppercase tracking-[0.1em] text-tinta-2 hover:text-tinta">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Livro
          </a>
          <span className="hidden h-8 w-px bg-linha sm:block" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <CarimboSituacao status="rascunho" />
            <div className="min-w-0 leading-tight">
              <p className="truncate font-cond text-[19px] font-bold uppercase tracking-[0.04em]">
                Laudo nº <span className="font-mono text-[17px] font-semibold text-tinta-3">{estado.numeracao.proximo}/{estado.numeracao.ano}</span>
              </p>
              <p className="truncate font-mono text-[11px] text-tinta-3">número reservado só na emissão · salvo automaticamente</p>
            </div>
          </div>
          <div className="hidden w-56 sm:block">
            <div className="mb-1 flex justify-between">
              <Rotulo>Conferência</Rotulo>
              <span className="font-mono text-[12px] font-semibold tabular-nums">{feitos}/{total}</span>
            </div>
            <Segmentos total={total} feitos={feitos} />
          </div>
          <Botao variante="primario" icone={FileCheck2} onClick={pedirEmissao} className="hidden sm:inline-flex">
            Emitir laudo
          </Botao>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] gap-7 px-3 pt-5 sm:px-6 lg:pt-7">
        <div className="min-w-0 flex-1">
          <div className="mx-auto mb-3 flex max-w-[794px] flex-wrap items-center justify-between gap-2">
            <TipoServico modelo={modelo} />
            <Rotulo>{modo === "linha" ? "Digite direto no laudo · Enter avança · grifado = falta" : "Toque num campo do laudo para preencher"}</Rotulo>
          </div>
          <Previa laudo={laudo} edicao={edicao} />
          <div className="mx-auto mt-5 flex max-w-[794px] justify-start">
            <Botao variante="texto" icone={Trash2} onClick={() => setModal("excluir")} className="text-carimbo-vermelho decoration-carimbo-vermelho/40">
              Descartar rascunho
            </Botao>
          </div>
        </div>

        {modo === "linha" && (
          <aside className="w-[340px] shrink-0" aria-label="Apoio ao preenchimento">
            <div className="sticky top-[84px] max-h-[calc(100vh-100px)] space-y-4 overflow-y-auto pb-2">
              <Quadro titulo="Buscar no cadastro" corpo="p-4">
                <BuscaCadastro aoEscolher={usarCadastro} />
              </Quadro>

              <Quadro titulo="Campo em edição" corpo="p-4">
                {defAtivo ? (
                  <>
                    <p className="font-cond text-[21px] font-bold uppercase leading-tight tracking-[0.03em]">{defAtivo.rotulo}</p>
                    {edicao.problemas[defAtivo.id] ? (
                      <p className="mt-1.5 text-[14px] leading-snug text-carimbo-vermelho">{edicao.problemas[defAtivo.id]}</p>
                    ) : (
                      defAtivo.dica && <p className="mt-1.5 text-[14px] leading-snug text-tinta-2">{defAtivo.dica}</p>
                    )}
                    {defAtivo.id === "v.vin" && laudo.veiculo.vin && (
                      <p className="mt-2 font-mono text-[12px] text-tinta-3">{laudo.veiculo.vin.length}/17 caracteres</p>
                    )}
                    <SugestoesDoCampo def={defAtivo} laudo={laudo} estado={estado} aoTexto={(v) => mudarCampo(defAtivo.id, v)} aoCadastro={usarCadastro} />
                  </>
                ) : (
                  <p className="text-[14px] leading-snug text-tinta-2">Clique em qualquer campo grifado no laudo. Dicas e sugestões do cadastro aparecem aqui.</p>
                )}
              </Quadro>

              {etaPronta && (
                <Quadro titulo="Etiquetas ETA" corpo="">
                  <Etiqueta vin={laudo.veiculo.vin} />
                  <p className="px-4 py-2.5 text-[13px] leading-snug text-tinta-2">Os 8 últimos dígitos do chassi. Confira com o que foi fixado no veículo.</p>
                </Quadro>
              )}

              <Quadro titulo="Conferência" extra={<span className="font-mono text-[12px] font-semibold tabular-nums">{feitos}/{total}</span>} corpo="p-4">
                <Segmentos total={total} feitos={feitos} className="mb-3" />
                <Conferencia campos={campos} problemas={problemas} visiveis={edicao.problemas} aoIr={focar} />
              </Quadro>
            </div>
          </aside>
        )}
      </div>

      {/* Barra inferior no modo toque */}
      {modo === "toque" && !folha && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-tinta bg-papel-claro px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <Rotulo>Conferência</Rotulo>
            <span className="font-mono text-[12px] font-semibold tabular-nums">{feitos}/{total}</span>
          </div>
          <Segmentos total={total} feitos={feitos} />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Botao icone={ListChecks} onClick={() => setModal("conferencia")}>Conferir</Botao>
            <Botao variante="primario" icone={FileCheck2} onClick={pedirEmissao}>Emitir</Botao>
          </div>
        </div>
      )}

      {modo === "toque" && folha && mapa.get(folha) && (
        <FolhaCampo
          def={mapa.get(folha)}
          laudo={laudo}
          estado={estado}
          posicao={posicaoFolha + 1}
          total={digitaveis.length}
          erro={edicao.problemas[folha] || null}
          aoMudar={(v) => mudarCampo(folha, v)}
          aoCadastro={usarCadastro}
          aoAnterior={() => {
            setTocados((t) => new Set(t).add(folha));
            if (posicaoFolha > 0) focar(digitaveis[posicaoFolha - 1].id);
          }}
          aoProximo={() => {
            setTocados((t) => new Set(t).add(folha));
            const proximo = digitaveis[posicaoFolha + 1];
            if (proximo) focar(proximo.id);
            else {
              setFolha(null);
              setAtivo(null);
            }
          }}
          aoFechar={() => {
            setTocados((t) => new Set(t).add(folha));
            setFolha(null);
            setAtivo(null);
          }}
        />
      )}

      <Modal aberto={modal === "conferencia"} aoFechar={() => setModal(null)} titulo={`Conferência · ${feitos}/${total}`}>
        <Rotulo>Buscar no cadastro</Rotulo>
        <BuscaCadastro aoEscolher={(c, v) => { usarCadastro(c, v); setModal(null); }} />
        <div className="mt-5 max-h-[45vh] overflow-y-auto">
          <Conferencia campos={campos} problemas={problemas} visiveis={edicao.problemas} aoIr={(campoId) => { setModal(null); setTimeout(() => focar(campoId), 60); }} />
        </div>
      </Modal>

      <Modal
        aberto={modal === "pendencias"}
        aoFechar={() => setModal(null)}
        titulo={`Faltam ${nPendencias} ${nPendencias > 1 ? "itens" : "item"}`}
        rodape={
          <Botao variante="tinta" onClick={() => { const primeiro = campos.find((d) => problemas[d.id]); setModal(null); if (primeiro) setTimeout(() => focar(primeiro.id), 60); }}>
            Ir para o primeiro
          </Botao>
        }
      >
        <p className="mb-3 text-[15px] text-tinta-2">Laudo é documento oficial: só sai completo. Os campos que faltam estão grifados em vermelho no próprio laudo.</p>
        <div className="max-h-[45vh] overflow-y-auto border-t border-linha pt-2">
          <Conferencia campos={campos.filter((d) => problemas[d.id])} problemas={problemas} visiveis={problemas} aoIr={(campoId) => { setModal(null); setTimeout(() => focar(campoId), 60); }} />
        </div>
      </Modal>

      <Modal
        aberto={modal === "confirmar"}
        aoFechar={() => setModal(null)}
        titulo={`Emitir o laudo nº ${estado.numeracao.proximo}/${estado.numeracao.ano}?`}
        rodape={
          <>
            <Botao onClick={() => setModal(null)}>Revisar mais</Botao>
            <Botao variante="primario" icone={FileCheck2} onClick={emitir}>Emitir laudo</Botao>
          </>
        }
      >
        <dl className="divide-y divide-linha border-y border-linha font-mono text-[13px]">
          <div className="flex justify-between gap-4 py-2"><dt className="text-tinta-3">NÚMERO</dt><dd className="font-semibold">{estado.numeracao.proximo}/{estado.numeracao.ano}</dd></div>
          <div className="flex justify-between gap-4 py-2"><dt className="text-tinta-3">PROPRIETÁRIO</dt><dd className="truncate text-right font-semibold">{laudo.proprietario.nome}</dd></div>
          <div className="flex items-center justify-between gap-4 py-2"><dt className="text-tinta-3">VEÍCULO</dt><dd><Placa placa={laudo.veiculo.placa} /></dd></div>
        </dl>
        <p className="mt-3 text-[14.5px] leading-snug text-tinta-2">
          Depois de emitido, o laudo não se edita mais — só se cancela, com justificativa. Cliente e veículo entram no cadastro.
        </p>
      </Modal>

      <Modal
        aberto={modal === "excluir"}
        aoFechar={() => setModal(null)}
        titulo="Descartar o rascunho?"
        rodape={
          <>
            <Botao onClick={() => setModal(null)}>Manter</Botao>
            <Botao variante="perigoCheio" icone={Trash2} onClick={() => { acoes.excluirRascunho(laudo.id); navegar("/laudos"); avisar("Rascunho descartado.", "info"); }}>
              Descartar
            </Botao>
          </>
        }
      >
        <p className="text-[15px] text-tinta-2">Dados e fotos deste rascunho serão apagados. Como ele ainda não tinha número, a sequência do livro não muda.</p>
      </Modal>
    </div>
  );
}
