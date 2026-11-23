import { Check, TriangleAlert } from "lucide-react";

// Ilustração da conferência de pedido x nota fiscal. Dados fictícios: não é
// captura do sistema em produção, e a página diz isso logo abaixo.
const ITENS = [
  { produto: "Capinha silicone iPhone 15", pedido: [200, 4.9], nota: [200, 4.9] },
  { produto: "Película de vidro 3D", pedido: [300, 2.1], nota: [280, 2.1] },
  { produto: "Cabo USB-C 1 m", pedido: [150, 6.4], nota: [150, 7.4] },
  { produto: "Carregador 20 W", pedido: [80, 18.9], nota: [80, 18.9] },
  { produto: "Suporte veicular", pedido: [60, 9.5], nota: [60, 9.5] },
];

const real = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function divergencia([qp, vp], [qn, vn]) {
  if (qp !== qn) return `Quantidade: pedido ${qp}, nota ${qn}`;
  if (vp !== vn) return `Preço: pedido ${real(vp)}, nota ${real(vn)}`;
  return null;
}

export default function ConferenciaIlustracao() {
  const total = (lado) => ITENS.reduce((s, i) => s + i[lado][0] * i[lado][1], 0);
  const diferenca = total("nota") - total("pedido");
  const divergentes = ITENS.filter((i) => divergencia(i.pedido, i.nota)).length;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface/70 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Conferência</p>
          <p className="mt-1 font-semibold text-white">Pedido 4512 × NF-e 38.207</p>
          <p className="text-xs text-mist">Fornecedor Exemplo Ltda</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-line bg-ink/50 px-3 py-1.5 text-mist">{ITENS.length} itens</span>
          <span className="rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1.5 text-accent-300">
            {ITENS.length - divergentes} conferem
          </span>
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-amber-200">
            {divergentes} divergências
          </span>
        </div>
      </div>

      {/* No celular, cada item vira um bloco empilhado em vez de tabela larga. */}
      <ul className="divide-y divide-line sm:hidden">
        {ITENS.map((i) => {
          const problema = divergencia(i.pedido, i.nota);
          return (
            <li key={i.produto} className={`px-5 py-3.5 ${problema ? "bg-amber-400/[0.06]" : ""}`}>
              <p className="font-medium text-white">{i.produto}</p>
              <p className="mt-1 text-xs tabular-nums text-mist">
                Pedido {i.pedido[0]} × {real(i.pedido[1])} · Nota{" "}
                <span className={problema ? "font-semibold text-amber-200" : ""}>
                  {i.nota[0]} × {real(i.nota[1])}
                </span>
              </p>
              <p className={`mt-1.5 inline-flex items-start gap-1.5 text-xs ${problema ? "text-amber-200" : "text-accent-300"}`}>
                {problema ? <TriangleAlert size={13} className="mt-px shrink-0" aria-hidden="true" /> : <Check size={13} aria-hidden="true" />}
                {problema || "Confere"}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="hidden sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-mist/70">
              <th scope="col" className="px-5 py-3 font-medium sm:px-6">Produto</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Pedido</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Nota</th>
              <th scope="col" className="px-5 py-3 font-medium sm:px-6">Situação</th>
            </tr>
          </thead>
          <tbody>
            {ITENS.map((i) => {
              const problema = divergencia(i.pedido, i.nota);
              return (
                <tr key={i.produto} className={`border-t border-line ${problema ? "bg-amber-400/[0.06]" : ""}`}>
                  <td className="px-5 py-3 text-white sm:px-6">{i.produto}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-mist">
                    {i.pedido[0]} × {real(i.pedido[1])}
                  </td>
                  <td className={`whitespace-nowrap px-3 py-3 text-right tabular-nums ${problema ? "font-semibold text-amber-200" : "text-mist"}`}>
                    {i.nota[0]} × {real(i.nota[1])}
                  </td>
                  <td className="px-5 py-3 sm:px-6">
                    {problema ? (
                      <span className="inline-flex items-start gap-1.5 text-amber-200">
                        <TriangleAlert size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                        {problema}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-accent-300">
                        <Check size={15} aria-hidden="true" /> Confere
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink/40 px-5 py-4 text-sm sm:px-6">
        <span className="text-mist">Diferença entre a nota e o pedido</span>
        <span className="font-semibold tabular-nums text-amber-200">
          {diferenca > 0 ? "+ " : "− "}
          {real(Math.abs(diferenca))}
        </span>
      </div>
    </div>
  );
}
