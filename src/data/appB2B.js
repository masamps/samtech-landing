// Conteúdo da página do aplicativo B2B white label.
// Produto pronto, vendido como implantação + manutenção mensal.

export const appB2B = {
  slug: "/aplicativo-b2b/",
  name: "Aplicativo de Pedidos B2B",
  badge: "Produto pronto",
  headline: "Seu catálogo no bolso do cliente — com a sua marca",
  subheadline:
    "Aplicativo de pedidos para Android e iOS, publicado nas lojas com a identidade da sua empresa. O seu cliente compra sozinho, com o preço e a condição que são dele, e o pedido cai direto no seu sistema.",
  // Argumento central: já existe, é só configurar.
  pitch:
    "Não é um projeto do zero. O aplicativo já está pronto e testado — configuramos com a sua marca, integramos ao seu sistema e publicamos nas lojas.",

  whoFor: {
    title: "Para quem é",
    intro:
      "Empresas que vendem para outras empresas e ainda dependem de telefone, WhatsApp e planilha para receber pedido.",
    items: [
      {
        icon: "Truck",
        title: "Distribuidoras e atacadistas",
        text: "Abre um canal de autoatendimento e tira o pedido do telefone.",
      },
      {
        icon: "Factory",
        title: "Indústrias",
        text: "Atende revendas e lojistas com preço e condição corretos de cada um.",
      },
      {
        icon: "Users",
        title: "Representantes e força de venda",
        text: "O vendedor tira o pedido na frente do cliente, sem papel.",
      },
      {
        icon: "Code2",
        title: "Software houses",
        text: "Oferece um app de pedidos aos seus clientes sem desenvolver do zero.",
      },
    ],
  },

  // Problema -> consequência. É o que faz o leitor se reconhecer.
  problems: [
    "Pedido chega por WhatsApp e alguém precisa redigitar no sistema.",
    "Erro de digitação vira produto errado, preço errado e retrabalho.",
    "Equipe interna passa o dia tirando pedido por telefone.",
    "Fora do horário comercial, ninguém compra.",
    "Cliente pede com base numa tabela desatualizada que recebeu por e-mail.",
  ],

  features: [
    {
      icon: "LayoutGrid",
      title: "Catálogo e vitrine",
      items: [
        "Produtos com imagem, descrição, preço e saldo em estoque",
        "Navegação por categorias e grupos",
        "Busca e filtros",
        "Banners rotativos na tela inicial",
        "Lista de favoritos por usuário",
        "Desconto de vitrine configurável",
        "Bloqueio opcional de venda sem estoque",
        "Tabela de preço por cliente, com tabela padrão de reserva",
      ],
    },
    {
      icon: "ShoppingCart",
      title: "Carrinho e pedido",
      items: [
        "Carrinho persistente: fecha o app e não perde o que montou",
        "Tela de revisão antes de enviar",
        "Condição de pagamento escolhida ou puxada do cadastro",
        "Seleção de transportadora com busca",
        "Endereço de entrega e observações",
        "Cálculo de impostos antes de finalizar",
        "Pedido enviado direto para o seu sistema",
      ],
    },
    {
      icon: "PackageSearch",
      title: "Acompanhamento",
      items: [
        "Meus pedidos com listagem paginada",
        "Detalhe com itens, valores, situação e dados de entrega",
      ],
    },
    {
      icon: "ShieldCheck",
      title: "Acesso e conta",
      items: [
        "Login com usuário e senha",
        "Entrada por biometria (digital ou Face ID)",
        "Cadastro pelo próprio app",
        "Recuperação e troca de senha",
        "Exclusão de conta (exigência das lojas)",
        "Multiempresa: um app atende várias empresas ou filiais",
      ],
    },
  ],

  // Diferenciais técnicos traduzidos em benefício comercial.
  differentials: [
    {
      icon: "Palette",
      title: "Marca própria de verdade",
      text: "Cores, logo, ícone, splash e nome do app são do seu cliente, publicados na conta dele nas lojas. Não é tema trocado: cada app é gerado a partir da configuração da empresa.",
    },
    {
      icon: "Plug",
      title: "Conversa com o sistema que você já usa",
      text: "O app fala com o seu servidor por um contrato bem definido. Já vem com uma integração REST pronta e funcionando; para ligar em outro sistema, escreve-se só o adaptador — nenhuma tela é tocada.",
    },
    {
      icon: "SlidersHorizontal",
      title: "Regras mudam sem publicar versão",
      text: "Tela inicial, tabela padrão, desconto, casas decimais, venda sem estoque e condição de pagamento vêm do servidor. Ajustar o comportamento não exige esperar aprovação da loja.",
    },
    {
      icon: "RefreshCw",
      title: "Atualização avisada no app",
      text: "Ao abrir, o app compara a versão instalada com a publicada na loja e oferece atualizar. Você não fica com clientes presos numa versão antiga.",
    },
    {
      icon: "Smartphone",
      title: "Android e iOS na mesma base",
      text: "Feito em Flutter: um código gera os dois sistemas com interface nativa e fluida. Corrigiu uma vez, corrigiu nas duas lojas.",
    },
    {
      icon: "TestTube2",
      title: "Base coberta por testes",
      text: "Arquitetura em camadas e testes automatizados. Cada versão nova sai com menos risco de quebrar o que já funcionava.",
    },
  ],

  benefits: [
    "O pedido entra direto no seu sistema: acaba a redigitação e o erro de digitação.",
    "Equipe interna liberada do tira-pedido por telefone e WhatsApp.",
    "Canal de venda aberto 24 horas, inclusive fora do horário comercial.",
    "Cada cliente compra com o preço, o estoque e a condição do cadastro dele.",
    "Sua marca na loja de aplicativos, ao lado das grandes.",
    "Produto pronto e validado: entra no ar em dias, não em meses.",
  ],

  plans: [
    {
      id: "template",
      name: "Licença do template",
      audience: "Para quem tem equipe técnica",
      price: "R$ 2.000",
      period: "pagamento único",
      summary:
        "O código-fonte completo com a documentação. A sua equipe configura a marca, integra ao sistema e publica nas lojas.",
      items: [
        "Código-fonte Flutter (Android e iOS)",
        "Scripts de configuração white-label e build em lote",
        "Integração REST de referência, pronta e funcionando",
        "Documentação de configuração, integração e publicação",
        "Licença de uso próprio da sua empresa",
      ],
      excluded: [
        "Configuração, integração e publicação por nossa conta",
        "Suporte e atualizações",
      ],
    },
    {
      id: "implantacao",
      highlight: "Mais escolhido",
      name: "Implantação completa",
      audience: "Para quem quer tudo pronto",
      price: "a partir de R$ 12.000",
      period: "pagamento único",
      summary:
        "A gente faz tudo: configura com a sua marca, integra ao seu sistema e publica nas duas lojas.",
      items: [
        "Tudo o que vem na licença do template",
        "Aplicativo configurado com a sua identidade visual",
        "Integração com o seu sistema",
        "Publicação na Play Store e na App Store",
        "Parametrização das regras comerciais",
        "Acompanhamento na primeira semana de uso",
      ],
    },
    {
      id: "manutencao",
      name: "Manutenção mensal",
      audience: "Opcional, para os dois planos",
      price: "a partir de R$ 700",
      period: "por mês",
      summary:
        "Aplicativo publicado exige manutenção. As lojas mudam as regras todo ano e app desatualizado sai do ar.",
      items: [
        "Atualizações exigidas pela Apple e pelo Google",
        "Correções e melhorias contínuas",
        "Republicação nas lojas quando necessário",
        "Ajuste de parâmetros e suporte direto",
        "Acompanhamento de erros em produção",
      ],
    },
  ],

  // Transparência sobre o que não está incluso evita atrito na proposta.
  notes: [
    "Na implantação, o valor final depende do seu sistema: se ele já expõe uma API, a integração é rápida; se não, avaliamos o adaptador no diagnóstico.",
    "As contas de desenvolvedor da Apple (anual) e do Google (única) ficam no nome da sua empresa e são cobradas pelas próprias lojas.",
    "A licença do template é para uso próprio da sua empresa. Revenda ou sublicenciamento a terceiros é negociado à parte.",
    "A manutenção é opcional, mas recomendada: sem as atualizações anuais, as lojas removem o aplicativo.",
  ],

  faqs: [
    {
      question: "Em quanto tempo o aplicativo entra no ar?",
      answer:
        "De 2 a 4 semanas na maioria dos casos. A configuração da marca e a geração dos pacotes levam pouco tempo; o que costuma pesar é a integração com o seu sistema e a análise das lojas, principalmente a da Apple.",
    },
    {
      question: "Preciso ter um ERP para usar?",
      answer:
        "Não. O aplicativo conversa com o sistema que você já usa, seja um ERP de mercado ou um sistema próprio. Se ele expõe uma API, ligamos direto; se não, avaliamos junto com você o caminho no diagnóstico.",
    },
    {
      question: "O aplicativo fica com a minha marca mesmo?",
      answer:
        "Sim. Cores, logo, ícone, tela de abertura e nome são da sua empresa, e o aplicativo é publicado nas lojas em nome dela. Para o seu cliente, o app é seu — a Samps não aparece.",
    },
    {
      question: "Por que existe mensalidade se o aplicativo é meu?",
      answer:
        "Porque aplicativo publicado não é software parado. Apple e Google exigem atualizações técnicas todo ano e removem das lojas quem não acompanha. A mensalidade cobre essas atualizações, correções, suporte e republicação. Ela é opcional, mas sem ela o aplicativo tende a sair do ar com o tempo.",
    },
    {
      question: "Qual a diferença entre a licença do template e a implantação?",
      answer:
        "Na licença, você recebe o código-fonte e a documentação por R$ 2.000, e a sua equipe cuida de configurar a marca, integrar ao sistema e publicar nas lojas — é a opção para quem já tem time técnico. Na implantação, a partir de R$ 12.000, nós fazemos todo esse trabalho e entregamos o aplicativo publicado e funcionando.",
    },
    {
      question: "Dá para adaptar o aplicativo ao meu processo?",
      answer:
        "Sim. Boa parte do comportamento já é configurável remotamente, sem publicar versão nova. Ajustes maiores, como uma tela específica do seu negócio, entram como escopo adicional e são orçados à parte.",
    },
  ],
};
