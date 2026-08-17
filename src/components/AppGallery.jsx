import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion.js";

/**
 * Galeria das telas do aplicativo.
 *
 * Em tela grande com mouse, os aparelhos formam um leque em perspectiva e o
 * que está sob o cursor se endireita. Em celular e em telas de toque vira
 * carrossel horizontal plano, para cada tela continuar legível.
 *
 * O efeito é só CSS (nada de WebGL) e anima apenas transform, resolvido na
 * GPU. As regras de perspectiva vivem em index.css, sob consulta de mídia.
 */

// Ângulo, profundidade e deslocamento por posição no leque.
const POSES = [
  { ry: 26, tz: -110, tx: 10 },
  { ry: 14, tz: -50, tx: 4 },
  { ry: 0, tz: 20, tx: 0 },
  { ry: -14, tz: -50, tx: -4 },
  { ry: -26, tz: -110, tx: -10 },
];

export default function AppGallery({ screens }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="gallery-3d -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:flex lg:justify-center lg:gap-2"
    >
      {screens.map((screen, i) => {
        const pose = POSES[i] ?? POSES[2];
        return (
          <motion.figure
            key={screen.src}
            variants={fadeUp}
            className="w-[220px] shrink-0 snap-center sm:w-auto lg:w-[200px]"
          >
            <div
              className="gallery-3d__item"
              style={{
                "--ry": `${pose.ry}deg`,
                "--tz": `${pose.tz}px`,
                "--tx": `${pose.tx}px`,
              }}
            >
              <div className="rounded-[2rem] border border-white/15 bg-[#0b0b11] p-1.5 shadow-card">
                <img
                  src={screen.src}
                  alt={`Tela de ${screen.caption} do aplicativo de pedidos`}
                  width={620}
                  height={1348}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-[1.65rem]"
                />
              </div>
            </div>

            <figcaption className="mt-5 text-center">
              <span className="block text-sm font-semibold text-white">
                {screen.caption}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-mist">
                {screen.text}
              </span>
            </figcaption>
          </motion.figure>
        );
      })}
    </motion.div>
  );
}
