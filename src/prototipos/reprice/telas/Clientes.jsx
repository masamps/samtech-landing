import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, FilePlus2, Search } from "lucide-react";
import { useEstado } from "../estado.jsx";
import { modeloPorId } from "../dados.js";
import { dataBR } from "../campos.js";
import { Botao, CarimboSituacao, Placa, Quadro, Rotulo, TipoServico, Vazio, estiloEntrada } from "../componentes/Ui.jsx";
import { prepararNovoLaudo } from "./NovoLaudo.jsx";

function useResumoClientes() {
  const { estado } = useEstado();
  return useMemo(
    () =>
      estado.clientes
        .map((c) => {
          const laudos = estado.laudos.filter((l) => l.proprietario.doc === c.doc && l.status !== "rascunho");
          const ultimo = laudos.map((l) => l.servico.dataEmissao).sort().at(-1);
          return { ...c, veiculos: estado.veiculos.filter((v) => v.clienteId === c.id), laudos, ultimo };
        })
        .sort((a, b) => (b.ultimo || "").localeCompare(a.ultimo || "")),
    [estado]
  );
}

export function ListaClientes() {
  const clientes = useResumoClientes();
  const [busca, setBusca] = useState("");
  const termo = busca.trim().toUpperCase();
  const digitos = termo.replace(/\W/g, "");
  const lista = clientes.filter(
    (c) => !termo || c.nome.includes(termo) || (digitos && c.doc.replace(/\D/g, "").includes(digitos)) || c.veiculos.some((v) => v.placa.replace("-", "").includes(digitos))
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:pt-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Rotulo>Cadastro</Rotulo>
          <h1 className="mt-1 font-cond text-[46px] font-bold uppercase leading-[0.9] sm:text-[60px]">Clientes e veículos</h1>
          <p className="mt-3 max-w-xl text-[15px] text-tinta-2">Montado sozinho a partir dos laudos emitidos. Ninguém cadastra nada à parte.</p>
        </div>
        <label className="relative block w-full sm:max-w-sm">
          <Rotulo>Buscar</Rotulo>
          <Search className="pointer-events-none absolute bottom-3 left-1 h-4 w-4 text-tinta-3" aria-hidden="true" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="nome, CPF/CNPJ ou placa" className={`${estiloEntrada()} pl-7`} />
        </label>
      </div>

      <div className="mt-8 border-[1.5px] border-tinta bg-papel-claro">
        {lista.length === 0 ? (
          <Vazio titulo="Ninguém com esse nome" />
        ) : (
          <ul>
            {lista.map((c) => (
              <li key={c.id} className="border-b border-linha last:border-b-0">
                <a href={`#/clientes/${c.id}`} className="group grid gap-3 px-4 py-4 transition-colors hover:bg-sinal-claro/70 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)_150px_24px] md:items-center md:px-5">
                  <span className="min-w-0">
                    <span className="block truncate font-cond text-[21px] font-semibold uppercase leading-tight tracking-[0.02em]">{c.nome}</span>
                    <span className="font-mono text-[12px] tabular-nums text-tinta-3">{c.doc} · {c.uf}</span>
                  </span>
                  <span className="flex flex-wrap gap-2">{c.veiculos.map((v) => <Placa key={v.id} placa={v.placa} />)}</span>
                  <span className="font-mono text-[12px] text-tinta-2">
                    {c.laudos.length} laudo{c.laudos.length === 1 ? "" : "s"}
                    {c.ultimo && <span className="block text-tinta-3">último {dataBR(c.ultimo)}</span>}
                  </span>
                  <ArrowRight className="hidden h-4 w-4 text-tinta-3 group-hover:text-tinta md:block" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function DetalheCliente({ id }) {
  const clientes = useResumoClientes();
  const c = clientes.find((x) => x.id === id);
  if (!c) {
    return <div className="px-6 py-16 text-center">Cliente não encontrado. <a className="font-semibold underline" href="#/clientes">Voltar</a></div>;
  }
  const dono = { nome: c.nome, doc: c.doc, uf: c.uf };
  const doVeiculo = (v) => ({ placa: v.placa, vin: v.vin, marcaModelo: v.marcaModelo, fabModelo: v.fabModelo });

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-8 sm:px-6 lg:pt-10">
      <a href="#/clientes" className="inline-flex items-center gap-1.5 font-cond text-[15px] font-semibold uppercase tracking-[0.1em] text-tinta-2 hover:text-tinta">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Clientes
      </a>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Rotulo>Ficha do cliente</Rotulo>
          <h1 className="mt-1 font-cond text-[38px] font-bold uppercase leading-[0.95] sm:text-[50px]">{c.nome}</h1>
          <p className="mt-2 font-mono text-[14px] tabular-nums text-tinta-2">{c.doc} · {c.uf}</p>
        </div>
        <Botao variante="primario" icone={FilePlus2} onClick={() => prepararNovoLaudo({ proprietario: dono })}>Novo laudo para este cliente</Botao>
      </div>

      <h2 className="mt-10 font-cond text-[15px] font-bold uppercase tracking-[0.16em]">Veículos</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {c.veiculos.map((v) => (
          <div key={v.id} className="flex items-start gap-4 border-[1.5px] border-tinta bg-papel-claro p-4">
            <Placa placa={v.placa} tamanho="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{v.marcaModelo}</p>
              <p className="font-mono text-[12px] text-tinta-3">{v.fabModelo}</p>
              <p className="mt-1 break-all font-mono text-[12.5px] text-tinta-2">{v.vin}</p>
              <Botao variante="texto" className="mt-2 text-[14px]" onClick={() => prepararNovoLaudo({ proprietario: dono, veiculo: doVeiculo(v) })}>
                Novo laudo deste veículo
              </Botao>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-cond text-[15px] font-bold uppercase tracking-[0.16em]">Laudos</h2>
      <div className="mt-3 border-[1.5px] border-tinta bg-papel-claro">
        {c.laudos.length === 0 ? (
          <Vazio titulo="Nenhum laudo emitido" />
        ) : (
          <ul>
            {[...c.laudos]
              .sort((a, b) => b.numero - a.numero)
              .map((l) => (
                <li key={l.id} className="border-b border-linha last:border-b-0">
                  <a href={`#/laudos/${l.id}`} className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 hover:bg-sinal-claro/70">
                    <span className={`w-20 font-mono text-[19px] font-semibold tabular-nums ${l.status === "cancelado" ? "text-carimbo-vermelho line-through" : ""}`}>{l.numero}</span>
                    <TipoServico modelo={modeloPorId(l.modeloId)} />
                    <Placa placa={l.veiculo.placa} />
                    <span className="flex-1 font-mono text-[13px] text-tinta-2">{dataBR(l.servico.dataEmissao)}</span>
                    <CarimboSituacao status={l.status} />
                  </a>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
