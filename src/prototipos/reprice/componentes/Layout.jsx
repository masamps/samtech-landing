import { Plus } from "lucide-react";
import { Escudo } from "./Marca.jsx";
import { Botao } from "./Ui.jsx";
import { navegar, useEstado } from "../estado.jsx";

const ABAS = [
  { caminho: "/laudos", rotulo: "Livro de laudos", curto: "Laudos" },
  { caminho: "/clientes", rotulo: "Clientes", curto: "Clientes" },
  { caminho: "/modelos", rotulo: "Modelos", curto: "Modelos" },
  { caminho: "/configuracoes", rotulo: "Ajustes", curto: "Ajustes" },
];

function Abas({ rota, compacta }) {
  const { estado } = useEstado();
  const rascunhos = estado.laudos.filter((l) => l.status === "rascunho").length;
  return ABAS.map(({ caminho, rotulo, curto }) => {
    const ativa = rota.startsWith(caminho);
    return (
      <a
        key={caminho}
        href={`#${caminho}`}
        aria-current={ativa ? "page" : undefined}
        className={[
          "relative flex shrink-0 items-center gap-2 font-cond font-semibold uppercase tracking-[0.1em] transition-colors",
          compacta ? "h-11 px-3 text-[14px]" : "h-full px-1 text-[15px]",
          ativa ? "text-tinta" : "text-tinta-3 hover:text-tinta",
        ].join(" ")}
      >
        <span className={ativa ? "grifo" : ""}>{compacta ? curto : rotulo}</span>
        {caminho === "/laudos" && rascunhos > 0 && (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center bg-tinta px-1 font-mono text-[10.5px] font-semibold text-sinal" title="Rascunhos em aberto">
            {rascunhos}
          </span>
        )}
      </a>
    );
  });
}

export default function Layout({ rota, children }) {
  const { estado, avisoArmazenamento } = useEstado();
  const noEditor = /\/editar$/.test(rota);

  return (
    <div className="textura-papel flex min-h-screen flex-col">
      <div className="faixa-risco h-[5px]" aria-hidden="true" />
      <header className="border-b-[1.5px] border-tinta bg-papel-claro">
        <div className="mx-auto flex h-16 max-w-[1440px] items-stretch gap-5 px-4 sm:px-6 lg:gap-8">
          <a href="#/laudos" className="flex shrink-0 items-center gap-2.5">
            <Escudo className="h-10 w-10" />
            <span className="leading-none">
              <span className="block font-cond text-[24px] font-bold tracking-[0.06em]">{estado.empresa.fantasia.toUpperCase()}</span>
              <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-tinta-3">
                Laudos · {estado.empresa.cidade}/{estado.empresa.uf}
              </span>
            </span>
          </a>
          <nav aria-label="Principal" className="hidden items-stretch gap-6 md:flex">
            <Abas rota={rota} />
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <div className="hidden text-right leading-none lg:block">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-tinta-3">Próximo nº</span>
              <span className="mt-1 block font-mono text-[19px] font-semibold tabular-nums">
                {estado.numeracao.proximo}
                <span className="text-tinta-3">/{estado.numeracao.ano}</span>
              </span>
            </div>
            {!noEditor && (
              <Botao variante="primario" icone={Plus} onClick={() => navegar("/laudos/novo")} className="px-3 sm:px-4">
                <span className="hidden sm:inline">Novo laudo</span>
                <span className="sm:hidden">Novo</span>
              </Botao>
            )}
          </div>
        </div>
        <nav aria-label="Principal" className="flex overflow-x-auto border-t border-linha px-1 md:hidden">
          <Abas rota={rota} compacta />
        </nav>
      </header>

      {avisoArmazenamento && (
        <div className="border-b-[1.5px] border-tinta bg-sinal-claro px-4 py-2.5 font-mono text-[12.5px]">
          O espaço do navegador encheu com as fotos. O protótipo segue funcionando, mas o que for novo não fica salvo ao recarregar. No sistema real as fotos ficam no servidor.
        </div>
      )}

      <main className="flex-1">{children}</main>

      {!noEditor && (
        <footer className="mx-auto flex w-full max-w-[1440px] flex-wrap justify-between gap-2 px-4 pb-8 pt-12 font-mono text-[10.5px] uppercase tracking-[0.12em] text-tinta-3 sm:px-6">
          <span>Protótipo navegável · dados fictícios · tudo fica só neste navegador</span>
          <span>Samps Projetos</span>
        </footer>
      )}
    </div>
  );
}
