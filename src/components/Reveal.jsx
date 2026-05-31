import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion.js";

// Wrapper que revela o conteúdo ao entrar na viewport.
export default function Reveal({
  children,
  variants = fadeUp,
  className = "",
  as = "div",
  delay = 0,
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
