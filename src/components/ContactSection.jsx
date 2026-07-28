import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import Reveal from "./Reveal.jsx";
import { company, whatsappLink } from "../data/site.js";
import { trackConversion } from "../lib/analytics.js";

const serviceOptions = [
  "Sistema Web",
  "Site / Landing Page",
  "Aplicativo Mobile",
  "Automação de processos",
  "Ainda não sei",
];

// Enquanto o endpoint não estiver configurado, o envio cai no WhatsApp.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const emptyForm = {
  name: "",
  contact: "",
  service: serviceOptions[0],
  message: "",
  consent: false,
};

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const openWhatsApp = () => {
    const text = [
      `Olá! Sou ${form.name || "um visitante do site"}.`,
      `Interesse: ${form.service}.`,
      form.message && `Detalhes: ${form.message}`,
      form.contact && `Contato: ${form.contact}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    // Sem endpoint configurado: mantém o fluxo antigo via WhatsApp.
    if (!FORMSPREE_ID) {
      trackConversion("lead_whatsapp");
      openWhatsApp();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: form.name,
          contato: form.contact,
          interesse: form.service,
          mensagem: form.message,
          _subject: `Novo contato do site — ${form.name}`,
        }),
      });

      if (!response.ok) throw new Error("Falha no envio");

      trackConversion("lead_formulario", { interesse: form.service });
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
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
                onClick={() => trackConversion("clique_whatsapp")}
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
                onClick={() => trackConversion("clique_email")}
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="card-surface p-7 shadow-card sm:p-8"
          >
            {status === "success" ? (
              <div
                role="status"
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
                  <CheckCircle2 size={28} />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-white">
                  Mensagem enviada!
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
                  Recebemos o seu contato e retornamos em breve. Se preferir
                  agilizar, chame a gente no WhatsApp.
                </p>
                <Button
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackConversion("clique_whatsapp")}
                  className="mt-6"
                >
                  Falar no WhatsApp
                  <MessageCircle size={17} />
                </Button>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs text-mist underline underline-offset-4 hover:text-white"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  <label
                    htmlFor="contact"
                    className="text-sm font-medium text-white"
                  >
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
                  <label
                    htmlFor="service"
                    className="text-sm font-medium text-white"
                  >
                    O que você precisa?
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={update("service")}
                    className="rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
                  >
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-surface">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-white"
                  >
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

                {/* Consentimento LGPD */}
                <label
                  htmlFor="consent"
                  className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mist"
                >
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={update("consent")}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
                  />
                  <span>
                    Autorizo o contato da {company.name} e o uso dos meus dados
                    conforme a{" "}
                    <a
                      href="/politica-de-privacidade.html"
                      target="_blank"
                      rel="noopener"
                      className="text-brand-300 underline underline-offset-2 hover:text-white"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200"
                  >
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    Não foi possível enviar agora. Tente novamente ou fale
                    direto no WhatsApp.
                  </p>
                )}

                <Button
                  as="button"
                  type="submit"
                  disabled={isSending}
                  className="w-full"
                >
                  {isSending ? (
                    <>
                      Enviando...
                      <Loader2 size={17} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <Send size={17} />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-mist">
                  Retornamos o contato em até 1 dia útil.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
