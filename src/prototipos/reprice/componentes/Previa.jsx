import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Laudo, { LARGURA_LAUDO } from "./Laudo.jsx";
import { useEstado } from "../estado.jsx";

// Folha A4 a 96 dpi: 794 × 1123 px. A margem interna equivale aos 8 mm de impressão.
const PAPEL = 794;
const ALTURA_A4 = 1123;
const MARGEM = (PAPEL - LARGURA_LAUDO) / 2;

function useLaudoProps(laudo, edicao) {
  const { estado } = useEstado();
  return {
    laudo,
    empresa: estado.empresa,
    remarcadores: estado.remarcadores,
    declaracao: estado.declaracoes[laudo.modeloId],
    edicao,
  };
}

/** Folha A4 que encolhe para caber na coluna, mantendo a proporção real. */
export function Previa({ laudo, larguraMaxima = PAPEL, edicao, sombra = true }) {
  const props = useLaudoProps(laudo, edicao);
  const caixa = useRef(null);
  const papel = useRef(null);
  const [escala, setEscala] = useState(0.5);
  const [altura, setAltura] = useState(ALTURA_A4);

  useLayoutEffect(() => {
    const medir = () => {
      const disponivel = Math.min(caixa.current?.clientWidth || PAPEL, larguraMaxima);
      setEscala(Math.min(1, disponivel / PAPEL));
      setAltura(papel.current?.offsetHeight || ALTURA_A4);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(caixa.current);
    if (papel.current) observador.observe(papel.current);
    return () => observador.disconnect();
  }, [larguraMaxima]);

  return (
    <div ref={caixa} className="w-full min-w-0">
      <div className="mx-auto" style={{ width: PAPEL * escala, height: altura * escala }}>
        <div
          ref={papel}
          className={`origin-top-left bg-white ${sombra ? "shadow-[0_1px_0_#A99F8B,0_18px_30px_-18px_rgba(23,20,15,0.45)]" : ""}`}
          style={{ width: PAPEL, minHeight: ALTURA_A4, padding: MARGEM, transform: `scale(${escala})` }}
        >
          <Laudo {...props} />
        </div>
      </div>
    </div>
  );
}

/**
 * Cópia do laudo em tamanho real, fora da árvore do app, que só aparece na
 * impressão (ver reprice.css). Assim "Imprimir / Salvar PDF" sai só o laudo.
 */
export function AreaImpressao({ laudo }) {
  const props = useLaudoProps(laudo);
  return createPortal(
    <div className="area-impressao">
      <Laudo {...props} />
    </div>,
    document.body
  );
}
