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
    "Aplicativo de pedidos para Android e iOS com a marca da sua empresa. O seu cliente compra sozinho e o pedido cai direto no seu sistema.",
  pitch:
    "Não é um projeto do zero: o aplicativo já está pronto e testado. Configuramos com a sua marca e colocamos no ar em semanas.",

  // Telas de demonstração: mostram a jornada completa em quatro passos.
  screens: [
    {
      src: "/app-b2b/catalogo.webp",
      caption: "Catálogo",
      text: "Produtos com foto, preço e campanha do mês.",
    },
    {
      src: "/app-b2b/carrinho.webp",
      caption: "Carrinho",
      text: "Quantidade por item, total e pagamento.",
    },
    {
      src: "/app-b2b/revisao.webp",
      caption: "Revisão",
      text: "Transportadora, condição e valor final.",
    },
    {
      src: "/app-b2b/pedidos.webp",
      caption: "Meus pedidos",
      text: "Da separação até a entrega.",
    },
  ],

  // Público-alvo em formato compacto: só o rótulo, sem parágrafo.
  audience: [
    { icon: "Truck", label: "Distribuidoras e atacadistas" },
    { icon: "Factory", label: "Indústrias" },
    { icon: "Users", label: "Representantes comerciais" },
    { icon: "Code2", label: "Software houses" },
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
      ],
    },
    after: {
      title: "Com o aplicativo",
      items: [
        "Pedido entra direto no seu sistema",
        "Preço e condição sempre os do cadastro",
        "Equipe livre para vender, não para digitar",
        "Canal de compra aberto 24 horas",
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
      icon: "Plug",
      title: "Liga no seu sistema",
      text: "Funciona com ERP de mercado ou sistema próprio, pela API que você já tem.",
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
      id: "template",
      name: "Aplicativo configurado",
      audience: "Você publica e integra",
      price: "R$ 2.000",
      period: "pagamento único",
      summary: "O app com a sua marca e os pacotes prontos para publicar.",
      items: [
        "Android e iOS com a sua identidade visual",
        "Pacotes prontos (APK, AAB e IPA)",
        "Integração de referência e documentação",
      ],
      excluded: ["Publicação e integração por nossa conta", "Código-fonte e suporte"],
    },
    {
      id: "implantacao",
      highlight: "Mais escolhido",
      name: "Implantação completa",
      audience: "A gente faz tudo",
      price: "a partir de R$ 12.000",
      period: "pagamento único",
      summary: "Configuramos, integramos ao seu sistema e publicamos nas lojas.",
      items: [
        "Tudo do plano anterior",
        "Integração com o seu sistema",
        "Publicação na Play Store e na App Store",
        "Parametrização e acompanhamento inicial",
      ],
    },
    {
      id: "manutencao",
      name: "Manutenção",
      audience: "Opcional, para os dois",
      price: "a partir de R$ 700",
      period: "por mês",
      summary: "As lojas mudam as regras todo ano; app desatualizado sai do ar.",
      items: [
        "Atualizações exigidas pela Apple e Google",
        "Correções, melhorias e republicação",
        "Suporte direto com quem desenvolveu",
      ],
    },
  ],

  partner: {
    eyebrow: "Software houses e ERPs",
    title: "Quer oferecer o aplicativo para a sua carteira?",
    description:
      "Existe um modelo de parceria com valor por cliente ativado, em vez de licença única. Você usa a nossa base e mantém o relacionamento com o seu cliente.",
    cta: "Falar sobre parceria",
  },

  // O detalhe mora aqui: leve para quem lê, completo para quem busca.
  faqs: [
    {
      question: "Quanto custa um aplicativo de pedidos para distribuidora?",
      answer:
        "Aqui são duas faixas. O aplicativo configurado com a sua marca custa R$ 2.000 e a sua equipe cuida de integrar e publicar. A implantação completa, em que fazemos a integração com o seu sistema e publicamos nas duas lojas, começa em R$ 12.000. A manutenção mensal é opcional e começa em R$ 700. Desenvolver um aplicativo assim do zero costuma custar muito mais e levar meses, porque aqui o produto já existe e está testado.",
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
      question: "Em quanto tempo o aplicativo entra no ar?",
      answer:
        "De 2 a 4 semanas na maioria dos casos. Aplicar a marca e gerar os pacotes é rápido, porque isso é automatizado. O que costuma pesar no prazo é a integração com o seu sistema e a análise das lojas, principalmente a da Apple, que pode pedir ajustes antes de aprovar.",
    },
    {
      question: "Preciso ter um ERP para usar?",
      answer:
        "Não. O aplicativo conversa com o sistema que a sua empresa já usa, seja um ERP de mercado ou um sistema próprio. Se ele já expõe uma API, a ligação é direta. Se não expõe, avaliamos no diagnóstico o que seria necessário — e isso influencia o prazo e o valor da implantação.",
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
      question: "O código-fonte vem junto?",
      answer:
        "Nos dois planos, não: você recebe o aplicativo pronto para usar, com licença de uso da sua empresa. O código-fonte entra apenas em acordos de parceria, para quem vai implantar o app em vários clientes. Se esse é o seu caso, fale com a gente sobre o modelo de revenda.",
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
