import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Hand, RotateCcw } from "lucide-react";
import { trackConversion } from "../lib/analytics.js";

/**
 * Demonstração navegável do aplicativo.
 *
 * O visitante avança pelo fluxo real — do catálogo bloqueado até o pedido
 * enviado — clicando na própria tela. O aparelho inteiro é o botão, e um anel
 * apenas decorativo marca onde ficaria o toque: assim, mesmo que a coordenada
 * do destaque não caia exata sobre o botão da imagem, o avanço nunca quebra.
 */
export default function AppDemo({ passos }) {
  const [i, setI] = useState(0);
  const passo = passos[i];
  const ultimo = i === passos.length - 1;

  const avancar = () => {
    if (ultimo) {
      setI(0);
      return;
    }
    if (i === 0) trackConversion("demo_app_iniciada");
    if (i === passos.length - 2) trackConversion("demo_app_concluida");
    setI(i + 1);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
      {/* aparelho */}
      <div className="mx-auto w-full max-w-[280px]">
        <button
          type="button"
          onClick={avancar}
          aria-label={
            ultimo
              ? "Recomeçar a demonstração"
              : `${passo.acao}. Avançar para o próximo passo`
          }
          className="group relative block w-full rounded-[2.2rem] border border-white/15 bg-[#0b0b11] p-1.5 shadow-card transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
        >
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <AnimatePresence mode="wait">
              <motion.img
                key={passo.src}
                src={passo.src}
                alt={`${passo.titulo} — ${passo.texto}`}
                width={620}
                height={1348}
                decoding="async"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="block w-full"
              />
            </AnimatePresence>

            {/* anel indicando o ponto do toque */}
            {passo.alvo && (
              // Duas camadas de propósito: a de fora centraliza com translate e
              // a de dentro pulsa. Se a mesma camada fizesse as duas coisas, o
              // scale da animação sobrescreveria o translate e o anel sairia
              // do lugar.
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${passo.alvo.x}%`, top: `${passo.alvo.y}%` }}
              >
                <span className="block h-11 w-11 rounded-full border-2 border-brand-400 bg-brand-400/20 motion-safe:animate-pulse-soft" />
              </span>
            )}
          </div>
        </button>

        {/* progresso */}
        <div className="mt-5 flex justify-center gap-1.5">
          {passos.map((p, n) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Ir para o passo ${n + 1}: ${p.titulo}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === i ? "w-7 bg-brand-gradient" : "w-3 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* texto do passo */}
      <div className="text-center lg:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={passo.titulo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Passo {i + 1} de {passos.length}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {passo.titulo}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-mist lg:mx-0 mx-auto">
              {passo.texto}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={avancar}
          className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
        >
          {ultimo ? (
            <>
              <RotateCcw size={16} />
              Ver de novo
            </>
          ) : (
            <>
              <Hand size={16} />
              {passo.acao}
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="mt-3 text-xs text-mist">
          {ultimo
            ? "Fim da demonstração. As telas são de exemplo — no seu app, a marca e os produtos são os da sua empresa."
            : "Toque na tela do celular ou no botão para avançar."}
        </p>
      </div>
    </div>
  );
}
