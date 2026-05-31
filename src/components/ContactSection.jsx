import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import Reveal from "./Reveal.jsx";
import { company, whatsappLink } from "../data/site.js";

const services = ["Sistema Web", "Site / Landing Page", "Aplicativo Mobile", "Ainda não sei"];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    service: services[0],
    message: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = [
      `Olá! Sou ${form.name || "um visitante do site"}.`,
      `Interesse: ${form.service}.`,
      form.message && `Detalhes: ${form.message}`,
      form.contact && `Contato: ${form.contact}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Lado esquerdo: chamada + canais */}
          <Reveal className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Vamos conversar
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Pronto para tirar o seu projeto do papel?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
              Conte a sua ideia e mostramos como podemos ajudar. A primeira
              conversa é gratuita e sem compromisso.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4 transition-colors hover:border-brand-400/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-ink">
                  <MessageCircle size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    WhatsApp
                  </span>
                  <span className="text-sm text-mist">{company.whatsappLabel}</span>
                </span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4 transition-colors hover:border-brand-400/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    E-mail
                  </span>
                  <span className="text-sm text-mist">{company.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink/60 text-brand-300">
                  <MapPin size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    Atendimento
                  </span>
                  <span className="text-sm text-mist">
                    Todo o {company.city}, de forma remota
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Lado direito: formulário */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="card-surface flex flex-col gap-5 p-7 sm:p-8 shadow-card"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Nome
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Como podemos te chamar?"
                className="rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-brand-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact" className="text-sm font-medium text-white">
                E-mail ou telefone
              </label>
              <input
                id="contact"
                type="text"
                required
                value={form.contact}
                onChange={update("contact")}
                placeholder="Para retornarmos o contato"
                className="rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-brand-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-white">
                O que você precisa?
              </label>
              <select
                id="service"
                value={form.service}
                onChange={update("service")}
                className="rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s} value={s} className="bg-surface">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-white">
                Sobre o projeto
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="Conte um pouco sobre a sua ideia..."
                className="resize-none rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white placeholder:text-mist/50 focus:border-brand-400 focus:outline-none"
              />
            </div>

            <Button as="button" type="submit" className="w-full">
              Enviar mensagem
              <Send size={17} />
            </Button>
            <p className="text-center text-xs text-mist">
              Ao enviar, você será direcionado ao nosso WhatsApp com a mensagem pronta.
            </p>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
