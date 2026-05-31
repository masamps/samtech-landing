import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { faqs } from "../data/site.js";

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

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Tudo que você precisa saber"
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              id={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
