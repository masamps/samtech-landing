import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

const juntar = (...c) => c.filter(Boolean).join(" ");

/*
 * Botões: retos, rótulo em letra condensada de sinalização. O principal tem
 * sombra dura que some ao apertar — parece um botão físico, não um cartão.
 */
const VARIANTES = {
  primario:
    "bg-sinal text-tinta border-[1.5px] border-tinta shadow-[3px_3px_0_#17140F] hover:bg-[#FFD12E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#17140F]",
  tinta: "bg-tinta text-papel-claro border-[1.5px] border-tinta hover:bg-tinta-2",
  papel: "bg-papel-claro text-tinta border-[1.5px] border-tinta hover:bg-sinal-claro",
  texto: "text-tinta underline decoration-sinal decoration-[3px] underline-offset-[5px] hover:bg-sinal-claro px-1",
  perigo: "text-carimbo-vermelho border-[1.5px] border-carimbo-vermelho hover:bg-red-50",
  perigoCheio: "bg-carimbo-vermelho text-white border-[1.5px] border-carimbo-vermelho hover:bg-[#951f18]",
};

export function Botao({ variante = "papel", tamanho = "md", icone: Icone, className, children, ...props }) {
  const tamanhos = {
    sm: "h-8 px-3 text-[13px] gap-1.5",
    md: "h-10 px-4 text-[15px] gap-2",
    lg: "h-12 px-6 text-[17px] gap-2.5",
  };
  return (
    <button
      type="button"
      className={juntar(
        "inline-flex shrink-0 items-center justify-center rounded-[2px] font-cond font-semibold uppercase tracking-[0.08em] transition-[background-color,transform,box-shadow] duration-100",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTES[variante],
        variante === "texto" ? "h-auto" : tamanhos[tamanho],
        className
      )}
      {...props}
    >
      {Icone && <Icone className={tamanho === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.2} aria-hidden="true" />}
      {children}
    </button>
  );
}

/** Rótulo pequeno, em mono, como os campos de um formulário impresso. */
export const Rotulo = ({ children, className, ...p }) => (
  <span className={juntar("font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-tinta-3", className)} {...p}>
    {children}
  </span>
);

/** Campo "de formulário em papel": só a linha de baixo, grifa ao focar. */
export const estiloEntrada = (erro) =>
  juntar(
    "block w-full rounded-none border-0 border-b-[1.5px] bg-transparent px-1 py-2 text-[15px] text-tinta outline-none transition-colors",
    "placeholder:text-tinta-3/60 focus:bg-sinal-claro/70",
    erro ? "border-carimbo-vermelho" : "border-tinta"
  );

export function Campo({ rotulo, erro, dica, children, className, acao }) {
  const id = useId();
  const dicaId = `${id}-dica`;
  const filho =
    typeof children === "function"
      ? children({ id, "aria-describedby": erro || dica ? dicaId : undefined, "aria-invalid": erro ? true : undefined })
      : children;
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2">
        <label htmlFor={id}>
          <Rotulo>{rotulo}</Rotulo>
        </label>
        {acao}
      </div>
      {filho}
      {(erro || dica) && (
        <p id={dicaId} className={juntar("mt-1.5 text-[13px] leading-snug", erro ? "text-carimbo-vermelho" : "text-tinta-3")}>
          {erro || dica}
        </p>
      )}
    </div>
  );
}

/**
 * Quadro com faixa de título centralizada — a mesma gramática visual do
 * laudo (IDENTIFICAÇÃO DO PROPRIETÁRIO, DECLARAÇÃO...). O app inteiro fala
 * a língua do documento que a Reprice já usa.
 */
export function Quadro({ titulo, extra, className, children, corpo = "p-5" }) {
  return (
    <section className={juntar("border-[1.5px] border-tinta bg-papel-claro", className)}>
      {titulo && (
        <div className="relative border-b-[1.5px] border-tinta px-10 py-2 text-center">
          <h2 className="font-cond text-[14px] font-bold uppercase tracking-[0.16em]">{titulo}</h2>
          {extra && <div className="absolute inset-y-0 right-3 flex items-center">{extra}</div>}
        </div>
      )}
      <div className={corpo}>{children}</div>
    </section>
  );
}

const SERVICO = {
  eta: { cor: "bg-servico-eta", texto: "text-servico-eta" },
  chassi: { cor: "bg-servico-chassi", texto: "text-servico-chassi" },
  motor: { cor: "bg-servico-motor", texto: "text-servico-motor" },
};

export function TipoServico({ modelo, className }) {
  return (
    <span className={juntar("inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[11.5px] font-semibold uppercase tracking-[0.06em]", SERVICO[modelo.id].texto, className)}>
      <span className={juntar("h-2 w-2", SERVICO[modelo.id].cor)} aria-hidden="true" />
      {modelo.curto}
    </span>
  );
}

const CARIMBOS = {
  rascunho: { rotulo: "Rascunho", cls: "text-tinta-3 [border-style:dashed]" },
  emitido: { rotulo: "Emitido", cls: "text-carimbo-verde" },
  cancelado: { rotulo: "Cancelado", cls: "text-carimbo-vermelho" },
};

export function CarimboSituacao({ status, tamanho = "sm" }) {
  const c = CARIMBOS[status];
  return <span className={juntar("carimbo", tamanho === "lg" ? "text-[20px]" : "text-[12px]", c.cls)}>{c.rotulo}</span>;
}

/** Placa Mercosul em miniatura. */
export function Placa({ placa, tamanho = "sm" }) {
  if (!placa) return <span className="font-mono text-tinta-3">—</span>;
  const grande = tamanho === "lg";
  return (
    <span className={juntar("inline-flex flex-col overflow-hidden rounded-[3px] border border-tinta bg-white align-middle", grande ? "min-w-[118px]" : "min-w-[82px]")}>
      <span className={juntar("bg-[#1d4fb8]", grande ? "h-[5px]" : "h-[3px]")} aria-hidden="true" />
      <span className={juntar("px-1.5 text-center font-mono font-semibold tracking-[0.06em] text-tinta", grande ? "py-1 text-[17px]" : "py-[1px] text-[12.5px]")}>
        {placa.replace("-", "")}
      </span>
    </span>
  );
}

export function Modal({ aberto, aoFechar, titulo, children, rodape, largura = "max-w-lg" }) {
  const painel = useRef(null);
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement;
    const tecla = (e) => e.key === "Escape" && aoFechar();
    window.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    painel.current?.querySelector("textarea, input, button:not([data-fechar])")?.focus();
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
      anterior?.focus?.();
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-tinta/55 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && aoFechar()}>
      <div ref={painel} role="dialog" aria-modal="true" aria-label={titulo} className={juntar("w-full border-[1.5px] border-tinta bg-papel-claro shadow-[6px_6px_0_#17140F]", largura)}>
        <div className="faixa-risco h-[6px]" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4 border-b-[1.5px] border-tinta px-5 py-3.5">
          <h2 className="font-cond text-[20px] font-bold uppercase leading-tight tracking-[0.04em]">{titulo}</h2>
          <button type="button" data-fechar onClick={aoFechar} aria-label="Fechar" className="-m-1 p-1.5 text-tinta-2 hover:bg-sinal-claro">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {rodape && <div className="flex flex-col-reverse gap-3 border-t border-linha px-5 py-4 sm:flex-row sm:justify-end">{rodape}</div>}
      </div>
    </div>
  );
}

/* ---------------- Avisos rápidos (tira de recibo) ---------------- */

const ContextoAviso = createContext(() => {});

export function ProvedorAvisos({ children }) {
  const [avisos, setAvisos] = useState([]);
  const avisar = useCallback((texto, tipo = "ok") => {
    const id = Math.random().toString(36).slice(2);
    setAvisos((a) => [...a, { id, texto, tipo }]);
    setTimeout(() => setAvisos((a) => a.filter((x) => x.id !== id)), 3800);
  }, []);
  const marca = { ok: "border-sinal", alerta: "border-margem", info: "border-papel-claro" };
  return (
    <ContextoAviso.Provider value={avisar}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6" aria-live="polite">
        {avisos.map((a) => (
          <div key={a.id} className={juntar("pointer-events-auto max-w-md border-l-[5px] bg-tinta px-4 py-3 font-mono text-[13px] leading-snug text-papel-claro shadow-[4px_4px_0_rgba(23,20,15,0.25)]", marca[a.tipo])}>
            {a.texto}
          </div>
        ))}
      </div>
    </ContextoAviso.Provider>
  );
}

export const useAviso = () => useContext(ContextoAviso);

export function Vazio({ titulo, texto, children }) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="font-cond text-[20px] font-bold uppercase tracking-[0.06em]">{titulo}</p>
      {texto && <p className="mx-auto mt-1 max-w-sm text-tinta-3">{texto}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

/** Progresso em segmentos — um tracinho por item, como a escala de um medidor. */
export function Segmentos({ total, feitos, className }) {
  return (
    <div className={juntar("flex gap-[3px]", className)} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={feitos} aria-label={`${feitos} de ${total} itens`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={juntar("h-2.5 flex-1 border border-tinta/70", i < feitos ? "bg-sinal" : "bg-transparent")} />
      ))}
    </div>
  );
}

/** Media query reativa. */
export function useMedia(consulta) {
  const [bate, setBate] = useState(() => window.matchMedia(consulta).matches);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const aoMudar = () => setBate(mq.matches);
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, [consulta]);
  return bate;
}
