import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion.js";

/**
 * VARIANTE ALTERNATIVA — não está em uso.
 *
 * Para ativar, troque o import em src/pages/AppB2BPage.jsx:
 *   import AppGallery from "../components/AppGallery3D.jsx";
 *
 * Fica de fora por padrão porque as telas laterais anguladas prejudicam a
 * leitura do conteúdo, que é justamente o objetivo da seção.
 *
 * Variante 3D da galeria: os aparelhos ficam num plano com perspectiva,
 * angulados em direção ao centro. Ao passar o mouse, o aparelho se endireita
 * e vem para a frente.
 *
 * Usa só transformações CSS — nada de WebGL, que custaria centenas de KB
 * e derrubaria a velocidade da página.
 */

// Ângulo e profundidade por posição, do mais à esquerda ao mais à direita.
const POSES = [
  { rotateY: 26, z: -110, x: 10 },
  { rotateY: 14, z: -50, x: 4 },
  { rotateY: 0, z: 20, x: 0 },
  { rotateY: -14, z: -50, x: -4 },
  { rotateY: -26, z: -110, x: -10 },
];

export default function AppGallery3D({ screens }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:flex lg:justify-center lg:gap-2 lg:[perspective:1600px]"
    >
      {screens.map((screen, i) => {
        const pose = POSES[i] ?? POSES[2];
        return (
          <motion.figure
            key={screen.src}
            variants={fadeUp}
            className="group w-[220px] shrink-0 snap-center sm:w-auto lg:w-[200px] lg:[transform-style:preserve-3d]"
          >
            <div
              className="transition-transform duration-500 ease-out lg:group-hover:!translate-x-0 lg:group-hover:!rotate-y-0 lg:group-hover:![transform:translateZ(70px)]"
              style={{
                transform: `perspective(1600px) rotateY(${pose.rotateY}deg) translateZ(${pose.z}px) translateX(${pose.x}px)`,
              }}
            >
              <div className="rounded-[2rem] border border-white/15 bg-[#0b0b11] p-1.5 shadow-card transition-shadow duration-500 group-hover:shadow-glow">
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
