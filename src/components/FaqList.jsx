import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

function FaqItem({ faq, isOpen, onToggle, id }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/40">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-base font-semibold text-white">
            {faq.question}
          </span>
          <Plus
            size={20}
            className={`shrink-0 text-brand-300 transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-mist">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Acordeão de perguntas, reaproveitado pela home e pela página do produto. */
export default function FaqList({ faqs, idPrefix = "" }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <FaqItem
          key={faq.question}
          id={`${idPrefix}${i}`}
          faq={faq}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
