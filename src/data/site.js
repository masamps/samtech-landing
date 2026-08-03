// Conteúdo centralizado do site.
// Atualize os dados de contato (e-mail, WhatsApp e redes) conforme a sua empresa.

export const company = {
  name: "Samps Projetos",
  tagline: "Sistemas sob medida e automação de processos",
  description:
    "Automatizamos processos manuais e desenvolvemos sistemas web sob medida para empresas. Também criamos sites e aplicativos mobile.",
  email: "sampsprojetos@gmail.com",
  whatsapp: "5515981777690", // formato internacional, somente números
  whatsappLabel: "(15) 98177-7690",
  city: "Brasil",
};

export const whatsappLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Samps Projetos e gostaria de conversar sobre um projeto."
)}`;

export const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

// Escada de serviços: automação (entrada) -> sistema completo -> recorrência.
export const services = [
  {
    id: "automacao",
    icon: "Zap",
    title: "Automação de Processos",
    highlight: "Comece por aqui",
    price: "a partir de R$ 6.000",
    deadline: "2 a 5 semanas",
    summary:
      "Aquela tarefa manual e repetitiva que consome horas da sua equipe — e ainda deixa passar erro. A gente automatiza e o retrabalho acaba.",
    features: [
      "Conferência automática de documentos",
      "Leitura e cruzamento de planilhas e PDFs",
      "Relatórios e alertas automáticos",
      "Integração entre sistemas que hoje não conversam",
    ],
  },
  {
    id: "sistemas",
    icon: "LayoutDashboard",
    title: "Sistemas Web sob medida",
    price: "a partir de R$ 15.000",
    deadline: "2 a 4 meses",
    summary:
      "Quando planilha e sistema de prateleira não dão mais conta. Uma plataforma feita para o seu processo, não o contrário.",
    features: [
      "Painéis e dashboards de gestão",
      "Controle de acessos e perfis de usuário",
      "APIs e integrações com sistemas externos",
      "Arquitetura escalável e segura",
    ],
  },
  {
    id: "sites",
    icon: "Globe",
    title: "Sites e Aplicativos",
    price: "sob consulta",
    deadline: "2 a 8 semanas",
    summary:
      "Também desenvolvemos sites institucionais, landing pages e aplicativos mobile — normalmente como complemento do sistema principal.",
    features: [
      "Sites e landing pages otimizados para SEO",
      "Aplicativos Android e iOS",
      "Publicação nas lojas",
      "Integração com a sua plataforma web",
    ],
  },
];

// Plano de manutenção — receita recorrente após a entrega.
export const maintenance = {
  price: "a partir de R$ 500/mês",
  title: "Manutenção e evolução contínua",
  description:
    "Depois da entrega, seguimos cuidando do seu sistema: correções, melhorias, novas funcionalidades e suporte direto com quem desenvolveu.",
};

// Diferenciais — respondem aos medos reais de quem contrata software.
export const differentials = [
  {
    icon: "Target",
    title: "Feito para o seu processo",
    description:
      "Nada de adaptar a sua operação a um sistema de prateleira. O software é construído em cima da forma como a sua empresa já trabalha.",
  },
  {
    icon: "MessagesSquare",
    title: "Você fala direto com quem programa",
    description:
      "Sem camada de atendimento, sem telefone sem fim. Quem responde a sua dúvida é quem escreve o código.",
  },
  {
    icon: "KeyRound",
    title: "O sistema é seu, sem amarras",
    description:
      "Todo o código e os dados ficam com você. Se um dia quiser levar para outra equipe, leva — não existe refém aqui.",
  },
  {
    icon: "GitBranch",
    title: "Entregas parciais para acompanhar",
    description:
      "Você não espera meses para ver resultado. Entregamos em etapas, você valida no caminho e corrige a rota cedo.",
  },
  {
    icon: "ShieldCheck",
    title: "Segurança e backup desde o início",
    description:
      "Controle de acesso por perfil, dados protegidos e rotina de backup — não como item extra, mas como parte do projeto.",
  },
  {
    icon: "Wrench",
    title: "Suporte depois da entrega",
    description:
      "O projeto não acaba no lançamento. Seguimos corrigindo, melhorando e evoluindo o sistema conforme a empresa cresce.",
  },
];

// Cases reais de clientes em produção.
export const cases = [
  {
    client: "Vendedor do Mercado Livre",
    type: "Sistema Web",
    segment: "E-commerce",
    icon: "Zap",
    challenge:
      "A equipe conferia à mão, um a um, se o pedido de compra batia com a nota fiscal. Além de consumir horas todo mês, divergência de valor passava despercebida e virava prejuízo.",
    solution:
      "Um sistema que lê os PDFs de pedido e de nota fiscal, compara automaticamente e aponta as divergências na tela. Também mostra os custos da regional do Mercado Livre, que antes ficavam fora da conta.",
    result:
      "A conferência que era manual virou automática, e o erro que gerava prejuízo passou a ser identificado antes do pagamento.",
    tags: ["Automação", "Leitura de PDF", "Conferência fiscal", "Relatórios"],
  },
  {
    client: "Escritório de advocacia securitária",
    type: "Site & Landing Page",
    segment: "Advocacia",
    icon: "Globe",
    challenge:
      "O escritório atuava numa área bastante especializada, mas não tinha presença online — e perdia credibilidade para concorrentes menos preparados que apareciam melhor.",
    solution:
      "Uma landing page sóbria, com área de publicações para o escritório divulgar conteúdo jurídico e uma seção de depoimentos, tudo direcionado para o contato.",
    result:
      "O escritório passou a ter um canal próprio para mostrar autoridade no assunto e receber contatos direto pelo site.",
    tags: ["Landing page", "Publicações", "Depoimentos", "SEO"],
  },
];

// Projetos próprios (laboratório) — mostram capacidade técnica.
export const labProjects = [
  {
    title: "App de mistura de combustível",
    icon: "Smartphone",
    description:
      "Aplicativo mobile que calcula a proporção ideal de mistura de combustível.",
  },
  {
    title: "Leitor de dados OBD2",
    icon: "Gauge",
    description:
      "App que lê e exibe os dados do veículo pela porta OBD2 do carro em tempo real.",
  },
];

export const faqs = [
  {
    question: "Como funciona o diagnóstico gratuito?",
    answer:
      "É uma conversa de cerca de 30 minutos, sem compromisso, para entender o seu processo e o que você precisa resolver. Ao final você recebe uma orientação do caminho e, se fizer sentido, uma proposta com escopo, prazo e valor.",
  },
  {
    question: "Quanto custa um projeto?",
    answer:
      "Automações de processo começam em R$ 6.000 e sistemas web sob medida em R$ 15.000. O valor final depende do escopo — principalmente da quantidade de integrações. Depois do diagnóstico você recebe uma proposta fechada, com o preço definido antes de começar e sem surpresa no meio do caminho.",
  },
  {
    question: "Por que começar por uma automação em vez de um sistema completo?",
    answer:
      "Porque é mais rápido, mais barato e você vê resultado antes de investir alto. Resolvemos primeiro o processo que mais consome tempo hoje e, se fizer sentido, evoluímos aquilo para um sistema completo depois — com você já sabendo como trabalhamos.",
  },
  {
    question: "Existe custo mensal depois da entrega?",
    answer:
      "Só se você quiser. A manutenção contínua começa em R$ 500/mês e inclui correções, melhorias e novas funcionalidades. Não é obrigatória: o sistema é seu e continua funcionando sem ela.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "Depende da complexidade. Um site institucional costuma levar de 2 a 4 semanas, enquanto sistemas e aplicativos mais robustos variam de 2 a 4 meses. O cronograma é definido junto com você logo no início.",
  },
  {
    question: "Preciso saber exatamente o que quero antes de falar com vocês?",
    answer:
      "Não. Boa parte dos projetos começa com uma ideia ou um incômodo do dia a dia. A gente ajuda a transformar isso em escopo — essa é justamente a função do diagnóstico.",
  },
  {
    question: "Vocês desenvolvem do zero ou também dão manutenção no que já existe?",
    answer:
      "Os dois. Criamos produtos do zero e também assumimos a manutenção e a evolução de sistemas, sites e aplicativos que já estão rodando.",
  },
  {
    question: "O sistema fica sob a minha propriedade?",
    answer:
      "Sim. Todo o código desenvolvido é seu, entregue pronto para crescer e sem amarras com a gente. Você não fica refém de fornecedor.",
  },
  {
    question: "Vocês atendem empresas de outras cidades?",
    answer:
      "Sim. O atendimento é remoto e acompanhamos o projeto por videochamada e WhatsApp, com contato direto com quem está desenvolvendo.",
  },
];
