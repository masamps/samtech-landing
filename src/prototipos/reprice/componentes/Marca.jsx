import { useId } from "react";

// Escudo com o "R", recriado em vetor a partir do laudo da Reprice.
export function Escudo({ className = "h-10 w-10", contorno = "#111" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 4 L90 14 C90 52 78 78 50 96 C22 78 10 52 10 14 Z"
        fill="#F4C20D"
        stroke={contorno}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <text x="50" y="69" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="56" fill="#111">
        R
      </text>
    </svg>
  );
}

// Carimbo circular. Cada instância precisa de ids próprios para o textPath.
export function Carimbo({ texto = "REPRICE MARCAÇÃO E REMARCAÇÃO DE CHASSI E MOTORES LTDA", tamanho = 118, rotacao = -12 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width={tamanho} height={tamanho} style={{ transform: `rotate(${rotacao}deg)` }} aria-hidden="true">
      <defs>
        <path id={`arco-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <g fill="none" stroke="#1f2328" opacity="0.82">
        <circle cx="100" cy="100" r="94" strokeWidth="4" />
        <circle cx="100" cy="100" r="88" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="60" strokeWidth="2" />
      </g>
      <text fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13.2" letterSpacing="1.2" fill="#1f2328" opacity="0.82">
        <textPath href={`#arco-${id}`} startOffset="0">
          {texto} ★
        </textPath>
      </text>
      <g transform="translate(62 58) scale(0.76)" opacity="0.85">
        <path d="M50 4 L90 14 C90 52 78 78 50 96 C22 78 10 52 10 14 Z" fill="none" stroke="#1f2328" strokeWidth="6" />
        <text x="50" y="69" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="56" fill="#1f2328">
          R
        </text>
      </g>
    </svg>
  );
}

// Rubrica gerada a partir do nome: sempre a mesma para a mesma pessoa.
// No sistema real, cada remarcador cadastra a imagem da própria assinatura.
export function Rubrica({ nome, className = "h-14 w-40" }) {
  let semente = [...(nome || "x")].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);
  const aleatorio = () => {
    semente = (semente * 1103515245 + 12345) >>> 0;
    return (semente % 1000) / 1000;
  };
  const voltas = 3 + Math.floor(aleatorio() * 2);
  let d = `M 8 ${40 + aleatorio() * 10}`;
  let x = 8;
  for (let i = 0; i < voltas; i++) {
    const largura = 22 + aleatorio() * 18;
    const alto = 8 + aleatorio() * 22;
    d += ` C ${x + largura * 0.3} ${alto} ${x + largura * 0.9} ${alto - 4} ${x + largura * 0.7} ${38 + aleatorio() * 6}`;
    d += ` S ${x + largura * 0.2} ${56 + aleatorio() * 8} ${x + largura} ${42 + aleatorio() * 8}`;
    x += largura;
  }
  d += ` Q ${x + 20} ${30 + aleatorio() * 10} ${Math.min(x + 40, 154)} ${36 + aleatorio() * 6}`;
  return (
    <svg viewBox="0 0 160 70" className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="#1b2a5c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d={`M ${16 + aleatorio() * 20} ${52 + aleatorio() * 6} L ${110 + aleatorio() * 30} ${46 + aleatorio() * 6}`} stroke="#1b2a5c" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}
