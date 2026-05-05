import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <motion.div
      {...fadeUp()}
      className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <div className="space-y-4">
        <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
          <span className="text-balance">{title}</span>
        </h2>
        <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{description}</p>
      </div>
    </motion.div>
  );
}

