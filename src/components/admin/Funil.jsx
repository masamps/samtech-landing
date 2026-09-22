import { Users, MessageSquare, TrendingUp, CalendarClock } from "lucide-react";
import { RESPONDERAM } from "../../lib/supabase.js";

const META_CONTATOS = 20;

function Cartao({ icone: Icone, rotulo, valor, nota, destaque }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-mist">
        <Icone className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs uppercase tracking-wide">{rotulo}</span>
      </div>
      <p
        className={`mt-2 font-display text-2xl font-semibold ${
          destaque ? "text-brand-300" : "text-white"
        }`}
      >
        {valor}
      </p>
      {nota && <p className="mt-1 text-xs text-mist/70">{nota}</p>}
    </div>
  );
}

export default function Funil({ prospects }) {
  const total = prospects.length;

  // "Contatado" é quem tem data de primeiro contato — não dá para deduzir do
  // status, porque quem foi descartado depois do contato também já foi contatado.
  const contatados = prospects.filter((p) => p.data_primeiro_contato).length;
  const responderam = prospects.filter((p) => RESPONDERAM.includes(p.status)).length;
  const taxa = contatados > 0 ? Math.round((responderam / contatados) * 100) : 0;
  const faltam = Math.max(0, META_CONTATOS - contatados);

  const hoje = new Date().toISOString().slice(0, 10);
  const vencidos = prospects.filter(
    (p) => p.data_follow_up && p.data_follow_up <= hoje && p.status !== "Descartado"
  ).length;

  return (
    <section aria-label="Funil" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Cartao
        icone={Users}
        rotulo="Na lista"
        valor={total}
        nota={faltam > 0 ? `faltam ${faltam} para a meta de ${META_CONTATOS}` : "meta batida"}
      />
      <Cartao icone={MessageSquare} rotulo="Contatados" valor={contatados} />
      <Cartao
        icone={TrendingUp}
        rotulo="Taxa de resposta"
        valor={`${taxa}%`}
        destaque={taxa >= 20}
        nota={
          contatados === 0
            ? "sem contatos ainda"
            : taxa < 20
              ? "abaixo de 20%: revise a mensagem"
              : "acima de 20%: aumente o volume"
        }
      />
      <Cartao
        icone={CalendarClock}
        rotulo="Follow-up vencido"
        valor={vencidos}
        destaque={vencidos > 0}
        nota={vencidos > 0 ? "prospect esfriando" : "nada atrasado"}
      />
    </section>
  );
}
