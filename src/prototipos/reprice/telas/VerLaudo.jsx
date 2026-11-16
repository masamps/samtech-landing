import { useEffect, useState } from "react";
import { ArrowLeft, Ban, FilePlus2, Printer } from "lucide-react";
import { navegar, useEstado } from "../estado.jsx";
import { CAMPOS_VEICULO, camposDoModelo, modeloPorId } from "../dados.js";
import { dataBR } from "../campos.js";
import { Botao, CarimboSituacao, Modal, Placa, Quadro, Rotulo, TipoServico, estiloEntrada, useAviso } from "../componentes/Ui.jsx";
import { AreaImpressao, Previa } from "../componentes/Previa.jsx";
import { prepararNovoLaudo } from "./NovoLaudo.jsx";

let recemEmitido = null;
export const marcarRecemEmitido = (id) => {
  recemEmitido = id;
};

const dataHora = (iso) => (iso ? `${dataBR(iso.slice(0, 10))} ${iso.slice(11, 16)}` : "");

function Item({ rotulo, children, mono }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-linha py-2 last:border-b-0">
      <dt><Rotulo>{rotulo}</Rotulo></dt>
      <dd className={`min-w-0 text-right text-[14px] font-semibold ${mono ? "break-all font-mono text-[13px]" : ""}`}>{children || "—"}</dd>
    </div>
  );
}

export default function VerLaudo({ id }) {
  const { estado, acoes } = useEstado();
  const avisar = useAviso();
  const laudo = estado.laudos.find((l) => l.id === id);
  const [cancelando, setCancelando] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [sucesso] = useState(() => recemEmitido === id);

  useEffect(() => {
    recemEmitido = null;
    if (laudo?.status === "rascunho") navegar(`/laudos/${id}/editar`);
  }, [laudo, id]);

  if (!laudo) {
    return (
      <div className="px-6 py-16 text-center">
        Laudo não encontrado. <a className="font-semibold underline" href="#/laudos">Voltar ao livro</a>
      </div>
    );
  }

  const modelo = modeloPorId(laudo.modeloId);
  const remarcador = estado.remarcadores.find((r) => r.id === laudo.servico.remarcadorId);
  const { proprietario: p, veiculo: v, autorizacao: a } = laudo;

  function confirmarCancelamento() {
    acoes.cancelar(laudo.id, motivo.trim());
    setCancelando(false);
    avisar(`Laudo ${laudo.numero} cancelado. O número continua no livro, sem reaproveitamento.`, "info");
  }

  const registro = [
    ["Rascunho aberto", laudo.criadoEm],
    laudo.emitidoEm && [`Emitido com o nº ${laudo.numero}`, laudo.emitidoEm],
    laudo.cancelamento && [`Cancelado — “${laudo.cancelamento.motivo}”`, laudo.cancelamento.em],
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:pt-10">
      <a href="#/laudos" className="inline-flex items-center gap-1.5 font-cond text-[15px] font-semibold uppercase tracking-[0.1em] text-tinta-2 hover:text-tinta">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Livro
      </a>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Rotulo>Laudo técnico</Rotulo>
            <TipoServico modelo={modelo} />
          </div>
          <h1 className="mt-1 font-mono text-[44px] font-semibold leading-none tracking-tight sm:text-[56px]">
            {laudo.numero}
            <span className="text-tinta-3">/{laudo.ano}</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Placa placa={v.placa} tamanho="lg" />
            <span className="min-w-0 text-[15px]">
              <span className="block font-semibold">{p.nome}</span>
              <span className="block text-tinta-2">{v.marcaModelo}</span>
            </span>
          </div>
        </div>
        <CarimboSituacao status={laudo.status} tamanho="lg" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Botao variante="primario" icone={Printer} onClick={() => window.print()}>Imprimir / salvar PDF</Botao>
        <Botao
          icone={FilePlus2}
          onClick={() => prepararNovoLaudo({ proprietario: { nome: p.nome, doc: p.doc, uf: p.uf }, veiculo: { placa: v.placa, vin: v.vin, marcaModelo: v.marcaModelo, fabModelo: v.fabModelo } })}
        >
          Novo laudo deste veículo
        </Botao>
        {laudo.status === "emitido" && (
          <Botao variante="perigo" icone={Ban} onClick={() => setCancelando(true)} className="sm:ml-auto">Cancelar laudo</Botao>
        )}
      </div>

      {sucesso && laudo.status === "emitido" && (
        <div className="mt-5 flex items-stretch border-[1.5px] border-tinta bg-sinal-claro">
          <span className="faixa-risco w-3 shrink-0" aria-hidden="true" />
          <p className="px-4 py-3 text-[15px]">
            <span className="font-cond font-bold uppercase tracking-[0.08em]">Emitido · </span>
            número {laudo.numero}/{laudo.ano} registrado no livro; cliente e veículo salvos no cadastro.
          </p>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <Previa laudo={laudo} />
        </div>
        <div className="space-y-4">
          <Quadro titulo="Resumo" corpo="px-4 py-1">
            <dl>
              <Item rotulo="CPF / CNPJ" mono>{p.doc}</Item>
              {camposDoModelo(modelo)
                .filter((c) => !["placa", "marcaModelo"].includes(c))
                .map((c) => (
                  <Item key={c} rotulo={CAMPOS_VEICULO[c].rotulo} mono={c !== "localGravacao"}>{v[c]}</Item>
                ))}
              <Item rotulo="Autorização" mono>{a.numero}</Item>
              <Item rotulo="CIRETRAN">{a.ciretran}</Item>
              <Item rotulo="Remarcador">{remarcador?.nome}</Item>
              <Item rotulo="Nota fiscal" mono>{laudo.servico.nf}</Item>
            </dl>
          </Quadro>
          <Quadro titulo="Registro" corpo="px-4 py-2">
            <ol>
              {registro.map(([texto, quando]) => (
                <li key={texto} className="flex gap-3 border-b border-linha py-2.5 last:border-b-0">
                  <span className="w-[86px] shrink-0 font-mono text-[11.5px] leading-snug text-tinta-3">{dataHora(quando)}</span>
                  <span className="text-[14px] leading-snug">{texto}</span>
                </li>
              ))}
            </ol>
          </Quadro>
          <p className="border-l-[3px] border-sinal pl-3 text-[13.5px] leading-snug text-tinta-2">
            Laudo emitido não se edita: o impresso e o guardado são sempre o mesmo. Para corrigir, cancela-se com justificativa e emite-se outro.
          </p>
        </div>
      </div>

      <AreaImpressao laudo={laudo} />

      <Modal
        aberto={cancelando}
        aoFechar={() => setCancelando(false)}
        titulo={`Cancelar o laudo nº ${laudo.numero}/${laudo.ano}?`}
        rodape={
          <>
            <Botao onClick={() => setCancelando(false)}>Voltar</Botao>
            <Botao variante="perigoCheio" icone={Ban} disabled={motivo.trim().length < 10} onClick={confirmarCancelamento}>Cancelar laudo</Botao>
          </>
        }
      >
        <p className="text-[15px] leading-snug text-tinta-2">
          O laudo continua no livro, carimbado como cancelado. O número {laudo.numero} não é reaproveitado — a sequência fica íntegra.
        </p>
        <label htmlFor="motivo" className="mt-4 block"><Rotulo>Motivo do cancelamento</Rotulo></label>
        <textarea id="motivo" rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} maxLength={300} className={`${estiloEntrada()} resize-none`} placeholder="Ex.: placa digitada errada; laudo refeito." />
        <p className="mt-1.5 font-mono text-[11px] text-tinta-3">mínimo de 10 caracteres · fica no registro</p>
      </Modal>
    </div>
  );
}
