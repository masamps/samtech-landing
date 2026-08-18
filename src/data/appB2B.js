// Conteúdo da página do aplicativo B2B white label.
//
// Regra desta página: o corpo é curto e escaneável; o detalhe vive no FAQ.
// O acordeão fica recolhido (leve para quem lê) mas é texto completo para
// busca, e ainda alimenta o schema FAQPage.

export const appB2B = {
  slug: "/aplicativo-b2b/",
  name: "Aplicativo de Pedidos B2B",
  badge: "Produto pronto",
  subheadline:
    "Aplicativo de pedidos para Android e iOS com a marca da sua empresa. O seu cliente compra sozinho pelo celular — e se a sua loja ainda não tem sistema, a gente monta junto.",
  pitch:
    "Não é um projeto do zero: o aplicativo já está pronto e testado. Configuramos com a sua marca e colocamos no ar em semanas.",

  // Roteiro da demonstração navegável: cada passo é uma tela e a ação que
  // leva à próxima. As coordenadas do destaque são percentuais da imagem,
  // para acompanharem qualquer tamanho de exibição.
  demo: [
    {
      src: "/app-b2b/visitante.webp",
      titulo: "Catálogo aberto",
      texto: "Quem ainda não é cliente navega pelo catálogo, mas o preço fica protegido.",
      acao: "Tocar em Ver preço",
      alvo: { x: 26, y: 87 },
    },
    {
      src: "/app-b2b/login.webp",
      titulo: "Acesso na hora certa",
      texto: "O acesso aparece no momento do interesse, com digital, Face ID ou pedido de cadastro.",
      acao: "Entrar",
      alvo: { x: 75, y: 89 },
    },
    {
      src: "/app-b2b/catalogo.webp",
      titulo: "Preço do cliente",
      texto: "Agora o catálogo mostra a tabela de preço e as condições daquele cliente.",
      acao: "Abrir o carrinho",
      alvo: { x: 92, y: 10 },
    },
    {
      src: "/app-b2b/carrinho.webp",
      titulo: "Carrinho montado",
      texto: "Quantidade por item, total e forma de pagamento. O carrinho não some ao fechar o app.",
      acao: "Finalizar compra",
      alvo: { x: 50, y: 92 },
    },
    {
      src: "/app-b2b/revisao.webp",
      titulo: "Revisão do pedido",
      texto: "Transportadora, condição de pagamento e valor final com impostos, antes de enviar.",
      acao: "Enviar pedido",
      alvo: { x: 50, y: 92 },
    },
    {
      src: "/app-b2b/pedidos.webp",
      titulo: "Pedido no seu sistema",
      texto: "O pedido entra direto no seu sistema e o cliente acompanha da separação à entrega.",
      acao: null,
      alvo: null,
    },
  ],

  // Público-alvo em formato compacto: só o rótulo, sem parágrafo.
  audience: [
    { icon: "Truck", label: "Distribuidoras e atacadistas" },
    { icon: "Factory", label: "Indústrias" },
    { icon: "Users", label: "Representantes comerciais" },
    { icon: "Store", label: "Lojas e comércios" },
  ],

  // Antes e depois: entendido de relance, sem precisar ler tudo.
  comparison: {
    before: {
      title: "Hoje",
      items: [
        "Pedido chega por WhatsApp e alguém redigita",
        "Erro de digitação vira retrabalho e prejuízo",
        "Equipe presa no telefone tirando pedido",
        "Fora do horário comercial, ninguém compra",
        "Cliente novo depende de alguém mandar tabela",
        "Controle de produto e preço vive em planilha",
      ],
    },
    after: {
      title: "Com o aplicativo",
      items: [
        "Pedido entra direto no seu sistema",
        "Preço e condição sempre os do cadastro",
        "Equipe livre para vender, não para digitar",
        "Canal de compra aberto 24 horas",
        "Visitante vira cliente pedindo cadastro no app",
        "Produtos e preços num só lugar, sem planilha",
      ],
    },
  },

  features: [
    {
      icon: "LayoutGrid",
      title: "Encontra o produto",
      items: [
        "Catálogo com foto, preço e estoque",
        "Busca, filtros e categorias",
        "Banners de promoção",
        "Tabela de preço daquele cliente",
      ],
    },
    {
      icon: "ShoppingCart",
      title: "Monta e envia o pedido",
      items: [
        "Carrinho que não some ao fechar o app",
        "Impostos calculados na revisão",
        "Pagamento, transportadora e entrega",
        "Pedido direto no seu sistema",
      ],
    },
    {
      icon: "PackageSearch",
      title: "Acompanha e recompra",
      items: [
        "Histórico com situação e valores",
        "Entrada por digital ou Face ID",
        "Cadastro pelo próprio aplicativo",
        "Várias empresas ou filiais no mesmo app",
      ],
    },
  ],

  // Quatro argumentos, uma linha cada.
  differentials: [
    {
      icon: "Palette",
      title: "A marca é a sua",
      text: "Cores, logo, ícone e nome da sua empresa, publicado nas lojas em nome dela.",
    },
    {
      icon: "LockKeyhole",
      title: "Catálogo aberto, preço protegido",
      text: "Quem não é cliente navega e pede cadastro; o preço só aparece depois de entrar.",
    },
    {
      icon: "Plug",
      title: "Não precisa ter sistema",
      text: "Se você já usa um, ligamos nele. Se controla tudo em planilha, montamos o sistema junto com o app.",
    },
    {
      icon: "SlidersHorizontal",
      title: "Regras mudam na hora",
      text: "Preço, desconto e condições vêm do servidor, sem esperar aprovação da loja.",
    },
    {
      icon: "Smartphone",
      title: "Android e iOS juntos",
      text: "Base única em Flutter: corrigiu uma vez, corrigiu nas duas lojas.",
    },
  ],

  plans: [
    {
      id: "pronto",
      name: "App pronto",
      audience: "Você publica e cuida",
      price: "R$ 2.000",
      period: "pagamento único",
      summary:
        "O aplicativo com a sua marca e os pacotes prontos. A publicação nas lojas fica com você.",
      items: [
        "Android e iOS com a sua identidade visual",
        "Pacotes prontos para publicar (APK, AAB e IPA)",
        "Documentação de publicação e de ligação com os dados",
      ],
      excluded: ["Publicação nas lojas por nossa conta", "Suporte e atualizações"],
    },
    {
      id: "gestao",
      highlight: "Mais escolhido",
      name: "Gestão completa",
      audience: "A gente faz e mantém",
      price: "a partir de R$ 12.000",
      period: "mais R$ 700/mês",
      summary:
        "Cuidamos de tudo: marca, dados, publicação nas duas lojas e o aplicativo rodando ao longo do tempo.",
      items: [
        "Tudo do plano anterior",
        "Ligação com o seu sistema — ou montamos um para você",
        "Publicação na Play Store e na App Store",
        "Atualizações exigidas pela Apple e Google",
        "Correções, melhorias e suporte direto",
      ],
    },
  ],

  // O detalhe mora aqui: leve para quem lê, completo para quem busca.
  faqs: [
    {
      question: "Quanto custa um aplicativo de pedidos para distribuidora?",
      answer:
        "São dois caminhos. No App pronto, por R$ 2.000, entregamos o aplicativo com a sua marca e os pacotes prontos, e a publicação nas lojas fica com você. Na Gestão completa, a partir de R$ 12.000 mais R$ 700 por mês, cuidamos de tudo: marca, dados, publicação nas duas lojas e o aplicativo funcionando ao longo do tempo. Desenvolver um aplicativo assim do zero costuma custar muito mais e levar meses, porque aqui o produto já existe e está testado.",
    },
    {
      question: "Como funciona um aplicativo de força de vendas B2B?",
      answer:
        "O seu cliente ou o seu representante entra no aplicativo com login próprio e vê o catálogo com foto, preço e estoque — já com a tabela de preço e a condição de pagamento cadastradas para aquele cliente. Ele monta o carrinho, revisa o pedido com impostos, escolhe transportadora e envia. O pedido chega no seu sistema sem ninguém precisar redigitar nada, a qualquer hora do dia.",
    },
    {
      question: "O que é um aplicativo white label?",
      answer:
        "É um aplicativo pronto que ganha a identidade de cada empresa. No nosso caso, cores, logo, ícone, tela de abertura e nome são os da sua empresa, e o aplicativo é publicado na Play Store e na App Store em nome dela. Para o seu cliente, o app é seu: a Samps Projetos não aparece em lugar nenhum.",
    },
    {
      question: "Quem não é cliente consegue ver o catálogo?",
      answer:
        "Sim, e isso é proposital. O visitante baixa o aplicativo e navega pelo catálogo livremente, mas no lugar do preço vê um convite para entrar. Se ele ainda não tem acesso, pede cadastro ali mesmo. Assim o aplicativo também trabalha como canal de captação: quem chegou por indicação ou pela loja de aplicativos consegue conhecer a linha de produtos antes de virar cliente, e você recebe o pedido de cadastro sem que ninguém precise atender.",
    },
    {
      question: "Em quanto tempo o aplicativo entra no ar?",
      answer:
        "De 2 a 4 semanas na maioria dos casos. Aplicar a marca e gerar os pacotes é rápido, porque isso é automatizado. O que costuma pesar no prazo é a integração com o seu sistema e a análise das lojas, principalmente a da Apple, que pode pedir ajustes antes de aprovar.",
    },
    {
      question: "Preciso já ter um sistema ou um ERP?",
      answer:
        "Não precisa. Se a sua empresa já usa um ERP de mercado ou um sistema próprio, o aplicativo se liga a ele. Se você ainda controla produtos e preços em planilha ou caderno, montamos o sistema junto com o aplicativo — e isso funciona para loja pequena também. No diagnóstico avaliamos o seu caso e dizemos qual caminho sai mais barato.",
    },
    {
      question: "Serve para representante comercial e venda externa?",
      answer:
        "Serve. O mesmo aplicativo funciona nos dois sentidos: o cliente comprando sozinho pelo celular, ou o representante tirando o pedido na frente do cliente durante a visita. Como o app aceita várias empresas ou filiais, um representante que atende mais de uma marca também é atendido.",
    },
    {
      question: "Por que existe mensalidade se o aplicativo é meu?",
      answer:
        "Porque aplicativo publicado não é software parado. Apple e Google exigem atualizações técnicas todo ano e removem das lojas quem não acompanha. A mensalidade cobre essas atualizações obrigatórias, correções, republicação e suporte. Ela é opcional, mas sem ela o aplicativo tende a sair do ar com o tempo.",
    },
    {
      question: "Minha loja é pequena. Vale a pena?",
      answer:
        "Vale se você vende para outras empresas e hoje recebe pedido por telefone, WhatsApp ou papel. O tamanho da loja não muda o problema: alguém do seu time gasta tempo anotando e redigitando pedido. Como o aplicativo já existe, o investimento é bem menor que desenvolver do zero, e conseguimos começar simples — só com o catálogo e o pedido — e crescer depois.",
    },
    {
      question: "Dá para adaptar o aplicativo ao meu processo?",
      answer:
        "Boa parte do comportamento já é configurável no servidor, sem publicar versão nova: tela inicial, tabela de preço padrão, desconto, casas decimais, venda sem estoque e condição de pagamento. Ajustes maiores, como uma tela específica do seu negócio, entram como escopo adicional e são orçados à parte.",
    },
    {
      question: "Quem paga as contas de desenvolvedor das lojas?",
      answer:
        "As contas ficam no nome da sua empresa e são cobradas diretamente pela Apple, que tem uma anuidade, e pelo Google, que cobra uma taxa única. Isso é proposital: o aplicativo é seu e as contas também, então você não depende de nós para continuar publicando.",
    },
  ],
};
