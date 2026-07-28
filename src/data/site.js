// Conteúdo centralizado do site.
// Atualize os dados de contato (e-mail, WhatsApp e redes) conforme a sua empresa.

export const company = {
  name: "Samps Projetos",
  tagline: "Sistemas web, sites e aplicativos sob medida",
  description:
    "Transformamos ideias em produtos digitais de verdade. Desenvolvemos sistemas web, sites e aplicativos mobile com qualidade, design e performance.",
  email: "sampsprojetos@gmail.com",
  whatsapp: "5515981777690", // formato internacional, somente números
  whatsappLabel: "(15) 98177-7690",
  city: "Brasil",
};

export const whatsappLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Samps Projetos e gostaria de conversar sobre um projeto."
)}`;

export const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

export const services = [
  {
    id: "sistemas",
    icon: "LayoutDashboard",
    title: "Sistemas Web",
    summary:
      "Plataformas sob medida, painéis administrativos e SaaS que organizam e automatizam a operação do seu negócio.",
    features: [
      "Painéis e dashboards de gestão",
      "Automação de processos e integrações",
      "APIs e integrações com sistemas externos",
      "Arquitetura escalável e segura",
    ],
  },
  {
    id: "sites",
    icon: "Globe",
    title: "Sites & Landing Pages",
    summary:
      "Sites institucionais, landing pages e e-commerce com design moderno, alta performance e otimização para o Google.",
    features: [
      "Design responsivo e moderno",
      "SEO técnico e velocidade de carregamento",
      "Landing pages focadas em conversão",
      "Lojas virtuais e catálogos",
    ],
  },
  {
    id: "apps",
    icon: "Smartphone",
    title: "Aplicativos Mobile",
    summary:
      "Aplicativos para Android e iOS com experiência fluida, do protótipo à publicação nas lojas.",
    features: [
      "Apps nativos e multiplataforma",
      "Publicação na App Store e Play Store",
      "Notificações, login e pagamentos",
      "Sincronização com sua plataforma web",
    ],
  },
];

export const stats = [
  { value: 5, suffix: "", label: "Anos de experiência" },
  { value: "24/7", suffix: "", label: "Sistemas no ar" },
  { value: 100, suffix: "%", label: "Projetos sob medida" },
];

// Cases reais de clientes em produção.
export const cases = [
  {
    client: "Escritório de advocacia securitária",
    type: "Site & Landing Page",
    segment: "Advocacia · Direito securitário",
    icon: "Globe",
    challenge:
      "O escritório precisava de uma presença online profissional para transmitir credibilidade e atrair clientes em uma área especializada.",
    solution:
      "Landing page com área de publicações para o escritório postar conteúdo jurídico e uma seção de depoimentos de clientes, com visual sóbrio e foco em contato.",
    result:
      "Site institucional no ar, com conteúdo e prova social que reforçam a autoridade do escritório.",
    tags: ["Landing page", "Publicações", "Depoimentos", "SEO"],
  },
  {
    client: "Conferência fiscal para vendedores",
    type: "Sistema Web",
    segment: "E-commerce · Mercado Livre",
    icon: "LayoutDashboard",
    challenge:
      "Conferir manualmente o pedido de compra contra a nota fiscal era lento e deixava passar divergências de valores.",
    solution:
      "Sistema que compara os PDFs de pedido e nota fiscal automaticamente, acusa as divergências e ainda apresenta os custos da regional do Mercado Livre.",
    result:
      "Conferência automática que evita prejuízo por erro e economiza horas de trabalho manual.",
    tags: ["Automação", "Leitura de PDF", "Conferência fiscal", "Relatórios"],
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
      "O valor depende do escopo: um site institucional tem investimento bem menor que um sistema com várias integrações. Depois do diagnóstico enviamos uma proposta fechada, com o preço definido antes de começar — sem surpresa no meio do caminho.",
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
