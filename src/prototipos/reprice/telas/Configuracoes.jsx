import { useState } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { navegar, useEstado } from "../estado.jsx";
import { UFS, mascaraDoc, problemaDoc } from "../campos.js";
import { Botao, Campo, Modal, Quadro, Rotulo, estiloEntrada, useAviso } from "../componentes/Ui.jsx";
import { Rubrica } from "../componentes/Marca.jsx";

export default function Configuracoes() {
  const { estado, acoes } = useEstado();
  const avisar = useAviso();
  const [restaurando, setRestaurando] = useState(false);
  const e = estado.empresa;
  const erroCnpj = problemaDoc(e.cnpj);

  const campoEmpresa = (chave, rotulo, extra = {}) => (
    <Campo rotulo={rotulo} className={extra.className} erro={extra.erro}>
      {(a) => (
        <input
          {...a}
          value={e[chave]}
          onChange={(ev) => acoes.atualizarEmpresa({ [chave]: extra.mascara ? extra.mascara(ev.target.value) : ev.target.value })}
          className={`${estiloEntrada(extra.erro)} ${extra.mono ? "font-mono text-[14px]" : ""}`}
        />
      )}
    </Campo>
  );

  const remarcadores = estado.remarcadores;
  const ativos = remarcadores.filter((r) => r.ativo).length;
  const mudar = (id, dados) => acoes.atualizarRemarcadores(remarcadores.map((r) => (r.id === id ? { ...r, ...dados } : r)));

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-8 sm:px-6 lg:pt-10">
      <Rotulo>Sistema</Rotulo>
      <h1 className="mt-1 font-cond text-[46px] font-bold uppercase leading-[0.9] sm:text-[60px]">Ajustes</h1>
      <p className="mt-3 text-[15px] text-tinta-2">O que muda aqui aparece nos próximos laudos.</p>

      <div className="mt-8 space-y-6">
        <Quadro titulo="Dados da empresa" corpo="p-5 sm:p-6">
          <p className="mb-5 font-mono text-[11.5px] text-tinta-3">impressos no rodapé de todo laudo</p>
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {campoEmpresa("razao", "Razão social", { className: "sm:col-span-2" })}
            {campoEmpresa("fantasia", "Nome fantasia")}
            {campoEmpresa("cnpj", "CNPJ", { mascara: mascaraDoc, mono: true, erro: erroCnpj })}
            {campoEmpresa("endereco", "Endereço", { className: "sm:col-span-2" })}
            {campoEmpresa("bairro", "Bairro")}
            <div className="grid grid-cols-[minmax(0,1fr)_84px] gap-4">
              {campoEmpresa("cidade", "Cidade")}
              <Campo rotulo="UF">
                {(a) => (
                  <select {...a} value={e.uf} onChange={(ev) => acoes.atualizarEmpresa({ uf: ev.target.value })} className={estiloEntrada()}>
                    {UFS.map((uf) => <option key={uf}>{uf}</option>)}
                  </select>
                )}
              </Campo>
            </div>
            {campoEmpresa("fone", "Telefone", { mono: true })}
            {campoEmpresa("email", "E-mail")}
          </div>
        </Quadro>

        <Quadro titulo="Remarcadores responsáveis" corpo="p-5 sm:p-6">
          <p className="mb-4 text-[14.5px] text-tinta-2">Aparecem no campo de assinatura — até 3, como no laudo atual. A assinatura vai só em quem fez o serviço.</p>
          <ul className="border-t-[1.5px] border-tinta">
            {remarcadores.map((r) => (
              <li key={r.id} className="flex flex-col gap-3 border-b border-linha py-3 sm:flex-row sm:items-center">
                <Rubrica nome={r.nome} className={`h-11 w-32 shrink-0 ${r.ativo ? "" : "opacity-25"}`} />
                <input value={r.nome} onChange={(ev) => mudar(r.id, { nome: ev.target.value })} aria-label="Nome do remarcador" className={`${estiloEntrada()} flex-1`} />
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={r.ativo}
                      disabled={!r.ativo && ativos >= 3}
                      onChange={(ev) => mudar(r.id, { ativo: ev.target.checked })}
                      className="h-4 w-4 accent-[#17140F]"
                    />
                    <Rotulo className="text-tinta">No laudo</Rotulo>
                  </label>
                  <button type="button" onClick={() => acoes.atualizarRemarcadores(remarcadores.filter((x) => x.id !== r.id))} className="p-2 text-tinta-3 hover:bg-red-50 hover:text-carimbo-vermelho" aria-label={`Remover ${r.nome}`}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Botao tamanho="sm" icone={Plus} onClick={() => acoes.atualizarRemarcadores([...remarcadores, { id: `r${Date.now().toString(36)}`, nome: "Novo remarcador", ativo: ativos < 3 }])}>
              Adicionar
            </Botao>
            <span className="font-mono text-[11.5px] text-tinta-3">no sistema, cada um envia a foto da própria assinatura</span>
          </div>
        </Quadro>

        <Quadro titulo="Numeração" corpo="p-5 sm:p-6">
          <div className="grid max-w-md grid-cols-2 gap-6">
            <Campo rotulo="Próximo número">
              {(a) => <input {...a} type="number" min={1} value={estado.numeracao.proximo} onChange={(ev) => acoes.atualizarNumeracao({ proximo: Math.max(1, Number(ev.target.value) || 1) })} className={`${estiloEntrada()} font-mono text-[18px]`} />}
            </Campo>
            <Campo rotulo="Ano">
              {(a) => <input {...a} type="number" value={estado.numeracao.ano} onChange={(ev) => acoes.atualizarNumeracao({ ano: Number(ev.target.value) || estado.numeracao.ano })} className={`${estiloEntrada()} font-mono text-[18px]`} />}
            </Campo>
          </div>
          <p className="mt-4 text-[14.5px] leading-snug text-tinta-2">
            O número só é atribuído na emissão — rascunho descartado não deixa buraco. Começa em {estado.numeracao.proximo}, continuando de onde os laudos em Word pararam. No sistema real, só o administrador altera.
          </p>
        </Quadro>

        <div className="flex flex-wrap items-center justify-between gap-3 border-[1.5px] border-dashed border-tinta-3 px-5 py-4">
          <p className="text-[14.5px] text-tinta-2">Tudo o que você criou fica só neste navegador. Para recomeçar com os exemplos, restaure.</p>
          <Botao variante="perigo" icone={RotateCcw} onClick={() => setRestaurando(true)}>Restaurar exemplos</Botao>
        </div>
      </div>

      <Modal
        aberto={restaurando}
        aoFechar={() => setRestaurando(false)}
        titulo="Restaurar os exemplos?"
        rodape={
          <>
            <Botao onClick={() => setRestaurando(false)}>Cancelar</Botao>
            <Botao variante="perigoCheio" icone={RotateCcw} onClick={() => { acoes.restaurar(); setRestaurando(false); avisar("Exemplos restaurados.", "info"); navegar("/laudos"); }}>Restaurar</Botao>
          </>
        }
      >
        <p className="text-[15px] text-tinta-2">Laudos, clientes e ajustes feitos neste navegador serão apagados.</p>
      </Modal>
    </div>
  );
}
