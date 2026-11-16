import { useRef, useState } from "react";
import { Camera, ImagePlus, LoaderCircle, X } from "lucide-react";
import { CAMPOS_VEICULO, MODELOS, modeloPorId } from "../dados.js";
import { UFS, dataBR } from "../campos.js";
import { fonteDaFoto, prepararFoto } from "../imagens.js";
import { Carimbo, Escudo, Rubrica } from "./Marca.jsx";

/*
 * O laudo em A4. A estrutura segue o documento em Word que a Reprice usa hoje,
 * seção por seção, para que o resultado impresso seja reconhecido de cara.
 * Largura fixa de 734 px = área útil de uma folha A4 com margem de 8 mm.
 *
 * Com a prop `edicao`, o próprio documento vira o formulário: cada célula
 * aceita digitação (modo "linha", mouse e teclado) ou abre a folha de edição
 * (modo "toque", celular). Sem `edicao`, é só leitura — para ver e imprimir.
 */
export const LARGURA_LAUDO = 734;

const SERIF = '"Times New Roman", Times, "Liberation Serif", serif';

// Peso de cada célula na linha — reproduz as proporções do laudo original.
const PESOS = { vin: 3.2, vinGravado: 3.2, marcaModelo: 3.4, fabModelo: 1.8, placa: 1.6, motorOriginal: 2.4, motorGravado: 2.4, localGravacao: 5 };

const AMARELO = "bg-[#FBEAA2]";

function realce(edicao, id) {
  if (edicao.ativo === id) return `${AMARELO} shadow-[inset_0_0_0_2px_#17140F]`;
  if (edicao.problemas[id]) return "bg-[#F9E1DD] shadow-[inset_0_-2.5px_0_#B3261E]";
  if (edicao.pendentes.has(id)) return "bg-[#FBEAA2]/50 hover:bg-[#FBEAA2]";
  return "hover:bg-[#FBEAA2]/40";
}

function exibir(def, valor) {
  if (!valor) return "";
  if (def.tipo === "modelo") return modeloPorId(valor).tipoServico;
  if (def.tipo === "data") return dataBR(valor);
  return valor;
}

/* Controle digitável dentro da célula, com a mesma letra do documento. */
function Controle({ def, laudo, edicao }) {
  const valor = def.ler(laudo);
  const comum = {
    "data-campo": def.id,
    "aria-label": def.rotulo,
    "aria-invalid": edicao.problemas[def.id] ? true : undefined,
    onFocus: () => edicao.aoFocar(def.id),
    onBlur: () => edicao.aoSair(def.id),
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        edicao.aoAvancar(def.id);
      }
    },
  };
  const base = "block w-full min-w-0 bg-transparent p-0 text-[11px] font-bold uppercase leading-tight text-black outline-none";
  const mudar = (v) => edicao.aoMudar(def.id, v);

  if (def.tipo === "modelo" || def.tipo === "uf") {
    const opcoes = def.tipo === "modelo" ? MODELOS.map((m) => [m.id, m.tipoServico]) : UFS.map((uf) => [uf, uf]);
    return (
      <select {...comum} value={valor} onChange={(e) => mudar(e.target.value)} className={`${base} cursor-pointer appearance-none`}>
        {opcoes.map(([v, r]) => (
          <option key={v} value={v}>{r}</option>
        ))}
      </select>
    );
  }
  if (def.tipo === "data") {
    return <input {...comum} type="date" value={valor} onChange={(e) => mudar(e.target.value)} className={`${base} cursor-text`} />;
  }
  return (
    <input
      {...comum}
      value={valor}
      onChange={(e) => mudar(def.mascara ? def.mascara(e.target.value) : e.target.value)}
      placeholder={def.placeholder}
      inputMode={def.inputMode}
      autoComplete="off"
      spellCheck={false}
      className={`${base} placeholder:font-normal placeholder:normal-case placeholder:italic placeholder:text-neutral-400`}
    />
  );
}

function Celula({ id, rotulo, valor, peso = 1, laudo, edicao }) {
  const def = edicao?.campos.get(id);
  const caixa = "flex min-w-0 flex-col justify-between border-r border-black px-1.5 py-1 text-left last:border-r-0";
  const estilo = { flex: `${peso} 1 0` };

  if (!def) {
    return (
      <div className={caixa} style={estilo}>
        <span className="text-[9.5px] font-bold leading-tight">{rotulo}</span>
        <span className={`mt-1 truncate text-[11px] font-bold uppercase leading-tight ${valor ? "" : "text-neutral-300"}`}>{valor || "—"}</span>
      </div>
    );
  }

  if (edicao.modo === "toque") {
    const texto = exibir(def, def.ler(laudo));
    return (
      <button type="button" data-campo={id} onClick={() => edicao.aoTocar(id)} className={`${caixa} ${realce(edicao, id)}`} style={estilo} aria-label={`${def.rotulo}: ${texto || "vazio"}`}>
        <span className="text-[9.5px] font-bold leading-tight">{rotulo}</span>
        <span className={`mt-1 truncate text-[11px] uppercase leading-tight ${texto ? "font-bold" : "font-normal normal-case italic text-neutral-400"}`}>
          {texto || def.placeholder || "tocar para preencher"}
        </span>
      </button>
    );
  }

  return (
    <label className={`${caixa} cursor-text ${realce(edicao, id)}`} style={estilo}>
      <span className="text-[9.5px] font-bold leading-tight">{rotulo}</span>
      <span className="mt-1 block">
        <Controle def={def} laudo={laudo} edicao={edicao} />
      </span>
    </label>
  );
}

const Linha = ({ children }) => <div className="flex border-b border-black">{children}</div>;

const Faixa = ({ children }) => <div className="border-b border-black py-[3px] text-center text-[11px] font-bold tracking-wide">{children}</div>;

function FotoLeitura({ valor, laudo, rotulo, altura }) {
  const src = fonteDaFoto(valor, laudo);
  if (src) return <img src={src} alt={rotulo} className="block w-full object-cover" style={{ height: altura }} draggable={false} />;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 bg-neutral-100 text-neutral-400" style={{ height: altura }}>
      <Camera className="h-5 w-5" aria-hidden="true" />
      <span className="font-sans text-[10px] font-semibold uppercase tracking-wide">{rotulo}</span>
    </div>
  );
}

/* Espaço de foto que aceita clique (no celular, câmera), arrastar e Ctrl+V. */
function FotoEditavel({ def, laudo, edicao, altura }) {
  const entrada = useRef(null);
  const [processando, setProcessando] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const src = fonteDaFoto(def.ler(laudo), laudo);
  const toque = edicao.modo === "toque";

  async function receber(arquivo) {
    if (!arquivo) return;
    setProcessando(true);
    try {
      edicao.aoMudar(def.id, await prepararFoto(arquivo));
    } catch (erro) {
      edicao.aoErro(erro.message);
    } finally {
      setProcessando(false);
    }
  }
  const abrir = () => entrada.current?.click();

  return (
    <div
      data-campo={def.id}
      role="button"
      tabIndex={0}
      aria-label={`${def.rotulo}: ${src ? "foto anexada, clique para trocar" : "sem foto, clique para anexar"}`}
      onClick={abrir}
      onFocus={() => edicao.aoFocar(def.id)}
      onBlur={() => edicao.aoSair(def.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrir();
        }
      }}
      onPaste={(e) => {
        const arquivo = [...e.clipboardData.files].find((f) => f.type.startsWith("image/"));
        if (arquivo) {
          e.preventDefault();
          receber(arquivo);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setArrastando(true);
      }}
      onDragLeave={() => setArrastando(false)}
      onDrop={(e) => {
        e.preventDefault();
        setArrastando(false);
        receber(e.dataTransfer.files[0]);
      }}
      className={`group relative w-full cursor-pointer overflow-hidden outline-none ${arrastando ? `${AMARELO} shadow-[inset_0_0_0_2px_#17140F]` : src ? (edicao.ativo === def.id ? "shadow-[inset_0_0_0_2px_#17140F]" : "") : realce(edicao, def.id)}`}
      style={{ height: altura }}
    >
      <input
        ref={entrada}
        type="file"
        accept="image/*"
        className="hidden"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          receber(e.target.files[0]);
          e.target.value = "";
        }}
      />
      {src ? (
        <>
          <img src={src} alt={def.rotulo} className="block h-full w-full object-cover" draggable={false} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              edicao.aoMudar(def.id, null);
            }}
            aria-label={`Remover ${def.rotulo}`}
            className={`absolute right-1 top-1 flex h-6 w-6 items-center justify-center border border-black bg-white text-black transition ${toque ? "" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-[1.5px] border-dashed border-[#A99F8B] px-2 text-center font-sans">
          <ImagePlus className="h-6 w-6 text-[#4A443A]" strokeWidth={1.8} aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#17140F]">{def.rotulo}</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-[#7A7164]">{toque ? "Tocar para fotografar" : "Clique · arraste · Ctrl+V"}</span>
        </div>
      )}
      {processando && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <LoaderCircle className="h-6 w-6 animate-spin text-black" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function Foto({ chave, rotulo, laudo, edicao, altura }) {
  const def = edicao?.campos.get(`f.${chave}`);
  if (def) return <FotoEditavel def={def} laudo={laudo} edicao={edicao} altura={altura} />;
  return <FotoLeitura valor={laudo.fotos[chave]} laudo={laudo} rotulo={rotulo} altura={altura} />;
}

// Modelos com mais linhas de dados do veículo ganham fotos um pouco mais baixas,
// para o laudo continuar cabendo numa folha A4.
function alturasDasFotos(modelo) {
  const linhasExtras = modelo.linhasVeiculo.length - 1;
  return { destaque: 176 - linhasExtras * 22, grade: 150 - linhasExtras * 16 };
}

function BlocoFotos({ bloco, laudo, edicao, alturas }) {
  if (bloco.tipo === "destaque") {
    const slot = bloco.slots[0];
    return (
      <>
        <Faixa>{bloco.titulo}</Faixa>
        <div className="flex items-center justify-around border-b border-black px-3 py-2">
          <Carimbo rotacao={-14} />
          <div className="w-[300px] overflow-hidden border border-neutral-400">
            <Foto chave={slot.chave} rotulo={slot.rotulo} laudo={laudo} edicao={edicao} altura={alturas.destaque} />
          </div>
          <Carimbo rotacao={18} />
        </div>
      </>
    );
  }
  return (
    <>
      <Faixa>{bloco.titulo}</Faixa>
      <div className="flex border-b border-black">
        {bloco.slots.map((slot) => (
          <div key={slot.chave} className="min-w-0 flex-1 border-r border-black last:border-r-0">
            <div className="border-b border-black py-[2px] text-center text-[11px]">{slot.rotulo}</div>
            <div className="p-1.5">
              <Foto chave={slot.chave} rotulo={slot.rotulo} laudo={laudo} edicao={edicao} altura={alturas.grade} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Assinaturas({ laudo, empresa, remarcadores, edicao }) {
  const assinantes = remarcadores.filter((r) => r.ativo).slice(0, 3);
  const escolhido = laudo.servico.remarcadorId;
  const editavel = edicao?.campos.has("s.remarcadorId");

  return (
    <div className="flex border-b border-black">
      {assinantes.map((r, i) => {
        const assinou = r.id === escolhido;
        const conteudo = (
          <>
            {assinou && (
              <span className="absolute left-1/2 top-1 -translate-x-1/2">
                <Rubrica nome={r.nome} />
              </span>
            )}
            {editavel && !assinou && (
              <span className={`absolute inset-x-0 top-3 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A7164] transition ${edicao.modo === "toque" && !escolhido ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                {edicao.modo === "toque" ? "tocar para assinar" : "clique para assinar"}
              </span>
            )}
            <span className="block w-[72%] border-t border-black" />
            <span className="mt-1 text-[13px]">{r.nome}</span>
            <span className="text-[13px] font-bold">{empresa.fantasia} Ltda</span>
          </>
        );
        const caixa = "group relative flex flex-1 flex-col items-center border-r border-black px-2 pb-2 pt-10 last:border-r-0";
        if (!editavel) return <div key={r.id} className={caixa}>{conteudo}</div>;
        const destaque = edicao.problemas["s.remarcadorId"]
          ? "bg-[#F9E1DD]"
          : !escolhido && edicao.pendentes.has("s.remarcadorId")
            ? "bg-[#FBEAA2]/50"
            : "";
        return (
          <button
            key={r.id}
            type="button"
            data-campo={i === 0 ? "s.remarcadorId" : undefined}
            aria-pressed={assinou}
            aria-label={`Assinar como ${r.nome}`}
            onFocus={() => edicao.aoFocar("s.remarcadorId")}
            onBlur={() => edicao.aoSair("s.remarcadorId")}
            onClick={() => edicao.aoMudar("s.remarcadorId", r.id)}
            className={`${caixa} cursor-pointer outline-none hover:bg-[#FBEAA2] focus-visible:shadow-[inset_0_0_0_2px_#17140F] ${destaque}`}
          >
            {conteudo}
          </button>
        );
      })}
    </div>
  );
}

export default function Laudo({ laudo, empresa, remarcadores, declaracao, marcaDagua = true, edicao }) {
  const modelo = modeloPorId(laudo.modeloId);
  const { autorizacao: a, proprietario: p, veiculo: v, servico: s } = laudo;
  const c = { laudo, edicao };

  return (
    <article
      className="relative overflow-hidden bg-white text-black"
      style={{ width: LARGURA_LAUDO, fontFamily: SERIF }}
      aria-label={`Laudo técnico ${laudo.numero ? `${laudo.numero}/${laudo.ano}` : "em rascunho"}`}
    >
      <div className="border-[1.5px] border-black">
        <div className="flex border-b border-black">
          <div className="flex w-[38%] items-center justify-center border-r border-black py-2.5">
            <Escudo className="h-[58px] w-[58px]" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-3 py-2.5">
            <span className="text-[25px] font-bold tracking-wide">LAUDO TÉCNICO</span>
            <span className="text-[15px] font-bold">
              Nº:{" "}
              {laudo.numero ? (
                <span className="font-normal">{laudo.numero} / {laudo.ano}</span>
              ) : (
                <span className="font-normal text-neutral-400">na emissão</span>
              )}
            </span>
          </div>
        </div>

        <Faixa>IDENTIFICAÇÃO DA AUTORIZAÇÃO</Faixa>
        <Linha>
          <Celula id="modelo" rotulo="TIPO SERVIÇO:" valor={modelo.tipoServico} peso={3.2} {...c} />
          <Celula id="a.ciretran" rotulo="CIRETRAN / ESTADO:" valor={a.ciretran} peso={3} {...c} />
          <Celula id="a.numero" rotulo="N. AUTORIZAÇÃO:" valor={a.numero} peso={1.6} {...c} />
          <Celula id="a.responsavel" rotulo="RESPONSÁVEL AUTORIZAÇÃO:" valor={a.responsavel} peso={2.2} {...c} />
        </Linha>

        <Faixa>IDENTIFICAÇÃO DO PROPRIETÁRIO</Faixa>
        <Linha>
          <Celula id="p.nome" rotulo="PROPRIETÁRIO VEÍCULO:" valor={p.nome} peso={6} {...c} />
          <Celula id="p.doc" rotulo="CPF / CNPJ:" valor={p.doc} peso={2.4} {...c} />
          <Celula id="p.uf" rotulo="UF:" valor={p.uf} peso={1.6} {...c} />
        </Linha>
        {modelo.linhasVeiculo.map((linha, i) => (
          <Linha key={i}>
            {linha.map((chave) => (
              <Celula key={chave} id={`v.${chave}`} rotulo={`${CAMPOS_VEICULO[chave].noLaudo}:`} valor={v[chave]} peso={PESOS[chave]} {...c} />
            ))}
          </Linha>
        ))}

        <Faixa>DECLARAÇÃO DA PRESTAÇÃO DO SERVIÇO</Faixa>
        <p className="border-b border-black px-2 py-1.5 text-[10.5px] leading-snug">{declaracao}</p>

        {modelo.fotos.map((bloco) => (
          <BlocoFotos key={bloco.titulo} bloco={bloco} laudo={laudo} edicao={edicao} alturas={alturasDasFotos(modelo)} />
        ))}

        <Linha>
          <Celula id="s.dataGravacao" rotulo={`${modelo.rotuloDataServico}:`} valor={dataBR(s.dataGravacao)} {...c} />
          <Celula id="s.dataEmissao" rotulo="DATA EMISSÃO:" valor={dataBR(s.dataEmissao)} {...c} />
          <Celula id="s.nf" rotulo="Nº DA NOTA FISCAL EMITIDA:" valor={s.nf} {...c} />
        </Linha>

        <div className="border-b border-black py-1 text-center text-[13px]">Assinatura do Remarcador responsável pelo Serviço</div>
        <Assinaturas laudo={laudo} empresa={empresa} remarcadores={remarcadores} edicao={edicao} />

        <div className="py-2.5 text-center text-[11.5px] leading-[1.45]">
          <p className="mb-1 font-bold">DADOS DA EMPRESA :</p>
          <p className="uppercase">{empresa.razao}</p>
          <p>CNPJ: {empresa.cnpj}</p>
          <p className="uppercase">{empresa.endereco}</p>
          <p className="uppercase">{empresa.bairro} - {empresa.cidade} - {empresa.uf}</p>
          <p>Fone.: {empresa.fone}</p>
          <p className="mt-1">Email.: {empresa.email}</p>
        </div>
      </div>

      {laudo.status === "cancelado" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="-rotate-12 border-[6px] border-double border-red-700 px-8 py-3 text-center text-red-700 opacity-80 mix-blend-multiply" style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif' }}>
            <p className="text-[64px] font-bold leading-none tracking-[0.18em]">CANCELADO</p>
            {laudo.cancelamento?.motivo && <p className="mt-2 max-w-[440px] font-sans text-[13px] font-semibold tracking-normal">{laudo.cancelamento.motivo}</p>}
          </div>
        </div>
      )}

      {/* Marca d'água: o protótipo fica num link público e usa a identidade da
          empresa, então nada impresso daqui pode passar por documento válido. */}
      {marcaDagua && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-36 overflow-hidden" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="-rotate-[28deg] whitespace-nowrap text-[30px] font-black tracking-[0.12em] text-red-700/[0.10]" style={{ fontFamily: "Arial, sans-serif" }}>
              DEMONSTRAÇÃO · SEM VALOR LEGAL
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
