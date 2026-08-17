import { motion } from "framer-motion";
import { stagger, fadeUp } from "../lib/motion.js";

/**
 * Galeria das telas do aplicativo em molduras de celular.
 * No celular vira carrossel horizontal, para cada tela continuar legível
 * em vez de encolher até não dar para ler nada.
 */
export default function AppGallery({ screens }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
    >
      {screens.map((screen) => (
        <motion.figure
          key={screen.src}
          variants={fadeUp}
          className="w-[220px] shrink-0 snap-center sm:w-auto"
        >
          {/* moldura do aparelho */}
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

          <figcaption className="mt-4 text-center">
            <span className="block text-sm font-semibold text-white">
              {screen.caption}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-mist">
              {screen.text}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
