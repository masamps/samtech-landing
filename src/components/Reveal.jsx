import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export default function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div {...fadeUp(delay)} className={className}>
      {children}
    </motion.div>
  );
}

