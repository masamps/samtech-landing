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

export const differentials = [
  {
    icon: "Sparkles",
    title: "Design que transmite confiança",
    description:
      "Interfaces limpas e intuitivas, pensadas para que o seu cliente use sem fricção e a sua marca pareça profissional.",
  },
  {
    icon: "Gauge",
    title: "Performance e velocidade",
    description:
      "Aplicações rápidas e otimizadas, porque cada segundo conta para a experiência do usuário e para o SEO.",
  },
  {
    icon: "ShieldCheck",
    title: "Código de qualidade",
    description:
      "Boas práticas, testes e código organizado para que o seu sistema cresça sem virar uma dor de cabeça.",
  },
  {
    icon: "TrendingUp",
    title: "Foco em resultado",
    description:
      "Não entregamos só tecnologia: entregamos soluções que geram valor e ajudam o seu negócio a crescer.",
  },
  {
    icon: "MessagesSquare",
    title: "Comunicação transparente",
    description:
      "Você acompanha o andamento do projeto de perto, com prazos claros e contato direto com quem desenvolve.",
  },
  {
    icon: "Wrench",
    title: "Suporte contínuo",
    description:
      "Depois da entrega, seguimos ao seu lado com manutenção, evolução e novas funcionalidades.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Entendemos o seu negócio, objetivos e desafios para definir o escopo certo do projeto.",
  },
  {
    number: "02",
    title: "Planejamento & Design",
    description:
      "Estruturamos a solução e desenhamos a interface (UI/UX) antes de escrever a primeira linha de código.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos o produto em ciclos, com entregas frequentes para você acompanhar e validar.",
  },
  {
    number: "04",
    title: "Entrega & Evolução",
    description:
      "Publicamos, monitoramos e damos suporte contínuo, evoluindo o sistema junto com o seu negócio.",
  },
];

export const projects = [
  {
    title: "Plataforma de Gestão",
    category: "Sistema Web",
    description:
      "Painel administrativo completo para controle de operações, relatórios e equipe em tempo real.",
    tags: ["Dashboard", "SaaS", "Automação"],
    accent: "from-brand-500/30 to-accent-400/20",
  },
  {
    title: "App de Delivery",
    category: "Aplicativo Mobile",
    description:
      "Aplicativo multiplataforma com pedidos, pagamentos e rastreamento em tempo real.",
    tags: ["Android", "iOS", "Pagamentos"],
    accent: "from-accent-400/30 to-brand-500/20",
  },
  {
    title: "Site Institucional",
    category: "Website",
    description:
      "Site rápido, responsivo e otimizado para SEO, com foco em geração de contatos.",
    tags: ["SEO", "Landing", "Responsivo"],
    accent: "from-brand-400/30 to-brand-600/20",
  },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 7, suffix: " anos", label: "De experiência" },
  { value: 100, suffix: "%", label: "Código sob medida" },
];

export const testimonials = [
  {
    quote:
      "A Samps Projetos entendeu exatamente o que precisávamos e entregou um sistema que mudou a forma como trabalhamos. Profissionalismo do início ao fim.",
    name: "Cliente Satisfeito",
    role: "Diretor de Operações",
  },
  {
    quote:
      "O aplicativo ficou impecável e a comunicação durante todo o projeto foi excelente. Recomendo de olhos fechados.",
    name: "Empreendedora",
    role: "Fundadora de Startup",
  },
  {
    quote:
      "Nosso site novo é rápido, bonito e já estamos aparecendo melhor no Google. Superou as expectativas.",
    name: "Gestor de Marketing",
    role: "Empresa do varejo",
  },
];

export const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer:
      "Depende da complexidade. Um site institucional pode levar de 2 a 4 semanas, enquanto sistemas e aplicativos mais robustos variam de 2 a 4 meses. Definimos um cronograma claro logo no início.",
  },
  {
    question: "Vocês desenvolvem do zero ou também dão manutenção em projetos existentes?",
    answer:
      "Os dois. Criamos novos produtos do zero e também assumimos a manutenção e evolução de sistemas, sites e apps que já existem.",
  },
  {
    question: "Como funciona o orçamento?",
    answer:
      "Após uma conversa inicial para entender o escopo, enviamos uma proposta detalhada com valores, prazos e etapas. O primeiro contato é sempre gratuito e sem compromisso.",
  },
  {
    question: "O sistema fica sob minha propriedade?",
    answer:
      "Sim. Todo o código desenvolvido é seu. Entregamos o produto pronto para escalar, sem amarras com a nossa equipe.",
  },
];
