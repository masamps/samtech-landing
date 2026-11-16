// Máscaras, validações e regras de domínio dos laudos.
// Tudo aqui é puro (sem React) para poder ser reaproveitado no sistema real.

export const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
  "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const digitos = (v) => String(v || "").replace(/\D/g, "");

export function mascaraDoc(valor) {
  const d = digitos(valor).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function cpfValido(d) {
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  const calc = (n) => {
    let soma = 0;
    for (let i = 0; i < n; i++) soma += Number(d[i]) * (n + 1 - i);
    return ((soma * 10) % 11) % 10;
  };
  return calc(9) === Number(d[9]) && calc(10) === Number(d[10]);
}

function cnpjValido(d) {
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const calc = (n) => {
    const pesos = n === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma = pesos.reduce((acc, p, i) => acc + Number(d[i]) * p, 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  return calc(12) === Number(d[12]) && calc(13) === Number(d[13]);
}

/** Retorna null se ok, ou a mensagem do problema. */
export function problemaDoc(valor) {
  const d = digitos(valor);
  if (!d) return "Informe o CPF ou CNPJ.";
  if (d.length === 11) return cpfValido(d) ? null : "CPF com dígito verificador inválido — confira a digitação.";
  if (d.length === 14) return cnpjValido(d) ? null : "CNPJ com dígito verificador inválido — confira a digitação.";
  return "CPF tem 11 dígitos e CNPJ tem 14.";
}

// Placa no padrão do laudo da Reprice: três letras, hífen, restante (ABC-1D23).
export function mascaraPlaca(valor) {
  const s = String(valor || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  return s.length > 3 ? `${s.slice(0, 3)}-${s.slice(3)}` : s;
}

export function problemaPlaca(valor) {
  const s = String(valor || "").replace("-", "");
  if (!s) return "Informe a placa.";
  // Antiga (ABC1234) ou Mercosul (ABC1D23).
  return /^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(s) ? null : "Placa fora do padrão (ABC-1234 ou ABC-1D23).";
}

export const mascaraVin = (valor) =>
  String(valor || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);

export function problemaVin(valor) {
  const s = String(valor || "");
  if (!s) return "Informe o chassi (V.I.N).";
  if (/[IOQ]/.test(s)) return "Chassi não usa as letras I, O e Q — provavelmente é 1 ou 0.";
  if (s.length !== 17) return `O V.I.N tem 17 caracteres (faltam ${17 - s.length}).`;
  return null;
}

/** Etiquetas ETA levam os 8 últimos caracteres do chassi. */
export const codigoEtiqueta = (vin) => (vin && vin.length >= 8 ? vin.slice(-8) : "");

export function mascaraAnos(valor) {
  const d = digitos(valor).slice(0, 8);
  return d.length > 4 ? `${d.slice(0, 4)}/${d.slice(4)}` : d;
}

export const mascaraNumero = (valor) => digitos(valor).slice(0, 9);

export const mascaraMotor = (valor) =>
  String(valor || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20);

/** "2026-11-12" -> "12/11/2026" */
export function dataBR(iso) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

export function hojeISO(deslocamentoDias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + deslocamentoDias);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export const numeroLaudo = (laudo) => (laudo.numero ? `${laudo.numero} / ${laudo.ano}` : null);
