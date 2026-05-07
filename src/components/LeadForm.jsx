import { Send } from "lucide-react";
import { useMemo, useState } from "react";
import { leadFormOptions } from "../data/siteContent";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  projectType: leadFormOptions[0],
  message: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(initialForm);

  const mailtoHref = useMemo(() => {
    const body = [
      "Olá, Samcore.",
      "",
      "Quero falar sobre um projeto digital.",
      "",
      `Nome: ${form.name || "Não informado"}`,
      `Empresa: ${form.company || "Não informado"}`,
      `Contato: ${form.contact || "Não informado"}`,
      `Interesse: ${form.projectType}`,
      "",
      "Resumo do projeto:",
      form.message || "Não informado",
    ].join("\n");

    return `mailto:matheuslemos98@gmail.com?subject=${encodeURIComponent(
      "Novo briefing pelo site Samcore",
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <form className="rounded-lg border border-white/10 bg-slate-950/55 p-4 text-left shadow-soft sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Nome
          <input
            value={form.name}
            onChange={updateField("name")}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.06]"
            placeholder="Seu nome"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-300">
          Empresa
          <input
            value={form.company}
            onChange={updateField("company")}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.06]"
            placeholder="Nome da empresa"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-slate-300">
        E-mail ou WhatsApp
        <input
          value={form.contact}
          onChange={updateField("contact")}
          className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.06]"
          placeholder="Onde podemos falar com você?"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm text-slate-300">
        O que você quer construir?
        <select
          value={form.projectType}
          onChange={updateField("projectType")}
          className="h-12 rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition focus:border-cyan-300/35 focus:bg-slate-900"
        >
          {leadFormOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 grid gap-2 text-sm text-slate-300">
        Resumo do projeto
        <textarea
          value={form.message}
          onChange={updateField("message")}
          className="min-h-28 resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.06]"
          placeholder="Conte rapidamente o objetivo, prazo ou desafio principal."
        />
      </label>

      <a
        href={mailtoHref}
        className="button-shine mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.99]"
      >
        <span className="relative z-10">Enviar briefing</span>
        <Send className="relative z-10 h-4 w-4" />
      </a>
    </form>
  );
}
