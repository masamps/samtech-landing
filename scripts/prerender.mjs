// Pré-renderização: coloca o HTML de cada página pública dentro do
// <div id="root"> gerado pelo build, para o Google (e quem estiver sem
// JavaScript) receber o texto completo já na primeira leitura.
//
// Roda depois de `vite build` e do build SSR (ver "build" no package.json).
// Falha alto se algo não bater: melhor quebrar o deploy do que publicar uma
// página que perdeu o conteúdo sem ninguém perceber.

import { readFile, writeFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projeto = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pastaSsr = resolve(projeto, ".ssr");
const { paginas, renderizar } = await import(pathToFileURL(resolve(pastaSsr, "ssr.js")).href);

const MARCADOR = '<div id="root"></div>';

// As animações de entrada (Framer Motion) começam com opacidade 0 e só
// aparecem quando o JavaScript roda. Sem JavaScript, o texto ficaria
// invisível — este estilo só vale nesse caso e mostra tudo.
const SEM_JS = '<noscript><style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>';

for (const { html, Raiz } of paginas) {
  const caminho = resolve(projeto, "dist", html);
  const original = await readFile(caminho, "utf8");

  const ocorrencias = original.split(MARCADOR).length - 1;
  if (ocorrencias !== 1) {
    throw new Error(`${html}: esperava exatamente um ${MARCADOR}, encontrei ${ocorrencias}.`);
  }

  const corpo = renderizar(Raiz);
  if (corpo.length < 1000) {
    throw new Error(`${html}: o HTML renderizado tem só ${corpo.length} caracteres — algo deu errado.`);
  }

  // Funções no replace: o HTML pode conter "$" (ex.: "R$"), que numa string
  // de substituição seria interpretado como padrão especial.
  const final = original
    .replace(MARCADOR, () => `<div id="root">${corpo}</div>`)
    .replace("</head>", () => `  ${SEM_JS}\n  </head>`);

  await writeFile(caminho, final);
  console.log(`pré-renderizado  ${html.padEnd(42)} ${(corpo.length / 1024).toFixed(1)} KB de HTML`);
}

await rm(pastaSsr, { recursive: true, force: true });
