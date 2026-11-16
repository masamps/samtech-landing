import { codigoEtiqueta } from "./campos.js";

/*
 * Fotos de exemplo. São desenhadas em SVG a partir dos dados do próprio laudo
 * (placa, chassi, motor), então cada exemplo mostra a etiqueta e a placa certas.
 * Ficam como texto "demo:<slot>" no estado e viram imagem só na hora de exibir.
 */

const svg = (conteudo, w = 480, h = 320) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${conteudo}</svg>`
  )}`;

const escapar = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function traseira(placa) {
  const p = escapar(placa || "ABC-1D23").replace("-", "");
  return svg(`
    <defs>
      <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd5dc"/><stop offset="1" stop-color="#9aa3ad"/></linearGradient>
      <linearGradient id="lata" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6c5d"/><stop offset="1" stop-color="#4f453b"/></linearGradient>
    </defs>
    <rect width="480" height="320" fill="url(#ceu)"/>
    <rect y="250" width="480" height="70" fill="#6b7078"/>
    <rect x="70" y="40" width="340" height="80" rx="18" fill="#2f3338"/>
    <rect x="95" y="55" width="290" height="55" rx="10" fill="#4a5560"/>
    <rect x="50" y="110" width="380" height="140" rx="22" fill="url(#lata)"/>
    <rect x="62" y="128" width="58" height="52" rx="8" fill="#c0262d"/><rect x="68" y="134" width="46" height="18" rx="4" fill="#f2f2f2" opacity=".85"/>
    <rect x="360" y="128" width="58" height="52" rx="8" fill="#c0262d"/><rect x="366" y="134" width="46" height="18" rx="4" fill="#f2f2f2" opacity=".85"/>
    <circle cx="240" cy="150" r="20" fill="#1d1f22"/><circle cx="240" cy="150" r="13" fill="none" stroke="#c9cdd2" stroke-width="2"/>
    <rect x="40" y="232" width="400" height="34" rx="10" fill="#23262a"/>
    <rect x="175" y="196" width="130" height="46" rx="4" fill="#fff" stroke="#222" stroke-width="2"/>
    <rect x="175" y="196" width="130" height="11" rx="3" fill="#1d4ed8"/>
    <text x="240" y="234" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#111">${p}</text>
  `);
}

function etiqueta(vin, variacao) {
  const codigo = escapar(codigoEtiqueta(vin) || "00000000");
  const angulo = [-3, 1.5, -1][variacao % 3];
  const fundo = ["#3b3d40", "#2d2f31", "#45474a"][variacao % 3];
  return svg(`
    <defs>
      <radialGradient id="metal" cx=".3" cy=".3" r="1"><stop offset="0" stop-color="#6b6e72"/><stop offset="1" stop-color="${fundo}"/></radialGradient>
    </defs>
    <rect width="480" height="320" fill="url(#metal)"/>
    <circle cx="${[380, 120, 400][variacao % 3]}" cy="${[70, 60, 250][variacao % 3]}" r="38" fill="#2a2b2d" stroke="#5c5f63" stroke-width="6"/>
    <g transform="rotate(${angulo} 240 170)">
      <rect x="70" y="128" width="340" height="86" rx="10" fill="#f4f4f2"/>
      <text x="240" y="186" text-anchor="middle" font-family="'Courier New', monospace" font-size="40" letter-spacing="3" fill="#2b2b2b">*${codigo}*</text>
    </g>
  `);
}

function gravacao(texto, fase, rotuloFase) {
  const t = escapar(texto || "000000000");
  const desgaste = fase === "antes";
  const zoom = fase === "detalhe";
  const tamanho = zoom ? 58 : 34;
  const visivel = zoom ? t.slice(-8) : t;
  const riscos = desgaste
    ? Array.from({ length: 14 }, (_, i) => `<line x1="${40 + i * 30}" y1="${110 + (i % 3) * 12}" x2="${90 + i * 30}" y2="${210 - (i % 4) * 10}" stroke="#5a5d61" stroke-width="3" opacity=".55"/>`).join("")
    : "";
  return svg(`
    <defs>
      <linearGradient id="aco" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9bec4"/><stop offset=".5" stop-color="#8d9298"/><stop offset="1" stop-color="#a7acb2"/></linearGradient>
    </defs>
    <rect width="480" height="320" fill="url(#aco)"/>
    <g font-family="'Courier New', monospace" font-weight="700" font-size="${tamanho}" text-anchor="middle" letter-spacing="2">
      <text x="241" y="${zoom ? 182 : 172}" fill="#e3e6e9" opacity="${desgaste ? 0.25 : 0.7}">${visivel}</text>
      <text x="240" y="${zoom ? 180 : 170}" fill="#3c3f43" opacity="${desgaste ? 0.35 : 0.95}">${visivel}</text>
    </g>
    ${riscos}
    <rect x="14" y="14" width="${rotuloFase.length * 9 + 20}" height="26" rx="4" fill="#111" opacity=".55"/>
    <text x="24" y="32" font-family="Arial, sans-serif" font-size="13" fill="#fff">${escapar(rotuloFase)}</text>
  `);
}

/** Resolve o valor guardado no slot em algo que um <img> consegue mostrar. */
export function fonteDaFoto(valor, laudo) {
  if (!valor) return null;
  if (!valor.startsWith("demo:")) return valor;

  const slot = valor.slice(5);
  const v = laudo.veiculo || {};
  if (slot === "traseira") return traseira(v.placa);
  if (["f1", "f2", "f3"].includes(slot)) return etiqueta(v.vin, Number(slot[1]) - 1);

  const motor = laudo.modeloId === "motor";
  const texto = motor ? (slot === "antes" ? v.motorOriginal : v.motorGravado) : slot === "antes" ? v.vin : v.vinGravado || v.vin;
  const rotulos = { antes: "Antes", depois: "Após gravação", detalhe: "Detalhe" };
  return gravacao(texto, slot, rotulos[slot] || "");
}

/*
 * Foto real enviada pelo usuário: reduz para no máximo 1400 px e JPEG 82%.
 * Uma foto de celular de 4 MB vira algo entre 150 e 300 KB — cabe no navegador
 * e continua nítida o bastante para ler a etiqueta.
 */
export async function prepararFoto(arquivo, ladoMaximo = 1400) {
  if (!arquivo || !arquivo.type.startsWith("image/")) {
    throw new Error("O arquivo precisa ser uma imagem (JPG, PNG ou HEIC convertido).");
  }
  let bitmap;
  try {
    bitmap = await createImageBitmap(arquivo, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Não consegui abrir essa imagem. Tente uma foto JPG ou PNG.");
  }
  const escala = Math.min(1, ladoMaximo / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", 0.82);
}
