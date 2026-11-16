import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { estadoInicial, modeloPorId } from "./dados.js";
import { hojeISO } from "./campos.js";

const CHAVE = "reprice-prototipo-v1";

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo?.versao === 1) return salvo;
  } catch {
    /* navegador sem armazenamento: segue com os dados de exemplo */
  }
  return estadoInicial();
}

const novoId = () => `l${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function laudoVazio(modeloId, base = {}) {
  return {
    id: novoId(),
    modeloId,
    status: "rascunho",
    numero: null,
    ano: Number(hojeISO().slice(0, 4)),
    autorizacao: { ciretran: "", numero: "", responsavel: "", ...base.autorizacao },
    proprietario: { nome: "", doc: "", uf: "SC", ...base.proprietario },
    veiculo: { placa: "", vin: "", marcaModelo: "", fabModelo: "", ...base.veiculo },
    servico: { dataGravacao: hojeISO(), dataEmissao: hojeISO(), nf: "", remarcadorId: "", ...base.servico },
    fotos: {},
    criadoEm: new Date().toISOString(),
    emitidoEm: null,
    cancelamento: null,
  };
}

/*
 * Ao emitir, o cliente e o veículo vão para o cadastro (ou são atualizados).
 * O laudo guarda a SUA cópia dos dados: se amanhã o cadastro do cliente mudar,
 * o laudo já emitido continua exatamente como foi impresso.
 */
function registrarNoCadastro(estado, laudo) {
  const doc = laudo.proprietario.doc;
  let clientes = estado.clientes;
  let cliente = clientes.find((c) => c.doc === doc);
  if (cliente) {
    clientes = clientes.map((c) => (c.id === cliente.id ? { ...c, ...laudo.proprietario } : c));
  } else {
    cliente = { id: `c${Date.now().toString(36)}`, ...laudo.proprietario };
    clientes = [...clientes, cliente];
  }

  const { placa, vin, marcaModelo, fabModelo } = laudo.veiculo;
  const dadosVeiculo = { clienteId: cliente.id, placa, vin, marcaModelo, fabModelo };
  const existente = estado.veiculos.find((v) => v.placa === placa);
  const veiculos = existente
    ? estado.veiculos.map((v) => (v.id === existente.id ? { ...v, ...dadosVeiculo } : v))
    : [...estado.veiculos, { id: `v${Date.now().toString(36)}`, ...dadosVeiculo }];

  return { clientes, veiculos };
}

function redutor(estado, acao) {
  switch (acao.tipo) {
    case "salvarLaudo": {
      const existe = estado.laudos.some((l) => l.id === acao.laudo.id);
      const laudo = { ...acao.laudo, atualizadoEm: new Date().toISOString() };
      return {
        ...estado,
        laudos: existe ? estado.laudos.map((l) => (l.id === laudo.id ? laudo : l)) : [laudo, ...estado.laudos],
      };
    }
    case "alterarLaudo":
      // Recebe uma função em vez do laudo pronto: ela é aplicada sobre a versão
      // atual do estado. Sem isso, duas fotos que terminam de processar quase ao
      // mesmo tempo partem da mesma cópia antiga e a segunda apaga a primeira.
      return {
        ...estado,
        laudos: estado.laudos.map((l) =>
          l.id === acao.id && l.status === "rascunho" ? { ...acao.alterar(l), atualizadoEm: new Date().toISOString() } : l
        ),
      };
    case "emitir": {
      const atual = estado.laudos.find((l) => l.id === acao.id);
      if (!atual || atual.status !== "rascunho") return estado;
      // O número só nasce aqui. Rascunho descartado não deixa buraco na sequência.
      const emitido = {
        ...atual,
        status: "emitido",
        numero: estado.numeracao.proximo,
        ano: estado.numeracao.ano,
        emitidoEm: new Date().toISOString(),
      };
      return {
        ...estado,
        ...registrarNoCadastro(estado, emitido),
        numeracao: { ...estado.numeracao, proximo: estado.numeracao.proximo + 1 },
        laudos: estado.laudos.map((l) => (l.id === acao.id ? emitido : l)),
      };
    }
    case "cancelar":
      return {
        ...estado,
        laudos: estado.laudos.map((l) =>
          l.id === acao.id && l.status === "emitido"
            ? { ...l, status: "cancelado", cancelamento: { motivo: acao.motivo, em: new Date().toISOString() } }
            : l
        ),
      };
    case "excluirRascunho":
      return { ...estado, laudos: estado.laudos.filter((l) => !(l.id === acao.id && l.status === "rascunho")) };
    case "empresa":
      return { ...estado, empresa: { ...estado.empresa, ...acao.dados } };
    case "remarcadores":
      return { ...estado, remarcadores: acao.lista };
    case "declaracao":
      return { ...estado, declaracoes: { ...estado.declaracoes, [acao.modeloId]: acao.texto } };
    case "numeracao":
      return { ...estado, numeracao: { ...estado.numeracao, ...acao.dados } };
    case "restaurar":
      return estadoInicial();
    default:
      return estado;
  }
}

const Contexto = createContext(null);

export function ProvedorEstado({ children }) {
  const [estado, despachar] = useReducer(redutor, undefined, carregar);
  const [avisoArmazenamento, setAvisoArmazenamento] = useState(false);
  const temporizador = useRef();

  useEffect(() => {
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      try {
        localStorage.setItem(CHAVE, JSON.stringify(estado));
        setAvisoArmazenamento(false);
      } catch {
        // Cota do navegador estourada (fotos demais). No sistema real as fotos
        // ficam no servidor; aqui avisamos e seguimos em memória.
        setAvisoArmazenamento(true);
      }
    }, 300);
    return () => clearTimeout(temporizador.current);
  }, [estado]);

  const acoes = useMemo(
    () => ({
      salvarLaudo: (laudo) => despachar({ tipo: "salvarLaudo", laudo }),
      alterarLaudo: (id, alterar) => despachar({ tipo: "alterarLaudo", id, alterar }),
      emitir: (id) => despachar({ tipo: "emitir", id }),
      cancelar: (id, motivo) => despachar({ tipo: "cancelar", id, motivo }),
      excluirRascunho: (id) => despachar({ tipo: "excluirRascunho", id }),
      atualizarEmpresa: (dados) => despachar({ tipo: "empresa", dados }),
      atualizarRemarcadores: (lista) => despachar({ tipo: "remarcadores", lista }),
      atualizarDeclaracao: (modeloId, texto) => despachar({ tipo: "declaracao", modeloId, texto }),
      atualizarNumeracao: (dados) => despachar({ tipo: "numeracao", dados }),
      restaurar: () => despachar({ tipo: "restaurar" }),
    }),
    []
  );

  const valor = useMemo(() => ({ estado, acoes, avisoArmazenamento }), [estado, acoes, avisoArmazenamento]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export const useEstado = () => useContext(Contexto);

/* ---------------- Rotas por hash (funciona em hospedagem estática) ---------------- */

const lerRota = () => (window.location.hash.replace(/^#/, "") || "/laudos").split("?")[0];

export function useRota() {
  const [rota, setRota] = useState(lerRota);
  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);
  return rota;
}

export const navegar = (caminho) => {
  window.location.hash = caminho;
};

/* ---------------- Utilidades derivadas ---------------- */

export function useLaudoHelpers() {
  const { estado } = useEstado();
  return useCallback(
    (laudo) => ({
      modelo: modeloPorId(laudo.modeloId),
      remarcador: estado.remarcadores.find((r) => r.id === laudo.servico.remarcadorId),
    }),
    [estado.remarcadores]
  );
}
