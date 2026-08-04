// Higienização das entradas do formulário.
//
// O site é estático (sem banco e sem servidor), então não existe SQL injection
// nem execução remota de código. Os riscos reais são outros:
//
// 1. Injeção de cabeçalho de e-mail: quebras de linha em um campo que vira
//    assunto do e-mail podem inserir cabeçalhos extras (CC, BCC). Por isso
//    todo caractere de controle é removido antes do envio.
// 2. Caracteres invisíveis usados para disfarçar conteúdo.
// 3. Spam automatizado de bots.

// Caracteres de controle ASCII, incluindo \r, \n e DEL.
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

// Controles preservando \n (usado no campo de texto livre, que aceita parágrafos).
const CONTROL_EXCEPT_LF = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

// Invisíveis: zero-width, joiners e marcas de direção usadas para ofuscar texto.
const INVISIBLE_CHARS = /[\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g;

/**
 * Limpa um texto de entrada: remove caracteres perigosos ou invisíveis,
 * normaliza espaços e limita o tamanho.
 *
 * @param {string} value
 * @param {number} maxLength
 * @param {{singleLine?: boolean}} options
 */
export function sanitizeText(value, maxLength = 500, { singleLine = false } = {}) {
  if (typeof value !== "string") return "";

  let out = value.normalize("NFC").replace(INVISIBLE_CHARS, "");

  if (singleLine) {
    // Campos de uma linha nunca podem conter quebras — é justamente o vetor
    // de injeção de cabeçalho de e-mail.
    out = out.replace(CONTROL_CHARS, " ");
  } else {
    // No texto livre, preserva parágrafos e remove o restante dos controles.
    out = out
      .replace(/\r\n?/g, "\n")
      .replace(CONTROL_EXCEPT_LF, " ")
      .replace(/\n{3,}/g, "\n\n");
  }

  return out.replace(/[ \t]{2,}/g, " ").trim().slice(0, maxLength);
}

/** Aceita e-mail ou telefone brasileiro (com ou sem máscara). */
export function isValidContact(value) {
  const v = String(value || "").trim();
  if (v.length < 8 || v.length > 120) return false;

  const isEmail = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);

  const digits = v.replace(/\D/g, "");
  const isPhone =
    /^[\d\s()+.-]+$/.test(v) && digits.length >= 10 && digits.length <= 13;

  return isEmail || isPhone;
}

/**
 * Sinais típicos de envio automatizado. Não é antivírus — é filtro de ruído
 * para o que passar pela proteção do provedor de formulário.
 */
export function looksLikeSpam({ name = "", message = "" }) {
  const full = `${name} ${message}`;

  // Bots costumam encher a mensagem de links.
  const links = (full.match(/https?:\/\/|www\.|\.(ru|top|xyz|click|loan)\b/gi) || [])
    .length;
  if (links >= 3) return true;

  // Marcação HTML ou script não tem motivo para existir aqui.
  if (/<\s*(script|iframe|object|embed|a|img)\b/i.test(full)) return true;

  // Nome é campo curto: link ali é sempre spam.
  if (/https?:\/\/|www\./i.test(name)) return true;

  // Texto longo sem nenhum espaço indica string gerada por robô.
  if (message.length > 80 && !/\s/.test(message)) return true;

  return false;
}
