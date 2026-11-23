// Páginas de solução por nicho: uma página por dor específica, curta, para
// quem chega pela busca entender em segundos o que é e chamar no WhatsApp.
//
// Este arquivo é a fonte única de cada página: o componente SolucaoPage lê
// daqui o conteúdo, e o build (vite.config.js) lê daqui os dados estruturados
// (JSON-LD). Assim o FAQ que aparece na tela e o que vai para o Google nunca
// divergem.
//
// Sem preço de propósito: o valor sai na proposta, depois de entender o caso.
// E uma única imagem do sistema, para não entregar o desenho inteiro dele.

const SITE = "https://www.sampsprojetos.com.br";

export const laudoTecnico = {
  id: "laudo-tecnico",
  slug: "/laudo-tecnico-de-remarcacao/",
  nome: "Sistema de laudo técnico de remarcação",
  badge: "Para empresas credenciadas de marcação e remarcação",
  titulo: "Sistema de laudo técnico",
  tituloDestaque: "de remarcação veicular",
  subtitulo: "Preencha direto no laudo, anexe as fotos pelo celular e imprima no formato que você já usa.",
  whatsapp: "Olá! Quero conhecer o sistema de laudo técnico de remarcação.",
  chamada: "Proposta sob medida, com o seu modelo de laudo",
  publico: [
    { icone: "ClipboardCheck", rotulo: "Fixação de etiqueta ETA" },
    { icone: "Wrench", rotulo: "Remarcação de motor" },
    { icone: "ScanLine", rotulo: "Remarcação de chassi" },
  ],

  imagem: {
    src: "/solucoes/laudo-tecnico/editor.webp",
    largura: 1600,
    altura: 1000,
    legenda: "Você preenche no próprio laudo e já vê o documento pronto. Dados fictícios.",
  },

  passos: [
    { titulo: "Escolha o serviço", texto: "Etiqueta ETA, remarcação de motor ou de chassi." },
    { titulo: "Preencha no laudo", texto: "Fotos pelo celular e cliente buscado pela placa." },
    { titulo: "Emita e imprima", texto: "Número automático, em A4 ou PDF." },
  ],

  recursos: [
    { icone: "FileCheck2", titulo: "O seu modelo de laudo", texto: "Com o seu logo e os dados da empresa." },
    { icone: "Hash", titulo: "Numeração automática", texto: "Continua de onde vocês pararam." },
    { icone: "ScanLine", titulo: "Chassi e CPF conferidos", texto: "Erro de digitação travado na hora." },
    { icone: "Smartphone", titulo: "Funciona no celular", texto: "A foto entra direto no laudo." },
  ],

  ctaFinal: {
    titulo: "Quer ver com o seu modelo de laudo?",
    texto: "Mande um laudo de vocês, com os dados pessoais tapados, e enviamos a proposta.",
  },

  faqs: [
    {
      question: "Para quem é o sistema?",
      answer:
        "Para empresas credenciadas de marcação e remarcação veicular, que emitem laudo técnico de serviços autorizados pelo DETRAN: fixação de etiqueta ETA, remarcação de motor e de chassi. Cada laudo registra a CIRETRAN, o número da autorização e o responsável por ela.",
    },
    {
      question: "Funciona com o modelo de laudo que já usamos?",
      answer:
        "Sim. O sistema é montado a partir do laudo que vocês já emitem, com as mesmas seções, o seu logo e os dados da empresa. Cada tipo de serviço vira um modelo próprio, com os campos e as fotos que ele exige.",
    },
    {
      question: "Quanto custa um sistema de laudo técnico?",
      answer:
        "Depende de quantos modelos de laudo vocês emitem e de quantas pessoas vão usar. Há uma implantação, paga uma vez, e uma mensalidade com hospedagem, cópia de segurança, suporte e ajustes. Mande um exemplo do seu laudo e enviamos a proposta com o valor fechado.",
    },
    {
      question: "Precisa instalar alguma coisa?",
      answer: "Não. Funciona no navegador do computador e do celular, e as fotos podem ser tiradas direto pelo celular, já dentro do laudo.",
    },
    {
      question: "Os dados dos clientes ficam seguros?",
      answer:
        "O acesso é por login e senha, a conexão é criptografada e é feita uma cópia de segurança dos laudos todos os dias. Os dados pessoais, como CPF, são tratados de acordo com a LGPD.",
    },
  ],

  seo: {
    descricao:
      "Sistema de laudo técnico para empresas credenciadas de remarcação: preencha direto no laudo, anexe fotos pelo celular, numeração automática e cadastro de clientes e veículos.",
    recursos: [
      "Laudo no modelo da empresa",
      "Etiqueta ETA, remarcação de motor e de chassi",
      "Numeração automática",
      "Fotos pelo celular",
      "Conferência de CPF, CNPJ e chassi",
      "Impressão em A4 e PDF",
    ],
  },
};

export const notaFiscal = {
  id: "nota-fiscal",
  slug: "/conferencia-de-nota-fiscal/",
  nome: "Conferência automática de nota fiscal com pedido de compra",
  badge: "Em uso por um vendedor do Mercado Livre",
  titulo: "Conferência automática de nota fiscal",
  tituloDestaque: "com o pedido de compra",
  subtitulo: "Envie o PDF do pedido e o da nota fiscal: o sistema compara e aponta as divergências.",
  whatsapp: "Olá! Quero conhecer a conferência automática de nota fiscal com pedido de compra.",
  chamada: "Proposta sob medida, ajustada aos seus fornecedores",
  publico: [
    { icone: "Store", rotulo: "Vendedores de marketplace" },
    { icone: "Truck", rotulo: "Distribuidoras e atacados" },
    { icone: "ShoppingCart", rotulo: "Quem compra em volume" },
  ],

  ilustracao: { nota: "Ilustração com dados fictícios." },

  passos: [
    { titulo: "Envie os PDFs", texto: "Pedido e nota, do jeito que chegam do fornecedor." },
    { titulo: "O sistema compara", texto: "Os dois documentos são cruzados sozinhos." },
    { titulo: "Veja as divergências", texto: "Só o que não bate aparece em destaque." },
  ],

  recursos: [
    { icone: "FileUp", titulo: "Sem redigitar", texto: "Lê os PDFs como eles chegam." },
    { icone: "FileSearch", titulo: "Só o que diverge", texto: "A equipe confere só a diferença." },
    { icone: "MapPin", titulo: "Custos por regional", texto: "Para quem vende no Mercado Livre." },
    { icone: "History", titulo: "Histórico", texto: "Para consultar ou cobrar o fornecedor." },
  ],

  ctaFinal: {
    titulo: "Quer ver com os seus documentos?",
    texto: "Mande um pedido e a nota correspondente, com os dados sensíveis tapados.",
  },

  faqs: [
    {
      question: "Como funciona a conferência automática de nota fiscal?",
      answer:
        "Você envia o PDF do pedido de compra e o da nota fiscal do fornecedor. O sistema lê os dois, cruza os dados e aponta as divergências, e a equipe passa a olhar só o que está diferente.",
    },
    {
      question: "Quanto custa?",
      answer:
        "Depende de quantos fornecedores têm pedidos em formatos diferentes e do volume de conferências. Como o sistema já existe e está em uso, a implantação sai bem menor que desenvolver do zero. Mande um pedido e a nota correspondente e enviamos a proposta com o valor fechado.",
    },
    {
      question: "Funciona com qualquer fornecedor?",
      answer:
        "A nota fiscal eletrônica segue um padrão nacional, mas cada fornecedor monta o pedido do seu jeito. Na implantação ajustamos a leitura aos seus principais fornecedores, e fornecedor novo entra como ajuste.",
    },
    {
      question: "Serve para quem não vende no Mercado Livre?",
      answer:
        "Serve. A conferência de pedido contra nota é útil para qualquer empresa que compra em volume. Os custos por regional são um recurso a mais para quem vende no Mercado Livre.",
    },
    {
      question: "Preciso ter um ERP ou outro sistema?",
      answer: "Não. A conferência funciona sozinha, no navegador, a partir dos PDFs.",
    },
  ],

  seo: {
    descricao:
      "Conferência automática de nota fiscal com pedido de compra: envie os PDFs e o sistema aponta as divergências. Para distribuidoras, atacados e vendedores do Mercado Livre.",
    recursos: [
      "Leitura de PDF do pedido de compra e da nota fiscal",
      "Comparação automática e apontamento de divergências",
      "Custos por regional do Mercado Livre",
      "Histórico das conferências",
    ],
  },
};

export const solucoes = [laudoTecnico, notaFiscal];

/** Dados estruturados (JSON-LD) da página, gerados no build. */
export function dadosEstruturados(s) {
  const url = `${SITE}${s.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: s.nome,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url,
      description: s.seo.descricao,
      inLanguage: "pt-BR",
      ...(s.imagem ? { screenshot: `${SITE}${s.imagem.src}` } : {}),
      featureList: s.seo.recursos,
      author: { "@type": "Organization", name: "Samps Projetos", url: `${SITE}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: s.nome, item: url },
      ],
    },
  ];
}
