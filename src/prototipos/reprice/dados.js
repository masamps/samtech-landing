import { hojeISO } from "./campos.js";

// Dados da empresa: públicos, impressos no rodapé do próprio laudo dela.
export const EMPRESA_PADRAO = {
  razao: "REPRICE - MARCAÇÃO E REMARCAÇÃO DE CHASSI E MOTORES LTDA",
  fantasia: "Reprice",
  cnpj: "24.337.932/0001-92",
  endereco: "Av. Santa Catarina, 594",
  bairro: "Santa Helena",
  cidade: "Lages",
  uf: "SC",
  fone: "(49) 98845-6337",
  email: "repricelages@gmail.com",
};

// Pessoas fictícias. No sistema real entram os remarcadores dela, com a
// assinatura digitalizada de cada um.
export const REMARCADORES_PADRAO = [
  { id: "r1", nome: "Luana Hoffmann Duarte", ativo: true },
  { id: "r2", nome: "Bel. Marina Teixeira", ativo: true },
  { id: "r3", nome: "Bel. Otávio R. Vieira Jr", ativo: true },
];

export const DECLARACAO_PADRAO =
  "Declaro para o devido fim, que foi realizado por esta empresa o serviço acima autorizado, " +
  "dentro dos critérios estabelecidos pela Lei Nº 9.503 do Código de Trânsito Brasileiro, e " +
  "Portaria 0560/18/DETRAN/SC/ASJUR/2018 no veículo supracitado, conforme os dados " +
  "comprobatórios abaixo especificados neste laudo técnico.";

// Definição de cada campo do veículo, compartilhada entre os modelos.
export const CAMPOS_VEICULO = {
  vin: { rotulo: "V.I.N original", noLaudo: "V.I.N ORIGINAL", tipo: "vin" },
  vinGravado: { rotulo: "V.I.N gravado", noLaudo: "V.I.N GRAVADO", tipo: "vin" },
  marcaModelo: { rotulo: "Marca / modelo", noLaudo: "MARCA / MODELO", tipo: "texto", exemplo: "FIAT/STRADA WORKING CD" },
  fabModelo: { rotulo: "Fabricação / modelo", noLaudo: "FAB / MODELO", tipo: "anos", exemplo: "2011/2012" },
  placa: { rotulo: "Placa", noLaudo: "PLACA", tipo: "placa" },
  motorOriginal: { rotulo: "Nº do motor original", noLaudo: "Nº MOTOR ORIGINAL", tipo: "motor" },
  motorGravado: { rotulo: "Nº do motor gravado", noLaudo: "Nº MOTOR GRAVADO", tipo: "motor" },
  localGravacao: {
    rotulo: "Local da gravação",
    noLaudo: "LOCAL DA GRAVAÇÃO",
    tipo: "texto",
    exemplo: "Assoalho, lado direito, sob o banco do passageiro",
  },
};

/*
 * Os três modelos de laudo. O de etiqueta ETA reproduz o documento que ela
 * mandou. Os de chassi e motor seguem a mesma estrutura com os campos que esses
 * serviços exigem — são a nossa proposta e precisam ser validados com ela.
 *
 * linhasVeiculo: cada array é uma linha de células no laudo.
 * fotos: cada bloco vira uma faixa de fotos; "destaque" é a foto única do
 *        veículo entre os carimbos, "grade" são três fotos lado a lado.
 */
export const MODELOS = [
  {
    id: "eta",
    contagem: "ETA",
    nome: "Fixação de etiqueta ETA",
    curto: "Etiqueta ETA",
    tipoServico: "FIXAÇÃO DE ETIQUETA ETA",
    descricao: "Etiquetas autodestrutivas com os 8 últimos dígitos do chassi.",
    cor: "sky",
    icone: "Tag",
    validado: true,
    linhasVeiculo: [["vin", "marcaModelo", "fabModelo", "placa"]],
    rotuloDataServico: "DATA GRAVAÇÃO",
    fotos: [
      { titulo: "VISTA DO VEÍCULO / TRASEIRA DO VEÍCULO", tipo: "destaque", slots: [{ chave: "traseira", rotulo: "Traseira do veículo" }] },
      {
        titulo: "FOTOGRAFIA APÓS FIXAÇÃO",
        tipo: "grade",
        slots: [
          { chave: "f1", rotulo: "FOTO 1" },
          { chave: "f2", rotulo: "FOTO 2" },
          { chave: "f3", rotulo: "FOTO 3" },
        ],
      },
    ],
  },
  {
    id: "chassi",
    contagem: "chassi",
    nome: "Remarcação de chassi",
    curto: "Chassi",
    tipoServico: "REMARCAÇÃO DE CHASSI",
    descricao: "Gravação do V.I.N na estrutura do veículo, com registro antes e depois.",
    cor: "violet",
    icone: "ScanLine",
    validado: false,
    linhasVeiculo: [
      ["vin", "marcaModelo", "fabModelo", "placa"],
      ["vinGravado", "localGravacao"],
    ],
    rotuloDataServico: "DATA GRAVAÇÃO",
    fotos: [
      { titulo: "VISTA DO VEÍCULO / TRASEIRA DO VEÍCULO", tipo: "destaque", slots: [{ chave: "traseira", rotulo: "Traseira do veículo" }] },
      {
        titulo: "REGISTRO FOTOGRÁFICO DA GRAVAÇÃO",
        tipo: "grade",
        slots: [
          { chave: "antes", rotulo: "ANTES DA REMARCAÇÃO" },
          { chave: "depois", rotulo: "APÓS A REMARCAÇÃO" },
          { chave: "detalhe", rotulo: "DETALHE DA GRAVAÇÃO" },
        ],
      },
    ],
  },
  {
    id: "motor",
    contagem: "motor",
    nome: "Remarcação de motor",
    curto: "Motor",
    tipoServico: "REMARCAÇÃO DE MOTOR",
    descricao: "Gravação da numeração do motor, com registro antes e depois.",
    cor: "orange",
    icone: "Cog",
    validado: false,
    linhasVeiculo: [
      ["vin", "marcaModelo", "fabModelo", "placa"],
      ["motorOriginal", "motorGravado", "localGravacao"],
    ],
    rotuloDataServico: "DATA GRAVAÇÃO",
    fotos: [
      { titulo: "VISTA DO VEÍCULO / TRASEIRA DO VEÍCULO", tipo: "destaque", slots: [{ chave: "traseira", rotulo: "Traseira do veículo" }] },
      {
        titulo: "REGISTRO FOTOGRÁFICO DO MOTOR",
        tipo: "grade",
        slots: [
          { chave: "antes", rotulo: "ANTES DA REMARCAÇÃO" },
          { chave: "depois", rotulo: "APÓS A REMARCAÇÃO" },
          { chave: "detalhe", rotulo: "DETALHE DA GRAVAÇÃO" },
        ],
      },
    ],
  },
];

export const modeloPorId = (id) => MODELOS.find((m) => m.id === id) || MODELOS[0];

export const camposDoModelo = (modelo) => modelo.linhasVeiculo.flat();

export const slotsDoModelo = (modelo) => modelo.fotos.flatMap((bloco) => bloco.slots);

// CIRETRANs mais usadas aparecem como sugestão no campo.
export const SUGESTOES_CIRETRAN = ["8 DRP LAGES", "CIRETRAN SÃO JOAQUIM", "CIRETRAN CURITIBANOS", "CIRETRAN CAMPOS NOVOS"];

/* ---------------- Dados fictícios de exemplo ---------------- */

const CLIENTES = [
  { id: "c1", nome: "ROSÂNGELA MARIA BECKER", doc: "418.552.390-43", uf: "SC" },
  { id: "c2", nome: "TRANSPORTES SERRA CATARINENSE LTDA", doc: "31.884.205/0001-00", uf: "SC" },
  { id: "c3", nome: "JULIANO PEREIRA ANTUNES", doc: "093.771.548-47", uf: "SC" },
  { id: "c4", nome: "MARLENE DE FÁTIMA SCHMITT", doc: "251.906.437-43", uf: "SC" },
  { id: "c5", nome: "AGROPECUÁRIA COXILHA RICA LTDA", doc: "12.407.663/0001-04", uf: "SC" },
  { id: "c6", nome: "EVERTON LUÍS CAMARGO", doc: "772.145.019-53", uf: "SC" },
];

const VEICULOS = [
  { id: "v1", clienteId: "c1", placa: "QJK-4F21", vin: "9BD27804MD7461123", marcaModelo: "FIAT/STRADA WORKING CD", fabModelo: "2012/2013" },
  { id: "v2", clienteId: "c2", placa: "MKD-8J47", vin: "9BM958174CB812447", marcaModelo: "M.BENZ/ATEGO 2426", fabModelo: "2012/2012" },
  { id: "v3", clienteId: "c3", placa: "RLB-2C93", vin: "9C2KC2210KR504812", marcaModelo: "HONDA/CG 160 FAN", fabModelo: "2019/2019", motor: "KC22E8K504812" },
  { id: "v4", clienteId: "c4", placa: "MHR-3G58", vin: "9BGKS48U0HG143729", marcaModelo: "CHEVROLET/ONIX 1.0MT LT", fabModelo: "2016/2017" },
  { id: "v5", clienteId: "c5", placa: "QHZ-7A04", vin: "8AJBA3CD1J1612408", marcaModelo: "TOYOTA/HILUX CD 4X4 SRV", fabModelo: "2018/2018", motor: "1GD4827561" },
  { id: "v6", clienteId: "c6", placa: "MLX-5E16", vin: "9BWCA05X36T107752", marcaModelo: "VW/GOL 1.0 GIII", fabModelo: "2005/2006" },
];

const veiculoDe = (id) => {
  const { clienteId, motor, id: _id, ...resto } = VEICULOS.find((v) => v.id === id);
  return resto;
};
const donoDe = (clienteId) => {
  const { id, ...resto } = CLIENTES.find((c) => c.id === clienteId);
  return resto;
};

const ano = Number(hojeISO().slice(0, 4));
const autorizacao = (numero, responsavel = "MÁRCIA R. LOPES") => ({
  ciretran: "8 DRP LAGES",
  numero: `${numero}/${ano}`,
  responsavel,
});

// Fotos de exemplo são desenhadas na hora a partir dos dados (ver imagens.js),
// para não pesar o armazenamento do navegador.
const fotosDemo = (modeloId) =>
  Object.fromEntries(slotsDoModelo(modeloPorId(modeloId)).map((s) => [s.chave, `demo:${s.chave}`]));

function laudoExemplo({ id, numero, modeloId, cliente, veiculo, dias, nf, aut, remarcadorId, status = "emitido", extra = {}, cancelamento }) {
  const data = hojeISO(-dias);
  return {
    id,
    modeloId,
    status,
    numero,
    ano,
    autorizacao: autorizacao(aut),
    proprietario: donoDe(cliente),
    veiculo: { ...veiculoDe(veiculo), ...extra },
    servico: { dataGravacao: data, dataEmissao: data, nf: String(nf), remarcadorId },
    fotos: fotosDemo(modeloId),
    criadoEm: `${data}T09:12:00`,
    emitidoEm: status !== "rascunho" ? `${data}T10:40:00` : null,
    cancelamento: cancelamento ? { ...cancelamento, em: `${hojeISO(-dias + 1)}T14:05:00` } : null,
  };
}

export function estadoInicial() {
  const v5 = VEICULOS.find((v) => v.id === "v5");
  return {
    versao: 1,
    empresa: EMPRESA_PADRAO,
    remarcadores: REMARCADORES_PADRAO,
    declaracoes: Object.fromEntries(MODELOS.map((m) => [m.id, DECLARACAO_PADRAO])),
    // Continua de onde o Word parou: o último laudo em papel era o 12141.
    numeracao: { proximo: 12142, ano },
    clientes: CLIENTES,
    veiculos: VEICULOS.map(({ motor, ...v }) => v),
    laudos: [
      laudoExemplo({ id: "l6", numero: 12141, modeloId: "eta", cliente: "c1", veiculo: "v1", dias: 4, nf: 38, aut: 409, remarcadorId: "r2" }),
      laudoExemplo({
        id: "l5", numero: 12140, modeloId: "chassi", cliente: "c2", veiculo: "v2", dias: 5, nf: 37, aut: 402, remarcadorId: "r3",
        extra: { vinGravado: "9BM958174CB812447", localGravacao: "LONGARINA DIREITA, JUNTO AO EIXO DIANTEIRO" },
      }),
      laudoExemplo({ id: "l4", numero: 12139, modeloId: "eta", cliente: "c4", veiculo: "v4", dias: 6, nf: 36, aut: 398, remarcadorId: "r1" }),
      laudoExemplo({
        id: "l3", numero: 12138, modeloId: "motor", cliente: "c5", veiculo: "v5", dias: 10, nf: 35, aut: 391, remarcadorId: "r3",
        extra: { motorOriginal: v5.motor, motorGravado: v5.motor, localGravacao: "BLOCO DO MOTOR, LADO ESQUERDO" },
      }),
      laudoExemplo({
        id: "l2", numero: 12137, modeloId: "eta", cliente: "c6", veiculo: "v6", dias: 11, nf: 34, aut: 388, remarcadorId: "r2",
        status: "cancelado", cancelamento: { motivo: "Autorização substituída pela CIRETRAN; serviço refeito em novo laudo." },
      }),
      {
        ...laudoExemplo({ id: "l7", numero: null, modeloId: "eta", cliente: "c3", veiculo: "v3", dias: 0, nf: "", aut: 415, remarcadorId: "r1", status: "rascunho" }),
        fotos: { traseira: "demo:traseira", f1: "demo:f1" },
      },
    ],
  };
}
