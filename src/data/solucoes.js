// Páginas de solução por nicho: uma página por dor específica, escrita com as
// palavras de quem busca por ela.
//
// Este arquivo é a fonte única de cada página: o componente SolucaoPage lê
// daqui o conteúdo, e o build (vite.config.js) lê daqui os dados estruturados
// (JSON-LD). Assim o FAQ que aparece na tela e o que vai para o Google nunca
// divergem.

const SITE = "https://www.sampsprojetos.com.br";

export const laudoTecnico = {
  id: "laudo-tecnico",
  slug: "/laudo-tecnico-de-remarcacao/",
  nome: "Sistema de laudo técnico de remarcação",
  badge: "Para empresas credenciadas de marcação e remarcação",
  titulo: "Sistema de laudo técnico",
  tituloDestaque: "de remarcação veicular",
  subtitulo:
    "Chega de montar laudo no Word. Preencha direto no laudo, anexe as fotos pelo celular ou arrastando o arquivo e imprima no formato que você já usa — com numeração automática e o cadastro de clientes e veículos sempre à mão.",
  whatsapp: "Olá! Quero conhecer o sistema de laudo técnico de remarcação.",
  chamada: "Proposta sob medida · implantação em cerca de 4 semanas",
  implantacao: "Montamos o sistema com o seu modelo de laudo, a sua marca e a sua numeração atual.",
  publico: [
    { icone: "ClipboardCheck", rotulo: "Fixação de etiqueta ETA" },
    { icone: "Wrench", rotulo: "Remarcação de motor" },
    { icone: "ScanLine", rotulo: "Remarcação de chassi" },
  ],

  galeria: {
    titulo: "O laudo é o próprio formulário",
    descricao: "Você digita nas células do laudo e vê o documento pronto enquanto preenche.",
    principal: {
      src: "/solucoes/laudo-tecnico/editor.webp",
      largura: 1600,
      altura: 1000,
      legenda: "Editor do laudo: digite direto nas células; ao lado, a conferência do que falta e o código da etiqueta ETA calculado do chassi.",
    },
    secundarias: [
      {
        src: "/solucoes/laudo-tecnico/laudo.webp",
        largura: 900,
        altura: 1277,
        legenda: "Sai no formato do seu laudo, pronto para imprimir ou salvar em PDF.",
      },
      {
        src: "/solucoes/laudo-tecnico/celular.webp",
        largura: 560,
        altura: 1212,
        legenda: "No celular: toque no campo, preencha e fotografe na hora.",
      },
      {
        src: "/solucoes/laudo-tecnico/livro.webp",
        largura: 1600,
        altura: 911,
        legenda: "Livro de laudos com busca por placa, chassi ou CPF.",
      },
    ],
    nota: "Imagens do sistema com dados fictícios. O seu fica com o seu logo e os dados da sua empresa.",
  },

  comparacao: {
    antes: {
      titulo: "Laudo no Word",
      itens: [
        "Colar foto por foto e acertar o tamanho em cada célula",
        "Copiar nome, CPF, placa e chassi de outro documento",
        "Controlar a numeração na mão e torcer para não repetir",
        "Erro de digitação no chassi só aparece depois de impresso",
        "Para achar um laudo antigo, abrir pasta por pasta",
      ],
    },
    depois: {
      titulo: "Com o sistema",
      itens: [
        "Fotos arrastadas ou tiradas pelo celular, já no lugar certo",
        "Placa que já passou por aqui preenche veículo e proprietário",
        "Número sequencial atribuído na emissão, sem buracos",
        "CPF, CNPJ e chassi conferidos enquanto você digita",
        "Qualquer laudo encontrado pela placa, chassi ou CPF em segundos",
      ],
    },
  },

  passos: [
    {
      titulo: "Escolha o serviço",
      texto: "Cada serviço autorizado — etiqueta ETA, remarcação de motor ou de chassi — tem o seu modelo de laudo, com os campos e as fotos que ele exige.",
    },
    {
      titulo: "Preencha direto no laudo",
      texto: "Digite nas células e veja o laudo pronto enquanto preenche. Cliente que já voltou é buscado pela placa; as fotos entram arrastando ou pela câmera.",
    },
    {
      titulo: "Emita e imprima",
      texto: "O número sai automático, o laudo vai para o livro de registro e é impresso em A4 ou salvo em PDF.",
    },
  ],

  recursos: [
    {
      icone: "FileCheck2",
      titulo: "O seu modelo de laudo",
      texto: "Reproduzimos o laudo que vocês já usam, seção por seção, com o seu logo e os dados da empresa.",
    },
    {
      icone: "Hash",
      titulo: "Numeração automática",
      texto: "Continua de onde vocês pararam. O número só nasce na emissão, então rascunho descartado não deixa buraco.",
    },
    {
      icone: "ScanLine",
      titulo: "Chassi conferido",
      texto: "17 caracteres, sem I, O e Q. Na etiqueta ETA, os 8 últimos dígitos aparecem prontos para conferir.",
    },
    {
      icone: "Users",
      titulo: "Cadastro que se monta sozinho",
      texto: "Cada laudo emitido alimenta o cadastro de clientes e veículos. Ninguém cadastra nada à parte.",
    },
    {
      icone: "LockKeyhole",
      titulo: "Laudo emitido não muda",
      texto: "Depois de emitido, só se cancela com justificativa registrada. O impresso e o guardado são sempre iguais.",
    },
    {
      icone: "Smartphone",
      titulo: "Funciona no celular",
      texto: "Tire as fotos e preencha no próprio celular, sem passar arquivo para o computador.",
    },
  ],

  extra: {
    titulo: "Quer o laudo saindo praticamente sozinho?",
    texto: "Podemos incluir o preenchimento a partir do CRLV digital e da autorização do DETRAN. Avaliamos com um exemplo dos seus documentos e dizemos o que dá para ler automaticamente.",
  },

  ctaFinal: {
    titulo: "Quer ver o sistema com o seu modelo de laudo?",
    texto: "Mande um laudo que vocês emitem hoje, com os dados pessoais tapados. Mostramos como ele fica no sistema e passamos o valor fechado.",
  },

  faqs: [
    {
      question: "Funciona com o modelo de laudo que já usamos?",
      answer:
        "Sim. O sistema é montado a partir do laudo que vocês já emitem hoje: as mesmas seções, na mesma ordem, com o seu logo e os dados da empresa. Se vocês emitem mais de um tipo de laudo, como etiqueta ETA, remarcação de chassi e de motor, cada um vira um modelo próprio, com os campos e as fotos que ele exige.",
    },
    {
      question: "Para quem é o sistema?",
      answer:
        "Para empresas credenciadas de marcação e remarcação veicular, que emitem laudo técnico de serviços autorizados pelo DETRAN: fixação de etiqueta ETA, remarcação de motor e de chassi. Cada laudo registra a CIRETRAN, o número da autorização e o responsável por ela, como pede a portaria.",
    },
    {
      question: "Quanto custa um sistema de laudo técnico?",
      answer:
        "Depende de quantos modelos de laudo vocês emitem e de quantas pessoas vão usar. O investimento tem duas partes: a implantação, paga uma vez, e uma mensalidade que cobre hospedagem, cópia de segurança diária, suporte e ajustes. Mande um exemplo do laudo que vocês usam hoje e enviamos a proposta com o valor fechado. Também dá para começar com um modelo só e acrescentar os outros depois.",
    },
    {
      question: "Precisa instalar alguma coisa?",
      answer:
        "Não. O sistema funciona no navegador do computador e do celular. As fotos podem ser tiradas direto pelo celular, já dentro do laudo, sem passar arquivo de um aparelho para o outro.",
    },
    {
      question: "Dá para continuar a numeração que usamos hoje?",
      answer:
        "Sim. O sistema começa do próximo número da sua sequência atual. A partir daí, cada laudo recebe o número na hora da emissão, sempre em ordem.",
    },
    {
      question: "E se precisar corrigir um laudo já emitido?",
      answer:
        "Laudo emitido não é editado: ele é cancelado com uma justificativa, que fica registrada, e um novo laudo é emitido. O número cancelado continua no livro de registro e não é reaproveitado. Assim a versão impressa e a guardada nunca divergem.",
    },
    {
      question: "Os dados dos clientes ficam seguros?",
      answer:
        "O acesso é por login e senha, a conexão é criptografada e é feita uma cópia de segurança dos laudos todos os dias. Os dados pessoais dos proprietários, como CPF, são tratados de acordo com a LGPD.",
    },
    {
      question: "Quanto tempo leva para começar a usar?",
      answer:
        "Cerca de 4 semanas, contando a montagem dos seus modelos de laudo e um período de testes com laudos reais antes de virar o sistema oficial da empresa.",
    },
    {
      question: "E se o DETRAN mudar alguma exigência?",
      answer:
        "Os ajustes de modelo estão incluídos na mensalidade. Se a portaria mudar um campo ou o texto da declaração, o sistema é atualizado sem precisar de um projeto novo.",
    },
  ],

  seo: {
    descricao:
      "Sistema de laudo técnico para empresas credenciadas de remarcação: preencha direto no laudo, anexe fotos pelo celular, numeração automática e cadastro de clientes e veículos.",
    recursos: [
      "Laudo no modelo da empresa",
      "Etiqueta ETA, remarcação de motor e de chassi",
      "Numeração automática sem buracos",
      "Fotos pelo celular ou arrastando o arquivo",
      "Conferência de CPF, CNPJ e chassi",
      "Cadastro de clientes e veículos",
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
  subtitulo:
    "Envie o PDF do pedido e o da nota fiscal: o sistema compara os dois e aponta onde estão as divergências. Para quem vende no Mercado Livre, mostra também os custos por regional.",
  whatsapp: "Olá! Quero conhecer a conferência automática de nota fiscal com pedido de compra.",
  chamada: "Proposta sob medida · implantação em 2 a 3 semanas",
  implantacao: "Ajustamos a leitura aos pedidos e notas dos seus principais fornecedores.",
  publico: [
    { icone: "Store", rotulo: "Vendedores de marketplace" },
    { icone: "Truck", rotulo: "Distribuidoras e atacados" },
    { icone: "ShoppingCart", rotulo: "Quem compra em volume" },
  ],

  ilustracao: {
    titulo: "O que bate, o que não bate",
    descricao: "Em vez de comparar dois documentos linha por linha, a equipe olha só o que está diferente.",
    nota: "Ilustração com dados fictícios.",
  },

  comparacao: {
    antes: {
      titulo: "Conferência na mão",
      itens: [
        "Abrir o pedido e a nota lado a lado e comparar linha por linha",
        "Diferença de valor, quantidade ou desconto que passa sem ninguém ver",
        "Horas por semana de alguém só conferindo documento",
        "Divergência descoberta depois que a mercadoria já entrou",
        "Custos do marketplace calculados à parte, em planilha",
      ],
    },
    depois: {
      titulo: "Com a conferência automática",
      itens: [
        "Pedido e nota enviados em PDF e comparados em segundos",
        "As divergências apontadas, sem precisar procurar",
        "A equipe confere só o que está diferente",
        "Divergência identificada antes do pagamento",
        "Custos por regional do Mercado Livre na mesma ferramenta",
      ],
    },
  },

  passos: [
    {
      titulo: "Envie os dois PDFs",
      texto: "O pedido de compra e a nota fiscal, do jeito que chegam do fornecedor. Não precisa redigitar nada.",
    },
    {
      titulo: "O sistema compara",
      texto: "Os dois documentos são lidos e cruzados automaticamente.",
    },
    {
      titulo: "Veja as divergências",
      texto: "O que bate é confirmado, e o que não bate aparece em destaque para a equipe resolver com o fornecedor.",
    },
  ],

  caso: {
    titulo: "Já em produção",
    texto: "Em uso por um vendedor do Mercado Livre, que confere os pedidos de compra contra as notas dos fornecedores e acompanha os custos por regional no mesmo lugar.",
  },

  recursos: [
    {
      icone: "FileUp",
      titulo: "Lê os PDFs como chegam",
      texto: "Pedido e nota entram no formato em que o fornecedor manda. Ninguém redigita.",
    },
    {
      icone: "FileSearch",
      titulo: "Aponta só o que diverge",
      texto: "A equipe para de comparar documento inteiro e passa a olhar só a diferença.",
    },
    {
      icone: "MapPin",
      titulo: "Custos por regional",
      texto: "Para quem vende no Mercado Livre, os custos por regional aparecem junto da conferência.",
    },
    {
      icone: "History",
      titulo: "Histórico das conferências",
      texto: "Cada conferência fica guardada, para consultar depois ou cobrar o fornecedor.",
    },
    {
      icone: "SlidersHorizontal",
      titulo: "Ajustado aos seus fornecedores",
      texto: "Cada fornecedor monta o pedido de um jeito. Na implantação, a leitura é ajustada aos seus principais.",
    },
    {
      icone: "Globe",
      titulo: "Sem instalar nada",
      texto: "Funciona no navegador. Não depende de ERP nem de sistema de prateleira.",
    },
  ],

  ctaFinal: {
    titulo: "Quanto tempo a sua equipe gasta conferindo nota?",
    texto: "Mande um pedido e a nota correspondente, com os dados sensíveis tapados. Mostramos a conferência rodando com os seus documentos.",
  },

  faqs: [
    {
      question: "Como funciona a conferência automática de nota fiscal?",
      answer:
        "Você envia o PDF do pedido de compra e o da nota fiscal do fornecedor. O sistema lê os dois documentos, cruza os dados e aponta as divergências. A equipe deixa de comparar tudo linha por linha e passa a olhar só o que está diferente.",
    },
    {
      question: "Quanto custa?",
      answer:
        "Depende de quantos fornecedores têm layouts diferentes de pedido e do volume de conferências. Como o sistema já existe e está em uso, a implantação sai bem menor que desenvolver do zero. Mande um pedido e a nota correspondente e enviamos a proposta com o valor fechado.",
    },
    {
      question: "Funciona com qualquer fornecedor?",
      answer:
        "A nota fiscal eletrônica segue um padrão nacional, mas cada fornecedor monta o pedido do seu jeito. Na implantação ajustamos a leitura aos pedidos e notas dos seus principais fornecedores. Fornecedor novo entra como ajuste.",
    },
    {
      question: "Serve para quem não vende no Mercado Livre?",
      answer:
        "Serve. A conferência de pedido contra nota é útil para qualquer empresa que compra em volume: distribuidoras, atacados, lojas e setores de compras e recebimento. O painel de custos por regional é um recurso a mais para quem vende no Mercado Livre.",
    },
    {
      question: "Preciso ter um ERP ou outro sistema?",
      answer:
        "Não. A conferência funciona sozinha, no navegador, a partir dos PDFs. Se a sua empresa usa um ERP, avaliamos se vale a pena ligar os dois.",
    },
    {
      question: "Dá para usar o XML da nota em vez do PDF?",
      answer:
        "Podemos usar também o XML da NF-e quando o fornecedor envia, o que deixa a leitura da nota ainda mais confiável. Isso é avaliado na implantação.",
    },
    {
      question: "Quanto tempo leva para começar?",
      answer:
        "De 2 a 3 semanas, contando o ajuste da leitura aos documentos dos seus fornecedores e um período de testes com conferências reais.",
    },
  ],

  seo: {
    descricao:
      "Conferência automática de nota fiscal com pedido de compra: envie os PDFs e o sistema aponta as divergências. Para distribuidoras, atacados e vendedores do Mercado Livre, com custos por regional.",
    recursos: [
      "Leitura de PDF do pedido de compra e da nota fiscal",
      "Comparação automática e apontamento de divergências",
      "Custos por regional do Mercado Livre",
      "Histórico das conferências",
      "Funciona no navegador, sem ERP",
    ],
  },
};

export const solucoes = [laudoTecnico, notaFiscal];

/** Dados estruturados (JSON-LD) da página, gerados no build. */
export function dadosEstruturados(s) {
  const url = `${SITE}${s.slug}`;
  const imagens = s.galeria
    ? [s.galeria.principal, ...s.galeria.secundarias].map((i) => `${SITE}${i.src}`)
    : undefined;
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
      ...(imagens ? { screenshot: imagens } : {}),
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
